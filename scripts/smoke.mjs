import { readFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = path.resolve(new URL('..', import.meta.url).pathname);
const distRoot = path.join(projectRoot, 'dist');
const failures = [];
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) failures.push(message);
}

function assertDeepEqual(actual, expected, message) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  assert(actualJson === expectedJson, `${message} (actual=${actualJson}, expected=${expectedJson})`);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function decodeAstroValue(value) {
  if (!Array.isArray(value) || typeof value[0] !== 'number' || value.length < 2) {
    if (Array.isArray(value)) return value.map(decodeAstroValue);
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, nested]) => [key, decodeAstroValue(nested)]),
      );
    }
    return value;
  }
  const type = value[0];
  if (type === 0) return decodeAstroValue(value[1]);
  if (type === 1) return value[1].map(decodeAstroValue);
  return value;
}

function decodeAstroProps(encodedProps) {
  const raw = JSON.parse(decodeHtmlEntities(encodedProps));
  return Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, decodeAstroValue(value)]),
  );
}

async function readPage(relativePath) {
  const file = path.join(distRoot, relativePath);
  return { file, html: await readFile(file, 'utf8') };
}

async function readIsland(relativePath, componentExport) {
  const { file, html } = await readPage(relativePath);
  const island = html.match(/<astro-island\b[^>]*>/g)?.find((tag) =>
    tag.includes(`component-export="default"`) && tag.includes(`/${componentExport}.`),
  );
  assert(Boolean(island), `${relativePath}: should contain ${componentExport} island`);
  if (!island) throw new Error(`${relativePath}: ${componentExport} island is missing`);

  const propsMatch = island.match(/\sprops="([^"]*)"/);
  assert(Boolean(propsMatch), `${relativePath}: island should serialize props`);
  if (!propsMatch) throw new Error(`${relativePath}: island props are missing`);

  return { html, props: decodeAstroProps(propsMatch[1]), file };
}

const cityExpectations = [
  { key: 'shanghai', name: '上海', districtCount: 16 },
  { key: 'beijing', name: '北京', districtCount: 16 },
  { key: 'yinchuan', name: '银川', districtCount: 6 },
];
const expectedMetricKeys = [
  'economy',
  'population',
  'education',
  'healthcare',
  'transit',
  'amenity',
  'smart',
  'digital',
];
const expectedPresetSlugs = ['balanced', 'families', 'young-pros', 'retirement'];

function topDistrictIds(districts, weights) {
  return [...districts]
    .map((district) => {
      let numerator = 0;
      let denominator = 0;
      for (const key of expectedMetricKeys) {
        const weight = weights[key] ?? 0;
        numerator += weight * district.metrics[key].score;
        denominator += weight;
      }
      return { adcode: district.adcode, composite: denominator > 0 ? numerator / denominator : 0 };
    })
    .sort((left, right) => right.composite - left.composite)
    .slice(0, 3)
    .map((row) => row.adcode);
}

function parseCompareState(query, presets, districts) {
  const params = new URLSearchParams(query);
  const fallback = presets.find((preset) => preset.slug === 'balanced') ?? presets[0];
  const requestedPreset = presets.find((preset) => preset.slug === params.get('preset'));
  const preset = requestedPreset ?? fallback;
  const requestedDistricts = (params.get('districts') ?? '')
    .split(',')
    .filter((adcode) => districts.some((district) => district.adcode === adcode))
    .slice(0, 3);

  return {
    presetSlug: preset.slug,
    selected:
      requestedDistricts.length > 0
        ? requestedDistricts
        : preset.slug === 'balanced'
          ? topDistrictIds(districts, fallback.weights)
          : topDistrictIds(districts, preset.weights),
  };
}

function serializeCompareState(state, balancedTop3) {
  const params = new URLSearchParams();
  if (state.presetSlug !== 'balanced') params.set('preset', state.presetSlug);
  if (state.selected.join(',') !== balancedTop3.join(',') || params.size > 0) {
    params.set('districts', state.selected.join(','));
  }
  return params.toString();
}

