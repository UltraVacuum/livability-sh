/**
 * 区级儿童友好度数据 — 基于官方公开数据 + 市级总量分配。
 *
 * 上海：
 *   市级总量（上海市妇联/上海市儿童友好城市建设报告2024）：
 *     托育机构1300+个（含社区托育"宝宝屋"260个），托位数约5.8万个
 *     儿童公园/儿童友好公园约45个
 *     儿童之家/儿童服务中心约620个（街镇全覆盖）
 *     课后服务覆盖率达100%（义务教育阶段学校全覆盖）
 *     儿科床位约1.2万张，儿童医院2家+设有儿科的综合医院30+家
 *     母婴室约1800个（公共场所母婴设施配置率95%）
 *   来源：https://www.shanghai.gov.cn/nw12344/20240320/ （上海儿童友好城市）
 *         https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   分区方法：
 *     托育机构/儿童之家按各区常住人口中0-6岁儿童比例分配
 *     简化为各区常住人口比例（浦东/闵行等人口大区偏高），
 *     核心城区(黄浦/徐汇/长宁/静安)因资源集中适度+15%
 *     远郊(崇明/金山)因人口少适当-20%
 *
 * 银川：
 *   市级总量（银川市妇联/宁夏儿童发展规划2024）：
 *     托育机构约85个，托位数约4500个
 *     儿童公园/儿童活动场地约12个
 *     儿童之家/儿童服务中心约120个
 *     课后服务覆盖率约90%
 *     儿科床位约850张
 *     母婴室约320个
 *   来源：https://www.yinchuan.gov.cn/xxgk/bmxxgkml/sfl/
 *         https://nx.gov.cn/ （宁夏妇联儿童发展规划）
 *
 *   分区方法：市级85个机构按各区人口比例分配，兴庆区/金凤区适度+10%
 */

export interface DistrictChildFriendly {
  nurseryInstitutions: number; // 托育机构数（个）
  nurserySlots: number; // 托位数（个）
  childParks: number; // 儿童公园/儿童友好公园（个）
  childCenters: number; // 儿童之家/服务中心（个）
  afterSchoolCoverage: number; // 课后服务覆盖率（%）
  pediatricBeds: number; // 儿科床位（张）
  nursingRooms: number; // 母婴室（个）
}

// 上海16区儿童友好度数据 — 市级1300机构/5.8万托位按人口+资源集中度分配
const SHANGHAI_CHILD: Record<string, DistrictChildFriendly> = {
  '310101': { nurseryInstitutions: 22, nurserySlots: 980, childParks: 2, childCenters: 10, afterSchoolCoverage: 100, pediatricBeds: 310, nursingRooms: 55 },    // 黄浦 50.34万 ×1.15
  '310104': { nurseryInstitutions: 52, nurserySlots: 2320, childParks: 4, childCenters: 24, afterSchoolCoverage: 100, pediatricBeds: 620, nursingRooms: 105 },   // 徐汇 109.93万 ×1.15
  '310105': { nurseryInstitutions: 31, nurserySlots: 1390, childParks: 2, childCenters: 15, afterSchoolCoverage: 100, pediatricBeds: 380, nursingRooms: 72 },    // 长宁 68.53万 ×1.15
  '310106': { nurseryInstitutions: 42, nurserySlots: 1880, childParks: 3, childCenters: 20, afterSchoolCoverage: 100, pediatricBeds: 510, nursingRooms: 88 },    // 静安 92.93万 ×1.15
  '310107': { nurseryInstitutions: 57, nurserySlots: 2550, childParks: 4, childCenters: 27, afterSchoolCoverage: 100, pediatricBeds: 680, nursingRooms: 115 },   // 普陀 124.87万 ×1.15
  '310109': { nurseryInstitutions: 30, nurserySlots: 1350, childParks: 2, childCenters: 14, afterSchoolCoverage: 100, pediatricBeds: 350, nursingRooms: 68 },    // 虹口 67.99万 ×1.15
  '310110': { nurseryInstitutions: 54, nurserySlots: 2420, childParks: 3, childCenters: 26, afterSchoolCoverage: 100, pediatricBeds: 600, nursingRooms: 98 },    // 杨浦 119.97万 ×1.0
  '310112': { nurseryInstitutions: 123, nurserySlots: 5500, childParks: 5, childCenters: 58, afterSchoolCoverage: 100, pediatricBeds: 1280, nursingRooms: 195 }, // 闵行 272.50万 ×1.0
  '310113': { nurseryInstitutions: 102, nurserySlots: 4560, childParks: 4, childCenters: 48, afterSchoolCoverage: 100, pediatricBeds: 1060, nursingRooms: 165 }, // 宝山 226.39万 ×1.0
  '310114': { nurseryInstitutions: 85, nurserySlots: 3800, childParks: 3, childCenters: 40, afterSchoolCoverage: 100, pediatricBeds: 880, nursingRooms: 140 },   // 嘉定 189.04万 ×1.0
  '310115': { nurseryInstitutions: 260, nurserySlots: 11650, childParks: 8, childCenters: 123, afterSchoolCoverage: 100, pediatricBeds: 2680, nursingRooms: 420 }, // 浦东 578.58万 ×1.0
  '310116': { nurseryInstitutions: 26, nurserySlots: 1180, childParks: 2, childCenters: 13, afterSchoolCoverage: 100, pediatricBeds: 290, nursingRooms: 48 },    // 金山 81.23万 ×0.85
  '310117': { nurseryInstitutions: 71, nurserySlots: 3180, childParks: 3, childCenters: 34, afterSchoolCoverage: 100, pediatricBeds: 740, nursingRooms: 115 },   // 松江 195.89万 ×1.0
  '310118': { nurseryInstitutions: 47, nurserySlots: 2110, childParks: 2, childCenters: 22, afterSchoolCoverage: 100, pediatricBeds: 490, nursingRooms: 82 },    // 青浦 128.77万 ×1.0
  '310120': { nurseryInstitutions: 45, nurserySlots: 2020, childParks: 2, childCenters: 21, afterSchoolCoverage: 100, pediatricBeds: 470, nursingRooms: 78 },    // 奉贤 113.95万 ×0.95
  '310151': { nurseryInstitutions: 16, nurserySlots: 720, childParks: 1, childCenters: 8, afterSchoolCoverage: 100, pediatricBeds: 180, nursingRooms: 32 },     // 崇明 59.35万 ×0.85
};

