import { useMemo, useState } from 'react';

export type DigitalScenarioKey = 'total' | 'perCapita' | 'relative';

export type DigitalMetricKey =
  | 'smartAverage'
  | 'officialDigitalShare'
  | 'coreIndustryEmployees'
  | 'digitalCompanies'
  | 'fiveGStations';

export interface DigitalMetricDefinition {
  key: DigitalMetricKey;
  label: string;
  totalDescription: string;
  perCapitaDescription: string;
  totalUnit: string;
  perCapitaUnit: string;
  populationScaled: boolean;
}

export interface DigitalScenarioCity {
  key: string;
  name: string;
  color: string;
  populationWan: number;
  values: Record<DigitalMetricKey, number | undefined>;
}

interface Props {
  metrics: DigitalMetricDefinition[];
  cities: DigitalScenarioCity[];
}

const SCENARIOS: Array<{
  key: DigitalScenarioKey;
  title: string;
  emoji: string;
  description: string;
}> = [
  {
    key: 'total',
    title: '总量口径',
    emoji: '🏙️',
    description: '回答“城市体量有多大”。总量受行政范围和常住人口规模影响，天然偏向上海、北京这样的超大城市。',
  },
  {
    key: 'perCapita',
    title: '人均口径',
    emoji: '🧮',
    description: '就业、企业、基站按常住人口折算为“每万人”；占比和指数本身已是强度指标，不做人口均摊。',
  },
  {
    key: 'relative',
    title: '三城相对值',
    emoji: '📈',
    description: '以人均/强度口径下三城最强者为 100，消除城市规模差异后观察相对差距；不同指标之间不能互相相加。',
  },
];

function compactNumber(value: number): string {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
  if (value >= 100) return value.toLocaleString('zh-CN', { maximumFractionDigits: 1 });
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

function formatValue(value: number | undefined, scenarioKey: DigitalScenarioKey): string {
  if (value === undefined || !Number.isFinite(value)) return '—';
  if (scenarioKey === 'relative') return value.toFixed(1);
  return compactNumber(value);
}

export default function DigitalScenarioTool({ metrics, cities }: Props) {
  const [scenarioKey, setScenarioKey] = useState<DigitalScenarioKey>('total');
  const activeScenario = SCENARIOS.find((scenario) => scenario.key === scenarioKey) ?? SCENARIOS[0];

  const rows = useMemo(() => {
    return metrics.map((metric) => {
      const baseValues = cities.map((city) => {
        const value = city.values[metric.key];
        if (value === undefined) return undefined;
        if (scenarioKey === 'perCapita' && metric.populationScaled) {
          return city.populationWan > 0 ? value / city.populationWan : undefined;
        }
        return value;
      });

      let relativeBase = baseValues;
      if (scenarioKey === 'relative') {
        const normalized = cities.map((city) => {
          const value = city.values[metric.key];
          if (value === undefined) return undefined;
          if (metric.populationScaled && city.populationWan > 0) {
            return value / city.populationWan;
          }
          return value;
        });
        const max = Math.max(...normalized.filter((value): value is number => value !== undefined));
        relativeBase = normalized.map((value) =>
          value === undefined || max <= 0 ? undefined : (value / max) * 100,
        );
      }

      const values = cities.map((city, index) => ({
        city,
        value: relativeBase[index],
      }));
      const max = Math.max(...values.map((item) => item.value ?? 0));

      return { metric, values, max };
    });
  }, [cities, metrics, scenarioKey]);

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-ink">📊 五项核心指标场景切换</h2>
          <p className="mt-1 text-sm text-ink-soft">
            同一份数据在三种口径下会得出不同结论：先明确比较目的，再读图。
          </p>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="数字指标场景口径"
        >
          {SCENARIOS.map((scenario) => {
            const active = scenario.key === scenarioKey;
            return (
              <button
                key={scenario.key}
                type="button"
                aria-pressed={active}
                onClick={() => setScenarioKey(scenario.key)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-accent text-white shadow-sm'
                    : 'border border-line bg-surface text-ink-soft hover:border-accent/50 hover:text-ink'
                }`}
              >
                {scenario.emoji} {scenario.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="mt-5 rounded-xl border border-accent/20 bg-accent-soft p-4 text-sm leading-relaxed text-ink"
        aria-live="polite"
      >
        <strong>{activeScenario.emoji} {activeScenario.title}：</strong>
        {activeScenario.description}
      </div>

      <dl className="mt-4 grid gap-3 text-xs text-ink-soft sm:grid-cols-3">
        {cities.map((city) => (
          <div key={city.key} className="rounded-lg bg-surface-muted p-3">
            <dt className="font-medium text-ink">{city.name}</dt>
            <dd className="mt-1">常住人口基准 {city.populationWan.toFixed(2)} 万人</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 space-y-7">
        {rows.map(({ metric, values, max }) => (
          <div key={metric.key}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-ink">{metric.label}</h3>
              <p className="text-xs text-ink-soft">
                {scenarioKey === 'total'
                  ? metric.totalDescription
                  : metric.perCapitaDescription}
              </p>
            </div>
            <div className="mt-3 space-y-2">
              {values.map(({ city, value }) => {
                const ratio = value === undefined || max <= 0 ? 0 : value / max;
                const unit =
                  scenarioKey === 'relative'
                    ? '相对值'
                    : scenarioKey === 'total' || !metric.populationScaled
                      ? metric.totalUnit
                      : metric.perCapitaUnit;
                return (
                  <div
                    key={city.key}
                    className="grid grid-cols-[3.5rem_1fr_6rem] items-center gap-3 text-sm"
                  >
                    <span className="text-ink-soft">{city.name}</span>
                    <div className="h-3 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${ratio * 100}%`, backgroundColor: city.color }}
                      />
                    </div>
                    <span className="text-right font-semibold text-ink">
                      {formatValue(value, scenarioKey)}
                      <span className="ml-1 text-[10px] font-normal text-ink-soft">{unit}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
