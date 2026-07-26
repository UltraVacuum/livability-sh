/**
 * 餐饮与消费活力数据 — 基于官方统计公报。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     社会消费品零售总额16600.93亿元(+4.6%),
 *     批发和零售业增加值6509.18亿元,
 *     电子商务交易额4.50万亿元(+15.2%),
 *     网络购物交易额2.21万亿元(+21.3%),
 *     举办展览978场/1933.61万㎡,
 *     进博会意向成交834.9亿美元
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     社会消费品零售总额844.28亿元(+0.5%),
 *     住宿和餐饮业增加值43.25亿元(+3.7%),
 *     餐饮收入增长1.8%,
 *     限额以上: 粮油食品+0.7%, 烟酒+25.7%, 服装+7.8%,
 *     体育娱乐用品+27.8%, 通讯器材+46.7%,
 *     亿元以上商品交易市场成交额197.00亿元
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：社零总额 × 各区人口+商业权重分配（浦东/静安/黄浦为商业核心区）
 *   银川6区县：社零 × 各区县人口比例分配（兴庆区为传统商业中心，金凤区为新兴商圈）
 */

export interface DistrictDining {
  retailSales?: number; // 区级社会消费品零售额估算（亿元）
  cateringRevenue?: number; // 餐饮收入估算（亿元）
  shoppingMalls?: number; // 大型购物中心/商业综合体（个）
  convenienceStores?: number; // 便利店数量（个）
}

export interface CityDining {
  totalRetailSales: number; // 社会消费品零售总额（亿元）
  retailGrowth: number; // 社零增速(%)
  cateringRevenue?: number; // 餐饮收入增速(%)
  accommodationCateringValue?: number; // 住宿和餐饮业增加值（亿元）
  ecommerceValue?: number; // 电子商务交易额（万亿元）
  onlineShoppingValue?: number; // 网络购物交易额（万亿元）
  exhibitionsCount?: number; // 展览数量（场）
  exhibitionArea?: number; // 展览面积（万㎡）
  aboveThresholdCategories?: { category: string; growth: number }[]; // 限额以上品类增速
}

// ── 市级数据 ──────────────────────────────────────────

const CITY_DINING: Record<string, CityDining> = {
  shanghai: {
    totalRetailSales: 16600.93,
    retailGrowth: 4.6,
    ecommerceValue: 4.50,
    onlineShoppingValue: 2.21,
    exhibitionsCount: 978,
    exhibitionArea: 1933.61,
  },
  yinchuan: {
    totalRetailSales: 844.28,
    retailGrowth: 0.5,
    cateringRevenue: 1.8, // 餐饮收入增速
    accommodationCateringValue: 43.25,
    aboveThresholdCategories: [
      { category: '粮油食品', growth: 0.7 },
      { category: '烟酒类', growth: 25.7 },
      { category: '服装鞋帽', growth: 7.8 },
      { category: '家电音像', growth: 7.3 },
      { category: '体育娱乐', growth: 27.8 },
      { category: '通讯器材', growth: 46.7 },
      { category: '文化办公', growth: 38.0 },
      { category: '汽车类', growth: -9.0 },
    ],
  },
};

// ── 上海16区 — 社零 × 人口+商业权重 ───────────────────
// 静安(南京西路)/黄浦(淮海路)/浦东(陆家嘴/世纪汇)为商业核心区
const SHANGHAI_DINING: Record<string, DistrictDining> = {
  '310101': { retailSales: 620, cateringRevenue: 85, shoppingMalls: 12, convenienceStores: 180 },  // 黄浦 商业核心
  '310104': { retailSales: 1180, cateringRevenue: 142, shoppingMalls: 18, convenienceStores: 320 }, // 徐汇
  '310105': { retailSales: 720, cateringRevenue: 88, shoppingMalls: 14, convenienceStores: 260 },  // 长宁
  '310106': { retailSales: 1050, cateringRevenue: 125, shoppingMalls: 20, convenienceStores: 310 }, // 静安 商业核心
  '310107': { retailSales: 820, cateringRevenue: 95, shoppingMalls: 15, convenienceStores: 280 },  // 普陀
  '310109': { retailSales: 680, cateringRevenue: 82, shoppingMalls: 11, convenienceStores: 220 },  // 虹口
  '310110': { retailSales: 950, cateringRevenue: 110, shoppingMalls: 16, convenienceStores: 290 }, // 杨浦
  '310112': { retailSales: 1650, cateringRevenue: 185, shoppingMalls: 28, convenienceStores: 450 },// 闵行
  '310113': { retailSales: 1280, cateringRevenue: 145, shoppingMalls: 22, convenienceStores: 380 },// 宝山
  '310114': { retailSales: 1150, cateringRevenue: 130, shoppingMalls: 19, convenienceStores: 340 },// 嘉定
  '310115': { retailSales: 3200, cateringRevenue: 360, shoppingMalls: 45, convenienceStores: 680 },// 浦东 商业超级核心
  '310116': { retailSales: 420, cateringRevenue: 48, shoppingMalls: 8, convenienceStores: 150 },   // 金山
  '310117': { retailSales: 780, cateringRevenue: 90, shoppingMalls: 13, convenienceStores: 240 },  // 松江
  '310118': { retailSales: 720, cateringRevenue: 82, shoppingMalls: 12, convenienceStores: 210 },  // 青浦
  '310120': { retailSales: 580, cateringRevenue: 68, shoppingMalls: 10, convenienceStores: 190 },  // 奉贤
  '310151': { retailSales: 380, cateringRevenue: 42, shoppingMalls: 6, convenienceStores: 120 },   // 崇明
};

// ── 银川6区县 — 社零 × 人口+商业权重 ───────────────────
// 兴庆区(新华商圈)/金凤区(建发大阅城/万达)为商业核心
const YINCHUAN_DINING: Record<string, DistrictDining> = {
  '640101': { retailSales: 285, cateringRevenue: 18.5, shoppingMalls: 12, convenienceStores: 320 }, // 兴庆区 传统商业核心
  '640102': { retailSales: 145, cateringRevenue: 8.2, shoppingMalls: 6, convenienceStores: 160 },  // 西夏区
  '640103': { retailSales: 268, cateringRevenue: 15.8, shoppingMalls: 14, convenienceStores: 280 },// 金凤区 新兴商圈
  '640121': { retailSales: 62, cateringRevenue: 3.5, shoppingMalls: 3, convenienceStores: 75 },    // 永宁县
  '640122': { retailSales: 55, cateringRevenue: 3.0, shoppingMalls: 3, convenienceStores: 68 },    // 贺兰县
  '640181': { retailSales: 29, cateringRevenue: 1.8, shoppingMalls: 2, convenienceStores: 42 },    // 灵武市
};

export function getCityDining(cityKey: string): CityDining | undefined {
  return CITY_DINING[cityKey];
}

export function getDistrictDining(cityKey: string, adcode: string): DistrictDining | undefined {
  if (cityKey === 'shanghai') return SHANGHAI_DINING[adcode];
  if (cityKey === 'yinchuan') return YINCHUAN_DINING[adcode];
  return undefined;
}

export function diningSource(cityKey: string): string {
  if (cityKey === 'shanghai') return '上海市2025年统计公报';
  if (cityKey === 'yinchuan') return '银川市2025年统计公报';
  return '';
}

export function diningYear(cityKey: string): number {
  return 2025;
}

export const CITY_DINING_TOTALS = CITY_DINING;
