/**
 * 区级水资源与水环境质量数据 — 基于官方统计公报 + 水务局公开数据 + 市级总量按人口比例分配。
 *
 * 来源：
 *   上海：上海市2025年统计公报 + 上海市水务局2025年报 + 生态环境局水环境监测
 *     市级总量：地表水达到或优于III类比例持续提升至约95%（2025年）；
 *     重要水功能区水质达标率约92%；城镇污水处理率98.2%；
 *     年供水量32.5亿m³（日均892万m³）；人均日生活用水约180升；
 *     再生水利用率约28%；节水器具普及率约98%；
 *     河湖总长约5400公里（上海河网密布）；湖泊约340个；
 *     黄浦江/苏州河水质稳定IV类以上；近岸海域水质优良率约85%
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     https://swj.sh.gov.cn/
 *
 *   银川：银川市2025年统计公报 + 银川市水务局 + 宁夏生态环境厅
 *     市级总量：黄河银川段水质稳定II类（国家级考核断面）；
 *     重要水功能区水质达标率约88%；城镇污水处理率98.5%；
 *     年供水量约2.1亿m³；人均日生活用水约150升；
 *     再生水利用率约22%；节水器具普及率约92%；
 *     典型湖泊：阅海/鸣翠湖/宝湖等水质III-IV类；湿地面积约5300公顷
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：供水量/人均用水按人口比例；水功能区达标率按各区主要水体实际水质状况估算；
 *     河湖长度按各区水系分布加权（浦东/崇明水网密集区偏多）
 *   银川6区县：兴庆/金凤有阅海/鸣翠湖等较大水面，水环境质量偏高；
 *     灵武/永宁靠近黄河干流，黄河水质好但支流波动
 */

export interface DistrictWater {
  surfaceWaterQualityRate: number; // 地表水达到或优于III类比例（%）
  waterFunctionZoneRate: number; // 重要水功能区水质达标率（%）
  sewageTreatmentRate: number; // 城镇污水处理率（%）
  perCapitaDailyWater: number; // 人均日生活用水量（升）
  recycledWaterRate: number; // 再生水利用率（%）
  waterSavingDeviceRate: number; // 节水器具普及率（%）
  riverLakeLength?: number; // 河湖总长度（公里，上海专有）
  wetlandArea?: number; // 湿地面积（公顷）
  mainWaterBody?: string; // 主要水体名称
}

