"use client";
import React from "react";

/* ---------- tiny helpers ---------- */
const cls = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

const colors = {
    green: { bar: "#34C759", pill: "#34C759", pillText: "#34C759" },
    yellow: { bar: "#E7AA0B", pill: "#E7AA0B", pillText: "#E7AA0B" },
    red: { bar: "#E51B1B", pill: "#E51B1B", pillText: "#E51B1B" },
};

function ConfidenceBadge({ pct, tone }: { pct: number; tone: keyof typeof colors }) {
    const c = colors[tone];
    return (
        <span
            className="shrink-0 rounded-full px-3 py-[2px] text-[12px] font-medium"
            style={{
                border: `2px solid ${c.pill}`,
                color: c.pill,
                backgroundColor: "transparent",
            }}
        >
            {pct}% Confidence
        </span>
    );
}

function Progress({ value, tone }: { value: number; tone: keyof typeof colors }) {
    const c = colors[tone];
    return (
        <div className="w-full h-2 rounded-full bg-[#E9EAEA]">
            <div
                className="h-2 rounded-full"
                style={{ width: `${value}%`, backgroundColor: c.bar }}
            />
        </div>
    );
}

/* ---------- forecast card ---------- */
type ForecastCardProps = {
    title: string;
    amount: string;
    reasoning: string;
    confidencePct: number;
    progressPct: number;
    tone: "green" | "yellow" | "red";
};

function ForecastCard({
    title,
    amount,
    reasoning,
    confidencePct,
    progressPct,
    tone,
}: ForecastCardProps) {
    return (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white text-black p-4 md:p-5 relative">
            {/* header row */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[18px] md:text-[20px] font-semibold text-black">{title}</h3>
                <ConfidenceBadge pct={confidencePct} tone={tone} />
            </div>

            {/* divider */}
            <div className="h-px w-full bg-[#E5E7EB] mb-3" />

            {/* amount + labels */}
            <div className="flex items-start justify-between">
                <div className="text-[13px] md:text-[14px] font-semibold text-black">Predicted Amount</div>
                <div className="text-[18px] md:text-[20px] font-bold text-black">{amount}</div>
            </div>

            <div className="mt-1 text-[13px] text-black">
                <span className="font-semibold">AI Reasoning :</span> {reasoning}
            </div>

            {/* progress */}
            <div className="mt-4">
                <Progress value={progressPct} tone={tone} />
            </div>
        </div>
    );
}

/* ---------- summary pill ---------- */
function SummaryPill({
    title,
    big,
    subtitle,
    bgColor = "#FFFFFF",
    borderColor = "rgba(0,0,0,0.1)",
    className,
}: {
    title: string;
    big: string;
    subtitle: string;
    bgColor?: string;
    borderColor?: string;
    className?: string;
}) {
    return (
        <div
            className={cls(
                "rounded-2xl shadow-sm p-6 md:p-8 text-center",
                className || ""
            )}
            style={{
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
            }}
        >
            <div className="text-[14px] md:text-[15px] text-black/60 mb-2">{title}</div>
            <div className="text-[28px] md:text-[34px] font-bold text-black mb-2">{big}</div>
            <div className="text-[18px] md:text-[22px] text-black/70">{subtitle}</div>
        </div>
    );
}

/* ---------- whole tab ---------- */
export default function AIForecastTab() {
    return (
        <div className="w-full">
            <h2 className="text-lg font-semibold text-black mb-4">
                AI-Powered Forecast
            </h2>


            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ForecastCard
                    title="Food Costs"
                    amount="$60,000"
                    reasoning="Consistent Supply Usage Patterns Observed"
                    confidencePct={87}
                    progressPct={92}
                    tone="green"
                />
                <ForecastCard
                    title="Beverage Cost"
                    amount="$3,000"
                    reasoning="Consistent Supply Usage Patterns Observed"
                    confidencePct={60}
                    progressPct={70}
                    tone="yellow"
                />
                <ForecastCard
                    title="Supplies Costs"
                    amount="$60,000"
                    reasoning="Consistent Supply Usage Patterns Observed"
                    confidencePct={87}
                    progressPct={88}
                    tone="green"
                />
                <ForecastCard
                    title="Utilities"
                    amount="$6,000"
                    reasoning="Consistent Supply Usage Patterns Observed"
                    confidencePct={30}
                    progressPct={28}
                    tone="red"
                />
            </div>

            {/* Summary title */}
            <h3 className="mt-8 text-[18px] md:text-[20px] font-semibold text-black">
                Forecast Summary
            </h3>

            {/* Summary pills */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
                <SummaryPill
                    title="Next Month Prediction"
                    big="$40,000"
                    subtitle="Total Forecast Spend"
                    bgColor="#e6f4f5"
                    borderColor="#009499"
                />
                <SummaryPill
                    title="Avg Confidence"
                    big="86%"
                    subtitle="Forecast Accuracy"
                    bgColor="#fdf7e7"
                    borderColor="#ECBB3C"
                />
                <SummaryPill
                    title="High Risk Items"
                    big="03"
                    subtitle="Categories Trending Up"
                    bgColor="#fce8e8"
                    borderColor="#EA4949"
                />
            </div>
        </div>
    );
}
