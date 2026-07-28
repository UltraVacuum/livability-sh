/**
 * 区级垃圾分类与废物管理数据 — 基于官方统计公报 + 生态环境局发布。
 *
 * 来源：
 *   上海：上海市生态环境局"2025年度无废指数"（2026-03-27发布）
 *     市级"无废指数"86.96（同比+1.23），覆盖7类固废18项核心指标
 *     生活垃圾回收利用率45.3%（同比+2.1pct），分类实效评估97.22分
 *     每吨干垃圾发电420度，每吨湿垃圾资源化减碳150kg
 *     危废规范化管理评估99.33分，800家单位"五即"管理
 *     小型医疗机构医废收运覆盖率100%
 *     区级"无废指数"16区数据：虹口92.35最高，宝山83.36最低
 *     https://sthj.sh.gov.cn/hbzhywpt1103/hbzhywpt1112/20260327/d8ab2876ed574f039e3995d9e612151b.html
 *
 *   上海统计公报2025：生活垃圾日均2.66万吨（干垃圾645.92万吨+湿垃圾323.63万吨）
 *     可回收物293.97万吨/年，有害垃圾744.24吨/年
 *     焚烧厂15座，湿垃圾处理设施13座
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市城市管理局2025年数据（银川日报2025-07-04报道）
 *     生活垃圾分类设施100%全覆盖
 *     生活垃圾回收利用率48.56%（超上海！）
 *     生活垃圾无害化处理率100%
 *     生活垃圾资源化利用率67.64%
 *     人均日产生生活垃圾0.8公斤（低于全国1-1.2公斤）
 *     100台垃圾分类收集车，151名专业回收员
 *     http://nx.wenming.cn/2022wmw/wmcj/wmcs/202507/t20250704_6903731.html
 *
 *     银川市2025年生活垃圾分类收运工作实施方案（市政府2025-04-15）
 *     https://www.yinchuan.gov.cn/zzb/szfwj/202504/t20250422_4887630.html
 *
 *   区级分配方法：
 *   上海16区：使用官方"无废指数"区级排名（真实数据，非分配）
 *     垃圾分类量按人口比例分配（日均26600吨）
 *   银川6区县：三区（兴庆/金凤/西夏）收运体系完善，两县一市自行收运
 *     垃圾产生量按人口×0.8kg/日计算
 */

export interface DistrictWaste {
  wasteIndex?: number; // 无废指数（上海专用）
  dailyWaste?: number; // 日均生活垃圾产生量（吨/日）
  recyclingRate?: number; // 生活垃圾回收利用率（%）
  harmlessRate?: number; // 无害化处理率（%）
  resourceRate?: number; // 资源化利用率（%）
  classificationScore?: number; // 分类实效评估得分
  perCapitaDaily?: number; // 人均日产生量（公斤）
}

// 上海16区 — 无废指数使用官方数据，垃圾分类量按人口比例分配
const SHANGHAI_WASTE: Record<string, DistrictWaste> = {
  '310101': { wasteIndex: 83.42, dailyWaste: 540, recyclingRate: 45.3, classificationScore: 97.22 },     // 黄浦
  '310104': { wasteIndex: 88.38, dailyWaste: 1180, recyclingRate: 45.3, classificationScore: 97.22 },    // 徐汇
  '310105': { wasteIndex: 87.58, dailyWaste: 735, recyclingRate: 45.3, classificationScore: 97.22 },     // 长宁
  '310106': { wasteIndex: 89.02, dailyWaste: 998, recyclingRate: 45.3, classificationScore: 97.22 },     // 静安
  '310107': { wasteIndex: 91.18, dailyWaste: 1341, recyclingRate: 45.3, classificationScore: 97.22 },    // 普陀
  '310109': { wasteIndex: 92.35, dailyWaste: 730, recyclingRate: 45.3, classificationScore: 97.22 },     // 虹口（最高）
  '310110': { wasteIndex: 88.91, dailyWaste: 1288, recyclingRate: 45.3, classificationScore: 97.22 },    // 杨浦
  '310112': { wasteIndex: 89.18, dailyWaste: 2926, recyclingRate: 45.3, classificationScore: 97.22 },    // 闵行
  '310113': { wasteIndex: 83.36, dailyWaste: 2431, recyclingRate: 45.3, classificationScore: 97.22 },    // 宝山（最低）
  '310114': { wasteIndex: 90.02, dailyWaste: 2030, recyclingRate: 45.3, classificationScore: 97.22 },    // 嘉定
  '310115': { wasteIndex: 89.73, dailyWaste: 6211, recyclingRate: 45.3, classificationScore: 97.22 },    // 浦东
  '310116': { wasteIndex: 84.20, dailyWaste: 872, recyclingRate: 45.3, classificationScore: 97.22 },     // 金山
  '310117': { wasteIndex: 90.88, dailyWaste: 2103, recyclingRate: 45.3, classificationScore: 97.22 },    // 松江
  '310118': { wasteIndex: 84.90, dailyWaste: 1382, recyclingRate: 45.3, classificationScore: 97.22 },    // 青浦
  '310120': { wasteIndex: 89.83, dailyWaste: 1223, recyclingRate: 45.3, classificationScore: 97.22 },    // 奉贤
  '310151': { wasteIndex: 83.86, dailyWaste: 638, recyclingRate: 45.3, classificationScore: 97.22 },     // 崇明
};

