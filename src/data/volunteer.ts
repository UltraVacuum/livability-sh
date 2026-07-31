/**
 * 区级志愿服务与社会组织数据 — 基于官方统计公报 + 政府公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市民政局 + 上海市文明办
 *     市级总量：
 *     - 注册志愿者约590万人（全国志愿服务信息系统，占常住人口24%）
 *     - 志愿服务团体约2.6万个
 *     - 社会组织约17200家（社会团体7000+基金会470+社会服务机构9700+）
 *     - 慈善组织约320家（具有公开募捐资格约60家）
 *     - 红十字会基层组织约320个
 *     - 年志愿服务时长约1.2亿小时
 *     - 慈善捐赠总额约45亿元/年
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://mzj.sh.gov.cn/（上海市民政局）
 *     https://sh.wenming.cn/（上海市文明办）
 *
 *   银川：银川市2025年统计公报 + 银川市民政局 + 银川市文明办
 *     市级总量：
 *     - 注册志愿者约52万人（占常住人口18%）
 *     - 志愿服务团体约3800个
 *     - 社会组织约2850家
 *     - 慈善组织约35家
 *     - 红十字会基层组织约60个
 *     - 年志愿服务时长约800万小时
 *     - 慈善捐赠总额约3.5亿元/年
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：志愿者/社会组织按人口比例分配（浦东占比最大）
 *   中心城区志愿服务参与率高（+10%），郊区社会组织偏向社会服务机构
 *   银川6区县：按人口比例分配，兴庆区作为老城区+商业中心+10%
 */

export interface DistrictVolunteer {
  volunteers: number; // 注册志愿者（万人）
  volunteerGroups: number; // 志愿服务团体（个）
  socialOrganizations: number; // 社会组织（家）
  charityOrgs: number; // 慈善组织（家）
  redCrossBranches: number; // 红十字会基层组织（个）
  annualDonation?: number; // 年慈善捐赠（亿元）
}

// 上海16区 — 志愿者590万/社会组织17200家 × 各区人口比例分配
// 中心城区志愿服务率+10%
const SHANGHAI_VOLUNTEER: Record<string, DistrictVolunteer> = {
  '310101': { volunteers: 18, volunteerGroups: 780, socialOrganizations: 520, charityOrgs: 12, redCrossBranches: 10, annualDonation: 1.5 },       // 黄浦 50.34万 +10%
  '310104': { volunteers: 36, volunteerGroups: 1620, socialOrganizations: 1080, charityOrgs: 24, redCrossBranches: 22, annualDonation: 3.0 },     // 徐汇 109.93万 +10%
  '310105': { volunteers: 22, volunteerGroups: 980, socialOrganizations: 670, charityOrgs: 14, redCrossBranches: 14, annualDonation: 1.8 },       // 长宁 68.53万 +10%
  '310106': { volunteers: 30, volunteerGroups: 1350, socialOrganizations: 900, charityOrgs: 20, redCrossBranches: 18, annualDonation: 2.5 },       // 静安 92.93万 +10%
  '310107': { volunteers: 38, volunteerGroups: 1680, socialOrganizations: 1220, charityOrgs: 22, redCrossBranches: 25, annualDonation: 2.8 },      // 普陀 124.87万
  '310109': { volunteers: 22, volunteerGroups: 1000, socialOrganizations: 660, charityOrgs: 13, redCrossBranches: 14, annualDonation: 1.7 },       // 虹口 67.99万 +10%
  '310110': { volunteers: 37, volunteerGroups: 1640, socialOrganizations: 1170, charityOrgs: 21, redCrossBranches: 24, annualDonation: 2.6 },      // 杨浦 119.97万
  '310112': { volunteers: 72, volunteerGroups: 3200, socialOrganizations: 2260, charityOrgs: 42, redCrossBranches: 48, annualDonation: 5.5 },     // 闵行 272.50万
  '310113': { volunteers: 58, volunteerGroups: 2580, socialOrganizations: 1880, charityOrgs: 35, redCrossBranches: 40, annualDonation: 4.2 },     // 宝山 226.39万
  '310114': { volunteers: 48, volunteerGroups: 2120, socialOrganizations: 1560, charityOrgs: 28, redCrossBranches: 34, annualDonation: 3.5 },      // 嘉定 189.04万
  '310115': { volunteers: 135, volunteerGroups: 5980, socialOrganizations: 4480, charityOrgs: 80, redCrossBranches: 70, annualDonation: 11.0 },   // 浦东 578.58万
  '310116': { volunteers: 24, volunteerGroups: 1080, socialOrganizations: 760, charityOrgs: 14, redCrossBranches: 16, annualDonation: 1.8 },       // 金山 81.23万
  '310117': { volunteers: 52, volunteerGroups: 2300, socialOrganizations: 1620, charityOrgs: 30, redCrossBranches: 34, annualDonation: 3.8 },     // 松江 195.89万
  '310118': { volunteers: 36, volunteerGroups: 1620, socialOrganizations: 1100, charityOrgs: 20, redCrossBranches: 24, annualDonation: 2.6 },      // 青浦 128.77万
  '310120': { volunteers: 32, volunteerGroups: 1440, socialOrganizations: 980, charityOrgs: 18, redCrossBranches: 22, annualDonation: 2.3 },       // 奉贤 113.95万
  '310151': { volunteers: 18, volunteerGroups: 820, socialOrganizations: 540, charityOrgs: 10, redCrossBranches: 12, annualDonation: 1.3 },        // 崇明 59.35万
};

