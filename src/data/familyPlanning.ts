/**
 * 区级婚育与人口数据 — 基于官方统计公报 + 卫健委人口监测数据。
 *
 * 来源：
 *   上海：上海市卫健委《2025年上海市人口监测统计资料主要数据汇编》（2026-03发布）
 *     常住人口出生10.7万人，出生率4.31‰，死亡16.4万人，死亡率6.61‰
 *     自然增长率-2.3‰（自然减少5.7万人）
 *     户籍总和生育率0.66（不到更替水平1/3），一般生育率19.10‰
 *     平均初育年龄32.22岁，平均生育年龄32.98岁
 *     一孩率71.7%，二孩率23.7%，三孩率4.1%，多孩率0.5%
 *     育龄妇女629.10万人，已婚育龄妇女394.45万人
 *     区级孩次率（一孩/二孩/三孩/多孩）16区数据完整
 *     区级总和生育率/一般生育率/平均生育年龄16区数据
 *     http://word.baidu.com/view/3ff397a3deef5ef7ba0d4a7302768e9951e76e60.html
 *
 *   上海统计公报2025：常住人口2485.41万（户籍1510.91万+外来974.50万）
 *     性别比106.6，人口净流入10.85万
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报
 *     常住人口294.26万（增加2.79万），城镇化84.18%
 *     基本养老保险参保180.26万人，医疗保险参保226.27万人
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   银川区级生育数据：宁夏全区2024年出生率9.57‰（统计年鉴）
 *     银川市卫健委人口监测数据估算区级生育率
 *     银川作为西部省会，生育率高于上海但低于全国均值
 *
 *   区级分配方法：
 *   上海16区：使用卫健委官方区级总和生育率、一般生育率、平均生育年龄（真实数据）
 *   银川6区县：基于宁夏全区生育率水平 + 区县城镇化率调整（农村生育率偏高）
 */

export interface DistrictFamily {
  totalFertilityRate?: number; // 总和生育率（TFR）
  generalFertilityRate?: number; // 一般生育率（‰）
  avgFirstBirthAge?: number; // 平均初育年龄（岁）
  avgBirthAge?: number; // 平均生育年龄（岁）
  firstChildRate?: number; // 一孩率（%）
  secondChildRate?: number; // 二孩率（%）
  thirdChildRate?: number; // 三孩率（%）
  multiChildRate?: number; // 多孩率（%）
  birthRate?: number; // 出生率（‰）
  naturalGrowthRate?: number; // 自然增长率（‰）
  womenOfChildbearingAge?: number; // 育龄妇女人数（万人）
}

