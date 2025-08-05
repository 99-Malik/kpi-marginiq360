'use client';

import React from 'react';
import Image from 'next/image';

interface SideBarMenuProps {
  onLogoClick?: () => void;
}

type NavIcon = {
  src: string;
  alt: string;
  count?: number; // optional count
};

const icons: NavIcon[] = [
  { src: '/icons/user.png', alt: 'User' },
  { src: '/icons/home.png', alt: 'Home', count: 5 }, // count example
  { src: '/icons/dashboard.png', alt: 'dashboard' }, 
  { src: '/icons/cart.png', alt: 'Cart' },
  { src: '/icons/cutlary.png', alt: 'cutlary' },
  { src: '/icons/menu-engineering.png', alt: 'menu-engineering' },
  { src: '/icons/analytics.png', alt: 'analytics' },
  { src: '/icons/performance.png', alt: 'performance' },
  { src: '/icons/bill.png', alt: 'bill' },
  { src: '/icons/bin.png', alt: 'bin' },
  { src: '/icons/star.png', alt: 'Star' },
  { src: '/icons/slip.png', alt: 'slip' },
  { src: '/icons/calculator.png', alt: 'calculator' },
  { src: '/icons/bag.png', alt: 'bag' },
  { src: '/icons/human.png', alt: 'human' },
  { src: '/icons/clip.png', alt: 'clip' },
  { src: '/icons/settings.png', alt: 'settings' },
 
];

const SideBarMenu: React.FC<SideBarMenuProps> = ({ onLogoClick }) => {
  return (
    <div className="w-16 bg-[#F8F8FC] flex flex-col items-center">
      {/* Icon List */}
      <div className="flex flex-col items-center space-y-4 flex-1 py-4">
        {icons.map((item, idx) => {
          const isActive = idx === 2; // example active state
          return (
            <button
              key={`${item.src}-${idx}`}
              className={`relative w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150
                ${isActive ? 'bg-purple-200' : 'hover:bg-gray-100'}
              `}
              aria-label={item.alt}
            >
              {/* Icon Image */}
              <span className="relative w-5 h-5">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain"
                  sizes="20px"
                  priority={idx < 4}
                />
              </span>

              {/* Badge - Only for icons with `count` */}
              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-[10px] font-semibold px-1.5 py-1 rounded-full leading-none">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Settings (PNG) */}
      <button
        aria-label="Settings"
        className="w-8 h-8 mb-4 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-150"
      >
        <span className="relative w-5 h-5">
          <Image src="/icons/settings.png" alt="Settings" fill className="object-contain" />
        </span>
      </button>
    </div>
  );
};

export default SideBarMenu;
