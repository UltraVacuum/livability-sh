/**
 * 市级公共安全与社会保障数据 — 基于官方统计公报。
 *
 * 来源：
 *   上海：2025年上海市国民经济和社会发展统计公报（上海市统计局 2026-03-30）
 *     生产安全死亡事故367起/387人（工矿商贸189起/203人，道路运输170起/176人，
 *     水上运输6起/6人，农林牧渔2起/2人）。
 *     食品安全监测合格率99.5%，集体性食物中毒1起/11人。
 *     低保标准1650元/月，社区综合为老服务中心557家，养老床位17.22万张。
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：2025年银川市国民经济和社会发展统计公报（银川市统计局 2026-04-27）
 *     生产安全事故28起/25人/8伤。道路交通事故8起/6人/5伤。
 *     亿元GDP生产安全事故死亡率0.0082。
 *     社区服务站308个，覆盖率100%。养老机构39个，床位8901张。
 *     城镇低保4.04万人/0.97亿元，农村低保2.76万人/1.64亿元。
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 * 这是【展示用补充数据】，不参与评分体系 ——
 * 用于在区/市详情页呈现公共安全与社会保障概况。
 */

export interface CitySafety {
  // 生产安全
  workSafetyAccidents: number; // 生产安全事故起数
  workSafetyDeaths: number; // 生产安全死亡人数
  workSafetyInjuries?: number; // 生产安全受伤人数
  gdpAccidentDeathRate?: number; // 亿元GDP生产安全事故死亡率
  // 道路交通
  trafficAccidents?: number; // 道路交通事故起数
  trafficDeaths?: number; // 道路交通死亡人数
  trafficInjuries?: number; // 道路交通受伤人数
  // 食品安全
  foodSafetyRate?: number; // 食品安全监测合格率 (%)
  foodPoisoningIncidents?: number; // 集体性食物中毒起数
  foodPoisoningCases?: number; // 集体性食物中毒人数
  // 社会保障
  pensionParticipants?: number; // 参加基本养老保险人数 (万人)
  medicalInsuranceParticipants?: number; // 参加基本医疗保险人数 (万人)
  unemploymentInsuranceParticipants?: number; // 参加失业保险人数 (万人)
  urbanMinLiving?: number; // 城镇最低生活保障人数 (万人)
  ruralMinLiving?: number; // 农村最低生活保障人数 (万人)
  minLivingStandard?: number; // 最低生活保障标准 (元/月) — 上海专有
  // 养老
  elderlyCareCenters?: number; // 社区综合为老服务中心 / 养老服务机构
  elderlyCareBeds?: number; // 养老床位 (张)
  // 年份与来源
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_SAFETY: Record<string, CitySafety> = {
  shanghai: {
    workSafetyAccidents: 367,
    workSafetyDeaths: 387,
    foodSafetyRate: 99.5,
    foodPoisoningIncidents: 1,
    foodPoisoningCases: 11,
    pensionParticipants: 1829.71, // 城镇职工基本养老保险（含离退休）
    medicalInsuranceParticipants: 2042.45, // 职工1643.49 + 居民398.96
    urbanMinLiving: 26.63, // 低保资金（亿元，非人数）
    minLivingStandard: 1650,
    elderlyCareCenters: 557,
    elderlyCareBeds: 172200,
    year: 2025,
    source: '2025年上海市国民经济和社会发展统计公报（上海市应急管理局/上海市民政局/上海市市场监督管理局）',
    sourceUrl:
      'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    workSafetyAccidents: 28,
    workSafetyDeaths: 25,
    workSafetyInjuries: 8,
    gdpAccidentDeathRate: 0.0082,
    trafficAccidents: 8,
    trafficDeaths: 6,
    trafficInjuries: 5,
    pensionParticipants: 180.26,
    medicalInsuranceParticipants: 226.27,
    unemploymentInsuranceParticipants: 78.75,
    urbanMinLiving: 4.04,
    ruralMinLiving: 2.76,
    elderlyCareCenters: 39,
    elderlyCareBeds: 8901,
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报（银川市应急管理局/银川市民政局）',
    sourceUrl:
      'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

export function getCitySafety(cityKey: string): CitySafety | undefined {
  return CITY_SAFETY[cityKey];
}
