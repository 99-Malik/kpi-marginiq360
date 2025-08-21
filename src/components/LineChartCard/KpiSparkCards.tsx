'use client';

import * as React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';

type Stat = { label: string; value: string; valueClass?: string };
type CardProps = {
    title: string;
    subtitle: string;
    period?: string;
    trend?: string;
    trendClass?: string;
    color: string;
    gradientId: string;
    data: { y: number }[];
    stats: Stat[];
};

function MiniSpark({ data, color, gradientId }: { data: { y: number }[]; color: string; gradientId: string }) {
    return (
        <div className="h-24 rounded-xl bg-gradient-to-b from-transparent to-transparent">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 6, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="natural"  // This creates bumpier lines
                        dataKey="y"
                        stroke={color}
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill={`url(#${gradientId})`}
                        dot={false}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export function KpiSparkCard({
    title,
    subtitle,
    period = 'Last 4 Week',
    trend,
    trendClass = 'text-gray-900',
    color,
    gradientId,
    data,
    stats,
}: CardProps) {
    return (
        <div className="rounded-3xl h-content bg-white ring-1 ring-gray-200/70 p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-[17px] font-semibold text-gray-900">{title}</h3>
                    <p className="text-[13px] text-gray-500">Based on Categories</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="inline-flex h-8 items-center gap-1 rounded-lg border border-gray-200 px-2 text-xs text-gray-700">
                        {period}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
                        </svg>

                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-50 text-gray-500">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3627_16793)">
                                <path d="M9 3C9.82842 3 10.5 2.32843 10.5 1.5C10.5 0.671573 9.82842 0 9 0C8.17157 0 7.5 0.671573 7.5 1.5C7.5 2.32843 8.17157 3 9 3Z" fill="#727A90" />
                                <path d="M9 10.5C9.82842 10.5 10.5 9.82842 10.5 9C10.5 8.17157 9.82842 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82842 8.17157 10.5 9 10.5Z" fill="#727A90" />
                                <path d="M9 18C9.82842 18 10.5 17.3284 10.5 16.5C10.5 15.6716 9.82842 15 9 15C8.17157 15 7.5 15.6716 7.5 16.5C7.5 17.3284 8.17157 18 9 18Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3627_16793">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </div>
            </div>

            {/* Divider like the reference */}
            <div className="h-px bg-gray-200 my-3 -mx-6" />

            {/* Trend text */}
            {trend && (
                <div className={`mb-2 text-[18px] font-semibold ${trendClass}`}>
                    {trend} <span className="align-middle">↑</span>
                </div>
            )}

            {/* Chart */}
            <MiniSpark data={data} color={color} gradientId={gradientId} />

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
                {stats.map((s) => (
                    <React.Fragment key={s.label}>
                        <div className="text-gray-500">{s.label}</div>
                        <div className={`text-right font-semibold ${s.valueClass || ''}`}>{s.value}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

// More varied data with different heights and patterns
export const laborData = [
    { y: 8.5 }, { y: 14.2 }, { y: 40.8 }, { y: 50.5 }, { y: 12.1 }, { y: 20.8 },
    { y: 14.2 }, { y: 19.6 }, { y: 12.8 }, { y: 40.4 }
];

export const customerData = [
    { y: 8.5 }, { y: 14.2 }, { y: 40.8 }, { y: 50.5 }, { y: 12.1 }, { y: 20.8 },
    { y: 14.2 }, { y: 19.6 }, { y: 12.8 }, { y: 40.4 }
];

export const profitData = [
    { y: 8.5 }, { y: 14.2 }, { y: 40.8 }, { y: 50.5 }, { y: 12.1 }, { y: 20.8 },
    { y: 14.2 }, { y: 19.6 }, { y: 12.8 }, { y: 40.4 }
];

// Example usage component
export default function ExampleDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <KpiSparkCard
                    title="Labor Efficiency"
                    subtitle="Based on Categories"
                    trend="30.0% Up"
                    trendClass="text-green-600"
                    color="#10B981"
                    gradientId="laborGradient"
                    data={laborData}
                    stats={[
                        { label: "Labor Cost", value: "$10,000" },
                        { label: "Labor %", value: "+7.5%", valueClass: "text-green-600" },
                        { label: "Efficiency", value: "$2,100" },
                        { label: "SPMH", value: "$12.00" },
                    ]}
                />

                <KpiSparkCard
                    title="Customer Satisfaction"
                    subtitle="Based on Feedback"
                    trend="15.2% Up"
                    trendClass="text-green-600"
                    color="#3B82F6"
                    gradientId="customerGradient"
                    data={customerData}
                    stats={[
                        { label: "Rating", value: "4.7/5" },
                        { label: "Response Rate", value: "+5.2%", valueClass: "text-green-600" },
                        { label: "Feedback", value: "187" },
                        { label: "Retention", value: "92%" },
                    ]}
                />

                <KpiSparkCard
                    title="Profit Margin"
                    subtitle="Based on Sales"
                    trend="22.5% Up"
                    trendClass="text-green-600"
                    color="#8B5CF6"
                    gradientId="profitGradient"
                    data={profitData}
                    stats={[
                        { label: "Revenue", value: "$45,200" },
                        { label: "Growth", value: "+12.8%", valueClass: "text-green-600" },
                        { label: "Expenses", value: "$22,100" },
                        { label: "Net Profit", value: "$23,100" },
                    ]}
                />
            </div>
        </div>
    );
}