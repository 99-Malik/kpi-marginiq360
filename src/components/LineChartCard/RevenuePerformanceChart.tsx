'use client';

import * as React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,

} from 'recharts';

type Datum = { m: string; income: number; profit: number; expense: number };
type SeriesKey = 'income' | 'profit' | 'expense';

const DATA: Datum[] = [
  { m: 'Jan', income: 740, profit: 310, expense: 520 },
  { m: 'Feb', income: 620, profit: 200, expense: 380 },
  { m: 'Mar', income: 820, profit: 240, expense: 600 },
  { m: 'Apr', income: 660, profit: 300, expense: 680 },
  { m: 'May', income: 780, profit: 360, expense: 540 },
  { m: 'Jun', income: 800, profit: 340, expense: 560 },
  { m: 'Jul', income: 680, profit: 388, expense: 580 },
  { m: 'Aug', income: 720, profit: 360, expense: 600 },
  { m: 'Sep', income: 920, profit: 300, expense: 520 },
  { m: 'Oct', income: 580, profit: 180, expense: 620 },
  { m: 'Nov', income: 760, profit: 300, expense: 460 },
  { m: 'Dec', income: 700, profit: 420, expense: 660 },
];

const yTicks = [0, 200, 400, 600, 800, 1000, 1200];
const money = (v: number) => (v === 0 ? '0' : v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`);

/** Typed tooltip (no any) */
interface TooltipCardProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
    color?: string;
  }>;
}

function TooltipCard({ active, payload }: TooltipCardProps) {
  if (!active || !payload || payload.length === 0) return null;

  const getVal = (k: SeriesKey): number => {
    const item = payload.find((p) => p.dataKey === k);
    const v = item?.value;
    return typeof v === 'number' ? v : v != null ? Number(v) : 0;
  };

  const rows: Array<{ key: SeriesKey; label: string; dot: string }> = [
    { key: 'income', label: 'Income', dot: '#6E0AB8' },
    { key: 'profit', label: 'Profit', dot: '#14B8A6' },
    { key: 'expense', label: 'Expense', dot: '#F97316' },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm text-sm">
      {rows.map(({ key, label, dot }) => (
        <div key={key} className="flex items-center gap-2 py-0.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
          <span className="text-gray-700">{label} :</span>
          <span className="font-semibold">${getVal(key).toLocaleString()}</span>
          <span className="text-emerald-500">▲</span>
        </div>
      ))}
    </div>
  );
}

/** Minimal prop shapes to type custom tick & mouse state */
type TickRendererProps = { x: number; y: number; payload: { value: string | number } };
type MouseMoveState = { isTooltipActive?: boolean; activeLabel?: string | number };


export default function RevenuePerformanceChart() {
  // track hovered month for the orange guide + x-axis highlight
  const [activeLabel, setActiveLabel] = React.useState<string | null>(null);
  const effectiveLabel = activeLabel ?? 'Jul';
  const activeDatum =
    DATA.find((d) => d.m === effectiveLabel) ?? DATA.find((d) => d.m === 'Jul')!;

  // custom X tick to color the active month
  const renderXTick = ({ x, y, payload }: TickRendererProps) => {
    const label = String(payload.value);
    const isActive = label === effectiveLabel;
    return (
      <text x={x} y={y + 12} textAnchor="middle" fontSize={12} fill={isActive ? '#F97316' : '#6b7280'}>
        {label}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={DATA}
        // extra right margin + XAxis padding keeps "Dec" off the edge
        margin={{ left: 48, right: 40, top: 8, bottom: 28 }}
        onMouseMove={(state: MouseMoveState) => {
          if (state?.isTooltipActive && state.activeLabel != null) {
            setActiveLabel(String(state.activeLabel));
          }
        }}
        onMouseLeave={() => setActiveLabel(null)}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(2,6,23,0.12)" />

        <XAxis
          dataKey="m"
          tick={renderXTick}
          axisLine={false}
          tickLine={false}
          tickMargin={12}
          padding={{ left: 8, right: 28 }} // push last tick inward
          interval={0}
        />

        <YAxis
          ticks={yTicks}
          domain={[0, 1200]}
          tickFormatter={money}
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />

        {/* thinner lines */}
        <Line type="monotone" dataKey="income"  stroke="#6E0AB8" strokeWidth={2} dot={false} activeDot={{ r: 5 }} strokeLinecap="round" />
        <Line type="monotone" dataKey="expense" stroke="#F97316" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: '#F97316' }} strokeLinecap="round" />
        <Line type="monotone" dataKey="profit"  stroke="#14B8A6" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: '#14B8A6' }} strokeLinecap="round" />

        {/* orange dashed guide that follows the hovered month */}
        <ReferenceLine x={effectiveLabel} stroke="#F97316" strokeDasharray="3 3" strokeWidth={1} />
        <ReferenceDot x={effectiveLabel} y={activeDatum.expense} r={4} fill="#F97316" stroke="none" />

        <Tooltip content={<TooltipCard />} cursor={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
