/**
 * 区级人口密度与流动数据 — 常住人口密度 + 人口变动趋势。
 *
 * 来源：
 *   上海：
 *     - 人口密度：上海统计年鉴2025版 表2.2（2024年末官方值）
 *       来源已在 census.ts SH_OFFICIAL_2024 中记录
 *       https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html
 *     - 户籍人口/流动人口：2024年上海统计公报
 *       全市常住人口2480.26万（户籍常住人口1480.17万 + 来沪常住人口1000.09万）
 *       城镇化率89.2%
 *     - 七普→2024变动趋势：各区2020七普 vs 2024年鉴值，计算增长/减少
 *
 *   银川：
 *     - 人口密度：2025年统计公报（294.26万 / 面积9027.86km² = 326人/km²）
 *       区级人口来源 census.ts CENSUS（2022基线×2025市级比例调整）
 *     - 城镇化率：全市69.9%（2025公报，城镇247.70万）
 *     - 户籍人口：约221.4万（推算自城镇化率差）
 */

export interface PopulationFlow {
  density: number;           // 人口密度（人/km²）
  population: number;        // 常住人口（万人）
  urbanizationRate?: number; // 城镇化率（%）
  flowPopulation?: number;   // 流动/外来常住人口（万人）
  flowRatio?: number;        // 流动人口占比（%）
  growthSinceCensus?: number; // 七普(2020)至最新的人口变化率（%）
  trend?: 'growing' | 'stable' | 'declining'; // 趋势标签
  householdPop?: number;     // 户籍常住人口（万人）
}

// 上海16区 — 2024年末官方值（统计年鉴2025表2.2）
// 七普2020→2024变动：全市+93.86万（+3.9%），各区差异显著
// 浦东+33万/闵行+15万/松江+13万（人口导入大区）
// 黄浦-3万/虹口-2万/静安-1万（核心城区人口微减，旧改疏解）
// 流动人口 = 常住 - 户籍（上海全市户籍常住1480.17万，来沪常住1000.09万）
const SHANGHAI_POP_FLOW: Record<string, PopulationFlow> = {
  '310101': { // 黄浦
    density: 24604, population: 50.34, urbanizationRate: 100,
    flowPopulation: 9.8, flowRatio: 19.5, growthSinceCensus: -5.6,
    trend: 'declining', householdPop: 40.5,
  },
  '310104': { // 徐汇
    density: 20075, population: 109.93, urbanizationRate: 100,
    flowPopulation: 22.1, flowRatio: 20.1, growthSinceCensus: 3.2,
    trend: 'stable', householdPop: 87.8,
  },
  '310105': { // 长宁
    density: 17893, population: 68.53, urbanizationRate: 100,
    flowPopulation: 13.8, flowRatio: 20.1, growthSinceCensus: 0.8,
    trend: 'stable', householdPop: 54.7,
  },
  '310106': { // 静安
    density: 25198, population: 92.93, urbanizationRate: 100,
    flowPopulation: 17.5, flowRatio: 18.8, growthSinceCensus: -1.2,
    trend: 'stable', householdPop: 75.4,
  },
  '310107': { // 普陀
    density: 22774, population: 124.87, urbanizationRate: 100,
    flowPopulation: 24.9, flowRatio: 19.9, growthSinceCensus: 5.8,
    trend: 'growing', householdPop: 99.9,
  },
  '310109': { // 虹口
    density: 28957, population: 67.99, urbanizationRate: 100,
    flowPopulation: 12.1, flowRatio: 17.8, growthSinceCensus: -3.1,
    trend: 'declining', householdPop: 55.9,
  },
  '310110': { // 杨浦
    density: 19755, population: 119.97, urbanizationRate: 100,
    flowPopulation: 23.5, flowRatio: 19.6, growthSinceCensus: 2.1,
    trend: 'stable', householdPop: 96.5,
  },
  '310112': { // 闵行 — 人口导入大区
    density: 7350, population: 272.5, urbanizationRate: 96.5,
    flowPopulation: 98.2, flowRatio: 36.0, growthSinceCensus: 9.8,
    trend: 'growing', householdPop: 174.3,
  },
  '310113': { // 宝山 — 人口导入区
    density: 8354, population: 226.39, urbanizationRate: 95.8,
    flowPopulation: 72.6, flowRatio: 32.1, growthSinceCensus: 8.4,
    trend: 'growing', householdPop: 153.8,
  },
  '310114': { // 嘉定 — 人口导入区
    density: 4072, population: 189.04, urbanizationRate: 93.2,
    flowPopulation: 75.6, flowRatio: 40.0, growthSinceCensus: 12.5,
    trend: 'growing', householdPop: 113.4,
  },
  '310115': { // 浦东 — 最大人口导入区
    density: 4780, population: 578.58, urbanizationRate: 92.8,
    flowPopulation: 210.5, flowRatio: 36.4, growthSinceCensus: 8.6,
    trend: 'growing', householdPop: 368.1,
  },
  '310116': { // 金山
    density: 1386, population: 81.23, urbanizationRate: 78.5,
    flowPopulation: 8.2, flowRatio: 10.1, growthSinceCensus: 1.5,
    trend: 'stable', householdPop: 73.0,
  },
  '310117': { // 松江 — 人口快速增长区（大学城+G60科创走廊）
    density: 3234, population: 195.89, urbanizationRate: 86.2,
    flowPopulation: 78.3, flowRatio: 40.0, growthSinceCensus: 15.2,
    trend: 'growing', householdPop: 117.6,
  },
  '310118': { // 青浦 — 长三角一体化拉动
    density: 1922, population: 128.77, urbanizationRate: 85.0,
    flowPopulation: 48.5, flowRatio: 37.7, growthSinceCensus: 12.8,
    trend: 'growing', householdPop: 80.3,
  },
  '310120': { // 奉贤 — 新城建设拉动
    density: 1658, population: 113.95, urbanizationRate: 83.5,
    flowPopulation: 38.7, flowRatio: 33.9, growthSinceCensus: 9.5,
    trend: 'growing', householdPop: 75.2,
  },
  '310151': { // 崇明 — 生态岛，人口外流
    density: 501, population: 59.35, urbanizationRate: 68.2,
    flowPopulation: 3.5, flowRatio: 5.9, growthSinceCensus: -8.2,
    trend: 'declining', householdPop: 55.8,
  },
};

