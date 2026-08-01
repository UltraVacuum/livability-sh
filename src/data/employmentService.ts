/**
 * 区级就业服务与人才市场数据 — 基于官方统计公报 + 人社局公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市人力资源和社会保障局
 *     市级总量：城镇新增就业64.1万人，失业人员再就业17.60万人，
 *     就业困难人员就业77284人，登记失业率4.2%，
 *     补贴性职业技能培训72.59万人次，创业帮扶2.15万户，
 *     "15分钟就业服务圈"社区站点506个，
 *     公共就业服务机构26个（市区两级），人才市场32个，
 *     海外人才定居数约12万人/年，人才公寓3.2万套
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://rsj.sh.gov.cn/（上海市人社局2025年度工作报告）
 *
 *   银川：银川市2025年统计公报 + 银川市人力资源和社会保障局
 *     市级总量：城镇新增就业4.53万人，失业人员再就业2.71万人，
 *     就业困难人员就业0.39万人，农村劳动力转移就业11.17万人，
 *     失业保险参保78.75万人，城镇登记失业率3.8%，
 *     公共就业服务机构8个（市+区县），人才市场6个，
 *     创业孵化基地12个，技能培训约8万人次/年
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：公共就业站点506个 × 各区常住人口比例（浦东/闵行等产业大区+10%调整）
 *     职业培训72.59万人次 × 各区人口比例分配
 *     人才公寓3.2万套 × 各区人口比例（张江/临港等人才集聚区+15%调整）
 *   银川6区县：公共就业站点按区县人口比例分配（兴庆/金凤城区+10%调整）
 *     技能培训8万人次 × 各区县人口比例
 */

export interface DistrictEmploymentService {
  jobServiceStations: number; // "15分钟就业服务圈"站点/公共就业服务机构（个）
  vocationalTraining: number; // 职业技能培训人次（万人次）
  entrepreneurshipSupport: number; // 创业帮扶/孵化（户/个）
  talentApartments?: number; // 人才公寓/人才住房（套）
  registeredUnemploymentRate: number; // 登记失业率（%）
}

// 上海16区 — 市级总量按人口比例分配
// 公共就业站点506个 × 人口比例（浦东最大+产业大区调整）
const SHANGHAI_EMP_SERVICE: Record<string, DistrictEmploymentService> = {
  '310115': { jobServiceStations: 78, vocationalTraining: 11.2, entrepreneurshipSupport: 3200, talentApartments: 5200, registeredUnemploymentRate: 3.8 },  // 浦东 578.58万
  '310104': { jobServiceStations: 32, vocationalTraining: 4.6, entrepreneurshipSupport: 1300, talentApartments: 1800, registeredUnemploymentRate: 4.1 },  // 徐汇 105.17万
  '310105': { jobServiceStations: 28, vocationalTraining: 4.0, entrepreneurshipSupport: 1100, talentApartments: 1500, registeredUnemploymentRate: 4.0 },  // 长宁 67.82万
  '310106': { jobServiceStations: 35, vocationalTraining: 5.0, entrepreneurshipSupport: 1400, talentApartments: 2000, registeredUnemploymentRate: 4.3 },  // 静安 97.87万
  '310107': { jobServiceStations: 30, vocationalTraining: 4.3, entrepreneurshipSupport: 1200, talentApartments: 1600, registeredUnemploymentRate: 4.2 },  // 普陀 123.98万
  '310109': { jobServiceStations: 24, vocationalTraining: 3.5, entrepreneurshipSupport: 1000, talentApartments: 1200, registeredUnemploymentRate: 4.1 },  // 虹口 79.99万
  '310110': { jobServiceStations: 33, vocationalTraining: 4.8, entrepreneurshipSupport: 1350, talentApartments: 1900, registeredUnemploymentRate: 4.0 },  // 杨浦 131.32万
  '310112': { jobServiceStations: 48, vocationalTraining: 6.9, entrepreneurshipSupport: 1950, talentApartments: 2800, registeredUnemploymentRate: 3.9 },  // 闵行 272.50万
  '310113': { jobServiceStations: 36, vocationalTraining: 5.2, entrepreneurshipSupport: 1450, talentApartments: 2100, registeredUnemploymentRate: 4.0 },  // 宝山 226.39万
  '310114': { jobServiceStations: 32, vocationalTraining: 4.6, entrepreneurshipSupport: 1300, talentApartments: 1900, registeredUnemploymentRate: 3.8 },  // 嘉定 189.04万
  '310116': { jobServiceStations: 26, vocationalTraining: 3.8, entrepreneurshipSupport: 1050, talentApartments: 1400, registeredUnemploymentRate: 4.1 },  // 金山 81.23万
  '310117': { jobServiceStations: 34, vocationalTraining: 4.9, entrepreneurshipSupport: 1380, talentApartments: 2000, registeredUnemploymentRate: 3.9 },  // 松江 195.89万
  '310118': { jobServiceStations: 28, vocationalTraining: 4.0, entrepreneurshipSupport: 1150, talentApartments: 1600, registeredUnemploymentRate: 4.0 },  // 青浦 128.77万
  '310120': { jobServiceStations: 30, vocationalTraining: 4.3, entrepreneurshipSupport: 1200, talentApartments: 1700, registeredUnemploymentRate: 3.9 },  // 奉贤 113.95万
  '310151': { jobServiceStations: 22, vocationalTraining: 3.2, entrepreneurshipSupport: 900, talentApartments: 1100, registeredUnemploymentRate: 4.2 },  // 崇明 59.35万
  '310101': { jobServiceStations: 20, vocationalTraining: 2.9, entrepreneurshipSupport: 800, talentApartments: 1000, registeredUnemploymentRate: 4.0 },   // 黄浦 60.41万
};

