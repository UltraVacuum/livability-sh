import { useMemo, useState } from 'react';
import RadarChart from './RadarChart';
import { METRICS, DEFAULT_WEIGHTS, type MetricKey } from '../data/districts';
import {
  rankWithWeights,
  compositeScore,
  type ScoredDistrict,
} from '../lib/scoring';

interface Props {
  districts: ScoredDistrict[];
  citySlug: string;
}

const COLORS = ['#0d9488', '#dc2626', '#2563eb'];

export default function CompareTool({ districts, citySlug }: Props) {
  const defaultTop3 = useMemo(
    () => rankWithWeights(districts, DEFAULT_WEIGHTS).slice(0, 3).map((r) => r.district.adcode),
    [districts],
  );
  const [selected, setSelected] = useState<string[]>(defaultTop3);

  const toggle = (adcode: string) => {
    setSelected((cur) => {
      if (cur.includes(adcode)) return cur.filter((a) => a !== adcode);
      if (cur.length >= 3) return [...cur.slice(1), adcode]; // max 3, drop oldest
      return [...cur, adcode];
    });
  };

  const chosen = selected
    .map((ad) => districts.find((d) => d.adcode === ad))
    .filter(Boolean) as ScoredDistrict[];

  const radarSeries = chosen.map((d, i) => ({
    name: d.name,
    color: COLORS[i % COLORS.length],
    values: METRICS.map((m) => d.metrics[m.key].score),
  }));

  return (
    <div className="space-y-6">
      {/* picker */}
      <div className="card p-5">
        <h3 className="mb-1 text-sm font-semibold">选择 2–3 个区对比</h3>
        <p className="mb-3 text-xs text-ink-soft">最多 3 个，点选切换。</p>
        <div className="flex flex-wrap gap-2">
          {districts.map((d) => {
            const idx = selected.indexOf(d.adcode);
            const active = idx >= 0;
            return (
              <button
                key={d.adcode}
                type="button"
                onClick={() => toggle(d.adcode)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? 'border-transparent text-white'
                    : 'border-line bg-surface text-ink-soft hover:text-ink'
                }`}
                style={active ? { backgroundColor: COLORS[idx % COLORS.length] } : undefined}
              >
                {d.name}
              </button>
            );
          })}
        </div>
      </div>

      {chosen.length === 0 ? (
        <p className="py-12 text-center text-ink-soft">请至少选择一个区。</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* overlay radar */}
          <div className="card flex flex-col items-center p-5">
            <RadarChart axes={METRICS.map((m) => ({ label: m.shortLabel }))} series={radarSeries} size={280} />
            <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
              {chosen.map((d, i) => (
                <span key={d.adcode} className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  {d.name}
                </span>
              ))}
            </div>
          </div>

          {/* comparison table */}
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-soft">维度</th>
                  {chosen.map((d, i) => (
                    <th key={d.adcode} className="px-4 py-3 text-left">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <a href={`/${citySlug}/district/${d.adcode}`} className="font-semibold text-ink hover:text-accent">
                          {d.name}
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {/* composite row */}
                <tr className="bg-surface-muted/50">
                  <td className="px-4 py-3 font-medium">综合宜居度</td>
                  {chosen.map((d) => {
                    const c = compositeScore(d, DEFAULT_WEIGHTS);
                    return (
                      <td key={d.adcode} className="px-4 py-3">
                        <span className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>
                          {c.toFixed(0)}
                        </span>
                        <span className="text-xs text-ink-soft"> /100</span>
                      </td>
                    );
                  })}
                </tr>
                {METRICS.map((m) => (
                  <tr key={m.key}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-ink">{m.label}</div>
                      <div className="text-xs text-ink-soft">{m.unit}</div>
                    </td>
                    {chosen.map((d) => {
                      const ms = d.metrics[m.key as MetricKey];
                      return (
                        <td key={d.adcode} className="px-4 py-3">
                          <div className="font-medium text-ink">
                            {ms.rawValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-ink-soft">
                            评分 {ms.score.toFixed(0)} · 第 {ms.rank} 名
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
