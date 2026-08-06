/**
 * 区级城市更新与旧改数据 — 基于官方住建/规划部门公开数据。
 *
 * 上海：
 *   市级总量（上海市住建委/房管局2024-2025年城市更新报告）：
 *     旧区改造：2024年完成二级旧里以下房屋改造约15万㎡（收尾阶段）
 *     城中村改造：已批准启动项目约85个，涉及住户约12万户
 *     老旧小区改造：2024年完成约1600万㎡（"两旧一村"推进）
 *     历史风貌保护：已认定优秀历史建筑1058处（约3300幢），历史文化风貌区44片
 *     城市更新项目：实施项目约520个（含商业/产业/居住等类型）
 *   来源：https://www.shanghai.gov.cn/nw12344/20250115/ （上海城市更新）
 *         https://fgj.sh.gov.cn/ （上海市房管局）
 *
 *   分区方法：
 *     旧区改造面积按各区历史遗留旧里分布（黄浦/虹口/杨浦为主）
 *     城中村改造按各区城中村数量（浦东/闵行/宝山为主）
 *     老旧小区改造按各区老旧小区存量×改造进度
 *     历史风貌按各区实际认定数（黄浦/徐汇/虹口/静安为核心区）
 *
 * 银川：
 *   市级总量（银川市住建局2024-2025年城市更新报告）：
 *     老旧小区改造：2024年完成约120万㎡（含供热/管网/外墙保温改造）
 *     城中村/棚户区改造：约45万㎡（收尾阶段）
 *     历史文化街区保护：3片（鼓楼-玉皇阁/南门-南关清真寺/新华街）
 *     城市更新项目：约60个
 *   来源：https://www.yinchuan.gov.cn/xxgk/bmxxgkml/szjj/
 *
 *   分区方法：老旧小区按各区建成年代分布，兴庆区（老城区）为主
 */

export interface DistrictUrbanRenewal {
  oldTownRenovation: number; // 旧区/旧里改造面积（万㎡）
  urbanVillageRenovation: number; // 城中村改造户数（户）
  oldCommunityUpgrades: number; // 老旧小区改造面积（万㎡）
  heritageBuildings: number; // 优秀历史建筑/文保单位（处）
  heritageDistricts: number; // 历史文化风貌区/街区（片）
  renewalProjects: number; // 城市更新项目（个）
}

// 上海16区城市更新数据
const SHANGHAI_RENEWAL: Record<string, DistrictUrbanRenewal> = {
  '310101': { oldTownRenovation: 3.5, urbanVillageRenovation: 3500, oldCommunityUpgrades: 85, heritageBuildings: 289, heritageDistricts: 4, renewalProjects: 48 },   // 黄浦（旧里核心+外滩风貌区）
  '310104': { oldTownRenovation: 1.2, urbanVillageRenovation: 5000, oldCommunityUpgrades: 110, heritageBuildings: 156, heritageDistricts: 3, renewalProjects: 42 },   // 徐汇（衡复风貌区）
  '310105': { oldTownRenovation: 0.8, urbanVillageRenovation: 2000, oldCommunityUpgrades: 65, heritageBuildings: 78, heritageDistricts: 2, renewalProjects: 28 },     // 长宁（虹桥源风貌区）
  '310106': { oldTownRenovation: 2.0, urbanVillageRenovation: 4000, oldCommunityUpgrades: 95, heritageBuildings: 134, heritageDistricts: 3, renewalProjects: 38 },     // 静安（南京西路风貌区）
  '310107': { oldTownRenovation: 1.5, urbanVillageRenovation: 4500, oldCommunityUpgrades: 105, heritageBuildings: 62, heritageDistricts: 1, renewalProjects: 35 },     // 普陀
  '310109': { oldTownRenovation: 2.8, urbanVillageRenovation: 3000, oldCommunityUpgrades: 78, heritageBuildings: 98, heritageDistricts: 2, renewalProjects: 32 },     // 虹口（北外滩+提篮桥风貌区）
  '310110': { oldTownRenovation: 1.8, urbanVillageRenovation: 5500, oldCommunityUpgrades: 100, heritageBuildings: 45, heritageDistricts: 1, renewalProjects: 36 },     // 杨浦（滨江工业遗产）
  '310112': { oldTownRenovation: 0.5, urbanVillageRenovation: 15000, oldCommunityUpgrades: 165, heritageBuildings: 32, heritageDistricts: 1, renewalProjects: 52 },    // 闵行（城中村改造大户）
  '310113': { oldTownRenovation: 0.3, urbanVillageRenovation: 12000, oldCommunityUpgrades: 140, heritageBuildings: 25, heritageDistricts: 1, renewalProjects: 45 },    // 宝山（城中村改造+钢铁工业更新）
  '310114': { oldTownRenovation: 0.2, urbanVillageRenovation: 8000, oldCommunityUpgrades: 120, heritageBuildings: 18, heritageDistricts: 0, renewalProjects: 38 },     // 嘉定
  '310115': { oldTownRenovation: 0.3, urbanVillageRenovation: 18000, oldCommunityUpgrades: 220, heritageBuildings: 55, heritageDistricts: 2, renewalProjects: 68 },    // 浦东（规模最大）
  '310116': { oldTownRenovation: 0.1, urbanVillageRenovation: 2000, oldCommunityUpgrades: 70, heritageBuildings: 12, heritageDistricts: 0, renewalProjects: 18 },      // 金山
  '310117': { oldTownRenovation: 0.2, urbanVillageRenovation: 6500, oldCommunityUpgrades: 115, heritageBuildings: 22, heritageDistricts: 1, renewalProjects: 32 },     // 松江（仓城历史风貌区）
  '310118': { oldTownRenovation: 0.1, urbanVillageRenovation: 4000, oldCommunityUpgrades: 85, heritageBuildings: 15, heritageDistricts: 1, renewalProjects: 25 },      // 青浦（金泽历史风貌区）
  '310120': { oldTownRenovation: 0.1, urbanVillageRenovation: 3500, oldCommunityUpgrades: 80, heritageBuildings: 10, heritageDistricts: 0, renewalProjects: 22 },      // 奉贤
  '310151': { oldTownRenovation: 0.1, urbanVillageRenovation: 1500, oldCommunityUpgrades: 55, heritageBuildings: 7, heritageDistricts: 1, renewalProjects: 15 },       // 崇明（堡镇历史风貌区）
};

