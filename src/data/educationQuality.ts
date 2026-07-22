/**
 * Education quality data — student-teacher ratios and school distribution.
 *
 * 上海:
 *   2025学年（2025年统计公报）:
 *   - 普通小学654所, 在校生90.78万人
 *   - 普通中学932所, 初中在校生66.39万人, 高中在校生23.55万人
 *   - 普通本专科在校生60.61万人, 研究生28.09万人
 *   - 普通中等职业学校64所, 中职在校生10.90万人
 *   - 特殊教育学校31所
 *   - 民办普通高校19所, 民办普通中学137所, 民办小学44所
 *   来源: https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html
 *
 *   师生比: 上海市教委2024年教育事业统计:
 *   - 小学师生比约1:15（全国平均1:16.2）
 *   - 初中师生比约1:11（全国平均1:12.4）
 *   - 高中师生比约1:10（全国平均1:12.0）
 *   来源: 上海市教育委员会2024年教育事业统计公报
 *
 * 银川:
 *   2025年（统计公报）:
 *   - 普通小学171所, 招生4.10万人, 在校生24.89万人
 *   - 初中学校69所, 招生3.83万人, 在校生10.76万人
 *   - 普通高中31所, 招生2.66万人, 在校生7.26万人
 *   - 中等职业学校16所, 在校生2.73万人
 *   - 普通高等院校17所, 在校生16.22万人
 *   - 幼儿园396所, 在园幼儿8.77万人
 *   - 特殊教育学校8所
 *   - 学前三年毛入园率109.2%, 小学六年巩固率112.1%, 初中三年巩固率100.9%
 *   来源: https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html
 *
 *   师生比: 宁夏教育厅2024年教育统计:
 *   - 小学师生比约1:17（班级规模偏大）
 *   - 初中师生比约1:13
 *   - 高中师生比约1:12
 *   来源: 宁夏回族自治区教育厅2024年教育统计公报
 *
 *   区级分配方法: 市级学校总量按常住人口比例分配。
 *   上海名校分布: 黄浦/徐汇/杨浦（高校密集区）, 浦东（总量大）
 *   银川名校分布: 西夏区（大学城）, 兴庆区（老城区名校集中）
 */

export interface DistrictEducationQuality {
  primarySchools: number; // 小学数量
  middleSchools: number; // 中学数量（初中+高中）
  highSchools: number; // 普通高中数量
  primaryStudents: number; // 小学在校生（人）
  middleStudents: number; // 中学在校生（人）
  primaryStudentTeacherRatio: string; // 小学师生比（如 "1:15"）
  middleStudentTeacherRatio: string; // 中学师生比
  notableSchools?: string[]; // 代表性名校
  year: number;
  source: string;
}

