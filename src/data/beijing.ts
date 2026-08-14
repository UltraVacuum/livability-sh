/**
 * 北京市区级基础数据（第 3 城市）— 2024 年口径。
 *
 * 来源与估算方法（详见 PROVENANCE.md 第 79 章）：
 *   • 人口：北京统计年鉴 2025（2024 年末常住人口）+ 各区区域统计公报，
 *     密度 = 年末常住人口 ÷ 行政区面积。
 *   • 经济：2024 年居民人均可支配收入。全市 85,415 元（2024 年北京市统计公报），
 *     区级按公开梯度估算（城区 8–11 万 / 平原新城 6–7 万 / 生态涵养区 4.5–5.5 万）。
 *   • 教育/医疗/交通/生活：区级机构数量按市级公开总量（统计年鉴/教委/卫健委）
 *     结合城区—郊区梯度估算，口径对齐上海/银川的 POI 计数量级（幼儿园+小学+中学、
 *     综合与专科医院、轨道交通及公共交通站点、商场+公园广场），用于城市内横向对比。
 *
 * ⚠️ 北京四个密度维度为公开总量×梯度估算（非逐 POI 采集），页面已标注「估算」。
 */

export interface BeijingDistrict {
  adcode: string;
  name: string;
  areaKm2: number;
  popWan: number; // 2024 年末常住人口（万人）
  density: number; // 人/km²
  income: number; // 2024 居民人均可支配收入（元）
  incomeSource: string;
  counts: {
    education: number; // 幼儿园+小学+中学
    healthcare: number; // 综合与专科医院
    transit: number; // 轨道及公共交通站点
    amenity: number; // 商场+公园广场
  };
}

const INCOME_2024 = '2024 估算（各区公报/公开梯度 × 全市 85,415 元基准）';

export const BEIJING_DISTRICTS: BeijingDistrict[] = [
  { adcode: '110101', name: '东城区', areaKm2: 41.84, popWan: 70.5, density: 16851, income: 98000, incomeSource: INCOME_2024,
    counts: { education: 150, healthcare: 320, transit: 130, amenity: 120 } },
  { adcode: '110102', name: '西城区', areaKm2: 50.7, popWan: 110.2, density: 21736, income: 108000, incomeSource: INCOME_2024,
    counts: { education: 180, healthcare: 360, transit: 140, amenity: 130 } },
  { adcode: '110105', name: '朝阳区', areaKm2: 470.8, popWan: 343.2, density: 7290, income: 95000, incomeSource: INCOME_2024,
    counts: { education: 480, healthcare: 520, transit: 350, amenity: 430 } },
  { adcode: '110106', name: '丰台区', areaKm2: 305.53, popWan: 201.5, density: 6595, income: 82000, incomeSource: INCOME_2024,
    counts: { education: 330, healthcare: 300, transit: 220, amenity: 250 } },
  { adcode: '110107', name: '石景山区', areaKm2: 84.38, popWan: 56.2, density: 6660, income: 81000, incomeSource: INCOME_2024,
    counts: { education: 95, healthcare: 90, transit: 70, amenity: 75 } },
  { adcode: '110108', name: '海淀区', areaKm2: 430.77, popWan: 311.5, density: 7232, income: 102000, incomeSource: INCOME_2024,
    counts: { education: 560, healthcare: 550, transit: 380, amenity: 400 } },
  { adcode: '110109', name: '门头沟区', areaKm2: 1450.7, popWan: 39.0, density: 269, income: 60000, incomeSource: INCOME_2024,
    counts: { education: 55, healthcare: 45, transit: 25, amenity: 40 } },
  { adcode: '110111', name: '房山区', areaKm2: 2019.0, popWan: 130.8, density: 648, income: 59000, incomeSource: INCOME_2024,
    counts: { education: 200, healthcare: 130, transit: 80, amenity: 100 } },
  { adcode: '110112', name: '通州区', areaKm2: 906.0, popWan: 184.1, density: 2032, income: 68000, incomeSource: INCOME_2024,
    counts: { education: 250, healthcare: 180, transit: 120, amenity: 130 } },
  { adcode: '110113', name: '顺义区', areaKm2: 1019.9, popWan: 132.8, density: 1302, income: 64000, incomeSource: INCOME_2024,
    counts: { education: 200, healthcare: 120, transit: 90, amenity: 100 } },
  { adcode: '110114', name: '昌平区', areaKm2: 1343.5, popWan: 227.3, density: 1692, income: 65000, incomeSource: INCOME_2024,
    counts: { education: 320, healthcare: 190, transit: 150, amenity: 160 } },
  { adcode: '110115', name: '大兴区', areaKm2: 1036.0, popWan: 199.7, density: 1928, income: 62000, incomeSource: INCOME_2024,
    counts: { education: 280, healthcare: 170, transit: 130, amenity: 140 } },
  { adcode: '110116', name: '怀柔区', areaKm2: 2122.6, popWan: 44.2, density: 208, income: 53000, incomeSource: INCOME_2024,
    counts: { education: 75, healthcare: 55, transit: 35, amenity: 40 } },
  { adcode: '110117', name: '平谷区', areaKm2: 948.24, popWan: 45.6, density: 481, income: 49000, incomeSource: INCOME_2024,
    counts: { education: 100, healthcare: 70, transit: 45, amenity: 50 } },
  { adcode: '110118', name: '密云区', areaKm2: 2229.45, popWan: 52.5, density: 236, income: 47000, incomeSource: INCOME_2024,
    counts: { education: 120, healthcare: 80, transit: 50, amenity: 55 } },
  { adcode: '110119', name: '延庆区', areaKm2: 1993.75, popWan: 34.5, density: 173, income: 45000, incomeSource: INCOME_2024,
    counts: { education: 90, healthcare: 60, transit: 40, amenity: 45 } },
];

export function beijingIncomeSource(adcode: string): string | undefined {
  return BEIJING_DISTRICTS.find((d) => d.adcode === adcode)?.incomeSource;
}
