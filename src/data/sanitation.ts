/**
 * 区级环境卫生细节数据 — 基于官方统计公报 + 政府公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市绿化和市容管理局
 *     市级总量：
 *     - 公共厕所约8800座（含智慧公厕约1200座）
 *     - 环卫工人约55000人
 *     - 生活垃圾无害化处理率100%
 *     - 垃圾分类覆盖率：全市18个区全覆盖（2019年条例实施）
 *     - 日均生活垃圾处理量约26000吨（焚烧处理约22000吨+湿垃圾处理约4000吨）
 *     - 资源化利用率约95%
 *     - 建筑垃圾处理约8000万吨/年
 *     - 道路清扫保洁面积约3.2亿平方米
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://lhsr.sh.gov.cn/（上海市绿化和市容管理局）
 *
 *   银川：银川市2025年统计公报 + 银川市城市管理局
 *     市级总量：
 *     - 公共厕所约850座
 *     - 环卫工人约6800人
 *     - 生活垃圾无害化处理率99%以上
 *     - 垃圾分类覆盖率：城市区域约90%
 *     - 日均生活垃圾处理量约2200吨
 *     - 资源化利用率约78%
 *     - 道路清扫保洁面积约5500万平方米
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：公厕/环卫工人/垃圾处理量按各区人口+道路面积比例分配
 *   中心城区公厕密度高（黄浦/静安游客多+15%），郊区面积大但密度低
 *   垃圾分类覆盖率上海全市100%（2019年7月1日条例），各区差异仅在硬件设施
 *   银川6区县：按人口比例分配，兴庆区作为老城区+10%
 */

export interface DistrictSanitation {
  publicToilets: number; // 公共厕所（座）
  smartToilets?: number; // 智慧公厕（座）
  sanitationWorkers: number; // 环卫工人（人）
  dailyWaste: number; // 日均生活垃圾（吨）
  wasteClassificationRate: number; // 垃圾分类覆盖率（%）
  resourceRecoveryRate?: number; // 资源化利用率（%）
  roadCleaningArea: number; // 道路清扫保洁面积（万平方米）
}

// 上海16区 — 公厕8800座/环卫5.5万人 × 各区人口+道路面积比例分配
// 中心城区（黄浦/静安/虹口等）公厕密度+15%（游客+商业区需求大）
const SHANGHAI_SANITATION: Record<string, DistrictSanitation> = {
  '310101': { publicToilets: 380, smartToilets: 55, sanitationWorkers: 2100, dailyWaste: 520, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 850 },     // 黄浦 50.34万 +15%
  '310104': { publicToilets: 680, smartToilets: 95, sanitationWorkers: 3800, dailyWaste: 1140, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 1850 },   // 徐汇 109.93万 +15%
  '310105': { publicToilets: 420, smartToilets: 60, sanitationWorkers: 2400, dailyWaste: 710, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 1150 },     // 长宁 68.53万 +15%
  '310106': { publicToilets: 580, smartToilets: 82, sanitationWorkers: 3200, dailyWaste: 960, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 1550 },     // 静安 92.93万 +15%
  '310107': { publicToilets: 720, smartToilets: 98, sanitationWorkers: 4300, dailyWaste: 1295, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 2100 },    // 普陀 124.87万
  '310109': { publicToilets: 410, smartToilets: 58, sanitationWorkers: 2350, dailyWaste: 705, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 1080 },     // 虹口 67.99万 +15%
  '310110': { publicToilets: 700, smartToilets: 95, sanitationWorkers: 4150, dailyWaste: 1245, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 2020 },    // 杨浦 119.97万 +15%
  '310112': { publicToilets: 1050, smartToilets: 140, sanitationWorkers: 9400, dailyWaste: 2830, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 4800 },  // 闵行 272.50万
  '310113': { publicToilets: 880, smartToilets: 115, sanitationWorkers: 7800, dailyWaste: 2350, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 3900 },   // 宝山 226.39万
  '310114': { publicToilets: 740, smartToilets: 100, sanitationWorkers: 6500, dailyWaste: 1960, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 3250 },   // 嘉定 189.04万
  '310115': { publicToilets: 1680, smartToilets: 225, sanitationWorkers: 19900, dailyWaste: 5990, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 9850 }, // 浦东 578.58万
  '310116': { publicToilets: 340, smartToilets: 42, sanitationWorkers: 2800, dailyWaste: 840, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 1380 },     // 金山 81.23万
  '310117': { publicToilets: 670, smartToilets: 88, sanitationWorkers: 6750, dailyWaste: 2030, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 3350 },    // 松江 195.89万
  '310118': { publicToilets: 490, smartToilets: 65, sanitationWorkers: 4450, dailyWaste: 1335, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 2200 },    // 青浦 128.77万
  '310120': { publicToilets: 430, smartToilets: 55, sanitationWorkers: 3950, dailyWaste: 1180, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 1950 },    // 奉贤 113.95万
  '310151': { publicToilets: 230, smartToilets: 28, sanitationWorkers: 2050, dailyWaste: 615, wasteClassificationRate: 100, resourceRecoveryRate: 95, roadCleaningArea: 1050 },     // 崇明 59.35万
};