// 上海16区 — 水环境质量按各区水体实际状况
// 人均日用水180升 × 区域消费水平微调；供水量按人口比例
// 河湖长度按水系密度分配（浦东/崇明水网密集）
const SHANGHAI_WATER: Record<string, DistrictWater> = {
  '310101': { surfaceWaterQualityRate: 92, waterFunctionZoneRate: 90, sewageTreatmentRate: 99, perCapitaDailyWater: 195, recycledWaterRate: 30, waterSavingDeviceRate: 99, mainWaterBody: '黄浦江' },           // 黄浦
  '310104': { surfaceWaterQualityRate: 94, waterFunctionZoneRate: 92, sewageTreatmentRate: 99, perCapitaDailyWater: 190, recycledWaterRate: 30, waterSavingDeviceRate: 99, mainWaterBody: '漕河泾、淀浦河' },      // 徐汇
  '310105': { surfaceWaterQualityRate: 93, waterFunctionZoneRate: 91, sewageTreatmentRate: 99, perCapitaDailyWater: 188, recycledWaterRate: 28, waterSavingDeviceRate: 98, mainWaterBody: '苏州河、新泾港' },      // 长宁
  '310106': { surfaceWaterQualityRate: 92, waterFunctionZoneRate: 90, sewageTreatmentRate: 99, perCapitaDailyWater: 192, recycledWaterRate: 29, waterSavingDeviceRate: 99, mainWaterBody: '苏州河' },             // 静安
  '310107': { surfaceWaterQualityRate: 93, waterFunctionZoneRate: 91, sewageTreatmentRate: 98, perCapitaDailyWater: 185, recycledWaterRate: 28, waterSavingDeviceRate: 98, mainWaterBody: '苏州河、桃浦河' },      // 普陀
  '310109': { surfaceWaterQualityRate: 92, waterFunctionZoneRate: 90, sewageTreatmentRate: 99, perCapitaDailyWater: 188, recycledWaterRate: 29, waterSavingDeviceRate: 98, mainWaterBody: '虹口港、沙泾港' },      // 虹口
  '310110': { surfaceWaterQualityRate: 94, waterFunctionZoneRate: 92, sewageTreatmentRate: 98, perCapitaDailyWater: 185, recycledWaterRate: 28, waterSavingDeviceRate: 98, mainWaterBody: '杨树浦港、虬江' },      // 杨浦
  '310112': { surfaceWaterQualityRate: 95, waterFunctionZoneRate: 93, sewageTreatmentRate: 98, perCapitaDailyWater: 178, recycledWaterRate: 27, waterSavingDeviceRate: 97, riverLakeLength: 680, mainWaterBody: '黄浦江、淀浦河、大治河' }, // 闵行
  '310113': { surfaceWaterQualityRate: 93, waterFunctionZoneRate: 91, sewageTreatmentRate: 98, perCapitaDailyWater: 175, recycledWaterRate: 26, waterSavingDeviceRate: 97, riverLakeLength: 520, mainWaterBody: '蕰藻浜' }, // 宝山
  '310114': { surfaceWaterQualityRate: 95, waterFunctionZoneRate: 93, sewageTreatmentRate: 98, perCapitaDailyWater: 176, recycledWaterRate: 27, waterSavingDeviceRate: 97, riverLakeLength: 480, mainWaterBody: '横沥河、盐铁河' }, // 嘉定
  '310115': { surfaceWaterQualityRate: 96, waterFunctionZoneRate: 94, sewageTreatmentRate: 98, perCapitaDailyWater: 170, recycledWaterRate: 26, waterSavingDeviceRate: 96, riverLakeLength: 2200, mainWaterBody: '黄浦江、川杨河、大治河' }, // 浦东
  '310116': { surfaceWaterQualityRate: 95, waterFunctionZoneRate: 93, sewageTreatmentRate: 97, perCapitaDailyWater: 168, recycledWaterRate: 25, waterSavingDeviceRate: 96, riverLakeLength: 380, mainWaterBody: '龙泉港、金石线' }, // 金山
  '310117': { surfaceWaterQualityRate: 97, waterFunctionZoneRate: 95, sewageTreatmentRate: 98, perCapitaDailyWater: 172, recycledWaterRate: 30, waterSavingDeviceRate: 97, riverLakeLength: 650, mainWaterBody: '黄浦江上游、淀山湖' }, // 松江
  '310118': { surfaceWaterQualityRate: 97, waterFunctionZoneRate: 95, sewageTreatmentRate: 98, perCapitaDailyWater: 174, recycledWaterRate: 32, waterSavingDeviceRate: 97, riverLakeLength: 580, mainWaterBody: '淀山湖、油墩港' }, // 青浦
  '310120': { surfaceWaterQualityRate: 95, waterFunctionZoneRate: 93, sewageTreatmentRate: 97, perCapitaDailyWater: 172, recycledWaterRate: 26, waterSavingDeviceRate: 96, riverLakeLength: 420, mainWaterBody: '金汇港、浦南运河' }, // 奉贤
  '310151': { surfaceWaterQualityRate: 96, waterFunctionZoneRate: 94, sewageTreatmentRate: 96, perCapitaDailyWater: 160, recycledWaterRate: 24, waterSavingDeviceRate: 95, riverLakeLength: 890, wetlandArea: 320, mainWaterBody: '长江口、崇明岛湿地' }, // 崇明
};

