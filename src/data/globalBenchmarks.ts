/**
 * 全球城市对标数据 — 来自 awesome-public-datasets 推荐的公开数据源
 *
 * 数据来源：
 *   - World Bank Open Data (https://data.worldbank.org/)
 *   - WHO Global Health Observatory (https://www.who.int/gho/en/)
 *   - Numbeo Cost of Living (https://www.numbeo.com/)
 *   - OECD Better Life Index (https://www.oecd.org/sdd/)
 *   - 各城市统计公报
 *
 * 注意：这些是国家级或城市级估算值，用于提供国际坐标系参考，
 * 不是区县级精确数据。数据年份标注在每个指标中。
 */

/* ── 对标城市选择 ────────────────────────────────────────────────────
 * 选择逻辑：
 *  - 上海对标：全球金融中心（纽约/伦敦/东京/新加坡/香港）
 *  - 银川对标：内陆首府/中等规模城市（对应国际同类）
 *  - 参考维度：人口量级、经济水平、气候特征
 */

export interface BenchmarkCity {
  key: string;
  name: string;
  country: string;
  flag: string; // emoji
  population: number; // 市辖区常住人口（万）
  gdpPerCapitaUSD?: number; // 人均 GDP（美元）
  category: 'yijudu-city' | 'global-mega' | 'global-mid' | 'asian-hub';
  blurb: string;
}

export const BENCHMARK_CITIES: BenchmarkCity[] = [
  // 本站城市
  {
    key: 'shanghai',
    name: '上海',
    country: '中国',
    flag: '🇨🇳',
    population: 2487, // 2025年统计公报
    gdpPerCapitaUSD: 31500, // 估算：人均GDP约22.5万元 ≈ $31,500
    category: 'yijudu-city',
    blurb: '本站城市 · 中国最大经济中心',
  },
  {
    key: 'yinchuan',
    name: '银川',
    country: '中国',
    flag: '🇨🇳',
    population: 294, // 2025年统计公报 294.26万
    gdpPerCapitaUSD: 14400, // 人均GDP 103,579元 ≈ $14,400
    category: 'yijudu-city',
    blurb: '本站城市 · 宁夏首府，塞上江南',
  },
  // 全球对标 — 超大都市
  {
    key: 'tokyo',
    name: '东京',
    country: '日本',
    flag: '🇯🇵',
    population: 1396, // 东京都 2024
    gdpPerCapitaUSD: 43000,
    category: 'global-mega',
    blurb: '全球最大都市圈 · 亚洲金融中心',
  },
  {
    key: 'singapore',
    name: '新加坡',
    country: '新加坡',
    flag: '🇸🇬',
    population: 604, // 2024
    gdpPerCapitaUSD: 84700,
    category: 'global-mega',
    blurb: '全球宜居城市榜首常客 · 花园城市',
  },
  {
    key: 'hongkong',
    name: '香港',
    country: '中国香港',
    flag: '🇭🇰',
    population: 750, // 2024
    gdpPerCapitaUSD: 50600,
    category: 'global-mega',
    blurb: '国际金融中心 · 自由港',
  },
  {
    key: 'newyork',
    name: '纽约',
    country: '美国',
    flag: '🇺🇸',
    population: 880, // 纽约市 2024
    gdpPerCapitaUSD: 92000,
    category: 'global-mega',
    blurb: '全球金融中心 · 文化熔炉',
  },
  {
    key: 'london',
    name: '伦敦',
    country: '英国',
    flag: '🇬🇧',
    population: 900, // 大伦敦 2024
    gdpPerCapitaUSD: 68000,
    category: 'global-mega',
    blurb: '欧洲金融中心 · 全球文化之都',
  },
  // 亚洲对标 — 中等规模城市
  {
    key: 'fukuoka',
    name: '福冈',
    country: '日本',
    flag: '🇯🇵',
    population: 162, // 2024
    gdpPerCapitaUSD: 35000,
    category: 'global-mid',
    blurb: '日本最宜居城市 · 九州门户',
  },
  {
    key: 'taipei',
    name: '台北',
    country: '中国台湾',
    flag: '🇹🇼',
    population: 250, // 2024
    gdpPerCapitaUSD: 40000,
    category: 'asian-hub',
    blurb: '东亚科技枢纽 · 夜市文化',
  },
  {
    key: 'busan',
    name: '釜山',
    country: '韩国',
    flag: '🇰🇷',
    population: 330, // 2024
    gdpPerCapitaUSD: 31000,
    category: 'asian-hub',
    blurb: '韩国第二大城市 · 最大港口',
  },
];

/* ── 对标指标 ──────────────────────────────────────────────────── */

export interface BenchmarkMetric {
  key: string;
  label: string;
  unit: string;
  description: string;
  source: string;
  sourceUrl: string;
  // 城市 key → 数值
  values: Record<string, number | undefined>;
  // 是否越小越好
  lowerIsBetter?: boolean;
  year: number;
}

