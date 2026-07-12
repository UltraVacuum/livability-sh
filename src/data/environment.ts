/**
 * City-level environment / air quality data — real official data.
 *
 * 上海: 2024年上海市国民经济和社会发展统计公报（上海市统计局, 2025-03-25）
 *   https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html
 * 银川: 银川市2025年国民经济和社会发展统计公报（银川市统计局, 2026-04-27）
 *   https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 * Note: 区级环境数据暂无公开来源，仅提供市级数据作为参考。
 */
export interface CityEnvironment {
  pm25: number; // PM2.5 年均浓度 (微克/立方米)
  aqiGoodRate: number; // AQI 优良率 (%)
  pm10?: number; // PM10 年均浓度 (微克/立方米)
  no2?: number; // 二氧化氮年日均值 (微克/立方米)
  so2?: number; // 二氧化硫年日均值 (微克/立方米)
  year: number;
  source: string;
  sourceUrl: string;
}

export const ENVIRONMENT: Record<string, CityEnvironment> = {
  shanghai: {
    pm25: 28,
    pm10: 43,
    no2: 30,
    so2: 7,
    aqiGoodRate: 88.5,
    year: 2024,
    source: '2024年上海市国民经济和社会发展统计公报（上海市生态环境局）',
    sourceUrl:
      'https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html',
  },
  yinchuan: {
    pm25: 30.4,
    aqiGoodRate: 88.2,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报（银川市生态环境局）',
    sourceUrl:
      'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

export function getEnvironment(cityKey: string): CityEnvironment | undefined {
  return ENVIRONMENT[cityKey];
}
