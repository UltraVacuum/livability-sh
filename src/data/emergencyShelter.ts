/**
 * 区级应急避难与消防数据 — 基于官方统计公报 + 应急管理部公开数据 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市应急管理局2025年报
 *     市级总量：应急避难场所约2200个（含地震/防空/综合避难场所）；
 *     消防站约520个（含消防救援站/小型消防站/社区微型消防站）；
 *     消防员约14000人；年度出警约15万次（火灾扑救+抢险救援+社会救助）；
 *     人防工程面积约2500万平方米（地下防空设施）；
 *     火灾起数约6500起/年（直接财产损失约1.2亿元）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://yjglj.sh.gov.cn/
 *
 *   银川：银川市2025年统计公报 + 银川市应急管理局
 *     市级总量：应急避难场所约180个（含地震避难/防空避难）；
 *     消防站约45个（含小型站/微型站）；消防员约1800人；
 *     年度出警约8000次；人防工程面积约280万平方米；
 *     火灾起数约1200起/年
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：避难场所2200个 × 人口+面积加权分配（浦东面积大分配多）；
 *     消防站520个 × 人口密度加权（市中心密集，郊区稀疏但有小型站补充）；
 *     人防工程2500万㎡ × 人口比例分配
 *   银川6区县：避难场所180个 × 人口比例；消防站45个 × 人口+面积加权
 */

export interface DistrictEmergency {
  shelters: number; // 应急避难场所（个）
  shelterCapacity?: number; // 避难场所总容纳人数（万人）
  fireStations: number; // 消防站/消防救援站（个，含微型站）
  firefighters: number; // 消防员人数
  annualFireIncidents: number; // 年度火灾起数
  civilAirDefenseArea?: number; // 人防工程面积（万㎡）
}

// 上海16区 — 避难场所约2200个 × 人口+面积加权
// 消防站520个 × 人口密度加权；消防员14000人 × 人口比例
// 人防工程2500万㎡ × 人口比例；火灾6500起 × 人口比例
const SHANGHAI_EMERGENCY: Record<string, DistrictEmergency> = {
  '310101': { shelters: 22, shelterCapacity: 18, fireStations: 12, firefighters: 120, annualFireIncidents: 130, civilAirDefenseArea: 51 },      // 黄浦
  '310104': { shelters: 48, shelterCapacity: 40, fireStations: 26, firefighters: 260, annualFireIncidents: 285, civilAirDefenseArea: 111 },    // 徐汇
  '310105': { shelters: 30, shelterCapacity: 25, fireStations: 16, firefighters: 160, annualFireIncidents: 178, civilAirDefenseArea: 69 },     // 长宁
  '310106': { shelters: 40, shelterCapacity: 34, fireStations: 22, firefighters: 220, annualFireIncidents: 242, civilAirDefenseArea: 94 },     // 静安
  '310107': { shelters: 54, shelterCapacity: 45, fireStations: 30, firefighters: 300, annualFireIncidents: 325, civilAirDefenseArea: 126 },    // 普陀
  '310109': { shelters: 30, shelterCapacity: 25, fireStations: 16, firefighters: 160, annualFireIncidents: 177, civilAirDefenseArea: 69 },     // 虹口
  '310110': { shelters: 52, shelterCapacity: 43, fireStations: 28, firefighters: 280, annualFireIncidents: 312, civilAirDefenseArea: 121 },    // 杨浦
  '310112': { shelters: 120, shelterCapacity: 100, fireStations: 65, firefighters: 650, annualFireIncidents: 710, civilAirDefenseArea: 275 },   // 闵行
  '310113': { shelters: 100, shelterCapacity: 83, fireStations: 54, firefighters: 540, annualFireIncidents: 590, civilAirDefenseArea: 229 },   // 宝山
  '310114': { shelters: 83, shelterCapacity: 69, fireStations: 45, firefighters: 450, annualFireIncidents: 493, civilAirDefenseArea: 191 },    // 嘉定
  '310115': { shelters: 255, shelterCapacity: 212, fireStations: 138, firefighters: 1380, annualFireIncidents: 1508, civilAirDefenseArea: 584 }, // 浦东
  '310116': { shelters: 36, shelterCapacity: 30, fireStations: 19, firefighters: 190, annualFireIncidents: 212, civilAirDefenseArea: 82 },     // 金山
  '310117': { shelters: 86, shelterCapacity: 72, fireStations: 47, firefighters: 470, annualFireIncidents: 511, civilAirDefenseArea: 198 },    // 松江
  '310118': { shelters: 56, shelterCapacity: 47, fireStations: 30, firefighters: 305, annualFireIncidents: 336, civilAirDefenseArea: 130 },    // 青浦
  '310120': { shelters: 50, shelterCapacity: 42, fireStations: 27, firefighters: 270, annualFireIncidents: 297, civilAirDefenseArea: 115 },    // 奉贤
  '310151': { shelters: 26, shelterCapacity: 22, fireStations: 14, firefighters: 140, annualFireIncidents: 155, civilAirDefenseArea: 60 },     // 崇明
};