// 银川6区县 — 市级统一覆盖率/回收率，垃圾量按人口×0.8kg/日
const YINCHUAN_WASTE: Record<string, DistrictWaste> = {
  '640104': { dailyWaste: 663, recyclingRate: 48.56, harmlessRate: 100, resourceRate: 67.64, perCapitaDaily: 0.8 },  // 兴庆 82.87万
  '640106': { dailyWaste: 534, recyclingRate: 48.56, harmlessRate: 100, resourceRate: 67.64, perCapitaDaily: 0.8 },  // 金凤 66.80万
  '640105': { dailyWaste: 370, recyclingRate: 48.56, harmlessRate: 100, resourceRate: 67.64, perCapitaDaily: 0.8 },  // 西夏 46.20万
  '640121': { dailyWaste: 265, recyclingRate: 48.56, harmlessRate: 100, resourceRate: 67.64, perCapitaDaily: 0.8 },  // 永宁 33.08万
  '640122': { dailyWaste: 281, recyclingRate: 48.56, harmlessRate: 100, resourceRate: 67.64, perCapitaDaily: 0.8 },  // 贺兰 35.16万
  '640181': { dailyWaste: 241, recyclingRate: 48.56, harmlessRate: 100, resourceRate: 67.64, perCapitaDaily: 0.8 },  // 灵武 30.16万
};

const CITY_WASTE: Record<string, Record<string, DistrictWaste>> = {
  shanghai: SHANGHAI_WASTE,
  yinchuan: YINCHUAN_WASTE,
};

const WASTE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市生态环境局2025年度"无废指数"（区级官方排名）+ 上海市2025年统计公报（垃圾产生量）',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市城市管理局2025年垃圾分类数据（银川日报2025-07-04报道）+ 银川市生活垃圾分类收运工作实施方案',
    year: '2025年',
  },
};

export function wasteSource(cityKey: string): string {
  return WASTE_SOURCES[cityKey]?.source ?? '';
}

export function wasteYear(cityKey: string): string {
  return WASTE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictWaste(cityKey: string, adcode: string): DistrictWaste | undefined {
  return CITY_WASTE[cityKey]?.[adcode];
}

/** 市级垃圾分类与废物管理总量 */
export const CITY_WASTE_TOTALS: Record<string, {
  wasteIndex: number; // 无废指数
  wasteIndexTrend: number; // 同比变化
  dailyWaste: number; // 日均生活垃圾（万吨）
  recyclingRate: number; // 回收利用率 %
  classificationScore: number; // 分类实效评估得分
  incinerationPlants: number; // 焚烧厂
  wetWasteFacilities: number; // 湿垃圾处理设施
  recyclables?: number; // 可回收物（万吨/年）
  hazardousWaste?: number; // 有害垃圾（吨/年）
  coverage100pct?: boolean; // 覆盖率100%
  harmlessRate?: number; // 无害化处理率 %
  resourceRate?: number; // 资源化利用率 %
  perCapitaDaily?: number; // 人均日产生量（公斤）
  kwhPerTonDry?: number; // 每吨干垃圾发电（度）
  carbonReductionPerTonWet?: number; // 每吨湿垃圾减碳（kg）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    wasteIndex: 86.96,
    wasteIndexTrend: 1.23,
    dailyWaste: 2.66,
    recyclingRate: 45.3,
    classificationScore: 97.22,
    incinerationPlants: 15,
    wetWasteFacilities: 13,
    recyclables: 293.97,
    hazardousWaste: 744.24,
    kwhPerTonDry: 420,
    carbonReductionPerTonWet: 150,
    year: 2025,
    source: '上海市生态环境局"2025年度无废指数" + 上海市2025年统计公报',
    sourceUrl: 'https://sthj.sh.gov.cn/hbzhywpt1103/hbzhywpt1112/20260327/d8ab2876ed574f039e3995d9e612151b.html',
  },
  yinchuan: {
    wasteIndex: 0, // 无废指数制度未建立
    wasteIndexTrend: 0,
    dailyWaste: 0,
    recyclingRate: 48.56,
    classificationScore: 0,
    incinerationPlants: 0,
    wetWasteFacilities: 0,
    coverage100pct: true,
    harmlessRate: 100,
    resourceRate: 67.64,
    perCapitaDaily: 0.8,
    year: 2025,
    source: '银川市城市管理局2025年垃圾分类数据 + 银川日报2025-07-04报道',
    sourceUrl: 'http://nx.wenming.cn/2022wmw/wmcj/wmcs/202507/t20250704_6903731.html',
  },
};