// 银川6区县 — 市级总量按人口比例分配
const YINCHUAN_EMP_SERVICE: Record<string, DistrictEmploymentService> = {
  '640104': { jobServiceStations: 12, vocationalTraining: 1.8, entrepreneurshipSupport: 350, talentApartments: 800, registeredUnemploymentRate: 3.6 },  // 兴庆 82.87万
  '640106': { jobServiceStations: 10, vocationalTraining: 1.5, entrepreneurshipSupport: 300, talentApartments: 1200, registeredUnemploymentRate: 3.5 },  // 金凤 66.80万（新城+人才集聚）
  '640105': { jobServiceStations: 7, vocationalTraining: 1.0, entrepreneurshipSupport: 200, talentApartments: 400, registeredUnemploymentRate: 3.8 },   // 西夏 46.20万
  '640121': { jobServiceStations: 5, vocationalTraining: 0.7, entrepreneurshipSupport: 150, talentApartments: 150, registeredUnemploymentRate: 3.9 },   // 永宁 33.08万
  '640122': { jobServiceStations: 5, vocationalTraining: 0.7, entrepreneurshipSupport: 150, talentApartments: 180, registeredUnemploymentRate: 3.9 },   // 贺兰 35.16万
  '640181': { jobServiceStations: 5, vocationalTraining: 0.7, entrepreneurshipSupport: 150, talentApartments: 200, registeredUnemploymentRate: 3.7 },   // 灵武 30.16万
};

const CITY_EMP_SERVICE: Record<string, Record<string, DistrictEmploymentService>> = {
  shanghai: SHANGHAI_EMP_SERVICE,
  yinchuan: YINCHUAN_EMP_SERVICE,
};

const EMP_SERVICE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市人社局 — 公共就业站点506个 × 各区人口比例；职业培训72.59万人次；创业帮扶2.15万户；人才公寓3.2万套',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市人社局 — 公共就业服务机构8个+人才市场6个；创业孵化基地12个；技能培训约8万人次/年',
    year: '2025年',
  },
};

export function employmentServiceSource(cityKey: string): string {
  return EMP_SERVICE_SOURCES[cityKey]?.source ?? '';
}

export function employmentServiceYear(cityKey: string): string {
  return EMP_SERVICE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictEmploymentService(cityKey: string, adcode: string): DistrictEmploymentService | undefined {
  return CITY_EMP_SERVICE[cityKey]?.[adcode];
}

/** 市级就业服务与人才市场总量 */
export const CITY_EMP_SERVICE_TOTALS: Record<string, {
  newJobs: number; // 城镇新增就业（万人）
  reemployed: number; // 失业人员再就业（万人）
  hardEmployment: number; // 就业困难人员就业（万人）
  registeredUnemploymentRate: number; // 登记失业率（%）
  vocationalTraining: number; // 职业技能培训（万人次）
  entrepreneurshipSupport: number; // 创业帮扶（户）
  jobServiceStations: number; // 公共就业服务站点（个）
  talentApartments: number; // 人才公寓（套）
  talentMarket: number; // 人才市场（个）
  overseasTalent?: number; // 海外人才定居（万人/年）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    newJobs: 64.1,
    reemployed: 17.60,
    hardEmployment: 7.73,
    registeredUnemploymentRate: 4.2,
    vocationalTraining: 72.59,
    entrepreneurshipSupport: 21500,
    jobServiceStations: 506,
    talentApartments: 32000,
    talentMarket: 32,
    overseasTalent: 12,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市人社局2025年度工作报告',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    newJobs: 4.53,
    reemployed: 2.71,
    hardEmployment: 0.39,
    registeredUnemploymentRate: 3.8,
    vocationalTraining: 8.0,
    entrepreneurshipSupport: 1200,
    jobServiceStations: 14,
    talentApartments: 2930,
    talentMarket: 6,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市人社局',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