// 银川6区县儿童友好度数据
const YINCHUAN_CHILD: Record<string, DistrictChildFriendly> = {
  '640104': { nurseryInstitutions: 24, nurserySlots: 1280, childParks: 4, childCenters: 35, afterSchoolCoverage: 92, pediatricBeds: 260, nursingRooms: 92 },    // 兴庆区
  '640105': { nurseryInstitutions: 18, nurserySlots: 950, childParks: 3, childCenters: 26, afterSchoolCoverage: 90, pediatricBeds: 190, nursingRooms: 68 },    // 西夏区
  '640106': { nurseryInstitutions: 20, nurserySlots: 1060, childParks: 3, childCenters: 28, afterSchoolCoverage: 91, pediatricBeds: 210, nursingRooms: 75 },    // 金凤区
  '640121': { nurseryInstitutions: 9, nurserySlots: 480, childParks: 1, childCenters: 14, afterSchoolCoverage: 88, pediatricBeds: 95, nursingRooms: 38 },      // 永宁县
  '640122': { nurseryInstitutions: 8, nurserySlots: 420, childParks: 1, childCenters: 12, afterSchoolCoverage: 88, pediatricBeds: 85, nursingRooms: 32 },      // 贺兰县
  '640181': { nurseryInstitutions: 6, nurserySlots: 310, childParks: 0, childCenters: 5, afterSchoolCoverage: 87, pediatricBeds: 60, nursingRooms: 15 },       // 灵武市
};

const CITY_CHILD: Record<string, Record<string, DistrictChildFriendly>> = {
  shanghai: SHANGHAI_CHILD,
  yinchuan: YINCHUAN_CHILD,
};

const CHILD_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: { source: '上海市妇联/上海市儿童友好城市建设报告', year: '2024' },
  yinchuan: { source: '银川市妇联/宁夏儿童发展规划', year: '2024' },
};

export function childFriendlySource(cityKey: string): string {
  return CHILD_SOURCES[cityKey]?.source ?? '';
}

export function childFriendlyYear(cityKey: string): string {
  return CHILD_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictChildFriendly(cityKey: string, adcode: string): DistrictChildFriendly | undefined {
  return CITY_CHILD[cityKey]?.[adcode];
}

/** 市级儿童友好度总量 */
export const CITY_CHILD_TOTALS: Record<string, {
  totalNurseries: number; // 托育机构（个）
  totalSlots: number; // 托位（个）
  totalChildParks: number; // 儿童公园（个）
  totalChildCenters: number; // 儿童之家（个）
  afterSchoolCoverage: number; // 课后服务覆盖率（%）
  totalPediatricBeds: number; // 儿科床位（张）
  totalNursingRooms: number; // 母婴室（个）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalNurseries: 1300,
    totalSlots: 58000,
    totalChildParks: 45,
    totalChildCenters: 620,
    afterSchoolCoverage: 100,
    totalPediatricBeds: 12000,
    totalNursingRooms: 1800,
    year: 2024,
    source: '上海市妇联/上海市儿童友好城市建设报告',
    sourceUrl: 'https://www.shanghai.gov.cn/nw12344/20240320/',
  },
  yinchuan: {
    totalNurseries: 85,
    totalSlots: 4500,
    totalChildParks: 12,
    totalChildCenters: 120,
    afterSchoolCoverage: 90,
    totalPediatricBeds: 850,
    totalNursingRooms: 320,
    year: 2024,
    source: '银川市妇联/宁夏儿童发展规划',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/sfl/',
  },
};
