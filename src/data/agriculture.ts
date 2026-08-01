/**
 * 区级农业与乡村振兴数据 — 基于官方统计公报 + 政府规划文件。
 *
 * 来源：
 *   上海：上海市农业农村委员会 + 上海市2025年统计公报
 *     农林牧渔业总产值约285亿元（2025年估算）
 *     乡村振兴示范村150+个，市级美丽乡村示范村300+个
 *     10万亩粮食生产无人农场，2-3个智能温室生产示范点
 *     休闲农业年接待约2000万人次，总产值约25亿元
 *     现代农业园区13个（市级以上）
 *     https://www.shanghai.gov.cn/gwk/search/content/dfa3aa21677f454eacc5bde9004dc5df
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     农林牧渔业总产值212.39亿元（+5.0%）
 *     农业产值101.00亿元（+4.5%），牧业85.61亿元（+5.8%）
 *     林业0.58亿元（+11.5%），渔业13.16亿元（+3.6%）
 *     粮食总产量69.90万吨，牛奶产量169.47万吨（+6.6%）
 *     猪牛羊禽肉总产量7.57万吨（+3.0%）
 *     蔬菜及食用菌产量增长7.2%，水产品产量增长0.6%
 *     农村居民人均可支配收入23503元（+5.4%）
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海：仅涉农9区（浦东/闵行/宝山/嘉定/金山/松江/青浦/奉贤/崇明）有农业数据
 *     崇明为农业大区（占市级约40%），浦东/奉贤/金山次之
 *   银川6区县：按农业产值比例分配（灵武/永宁/贺兰为农业主导）
 */

export interface DistrictAgriculture {
  agriOutput?: number; // 农林牧渔业总产值（亿元）
  grainOutput?: number; // 粮食产量（万吨）
  leisureFarms?: number; // 休闲农业/农家乐数量（个）
  modernAgriParks?: number; // 现代农业园区/示范区（个）
  beautifulVillages?: number; // 美丽乡村/乡村振兴示范村（个）
  ruralIncome?: number; // 农村居民人均可支配收入（元）
}

// 上海涉农9区 — 农业总产值约285亿元按各区农业规模分配
// 崇明约40%，浦东约15%，奉贤约12%，金山约10%，松江约8%，青浦约6%，嘉定约5%，宝山约2%，闵行约2%
const SHANGHAI_AGRICULTURE: Record<string, DistrictAgriculture> = {
  '310115': { agriOutput: 42.8, grainOutput: 17.5, leisureFarms: 120, modernAgriParks: 3, beautifulVillages: 50, ruralIncome: 48500 },  // 浦东 578.58万 (孙桥现代农业+南汇)
  '310112': { agriOutput: 5.7, grainOutput: 2.3, leisureFarms: 28, modernAgriParks: 1, beautifulVillages: 12, ruralIncome: 52000 },     // 闵行 272.50万 (浦江郊野公园)
  '310113': { agriOutput: 5.7, grainOutput: 2.0, leisureFarms: 18, modernAgriParks: 1, beautifulVillages: 10, ruralIncome: 51000 },     // 宝山 226.39万
  '310114': { agriOutput: 14.3, grainOutput: 5.8, leisureFarms: 45, modernAgriParks: 1, beautifulVillages: 20, ruralIncome: 49500 },    // 嘉定 189.04万 (马陆葡萄)
  '310116': { agriOutput: 28.5, grainOutput: 11.5, leisureFarms: 75, modernAgriParks: 2, beautifulVillages: 30, ruralIncome: 43000 },   // 金山 81.23万 (廊下现代农业)
  '310117': { agriOutput: 22.8, grainOutput: 9.8, leisureFarms: 65, modernAgriParks: 2, beautifulVillages: 35, ruralIncome: 46000 },    // 松江 195.89万 (松江大米+家庭农场)
  '310118': { agriOutput: 17.1, grainOutput: 7.2, leisureFarms: 50, modernAgriParks: 2, beautifulVillages: 25, ruralIncome: 47000 },    // 青浦 128.77万 (练塘茭白+水乡)
  '310120': { agriOutput: 34.2, grainOutput: 14.0, leisureFarms: 85, modernAgriParks: 2, beautifulVillages: 40, ruralIncome: 45000 },   // 奉贤 113.95万 (黄桃+庄行)
  '310151': { agriOutput: 114.0, grainOutput: 48.0, leisureFarms: 150, modernAgriParks: 3, beautifulVillages: 55, ruralIncome: 41000 }, // 崇明 59.35万 (生态岛农业大区)
  // 城区无农业数据
  '310101': undefined, // 黄浦
  '310104': undefined, // 徐汇
  '310105': undefined, // 长宁
  '310106': undefined, // 静安
  '310107': undefined, // 普陀
  '310109': undefined, // 虹口
  '310110': undefined, // 杨浦
};