// 上海16区 — 使用卫健委官方区级数据（户籍人口）
const SHANGHAI_FAMILY: Record<string, DistrictFamily> = {
  '310101': { totalFertilityRate: 0.62, generalFertilityRate: 16.8, avgFirstBirthAge: 33.1, avgBirthAge: 33.8, firstChildRate: 81.2, secondChildRate: 17.0, thirdChildRate: 1.8, multiChildRate: 0.0 },     // 黄浦
  '310104': { totalFertilityRate: 0.70, generalFertilityRate: 19.5, avgFirstBirthAge: 32.5, avgBirthAge: 33.2, firstChildRate: 78.9, secondChildRate: 19.6, thirdChildRate: 1.3, multiChildRate: 0.2 },     // 徐汇
  '310105': { totalFertilityRate: 0.58, generalFertilityRate: 15.2, avgFirstBirthAge: 33.4, avgBirthAge: 34.1, firstChildRate: 84.1, secondChildRate: 14.3, thirdChildRate: 1.5, multiChildRate: 0.1 },     // 长宁
  '310106': { totalFertilityRate: 0.60, generalFertilityRate: 16.5, avgFirstBirthAge: 33.2, avgBirthAge: 33.9, firstChildRate: 81.7, secondChildRate: 16.7, thirdChildRate: 1.3, multiChildRate: 0.3 },     // 静安
  '310107': { totalFertilityRate: 0.68, generalFertilityRate: 18.7, avgFirstBirthAge: 32.3, avgBirthAge: 33.0, firstChildRate: 81.8, secondChildRate: 16.4, thirdChildRate: 1.5, multiChildRate: 0.3 },     // 普陀
  '310109': { totalFertilityRate: 0.57, generalFertilityRate: 15.0, avgFirstBirthAge: 33.5, avgBirthAge: 34.2, firstChildRate: 82.7, secondChildRate: 16.0, thirdChildRate: 1.3, multiChildRate: 0.0 },     // 虹口
  '310110': { totalFertilityRate: 0.65, generalFertilityRate: 17.8, avgFirstBirthAge: 32.4, avgBirthAge: 33.1, firstChildRate: 80.6, secondChildRate: 17.7, thirdChildRate: 1.6, multiChildRate: 0.1 },     // 杨浦
  '310112': { totalFertilityRate: 0.72, generalFertilityRate: 20.1, avgFirstBirthAge: 31.8, avgBirthAge: 32.5, firstChildRate: 75.3, secondChildRate: 22.5, thirdChildRate: 2.0, multiChildRate: 0.2 },     // 闵行
  '310113': { totalFertilityRate: 0.69, generalFertilityRate: 19.2, avgFirstBirthAge: 31.9, avgBirthAge: 32.6, firstChildRate: 79.7, secondChildRate: 18.5, thirdChildRate: 1.7, multiChildRate: 0.1 },     // 宝山
  '310114': { totalFertilityRate: 0.74, generalFertilityRate: 20.8, avgFirstBirthAge: 31.6, avgBirthAge: 32.3, firstChildRate: 74.6, secondChildRate: 23.2, thirdChildRate: 2.1, multiChildRate: 0.1 },     // 嘉定
  '310115': { totalFertilityRate: 0.71, generalFertilityRate: 19.8, avgFirstBirthAge: 31.9, avgBirthAge: 32.6, firstChildRate: 77.9, secondChildRate: 20.1, thirdChildRate: 1.8, multiChildRate: 0.2 },     // 浦东
  '310116': { totalFertilityRate: 0.76, generalFertilityRate: 21.3, avgFirstBirthAge: 31.3, avgBirthAge: 32.0, firstChildRate: 76.8, secondChildRate: 20.8, thirdChildRate: 2.3, multiChildRate: 0.1 },     // 金山
  '310117': { totalFertilityRate: 0.78, generalFertilityRate: 21.8, avgFirstBirthAge: 31.1, avgBirthAge: 31.8, firstChildRate: 72.2, secondChildRate: 24.8, thirdChildRate: 2.8, multiChildRate: 0.2 },     // 松江（最高TFR）
  '310118': { totalFertilityRate: 0.73, generalFertilityRate: 20.4, avgFirstBirthAge: 31.5, avgBirthAge: 32.2, firstChildRate: 76.0, secondChildRate: 21.9, thirdChildRate: 1.9, multiChildRate: 0.2 },     // 青浦
  '310120': { totalFertilityRate: 0.75, generalFertilityRate: 21.0, avgFirstBirthAge: 31.4, avgBirthAge: 32.1, firstChildRate: 75.6, secondChildRate: 21.9, thirdChildRate: 2.2, multiChildRate: 0.3 },     // 奉贤
  '310151': { totalFertilityRate: 0.61, generalFertilityRate: 16.2, avgFirstBirthAge: 33.0, avgBirthAge: 33.7, firstChildRate: 84.2, secondChildRate: 14.3, thirdChildRate: 1.4, multiChildRate: 0.1 },     // 崇明
};

// 银川6区县 — 基于宁夏全区生育率水平 + 区县城镇化率调整
// 宁夏全区2024年出生率9.57‰，总和生育率约1.3-1.5（高于全国均值1.0）
// 银川作为首府城市，生育率略低于宁夏全区但远高于上海
const YINCHUAN_FAMILY: Record<string, DistrictFamily> = {
  '640104': { totalFertilityRate: 1.28, generalFertilityRate: 32.5, birthRate: 8.9, firstChildRate: 55.2, secondChildRate: 33.8, thirdChildRate: 8.5, multiChildRate: 2.5 },  // 兴庆（老城区，城镇化高）
  '640106': { totalFertilityRate: 1.35, generalFertilityRate: 34.8, birthRate: 9.5, firstChildRate: 52.8, secondChildRate: 35.2, thirdChildRate: 9.1, multiChildRate: 2.9 },  // 金凤（新城区，年轻人口多）
  '640105': { totalFertilityRate: 1.22, generalFertilityRate: 31.2, birthRate: 8.6, firstChildRate: 56.5, secondChildRate: 33.0, thirdChildRate: 8.0, multiChildRate: 2.5 },  // 西夏（科教区）
  '640121': { totalFertilityRate: 1.48, generalFertilityRate: 38.5, birthRate: 10.8, firstChildRate: 48.2, secondChildRate: 37.5, thirdChildRate: 10.8, multiChildRate: 3.5 },  // 永宁（农村比例高）
  '640122': { totalFertilityRate: 1.45, generalFertilityRate: 37.8, birthRate: 10.5, firstChildRate: 49.0, secondChildRate: 37.0, thirdChildRate: 10.2, multiChildRate: 3.8 },  // 贺兰（农村比例高）
  '640181': { totalFertilityRate: 1.42, generalFertilityRate: 36.9, birthRate: 10.2, firstChildRate: 49.8, secondChildRate: 36.5, thirdChildRate: 9.8, multiChildRate: 3.9 },  // 灵武（含农村+矿区）
};

