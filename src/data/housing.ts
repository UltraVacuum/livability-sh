/**
 * District-level housing prices — real data from public sources.
 *
 * 上海: 2024年各区二手房年均均价（聚汇数据 gotohui.com 汇总）
 *   来源：https://m.gotohui.com/years/3/2024/ （12月数据）
 *   说明：二手房均价，单位元/㎡，反映区县居住成本相对水平。
 *
 * 银川: 2025年各区县二手房挂牌均价（中国房价行情 creprice.cn）
 *   来源：https://m.creprice.cn/city/yc.html （2025年度挂牌数据）
 *   说明：住宅挂牌均价，单位元/㎡。
 *
 * 这是【展示用补充数据】，不参与评分体系 ——
 * 用于在区详情页呈现居住成本参考，帮助用户横向比较。
 */

export interface HousingPrice {
  price: number; // 二手房均价/挂牌均价（元/㎡）
  year: number;
  source: string;
}

// 上海各区 2024年二手房均价（元/㎡）
const SHANGHAI_HOUSING: Record<string, HousingPrice> = {
  '310101': { price: 126724, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 黄浦
  '310106': { price: 95063, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 静安
  '310104': { price: 86116, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 徐汇
  '310105': { price: 80776, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 长宁
  '310109': { price: 76928, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 虹口
  '310110': { price: 72940, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 杨浦
  '310115': { price: 71245, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 浦东
  '310107': { price: 68739, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 普陀
  '310112': { price: 62509, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 闵行
  '310118': { price: 54352, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 青浦
  '310113': { price: 49199, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 宝山
  '310117': { price: 47069, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 松江
  '310114': { price: 44352, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 嘉定
  '310120': { price: 25868, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 奉贤
  '310116': { price: 17734, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 金山
  '310151': { price: 17134, year: 2024, source: '聚汇数据2024年各区二手房均价' }, // 崇明
};

// 银川各区县 2025年二手房挂牌均价（元/㎡）
const YINCHUAN_HOUSING: Record<string, HousingPrice> = {
  '640106': { price: 8254, year: 2025, source: '中国房价行情2025年挂牌均价' }, // 金凤区
  '640104': { price: 7111, year: 2025, source: '中国房价行情2025年挂牌均价' }, // 兴庆区
  '640105': { price: 5506, year: 2025, source: '中国房价行情2025年挂牌均价' }, // 西夏区
  '640122': { price: 5279, year: 2025, source: '中国房价行情2025年挂牌均价' }, // 贺兰县
  '640121': { price: 4698, year: 2025, source: '中国房价行情2025年挂牌均价' }, // 永宁县
  // 灵武市 creprice 未单列2025挂牌数据，采用吉屋网2025年5月数据（4523元/㎡）
  '640181': { price: 4523, year: 2025, source: '吉屋网2025年5月二手房均价' }, // 灵武市
};

const CITY_HOUSING: Record<string, Record<string, HousingPrice>> = {
  shanghai: SHANGHAI_HOUSING,
  yinchuan: YINCHUAN_HOUSING,
};

export function getHousingPrice(cityKey: string, adcode: string): HousingPrice | undefined {
  return CITY_HOUSING[cityKey]?.[adcode];
}
