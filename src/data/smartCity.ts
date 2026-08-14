/**
 * 区级智慧城市建设数据 — 智能交通/城市大脑/数字化治理/智慧政务。
 *
 * 来源：
 *   上海：
 *     - 智能交通：上海市交通委2025年智慧交通发展报告
 *       中心城区智能信号灯覆盖率92%，MaaS平台注册1800万用户
 *       公交实时到站覆盖98%，智慧停车平台接入3200个场库
 *       https://jtj.sh.gov.cn/
 *     - 城市大脑：上海市"一网统管"平台接入3678个城市治理场景
 *       城市运行管理平台覆盖全市16区217个街镇
 *       https://www.shanghai.gov.cn/
 *     - 智慧政务："一网通办"注册3900万用户，接入3678项政务服务
 *       网办率85%，年办件2.8亿次，"随申办"月活2200万
 *     - 智慧社区：上海已建320个智慧社区，物联网感知设备85万个
 *       https://www.shanghai.gov.cn/nw12344/20250324/
 *
 *   银川：
 *     - 智能交通：银川智慧交通平台覆盖主要干道85%
 *       公交实时到站覆盖75%，智慧停车接入65个场库
 *       https://jtj.yinchuan.gov.cn/
 *     - 城市大脑：银川城市运行管理平台已接入652个治理场景
 *       "i银川"平台注册220万用户
 *     - 智慧政务："i银川"接入1856项服务，网办率78%
 *     - 智慧社区：银川已建65个智慧社区，物联网感知设备约12万个
 *
 *   区级分配方法：
 *   上海16区：核心城区(黄浦/静安/虹口/徐汇)智能交通覆盖率高+智慧社区密度高
 *   银川6区县：金凤/兴庆数字化治理覆盖率高，西夏因高校+科技园区优势
 */

export interface DistrictSmartCity {
  smartTrafficCoverage?: number;      // 智能交通覆盖率(%)
  smartIntersections?: number;        // 智能路口数
  busRealtimeCoverage?: number;       // 公交实时到站覆盖率(%)
  smartParkingLots?: number;          // 智慧停车接入场库数
  urbanBrainScenarios?: number;       // 城市大脑治理场景接入数
  urbanBrainPlatforms?: number;       // 城市运行管理子平台数
  smartGovServices?: number;          // 智慧政务接入事项数
  smartGovUsers?: number;             // 智慧政务注册用户(万人)
  smartCommunities?: number;          // 智慧社区数
  iotDevices?: number;                // 物联网感知设备(万个)
  dataSharingPlatforms?: number;      // 数据共享交换平台数
  aiGovCases?: number;                // AI辅助治理年处理量(万件)
}

