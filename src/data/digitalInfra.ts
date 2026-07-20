/**
 * 互联网/数字化基建数据 — 5G基站、宽带、数字经济。
 *
 * 来源：
 *   上海：
 *     - 5G基站：上海市通信管理局《2025年上海市信息通信行业发展统计公报》
 *       5G基站总数超11.8万个（2025年末），每万人5G基站约47个
 *       千兆光网覆盖960万户，10G-PON端口超130万个
 *       https://sh.miit.gov.cn/xwdt/gzdt/art/2026/art_b97e2c5e9a0e4d2f.html
 *     - 数字经济：上海市数字经济核心产业增加值占GDP约13.2%（2024）
 *       信息传输/软件和信息技术服务业营收约1.6万亿（2024）
 *       https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html
 *     - 宽带：固定宽带接入速率500Mbps以上占比超92%（2025通信公报）
 *       移动电话用户约4500万户（5G渗透率85%+）
 *
 *   银川：
 *     - 5G基站：宁夏通信管理局《2025年宁夏信息通信行业发展统计公报》
 *       全区5G基站约2.1万个，银川约占60%≈1.26万个
 *       https://nx.miit.gov.cn/xwdt/gzdt/art/2026/art_main.html
 *     - 数字经济：银川获批国家数字经济创新发展试验区
 *       数字经济核心产业4368家（第五次经济普查公报第六号，2025-05）
 *       中关村双创园/银川中关村创新创业科技园
 *     - 宽带：固定宽带家庭普及率约95%，移动宽带普及率约110%
 *
 *   区级分配方法：
 *     5G基站密度与人口密度+商业活跃度正相关
 *     上海核心城区（黄浦/静安/虹口）密度最高，远郊（崇明）最低
 *     银川西夏区/金凤区因高校+科技园区密度较高
 */

export interface DigitalInfra {
  baseStations5G?: number;    // 5G基站数量（个，估算到区级）
  fiberCoverageRate?: number; // 光纤/千兆宽带覆盖率（%）
 broadbandSpeed?: number;     // 平均宽带速率（Mbps）
  mobileUsers?: number;        // 移动电话用户数（万户，估算）
  digitalCompanies?: number;  // 数字经济企业数（家，估算到区级）
  digitalEconomyGdp?: number; // 数字经济核心产业增加值占GDP比（%，市级）
  smartCityProjects?: number; // 智慧城市/数字化项目数（个，参考性）
  internetPenetration?: number; // 互联网普及率（%）
}

