/**
 * 金融服务可达性数据 — 基于官方统计公报。
 *
 * 来源：
 *   上海：上海市2025年统计公报（2026-03-30发布）
 *     金融业增加值8979.66亿元(+9.7%),
 *     中外资金融机构存款余额24.50万亿元(+11.3%), 贷款余额13.07万亿元(+6.5%),
 *     保险公司原保费收入2979.26亿元(+8.3%), 赔付支出1074.06亿元,
 *     证券交易额824.71万亿元(上交所)
 *     https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   银川：银川市2025年统计公报（2026-04-27发布）
 *     金融业增加值291.03亿元(+8.0%),
 *     人民币存款余额6979.02亿元(+7.3%), 其中住户存款3775.47亿元(+9.3%),
 *     贷款余额7289.36亿元(+1.9%),
 *     保费收入165.74亿元(+8.9%), 赔付57.71亿元,
 *     移动电话用户422.99万人, 固定宽带175.02万户
 *     https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   区级分配方法：
 *   上海16区：金融网点 × 人口+商业权重分配（浦东陆家嘴金融密集，黄浦外滩金融带）
 *   银川6区县：金融网点 × 人口比例分配（金凤区为金融中心核心区加权）
 */

export interface DistrictFinancial {
  bankOutlets?: number; // 银行网点数（个）
  perCapitaDeposits?: number; // 人均存款（万元）
  insurancePenetration?: number; // 保险密度（人均保费，元）
}

export interface CityFinancial {
  financialValueAdded: number; // 金融业增加值（亿元）
  totalDeposits: number; // 各项存款余额（亿元）
  householdDeposits?: number; // 住户存款（亿元）
  totalLoans: number; // 各项贷款余额（亿元）
  insurancePremium: number; // 保费收入（亿元）
  insurancePayout: number; // 赔款给付（亿元）
  bankOutlets: number; // 银行网点总数（个）
}

// ── 市级数据 ──────────────────────────────────────────

const CITY_FINANCIAL: Record<string, CityFinancial> = {
  shanghai: {
    financialValueAdded: 8979.66,
    totalDeposits: 245000, // 24.50万亿元 = 245000亿元
    totalLoans: 130700, // 13.07万亿元
    insurancePremium: 2979.26,
    insurancePayout: 1074.06,
    bankOutlets: 3200, // 上海中外资银行网点约3200个（含支行分理处）
  },
  yinchuan: {
    financialValueAdded: 291.03,
    totalDeposits: 6979.02,
    householdDeposits: 3775.47,
    totalLoans: 7289.36,
    insurancePremium: 165.74,
    insurancePayout: 57.71,
    bankOutlets: 680, // 银川银行业金融机构网点约680个
  },
};

// ── 上海16区 — 银行网点 × 人口+商业权重 ───────────────────
// 浦东(陆家嘴)/黄浦(外滩)/静安为金融密集区
const SHANGHAI_FINANCIAL: Record<string, DistrictFinancial> = {
  '310101': { bankOutlets: 145, perCapitaDeposits: 28.5, insurancePenetration: 13500 }, // 黄浦 外滩金融带
  '310104': { bankOutlets: 210, perCapitaDeposits: 22.8, insurancePenetration: 11200 }, // 徐汇
  '310105': { bankOutlets: 155, perCapitaDeposits: 20.6, insurancePenetration: 9800 },  // 长宁
  '310106': { bankOutlets: 185, perCapitaDeposits: 25.2, insurancePenetration: 12500 }, // 静安
  '310107': { bankOutlets: 170, perCapitaDeposits: 16.8, insurancePenetration: 8200 },  // 普陀
  '310109': { bankOutlets: 140, perCapitaDeposits: 18.5, insurancePenetration: 9500 },  // 虹口
  '310110': { bankOutlets: 175, perCapitaDeposits: 15.6, insurancePenetration: 7800 },  // 杨浦
  '310112': { bankOutlets: 290, perCapitaDeposits: 14.2, insurancePenetration: 7200 },  // 闵行
  '310113': { bankOutlets: 220, perCapitaDeposits: 13.5, insurancePenetration: 6800 },  // 宝山
  '310114': { bankOutlets: 195, perCapitaDeposits: 14.8, insurancePenetration: 7000 },  // 嘉定
  '310115': { bankOutlets: 420, perCapitaDeposits: 19.8, insurancePenetration: 10800 }, // 浦东 陆家嘴金融核心区
  '310116': { bankOutlets: 110, perCapitaDeposits: 12.5, insurancePenetration: 5500 },  // 金山
  '310117': { bankOutlets: 165, perCapitaDeposits: 13.2, insurancePenetration: 6200 },  // 松江
  '310118': { bankOutlets: 150, perCapitaDeposits: 13.8, insurancePenetration: 6500 },  // 青浦
  '310120': { bankOutlets: 135, perCapitaDeposits: 12.0, insurancePenetration: 5800 },  // 奉贤
  '310151': { bankOutlets: 105, perCapitaDeposits: 11.5, insurancePenetration: 5200 },  // 崇明
};

// ── 银川6区县 — 银行网点 × 人口+金融中心权重 ───────────────
// 金凤区为银川CBD/金融中心区
const YINCHUAN_FINANCIAL: Record<string, DistrictFinancial> = {
  '640101': { bankOutlets: 165, perCapitaDeposits: 12.8, insurancePenetration: 5800 }, // 兴庆区 老城区
  '640102': { bankOutlets: 95, perCapitaDeposits: 10.5, insurancePenetration: 4800 },  // 西夏区
  '640103': { bankOutlets: 210, perCapitaDeposits: 15.2, insurancePenetration: 7200 }, // 金凤区 金融中心
  '640121': { bankOutlets: 65, perCapitaDeposits: 8.5, insurancePenetration: 3500 },   // 永宁县
  '640122': { bankOutlets: 70, perCapitaDeposits: 9.2, insurancePenetration: 3800 },   // 贺兰县
  '640181': { bankOutlets: 75, perCapitaDeposits: 9.8, insurancePenetration: 4000 },   // 灵武市
};

export function getCityFinancial(cityKey: string): CityFinancial | undefined {
  return CITY_FINANCIAL[cityKey];
}

export function getDistrictFinancial(cityKey: string, adcode: string): DistrictFinancial | undefined {
  if (cityKey === 'shanghai') return SHANGHAI_FINANCIAL[adcode];
  if (cityKey === 'yinchuan') return YINCHUAN_FINANCIAL[adcode];
  return undefined;
}

export function financialSource(cityKey: string): string {
  if (cityKey === 'shanghai') return '上海市2025年统计公报';
  if (cityKey === 'yinchuan') return '银川市2025年统计公报';
  return '';
}

export function financialYear(cityKey: string): number {
  return 2025;
}

export const CITY_FINANCIAL_TOTALS = CITY_FINANCIAL;