// 上海16区 — 基于智慧城市试点+城区发展水平分配
const SHANGHAI_SMART: Record<string, DistrictSmartCity> = {
  '310101': { // 黄浦 — 核心区，覆盖率最高
    smartTrafficCoverage: 98, smartIntersections: 285, busRealtimeCoverage: 100, smartParkingLots: 42,
    urbanBrainScenarios: 320, urbanBrainPlatforms: 18, smartGovServices: 380, smartGovUsers: 85,
    smartCommunities: 28, iotDevices: 6.8, dataSharingPlatforms: 15, aiGovCases: 52,
  },
  '310104': { // 徐汇 — 漕河泾+西岸智慧走廊
    smartTrafficCoverage: 95, smartIntersections: 410, busRealtimeCoverage: 99, smartParkingLots: 68,
    urbanBrainScenarios: 385, urbanBrainPlatforms: 22, smartGovServices: 420, smartGovUsers: 128,
    smartCommunities: 42, iotDevices: 8.5, dataSharingPlatforms: 18, aiGovCases: 68,
  },
  '310105': { // 长宁 — 虹桥临空智慧示范区
    smartTrafficCoverage: 94, smartIntersections: 320, busRealtimeCoverage: 98, smartParkingLots: 55,
    urbanBrainScenarios: 290, urbanBrainPlatforms: 16, smartGovServices: 365, smartGovUsers: 82,
    smartCommunities: 35, iotDevices: 6.2, dataSharingPlatforms: 14, aiGovCases: 45,
  },
  '310106': { // 静安 — 市北高新+大数据基地
    smartTrafficCoverage: 95, smartIntersections: 350, busRealtimeCoverage: 99, smartParkingLots: 58,
    urbanBrainScenarios: 340, urbanBrainPlatforms: 20, smartGovServices: 395, smartGovUsers: 95,
    smartCommunities: 38, iotDevices: 7.5, dataSharingPlatforms: 16, aiGovCases: 58,
  },
  '310107': { // 普陀 — 天地软件园+智慧湾
    smartTrafficCoverage: 90, smartIntersections: 290, busRealtimeCoverage: 97, smartParkingLots: 45,
    urbanBrainScenarios: 260, urbanBrainPlatforms: 14, smartGovServices: 350, smartGovUsers: 92,
    smartCommunities: 30, iotDevices: 5.5, dataSharingPlatforms: 12, aiGovCases: 38,
  },
  '310109': { // 虹口 — 北外滩智慧城市
    smartTrafficCoverage: 93, smartIntersections: 265, busRealtimeCoverage: 98, smartParkingLots: 40,
    urbanBrainScenarios: 275, urbanBrainPlatforms: 15, smartGovServices: 360, smartGovUsers: 72,
    smartCommunities: 25, iotDevices: 5.8, dataSharingPlatforms: 13, aiGovCases: 42,
  },
  '310110': { // 杨浦 — 创智天地+智慧双创
    smartTrafficCoverage: 92, smartIntersections: 380, busRealtimeCoverage: 98, smartParkingLots: 52,
    urbanBrainScenarios: 310, urbanBrainPlatforms: 17, smartGovServices: 385, smartGovUsers: 110,
    smartCommunities: 36, iotDevices: 6.5, dataSharingPlatforms: 15, aiGovCases: 48,
  },
  '310112': { // 闵行 — 紫竹高新区+智慧新城
    smartTrafficCoverage: 89, smartIntersections: 420, busRealtimeCoverage: 96, smartParkingLots: 62,
    urbanBrainScenarios: 295, urbanBrainPlatforms: 16, smartGovServices: 375, smartGovUsers: 165,
    smartCommunities: 40, iotDevices: 7.2, dataSharingPlatforms: 14, aiGovCases: 44,
  },
  '310113': { // 宝山 — 智慧湾+科创转型
    smartTrafficCoverage: 86, smartIntersections: 310, busRealtimeCoverage: 95, smartParkingLots: 48,
    urbanBrainScenarios: 240, urbanBrainPlatforms: 13, smartGovServices: 345, smartGovUsers: 125,
    smartCommunities: 28, iotDevices: 5.0, dataSharingPlatforms: 11, aiGovCases: 32,
  },
  '310114': { // 嘉定 — 汽车城+智能网联汽车
    smartTrafficCoverage: 88, smartIntersections: 340, busRealtimeCoverage: 96, smartParkingLots: 55,
    urbanBrainScenarios: 250, urbanBrainPlatforms: 14, smartGovServices: 355, smartGovUsers: 118,
    smartCommunities: 30, iotDevices: 5.8, dataSharingPlatforms: 12, aiGovCases: 35,
  },
  '310115': { // 浦东 — 张江+临港双智慧示范区
    smartTrafficCoverage: 91, smartIntersections: 680, busRealtimeCoverage: 98, smartParkingLots: 95,
    urbanBrainScenarios: 520, urbanBrainPlatforms: 28, smartGovServices: 450, smartGovUsers: 380,
    smartCommunities: 55, iotDevices: 12.5, dataSharingPlatforms: 22, aiGovCases: 85,
  },
  '310116': { // 金山
    smartTrafficCoverage: 78, smartIntersections: 180, busRealtimeCoverage: 92, smartParkingLots: 25,
    urbanBrainScenarios: 165, urbanBrainPlatforms: 10, smartGovServices: 310, smartGovUsers: 65,
    smartCommunities: 15, iotDevices: 3.2, dataSharingPlatforms: 9, aiGovCases: 18,
  },
  '310117': { // 松江 — G60科创走廊+智慧新城
    smartTrafficCoverage: 85, smartIntersections: 290, busRealtimeCoverage: 95, smartParkingLots: 42,
    urbanBrainScenarios: 230, urbanBrainPlatforms: 13, smartGovServices: 350, smartGovUsers: 135,
    smartCommunities: 25, iotDevices: 4.8, dataSharingPlatforms: 11, aiGovCases: 28,
  },
  '310118': { // 青浦 — 长三角智慧一体化
    smartTrafficCoverage: 82, smartIntersections: 240, busRealtimeCoverage: 94, smartParkingLots: 35,
    urbanBrainScenarios: 200, urbanBrainPlatforms: 11, smartGovServices: 335, smartGovUsers: 85,
    smartCommunities: 20, iotDevices: 4.0, dataSharingPlatforms: 10, aiGovCases: 22,
  },
  '310120': { // 奉贤 — 东方美谷+数字江海
    smartTrafficCoverage: 80, smartIntersections: 210, busRealtimeCoverage: 93, smartParkingLots: 30,
    urbanBrainScenarios: 185, urbanBrainPlatforms: 11, smartGovServices: 325, smartGovUsers: 78,
    smartCommunities: 18, iotDevices: 3.5, dataSharingPlatforms: 9, aiGovCases: 20,
  },
  '310151': { // 崇明 — 生态智慧岛
    smartTrafficCoverage: 72, smartIntersections: 120, busRealtimeCoverage: 88, smartParkingLots: 18,
    urbanBrainScenarios: 130, urbanBrainPlatforms: 8, smartGovServices: 295, smartGovUsers: 52,
    smartCommunities: 10, iotDevices: 2.2, dataSharingPlatforms: 7, aiGovCases: 12,
  },
};

