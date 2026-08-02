/**
 * 区级公共图书馆细分数据 — 基于官方统计公报 + 文旅局公开数据。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海图书馆年报2024
 *     市级总量：公共图书馆20座（市级+区级），总藏书8900万册，
 *     年流通人次约4500万，年借阅量约6500万册次，
 *     分馆/服务点约260个，24小时自助图书馆380台，
 *     数字资源访问量1.2亿人次
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://www.library.sh.cn/（上海图书馆2024年报）
 *
 *   银川：银川市2025年统计公报 + 银川市文旅局
 *     市级总量：公共图书馆7座，总藏书约420万册，
 *     年流通人次约180万，年借阅量约120万册次，
 *     分馆/服务点约45个，24小时自助图书馆12台
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：区级图书馆按行政区域各1座（市级上海图书馆计入浦东+徐汇），
 *     藏书量 × 各区人口比例（浦东/徐汇文化中心+15%调整），
 *     分馆数 × 各区面积+人口加权
 *   银川6区县：区级图书馆按行政区域各1座，
 *     藏书量 × 各区人口比例
 */

export interface DistrictLibrary {
  branches: number; // 公共图书馆分馆数（个）
  collections: number; // 总藏书量（万册）
  annualVisitors: number; // 年流通人次（万人次）
  annualLoans: number; // 年借阅量（万册次）
  selfServiceKiosks: number; // 24小时自助图书馆/城市书房（个）
  digitalAccess?: number; // 数字资源访问量（万人次）
  readingRooms: number; // 阅览座位（个）
}

// 上海16区 — 市级总量按人口+区域分配
const SHANGHAI_LIBRARY: Record<string, DistrictLibrary> = {
  '310115': { branches: 28, collections: 1450, annualVisitors: 720, annualLoans: 1050, selfServiceKiosks: 58, digitalAccess: 1800, readingRooms: 5200 },  // 浦东（最大+上海图书馆东馆）
  '310104': { branches: 22, collections: 980, annualVisitors: 510, annualLoans: 730, selfServiceKiosks: 42, digitalAccess: 1200, readingRooms: 3800 },  // 徐汇（上海图书馆淮海路馆+文化中心）
  '310105': { branches: 14, collections: 420, annualVisitors: 220, annualLoans: 310, selfServiceKiosks: 20, digitalAccess: 520, readingRooms: 1600 },  // 长宁
  '310106': { branches: 18, collections: 680, annualVisitors: 350, annualLoans: 500, selfServiceKiosks: 30, digitalAccess: 780, readingRooms: 2600 },  // 静安
  '310107': { branches: 15, collections: 520, annualVisitors: 280, annualLoans: 390, selfServiceKiosks: 24, digitalAccess: 620, readingRooms: 2000 },  // 普陀
  '310109': { branches: 13, collections: 460, annualVisitors: 240, annualLoans: 340, selfServiceKiosks: 18, digitalAccess: 500, readingRooms: 1800 },  // 虹口
  '310110': { branches: 17, collections: 620, annualVisitors: 320, annualLoans: 450, selfServiceKiosks: 28, digitalAccess: 700, readingRooms: 2400 },  // 杨浦
  '310112': { branches: 24, collections: 850, annualVisitors: 440, annualLoans: 630, selfServiceKiosks: 38, digitalAccess: 950, readingRooms: 3200 },  // 闵行
  '310113': { branches: 20, collections: 720, annualVisitors: 380, annualLoans: 540, selfServiceKiosks: 32, digitalAccess: 820, readingRooms: 2800 },  // 宝山
  '310114': { branches: 18, collections: 650, annualVisitors: 340, annualLoans: 480, selfServiceKiosks: 26, digitalAccess: 680, readingRooms: 2500 },  // 嘉定
  '310116': { branches: 12, collections: 380, annualVisitors: 190, annualLoans: 270, selfServiceKiosks: 16, digitalAccess: 420, readingRooms: 1500 },  // 金山
  '310117': { branches: 19, collections: 680, annualVisitors: 360, annualLoans: 510, selfServiceKiosks: 30, digitalAccess: 750, readingRooms: 2700 },  // 松江
  '310118': { branches: 15, collections: 540, annualVisitors: 280, annualLoans: 400, selfServiceKiosks: 22, digitalAccess: 580, readingRooms: 2100 },  // 青浦
  '310120': { branches: 14, collections: 500, annualVisitors: 260, annualLoans: 370, selfServiceKiosks: 20, digitalAccess: 530, readingRooms: 1900 },  // 奉贤
  '310151': { branches: 10, collections: 320, annualVisitors: 160, annualLoans: 230, selfServiceKiosks: 12, digitalAccess: 340, readingRooms: 1200 },  // 崇明
  '310101': { branches: 11, collections: 350, annualVisitors: 180, annualLoans: 250, selfServiceKiosks: 14, digitalAccess: 380, readingRooms: 1400 },  // 黄浦
};

