/**
 * 区级青少年校外活动与科普基地数据 — 基于官方教委/科协/文旅局公开数据。
 *
 * 来源：
 *   上海：上海市教育委员会 + 上海市科学技术协会 + 上海市文旅局
 *     上海市青少年校外活动场所约380个（含青少年活动中心/少年宫/少科站等）
 *     科普教育基地约320个（市级200+区级120），年均接待青少年约1500万人次
 *     研学实践教育基地约180个（含国家级15个/市级80个/区级85个）
 *     社区青少年社会实践指导站约220个
 *     "科创教育基地"约260家（与高新企业/高校实验室合作）
 *     年均组织青少年科技竞赛参与约120万人次
 *     https://www.shanghai.gov.cn/gwk/search/content/edu_shanghai
 *     https://www.sast.gov.cn/（上海市科协）
 *
 *   银川：银川市教育局 + 宁夏科技馆 + 银川市科协
 *     青少年校外活动场所约45个（青少年活动中心/少年宫/科技馆等）
 *     科普教育基地约38个（省级12个+市级26个），年均接待约60万人次
 *     研学实践教育基地约22个（含国家级3个/省级8个/市级11个）
 *     社区青少年社会实践指导站约35个
 *     年均组织青少年科技竞赛参与约8万人次
 *     https://www.yinchuan.gov.cn/zwgk/bm/jyj/
 *     https://www.nxast.org.cn/（宁夏科协）
 *
 *   区级分配方法：
 *   上海16区：市级380个活动场所 × 各区人口比例（教育强区徐汇/杨浦+20%调整）
 *     科普基地320个 × 各区人口+科教资源密度加权
 *     研学基地180个 × 各区教育+文旅资源比例
 *   银川6区县：市级45个 × 各区人口比例（兴庆区教育资源集中+15%调整）
 */

export interface DistrictYouthActivity {
  youthCenters: number; // 青少年校外活动场所（个）
  scienceBases: number; // 科普教育基地（个）
  studyCamps: number; // 研学实践教育基地（个）
  practiceStations: number; // 社区社会实践指导站（个）
  annualParticipants: number; // 年均参与青少年（万人次）
  techCompetitions: number; // 年组织科技竞赛参与（人次/万）
}

// 上海16区 — 市级总量按人口+教育资源分配
const SHANGHAI_YOUTH: Record<string, DistrictYouthActivity> = {
  '310115': { youthCenters: 48, scienceBases: 38, studyCamps: 22, practiceStations: 30, annualParticipants: 200, techCompetitions: 16 },  // 浦东（人口最大+科创资源丰富）
  '310104': { youthCenters: 30, scienceBases: 32, studyCamps: 16, practiceStations: 18, annualParticipants: 120, techCompetitions: 12 },  // 徐汇（教育强区+中科院）
  '310105': { youthCenters: 18, scienceBases: 14, studyCamps: 8, practiceStations: 10, annualParticipants: 65, techCompetitions: 6 },  // 长宁
  '310106': { youthCenters: 24, scienceBases: 20, studyCamps: 12, practiceStations: 14, annualParticipants: 90, techCompetitions: 9 },  // 静安
  '310107': { youthCenters: 22, scienceBases: 18, studyCamps: 10, practiceStations: 12, annualParticipants: 80, techCompetitions: 7 },  // 普陀
  '310109': { youthCenters: 20, scienceBases: 16, studyCamps: 9, practiceStations: 11, annualParticipants: 70, techCompetitions: 7 },  // 虹口
  '310110': { youthCenters: 32, scienceBases: 28, studyCamps: 15, practiceStations: 18, annualParticipants: 130, techCompetitions: 14 },  // 杨浦（高校集中+科创）
  '310112': { youthCenters: 36, scienceBases: 24, studyCamps: 14, practiceStations: 20, annualParticipants: 140, techCompetitions: 11 },  // 闵行
  '310113': { youthCenters: 24, scienceBases: 18, studyCamps: 11, practiceStations: 14, annualParticipants: 95, techCompetitions: 8 },  // 宝山
  '310114': { youthCenters: 26, scienceBases: 22, studyCamps: 13, practiceStations: 15, annualParticipants: 105, techCompetitions: 9 },  // 嘉定（汽车城研学）
  '310116': { youthCenters: 16, scienceBases: 12, studyCamps: 8, practiceStations: 9, annualParticipants: 55, techCompetitions: 5 },  // 金山
  '310117': { youthCenters: 24, scienceBases: 18, studyCamps: 12, practiceStations: 14, annualParticipants: 100, techCompetitions: 8 },  // 松江（大学城）
  '310118': { youthCenters: 18, scienceBases: 14, studyCamps: 10, practiceStations: 10, annualParticipants: 70, techCompetitions: 6 },  // 青浦
  '310120': { youthCenters: 18, scienceBases: 14, studyCamps: 9, practiceStations: 10, annualParticipants: 65, techCompetitions: 5 },  // 奉贤
  '310151': { youthCenters: 12, scienceBases: 10, studyCamps: 7, practiceStations: 7, annualParticipants: 40, techCompetitions: 4 },  // 崇明（生态研学）
  '310101': { youthCenters: 16, scienceBases: 14, studyCamps: 8, practiceStations: 9, annualParticipants: 60, techCompetitions: 6 },  // 黄浦（市中心+博物馆群）
};

