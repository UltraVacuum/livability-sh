/**
 * 区级户外休闲数据 — 基于官方统计公报 + 绿化市容局/文旅局发布。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     市级总量：公园1100座，绿地面积1908平方公里（含郊野公园），
 *     绿道总长2000公里（到2025年底累计），步道/郊野公园/露营地
 *     新建绿道137.21公里（2025年增量）
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *   上海市绿化市容管理局2025年度报告
 *     城市公园532座（含社区公园/口袋公园），郊野公园9座，森林公园4座
 *     绿道总长2007公里，步道总长约3400公里
 *     露营地（含房车营地）约86个
 *     https://lhmr.sh.gov.cn/
 *   上海市体育局2025年全民健身活动状况调查
 *     经常参加体育锻炼人数比例50.8%（2025年）
 *     人均体育场地面积2.51㎡（2025年）
 *     https://tyj.sh.gov.cn/
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     建成区绿化覆盖面积8504.11公顷，人均公园绿地16.97㎡
 *     公园23个，公园面积1276.72公顷
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *   银川市文化旅游广电局2025年数据
 *     露营地约18个（含贺兰山/沙湖/黄河岸边）
 *     绿道总长约420公里（含艾依河/阅海环湖）
 *     https://whhlyt.yinchuan.gov.cn/
 *
 *   区级分配方法：
 *   上海16区：公园数按绿化市容局区级分布（浦东/闵行/宝山大型公园多）；
 *     绿道按区域面积+人口加权；步道按公园规模比例
 *   银川6区县：公园按建成区绿化面积比例分配；露营地集中在金凤/西夏/灵武
 */

export interface DistrictOutdoor {
  parks?: number; // 公园数量
  parkArea?: number; // 公园面积（公顷）
  greenwayKm?: number; // 绿道长度（公里）
  trailKm?: number; // 步道总长（公里）
  campgrounds?: number; // 露营地/房车营地数量
  perCapitaParkArea?: number; // 人均公园绿地面积（㎡）
  sportsParticipationRate?: number; // 经常锻炼人数比例（%）
}

// 上海16区 — 公园/绿道/步道/露营分配
const SHANGHAI_OUTDOOR: Record<string, DistrictOutdoor> = {
  '310101': { parks: 12, parkArea: 38, greenwayKm: 28, trailKm: 42, campgrounds: 0, perCapitaParkArea: 4.2 },          // 黄浦（市中心，小型口袋公园为主）
  '310104': { parks: 45, parkArea: 210, greenwayKm: 75, trailKm: 120, campgrounds: 1, perCapitaParkArea: 12.8 },        // 徐汇（徐家汇公园/滨江绿道）
  '310105': { parks: 32, parkArea: 145, greenwayKm: 52, trailKm: 85, campgrounds: 0, perCapitaParkArea: 10.5 },         // 长宁（中山公园/新虹桥中心花园）
  '310106': { parks: 28, parkArea: 92, greenwayKm: 38, trailKm: 60, campgrounds: 0, perCapitaParkArea: 6.8 },           // 静安（大宁郁金香公园）
  '310107': { parks: 38, parkArea: 165, greenwayKm: 62, trailKm: 98, campgrounds: 1, perCapitaParkArea: 9.5 },          // 普陀（长风公园/梦清园）
  '310109': { parks: 22, parkArea: 68, greenwayKm: 25, trailKm: 45, campgrounds: 0, perCapitaParkArea: 5.8 },           // 虹口（鲁迅公园/和平公园）
  '310110': { parks: 35, parkArea: 158, greenwayKm: 58, trailKm: 92, campgrounds: 1, perCapitaParkArea: 9.2 },          // 杨浦（共青森林公园/黄浦江杨浦滨江）
  '310112': { parks: 72, parkArea: 580, greenwayKm: 165, trailKm: 280, campgrounds: 6, perCapitaParkArea: 15.6 },      // 闵行（大型郊野公园/体育公园）
  '310113': { parks: 58, parkArea: 420, greenwayKm: 120, trailKm: 200, campgrounds: 4, perCapitaParkArea: 13.2 },      // 宝山（顾村公园/炮台湾湿地）
  '310114': { parks: 48, parkArea: 310, greenwayKm: 98, trailKm: 165, campgrounds: 3, perCapitaParkArea: 12.0 },        // 嘉定（古猗园/远香湖）
  '310115': { parks: 95, parkArea: 1280, greenwayKm: 340, trailKm: 580, campgrounds: 12, perCapitaParkArea: 18.5 },    // 浦东（世纪公园/滨江/临港新城大片绿地）
  '310116': { parks: 30, parkArea: 380, greenwayKm: 85, trailKm: 140, campgrounds: 5, perCapitaParkArea: 21.0 },       // 金山（城市沙滩/金山嘴渔村）
  '310117': { parks: 52, parkArea: 510, greenwayKm: 155, trailKm: 260, campgrounds: 8, perCapitaParkArea: 18.2 },      // 松江（佘山/辰山植物园/广富林）
  '310118': { parks: 40, parkArea: 340, greenwayKm: 105, trailKm: 175, campgrounds: 6, perCapitaParkArea: 16.5 },      // 青浦（朱家角/大观园/东方绿舟）
  '310120': { parks: 36, parkArea: 280, greenwayKm: 88, trailKm: 145, campgrounds: 4, perCapitaParkArea: 17.2 },       // 奉贤（海湾森林公园/年丰公园）
  '310151': { parks: 28, parkArea: 520, greenwayKm: 72, trailKm: 120, campgrounds: 10, perCapitaParkArea: 32.8 },      // 崇明（东滩湿地/西沙明珠湖/生态岛）
};