export const BENCHMARK_METRICS: BenchmarkMetric[] = [
  {
    key: 'pm25',
    label: 'PM2.5 年均浓度',
    unit: 'μg/m³',
    description: '细颗粒物年均浓度，WHO 空气质量准则值为 5 μg/m³',
    source: 'WHO Global Air Quality Database (2024)',
    sourceUrl: 'https://www.who.int/data/gho/data/themes/air-health/air-quality-database',
    year: 2024,
    lowerIsBetter: true,
    values: {
      shanghai: 26.3,
      yinchuan: 30.4,
      tokyo: 9.0,
      singapore: 14.0,
      hongkong: 21.0,
      newyork: 7.0,
      london: 9.0,
      fukuoka: 11.0,
      taipei: 15.0,
      busan: 18.0,
    },
  },
  {
    key: 'gdpPerCapita',
    label: '人均 GDP',
    unit: '美元',
    description: '人均国内生产总值（购买力平价后可比性更高，此处用名义值做粗略对比）',
    source: 'World Bank Open Data + 各城市统计公报 (2024)',
    sourceUrl: 'https://data.worldbank.org/indicator/NY.GDP.PCAP.CD',
    year: 2024,
    values: {
      shanghai: 31500,
      yinchuan: 14400,
      tokyo: 43000,
      singapore: 84700,
      hongkong: 50600,
      newyork: 92000,
      london: 68000,
      fukuoka: 35000,
      taipei: 40000,
      busan: 31000,
    },
  },
  {
    key: 'greenArea',
    label: '人均公园绿地',
    unit: '㎡',
    description: '人均公园绿地面积，反映城市生态环境品质',
    source: '各城市统计年报 / OECD Regional Well-being (2024)',
    sourceUrl: 'https://www.oecd.org/regression-policy/measuring-distance-to-the-sdg-targets-regionally.html',
    year: 2024,
    values: {
      shanghai: 9.2, // 上海人均公园绿地约9.2㎡
      yinchuan: 16.97, // 银川 2025年统计公报
      tokyo: 5.2,
      singapore: 7.5,
      hongkong: 2.5, // 香港极度稀缺
      newyork: 11.0, // 纽约中央公园贡献大
      london: 27.0, // 伦敦皇家公园占比极高
      fukuoka: 8.5,
      taipei: 5.0,
      busan: 16.0,
    },
  },
  {
    key: 'metroKm',
    label: '地铁运营里程',
    unit: '公里',
    description: '城市轨道交通运营里程，反映公共交通基础设施水平',
    source: '各城市交通局公开数据 (2025)',
    sourceUrl: 'https://data.worldbank.org/indicator/IS.RRS.TOTL.KM',
    year: 2025,
    values: {
      shanghai: 962, // 2025统计公报
      yinchuan: 0, // 银川无地铁
      tokyo: 980, // 东京地铁+都营
      singapore: 246,
      hongkong: 275, // 港铁
      newyork: 399, // 纽约地铁
      london: 402, // 伦敦地铁
      fukuoka: 0, // 福冈无地铁（有西铁天神大牟田线等通勤铁路）
      taipei: 167, // 台北捷运
      busan: 51, // 釜山地铁
    },
  },
  {
    key: 'urbanGreenRate',
    label: '建成区绿化覆盖率',
    unit: '%',
    description: '城市建成区绿化覆盖率，反映城市整体绿化水平',
    source: '各城市统计公报 + World Bank Urban Development (2024)',
    sourceUrl: 'https://data.worldbank.org/topic/urban-development',
    year: 2024,
    values: {
      shanghai: 44.5,
      yinchuan: 42.6, // 8504.11公顷/199.45km²建成区
      tokyo: 30.0,
      singapore: 47.0, // 花园城市
      hongkong: 40.0, // 郊野公园占比高
      newyork: 27.0,
      london: 33.0,
      fukuoka: 35.0,
      taipei: 38.0,
      busan: 41.0,
    },
  },
  {
    key: 'lifeExpectancy',
    label: '预期寿命',
    unit: '岁',
    description: '出生时预期寿命，WHO 全球健康观测数据',
    source: 'WHO Global Health Observatory (2024)',
    sourceUrl: 'https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates',
    year: 2023,
    values: {
      shanghai: 84.6, // 上海2025统计公报
      yinchuan: 78.5, // 宁夏平均水平估算
      tokyo: 84.6, // 日本最高
      singapore: 83.5,
      hongkong: 85.3, // 全球最高之一
      newyork: 81.0,
      london: 82.0,
      fukuoka: 83.5,
      taipei: 81.5,
      busan: 82.5,
    },
  },
  {
    key: 'safetyIndex',
    label: '安全指数',
    unit: '分',
    description: 'Numbeo 安全指数（0-100，越高越安全），综合犯罪率、安全感调查',
    source: 'Numbeo Crime Index (2025 mid-year)',
    sourceUrl: 'https://www.numbeo.com/crime/rankings.jsp',
    year: 2025,
    values: {
      shanghai: 72, // 中国城市普遍安全指数高
      yinchuan: 68,
      tokyo: 80, // 全球最安全城市之一
      singapore: 92, // 全球最安全
      hongkong: 72,
      newyork: 51,
      london: 47,
      fukuoka: 78,
      taipei: 75,
      busan: 70,
    },
  },
  {
    key: 'costIndex',
    label: '生活成本指数',
    unit: '分',
    description: 'Numbeo 生活成本指数（纽约=100），越高生活成本越高',
    source: 'Numbeo Cost of Living Index (2025 mid-year)',
    sourceUrl: 'https://www.numbeo.com/cost-of-living/rankings.jsp',
    year: 2025,
    lowerIsBetter: true,
    values: {
      shanghai: 45,
      yinchuan: 28, // 低成本城市
      tokyo: 52,
      singapore: 75,
      hongkong: 68,
      newyork: 100, // 基准
      london: 72,
      fukuoka: 42,
      taipei: 38,
      busan: 35,
    },
  },
];

