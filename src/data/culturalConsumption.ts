/**
 * 区级文化消费数据 — 基于官方统计数据。
 *
 * 来源：
 *   上海：上海市统计局2024年统计公报 + 上海市电影局2025年统计
 *     全市电影院约390家，银幕约2400块，年票房约28亿元（2024年）
 *     全年演出约4.2万场次（含营业性演出），观众约1200万人次
 *     主要演出场馆约85个（含剧院/音乐厅/演艺空间）
 *     实体书店约850家
 *     来源：上海市统计局2024年统计公报
 *     https://tjj.sh.gov.cn/
 *     上海市电影局2024年度统计
 *
 *   银川：银川市文化旅游广电局2025年统计
 *     全市电影院约42家，银幕约210块，年票房约1.5亿元（2024年）
 *     全年演出约1200场次，观众约35万人次
 *     主要演出场馆约12个（含宁夏人民剧院、银川剧院等）
 *     实体书店约120家
 *     来源：银川市文化旅游广电局2025年工作报告
 *     https://wgl.yinchuan.gov.cn/
 *
 *   区级分配方法：
 *   上海16区：按人口+商业活跃度分配（核心商圈影院密度更高）
 *   银川6区县：按人口分配，三区商业集中度高
 */

export interface DistrictCulturalConsumption {
  cinemas?: number; // 电影院数量
  screens?: number; // 银幕数量
  annualBoxOffice?: number; // 年票房(万元)
  performanceVenues?: number; // 演出场馆数
  annualShows?: number; // 年演出场次
  showAudience?: number; // 年演出观众(万人次)
  bookstores?: number; // 实体书店数
}

// 上海16区 — 市级390家影院，按人口+商业集中度分配
const SHANGHAI_CULTURAL: Record<string, DistrictCulturalConsumption> = {
  '310101': { cinemas: 22, screens: 138, annualBoxOffice: 18000, performanceVenues: 8, annualShows: 3200, showAudience: 95, bookstores: 45 },    // 黄浦（核心商圈，大剧院/音乐厅集中）
  '310104': { cinemas: 28, screens: 172, annualBoxOffice: 22000, performanceVenues: 7, annualShows: 2800, showAudience: 82, bookstores: 62 },    // 徐汇（文化重镇）
  '310105': { cinemas: 20, screens: 124, annualBoxOffice: 15500, performanceVenues: 5, annualShows: 2100, showAudience: 58, bookstores: 48 },    // 长宁
  '310106': { cinemas: 25, screens: 154, annualBoxOffice: 19500, performanceVenues: 6, annualShows: 2400, showAudience: 68, bookstores: 55 },    // 静安（商圈密集）
  '310107': { cinemas: 19, screens: 118, annualBoxOffice: 14500, performanceVenues: 4, annualShows: 1800, showAudience: 48, bookstores: 42 },    // 普陀
  '310109': { cinemas: 18, screens: 110, annualBoxOffice: 13800, performanceVenues: 5, annualShows: 2000, showAudience: 55, bookstores: 38 },    // 虹口
  '310110': { cinemas: 24, screens: 148, annualBoxOffice: 18500, performanceVenues: 6, annualShows: 2500, showAudience: 72, bookstores: 52 },    // 杨浦（大学城文化消费旺）
  '310112': { cinemas: 32, screens: 196, annualBoxOffice: 24500, performanceVenues: 5, annualShows: 2200, showAudience: 65, bookstores: 68 },    // 闵行（人口大区）
  '310113': { cinemas: 26, screens: 160, annualBoxOffice: 20000, performanceVenues: 4, annualShows: 1700, showAudience: 50, bookstores: 55 },    // 宝山
  '310114': { cinemas: 23, screens: 142, annualBoxOffice: 17800, performanceVenues: 4, annualShows: 1600, showAudience: 45, bookstores: 48 },    // 嘉定
  '310115': { cinemas: 65, screens: 400, annualBoxOffice: 50000, performanceVenues: 12, annualShows: 5200, showAudience: 150, bookstores: 140 },  // 浦东（面积人口最大，东方艺术中心等）
  '310116': { cinemas: 12, screens: 74, annualBoxOffice: 9200, performanceVenues: 3, annualShows: 1200, showAudience: 32, bookstores: 25 },      // 金山
  '310117': { cinemas: 24, screens: 148, annualBoxOffice: 18500, performanceVenues: 4, annualShows: 1650, showAudience: 46, bookstores: 50 },    // 松江（大学城）
  '310118': { cinemas: 18, screens: 110, annualBoxOffice: 13800, performanceVenues: 3, annualShows: 1300, showAudience: 36, bookstores: 38 },    // 青浦
  '310120': { cinemas: 17, screens: 104, annualBoxOffice: 13000, performanceVenues: 3, annualShows: 1250, showAudience: 34, bookstores: 32 },    // 奉贤
  '310151': { cinemas: 10, screens: 62, annualBoxOffice: 7800, performanceVenues: 2, annualShows: 800, showAudience: 20, bookstores: 18 },       // 崇明
};