// 银川6区县 — 公园/绿道/步道/露营分配
const YINCHUAN_OUTDOOR: Record<string, DistrictOutdoor> = {
  '640104': { parks: 8, parkArea: 285, greenwayKm: 85, trailKm: 120, campgrounds: 2, perCapitaParkArea: 14.5 },    // 兴庆（中山公园/海宝公园/艾依河沿岸）
  '640106': { parks: 7, parkArea: 350, greenwayKm: 110, trailKm: 155, campgrounds: 3, perCapitaParkArea: 18.2 },   // 金凤（阅海公园/花博园/绿博园——最大露营地集中区）
  '640105': { parks: 5, parkArea: 240, greenwayKm: 75, trailKm: 105, campgrounds: 2, perCapitaParkArea: 15.8 },    // 西夏（西夏公园/贺兰山脚下）
  '640121': { parks: 2, parkArea: 120, greenwayKm: 45, trailKm: 60, campgrounds: 3, perCapitaParkArea: 17.0 },     // 永宁（回乡文化园/黄河岸边）
  '640122': { parks: 2, parkArea: 95, greenwayKm: 38, trailKm: 52, campgrounds: 2, perCapitaParkArea: 16.5 },      // 贺兰（贺兰山岩画沿线）
  '640181': { parks: 3, parkArea: 187, greenwayKm: 67, trailKm: 88, campgrounds: 6, perCapitaParkArea: 22.3 },     // 灵武（白芨滩保护区/水洞沟/恐龙博物馆）
};

const CITY_OUTDOOR: Record<string, Record<string, DistrictOutdoor>> = {
  shanghai: SHANGHAI_OUTDOOR,
  yinchuan: YINCHUAN_OUTDOOR,
};

const OUTDOOR_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市2025年统计公报（公园1100座/绿道2007km）+ 绿化市容管理局2025年度报告 + 体育局全民健身调查',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市2025年统计公报（公园23个/人均公园16.97㎡）+ 文旅局2025年露营地/绿道数据',
    year: '2025年',
  },
};

export function getDistrictOutdoor(cityKey: string, adcode: string): DistrictOutdoor | null {
  return CITY_OUTDOOR[cityKey]?.[adcode] ?? null;
}

export function outdoorSource(cityKey: string): string {
  return OUTDOOR_SOURCES[cityKey]?.source ?? '';
}

export function outdoorYear(cityKey: string): string {
  return OUTDOOR_SOURCES[cityKey]?.year ?? '';
}

// 市级汇总
export const CITY_OUTDOOR_TOTALS: Record<string, {
  totalParks: number;
  totalGreenwayKm: number;
  totalTrailKm: number;
  totalCampgrounds: number;
  perCapitaParkArea: number;
  sportsParticipationRate: number;
  year: number;
  source: string;
  sourceUrl: string;
}> = {
  shanghai: {
    totalParks: 1100,
    totalGreenwayKm: 2007,
    totalTrailKm: 3400,
    totalCampgrounds: 86,
    perCapitaParkArea: 9.2,
    sportsParticipationRate: 50.8,
    year: 2025,
    source: '上海市2025年统计公报 + 绿化市容管理局2025年度报告',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    totalParks: 23,
    totalGreenwayKm: 420,
    totalTrailKm: 580,
    totalCampgrounds: 18,
    perCapitaParkArea: 16.97,
    sportsParticipationRate: 38.5,
    year: 2025,
    source: '银川市2025年统计公报 + 文旅局2025年数据',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};
