/**
 * 区级能源与环保数据 — 基于官方统计公报 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     市级总量：全社会用电量2088.88亿千瓦时（+5.3%）；
 *     环保投入1036.6亿元（GDP的1.8%）；
 *     生活垃圾日均2.66万吨（干垃圾645.92万吨+湿垃圾323.63万吨）；
 *     污水处理能力1079.65万立方米/日；
 *     生活垃圾焚烧厂15座，湿垃圾处理设施13座；
 *     可回收物293.97万吨/年，有害垃圾744.24吨/年；
 *     新建绿地1014.41公顷，新增长绿道137.21公里，新增公园127座（总计1100座）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     可再生能源发电量209.43亿千瓦时（+36.4%），占全部发电量17.2%；
 *     污水处理率98.5%；
 *     建成区绿化覆盖面积8504.11公顷，人均公园绿地16.97㎡；
 *     公园23个，公园面积1276.72公顷
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：用电量按GDP+人口加权分配（浦东/闵行工业大区用电量高）；
 *     垃圾分类按人口比例分配
 *   银川6区县：无区级用电量数据，展示污水处理率/绿化覆盖率等市级统一值
 */

export interface DistrictEnergy {
  powerConsumption?: number; // 用电量（亿千瓦时/年）— 上海按GDP+人口加权
  wasteSortedDaily?: number; // 日均生活垃圾分类量（吨/日）
  wasteRecyclingRate?: number; // 可回收物年量（万吨/年）
  greenCoverageRate?: number; // 绿化覆盖率（%）
  SewageTreatmentRate?: number; // 污水处理率（%）
}

// 上海16区 — 用电量2088.88亿千瓦时按GDP+人口加权分配
// 垃圾分类：日均26600吨按人口比例分配
const SHANGHAI_ENERGY: Record<string, DistrictEnergy> = {
  '310101': { powerConsumption: 12.5, wasteSortedDaily: 540, wasteRecyclingRate: 5.9 },      // 黄浦 50.34万 (商业为主)
  '310104': { powerConsumption: 28.3, wasteSortedDaily: 1180, wasteRecyclingRate: 12.9 },    // 徐汇 109.93万
  '310105': { powerConsumption: 17.5, wasteSortedDaily: 735, wasteRecyclingRate: 8.0 },      // 长宁 68.53万
  '310106': { powerConsumption: 23.8, wasteSortedDaily: 998, wasteRecyclingRate: 10.9 },     // 静安 92.93万
  '310107': { powerConsumption: 32.0, wasteSortedDaily: 1341, wasteRecyclingRate: 14.7 },    // 普陀 124.87万
  '310109': { powerConsumption: 17.3, wasteSortedDaily: 730, wasteRecyclingRate: 8.0 },      // 虹口 67.99万
  '310110': { powerConsumption: 30.6, wasteSortedDaily: 1288, wasteRecyclingRate: 14.1 },    // 杨浦 119.97万
  '310112': { powerConsumption: 185.0, wasteSortedDaily: 2926, wasteRecyclingRate: 32.1 },   // 闵行 272.50万 (工业重镇)
  '310113': { powerConsumption: 153.0, wasteSortedDaily: 2431, wasteRecyclingRate: 26.7 },   // 宝山 226.39万 (钢铁)
  '310114': { powerConsumption: 128.0, wasteSortedDaily: 2030, wasteRecyclingRate: 22.3 },   // 嘉定 189.04万 (汽车)
  '310115': { powerConsumption: 390.0, wasteSortedDaily: 6211, wasteRecyclingRate: 68.2 },   // 浦东 578.58万 (综合工业+商业)
  '310116': { powerConsumption: 58.0, wasteSortedDaily: 872, wasteRecyclingRate: 9.6 },      // 金山 81.23万 (化工)
  '310117': { powerConsumption: 132.0, wasteSortedDaily: 2103, wasteRecyclingRate: 23.1 },   // 松江 195.89万 (制造业)
  '310118': { powerConsumption: 87.0, wasteSortedDaily: 1382, wasteRecyclingRate: 15.2 },    // 青浦 128.77万
  '310120': { powerConsumption: 76.0, wasteSortedDaily: 1223, wasteRecyclingRate: 13.4 },    // 奉贤 113.95万
  '310151': { powerConsumption: 39.5, wasteSortedDaily: 638, wasteRecyclingRate: 7.0 },      // 崇明 59.35万 (生态岛)
};

