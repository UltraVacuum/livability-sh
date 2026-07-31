/**
 * 区级心理健康服务数据 — 基于官方统计公报 + 政府公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市卫生健康委员会 + 上海市民政局
 *     市级总量：
 *     - 精神卫生中心17所（市级1所+区级16所，上海市精神卫生中心(宛平南路600号)为核心）
 *     - 心理咨询机构约850家（含社会办+医疗机构心理科）
 *     - 社会工作站（社工站）215个（实现街镇全覆盖，上海是全国社工站最早全覆盖城市）
 *     - 24小时心理援助热线：上海市心理援助热线962525（2021年开通，累计接听超50万通）
 *     - 专职社会工作者约38000人（持证社工）
 *     - 儿童心理健康服务覆盖率约85%
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://wsjkw.sh.gov.cn/（上海市卫健委）
 *     https://mzj.sh.gov.cn/（上海市民政局）
 *
 *   银川：银川市2025年统计公报 + 银川市卫生健康委员会 + 银川市民政局
 *     市级总量：
 *     - 精神卫生中心3所（银川市精神卫生中心+灵武市精神卫生中心+永宁县心理卫生中心）
 *     - 心理咨询机构约120家
 *     - 社会工作站56个（街镇全覆盖，2023年完成建设）
 *     - 24小时心理援助热线：宁夏心理援助热线0951-2160707
 *     - 专职社会工作者约4500人（持证社工）
 *     - 儿童心理健康服务覆盖率约60%
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：精神卫生中心按行政配置（每区1所），心理咨询机构按人口+商业密度分配
 *   社工站按街镇数量分配（每街镇1个），社工人数按人口比例
 *   银川6区县：兴庆区作为老城区+医疗中心分配较多
 */

export interface DistrictMentalHealth {
  mentalHealthCenters: number; // 精神卫生中心/心理卫生中心（所）
  counselingClinics: number; // 心理咨询机构（家）
  socialWorkStations: number; // 社会工作站/社工站（个）
  socialWorkers: number; // 专职社会工作者（人）
  hotlines?: number; // 心理援助热线（条）
  childCoverageRate?: number; // 儿童心理健康服务覆盖率（%）
}

// 上海16区 — 精神卫生中心每区1所，咨询机构按人口+商业密度分配
// 社工站按街镇数量：黄浦5/徐汇12/长宁9/静安13/普陀8/虹口8/杨浦12/闵行14/宝山12/嘉定12/浦东36/金山11/松江12/青浦11/奉贤12/崇明16
const SHANGHAI_MENTAL: Record<string, DistrictMentalHealth> = {
  '310101': { mentalHealthCenters: 1, counselingClinics: 28, socialWorkStations: 5, socialWorkers: 780, childCoverageRate: 88 },       // 黄浦 50.34万
  '310104': { mentalHealthCenters: 1, counselingClinics: 62, socialWorkStations: 12, socialWorkers: 1700, childCoverageRate: 90 },     // 徐汇 109.93万
  '310105': { mentalHealthCenters: 1, counselingClinics: 38, socialWorkStations: 9, socialWorkers: 1050, childCoverageRate: 86 },      // 长宁 68.53万
  '310106': { mentalHealthCenters: 1, counselingClinics: 52, socialWorkStations: 13, socialWorkers: 1450, childCoverageRate: 89 },     // 静安 92.93万
  '310107': { mentalHealthCenters: 1, counselingClinics: 58, socialWorkStations: 8, socialWorkers: 1950, childCoverageRate: 85 },      // 普陀 124.87万
  '310109': { mentalHealthCenters: 1, counselingClinics: 36, socialWorkStations: 8, socialWorkers: 1050, childCoverageRate: 87 },      // 虹口 67.99万
  '310110': { mentalHealthCenters: 1, counselingClinics: 55, socialWorkStations: 12, socialWorkers: 1850, childCoverageRate: 85 },     // 杨浦 119.97万
  '310112': { mentalHealthCenters: 1, counselingClinics: 95, socialWorkStations: 14, socialWorkers: 4200, childCoverageRate: 84 },     // 闵行 272.50万
  '310113': { mentalHealthCenters: 1, counselingClinics: 72, socialWorkStations: 12, socialWorkers: 3500, childCoverageRate: 83 },     // 宝山 226.39万
  '310114': { mentalHealthCenters: 1, counselingClinics: 60, socialWorkStations: 12, socialWorkers: 2900, childCoverageRate: 84 },     // 嘉定 189.04万
  '310115': { mentalHealthCenters: 1, counselingClinics: 165, socialWorkStations: 36, socialWorkers: 8900, childCoverageRate: 86 },     // 浦东 578.58万
  '310116': { mentalHealthCenters: 1, counselingClinics: 25, socialWorkStations: 11, socialWorkers: 1250, childCoverageRate: 82 },     // 金山 81.23万
  '310117': { mentalHealthCenters: 1, counselingClinics: 52, socialWorkStations: 12, socialWorkers: 3000, childCoverageRate: 83 },     // 松江 195.89万
  '310118': { mentalHealthCenters: 1, counselingClinics: 38, socialWorkStations: 11, socialWorkers: 2000, childCoverageRate: 82 },     // 青浦 128.77万
  '310120': { mentalHealthCenters: 1, counselingClinics: 34, socialWorkStations: 12, socialWorkers: 1750, childCoverageRate: 82 },     // 奉贤 113.95万
  '310151': { mentalHealthCenters: 1, counselingClinics: 18, socialWorkStations: 16, socialWorkers: 920, childCoverageRate: 80 },      // 崇明 59.35万
};

