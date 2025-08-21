'use client';

import React, { useState } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

/* ---------- COLORS ---------- */
const COLORS = {
    teal: '#10B3B6',
    orange: '#F97316',
    violet: '#7C3AED',
    amber: '#F59E0B',
    grid: '#E5E7EB',
    axis: '#6B7280',
};

/* ---------- DATA ---------- */
const SALES_BY_ITEMS = [
    { name: 'Pizza', teal: 600, violet: 520, orange: 160 },
    { name: 'Chicken..', teal: 180, violet: 220, orange: 140 },
    { name: 'Shawarma', teal: 320, violet: 260, orange: 220 },
    { name: 'Burger', teal: 260, violet: 540, orange: 200, highlight: true },
    { name: 'Platter', teal: 820, violet: 420, orange: 480 },
    { name: 'Sandwich', teal: 600, violet: 260, orange: 420 },
    { name: 'Pizza', teal: 960, violet: 300, orange: 260 },
];

const DONUT = [
    { name: 'Food Items', value: 35, color: COLORS.teal },
    { name: 'Beverages', value: 25, color: COLORS.orange },
    { name: 'Recipies', value: 25, color: COLORS.violet },
    { name: 'Label', value: 15, color: COLORS.amber },
];

/* ---------- TYPES ---------- */
interface MouseMoveEvent {
    activeTooltipIndex?: number | string | null;
}

/* ---------- SHARED UI ---------- */
function Card({
    title,
    subtitle,
    children,
    right,
    className = '',
}: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    right?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`bg-white rounded-3xl ring-1 ring-gray-200 h-full flex flex-col ${className}`}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
                    {subtitle && <p className="text-[12px] text-gray-500">{subtitle}</p>}
                </div>
                {right}
            </div>
            {/* body grows to fill height */}
            <div className="flex-1 min-h-0">{children}</div>
        </div>
    );
}
Card.displayName = 'Card';