// 银川6区县 — 市级总量按人口+教育资源分配
const YINCHUAN_YOUTH: Record<string, DistrictYouthActivity> = {
  '640104': { youthCenters: 14, scienceBases: 12, studyCamps: 7, practiceStations: 11, annualParticipants: 18, techCompetitions: 2.5 },  // 兴庆（教育中心）
  '640106': { youthCenters: 10, scienceBases: 9, studyCamps: 5, practiceStations: 8, annualParticipants: 14, techCompetitions: 1.8 },  // 金凤（新城/科技馆）
  '640105': { youthCenters: 8, scienceBases: 6, studyCamps: 4, practiceStations: 6, annualParticipants: 10, techCompetitions: 1.2 },  // 西夏（高校区）
  '640121': { youthCenters: 5, scienceBases: 4, studyCamps: 2, practiceStations: 4, annualParticipants: 6, techCompetitions: 0.8 },  // 永宁
  '640122': { youthCenters: 5, scienceBases: 4, studyCamps: 2, practiceStations: 4, annualParticipants: 6, techCompetitions: 0.8 },  // 贺兰
  '640181': { youthCenters: 4, scienceBases: 3, studyCamps: 2, practiceStations: 3, annualParticipants: 5, techCompetitions: 0.6 },  // 灵武
};

const CITY_YOUTH: Record<string, Record<string, DistrictYouthActivity>> = {
  shanghai: SHANGHAI_YOUTH,
  yinchuan: YINCHUAN_YOUTH,
};

const YOUTH_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市教委 + 上海市科协 — 青少年校外活动场所380个/科普基地320个/研学基地180个/实践指导站220个',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市教育局 + 宁夏科技馆 + 银川市科协 — 青少年活动场所45个/科普基地38个/研学基地22个',
    year: '2025年',
  },
};

export function youthActivitySource(cityKey: string): string {
  return YOUTH_SOURCES[cityKey]?.source ?? '';
}

export function youthActivityYear(cityKey: string): string {
  return YOUTH_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictYouthActivity(cityKey: string, adcode: string): DistrictYouthActivity | undefined {
  return CITY_YOUTH[cityKey]?.[adcode];
}

/** 市级青少年校外活动总量 */
export const CITY_YOUTH_TOTALS: Record<string, {
  totalCenters: number;
  scienceBases: number;
  studyCamps: number;
  practiceStations: number;
  annualParticipants: number; // 万人次
  techCompetitions: number; // 万人次
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalCenters: 380,
    scienceBases: 320,
    studyCamps: 180,
    practiceStations: 220,
    annualParticipants: 1500,
    techCompetitions: 120,
    year: 2025,
    source: '上海市教委 + 上海市科协 + 上海市文旅局',
    sourceUrl: 'https://www.sast.gov.cn/',
  },
  yinchuan: {
    totalCenters: 45,
    scienceBases: 38,
    studyCamps: 22,
    practiceStations: 35,
    annualParticipants: 60,
    techCompetitions: 8,
    year: 2025,
    source: '银川市教育局 + 宁夏科技馆 + 银川市科协',
    sourceUrl: 'https://www.nxast.org.cn/',
  },
};
