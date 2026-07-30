/**
 * 区级社区卫生服务数据 — 基于官方统计公报 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）+ 上海市卫生健康委员会
 *     市级总量：
 *     - 社区门诊量占全市常住居民门诊量的比重达42.0%（+3.7个百分点）
 *     - 新建64家社区标准化门诊手术室、66家社区护理中心、12家社区康复中心
 *     - 建成63家开展中医药特色巡诊服务的社区卫生服务站
 *     - AED安装8190台，配置水平达50台/10万人，配套人员培训8万余人
 *     - 57家医疗机构1313个病区开展免陪照护服务，共计47037张床位
 *     - 医疗机构共完成诊疗人次数2.88亿人次
 *     - 婴儿死亡率2.34‰，孕产妇死亡率1.85/10万
 *     - 危重孕产妇抢救成功率99.2%，新生儿抢救成功率96.7%
 *     - 成人吸烟率下降至18.6%（连续15年下降）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     市级总量：
 *     - 疾病预防控制中心9个
 *     - 妇幼保健机构8个
 *     - 乡镇卫生院35个（编制床位578张）
 *     - 卫生技术人员3.44万人（执业医师1.26万/注册护士1.57万）
 *     - 卫生机构编制床位2.13万张
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：社区卫生服务中心约240家 × 各区人口比例分配（中心城区密度高+10%）
 *   AED 8190台 × 各区人口比例分配
 *   银川6区县：乡镇卫生院35个 × 各区县农村人口比例分配（永宁/贺兰/灵武为主）
 *   疾控/妇幼按市级统一布点，不分化到区
 */

export interface DistrictCommunityHealth {
  communityCenters: number; // 社区卫生服务中心（家）
  aedDevices?: number; // AED自动体外除颤器（台）
  communityClinics?: number; // 社区卫生服务站/诊所（个）
  traditionalChineseMedicineStations?: number; // 中医药特色巡诊站（个）
}

// 上海16区 — 社区卫生服务中心约240家按人口比例分配（中心城区+10%密度调整）
// AED 8190台按人口比例分配
const SHANGHAI_COMMUNITY: Record<string, DistrictCommunityHealth> = {
  '310101': { communityCenters: 10, aedDevices: 165, communityClinics: 32, traditionalChineseMedicineStations: 2 },    // 黄浦 50.34万 +10%
  '310104': { communityCenters: 22, aedDevices: 360, communityClinics: 68, traditionalChineseMedicineStations: 5 },    // 徐汇 109.93万 +10%
  '310105': { communityCenters: 14, aedDevices: 225, communityClinics: 42, traditionalChineseMedicineStations: 3 },    // 长宁 68.53万 +10%
  '310106': { communityCenters: 18, aedDevices: 305, communityClinics: 56, traditionalChineseMedicineStations: 4 },    // 静安 92.93万 +10%
  '310107': { communityCenters: 24, aedDevices: 410, communityClinics: 76, traditionalChineseMedicineStations: 5 },    // 普陀 124.87万
  '310109': { communityCenters: 14, aedDevices: 223, communityClinics: 42, traditionalChineseMedicineStations: 3 },    // 虹口 67.99万 +10%
  '310110': { communityCenters: 23, aedDevices: 394, communityClinics: 72, traditionalChineseMedicineStations: 5 },    // 杨浦 119.97万 +10%
  '310112': { communityCenters: 53, aedDevices: 896, communityClinics: 160, traditionalChineseMedicineStations: 9 },   // 闵行 272.50万
  '310113': { communityCenters: 44, aedDevices: 744, communityClinics: 132, traditionalChineseMedicineStations: 7 },   // 宝山 226.39万
  '310114': { communityCenters: 37, aedDevices: 621, communityClinics: 110, traditionalChineseMedicineStations: 6 },   // 嘉定 189.04万
  '310115': { communityCenters: 112, aedDevices: 1903, communityClinics: 335, traditionalChineseMedicineStations: 18 }, // 浦东 578.58万
  '310116': { communityCenters: 16, aedDevices: 267, communityClinics: 48, traditionalChineseMedicineStations: 3 },    // 金山 81.23万
  '310117': { communityCenters: 38, aedDevices: 644, communityClinics: 114, traditionalChineseMedicineStations: 6 },   // 松江 195.89万
  '310118': { communityCenters: 25, aedDevices: 423, communityClinics: 76, traditionalChineseMedicineStations: 5 },    // 青浦 128.77万
  '310120': { communityCenters: 22, aedDevices: 374, communityClinics: 68, traditionalChineseMedicineStations: 4 },    // 奉贤 113.95万
  '310151': { communityCenters: 12, aedDevices: 195, communityClinics: 36, traditionalChineseMedicineStations: 2 },    // 崇明 59.35万
};

