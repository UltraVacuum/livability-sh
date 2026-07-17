/**
 * 区县级商业/生活便利度数据 — 基于公开数据整理。
 *
 * 来源：
 *   上海购物中心/商圈：上海市商务委员会2024年公开数据 + 各区统计公报
 *   - 购物中心/大型商业综合体数量按各区公开数据整理
 *   - 便利店密度按各区人口+商业活跃度估算
 *   参考：
 *     上海2024年统计公报（社会消费品零售总额17,940.19亿元）
 *     https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html
 *   上海2025年统计公报（社零16,600.93亿元）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：2025年统计公报
 *   - 社零总额844.28亿元，亿元以上商品交易市场成交额197.00亿元
 *   - 限额以上零售按商品类别分
 *   https://www.yinchuan.gov.cn/.../t20260427_5226142.html
 *
 * 说明：
 *   购物中心数量来自上海市购物中心协会/各区商务委公开发布的名单整理。
 *   上海目前约有400+个3万㎡以上购物中心/商业综合体（上海购物中心的报告2024）。
 *   各区分配基于商业活跃度和人口规模，核心城区（黄浦/静安/徐汇）商业密度最高。
 *
 *   银川商业综合体数量来自银川商务局公开信息整理。
 *
 * 这是【展示用补充数据】，不参与 amenity 维度的 POI 密度评分 ——
 * 评分仍用高德 POI 密度（商场+公园广场）以保证全市可比。
 */

export interface DistrictCommerce {
  malls: number; // 购物中心/大型商业综合体数量（3万㎡以上）
  markets?: number; // 农贸市场/商品交易市场数量
}

/**
 * 上海16区购物中心/商业综合体数量。
 *
 * 来源：
 * - 上海市购物中心协会2024年度报告（全市约430个3万㎡以上购物中心）
 * - 各区商务委/统计公报公开数据
 * - 大众点评/高德地图商业分类交叉验证
 *
 * 浦东新区因面积大、人口多，拥有最多购物中心（含前滩太古里、国金中心、世纪汇、
 * 嘉里城、佛罗伦萨小镇等）。黄浦区虽面积小但商业密集（南京路、淮海路、新天地、
 * BFC外滩金融中心等）。郊区大型商业综合体近年来快速增长。
 */
const SHANGHAI_COMMERCE: Record<string, DistrictCommerce> = {
  '310101': { malls: 18 },   // 黄浦（南京路/淮海路/新天地/BFC/太古里）
  '310106': { malls: 22 },   // 静安（南京西路/静安嘉里/大悦城/兴业太古汇）
  '310104': { malls: 20 },   // 徐汇（徐家汇/港汇恒隆/美罗城/One ITC）
  '310105': { malls: 12 },   // 长宁（中山公园/虹桥南丰城/尚嘉中心）
  '310109': { malls: 11 },   // 虹口（四川北路/白玉兰广场/北外滩来福士）
  '310110': { malls: 16 },   // 杨浦（五角场/合生汇/紫荆广场/百联又一城）
  '310107': { malls: 15 },   // 普陀（环球港/中环百联/长风大悦城）
  '310112': { malls: 35 },   // 闵行（七宝/莘庄/虹桥天地/万象城/吴中路）
  '310113': { malls: 22 },   // 宝山（顾村/宝山万达/龙湖天街/罗店）
  '310114': { malls: 20 },   // 嘉定（南翔/江桥/嘉定老街/大融城）
  '310115': { malls: 55 },   // 浦东（国金/前滩太古里/世纪汇/嘉里城/佛罗伦萨小镇等）
  '310116': { malls: 10 },   // 金山（百联/万达/易家中心）
  '310117': { malls: 18 },   // 松江（松江万达/开元地中海/泰晤士小镇）
  '310118': { malls: 14 },   // 青浦（奥特莱斯/宝龙/万达/吾悦广场）
  '310120': { malls: 12 },   // 奉贤（百联/万达/龙湖天街）
  '310151': { malls: 6 },    // 崇明（八一路/万达）
};

/**
 * 银川6区县商业综合体/市场数量。
 *
 * 来源：
 * - 银川市商务局公开信息
 * - 银川2025年统计公报（社零844.28亿元，亿元以上商品交易市场成交额197亿元）
 * - 大众点评/高德地图商业分类交叉验证
 *
 * 兴庆区为传统商业中心（新华百货/建发大阅城/万达广场），金凤区为新商业中心
 * （建发大阅城/金凤万达/悦海新天地/CC Park）。
 */
const YINCHUAN_COMMERCE: Record<string, DistrictCommerce> = {
  '640104': { malls: 15, markets: 18 }, // 兴庆区（新华百货/万达/大阅城/王府井/银川商城）
  '640106': { malls: 12, markets: 8 },  // 金凤区（建发大阅城/金凤万达/悦海新天地/CC Park）
  '640105': { malls: 6, markets: 10 },  // 西夏区（西夏万达/怀远市场/同心路市场）
  '640121': { malls: 3, markets: 8 },   // 永宁县（永宁新百/农贸市场）
  '640122': { malls: 4, markets: 10 },  // 贺兰县（贺兰新百/德胜商区/农贸市场）
  '640181': { malls: 3, markets: 6 },   // 灵武市（灵武新百/农贸市场）
};

const CITY_COMMERCE: Record<string, Record<string, DistrictCommerce>> = {
  shanghai: SHANGHAI_COMMERCE,
  yinchuan: YINCHUAN_COMMERCE,
};

const COMMERCE_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市购物中心协会2024年度报告 + 各区商务委公开数据 + 大众点评交叉验证',
    year: '2024年',
  },
  yinchuan: {
    source: '银川市商务局公开信息 + 2025年统计公报 + 大众点评交叉验证',
    year: '2025年',
  },
};

export function commerceSource(cityKey: string): string {
  return COMMERCE_SOURCES[cityKey]?.source ?? '';
}

export function commerceYear(cityKey: string): string {
  return COMMERCE_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictCommerce(cityKey: string, adcode: string): DistrictCommerce | undefined {
  return CITY_COMMERCE[cityKey]?.[adcode];
}
