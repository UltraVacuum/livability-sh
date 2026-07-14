import { useEffect, useMemo, useRef, useState } from 'react';
// Type-only import — erased at build, so Leaflet's top-level `window` access
// never runs during SSR. The runtime module is dynamically imported in the
// browser-only effect below.
import type * as LeafType from 'leaflet';
import { METRICS, DEFAULT_WEIGHTS } from '../data/districts';
import {
  rankWithWeights,
  GRADE_COLOR,
  scoreColor,
  type ScoredDistrict,
  type Weights,
} from '../lib/scoring';

interface Props {
  districts: ScoredDistrict[];
  citySlug: string;
}

const boundaryUrl = (citySlug: string) => `/boundaries/${citySlug}.json`;

export default function Explorer({ districts, citySlug }: Props) {
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafType.Map | null>(null);
  const layerRef = useRef<LeafType.GeoJSON | null>(null);

  const ranked = useMemo(
    () => rankWithWeights(districts, weights),
    [districts, weights],
  );

  // adcode → {composite, rank, grade} for map styling + tooltips
  const info = useMemo(() => {
    const m = new Map<string, { composite: number; rank: number; grade: string }>();
    for (const r of ranked) {
      m.set(r.district.adcode, {
        composite: r.composite,
        rank: r.rank,
        grade: r.grade,
      });
    }
    return m;
  }, [ranked]);

  const styleFor = (adcode: string): LeafType.PathOptions => {
    const i = info.get(adcode);
    const score = i?.composite ?? 50;
    return {
      fillColor: scoreColor(score),
      color: '#ffffff',
      weight: 1.5,
      fillOpacity: 0.85,
    };
  };

  // init map once (browser only)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const Lmod = await import('leaflet');
      const L = (Lmod as unknown as { default: typeof LeafType }).default ?? Lmod;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([31.23, 121.47], 9);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap © CARTO · 边界 DataV.GeoAtlas',
      }).addTo(map);
      mapRef.current = map;

      try {
        const geojson = await (await fetch(boundaryUrl(citySlug))).json();
        if (cancelled) return;
        const layer = L.geoJSON(geojson, {
          style: (feature) => styleFor(String(feature?.properties?.adcode)),
          onEachFeature: (feature, lyr) => {
            const fAdcode = String(feature?.properties?.adcode);
            const name = feature?.properties?.name ?? fAdcode;
            const i = info.get(fAdcode);
            lyr.bindTooltip(
              i
                ? `<b>${name}</b><br/>${i.grade} 级 · 综合分 ${i.composite.toFixed(0)} · 第 ${i.rank} 名`
                : `<b>${name}</b><br/>暂无数据`,
            );
            lyr.on('click', () => {
              window.location.href = `/${citySlug}/district/${fAdcode}`;
            });
          },
        }).addTo(map);
        layerRef.current = layer;
        try {
          map.fitBounds(layer.getBounds(), { padding: [12, 12] });
        } catch {
          /* bounds not ready */
        }
      } catch {
        /* network blocked — map is optional */
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // restyle polygons whenever weights change the composite scores
  useEffect(() => {
    if (!layerRef.current) return;
    layerRef.current.eachLayer((lyr) => {
      const feature = (lyr as LeafType.FeatureGroup).feature as
        | { properties?: { adcode?: string; name?: string } }
        | undefined;
      const adcode = String(feature?.properties?.adcode ?? '');
      const i = info.get(adcode);
      const name = feature?.properties?.name ?? adcode;
      (lyr as LeafType.Path).setStyle(styleFor(adcode));
      (lyr as LeafType.Layer).setTooltipContent(
        i
          ? `<b>${name}</b><br/>${i.grade} 级 · 综合分 ${i.composite.toFixed(0)} · 第 ${i.rank} 名`
          : `<b>${name}</b><br/>暂无数据`,
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const reset = () => setWeights(DEFAULT_WEIGHTS);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      {/* map + weights */}
      <div className="space-y-4">
        <div className="card overflow-hidden p-0" style={{ height: '460px' }}>
          <div ref={containerRef} className="h-full w-full" />
        </div>

        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">🎛️ 自定义权重</h3>
            <button
              type="button"
              onClick={reset}
              className="text-xs text-ink-soft transition hover:text-accent"
            >
              重置为均权
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.map((m) => (
              <label key={m.key} className="block">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-ink-soft">{m.label}</span>
                  <span className="font-medium text-ink">{weights[m.key].toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={0.1}
                  value={weights[m.key]}
                  onChange={(e) =>
                    setWeights((w) => ({ ...w, [m.key]: Number(e.target.value) }))
                  }
                  className="w-full"
                />
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            拖动滑块调整六维权重，地图颜色与右侧排行榜实时重排 —— 找出「对你最宜居的区」。
          </p>
        </div>
      </div>

      {/* live leaderboard */}
      <div className="card h-fit p-3">
        <h3 className="px-2 py-2 text-sm font-semibold">
          宜居度排行榜 <span className="text-ink-soft">（{ranked.length} 区）</span>
        </h3>
        <div className="px-2 pb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索区名…"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent"
          />
        </div>
        <ol className="space-y-1">
          {ranked
            .filter((r) => !searchQuery || r.district.name.includes(searchQuery.trim()))
            .map((r) => (
            <li key={r.district.adcode}>
              <a
                href={`/${citySlug}/district/${r.district.adcode}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-surface-muted"
              >
                <span className="w-6 shrink-0 text-center text-sm font-semibold text-ink-soft">
                  {r.rank}
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: GRADE_COLOR[r.grade] }}
                >
                  {r.grade}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">
                    {r.district.name}
                  </span>
                  <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${r.composite}%`, backgroundColor: 'var(--color-accent)' }}
                    />
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-ink">
                  {r.composite.toFixed(0)}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
