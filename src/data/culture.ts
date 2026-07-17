/**
 * City-level cultural facilities — real official data from statistical bulletins.
 *
 * 上海:
 *   博物馆/纪念馆: 174家（2025年上海市统计公报，市文旅局）
 *   来源: https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *   公共图书馆: 20家（2025年统计公报，含市级+区级）
 *
 * 银川: 银川市2025年国民经济和社会发展统计公报
 *   博物馆29个，公共图书馆7个，文化艺术馆/文化馆7个
 *   来源: https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *   银川2023年鉴文化场馆详情: 文化馆7个, 图书馆8家（含宁夏图书馆）
 *
 * Note: 区级文化设施暂无统一公开来源（上海博物馆有各区名单但图书馆/体育馆缺分区统计），
 * 仅提供市级数据作为参考展示。
 */

export interface CityCulture {
  museums?: number; // 博物馆/纪念馆数
  libraries?: number; // 公共图书馆数
  cultureCenters?: number; // 文化艺术馆/文化馆数
  newCultureSpaces?: number; // 新型公共文化空间数
  year: number;
  source: string;
  sourceUrl: string;
}

export const CULTURE: Record<string, CityCulture> = {
  shanghai: {
    museums: 174,
    libraries: 20,
    year: 2025,
    source: '2025年上海市国民经济和社会发展统计公报',
    sourceUrl:
      'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    museums: 29,
    libraries: 7,
    cultureCenters: 7,
    newCultureSpaces: 41,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl:
      'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

export function getCulture(cityKey: string): CityCulture | undefined {
  return CULTURE[cityKey];
}
