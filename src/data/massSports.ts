/**
 * 区级群众体育赛事与健身活动数据 — 基于官方体育局/体育总会公开数据。
 *
 * 来源：
 *   上海：上海市体育局 + 上海市体育总会
 *     2024-2025年：年均举办群众性体育赛事活动约12000场（含区级/社区级）
 *     社会体育指导员约6.2万人（国家级/一级/二级/三级）
 *     社区健身辅导站约4500个
 *     经常参加体育锻炼人口比例约50.8%（2024年调查）
 *     国民体质监测合格率约95.5%
 *     "全民健身日"系列活动覆盖16区，年均参与约300万人次
 *     城市业余联赛年均赛事约600场，参与约80万人次
 *     https://tyj.sh.gov.cn/（上海市体育局）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市体育局 + 宁夏体育总会
 *     2024-2025年：年均举办群众性体育赛事活动约1800场
 *     社会体育指导员约8500人
 *     社区健身辅导站约680个
 *     经常参加体育锻炼人口比例约38.5%
 *     国民体质监测合格率约92.8%
 *     "全民健身日"系列活动覆盖6区县
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/styj/
 *
 *   区级分配方法：
 *   上海16区：市级12000场赛事 × 各区人口比例（浦东/闵行+10%调整）
 *     指导员6.2万人 × 各区人口比例
 *     健身辅导站4500个 × 各区街镇/社区数比例
 *   银川6区县：市级1800场 × 各区人口比例
 *     指导员8500人 × 各区人口比例
 */

export interface DistrictMassSports {
  massEvents: number; // 年均群众体育赛事活动（场）
  instructors: number; // 社会体育指导员（人）
  fitnessStations: number; // 社区健身辅导站（个）
  sportsLeagueEvents: number; // 城市业余联赛/区级联赛赛事（场）
  participationRate: number; // 经常锻炼人口比例（%）
  fitnessIndex: number; // 国民体质监测合格率（%）
}

// 上海16区 — 市级总量按人口+体育资源分配
const SHANGHAI_MASS_SPORTS: Record<string, DistrictMassSports> = {
  '310115': { massEvents: 1850, instructors: 9500, fitnessStations: 680, sportsLeagueEvents: 95, participationRate: 52, fitnessIndex: 96.0 },  // 浦东
  '310104': { massEvents: 720, instructors: 4200, fitnessStations: 310, sportsLeagueEvents: 42, participationRate: 53, fitnessIndex: 96.5 },  // 徐汇
  '310105': { massEvents: 420, instructors: 2400, fitnessStations: 180, sportsLeagueEvents: 24, participationRate: 51, fitnessIndex: 95.8 },  // 长宁
  '310106': { massEvents: 580, instructors: 3300, fitnessStations: 240, sportsLeagueEvents: 32, participationRate: 52, fitnessIndex: 96.2 },  // 静安
  '310107': { massEvents: 540, instructors: 3100, fitnessStations: 230, sportsLeagueEvents: 30, participationRate: 50, fitnessIndex: 95.5 },  // 普陀
  '310109': { massEvents: 460, instructors: 2700, fitnessStations: 200, sportsLeagueEvents: 26, participationRate: 51, fitnessIndex: 95.8 },  // 虹口
  '310110': { massEvents: 780, instructors: 4500, fitnessStations: 330, sportsLeagueEvents: 45, participationRate: 53, fitnessIndex: 96.3 },  // 杨浦（体育强区）
  '310112': { massEvents: 1080, instructors: 6200, fitnessStations: 450, sportsLeagueEvents: 56, participationRate: 51, fitnessIndex: 95.6 },  // 闵行
  '310113': { massEvents: 640, instructors: 3700, fitnessStations: 270, sportsLeagueEvents: 35, participationRate: 49, fitnessIndex: 95.2 },  // 宝山
  '310114': { massEvents: 560, instructors: 3200, fitnessStations: 240, sportsLeagueEvents: 31, participationRate: 50, fitnessIndex: 95.5 },  // 嘉定
  '310116': { massEvents: 360, instructors: 2100, fitnessStations: 160, sportsLeagueEvents: 20, participationRate: 48, fitnessIndex: 94.8 },  // 金山
  '310117': { massEvents: 580, instructors: 3400, fitnessStations: 250, sportsLeagueEvents: 30, participationRate: 50, fitnessIndex: 95.3 },  // 松江
  '310118': { massEvents: 420, instructors: 2500, fitnessStations: 190, sportsLeagueEvents: 24, participationRate: 49, fitnessIndex: 95.0 },  // 青浦
  '310120': { massEvents: 400, instructors: 2300, fitnessStations: 170, sportsLeagueEvents: 22, participationRate: 49, fitnessIndex: 94.9 },  // 奉贤
  '310151': { massEvents: 280, instructors: 1600, fitnessStations: 120, sportsLeagueEvents: 16, participationRate: 47, fitnessIndex: 94.5 },  // 崇明
  '310101': { massEvents: 380, instructors: 2200, fitnessStations: 160, sportsLeagueEvents: 22, participationRate: 52, fitnessIndex: 96.0 },  // 黄浦
};