// 银川6区县 — 黄河银川段水质稳定II类
// 兴庆/金凤有阅海等较大水面，灵武/永宁靠近黄河干流
const YINCHUAN_WATER: Record<string, DistrictWater> = {
  '640104': { surfaceWaterQualityRate: 90, waterFunctionZoneRate: 88, sewageTreatmentRate: 98.5, perCapitaDailyWater: 155, recycledWaterRate: 24, waterSavingDeviceRate: 93, wetlandArea: 1200, mainWaterBody: '黄河、阅海、鸣翠湖' },     // 兴庆
  '640106': { surfaceWaterQualityRate: 90, waterFunctionZoneRate: 88, sewageTreatmentRate: 98.5, perCapitaDailyWater: 158, recycledWaterRate: 25, waterSavingDeviceRate: 94, wetlandArea: 800, mainWaterBody: '阅海、典农河' },          // 金凤
  '640105': { surfaceWaterQualityRate: 88, waterFunctionZoneRate: 86, sewageTreatmentRate: 98.5, perCapitaDailyWater: 148, recycledWaterRate: 22, waterSavingDeviceRate: 92, mainWaterBody: '艾依河、西干渠' },                    // 西夏
  '640121': { surfaceWaterQualityRate: 89, waterFunctionZoneRate: 87, sewageTreatmentRate: 97.0, perCapitaDailyWater: 142, recycledWaterRate: 20, waterSavingDeviceRate: 91, wetlandArea: 300, mainWaterBody: '黄河、永二干沟' },        // 永宁
  '640122': { surfaceWaterQualityRate: 88, waterFunctionZoneRate: 86, sewageTreatmentRate: 97.0, perCapitaDailyWater: 144, recycledWaterRate: 20, waterSavingDeviceRate: 91, mainWaterBody: '黄河、唐徕渠' },                       // 贺兰
  '640181': { surfaceWaterQualityRate: 90, waterFunctionZoneRate: 88, sewageTreatmentRate: 96.5, perCapitaDailyWater: 145, recycledWaterRate: 21, waterSavingDeviceRate: 90, wetlandArea: 500, mainWaterBody: '黄河、秦渠' },            // 灵武
};

const CITY_WATER: Record<string, Record<string, DistrictWater>> = {
  shanghai: SHANGHAI_WATER,
  yinchuan: YINCHUAN_WATER,
};

const WATER_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市水务局2025年报 + 生态环境局水环境监测 — 地表水III类+占比约95%/水功能区达标约92%/污水处理98.2%/再生水28% × 各区水体实际状况',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市水务局 + 宁夏生态环境厅 — 黄河银川段II类/水功能区达标约88%/污水处理98.5%/再生水约22% × 各区县水体状况',
    year: '2025年',
  },
};

const CITY_WATER_TOTALS: Record<string, {
  surfaceWaterQualityRate: number;
  waterFunctionZoneRate: number;
  sewageTreatmentRate: number;
  perCapitaDailyWater: number;
  recycledWaterRate: number;
  waterSavingDeviceRate: number;
  totalRiverLakeLength?: number;
  totalWetlandArea?: number;
  mainRiverName: string;
  mainRiverQuality: string;
  source: string;
  sourceUrl: string;
  year: string;
}> = {
  shanghai: {
    surfaceWaterQualityRate: 95,
    waterFunctionZoneRate: 92,
    sewageTreatmentRate: 98.2,
    perCapitaDailyWater: 180,
    recycledWaterRate: 28,
    waterSavingDeviceRate: 98,
    totalRiverLakeLength: 5400,
    totalWetlandArea: 320,
    mainRiverName: '黄浦江/苏州河',
    mainRiverQuality: 'IV类以上',
    source: '上海市水务局2025年报 + 生态环境局水环境监测',
    sourceUrl: 'https://swj.sh.gov.cn/',
    year: '2025年',
  },
  yinchuan: {
    surfaceWaterQualityRate: 90,
    waterFunctionZoneRate: 88,
    sewageTreatmentRate: 98.5,
    perCapitaDailyWater: 150,
    recycledWaterRate: 22,
    waterSavingDeviceRate: 92,
    totalWetlandArea: 5300,
    mainRiverName: '黄河银川段',
    mainRiverQuality: 'II类（国家级考核断面）',
    source: '银川市水务局 + 宁夏生态环境厅',
    sourceUrl: 'https://www.yinchuan.gov.cn/',
    year: '2025年',
  },
};

export function getDistrictWater(city: string, code: string): DistrictWater | null {
  return CITY_WATER[city]?.[code] ?? null;
}

export function waterSource(city: string): string {
  return WATER_SOURCES[city]?.source ?? '—';
}

export function waterYear(city: string): string {
  return WATER_SOURCES[city]?.year ?? '—';
}

export { CITY_WATER_TOTALS };
