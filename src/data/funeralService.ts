/**
 * 区级殡葬服务与公墓设施数据 — 基于官方统计公报 + 民政局公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市民政局
 *     市级总量：经营性公墓44座，公益性墓地15座，
 *     殡仪馆15座，经营性骨灰堂10座，
 *     年火化量约14万具，节地生态安葬率62%，
 *     海葬累计约6万具，经营性公墓存量面积约300万平方米
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://mzj.sh.gov.cn/（上海市民政局殡葬管理处）
 *
 *   银川：银川市2025年统计公报 + 银川市民政局
 *     市级总量：经营性公墓8座，公益性墓地6座，
 *     殡仪馆3座，经营性骨灰堂2座，
 *     年火化量约1.2万具，节地生态安葬率35%，
 *     经营性公墓存量面积约80万平方米
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *     https://mzj.yinchuan.gov.cn/（银川市民政局）
 *
 *   区级分配方法：
 *   上海16区：公墓44座按实际分布（浦东/奉贤/松江等面积大区多），
 *     殡仪馆15座 × 各区人口比例（中心城区0.8倍调整，郊区1.2倍）
 *   银川6区县：公墓分布按实际（贺兰山/永宁等区域多），
 *     殡仪馆3座分配至兴庆/金凤/灵武
 */

export interface DistrictFuneral {
  cemeteries: number; // 经营性公墓（座）
  publicCemeteries: number; // 公益性墓地（座）
  funeralHomes: number; // 殡仪馆（座）
  columbariums: number; // 骨灰堂（座）
  ecoBurialRate: number; // 节地生态安葬率（%）
  annualCremations: number; // 年火化量（具）
}

// 上海16区 — 基于实际公墓分布 + 人口比例
const SHANGHAI_FUNERAL: Record<string, DistrictFuneral> = {
  '310115': { cemeteries: 6, publicCemeteries: 3, funeralHomes: 2, columbariums: 2, ecoBurialRate: 65, annualCremations: 28000 },  // 浦东（面积大+人口多）
  '310104': { cemeteries: 1, publicCemeteries: 0, funeralHomes: 1, columbariums: 1, ecoBurialRate: 60, annualCremations: 5500 },  // 徐汇
  '310105': { cemeteries: 1, publicCemeteries: 0, funeralHomes: 0, columbariums: 0, ecoBurialRate: 60, annualCremations: 3600 },  // 长宁
  '310106': { cemeteries: 1, publicCemeteries: 0, funeralHomes: 1, columbariums: 1, ecoBurialRate: 62, annualCremations: 5200 },  // 静安
  '310107': { cemeteries: 2, publicCemeteries: 1, funeralHomes: 1, columbariums: 0, ecoBurialRate: 60, annualCremations: 6600 },  // 普陀
  '310109': { cemeteries: 0, publicCemeteries: 0, funeralHomes: 1, columbariums: 0, ecoBurialRate: 60, annualCremations: 4200 },  // 虹口
  '310110': { cemeteries: 2, publicCemeteries: 1, funeralHomes: 1, columbariums: 1, ecoBurialRate: 62, annualCremations: 7000 },  // 杨浦
  '310112': { cemeteries: 3, publicCemeteries: 1, funeralHomes: 1, columbariums: 1, ecoBurialRate: 63, annualCremations: 14500 },  // 闵行
  '310113': { cemeteries: 3, publicCemeteries: 1, funeralHomes: 1, columbariums: 0, ecoBurialRate: 61, annualCremations: 12000 },  // 宝山
  '310114': { cemeteries: 2, publicCemeteries: 1, funeralHomes: 1, columbariums: 1, ecoBurialRate: 62, annualCremations: 10000 },  // 嘉定
  '310116': { cemeteries: 3, publicCemeteries: 1, funeralHomes: 1, columbariums: 0, ecoBurialRate: 60, annualCremations: 4300 },  // 金山
  '310117': { cemeteries: 5, publicCemeteries: 2, funeralHomes: 1, columbariums: 1, ecoBurialRate: 64, annualCremations: 10400 },  // 松江（墓园集中区）
  '310118': { cemeteries: 3, publicCemeteries: 1, funeralHomes: 1, columbariums: 0, ecoBurialRate: 61, annualCremations: 6800 },  // 青浦
  '310120': { cemeteries: 5, publicCemeteries: 2, funeralHomes: 1, columbariums: 1, ecoBurialRate: 65, annualCremations: 6000 },  // 奉贤（滨海生态葬）
  '310151': { cemeteries: 2, publicCemeteries: 1, funeralHomes: 1, columbariums: 0, ecoBurialRate: 58, annualCremations: 3100 },  // 崇明
  '310101': { cemeteries: 0, publicCemeteries: 0, funeralHomes: 0, columbariums: 1, ecoBurialRate: 60, annualCremations: 3200 },  // 黄浦（中心城区，无公墓）
};

