/**
 * Collect real POI densities from 高德 (AMap) for the 4 POI metrics, per city.
 *
 * For each city: fetch DataV boundary GeoJSON → per-district area → for each
 * (district, POI typecode) paginate /place/text with city_limit, dedupe by id
 * → count → density = count / area_km². Throttled (~2 QPS) + QPS-retry.
 *
 * Output: src/data/poi.json = { [cityKey]: { collectedAt, source, districts[] } }
 * Key read from .env (AMAP_KEY) — never hardcode/commit.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const env = existsSync(resolve(ROOT, '.env'))
  ? Object.fromEntries(
      readFileSync(resolve(ROOT, '.env'), 'utf8')
        .split('\n')
        .filter((l) => l && !l.startsWith('#') && l.includes('='))
        .map((l) => {
          const i = l.indexOf('=');
          return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
        }),
    )
  : {};
const KEY = process.env.AMAP_KEY || env.AMAP_KEY;
if (!KEY) {
  console.error('✗ AMAP_KEY missing. Put it in .env (see .env.example).');
  process.exit(1);
}

const CACHE = resolve(ROOT, 'scripts/.poi-cache.json');
const OUT = resolve(ROOT, 'src/data/poi.json');
const geo = (adcode) => `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;

const CITIES = [
  { key: 'shanghai', name: '上海', adcode: '310100' },
  { key: 'yinchuan', name: '银川', adcode: '640100' },
];

const GROUPS = {
  education: ['141201', '141202', '141203'],
  healthcare: ['090100', '090200'],
  transit: ['150500'],
  amenity: ['060100', '110101'],
};

const toRad = (d) => (d * Math.PI) / 180;
function ringArea(coords) {
  const R = 6378137;
  let area = 0;
  const n = coords.length;
  if (n < 3) return 0;
  for (let i = 0; i < n; i++) {
    const [lng1, lat1] = coords[i];
    const [lng2, lat2] = coords[(i + 1) % n];
    area += toRad(lng2 - lng1) * (2 + Math.sin(toRad(lat1)) + Math.sin(toRad(lat2)));
  }
  return Math.abs((area * R * R) / 2);
}
function featureArea(feature) {
  const g = feature.geometry;
  if (g.type === 'Polygon') return ringArea(g.coordinates[0]);
  if (g.type === 'MultiPolygon') return g.coordinates.reduce((s, p) => s + ringArea(p[0]), 0);
  return 0;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const THROTTLE = 450;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';

async function fetchGeoJson(adcode) {
  const url = geo(adcode);
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      const txt = await res.text();
      if (txt.trim().startsWith('{')) return JSON.parse(txt);
      console.warn(`  geojson non-JSON (attempt ${attempt + 1}): ${txt.slice(0, 60)}`);
    } catch (e) {
      console.warn(`  geojson net err (attempt ${attempt + 1}): ${e.message}`);
    }
    await sleep(1500 * (attempt + 1));
  }
  throw new Error(`geojson fetch failed for ${adcode}`);
}

async function fetchJson(url, label) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const d = await (await fetch(url)).json();
      if (d.infocode === '10021') {
        await sleep(1200 * (attempt + 1));
        continue;
      }
      await sleep(THROTTLE);
      return d;
    } catch (e) {
      console.warn(`  net err ${label}: ${e.message}`);
      await sleep(800);
    }
  }
  return { status: '0', info: 'qps-exhausted', infocode: '10021' };
}

async function countType(adcode, typecode) {
  const ids = new Set();
  let capped = false;
  for (let page = 1; page <= 30; page++) {
    const url = `https://restapi.amap.com/v3/place/text?types=${typecode}&city=${adcode}&city_limit=true&offset=25&page=${page}&key=${KEY}`;
    const d = await fetchJson(url, `${adcode}/${typecode} p${page}`);
    if (d.status !== '1') break;
    const pois = d.pois || [];
    for (const p of pois) ids.add(p.id ?? `${p.location}|${p.name}`);
    if (Number(d.count) >= 600) capped = true;
    if (pois.length < 25) break;
  }
  return { count: ids.size, capped };
}

async function collectCity(city, cache) {
  console.log(`\n▶ ${city.name} (${city.adcode})`);
  const g = await fetchGeoJson(city.adcode);
  const features = g.features.filter((f) => f.properties?.adcode);

  const tasks = [];
  for (const f of features) {
    const adcode = String(f.properties.adcode);
    const name = f.properties.name;
    const area_m2 = featureArea(f);
    for (const [group, tcs] of Object.entries(GROUPS))
      for (const tc of tcs) tasks.push({ adcode, name, area_m2, group, tc });
  }
  console.log(`  ${tasks.length} (district × type) combos …`);
  let done = 0;
  const raw = [];
  for (const t of tasks) {
    raw.push({ ...t, ...(await countType(t.adcode, t.tc)) });
    done++;
    if (done % 8 === 0 || done === tasks.length) process.stdout.write(`\r  ${done}/${tasks.length}`);
  }
  process.stdout.write('\n');

  const byD = new Map();
  for (const r of raw) {
    if (!byD.has(r.adcode)) byD.set(r.adcode, { adcode: r.adcode, name: r.name, area_km2: +(r.area_m2 / 1e6).toFixed(1), counts: {}, capped: {} });
    const d = byD.get(r.adcode);
    d.counts[r.group] = (d.counts[r.group] || 0) + r.count;
    if (r.capped) d.capped[r.group] = true;
  }
  const districts = [...byD.values()].sort((a, b) => a.name.localeCompare(b.name, 'zh'));
  for (const d of districts) {
    d.density = {};
    for (const gk of Object.keys(GROUPS)) d.density[gk] = +(d.counts[gk] / d.area_km2).toFixed(2);
  }
  const payload = { collectedAt: new Date().toISOString().slice(0, 10), source: '高德 POI（/place/text 分页去重，密度=计数/行政区面积）', districts };
  cache[city.key] = payload;
  console.log(`  ✓ ${districts.length} districts`);
  return payload;
}

async function main() {
  const fresh = process.argv.includes('--fresh');
  let cache = {};
  if (existsSync(CACHE)) {
    const raw = JSON.parse(readFileSync(CACHE, 'utf8'));
    // migrate old single-city format { out: payload } → { shanghai: payload }
    if (raw.out && !raw.shanghai) cache = { shanghai: raw.out };
    else cache = raw;
  }
  if (!fresh && Object.keys(cache).length)
    console.log('• cached cities:', Object.keys(cache).join(', '), '(--fresh to refetch)');

  const result = {};
  for (const city of CITIES) {
    if (!fresh && cache[city.key]) {
      console.log(`▶ ${city.name}: using cache`);
      result[city.key] = cache[city.key];
    } else {
      result[city.key] = await collectCity(city, cache);
    }
  }

  writeFileSync(CACHE, JSON.stringify(cache, null, 2));
  writeFileSync(OUT, JSON.stringify(result, null, 2));
  console.log(`\n✓ wrote ${OUT}`);
  for (const city of CITIES) {
    const ds = result[city.key].districts;
    console.log(`  ${city.name} (${ds.length}): ${ds.map((d) => `${d.name} ${(d.density.transit).toFixed(1)}`).join(' | ')}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
