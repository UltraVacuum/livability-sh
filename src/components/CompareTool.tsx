import { useEffect, useMemo, useState } from 'react';
import RadarChart from './RadarChart';
import ComparePresetPanel, { type CompareCopyState } from './ComparePresetPanel';
import ComparePresetResults from './ComparePresetResults';
import CompareTable from './CompareTable';
import { METRICS } from '../data/districts';
import type { ScoredDistrict } from '../lib/scoring';
import {
  topDistrictIds,
  type ComparePreset,
  type PresetSlug,
} from '../lib/comparePresets';

export interface CompareToolProps {
  districts: ScoredDistrict[];
  citySlug: string;
  presets: ComparePreset[];
}

const COLORS = ['#0d9488', '#dc2626', '#2563eb'];

export default function CompareTool({ districts, citySlug, presets }: CompareToolProps) {
  const balancedPreset =
    presets.find((preset) => preset.slug === 'balanced') ?? presets[0];
  const balancedTop3 = useMemo(
    () => topDistrictIds(districts, balancedPreset.weights),
    [districts, balancedPreset],
  );
  const [presetSlug, setPresetSlug] = useState<PresetSlug>('balanced');
  const [selected, setSelected] = useState<string[]>(balancedTop3);
  const [copyState, setCopyState] = useState<CompareCopyState>('idle');
  const activePreset = presets.find((preset) => preset.slug === presetSlug) ?? balancedPreset;

  function presetBySlug(slug: string): ComparePreset {
    return presets.find((preset) => preset.slug === slug) ?? balancedPreset;
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextPreset = presetBySlug(params.get('preset') ?? 'balanced');
    const requestedDistricts = (params.get('districts') ?? '')
      .split(',')
      .filter((adcode) => districts.some((district) => district.adcode === adcode))
      .slice(0, 3);

    setPresetSlug(nextPreset.slug);
    if (requestedDistricts.length > 0) {
      setSelected(requestedDistricts);
    } else if (nextPreset.slug !== 'balanced') {
      setSelected(topDistrictIds(districts, nextPreset.weights));
    }
  }, [districts, presets, balancedPreset]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (presetSlug !== 'balanced') params.set('preset', presetSlug);
    if (selected.join(',') !== balancedTop3.join(',') || params.size > 0) {
      params.set('districts', selected.join(','));
    }
    const query = params.toString();
    window.history.replaceState(
      {},
      '',
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  }, [presetSlug, selected, balancedTop3]);

  useEffect(() => {
    if (copyState === 'idle') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2400);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const chosen = selected
    .map((adcode) => districts.find((district) => district.adcode === adcode))
    .filter((district): district is ScoredDistrict => Boolean(district));
  const radarSeries = chosen.map((district, index) => ({
    name: district.name,
    color: COLORS[index % COLORS.length],
    values: METRICS.map((metric) => district.metrics[metric.key].score),
  }));

  function toggle(adcode: string) {
    setSelected((current) => {
      if (current.includes(adcode)) return current.filter((item) => item !== adcode);
      if (current.length >= 3) return [...current.slice(1), adcode];
      return [...current, adcode];
    });
  }

  function applyPreset(slug: PresetSlug) {
    const preset = presets.find((item) => item.slug === slug);
    if (!preset) return;
    setPresetSlug(slug);
    setSelected(topDistrictIds(districts, preset.weights));
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  }

  return (
    <div className="space-y-6">
      <ComparePresetPanel
        activePreset={activePreset}
        presets={presets}
        copyState={copyState}
        onSelect={applyPreset}
        onCopy={copyShareLink}
      />

      <div className="card p-5">
        <h3 className="mb-1 text-sm font-semibold">选择 2–3 个区对比</h3>
        <p className="mb-3 text-xs text-ink-soft">最多 3 个，点选切换。</p>
        <div className="flex flex-wrap gap-2">
          {districts.map((district) => {
            const index = selected.indexOf(district.adcode);
            const active = index >= 0;
            return (
              <button
                key={district.adcode}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(district.adcode)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? 'border-transparent text-white'
                    : 'border-line bg-surface text-ink-soft hover:text-ink'
                }`}
                style={active ? { backgroundColor: COLORS[index % COLORS.length] } : undefined}
              >
                {district.name}
              </button>
            );
          })}
        </div>
      </div>

      {chosen.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-ink-soft">请至少选择一个区。</p>
          <button
            type="button"
            onClick={() => setSelected(topDistrictIds(districts, activePreset.weights))}
            className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-accent-strong"
          >
            带入预设前三名
          </button>
        </div>
      ) : (
        <>
          <ComparePresetResults
            preset={activePreset}
            districts={districts}
            selected={selected}
            copyState={copyState}
            onToggle={toggle}
          />

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="card flex flex-col items-center p-5">
              <RadarChart
                axes={METRICS.map((metric) => ({ label: metric.shortLabel }))}
                series={radarSeries}
                size={280}
              />
              <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
                {chosen.map((district, index) => (
                  <span key={district.adcode} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    {district.name}
                  </span>
                ))}
              </div>
            </div>

            <CompareTable chosen={chosen} citySlug={citySlug} preset={activePreset} />
          </div>
        </>
      )}
    </div>
  );
}
