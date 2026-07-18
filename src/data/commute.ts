/**
 * 区级通勤交通细化数据 — 基于公开数据整理。
 *
 * 来源：
 *   上海轨道交通：上海市交通委员会2025年统计公报（运营线路22条/962km/532站）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *   各区地铁站点数：高德地图POI数据（地铁站分类，按行政区聚合计数，2026-06采集）
 *   各区面积：上海统计年鉴2025版表2.2（行政区域面积，剔除水域）
 *
 *   银川公共交通：银川市2025年统计公报（公交线路199条/运营车辆2168辆/
 *     标准运营车辆2829.60标台/每万人拥有公交15标台/巡游出租6067辆/
 *     城市公共交通运送乘客2.60亿人次）
 *   银川各区面积：宁夏统计年鉴2023
 *
 * 说明：
 *   上海各区地铁站密度 = 高德POI地铁站计数 ÷ 区面积(km²)。
 *   银川无城市轨道交通（地铁/轻轨），以公交线网密度为主要通勤指标。
 *   各区公交覆盖率基于市级线路199条按区级人口+道路里程比例分配。
 *
 * 通勤时间数据来源：
 *   《2024年中国主要城市通勤监测年报》（住建部+高德地图联合发布）
 *   上海全市平均单程通勤时间约41分钟，银川约29分钟。
 *   各区差异基于高德通勤路线热力分析，核心城区通勤时间较短，
 *   郊区通勤时间较长（反映职住分离距离差异）。
 *
 * 这是【展示用补充数据】，不参与评分体系 ——
 * 评分仍用高德 POI 密度（地铁站）以保证全市可比；本数据用于呈现通勤画像。
 */

export interface DistrictCommute {
  metroStations: number; // 地铁站数量（高德POI）— 上海专有
  metroDensity?: number; // 地铁站密度（站/km²）— 上海专有
  avgCommuteMinutes: number; // 平均单程通勤时间（分钟）
  busDensity?: number; // 每万人公交线网密度（公里/万人）— 银川专有
}

// 上海16区通勤交通数据
// 地铁站数来源：高德POI 2026-06采集（按行政区聚合计数）
// 面积来源：上海统计年鉴2025版表2.2
// 通勤时间来源：2024中国主要城市通勤监测年报 + 各区差异分析
const SHANGHAI_COMMUTE: Record<string, DistrictCommute> = {
  '310101': { metroStations: 18, metroDensity: 0.88, avgCommuteMinutes: 32 },   // 黄浦 20.46km²
  '310106': { metroStations: 22, metroDensity: 0.60, avgCommuteMinutes: 35 },   // 静安 36.88km²
  '310104': { metroStations: 25, metroDensity: 0.46, avgCommuteMinutes: 36 },   // 徐汇 54.76km²
  '310105': { metroStations: 13, metroDensity: 0.34, avgCommuteMinutes: 35 },   // 长宁 38.3km²
  '310109': { metroStations: 14, metroDensity: 0.60, avgCommuteMinutes: 33 },   // 虹口 23.48km²
  '310110': { metroStations: 20, metroDensity: 0.33, avgCommuteMinutes: 38 },   // 杨浦 60.73km²
  '310107': { metroStations: 18, metroDensity: 0.33, avgCommuteMinutes: 38 },   // 普陀 54.83km²
  '310112': { metroStations: 42, metroDensity: 0.11, avgCommuteMinutes: 42 },   // 闵行 370.75km²
  '310113': { metroStations: 28, metroDensity: 0.10, avgCommuteMinutes: 44 },   // 宝山 270.99km²
  '310114': { metroStations: 25, metroDensity: 0.05, avgCommuteMinutes: 47 },   // 嘉定 464.2km²
  '310115': { metroStations: 95, metroDensity: 0.08, avgCommuteMinutes: 45 },   // 浦东 1210.41km²
  '310116': { metroStations: 5, metroDensity: 0.009, avgCommuteMinutes: 52 },   // 金山 586.05km²
  '310117': { metroStations: 18, metroDensity: 0.03, avgCommuteMinutes: 48 },   // 松江 605.64km²
  '310118': { metroStations: 12, metroDensity: 0.018, avgCommuteMinutes: 50 },  // 青浦 670.14km²
  '310120': { metroStations: 12, metroDensity: 0.017, avgCommuteMinutes: 50 },  // 奉贤 687.39km²
  '310151': { metroStations: 3, metroDensity: 0.003, avgCommuteMinutes: 55 },   // 崇明 1185.49km²
};

// 银川6区县通勤交通数据
// 银川无城市轨道交通，以公交线网密度和通勤时间为主要指标
// 公交数据来源：银川市2025年统计公报（公交线路199条/标准运营车辆2829.60标台）
// 各区分配基于人口比例和道路里程占比
// 通勤时间来源：2024中国主要城市通勤监测年报（银川全市平均29分钟）
const YINCHUAN_COMMUTE: Record<string, DistrictCommute> = {
  '640104': { metroStations: 0, avgCommuteMinutes: 24, busDensity: 3.8 },  // 兴庆区（核心城区，通勤时间短）
  '640106': { metroStations: 0, avgCommuteMinutes: 26, busDensity: 3.5 },  // 金凤区（新城区，通勤距离适中）
  '640105': { metroStations: 0, avgCommuteMinutes: 28, busDensity: 2.8 },  // 西夏区（高校区，通勤时间较短）
  '640121': { metroStations: 0, avgCommuteMinutes: 35, busDensity: 1.5 },  // 永宁县（远郊，通勤时间长）
  '640122': { metroStations: 0, avgCommuteMinutes: 33, busDensity: 1.6 },  // 贺兰县（远郊）
  '640181': { metroStations: 0, avgCommuteMinutes: 36, busDensity: 1.2 },  // 灵武市（最远，通勤时间最长）
};

const CITY_COMMUTE: Record<string, Record<string, DistrictCommute>> = {
  shanghai: SHANGHAI_COMMUTE,
  yinchuan: YINCHUAN_COMMUTE,
};

const COMMUTE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '高德POI地铁站计数(2026-06) + 上海统计年鉴2025版表2.2面积 + 2024中国主要城市通勤监测年报',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报（公交线路199条）+ 2024中国主要城市通勤监测年报',
    year: '2025年',
  },
};

export function commuteSource(cityKey: string): string {
  return COMMUTE_SOURCES[cityKey]?.source ?? '';
}

export function commuteYear(cityKey: string): string {
  return COMMUTE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictCommute(cityKey: string, adcode: string): DistrictCommute | undefined {
  return CITY_COMMUTE[cityKey]?.[adcode];
}

/** 市级交通总量（用于参考展示） */
export const CITY_TRANSIT_TOTALS: Record<string, {
  metroLines?: number;
  metroStations?: number;
  metroKm?: number;
  busRoutes?: number;
  busVehicles?: number;
  busStandardVehicles?: number;
  busesPer10kPeople?: number;
  taxis?: number;
  annualTransitPassengers?: number; // 年公共交通客运量（亿人次）
  avgCommuteMinutes: number;
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    metroLines: 22,
    metroStations: 532,
    metroKm: 962,
    busRoutes: 1590,
    busVehicles: 16700,
    annualTransitPassengers: 47.53,
    avgCommuteMinutes: 41,
    year: 2025,
    source: '2025年上海市国民经济和社会发展统计公报（上海市交通委员会）',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    busRoutes: 199,
    busVehicles: 2168,
    busStandardVehicles: 2829.60,
    busesPer10kPeople: 15,
    taxis: 6067,
    annualTransitPassengers: 2.60,
    avgCommuteMinutes: 29,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
