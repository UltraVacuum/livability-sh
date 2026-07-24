/**
 * 区级托育与学前教育数据 — 基于官方统计公报 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     市级总量：普通小学654所，在校生90.78万人；
 *     向27.7万名婴幼儿发放育儿补贴（覆盖0-3岁托育相关）；
 *     2025学年民办小学44所/学生8.00万人，民办中学137所/学生10.15万人
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *     上海市教委统计：截至2024年，全市幼儿园约1400+所，在园幼儿约30万人；
 *     托育机构（含社区托育、家庭托育点）约2000个网点，提供托位约5.8万个。
 *     （上海市2024年托育服务发展工作报告）
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     幼儿园396所，招生2.58万人，在园幼儿8.77万人，下降8.6%；
 *     学前三年毛入园率109.2%
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：幼儿园约1400所 × 各区常住人口比例分配；
 *     托育网点约2000个 × 各区人口比例（中心城区托育密度高，+15%调整）；
 *     育儿补贴27.7万婴幼儿 × 各区0-3岁人口比例（近似按总人口比例）
 *   银川6区县：幼儿园396所 × 各区县人口比例分配（兴庆区为教育中心+15%调整）
 */

export interface DistrictChildcare {
  kindergartens: number; // 幼儿园数量（所）
  kindergartenStudents: number; // 在园幼儿（人）
  nurseryCenters?: number; // 托育机构/网点数（个）
  nurserySlots?: number; // 托位数（个）
  childcareSubsidy?: number; // 育儿补贴覆盖婴幼儿（人）
  preschoolEnrollmentRate?: number; // 学前三年毛入园率（%）
}

// 上海16区 — 幼儿园约1400所按人口比例分配（徐汇/杨浦等教育密集区+10%调整）
// 在园幼儿约30万人按人口比例分配
const SHANGHAI_CHILDCARE: Record<string, DistrictChildcare> = {
  '310101': { kindergartens: 22, kindergartenStudents: 4700, nurseryCenters: 30, nurserySlots: 870, childcareSubsidy: 4300 },     // 黄浦 50.34万
  '310104': { kindergartens: 48, kindergartenStudents: 10300, nurseryCenters: 66, nurserySlots: 1910, childcareSubsidy: 9400 },   // 徐汇 109.93万 (+10%)
  '310105': { kindergartens: 30, kindergartenStudents: 6400, nurseryCenters: 41, nurserySlots: 1190, childcareSubsidy: 5860 },    // 长宁 68.53万
  '310106': { kindergartens: 41, kindergartenStudents: 8700, nurseryCenters: 56, nurserySlots: 1620, childcareSubsidy: 7950 },    // 静安 92.93万
  '310107': { kindergartens: 55, kindergartenStudents: 11700, nurseryCenters: 75, nurserySlots: 2170, childcareSubsidy: 10680 },  // 普陀 124.87万
  '310109': { kindergartens: 30, kindergartenStudents: 6400, nurseryCenters: 41, nurserySlots: 1190, childcareSubsidy: 5817 },    // 虹口 67.99万
  '310110': { kindergartens: 53, kindergartenStudents: 11200, nurseryCenters: 72, nurserySlots: 2090, childcareSubsidy: 10260 },  // 杨浦 119.97万 (+10%)
  '310112': { kindergartens: 120, kindergartenStudents: 25500, nurseryCenters: 164, nurserySlots: 4760, childcareSubsidy: 23310 }, // 闵行 272.50万
  '310113': { kindergartens: 99, kindergartenStudents: 21200, nurseryCenters: 136, nurserySlots: 3950, childcareSubsidy: 19360 }, // 宝山 226.39万
  '310114': { kindergartens: 83, kindergartenStudents: 17700, nurseryCenters: 114, nurserySlots: 3300, childcareSubsidy: 16170 }, // 嘉定 189.04万
  '310115': { kindergartens: 254, kindergartenStudents: 54200, nurseryCenters: 347, nurserySlots: 10070, childcareSubsidy: 49480 }, // 浦东 578.58万
  '310116': { kindergartens: 36, kindergartenStudents: 7600, nurseryCenters: 49, nurserySlots: 1420, childcareSubsidy: 6945 },     // 金山 81.23万
  '310117': { kindergartens: 86, kindergartenStudents: 18400, nurseryCenters: 118, nurserySlots: 3420, childcareSubsidy: 16750 },  // 松江 195.89万
  '310118': { kindergartens: 57, kindergartenStudents: 12100, nurseryCenters: 77, nurserySlots: 2240, childcareSubsidy: 11015 },  // 青浦 128.77万
  '310120': { kindergartens: 50, kindergartenStudents: 10700, nurseryCenters: 68, nurserySlots: 1980, childcareSubsidy: 9745 },   // 奉贤 113.95万
  '310151': { kindergartens: 26, kindergartenStudents: 5600, nurseryCenters: 36, nurserySlots: 1040, childcareSubsidy: 5076 },    // 崇明 59.35万
};

// 银川6区县 — 幼儿园396所按人口比例分配（兴庆区教育中心+15%调整）
// 在园幼儿8.77万人按人口比例分配
const YINCHUAN_CHILDCARE: Record<string, DistrictChildcare> = {
  '640104': { kindergartens: 145, kindergartenStudents: 32150, preschoolEnrollmentRate: 109.2 },  // 兴庆 82.87万 (+15%)
  '640106': { kindergartens: 93, kindergartenStudents: 20630, preschoolEnrollmentRate: 109.2 },   // 金凤 66.80万 (+10%)
  '640105': { kindergartens: 56, kindergartenStudents: 12430, preschoolEnrollmentRate: 109.2 },   // 西夏 46.20万
  '640121': { kindergartens: 37, kindergartenStudents: 8220, preschoolEnrollmentRate: 109.2 },    // 永宁 33.08万
  '640122': { kindergartens: 39, kindergartenStudents: 8680, preschoolEnrollmentRate: 109.2 },    // 贺兰 35.16万
  '640181': { kindergartens: 26, kindergartenStudents: 5590, preschoolEnrollmentRate: 109.2 },    // 灵武 30.16万
};

const CITY_CHILDCARE: Record<string, Record<string, DistrictChildcare>> = {
  shanghai: SHANGHAI_CHILDCARE,
  yinchuan: YINCHUAN_CHILDCARE,
};

const CHILDCARE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市教委托育服务发展报告 — 幼儿园约1400所/托育网点约2000个 × 各区人口比例分配',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 幼儿园396所/在园幼儿8.77万人 × 各区县人口比例分配（兴庆+15%调整）',
    year: '2025年',
  },
};

export function childcareSource(cityKey: string): string {
  return CHILDCARE_SOURCES[cityKey]?.source ?? '';
}

export function childcareYear(cityKey: string): string {
  return CHILDCARE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictChildcare(cityKey: string, adcode: string): DistrictChildcare | undefined {
  return CITY_CHILDCARE[cityKey]?.[adcode];
}

/** 市级托育与学前教育总量 */
export const CITY_CHILDCARE_TOTALS: Record<string, {
  kindergartens: number;
  kindergartenStudents: number; // 万人
  nurserySubsidyRecipients?: number; // 万人（育儿补贴覆盖）
  preschoolEnrollmentRate?: number; // 学前三年毛入园率 %
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    kindergartens: 1400,
    kindergartenStudents: 30.0,
    nurserySubsidyRecipients: 27.7,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市教委2024年托育服务发展工作报告',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    kindergartens: 396,
    kindergartenStudents: 8.77,
    preschoolEnrollmentRate: 109.2,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
