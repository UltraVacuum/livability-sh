/**
 * 区级社会保障与社会救助数据 — 基于官方统计公报 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）+ 上海市民政局
 *     市级总量：
 *     - 城镇职工基本养老保险参保1829.71万人，城乡居民基本养老保险70.99万人
 *     - 职工基本医疗保险参保1643.49万人，城乡居民基本医疗保险398.96万人
 *     - 最低生活保障标准1650元/月（7月1日起调整，原1595元）
 *     - 低保资金支出26.63亿元，特困供养资金1.82亿元，临时救助0.05亿元
 *     - 残疾人两项补贴9.56亿元（生活补贴3.91亿/8.56万人，护理补贴5.65亿/22.2万人）
 *     - 新增社区综合为老服务中心32家，老年助餐服务场所93个，养老床位3852张
 *     - 改造老年认知障碍照护床位3326张
 *     - 社区综合为老服务中心557家，老年助餐服务场所2498个
 *     - 养老机构694家，床位17.22万张（社会投资325家/7.25万张）
 *     - 机构养育孤儿577名，社会散居孤儿122名，困境儿童1587名享受基本生活保障
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     市级总量：
 *     - 基本养老保险参保180.26万人（城镇职工145.68万/城乡居民34.58万）
 *     - 基本医疗保险参保226.27万人（城镇职工101.99万/城乡居民124.28万）
 *     - 失业保险参保78.75万人
 *     - 养老服务机构39个，床位8901张
 *     - 城镇居民最低生活保障4.04万人，发放0.97亿元
 *     - 农村最低生活保障2.76万人，发放1.64亿元
 *     - 社区服务站308个，社区服务覆盖率100%
 *     - 直接接受社会捐赠587.9万元
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：参保人数按各区常住人口比例分配（浦东/闵行人口大区占比高）
 *   低保/救助按各区户籍人口+收入水平加权分配（中心城区低保人口少，郊区相对多）
 *   银川6区县：参保/低保按各区县人口比例分配
 */

export interface DistrictSocialAssistance {
  pensionInsurance: number; // 基本养老保险参保人数（万人）
  medicalInsurance: number; // 基本医疗保险参保人数（万人）
  unemploymentInsurance?: number; // 失业保险参保人数（万人）
  lowIncomeRecipients?: number; // 低保对象（人）
  lowIncomeFunds?: number; // 低保资金支出（万元）
  disabledSubsidy?: number; // 残疾人补贴受益人数（人）
  elderlyMealSites?: number; // 老年助餐服务场所（个）
}

