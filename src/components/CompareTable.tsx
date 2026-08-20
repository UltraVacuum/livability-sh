import { METRICS, type MetricKey } from '../data/districts';
import { compositeScore, type ScoredDistrict } from '../lib/scoring';
import type { ComparePreset } from '../lib/comparePresets';

interface Props {
  chosen: ScoredDistrict[];
  citySlug: string;
  preset: ComparePreset;
}

const COLORS = ['#0d9488', '#dc2626', '#2563eb'];

export default function CompareTable({ chosen, citySlug, preset }: Props) {
  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft">
              维度
            </th>
            {chosen.map((district, index) => (
              <th scope="col" key={district.adcode} className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <a
                    href={`/${citySlug}/district/${district.adcode}`}
                    className="font-semibold text-ink hover:text-accent"
                  >
                    {district.name}
                  </a>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          <tr className="bg-surface-muted/50">
            <td className="px-4 py-3 font-medium">{preset.title}综合分</td>
            {chosen.map((district) => (
              <td key={district.adcode} className="px-4 py-3">
                <span className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>
                  {compositeScore(district, preset.weights).toFixed(1)}
                </span>
                <span className="text-xs text-ink-soft"> /100</span>
              </td>
            ))}
          </tr>
          {METRICS.map((metric) => (
            <tr key={metric.key}>
              <td className="px-4 py-3">
                <div className="font-medium text-ink">{metric.label}</div>
                <div className="text-xs text-ink-soft">
                  {metric.unit} · 权重 ×{preset.weights[metric.key]}
                </div>
              </td>
              {chosen.map((district) => {
                const metricScore = district.metrics[metric.key as MetricKey];
                return (
                  <td key={district.adcode} className="px-4 py-3">
                    <div className="font-medium text-ink">{metricScore.rawValue.toLocaleString()}</div>
                    <div className="text-xs text-ink-soft">
                      评分 {metricScore.score.toFixed(0)} · 第 {metricScore.rank} 名
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
