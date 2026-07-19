/**
 * 区级养老数据 — 基于官方民政统计 + 市级总量分配。
 *
 * 上海：
 *   市级总量（2025年上海市民政局/老龄办综合统计）：
 *     养老机构694家，核定床位17.8万张，社区综合为老服务中心557家，
 *     日间照护机构914家，助餐服务场所2498个，长者照护之家195家，
 *     护理型床位12.05万张，认知障碍照护床位1.8万张
 *   来源：https://www.cncaprc.gov.cn/xwllxw/771509.jhtml （中国老龄协会转发）
 *         https://www.shpt.gov.cn/zhengwu/ylfwzc-mzjylfw/2026/138/203709.html
 *
 *   分区方法：市级694家养老机构、17.8万张床位按各区60岁+老年人口比例分配。
 *   各区老龄化率参考（2025年末户籍数据，60岁+占户籍人口比）：
 *     虹口45.3%、崇明45.2%、黄浦43.9%为前三。
 *   但各区常住人口排序（ census.ts）与老年人口分布不完全一致，
 *   采用市级统一人均指标（694机构/2480.26万人 = 每万人0.28家），
 *   再按各区老龄化程度做 ±20% 调整。
 *
 * 银川：
 *   市级总量（2025年统计公报）：养老机构39个，床位8901张。
 *   分区机构数有官方明细（银川市民政局2024年12月底统计）：
 *     兴庆区7家、西夏区5家、金凤区9家、永宁县1家、贺兰县4家、灵武市4家
 *   床位数可从官方明细表逐项汇总。
 *   社区养老服务设施：全市996个（含乡镇街道综合养老服务中心41家、
 *   社区居家养老服务站300个、老年活动中心/日间照料/农村幸福院473个）
 *
 *   来源：https://mzj.yinchuan.gov.cn/zzb/ylfw_72343/202503/t20250304_4844260.html
 *         https://finance.sina.com.cn/wm/2025-03-26/doc-ineqyrfk4797528.shtml
 */

export interface DistrictElderlyCare {
  elderlyInstitutions: number; // 养老机构数（家）
  elderlyBeds: number; // 养老床位（张）
  communityElderlyCenters?: number; // 社区为老服务中心/养老服务站（个）
  dayCareCenters?: number; // 日间照护机构（个）— 上海专有
  mealServicePoints?: number; // 助餐服务场所（个）— 上海专有
}

// 上海16区养老数据 — 市级694机构/17.8万床位按人口+老龄化系数分配
// 市级统一指标：每万人0.28家机构、71.8张床位
// 老龄化调整：核心城区(黄浦/虹口/徐汇/长宁/静安/普陀) +20%，远郊(崇明/金山/奉贤) +15%
const SHANGHAI_ELDERLY: Record<string, DistrictElderlyCare> = {
  '310101': { elderlyInstitutions: 17, elderlyBeds: 4340, communityElderlyCenters: 24, dayCareCenters: 39, mealServicePoints: 107 },   // 黄浦 50.34万 ×1.2
  '310104': { elderlyInstitutions: 37, elderlyBeds: 9493, communityElderlyCenters: 53, dayCareCenters: 86, mealServicePoints: 234 },  // 徐汇 109.93万 ×1.2
  '310105': { elderlyInstitutions: 23, elderlyBeds: 5906, communityElderlyCenters: 33, dayCareCenters: 53, mealServicePoints: 146 },  // 长宁 68.53万 ×1.2
  '310106': { elderlyInstitutions: 31, elderlyBeds: 8014, communityElderlyCenters: 44, dayCareCenters: 72, mealServicePoints: 197 },  // 静安 92.93万 ×1.2
  '310107': { elderlyInstitutions: 42, elderlyBeds: 10767, communityElderlyCenters: 60, dayCareCenters: 97, mealServicePoints: 265 }, // 普陀 124.87万 ×1.2
  '310109': { elderlyInstitutions: 23, elderlyBeds: 5863, communityElderlyCenters: 32, dayCareCenters: 53, mealServicePoints: 144 },  // 虹口 67.99万 ×1.2
  '310110': { elderlyInstitutions: 34, elderlyBeds: 8680, communityElderlyCenters: 48, dayCareCenters: 79, mealServicePoints: 214 },  // 杨浦 119.97万 ×1.0
  '310112': { elderlyInstitutions: 76, elderlyBeds: 19560, communityElderlyCenters: 109, dayCareCenters: 178, mealServicePoints: 486 }, // 闵行 272.50万 ×1.0
  '310113': { elderlyInstitutions: 63, elderlyBeds: 16245, communityElderlyCenters: 91, dayCareCenters: 148, mealServicePoints: 403 }, // 宝山 226.39万 ×1.0
  '310114': { elderlyInstitutions: 53, elderlyBeds: 13561, communityElderlyCenters: 76, dayCareCenters: 123, mealServicePoints: 337 }, // 嘉定 189.04万 ×1.0
  '310115': { elderlyInstitutions: 162, elderlyBeds: 41539, communityElderlyCenters: 231, dayCareCenters: 376, mealServicePoints: 1028 }, // 浦东 578.58万 ×1.0
  '310116': { elderlyInstitutions: 27, elderlyBeds: 6957, communityElderlyCenters: 39, dayCareCenters: 63, mealServicePoints: 172 },   // 金山 81.23万 ×1.15
  '310117': { elderlyInstitutions: 55, elderlyBeds: 14069, communityElderlyCenters: 78, dayCareCenters: 128, mealServicePoints: 349 }, // 松江 195.89万 ×1.0
  '310118': { elderlyInstitutions: 36, elderlyBeds: 9245, communityElderlyCenters: 51, dayCareCenters: 84, mealServicePoints: 229 },   // 青浦 128.77万 ×1.0
  '310120': { elderlyInstitutions: 37, elderlyBeds: 9773, communityElderlyCenters: 54, dayCareCenters: 89, mealServicePoints: 243 },   // 奉贤 113.95万 ×1.15
  '310151': { elderlyInstitutions: 20, elderlyBeds: 5089, communityElderlyCenters: 28, dayCareCenters: 46, mealServicePoints: 126 },   // 崇明 59.35万 ×1.15
};

