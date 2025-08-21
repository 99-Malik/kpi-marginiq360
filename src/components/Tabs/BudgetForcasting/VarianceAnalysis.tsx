"use client";
import React, { useLayoutEffect, useRef, useState } from "react";

/* ---------- tiny helpers ---------- */
const cls = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

/* ---------- expense card ---------- */
type ExpenseCardProps = {
  title: string;
  actual: string;
  projected: string;
  change: string;
  positive?: boolean;
};

function ExpenseCard({ title, actual, projected, change, positive }: ExpenseCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F8FC] px-4 py-6 flex flex-col gap-1">
  {/* Title and projected value aligned horizontally */}
  <div className="flex justify-between items-center">
    <div className="text-[15px] font-bold text-gray-800">{title}</div>
    <div
      className={cls(
        "text-[15px] font-semibold",
        positive ? "text-[#34C759]" : "text-[#E51B1B]"
      )}
    >
      {projected}
    </div>
  </div>

  {/* Actual and change values aligned horizontally */}
  <div className="flex justify-between items-center">
    <div className="text-[13px] text-gray-500">{actual}</div>
    <div className="text-[13px] text-gray-600">{change}</div>
  </div>
</div>
  );
}

/* ---------- status card ---------- */
type StatusCardProps = { status: string; subtitle: string; bg: string };

function StatusCard({ status, subtitle, bg }: StatusCardProps) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ backgroundColor: bg }}>
      <div className="text-[15px] font-semibold text-gray-900">{status}</div>
      <div className="text-[13px] text-gray-600">{subtitle}</div>
    </div>
  );
}

/* ---------- whole tab ---------- */
export default function VarianceAnalysisTab() {
  const leftRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number | undefined>(undefined);

  // change this to control the ratio: right panel = 50% of left column height
  const RIGHT_HEIGHT_RATIO = 0.6;

  useLayoutEffect(() => {
    if (!leftRef.current) return;

    const update = () => {
      const h = leftRef.current?.offsetHeight ?? 0;
      setRightHeight(h * RIGHT_HEIGHT_RATIO);
    };

    update();

    // keep in sync when content/viewport changes
    const ro = new ResizeObserver(update);
    ro.observe(leftRef.current);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="w-full">
      {/* thin custom scrollbar for the right list */}
  

      <h3 className="text-[16px] font-semibold mb-4">Variance Analysis</h3>

      {/* 2 columns; left grows naturally, right gets a fixed height and scrolls inside */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
        {/* Left side - expenses (full natural height) */}
        <div ref={leftRef} className="flex flex-col gap-3">
          <ExpenseCard
            title="Housing Costs Overview"
            actual="$32,000 (Increased by 3.5% from last month)"
            projected="$30,000 (Projected expenses)"
            change="+2.0% (Year-over-year comparison)"
            positive
          />
          <ExpenseCard
            title="Transportation Expenses Overview"
            actual="$12,000 (Stable compared to last month)"
            projected="$15,000 (Projected expenses)"
            change="-1.2% (Year-over-year comparison)"
          />
          <ExpenseCard
            title="Utilities Costs Overview"
            actual="$8,500 (Increased by 6.7% from last month)"
            projected="$10,000 (Projected expenses)"
            change="+4.5% (Year-over-year comparison)"
            positive
          />
          <ExpenseCard
            title="Healthcare Spending Overview"
            actual="$18,000 (Decreased by 2.5% from last month)"
            projected="$20,000 (Projected expenses)"
            change="-3.0% (Year-over-year comparison)"
          />
          <ExpenseCard
            title="Entertainment Budget Overview"
            actual="$5,000 (Increased by 10.0% from last month)"
            projected="$7,500 (Projected expenses)"
            change="+5.5% (Year-over-year comparison)"
            positive
          />
        </div>

        {/* Right side - container is half as tall as the left; inner list scrolls
            Purple rail is bounded to this container's height */}
        <div
          className="relative overflow-hidden rounded-2xl border border-[#E9EAEA] bg-white"
          style={rightHeight ? { height: rightHeight } : undefined}
        >
          {/* Purple rail with rounded ends — limited to container height */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-[6px] rounded-full bg-purple-600" />

          {/* Scrollable list inside */}
          <div className="va-scroll h-full overflow-y-auto custom-scroll space-y-3 p-4">
            <StatusCard
              status="Budget Status: Under Budget"
              subtitle="Food Expenditures: $2500 Saved"
              bg="#E7FAF0"
            />
            <StatusCard
              status="Budget Status: Over Budget"
              subtitle="Food Expenditures: $2500 Saved"
              bg="#FFF6D9"
            />
            <StatusCard
              status="Budget Status: Over Budget"
              subtitle="Food Expenditures: $2500 Saved"
              bg="#FFF1DC"
            />
            <StatusCard
              status="Recommendations for Improvement"
              subtitle="Food Expenditures: $2500 Saved"
              bg="#E7EDFA"
            />
            {/* add more and it will scroll */}
            <StatusCard
              status="Staffing Efficiency"
              subtitle="Labor Cost: $1200 Over Plan"
              bg="#F2F0FF"
            />
            <StatusCard
              status="Waste Reduction Opportunity"
              subtitle="Potential Savings: $650 / month"
              bg="#EFFFF6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