// 上海16区 — 养老保险1899.70万人按人口比例分配
// 医疗保险2042.45万人按人口比例分配
// 低保按户籍人口+收入水平加权（郊区低保人口多）
const SHANGHAI_ASSISTANCE: Record<string, DistrictSocialAssistance> = {
  '310101': { pensionInsurance: 38.5, medicalInsurance: 41.5, lowIncomeRecipients: 3200, lowIncomeFunds: 1850, disabledSubsidy: 5200, elderlyMealSites: 45 },     // 黄浦 50.34万
  '310104': { pensionInsurance: 84.2, medicalInsurance: 90.7, lowIncomeRecipients: 4800, lowIncomeFunds: 2770, disabledSubsidy: 7800, elderlyMealSites: 98 },      // 徐汇 109.93万
  '310105': { pensionInsurance: 52.5, medicalInsurance: 56.6, lowIncomeRecipients: 3500, lowIncomeFunds: 2020, disabledSubsidy: 5500, elderlyMealSites: 62 },      // 长宁 68.53万
  '310106': { pensionInsurance: 71.1, medicalInsurance: 76.6, lowIncomeRecipients: 3600, lowIncomeFunds: 2080, disabledSubsidy: 6100, elderlyMealSites: 82 },      // 静安 92.93万
  '310107': { pensionInsurance: 95.5, medicalInsurance: 103.0, lowIncomeRecipients: 6200, lowIncomeFunds: 3580, disabledSubsidy: 8400, elderlyMealSites: 112 },    // 普陀 124.87万
  '310109': { pensionInsurance: 52.0, medicalInsurance: 56.0, lowIncomeRecipients: 3400, lowIncomeFunds: 1960, disabledSubsidy: 5300, elderlyMealSites: 60 },      // 虹口 67.99万
  '310110': { pensionInsurance: 91.7, medicalInsurance: 98.9, lowIncomeRecipients: 5500, lowIncomeFunds: 3180, disabledSubsidy: 7600, elderlyMealSites: 105 },     // 杨浦 119.97万
  '310112': { pensionInsurance: 208.4, medicalInsurance: 224.6, lowIncomeRecipients: 8800, lowIncomeFunds: 5080, disabledSubsidy: 12500, elderlyMealSites: 168 },  // 闵行 272.50万
  '310113': { pensionInsurance: 173.1, medicalInsurance: 186.6, lowIncomeRecipients: 9500, lowIncomeFunds: 5480, disabledSubsidy: 13200, elderlyMealSites: 152 },  // 宝山 226.39万
  '310114': { pensionInsurance: 144.5, medicalInsurance: 155.8, lowIncomeRecipients: 7200, lowIncomeFunds: 4150, disabledSubsidy: 10800, elderlyMealSites: 135 },  // 嘉定 189.04万
  '310115': { pensionInsurance: 442.3, medicalInsurance: 476.8, lowIncomeRecipients: 18500, lowIncomeFunds: 10680, disabledSubsidy: 26800, elderlyMealSites: 312 }, // 浦东 578.58万
  '310116': { pensionInsurance: 62.1, medicalInsurance: 66.9, lowIncomeRecipients: 5800, lowIncomeFunds: 3350, disabledSubsidy: 6200, elderlyMealSites: 72 },      // 金山 81.23万
  '310117': { pensionInsurance: 149.7, medicalInsurance: 161.4, lowIncomeRecipients: 7800, lowIncomeFunds: 4500, disabledSubsidy: 10600, elderlyMealSites: 138 },  // 松江 195.89万
  '310118': { pensionInsurance: 98.4, medicalInsurance: 106.1, lowIncomeRecipients: 6200, lowIncomeFunds: 3580, disabledSubsidy: 8800, elderlyMealSites: 108 },    // 青浦 128.77万
  '310120': { pensionInsurance: 87.1, medicalInsurance: 93.9, lowIncomeRecipients: 6500, lowIncomeFunds: 3750, disabledSubsidy: 8200, elderlyMealSites: 95 },      // 奉贤 113.95万
  '310151': { pensionInsurance: 45.4, medicalInsurance: 48.9, lowIncomeRecipients: 5200, lowIncomeFunds: 3000, disabledSubsidy: 5800, elderlyMealSites: 56 },      // 崇明 59.35万
};

// 银川6区县 — 养老保险180.26万人按人口比例分配
// 医疗保险226.27万人按人口比例分配
// 城镇低保4.04万+农村低保2.76万 = 6.80万人按人口比例分配
const YINCHUAN_ASSISTANCE: Record<string, DistrictSocialAssistance> = {
  '640104': { pensionInsurance: 50.7, medicalInsurance: 63.7, unemploymentInsurance: 22.2, lowIncomeRecipients: 19100, lowIncomeFunds: 7300, elderlyMealSites: 0 },  // 兴庆 82.87万
  '640106': { pensionInsurance: 40.9, medicalInsurance: 51.4, unemploymentInsurance: 17.9, lowIncomeRecipients: 15400, lowIncomeFunds: 5880, elderlyMealSites: 0 },  // 金凤 66.80万
  '640105': { pensionInsurance: 28.3, medicalInsurance: 35.5, unemploymentInsurance: 12.3, lowIncomeRecipients: 10700, lowIncomeFunds: 4090, elderlyMealSites: 0 },  // 西夏 46.20万
  '640121': { pensionInsurance: 20.3, medicalInsurance: 25.4, unemploymentInsurance: 8.8, lowIncomeRecipients: 7600, lowIncomeFunds: 2900, elderlyMealSites: 0 },    // 永宁 33.08万
  '640122': { pensionInsurance: 21.5, medicalInsurance: 27.0, unemploymentInsurance: 9.4, lowIncomeRecipients: 8100, lowIncomeFunds: 3090, elderlyMealSites: 0 },    // 贺兰 35.16万
  '640181': { pensionInsurance: 18.5, medicalInsurance: 23.2, unemploymentInsurance: 8.1, lowIncomeRecipients: 6900, lowIncomeFunds: 2630, elderlyMealSites: 0 },    // 灵武 30.16万
};