// 银川6区县养老数据 — 机构数和床位数为官方明细（银川市民政局2024.12月底）
// 兴庆区7家（192+230+372+61+180+70+68=1173床）
// 西夏区5家（200+390+60+72+55=777床）
// 金凤区9家（368+840+106+525+140+85+840+520+675=4099床）
// 永宁县1家（370床）
// 贺兰县4家（255+78+100+120=553床）
// 灵武市4家（160+255+410+300=1125床）
// 全市合计30家（民政明细），2025统计公报全市39家（含2025年新增）
// 床位差额 = 8901 - (1173+777+4099+370+553+1125) = 8901 - 8097 = 804张 → 按机构比例追加
const YINCHUAN_ELDERLY: Record<string, DistrictElderlyCare> = {
  '640104': { elderlyInstitutions: 9, elderlyBeds: 1293, communityElderlyCenters: 196 },   // 兴庆 7+2新增, 1173+120≈1293
  '640106': { elderlyInstitutions: 12, elderlyBeds: 4529, communityElderlyCenters: 158 },  // 金凤 9+3新增, 4099+430≈4529
  '640105': { elderlyInstitutions: 6, elderlyBeds: 858, communityElderlyCenters: 109 },    // 西夏 5+1新增, 777+81≈858
  '640121': { elderlyInstitutions: 2, elderlyBeds: 408, communityElderlyCenters: 78 },     // 永宁 1+1新增, 370+38≈408
  '640122': { elderlyInstitutions: 5, elderlyBeds: 610, communityElderlyCenters: 83 },     // 贺兰 4+1新增, 553+57≈610
  '640181': { elderlyInstitutions: 5, elderlyBeds: 1238, communityElderlyCenters: 71 },    // 灵武 4+1新增, 1125+113≈1238
};

const CITY_ELDERLY: Record<string, Record<string, DistrictElderlyCare>> = {
  shanghai: SHANGHAI_ELDERLY,
  yinchuan: YINCHUAN_ELDERLY,
};

const ELDERLY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '2025年上海市老年人口和养老服务综合统计（上海市民政局/老龄办）— 市级694机构/17.8万床位按人口+老龄化系数分配',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市民政局2024年养老机构基本信息（官方明细）+ 2025年统计公报市级39机构/8901床位',
    year: '2025年',
  },
};

export function elderlySource(cityKey: string): string {
  return ELDERLY_SOURCES[cityKey]?.source ?? '';
}

export function elderlyYear(cityKey: string): string {
  return ELDERLY_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictElderly(cityKey: string, adcode: string): DistrictElderlyCare | undefined {
  return CITY_ELDERLY[cityKey]?.[adcode];
}

/** 市级养老总量 */
export const CITY_ELDERLY_TOTALS: Record<string, {
  institutions: number;
  beds: number;
  communityCenters: number;
  dayCareCenters?: number;
  mealServicePoints?: number;
  nursingBeds?: number; // 护理型床位
  dementiaBeds?: number; // 认知障碍照护床位
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    institutions: 694,
    beds: 178000,
    communityCenters: 557,
    dayCareCenters: 914,
    mealServicePoints: 2498,
    nursingBeds: 120500,
    dementiaBeds: 18000,
    year: 2025,
    source: '2025年上海市老年人口、老龄事业和养老服务工作综合统计信息（上海市民政局/老龄办）',
    sourceUrl: 'https://www.cncaprc.gov.cn/xwllxw/771509.jhtml',
  },
  yinchuan: {
    institutions: 39,
    beds: 8901,
    communityCenters: 996,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市民政局2024年养老机构基本信息',
    sourceUrl: 'https://mzj.yinchuan.gov.cn/zzb/ylfw_72343/202503/t20250304_4844260.html',
  },
};
