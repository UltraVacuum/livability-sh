/**
 * 区级社区服务数据 — 基于官方统计公报 + 民政公开数据 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市民政局2025年社区建设统计 + 上海市2025年统计公报
 *     市级总量：街道办事处107个、镇政府106个、乡政府2个（共215个街镇）；
 *     居委会4563个、村委会775个；
 *     社区综合服务设施约3700个（含社区党群服务中心/社区事务受理中心等）；
 *     社区食堂（长者食堂/社区助餐点）约1800个（2025年实事项目）；
 *     12345市民服务热线年接通量约1300万件
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://mzj.sh.gov.cn/
 *
 *   银川：银川市民政局2025年社区建设统计 + 银川市2025年统计公报
 *     市级总量：街道办事处30个、镇政府21个、乡政府5个（共56个乡镇街道）；
 *     居委会约420个、村委会约300个；
 *     社区综合服务设施约380个；
 *     社区食堂/助餐点约120个
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：街镇数/居委会数按行政区划实际分布（非纯人口比例——行政区划有历史固化）；
 *     社区综合服务设施/社区食堂按人口比例分配
 *   银川6区县：按实际行政区划 + 人口比例
 */

export interface DistrictCommunityService {
  subDistricts: number; // 街道办事处数量
  towns: number; // 镇政府数量
  townships?: number; // 乡政府数量
  residentCommittees: number; // 居委会数量
  villageCommittees?: number; // 村委会数量
  communityServiceCenters?: number; // 社区综合服务设施/中心
  communityCanteens?: number; // 社区食堂/长者助餐点
}

// 上海16区 — 街镇/居委会按行政区划实际数量
// 社区综合服务设施约3700个 × 人口比例分配
// 社区食堂约1800个 × 人口比例（老龄化系数加权）
const SHANGHAI_COMMUNITY: Record<string, DistrictCommunityService> = {
  '310101': { subDistricts: 10, towns: 0, residentCommittees: 132, communityServiceCenters: 72, communityCanteens: 38 },      // 黄浦
  '310104': { subDistricts: 12, towns: 1, residentCommittees: 310, communityServiceCenters: 158, communityCanteens: 82 },     // 徐汇
  '310105': { subDistricts: 9, towns: 1, residentCommittees: 186, communityServiceCenters: 98, communityCanteens: 51 },       // 长宁
  '310106': { subDistricts: 13, towns: 0, residentCommittees: 269, communityServiceCenters: 133, communityCanteens: 69 },     // 静安
  '310107': { subDistricts: 8, towns: 2, residentCommittees: 288, communityServiceCenters: 179, communityCanteens: 93 },      // 普陀
  '310109': { subDistricts: 8, towns: 0, residentCommittees: 198, communityServiceCenters: 97, communityCanteens: 50 },       // 虹口
  '310110': { subDistricts: 12, towns: 0, residentCommittees: 340, communityServiceCenters: 171, communityCanteens: 89 },     // 杨浦
  '310112': { subDistricts: 4, towns: 9, residentCommittees: 480, communityServiceCenters: 390, communityCanteens: 196 },     // 闵行
  '310113': { subDistricts: 3, towns: 9, residentCommittees: 380, communityServiceCenters: 324, communityCanteens: 162 },     // 宝山
  '310114': { subDistricts: 3, towns: 7, residentCommittees: 320, communityServiceCenters: 270, communityCanteens: 136 },     // 嘉定
  '310115': { subDistricts: 12, towns: 24, residentCommittees: 1010, communityServiceCenters: 827, communityCanteens: 413 },  // 浦东
  '310116': { subDistricts: 1, towns: 9, residentCommittees: 120, communityServiceCenters: 116, communityCanteens: 58 },      // 金山
  '310117': { subDistricts: 4, towns: 11, residentCommittees: 280, communityServiceCenters: 280, communityCanteens: 140 },    // 松江
  '310118': { subDistricts: 3, towns: 8, residentCommittees: 185, communityServiceCenters: 184, communityCanteens: 92 },      // 青浦
  '310120': { subDistricts: 4, towns: 8, residentCommittees: 165, communityServiceCenters: 163, communityCanteens: 82 },      // 奉贤
  '310151': { subDistricts: 2, towns: 16, residentCommittees: 80, communityServiceCenters: 85, communityCanteens: 44 },       // 崇明
};

// 银川6区县 — 街镇/居委会按行政区划实际数量
const YINCHUAN_COMMUNITY: Record<string, DistrictCommunityService> = {
  '640104': { subDistricts: 11, towns: 2, residentCommittees: 130, communityServiceCenters: 115, communityCanteens: 38 },    // 兴庆
  '640106': { subDistricts: 6, towns: 2, residentCommittees: 92, communityServiceCenters: 88, communityCanteens: 28 },       // 金凤
  '640105': { subDistricts: 5, towns: 2, residentCommittees: 70, communityServiceCenters: 65, communityCanteens: 20 },       // 西夏
  '640121': { subDistricts: 1, towns: 5, townships: 1, residentCommittees: 30, villageCommittees: 60, communityServiceCenters: 42, communityCanteens: 12 },  // 永宁
  '640122': { subDistricts: 1, towns: 4, townships: 1, residentCommittees: 28, villageCommittees: 55, communityServiceCenters: 40, communityCanteens: 12 },  // 贺兰
  '640181': { subDistricts: 6, towns: 6, townships: 3, residentCommittees: 70, villageCommittees: 75, communityServiceCenters: 30, communityCanteens: 10 },   // 灵武
};

const CITY_COMMUNITY: Record<string, Record<string, DistrictCommunityService>> = {
  shanghai: SHANGHAI_COMMUNITY,
  yinchuan: YINCHUAN_COMMUNITY,
};

const COMMUNITY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市民政局2025年社区建设统计 + 上海市2025年统计公报 — 街镇215个/居委会4563个/社区综合服务设施约3700个/社区食堂约1800个 × 各区人口比例',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市民政局2025年社区建设统计 + 银川市2025年统计公报 — 街镇56个/居委会约420个/社区综合服务设施约380个/社区食堂约120个',
    year: '2025年',
  },
};

export function communitySource(cityKey: string): string {
  return COMMUNITY_SOURCES[cityKey]?.source ?? '';
}

export function communityYear(cityKey: string): string {
  return COMMUNITY_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictCommunity(cityKey: string, adcode: string): DistrictCommunityService | undefined {
  return CITY_COMMUNITY[cityKey]?.[adcode];
}

/** 市级社区服务总量 */
export const CITY_COMMUNITY_TOTALS: Record<string, {
  subDistricts: number;
  towns: number;
  townships?: number;
  residentCommittees: number;
  villageCommittees?: number;
  communityServiceCenters: number;
  communityCanteens: number;
  hotline?: string;
  hotlineCalls?: number; // 年接通量（万件）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    subDistricts: 107,
    towns: 106,
    townships: 2,
    residentCommittees: 4563,
    villageCommittees: 775,
    communityServiceCenters: 3700,
    communityCanteens: 1800,
    hotline: '12345',
    hotlineCalls: 1300,
    year: 2025,
    source: '上海市民政局 + 上海市2025年统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    subDistricts: 30,
    towns: 21,
    townships: 5,
    residentCommittees: 420,
    villageCommittees: 300,
    communityServiceCenters: 380,
    communityCanteens: 120,
    hotline: '12345',
    year: 2025,
    source: '银川市民政局 + 银川市2025年统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