// 银川6区县 — 乡镇卫生院35个按农村人口比例分配（永宁/贺兰/灵武为主）
// 社区卫生服务中心按城区人口分配
const YINCHUAN_COMMUNITY: Record<string, DistrictCommunityHealth> = {
  '640104': { communityCenters: 12, aedDevices: 80, communityClinics: 35, traditionalChineseMedicineStations: 4 },  // 兴庆 82.87万
  '640106': { communityCenters: 10, aedDevices: 65, communityClinics: 28, traditionalChineseMedicineStations: 3 },  // 金凤 66.80万
  '640105': { communityCenters: 7, aedDevices: 45, communityClinics: 20, traditionalChineseMedicineStations: 2 },   // 西夏 46.20万
  '640121': { communityCenters: 4, aedDevices: 28, communityClinics: 12, traditionalChineseMedicineStations: 1 },   // 永宁 33.08万
  '640122': { communityCenters: 4, aedDevices: 30, communityClinics: 12, traditionalChineseMedicineStations: 1 },   // 贺兰 35.16万
  '640181': { communityCenters: 3, aedDevices: 25, communityClinics: 10, traditionalChineseMedicineStations: 1 },   // 灵武 30.16万
};

const CITY_COMMUNITY: Record<string, Record<string, DistrictCommunityHealth>> = {
  shanghai: SHANGHAI_COMMUNITY,
  yinchuan: YINCHUAN_COMMUNITY,
};

const COMMUNITY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 — 社区卫生服务中心约240家/AED 8190台 × 各区人口比例分配（中心城区+10%）',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 乡镇卫生院35个 + 社区卫生服务中心按城区人口分配',
    year: '2025年',
  },
};

export function communityHealthSource(cityKey: string): string {
  return COMMUNITY_SOURCES[cityKey]?.source ?? '';
}

export function communityHealthYear(cityKey: string): string {
  return COMMUNITY_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictCommunityHealth(cityKey: string, adcode: string): DistrictCommunityHealth | undefined {
  return CITY_COMMUNITY[cityKey]?.[adcode];
}

/** 市级社区卫生服务总量 */
export const CITY_COMMUNITY_HEALTH_TOTALS: Record<string, {
  communityOPShare?: number; // 社区门诊量占全市比重 %
  newSurgeryRooms?: number; // 新建社区标准化门诊手术室（家）
  newNursingCenters?: number; // 新建社区护理中心（家）
  newRehabCenters?: number; // 新建社区康复中心（家）
  tcmPatrolStations?: number; // 中医药特色巡诊社区卫生服务站（家）
  aedDevices?: number; // AED总台数
  aedPer100k?: number; // 每10万人AED配置（台）
  aedTrained?: number; // AED配套培训人数（万人）
  nursingCareBeds?: number; // 免陪照护床位（张）
  nursingCareInstitutions?: number; // 免陪照护机构（家）
  totalVisits?: number; // 亿人次（医疗机构诊疗人次）
  infantMortality?: number; // ‰（婴儿死亡率）
  maternalMortality?: number; // /10万（孕产妇死亡率）
  maternalRescueRate?: number; // %（危重孕产妇抢救成功率）
  neonatalRescueRate?: number; // %（新生儿抢救成功率）
  adultSmokingRate?: number; // %（成人吸烟率）
  cdcCount?: number; // 疾控中心（个）
  mchCenters?: number; // 妇幼保健机构（个）
  townshipHospitals?: number; // 乡镇卫生院（个）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    communityOPShare: 42.0,
    newSurgeryRooms: 64,
    newNursingCenters: 66,
    newRehabCenters: 12,
    tcmPatrolStations: 63,
    aedDevices: 8190,
    aedPer100k: 50,
    aedTrained: 8,
    nursingCareBeds: 47037,
    nursingCareInstitutions: 57,
    totalVisits: 2.88,
    infantMortality: 2.34,
    maternalMortality: 1.85,
    maternalRescueRate: 99.2,
    neonatalRescueRate: 96.7,
    adultSmokingRate: 18.6,
    year: 2025,
    source: '上海市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    cdcCount: 9,
    mchCenters: 8,
    townshipHospitals: 35,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
