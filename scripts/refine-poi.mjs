/**
 * Refine capped (district, type) POI counts by grid subdivision.
 *
 * /place/text (city=adcode) is district-accurate but caps ~600. To get the true
 * count for capped combos, subdivide the district bbox into a grid, query
 * /place/polygon per cell, and **point-in-polygon filter** results to the
 * district (so edge cells don't leak into neighbours). Dedup by POI id.
 *
 * Only processes entries flagged `capped` in poi.json. Key from .env.
 *   node scripts/refine-poi.mjs
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
  console.error('✗ AMAP_KEY missing in .env');
  process.exit(1);
}

const POI_PATH = resolve(ROOT, 'src/data/poi.json');
const BOUNDARY = (city) => resolve(ROOT, `public/boundaries/${city}.json`);

const GROUP_TYPES = {
  education: ['141201', '141202', '141203'],
  healthcare: ['090100', '090200'],
  transit: ['150500'],
  amenity: ['060100', '110101'],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';

async function fetchJson(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const d = await (await fetch(url, { headers: { 'User-Agent': UA } })).json();
      if (d.infocode === '10021') {
        await sleep(1200 * (attempt + 1));
        continue;
      }
      await sleep(450);
      return d;
    } catch {
      await sleep(800);
    }
  }
  return { status: '0' };
}

/** Count POIs of a typecode inside a polygon cell, paginated + deduped. */
async function countInPolygon(polygonStr, typecode) {
  const ids = new Set();
  const points = [];
  for (let page = 1; page <= 40; page++) {
    const url = `https://restapi.amap.com/v3/place/polygon?polygon=${polygonStr}&types=${typecode}&key=${KEY}&offset=25&page=${page}`;
    const d = await fetchJson(url);
    if (d.status !== '1') break;
    const pois = d.pois || [];
    for (const p of pois) {
      const id = p.id ?? `${p.location}|${p.name}`;
      if (!ids.has(id) && p.location) points.push({ id, loc: p.location });
      ids.add(id);
    }
    if (pois.length < 25) break;
  }
  return points;
}

/* ── point-in-polygon ── */
function inRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function inFeature(x, y, feat) {
  const g = feat.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  for (const poly of polys) {
    if (poly.length && inRing(x, y, poly[0])) return true; // outer ring; ignore holes
  }
  return false;
}
function bbox(feat) {
  let minX = 180, minY = 90, maxX = -180, maxY = -90;
  const walk = (ring) => {
    for (const [x, y] of ring) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  };
  const g = feat.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  polys.forEach((p) => p.forEach(walk));
  return { minX, minY, maxX, maxY };
}

async function refineDistrict(district, feat, groupsToRefine) {
  const { minX, minY, maxX, maxY } = bbox(feat);
  const N = 5; // 5×5 grid
  const dx = (maxX - minX) / N;
  const dy = (maxY - minY) / N;
  console.log(`  ${district.name}: bbox [${minX.toFixed(2)},${minY.toFixed(2)}→${maxX.toFixed(2)},${maxY.toFixed(2)}] → ${N}×${N} grid`);

  const newCounts = {};
  for (const group of groupsToRefine) {
    const typecodes = GROUP_TYPES[group];
    let total = 0;
    for (let tc of typecodes) {
      const seen = new Set();
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const x1 = minX + i * dx, y1 = minY + j * dy;
          const x2 = x1 + dx, y2 = y1 + dy;
          const poly = `${x1},${y1}|${x2},${y1}|${x2},${y2}|${x1},${y2}|${x1},${y1}`;
          const pts = await countInPolygon(poly, tc);
          for (const p of pts) {
            if (seen.has(p.id)) continue;
            const [px, py] = p.loc.split(',').map(Number);
            if (inFeature(px, py, feat)) {
              // also dedup across typecodes within the group
              seen.add(p.id);
              total++;
            }
          }
        }
      }
      process.stdout.write(`\r    ${group}/${tc}: ${total}`);
    }
    newCounts[group] = total;
    console.log('');
  }
  return newCounts;
}

async function main() {
  const poi = JSON.parse(readFileSync(POI_PATH, 'utf8'));
  let refined = 0;
  for (const city of Object.keys(poi)) {
    const bPath = BOUNDARY(city);
    if (!existsSync(bPath)) {
      console.log(`(${city}: no boundary file, skip)`);
      continue;
    }
    const fc = JSON.parse(readFileSync(bPath, 'utf8'));
    for (const d of poi[city].districts) {
      const cappedGroups = Object.keys(d.capped || {}).filter((g) => d.capped[g]);
      if (!cappedGroups.length) continue;
      const feat = fc.features.find((f) => String(f.properties?.adcode) === d.adcode);
      if (!feat) {
        console.log(`  ✗ ${d.name}: boundary not found`);
        continue;
      }
      console.log(`▶ ${city} / ${d.name} — refining: ${cappedGroups.join(', ')}`);
      const before = Object.fromEntries(cappedGroups.map((g) => [g, d.counts[g]]));
      const newCounts = await refineDistrict(d, feat, cappedGroups);
      for (const g of cappedGroups) {
        console.log(`    ${g}: ${before[g]} → ${newCounts[g]} ${newCounts[g] > before[g] ? '✓' : ''}`);
        d.counts[g] = newCounts[g];
        delete d.capped[g];
      }
      // recompute density with stored area
      for (const g of Object.keys(d.counts)) d.density[g] = +(d.counts[g] / d.area_km2).toFixed(2);
      refined++;
    }
  }
  if (refined) {
    writeFileSync(POI_PATH, JSON.stringify(poi, null, 2));
    console.log(`\n✓ refined ${refined} district(s), wrote ${POI_PATH}`);
  } else {
    console.log('nothing capped — nothing to refine');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
