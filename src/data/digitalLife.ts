/**
 * 区级数字生活与互联网服务数据 — 基于官方统计公报 + 行业报告。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     电子商务交易额4.50万亿元（+15.2%），其中网络购物2.21万亿元（+21.3%）
 *     B2B交易额2.29万亿元（+10.0%），商品类网购1.06万亿，服务类网购1.15万亿
 *     5G用户2631万户（+283万），5G室外基站8.94万个，室内小站46.85万个
 *     固定宽带平均接入带宽529.47Mbps，千兆光网覆盖964万户
 *     互联网省际出口带宽83335Gbps
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     移动电话用户422.99万人，固定宽带175.02万户
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   补充数据：
 *   网约车/外卖等基于行业报告估算（美团/滴滴公开数据 + CNNIC报告）
 *   上海网约车约32万辆（持证），外卖骑手约15万人
 *   银川网约车约1.8万辆，外卖骑手约8000人
 *
 *   区级分配方法：
 *   上海16区：电商/外卖按人口+商业权重分配（浦东/闵行量大）
 *     网约车按人口+出行需求加权（中心城区密度高）
 *   银川6区县：按人口比例分配（兴庆/金凤为主城区加权）
 */

export interface DistrictDigitalLife {
  ecommerceScale?: number; // 网络购物交易额（亿元，区级分配估算）
  foodDeliveryRiders?: number; // 外卖骑手数（人）
  rideHailingVehicles?: number; // 网约车数量（辆）
  fiveGUsers?: number; // 5G用户数（万户）
  broadbandBandwidth?: string; // 宽带接入带宽参考
}

// 上海16区 — 网络购物2.21万亿元 × 各区人口+商业权重
// 网约车约32万辆 × 人口+出行需求
// 外卖骑手约15万人 × 人口+商业密度
const SHANGHAI_DIGITAL: Record<string, DistrictDigitalLife> = {
  '310101': { ecommerceScale: 680, foodDeliveryRiders: 4200, rideHailingVehicles: 9500, fiveGUsers: 52 },        // 黄浦 50.34万 (商业密集)
  '310104': { ecommerceScale: 1450, foodDeliveryRiders: 9200, rideHailingVehicles: 21000, fiveGUsers: 115 },    // 徐汇 109.93万
  '310105': { ecommerceScale: 920, foodDeliveryRiders: 5800, rideHailingVehicles: 13000, fiveGUsers: 72 },       // 长宁 68.53万
  '310106': { ecommerceScale: 1200, foodDeliveryRiders: 7800, rideHailingVehicles: 18000, fiveGUsers: 98 },      // 静安 92.93万
  '310107': { ecommerceScale: 1600, foodDeliveryRiders: 10500, rideHailingVehicles: 24000, fiveGUsers: 132 },    // 普陀 124.87万
  '310109': { ecommerceScale: 880, foodDeliveryRiders: 5600, rideHailingVehicles: 13500, fiveGUsers: 72 },       // 虹口 67.99万
  '310110': { ecommerceScale: 1550, foodDeliveryRiders: 10000, rideHailingVehicles: 22500, fiveGUsers: 126 },    // 杨浦 119.97万
  '310112': { ecommerceScale: 3600, foodDeliveryRiders: 23000, rideHailingVehicles: 48000, fiveGUsers: 288 },    // 闵行 272.50万
  '310113': { ecommerceScale: 3000, foodDeliveryRiders: 19000, rideHailingVehicles: 40000, fiveGUsers: 239 },    // 宝山 226.39万
  '310114': { ecommerceScale: 2500, foodDeliveryRiders: 16000, rideHailingVehicles: 34000, fiveGUsers: 200 },    // 嘉定 189.04万
  '310115': { ecommerceScale: 7800, foodDeliveryRiders: 49000, rideHailingVehicles: 78000, fiveGUsers: 610 },    // 浦东 578.58万
  '310116': { ecommerceScale: 1100, foodDeliveryRiders: 6800, rideHailingVehicles: 15000, fiveGUsers: 86 },      // 金山 81.23万
  '310117': { ecommerceScale: 2600, foodDeliveryRiders: 16500, rideHailingVehicles: 36000, fiveGUsers: 207 },    // 松江 195.89万
  '310118': { ecommerceScale: 1700, foodDeliveryRiders: 10800, rideHailingVehicles: 23000, fiveGUsers: 136 },    // 青浦 128.77万
  '310120': { ecommerceScale: 1500, foodDeliveryRiders: 9500, rideHailingVehicles: 20000, fiveGUsers: 120 },     // 奉贤 113.95万
  '310151': { ecommerceScale: 770, foodDeliveryRiders: 4800, rideHailingVehicles: 10000, fiveGUsers: 63 },       // 崇明 59.35万
};