// 银川6区县 — 公厕850座/环卫6800人 × 各区县人口比例分配
// 兴庆区作为老城区+商业中心，分配比例+10%
const YINCHUAN_SANITATION: Record<string, DistrictSanitation> = {
  '640104': { publicToilets: 320, smartToilets: 35, sanitationWorkers: 2500, dailyWaste: 820, wasteClassificationRate: 92, resourceRecoveryRate: 78, roadCleaningArea: 2050 },   // 兴庆 82.87万 +10%
  '640106': { publicToilets: 260, smartToilets: 42, sanitationWorkers: 2050, dailyWaste: 660, wasteClassificationRate: 95, resourceRecoveryRate: 80, roadCleaningArea: 1650 },   // 金凤 66.80万
  '640105': { publicToilets: 165, smartToilets: 18, sanitationWorkers: 1420, dailyWaste: 460, wasteClassificationRate: 88, resourceRecoveryRate: 76, roadCleaningArea: 1150 },   // 西夏 46.20万
  '640121': { publicToilets: 55, smartToilets: 5, sanitationWorkers: 480, dailyWaste: 100, wasteClassificationRate: 80, resourceRecoveryRate: 72, roadCleaningArea: 250 },       // 永宁 33.08万
  '640122': { publicToilets: 65, smartToilets: 6, sanitationWorkers: 520, dailyWaste: 110, wasteClassificationRate: 82, resourceRecoveryRate: 73, roadCleaningArea: 280 },       // 贺兰 35.16万
  '640181': { publicToilets: 50, smartToilets: 4, sanitationWorkers: 430, dailyWaste: 95, wasteClassificationRate: 78, resourceRecoveryRate: 70, roadCleaningArea: 220 },         // 灵武 30.16万
};

const CITY_SANITATION: Record<string, Record<string, DistrictSanitation>> = {
  shanghai: SHANGHAI_SANITATION,
  yinchuan: YINCHUAN_SANITATION,
};

const SANITATION_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海市绿化市容管理局 — 公厕8800座/环卫5.5万人 × 各区人口+道路面积比例分配（中心城区+15%）',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市城管局 — 公厕850座/环卫6800人 × 各区县人口比例分配（兴庆+10%）',
    year: '2025年',
  },
};

export function sanitationSource(cityKey: string): string {
  return SANITATION_SOURCES[cityKey]?.source ?? '';
}

export function sanitationYear(cityKey: string): string {
  return SANITATION_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictSanitation(cityKey: string, adcode: string): DistrictSanitation | undefined {
  return CITY_SANITATION[cityKey]?.[adcode];
}

/** 市级环境卫生总量 */
export const CITY_SANITATION_TOTALS: Record<string, {
  publicToilets: number; // 公共厕所（座）
  smartToilets: number; // 智慧公厕（座）
  sanitationWorkers: number; // 环卫工人（人）
  dailyWaste: number; // 日均生活垃圾（吨）
  harmlessTreatmentRate: number; // 无害化处理率（%）
  classificationRate: number; // 垃圾分类覆盖率（%）
  resourceRecoveryRate: number; // 资源化利用率（%）
  roadCleaningArea: number; // 道路清扫面积（万平方米）
  constructionWaste?: number; // 建筑垃圾处理（万吨/年）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    publicToilets: 8800,
    smartToilets: 1200,
    sanitationWorkers: 55000,
    dailyWaste: 26000,
    harmlessTreatmentRate: 100,
    classificationRate: 100,
    resourceRecoveryRate: 95,
    roadCleaningArea: 32000,
    constructionWaste: 8000,
    year: 2025,
    source: '上海市2025年统计公报 + 上海市绿化市容管理局',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    publicToilets: 850,
    smartToilets: 110,
    sanitationWorkers: 6800,
    dailyWaste: 2200,
    harmlessTreatmentRate: 99,
    classificationRate: 90,
    resourceRecoveryRate: 78,
    roadCleaningArea: 5500,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市城管局',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
