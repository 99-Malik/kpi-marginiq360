'use client';

import React from 'react';
import {
    InformationIcon,
    ClockIcon,
    TickMarkIcon,
    AllReadIcon,
    ArrowIcon,
    CloseIcon,
    NotificationLogoIcon
} from '../SVGIcons/NotificationBannerSvg/NotificationBannerSvg';

interface Notification {
    id: string;
    type: 'food-cost' | 'ai-insights' | 'analytics';
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
    isNew: boolean; // added for new notification check
}

interface NotificationBannerProps {
    isOpen: boolean;
    onClose: () => void;
    position: { top: number; right: number };
}

// Array containing all icons with sizes
const NotificationIcons = [
    { type: 'svg', Icon: InformationIcon, alt: 'informartionIcon', width: 16, height: 16 },
    { type: 'svg', Icon: ClockIcon, alt: 'clockIcon', width: 16, height: 16 },
    { type: 'svg', Icon: TickMarkIcon, alt: 'tickMarkIcon', width: 14, height: 14 },
    { type: 'svg', Icon: AllReadIcon, alt: 'allReadIcon', width: 20, height: 20 },
    { type: 'svg', Icon: ArrowIcon, alt: 'arrowIcon', width: 18, height: 18 },
    { type: 'svg', Icon: CloseIcon, alt: 'closeIcon', width: 18, height: 18 },
    { type: 'svg', Icon: NotificationLogoIcon, alt: 'notificationLogoIcon', width: 25, height: 25 },
];

// Function to get icon dynamically from array
const getIconFromArray = (alt: string) => {
    const iconData = NotificationIcons.find(icon => icon.alt === alt);
    if (!iconData) return null;

    const IconComponent = iconData.Icon;
    return (
        <IconComponent style={{ width: `${iconData.width}px`, height: `${iconData.height}px` }} />
    );
};