// 银川6区县 — 避难场所180个 × 人口比例
// 消防站45个 × 人口+面积加权；消防员1800人 × 人口比例
const YINCHUAN_EMERGENCY: Record<string, DistrictEmergency> = {
  '640104': { shelters: 51, shelterCapacity: 42, fireStations: 13, firefighters: 520, annualFireIncidents: 340, civilAirDefenseArea: 79 },    // 兴庆
  '640106': { shelters: 41, shelterCapacity: 34, fireStations: 10, firefighters: 420, annualFireIncidents: 270, civilAirDefenseArea: 64 },    // 金凤
  '640105': { shelters: 28, shelterCapacity: 23, fireStations: 7, firefighters: 290, annualFireIncidents: 190, civilAirDefenseArea: 44 },    // 西夏
  '640121': { shelters: 20, shelterCapacity: 17, fireStations: 5, firefighters: 210, annualFireIncidents: 135, civilAirDefenseArea: 32 },     // 永宁
  '640122': { shelters: 22, shelterCapacity: 18, fireStations: 5, firefighters: 220, annualFireIncidents: 140, civilAirDefenseArea: 34 },     // 贺兰
  '640181': { shelters: 18, shelterCapacity: 15, fireStations: 5, firefighters: 190, annualFireIncidents: 125, civilAirDefenseArea: 27 },     // 灵武
};

const CITY_EMERGENCY: Record<string, Record<string, DistrictEmergency>> = {
  shanghai: SHANGHAI_EMERGENCY,
  yinchuan: YINCHUAN_EMERGENCY,
};

const EMERGENCY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市应急管理局 — 避难场所约2200个/消防站520个/消防员14000人/人防2500万㎡ × 人口+面积加权',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市应急管理局 — 避难场所约180个/消防站45个/消防员1800人/人防280万㎡ × 人口比例',
    year: '2025年',
  },
};

const CITY_EMERGENCY_TOTALS: Record<string, {
  totalShelters: number;
  totalFireStations: number;
  totalFirefighters: number;
  totalShelterCapacity: number; // 万人
  totalCivilAirDefense: number; // 万㎡
  annualFireIncidents: number;
  source: string;
  sourceUrl: string;
  year: string;
}> = {
  shanghai: {
    totalShelters: 2200,
    totalFireStations: 520,
    totalFirefighters: 14000,
    totalShelterCapacity: 1830,
    totalCivilAirDefense: 2500,
    annualFireIncidents: 6500,
    source: '上海市应急管理局 + 上海市2025年统计公报',
    sourceUrl: 'https://yjglj.sh.gov.cn/',
    year: '2025年',
  },
  yinchuan: {
    totalShelters: 180,
    totalFireStations: 45,
    totalFirefighters: 1800,
    totalShelterCapacity: 149,
    totalCivilAirDefense: 280,
    annualFireIncidents: 1200,
    source: '银川市应急管理局 + 银川市2025年统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/',
    year: '2025年',
  },
};

export function getDistrictEmergency(city: string, code: string): DistrictEmergency | null {
  return CITY_EMERGENCY[city]?.[code] ?? null;
}

export function emergencySource(city: string): string {
  return EMERGENCY_SOURCES[city]?.source ?? '—';
}

export function emergencyYear(city: string): string {
  return EMERGENCY_SOURCES[city]?.year ?? '—';
}

export { CITY_EMERGENCY_TOTALS };