for (const expectedCity of cityExpectations) {
  const relativePath = `${expectedCity.key}/compare/index.html`;
  const { html, props } = await readIsland(relativePath, 'CompareTool');
  const districts = props.districts;
  const presets = props.presets;

  assert(Array.isArray(districts), `${relativePath}: districts prop should be an array`);
  assert(
    districts.length === expectedCity.districtCount,
    `${relativePath}: expected ${expectedCity.districtCount} districts, got ${districts.length}`,
  );
  assert(
    new Set(districts.map((district) => district.adcode)).size === districts.length,
    `${relativePath}: district adcodes should be unique`,
  );
  assert(
    districts.every((district) => district.metrics && expectedMetricKeys.every((key) => (
      Number.isFinite(district.metrics[key]?.score)
      && Number.isFinite(district.metrics[key]?.rawValue)
    ))),
    `${relativePath}: every district should expose finite scores and raw values for all 8 metrics`,
  );
  assertDeepEqual(
    presets.map((preset) => preset.slug),
    expectedPresetSlugs,
    `${relativePath}: preset list should be complete`,
  );
  assert(
    presets.every((preset) => {
      const keys = Object.keys(preset.weights).sort();
      return (
        JSON.stringify(keys) === JSON.stringify([...expectedMetricKeys].sort())
        && expectedMetricKeys.every((key) => Number.isFinite(preset.weights[key]) && preset.weights[key] > 0)
      );
    }),
    `${relativePath}: every preset should cover all metric weights`,
  );

  const balanced = presets.find((preset) => preset.slug === 'balanced');
  const balancedTop3 = topDistrictIds(districts, balanced.weights);
  const defaultState = parseCompareState('', presets, districts);
  assertDeepEqual(
    defaultState,
    { presetSlug: 'balanced', selected: balancedTop3 },
    `${relativePath}: empty URL should resolve balanced defaults`,
  );
  assert(
    serializeCompareState(defaultState, balancedTop3) === '',
    `${relativePath}: balanced default URL should stay clean`,
  );

  for (const preset of presets.filter((item) => item.slug !== 'balanced')) {
    const expected = { presetSlug: preset.slug, selected: topDistrictIds(districts, preset.weights) };
    const query = serializeCompareState(expected, balancedTop3);
    assert(
      new URLSearchParams(query).get('preset') === preset.slug
        && new URLSearchParams(query).get('districts') === expected.selected.join(','),
      `${relativePath}: ${preset.slug} share URL should contain preset and districts`,
    );
    assertDeepEqual(
      parseCompareState(query, presets, districts),
      expected,
      `${relativePath}: ${preset.slug} share URL should round-trip`,
    );
  }

  const firstTwo = districts.slice(0, 2).map((district) => district.adcode);
  const custom = { presetSlug: 'balanced', selected: firstTwo };
  assertDeepEqual(
    parseCompareState(serializeCompareState(custom, balancedTop3), presets, districts),
    custom,
    `${relativePath}: custom district selection should round-trip`,
  );
  assertDeepEqual(
    parseCompareState('?preset=unknown&districts=invalid,301101', presets, districts),
    defaultState,
    `${relativePath}: invalid preset and district should fall back to defaults`,
  );
  for (const preset of presets) {
    assert(html.includes(preset.title), `${relativePath}: DOM should render ${preset.title}`);
  }
  assert(html.includes('复制分享链接'), `${relativePath}: DOM should expose share-link copy action`);
}

const { html: filterHtml, props: filterProps } = await readIsland('filter/index.html', 'FilterTool');
assertDeepEqual(
  filterProps.metricKeys,
  expectedMetricKeys,
  'filter: metric key order should remain stable',
);
assertDeepEqual(
  filterProps.cities.map((city) => city.key),
  cityExpectations.map((city) => city.key),
  'filter: city list should be complete',
);
assert(filterProps.entries.length === 38, `filter: expected 38 entries, got ${filterProps.entries.length}`);
for (const expectedCity of cityExpectations) {
  const entries = filterProps.entries.filter((entry) => entry.cityKey === expectedCity.key);
  assert(
    entries.length === expectedCity.districtCount,
    `filter/${expectedCity.key}: expected ${expectedCity.districtCount} entries, got ${entries.length}`,
  );
  assert(
    entries.every((entry) => entry.cityName === expectedCity.name
      && expectedMetricKeys.every((key) => Number.isFinite(entry.metrics[key]?.score))),
    `filter/${expectedCity.key}: entries should carry city name and finite metric scores`,
  );
}
assert(
  new Set(filterProps.entries.map((entry) => `${entry.cityKey}:${entry.adcode}`)).size
    === filterProps.entries.length,
  'filter: city + adcode combinations should be unique',
);

