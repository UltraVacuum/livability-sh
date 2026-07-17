/**
 * 区县级医疗资源细化数据 — 基于官方市级总量 + 区级人口/POI比例分配。
 *
 * 来源：
 *   上海：2025年上海市国民经济和社会发展统计公报（上海市统计局 2026-03-30）
 *     市级总量：卫生机构6566所，卫生技术人员28.21万人
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *   银川：银川市2025年国民经济和社会发展统计公报（银川市统计局 2026-04-27）
 *     市级总量：卫生机构1704个，医院85个，卫生技术人员3.44万人，
 *     执业医师1.26万人，注册护士1.57万人，编制床位2.13万张
 *     https://www.yinchuan.gov.cn/.../t20260427_5226142.html
 *
 * 分区方法：
 *   上海16区 — 市级卫生技术人员28.21万人按各区人口占全市比例分配
 *   （人口来源：上海统计年鉴2025版表2.2，2024年末常住人口）。
 *   各区医院数按高德POI医院计数比例分配市级医院趋势（非精确值）。
 *
 *   银川6区县 — 同理按区级人口比例分配市级总量。
 *
 * 这是【展示用补充数据】，不参与 healthcare 维度的 POI 密度评分 ——
 * 评分仍用高德 POI 密度以保证全市可比；本数据用于在区详情页呈现医疗资源概况。
 */

export interface DistrictHealthcare {
  institutions: number; // 卫生机构数（估算）
  hospitals: number; // 医院数（估算）
  healthWorkers: number; // 卫生技术人员数（估算，人）
  beds?: number; // 编制床位数（估算，张）— 银川专有
}

// 上海市级总量（2025年公报）
const SH_TOTAL = {
  institutions: 6566,
  workers: 282100, // 28.21万人
  year: 2025,
};

// 银川市级总量（2025年公报）
const YC_TOTAL = {
  institutions: 1704,
  hospitals: 85,
  workers: 34400, // 3.44万人
  doctors: 12600, // 1.26万人
  nurses: 15700, // 1.57万人
  beds: 21300, // 2.13万张
  year: 2025,
};

/**
 * 上海16区医疗资源 — 按各区人口占全市比例分配市级总量。
 *
 * 人口数据：上海统计年鉴2025版表2.2（2024年末常住人口）
 * 全市常住人口2480.26万人。
 *
 * 说明：区级卫生机构/技术人员数为按人口比例的估算值，
 * 实际各区医疗资源分布受三甲医院集中度等因素影响可能与均值有偏差。
 * 标注为「估算」以区别于官方分区统计数据。
 */
const SHANGHAI_HEALTHCARE: Record<string, DistrictHealthcare> = {
  '310101': { institutions: 133, hospitals: 14, healthWorkers: 5730 },   // 黄浦 50.34万
  '310106': { institutions: 246, hospitals: 26, healthWorkers: 10580 },  // 静安 92.93万
  '310104': { institutions: 291, hospitals: 31, healthWorkers: 12520 },  // 徐汇 109.93万
  '310105': { institutions: 181, hospitals: 19, healthWorkers: 7800 },   // 长宁 68.53万
  '310109': { institutions: 180, hospitals: 19, healthWorkers: 7745 },   // 虹口 67.99万
  '310110': { institutions: 318, hospitals: 34, healthWorkers: 13660 },  // 杨浦 119.97万
  '310107': { institutions: 331, hospitals: 35, healthWorkers: 14215 },  // 普陀 124.87万
  '310112': { institutions: 722, hospitals: 76, healthWorkers: 31040 },  // 闵行 272.50万
  '310113': { institutions: 600, hospitals: 63, healthWorkers: 25785 },  // 宝山 226.39万
  '310114': { institutions: 501, hospitals: 53, healthWorkers: 21530 },  // 嘉定 189.04万
  '310115': { institutions: 1532, hospitals: 161, healthWorkers: 65875 },// 浦东 578.58万
  '310116': { institutions: 215, hospitals: 23, healthWorkers: 9250 },   // 金山 81.23万
  '310117': { institutions: 519, hospitals: 55, healthWorkers: 22305 },  // 松江 195.89万
  '310118': { institutions: 341, hospitals: 36, healthWorkers: 14660 },  // 青浦 128.77万
  '310120': { institutions: 302, hospitals: 32, healthWorkers: 12975 },  // 奉贤 113.95万
  '310151': { institutions: 157, hospitals: 17, healthWorkers: 6760 },   // 崇明 59.35万
};

/**
 * 银川6区县医疗资源 — 按各区人口占全市比例分配市级总量。
 *
 * 人口数据：2025市级比例调整值（ census.ts ）
 * 全市常住人口294.26万人。
 *
 * 市级分配基数：
 *   卫生机构1704个、医院85个、技术人员3.44万人、编制床位2.13万张
 */
const YINCHUAN_HEALTHCARE: Record<string, DistrictHealthcare> = {
  '640104': { institutions: 480, hospitals: 24, healthWorkers: 9690, beds: 5997 },   // 兴庆 82.87万 (28.16%)
  '640106': { institutions: 387, hospitals: 19, healthWorkers: 7815, beds: 4836 },   // 金凤 66.80万 (22.70%)
  '640105': { institutions: 268, hospitals: 13, healthWorkers: 5407, beds: 3347 },   // 西夏 46.20万 (15.70%)
  '640121': { institutions: 192, hospitals: 10, healthWorkers: 3870, beds: 2395 },   // 永宁 33.08万 (11.24%)
  '640122': { institutions: 204, hospitals: 10, healthWorkers: 4115, beds: 2546 },   // 贺兰 35.16万 (11.95%)
  '640181': { institutions: 175, hospitals: 9, healthWorkers: 3525, beds: 2183 },    // 灵武 30.16万 (10.25%)
};

const CITY_HEALTHCARE: Record<string, Record<string, DistrictHealthcare>> = {
  shanghai: SHANGHAI_HEALTHCARE,
  yinchuan: YINCHUAN_HEALTHCARE,
};

const HEALTHCARE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '2025年上海市统计公报（市级总量）× 各区人口比例分配（上海统计年鉴2025表2.2）',
    year: '2025年',
  },
  yinchuan: {
    source: '2025年银川市统计公报（市级总量1704机构/85医院/3.44万人/2.13万床位）× 各区县人口比例分配',
    year: '2025年',
  },
};

export function healthcareSource(cityKey: string): string {
  return HEALTHCARE_SOURCES[cityKey]?.source ?? '';
}

export function healthcareYear(cityKey: string): string {
  return HEALTHCARE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictHealthcare(cityKey: string, adcode: string): DistrictHealthcare | undefined {
  return CITY_HEALTHCARE[cityKey]?.[adcode];
}

/** 市级医疗总量（用于参考展示） */
export const CITY_HEALTH_TOTALS: Record<string, { institutions: number; workers: number; hospitals?: number; beds?: number; year: number; source: string; sourceUrl: string }> = {
  shanghai: {
    institutions: SH_TOTAL.institutions,
    workers: SH_TOTAL.workers,
    year: SH_TOTAL.year,
    source: '2025年上海市国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    institutions: YC_TOTAL.institutions,
    workers: YC_TOTAL.workers,
    hospitals: YC_TOTAL.hospitals,
    beds: YC_TOTAL.beds,
    year: YC_TOTAL.year,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
