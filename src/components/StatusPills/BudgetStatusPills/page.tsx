// ../../StatusPills/BudgetStatusPills/page.tsx
'use client';
import React from 'react';

export type BudgetStatus = 'Under Budget' | 'Over Budget';

interface StatusPillsProps {
  status: BudgetStatus;
  className?: string;
}

const BudgetStatusPills: React.FC<StatusPillsProps> = ({ status, className }) => {
  const base =
    'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold';
  const styles =
    status === 'Under Budget'
      ? 'text-[#34C759] border-[#34C759] bg-[#EBF9EE]'
      : 'text-[#E51B1B] border-[#E51B1B] bg-[#FCE8E8]';

  return <span className={`${base} ${styles} ${className ?? ''}`}>{status}</span>;
};

export default BudgetStatusPills;