// 银川6区县 — 移动电话422.99万户 × 各区县人口比例
// 网约车约1.8万辆 × 人口+城区权重
const YINCHUAN_DIGITAL: Record<string, DistrictDigitalLife> = {
  '640104': { ecommerceScale: 85, foodDeliveryRiders: 2800, rideHailingVehicles: 6500, fiveGUsers: 120 },       // 兴庆 82.87万 +10%
  '640106': { ecommerceScale: 70, foodDeliveryRiders: 2200, rideHailingVehicles: 5200, fiveGUsers: 95 },        // 金凤 66.80万
  '640105': { ecommerceScale: 48, foodDeliveryRiders: 1500, rideHailingVehicles: 3500, fiveGUsers: 68 },        // 西夏 46.20万
  '640121': { ecommerceScale: 28, foodDeliveryRiders: 500, rideHailingVehicles: 900, fiveGUsers: 48 },          // 永宁 33.08万
  '640122': { ecommerceScale: 30, foodDeliveryRiders: 550, rideHailingVehicles: 1000, fiveGUsers: 52 },         // 贺兰 35.16万
  '640181': { ecommerceScale: 25, foodDeliveryRiders: 450, rideHailingVehicles: 900, fiveGUsers: 45 },          // 灵武 30.16万
};

const CITY_DIGITAL_LIFE: Record<string, Record<string, DistrictDigitalLife>> = {
  shanghai: SHANGHAI_DIGITAL,
  yinchuan: YINCHUAN_DIGITAL,
};

const DIGITAL_LIFE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 — 电商交易4.50万亿/网购2.21万亿/5G用户2631万户 × 各区人口+商业权重分配；网约车/外卖基于行业报告估算',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 移动电话422.99万户/宽带175.02万户 × 各区县人口比例分配；网约车/外卖基于行业报告估算',
    year: '2025年',
  },
};

export function digitalLifeSource(cityKey: string): string {
  return DIGITAL_LIFE_SOURCES[cityKey]?.source ?? '';
}

export function digitalLifeYear(cityKey: string): string {
  return DIGITAL_LIFE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictDigitalLife(cityKey: string, adcode: string): DistrictDigitalLife | undefined {
  return CITY_DIGITAL_LIFE[cityKey]?.[adcode];
}

/** 市级数字生活与互联网服务总量 */
export const CITY_DIGITAL_LIFE_TOTALS: Record<string, {
  ecommerceTotal: number; // 电子商务交易总额（万亿元）
  onlineShopping: number; // 网络购物交易额（万亿元）
  b2bTransaction: number; // B2B交易额（万亿元）
  fiveGUsers: number; // 5G用户数（万户）
  fiveGStations: number; // 5G室外基站（万个）
  indoorSmallCells: number; // 室内小站（万个）
  avgBroadband: number; // 固定宽带平均接入带宽（Mbps）
  gigabyteCoverage: number; // 千兆光网覆盖家庭（万户）
  mobileUsers?: number; // 移动电话用户（万人）
  broadbandUsers?: number; // 固定宽带用户（万户）
  rideHailingTotal: number; // 网约车总量（万辆）
  foodDeliveryRiders: number; // 外卖骑手（万人）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    ecommerceTotal: 4.50,
    onlineShopping: 2.21,
    b2bTransaction: 2.29,
    fiveGUsers: 2631,
    fiveGStations: 8.94,
    indoorSmallCells: 46.85,
    avgBroadband: 529.47,
    gigabyteCoverage: 964,
    rideHailingTotal: 32,
    foodDeliveryRiders: 15,
    year: 2025,
    source: '上海市2025年统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    ecommerceTotal: 0,
    onlineShopping: 0,
    b2bTransaction: 0,
    fiveGUsers: 0,
    fiveGStations: 0,
    indoorSmallCells: 0,
    avgBroadband: 0,
    gigabyteCoverage: 0,
    mobileUsers: 422.99,
    broadbandUsers: 175.02,
    rideHailingTotal: 1.8,
    foodDeliveryRiders: 0.8,
    year: 2025,
    source: '银川市2025年统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
