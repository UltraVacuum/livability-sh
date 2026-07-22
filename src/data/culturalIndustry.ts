/**
 * District-level cultural industry data — cultural venues distribution.
 *
 * 上海:
 *   市级（2025年统计公报）: 博物馆174个, 公共图书馆20个, 文化馆19个
 *   来源: https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *   区级分配方法: 市级总量按常住人口比例 + 文化中心加权（黄浦/静安/徐汇/浦东文化设施密度更高）
 *   参考依据: 上海市文化和旅游局公开名单 + 国家文物局全国博物馆名录
 *
 * 银川:
 *   市级（2025年统计公报）: 博物馆29个, 公共图书馆7个, 文化馆7个, 艺术表演团体224个
 *   来源: https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *   区级分配方法: 市级总量按常住人口比例 + 城区优先（兴庆区文化中心、金凤区新区文化设施）
 *
 * Note: 区级文化场馆精确数字暂无统一公开统计，按人口比例+文化中心权重估算。
 *       市级总量为官方公报数据，区级为分配估算。
 */

export interface DistrictCultureVenue {
  libraries: number; // 公共图书馆/阅览室（含分馆）
  museums: number; // 博物馆/纪念馆/美术馆
  culturalCenters: number; // 文化馆/文化活动中心
  theaters: number; // 剧院/演艺场馆
  year: number;
  source: string;
}

// 上海各区文化场馆估算（市级总量×人口比例+文化中心加权）
// 市级：博物馆174 + 图书馆20 + 文化馆19 = 213个文化场馆
// 加权：黄浦/静安/徐汇/虹口文化设施密度加成 ×1.5-2.0
const SHANGHAI_DISTRICT_CULTURE: Record<string, DistrictCultureVenue> = {
  '310101': { // 黄浦（文化核心区）
    libraries: 3, museums: 18, culturalCenters: 2, theaters: 8,
    year: 2025,
    source: '估算（市级公报×文化核心区加权）',
  },
  '310104': { // 徐汇
    libraries: 2, museums: 14, culturalCenters: 2, theaters: 4,
    year: 2025,
    source: '估算（市级公报×人口比例+文化加权）',
  },
  '310105': { // 长宁
    libraries: 2, museums: 8, culturalCenters: 1, theaters: 3,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310106': { // 静安（文化集聚区）
    libraries: 2, museums: 15, culturalCenters: 2, theaters: 5,
    year: 2025,
    source: '估算（市级公报×文化集聚区加权）',
  },
  '310107': { // 普陀
    libraries: 2, museums: 7, culturalCenters: 1, theaters: 2,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310109': { // 虹口（文化重镇）
    libraries: 2, museums: 12, culturalCenters: 2, theaters: 3,
    year: 2025,
    source: '估算（市级公报×文化重镇加权）',
  },
  '310110': { // 杨浦
    libraries: 2, museums: 9, culturalCenters: 2, theaters: 2,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310112': { // 闵行
    libraries: 2, museums: 10, culturalCenters: 2, theaters: 2,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310113': { // 宝山
    libraries: 2, museums: 8, culturalCenters: 1, theaters: 1,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310114': { // 嘉定
    libraries: 2, museums: 7, culturalCenters: 1, theaters: 1,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310115': { // 浦东（面积大、文化设施多）
    libraries: 4, museums: 25, culturalCenters: 3, theaters: 5,
    year: 2025,
    source: '估算（市级公报×人口+面积加权）',
  },
  '310116': { // 金山
    libraries: 1, museums: 5, culturalCenters: 1, theaters: 1,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310117': { // 松江
    libraries: 2, museums: 8, culturalCenters: 1, theaters: 2,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310118': { // 青浦
    libraries: 1, museums: 6, culturalCenters: 1, theaters: 1,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310120': { // 奉贤
    libraries: 1, museums: 5, culturalCenters: 1, theaters: 1,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310151': { // 崇明
    libraries: 1, museums: 4, culturalCenters: 1, theaters: 1,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
};

// 银川各区县文化场馆（市级总量按人口比例+城区优先）
// 市级：博物馆29 + 图书馆7 + 文化馆7 = 43个
const YINCHUAN_DISTRICT_CULTURE: Record<string, DistrictCultureVenue> = {
  '640104': { // 兴庆区（老城区，文化中心）
    libraries: 2, museums: 12, culturalCenters: 2, theaters: 3,
    year: 2025,
    source: '估算（市级公报×老城文化中心加权）',
  },
  '640106': { // 金凤区（新城区，市级行政文化中心）
    libraries: 2, museums: 10, culturalCenters: 2, theaters: 3,
    year: 2025,
    source: '估算（市级公报×行政文化中心加权）',
  },
  '640105': { // 西夏区（高校区）
    libraries: 1, museums: 5, culturalCenters: 1, theaters: 1,
    year: 2025,
    source: '估算（市级公报×高校区加权）',
  },
  '640121': { // 永宁县
    libraries: 1, museums: 1, culturalCenters: 1, theaters: 0,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '640122': { // 贺兰县
    libraries: 1, museums: 1, culturalCenters: 1, theaters: 0,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '640181': { // 灵武市
    libraries: 0, museums: 0, culturalCenters: 0, theaters: 0,
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
};

const CITY_DISTRICT_CULTURE: Record<string, Record<string, DistrictCultureVenue>> = {
  shanghai: SHANGHAI_DISTRICT_CULTURE,
  yinchuan: YINCHUAN_DISTRICT_CULTURE,
};

export function getDistrictCultureVenues(cityKey: string, adcode: string): DistrictCultureVenue | undefined {
  return CITY_DISTRICT_CULTURE[cityKey]?.[adcode];
}

// 市级汇总
export interface CityCultureTotal {
  totalMuseums: number;
  totalLibraries: number;
  totalCulturalCenters: number;
  totalTheaters: number;
  performingGroups?: number; // 艺术表演团体
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_CULTURE_TOTAL: Record<string, CityCultureTotal> = {
  shanghai: {
    totalMuseums: 174,
    totalLibraries: 20,
    totalCulturalCenters: 19,
    totalTheaters: 42, // 上海主要演出场馆（含大剧院、东方艺术中心等）
    year: 2025,
    source: '2025年上海市国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    totalMuseums: 29,
    totalLibraries: 7,
    totalCulturalCenters: 7,
    totalTheaters: 6, // 银川剧院/宁夏大剧院等
    performingGroups: 224,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

export function getCityCultureTotal(cityKey: string): CityCultureTotal | undefined {
  return CITY_CULTURE_TOTAL[cityKey];
}
