// ../../StatusPills/BudgetStatusPills/page.tsx
'use client';
import React from 'react';

export type BudgetStatus = 'Under Budget' | 'Over Budget' | 'Finished' | 'Pending' | 'Ongoing';

interface StatusPillsProps {
  status: BudgetStatus;
  className?: string;
}

const BudgetStatusPills: React.FC<StatusPillsProps> = ({ status, className }) => {
  const base =
    'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold';
  
  const getStatusStyles = (status: BudgetStatus) => {
    switch (status) {
      case 'Under Budget':
        return 'text-[#34C759] border-[#34C759] bg-[#EBF9EE]';
      case 'Over Budget':
        return 'text-[#E51B1B] border-[#E51B1B] bg-[#FCE8E8]';
      case 'Finished':
        return 'text-[#34C759] border-[#34C759] bg-[#EBF9EE]';
      case 'Pending':
        return 'text-[#E51B1B] border-[#E51B1B] bg-[#FCE8E8]';
      case 'Ongoing':
        return 'text-[#E7AA0B] border-[#E7AA0B] bg-[#FEF7E0]';
      default:
        return 'text-[#E51B1B] border-[#E51B1B] bg-[#FCE8E8]';
    }
  };

  const styles = getStatusStyles(status);

  return <span className={`${base} ${styles} ${className ?? ''}`}>{status}</span>;
};

export default BudgetStatusPills;