// 上海各区教育质量数据
// 市级总量: 小学654所/中学932所, 小学在校生90.78万/初中66.39万+高中23.55万=89.94万
// 按人口比例分配 + 教育资源密度加权
const SHANGHAI_EDU_QUALITY: Record<string, DistrictEducationQuality> = {
  '310101': { // 黄浦（教育强区，名校密集）
    primarySchools: 18, middleSchools: 22, highSchools: 8,
    primaryStudents: 18500, middleStudents: 20500,
    primaryStudentTeacherRatio: '1:14', middleStudentTeacherRatio: '1:10',
    notableSchools: ['上海中学', '格致中学', '大同中学', '向明中学'],
    year: 2025,
    source: '估算（市级公报×教育强区加权）',
  },
  '310104': { // 徐汇（教育强区）
    primarySchools: 35, middleSchools: 40, highSchools: 10,
    primaryStudents: 42000, middleStudents: 38000,
    primaryStudentTeacherRatio: '1:14', middleStudentTeacherRatio: '1:10',
    notableSchools: ['南洋模范中学', '位育中学', '上海交通大学附属中学'],
    year: 2025,
    source: '估算（市级公报×教育强区加权）',
  },
  '310105': { // 长宁
    primarySchools: 22, middleSchools: 25, highSchools: 6,
    primaryStudents: 26000, middleStudents: 22000,
    primaryStudentTeacherRatio: '1:15', middleStudentTeacherRatio: '1:11',
    notableSchools: ['延安中学', '市三女中'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310106': { // 静安（教育强区）
    primarySchools: 25, middleSchools: 30, highSchools: 8,
    primaryStudents: 28000, middleStudents: 25000,
    primaryStudentTeacherRatio: '1:14', middleStudentTeacherRatio: '1:10',
    notableSchools: ['市西中学', '育才中学', '华东师范大学附属中学'],
    year: 2025,
    source: '估算（市级公报×教育强区加权）',
  },
  '310107': { // 普陀
    primarySchools: 30, middleSchools: 35, highSchools: 7,
    primaryStudents: 35000, middleStudents: 28000,
    primaryStudentTeacherRatio: '1:15', middleStudentTeacherRatio: '1:11',
    notableSchools: ['曹杨二中', '晋元高级中学'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310109': { // 虹口
    primarySchools: 24, middleSchools: 28, highSchools: 7,
    primaryStudents: 26000, middleStudents: 23000,
    primaryStudentTeacherRatio: '1:14', middleStudentTeacherRatio: '1:11',
    notableSchools: ['复兴高级中学', '华东师范大学第一附属中学'],
    year: 2025,
    source: '估算（市级公报×教育重镇加权）',
  },
  '310110': { // 杨浦（高校+基础教育强区）
    primarySchools: 35, middleSchools: 42, highSchools: 10,
    primaryStudents: 40000, middleStudents: 35000,
    primaryStudentTeacherRatio: '1:14', middleStudentTeacherRatio: '1:10',
    notableSchools: ['复旦大学附属中学', '控江中学', '杨浦高级中学'],
    year: 2025,
    source: '估算（市级公报×教育强区加权）',
  },
  '310112': { // 闵行（人口大区）
    primarySchools: 55, middleSchools: 60, highSchools: 10,
    primaryStudents: 68000, middleStudents: 52000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['七宝中学', '闵行中学'],
    year: 2025,
    source: '估算（市级公报×人口大区加权）',
  },
  '310113': { // 宝山
    primarySchools: 40, middleSchools: 45, highSchools: 8,
    primaryStudents: 48000, middleStudents: 38000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['行知中学', '吴淞中学'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310114': { // 嘉定
    primarySchools: 35, middleSchools: 38, highSchools: 7,
    primaryStudents: 42000, middleStudents: 32000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['嘉定一中', '交大附中嘉定分校'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310115': { // 浦东（超大区，教育资源最多）
    primarySchools: 120, middleSchools: 140, highSchools: 25,
    primaryStudents: 145000, middleStudents: 120000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['华师大二附中', '建平中学', '进才中学', '川沙中学'],
    year: 2025,
    source: '估算（市级公报×超大区加权）',
  },
  '310116': { // 金山
    primarySchools: 20, middleSchools: 22, highSchools: 5,
    primaryStudents: 22000, middleStudents: 18000,
    primaryStudentTeacherRatio: '1:15', middleStudentTeacherRatio: '1:12',
    notableSchools: ['金山中学'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310117': { // 松江（大学城+人口导入区）
    primarySchools: 38, middleSchools: 42, highSchools: 8,
    primaryStudents: 48000, middleStudents: 38000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['松江二中', '华师大附属松江高级中学'],
    year: 2025,
    source: '估算（市级公报×大学城加权）',
  },
  '310118': { // 青浦
    primarySchools: 25, middleSchools: 28, highSchools: 5,
    primaryStudents: 30000, middleStudents: 24000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['青浦高级中学'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310120': { // 奉贤
    primarySchools: 25, middleSchools: 28, highSchools: 5,
    primaryStudents: 28000, middleStudents: 22000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['奉贤中学'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '310151': { // 崇明
    primarySchools: 18, middleSchools: 20, highSchools: 4,
    primaryStudents: 16000, middleStudents: 14000,
    primaryStudentTeacherRatio: '1:14', middleStudentTeacherRatio: '1:11',
    notableSchools: ['崇明中学'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
};

// 银川各区县教育质量数据
// 市级总量: 小学171所/初中69所/高中31所, 小学在校生24.89万/初中10.76万/高中7.26万
const YINCHUAN_EDU_QUALITY: Record<string, DistrictEducationQuality> = {
  '640104': { // 兴庆区（老城名校集中）
    primarySchools: 45, middleSchools: 20, highSchools: 10,
    primaryStudents: 65000, middleStudents: 28000,
    primaryStudentTeacherRatio: '1:16', middleStudentTeacherRatio: '1:12',
    notableSchools: ['银川一中', '银川二中', '银川九中', '唐徕回中'],
    year: 2025,
    source: '估算（市级公报×老城教育中心加权）',
  },
  '640106': { // 金凤区（新区，教育发展中）
    primarySchools: 35, middleSchools: 15, highSchools: 8,
    primaryStudents: 52000, middleStudents: 22000,
    primaryStudentTeacherRatio: '1:17', middleStudentTeacherRatio: '1:13',
    notableSchools: ['银川六中', '银川九中金凤校区'],
    year: 2025,
    source: '估算（市级公报×新区教育发展加权）',
  },
  '640105': { // 西夏区（大学城，基础教育中等）
    primarySchools: 30, middleSchools: 12, highSchools: 6,
    primaryStudents: 45000, middleStudents: 18000,
    primaryStudentTeacherRatio: '1:17', middleStudentTeacherRatio: '1:13',
    notableSchools: ['宁夏大学附属中学', '银川二十四中'],
    year: 2025,
    source: '估算（市级公报×大学城加权）',
  },
  '640121': { // 永宁县
    primarySchools: 20, middleSchools: 8, highSchools: 3,
    primaryStudents: 28000, middleStudents: 12000,
    primaryStudentTeacherRatio: '1:18', middleStudentTeacherRatio: '1:14',
    notableSchools: ['永宁中学'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '640122': { // 贺兰县
    primarySchools: 22, middleSchools: 8, highSchools: 2,
    primaryStudents: 30000, middleStudents: 12000,
    primaryStudentTeacherRatio: '1:18', middleStudentTeacherRatio: '1:14',
    notableSchools: ['贺兰一中'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
  '640181': { // 灵武市
    primarySchools: 19, middleSchools: 6, highSchools: 2,
    primaryStudents: 28000, middleStudents: 15600,
    primaryStudentTeacherRatio: '1:18', middleStudentTeacherRatio: '1:14',
    notableSchools: ['灵武一中'],
    year: 2025,
    source: '估算（市级公报×人口比例）',
  },
};

const CITY_EDU_QUALITY: Record<string, Record<string, DistrictEducationQuality>> = {
  shanghai: SHANGHAI_EDU_QUALITY,
  yinchuan: YINCHUAN_EDU_QUALITY,
};

export function getDistrictEducationQuality(cityKey: string, adcode: string): DistrictEducationQuality | undefined {
  return CITY_EDU_QUALITY[cityKey]?.[adcode];
}

// 市级师生比参考
export interface CityEduRatio {
  primaryRatio: string; // 小学师生比
  middleRatio: string; // 初中师生比
  highRatio: string; // 高中师生比
  totalSchools: number; // 全市中小学总数
  totalStudents: number; // 全市中小学在校生
  year: number;
  source: string;
  sourceUrl: string;
}

export const CITY_EDU_RATIO: Record<string, CityEduRatio> = {
  shanghai: {
    primaryRatio: '1:15',
    middleRatio: '1:11',
    highRatio: '1:10',
    totalSchools: 1586, // 654小学 + 932中学
    totalStudents: 1807000, // 90.78万小学 + 89.94万中学 ≈ 180.72万
    year: 2025,
    source: '2025年上海市国民经济和社会发展统计公报',
    sourceUrl: 'https://tjj.sh.gov.cn/tjgb/20260330/e0772941e8e041eaaad2df850b44ef98.html',
  },
  yinchuan: {
    primaryRatio: '1:17',
    middleRatio: '1:13',
    highRatio: '1:12',
    totalSchools: 271, // 171小学 + 69初中 + 31高中
    totalStudents: 429100, // 24.89万小学 + 10.76万初中 + 7.26万高中 ≈ 42.91万
    year: 2025,
    source: '银川市2025年国民经济和社会发展统计公报',
    sourceUrl: 'https://www.yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202604/t20260427_5226142.html',
  },
};

export function getCityEduRatio(cityKey: string): CityEduRatio | undefined {
  return CITY_EDU_RATIO[cityKey];
}
