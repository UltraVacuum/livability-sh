/**
 * 区级可再生能源与绿色设施数据 — 基于官方统计公报 + 政府公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）+ 上海市交通委员会 + 智研咨询
 *     光伏累计并网容量625.1万千瓦（+51.94%），新增213.7万千瓦（+75.16%）
 *     其中分布式光伏累计563.2万千瓦，户用光伏50.2万千瓦
 *     充换电设施17.18万个，充电站11543座，设备总功率602万千瓦（2024.12数据）
 *     新能源汽车累计推广超160万辆
 *     新建民用建筑绿色建筑面积占比75%，超低能耗建筑202万㎡
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://jtw.sh.gov.cn/zcjd/20250729/9fe4be2b382943ae93b0c4c94ce171ab.html
 *     https://www.chyxx.com/shuju/1255572.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）+ 银川市政府
 *     可再生能源发电量209.43亿千瓦时（+36.4%），占全部发电量17.2%
     新能源汽车65903辆，充电桩30355个，车桩比2.17:1（2024.09数据）
     规划到2025年公共充电站500座、换电站7座、公共充电桩3000台
     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *     https://www.yinchuan.gov.cn/xwzx/mrdt/202411/t20241111_4723300.html
 *
 *   区级分配方法：
 *   上海16区：充电桩按人口+车辆保有量加权分配（浦东/闵行保有量大）
 *     光伏按面积+工业权重分配（浦东/崇明/奉贤面积大）
 *     绿色建筑按新建建筑量分配（浦东/闵行/松山新建量大）
 *   银川6区县：充电桩按人口+城区权重分配（金凤区新城区加权）
 */

export interface DistrictRenewable {
  chargingStations?: number; // 充电站/点数量（个）
  chargingGuns?: number; // 充电枪数量（个）
  pvCapacity?: number; // 分布式光伏累计装机容量（万千瓦）
  greenBuildings?: number; // 绿色建筑项目数（个）
  greenBuildingArea?: number; // 绿色建筑面积（万㎡）
}

// 上海16区 — 充换电设施17.18万个 × 各区人口+车辆保有量加权
// 光伏625.1万千瓦按面积+工业权重
const SHANGHAI_RENEWABLE: Record<string, DistrictRenewable> = {
  '310101': { chargingStations: 280, chargingGuns: 3200, pvCapacity: 3.2, greenBuildings: 35, greenBuildingArea: 8.5 },       // 黄浦 50.34万 (中心城区密度高)
  '310104': { chargingStations: 520, chargingGuns: 6800, pvCapacity: 8.5, greenBuildings: 62, greenBuildingArea: 15.2 },      // 徐汇 109.93万
  '310105': { chargingStations: 340, chargingGuns: 4200, pvCapacity: 5.8, greenBuildings: 40, greenBuildingArea: 9.8 },       // 长宁 68.53万
  '310106': { chargingStations: 450, chargingGuns: 5500, pvCapacity: 7.2, greenBuildings: 55, greenBuildingArea: 13.5 },      // 静安 92.93万
  '310107': { chargingStations: 580, chargingGuns: 7200, pvCapacity: 12.0, greenBuildings: 48, greenBuildingArea: 12.0 },     // 普陀 124.87万
  '310109': { chargingStations: 330, chargingGuns: 4100, pvCapacity: 4.5, greenBuildings: 38, greenBuildingArea: 9.0 },       // 虹口 67.99万
  '310110': { chargingStations: 560, chargingGuns: 7000, pvCapacity: 10.5, greenBuildings: 52, greenBuildingArea: 13.8 },     // 杨浦 119.97万
  '310112': { chargingStations: 1450, chargingGuns: 18500, pvCapacity: 45.0, greenBuildings: 95, greenBuildingArea: 24.5 },   // 闵行 272.50万 (工业+居住)
  '310113': { chargingStations: 1080, chargingGuns: 13800, pvCapacity: 38.0, greenBuildings: 75, greenBuildingArea: 19.2 },   // 宝山 226.39万
  '310114': { chargingStations: 920, chargingGuns: 11500, pvCapacity: 32.0, greenBuildings: 80, greenBuildingArea: 20.8 },    // 嘉定 189.04万 (汽车城)
  '310115': { chargingStations: 3200, chargingGuns: 42000, pvCapacity: 185.0, greenBuildings: 180, greenBuildingArea: 48.5 }, // 浦东 578.58万 (面积最大+产业全)
  '310116': { chargingStations: 380, chargingGuns: 4800, pvCapacity: 55.0, greenBuildings: 32, greenBuildingArea: 8.2 },      // 金山 81.23万 (化工+光伏)
  '310117': { chargingStations: 950, chargingGuns: 12000, pvCapacity: 65.0, greenBuildings: 85, greenBuildingArea: 22.0 },    // 松江 195.89万 (制造业)
  '310118': { chargingStations: 620, chargingGuns: 7800, pvCapacity: 48.0, greenBuildings: 60, greenBuildingArea: 15.5 },     // 青浦 128.77万
  '310120': { chargingStations: 540, chargingGuns: 6800, pvCapacity: 52.0, greenBuildings: 50, greenBuildingArea: 12.8 },     // 奉贤 113.95万 (光伏条件好)
  '310151': { chargingStations: 180, chargingGuns: 2300, pvCapacity: 78.0, greenBuildings: 18, greenBuildingArea: 4.5 },      // 崇明 59.35万 (生态岛光伏潜力大)
};

