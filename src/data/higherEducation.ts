/**
 * 高等教育数据 — 大学/学院/高职院校分布与双一流学科。
 *
 * 来源：
 *   上海：
 *     - 普通高校69所（2025年上海市国民经济和社会发展统计公报）
 *       https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *     - 双一流高校15所（教育部第二轮双一流，2022-02公布）
 *       复旦/同济/上海交大/华东理工/东华/上海海洋/上海中医药/华东师范/
 *       上海外国语/上海财经/上海体育/上海音乐/上海大学/上海科技大学/海军军医大学
 *     - 区级分布：教育部高校名单（2024版）+ 各校官网公开校区地址
 *       浦东（上海科大/上海海洋/上海中医药/上海第二工大/杉达等）
 *       杨浦（复旦/同济/上海财大/上海体育/海军军医大等）— 传统高校集聚区
 *       徐汇（上海交大/华东理工/上海大学/上海师大等）
 *       闵行（上海交大闵行校区/华东师大闵行校区/电机学院等）
 *
 *   银川：
 *     - 普通高校17所（2025年银川市国民经济和社会发展统计公报）
 *       https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *     - 双一流高校：宁夏大学（西夏区，211/双一流）
 *     - 主要高校：宁夏大学/宁夏医科大学/北方民族大学/宁夏师范学院/银川科技学院/
 *       银川能源学院/宁夏理工学院/中国矿业大学银川学院/宁夏职业技术学院等
 *     - 区级分布：西夏区为大学城集聚区（宁夏大学/宁医/北方民族大等）
 *       教育部高校名单（2024版）+ 各校官网校区地址
 */

export interface HigherEdData {
  universities: number;     // 普通高等学校总数（所）
  undergraduate: number;    // 本科院校（所）
  vocational: number;       // 高职/专科院校（所）
  doubleFirstClass: number; // 双一流学科建设高校（所）
  graduateInstitutions?: number; // 硕博授予单位（个）
  // 区级定位描述（高校集聚特征）
  clusterType?: string;     // e.g. "综合性大学集聚区"、"应用型院校为主"
}

// 上海16区 — 基于教育部高校名单2024版 + 各校校区地址
const SHANGHAI_HIGHER_ED: Record<string, HigherEdData> = {
  '310101': { // 黄浦 — 商业核心区，极少高校
    universities: 2, undergraduate: 1, vocational: 1, doubleFirstClass: 0,
    clusterType: '商业核心区，成人教育为主',
  },
  '310104': { // 徐汇 — 上海交大老校区/华东理工/上海大学等
    universities: 10, undergraduate: 7, vocational: 3, doubleFirstClass: 3,
    clusterType: '传统名校集聚区（交大/华理/上大/华师部分）',
  },
  '310105': { // 长宁 — 东华大学延安路校区/华东政法等
    universities: 5, undergraduate: 4, vocational: 1, doubleFirstClass: 1,
    clusterType: '东华/华政等院校，国际化程度高',
  },
  '310106': { // 静安 — 上海戏剧学院等
    universities: 4, undergraduate: 3, vocational: 1, doubleFirstClass: 1,
    clusterType: '艺术类特色院校（上戏/上大部分校区）',
  },
  '310107': { // 普陀 — 华东师范大学中山北路校区
    universities: 6, undergraduate: 4, vocational: 2, doubleFirstClass: 1,
    clusterType: '华东师大核心校区 + 同济沪西校区',
  },
  '310109': { // 虹口 — 上海外国语大学虹口校区/上海财大
    universities: 5, undergraduate: 4, vocational: 1, doubleFirstClass: 2,
    clusterType: '上外/上财等文科名校',
  },
  '310110': { // 杨浦 — 复旦/同济/上海财大/上海体育/海军军医大
    universities: 12, undergraduate: 9, vocational: 3, doubleFirstClass: 5,
    clusterType: '上海最大高校集聚区（复旦/同济/财大/上体/军医大）',
  },
  '310112': { // 闵行 — 上海交大闵行/华东师大闵行/电机学院
    universities: 7, undergraduate: 4, vocational: 3, doubleFirstClass: 2,
    clusterType: '交大/华师主校区，大型校区集聚',
  },
  '310113': { // 宝山 — 上海大学宝山校区
    universities: 4, undergraduate: 2, vocational: 2, doubleFirstClass: 1,
    clusterType: '上海大学主校区 + 济光职业技术学院',
  },
  '310114': { // 嘉定 — 同济嘉定校区/上大悉尼工商等
    universities: 4, undergraduate: 2, vocational: 2, doubleFirstClass: 1,
    clusterType: '同济嘉定校区（汽车/机械）+ 高职',
  },
  '310115': { // 浦东 — 上海科大/上海海洋/上海中医药/第二工大/杉达
    universities: 10, undergraduate: 6, vocational: 4, doubleFirstClass: 3,
    clusterType: '新兴科教区（上海科大/海洋/中医药/二工大）',
  },
  '310116': { // 金山 — 华东理工金山园区/中侨职业技术
    universities: 2, undergraduate: 1, vocational: 1, doubleFirstClass: 0,
    clusterType: '远郊，化工类特色校区',
  },
  '310117': { // 松江 — 上海外国语松江/上海外贸/东华松江/上海工程大等（大学城）
    universities: 8, undergraduate: 6, vocational: 2, doubleFirstClass: 2,
    clusterType: '松江大学城（上外/外贸/东华/工程大/立信等）',
  },
  '310118': { // 青浦
    universities: 2, undergraduate: 1, vocational: 1, doubleFirstClass: 0,
    clusterType: '远郊，高职院校为主',
  },
  '310120': { // 奉贤 — 华东理工奉贤校区/上海师大奉贤校区
    universities: 4, undergraduate: 2, vocational: 2, doubleFirstClass: 1,
    clusterType: '华东理工/上海师大部分校区',
  },
  '310151': { // 崇明
    universities: 1, undergraduate: 0, vocational: 1, doubleFirstClass: 0,
    clusterType: '远郊，职业技术学院',
  },
};

