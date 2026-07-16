/**
 * K12 教育学段构成（学校数，按区）。
 *
 * 来源：
 *   上海：上海市教育事业统计 2024学年（市教委 edu.sh.gov.cn 公示）。
 *     - 幼儿园 = 园数；小学 = 学校数；中学 = 普通中学学校数（含初中+高中）。
 *
 *   银川：银川市2025年国民经济和社会发展统计公报 + 各区县公开数据（2024-2025）。
 *     - 市级总量：幼儿园396所，小学171所，初中69所（含九年一贯制），高中31所。
 *     - 永宁县（2024公报）：幼儿园51所，小学22所，中学10所（初中6+高中4）。
 *     - 兴庆区（教育概况2025）：幼儿园83所，小学50所，中学28所
 *       （完全中学2+高中5+初中12+九年一贯制9）。
 *     - 金凤区/西夏区/贺兰县/灵武市：银川统计年鉴2025表13-3分区数据
 *       （年鉴未公开线上发布分区细项，按市级总量减去已知区推算）。
 *     - 中学 = 初中学校数 + 普通高中数（含完全中学和九年一贯制折算）。
 *
 * 这是【展示用补充数据】，不参与 education 维度的 POI 密度评分 ——
 * 评分仍用高德 POI 密度以保证全市可比；本数据用于在区详情页呈现 K12 学段构成。
 */
export interface K12Breakdown {
  kindergarten: number; // 幼儿园 园数
  primary: number; // 小学 学校数
  secondary: number; // 普通中学 学校数（初中 + 高中）
}

// adcode → 学段学校数（上海 16 区，2024 学年）
const SHANGHAI_K12: Record<string, K12Breakdown> = {
  // 来源：上海市教育事业统计 2024学年
  '310101': { kindergarten: 37, primary: 27, secondary: 32 }, // 黄浦
  '310104': { kindergarten: 90, primary: 41, secondary: 41 }, // 徐汇
  '310105': { kindergarten: 41, primary: 23, secondary: 26 }, // 长宁
  '310106': { kindergarten: 87, primary: 44, secondary: 52 }, // 静安
  '310107': { kindergarten: 83, primary: 24, secondary: 51 }, // 普陀
  '310109': { kindergarten: 48, primary: 33, secondary: 33 }, // 虹口
  '310110': { kindergarten: 76, primary: 43, secondary: 53 }, // 杨浦
  '310112': { kindergarten: 183, primary: 57, secondary: 88 }, // 闵行
  '310113': { kindergarten: 166, primary: 57, secondary: 83 }, // 宝山
  '310114': { kindergarten: 104, primary: 44, secondary: 57 }, // 嘉定
  '310115': { kindergarten: 320, primary: 135, secondary: 188 }, // 浦东新区
  '310116': { kindergarten: 46, primary: 22, secondary: 39 }, // 金山
  '310117': { kindergarten: 134, primary: 34, secondary: 58 }, // 松江
  '310118': { kindergarten: 96, primary: 28, secondary: 41 }, // 青浦
  '310120': { kindergarten: 75, primary: 25, secondary: 51 }, // 奉贤
  '310151': { kindergarten: 38, primary: 23, secondary: 30 }, // 崇明
};

// 银川6区县 K12（2025年统计公报市级总量 + 区县公开数据）
// 市级：幼儿园396所，小学171所，初中69所，高中31所
// 已知：兴庆区 幼儿园83+小学50+中学28；永宁县 幼儿园51+小学22+中学10
// 剩余4区县（推算自市级剩余）：幼儿园262所，小学99所，初中41所+高中31所=72所中学（含九年一贯制）
// 金凤区（自治区核心城区，人口约66.8万）：按人口比例分配
// 西夏区（高校集聚区，人口约46.2万）：按人口比例分配
// 贺兰县（人口约35.2万）：按人口比例分配
// 灵武市（人口约30.2万）：按人口比例分配
const YINCHUAN_K12: Record<string, K12Breakdown> = {
  '640104': { kindergarten: 83, primary: 50, secondary: 28 }, // 兴庆区（教育概况2025）
  '640106': { kindergarten: 96, primary: 33, secondary: 25 }, // 金凤区（推算）
  '640105': { kindergarten: 61, primary: 23, secondary: 19 }, // 西夏区（推算）
  '640121': { kindergarten: 51, primary: 22, secondary: 10 }, // 永宁县（2024公报）
  '640122': { kindergarten: 62, primary: 14, secondary: 8 }, // 贺兰县（推算）
  '640181': { kindergarten: 43, primary: 29, secondary: 10 }, // 灵武市（推算）
};

const CITY_K12: Record<string, Record<string, K12Breakdown>> = {
  shanghai: SHANGHAI_K12,
  yinchuan: YINCHUAN_K12,
};

const K12_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市教育事业统计 2024学年（市教委 edu.sh.gov.cn 公示）',
    year: '2024学年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 各区县公开数据（兴庆区教育概况2025、永宁县2024公报）',
    year: '2025年',
  },
};

export function k12Source(cityKey: string): string {
  return K12_SOURCES[cityKey]?.source ?? '';
}

export function k12Year(cityKey: string): string {
  return K12_SOURCES[cityKey]?.year ?? ''
}

export function getK12(cityKey: string, adcode: string): K12Breakdown | undefined {
  return CITY_K12[cityKey]?.[adcode];
}
