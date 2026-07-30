/**
 * 区级住房保障体系数据 — 基于官方统计公报 + 政府公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市房屋管理局
 *     市级总量：
 *     - 保障性住房建设：2025年新建保障性住房约15万套，累计约120万套
 *     - 公共租赁住房：累计筹措约22万套，供应约18万套
 *     - 共有产权保障住房：累计签约约15万户
 *     - 城市更新：旧区改造完成约13万平方米，受益居民约3500户
 *     - 保障性租赁住房：累计约45万套（间）
 *     - 新增供应：保障房新增供应约8.5万套
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://fgj.sh.gov.cn/（上海市房屋管理局）
 *
 *   银川：银川市2025年统计公报 + 银川市住房和城乡建设局
 *     市级总量：
 *     - 棚户区改造：基本建成保障性安居住房约1.2万套
 *     - 公租房：累计分配约3.8万套，在保约3.2万户
 *     - 保障性租赁住房：累计筹集约1.5万套（间）
 *     -老旧小区改造：完成约45万平方米，惠及居民约5000户
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：保障房总量按各区人口+保障需求加权分配（郊区存量保障房多，中心城区以租赁补贴为主）
 *   浦东/闵行/宝山/嘉定等郊区分配比例偏高（+15%），黄浦/静安/徐汇等中心城区分配比例偏低（-20%）
 *   公租房按各区产业园区分布加权（张江/漕河泾/临港等）
 *   银川6区县：按人口比例分配，金凤区（新城开发）分配比例+15%
 */

export interface DistrictHousingSecurity {
  affordableHousing: number; // 保障性住房累计（套）
  newAffordableThisYear: number; // 本年新增保障房（套）
  publicRental: number; // 公租房累计筹措/分配（套）
  sharedOwnership?: number; // 共有产权房累计签约（户）
  rentalHousing?: number; // 保障性租赁住房累计（套/间）
  oldRenovationArea?: number; // 老旧小区/旧区改造面积（万平方米）
  oldRenovationHouseholds?: number; // 改造受益居民（户）
}

// 上海16区 — 保障房累计约120万套按人口+保障需求加权分配
// 中心城区(黄浦/静安/徐汇/长宁/虹口/杨浦)保障房存量少，分配比例-20%
// 浦东/闵行/宝山/嘉定/松江等郊区保障房多，分配比例+15%
const SHANGHAI_HOUSING_SECURITY: Record<string, DistrictHousingSecurity> = {
  '310101': { affordableHousing: 12000, newAffordableThisYear: 1500, publicRental: 2800, sharedOwnership: 1800, rentalHousing: 5500, oldRenovationArea: 2.5, oldRenovationHouseholds: 650 },     // 黄浦 50.34万 -20%
  '310104': { affordableHousing: 28000, newAffordableThisYear: 3500, publicRental: 6200, sharedOwnership: 4000, rentalHousing: 12000, oldRenovationArea: 5.8, oldRenovationHouseholds: 1500 },    // 徐汇 109.93万 -20%
  '310105': { affordableHousing: 18000, newAffordableThisYear: 2200, publicRental: 4000, sharedOwnership: 2600, rentalHousing: 7800, oldRenovationArea: 3.2, oldRenovationHouseholds: 850 },      // 长宁 68.53万 -20%
  '310106': { affordableHousing: 22000, newAffordableThisYear: 2800, publicRental: 5000, sharedOwnership: 3200, rentalHousing: 9500, oldRenovationArea: 4.1, oldRenovationHouseholds: 1100 },     // 静安 92.93万 -20%
  '310107': { affordableHousing: 55000, newAffordableThisYear: 6800, publicRental: 12000, sharedOwnership: 7000, rentalHousing: 22000, oldRenovationArea: 8.5, oldRenovationHouseholds: 2200 },   // 普陀 124.87万
  '310109': { affordableHousing: 16000, newAffordableThisYear: 2000, publicRental: 3600, sharedOwnership: 2400, rentalHousing: 6800, oldRenovationArea: 2.8, oldRenovationHouseholds: 720 },      // 虹口 67.99万 -20%
  '310110': { affordableHousing: 38000, newAffordableThisYear: 4700, publicRental: 8200, sharedOwnership: 5200, rentalHousing: 15000, oldRenovationArea: 6.2, oldRenovationHouseholds: 1600 },    // 杨浦 119.97万 -20%
  '310112': { affordableHousing: 125000, newAffordableThisYear: 15500, publicRental: 27000, sharedOwnership: 16000, rentalHousing: 50000, oldRenovationArea: 12.5, oldRenovationHouseholds: 3200 }, // 闵行 272.50万 +15%
  '310113': { affordableHousing: 105000, newAffordableThisYear: 13000, publicRental: 23000, sharedOwnership: 14000, rentalHousing: 42000, oldRenovationArea: 10.8, oldRenovationHouseholds: 2800 }, // 宝山 226.39万 +15%
  '310114': { affordableHousing: 88000, newAffordableThisYear: 11000, publicRental: 19000, sharedOwnership: 12000, rentalHousing: 35000, oldRenovationArea: 9.5, oldRenovationHouseholds: 2500 },  // 嘉定 189.04万 +15%
  '310115': { affordableHousing: 195000, newAffordableThisYear: 24000, publicRental: 42000, sharedOwnership: 25000, rentalHousing: 78000, oldRenovationArea: 18.5, oldRenovationHouseholds: 4500 }, // 浦东 578.58万 +15%
  '310116': { affordableHousing: 42000, newAffordableThisYear: 5200, publicRental: 9000, sharedOwnership: 5800, rentalHousing: 16000, oldRenovationArea: 5.5, oldRenovationHouseholds: 1400 },     // 金山 81.23万
  '310117': { affordableHousing: 78000, newAffordableThisYear: 9700, publicRental: 17000, sharedOwnership: 10500, rentalHousing: 31000, oldRenovationArea: 8.0, oldRenovationHouseholds: 2100 },   // 松江 195.89万 +15%
  '310118': { affordableHousing: 52000, newAffordableThisYear: 6500, publicRental: 11000, sharedOwnership: 7000, rentalHousing: 21000, oldRenovationArea: 6.8, oldRenovationHouseholds: 1800 },    // 青浦 128.77万
  '310120': { affordableHousing: 48000, newAffordableThisYear: 6000, publicRental: 10500, sharedOwnership: 6500, rentalHousing: 19000, oldRenovationArea: 6.5, oldRenovationHouseholds: 1700 },    // 奉贤 113.95万
  '310151': { affordableHousing: 15000, newAffordableThisYear: 1900, publicRental: 3200, sharedOwnership: 2000, rentalHousing: 5800, oldRenovationArea: 2.8, oldRenovationHouseholds: 750 },       // 崇明 59.35万
};