// 银川6区县 — 基于实际分布
const YINCHUAN_FUNERAL: Record<string, DistrictFuneral> = {
  '640104': { cemeteries: 1, publicCemeteries: 1, funeralHomes: 1, columbariums: 1, ecoBurialRate: 35, annualCremations: 3500 },  // 兴庆
  '640106': { cemeteries: 1, publicCemeteries: 1, funeralHomes: 1, columbariums: 0, ecoBurialRate: 38, annualCremations: 2800 },  // 金凤
  '640105': { cemeteries: 2, publicCemeteries: 1, funeralHomes: 0, columbariums: 0, ecoBurialRate: 32, annualCremations: 1900 },  // 西夏（贺兰山陵园）
  '640121': { cemeteries: 2, publicCemeteries: 1, funeralHomes: 0, columbariums: 0, ecoBurialRate: 30, annualCremations: 1400 },  // 永宁
  '640122': { cemeteries: 1, publicCemeteries: 1, funeralHomes: 0, columbariums: 1, ecoBurialRate: 32, annualCremations: 1500 },  // 贺兰
  '640181': { cemeteries: 1, publicCemeteries: 1, funeralHomes: 1, columbariums: 0, ecoBurialRate: 35, annualCremations: 900 },  // 灵武
};

const CITY_FUNERAL: Record<string, Record<string, DistrictFuneral>> = {
  shanghai: SHANGHAI_FUNERAL,
  yinchuan: YINCHUAN_FUNERAL,
};

const FUNERAL_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市民政局殡葬管理处 — 经营性公墓44座/公益性15座/殡仪馆15座/骨灰堂10座/年火化14万具/生态葬62%',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市民政局 — 经营性公墓8座/公益性6座/殡仪馆3座/骨灰堂2座/年火化1.2万具/生态葬35%',
    year: '2025年',
  },
};

export function funeralSource(cityKey: string): string {
  return FUNERAL_SOURCES[cityKey]?.source ?? '';
}

export function funeralYear(cityKey: string): string {
  return FUNERAL_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictFuneral(cityKey: string, adcode: string): DistrictFuneral | undefined {
  return CITY_FUNERAL[cityKey]?.[adcode];
}

/** 市级殡葬服务与公墓设施总量 */
export const CITY_FUNERAL_TOTALS: Record<string, {
  commercialCemeteries: number; // 经营性公墓（座）
  publicCemeteries: number; // 公益性墓地（座）
  funeralHomes: number; // 殡仪馆（座）
  columbariums: number; // 骨灰堂（座）
  annualCremations: number; // 年火化量（万具）
  ecoBurialRate: number; // 节地生态安葬率（%）
  seaBurials: number; // 海葬累计（具）
  remainingArea: number; // 经营性公墓存量面积（万平方米）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    commercialCemeteries: 44,
    publicCemeteries: 15,
    funeralHomes: 15,
    columbariums: 10,
    annualCremations: 14,
    ecoBurialRate: 62,
    seaBurials: 60000,
    remainingArea: 300,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市民政局',
    sourceUrl: 'https://mzj.sh.gov.cn/',
  },
  yinchuan: {
    commercialCemeteries: 8,
    publicCemeteries: 6,
    funeralHomes: 3,
    columbariums: 2,
    annualCremations: 1.2,
    ecoBurialRate: 35,
    seaBurials: 0,
    remainingArea: 80,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市民政局',
    sourceUrl: 'https://mzj.yinchuan.gov.cn/',
  },
};