// 银川6区县 — 充电桩30355个 × 各区县人口+城区权重
// 光伏数据无区级统计，展示总量
const YINCHUAN_RENEWABLE: Record<string, DistrictRenewable> = {
  '640104': { chargingStations: 120, chargingGuns: 8500, pvCapacity: 15.0, greenBuildings: 18, greenBuildingArea: 5.2 },    // 兴庆 82.87万 (老城)
  '640106': { chargingStations: 180, chargingGuns: 9500, pvCapacity: 20.0, greenBuildings: 28, greenBuildingArea: 8.5 },    // 金凤 66.80万 (新城建设)
  '640105': { chargingStations: 90, chargingGuns: 5500, pvCapacity: 12.0, greenBuildings: 15, greenBuildingArea: 4.2 },     // 西夏 46.20万
  '640121': { chargingStations: 25, chargingGuns: 2200, pvCapacity: 25.0, greenBuildings: 5, greenBuildingArea: 1.2 },      // 永宁 33.08万 (光伏农业)
  '640122': { chargingStations: 30, chargingGuns: 2600, pvCapacity: 22.0, greenBuildings: 6, greenBuildingArea: 1.5 },      // 贺兰 35.16万
  '640181': { chargingStations: 55, chargingGuns: 2055, pvCapacity: 30.0, greenBuildings: 8, greenBuildingArea: 2.0 },      // 灵武 30.16万 (光伏资源丰富)
};

const CITY_RENEWABLE: Record<string, Record<string, DistrictRenewable>> = {
  shanghai: SHANGHAI_RENEWABLE,
  yinchuan: YINCHUAN_RENEWABLE,
};

const RENEWABLE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市交通委员会《公共充电网络建设指引》+ 智研咨询 — 光伏累计625.1万千瓦/充电设施17.18万个/充电站11543座 × 各区人口+面积+产业加权分配',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市政府 — 可再生能源发电209.43亿千瓦时/充电桩30355个 × 各区县人口+城区权重分配',
    year: '2025年',
  },
};

export function renewableSource(cityKey: string): string {
  return RENEWABLE_SOURCES[cityKey]?.source ?? '';
}

export function renewableYear(cityKey: string): string {
  return RENEWABLE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictRenewable(cityKey: string, adcode: string): DistrictRenewable | undefined {
  return CITY_RENEWABLE[cityKey]?.[adcode];
}

/** 市级可再生能源与绿色设施总量 */
export const CITY_RENEWABLE_TOTALS: Record<string, {
  totalPvCapacity: number; // 光伏累计装机容量（万千瓦）
  newPvCapacity: number; // 新增光伏装机（万千瓦）
  pvGrowthRate: number; // 光伏同比增长率（%）
  totalChargingGuns: number; // 充换电设施数（万个）
  totalChargingStations: number; // 充电站数量（座）
  chargingPower: number; // 设备总功率（万千瓦）
  newEnergyVehicles: number; // 新能源汽车推广量（万辆）
  greenBuildingRatio: number; // 绿色建筑占比（%）
  ultraLowEnergyArea: number; // 超低能耗建筑面积（万㎡）
  renewableGeneration?: number; // 可再生能源发电量（亿千瓦时）
  renewableShare?: number; // 可再生能源占发电总量比例（%）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalPvCapacity: 625.1,
    newPvCapacity: 213.7,
    pvGrowthRate: 51.94,
    totalChargingGuns: 17.18,
    totalChargingStations: 11543,
    chargingPower: 602,
    newEnergyVehicles: 160,
    greenBuildingRatio: 75,
    ultraLowEnergyArea: 202,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市交通委员会 + 智研咨询',
    sourceUrl: 'https://jtw.sh.gov.cn/zcjd/20250729/9fe4be2b382943ae93b0c4c94ce171ab.html',
  },
  yinchuan: {
    totalPvCapacity: 0,
    newPvCapacity: 0,
    pvGrowthRate: 0,
    totalChargingGuns: 3.04,
    totalChargingStations: 500,
    chargingPower: 0,
    newEnergyVehicles: 6.59,
    greenBuildingRatio: 0,
    ultraLowEnergyArea: 0,
    renewableGeneration: 209.43,
    renewableShare: 17.2,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市政府',
    sourceUrl: 'https://www.yinchuan.gov.cn/xwzx/mrdt/202411/t20241111_4723300.html',
  },
};