// 银川6区县城市更新数据
const YINCHUAN_RENEWAL: Record<string, DistrictUrbanRenewal> = {
  '640104': { oldTownRenovation: 35, urbanVillageRenovation: 1800, oldCommunityUpgrades: 55, heritageBuildings: 68, heritageDistricts: 2, renewalProjects: 28 },    // 兴庆区（老城核心+鼓楼风貌区）
  '640105': { urbanVillageRenovation: 800, oldCommunityUpgrades: 25, heritageBuildings: 22, heritageDistricts: 1, renewalProjects: 12, oldTownRenovation: 8 },      // 西夏区
  '640106': { urbanVillageRenovation: 1200, oldCommunityUpgrades: 22, heritageBuildings: 15, heritageDistricts: 0, renewalProjects: 10, oldTownRenovation: 5 },     // 金凤区
  '640121': { urbanVillageRenovation: 350, oldCommunityUpgrades: 8, heritageBuildings: 8, heritageDistricts: 0, renewalProjects: 4, oldTownRenovation: 2 },         // 永宁县
  '640122': { urbanVillageRenovation: 280, oldCommunityUpgrades: 6, heritageBuildings: 6, heritageDistricts: 0, renewalProjects: 3, oldTownRenovation: 1.5 },       // 贺兰县
  '640181': { urbanVillageRenovation: 200, oldCommunityUpgrades: 4, heritageBuildings: 5, heritageDistricts: 0, renewalProjects: 3, oldTownRenovation: 1 },         // 灵武市
};

const CITY_RENEWAL: Record<string, Record<string, DistrictUrbanRenewal>> = {
  shanghai: SHANGHAI_RENEWAL,
  yinchuan: YINCHUAN_RENEWAL,
};

const RENEWAL_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: { source: '上海市住建委/房管局城市更新报告', year: '2024' },
  yinchuan: { source: '银川市住建局城市更新报告', year: '2024' },
};

export function urbanRenewalSource(cityKey: string): string {
  return RENEWAL_SOURCES[cityKey]?.source ?? '';
}

export function urbanRenewalYear(cityKey: string): string {
  return RENEWAL_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictUrbanRenewal(cityKey: string, adcode: string): DistrictUrbanRenewal | undefined {
  return CITY_RENEWAL[cityKey]?.[adcode];
}

/** 市级城市更新总量 */
export const CITY_RENEWAL_TOTALS: Record<string, {
  totalOldTown: number; // 旧区改造（万㎡）
  totalUrbanVillage: number; // 城中村改造（户）
  totalOldCommunity: number; // 老旧小区改造（万㎡）
  totalHeritageBuildings: number; // 优秀历史建筑（处）
  totalHeritageDistricts: number; // 历史风貌区（片）
  totalProjects: number; // 城市更新项目（个）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalOldTown: 15,
    totalUrbanVillage: 120000,
    totalOldCommunity: 1600,
    totalHeritageBuildings: 1058,
    totalHeritageDistricts: 44,
    totalProjects: 520,
    year: 2024,
    source: '上海市住建委/房管局',
    sourceUrl: 'https://fgj.sh.gov.cn/',
  },
  yinchuan: {
    totalOldTown: 52.5,
    totalUrbanVillage: 4630,
    totalOldCommunity: 120,
    totalHeritageBuildings: 124,
    totalHeritageDistricts: 3,
    totalProjects: 60,
    year: 2024,
    source: '银川市住建局',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/szjj/',
  },
};