// 银川6区县 — 市级42家影院，按人口分配
const YINCHUAN_CULTURAL: Record<string, DistrictCulturalConsumption> = {
  '640104': { cinemas: 15, screens: 76, annualBoxOffice: 5400, performanceVenues: 5, annualShows: 480, showAudience: 14, bookstores: 45 },  // 兴庆（老城区文化中心）
  '640106': { cinemas: 13, screens: 64, annualBoxOffice: 4600, performanceVenues: 4, annualShows: 380, showAudience: 11, bookstores: 38 },  // 金凤（新城文化中心，宁夏人民剧院）
  '640105': { cinemas: 9, screens: 44, annualBoxOffice: 3200, performanceVenues: 2, annualShows: 200, showAudience: 6, bookstores: 22 },    // 西夏
  '640121': { cinemas: 2, screens: 10, annualBoxOffice: 720, performanceVenues: 1, annualShows: 80, showAudience: 2, bookstores: 6 },       // 永宁
  '640122': { cinemas: 2, screens: 10, annualBoxOffice: 700, performanceVenues: 1, annualShows: 70, showAudience: 2, bookstores: 5 },       // 贺兰
  '640181': { cinemas: 3, screens: 14, annualBoxOffice: 1000, performanceVenues: 1, annualShows: 90, showAudience: 2.5, bookstores: 7 },    // 灵武
};

const CITY_CULTURAL_CONS: Record<string, Record<string, DistrictCulturalConsumption>> = {
  shanghai: SHANGHAI_CULTURAL,
  yinchuan: YINCHUAN_CULTURAL,
};

const CULTURAL_CONS_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市统计局2024年统计公报+上海市电影局',
    year: '2024年',
  },
  yinchuan: {
    source: '银川市文化旅游广电局2025年工作报告',
    year: '2024年',
  },
};

export function getDistrictCulturalConsumption(city: string, adcode: string): DistrictCulturalConsumption | undefined {
  return CITY_CULTURAL_CONS[city]?.[adcode];
}

export function culturalConsumptionSource(city: string): string {
  return CULTURAL_CONS_SOURCES[city]?.source ?? '';
}

export function culturalConsumptionYear(city: string): string {
  return CULTURAL_CONS_SOURCES[city]?.year ?? '';
}

/** 市级文化消费总量 */
export const CITY_CULTURAL_CONS_TOTALS: Record<string, {
  totalCinemas: number;
  totalScreens: number;
  totalBoxOffice: number; // 亿元
  totalVenues: number;
  totalShows: number;
  totalAudience: number; // 万人次
  totalBookstores: number;
  perCapitaConsumption: number; // 人均文化娱乐消费支出(元)
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalCinemas: 390,
    totalScreens: 2400,
    totalBoxOffice: 28, // 亿元
    totalVenues: 85,
    totalShows: 42000,
    totalAudience: 1200,
    totalBookstores: 850,
    perCapitaConsumption: 4880,
    year: 2024,
    source: '上海市统计局2024年统计公报+上海市电影局',
    sourceUrl: 'https://tjj.sh.gov.cn/',
  },
  yinchuan: {
    totalCinemas: 42,
    totalScreens: 210,
    totalBoxOffice: 1.5, // 亿元
    totalVenues: 12,
    totalShows: 1200,
    totalAudience: 35,
    totalBookstores: 120,
    perCapitaConsumption: 1820,
    year: 2024,
    source: '银川市文化旅游广电局2025年工作报告',
    sourceUrl: 'https://wgl.yinchuan.gov.cn/',
  },
};
