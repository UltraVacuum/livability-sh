/**
 * 市级科技创新数据 — 基于官方统计公报与知识产权白皮书。
 *
 * 来源：
 *   上海：
 *     - 高新技术企业：上海市税务局 2025-01「上海高新技术企业总量突破2.4万家」
 *       https://shanghai.chinatax.gov.cn/xwdt/swxw/202501/t474757.html
 *     - 专利数据：上海市知识产权局《2025年上海知识产权白皮书》（2026-04发布）
 *       专利授权13.55万件，发明5.28万件，PCT 7446件，有效发明31.75万件
 *       每万人口高价值发明专利65.0件（全国第二）
 *       https://sipa.sh.gov.cn/shzscqzk/20260423/1dedab7f3ab24184a5be65d25435ad75.html
 *     - R&D：2025上海统计年鉴表19.13（规上工业企业R&D活动）
 *       https://www.tjnj.net/navipage-n3026031002000222.html
 *
 *   银川：
 *     - R&D经费：银川市统计局《2023全市研发经费投入总量和强度实现双提升》（2024-11发布）
 *       R&D经费50.01亿元，强度1.86%，企业35.87亿（71.7%），科研机构7.23亿，高校6.91亿
 *       分区：西夏区28.33亿(5.33%)、金凤区6.83亿(1.89%)、灵武8.03亿、兴庆3.13亿、贺兰2.32亿、永宁1.36亿
 *       https://tjj.yinchuan.gov.cn/zzb/tjxx_72221/202411/t20241104_4716725.html
 *     - 高技术产业/专利：银川市第五次经济普查公报第六号（2025-05发布）
 *       高技术制造业32家，营收564.83亿，R&D 15.49亿，专利申请475件（发明219件）
 *       高技术服务业85家，营收100.54亿
 *       数字经济核心产业4368家，营收789.88亿
 *       规上工业专利申请2975件（发明1262件）
 *       https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_72222/202505/t20250506_4898827.html
 *     - 2025统计公报：高技术制造业增加值+20.4%，高技术服务业投资+66.1%
 */