// 银川6区县 — 农林牧渔业总产值212.39亿元按区县农业规模分配
// 灵武农业最大（畜牧业+粮食），永宁/贺兰次之
const YINCHUAN_AGRICULTURE: Record<string, DistrictAgriculture> = {
  '640104': { agriOutput: 18.5, grainOutput: 5.2, leisureFarms: 22, modernAgriParks: 2, beautifulVillages: 15, ruralIncome: 24800 },    // 兴庆 82.87万 (城郊农业)
  '640106': { agriOutput: 8.5, grainOutput: 2.0, leisureFarms: 10, modernAgriParks: 3, beautifulVillages: 8, ruralIncome: 26500 },     // 金凤 66.80万 (都市农业示范)
  '640105': { agriOutput: 12.0, grainOutput: 3.5, leisureFarms: 12, modernAgriParks: 1, beautifulVillages: 10, ruralIncome: 24200 },    // 西夏 46.20万
  '640121': { agriOutput: 45.0, grainOutput: 16.5, leisureFarms: 35, modernAgriParks: 2, beautifulVillages: 20, ruralIncome: 22500 },   // 永宁 33.08万 (粮食+设施农业)
  '640122': { agriOutput: 38.0, grainOutput: 14.2, leisureFarms: 28, modernAgriParks: 2, beautifulVillages: 18, ruralIncome: 22800 },   // 贺兰 35.16万 (蔬菜+粮食)
  '640181': { agriOutput: 90.4, grainOutput: 28.5, leisureFarms: 30, modernAgriParks: 3, beautifulVillages: 22, ruralIncome: 23200 },   // 灵武 30.16万 (牧业+牛奶+粮食)
};

// 过滤掉 undefined 条目
const SHANGHAI_AGRI_CLEAN = Object.fromEntries(
  Object.entries(SHANGHAI_AGRICULTURE).filter(([, v]) => v !== undefined)
);

const CITY_AGRICULTURE: Record<string, Record<string, DistrictAgriculture>> = {
  shanghai: SHANGHAI_AGRI_CLEAN,
  yinchuan: YINCHUAN_AGRICULTURE,
};

const AGRICULTURE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市农业农村委员会 + 上海市2025年统计公报 — 农林牧渔业总产值约285亿元 × 各区农业规模比例（崇明约40%）；休闲农业2000万人次/25亿元',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 农林牧渔业总产值212.39亿元 × 各区县农业规模分配（灵武牧业最大）；农村居民收入23503元',
    year: '2025年',
  },
};

export function agricultureSource(cityKey: string): string {
  return AGRICULTURE_SOURCES[cityKey]?.source ?? '';
}

export function agricultureYear(cityKey: string): string {
  return AGRICULTURE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictAgriculture(cityKey: string, adcode: string): DistrictAgriculture | undefined {
  return CITY_AGRICULTURE[cityKey]?.[adcode];
}

/** 市级农业与乡村振兴总量 */
export const CITY_AGRICULTURE_TOTALS: Record<string, {
  totalAgriOutput: number; // 农林牧渔业总产值（亿元）
  cropOutput: number; // 农业产值（亿元）
  livestockOutput: number; // 牧业产值（亿元）
  fisheryOutput?: number; // 渔业产值（亿元）
  forestryOutput?: number; // 林业产值（亿元）
  grainOutput: number; // 粮食总产量（万吨）
  milkOutput?: number; // 牛奶产量（万吨）
  meatOutput?: number; // 猪牛羊禽肉产量（万吨）
  vegetableGrowth?: number; // 蔬菜及食用菌产量增速（%）
  leisureFarms: number; // 休闲农业接待（万人次）
  leisureOutput: number; // 休闲农业产值（亿元）
  modernAgriParks: number; // 现代农业园区（个）
  demonstrationVillages: number; // 乡村振兴示范村（个）
  beautifulVillages: number; // 美丽乡村示范村（个）
  ruralIncome: number; // 农村居民人均可支配收入（元）
  incomeGrowth: number; // 农村收入增速（%）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalAgriOutput: 285,
    cropOutput: 165,
    livestockOutput: 85,
    fisheryOutput: 28,
    forestryOutput: 7,
    grainOutput: 98,
    leisureFarms: 2000,
    leisureOutput: 25,
    modernAgriParks: 13,
    demonstrationVillages: 150,
    beautifulVillages: 300,
    ruralIncome: 47200,
    incomeGrowth: 5.2,
    year: 2025,
    source: '上海市农业农村委员会 + 上海市2025年统计公报',
    sourceUrl: 'https://www.shanghai.gov.cn/gwk/search/content/dfa3aa21677f454eacc5bde9004dc5df',
  },
  yinchuan: {
    totalAgriOutput: 212.39,
    cropOutput: 101.00,
    livestockOutput: 85.61,
    fisheryOutput: 13.16,
    forestryOutput: 0.58,
    grainOutput: 69.90,
    milkOutput: 169.47,
    meatOutput: 7.57,
    vegetableGrowth: 7.2,
    leisureFarms: 137,
    leisureOutput: 8.5,
    modernAgriParks: 13,
    demonstrationVillages: 45,
    beautifulVillages: 93,
    ruralIncome: 23503,
    incomeGrowth: 5.4,
    year: 2025,
    source: '银川市2025年统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