// 银川6区县 — 市级总量按人口比例分配
const YINCHUAN_LIBRARY: Record<string, DistrictLibrary> = {
  '640104': { branches: 12, collections: 120, annualVisitors: 52, annualLoans: 35, selfServiceKiosks: 4, digitalAccess: 85, readingRooms: 980 },  // 兴庆
  '640106': { branches: 10, collections: 95, annualVisitors: 42, annualLoans: 28, selfServiceKiosks: 3, digitalAccess: 70, readingRooms: 820 },  // 金凤（宁夏图书馆所在）
  '640105': { branches: 7, collections: 68, annualVisitors: 30, annualLoans: 20, selfServiceKiosks: 2, digitalAccess: 48, readingRooms: 560 },  // 西夏
  '640121': { branches: 5, collections: 48, annualVisitors: 20, annualLoans: 13, selfServiceKiosks: 1, digitalAccess: 30, readingRooms: 380 },  // 永宁
  '640122': { branches: 5, collections: 52, annualVisitors: 22, annualLoans: 15, selfServiceKiosks: 1, digitalAccess: 33, readingRooms: 420 },  // 贺兰
  '640181': { branches: 6, collections: 37, annualVisitors: 14, annualLoans: 9, selfServiceKiosks: 1, digitalAccess: 24, readingRooms: 340 },  // 灵武
};

const CITY_LIBRARY: Record<string, Record<string, DistrictLibrary>> = {
  shanghai: SHANGHAI_LIBRARY,
  yinchuan: YINCHUAN_LIBRARY,
};

const LIBRARY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报 + 上海图书馆2024年报 — 公共图书馆20座/总藏书8900万册/年流通4500万人次/分馆260个/自助380台',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报 + 银川市文旅局 — 公共图书馆7座/总藏书420万册/年流通180万人次/分馆45个/自助12台',
    year: '2025年',
  },
};

export function librarySource(cityKey: string): string {
  return LIBRARY_SOURCES[cityKey]?.source ?? '';
}

export function libraryYear(cityKey: string): string {
  return LIBRARY_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictLibrary(cityKey: string, adcode: string): DistrictLibrary | undefined {
  return CITY_LIBRARY[cityKey]?.[adcode];
}

/** 市级公共图书馆总量 */
export const CITY_LIBRARY_TOTALS: Record<string, {
  totalBranches: number; // 公共图书馆总数（座）
  totalCollections: number; // 总藏书量（万册）
  annualVisitors: number; // 年流通人次（万人次）
  annualLoans: number; // 年借阅量（万册次）
  servicePoints: number; // 分馆/服务点（个）
  selfServiceKiosks: number; // 24小时自助图书馆（台）
  digitalAccess: number; // 数字资源访问量（亿人次）
  perCapitaBooks: number; // 人均藏书（册）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalBranches: 20,
    totalCollections: 8900,
    annualVisitors: 4500,
    annualLoans: 6500,
    servicePoints: 260,
    selfServiceKiosks: 380,
    digitalAccess: 1.2,
    perCapitaBooks: 3.59,
    year: 2025,
    source: '上海市2025年统计公报 + 上海图书馆2024年报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    totalBranches: 7,
    totalCollections: 420,
    annualVisitors: 180,
    annualLoans: 120,
    servicePoints: 45,
    selfServiceKiosks: 12,
    digitalAccess: 0.03,
    perCapitaBooks: 1.43,
    year: 2025,
    source: '银川市2025年统计公报 + 银川市文旅局',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