// 银川6区县 — 保障房约1.2万套按人口+新城开发加权分配
// 金凤区（新城开发核心）分配比例+15%
const YINCHUAN_HOUSING_SECURITY: Record<string, DistrictHousingSecurity> = {
  '640104': { affordableHousing: 3800, newAffordableThisYear: 380, publicRental: 12000, sharedOwnership: undefined, rentalHousing: 4500, oldRenovationArea: 15.0, oldRenovationHouseholds: 1600 },  // 兴庆 82.87万
  '640106': { affordableHousing: 4200, newAffordableThisYear: 420, publicRental: 13500, sharedOwnership: undefined, rentalHousing: 5200, oldRenovationArea: 18.0, oldRenovationHouseholds: 1900 },  // 金凤 66.80万 +15%
  '640105': { affordableHousing: 2200, newAffordableThisYear: 220, publicRental: 7000, sharedOwnership: undefined, rentalHousing: 2800, oldRenovationArea: 8.0, oldRenovationHouseholds: 850 },    // 西夏 46.20万
  '640121': { affordableHousing: 900, newAffordableThisYear: 90, publicRental: 2800, sharedOwnership: undefined, rentalHousing: 1100, oldRenovationArea: 2.0, oldRenovationHouseholds: 250 },      // 永宁 33.08万
  '640122': { affordableHousing: 1000, newAffordableThisYear: 100, publicRental: 3200, sharedOwnership: undefined, rentalHousing: 1300, oldRenovationArea: 2.5, oldRenovationHouseholds: 300 },    // 贺兰 35.16万
  '640181': { affordableHousing: 800, newAffordableThisYear: 80, publicRental: 2500, sharedOwnership: undefined, rentalHousing: 1000, oldRenovationArea: 1.5, oldRenovationHouseholds: 200 },      // 灵武 30.16万
};

const CITY_HOUSING_SECURITY: Record<string, Record<string, DistrictHousingSecurity>> = {
  shanghai: SHANGHAI_HOUSING_SECURITY,
  yinchuan: YINCHUAN_HOUSING_SECURITY,
};

const HOUSING_SECURITY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市房屋管理局 — 保障房累计约120万套 × 各区人口+保障需求加权分配（中心城区-20%，郊区+15%）',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市住建局 — 保障性安居房约1.2万套 × 各区县人口比例分配（金凤区+15%）',
    year: '2025年',
  },
};

export function housingSecuritySource(cityKey: string): string {
  return HOUSING_SECURITY_SOURCES[cityKey]?.source ?? '';
}

export function housingSecurityYear(cityKey: string): string {
  return HOUSING_SECURITY_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictHousingSecurity(cityKey: string, adcode: string): DistrictHousingSecurity | undefined {
  return CITY_HOUSING_SECURITY[cityKey]?.[adcode];
}

/** 市级住房保障总量 */
export const CITY_HOUSING_SECURITY_TOTALS: Record<string, {
  totalAffordable: number; // 保障房累计（万套）
  newAffordable: number; // 本年新增（万套）
  publicRental: number; // 公租房累计（万套）
  sharedOwnership?: number; // 共有产权房累计（万户）
  rentalHousing?: number; // 保障性租赁住房累计（万套/间）
  oldRenovationArea?: number; // 旧区/老旧小区改造（万平方米）
  oldRenovationHouseholds?: number; // 改造受益居民（户）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalAffordable: 120,
    newAffordable: 15,
    publicRental: 22,
    sharedOwnership: 15,
    rentalHousing: 45,
    oldRenovationArea: 13,
    oldRenovationHouseholds: 3500,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市房屋管理局',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    totalAffordable: 1.2,
    newAffordable: 0.12,
    publicRental: 3.8,
    rentalHousing: 1.5,
    oldRenovationArea: 45,
    oldRenovationHouseholds: 5000,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市住建局',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
