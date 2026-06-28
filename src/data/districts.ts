/**
 * Per-city district data, merging three sources:
 *  • education / healthcare / transit / amenity → real 高德 POI density (poi.json)
 *  • population → REAL 七普 (2020) population ÷ area_km² (census.ts + poi.json area)
 *  • economy → representative (district-level 人均可支配收入 not uniformly published)
 */
import POI from './poi.json';
import { CENSUS, SH_OFFICIAL_2024 } from './census';

export type MetricKey =
  | 'economy'
  | 'population'
  | 'education'
  | 'healthcare'
  | 'transit'
  | 'amenity';

export interface MetricDef {
  key: MetricKey;
  label: string;
  shortLabel: string;
  unit: string;
  direction: 1 | -1;
  description: string;
  source: string;
  real: boolean;
}

export const METRICS: MetricDef[] = [
  {
    key: 'economy',
    label: '经济购买力',
    shortLabel: '经济',
    unit: '元/人·年',
    direction: 1,
    description: '居民人均可支配收入，反映区域购买力与富裕程度。',
    source: '2023 各区统计公报（部分为估算，见明细）',
    real: true,
  },
  {
    key: 'population',
    label: '人口活力',
    shortLabel: '人口',
    unit: '人/km²',
    direction: 1,
    description: '常住人口密度（上海为统计年鉴官方值；银川为宁夏年鉴人口 ÷ 面积）。',
    source: '上海统计年鉴2024 表2.2（2024年末）/ 银川宁夏年鉴2022',
    real: true,
  },
  {
    key: 'education',
    label: '教育资源',
    shortLabel: '教育',
    unit: '所/km²',
    direction: 1,
    description: '高校 + 中学 + 小学 密度（POI 计数 ÷ 行政区面积）。',
    source: '高德 POI',
    real: true,
  },
  {
    key: 'healthcare',
    label: '医疗水平',
    shortLabel: '医疗',
    unit: '所/km²',
    direction: 1,
    description: '综合 + 专科医院 密度（POI 计数 ÷ 行政区面积）。',
    source: '高德 POI',
    real: true,
  },
  {
    key: 'transit',
    label: '交通便利',
    shortLabel: '交通',
    unit: '站/km²',
    direction: 1,
    description: '地铁站 密度（POI 计数 ÷ 行政区面积）。',
    source: '高德 POI',
    real: true,
  },
  {
    key: 'amenity',
    label: '生活便利',
    shortLabel: '生活',
    unit: '个/km²',
    direction: 1,
    description: '商场 + 公园广场 密度（POI 计数 ÷ 行政区面积）。',
    source: '高德 POI',
    real: true,
  },
];

export interface RawDistrict {
  adcode: string;
  name: string;
  values: Record<MetricKey, number>;
}

/**
 * 人均可支配收入 per adcode (元/人·年) — 2023, compiled from each district's
 * 统计公报 where available; marked "估算" where district-level figures weren't
 * publicly published (grounded in公开排名 / 城市均值, see source per district).
 * 上海=全体居民口径；银川=城镇居民口径（各城市内部一致，独立评分）。
 */
interface EconEntry {
  value: number;
  source: string;
}
const ECONOMY: Record<string, EconEntry> = {
  // 上海 2023 全体居民人均可支配收入（中心城区来自全国区县50强榜单，郊区来自各区公报）
  '310101': { value: 103019, source: '2023 全国区县人均收入50强' },
  '310106': { value: 100647, source: '2023 全国区县人均收入50强' },
  '310105': { value: 99305, source: '2023 全国区县人均收入50强' },
  '310109': { value: 96380, source: '2023 全国区县人均收入50强' },
  '310104': { value: 96296, source: '2023 全国区县人均收入50强' },
  '310110': { value: 96052, source: '2023 全国区县人均收入50强' },
  '310107': { value: 94373, source: '2023 全国区县人均收入50强' },
  '310115': { value: 90985, source: '2023 浦东新区统计公报' },
  '310112': { value: 89089, source: '2023 闵行区统计公报' },
  '310113': { value: 84898, source: '2023 宝山区统计公报' },
  '310114': { value: 78000, source: '估算（嘉定公报未公布·参照郊区梯度）' },
  '310117': { value: 71435, source: '2023 松江区统计公报' },
  '310118': { value: 64685, source: '2023 青浦区统计公报' },
  '310120': { value: 59605, source: '2023 奉贤区统计公报' },
  '310116': { value: 57584, source: '2023 金山区统计公报' },
  '310151': { value: 54195, source: '2023 崇明区统计公报' },
  // 银川 城镇居民人均可支配收入（统一城镇口径：公报2023 + 宁夏统计年鉴2022）
  '640104': { value: 47222, source: '宁夏统计年鉴2022（城镇）' },
  '640106': { value: 36346, source: '宁夏统计年鉴2022（城镇）' },
  '640121': { value: 44017, source: '2023 永宁县统计公报（城镇）' },
  '640181': { value: 43415, source: '2023 灵武市统计公报（城镇）' },
  '640122': { value: 38066, source: '宁夏统计年鉴2022（城镇）' },
  '640105': { value: 38708, source: '2023 西夏区统计公报（城镇）' },
};

export function economySource(adcode: string): string {
  return ECONOMY[adcode]?.source ?? '估算';
}

interface PoiDistrict {
  adcode: string;
  name: string;
  area_km2: number;
  counts: Record<Exclude<MetricKey, 'economy' | 'population'>, number>;
  density: Record<Exclude<MetricKey, 'economy' | 'population'>, number>;
}

type PoiMetric = Exclude<MetricKey, 'economy' | 'population'>;

/** Build a city's districts: real POI density (official area) + real population density + income. */
export function getDistricts(cityKey: string): RawDistrict[] {
  const poi = (POI as Record<string, { districts: PoiDistrict[]; collectedAt: string }>)[cityKey];
  const census = CENSUS[cityKey];
  if (!poi) return [];
  const isSH = cityKey === 'shanghai';
  return poi.districts.map((d) => {
    // official area (excludes water) where available → more accurate density
    const off = isSH ? SH_OFFICIAL_2024[d.adcode] : undefined;
    const area = off?.area_km2 ?? d.area_km2;
    const popDensity = off?.density
      ?? (census?.pop[d.adcode] && d.area_km2 ? Math.round(census.pop[d.adcode] / d.area_km2) : 0);
    const dens = (k: PoiMetric) => +(d.counts[k] / area).toFixed(2);
    return {
      adcode: d.adcode,
      name: d.name,
      values: {
        economy: ECONOMY[d.adcode]?.value ?? 50000,
        population: popDensity,
        education: dens('education'),
        healthcare: dens('healthcare'),
        transit: dens('transit'),
        amenity: dens('amenity'),
      },
    };
  });
}

export const DEFAULT_WEIGHTS: Record<MetricKey, number> = {
  economy: 1,
  population: 1,
  education: 1,
  healthcare: 1,
  transit: 1,
  amenity: 1,
};

/** When each city's POI was collected (for display). */
export const POI_COLLECTED_AT: Record<string, string> = Object.fromEntries(
  Object.entries(POI).map(([k, v]) => [k, (v as { collectedAt: string }).collectedAt]),
);
