import { useMemo } from 'react';
import { METRICS } from '../data/districts';
import { compositeScore, type ScoredDistrict } from '../lib/scoring';
import type { ComparePreset } from '../lib/comparePresets';
import type { CompareCopyState } from './ComparePresetPanel';

interface Props {
  preset: ComparePreset;
  districts: ScoredDistrict[];
  selected: string[];
  copyState: CompareCopyState;
  onToggle: (adcode: string) => void;
}

export default function ComparePresetResults({
  preset,
  districts,
  selected,
  copyState,
  onToggle,
}: Props) {
  const ranking = useMemo(
    () =>
      districts
        .map((district) => ({
          district,
          composite: compositeScore(district, preset.weights),
        }))
        .sort((a, b) => b.composite - a.composite)
        .slice(0, 3),
    [districts, preset],
  );
  const chosen = selected
    .map((adcode) => districts.find((district) => district.adcode === adcode))
    .filter((district): district is ScoredDistrict => Boolean(district));
  const winner = chosen
    .map((district) => ({
      district,
      composite: compositeScore(district, preset.weights),
    }))
    .sort((a, b) => b.composite - a.composite)[0];
  const winnerAdvantage = winner
    ? [...METRICS]
        .map((metric) => ({
          metric,
          contribution: winner.district.metrics[metric.key].score * preset.weights[metric.key],
        }))
        .sort((a, b) => b.contribution - a.contribution)[0]
    : undefined;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="card p-5">
        <h3 className="text-sm font-semibold">
          {preset.emoji} {preset.title}预设结果
        </h3>
        <p className="mt-1 text-xs text-ink-soft">{preset.description}</p>
        <ol className="mt-4 space-y-2">
          {ranking.map((row, index) => {
            const active = selected.includes(row.district.adcode);
            return (
              <li
                key={row.district.adcode}
                className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted px-3 py-2 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="font-semibold text-ink">{index + 1}</span>
                  <span className="truncate font-medium text-ink">{row.district.name}</span>
                  <span className="text-xs text-ink-soft">{row.composite.toFixed(1)} 分</span>
                </span>
                <button
                  type="button"
                  onClick={() => onToggle(row.district.adcode)}
                  className="shrink-0 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft transition hover:border-accent hover:text-accent"
                >
                  {active ? '移出对比' : '加入对比'}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {winner && winnerAdvantage && (
        <div className="card p-5">
          <p className="text-xs font-medium text-ink-soft">当前选择中的预设最优</p>
          <p className="mt-2 text-xl font-bold text-ink">{winner.district.name}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {preset.title}综合分{' '}
            <span className="font-semibold text-ink">{winner.composite.toFixed(1)}</span>
          </p>
          <p className="mt-3 rounded-xl bg-surface-muted p-3 text-xs leading-relaxed text-ink-soft">
            加权贡献最高的维度是
            <span className="font-semibold text-ink"> {winnerAdvantage.metric.label} </span>
            （评分 {winner.district.metrics[winnerAdvantage.metric.key].score.toFixed(0)}，权重 ×
            {preset.weights[winnerAdvantage.metric.key]}）。
          </p>
          <p className="mt-3 text-xs text-ink-soft" aria-live="polite">
            {copyState === 'copied'
              ? '分享链接已复制，可发给同城区友。'
              : copyState === 'error'
                ? '复制失败，请手动复制地址栏链接。'
                : '当前预设与区县组合会自动写入地址栏。'}
          </p>
        </div>
      )}
    </div>
  );
}
