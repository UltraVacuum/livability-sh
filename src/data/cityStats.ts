/**
 * City-level infrastructure statistics — real official data from statistical bulletins.
 *
 * 上海: 2024年上海市国民经济和社会发展统计公报
 *   https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html
 * 银川: 银川市2025年国民经济和社会发展统计公报
 *   https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 * These are city-level totals (not per-district), used for context display.
 */

export interface CityStats {
  // 交通
  metroLines?: number; // 轨道交通运营线路
  metroStations?: number; // 轨道交通运营车站
  metroKm?: number; // 轨道交通运营里程 (公里)
  busRoutes?: number; // 地面公交运营线路
  busVehicles?: number; // 地面公交车辆 (万辆)
  // 教育
  universities?: number; // 普通高等学校
  highSchools?: number; // 普通中学
  primarySchools?: number; // 普通小学
  // 医疗
  healthInstitutions?: number; // 卫生机构数
  healthWorkers?: number; // 卫生技术人员 (万人)
  hospitals?: number; // 医院
  // 经济补充
  gdp?: number; // 地区生产总值 (亿元)
  perCapitaGdp?: number; // 人均GDP (元)
  urbanDisposableIncome?: number; // 城镇居民人均可支配收入 (元)
  ruralDisposableIncome?: number; // 农村居民人均可支配收入 (元)
  // 房价
  newHousePriceIndex?: number; // 新建商品住宅销售价格指数 (上年=100)
  secondHandPriceIndex?: number; // 二手住宅销售价格指数 (上年=100)
  // 城市建设
  builtArea?: number; // 城市建成区面积 (平方公里)
  greenRate?: number; // 污水处理率 (%)
  sewageTreatmentRate?: number; // 污水处理率 (%)
  // 年份与来源
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_STATS: Record<string, CityStats> = {
  shanghai: {
    metroLines: 21,
    metroStations: 517,
    metroKm: 896,
    busRoutes: 1589,
    busVehicles: 1.70,
    universities: 69,
    highSchools: 923,
    primarySchools: 660,
    healthInstitutions: 6431,
    healthWorkers: 26.96,
    gdp: 53926.71,
    perCapitaGdp: undefined, // 公报未直接公布人均GDP
    urbanDisposableIncome: 93095,
    ruralDisposableIncome: 45644,
    newHousePriceIndex: 104.6,
    secondHandPriceIndex: 93.9,
    year: 2024,
    source: '2024年上海市国民经济和社会发展统计公报',
    sourceUrl:
      'https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html',
  },
  yinchuan: {
    universities: 17,
    highSchools: 31,
    primarySchools: 171,
    healthInstitutions: 1704,
    hospitals: 85,
    healthWorkers: 3.44,
    gdp: 3033.52,
    perCapitaGdp: 103579,
    urbanDisposableIncome: 51469,
    ruralDisposableIncome: 23503,
    builtArea: 199.45,
    sewageTreatmentRate: 98.5,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl:
      'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

export function getCityStats(cityKey: string): CityStats | undefined {
  return CITY_STATS[cityKey];
}
