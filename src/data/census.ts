/**
 * Population data — official, most-recent available per city.
 *
 * 上海: 上海统计年鉴 表2.2（2025版 = 2024年末）— official 行政区域面积、
 *      年末常住人口、人口密度。比 GeoJSON 面积更准（剔除水域），且为 2024 当前值。
 *      2024年全市常住人口2,480.26万人（来源：2024年上海市统计公报）。
 * 银川: 2025年统计公报（年末常住人口294.26万人，城镇247.70万人）
 *      + 宁夏统计年鉴2023 各区县人口（2022年末），用于分区密度计算。
 */

/** 上海 2024年末 official (上海统计年鉴2025版 表2.2). */
export interface OfficialDistrict {
  area_km2: number;
  pop_wan: number; // 年末常住人口（万人）
  density: number; // 人口密度（人/km²）
}

export const SH_OFFICIAL_2024: Record<string, OfficialDistrict> = {
  '310101': { area_km2: 20.46, pop_wan: 50.34, density: 24604 }, // 黄浦
  '310104': { area_km2: 54.76, pop_wan: 109.93, density: 20075 }, // 徐汇
  '310105': { area_km2: 38.3, pop_wan: 68.53, density: 17893 }, // 长宁
  '310106': { area_km2: 36.88, pop_wan: 92.93, density: 25198 }, // 静安
  '310107': { area_km2: 54.83, pop_wan: 124.87, density: 22774 }, // 普陀
  '310109': { area_km2: 23.48, pop_wan: 67.99, density: 28957 }, // 虹口
  '310110': { area_km2: 60.73, pop_wan: 119.97, density: 19755 }, // 杨浦
  '310112': { area_km2: 370.75, pop_wan: 272.5, density: 7350 }, // 闵行
  '310113': { area_km2: 270.99, pop_wan: 226.39, density: 8354 }, // 宝山
  '310114': { area_km2: 464.2, pop_wan: 189.04, density: 4072 }, // 嘉定
  '310115': { area_km2: 1210.41, pop_wan: 578.58, density: 4780 }, // 浦东
  '310116': { area_km2: 586.05, pop_wan: 81.23, density: 1386 }, // 金山
  '310117': { area_km2: 605.64, pop_wan: 195.89, density: 3234 }, // 松江
  '310118': { area_km2: 670.14, pop_wan: 128.77, density: 1922 }, // 青浦
  '310120': { area_km2: 687.39, pop_wan: 113.95, density: 1658 }, // 奉贤
  '310151': { area_km2: 1185.49, pop_wan: 59.35, density: 501 }, // 崇明
};

/** 银川 — 宁夏统计年鉴2023（4-6 各市县人口总数，2022年末）用于分区基线。
 * 全市2025年末常住人口294.26万人，城镇247.70万人（来源：银川市2025年统计公报）。
 * 2022→2025市级增量+4.58万人按区 proportional 分摊，更新各分区2025估算值。
 * 来源：https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 */
export interface CityCensus {
  year: number;
  source: string;
  pop: Record<string, number>;
}

// 2022区级基线总和=2,896,800; 2025市级=2,942,600; 增量+45,800
// 按区 proportional: 兴庆+12,905 / 西夏+7,193 / 金凤+10,398 / 永宁+5,150 / 贺兰+5,473 / 灵武+4,696
export const CENSUS: Record<string, CityCensus> = {
  yinchuan: {
    year: 2025,
    source: '宁夏统计年鉴2023（2022区级基线）× 2025市级294.26万比例调整（银川市2025年统计公报）',
    pop: {
      '640104': 828705, // 兴庆 815800+12905
      '640105': 461993, // 西夏 454800+7193
      '640106': 667998, // 金凤 657600+10398
      '640121': 330750, // 永宁 325600+5150
      '640122': 351573, // 贺兰 346100+5473
      '640181': 301596, // 灵武 296900+4696
    },
  },
};
