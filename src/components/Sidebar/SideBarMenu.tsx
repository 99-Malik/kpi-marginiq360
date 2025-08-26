'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  UserIcon,
  HomeIcon,
  MenuEngineeringIcon,
  AnalyticsIcon,
  DashboardIcon,
  CartIcon,
  CutlaryIcon,
  ConeIcon,
  ClipIcon,
  TrashIcon,
  StarIcon,
  BillIcon,
  CalculatorIcon,
  BagIcon,
  PersonIcon,
  FolderIcon,
  SettingsIcon
} from '../SVGIcons/SideBarSvgIcons';

interface SideBarMenuProps {
  onLogoClick?: () => void;
}

type PngIcon = {
  type: 'png';
  src: string;
  activeSrc: string;
  alt: string;
  width: number;
  height: number;
  path?: string;
  count?: number;
};

type SvgIcon = {
  type: 'svg';
  Icon: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { isActive?: boolean }
  >;
  alt: string;
  width: number;
  height: number;
  path?: string;
  count?: number;
};

type NavIcon = PngIcon | SvgIcon;

const icons: NavIcon[] = [
  { type: 'svg', Icon: UserIcon, alt: 'User', width: 40, height: 40, path: '/ai-suggestions' },
  // { type: 'svg', Icon: HomeIcon, alt: 'Home', width: 24, height: 24, path: '/' },
  { type: 'svg', Icon: DashboardIcon, alt: 'Dashboard', width: 24, height: 24, path: '/inventory-counts' },
  { type: 'svg', Icon: CutlaryIcon, alt: 'Cutlary', width: 26, height: 26, path: '/recipe-management' },
  { type: 'svg', Icon: MenuEngineeringIcon, alt: 'Menu Engineering', width: 40, height: 40, path: '/menu-engineering' },
  { type: 'svg', Icon: AnalyticsIcon, alt: 'Analytics', width: 18, height: 18, path: '/analytics' },
  { type: 'svg', Icon: ConeIcon, alt: 'Cone', width: 26, height: 26, path: '/budget-forcasting' },
  { type: 'svg', Icon: ClipIcon, alt: 'Clip', width: 26, height: 26, path: '/cogs-reports' },
  { type: 'svg', Icon: StarIcon, alt: 'Star', width: 26, height: 26, path: '/performance-dashboard' },
  { type: 'svg', Icon: BillIcon, alt: 'Bill', width: 26, height: 26, path: '/prep-sheets' },
  { type: 'svg', Icon: TrashIcon, alt: 'Trash', width: 26, height: 26, path: '/trash' },
  { type: 'svg', Icon: BagIcon, alt: 'Bag', width: 26, height: 26, path: '/manage-products' },
  { type: 'svg', Icon: CalculatorIcon, alt: 'Calculator', width: 26, height: 26, path: '/calculator' },

  { type: 'svg', Icon: CartIcon, alt: 'Cart', width: 26, height: 26, path: '/purchases' },

  { type: 'svg', Icon: PersonIcon, alt: 'Person', width: 26, height: 26, path: '/person' },
  { type: 'svg', Icon: FolderIcon, alt: 'Folder', width: 26, height: 26, path: '/invoice-upload' },
  { type: 'svg', Icon: SettingsIcon, alt: 'Settings', width: 26, height: 26, path: '/settings' },
];

const BTN_SIZE = 40; // Outer button size

const SideBarMenu: React.FC<SideBarMenuProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentIndex = mounted
    ? icons.findIndex((icon) => {
        // Special handling for AI suggestions - match any path that starts with /ai-suggestions
        if (icon.path === '/ai-suggestions') {
          return pathname.startsWith('/ai-suggestions');
        }
        // For other icons, use exact path matching
        return icon.path === pathname;
      })
    : -1;
  const activeIdx = currentIndex !== -1 ? currentIndex : 2;

  const handleClick = (idx: number, path?: string) => {
    setActiveIndex(idx);
    if (path) router.push(path);
  };


  return (
    <div
      className={`w-16 shrink-0 bg-[#F8F8FC] flex flex-col items-center
      h-content min-h-0
      ${pathname === '/ai-suggestions' ? 'overflow-y-auto scroll-hidden' : 'overflow-hidden'}
    `}
    >
      <div className="flex flex-col items-center space-y-4 flex-1 py-4">
        {icons.map((item, idx) => {
          const isActive = idx === activeIdx;

          return (
            <button
              key={`${item.alt}-${idx}`}
              onClick={() => handleClick(idx, item.path)}
              className={`relative grid place-items-center rounded-lg transition-all duration-150
                ${isActive ? 'bg-[#F1E7F8]' : 'hover:bg-gray-100'}
              `}
              style={{ width: BTN_SIZE, height: BTN_SIZE }}
              aria-label={item.alt}
            >
              <span
                className="relative grid place-items-center overflow-hidden"
                style={{ width: item.width, height: item.height }}
              >
                {item.type === 'svg' ? (
                  <item.Icon
                    width={item.width}
                    height={item.height}
                    className="block w-full h-full"
                    isActive={isActive}
                    aria-hidden
                  />
                ) : (
                  <span className="relative block w-full h-full">
                    <Image
                      src={isActive ? item.activeSrc : item.src}
                      alt={item.alt}
                      fill
                      className="object-contain block"
                      priority={idx < 4}
                    />
                  </span>
                )}
              </span>

              {'count' in item && item.count && item.count > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-[10px] font-semibold px-1.5 py-1 rounded-full leading-none">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarMenu;
