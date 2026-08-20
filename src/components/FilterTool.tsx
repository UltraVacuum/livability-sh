import { useState, useMemo, useEffect } from 'react';
import type { MetricKey } from '../data/districts';

export interface FilterEntry {
  cityKey: string;
  cityName: string;
  adcode: string;
  name: string;
  composite: number;
  rank: number;
  grade: string;
  metrics: Record<MetricKey, { score: number; rawValue: number; unit: string }>;
}

export interface CityOption {
  key: string;
  name: string;
}

export interface FilterProps {
  entries: FilterEntry[];
  cities: CityOption[];
  metricKeys: MetricKey[];
  metricLabels: Record<string, string>;
  metricShortLabels: Record<string, string>;
}

type GradeFilter = Record<string, boolean>;
type CopyState = 'idle' | 'copied' | 'error';

const GRADE_ORDER = ['S', 'A', 'B', 'C', 'D'];
type SortKey = 'composite' | MetricKey;

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export default function FilterTool({
  entries,
  cities,
  metricKeys,
  metricLabels,
  metricShortLabels,
}: FilterProps) {
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [gradeFilters, setGradeFilters] = useState<GradeFilter>({
    S: false,
    A: false,
    B: false,
    C: false,
    D: false,
  });
  const [scoreThresholds, setScoreThresholds] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const key of metricKeys) initial[key] = 0;
    return initial;
  });
  const [sortKey, setSortKey] = useState<SortKey>('composite');
  const [sortDesc, setSortDesc] = useState(true);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    if (city && cities.some((option) => option.key === city)) setCityFilter(city);

    const grades = params.get('grades');
    if (grades) {
      const nextGrades: GradeFilter = { S: false, A: false, B: false, C: false, D: false };
      for (const grade of grades.split(',')) {
        if (GRADE_ORDER.includes(grade)) nextGrades[grade] = true;
      }
      setGradeFilters(nextGrades);
    }

    for (const key of metricKeys) {
      const value = params.get(`min_${key}`);
      if (value === null) continue;
      const parsed = clampScore(Number.parseInt(value, 10));
      setScoreThresholds((previous) => ({ ...previous, [key]: parsed }));
    }

    const requestedSort = params.get('sort');
    if (requestedSort === 'composite') {
      setSortKey('composite');
    } else if (metricKeys.includes(requestedSort as MetricKey)) {
      setSortKey(requestedSort as MetricKey);
    }
    const desc = params.get('desc');
    if (desc !== null) setSortDesc(desc !== '0');
  }, [cities, metricKeys]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (cityFilter !== 'all') params.set('city', cityFilter);
    const activeGrades = GRADE_ORDER.filter((grade) => gradeFilters[grade]);
    if (activeGrades.length > 0) params.set('grades', activeGrades.join(','));
    for (const key of metricKeys) {
      if (scoreThresholds[key] > 0) params.set(`min_${key}`, String(scoreThresholds[key]));
    }
    if (sortKey !== 'composite') params.set('sort', sortKey);
    if (!sortDesc) params.set('desc', '0');

    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, '', nextUrl);
  }, [cityFilter, gradeFilters, scoreThresholds, sortKey, sortDesc, metricKeys]);

  useEffect(() => {
    if (copyState === 'idle') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2400);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const filtered = useMemo(() => {
    let result = entries;
    if (cityFilter !== 'all') {
      result = result.filter((entry) => entry.cityKey === cityFilter);
    }
    const activeGradeFilters = GRADE_ORDER.filter((grade) => gradeFilters[grade]);
    if (activeGradeFilters.length > 0) {
      result = result.filter((entry) => activeGradeFilters.includes(entry.grade));
    }
    for (const key of metricKeys) {
      if (scoreThresholds[key] > 0) {
        result = result.filter((entry) => entry.metrics[key].score >= scoreThresholds[key]);
      }
    }

    return [...result].sort((a, b) => {
      const left = sortKey === 'composite' ? a.composite : a.metrics[sortKey].score;
      const right = sortKey === 'composite' ? b.composite : b.metrics[sortKey].score;
      return sortDesc ? right - left : left - right;
    });
  }, [entries, cityFilter, gradeFilters, scoreThresholds, sortKey, sortDesc, metricKeys]);

  const hasActiveFilters =
    cityFilter !== 'all' ||
    GRADE_ORDER.some((grade) => gradeFilters[grade]) ||
    metricKeys.some((key) => scoreThresholds[key] > 0);

  function resetFilters() {
    setCityFilter('all');
    setGradeFilters({ S: false, A: false, B: false, C: false, D: false });
    const reset: Record<string, number> = {};
    for (const key of metricKeys) reset[key] = 0;
    setScoreThresholds(reset);
    setSortKey('composite');
    setSortDesc(true);
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  }

  const gradeColors: Record<string, string> = {
    S: 'var(--color-grade-s)',
    A: 'var(--color-grade-a)',
    B: 'var(--color-grade-b)',
    C: 'var(--color-grade-c)',
    D: 'var(--color-grade-d)',
  };

  return (
    <div>
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold">🔧 筛选条件</h3>
          <div className="flex flex-wrap items-center gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-accent hover:text-accent"
              >
                重置全部
              </button>
            )}
            <button
              type="button"
              onClick={copyShareLink}
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-white transition hover:bg-accent-strong"
            >
              {copyState === 'copied' ? '✓ 已复制' : copyState === 'error' ? '复制失败' : '复制分享链接'}
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-ink-soft" aria-live="polite">
          {copyState === 'copied'
            ? '当前筛选链接已复制。'
            : copyState === 'error'
              ? '复制失败，请手动复制地址栏链接。'
              : '城市、评级、分数门槛与排序会同步到 URL。'}
        </p>

        <div className="mt-4">
          <span className="text-xs font-medium text-ink-soft">城市</span>
          <div className="mt-1.5 flex flex-wrap gap-2" role="group" aria-label="城市筛选">
            <button
              type="button"
              aria-pressed={cityFilter === 'all'}
              onClick={() => setCityFilter('all')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                cityFilter === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-surface-muted text-ink-soft hover:text-ink'
              }`}
            >
              全部
            </button>
            {cities.map((city) => (
              <button
                key={city.key}
                type="button"
                aria-pressed={cityFilter === city.key}
                onClick={() => setCityFilter(city.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  cityFilter === city.key
                    ? 'bg-accent text-white'
                    : 'bg-surface-muted text-ink-soft hover:text-ink'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-xs font-medium text-ink-soft">评级门槛（勾选要包含的等级）</span>
          <div className="mt-1.5 flex gap-2">
            {GRADE_ORDER.map((grade) => (
              <button
                key={grade}
                type="button"
                aria-pressed={gradeFilters[grade]}
                onClick={() => setGradeFilters((previous) => ({ ...previous, [grade]: !previous[grade] }))}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition ${
                  gradeFilters[grade]
                    ? 'text-white shadow-md'
                    : 'bg-surface-muted text-ink-soft opacity-50'
                }`}
                style={gradeFilters[grade] ? { backgroundColor: gradeColors[grade] } : undefined}
                aria-label={`包含评级 ${grade}`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-xs font-medium text-ink-soft">维度分数门槛（最低分）</span>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metricKeys.map((key) => (
              <div key={key} className="rounded-lg border border-line bg-surface p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-ink">{metricShortLabels[key]}</span>
                  <span className={`text-xs font-bold ${scoreThresholds[key] > 0 ? 'text-accent' : 'text-ink-soft'}`}>
                    {scoreThresholds[key] > 0 ? `≥${scoreThresholds[key]}` : '不限'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={scoreThresholds[key]}
                  onChange={(event) =>
                    setScoreThresholds((previous) => ({
                      ...previous,
                      [key]: clampScore(Number.parseInt(event.target.value, 10)),
                    }))
                  }
                  aria-label={`${metricLabels[key]}最低分`}
                  className="mt-2 w-full"
                />
                <div className="mt-0.5 flex justify-between text-[10px] text-ink-soft">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label htmlFor="filter-sort" className="text-xs font-medium text-ink-soft">
            排序
          </label>
          <select
            id="filter-sort"
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink"
          >
            <option value="composite">综合得分</option>
            {metricKeys.map((key) => (
              <option key={key} value={key}>
                {metricLabels[key]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSortDesc(!sortDesc)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft transition hover:text-accent"
          >
            {sortDesc ? '↓ 降序' : '↑ 升序'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          共 <strong className="text-ink">{filtered.length}</strong> 个区域符合条件
          {filtered.length !== entries.length && (
            <span className="text-ink-soft">（总计 {entries.length}）</span>
          )}
        </p>
        <p className="text-xs text-ink-soft">筛选条件已同步至 URL，可直接分享链接</p>
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-4 p-10 text-center">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 text-ink-soft">没有符合条件的区域，请调整筛选条件。</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition hover:bg-accent-strong"
          >
            重置筛选
          </button>
        </div>
      ) : (
        <div className="card mt-4 overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs text-ink-soft">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">区域</th>
                <th scope="col" className="px-4 py-3">城市</th>
                <th scope="col" className="px-4 py-3">评级</th>
                <th scope="col" className="px-4 py-3">综合</th>
                {metricKeys.map((key) => (
                  <th key={key} scope="col" className="px-4 py-3 text-center">
                    {metricShortLabels[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((entry, index) => (
                <tr key={`${entry.cityKey}-${entry.adcode}`} className="transition hover:bg-surface-muted">
                  <td className="px-4 py-3 text-ink-soft">{index + 1}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`/${entry.cityKey}/district/${entry.adcode}`}
                      className="font-medium text-ink hover:text-accent"
                    >
                      {entry.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-soft">{entry.cityName}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                      style={{ backgroundColor: gradeColors[entry.grade] }}
                    >
                      {entry.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink">{entry.composite.toFixed(0)}</td>
                  {metricKeys.map((key) => {
                    const score = entry.metrics[key].score;
                    const passes = score >= scoreThresholds[key];
                    return (
                      <td key={key} className="px-4 py-3 text-center">
                        <span
                          className={`text-xs font-medium ${
                            scoreThresholds[key] > 0 && passes
                              ? 'font-bold text-emerald-600'
                              : score >= 70
                                ? 'text-emerald-600'
                                : score >= 50
                                  ? 'text-amber-600'
                                  : 'text-ink-soft'
                          }`}
                        >
                          {score.toFixed(0)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