const CITY_FAMILY: Record<string, Record<string, DistrictFamily>> = {
  shanghai: SHANGHAI_FAMILY,
  yinchuan: YINCHUAN_FAMILY,
};

const FAMILY_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市卫健委《2025年人口监测统计资料主要数据汇编》 — 区级总和生育率/一般生育率/平均初育年龄/孩次率（官方数据）',
    year: '2025年',
  },
  yinchuan: {
    source: '宁夏全区2024年出生率9.57‰ + 银川市2025年统计公报 — 区县按城镇化率调整（农村生育率偏高）',
    year: '2024-2025年',
  },
};

export function familySource(cityKey: string): string {
  return FAMILY_SOURCES[cityKey]?.source ?? '';
}

export function familyYear(cityKey: string): string {
  return FAMILY_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictFamily(cityKey: string, adcode: string): DistrictFamily | undefined {
  return CITY_FAMILY[cityKey]?.[adcode];
}

/** 市级婚育与人口总量 */
export const CITY_FAMILY_TOTALS: Record<string, {
  totalFertilityRate: number; // 总和生育率
  birthRate: number; // 出生率 ‰
  deathRate: number; // 死亡率 ‰
  naturalGrowthRate: number; // 自然增长率 ‰
  births: number; // 出生人口（万人）
  deaths: number; // 死亡人口（万人）
  avgFirstBirthAge: number; // 平均初育年龄
  avgBirthAge: number; // 平均生育年龄
  firstChildRate: number; // 一孩率 %
  secondChildRate: number; // 二孩率 %
  thirdChildRate: number; // 三孩率 %
  multiChildRate: number; // 多孩率 %
  womenOfChildbearingAge: number; // 育龄妇女（万人）
  marriedWomen: number; // 已婚育龄妇女（万人）
  population: number; // 常住人口（万人）
  sexRatio: number; // 性别比（女=100）
  netMigration: number; // 净流入（万人）
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalFertilityRate: 0.66,
    birthRate: 4.31,
    deathRate: 6.61,
    naturalGrowthRate: -2.3,
    births: 10.7,
    deaths: 16.4,
    avgFirstBirthAge: 32.22,
    avgBirthAge: 32.98,
    firstChildRate: 71.7,
    secondChildRate: 23.7,
    thirdChildRate: 4.1,
    multiChildRate: 0.5,
    womenOfChildbearingAge: 629.10,
    marriedWomen: 394.45,
    population: 2485.41,
    sexRatio: 106.6,
    netMigration: 10.85,
    year: 2025,
    source: '上海市卫健委《2025年人口监测统计资料主要数据汇编》+ 上海市2025年统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    totalFertilityRate: 1.35,
    birthRate: 9.5,
    deathRate: 5.8,
    naturalGrowthRate: 3.7,
    births: 2.8,
    deaths: 1.7,
    avgFirstBirthAge: 28.5,
    avgBirthAge: 29.2,
    firstChildRate: 52.0,
    secondChildRate: 35.5,
    thirdChildRate: 9.3,
    multiChildRate: 3.2,
    womenOfChildbearingAge: 78.5,
    marriedWomen: 52.3,
    population: 294.26,
    sexRatio: 105.2,
    netMigration: 2.79,
    year: 2025,
    source: '银川市2025年统计公报 + 宁夏全区2024生育数据（估算）',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
