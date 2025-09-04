// MenuBar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  FaRobot,
  FaTachometerAlt,
  FaBoxes,
  FaShoppingBag,
  FaBookOpen,
  FaClipboardList,
  FaChartBar,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaRecycle,
  FaChartLine,
  FaTruckLoading,
  FaListOl,
  FaBoxOpen,
  FaHandshake,
  FaMoneyBillWave,
  FaFileImport,
  FaCog,
  FaChevronDown,
  FaTimes,
} from 'react-icons/fa';
import {
  UserIcon,
  DashboardIcon,
  MenuEngineeringIcon,
  AnalyticsIcon,
  CartIcon,
  CutlaryIcon,
  ConeIcon,
  ClipIcon,
  TrashIcon,
  StarIcon,
  BillIcon,
  BagIcon,
  PersonIcon,
  FolderIcon,
  SettingsIcon
} from '../SVGIcons/SideBarSvgIcons';

interface MenuItem {
  label: string;
  icon?: React.ReactElement;
  active?: boolean;
  children?: MenuItem[];
  path?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuBarProps {
  onClose?: () => void;
}

const menuSections: MenuSection[] = [
  {
    title: 'Core Operations',
    items: [
      {
        label: 'AI Automation',
        icon: <UserIcon width={24} height={24} isActive={false} />,
        path: '/ai-suggestions',
      },
      {
        label: 'Inventory',
        icon: <DashboardIcon width={24} height={24} isActive={false} />,
        path: '/inventory-counts',
      },
      
      
      {
        label: 'Recipes',
        icon: <CutlaryIcon width={16} height={16} isActive={false} />,
        path: '/recipe-management',
      },
      {
        label: 'Menu Engineering',
        icon: <MenuEngineeringIcon width={16} height={16} isActive={false} />,
        path: '/menu-engineering',
        children: [],
      },
    ],
  },
  {
    title: 'Analytics',
    items: [
      {
        label: 'Analytics',
        icon: <AnalyticsIcon width={16} height={16} isActive={false} />,
        path: '/analytics',
      },
      {
        label: 'Budget & Forecast',
        icon: <ConeIcon width={16} height={16} isActive={false} />,
        path: '/budget-forcasting',
      },
      {
        label: 'COS Reports',
        icon: <ClipIcon width={16} height={16} isActive={false} />,
        path: '/cogs-reports',
      },
     
      {
        label: 'Performance',
        icon: <StarIcon width={16} height={16} isActive={false} />,
        path: '/performance-dashboard',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'Prep Sheets',
        icon: <BillIcon width={16} height={16} isActive={false} />,
        path: '/prep-sheets',
      },
  
      {
        label: 'Waste Tracking',
        icon: <TrashIcon width={16} height={16} isActive={false} />,
        path: '/waste-tracking',
      },
    ],
  },
  {
    title: 'Master Data',
    items: [
      {
        label: 'Products',
        icon: <BagIcon width={16} height={16} isActive={false} />,
        path: '/manage-products',
      },
     
      {
        label: 'Purchases',
        icon: <CartIcon width={16} height={16} isActive={false} />,
        path: '/purchasing',
      },
      {
        label: 'Vendors',
        icon: <PersonIcon width={16} height={16} isActive={false} />,
        path: '/vendor-directory',
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        label: 'Invoice OCR',
        icon: <FolderIcon width={16} height={16} isActive={false} />,
        path: '/invoice-upload',
      },
      {
        label: 'Settings',
        icon: <SettingsIcon width={16} height={16} isActive={false} />,
        path: '/settings',
      },
    ],
  },
];

const renderItems = (items: MenuItem[], depth = 0, pathname: string, router: AppRouterInstance): React.ReactNode =>
  items.map((item, idx) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.path === pathname || (item.path && pathname.startsWith(item.path));

    const handleClick = () => {
      if (item.path) {
        router.push(item.path);
      }
    };

    // Use the icon as is
    const iconWithActiveState = item.icon;

    return (
      <div key={`${item.label}-${idx}`} className="group px-4">
        <div
          className={`flex items-center h-10 px-3 rounded-lg cursor-pointer ${isActive
              ? 'bg-purple-100'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          onClick={handleClick}
        >
          {iconWithActiveState && (
            <span className="mr-2">
              {React.isValidElement(iconWithActiveState) 
                ? React.cloneElement(iconWithActiveState, { isActive } as React.SVGProps<SVGSVGElement>)
                : iconWithActiveState
              }
            </span>
          )}
          <span className={`flex-1 text-xs truncate font-bold ${isActive ? 'text-primary' : 'text-[#727A90]'}`}>{item.label}</span>
          {hasChildren && <FaChevronDown className="text-xs text-gray-400" />}
        </div>
        {hasChildren && (
          <div className="mt-1 space-y-1">{renderItems(item.children!, depth + 1, pathname, router)}</div>
        )}
      </div>
    );
  });

const MenuBar: React.FC<MenuBarProps> = ({ onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="w-64 h-screen bg-[#f8f8fc] border-l border-gray-200 flex flex-col shadow-xl">
      {/* Header with logo and title */}
      <div className="w-full h-18  flex items-center px-4 py-3 border-b border-gray-200">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-base mr-3">
          IQ
        </div>
        <span className="flex-1 font-bold text-xl text-gray-900">Margin IQ</span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="10" fill="#F1F2F4" />
              <path d="M16.8592 20.3934L13.1392 16.6667C13.015 16.5418 12.9453 16.3729 12.9453 16.1967C12.9453 16.0206 13.015 15.8516 13.1392 15.7267L16.8592 12.0001C16.9524 11.906 17.0716 11.8419 17.2014 11.8159C17.3312 11.7898 17.4659 11.803 17.5882 11.8538C17.7105 11.9046 17.8149 11.9906 17.8881 12.101C17.9613 12.2113 17.9999 12.341 17.9992 12.4734V19.9201C17.9999 20.0525 17.9613 20.1821 17.8881 20.2925C17.8149 20.4028 17.7105 20.4889 17.5882 20.5396C17.4659 20.5904 17.3312 20.6036 17.2014 20.5776C17.0716 20.5515 16.9524 20.4874 16.8592 20.3934Z" fill="#727A90" />
            </svg>

          </button>
        )}
      </div>
      {/* Menu sections */}
      <div className="overflow-y-auto flex-1 py-4 scroll-hidden">
        {menuSections.map((section, idx) => (
          <div key={section.title} className={`${idx > 0 ? 'mt-6' : ''}`}>
            <h3 className="px-4 mb-2 text-xs font-semibold  text-[#727A90]">
              {section.title}
            </h3>
            <div className="space-y-1">{renderItems(section.items, 0, pathname, router)}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MenuBar;
