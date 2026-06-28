/**
 * Scoring engine — pure functions implementing the spec's algorithm (§7):
 *   raw value → z-score (direction-adjusted) → normal-CDF → 0..100 score
 *   → weighted composite → percentile-based letter grade.
 *
 * Per-metric scores are computed ONCE (build time). Composite + ranking are
 * computed from weights, so the live "custom weights" island only re-runs the
 * cheap weighted-sum step (milliseconds).
 */
import {
  METRICS,
  DEFAULT_WEIGHTS,
  type MetricKey,
  type MetricDef,
  type RawDistrict,
} from '../data/districts';

export type Grade = 'S' | 'A' | 'B' | 'C' | 'D';

export interface MetricScore {
  key: MetricKey;
  rawValue: number;
  score: number; // 0..100
  rank: number; // 1..n within city
}

export interface ScoredDistrict {
  adcode: string;
  name: string;
  metrics: Record<MetricKey, MetricScore>;
}

export interface RankedDistrict {
  district: ScoredDistrict;
  composite: number; // 0..100
  rank: number; // 1..n
  grade: Grade;
}

export type Weights = Record<MetricKey, number>;

/* ── stats primitives ─────────────────────────────────────────────── */

function mean(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function std(xs: number[]): number {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
}

/** Abramowitz & Stegun erf approximation (max error ~1.5e-7). */
function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return x >= 0 ? y : -y;
}

/** Standard normal CDF: P(Z ≤ z). Maps z-score to a 0..1 percentile. */
function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

/* ── per-metric scoring (run once, build time) ────────────────────── */

/**
 * For one metric across all districts: z-score, apply direction, map to 0..100
 * via normal CDF, and assign 1..n rank (1 = best).
 */
function scoreMetric(
  key: MetricKey,
  def: MetricDef,
  districts: RawDistrict[],
): Record<string, MetricScore> {
  const vals = districts.map((d) => d.values[key]);
  const m = mean(vals);
  const s = std(vals) || 1; // guard against zero variance

  const scored = districts.map((d) => {
    const z = ((d.values[key] - m) / s) * def.direction;
    return { adcode: d.adcode, name: d.name, rawValue: d.values[key], score: 100 * normalCdf(z) };
  });

  // rank by score desc (1 = best)
  const order = [...scored].sort((a, b) => b.score - a.score);
  const rankByAdcode = new Map(order.map((o, i) => [o.adcode, i + 1]));

  const out: Record<string, MetricScore> = {};
  for (const o of scored) {
    out[o.adcode] = { key, rawValue: o.rawValue, score: o.score, rank: rankByAdcode.get(o.adcode)! };
  }
  return out;
}

/** Build the full scored dataset (per-metric scores + ranks) for one city. Build-time. */
export function computeCity(districts: RawDistrict[]): ScoredDistrict[] {
  const perMetric: Record<MetricKey, Record<string, MetricScore>> = {} as Record<
    MetricKey,
    Record<string, MetricScore>
  >;
  for (const def of METRICS) {
    perMetric[def.key] = scoreMetric(def.key, def, districts);
  }
  return districts.map((d) => ({
    adcode: d.adcode,
    name: d.name,
    metrics: Object.fromEntries(
      METRICS.map((def) => [def.key, perMetric[def.key][d.adcode]]),
    ) as Record<MetricKey, MetricScore>,
  }));
}

/* ── composite + ranking (run from weights — cheap, client-safe) ───── */

export function compositeScore(d: ScoredDistrict, weights: Weights): number {
  let num = 0;
  let den = 0;
  for (const def of METRICS) {
    const w = weights[def.key] ?? 0;
    num += w * d.metrics[def.key].score;
    den += w;
  }
  return den > 0 ? num / den : 0;
}

/** Letter grade from city-internal percentile rank (fairer for small N). */
export function gradeFromRank(rank: number, n: number): Grade {
  const p = rank / n; // 0 (best) .. ~1 (worst)
  if (p <= 0.1) return 'S';
  if (p <= 0.3) return 'A';
  if (p <= 0.6) return 'B';
  if (p <= 0.85) return 'C';
  return 'D';
}

export function rankWithWeights(
  districts: ScoredDistrict[],
  weights: Weights = DEFAULT_WEIGHTS,
): RankedDistrict[] {
  const withComposite = districts.map((district) => ({
    district,
    composite: compositeScore(district, weights),
  }));
  withComposite.sort((a, b) => b.composite - a.composite);
  const n = withComposite.length;
  return withComposite.map((x, i) => ({
    ...x,
    rank: i + 1,
    grade: gradeFromRank(i + 1, n),
  }));
}

/* ── presentation helpers ─────────────────────────────────────────── */

export const GRADE_COLOR: Record<Grade, string> = {
  S: 'var(--color-grade-s)',
  A: 'var(--color-grade-a)',
  B: 'var(--color-grade-b)',
  C: 'var(--color-grade-c)',
  D: 'var(--color-grade-d)',
};

/** Choropleth fill color for a 0..100 score (teal ramp). */
export function scoreColor(score: number): string {
  // clamp to 30..100 → teal opacity ramp
  const t = Math.max(0, Math.min(1, (score - 30) / 70));
  if (t > 0.8) return '#0f766e';
  if (t > 0.6) return '#0d9488';
  if (t > 0.4) return '#14b8a6';
  if (t > 0.2) return '#5eead4';
  return '#ccfbf1';
}
