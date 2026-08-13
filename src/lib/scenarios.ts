/**
 * Scenario weight presets for scene-based rankings.
 * Each scenario defines custom weights for the 6 metrics, plus a description
 * explaining the weighting rationale.
 */
import type { MetricKey } from '../data/districts';

export interface Scenario {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  weights: Record<MetricKey, number>;
  weightRationale: { metric: MetricKey; weight: number; reason: string }[];
}

export const SCENARIOS: Scenario[] = [
  {
    slug: 'families',
    title: '最适合家庭',
    emoji: '👨‍👩‍👧‍👦',
    description:
      '综合考虑教育资源、医疗水平、生活便利度和经济购买力，为有孩子的家庭选择宜居区域。',
    weights: {
      education: 3,
      healthcare: 2.5,
      amenity: 2,
      economy: 1.5,
      transit: 1,
      population: 1,
    },
    weightRationale: [
      { metric: 'education', weight: 3, reason: 'K12 教育资源是家庭选址的首要考量' },
      { metric: 'healthcare', weight: 2.5, reason: '儿童和老人就医便利性至关重要' },
      { metric: 'amenity', weight: 2, reason: '公园、商场等生活配套影响日常育儿质量' },
      { metric: 'economy', weight: 1.5, reason: '家庭可支配收入决定生活品质' },
      { metric: 'transit', weight: 1, reason: '通勤便利但非家庭首选' },
      { metric: 'population', weight: 1, reason: '适度人口密度保证社区活力' },
    ],
  },
  {
    slug: 'young-pros',
    title: '最适合年轻人',
    emoji: '💼',
    description:
      '侧重就业机会、交通便利、消费活力和人口密度，为年轻职场人士推荐充满活力的区域。',
    weights: {
      economy: 3,
      transit: 2.5,
      amenity: 2.5,
      population: 2,
      education: 0.5,
      healthcare: 1,
    },
    weightRationale: [
      { metric: 'economy', weight: 3, reason: '收入水平和就业机会是年轻人核心关注' },
      { metric: 'transit', weight: 2.5, reason: '地铁通勤效率直接影响生活质量' },
      { metric: 'amenity', weight: 2.5, reason: '商业、休闲配套丰富度影响社交生活' },
      { metric: 'population', weight: 2, reason: '人口密度反映区域活力与机遇' },
      { metric: 'healthcare', weight: 1, reason: '年轻人医疗需求相对较低' },
      { metric: 'education', weight: 0.5, reason: '非学龄人口教育需求弱' },
    ],
  },
  {
    slug: 'retirement',
    title: '最适合养老',
    emoji: '🌿',
    description:
      '重点考察医疗水平、生活便利度、环境舒适度和经济负担，为退休长者优选安静宜居区域。',
    weights: {
      healthcare: 3,
      amenity: 2,
      economy: 1.5,
      population: 0.5,
      transit: 1.5,
      education: 0.5,
    },
    weightRationale: [
      { metric: 'healthcare', weight: 3, reason: '医疗资源是养老选址的第一优先级' },
      { metric: 'amenity', weight: 2, reason: '公园广场和日常采购便利性' },
      { metric: 'economy', weight: 1.5, reason: '退休收入有限，生活成本需可控' },
      { metric: 'transit', weight: 1.5, reason: '公共交通便利方便就医和出行' },
      { metric: 'population', weight: 0.5, reason: '偏好低密度、安静环境' },
      { metric: 'education', weight: 0.5, reason: '非学龄人口教育需求极低' },
    ],
  },
];

/** Default equal weights for /best comprehensive ranking. */
export const DEFAULT_BEST_WEIGHTS: Record<MetricKey, number> = {
  economy: 1,
  population: 1,
  education: 1,
  healthcare: 1,
  transit: 1,
  amenity: 1,
};

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}
