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

export interface FilterProps {
  entries: FilterEntry[];
  metricKeys: MetricKey[];
  metricLabels: Record<string, string>;
  metricShortLabels: Record<string, string>;
}

type GradeFilter = Record<string, boolean>;

const GRADE_ORDER = ['S', 'A', 'B', 'C', 'D'];

type SortKey = 'composite' | 'economy' | 'education' | 'healthcare' | 'transit' | 'amenity' | 'population';

export default function FilterTool({ entries, metricKeys, metricLabels, metricShortLabels }: FilterProps) {
  // ── State ──
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [gradeFilters, setGradeFilters] = useState<GradeFilter>({
    S: false, A: false, B: false, C: false, D: false,
  });
  const [scoreThresholds, setScoreThresholds] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const k of metricKeys) init[k] = 0;
    return init;
  });
  const [sortKey, setSortKey] = useState<SortKey>('composite');
  const [sortDesc, setSortDesc] = useState(true);

  // ── URL state sync (shareable) ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    if (city) setCityFilter(city);
    const grades = params.get('grades');
    if (grades) {
      const g: GradeFilter = { S: false, A: false, B: false, C: false, D: false };
      for (const grade of grades.split(',')) {
        if (g.hasOwnProperty(grade)) g[grade] = true;
      }
      setGradeFilters(g);
    }
    for (const k of metricKeys) {
      const val = params.get(`min_${k}`);
      if (val) setScoreThresholds((prev) => ({ ...prev, [k]: parseInt(val) }));
    }
    const sort = params.get('sort') as SortKey;
    if (sort) setSortKey(sort);
    const desc = params.get('desc');
    if (desc !== null) setSortDesc(desc !== '0');
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (cityFilter !== 'all') params.set('city', cityFilter);
    const activeGrades = GRADE_ORDER.filter((g) => gradeFilters[g]);
    if (activeGrades.length > 0) params.set('grades', activeGrades.join(','));
    for (const k of metricKeys) {
      if (scoreThresholds[k] > 0) params.set(`min_${k}`, String(scoreThresholds[k]));
    }
    if (sortKey !== 'composite') params.set('sort', sortKey);
    if (!sortDesc) params.set('desc', '0');
    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [cityFilter, gradeFilters, scoreThresholds, sortKey, sortDesc]);

  // ── Filter logic ──
  const filtered = useMemo(() => {
    let result = entries;
    if (cityFilter !== 'all') {
      result = result.filter((e) => e.cityKey === cityFilter);
    }
    const activeGradeFilters = GRADE_ORDER.filter((g) => gradeFilters[g]);
    if (activeGradeFilters.length > 0) {
      result = result.filter((e) => activeGradeFilters.includes(e.grade));
    }
    for (const k of metricKeys) {
      if (scoreThresholds[k] > 0) {
        result = result.filter((e) => e.metrics[k as MetricKey].score >= scoreThresholds[k]);
      }
    }
    // Sort
    const sorted = [...result].sort((a, b) => {
      let va: number, vb: number;
      if (sortKey === 'composite') {
        va = a.composite; vb = b.composite;
      } else {
        va = a.metrics[sortKey as MetricKey].score;
        vb = b.metrics[sortKey as MetricKey].score;
      }
      return sortDesc ? vb - va : va - vb;
    });
    return sorted;
  }, [entries, cityFilter, gradeFilters, scoreThresholds, sortKey, sortDesc]);

  const hasActiveFilters = cityFilter !== 'all' ||
    GRADE_ORDER.some((g) => gradeFilters[g]) ||
    metricKeys.some((k) => scoreThresholds[k] > 0);

  function resetFilters() {
    setCityFilter('all');
    setGradeFilters({ S: false, A: false, B: false, C: false, D: false });
    const reset: Record<string, number> = {};
    for (const k of metricKeys) reset[k] = 0;
    setScoreThresholds(reset);
    setSortKey('composite');
    setSortDesc(true);
  }

  const gradeColors: Record<string, string> = {
    S: 'var(--color-grade-s)', A: 'var(--color-grade-a)', B: 'var(--color-grade-b)',
    C: 'var(--color-grade-c)', D: 'var(--color-grade-d)',
  };

  return (
    <div>
      {/* ── Filter Controls ── */}
      <div className="card p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">🔧 筛选条件</h3>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-xs text-accent hover:underline">
              重置全部
            </button>
          )}
        </div>

        {/* City filter */}
        <div className="mt-4">
          <label className="text-xs font-medium text-ink-soft">城市</label>
          <div className="mt-1.5 flex gap-2">
            <button
              onClick={() => setCityFilter('all')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cityFilter === 'all' ? 'bg-accent text-white' : 'bg-surface-muted text-ink-soft hover:text-ink'}`}
            >
              全部
            </button>
            <button
              onClick={() => setCityFilter('shanghai')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cityFilter === 'shanghai' ? 'bg-accent text-white' : 'bg-surface-muted text-ink-soft hover:text-ink'}`}
            >
              上海
            </button>
            <button
              onClick={() => setCityFilter('yinchuan')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cityFilter === 'yinchuan' ? 'bg-accent text-white' : 'bg-surface-muted text-ink-soft hover:text-ink'}`}
            >
              银川
            </button>
          </div>
        </div>

        {/* Grade filter */}
        <div className="mt-4">
          <label className="text-xs font-medium text-ink-soft">评级门槛（勾选要包含的等级）</label>
          <div className="mt-1.5 flex gap-2">
            {GRADE_ORDER.map((g) => (
              <button
                key={g}
                onClick={() => setGradeFilters((prev) => ({ ...prev, [g]: !prev[g] }))}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition ${
                  gradeFilters[g] ? 'text-white shadow-md' : 'bg-surface-muted text-ink-soft opacity-50'
                }`}
                style={gradeFilters[g] ? { backgroundColor: gradeColors[g] } : {}}
                title={`评级 ${g}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Score thresholds */}
        <div className="mt-4">
          <label className="text-xs font-medium text-ink-soft">维度分数门槛（最低分）</label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metricKeys.map((k) => (
              <div key={k} className="rounded-lg border border-line bg-surface p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-ink">{metricShortLabels[k]}</span>
                  <span className={`text-xs font-bold ${scoreThresholds[k] > 0 ? 'text-accent' : 'text-ink-soft'}`}>
                    {scoreThresholds[k] > 0 ? `≥${scoreThresholds[k]}` : '不限'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={scoreThresholds[k]}
                  onChange={(e) => setScoreThresholds((prev) => ({ ...prev, [k]: parseInt(e.target.value) }))}
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

        {/* Sort */}
        <div className="mt-4 flex items-center gap-3">
          <label className="text-xs font-medium text-ink-soft">排序</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink"
          >
            <option value="composite">综合得分</option>
            {metricKeys.map((k) => (
              <option value={k}>{metricLabels[k]}</option>
            ))}
          </select>
          <button
            onClick={() => setSortDesc(!sortDesc)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft transition hover:text-accent"
          >
            {sortDesc ? '↓ 降序' : '↑ 升序'}
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          共 <strong className="text-ink">{filtered.length}</strong> 个区域符合条件
          {filtered.length !== entries.length && <span className="text-ink-soft">（总计 {entries.length}）</span>}
        </p>
        <p className="text-xs text-ink-soft">筛选条件已同步至 URL，可直接分享链接</p>
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-4 p-10 text-center">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 text-ink-soft">没有符合条件的区域，请调整筛选条件。</p>
          <button onClick={resetFilters} className="mt-4 rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition hover:bg-accent-strong">
            重置筛选
          </button>
        </div>
      ) : (
        <div className="card mt-4 overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">排名</th>
                <th className="px-4 py-3 font-medium">区域</th>
                <th className="px-4 py-3 font-medium">城市</th>
                <th className="px-4 py-3 font-medium">评级</th>
                <th className="px-4 py-3 font-medium">综合分</th>
                {metricKeys.map((k) => (
                  <th key={k} className="px-4 py-3 text-center font-medium">
                    {metricShortLabels[k]}
                    {scoreThresholds[k] > 0 && <span className="ml-1 text-accent">≥{scoreThresholds[k]}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((entry, i) => (
                <tr key={entry.adcode} className="transition hover:bg-surface-muted">
                  <td className="px-4 py-3 text-ink-soft">{i + 1}</td>
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
                  {metricKeys.map((k) => {
                    const score = entry.metrics[k as MetricKey].score;
                    const passes = score >= scoreThresholds[k];
                    return (
                      <td key={k} className="px-4 py-3 text-center">
                        <span
                          className={`text-xs font-medium ${
                            scoreThresholds[k] > 0 && passes
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
