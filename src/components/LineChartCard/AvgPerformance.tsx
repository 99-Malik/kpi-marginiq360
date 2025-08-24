'use client';

import * as React from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceLine,
    ReferenceDot,
} from 'recharts';

const PURPLE = '#6E0AB8';
const GRID = '#E6E9EF';
const UP = '#0F9A9A';

// layout constants
const LEFT_MARGIN = 16;   // outside padding for chart canvas
const YAXIS_WIDTH = 56;   // reserved px for y ticks/labels

type Point = { name: string; value: number };

const MONTHS: Point[] = [
    { name: 'Jan', value: 2.4 },
    { name: 'Feb', value: 2.9 },
    { name: 'Mar', value: 3.3 },
    { name: 'Apr', value: 3.1 },
    { name: 'May', value: 3.4 },
    { name: 'Jun', value: 4.5 }, // reference month
    { name: 'Jul', value: 4.0 },
    { name: 'Aug', value: 4.2 },
    { name: 'Sep', value: 4.8 },
    { name: 'Oct', value: 3.3 },
    { name: 'Nov', value: 3.1 },
    { name: 'Dec', value: 3.4 },
];

const WEEKLY: Point[] = MONTHS;   // demo: reuse (wire your real series)
const YEARLY: Point[] = MONTHS;   // demo: reuse

function average(arr: Point[]) {
    return arr.reduce((s, p) => s + p.value, 0) / arr.length;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
    if (!active || !payload?.length) return null;
    const v = payload[0].value;
    return (
        <div className="rounded-xl bg-white shadow-md px-3 py-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: PURPLE }} />
            <span className="text-sm text-gray-600">Performance :</span>
            <span className="text-sm font-semibold text-gray-900">{v}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.27325 10.6666H11.7266C11.8584 10.666 11.9872 10.6264 12.0965 10.5527C12.2058 10.479 12.2908 10.3745 12.3408 10.2525C12.3907 10.1304 12.4034 9.99635 12.3771 9.86714C12.3508 9.73794 12.2869 9.61941 12.1932 9.52657L8.47325 5.80657C8.41127 5.74409 8.33754 5.69449 8.2563 5.66065C8.17506 5.6268 8.08792 5.60937 7.99991 5.60938C7.91191 5.60937 7.82477 5.6268 7.74353 5.66065C7.66229 5.69449 7.58856 5.74409 7.52658 5.80657L3.80658 9.52657C3.71297 9.61941 3.64898 9.73794 3.62273 9.86714C3.59647 9.99635 3.60912 10.1304 3.65907 10.2525C3.70902 10.3745 3.79403 10.479 3.90335 10.5527C4.01267 10.6264 4.1414 10.666 4.27325 10.6666Z" fill="#009499" />
            </svg>

        </div>
    );
};