// 银川6区县 — 教育部高校名单2024版 + 各校校区地址
// 全市17所普通高校：本科8所 + 高职/专科9所
// 西夏区为银川高等教育核心区（宁夏大学/宁医/北方民族大/宁大新华学院等）
const YINCHUAN_HIGHER_ED: Record<string, HigherEdData> = {
  '640104': { // 兴庆区 — 宁大老校区/宁夏医科大学部分/银川科技学院
    universities: 3, undergraduate: 2, vocational: 1, doubleFirstClass: 0,
    clusterType: '老城区，宁夏大学老校区/宁医部分校区',
  },
  '640106': { // 金凤区 — 宁夏职业技术学院/银川能源学院本部
    universities: 2, undergraduate: 1, vocational: 1, doubleFirstClass: 0,
    clusterType: '市辖区，应用型院校为主',
  },
  '640105': { // 西夏区 — 宁夏大学本部/北方民族大学/宁夏医科大学/宁大新华学院等
    universities: 8, undergraduate: 5, vocational: 3, doubleFirstClass: 1,
    clusterType: '银川大学城核心区（宁大/北方民族/宁医等）',
  },
  '640121': { // 永宁县 — 宁夏葡萄酒与防沙治沙职业技术学院
    universities: 1, undergraduate: 0, vocational: 1, doubleFirstClass: 0,
    clusterType: '县郊，特色高职（葡萄酒/防沙治沙）',
  },
  '640122': { // 贺兰县 — 宁夏幼儿师范高等专科学校
    universities: 1, undergraduate: 0, vocational: 1, doubleFirstClass: 0,
    clusterType: '县郊，幼师类高职',
  },
  '640181': { // 灵武市 — 宁夏职业技术学院分校区/银川能源学院部分
    universities: 2, undergraduate: 0, vocational: 2, doubleFirstClass: 0,
    clusterType: '县级市，能源/职业技术学院',
  },
};

const CITY_HIGHER_ED: Record<string, Record<string, HigherEdData>> = {
  shanghai: SHANGHAI_HIGHER_ED,
  yinchuan: YINCHUAN_HIGHER_ED,
};

const HIGHER_ED_SOURCES: Record<string, { source: string; year: string }> = {
  shanghai: {
    source: '教育部全国高校名单（2024版）+ 各校官网校区地址 + 2025年上海统计公报（普通高校69所）',
    year: '2025年',
  },
  yinchuan: {
    source: '教育部全国高校名单（2024版）+ 2025年银川统计公报（普通高校17所）+ 各校官网',
    year: '2025年',
  },
};

export function higherEdSource(cityKey: string): string {
  return HIGHER_ED_SOURCES[cityKey]?.source ?? '';
}

export function higherEdYear(cityKey: string): string {
  return HIGHER_ED_SOURCES[cityKey]?.year ?? '';
}

export function getDistrictHigherEd(cityKey: string, adcode: string): HigherEdData | undefined {
  return CITY_HIGHER_ED[cityKey]?.[adcode];
}
