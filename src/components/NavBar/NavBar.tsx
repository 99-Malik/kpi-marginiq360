'use client';

import React from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface NavBarProps {
    onLogoClick?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogoClick = () => { } }) => {
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
                            <div className="relative flex-1 min-w-[160px] max-w-[420px]">
                                <FaSearch className="pointer-events-none absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search…"
                                    aria-label="Search"
                                    className="w-full h-9 lg:h-10 pl-7 sm:pl-9 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Weather (md+) */}
                            <div className="hidden md:flex items-center shrink-0">
                                <div className="relative w-6 h-6 sm:w-7 sm:h-7 mr-2">
                                    <Image src="/icons/sun.png" alt="Sunny" fill className="object-contain" />
                                </div>
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
                                    "Be a source of inspiration"
                                </span>
                            </div>

                            {/* Calendar (sm+) */}
                            <button
                                aria-label="Calendar"
                                className="hidden sm:grid size-8 place-items-center rounded-lg bg-gray-100 overflow-hidden outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <span className="relative w-5 h-5">
                                    <Image src="/icons/calendar.png" alt="" fill className="object-contain" />
                                </span>
                            </button>

                            {/* Messages */}
                            <button
                                aria-label="Messages"
                                className="relative grid size-8 place-items-center rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <span className="relative w-5 h-5">
                                    <Image src="/icons/message.png" alt="" fill className="object-contain" />
                                </span>
                                <span className="absolute -top-2 -right-2 flex items-center justify-center px-1.5 py-1 bg-[#F05D3D] text-white text-[10px] font-semibold rounded-full leading-none">
                                    9
                                </span>
                            </button>

                            {/* Bell */}
                            <button
                                aria-label="Notifications"
                                className="relative grid size-8 place-items-center rounded-lg bg-gray-100  outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <span className="relative w-5 h-5">
                                    <Image src="/icons/bell.png" alt="" fill className="object-contain" />
                                </span>
                                <span className="absolute -top-2 -right-2 flex items-center justify-center px-1.5 py-1 bg-[#F05D3D] text-white text-[10px] font-semibold rounded-full leading-none">
                                    3
                                </span>
                            </button>

                            {/* Flag (md+) */}
                            <div className="hidden md:block relative rounded-full overflow-hidden bg-white border border-gray-200 size-7 lg:size-8">
                                <Image src="/icons/us-flag.png" alt="USA" fill className="object-cover" />
                            </div>

                            {/* Divider (md+) */}
                            <div className="hidden md:block w-px h-7 bg-gray-200" />

                            {/* Profile */}
                            <button
                                aria-label="Account"
                                className="flex items-center shrink-0 outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                            >
                                <span className="relative mr-2  size-7 lg:size-8 rounded-full overflow-hidden bg-white border border-gray-200">
                                    <Image src="/icons/kfc.png" alt="KFC" fill className="object-cover" />
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
        </header>
    );
};

export default NavBar;
