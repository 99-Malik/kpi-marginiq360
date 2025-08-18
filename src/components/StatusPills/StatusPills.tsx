import React from 'react';

interface StatusPillsProps {
  status: string;
}

const StatusPills: React.FC<StatusPillsProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Star':
        return 'bg-[#FDF7E7] text-[#E7AA0B] border border-[#E7AA0B]';
      case 'Plow Horses':
        return 'bg-[#ebf9ee] text-[#34C759] border border-[#34C759]';
      case 'Puzzles':
        return 'bg-[#dfebfc] text-[#007AFF] border border-[#007AFF]';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )} ${status === 'Plow Horses' ? 'whitespace-nowrap' : ''}`}
    >
      {status}
    </span>
  );
};

export default StatusPills;
