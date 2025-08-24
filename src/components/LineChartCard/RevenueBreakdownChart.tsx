'use client';

import * as React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Props = {
    current?: number;
    target?: number;
    previous?: number;
    changePct?: number;
};

const COLORS = {
    purple: '#6E0AB8',
    track: '#E6E9EF',
    up: '#0F9A9A',
    down: '#E11D48',
    white: '#FFFFFF', // Added white color
};

export default function RevenueBreakdownCard({
    current = 60000,
    target = 130000,
    previous = 118000,
    changePct = 10,
}: Props) {
    const progress = Math.max(0, Math.min(1, current / Math.max(1, target)));
    const isUp = changePct >= 0;

    // Make arc wider + flatter
    const START = 200;   // wider left sweep
    const END = -20;   // wider right sweep
    const INNER = 120;   // bigger inner radius for wider arc
    const OUTER = 128;   // bigger outer radius for thicker arc
    const CY = '75%'; // lower so arc is more centered

    // Calculate the end angle for the filled portion with a gap
    const totalAngle = Math.abs(START - END);
    const filledAngle = progress * totalAngle;
    const gapSize = 2; // degrees for the gap
    const filledEndAngle = START - filledAngle + gapSize / 2;

    const fmt = (n: number) =>
        `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

    return (
        <div className="bg-white rounded-[28px] ring-1 ring-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-5 pb-4 flex items-start justify-between">
                <div>
                    <h3 className="text-[22px] leading-7 font-semibold text-gray-900">
                        Revenue Breakdown
                    </h3>
                    <p className="text-[14px] text-gray-500">
                        Current period performance vs targets
                    </p>
                </div>
            </div>

            <div className="h-px bg-gray-200 rounded-full" />

            {/* Gauge */}
            <div className="px-4 sm:px-6 pt-8 pb-4">
                <div className="relative mx-auto w-full max-w-[640px] h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            {/* Track (background) - only unfilled portion */}
                            <Pie
                                data={[{ value: 100 }]}
                                dataKey="value"
                                startAngle={filledEndAngle - gapSize}
                                endAngle={END}
                                innerRadius={INNER}
                                outerRadius={OUTER}
                                cx="50%"
                                cy={CY}
                                stroke="none"
                                cornerRadius={OUTER}
                                isAnimationActive={false}
                            >
                                <Cell fill={COLORS.track} />
                            </Pie>

                            {/* Filled portion - purple arc */}
                            <Pie
                                data={[{ value: 100 }]}
                                dataKey="value"
                                startAngle={START}
                                endAngle={filledEndAngle}
                                innerRadius={INNER}
                                outerRadius={OUTER}
                                cx="50%"
                                cy={CY}
                                stroke="none"
                                cornerRadius={OUTER}
                                isAnimationActive={false}
                            >
                                <Cell fill={COLORS.purple} />
                            </Pie>

                            {/* White Gap slice */}
                            {progress < 1 && (
                                <Pie
                                    data={[{ value: 100 }]}
                                    dataKey="value"
                                    startAngle={filledEndAngle}
                                    endAngle={filledEndAngle - gapSize}
                                    innerRadius={INNER}
                                    outerRadius={OUTER}
                                    cx="50%"
                                    cy={CY}
                                    stroke="none"
                                    isAnimationActive={false}
                                >
                                    <Cell fill={COLORS.white} />
                                </Pie>
                            )}
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-18">
                        <div className="text-center">
                            <div className="text-[34px] sm:text-[38px] font-semibold text-gray-900">
                                {fmt(current)}
                            </div>
                            <div className="mt-1 flex items-center justify-center gap-1">
                                <span
                                    className="text-[14px] font-semibold ml-4"
                                    style={{ color: isUp ? COLORS.up : COLORS.down }}
                                >
                                    {Math.abs(changePct)}%
                                </span>
                                <svg
                                    width="9"
                                    height="6"
                                    viewBox="0 0 9 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mt-[1px]"
                                >
                                    <path
                                        d="M0.773247 5.66656H8.22658C8.35843 5.66601 8.48715 5.62638 8.59647 5.55267C8.7058 5.47896 8.79081 5.37449 8.84076 5.25247C8.89071 5.13045 8.90336 4.99635 8.8771 4.86714C8.85084 4.73794 8.78686 4.61941 8.69325 4.52657L4.97325 0.806574C4.91127 0.744088 4.83754 0.694492 4.7563 0.660646C4.67506 0.626801 4.58792 0.609375 4.49991 0.609375C4.41191 0.609375 4.32477 0.626801 4.24353 0.660646C4.16229 0.694492 4.08856 0.744088 4.02658 0.806574L0.30658 4.52657C0.212966 4.61941 0.148985 4.73794 0.122728 4.86714C0.0964714 4.99635 0.109118 5.13045 0.159068 5.25247C0.209018 5.37449 0.29403 5.47896 0.403352 5.55267C0.512674 5.62638 0.641398 5.66601 0.773247 5.66656Z"
                                        fill={isUp ? COLORS.up : COLORS.down} // keep dynamic coloring
                                    />
                                </svg>
                                <span className="text-[14px] text-gray-500">
                                    Current Revenue
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPIs */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                    <div className="text-center">
                        <div className="text-[13px] text-gray-500 mb-1">Target</div>
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-[22px] font-semibold text-gray-900">
                                {fmt(target)}
                            </span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.27325 10.6666H11.7266C11.8584 10.666 11.9872 10.6264 12.0965 10.5527C12.2058 10.479 12.2908 10.3745 12.3408 10.2525C12.3907 10.1304 12.4034 9.99635 12.3771 9.86714C12.3508 9.73794 12.2869 9.61941 12.1932 9.52657L8.47325 5.80657C8.41127 5.74409 8.33754 5.69449 8.2563 5.66065C8.17506 5.6268 8.08792 5.60937 7.99991 5.60938C7.91191 5.60937 7.82477 5.6268 7.74353 5.66065C7.66229 5.69449 7.58856 5.74409 7.52658 5.80657L3.80658 9.52657C3.71297 9.61941 3.64898 9.73794 3.62273 9.86714C3.59647 9.99635 3.60912 10.1304 3.65907 10.2525C3.70902 10.3745 3.79403 10.479 3.90335 10.5527C4.01267 10.6264 4.1414 10.666 4.27325 10.6666Z" fill="#009499" />
                            </svg>

                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-[13px] text-gray-500 mb-1">Previous Period</div>
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-[22px] font-semibold text-gray-900">
                                {fmt(previous)}
                            </span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#E51B1B" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}