const NotificationBanner: React.FC<NotificationBannerProps> = ({ isOpen, onClose, position }) => {
    const [notifications, setNotifications] = React.useState<Notification[]>([
        {
            id: '1',
            type: 'food-cost',
            title: 'Track inventory daily',
            description:
                'Monitor inventory daily for accuracy. Check stock levels, note discrepancies, and update records to prevent shortages and overstock.',
            timestamp: '11:00:23 AM',
            read: false,
            isNew: true
        },
        {
            id: '2',
            type: 'ai-insights',
            title: 'Let AI suggest menu changes',
            description:
                'Imagine a lively restaurant menu! With AI, receive updates tailored to customer preferences and seasonal trends, keeping your offerings fresh!',
            timestamp: '11:00:23 AM',
            read: false,
            isNew: false
        },
        {
            id: '3',
            type: 'analytics',
            title: 'Let AI identify top sellers',
            description:
                'Unlock the power of AI to pinpoint your best-selling products effortlessly. Let data-driven insights guide your sales strategy and boost your revenue!',
            timestamp: '11:00:23 AM',
            read: false,
            isNew: false
        },
        {
            id: '4',
            type: 'food-cost',
            title: 'Update menu pricing',
            description:
                'Review and update menu pricing based on current market trends and cost analysis to maintain profitability.',
            timestamp: '10:45:12 AM',
            read: false,
            isNew: false
        },
        {
            id: '5',
            type: 'ai-insights',
            title: 'Customer feedback analysis',
            description:
                'Analyze recent customer feedback to identify trends and improve service quality across all touchpoints.',
            timestamp: '10:30:45 AM',
            read: false,
            isNew: false
        },
        {
            id: '6',
            type: 'analytics',
            title: 'Sales performance review',
            description:
                'Review weekly sales performance and identify opportunities for improvement in your restaurant operations.',
            timestamp: '10:15:30 AM',
            read: false,
            isNew: false
        },
        {
            id: '7',
            type: 'food-cost',
            title: 'Inventory optimization',
            description:
                'Optimize your inventory levels to reduce waste and improve cash flow management.',
            timestamp: '10:00:00 AM',
            read: false,
            isNew: false
        },
        {
            id: '8',
            type: 'ai-insights',
            title: 'Menu engineering insights',
            description:
                'Get AI-powered insights on menu engineering to maximize profitability and customer satisfaction.',
            timestamp: '09:45:30 AM',
            read: false,
            isNew: false
        },
        {
            id: '9',
            type: 'analytics',
            title: 'Revenue optimization',
            description:
                'Optimize your revenue streams through data-driven insights and strategic pricing adjustments.',
            timestamp: '09:30:15 AM',
            read: false,
            isNew: false
        },
        {
            id: '10',
            type: 'food-cost',
            title: 'Cost control measures',
            description:
                "Implement effective cost control measures to improve your restaurant's bottom line.",
            timestamp: '09:15:00 AM',
            read: false,
            isNew: false
        },
        {
            id: '11',
            type: 'ai-insights',
            title: 'Predictive analytics',
            description:
                'Leverage predictive analytics to forecast demand and optimize your inventory management.',
            timestamp: '09:00:00 AM',
            read: false,
            isNew: false
        },
        {
            id: '12',
            type: 'analytics',
            title: 'Performance metrics',
            description:
                'Track key performance metrics to identify areas for improvement and growth opportunities.',
            timestamp: '08:45:30 AM',
            read: false,
            isNew: false
        }
    ]);

    const markAsRead = (id: string) => {
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id
              ? { ...notification, read: true, isNew: false }
              : notification
          )
        );
      };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    };
    const getNotificationIcon = (type: string, isNew: boolean) => {
        return (
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isNew ? 'bg-white  ' : 'bg-[#F1E7F8]'
                    }`}
            >
                {getIconFromArray('notificationLogoIcon')}
            </div>
        );
    };


    const getNotificationTypeLabel = (type: string) => {
        switch (type) {
            case 'food-cost':
                return 'Food Cost';
            case 'ai-insights':
                return 'AI Insights';
            case 'analytics':
                return 'Analytics';
            default:
                return '';
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-50 bg-black/20" onClick={onClose} />

            {/* Notification Panel */}
            <div
                className="fixed z-50 w-120 bg-white rounded-lg shadow-xl border border-gray-200"
                style={{
                    top: `${position.top}px`,
                    right: `${position.right}px`
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Notification</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        {getIconFromArray('closeIcon')}
                    </button>
                </div>

                {/* Notification List */}
                <div className="max-h-100 overflow-y-auto custom-scroll">
                    {notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`p-4 last:border-b-0 ${notification.isNew ? 'bg-[#F1E7F8]' : 'bg-white'
                                }`}
                        >
                            {/* Notification Header */}
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="flex items-center space-x-1">
                                    {getIconFromArray('informartionIcon')}
                                    <span className="text-xs text-[#727A90]">
                                        {getNotificationTypeLabel(notification.type)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-[#727A90]">
                                    {getIconFromArray('clockIcon')}
                                    <span>{notification.timestamp}</span>
                                </div>
                            </div>

                            {/* Notification Content */}
                            <div className="flex items-start space-x-2">
                                {getNotificationIcon(notification.type, notification.isNew)}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">{notification.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{notification.description}</p>
                                </div>
                            </div>

                            {notification.isNew && (
                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="flex items-center space-x-1 text-sm text-primary hover:text-purple-700 underline"
                                    >
                                        {getIconFromArray('tickMarkIcon')}
                                        <span className='text-sm font-bold text-primary'>Mark as Read</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between py-4 px-2 border-t border-gray-200 overflow-visible">
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center space-x-1 text-sm text-primary hover:text-purple-700 underline"
                    >
                        {getIconFromArray('allReadIcon')}
                        <span className='text-sm font-bold text-primary'>Mark All as Read</span>
                    </button>

                    <button className="flex items-center space-x-1 pr-2 text-sm text-primary hover:text-purple-700 underline">
                        <span className="text-sm font-bold text-primary">See More</span>
                        <span className="flex-shrink-0 mb-[-4px] font">{getIconFromArray('arrowIcon')}</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default NotificationBanner;
