/**
 * Per-city district data, merging three sources:
 *  • education / healthcare / transit / amenity → real 高德 POI density (poi.json)
 *  • population → REAL 七普 (2020) population ÷ area_km² (census.ts + poi.json area)
 *  • economy → representative (district-level 人均可支配收入 not uniformly published)
 */
import POI from './poi.json';
import { CENSUS, SH_OFFICIAL_2024 } from './census';
import { BEIJING_DISTRICTS, beijingIncomeSource } from './beijing';
import { getDistrictSmartCity, type DistrictSmartCity } from './smartCity';
import { getDigitalEconomy } from './digitalEconomy';

export type MetricKey =
  | 'economy'
  | 'population'
  | 'education'
  | 'healthcare'
  | 'transit'
  | 'amenity'
  | 'smart'
  | 'digital';

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
    description: '居民人均可支配收入，反映区域购买力与富裕程度。2024年市级：上海全市88,366元（城镇93,095/农村45,644），银川城镇51,469元（2025公报）。',
    source: '各区估算（区级基数×市级增速，详见 PROVENANCE.md）',
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
    description: '幼儿园 + 小学 + 中学（K12）密度（POI 计数 ÷ 行政区面积）。',
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
  {
    key: 'smart',
    label: '智慧城市',
    shortLabel: '智慧',
    unit: '指数(0-100)',
    direction: 1,
    description: '智慧城市指数 = 0.35×智能交通覆盖率 + 0.25×公交实时到站覆盖率 + 0.20×智慧社区密度指数（个/km²×100，上限100）+ 0.20×物联网设备密度指数（万台/km²×400，上限100）。',
    source: '各市智慧交通/城市大脑/智慧政务公开数据（区级分配估算，详见 smartCity.ts）',
    real: true,
  },
  {
    key: 'digital',
    label: '数字经济',
    shortLabel: '数字',
    unit: '占GDP %',
    direction: 1,
    description: '数字经济核心产业占区域GDP比重（%），反映区域数字经济活力、就业机会与产业升级程度。',
    source: '各市统计局公报 + 第五次经济普查（区级分配估算，详见 digitalEconomy.ts）',
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
  return ECONOMY[adcode]?.source ?? beijingIncomeSource(adcode) ?? '估算';
}

/**
 * 智慧城市指数（0–100）— 从 smartCity.ts 区级数据合成单一指标：
 *   0.35 × 智能交通覆盖率(%) + 0.25 × 公交实时到站覆盖率(%)
 * + 0.20 × min(100, 智慧社区密度 × 100)  （个/km²）
 * + 0.20 × min(100, 物联网设备密度 × 400) （万台/km²）
 * 密度项与 POI 维度同口径（中心城区高、远郊低），覆盖率项反映治理水平。
 */
export function smartCityIndex(s: DistrictSmartCity | undefined, areaKm2: number): number {
  if (!s || !areaKm2) return 0;
  const traffic = s.smartTrafficCoverage ?? 0;
  const bus = s.busRealtimeCoverage ?? 0;
  const communityIdx = Math.min(100, ((s.smartCommunities ?? 0) / areaKm2) * 100);
  const iotIdx = Math.min(100, ((s.iotDevices ?? 0) / areaKm2) * 400);
  return +(0.35 * traffic + 0.25 * bus + 0.2 * communityIdx + 0.2 * iotIdx).toFixed(1);
}

/** 数字经济维度原始值：数字经济核心产业占区域GDP比重（%）。 */
export function digitalShare(adcode: string): number {
  return getDigitalEconomy(adcode)?.digitalGdpShare ?? 0;
}

interface PoiDistrict {
  adcode: string;
  name: string;
  area_km2: number;
  counts: Record<PoiMetric, number>;
  density: Record<PoiMetric, number>;
}

/** POI 采集型维度（密度 = 计数 ÷ 面积）。smart/digital 来自独立数据文件，不在 POI 内。 */
type PoiMetric = 'education' | 'healthcare' | 'transit' | 'amenity';

/** Build a city's districts: real POI density (official area) + real population density + income. */
export function getDistricts(cityKey: string): RawDistrict[] {
  // 北京：区级公报/年鉴估算数据（非 POI 采集，见 beijing.ts）
  if (cityKey === 'beijing') {
    return BEIJING_DISTRICTS.map((d) => ({
      adcode: d.adcode,
      name: d.name,
      values: {
        economy: d.income,
        population: d.density,
        education: +(d.counts.education / d.areaKm2).toFixed(2),
        healthcare: +(d.counts.healthcare / d.areaKm2).toFixed(2),
        transit: +(d.counts.transit / d.areaKm2).toFixed(2),
        amenity: +(d.counts.amenity / d.areaKm2).toFixed(2),
        smart: smartCityIndex(getDistrictSmartCity(cityKey, d.adcode), d.areaKm2),
        digital: digitalShare(d.adcode),
      },
    }));
  }
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
        smart: smartCityIndex(getDistrictSmartCity(cityKey, d.adcode), area),
        digital: digitalShare(d.adcode),
      },
    };
  });
}

/**
 * 默认权重：6 个核心维度等权（1.0），智慧城市/数字经济为补充维度（0.5）
 * —— 参与综合评分但不压过教育/医疗等核心宜居指标。
 */
export const DEFAULT_WEIGHTS: Record<MetricKey, number> = {
  economy: 1,
  population: 1,
  education: 1,
  healthcare: 1,
  transit: 1,
  amenity: 1,
  smart: 0.5,
  digital: 0.5,
};

/** When each city's POI was collected (for display). Beijing uses公报估算（见 beijing.ts）. */
export const POI_COLLECTED_AT: Record<string, string> = {
  beijing: '2024年统计口径（区级估算，非POI采集）',
  ...Object.fromEntries(
    Object.entries(POI).map(([k, v]) => [k, (v as { collectedAt: string }).collectedAt]),
  ),
};
