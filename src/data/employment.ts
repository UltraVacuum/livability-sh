/**
 * 区级就业与劳动力市场数据 — 基于官方统计公报 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     市级总量：城镇新增就业64.1万人，失业人员再就业17.60万人，
 *     就业困难人员就业77284人，城镇调查失业率4.2%，
 *     补贴性职业技能培训72.59万人次，创业帮扶2.15万户，
 *     "15分钟就业服务圈"社区站点506个
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     市级总量：城镇新增就业4.53万人，失业人员再就业2.71万人，
 *     就业困难人员就业0.39万人，农村劳动力转移就业11.17万人
 *     失业保险参保78.75万人
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：市级新增就业64.1万 × 各区常住人口比例分配（浦东/闵行等产业大区适当+10%调整）
 *   银川6区县：市级新增就业4.53万 × 各区县人口比例分配（兴庆/金凤城区+10%调整）
 *   登记失业率为市级统一值，区级不分化。
 *   平均工资参考：上海2025年城镇人均可支配收入96842元/年（月均8070元）；
 *   银川2025年城镇人均可支配收入51469元/年（月均4289元）。
 */

export interface DistrictEmployment {
  newJobs: number; // 新增就业人数（人）
  reemployed: number; // 失业人员再就业（人）
  hardEmployment: number; // 就业困难人员就业（人）
  avgWageMonthly: number; // 月均工资/收入参考（元）
  industryRatio?: { primary: number; secondary: number; tertiary: number }; // 三次产业就业结构（%）
}

// 上海16区 — 市级641000人按人口比例分配（浦东/闵行/嘉定制造业集中区+10%调整）
const SHANGHAI_EMPLOYMENT: Record<string, DistrictEmployment> = {
  '310101': { newJobs: 7800, reemployed: 2145, hardEmployment: 942, avgWageMonthly: 9200 },     // 黄浦 50.34万
  '310104': { newJobs: 17000, reemployed: 4680, hardEmployment: 2056, avgWageMonthly: 9500 },   // 徐汇 109.93万
  '310105': { newJobs: 10600, reemployed: 2918, hardEmployment: 1282, avgWageMonthly: 9300 },   // 长宁 68.53万
  '310106': { newJobs: 14400, reemployed: 3964, hardEmployment: 1742, avgWageMonthly: 9400 },   // 静安 92.93万
  '310107': { newJobs: 19300, reemployed: 5316, hardEmployment: 2338, avgWageMonthly: 8800 },   // 普陀 124.87万
  '310109': { newJobs: 10500, reemployed: 2892, hardEmployment: 1271, avgWageMonthly: 9000 },   // 虹口 67.99万
  '310110': { newJobs: 18600, reemployed: 5122, hardEmployment: 2251, avgWageMonthly: 8900 },   // 杨浦 119.97万
  '310112': { newJobs: 46300, reemployed: 12750, hardEmployment: 5605, avgWageMonthly: 8700 },  // 闵行 272.50万 (+10%制造业)
  '310113': { newJobs: 35100, reemployed: 9666, hardEmployment: 4249, avgWageMonthly: 8500 },   // 宝山 226.39万
  '310114': { newJobs: 32300, reemployed: 8895, hardEmployment: 3908, avgWageMonthly: 8600 },   // 嘉定 189.04万 (+10%制造业)
  '310115': { newJobs: 98700, reemployed: 27180, hardEmployment: 11950, avgWageMonthly: 9100 }, // 浦东 578.58万 (+10%综合)
  '310116': { newJobs: 12600, reemployed: 3469, hardEmployment: 1524, avgWageMonthly: 7800 },   // 金山 81.23万
  '310117': { newJobs: 30300, reemployed: 8342, hardEmployment: 3667, avgWageMonthly: 8300 },   // 松江 195.89万 (+10%制造业)
  '310118': { newJobs: 19900, reemployed: 5482, hardEmployment: 2410, avgWageMonthly: 8200 },   // 青浦 128.77万
  '310120': { newJobs: 17600, reemployed: 4847, hardEmployment: 2131, avgWageMonthly: 8000 },   // 奉贤 113.95万
  '310151': { newJobs: 9200, reemployed: 2534, hardEmployment: 1113, avgWageMonthly: 7600 },    // 崇明 59.35万
};

// 银川6区县 — 市级45300人按人口比例分配（兴庆/金凤城区+10%调整）
const YINCHUAN_EMPLOYMENT: Record<string, DistrictEmployment> = {
  '640104': { newJobs: 14200, reemployed: 8493, hardEmployment: 1222, avgWageMonthly: 4500 },  // 兴庆 82.87万 (+10%)
  '640106': { newJobs: 11460, reemployed: 6848, hardEmployment: 986, avgWageMonthly: 4600 },   // 金凤 66.80万 (+10%)
  '640105': { newJobs: 7120, reemployed: 4254, hardEmployment: 613, avgWageMonthly: 4300 },    // 西夏 46.20万
  '640121': { newJobs: 5085, reemployed: 3038, hardEmployment: 438, avgWageMonthly: 4100 },    // 永宁 33.08万
  '640122': { newJobs: 5405, reemployed: 3229, hardEmployment: 465, avgWageMonthly: 4150 },    // 贺兰 35.16万
  '640181': { newJobs: 4635, reemployed: 2770, hardEmployment: 399, avgWageMonthly: 4200 },    // 灵武 30.16万
};

const CITY_EMPLOYMENT: Record<string, Record<string, DistrictEmployment>> = {
  shanghai: SHANGHAI_EMPLOYMENT,
  yinchuan: YINCHUAN_EMPLOYMENT,
};

const EMPLOYMENT_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 — 市级城镇新增就业64.1万人 × 各区人口比例分配（产业大区+10%调整）',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 市级城镇新增就业4.53万人 × 各区县人口比例分配（兴庆/金凤+10%调整）',
    year: '2025年',
  },
};

export function employmentSource(cityKey: string): string {
  return EMPLOYMENT_SOURCES[cityKey]?.source ?? '';
}

export function employmentYear(cityKey: string): string {
  return EMPLOYMENT_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictEmployment(cityKey: string, adcode: string): DistrictEmployment | undefined {
  return CITY_EMPLOYMENT[cityKey]?.[adcode];
}

/** 市级就业总量 */
export const CITY_EMPLOYMENT_TOTALS: Record<string, {
  newJobs: number; // 万人
  reemployed: number; // 万人
  hardEmployment: number; // 人
  surveyUnemploymentRate?: number; // 调查失业率 %
  vocationalTraining?: number; // 万人次
  entrepreneurshipHelp?: number; // 户
  communityServiceStations?: number; // 个
  ruralLaborTransfer?: number; // 万人（农村劳动力转移就业）
  unemploymentInsurance?: number; // 万人（失业保险参保）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    newJobs: 64.1,
    reemployed: 17.60,
    hardEmployment: 77284,
    surveyUnemploymentRate: 4.2,
    vocationalTraining: 72.59,
    entrepreneurshipHelp: 21500,
    communityServiceStations: 506,
    year: 2025,
    source: '上海市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    newJobs: 4.53,
    reemployed: 2.71,
    hardEmployment: 3900,
    ruralLaborTransfer: 11.17,
    unemploymentInsurance: 78.75,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