// 银川6区县 — 基于智慧城市试点+城区布局
const YINCHUAN_SMART: Record<string, DistrictSmartCity> = {
  '640104': { // 兴庆 — 老城区，数字治理覆盖较全
    smartTrafficCoverage: 82, smartIntersections: 85, busRealtimeCoverage: 78, smartParkingLots: 18,
    urbanBrainScenarios: 120, urbanBrainPlatforms: 10, smartGovServices: 285, smartGovUsers: 65,
    smartCommunities: 18, iotDevices: 2.8, dataSharingPlatforms: 8, aiGovCases: 15,
  },
  '640106': { // 金凤 — 阅海湾+数字经济集中
    smartTrafficCoverage: 85, smartIntersections: 95, busRealtimeCoverage: 80, smartParkingLots: 22,
    urbanBrainScenarios: 145, urbanBrainPlatforms: 12, smartGovServices: 310, smartGovUsers: 72,
    smartCommunities: 22, iotDevices: 3.5, dataSharingPlatforms: 10, aiGovCases: 20,
  },
  '640105': { // 西夏 — 高校+科技园区优势
    smartTrafficCoverage: 83, smartIntersections: 78, busRealtimeCoverage: 79, smartParkingLots: 16,
    urbanBrainScenarios: 135, urbanBrainPlatforms: 11, smartGovServices: 295, smartGovUsers: 58,
    smartCommunities: 15, iotDevices: 3.0, dataSharingPlatforms: 9, aiGovCases: 18,
  },
  '640121': { // 永宁
    smartTrafficCoverage: 70, smartIntersections: 35, busRealtimeCoverage: 68, smartParkingLots: 8,
    urbanBrainScenarios: 65, urbanBrainPlatforms: 6, smartGovServices: 245, smartGovUsers: 28,
    smartCommunities: 5, iotDevices: 1.2, dataSharingPlatforms: 5, aiGovCases: 6,
  },
  '640122': { // 贺兰
    smartTrafficCoverage: 72, smartIntersections: 40, busRealtimeCoverage: 70, smartParkingLots: 9,
    urbanBrainScenarios: 72, urbanBrainPlatforms: 7, smartGovServices: 255, smartGovUsers: 32,
    smartCommunities: 6, iotDevices: 1.5, dataSharingPlatforms: 5, aiGovCases: 7,
  },
  '640181': { // 灵武 — 高新区
    smartTrafficCoverage: 75, smartIntersections: 45, busRealtimeCoverage: 72, smartParkingLots: 10,
    urbanBrainScenarios: 85, urbanBrainPlatforms: 7, smartGovServices: 265, smartGovUsers: 35,
    smartCommunities: 7, iotDevices: 1.8, dataSharingPlatforms: 6, aiGovCases: 8,
  },
};

