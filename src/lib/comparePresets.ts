import { DEFAULT_WEIGHTS, type MetricKey } from '../data/districts';
import { rankWithWeights, type ScoredDistrict, type Weights } from './scoring';
import { SCENARIOS } from './scenarios';

export type PresetSlug = 'balanced' | (typeof SCENARIOS)[number]['slug'];

export interface ComparePreset {
  slug: PresetSlug;
  title: string;
  emoji: string;
  description: string;
  weights: Weights;
}

export const COMPARE_PRESETS: ComparePreset[] = [
  {
    slug: 'balanced',
    title: '均衡宜居',
    emoji: '⚖️',
    description: '六项基础维度等权，智慧城市与数字经济作为补充维度减半计分。',
    weights: DEFAULT_WEIGHTS,
  },
  ...SCENARIOS.map((scenario) => ({
    slug: scenario.slug as PresetSlug,
    title: scenario.title,
    emoji: scenario.emoji,
    description: scenario.description,
    weights: scenario.weights,
  })),
];

export function getComparePreset(slug: string): ComparePreset {
  return COMPARE_PRESETS.find((preset) => preset.slug === slug) ?? COMPARE_PRESETS[0];
}

export function topDistrictIds(districts: ScoredDistrict[], weights: Weights): string[] {
  return rankWithWeights(districts, weights)
    .slice(0, 3)
    .map((row) => row.district.adcode);
}

export function priorityMetricsFor(weights: Weights, metrics: Array<{ key: MetricKey; shortLabel: string }>) {
  return [...metrics]
    .sort((a, b) => weights[b.key] - weights[a.key])
    .slice(0, 3);
}