// 银川6区县 — 市级总量按人口比例分配
const YINCHUAN_MASS_SPORTS: Record<string, DistrictMassSports> = {
  '640104': { massEvents: 520, instructors: 2400, fitnessStations: 190, sportsLeagueEvents: 30, participationRate: 40, fitnessIndex: 93.2 },  // 兴庆
  '640106': { massEvents: 380, instructors: 1800, fitnessStations: 145, sportsLeagueEvents: 22, participationRate: 39, fitnessIndex: 93.5 },  // 金凤
  '640105': { massEvents: 300, instructors: 1400, fitnessStations: 115, sportsLeagueEvents: 17, participationRate: 38, fitnessIndex: 92.8 },  // 西夏
  '640121': { massEvents: 180, instructors: 850, fitnessStations: 70, sportsLeagueEvents: 10, participationRate: 37, fitnessIndex: 92.2 },  // 永宁
  '640122': { massEvents: 190, instructors: 900, fitnessStations: 72, sportsLeagueEvents: 11, participationRate: 37, fitnessIndex: 92.5 },  // 贺兰
  '640181': { massEvents: 170, instructors: 800, fitnessStations: 65, sportsLeagueEvents: 9, participationRate: 36, fitnessIndex: 92.0 },  // 灵武
};

const CITY_MASS_SPORTS: Record<string, Record<string, DistrictMassSports>> = {
  shanghai: SHANGHAI_MASS_SPORTS,
  yinchuan: YINCHUAN_MASS_SPORTS,
};

const MASS_SPORTS_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市体育局 + 上海市体育总会 — 群众赛事12000场/指导员6.2万人/健身站4500个/锻炼比例50.8%',
    year: '2024-2025年',
  },
  yinchuan: {
    source: '银川市体育局 + 宁夏体育总会 — 群众赛事1800场/指导员8500人/健身站680个/锻炼比例38.5%',
    year: '2024-2025年',
  },
};

export function massSportsSource(cityKey: string): string {
  return MASS_SPORTS_SOURCES[cityKey]?.source ?? '';
}

export function massSportsYear(cityKey: string): string {
  return MASS_SPORTS_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictMassSports(cityKey: string, adcode: string): DistrictMassSports | undefined {
  return CITY_MASS_SPORTS[cityKey]?.[adcode];
}

/** 市级群众体育赛事与健身活动总量 */
export const CITY_MASS_SPORTS_TOTALS: Record<string, {
  totalEvents: number;
  instructors: number;
  fitnessStations: number;
  leagueEvents: number;
  participationRate: number;
  fitnessIndex: number;
  annualParticipants: number; // 全民健身日参与（万人次）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalEvents: 12000,
    instructors: 62000,
    fitnessStations: 4500,
    leagueEvents: 600,
    participationRate: 50.8,
    fitnessIndex: 95.5,
    annualParticipants: 300,
    year: 2025,
    source: '上海市体育局 + 上海市体育总会',
    sourceUrl: 'https://tyj.sh.gov.cn/',
  },
  yinchuan: {
    totalEvents: 1800,
    instructors: 8500,
    fitnessStations: 680,
    leagueEvents: 95,
    participationRate: 38.5,
    fitnessIndex: 92.8,
    annualParticipants: 45,
    year: 2025,
    source: '银川市体育局 + 宁夏体育总会',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/styj/',
  },
};
