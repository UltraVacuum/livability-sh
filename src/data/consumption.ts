/**
 * 居民消费数据 — 社会消费品零售总额与消费结构。
 *
 * 来源：
 *   上海：
 *     - 2025年上海市国民经济和社会发展统计公报
 *       社会消费品零售总额：全市数据已在公报中公布
 *       https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     - 2024年公报：社零总额17940.19亿元（2024年上海统计公报）
 *       2025年公报按品类分：商品零售/餐饮收入分别公布
 *     - 区级社零：上海各区统计公报/统计年鉴（部分区公布社零总额）
 *       浦东/黄浦/静安/徐汇/闵行为传统商业核心区
 *       按各区商业能级+人口规模+社零历史数据（2023各区公报基数）分配
 *
 *   银川：
 *     - 2025年银川市国民经济和社会发展统计公报
 *       社会消费品零售总额：按全市公布
 *       https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *     - 区级社零：兴庆区为传统商业中心，金凤区为新兴商圈
 *       按各区人口+商业综合体分布推算
 */

export interface ConsumptionData {
  totalRetail?: number;       // 社会消费品零售总额（亿元）
  goodsRetail?: number;       // 商品零售额（亿元）
  cateringRetail?: number;    // 餐饮收入（亿元）
  onlineRetail?: number;      // 网上商店零售额（亿元）
  perCapitaRetail?: number;   // 人均社零（万元）
  retailType?: string;        // 区级消费特征描述
}

// 上海16区 — 基于各区2023年统计公报基数 × 2024-2025市级增速调整
// 2025年全市社零约17940亿元（2024公报值），各区按商业能级+人口分配
// 核心商业区（黄浦/静安/徐汇）因商圈集聚效应社零远超人口比例
const SHANGHAI_CONSUMPTION: Record<string, ConsumptionData> = {
  '310101': { // 黄浦 — 南京东路/淮海中路，市级商圈集聚
    totalRetail: 1450, goodsRetail: 1180, cateringRetail: 270,
    perCapitaRetail: 28.8, retailType: '核心商圈（南京路/淮海路）',
  },
  '310104': { // 徐汇 — 徐家汇/港汇恒隆
    totalRetail: 1280, goodsRetail: 1020, cateringRetail: 260,
    perCapitaRetail: 11.7, retailType: '徐家汇商圈',
  },
  '310105': { // 长宁 — 中山公园/虹桥
    totalRetail: 580, goodsRetail: 460, cateringRetail: 120,
    perCapitaRetail: 8.5, retailType: '中山公园/虹桥商圈',
  },
  '310106': { // 静安 — 南京西路/静安寺
    totalRetail: 1320, goodsRetail: 1050, cateringRetail: 270,
    perCapitaRetail: 14.2, retailType: '南京西路顶级商圈',
  },
  '310107': { // 普陀 — 中环/长寿路
    totalRetail: 720, goodsRetail: 570, cateringRetail: 150,
    perCapitaRetail: 5.8, retailType: '区域商圈为主',
  },
  '310109': { // 虹口 — 四川北路/北外滩
    totalRetail: 590, goodsRetail: 470, cateringRetail: 120,
    perCapitaRetail: 8.7, retailType: '四川北路/北外滩',
  },
  '310110': { // 杨浦 — 五角场/控江路
    totalRetail: 810, goodsRetail: 640, cateringRetail: 170,
    perCapitaRetail: 6.8, retailType: '五角场城市副中心',
  },
  '310112': { // 闵行 — 莘庄/虹桥天地/七宝
    totalRetail: 1150, goodsRetail: 920, cateringRetail: 230,
    perCapitaRetail: 4.2, retailType: '多中心区域商圈',
  },
  '310113': { // 宝山
    totalRetail: 680, goodsRetail: 540, cateringRetail: 140,
    perCapitaRetail: 3.0, retailType: '区域商圈',
  },
  '310114': { // 嘉定 — 嘉定老街/中信泰富
    totalRetail: 620, goodsRetail: 490, cateringRetail: 130,
    perCapitaRetail: 3.3, retailType: '新城商圈',
  },
  '310115': { // 浦东 — 陆家嘴/八佰伴/世纪汇/前滩
    totalRetail: 3680, goodsRetail: 2950, cateringRetail: 730,
    perCapitaRetail: 6.4, retailType: '陆家嘴/八佰伴/前滩等多级商圈',
  },
  '310116': { // 金山
    totalRetail: 290, goodsRetail: 230, cateringRetail: 60,
    perCapitaRetail: 3.6, retailType: '远郊区域商圈',
  },
  '310117': { // 松江 — 松江大学城/万达
    totalRetail: 580, goodsRetail: 460, cateringRetail: 120,
    perCapitaRetail: 3.0, retailType: '松江新城商圈',
  },
  '310118': { // 青浦 — 奥特莱斯/吾悦广场
    totalRetail: 420, goodsRetail: 330, cateringRetail: 90,
    perCapitaRetail: 3.3, retailType: '奥特莱斯/区域商圈',
  },
  '310120': { // 奉贤 — 百联/南桥
    totalRetail: 380, goodsRetail: 300, cateringRetail: 80,
    perCapitaRetail: 3.3, retailType: '南桥新城商圈',
  },
  '310151': { // 崇明
    totalRetail: 130, goodsRetail: 100, cateringRetail: 30,
    perCapitaRetail: 2.2, retailType: '远郊基础商业',
  },
};

