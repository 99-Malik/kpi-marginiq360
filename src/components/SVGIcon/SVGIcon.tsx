// components/SVGIcon/SVGIcon.tsx
import React from 'react';

interface SVGIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;       // pass Tailwind classes (e.g., text-purple-600)
  size?: number;            // width/height in px
}

const SVGIcon: React.FC<SVGIconProps> = ({ icon: Icon, className = '', size = 20 }) => {
  return <Icon className={className} width={size} height={size} aria-hidden="true" />;
};

export default SVGIcon;
