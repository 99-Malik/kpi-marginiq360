'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import NotificationBanner from '../NotificationBanner/NotificationBanner';
import { BellIcon, MessageIcon, CalendarIcon } from '../SVGIcons/NavBarSvgIcons';

interface NavBarProps {
    onLogoClick?: () => void;
}

const navIcons = [
    { type: 'svg', Icon: BellIcon, alt: 'Bell', width: 18, height: 18 },
    { type: 'svg', Icon: MessageIcon, alt: 'Message', width: 18, height: 18 },
    { type: 'svg', Icon: CalendarIcon, alt: 'Calendar', width: 18, height: 18 },
]

const NavBar: React.FC<NavBarProps> = ({ onLogoClick = () => { } }) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [bellPosition, setBellPosition] = useState({ top: 0, right: 0 });
    const [activeIcon, setActiveIcon] = useState<'bell' | 'message' | 'calendar' | null>(null);

    const closeNotification = () => {
        setIsNotificationOpen(false);
        setActiveIcon(null); // Reset active icon when notification is closed
    };

    const handleBellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        setBellPosition({
            top: rect.bottom + 8, // 8px gap below the bell
            right: window.innerWidth - rect.right
        });

        // If bell is already active, deactivate it
        if (activeIcon === 'bell') {
            setActiveIcon(null);
            setIsNotificationOpen(false);
        } else {
            setActiveIcon('bell');
            setIsNotificationOpen(true);
        }
    };

    const handleMessageClick = () => {
        // If message is already active, deactivate it
        if (activeIcon === 'message') {
            setActiveIcon(null);
        } else {
            setActiveIcon('message');
        }
        // Close notification if open
        if (isNotificationOpen) {
            setIsNotificationOpen(false);
        }
    };

    const handleCalendarClick = () => {
        // If calendar is already active, deactivate it
        if (activeIcon === 'calendar') {
            setActiveIcon(null);
        } else {
            setActiveIcon('calendar');
        }
        // Close notification if open
        if (isNotificationOpen) {
            setIsNotificationOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-[#F8F8FC] border-b border-[#E9EAEA] font-inter">
            {/* Row with logo cell (keeps borders aligned with sidebar) */}
            <div className="flex">
                {/* Logo cell – fixed width, same bg/border as header so seams match */}
                <div className="w-16 h-[72px] flex items-center justify-center flex-shrink-0">
                    <button
                        type="button"
                        aria-label="Open main menu"
                        onClick={onLogoClick}
                        className="w-10 h-10 bg-primary rounded-lg text-white font-bold text-base grid place-items-center outline-none focus:ring-2 focus:ring-primary/30 transition-transform hover:scale-[1.03]"
                    >
                        IQ
                    </button>
                </div>

                {/* Main bar – pt-2 gives the “curved” top-left start; rounded + borders align with logo cell */}
                <div className="flex-1 pt-2">
                    <nav
                        aria-label="Top navigation"
                        className="bg-white h-[72px] rounded-tl-3xl border-t border-l border-gray-200"
                    >
                        {/* Content container */}
                        <div className="h-full mx-auto max-w-[1400px] px-3 sm:px-4 lg:px-6 flex items-center gap-2 sm:gap-3 lg:gap-4">
                            {/* Search */}
                            <div className="relative w-1/3">
                                {/* Search Icon */}
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_2896_16250)">
                                            <path
                                                d="M17.8045 16.8625L13.8252 12.8831C14.9096 11.5569 15.4428 9.86453 15.3144 8.15617C15.1861 6.44782 14.406 4.85415 13.1356 3.70481C11.8652 2.55547 10.2016 1.93839 8.48895 1.98121C6.77632 2.02404 5.14566 2.72348 3.93426 3.93487C2.72287 5.14627 2.02343 6.77693 1.9806 8.48956C1.93778 10.2022 2.55486 11.8658 3.7042 13.1362C4.85354 14.4066 6.44721 15.1867 8.15556 15.315C9.86392 15.4434 11.5563 14.9102 12.8825 13.8258L16.8619 17.8051C16.9876 17.9266 17.156 17.9938 17.3308 17.9922C17.5056 17.9907 17.6728 17.9206 17.7964 17.797C17.92 17.6734 17.9901 17.5062 17.9916 17.3314C17.9932 17.1566 17.926 16.9882 17.8045 16.8625ZM8.66652 14.0005C7.61169 14.0005 6.58054 13.6877 5.70348 13.1016C4.82642 12.5156 4.14283 11.6826 3.73916 10.7081C3.3355 9.73357 3.22988 8.66122 3.43567 7.62665C3.64145 6.59208 4.14941 5.64178 4.89529 4.8959C5.64117 4.15002 6.59147 3.64206 7.62604 3.43628C8.6606 3.23049 9.73296 3.33611 10.7075 3.73977C11.682 4.14344 12.515 4.82703 13.101 5.70409C13.6871 6.58115 13.9999 7.6123 13.9999 8.66713C13.9983 10.0811 13.4359 11.4368 12.436 12.4366C11.4362 13.4365 10.0805 13.9989 8.66652 14.0005Z"
                                                fill="#727A90"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2896_16250">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Input field */}
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full h-9 lg:h-10 pl-7 sm:pl-9 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                />
                            </div>

                            {/* Weather (md+) */}
                            <div className="hidden md:flex items-center shrink-0">
                                <div className="relative w-6 h-6 sm:w-7 sm:h-7 mr-2">
                                    <Image
                                        src="/icons/sun.png"
                                        alt="Sunny"
                                        fill
                                        sizes="(max-width: 768px) 24px, (max-width: 1200px) 32px, 48px"
                                        className="object-contain"
                                    />                                </div>
                                <div className="hidden md:block leading-tight">
                                    <div className="text-gray-900 font-semibold text-xs sm:text-sm">Monday</div>
                                    <div className="text-gray-500 text-xs">Sunny, 44 C</div>
                                </div>
                            </div>

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* Quote (md+) */}
                            <div className="hidden lg:flex items-center px-2 sm:px-3 h-7 rounded-sm border border-purple-200 bg-purple-100 shrink-0">
                                <span className="text-primary text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                                    Be a source of inspiration
                                </span>
                            </div>

                            {/* Calendar (sm+) */}
                            <button
                                aria-label="Calendar"
                                onClick={handleCalendarClick}
                                className="hidden sm:grid size-8 place-items-center rounded-lg bg-gray-100 overflow-hidden outline-none focus:ring-2 focus:ring-primary/20 hover:bg-gray-200 transition-colors"
                            >
                                <CalendarIcon
                                    isActive={activeIcon === 'calendar'}
                                    className="w-5 h-5"
                                />
                            </button>

                            {/* Messages */}
                            <button
                                aria-label="Messages"
                                onClick={handleMessageClick}
                                className="relative grid size-8 place-items-center rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-primary/20 hover:bg-gray-200 transition-colors"
                            >
                                <MessageIcon
                                    isActive={activeIcon === 'message'}
                                    className="w-5 h-5"
                                />
                                <span className="absolute -top-2 -right-2 flex items-center justify-center px-1.5 py-1 bg-[#F05D3D] text-white text-[10px] font-semibold rounded-full leading-none">
                                    9
                                </span>
                            </button>

                            {/* Bell */}
                            <button
                                aria-label="Notifications"
                                onClick={handleBellClick}
                                className="relative grid size-8 place-items-center rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-primary/20 hover:bg-gray-200 transition-colors"
                            >
                                <BellIcon
                                    isActive={activeIcon === 'bell'}
                                    className="w-5 h-5"
                                />
                                <span className="absolute -top-2 -right-2 flex items-center justify-center px-1.5 py-1 bg-[#F05D3D] text-white text-[10px] font-semibold rounded-full leading-none">
                                    3
                                </span>
                            </button>

                            {/* Flag (md+) */}
                            <div className="hidden md:block relative rounded-full overflow-hidden bg-white border border-gray-200 w-7 h-7 lg:w-8 lg:h-8">
                                <Image
                                    src="/icons/us-flag.png"
                                    alt="USA"
                                    fill
                                    sizes="(max-width: 768px) 28px, (max-width: 1200px) 32px, 48px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Divider (md+) */}
                            <div className="hidden md:block w-px h-7 bg-gray-200" />

                            {/* Profile */}
                            <button
                                aria-label="Account"
                                className="flex items-center shrink-0 outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                            >
                                <span className="relative mr-2 w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white border border-gray-200">
                                    <Image
                                        src="/icons/kfc.png"
                                        alt="KFC"
                                        fill
                                        sizes="(max-width: 768px) 28px, (max-width: 1200px) 32px, 48px"
                                        className="object-cover"
                                    />
                                </span>
                                <div className="hidden lg:block text-left mr-1">
                                    <div className="text-gray-900 font-semibold text-xs sm:text-sm leading-none">
                                        KFC Restaurant
                                    </div>
                                    <div className="text-gray-500 text-[11px]">Branch Miami 101</div>
                                </div>
                                <MdKeyboardArrowDown className="text-gray-500 text-lg" />
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Notification Banner */}
            <NotificationBanner
                isOpen={isNotificationOpen}
                onClose={closeNotification}
                position={bellPosition}
            />
        </header>
    );
};

export default NavBar;