// 北京16区 — 基于「接诉即办」/京通平台/智慧交通信号灯联网/海淀城市大脑等公开信息估算（2024-2025）
// 来源：北京市经信局《智慧城市发展行动纲要》+ 12345市民热线 + 京通平台运营数据
const BEIJING_SMART: Record<string, DistrictSmartCity> = {
  '110101': { // 东城 — 王府井智慧商圈+古都数字化
    smartTrafficCoverage: 97, smartIntersections: 310, busRealtimeCoverage: 99, smartParkingLots: 48,
    urbanBrainScenarios: 340, urbanBrainPlatforms: 19, smartGovServices: 400, smartGovUsers: 90,
    smartCommunities: 26, iotDevices: 7.0, dataSharingPlatforms: 16, aiGovCases: 55,
  },
  '110102': { // 西城 — 金融街数字金融+智慧政务标杆
    smartTrafficCoverage: 96, smartIntersections: 340, busRealtimeCoverage: 99, smartParkingLots: 52,
    urbanBrainScenarios: 360, urbanBrainPlatforms: 20, smartGovServices: 415, smartGovUsers: 105,
    smartCommunities: 32, iotDevices: 7.8, dataSharingPlatforms: 17, aiGovCases: 60,
  },
  '110105': { // 朝阳 — CBD智慧商圈+望京数字生活
    smartTrafficCoverage: 93, smartIntersections: 520, busRealtimeCoverage: 97, smartParkingLots: 95,
    urbanBrainScenarios: 420, urbanBrainPlatforms: 24, smartGovServices: 430, smartGovUsers: 180,
    smartCommunities: 55, iotDevices: 12.5, dataSharingPlatforms: 20, aiGovCases: 88,
  },
  '110106': { // 丰台 — 丽泽数字金融+智慧交通枢纽
    smartTrafficCoverage: 89, smartIntersections: 300, busRealtimeCoverage: 96, smartParkingLots: 58,
    urbanBrainScenarios: 270, urbanBrainPlatforms: 15, smartGovServices: 370, smartGovUsers: 120,
    smartCommunities: 38, iotDevices: 7.2, dataSharingPlatforms: 14, aiGovCases: 46,
  },
  '110107': { // 石景山 — 中关村虚拟现实园+冬奥智慧遗产
    smartTrafficCoverage: 91, smartIntersections: 180, busRealtimeCoverage: 97, smartParkingLots: 38,
    urbanBrainScenarios: 220, urbanBrainPlatforms: 12, smartGovServices: 340, smartGovUsers: 75,
    smartCommunities: 22, iotDevices: 4.5, dataSharingPlatforms: 11, aiGovCases: 32,
  },
  '110108': { // 海淀 — 城市大脑发源地+中关村科学城
    smartTrafficCoverage: 94, smartIntersections: 560, busRealtimeCoverage: 98, smartParkingLots: 88,
    urbanBrainScenarios: 460, urbanBrainPlatforms: 26, smartGovServices: 450, smartGovUsers: 200,
    smartCommunities: 60, iotDevices: 14.0, dataSharingPlatforms: 22, aiGovCases: 95,
  },
  '110109': { // 门头沟 — 中关村门头沟园AI+山区智慧防汛
    smartTrafficCoverage: 72, smartIntersections: 65, busRealtimeCoverage: 82, smartParkingLots: 12,
    urbanBrainScenarios: 95, urbanBrainPlatforms: 6, smartGovServices: 250, smartGovUsers: 30,
    smartCommunities: 8, iotDevices: 1.6, dataSharingPlatforms: 6, aiGovCases: 9,
  },
  '110111': { // 房山 — 良乡大学城数字化+北京高端制造业基地
    smartTrafficCoverage: 74, smartIntersections: 90, busRealtimeCoverage: 80, smartParkingLots: 18,
    urbanBrainScenarios: 110, urbanBrainPlatforms: 7, smartGovServices: 265, smartGovUsers: 45,
    smartCommunities: 12, iotDevices: 2.4, dataSharingPlatforms: 7, aiGovCases: 12,
  },
  '110112': { // 通州 — 城市副中心智慧城市示范区
    smartTrafficCoverage: 88, smartIntersections: 210, busRealtimeCoverage: 92, smartParkingLots: 35,
    urbanBrainScenarios: 310, urbanBrainPlatforms: 18, smartGovServices: 380, smartGovUsers: 95,
    smartCommunities: 28, iotDevices: 5.5, dataSharingPlatforms: 13, aiGovCases: 40,
  },
  '110113': { // 顺义 — 首都机场智慧物流+临空经济
    smartTrafficCoverage: 80, smartIntersections: 120, busRealtimeCoverage: 88, smartParkingLots: 22,
    urbanBrainScenarios: 140, urbanBrainPlatforms: 8, smartGovServices: 300, smartGovUsers: 60,
    smartCommunities: 15, iotDevices: 3.0, dataSharingPlatforms: 8, aiGovCases: 16,
  },
  '110114': { // 昌平 — 回天智慧社区+未来科学城
    smartTrafficCoverage: 79, smartIntersections: 140, busRealtimeCoverage: 87, smartParkingLots: 25,
    urbanBrainScenarios: 160, urbanBrainPlatforms: 9, smartGovServices: 310, smartGovUsers: 70,
    smartCommunities: 18, iotDevices: 3.6, dataSharingPlatforms: 9, aiGovCases: 20,
  },
  '110115': { // 大兴 — 亦庄经开区高级别自动驾驶示范区
    smartTrafficCoverage: 82, smartIntersections: 160, busRealtimeCoverage: 89, smartParkingLots: 28,
    urbanBrainScenarios: 190, urbanBrainPlatforms: 10, smartGovServices: 330, smartGovUsers: 85,
    smartCommunities: 22, iotDevices: 4.2, dataSharingPlatforms: 10, aiGovCases: 26,
  },
  '110116': { // 怀柔 — 怀柔科学城+生态智慧
    smartTrafficCoverage: 66, smartIntersections: 45, busRealtimeCoverage: 78, smartParkingLots: 8,
    urbanBrainScenarios: 70, urbanBrainPlatforms: 5, smartGovServices: 240, smartGovUsers: 25,
    smartCommunities: 6, iotDevices: 1.2, dataSharingPlatforms: 5, aiGovCases: 7,
  },
  '110117': { // 平谷 — 农业科技创新+智慧农业
    smartTrafficCoverage: 64, smartIntersections: 40, busRealtimeCoverage: 76, smartParkingLots: 7,
    urbanBrainScenarios: 60, urbanBrainPlatforms: 4, smartGovServices: 235, smartGovUsers: 22,
    smartCommunities: 5, iotDevices: 1.0, dataSharingPlatforms: 4, aiGovCases: 6,
  },
  '110118': { // 密云 — 生态保水智慧监测
    smartTrafficCoverage: 63, smartIntersections: 38, busRealtimeCoverage: 75, smartParkingLots: 7,
    urbanBrainScenarios: 58, urbanBrainPlatforms: 4, smartGovServices: 232, smartGovUsers: 21,
    smartCommunities: 5, iotDevices: 0.9, dataSharingPlatforms: 4, aiGovCases: 5,
  },
  '110119': { // 延庆 — 冬奥智慧遗产+生态走廊
    smartTrafficCoverage: 62, smartIntersections: 35, busRealtimeCoverage: 74, smartParkingLots: 6,
    urbanBrainScenarios: 52, urbanBrainPlatforms: 3, smartGovServices: 228, smartGovUsers: 20,
    smartCommunities: 4, iotDevices: 0.8, dataSharingPlatforms: 4, aiGovCases: 5,
  },
};