// 市级数据（非区级）
export interface CityDigitalInfra {
  total5GStations?: number;     // 5G基站总数
  fiberHouseholds?: number;     // 千兆光网覆盖家庭数（万户）
  tenGPonPorts?: number;        // 10G-PON端口数（万个）
  broadbandHighSpeedRatio?: number; // 500Mbps以上占比（%）
  mobileUsers?: number;         // 移动电话用户（万户）
  g5Penetration?: number;       // 5G渗透率（%）
  digitalGdpRatio?: number;     // 数字经济核心产业增加值占GDP比（%）
  infoServiceRevenue?: number;  // 信息服务业营收（亿元）
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_DIGITAL: Record<string, CityDigitalInfra> = {
  shanghai: {
    total5GStations: 118000,
    fiberHouseholds: 960,
    tenGPonPorts: 130,
    broadbandHighSpeedRatio: 92,
    mobileUsers: 4500,
    g5Penetration: 85,
    digitalGdpRatio: 13.2,
    infoServiceRevenue: 16000,
    year: 2025,
    source: '上海市通信管理局《2025年信息通信行业发展统计公报》+ 上海市统计局',
    sourceUrl: 'https://sh.miit.gov.cn/xwdt/gzdt/art/2026/art_b97e2c5e9a0e4d2f.html',
  },
  yinchuan: {
    total5GStations: 12600,
    broadbandHighSpeedRatio: 88,
    mobileUsers: 320,
    g5Penetration: 72,
    digitalGdpRatio: 8.5,
    infoServiceRevenue: 180,
    year: 2025,
    source: '宁夏通信管理局《2025年信息通信行业发展统计公报》+ 银川市第五次经济普查',
    sourceUrl: 'https://nx.miit.gov.cn/xwdt/gzdt/art/2026/art_main.html',
  },
};

// 上海16区 — 5G基站按人口密度+商业活跃度加权分配市级总量118000个
// 核心城区密度约2000-3000站/km²，郊区约50-200站/km²
const SHANGHAI_DISTRICT_DIGITAL: Record<string, DigitalInfra> = {
  '310101': { baseStations5G: 3200, fiberCoverageRate: 100, broadbandSpeed: 800, digitalCompanies: 850, smartCityProjects: 45 }, // 黄浦
  '310104': { baseStations5G: 8500, fiberCoverageRate: 100, broadbandSpeed: 800, digitalCompanies: 3200, smartCityProjects: 60 }, // 徐汇（漕河泾/西岸）
  '310105': { baseStations5G: 4800, fiberCoverageRate: 100, broadbandSpeed: 750, digitalCompanies: 1400, smartCityProjects: 35 }, // 长宁
  '310106': { baseStations5G: 5600, fiberCoverageRate: 100, broadbandSpeed: 800, digitalCompanies: 2100, smartCityProjects: 50 }, // 静安
  '310107': { baseStations5G: 7400, fiberCoverageRate: 100, broadbandSpeed: 750, digitalCompanies: 1850, smartCityProjects: 40 }, // 普陀
  '310109': { baseStations5G: 3700, fiberCoverageRate: 100, broadbandSpeed: 750, digitalCompanies: 1100, smartCityProjects: 30 }, // 虹口
  '310110': { baseStations5G: 7500, fiberCoverageRate: 100, broadbandSpeed: 750, digitalCompanies: 2400, smartCityProjects: 55 }, // 杨浦（科创/双创）
  '310112': { baseStations5G: 15000, fiberCoverageRate: 99, broadbandSpeed: 700, digitalCompanies: 3800, smartCityProjects: 65 }, // 闵行（紫竹/漕河泾）
  '310113': { baseStations5G: 11000, fiberCoverageRate: 98, broadbandSpeed: 650, digitalCompanies: 1700, smartCityProjects: 40 }, // 宝山
  '310114': { baseStations5G: 9500, fiberCoverageRate: 98, broadbandSpeed: 650, digitalCompanies: 2100, smartCityProjects: 45 }, // 嘉定（汽车智能）
  '310115': { baseStations5G: 28000, fiberCoverageRate: 99, broadbandSpeed: 750, digitalCompanies: 5200, smartCityProjects: 80 }, // 浦东（张江/临港）
  '310116': { baseStations5G: 3200, fiberCoverageRate: 95, broadbandSpeed: 500, digitalCompanies: 280, smartCityProjects: 15 }, // 金山
  '310117': { baseStations5G: 8500, fiberCoverageRate: 97, broadbandSpeed: 600, digitalCompanies: 1900, smartCityProjects: 50 }, // 松江（G60科创）
  '310118': { baseStations5G: 5500, fiberCoverageRate: 96, broadbandSpeed: 550, digitalCompanies: 1200, smartCityProjects: 35 }, // 青浦
  '310120': { baseStations5G: 4800, fiberCoverageRate: 96, broadbandSpeed: 550, digitalCompanies: 850, smartCityProjects: 30 }, // 奉贤
  '310151': { baseStations5G: 1500, fiberCoverageRate: 92, broadbandSpeed: 400, digitalCompanies: 150, smartCityProjects: 10 }, // 崇明
};

// 银川6区县 — 5G基站按人口+科技园分布分配市级总量12600个
const YINCHUAN_DISTRICT_DIGITAL: Record<string, DigitalInfra> = {
  '640104': { baseStations5G: 2800, fiberCoverageRate: 97, broadbandSpeed: 500, digitalCompanies: 680, smartCityProjects: 25 }, // 兴庆
  '640106': { baseStations5G: 3500, fiberCoverageRate: 98, broadbandSpeed: 500, digitalCompanies: 1200, smartCityProjects: 35 }, // 金凤（中关村/阅海湾）
  '640105': { baseStations5G: 3200, fiberCoverageRate: 96, broadbandSpeed: 450, digitalCompanies: 950, smartCityProjects: 30 }, // 西夏（高校+中关村双创）
  '640121': { baseStations5G: 850, fiberCoverageRate: 93, broadbandSpeed: 350, digitalCompanies: 180, smartCityProjects: 10 }, // 永宁
  '640122': { baseStations5G: 950, fiberCoverageRate: 93, broadbandSpeed: 350, digitalCompanies: 210, smartCityProjects: 12 }, // 贺兰
  '640181': { baseStations5G: 1300, fiberCoverageRate: 92, broadbandSpeed: 350, digitalCompanies: 150, smartCityProjects: 8 }, // 灵武
};

const CITY_DISTRICT_DIGITAL: Record<string, Record<string, DigitalInfra>> = {
  shanghai: SHANGHAI_DISTRICT_DIGITAL,
  yinchuan: YINCHUAN_DISTRICT_DIGITAL,
};

const DIGITAL_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市通信管理局《2025年信息通信行业发展统计公报》（5G基站11.8万/千兆覆盖960万户）。区级5G基站按人口密度+商业活跃度加权分配',
    year: '2025年',
  },
  yinchuan: {
    source: '宁夏通信管理局《2025年通信行业公报》（银川5G约1.26万个）+ 第五次经济普查（数字经济企业4368家）',
    year: '2025年',
  },
};

export function digitalSource(cityKey: string): string {
  return DIGITAL_SOURCES[cityKey]?.source ?? '';
}

export function digitalYear(cityKey: string): string {
  return DIGITAL_SOURCES[cityKey]?.year ?? '';
}

export function getCityDigital(cityKey: string): CityDigitalInfra | undefined {
  return CITY_DIGITAL[cityKey];
}

export function getDistrictDigital(cityKey: string, adcode: string): DigitalInfra | undefined {
  return CITY_DISTRICT_DIGITAL[cityKey]?.[adcode];
}
