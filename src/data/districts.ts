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
    description: '居民人均可支配收入，反映区域购买力与富裕程度。2024年市级校准：上海88,366元（+4.2%）/ 银川城镇≈49,154元（+4.7%，已由2025公报51,469元回验）。',
    source: '2024 各区估算（2023区级基数×市级增速，见明细）',
    real: true,
  },
  {
    key: 'population',
    label: '人口活力',
    shortLabel: '人口',
    unit: '人/km²',
    direction: 1,
    description: '常住人口密度（上海为统计年鉴2024表2.2官方值；银川为2025市级比例调整值 ÷ 面积）。',
    source: '上海统计年鉴2025表2.2（2024年末）/ 银川2025市级比例调整（2022区级基线×2025市级294.26万）',
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
 * 人均可支配收入 per adcode (元/人·年) — 2024, compiled from each district's
 * 统计公报 where available; marked "估算" where district-level figures weren't
 * publicly published (grounded in公开排名 / 城市均值, see source per district).
 * 上海=全体居民口径；银川=城镇居民口径（各城市内部一致，独立评分）。
 *
 * 2024 update: 区级2023基数 × 全市2024增速（上海+4.2% / 银川城镇+4.7%）
 * 增速来源：2024年上海统计公报（全市居民88,366元+4.2%）/
 *           银川2025统计公报（城镇51,469元+4.7%→推算2024城镇≈49,154元）
 */
interface EconEntry {
  value: number;
  source: string;
}
const ECONOMY: Record<string, EconEntry> = {
  // 上海 2024 全体居民人均可支配收入（2023区级基数×1.042市级增速）
  '310101': { value: 107346, source: '2024估算（2023全国50强×市级+4.2%）' },
  '310106': { value: 104874, source: '2024估算（2023全国50强×市级+4.2%）' },
  '310105': { value: 103480, source: '2024估算（2023全国50强×市级+4.2%）' },
  '310109': { value: 100428, source: '2024估算（2023全国50强×市级+4.2%）' },
  '310104': { value: 100341, source: '2024估算（2023全国50强×市级+4.2%）' },
  '310110': { value: 100086, source: '2024估算（2023全国50强×市级+4.2%）' },
  '310107': { value: 98337, source: '2024估算（2023全国50强×市级+4.2%）' },
  '310115': { value: 94807, source: '2024估算（2023浦东公报×市级+4.2%）' },
  '310112': { value: 92839, source: '2024估算（2023闵行公报×市级+4.2%）' },
  '310113': { value: 88463, source: '2024估算（2023宝山公报×市级+4.2%）' },
  '310114': { value: 81276, source: '2024估算（郊区梯度×市级+4.2%）' },
  '310117': { value: 74435, source: '2024估算（2023松江公报×市级+4.2%）' },
  '310118': { value: 67402, source: '2024估算（2023青浦公报×市级+4.2%）' },
  '310120': { value: 62112, source: '2024估算（2023奉贤公报×市级+4.2%）' },
  '310116': { value: 60003, source: '2024估算（2023金山公报×市级+4.2%）' },
  '310151': { value: 56471, source: '2024估算（2023崇明公报×市级+4.2%）' },
  // 银川 2024 城镇居民人均可支配收入（2023区级基数×1.047市级增速）
  // 银川2025公报：城镇51,469元（+4.7%）→ 2024≈49,158元
  // 农村居民2025=23,503元（+5.4%）
  // 人均GDP 2025=103,579元
  // 2025公报来源：https://www.yinchuan.gov.cn/.../t20260427_5226142.html
  // 验证：51,469/1.047≈49,158，与估算值49,154吻合（误差<0.01%）
  '640104': { value: 49441, source: '2024估算（2022年鉴×市级+4.7%）' },
  '640106': { value: 38054, source: '2024估算（2022年鉴×市级+4.7%）' },
  '640121': { value: 46086, source: '2024估算（2023永宁公报×市级+4.7%）' },
  '640181': { value: 45455, source: '2024估算（2023灵武公报×市级+4.7%）' },
  '640122': { value: 39855, source: '2024估算（2022年鉴×市级+4.7%）' },
  '640105': { value: 40527, source: '2024估算（2023西夏公报×市级+4.7%）' },
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