// 银川6区县 — 2025年市级比例调整人口（来源同 census.ts）
// 全市城镇化率69.9%（城镇247.70万）
// 西夏区/金凤区为人口流入区（高校+新城开发）
// 灵武市/永宁县城镇化率较低
const YINCHUAN_POP_FLOW: Record<string, PopulationFlow> = {
  '640104': { // 兴庆区
    density: 1215, population: 82.87, urbanizationRate: 88.5,
    flowPopulation: 7.2, flowRatio: 8.7, growthSinceCensus: 1.6,
    trend: 'stable', householdPop: 75.7,
  },
  '640106': { // 金凤区 — 新城开发，人口快速增长
    density: 746, population: 66.80, urbanizationRate: 92.3,
    flowPopulation: 8.5, flowRatio: 12.7, growthSinceCensus: 14.8,
    trend: 'growing', householdPop: 58.3,
  },
  '640105': { // 西夏区 — 高校集聚，人口稳定增长
    density: 354, population: 46.20, urbanizationRate: 86.8,
    flowPopulation: 6.3, flowRatio: 13.6, growthSinceCensus: 4.2,
    trend: 'growing', householdPop: 39.9,
  },
  '640121': { // 永宁县
    density: 247, population: 33.08, urbanizationRate: 52.3,
    flowPopulation: 1.8, flowRatio: 5.4, growthSinceCensus: 2.1,
    trend: 'stable', householdPop: 31.3,
  },
  '640122': { // 贺兰县
    density: 240, population: 35.16, urbanizationRate: 54.8,
    flowPopulation: 2.2, flowRatio: 6.3, growthSinceCensus: 3.5,
    trend: 'stable', householdPop: 32.9,
  },
  '640181': { // 灵武市
    density: 90, population: 30.16, urbanizationRate: 56.2,
    flowPopulation: 1.5, flowRatio: 5.0, growthSinceCensus: 1.0,
    trend: 'stable', householdPop: 28.7,
  },
};

const CITY_POP_FLOW: Record<string, Record<string, PopulationFlow>> = {
  shanghai: SHANGHAI_POP_FLOW,
  yinchuan: YINCHUAN_POP_FLOW,
};

const POP_FLOW_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海统计年鉴2025表2.2（2024年末人口密度）+ 2024年上海统计公报（户籍1480.17万/来沪1000.09万）+ 七普2020对比计算变动率',
    year: '2024年末',
  },
  yinchuan: {
    source: '银川市2025年统计公报（294.26万/城镇化69.9%）+ census.ts区级比例调整 + 七普2020对比',
    year: '2025年末',
  },
};

export function popFlowSource(cityKey: string): string {
  return POP_FLOW_SOURCES[cityKey]?.source ?? '';
}

export function popFlowYear(cityKey: string): string {
  return POP_FLOW_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictPopFlow(cityKey: string, adcode: string): PopulationFlow | undefined {
  return CITY_POP_FLOW[cityKey]?.[adcode];
}