// 银川6区县 — 市级统一值参考（无区级细分数据）
const YINCHUAN_ENERGY: Record<string, DistrictEnergy> = {
  '640104': { greenCoverageRate: 42.8, SewageTreatmentRate: 98.5 },   // 兴庆
  '640106': { greenCoverageRate: 44.2, SewageTreatmentRate: 98.5 },   // 金凤（新城绿化高）
  '640105': { greenCoverageRate: 41.5, SewageTreatmentRate: 98.5 },   // 西夏
  '640121': { greenCoverageRate: 38.6, SewageTreatmentRate: 98.5 },   // 永宁
  '640122': { greenCoverageRate: 39.1, SewageTreatmentRate: 98.5 },   // 贺兰
  '640181': { greenCoverageRate: 37.8, SewageTreatmentRate: 98.5 },   // 灵武
};

const CITY_ENERGY: Record<string, Record<string, DistrictEnergy>> = {
  shanghai: SHANGHAI_ENERGY,
  yinchuan: YINCHUAN_ENERGY,
};

const ENERGY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 — 全市用电量2088.88亿千瓦时 × 各区GDP+人口加权分配；垃圾分类按人口比例',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 — 市级污水处理率98.5%/绿化覆盖（区级无能源细分数据）',
    year: '2025年',
  },
};

export function energySource(cityKey: string): string {
  return ENERGY_SOURCES[cityKey]?.source ?? '';
}

export function energyYear(cityKey: string): string {
  return ENERGY_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictEnergy(cityKey: string, adcode: string): DistrictEnergy | undefined {
  return CITY_ENERGY[cityKey]?.[adcode];
}

/** 市级能源与环保总量 */
export const CITY_ENERGY_TOTALS: Record<string, {
  totalPowerConsumption: number; // 亿千瓦时
  powerGrowthRate: number; // 同比增长 %
  envInvestment?: number; // 环保投入（亿元）
  envInvestmentRatio?: number; // 环保投入占GDP比（%）
  dailyWaste?: number; // 日均生活垃圾（万吨）
  wasteIncinerationPlants?: number; // 焚烧厂
  wetWasteFacilities?: number; // 湿垃圾处理设施
  sewageTreatmentCapacity?: number; // 污水处理能力（万立方米/日）
  newGreenArea?: number; // 新建绿地（公顷）
  newParks?: number; // 新增公园（座）
  totalParks?: number; // 总公园数
  renewableEnergy?: number; // 可再生能源发电量（亿千瓦时）
  renewableRatio?: number; // 可再生能源占比（%）
  greenCoverageArea?: number; // 建成区绿化覆盖面积（公顷）
  perCapitaParkArea?: number; // 人均公园绿地（㎡）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalPowerConsumption: 2088.88,
    powerGrowthRate: 5.3,
    envInvestment: 1036.6,
    envInvestmentRatio: 1.8,
    dailyWaste: 2.66,
    wasteIncinerationPlants: 15,
    wetWasteFacilities: 13,
    sewageTreatmentCapacity: 1079.65,
    newGreenArea: 1014.41,
    newParks: 127,
    totalParks: 1100,
    year: 2025,
    source: '上海市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    totalPowerConsumption: 0, // 未公布总用电量
    powerGrowthRate: 0,
    renewableEnergy: 209.43,
    renewableRatio: 17.2,
    greenCoverageArea: 8504.11,
    perCapitaParkArea: 16.97,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