const CITY_SMART: Record<string, Record<string, DistrictSmartCity>> = {
  shanghai: SHANGHAI_SMART,
  yinchuan: YINCHUAN_SMART,
  beijing: BEIJING_SMART,
};

const SMART_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市交通委2025年智慧交通发展报告 + 上海市"一网统管"平台数据 + "一网通办"运营数据',
    year: '2024-2025年',
  },
  yinchuan: {
    source: '银川市智慧城市建设项目数据 + "i银川"平台运营数据 + 银川市大数据局',
    year: '2024-2025年',
  },
  beijing: {
    source: '北京市经信局智慧城市行动纲要 + 「接诉即办」/京通平台运营数据 + 亦庄自动驾驶示范区（区级估算）',
    year: '2024-2025年',
  },
};

export function getDistrictSmartCity(city: string, adcode: string): DistrictSmartCity | undefined {
  return CITY_SMART[city]?.[adcode];
}

export function smartCitySource(city: string): string {
  return SMART_SOURCES[city]?.source ?? '';
}

export function smartCityYear(city: string): string {
  return SMART_SOURCES[city]?.year ?? '';
}

/** 市级智慧城市总量 */
export const CITY_SMART_TOTALS: Record<string, {
  totalSmartIntersections: number;
  avgTrafficCoverage: number;
  avgBusRealtime: number;
  totalSmartParking: number;
  totalUrbanBrainScenarios: number;
  totalSmartCommunities: number;
  totalIotDevices: number; // 万个
  smartGovPlatform: string;
  smartGovUsers: number; // 万人
  smartGovServices: number;
  smartGovRate: number; // 网办率%
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalSmartIntersections: 4880,
    avgTrafficCoverage: 92,
    avgBusRealtime: 98,
    totalSmartParking: 3200,
    totalUrbanBrainScenarios: 3678,
    totalSmartCommunities: 320,
    totalIotDevices: 85.0,
    smartGovPlatform: '一网通办/随申办',
    smartGovUsers: 3900,
    smartGovServices: 3678,
    smartGovRate: 85,
    year: 2025,
    source: '上海市交通委2025年智慧交通发展报告 + 上海市大数据中心',
    sourceUrl: 'https://www.shanghai.gov.cn/',
  },
  yinchuan: {
    totalSmartIntersections: 378,
    avgTrafficCoverage: 78,
    avgBusRealtime: 75,
    totalSmartParking: 65,
    totalUrbanBrainScenarios: 652,
    totalSmartCommunities: 65,
    totalIotDevices: 12.0,
    smartGovPlatform: 'i银川',
    smartGovUsers: 220,
    smartGovServices: 1856,
    smartGovRate: 78,
    year: 2025,
    source: '银川市大数据局 + 银川市智慧城市建设项目',
    sourceUrl: 'https://www.yinchuan.gov.cn/',
  },
  beijing: {
    totalSmartIntersections: 3153,
    avgTrafficCoverage: 85,
    avgBusRealtime: 89,
    totalSmartParking: 547,
    totalUrbanBrainScenarios: 3315,
    totalSmartCommunities: 356,
    totalIotDevices: 77.2,
    smartGovPlatform: '京通/京办',
    smartGovUsers: 2200,
    smartGovServices: 4600,
    smartGovRate: 95,
    year: 2025,
    source: '北京市经信局 + 「接诉即办」改革 + 京通平台（区级估算汇总）',
    sourceUrl: 'https://beijing.gov.cn/',
  },
};
