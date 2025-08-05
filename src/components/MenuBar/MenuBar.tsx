// MenuBar.tsx
'use client';

import React from 'react';
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

interface MenuItem {
  label: string;
  icon?: React.ReactElement;
  active?: boolean;
  children?: MenuItem[];
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
        icon: <FaRobot className="text-sm" />,
      },
      {
        label: 'Dashboard',
        icon: <FaTachometerAlt className="text-sm" />,
        active: true,
      },
      {
        label: 'Inventory',
        icon: <FaBoxes className="text-sm" />,
        children: [
          {
            label: 'Purchasing',
            icon: <FaShoppingBag className="text-sm" />,
          },
        ],
      },
      {
        label: 'Recipes',
        icon: <FaBookOpen className="text-sm" />,
      },
      {
        label: 'Menu Engineering',
        icon: <FaClipboardList className="text-sm" />,
        children: [],
      },
    ],
  },
  {
    title: 'Analytics',
    items: [
      {
        label: 'Analytics',
        icon: <FaChartBar className="text-sm" />,
      },
      {
        label: 'Budget & Forecast',
        icon: <FaFileInvoiceDollar className="text-sm" />,
      },
      {
        label: 'COS Reports',
        icon: <FaFileAlt className="text-sm" />,
      },
      {
        label: 'Waste Tracking',
        icon: <FaRecycle className="text-sm" />,
      },
      {
        label: 'Performance',
        icon: <FaChartLine className="text-sm" />,
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'Prep Sheets',
        icon: <FaClipboardList className="text-sm" />,
      },
      {
        label: 'Orders',
        icon: <FaShoppingBag className="text-sm" />,
      },
      {
        label: 'Receiving',
        icon: <FaTruckLoading className="text-sm" />,
      },
      {
        label: 'Counting',
        icon: <FaListOl className="text-sm" />,
      },
    ],
  },
  {
    title: 'Master Data',
    items: [
      {
        label: 'Products',
        icon: <FaBoxOpen className="text-sm" />,
      },
      {
        label: 'Vendors',
        icon: <FaHandshake className="text-sm" />,
      },
      {
        label: 'Purchases',
        icon: <FaMoneyBillWave className="text-sm" />,
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        label: 'Invoice OCR',
        icon: <FaFileImport className="text-sm" />,
      },
      {
        label: 'Settings',
        icon: <FaCog className="text-sm" />,
      },
    ],
  },
];

const renderItems = (items: MenuItem[], depth = 0): React.ReactNode =>
  items.map((item, idx) => {
    const hasChildren = item.children && item.children.length > 0;
    return (
      <div key={`${item.label}-${idx}`} className="group">
        <div
          className={`flex items-center py-2 px-4 rounded-lg cursor-pointer ${
            item.active
              ? 'bg-purple-100 text-primary font-medium'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          } ${depth > 0 ? 'pl-6' : ''}`}
        >
          {item.icon && (
            <span className="text-gray-500 mr-3 group-hover:text-current">
              {item.icon}
            </span>
          )}
          <span className="flex-1 text-sm truncate">{item.label}</span>
          {hasChildren && <FaChevronDown className="text-xs text-gray-400" />}
        </div>
        {hasChildren && (
          <div className="mt-1 space-y-1">{renderItems(item.children!, depth + 1)}</div>
        )}
      </div>
    );
  });

const MenuBar: React.FC<MenuBarProps> = ({ onClose }) => {
  return (
    <aside className="w-64 h-screen bg-white border-l border-gray-200 flex flex-col shadow-lg">
      {/* Header with logo and title */}
      <div className="w-full h-18  flex items-center px-4 py-3 border-b border-gray-200">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-base mr-3">
          IQ
        </div>
        <span className="flex-1 font-medium text-gray-900">Margin IQ</span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      {/* Menu sections */}
      <div className="overflow-y-auto flex-1 py-4">
        {menuSections.map((section, idx) => (
          <div key={section.title} className={`${idx > 0 ? 'mt-6' : ''}`}>
            <h3 className="px-4 mb-2 text-xs font-semibold uppercase text-gray-400">
              {section.title}
            </h3>
            <div className="space-y-1">{renderItems(section.items)}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MenuBar;
