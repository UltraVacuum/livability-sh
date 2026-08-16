/**
 * City-level infrastructure statistics — real official data from statistical bulletins.
 *
 * 上海: 2025年上海市国民经济和社会发展统计公报
 *   https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 * 北京: 北京市2025年国民经济和社会发展统计公报
 *   https://tjj.beijing.gov.cn/tjsj_31433/tjgb_31445/ndgb_31446/202603/t20260326_4566469.html
 *   高校数量：北京人大《北京的教育体系》（截至2024年底，92所普通高等学校）
 *   https://www.bjrd.gov.cn/fwhd/bjrdzz/2025n/bjrdzz202511q/bjshq202511/202511/t20251128_4310110.html
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
  busRouteKm?: number; // 地面公交运营线路长度 (公里)
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
  perCapitaConsumption?: number; // 居民人均消费支出 (元)
  // 房价
  newHousePriceIndex?: number; // 新建商品住宅销售价格指数 (上年=100)
  secondHandPriceIndex?: number; // 二手住宅销售价格指数 (上年=100)
  // 城市建设
  builtArea?: number; // 城市建成区面积 (平方公里)
  parks?: number; // 公园数量 (座)
  sewageTreatmentRate?: number; // 污水处理率 (%)
  // 年份与来源
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_STATS: Record<string, CityStats> = {
  shanghai: {
    metroLines: 22,
    metroStations: 532,
    metroKm: 962,
    busRoutes: 1590,
    busVehicles: 1.67,
    busRouteKm: 24556,
    universities: 69,
    highSchools: 932,
    primarySchools: 654,
    healthInstitutions: 6566,
    healthWorkers: 28.21,
    hospitals: 694,
    gdp: 56708.71,
    perCapitaGdp: undefined,
    urbanDisposableIncome: 96842,
    ruralDisposableIncome: 48122,
    perCapitaConsumption: 54765,
    newHousePriceIndex: 105.7,
    secondHandPriceIndex: 97.6,
    parks: 1100, // 上海公园数量（座）
    year: 2025,
    source: '2025年上海市国民经济和社会发展统计公报',
    sourceUrl:
      'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
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
    busRoutes: 199,
    busVehicles: 0.22,
    newHousePriceIndex: 96.5, // 2025年12月同比96.5%（下降3.5%）
    secondHandPriceIndex: 93.5, // 2025年12月同比93.5%（下降6.5%）
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl:
      'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
  beijing: {
    metroLines: 30,
    metroStations: 539, // 北京日报/新浪 2025-12-30：539座（其中换乘站106座）
    metroKm: 909,
    busRoutes: 1252,
    busVehicles: 2.05,
    busRouteKm: 28929.8,
    universities: 92,
    healthInstitutions: 11994,
    healthWorkers: 35.7,
    hospitals: 782,
    gdp: 52073.4,
    perCapitaGdp: 239000,
    urbanDisposableIncome: 96292,
    ruralDisposableIncome: 42012,
    perCapitaConsumption: 50667,
    newHousePriceIndex: 97.6,
    secondHandPriceIndex: 91.5,
    sewageTreatmentRate: 98,
    year: 2025,
    source: '北京市2025年国民经济和社会发展统计公报 + 北京人大《北京的教育体系》',
    sourceUrl:
      'https://tjj.beijing.gov.cn/tjsj_31433/tjgb_31445/ndgb_31446/202603/t20260326_4566469.html',
  },
};

export function getCityStats(cityKey: string): CityStats | undefined {
  return CITY_STATS[cityKey];
}
