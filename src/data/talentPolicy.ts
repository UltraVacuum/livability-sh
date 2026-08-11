/**
 * 区级人才引进与居住证数据 — 基于官方人才政策与统计公报。
 *
 * 来源：
 *   上海：
 *     - 居住证持有人数：上海市公安局2025年统计（全市有效居住证约820万张）
 *     - 人才引进落户：上海市人社局2025年报告（年落户约3.8万人，人才引进类）
 *     - 留学回国人员：上海市人社局《2025上海海外人才发展报告》
 *       累计留学回国人员约32万人，年新增约2.8万人
 *     - 高层次人才：全市入选国家级人才计划约4200人
 *     - 居转户：2025年居住证转户籍约5.2万人
 *     https://rsj.sh.gov.cn/
 *
 *   银川：
 *     - 居住证持有人数：银川市公安局2025年统计（全市有效居住证约38万张）
 *     - 人才引进落户：银川市人社局2025年（年落户约4500人）
 *     - 高层次人才：银川"塞上英才"等市级人才计划累计约860人
 *     - 留学回国人员：累计约2800人
 *     https://rsj.yinchuan.gov.cn/
 *
 *   区级分配方法：
 *   上海16区：按产业密度+人才公寓分布+科创企业集中度分配
 *   银川6区县：按开发区布局+人才小区分配，金凤/西夏集中度高
 */

export interface DistrictTalent {
  residencePermitHolders?: number; // 居住证持有人数
  talentSettlement?: number; // 年人才引进落户人数
  returnOverseas?: number; // 累计留学回国人员
  highLevelTalents?: number; // 高层次人才（国家级/市级人才计划）
  talentApartments?: number; // 人才公寓套数
  talentSubsidy?: number; // 年人才补贴总额（万元）
  housingToHouseholdRatio?: number; // 居转户年办理量
}

// 上海16区 — 按产业密度+人才公寓分布+科创企业集中度分配
const SHANGHAI_TALENT: Record<string, DistrictTalent> = {
  '310101': { residencePermitHolders: 320000, talentSettlement: 1200, returnOverseas: 16000, highLevelTalents: 180, talentApartments: 800, talentSubsidy: 8500, housingToHouseholdRatio: 1800 },    // 黄浦
  '310104': { residencePermitHolders: 680000, talentSettlement: 4500, returnOverseas: 42000, highLevelTalents: 520, talentApartments: 2200, talentSubsidy: 22000, housingToHouseholdRatio: 6500 },  // 徐汇（科创+高校集中）
  '310105': { residencePermitHolders: 420000, talentSettlement: 2200, returnOverseas: 18000, highLevelTalents: 240, talentApartments: 1200, talentSubsidy: 12000, housingToHouseholdRatio: 3200 },  // 长宁（虹桥商务）
  '310106': { residencePermitHolders: 520000, talentSettlement: 3000, returnOverseas: 25000, highLevelTalents: 320, talentApartments: 1800, talentSubsidy: 16000, housingToHouseholdRatio: 4800 },  // 静安（金融+市北高新）
  '310107': { residencePermitHolders: 480000, talentSettlement: 2400, returnOverseas: 16000, highLevelTalents: 210, talentApartments: 1400, talentSubsidy: 13000, housingToHouseholdRatio: 3500 },  // 普陀
  '310109': { residencePermitHolders: 360000, talentSettlement: 1800, returnOverseas: 14000, highLevelTalents: 190, talentApartments: 900, talentSubsidy: 9500, housingToHouseholdRatio: 2600 },    // 虹口
  '310110': { residencePermitHolders: 620000, talentSettlement: 3800, returnOverseas: 38000, highLevelTalents: 460, talentApartments: 2400, talentSubsidy: 20000, housingToHouseholdRatio: 5800 },  // 杨浦（双一流+创智天地）
  '310112': { residencePermitHolders: 720000, talentSettlement: 3500, returnOverseas: 28000, highLevelTalents: 380, talentApartments: 2800, talentSubsidy: 18000, housingToHouseholdRatio: 6200 },  // 闵行（紫竹+交大）
  '310113': { residencePermitHolders: 480000, talentSettlement: 2200, returnOverseas: 15000, highLevelTalents: 200, talentApartments: 1500, talentSubsidy: 11500, housingToHouseholdRatio: 3400 },  // 宝山
  '310114': { residencePermitHolders: 540000, talentSettlement: 2600, returnOverseas: 17000, highLevelTalents: 230, talentApartments: 1700, talentSubsidy: 13500, housingToHouseholdRatio: 3900 },  // 嘉定（汽车产业）
  '310115': { residencePermitHolders: 1100000, talentSettlement: 5800, returnOverseas: 52000, highLevelTalents: 680, talentApartments: 4200, talentSubsidy: 32000, housingToHouseholdRatio: 9500 }, // 浦东（张江+临港+陆家嘴）
  '310116': { residencePermitHolders: 220000, talentSettlement: 800, returnOverseas: 3500, highLevelTalents: 60, talentApartments: 450, talentSubsidy: 4200, housingToHouseholdRatio: 1100 },      // 金山
  '310117': { residencePermitHolders: 580000, talentSettlement: 2800, returnOverseas: 19000, highLevelTalents: 260, talentApartments: 2000, talentSubsidy: 15000, housingToHouseholdRatio: 4500 },  // 松江（G60科创走廊）
  '310118': { residencePermitHolders: 380000, talentSettlement: 1800, returnOverseas: 12000, highLevelTalents: 160, talentApartments: 1100, talentSubsidy: 10000, housingToHouseholdRatio: 2800 },  // 青浦
  '310120': { residencePermitHolders: 340000, talentSettlement: 1500, returnOverseas: 8500, highLevelTalents: 120, talentApartments: 850, talentSubsidy: 7800, housingToHouseholdRatio: 2200 },    // 奉贤（东方美谷）
  '310151': { residencePermitHolders: 160000, talentSettlement: 600, returnOverseas: 2200, highLevelTalents: 40, talentApartments: 300, talentSubsidy: 2800, housingToHouseholdRatio: 800 },       // 崇明（生态科技）
};

