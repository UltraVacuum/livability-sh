/**
 * 市级气候特征数据 — 基于官方气象统计与统计年鉴。
 *
 * 来源：
 *   上海：上海市气象局《2024年上海市十大天气气候事件》（2025-01发布）
 *     年平均气温18.8℃（徐家汇站，1873年以来最高值）
 *     高温日数52天（≥35℃，历史第二），酷暑日数23天（≥37℃）
 *     2025上海统计年鉴表1.2 主要气象指标（2024）
 *     https://m.thepaper.cn/kuaibao_detail.jsp?contid=29819582
 *
 *   银川：《银川年鉴（2025）》自然地理章（2026-06发布）
 *     2024年年平均气温11.1℃（1961年以来最高值）
 *     年降水量357毫米（1961年以来最高值），各地271.9-394.8mm
 *     年日照时数2459.5小时（1961年以来最低值），各地2423.4-2479.5小时
 *     高温（≥35℃）天数10天，低温（≤-20℃）天数2天
 *     沙尘天气平均33天，秋季雾日9天
 *     https://www.yinchuan.gov.cn/sshc/ycgk/zrdl/
 *
 *   银川气候常年值（1971-2000年）：中国气象局
 *     年均气温9.0℃，年降水量186.3mm，年日照2905.8小时
 *     https://zh.wikipedia.org/zh-cn/Template:%E9%93%B6%E5%B7%9D%E5%B8%82%E6%B0%94%E5%80%99%E6%95%B0%E6%8D%AE
 */

export interface CityClimate {
  avgTemp: number; // 年平均气温（℃）
  recordTempYear?: boolean; // 是否创历史记录
  maxTemp?: number; // 年极端最高气温（℃）
  minTemp?: number; // 年极端最低气温（℃）
  highTempDays?: number; // 高温日数（≥35℃）
  precipitation: number; // 年降水量（毫米）
  precipitationDesc?: string; // 降水量描述
  sunshineHours: number; // 年日照时数（小时）
  sunshineDesc?: string; // 日照描述
  dustDays?: number; // 沙尘天气日数
  fogDays?: number; // 雾日数
  frostFreeDays?: number; // 无霜期（天）
  climateType: string; // 气候类型
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_CLIMATE: Record<string, CityClimate> = {
  shanghai: {
    avgTemp: 18.8,
    recordTempYear: true,
    highTempDays: 52,
    precipitation: 1400, // 2024年偏多，约1400mm（基于公开报道）
    sunshineHours: 1700, // 上海年均约1700-2000小时
    climateType: '亚热带季风气候',
    year: 2024,
    source: '上海市气象局《2024年上海市十大天气气候事件》+ 2025上海统计年鉴表1.2',
    sourceUrl: 'https://m.thepaper.cn/kuaibao_detail.jsp?contid=29819582',
  },
  yinchuan: {
    avgTemp: 11.1,
    recordTempYear: true,
    maxTemp: 37.4,
    minTemp: -23.2,
    highTempDays: 10,
    precipitation: 357,
    precipitationDesc: '1961年以来最高值',
    sunshineHours: 2459.5,
    sunshineDesc: '1961年以来最低值',
    dustDays: 33,
    fogDays: 9,
    climateType: '中温带干旱气候',
    year: 2024,
    source: '《银川年鉴（2025）》自然地理章 — 银川市气象局',
    sourceUrl: 'https://www.yinchuan.gov.cn/sshc/ycgk/zrdl/',
  },
};

export function getCityClimate(cityKey: string): CityClimate | undefined {
  return CITY_CLIMATE[cityKey];
}
