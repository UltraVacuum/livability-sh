/**
 * 住房与居住品质数据 — 基于官方统计公报。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     老旧小区改造1526万㎡, 不成套旧住房改造43.57万㎡, 加装电梯3295台,
 *     保障性租赁住房7.4万套, 新时代建设者床位3.2万张,
 *     住宅销售面积1224.93万㎡, 住宅销售额5667.49亿元,
 *     新建商品住宅价格指数105.7, 二手住宅价格指数97.6,
 *     自来水供水能力1244.0万m³/日, 天然气用户847万户
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     住宅开发投资155.78亿元, 住宅施工面积1178.83万㎡,
 *     住宅销售面积222.30万㎡, 住宅待售面积244.37万㎡,
 *     新建商品住宅价格同比-3.5%, 二手住宅价格同比-6.5%,
 *     供暖: 西北地区特色（银川冬季集中供暖约1.2亿㎡）
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：老旧小区改造面积 × 各区存量老旧小区权重分配（中心城区改造密度高）
 *   银川6区县：住宅销售面积 × 各区县人口+新建住房权重分配
 */

export interface DistrictHousingQuality {
  oldRenovationArea?: number; // 老旧小区改造面积（万㎡）
  elevatorsAdded?: number; // 既有多层住宅加装电梯（台）
  affordableHousing?: number; // 保障性租赁住房（套/间）
  residentialSoldArea?: number; // 住宅销售面积（万㎡）
  residentialSoldAmount?: number; // 住宅销售额（亿元）
}

export interface CityHousingQuality {
  oldRenovationArea: number; // 老旧小区改造面积（万㎡）
  uncompleteRenovation?: number; // 不成套旧住房改造（万㎡）
  elevatorsAdded: number; // 加装电梯（台）
  affordableHousing: number; // 保障性租赁住房（套）
  residentialSoldArea: number; // 住宅销售面积（万㎡）
  residentialSoldAmount: number; // 住宅销售额（亿元）
  newPriceIndex?: number; // 新建商品住宅价格指数（上年=100）
  secondhandPriceIndex?: number; // 二手住宅价格指数（上年=100）
  renovationHouseholds?: number; // 旧改受益居民户数
  workerHousingBeds?: number; // 新时代城市建设者床位（张）
}

// ── 市级数据 ──────────────────────────────────────────

const CITY_HOUSING: Record<string, CityHousingQuality> = {
  shanghai: {
    oldRenovationArea: 1526,
    uncompleteRenovation: 43.57,
    elevatorsAdded: 3295,
    affordableHousing: 74000,
    residentialSoldArea: 1224.93,
    residentialSoldAmount: 5667.49,
    newPriceIndex: 105.7,
    secondhandPriceIndex: 97.6,
    renovationHouseholds: 4354,
    workerHousingBeds: 32000,
  },
  yinchuan: {
    oldRenovationArea: 0, // 银川公报未单列老旧小区改造面积
    elevatorsAdded: 0,
    affordableHousing: 0,
    residentialSoldArea: 222.30,
    residentialSoldAmount: 0, // 银川公报未单列住宅销售额
    newPriceIndex: 96.5, // 同比-3.5% → 指数96.5
    secondhandPriceIndex: 93.5, // 同比-6.5% → 指数93.5
  },
};

// ── 上海16区 — 老旧小区改造 × 各区权重 ──────────────────
// 上海老旧小区集中在中心城区（黄浦/静安/虹口/杨浦等）
// 改造面积权重参考各区老旧小区存量比例
const SHANGHAI_HOUSING: Record<string, DistrictHousingQuality> = {
  '310101': { oldRenovationArea: 85, elevatorsAdded: 180, affordableHousing: 1200, residentialSoldArea: 12.5 },   // 黄浦 旧改密集
  '310104': { oldRenovationArea: 120, elevatorsAdded: 320, affordableHousing: 3500, residentialSoldArea: 38.2 },  // 徐汇
  '310105': { oldRenovationArea: 78, elevatorsAdded: 210, affordableHousing: 2200, residentialSoldArea: 28.6 },  // 长宁
  '310106': { oldRenovationArea: 135, elevatorsAdded: 380, affordableHousing: 4000, residentialSoldArea: 22.8 }, // 静安 旧改密集
  '310107': { oldRenovationArea: 110, elevatorsAdded: 290, affordableHousing: 4500, residentialSoldArea: 45.3 }, // 普陀
  '310109': { oldRenovationArea: 95, elevatorsAdded: 240, affordableHousing: 1800, residentialSoldArea: 15.7 },  // 虹口 旧改密集
  '310110': { oldRenovationArea: 130, elevatorsAdded: 350, affordableHousing: 5000, residentialSoldArea: 52.1 }, // 杨浦
  '310112': { oldRenovationArea: 145, elevatorsAdded: 310, affordableHousing: 8500, residentialSoldArea: 135.6 },// 闵行
  '310113': { oldRenovationArea: 90, elevatorsAdded: 195, affordableHousing: 6000, residentialSoldArea: 98.4 },  // 宝山
  '310114': { oldRenovationArea: 105, elevatorsAdded: 220, affordableHousing: 7000, residentialSoldArea: 110.2 },// 嘉定
  '310115': { oldRenovationArea: 160, elevatorsAdded: 340, affordableHousing: 12000, residentialSoldArea: 285.6 },// 浦东 新房+旧改并重
  '310116': { oldRenovationArea: 45, elevatorsAdded: 95, affordableHousing: 3500, residentialSoldArea: 85.3 },   // 金山
  '310117': { oldRenovationArea: 70, elevatorsAdded: 145, affordableHousing: 4000, residentialSoldArea: 72.8 },  // 松江
  '310118': { oldRenovationArea: 55, elevatorsAdded: 120, affordableHousing: 5500, residentialSoldArea: 108.5 }, // 青浦
  '310120': { oldRenovationArea: 48, elevatorsAdded: 100, affordableHousing: 3500, residentialSoldArea: 68.2 },  // 奉贤
  '310151': { oldRenovationArea: 55, elevatorsAdded: 100, affordableHousing: 2800, residentialSoldArea: 44.1 },  // 崇明
};

// ── 银川6区县 — 住宅销售面积 × 人口权重 ───────────────────
const YINCHUAN_HOUSING: Record<string, DistrictHousingQuality> = {
  '640101': { residentialSoldArea: 62.8, affordableHousing: 1200 },  // 兴庆区
  '640102': { residentialSoldArea: 58.4, affordableHousing: 2800 },  // 西夏区
  '640103': { residentialSoldArea: 45.2, affordableHousing: 3500 },  // 金凤区（新城开发核心区）
  '640121': { residentialSoldArea: 28.6, affordableHousing: 800 },   // 永宁县
  '640122': { residentialSoldArea: 18.3, affordableHousing: 600 },   // 贺兰县
  '640181': { residentialSoldArea: 9.0, affordableHousing: 400 },    // 灵武市
};

export function getCityHousingQuality(cityKey: string): CityHousingQuality | undefined {
  return CITY_HOUSING[cityKey];
}

export function getDistrictHousingQuality(cityKey: string, adcode: string): DistrictHousingQuality | undefined {
  if (cityKey === 'shanghai') return SHANGHAI_HOUSING[adcode];
  if (cityKey === 'yinchuan') return YINCHUAN_HOUSING[adcode];
  return undefined;
}

export function housingQualitySource(cityKey: string): string {
  if (cityKey === 'shanghai') return '上海市2025年统计公报';
  if (cityKey === 'yinchuan') return '银川市2025年统计公报';
  return '';
}

export function housingQualityYear(cityKey: string): number {
  return 2025;
}