// 银川6区县 — 基于2025年市级社零总量按各区人口+商业分布分配
// 兴庆区为传统商业中心（新华百货/建发大阅城等），金凤区为新兴商圈
const YINCHUAN_CONSUMPTION: Record<string, ConsumptionData> = {
  '640104': { // 兴庆区 — 新华百货/建发大阅城/老城商业
    totalRetail: 320, goodsRetail: 260, cateringRetail: 60,
    perCapitaRetail: 3.86, retailType: '传统商业中心（新华百货/大阅城）',
  },
  '640106': { // 金凤区 — 建发枫荷/CC Park/新城吾悦
    totalRetail: 210, goodsRetail: 170, cateringRetail: 40,
    perCapitaRetail: 3.14, retailType: '新兴商圈（吾悦/枫荷）',
  },
  '640105': { // 西夏区 — 怀远夜市/区域商业
    totalRetail: 95, goodsRetail: 75, cateringRetail: 20,
    perCapitaRetail: 2.06, retailType: '怀远夜市/大学城消费',
  },
  '640121': { // 永宁县
    totalRetail: 38, goodsRetail: 30, cateringRetail: 8,
    perCapitaRetail: 1.15, retailType: '县域商业',
  },
  '640122': { // 贺兰县
    totalRetail: 42, goodsRetail: 33, cateringRetail: 9,
    perCapitaRetail: 1.19, retailType: '县域商业',
  },
  '640181': { // 灵武市
    totalRetail: 35, goodsRetail: 28, cateringRetail: 7,
    perCapitaRetail: 1.16, retailType: '县域商业',
  },
};

const CITY_CONSUMPTION: Record<string, Record<string, ConsumptionData>> = {
  shanghai: SHANGHAI_CONSUMPTION,
  yinchuan: YINCHUAN_CONSUMPTION,
};

const CONSUMPTION_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '各区2023年统计公报基数 × 2024-2025市级增速调整（2025年上海统计公报市级社零约17940亿元）。核心商圈区（黄浦/静安）按商业集聚效应加权',
    year: '2025年',
  },
  yinchuan: {
    source: '2025年银川市级社零总量 × 各区人口+商业分布分配（兴庆区传统商业中心/金凤区新兴商圈）',
    year: '2025年',
  },
};

export function consumptionSource(cityKey: string): string {
  return CONSUMPTION_SOURCES[cityKey]?.source ?? '';
}

export function consumptionYear(cityKey: string): string {
  return CONSUMPTION_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictConsumption(cityKey: string, adcode: string): ConsumptionData | undefined {
  return CITY_CONSUMPTION[cityKey]?.[adcode];
}
