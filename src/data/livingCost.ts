/**
 * Living cost comparison data — Shanghai vs Yinchuan.
 *
 * 数据来源:
 *   上海: 2025年上海市国民经济和社会发展统计公报
 *     - 城镇居民人均可支配收入 96,842元
 *     - 城镇居民人均消费支出 57,076元
 *     - 新建商品住宅销售价格指数 105.7（上年=100）
 *     - 二手住宅销售价格指数 97.6
 *     - 最低工资标准 2,740元/月（2025年7月起）
 *     - 最低生活保障标准 1,650元/月
 *     - 居民消费价格指数 100.1
 *     - 城镇居民人均住房建筑面积 37.63㎡
 *   来源: https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川: 2025年银川市国民经济和社会发展统计公报
 *     - 城镇居民人均可支配收入 51,469元
 *     - 城镇居民人均消费性支出 33,073元
 *     - 城镇居民恩格尔系数 26.2%
 *     - 农村居民人均可支配收入 23,503元
 *     - 农村居民恩格尔系数 31.1%
 *     - 新建商品住宅销售价格同比下降3.5%
 *     - 二手住宅销售价格下降6.5%
 *     - 居民消费价格与上年持平（CPI=100）
 *   来源: https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   房价数据: 来自 housing.ts（聚汇数据/中国房价行情）
 *   房价收入比 = 房屋总价(100㎡) / 年可支配收入
 */

export interface CityLivingCost {
  // 收入
  urbanDisposableIncome: number; // 城镇居民人均可支配收入（元/年）
  ruralDisposableIncome: number; // 农村居民人均可支配收入（元/年）
  perCapitaConsumption: number; // 人均消费支出（元/年）
  minWage: number; // 最低工资标准（元/月）
  minLivingStandard: number; // 最低生活保障标准（元/月）

  // 房价指数（上年=100）
  newHousePriceIndex?: number; // 新建商品住宅销售价格指数
  secondHandPriceIndex?: number; // 二手住宅销售价格指数

  // 物价
  cpi: number; // 居民消费价格指数（上年=100）
  engelCoefficient?: number; // 恩格尔系数（%）

  // 居住
  perCapitaHousingArea?: number; // 人均住房建筑面积（㎡）

  // 房价收入比（计算值）
  housePriceIncomeRatio: number; // 100㎡房屋总价 / 年收入

  // 生活成本指数（上海=100基准）
  livingCostIndex: number;

  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_LIVING_COST: Record<string, CityLivingCost> = {
  shanghai: {
    urbanDisposableIncome: 96842,
    ruralDisposableIncome: 48122,
    perCapitaConsumption: 57076,
    minWage: 2740,
    minLivingStandard: 1650,
    newHousePriceIndex: 105.7,
    secondHandPriceIndex: 97.6,
    cpi: 100.1,
    perCapitaHousingArea: 37.63,
    // 平均房价约71,245元/㎡（16区均价的算术平均，加权后约68,000）× 100㎡ / (96,842元/年)
    // 71245 × 100 / 96842 ≈ 73.6年
    housePriceIncomeRatio: 73.6,
    livingCostIndex: 100, // 基准
    year: 2025,
    source: '2025年上海市国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    urbanDisposableIncome: 51469,
    ruralDisposableIncome: 23503,
    perCapitaConsumption: 33073,
    // 银川最低工资标准：兴庆区/金凤区/西夏区 2050元/月（2024年标准）
    minWage: 2050,
    // 银川市城镇低保标准约650元/月（2024年标准）
    minLivingStandard: 650,
    // 2025年：新建住宅价格同比-3.5%，二手-6.5%
    // 以2024年=100，则指数约为 96.5 / 93.5
    newHousePriceIndex: 96.5,
    secondHandPriceIndex: 93.5,
    cpi: 100.0,
    engelCoefficient: 26.2,
    // 平均房价约5,829元/㎡（6区县均价算术平均）× 100㎡ / (51,469元/年)
    // 5829 × 100 / 51469 ≈ 11.3年
    housePriceIncomeRatio: 11.3,
    // 生活成本指数：以收入比+物价+房价综合估算
    // 银川消费支出/上海消费支出 = 33073/57076 ≈ 57.9%
    livingCostIndex: 57.9,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

export function getCityLivingCost(cityKey: string): CityLivingCost | undefined {
  return CITY_LIVING_COST[cityKey];
}
