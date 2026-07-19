/**
 * 市级旅游数据 — 基于官方统计公报与文旅局发布。
 *
 * 来源：
 *   上海：上海市文旅局《2025年上海市旅游发展主要统计数据》（2026-04发布）
 *     入境游客936.02万人次（+39.6%），入境过夜878.94万人次（+45.1%）
 *     国内游客41644.27万人次（+6.7%），外省市来沪17148.69万人次（+11.9%）
 *     国际旅游收入148.35亿美元（+33.8%），国内旅游收入5666.81亿元（+14.0%）
 *     A级景区144个（5A 5个，4A 71个），星级饭店142家（五星54），旅行社2025家
 *     红色旅游基地34个，旅游咨询服务中心61个
 *     https://whlyj.sh.gov.cn/tjzl/20260429/1b46304182244ba4a56dc30fbb7c7b60.html
 *
 *   银川：银川市2025年国民经济和社会发展统计公报
 *     铁路客运714.98万人（+5.9%），民航客运469.14万人（+10.4%）
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *     文旅局数据：博物馆29个，公共图书馆7个，文化馆7个
 *     A级景区：西夏陵（5A/世界遗产）、镇北堡西部影城、贺兰山岩画、水洞沟等
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/sjtj/202604/t20260427_5226198.html
 *
 *     "五一"假期接待298.63万人次，旅游花费13.64亿
 *     "双节"假期接待411.4万人次（+10.5%），旅游花费27.13亿（+13.1%）
 *     https://www.yinchuan.gov.cn/xwzx/mrdt/202510/t20251009_5047210.html
 */

export interface CityTourism {
  inboundTourists?: number; // 入境游客（万人次）
  domesticTourists?: number; // 国内游客（万人次）
  internationalRevenue?: number; // 国际旅游收入（亿美元）
  domesticRevenue?: number; // 国内旅游收入（亿元）
  aLevelAttractions?: number; // A级旅游景区（个）
  fiveALevel?: number; // 5A级景区（个）
  fourALevel?: number; // 4A级景区（个）
  starHotels?: number; // 星级饭店（家）
  travelAgencies?: number; // 旅行社（家）
  redTourismBases?: number; // 红色旅游基地（个）
  railwayPassengers?: number; // 铁路客运量（万人）
  civilAviationPassengers?: number; // 民航客运量（万人）
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_TOURISM: Record<string, CityTourism> = {
  shanghai: {
    inboundTourists: 936.02,
    domesticTourists: 41644.27,
    internationalRevenue: 148.35,
    domesticRevenue: 5666.81,
    aLevelAttractions: 144,
    fiveALevel: 5,
    fourALevel: 71,
    starHotels: 142,
    travelAgencies: 2025,
    redTourismBases: 34,
    year: 2025,
    source: '上海市文旅局《2025年上海市旅游发展主要统计数据》',
    sourceUrl: 'https://whlyj.sh.gov.cn/tjzl/20260429/1b46304182244ba4a56dc30fbb7c7b60.html',
  },
  yinchuan: {
    railwayPassengers: 714.98,
    civilAviationPassengers: 469.14,
    aLevelAttractions: 30,
    starHotels: 45,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

const TOURISM_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市文旅局《2025年上海市旅游发展主要统计数据》（2026-04发布）',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报（铁路/民航客运）+ 银川市文旅局（景区/酒店估算）',
    year: '2025年',
  },
};

export function tourismSource(cityKey: string): string {
  return TOURISM_SOURCES[cityKey]?.source ?? '';
}

export function tourismYear(cityKey: string): string {
  return TOURISM_SOURCES[cityKey]?.year ?? '';
}

export function getCityTourism(cityKey: string): CityTourism | undefined {
  return CITY_TOURISM[cityKey];
}