/* ---------- TOP ROW (Sales by Items + Sale Channel) ---------- */
export default function TopRow() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    // Height fits rows so there's almost no bottom gap; capped with a sensible minimum.
    const rowHeight = 32; // reduced from 42 to make bars less thick
    const chartHeight = Math.max(400, SALES_BY_ITEMS.length * rowHeight); // reduced from 280 to 260

    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Left: Sales by Items (2/3 width on lg+) */}
            <div className="col-span-12 lg:col-span-8">
                <Card
                    title={<span className="text-xl font-bold text-gray-900">Sales by Items</span>}
                    subtitle={<span className="text-sm text-gray-500">Cost of Goods Sold analysis and trends</span>}
                    right={
                        <div className="flex items-center gap-2">
                            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-2 text-xs text-[#727A90]">
                                Food Items
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
                                </svg>

                            </button>
                            <button className="h-8 w-8 grid place-items-center text-gray-500 hover:bg-gray-50 rounded-xl">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <circle cx="8" cy="3" r="1.25" /><circle cx="8" cy="8" r="1.25" /><circle cx="8" cy="13" r="1.25" />
                                </svg>
                            </button>
                        </div>
                    }
                >
                    {/* Body: no bottom padding; chart fits height */}
                    <div className="px-4 md:px-6 pt-4 pb-0 h-full">
                        <div className="relative overflow-hidden" style={{ height: chartHeight }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={SALES_BY_ITEMS}
                                    barCategoryGap={28}  // increase gap between bars
                                    barSize={8}         // reduce bar thickness                        // reduced from 16 to 12 for thicker bars
                                    margin={{ top: 12, right: 24, bottom: 8, left: 56 }} // added 8px bottom margin instead of 0
                                    onMouseMove={(s: MouseMoveEvent) => setActiveIdx(typeof s?.activeTooltipIndex === 'number' ? s.activeTooltipIndex : null)}
                                    onMouseLeave={() => setActiveIdx(null)}
                                >
                                    <CartesianGrid horizontal={false} strokeDasharray="3 6" stroke={COLORS.grid} />
                                    <XAxis
                                        type="number"
                                        tick={{ fill: COLORS.axis, fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`)}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        width={64}
                                        tickMargin={4}
                                        tick={({ x, y, payload }: { x: number; y: number; payload: { index: number; value: string } }) => {
                                            const isHighlighted = payload.index === activeIdx || SALES_BY_ITEMS[payload.index]?.highlight;
                                            return (
                                                <g transform={`translate(${x},${y})`}>
                                                    <text
                                                        x={0}
                                                        y={0}
                                                        dy={4}
                                                        textAnchor="end"
                                                        className={isHighlighted ? 'font-semibold' : ''}
                                                        fill={isHighlighted ? COLORS.violet : COLORS.axis}
                                                        style={{ fontSize: 12 }}
                                                    >
                                                        {payload.value}
                                                    </text>
                                                </g>
                                            );
                                        }}
                                    />
                                    <Tooltip
                                        content={<BarsTooltip />}
                                    />
                                    <Bar dataKey="teal" stackId="x" fill={COLORS.teal} radius={[10, 10, 10, 10]} />
                                    <Bar dataKey="violet" stackId="x" fill={COLORS.violet} radius={[10, 10, 10, 10]} />
                                    <Bar dataKey="orange" stackId="x" fill={COLORS.orange} radius={[10, 10, 10, 10]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Right: Sale Channel (1/3 width on lg+) */}
            <div className="col-span-12 lg:col-span-4">
                <Card
                    title={<span className="text-xl font-bold text-gray-900">Sale Channel</span>}
                    subtitle={<span className="text-sm text-gray-500">Based on Sales</span>}
                    right={
                        <button className="h-8 w-8 grid place-items-center text-gray-500 hover:bg-gray-50 rounded-xl">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <circle cx="8" cy="3" r="1.25" /><circle cx="8" cy="8" r="1.25" /><circle cx="8" cy="13" r="1.25" />
                            </svg>
                        </button>
                    }
                    // Make right card visually align with left card height
                    className="min-h-[420px] text-xl"
                >
                    <div className="p-5 flex flex-col h-full">
                        <div className="mx-auto relative w-[240px] h-[240px] md:w-[260px] md:h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={DONUT}
                                        dataKey="value"
                                        innerRadius={86}   //  closer to outer, makes ring thinner
                                        outerRadius={92}   //  keep same, so thickness = 6px
                                        startAngle={90}
                                        endAngle={-270}
                                        paddingAngle={1}   //  reduce gap between arcs
                                        cornerRadius={4}   //  slightly rounded, not too chunky
                                        strokeWidth={0}
                                    >
                                        {DONUT.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 grid place-items-center pointer-events-none">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">$7,500</div>
                                    <div className="text-xs mt-0.5">
                                        <span className="text-emerald-600 font-semibold">10%</span>
                                        <span className="text-gray-500">  •  +$150 today</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-4 space-y-2">
                            {DONUT.map((l) => (
                                <div key={l.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                                        <span className="text-gray-700">{l.name}</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">$10,000</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

/* ---------- BarsTooltip (same as you had) ---------- */
function BarsTooltip({ active, payload }: { active?: boolean; payload?: Array<{ color?: string; fill?: string; name?: string; dataKey?: string; value: number }> }) {
    if (!active || !payload?.length) return null;
    const rows = payload
        .filter((p) => p.value > 0)
        .map((p) => ({
            color: p.color || p.fill,
            label: p.name || p.dataKey,
            value: p.value,
        }));
    return (
        <div className="rounded-xl bg-white  ring-1 ring-gray-200 px-3 py-2 text-xs">
            <div className="space-y-1">
                {rows.map((r, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                        <span className="text-gray-600">{r.label}:</span>
                        <span className="font-semibold text-gray-900">${r.value}</span>
                        <span className="text-emerald-600">▲</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
BarsTooltip.displayName = 'BarsTooltip';