const defaultFilterState = {
  city: 'all',
  grades: [],
  thresholds: Object.fromEntries(expectedMetricKeys.map((key) => [key, 0])),
  sort: 'composite',
  desc: true,
};

function parseFilterState(query) {
  const params = new URLSearchParams(query);
  const city = params.get('city');
  const grades = (params.get('grades') ?? '')
    .split(',')
    .filter((grade) => ['S', 'A', 'B', 'C', 'D'].includes(grade));
  const thresholds = Object.fromEntries(expectedMetricKeys.map((key) => [key, 0]));
  for (const key of expectedMetricKeys) {
    const raw = params.get(`min_${key}`);
    if (raw === null) continue;
    const parsed = Number.parseInt(raw, 10);
    thresholds[key] = Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : 0;
  }
  const sort = params.get('sort');
  const desc = params.get('desc');
  return {
    city: city && filterProps.cities.some((option) => option.key === city) ? city : 'all',
    grades,
    thresholds,
    sort: sort === 'composite' || expectedMetricKeys.includes(sort) ? sort : 'composite',
    desc: desc === null ? true : desc !== '0',
  };
}

function serializeFilterState(state) {
  const params = new URLSearchParams();
  if (state.city !== 'all') params.set('city', state.city);
  if (state.grades.length > 0) params.set('grades', state.grades.join(','));
  for (const key of expectedMetricKeys) {
    if (state.thresholds[key] > 0) params.set(`min_${key}`, String(state.thresholds[key]));
  }
  if (state.sort !== 'composite') params.set('sort', state.sort);
  if (!state.desc) params.set('desc', '0');
  return params.toString();
}

assertDeepEqual(parseFilterState(''), defaultFilterState, 'filter: empty URL should resolve defaults');
assert(serializeFilterState(defaultFilterState) === '', 'filter: default URL should stay clean');

const customFilterState = {
  city: 'yinchuan',
  grades: ['A', 'B'],
  thresholds: Object.fromEntries(
    expectedMetricKeys.map((key) => [key, key === 'economy' ? 70 : 0]),
  ),
  sort: 'digital',
  desc: false,
};
const customFilterQuery = serializeFilterState(customFilterState);
assertDeepEqual(
  parseFilterState(customFilterQuery),
  customFilterState,
  'filter: custom share URL should round-trip',
);
assertDeepEqual(
  parseFilterState('?city=unknown&grades=X,A&min_education=bad&min_healthcare=999&sort=unknown&desc=whatever'),
  {
    ...defaultFilterState,
    grades: ['A'],
    thresholds: {
      ...defaultFilterState.thresholds,
      healthcare: 100,
    },
  },
  'filter: invalid URL values should clamp to safe defaults',
);
assert(
  (filterHtml.match(/不限/g) ?? []).length === expectedMetricKeys.length,
  'filter: DOM should show all eight default unlimited thresholds',
);
for (const city of filterProps.cities) {
  assert(filterHtml.includes(city.name), `filter: DOM should render ${city.name} option`);
}
assert(filterHtml.includes('复制分享链接'), 'filter: DOM should expose share-link copy action');

const { html: digitalHtml, props: digitalProps } = await readIsland(
  'digital/index.html',
  'DigitalScenarioTool',
);
assertDeepEqual(
  digitalProps.metrics.map((metric) => metric.key),
  ['smartAverage', 'officialDigitalShare', 'coreIndustryEmployees', 'digitalCompanies', 'fiveGStations'],
  'digital: scenario metric list should be complete',
);
assertDeepEqual(
  digitalProps.cities.map((city) => city.key),
  cityExpectations.map((city) => city.key),
  'digital: scenario city list should be complete',
);
assert(
  digitalProps.cities.every((city) => Number.isFinite(city.populationWan) && city.populationWan > 0),
  'digital: every city should expose a positive population denominator',
);
for (const scenarioTitle of ['总量口径', '人均口径', '三城相对值']) {
  assert(digitalHtml.includes(scenarioTitle), `digital: DOM should render ${scenarioTitle}`);
}

if (failures.length > 0) {
  console.error(`Smoke failed (${failures.length}/${checks} checks failed):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Smoke passed: ${checks} checks across compare/filter/digital dist islands.`);
