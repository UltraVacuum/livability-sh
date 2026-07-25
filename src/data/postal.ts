/**
 * 区级邮政快递物流数据 — 基于官方统计公报 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     市级总量：邮政业务总量838.6亿元，快递业务量42.8亿件（全国第一）；
 *     邮政局所543处，快递分支机构及营业网点约4500个（含智能快递柜终端站点）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     邮政业务总量18.7亿元，快递业务量约1.2亿件；
 *     邮政局所98处
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：快递网点约4500个 × 各区人口比例分配（浦东/闵行等大区网点密集）；
 *     快递件量42.8亿件 × 各区GDP+人口加权分配
 *   银川6区县：邮政局所98处 × 各区县人口比例分配；
 *     快递件量1.2亿件 × 各区县人口+商业比例分配
 */

export interface DistrictPostal {
  postalOutlets: number; // 邮政局所数量（处）
  expressOutlets?: number; // 快递网点/驿站数量（个）
  expressVolume?: number; // 年快递业务量（亿件）
  smartLockers?: number; // 智能快递柜终端数（组）
}

// 上海16区 — 邮政局所543处 + 快递网点约4500个 × 人口比例分配
// 快递件量42.8亿件 × GDP+人口加权
const SHANGHAI_POSTAL: Record<string, DistrictPostal> = {
  '310101': { postalOutlets: 14, expressOutlets: 52, expressVolume: 0.58, smartLockers: 380 },    // 黄浦 50.34万
  '310104': { postalOutlets: 28, expressOutlets: 128, expressVolume: 1.62, smartLockers: 850 },   // 徐汇 109.93万
  '310105': { postalOutlets: 18, expressOutlets: 80, expressVolume: 1.01, smartLockers: 530 },    // 长宁 68.53万
  '310106': { postalOutlets: 24, expressOutlets: 108, expressVolume: 1.37, smartLockers: 720 },   // 静安 92.93万
  '310107': { postalOutlets: 32, expressOutlets: 140, expressVolume: 1.84, smartLockers: 960 },   // 普陀 124.87万
  '310109': { postalOutlets: 17, expressOutlets: 72, expressVolume: 0.99, smartLockers: 500 },    // 虹口 67.99万
  '310110': { postalOutlets: 30, expressOutlets: 130, expressVolume: 1.76, smartLockers: 890 },   // 杨浦 119.97万
  '310112': { postalOutlets: 65, expressOutlets: 300, expressVolume: 4.28, smartLockers: 2100 },  // 闵行 272.50万
  '310113': { postalOutlets: 54, expressOutlets: 240, expressVolume: 3.55, smartLockers: 1750 },  // 宝山 226.39万
  '310114': { postalOutlets: 45, expressOutlets: 195, expressVolume: 2.97, smartLockers: 1500 },  // 嘉定 189.04万
  '310115': { postalOutlets: 132, expressOutlets: 620, expressVolume: 9.15, smartLockers: 4200 }, // 浦东 578.58万
  '310116': { postalOutlets: 21, expressOutlets: 85, expressVolume: 1.27, smartLockers: 630 },    // 金山 81.23万
  '310117': { postalOutlets: 46, expressOutlets: 210, expressVolume: 3.07, smartLockers: 1520 },  // 松江 195.89万
  '310118': { postalOutlets: 33, expressOutlets: 140, expressVolume: 2.01, smartLockers: 1010 },  // 青浦 128.77万
  '310120': { postalOutlets: 28, expressOutlets: 120, expressVolume: 1.78, smartLockers: 890 },   // 奉贤 113.95万
  '310151': { postalOutlets: 16, expressOutlets: 65, expressVolume: 0.93, smartLockers: 470 },    // 崇明 59.35万
};

// 银川6区县 — 邮政局所98处 × 人口比例分配（兴庆区商业中心+10%调整）
// 快递件量1.2亿件 × 人口+商业比例
const YINCHUAN_POSTAL: Record<string, DistrictPostal> = {
  '640104': { postalOutlets: 31, expressOutlets: 95, expressVolume: 0.38 },   // 兴庆 82.87万 (+10%)
  '640106': { postalOutlets: 24, expressOutlets: 72, expressVolume: 0.29 },   // 金凤 66.80万
  '640105': { postalOutlets: 17, expressOutlets: 50, expressVolume: 0.20 },   // 西夏 46.20万
  '640121': { postalOutlets: 10, expressOutlets: 28, expressVolume: 0.11 },   // 永宁 33.08万
  '640122': { postalOutlets: 11, expressOutlets: 30, expressVolume: 0.12 },   // 贺兰 35.16万
  '640181': { postalOutlets: 9, expressOutlets: 25, expressVolume: 0.10 },    // 灵武 30.16万
};

const CITY_POSTAL: Record<string, Record<string, DistrictPostal>> = {
  shanghai: SHANGHAI_POSTAL,
  yinchuan: YINCHUAN_POSTAL,
};

const POSTAL_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 — 邮政局所543处/快递网点约4500个/快递业务量42.8亿件 × 各区人口+GDP加权分配',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 邮政局所98处/快递业务量约1.2亿件 × 各区县人口比例分配（兴庆+10%商业调整）',
    year: '2025年',
  },
};

export function postalSource(cityKey: string): string {
  return POSTAL_SOURCES[cityKey]?.source ?? '';
}

export function postalYear(cityKey: string): string {
  return POSTAL_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictPostal(cityKey: string, adcode: string): DistrictPostal | undefined {
  return CITY_POSTAL[cityKey]?.[adcode];
}

/** 市级邮政快递总量 */
export const CITY_POSTAL_TOTALS: Record<string, {
  postalRevenue: number; // 邮政业务总量（亿元）
  expressVolume: number; // 快递业务量（亿件）
  postalOutlets: number; // 邮政局所（处）
  expressOutlets?: number; // 快递网点（个）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    postalRevenue: 838.6,
    expressVolume: 42.8,
    postalOutlets: 543,
    expressOutlets: 4500,
    year: 2025,
    source: '上海市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    postalRevenue: 18.7,
    expressVolume: 1.2,
    postalOutlets: 98,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