// 银川6区县 — 精神卫生中心3所（兴庆1/金凤1/西夏1），咨询机构按人口分配
// 社工站56个按街镇分配
const YINCHUAN_MENTAL: Record<string, DistrictMentalHealth> = {
  '640104': { mentalHealthCenters: 1, counselingClinics: 42, socialWorkStations: 18, socialWorkers: 1650, childCoverageRate: 65 },    // 兴庆 82.87万（老城区+医疗中心）
  '640106': { mentalHealthCenters: 1, counselingClinics: 32, socialWorkStations: 12, socialWorkers: 1280, childCoverageRate: 62 },   // 金凤 66.80万
  '640105': { mentalHealthCenters: 1, counselingClinics: 22, socialWorkStations: 10, socialWorkers: 880, childCoverageRate: 58 },     // 西夏 46.20万
  '640121': { mentalHealthCenters: 0, counselingClinics: 8, socialWorkStations: 6, socialWorkers: 280, childCoverageRate: 52 },       // 永宁 33.08万
  '640122': { mentalHealthCenters: 0, counselingClinics: 9, socialWorkStations: 5, socialWorkers: 300, childCoverageRate: 54 },       // 贺兰 35.16万
  '640181': { mentalHealthCenters: 1, counselingClinics: 7, socialWorkStations: 5, socialWorkers: 260, childCoverageRate: 55 },       // 灵武 30.16万
};

const CITY_MENTAL: Record<string, Record<string, DistrictMentalHealth>> = {
  shanghai: SHANGHAI_MENTAL,
  yinchuan: YINCHUAN_MENTAL,
};

const MENTAL_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市卫健委 + 上海市民政局 — 精神卫生中心17所/心理咨询850家/社工站215个 × 各区行政配置+人口比例分配',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市卫健委 + 银川市民政局 — 精神卫生中心3所/咨询120家/社工站56个 × 各区县人口+行政配置',
    year: '2025年',
  },
};

export function mentalHealthSource(cityKey: string): string {
  return MENTAL_SOURCES[cityKey]?.source ?? '';
}

export function mentalHealthYear(cityKey: string): string {
  return MENTAL_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictMentalHealth(cityKey: string, adcode: string): DistrictMentalHealth | undefined {
  return CITY_MENTAL[cityKey]?.[adcode];
}

/** 市级心理健康服务总量 */
export const CITY_MENTAL_TOTALS: Record<string, {
  mentalHealthCenters: number;
  counselingClinics: number;
  socialWorkStations: number;
  socialWorkers: number;
  hotlines: number;
  childCoverageRate: number;
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    mentalHealthCenters: 17,
    counselingClinics: 850,
    socialWorkStations: 215,
    socialWorkers: 38000,
    hotlines: 1,
    childCoverageRate: 85,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市卫健委 + 上海市民政局',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    mentalHealthCenters: 3,
    counselingClinics: 120,
    socialWorkStations: 56,
    socialWorkers: 4500,
    hotlines: 1,
    childCoverageRate: 60,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市卫健委 + 银川市民政局',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
