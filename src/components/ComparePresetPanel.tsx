import { METRICS } from '../data/districts';
import {
  priorityMetricsFor,
  type ComparePreset,
  type PresetSlug,
} from '../lib/comparePresets';

export type CompareCopyState = 'idle' | 'copied' | 'error';

interface Props {
  activePreset: ComparePreset;
  presets: ComparePreset[];
  copyState: CompareCopyState;
  onSelect: (slug: PresetSlug) => void;
  onCopy: () => void;
}

export default function ComparePresetPanel({
  activePreset,
  presets,
  copyState,
  onSelect,
  onCopy,
}: Props) {
  const priorityMetrics = priorityMetricsFor(activePreset.weights, METRICS);

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">选择对比预设</h3>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            预设会同时调整综合分权重，并自动带入该场景下的前三名；可继续手动替换区县。
          </p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-accent hover:text-accent"
        >
          {copyState === 'copied' ? '✓ 链接已复制' : copyState === 'error' ? '复制失败' : '复制分享链接'}
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="对比预设">
        {presets.map((preset) => {
          const active = preset.slug === activePreset.slug;
          return (
            <button
              key={preset.slug}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(preset.slug)}
              className={`rounded-xl border p-3 text-left transition ${
                active
                  ? 'border-accent bg-accent-soft text-ink'
                  : 'border-line bg-surface text-ink-soft hover:border-accent/50 hover:text-ink'
              }`}
            >
              <span className="text-sm font-semibold">
                {preset.emoji} {preset.title}
              </span>
              <span className="mt-1 block text-xs leading-relaxed">{preset.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
        <span>优先维度：</span>
        {priorityMetrics.map((metric) => (
          <span key={metric.key} className="rounded-full bg-surface-muted px-2 py-1 font-medium text-ink">
            {metric.shortLabel} ×{activePreset.weights[metric.key]}
          </span>
        ))}
      </div>
    </div>
  );
}
