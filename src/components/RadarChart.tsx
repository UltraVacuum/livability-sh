interface Axis {
  label: string;
}
interface Series {
  name: string;
  color: string;
  values: number[]; // 0..100, aligned to axes
}

interface Props {
  axes: Axis[];
  series: Series[];
  size?: number;
}

export default function RadarChart({ axes, series, size = 260 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 38; // padding for labels
  const n = axes.length;

  const pointAt = (i: number, r: number) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="维度雷达图">
      {/* grid rings */}
      {rings.map((ring, ri) => (
        <polygon
          key={ri}
          points={axes
            .map((_, i) => {
              const [x, y] = pointAt(i, R * ring);
              return `${x},${y}`;
            })
            .join(' ')}
          fill={ri === rings.length - 1 ? '#f8fafc' : 'none'}
          stroke="#e2e8f0"
          strokeWidth={1}
        />
      ))}

      {/* axis lines + labels */}
      {axes.map((ax, i) => {
        const [x, y] = pointAt(i, R);
        const [lx, ly] = pointAt(i, R + 18);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth={1} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fill="#475569"
            >
              {ax.label}
            </text>
          </g>
        );
      })}

      {/* series polygons */}
      {series.map((s, si) => (
        <g key={si}>
          <polygon
            points={s.values
              .map((v, i) => {
                const [x, y] = pointAt(i, (Math.max(0, Math.min(100, v)) / 100) * R);
                return `${x},${y}`;
              })
              .join(' ')}
            fill={s.color}
            fillOpacity={0.18}
            stroke={s.color}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {s.values.map((v, i) => {
            const [x, y] = pointAt(i, (Math.max(0, Math.min(100, v)) / 100) * R);
            return <circle key={i} cx={x} cy={y} r={2.5} fill={s.color} />;
          })}
        </g>
      ))}
    </svg>
  );
}
