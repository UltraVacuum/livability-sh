import { useState, useMemo } from 'react';

export interface SearchEntry {
  cityKey: string;
  cityName: string;
  adcode: string;
  name: string;
  composite: number;
  rank: number;
  grade: string;
  topMetric: string;
  topMetricLabel: string;
}

interface Props {
  entries: SearchEntry[];
}

const gradeColor: Record<string, string> = {
  S: 'var(--color-grade-s)',
  A: 'var(--color-grade-a)',
  B: 'var(--color-grade-b)',
  C: 'var(--color-grade-c)',
  D: 'var(--color-grade-d)',
};

export default function SearchBox({ entries }: Props) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return entries
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.cityName.toLowerCase().includes(q) ||
          e.adcode.includes(q),
      )
      .sort((a, b) => b.composite - a.composite)
      .slice(0, 12);
  }, [query, entries]);

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入区名、城市名或行政代码…"
          className="w-full rounded-xl border border-line bg-surface px-5 py-4 text-lg shadow-sm outline-none transition focus:border-accent focus:shadow-md"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft transition hover:text-ink"
          >
            ✕
          </button>
        )}
      </div>

      {query && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-soft">
              未找到匹配的区县。试试「浦东」「兴庆」「上海」等关键词。
            </p>
          ) : (
            <>
              <p className="mb-3 text-sm text-ink-soft">
                找到 <span className="font-semibold text-ink">{results.length}</span> 个结果
              </p>
              <div className="space-y-2">
                {results.map((r) => (
                  <a
                    href={`/${r.cityKey}/district/${r.adcode}`}
                    className="card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                      style={{ backgroundColor: gradeColor[r.grade] }}
                    >
                      {r.grade}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{r.name}</span>
                        <span className="text-sm text-ink-soft">{r.cityName}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-ink-soft">
                        <span>综合 {r.composite.toFixed(0)} 分</span>
                        <span>{r.cityName}第 {r.rank} 名</span>
                        <span>强项: {r.topMetricLabel}</span>
                      </div>
                    </div>
                    <span className="shrink-0 text-2xl opacity-30 transition group-hover:opacity-60">→</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