export default function TrendsTab() {
    const [range, setRange] = React.useState<'Weekly' | 'Monthly' | 'Yearly'>('Weekly');

    const data = React.useMemo(() => {
        if (range === 'Weekly') return WEEKLY;
        if (range === 'Yearly') return YEARLY;
        return MONTHS;
    }, [range]);

    const avg = React.useMemo(() => average(data), [data]);

    // simple delta: last 3 vs previous 3
    const recent = average(data.slice(-3));
    const prior = average(data.slice(-6, -3));
    const changePct = prior ? ((recent - prior) / prior) * 100 : 0;

    const refLabel = 'Jun';
    const refVal = data.find(d => d.name === refLabel)?.value ?? 0;

    return (
        <div className="rounded-md border border-[#E9EAEA] bg-white p-4">
            {/* Header + Segmented control */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-[18px] font-semibold text-gray-900">Performance Trends</h3>
                    <p className="text-[14px] text-gray-500">Track progress against operational targets</p>
                </div>

                <div className="flex items-center gap-1 rounded-md border border-[#E9EAEA] p-1">
                    {(['Weekly', 'Monthly', 'Yearly'] as const).map(lbl => (
                        <button
                            key={lbl}
                            onClick={() => setRange(lbl)}
                            className={[
                                'px-3 py-1 rounded-md text-sm transition',
                                range === lbl
                                    ? 'bg-[#F2EAFE] text-[var(--purple,#6E0AB8)] font-semibold ring-1 ring-black/5'
                                    : 'text-gray-600 hover:bg-gray-50'
                            ].join(' ')}
                        >
                            {lbl}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-[#E9EAEA] my-4" />

            {/* Chart area */}
            <div className="relative  h-[360px] w-full mt-10">
                {/* Left overlay card — positioned perfectly at top center above Y-axis */}
                <div
                    className="absolute z-10 pointer-events-none"
                    style={{
                        left: LEFT_MARGIN + YAXIS_WIDTH - 30, // Centered above Y-axis
                        top: '-30px' // Perfect top position
                    }}
                >
                    <div className="text-left">
                        <div className="text-[11px] text-gray-500 font-medium mb-[-2px]">Avg Performance</div>
                        <div className="flex items-baseline gap-2 flex-nowrap justify-center">
                            <span className="text-[24px] font-bold text-gray-900">
                                {avg.toFixed(1)}
                            </span>
                            <span
                                className="inline-flex items-center gap-1 text-[11px] font-semibold"
                                style={{ color: UP }}
                            >
                                {Math.abs(changePct).toFixed(0)}%
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"        // inherit UP color
                                    className="translate-y-[1px]" // tiny vertical align tweak
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M4.27325 10.6666H11.7266C11.8584 10.666 11.9872 10.6264 12.0965 10.5527C12.2058 10.479 12.2908 10.3745 12.3408 10.2525C12.3907 10.1304 12.4034 9.99635 12.3771 9.86714C12.3508 9.73794 12.2869 9.61941 12.1932 9.52657L8.47325 5.80657C8.41127 5.74409 8.33754 5.69449 8.2563 5.66065C8.17506 5.6268 8.08792 5.60937 7.99991 5.60938C7.91191 5.60937 7.82477 5.6268 7.74353 5.66065C7.66229 5.69449 7.58856 5.74409 7.52658 5.80657L3.80658 9.52657C3.71297 9.61941 3.64898 9.73794 3.62273 9.86714C3.59647 9.99635 3.60912 10.1304 3.65907 10.2525C3.70902 10.3745 3.79403 10.479 3.90335 10.5527C4.01267 10.6264 4.1414 10.666 4.27325 10.6666Z" />
                                </svg>
                            </span>

                        </div>

                    </div>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={data}
                        margin={{ top: 40, right: 24, bottom: 24, left: LEFT_MARGIN }}
                    >
                        {/* subtle grid */}
                        <CartesianGrid stroke={GRID} strokeDasharray="3 6" vertical={false} />

                        {/* Axes */}
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <YAxis
                            width={YAXIS_WIDTH} // reserve space so overlay can start after it
                            domain={[0, 5]}
                            ticks={[0, 1.1, 2.2, 3.3, 4.4, 5.0]}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={6}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />

                        {/* under-fill gradient */}
                        <defs>
                            <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={PURPLE} stopOpacity={0.12} />
                                <stop offset="100%" stopColor={PURPLE} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="none" fill="url(#lineFill)" />

                        {/* purple line */}
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={PURPLE}
                            strokeWidth={3}
                            dot={{ r: 3, fill: PURPLE }}
                            activeDot={{ r: 5 }}
                        />

                        {/* vertical dashed line + dot at Jun */}
                        <ReferenceLine x={refLabel} stroke={PURPLE} strokeDasharray="4 6" />
                        <ReferenceDot x={refLabel} y={refVal} r={4} fill={PURPLE} stroke="#fff" isFront />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: GRID, strokeDasharray: '3 6' }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}