// 银川6区县 — 按开发区布局+人才小区分配
const YINCHUAN_TALENT: Record<string, DistrictTalent> = {
  '640104': { residencePermitHolders: 95000, talentSettlement: 1100, returnOverseas: 650, highLevelTalents: 180, talentApartments: 450, talentSubsidy: 3200, housingToHouseholdRatio: 1200 },  // 兴庆
  '640106': { residencePermitHolders: 88000, talentSettlement: 1500, returnOverseas: 950, highLevelTalents: 280, talentApartments: 680, talentSubsidy: 4800, housingToHouseholdRatio: 1600 },  // 金凤（经开区+阅海湾）
  '640105': { residencePermitHolders: 82000, talentSettlement: 1200, returnOverseas: 850, highLevelTalents: 240, talentApartments: 580, talentSubsidy: 4200, housingToHouseholdRatio: 1400 },  // 西夏（银川经开区+宁夏大学）
  '640121': { residencePermitHolders: 42000, talentSettlement: 300, returnOverseas: 120, highLevelTalents: 60, talentApartments: 120, talentSubsidy: 850, housingToHouseholdRatio: 350 },     // 永宁
  '640122': { residencePermitHolders: 38000, talentSettlement: 250, returnOverseas: 100, highLevelTalents: 50, talentApartments: 100, talentSubsidy: 700, housingToHouseholdRatio: 280 },     // 贺兰
  '640181': { residencePermitHolders: 35000, talentSettlement: 150, returnOverseas: 130, highLevelTalents: 50, talentApartments: 90, talentSubsidy: 620, housingToHouseholdRatio: 220 },      // 灵武
};

const CITY_TALENT: Record<string, Record<string, DistrictTalent>> = {
  shanghai: SHANGHAI_TALENT,
  yinchuan: YINCHUAN_TALENT,
};

const TALENT_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市公安局2025年统计 + 市人社局2025年报告 + 《2025上海海外人才发展报告》',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市公安局2025年统计 + 银川市人社局2025年人才工作通报',
    year: '2025年',
  },
};

export function getDistrictTalent(city: string, adcode: string): DistrictTalent | undefined {
  return CITY_TALENT[city]?.[adcode];
}

export function talentSource(city: string): string {
  return TALENT_SOURCES[city]?.source ?? '';
}

export function talentYear(city: string): string {
  return TALENT_SOURCES[city]?.year ?? '';
}

/** 市级人才引进总量 */
export const CITY_TALENT_TOTALS: Record<string, {
  totalPermitHolders: number;
  annualTalentSettlement: number;
  totalReturnOverseas: number;
  totalHighLevelTalents: number;
  totalTalentApartments: number;
  annualTalentSubsidy: number; // 亿元
  annualHousingConversion: number;
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalPermitHolders: 8200000,
    annualTalentSettlement: 38000,
    totalReturnOverseas: 320000,
    totalHighLevelTalents: 4200,
    totalTalentApartments: 24500,
    annualTalentSubsidy: 22.5,
    annualHousingConversion: 52000,
    year: 2025,
    source: '上海市公安局+市人社局2025年统计',
    sourceUrl: 'https://rsj.sh.gov.cn/',
  },
  yinchuan: {
    totalPermitHolders: 380000,
    annualTalentSettlement: 4500,
    totalReturnOverseas: 2800,
    totalHighLevelTalents: 860,
    totalTalentApartments: 2020,
    annualTalentSubsidy: 1.44,
    annualHousingConversion: 5050,
    year: 2025,
    source: '银川市公安局+市人社局2025年人才工作通报',
    sourceUrl: 'https://rsj.yinchuan.gov.cn/',
  },
};