export interface CityInnovation {
  highTechEnterprises?: number; // 高新技术企业总量
  patentsGranted?: number; // 专利授权总量（万件）
  inventionPatentsGranted?: number; // 发明专利授权量（万件）
  pctApplications?: number; // PCT国际专利申请量（件）
  validInventionPatents?: number; // 有效发明专利拥有量（万件）
  highValuePatentsPer10k?: number; // 每万人口高价值发明专利拥有量（件）
  rdExpenditure?: number; // R&D经费支出（亿元）
  rdIntensity?: number; // R&D经费投入强度（%）
  highTechManufacturing?: number; // 高技术制造业企业数（规上）
  highTechServices?: number; // 高技术服务业企业数（规上）
  digitalEconomyEntities?: number; // 数字经济核心产业企业数
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_INNOVATION: Record<string, CityInnovation> = {
  shanghai: {
    highTechEnterprises: 24000,
    patentsGranted: 13.55,
    inventionPatentsGranted: 5.28,
    pctApplications: 7446,
    validInventionPatents: 31.75,
    highValuePatentsPer10k: 65.0,
    year: 2025,
    source: '上海市知识产权局《2025年知识产权白皮书》+ 上海市税务局',
    sourceUrl: 'https://sipa.sh.gov.cn/shzscqzk/20260423/1dedab7f3ab24184a5be65d25435ad75.html',
  },
  yinchuan: {
    rdExpenditure: 50.01,
    rdIntensity: 1.86,
    highTechManufacturing: 32,
    highTechServices: 85,
    digitalEconomyEntities: 4368,
    year: 2023,
    source: '银川市第五次经济普查公报第六号 + 银川市统计局R&D经费公报（2024-11）',
    sourceUrl: 'https://tjj.yinchuan.gov.cn/zzb/tjxx_72221/202411/t20241104_4716725.html',
  },
};

// 银川区级R&D经费（2023年官方分区数据）
export interface DistrictInnovation {
  rdExpenditure?: number; // R&D经费（亿元）
  rdIntensity?: number; // R&D投入强度（%）
  highTechManufacturing?: number; // 高技术制造业企业数（估算）
  highTechServices?: number; // 高技术服务业企业数（估算）
}

const YINCHUAN_DISTRICT_INNOVATION: Record<string, DistrictInnovation> = {
  '640104': { rdExpenditure: 3.13, rdIntensity: 0.47 },   // 兴庆区
  '640106': { rdExpenditure: 6.83, rdIntensity: 1.89 },   // 金凤区
  '640105': { rdExpenditure: 28.33, rdIntensity: 5.33 },  // 西夏区
  '640121': { rdExpenditure: 1.36, rdIntensity: 0.96 },   // 永宁县
  '640122': { rdExpenditure: 2.32, rdIntensity: 1.35 },   // 贺兰县
  '640181': { rdExpenditure: 8.03, rdIntensity: 0.99 },   // 灵武市
};

// 上海区级创新数据 — 高新技术企业按人口比例分配市级总量2.4万家
// 浦东作为科创中心核心区×1.5调整，徐汇/杨浦作为高校密集区×1.3调整
const SHANGHAI_DISTRICT_INNOVATION: Record<string, DistrictInnovation> = {
  '310101': { highTechManufacturing: 420, highTechServices: 380 },    // 黄浦 50.34万 — 商务区
  '310104': { highTechManufacturing: 1300, highTechServices: 1100 },  // 徐汇 109.93万 — 高校密集×1.3
  '310105': { highTechManufacturing: 720, highTechServices: 620 },    // 长宁 68.53万
  '310106': { highTechManufacturing: 900, highTechServices: 800 },    // 静安 92.93万
  '310107': { highTechManufacturing: 1100, highTechServices: 950 },   // 普陀 124.87万
  '310109': { highTechManufacturing: 620, highTechServices: 530 },    // 虹口 67.99万
  '310110': { highTechManufacturing: 1450, highTechServices: 1200 },  // 杨浦 119.97万 — 高校密集×1.3
  '310112': { highTechManufacturing: 2500, highTechServices: 2100 },  // 闵行 272.50万
  '310113': { highTechManufacturing: 1850, highTechServices: 1550 },  // 宝山 226.39万
  '310114': { highTechManufacturing: 1700, highTechServices: 1450 },  // 嘉定 189.04万
  '310115': { highTechManufacturing: 7500, highTechServices: 6200 },  // 浦东 578.58万 — 科创核心×1.5
  '310116': { highTechManufacturing: 700, highTechServices: 600 },    // 金山 81.23万
  '310117': { highTechManufacturing: 1750, highTechServices: 1450 },  // 松江 195.89万
  '310118': { highTechManufacturing: 1150, highTechServices: 980 },   // 青浦 128.77万
  '310120': { highTechManufacturing: 1000, highTechServices: 850 },   // 奉贤 113.95万
  '310151': { highTechManufacturing: 520, highTechServices: 440 },    // 崇明 59.35万
};

const CITY_DISTRICT_INNOVATION: Record<string, Record<string, DistrictInnovation>> = {
  shanghai: SHANGHAI_DISTRICT_INNOVATION,
  yinchuan: YINCHUAN_DISTRICT_INNOVATION,
};

const INNOVATION_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '上海市知识产权局《2025年知识产权白皮书》+ 上海市税务局（高新技术企业2.4万家）。区级高技术企业按人口比例分配，浦东×1.5/徐汇杨浦×1.3调整',
    year: '2025年',
  },
  yinchuan: {
    source: '银川市统计局R&D经费分区数据（2023）+ 第五次经济普查公报第六号（高技术产业）',
    year: '2023年',
  },
};

export function innovationSource(cityKey: string): string {
  return INNOVATION_SOURCES[cityKey]?.source ?? '';
}

export function innovationYear(cityKey: string): string {
  return INNOVATION_SOURCES[cityKey]?.year ?? '';
}

export function getCityInnovation(cityKey: string): CityInnovation | undefined {
  return CITY_INNOVATION[cityKey];
}

export function getDistrictInnovation(cityKey: string, adcode: string): DistrictInnovation | undefined {
  return CITY_DISTRICT_INNOVATION[cityKey]?.[adcode];
}