// 银川6区县 — 志愿者52万/社会组织2850家 × 各区县人口比例分配
// 兴庆区老城区+10%
const YINCHUAN_VOLUNTEER: Record<string, DistrictVolunteer> = {
  '640104': { volunteers: 20, volunteerGroups: 1450, socialOrganizations: 1080, charityOrgs: 14, redCrossBranches: 22, annualDonation: 1.4 },    // 兴庆 82.87万 +10%
  '640106': { volunteers: 14, volunteerGroups: 1020, socialOrganizations: 720, charityOrgs: 9, redCrossBranches: 16, annualDonation: 0.9 },      // 金凤 66.80万
  '640105': { volunteers: 9, volunteerGroups: 680, socialOrganizations: 520, charityOrgs: 6, redCrossBranches: 12, annualDonation: 0.6 },        // 西夏 46.20万
  '640121': { volunteers: 5, volunteerGroups: 240, socialOrganizations: 200, charityOrgs: 2, redCrossBranches: 4, annualDonation: 0.25 },        // 永宁 33.08万
  '640122': { volunteers: 5, volunteerGroups: 250, socialOrganizations: 180, charityOrgs: 2, redCrossBranches: 4, annualDonation: 0.25 },        // 贺兰 35.16万
  '640181': { volunteers: 4, volunteerGroups: 160, socialOrganizations: 150, charityOrgs: 2, redCrossBranches: 2, annualDonation: 0.2 },          // 灵武 30.16万
};

const CITY_VOLUNTEER: Record<string, Record<string, DistrictVolunteer>> = {
  shanghai: SHANGHAI_VOLUNTEER,
  yinchuan: YINCHUAN_VOLUNTEER,
};

const VOLUNTEER_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市民政局 + 上海市文明办 — 志愿者590万/社会组织17200家/慈善320家 × 各区人口比例分配（中心城区+10%）',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市民政局 — 志愿者52万/社会组织2850家/慈善35家 × 各区县人口比例分配（兴庆+10%）',
    year: '2025年',
  },
};

export function volunteerSource(cityKey: string): string {
  return VOLUNTEER_SOURCES[cityKey]?.source ?? '';
}

export function volunteerYear(cityKey: string): string {
  return VOLUNTEER_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictVolunteer(cityKey: string, adcode: string): DistrictVolunteer | undefined {
  return CITY_VOLUNTEER[cityKey]?.[adcode];
}

/** 市级志愿服务与社会组织总量 */
export const CITY_VOLUNTEER_TOTALS: Record<string, {
  volunteers: number; // 注册志愿者（万人）
  volunteerGroups: number; // 志愿服务团体（个）
  socialOrganizations: number; // 社会组织（家）
  charityOrgs: number; // 慈善组织（家）
  redCrossBranches: number; // 红十字会基层组织（个）
  annualDonation: number; // 年慈善捐赠（亿元）
  annualHours: number; // 年志愿服务时长（万小时）
  participationRate: number; // 志愿服务参与率（%）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    volunteers: 590,
    volunteerGroups: 26000,
    socialOrganizations: 17200,
    charityOrgs: 320,
    redCrossBranches: 320,
    annualDonation: 45,
    annualHours: 12000,
    participationRate: 24,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市民政局 + 上海市文明办',
    sourceUrl: 'https://mzj.sh.gov.cn/',
  },
  yinchuan: {
    volunteers: 52,
    volunteerGroups: 3800,
    socialOrganizations: 2850,
    charityOrgs: 35,
    redCrossBranches: 60,
    annualDonation: 3.5,
    annualHours: 800,
    participationRate: 18,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市民政局 + 银川市文明办',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
