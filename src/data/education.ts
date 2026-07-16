/**
 * K12 教育学段构成（学校数，按区）。
 *
 * 来源：上海市教育事业统计 2024学年（市教委 edu.sh.gov.cn 公示）。
 *   - 幼儿园 = 园数；小学 = 学校数；中学 = 普通中学学校数（含初中+高中）。
 *   - 仅上海已接入；其他城市待补充（getK12 返回 undefined，组件自行降级不渲染）。
 *
 * 这是【展示用补充数据】，不参与 education 维度的 POI 密度评分 ——
 * 评分仍用高德 POI 密度以保证全市可比；本数据用于在区详情页呈现 K12 学段构成。
 */
export interface K12Breakdown {
  kindergarten: number; // 幼儿园 园数
  primary: number; // 小学 学校数
  secondary: number; // 普通中学 学校数（初中 + 高中）
}

// adcode → 学段学校数（上海 16 区，2024 学年）
const SHANGHAI_K12: Record<string, K12Breakdown> = {
  '310101': { kindergarten: 37, primary: 27, secondary: 32 }, // 黄浦
  '310104': { kindergarten: 90, primary: 41, secondary: 41 }, // 徐汇
  '310105': { kindergarten: 41, primary: 23, secondary: 26 }, // 长宁
  '310106': { kindergarten: 87, primary: 44, secondary: 52 }, // 静安
  '310107': { kindergarten: 83, primary: 24, secondary: 51 }, // 普陀
  '310109': { kindergarten: 48, primary: 33, secondary: 33 }, // 虹口
  '310110': { kindergarten: 76, primary: 43, secondary: 53 }, // 杨浦
  '310112': { kindergarten: 183, primary: 57, secondary: 88 }, // 闵行
  '310113': { kindergarten: 166, primary: 57, secondary: 83 }, // 宝山
  '310114': { kindergarten: 104, primary: 44, secondary: 57 }, // 嘉定
  '310115': { kindergarten: 320, primary: 135, secondary: 188 }, // 浦东新区
  '310116': { kindergarten: 46, primary: 22, secondary: 39 }, // 金山
  '310117': { kindergarten: 134, primary: 34, secondary: 58 }, // 松江
  '310118': { kindergarten: 96, primary: 28, secondary: 41 }, // 青浦
  '310120': { kindergarten: 75, primary: 25, secondary: 51 }, // 奉贤
  '310151': { kindergarten: 38, primary: 23, secondary: 30 }, // 崇明
};

const CITY_K12: Record<string, Record<string, K12Breakdown>> = {
  shanghai: SHANGHAI_K12,
};

export const K12_SOURCE = '上海市教育事业统计 2024学年（市教委 edu.sh.gov.cn 公示）';
export const K12_YEAR = '2024学年';

export function getK12(cityKey: string, adcode: string): K12Breakdown | undefined {
  return CITY_K12[cityKey]?.[adcode];
}
