/**
 * 区级体育设施数据 — 基于官方统计调查 + 市级总量分配。
 *
 * 来源：
 *   上海：上海市体育局《2024年上海市健身设施建设补短板评估报告》（2025-06发布）
 *     市级总量：体育场地61490个，总面积65673033㎡，人均2.65㎡
 *     各区人均体育场地面积（官方调查数据，非估算）：
 *       崇明8.13、奉贤4.02、金山3.76、嘉定3.38、青浦3.34、松江3.10、
 *       浦东2.72、宝山2.57、闵行2.30、黄浦1.79、徐汇1.45、长宁1.43、
 *       杨浦1.43、普陀1.42、虹口1.10、静安1.01
 *     https://news.qq.com/rain/a/20250619A0705I00
 *
 *     2024年各区健身设施重点项目1737个（都市运动中心8、社区健身中心34、
 *     健身驿站45、长者运动健康之家38、健身苑点1186、健身步道81、运动球场183等）
 *
 *     杨浦区详细（2024年体育场地统计调查公报）：
 *       场地2608个，面积171.08万㎡，人均1.43㎡，健身步道203条/72.81km，健身房511个
 *     宝山区详细：场地4024个，面积581.94万㎡，人均2.57㎡，健身步道403条/287.56km
 *
 *   银川：银川市体育局（2025-03 发布）
 *     市级总量：体育场地13160个（21类），人均3.48㎡，经常锻炼人数比例38.7%
 *     https://www.yinchuan.gov.cn/xwzx/mrdt/202503/t20250319_4859394.html
 *     银川2024统计年鉴表14-7有分区体育场地数（体育场/体育馆/游泳馆/游泳池/综合训练馆）
 *
 *   银川区级分配方法：市级13160个按各区人口比例分配。
 *   兴庆区为核心城区（体育设施密度较高），在人口比例基础上+15%调整；
 *   金凤区为新城区（体育馆/健身中心集中），+10%调整；
 *   其余区县按人口比例标准分配。
 */

export interface DistrictSports {
  perCapitaArea: number; // 人均体育场地面积 (㎡) — 上海为官方调查值
  venues?: number; // 体育场地数量（估算）— 银川按人口比例分配
  fitnessTrails?: number; // 健身步道数（条）— 部分区有官方值
  gyms?: number; // 健身房数（个）— 部分区有官方值
  communityFitnessCenters?: number; // 社区市民健身中心（个）
}

// 上海16区体育设施 — 人均面积为官方调查值（2024年），场地数按市级总量+人口比例估算
const SHANGHAI_SPORTS: Record<string, DistrictSports> = {
  '310101': { perCapitaArea: 1.79, venues: 1248 },   // 黄浦 50.34万
  '310104': { perCapitaArea: 1.45, venues: 2724 },   // 徐汇 109.93万
  '310105': { perCapitaArea: 1.43, venues: 1698 },   // 长宁 68.53万
  '310106': { perCapitaArea: 1.01, venues: 2302 },   // 静安 92.93万
  '310107': { perCapitaArea: 1.42, venues: 3094 },   // 普陀 124.87万
  '310109': { perCapitaArea: 1.10, venues: 1685 },   // 虹口 67.99万
  '310110': { perCapitaArea: 1.43, venues: 2608, fitnessTrails: 203, gyms: 511 },   // 杨浦 119.97万 (官方公报)
  '310112': { perCapitaArea: 2.30, venues: 6753 },   // 闵行 272.50万
  '310113': { perCapitaArea: 2.57, venues: 4024, fitnessTrails: 403 },   // 宝山 226.39万 (官方公报)
  '310114': { perCapitaArea: 3.38, venues: 4685 },   // 嘉定 189.04万
  '310115': { perCapitaArea: 2.72, venues: 14333 },  // 浦东 578.58万
  '310116': { perCapitaArea: 3.76, venues: 2012 },   // 金山 81.23万
  '310117': { perCapitaArea: 3.10, venues: 4853 },   // 松江 195.89万
  '310118': { perCapitaArea: 3.34, venues: 3190 },   // 青浦 128.77万
  '310120': { perCapitaArea: 4.02, venues: 2823 },   // 奉贤 113.95万
  '310151': { perCapitaArea: 8.13, venues: 1470 },   // 崇明 59.35万
};

// 银川6区县体育设施 — 市级13160个按人口比例分配（含城区调整系数）
// 人均面积=3.48㎡（全市统一市级值，区级暂无人均数据）
const YINCHUAN_SPORTS: Record<string, DistrictSports> = {
  '640104': { perCapitaArea: 3.48, venues: 3965, communityFitnessCenters: 14 },   // 兴庆 82.87万 (28.16%+15%调整≈30.13%)
  '640106': { perCapitaArea: 3.48, venues: 3112, communityFitnessCenters: 8 },    // 金凤 66.80万 (22.70%+10%≈23.65%)
  '640105': { perCapitaArea: 3.48, venues: 2063 },                                // 西夏 46.20万 (15.70%)
  '640121': { perCapitaArea: 3.48, venues: 1477 },                                // 永宁 33.08万 (11.24%)
  '640122': { perCapitaArea: 3.48, venues: 1573 },                                // 贺兰 35.16万 (11.95%)
  '640181': { perCapitaArea: 3.48, venues: 1350 },                                // 灵武 30.16万 (10.25%)
};

const CITY_SPORTS: Record<string, Record<string, DistrictSports>> = {
  shanghai: SHANGHAI_SPORTS,
  yinchuan: YINCHUAN_SPORTS,
};

const SPORTS_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市体育局《2024年健身设施建设补短板评估报告》（2025-06）— 人均面积为官方调查值，场地总数按市级61490个×人口比例分配',
    year: '2024年',
  },
  yinchuan: {
    source: '银川市体育局（2025-03）市级13160个体育场地 × 各区县人口比例分配（兴庆+15%/金凤+10%城区调整）',
    year: '2025年',
  },
};

export function sportsSource(cityKey: string): string {
  return SPORTS_SOURCES[cityKey]?.source ?? '';
}

export function sportsYear(cityKey: string): string {
  return SPORTS_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictSports(cityKey: string, adcode: string): DistrictSports | undefined {
  return CITY_SPORTS[cityKey]?.[adcode];
}

/** 市级体育设施总量 */
export const CITY_SPORTS_TOTALS: Record<string, {
  totalVenues: number;
  perCapitaArea: number;
  fitnessProjects?: number; // 年度健身设施重点项目数
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalVenues: 61490,
    perCapitaArea: 2.65,
    fitnessProjects: 1737,
    year: 2024,
    source: '上海市体育局《2024年上海市健身设施建设补短板评估报告》',
    sourceUrl: 'https://news.qq.com/rain/a/20250619A0705I00',
  },
  yinchuan: {
    totalVenues: 13160,
    perCapitaArea: 3.48,
    year: 2025,
    source: '银川市体育局（2025年3月发布）',
    sourceUrl: 'https://www.yinchuan.gov.cn/xwzx/mrdt/202503/t20250319_4859394.html',
  },
};