/* ── 数据源清单（用于页面展示） ──────────────────────────────────── */

export interface DataSource {
  name: string;
  url: string;
  description: string;
  category: 'health' | 'economy' | 'environment' | 'urban' | 'social';
  used: boolean; // 是否已在本站使用
}

export const DATA_SOURCES: DataSource[] = [
  {
    name: 'World Bank Open Data',
    url: 'https://data.worldbank.org/',
    description: '全球最大公开数据集——GDP、人口、城市化、环境指标，覆盖 200+ 国家和地区，可按城市/国家维度查询，提供 REST API',
    category: 'economy',
    used: true,
  },
  {
    name: 'WHO Global Health Observatory',
    url: 'https://www.who.int/gho/en/',
    description: '世界卫生组织全球健康数据——空气质量、预期寿命、医疗资源、心理健康指标，覆盖 194 个成员国',
    category: 'health',
    used: true,
  },
  {
    name: 'WHO Air Quality Database',
    url: 'https://www.who.int/data/gho/data/themes/air-health/air-quality-database',
    description: '全球 6000+ 城市 PM2.5/PM10/NO₂ 年均浓度数据库，可直接对标全球城市空气质量',
    category: 'environment',
    used: true,
  },
  {
    name: 'OECD Better Life Index',
    url: 'https://www.oecdbetterlifeindex.org/',
    description: '经合组织生活质量指数——住房、收入、就业、教育、环境、健康、安全、工作生活平衡等 11 个维度',
    category: 'social',
    used: false,
  },
  {
    name: 'Numbeo',
    url: 'https://www.numbeo.com/',
    description: '全球城市生活质量数据库——生活成本、犯罪率、医疗质量、交通通勤、污染感知，用户众包+官方数据校准',
    category: 'social',
    used: true,
  },
  {
    name: 'Our World in Data',
    url: 'https://ourworldindata.org/',
    description: '牛津大学团队的公开数据可视化项目——幸福指数、健康趋势、环境变化、教育水平，图表可直接嵌入',
    category: 'social',
    used: false,
  },
  {
    name: 'UN Human Development Reports',
    url: 'https://hdr.undp.org/en',
    description: '联合国人类发展报告——HDI（人类发展指数）、不平等调整HDI、性别发展指数、多维贫困指数',
    category: 'social',
    used: false,
  },
  {
    name: 'OpenStreetMap',
    url: 'https://www.openstreetmap.org/',
    description: '全球最大的开源地图数据——城市基础设施密度分析（公园/医院/学校/便利店密度），宜居度核心因子',
    category: 'urban',
    used: false,
  },
  {
    name: 'Natural Earth',
    url: 'https://www.naturalearthdata.com/',
    description: '开源矢量地图数据——全球行政区划边界、水系、地形，可用于地图可视化底图',
    category: 'urban',
    used: false,
  },
  {
    name: 'GeoNames',
    url: 'https://www.geonames.org/',
    description: '全球地名数据库——1100万+地名坐标，城市地理定位和行政区划查询的基础设施',
    category: 'urban',
    used: false,
  },
];

/* ── 辅助函数 ──────────────────────────────────────────────────── */

export function getBenchmarkCity(key: string): BenchmarkCity | undefined {
  return BENCHMARK_CITIES.find((c) => c.key === key);
}

export function getMetricValue(
  metricKey: string,
  cityKey: string,
): number | undefined {
  const metric = BENCHMARK_METRICS.find((m) => m.key === metricKey);
  return metric?.values[cityKey];
}

/** 获取本站城市在某指标中的排名（对标所有城市） */
export function getCityRankInBenchmark(
  metricKey: string,
  cityKey: string,
): { rank: number; total: number; percentile: number } | null {
  const metric = BENCHMARK_METRICS.find((m) => m.key === metricKey);
  if (!metric) return null;

  const entries = Object.entries(metric.values).filter(
    ([, v]) => v !== undefined,
  );
  const sorted = entries.sort((a, b) => {
    const va = a[1] as number;
    const vb = b[1] as number;
    return metric.lowerIsBetter ? va - vb : vb - va;
  });

  const idx = sorted.findIndex(([k]) => k === cityKey);
  if (idx === -1) return null;

  return {
    rank: idx + 1,
    total: sorted.length,
    percentile: Math.round(((sorted.length - idx) / sorted.length) * 100),
  };
}
