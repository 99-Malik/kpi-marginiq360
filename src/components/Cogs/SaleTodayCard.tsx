'use client';

import * as React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LabelList,
    Rectangle, // NEW
} from 'recharts';

type Item = { key: string; label: string; value: number; color: string; up: boolean };

const SALE_TODAY: Item[] = [
    { key: 'pizzaBurger', label: 'Pizza Burger', value: 20000, color: '#6D03C3', up: true },
    { key: 'pizzaSandwich', label: 'Pizza Sandwich', value: 16000, color: '#51B8BE', up: false },
    { key: 'chickenKarahi', label: 'Chicken Karahi', value: 1500, color: '#F29A82', up: true },
];

const deltaTodayUSD = 150;
const growthPct = 10;

export default function SaleTodayCard() {
    const total = React.useMemo(
        () => SALE_TODAY.reduce((s, d) => s + d.value, 0),
        []
    );

    return (
        <div className="rounded-[24px] bg-white ring-1 ring-gray-200/70 overflow-hidden">
            <div className="flex items-start justify-between px-6 pt-5 pb-3">
                <div>
                    <h3 className="text-[24px] font-bold text-gray-900">Sale Today</h3>
                    <p className="text-[14px] text-gray-500 -mt-0.5">Based On Items</p>
                </div>
                <button className="h-8 w-8 grid place-items-center text-gray-500 hover:bg-gray-50 rounded-xl">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="3" r="1.25" />
                        <circle cx="8" cy="8" r="1.25" />
                        <circle cx="8" cy="13" r="1.25" />
                    </svg>
                </button>
            </div>

            <div className="border-t border-gray-200" />

            <div className="px-6 py-5">
                {/* Three separate chart segments with gaps */}
                <div className="h-auto md:h-40 flex items-center">
                    <div className="w-full flex gap-1">
                        {SALE_TODAY.map((item, index) => {
                            const percentage = Math.round((item.value / total) * 100);

                            return (
                                <div key={item.key} className="relative" style={{ width: `${percentage}%` }}>
                                    <div
                                        className="h-30 rounded-lg relative overflow-hidden"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        {/* Percentage label */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white text-base font-bold md:text-xs lg:text-base">
                                                {percentage}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-[-16px] text-[14px]">
                    <span className="text-[#6F7690]">+${deltaTodayUSD.toLocaleString()} today</span>
                    <span className="text-[#0F9D8D] font-semibold">
                        {growthPct}% <span className="align-middle">▲</span>
                    </span>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-6">
                    {SALE_TODAY.map((s) => (
                        <div key={s.key} className="px-3 py-2 flex flex-col items-start md:items-center gap-1">
                            <div className="flex items-center gap-2 text-[16px] text-[#6F7690]">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                <span>{s.label}</span>
                            </div>
                            <div className="text-xl font-bold text-gray-900 -mt-0.5">
                                ${s.value.toLocaleString()}
                                <span className="ml-2 inline-flex items-center">
                                    {s.up ? <UpIcon /> : <DownIcon />}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


const UpIcon = () => (
    <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.93926 10.6666H12.3926C12.5244 10.666 12.6532 10.6264 12.7625 10.5527C12.8718 10.479 12.9568 10.3745 13.0068 10.2525C13.0567 10.1304 13.0694 9.99635 13.0431 9.86714C13.0169 9.73794 12.9529 9.61941 12.8593 9.52657L9.13926 5.80657C9.07729 5.74409 9.00355 5.69449 8.92231 5.66065C8.84107 5.6268 8.75394 5.60937 8.66593 5.60938C8.57792 5.60937 8.49078 5.6268 8.40954 5.66065C8.3283 5.69449 8.25457 5.74409 8.1926 5.80657L4.4726 9.52657C4.37898 9.61941 4.315 9.73794 4.28874 9.86714C4.26249 9.99635 4.27513 10.1304 4.32508 10.2525C4.37503 10.3745 4.46005 10.479 4.56937 10.5527C4.67869 10.6264 4.80741 10.666 4.93926 10.6666Z"
            fill="#009499"
        />
    </svg>
);
UpIcon.displayName = 'UpIcon';

const DownIcon = () => (
    <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.77325 6H12.2266C12.3584 6.00055 12.4872 6.04019 12.5965 6.1139C12.7058 6.18761 12.7908 6.29208 12.8408 6.4141C12.8907 6.53612 12.9034 6.67021 12.8771 6.79942C12.8508 6.92863 12.7869 7.04715 12.6932 7.14L8.97325 10.86C8.91127 10.9225 8.83754 10.9721 8.7563 11.0059C8.67506 11.0398 8.58792 11.0572 8.49991 11.0572C8.41191 11.0572 8.32477 11.0398 8.24353 11.0059C8.16229 10.9721 8.08856 10.9225 8.02658 10.86L4.30658 7.14C4.21297 7.04715 4.14899 6.92863 4.12273 6.79942C4.09647 6.67021 4.10912 6.53612 4.15907 6.4141C4.20902 6.29208 4.29403 6.18761 4.40335 6.1139C4.51267 6.04019 4.6414 6.00055 4.77325 6Z"
            fill="#E51B1B"
        />
    </svg>
);
DownIcon.displayName = 'DownIcon';