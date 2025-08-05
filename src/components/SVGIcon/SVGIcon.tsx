import React from 'react';

interface SVGIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  isActive?: boolean;
  size?: number;
}

const SVGIcon: React.FC<SVGIconProps> = ({ 
  icon: Icon, 
  className = '', 
  isActive = false, 
  size = 20 
}) => {
  const activeColor = '#9333ea'; // purple-600
  const inactiveColor = '#6b7280'; // gray-600

  return (
    <Icon
      className={className}
      width={size}
      height={size}
      style={{
        fill: isActive ? activeColor : inactiveColor,
      }}
    />
  );
};

export default SVGIcon; 