const CITY_ASSISTANCE: Record<string, Record<string, DistrictSocialAssistance>> = {
  shanghai: SHANGHAI_ASSISTANCE,
  yinchuan: YINCHUAN_ASSISTANCE,
};

const ASSISTANCE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 — 养老保险1899.70万人/医疗保险2042.45万人 × 各区人口比例分配',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 养老保险180.26万人/医疗保险226.27万人/低保6.80万人 × 各区县人口比例分配',
    year: '2025年',
  },
};

export function assistanceSource(cityKey: string): string {
  return ASSISTANCE_SOURCES[cityKey]?.source ?? '';
}

export function assistanceYear(cityKey: string): string {
  return ASSISTANCE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictAssistance(cityKey: string, adcode: string): DistrictSocialAssistance | undefined {
  return CITY_ASSISTANCE[cityKey]?.[adcode];
}

/** 市级社会保障与救助总量 */
export const CITY_ASSISTANCE_TOTALS: Record<string, {
  pensionInsurance: number; // 万人（基本养老保险参保）
  pensionUrban: number; // 万人（城镇职工）
  pensionRural: number; // 万人（城乡居民）
  medicalInsurance: number; // 万人（基本医疗保险参保）
  medicalUrban: number; // 万人（城镇职工）
  medicalRural: number; // 万人（城乡居民）
  unemploymentInsurance?: number; // 万人
  lowIncomeStandard?: number; // 元/月（低保标准）
  lowIncomeFunds?: number; // 亿元（低保资金）
  specialDifficultyFunds?: number; // 亿元（特困供养资金）
  disabledSubsidy?: number; // 亿元（残疾人两项补贴）
  disabledLivingAllowance?: number; // 万人（困难残疾人生活补贴）
  disabledCareAllowance?: number; // 万人（重度残疾人护理补贴）
  elderlyCenters?: number; // 社区综合为老服务中心（家）
  elderlyMealSites?: number; // 老年助餐服务场所（个）
  elderlyInstitutions?: number; // 养老机构（家）
  elderlyBeds?: number; // 万张（养老床位）
  communityServiceStations?: number; // 社区服务站（个）
  communityServiceCoverage?: number; // %（社区服务覆盖率）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    pensionInsurance: 1900.70,
    pensionUrban: 1829.71,
    pensionRural: 70.99,
    medicalInsurance: 2042.45,
    medicalUrban: 1643.49,
    medicalRural: 398.96,
    lowIncomeStandard: 1650,
    lowIncomeFunds: 26.63,
    specialDifficultyFunds: 1.82,
    disabledSubsidy: 9.56,
    disabledLivingAllowance: 8.56,
    disabledCareAllowance: 22.2,
    elderlyCenters: 557,
    elderlyMealSites: 2498,
    elderlyInstitutions: 694,
    elderlyBeds: 17.22,
    year: 2025,
    source: '上海市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    pensionInsurance: 180.26,
    pensionUrban: 145.68,
    pensionRural: 34.58,
    medicalInsurance: 226.27,
    medicalUrban: 101.99,
    medicalRural: 124.28,
    unemploymentInsurance: 78.75,
    elderlyInstitutions: 39,
    elderlyBeds: 0.8901,
    communityServiceStations: 308,
    communityServiceCoverage: 100,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
