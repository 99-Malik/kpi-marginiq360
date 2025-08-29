'use client';

import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import SideBarMenu from '../../components/Sidebar/SideBarMenu';
import MenuBar from '../../components/MenuBar/MenuBar';
import ChartCard from '@/components/LineChartCard/ChartCards';
import WasteManagementModal from '@/components/Modal/WasteManagement/WasteManamentModal';
import Pagination from '@/components/Pagination/WasteManagement/page';
import RevenuePerformanceChart from '@/components/LineChartCard/RevenuePerformanceChart';

// Define the waste event type
interface WasteEvent {
    title: string;
    date: string;
    quantity: string;
    status: string[];
    reason: string;
}

function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogoClick = () => {
        setMenuOpen(!menuOpen);
    }
    const [activeTab, setActiveTab] = useState('Recent Events');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [editingEvent, setEditingEvent] = useState<WasteEvent | null>(null);

    // Issue button state
    const [showExclamationButton, setShowExclamationButton] = useState<number | null>(null);
    const [showIssueButton, setShowIssueButton] = useState<number | null>(null);

    // State to track which events have been marked as issued
    const [issuedEvents, setIssuedEvents] = useState<Set<number>>(new Set());

    // Prevention Techniques data
    const preventionTechniques = [
        {
            title: "FIFO (First In, First Out) Methodology",
            description: "Implement a FIFO system for all perishable items to reduce waste effectively."
        },
        {
            title: "Effective Portion Control Methods",
            description: "Adjust serving sizes based on past consumption data."
        },
        {
            title: "Enhancing Storage Solutions",
            description: "Optimize storage environments to prolong product shelf life."
        },
        {
            title: "Advanced Storage Optimization Techniques",
            description: "Refine storage conditions to maintain product quality."
        },
        {
            title: "Innovative Storage Maximization Strategies",
            description: "Enhance storage conditions for better product longevity."
        },
        {
            title: "Strategic Storage Enhancement Techniques",
            description: "Refine storage conditions to ensure product freshness."
        },
        {
            title: "Storage Optimization Strategies",
            description: "Enhance storage conditions to keep products fresh longer."
        }
    ];

    // Upcoming Predictions data
    const upcomingPredictions = [
        {
            title: "Evaluate Kale Stock",
            description: "Reduce order quantities by 15% - identified as a major contributor to waste."
        },
        {
            title: "Seasonal Waste Trends",
            description: "Vegetable waste surges in the fall season."
        },
        {
            title: "Comprehensive Waste Management Strategies",
            description: "Waste levels often rise significantly during festive seasons."
        },
        {
            title: "Comprehensive Waste Management Strategies",
            description: "Waste levels often rise significantly during festive seasons."
        },
        {
            title: "Comprehensive Waste Management Strategies",
            description: "Waste levels often rise significantly during festive seasons."
        },
        {
            title: "Comprehensive Waste Management Strategies",
            description: "Waste levels often rise significantly during festive seasons."
        },
        {
            title: "Comprehensive Waste Management Strategies",
            description: "Waste levels often rise significantly during festive seasons."
        }
    ];

    const handleOpenCreateModal = () => {
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (event: WasteEvent, index: number) => {
        setModalMode('edit');
        setEditingEvent(event);
        setIsModalOpen(true);
        setShowExclamationButton(index);
    };

    const handleModalMarkAsIssued = () => {
        if (editingEvent) {
            const eventIndex = wasteEvents.findIndex(event => event === editingEvent);
            if (eventIndex !== -1) {
                setIssuedEvents((prev: Set<number>) => new Set([...prev, eventIndex]));
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        setShowExclamationButton(null);
        setShowIssueButton(null);
    };

    const handleExclamationClick = (index: number) => {
        setShowIssueButton(index);
    };

    const handleSubmitModal = (data: { eventName: string; item: string; quantityKg: string; category: string; description: string }) => {
        // Handle form submission here
        console.log('Modal submitted:', data);
        handleCloseModal();
    };

    // Waste events data
    const wasteEvents: WasteEvent[] = [
        {
            title: "Lettuce Waste Event",
            date: "27/12/2025",
            quantity: "2.5 Kg",
            status: ["Issued", "Spoiled"],
            reason: "In our restaurant, we strive to minimize waste, but sometimes it occurs due to various reasons. For instance, over-preparation of ingredients can lead to excess food that goes unused. Additionally, customer preferences can change, resulting in leftover dishes that a..."
        },
        {
            title: "Lettuce Waste Event",
            date: "27/12/2025",
            quantity: "2.5 Kg",
            status: ["Overproduced"],
            reason: "In our restaurant, we strive to minimize waste, but sometimes it occurs due to various reasons. For instance, over-preparation of ingredients can lead to excess food that goes unused. Additionally, customer preferences can change, resulting in leftover dishes that a..."
        },
        {
            title: "Tomato Waste Event",
            date: "27/12/2025",
            quantity: "2.5 Kg",
            status: ["Damaged"],
            reason: "Cucumber waste is often a result of improper storage and handling. When cucumbers are not stored at optimal temperatures, they may spoil faster than anticipated. Additionally, fluctuations in menu popularity can lead to an overstock of cucumbers that remain unsold..."
        },
        {
            title: "Cucumber Waste Event",
            date: "27/12/2025",
            quantity: "2.5 Kg",
            status: ["Damaged"],
            reason: "In our restaurant, we strive to minimize waste, but sometimes it occurs due to various reasons. For instance, over-preparation of ingredients can lead to excess food that goes unused. Additionally, customer preferences can change, resulting in leftover dishes that a..."
        },
        {
            title: "Cucumber Waste Event",
            date: "27/12/2025",
            quantity: "2.5 Kg",
            status: ["Overproduced"],
            reason: "Cucumber waste is often a result of improper storage and handling. When cucumbers are not stored at optimal temperatures, they may spoil faster than anticipated. Additionally, fluctuations in menu popularity can lead to an overstock of cucumbers that remain unsold..."
        },
        {
            title: "Carrot Waste Event",
            date: "27/12/2025",
            quantity: "2.5 Kg",
            status: ["Issued", "Damaged"],
            reason: "Carrot waste can occur from trimming too much of the vegetable or failing to utilize carrot tops in recipes. Our team is looking into ways to incorporate all parts of the carrot into our dishes, reducing waste and enhancing flavor profiles."
        }
    ];

    return (
        <div className="min-h-screen w-full flex flex-col">
            {/* NavBar */}
            <NavBar onLogoClick={handleLogoClick} />

            {/* Main Content with Sidebar */}
            <div className="flex flex-1 w-full">
                <SideBarMenu />

                {menuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-[55] bg-black/10"
                            onClick={() => setMenuOpen(false)}
                        />
                        <div className="fixed inset-y-0 left-16 z-[60]">
                            <MenuBar onClose={() => setMenuOpen(false)} />
                        </div>
                    </>
                )}

                <main className="flex-1 overflow-auto p-6 pt-4 bg-white border-l border-gray-200">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                            {/* left: title + subtitle */}
                            <div className="min-w-0">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Waste Tracking</h1>
                                <p className="text-gray-500 mt-2 sm:max-w-[60ch] md:text-xs lg:text-xs xl:text-base">
                                    Monitor and analyze food waste to reduce costs

                                </p>
                            </div>

                            {/* right: actions - buttons below on md, same row on lg */}
                            <div className="flex items-center lg:mt-6 xl:mt-4 gap-2 sm:gap-3 flex-wrap lg:flex-nowrap justify-end lg:justify-start">
                                {/* Button 1 */}
                                <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-2 rounded-lg border border-gray-200 bg-white cursor-pointer px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3627_24002)">
                                            <path d="M2 14.667C2.00106 15.5507 2.35259 16.398 2.97748 17.0228C3.60237 17.6477 4.4496 17.9993 5.33333 18.0003H14.6667C15.5504 17.9993 16.3976 17.6477 17.0225 17.0228C17.6474 16.398 17.9989 15.5507 18 14.667V8.66699H2V14.667ZM13.3333 11.667C13.5311 11.667 13.7245 11.7256 13.8889 11.8355C14.0534 11.9454 14.1815 12.1016 14.2572 12.2843C14.3329 12.467 14.3527 12.6681 14.3141 12.8621C14.2755 13.0561 14.1803 13.2342 14.0404 13.3741C13.9006 13.514 13.7224 13.6092 13.5284 13.6478C13.3344 13.6864 13.1334 13.6666 12.9507 13.5909C12.7679 13.5152 12.6117 13.387 12.5019 13.2226C12.392 13.0581 12.3333 12.8648 12.3333 12.667C12.3333 12.4018 12.4387 12.1474 12.6262 11.9599C12.8138 11.7723 13.0681 11.667 13.3333 11.667ZM10 11.667C10.1978 11.667 10.3911 11.7256 10.5556 11.8355C10.72 11.9454 10.8482 12.1016 10.9239 12.2843C10.9996 12.467 11.0194 12.6681 10.9808 12.8621C10.9422 13.0561 10.847 13.2342 10.7071 13.3741C10.5673 13.514 10.3891 13.6092 10.1951 13.6478C10.0011 13.6864 9.80004 13.6666 9.61732 13.5909C9.43459 13.5152 9.27841 13.387 9.16853 13.2226C9.05865 13.0581 9 12.8648 9 12.667C9 12.4018 9.10536 12.1474 9.29289 11.9599C9.48043 11.7723 9.73478 11.667 10 11.667ZM6.66667 11.667C6.86445 11.667 7.05779 11.7256 7.22224 11.8355C7.38669 11.9454 7.51486 12.1016 7.59055 12.2843C7.66623 12.467 7.68604 12.6681 7.64745 12.8621C7.60887 13.0561 7.51363 13.2342 7.37377 13.3741C7.23392 13.514 7.05574 13.6092 6.86176 13.6478C6.66778 13.6864 6.46671 13.6666 6.28398 13.5909C6.10126 13.5152 5.94508 13.387 5.8352 13.2226C5.72532 13.0581 5.66667 12.8648 5.66667 12.667C5.66667 12.4018 5.77202 12.1474 5.95956 11.9599C6.1471 11.7723 6.40145 11.667 6.66667 11.667Z" fill="#727A90" />
                                            <path d="M14.6667 3.33333H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2C13.1565 2 12.987 2.07024 12.8619 2.19526C12.7369 2.32029 12.6667 2.48986 12.6667 2.66667V3.33333H7.33333V2.66667C7.33333 2.48986 7.2631 2.32029 7.13807 2.19526C7.01305 2.07024 6.84348 2 6.66667 2C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V3.33333H5.33333C4.4496 3.33439 3.60237 3.68592 2.97748 4.31081C2.35259 4.93571 2.00106 5.78294 2 6.66667L2 7.33333H18V6.66667C17.9989 5.78294 17.6474 4.93571 17.0225 4.31081C16.3976 3.68592 15.5504 3.33439 14.6667 3.33333Z" fill="#727A90" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3627_24002">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="whitespace-nowrap text-xs text-[#727A90]">Last Year</span>
                                </button>



                                {/* Button 3 */}
                                <button
                                    type="button"
                                    onClick={handleOpenCreateModal}
                                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-sm  text-white cursor-pointer"
                                ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3899_29783)">
                                            <path d="M17.3333 9.33334H10.6667V2.66666C10.6667 2.29847 10.3682 2 10 2C9.63181 2 9.33334 2.29847 9.33334 2.66666V9.33331H2.66666C2.29847 9.33334 2 9.63181 2 10C2 10.3682 2.29847 10.6667 2.66666 10.6667H9.33331V17.3333C9.33331 17.7015 9.63178 18 9.99997 18C10.3682 18 10.6666 17.7015 10.6666 17.3333V10.6667H17.3333C17.7015 10.6667 17.9999 10.3682 17.9999 10C18 9.63181 17.7015 9.33334 17.3333 9.33334Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3899_29783">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>



                                    <span className="whitespace-nowrap text-xs text-white">Report Waste</span>
                                </button>


                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <ChartCard
                            title="Total Waste Cost"
                            value="46,420.00"
                            change="+10%"
                            amount="Up From Last Year"
                            color="red"
                            icon={
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="44" height="44" rx="22" fill="#FCE8E8" />
                                    <path d="M23.932 14C24.7454 14.0008 25.5253 14.3243 26.1005 14.8995C26.6757 15.4747 26.9992 16.2546 27 17.068C27 17.3332 27.1054 17.5876 27.2929 17.7751C27.4804 17.9626 27.7348 18.068 28 18.068C28.2652 18.068 28.5196 17.9626 28.7071 17.7751C28.8946 17.5876 29 17.3332 29 17.068V17C29 16.981 29 16.964 29 16.945C28.9666 15.6227 28.4181 14.3658 27.4714 13.4421C26.5247 12.5183 25.2547 12.0009 23.932 12H23V11C23 10.7348 22.8946 10.4804 22.7071 10.2929C22.5196 10.1054 22.2652 10 22 10C21.7348 10 21.4804 10.1054 21.2929 10.2929C21.1054 10.4804 21 10.7348 21 11V12H20.068C18.8653 12.0013 17.7023 12.4302 16.7868 13.2102C15.8713 13.9901 15.263 15.0702 15.0707 16.2574C14.8783 17.4446 15.1144 18.6615 15.7368 19.6907C16.3592 20.7198 17.3273 21.494 18.468 21.875L21 22.72V30H20.068C19.2546 29.9992 18.4747 29.6757 17.8995 29.1005C17.3243 28.5253 17.0008 27.7454 17 26.932C17 26.6668 16.8946 26.4124 16.7071 26.2249C16.5196 26.0374 16.2652 25.932 16 25.932C15.7348 25.932 15.4804 26.0374 15.2929 26.2249C15.1054 26.4124 15 26.6668 15 26.932V27C15 27.019 15 27.036 15 27.055C15.0334 28.3773 15.5819 29.6342 16.5286 30.5579C17.4753 31.4817 18.7453 31.9991 20.068 32H21V33C21 33.2652 21.1054 33.5196 21.2929 33.7071C21.4804 33.8946 21.7348 34 22 34C22.2652 34 22.5196 33.8946 22.7071 33.7071C22.8946 33.5196 23 33.2652 23 33V32H23.932C25.1347 31.9987 26.2977 31.5698 27.2132 30.7898C28.1287 30.0099 28.737 28.9298 28.9293 27.7426C29.1217 26.5554 28.8856 25.3385 28.2632 24.3093C27.6408 23.2802 26.6727 22.506 25.532 22.125L23 21.28V14H23.932ZM24.902 24.021C25.5934 24.2511 26.1804 24.7198 26.5577 25.3432C26.9351 25.9666 27.0782 26.704 26.9615 27.4233C26.8448 28.1426 26.4759 28.7969 25.9208 29.269C25.3657 29.7411 24.6607 30.0003 23.932 30H23V23.387L24.902 24.021ZM21 20.613L19.1 19.979C18.4087 19.7489 17.8219 19.2804 17.4445 18.6572C17.0672 18.034 16.9239 17.2969 17.0403 16.5777C17.1567 15.8585 17.5253 15.2042 18.08 14.7319C18.6348 14.2597 19.3395 14.0002 20.068 14H21V20.613Z" fill="#E51B1B" />
                                </svg>



                            }
                        />
                        <ChartCard
                            title="Waste Events"
                            value="0.00"
                            amount="Reported Incidents"
                            color="yellow"
                            icon={<svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" width="44" height="44" rx="22" fill="#FDF7E7" />
                                <g clip-path="url(#clip0_2058_16430)">
                                    <path d="M32.0005 12.5001C30.3942 10.9085 28.2243 10.0156 25.963 10.0156C23.7017 10.0156 21.5319 10.9085 19.9255 12.5001C17.5485 14.8771 16.7685 20.4091 16.5155 23.5001C16.446 24.3686 16.6506 25.237 17.1005 25.9831L13.3005 29.7831C13.1594 29.525 12.9456 29.3141 12.6855 29.1766C12.4255 29.0391 12.1307 28.9811 11.838 29.0098C11.5452 29.0385 11.2674 29.1527 11.039 29.3381C10.8106 29.5235 10.6418 29.7719 10.5535 30.0525C10.4652 30.3331 10.4614 30.6335 10.5425 30.9162C10.6236 31.199 10.7861 31.4516 11.0097 31.6428C11.2333 31.8339 11.5081 31.9551 11.8 31.9913C12.092 32.0274 12.3881 31.9769 12.6515 31.8461C12.5207 32.1096 12.4702 32.4057 12.5064 32.6976C12.5425 32.9895 12.6637 33.2644 12.8549 33.488C13.046 33.7116 13.2987 33.874 13.5814 33.9551C13.8642 34.0362 14.1645 34.0324 14.4451 33.9441C14.7257 33.8559 14.9742 33.687 15.1596 33.4586C15.345 33.2303 15.4591 32.9524 15.4878 32.6597C15.5165 32.3669 15.4585 32.0722 15.3211 31.8121C15.1836 31.5521 14.9726 31.3382 14.7145 31.1971L18.5145 27.3971C19.2594 27.8515 20.1288 28.0587 20.9985 27.9891C24.0845 27.7361 29.6155 26.9571 31.9985 24.5791C33.5918 22.973 34.4861 20.8024 34.4864 18.54C34.4868 16.2777 33.5933 14.1068 32.0005 12.5001ZM30.5855 23.1621C29.1985 24.5471 25.5565 25.6061 20.8415 25.9931C20.5282 26.0203 20.2127 25.9785 19.9172 25.8708C19.6217 25.7631 19.3534 25.5921 19.131 25.3697C18.9086 25.1473 18.7375 24.8789 18.6298 24.5834C18.5221 24.2879 18.4804 23.9725 18.5075 23.6591C18.8945 18.9441 19.9535 15.3001 21.3385 13.9151C21.9433 13.2971 22.6646 12.8052 23.4608 12.4678C24.2569 12.1304 25.112 11.9543 25.9767 11.9496C26.8414 11.945 27.6984 12.1118 28.4981 12.4405C29.2979 12.7693 30.0245 13.2534 30.6359 13.8648C31.2473 14.4762 31.7314 15.2028 32.0601 16.0025C32.3889 16.8023 32.5557 17.6593 32.551 18.524C32.5463 19.3886 32.3702 20.2438 32.0328 21.0399C31.6955 21.836 31.2035 22.5574 30.5855 23.1621Z" fill="#E7AA0B" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2058_16430">
                                        <rect width="24" height="24" fill="white" transform="translate(10.5 10)" />
                                    </clipPath>
                                </defs>
                            </svg>


                            }
                        />

                        <ChartCard
                            title="Avg Cost/Event"
                            value="0.00"
                            change="Per Incident"
                            color="purple"
                            icon={<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="40" rx="20" fill="#FCEDF8" />
                                <g clip-path="url(#clip0_2058_16440)">
                                    <path d="M20 20C20.9889 20 21.9556 19.7068 22.7779 19.1573C23.6001 18.6079 24.241 17.827 24.6194 16.9134C24.9978 15.9998 25.0969 14.9945 24.9039 14.0246C24.711 13.0546 24.2348 12.1637 23.5355 11.4645C22.8363 10.7652 21.9454 10.289 20.9755 10.0961C20.0055 9.90315 19.0002 10.0022 18.0866 10.3806C17.173 10.759 16.3921 11.3999 15.8427 12.2222C15.2932 13.0444 15 14.0111 15 15C15.0013 16.3257 15.5285 17.5967 16.4659 18.5341C17.4033 19.4715 18.6743 19.9987 20 20ZM20 11.6667C20.6593 11.6667 21.3037 11.8622 21.8519 12.2284C22.4001 12.5947 22.8273 13.1153 23.0796 13.7244C23.3319 14.3335 23.3979 15.0037 23.2693 15.6503C23.1407 16.2969 22.8232 16.8909 22.357 17.357C21.8908 17.8232 21.2969 18.1407 20.6503 18.2693C20.0037 18.3979 19.3335 18.3319 18.7244 18.0796C18.1153 17.8273 17.5947 17.4001 17.2284 16.8519C16.8622 16.3037 16.6667 15.6593 16.6667 15C16.6667 14.1159 17.0179 13.2681 17.643 12.643C18.2681 12.0179 19.1159 11.6667 20 11.6667Z" fill="#E44FBA" />
                                    <path d="M20 21.668C18.0116 21.6702 16.1052 22.4611 14.6991 23.8671C13.2931 25.2731 12.5022 27.1795 12.5 29.168C12.5 29.389 12.5878 29.6009 12.7441 29.7572C12.9004 29.9135 13.1123 30.0013 13.3333 30.0013C13.5543 30.0013 13.7663 29.9135 13.9226 29.7572C14.0789 29.6009 14.1667 29.389 14.1667 29.168C14.1667 27.6209 14.7812 26.1371 15.8752 25.0432C16.9692 23.9492 18.4529 23.3346 20 23.3346C21.5471 23.3346 23.0308 23.9492 24.1248 25.0432C25.2188 26.1371 25.8333 27.6209 25.8333 29.168C25.8333 29.389 25.9211 29.6009 26.0774 29.7572C26.2337 29.9135 26.4457 30.0013 26.6667 30.0013C26.8877 30.0013 27.0996 29.9135 27.2559 29.7572C27.4122 29.6009 27.5 29.389 27.5 29.168C27.4978 27.1795 26.7069 25.2731 25.3009 23.8671C23.8948 22.4611 21.9884 21.6702 20 21.668Z" fill="#E44FBA" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2058_16440">
                                        <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                                    </clipPath>
                                </defs>
                            </svg>



                            }
                        />

                    </div>
                    <div className="mb-6">
                        <div className="border-b border-gray-200">
                            <div className="flex gap-8 mt-12" role="tablist">
                                <button
                                    onClick={() => handleTabClick('Recent Events')}
                                    role="tab"
                                    aria-selected={activeTab === 'Recent Events'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Recent Events'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-25 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Recent Events
                                </button>
                                <button
                                    onClick={() => handleTabClick('Analysis')}
                                    role="tab"
                                    aria-selected={activeTab === 'Analysis'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Analysis'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-14 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Analysis
                                </button>

                                <button
                                    onClick={() => handleTabClick('Trends')}
                                    role="tab"
                                    aria-selected={activeTab === 'Trends'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Trends'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-12 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Trends
                                </button>

                                <button
                                    onClick={() => handleTabClick('Prevention')}
                                    role="tab"
                                    aria-selected={activeTab === 'Prevention'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Prevention'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-19 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Prevention
                                </button>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'Recent Events' && (
                        <div className="h-[600px] overflow-y-auto pr-2 custom-scroll">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-6">
                                {wasteEvents.map((event, index) => (
                                    <div key={index} className="bg-white rounded-2xl pt-4 px-6 py-1  border border-[#E5E7EB]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-1 bg-[#F8F8FC] text-[#1A1C21] text-xs font-semibold rounded border border-[#E5E7EB]">
                                                        {event.date}
                                                    </span>
                                                    <span className="px-2 py-1 bg-[#F8F8FC] text-[#1A1C21] text-xs font-semibold rounded border border-[#E5E7EB]">
                                                        {event.quantity}
                                                    </span>
                                                    {event.status.includes('Issued') && (
                                                        <span className="px-2 py-0.5 bg-[#FDF7E7] text-[#D29B0A] text-xs font-semibold rounded-full border border-[#FCE8E8] flex items-center gap-1">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clip-path="url(#clip0_2249_46138)">
                                                                    <path d="M6 7.50036C5.86739 7.50036 5.74022 7.44768 5.64645 7.35392C5.55268 7.26015 5.5 7.13297 5.5 7.00036V3.00036C5.5 2.86775 5.55268 2.74058 5.64645 2.64681C5.74022 2.55304 5.86739 2.50036 6 2.50036C6.13261 2.50036 6.25979 2.55304 6.35356 2.64681C6.44732 2.74058 6.5 2.86775 6.5 3.00036V7.00036C6.5 7.13297 6.44732 7.26015 6.35356 7.35392C6.25979 7.44768 6.13261 7.50036 6 7.50036ZM6.3965 11.8804C7.4765 11.4464 11 9.73986 11 6.02186V3.43636C11.0006 2.91087 10.8353 2.3986 10.5277 1.97252C10.2201 1.54644 9.78595 1.22828 9.287 1.06336L6.1575 0.0258631C6.05533 -0.00862103 5.94467 -0.00862103 5.8425 0.0258631L2.713 1.06336C2.21406 1.22828 1.77988 1.54644 1.4723 1.97252C1.16473 2.3986 0.999447 2.91087 1 3.43636V6.02186C1 9.30286 4.5025 11.3099 5.5765 11.8469C5.71234 11.9117 5.85418 11.9631 6 12.0004C6.13558 11.9726 6.26831 11.9325 6.3965 11.8804ZM8.972 2.01236C9.27127 2.11157 9.53166 2.30255 9.7162 2.55818C9.90074 2.81381 10 3.12108 10 3.43636V6.02186C10 9.11336 6.9565 10.5774 6.0235 10.9524C5.0795 10.4804 2 8.72986 2 6.02186V3.43636C1.99996 3.12108 2.09926 2.81381 2.2838 2.55818C2.46834 2.30255 2.72874 2.11157 3.028 2.01236L6 1.02736L8.972 2.01236ZM6 8.50036C5.90111 8.50036 5.80444 8.52969 5.72222 8.58463C5.63999 8.63957 5.57591 8.71766 5.53806 8.80902C5.50022 8.90038 5.49032 9.00092 5.50961 9.09791C5.5289 9.1949 5.57652 9.28399 5.64645 9.35392C5.71637 9.42384 5.80547 9.47146 5.90246 9.49076C5.99945 9.51005 6.09998 9.50015 6.19134 9.4623C6.28271 9.42446 6.3608 9.36037 6.41574 9.27815C6.47068 9.19592 6.5 9.09925 6.5 9.00036C6.5 8.86775 6.44732 8.74058 6.35356 8.64681C6.25979 8.55304 6.13261 8.50036 6 8.50036Z" fill="#D29B0A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_2249_46138">
                                                                        <rect width="12" height="12" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                            Issued
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {event.status.filter(s => s !== 'Issued').map((status, statusIndex) => (
                                                    <span
                                                        key={statusIndex}
                                                        className={`px-3 py-1 flex items-center justify-center mr-3 text-xs font-semibold rounded-full ${status === 'Spoiled' || status === 'Overproduced' || status === 'Damaged'
                                                            ? 'bg-[#FCE8E8] text-[#E51B1B] '
                                                            : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                                            }`}
                                                    >
                                                        {status}
                                                    </span>
                                                ))}
                                                <button
                                                    onClick={() => handleOpenEditModal(event, index)}
                                                    className="py-1 hover:bg-gray-100 rounded"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_2005_14608)">
                                                            <path d="M17.2353 2.7653C16.7821 2.31277 16.1678 2.05859 15.5273 2.05859C14.8869 2.05859 14.2726 2.31277 13.8193 2.7653L2.97668 13.608C2.66618 13.9167 2.41998 14.284 2.25234 14.6885C2.0847 15.093 1.99893 15.5268 2.00001 15.9646V17.3333C2.00001 17.5101 2.07025 17.6797 2.19527 17.8047C2.3203 17.9297 2.48987 18 2.66668 18H4.03534C4.47319 18.0012 4.90692 17.9156 5.31145 17.748C5.71597 17.5805 6.08325 17.3344 6.39201 17.024L17.2353 6.18064C17.6877 5.72743 17.9417 5.11328 17.9417 4.47297C17.9417 3.83266 17.6877 3.21851 17.2353 2.7653ZM5.44934 16.0813C5.07335 16.4548 4.56532 16.6651 4.03534 16.6666H3.33334V15.9646C3.33267 15.7019 3.38411 15.4416 3.4847 15.1989C3.58529 14.9562 3.73302 14.7359 3.91934 14.5506L12.148 6.32197L13.6813 7.8553L5.44934 16.0813ZM16.292 5.23797L14.6213 6.9093L13.088 5.3793L14.7593 3.70797C14.86 3.60751 14.9795 3.52786 15.111 3.47358C15.2424 3.41929 15.3833 3.39143 15.5255 3.39158C15.6678 3.39174 15.8086 3.41991 15.9399 3.47448C16.0712 3.52905 16.1905 3.60896 16.291 3.70964C16.3915 3.81032 16.4711 3.9298 16.5254 4.06126C16.5797 4.19272 16.6076 4.33359 16.6074 4.47581C16.6072 4.61804 16.5791 4.75885 16.5245 4.89019C16.4699 5.02153 16.39 5.14084 16.2893 5.2413L16.292 5.23797Z" fill="#727A90" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2005_14608">
                                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </button>
                                                <button className="py-1 hover:bg-gray-100 rounded">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.0006 4.66666H13.934C13.615 3.11572 12.2507 2.002 10.6673 2H9.33395C7.75055 2.002 6.38623 3.11572 6.0673 4.66666H4.00064C3.63245 4.66666 3.33398 4.96513 3.33398 5.33331C3.33398 5.7015 3.63245 6 4.00064 6H4.6673V14.6667C4.66952 16.5067 6.16061 17.9978 8.00064 18H12.0006C13.8407 17.9978 15.3318 16.5067 15.334 14.6667V6H16.0006C16.3688 6 16.6673 5.70153 16.6673 5.33334C16.6673 4.96516 16.3688 4.66666 16.0006 4.66666ZM9.33398 13.3333C9.33398 13.7015 9.03552 14 8.66733 14C8.29911 14 8.00064 13.7015 8.00064 13.3333V9.33334C8.00064 8.96516 8.29911 8.66669 8.6673 8.66669C9.03548 8.66669 9.33395 8.96516 9.33395 9.33334V13.3333H9.33398ZM12.0006 13.3333C12.0006 13.7015 11.7022 14 11.334 14C10.9658 14 10.6673 13.7015 10.6673 13.3333V9.33334C10.6673 8.96516 10.9658 8.66669 11.334 8.66669C11.7022 8.66669 12.0006 8.96516 12.0006 9.33334V13.3333ZM7.44798 4.66666C7.73155 3.86819 8.48667 3.33434 9.33398 3.33331H10.6673C11.5146 3.33434 12.2698 3.86819 12.5533 4.66666H7.44798Z" fill="#E51B1B" />
                                                    </svg>
                                                </button>

                                                {/* Exclamation Button - shown when modal is opened via pencil */}
                                                {showExclamationButton === index && (
                                                    <button
                                                        onClick={() => handleExclamationClick(index)}
                                                        className="py-1 hover:bg-gray-100 rounded"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 12.5C9.86739 12.5 9.74022 12.4473 9.64645 12.3536C9.55268 12.2598 9.5 12.1326 9.5 12V4C9.5 3.86739 9.55268 3.74021 9.64645 3.64644C9.74022 3.55267 9.86739 3.5 10 3.5C10.1326 3.5 10.2598 3.55267 10.3536 3.64644C10.4473 3.74021 10.5 3.86739 10.5 4V12C10.5 12.1326 10.4473 12.2598 10.3536 12.3536C10.2598 12.4473 10.1326 12.5 10 12.5ZM10.661 19.8C11.741 19.366 15.3333 17.6595 15.3333 13.9415V11.356C15.334 10.8305 15.1686 10.3182 14.8611 9.89214C14.5535 9.46606 14.1193 9.1479 13.6203 8.98298L10.4908 7.94548C10.3887 7.911 10.278 7.911 10.1758 7.94548L7.04633 8.98298C6.54739 9.1479 6.11318 9.46606 5.8056 9.89214C5.49802 10.3182 5.33274 10.8305 5.33333 11.356V13.9415C5.33333 17.2225 8.83583 19.2295 9.90983 19.7665C10.0457 19.8313 10.1875 19.8827 10.3333 19.92C10.4689 19.8922 10.6016 19.8521 10.7298 19.8H10.661ZM13.3053 10.012C13.6046 10.1112 13.865 10.3022 14.0495 10.5578C14.234 10.8134 14.3333 11.1207 14.3333 11.436V13.9415C14.3333 17.0335 11.2898 18.4975 10.3568 18.8725C9.41283 18.4005 6.33333 16.6495 6.33333 13.9415V11.356C6.33329 11.0407 6.43259 10.7334 6.61713 10.4778C6.80167 10.2222 7.06206 10.0312 7.36133 9.932L10.3333 8.947L13.3053 10.012ZM10 16.5C9.90111 16.5 9.80444 16.5293 9.72222 16.5843C9.63999 16.6392 9.57591 16.7173 9.53806 16.8087C9.50022 16.9001 9.49032 17.0006 9.50961 17.0976C9.5289 17.1946 9.57652 17.2837 9.64645 17.3536C9.71637 17.4235 9.80547 17.4711 9.90246 17.4904C9.99945 17.5097 10.1 17.4998 10.1913 17.4619C10.2827 17.4241 10.3608 17.36 10.4157 17.2778C10.4707 17.1956 10.5 17.0989 10.5 17C10.5 16.8668 10.4473 16.7396 10.3536 16.6458C10.2598 16.5521 10.1326 16.5 10 16.5Z" fill="#D29B0A" />
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Issue Button - shown when exclamation is clicked */}
                                                {showIssueButton === index && (
                                                    <button className="flex items-center gap-1 px-3 py-1 bg-[#FDF7E7] text-[#D29B0A] text-sm font-semibold rounded-full border border-[#FCE8E8]">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_2249_46138)">
                                                                <path d="M6 7.50036C5.86739 7.50036 5.74022 7.44768 5.64645 7.35392C5.55268 7.26015 5.5 7.13297 5.5 7.00036V3.00036C5.5 2.86775 5.55268 2.74058 5.64645 2.64681C5.74022 2.55304 5.86739 2.50036 6 2.50036C6.13261 2.50036 6.25979 2.55304 6.35356 2.64681C6.44732 2.74058 6.5 2.86775 6.5 3.00036V7.00036C6.5 7.13297 6.44732 7.26015 6.35356 7.35392C6.25979 7.44768 6.13261 7.50036 6 7.50036ZM6.3965 11.8804C7.4765 11.4464 11 9.73986 11 6.02186V3.43636C11.0006 2.91087 10.8353 2.3986 10.5277 1.97252C10.2201 1.54644 9.78595 1.22828 9.287 1.06336L6.1575 0.0258631C6.05533 -0.00862103 5.94467 -0.00862103 5.8425 0.0258631L2.713 1.06336C2.21406 1.22828 1.77988 1.54644 1.4723 1.97252C1.16473 2.3986 0.999447 2.91087 1 3.43636V6.02186C1 9.30286 4.5025 11.3099 5.5765 11.8469C5.71234 11.9117 5.85418 11.9631 6 12.0004C6.13558 11.9726 6.26831 11.9325 6.3965 11.8804ZM8.972 2.01236C9.27127 2.11157 9.53166 2.30255 9.7162 2.55818C9.90074 2.81381 10 3.12108 10 3.43636V6.02186C10 9.11336 6.9565 10.5774 6.0235 10.9524C5.0795 10.4804 2 8.72986 2 6.02186V3.43636C1.99996 3.12108 2.09926 2.81381 2.2838 2.55818C2.46834 2.30255 2.72874 2.11157 3.028 2.01236L6 1.02736L8.972 2.01236ZM6 8.50036C5.90111 8.50036 5.80444 8.52969 5.72222 8.58463C5.63999 8.63957 5.57591 8.71766 5.53806 8.80902C5.50022 8.90038 5.49032 9.00092 5.50961 9.09791C5.5289 9.1949 5.57652 9.28399 5.64645 9.35392C5.71637 9.42384 5.80547 9.47146 5.90246 9.49076C5.99945 9.51005 6.09998 9.50015 6.19134 9.4623C6.28271 9.42446 6.3608 9.36037 6.41574 9.27815C6.47068 9.19592 6.5 9.09925 6.5 9.00036C6.5 8.86775 6.44732 8.74058 6.35356 8.64681C6.25979 8.55304 6.13261 8.50036 6 8.50036Z" fill="#D29B0A" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_2249_46138">
                                                                    <rect width="12" height="12" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        Mark As Issued
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4 pb-2">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Reason</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {event.reason}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Analysis' && (
                        <div><Pagination /></div>
                    )}

                    {activeTab === 'Trends' && (
                        <div className="space-y-6">
                            {/* Chart Card */}
                            <div className="lg:col-span-2 rounded-3xl bg-white ring-1 ring-gray-200/70 overflow-hidden">
                                {/* Header */}
                                <div className="flex items-start justify-between px-5 pt-5 pb-3">
                                    <div>
                                        <h3 className="text-xl leading-7 font-semibold text-gray-900">
                                            Top Waste Items
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">You can manage the top waste items here</p>
                                    </div>
                                    <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-2 text-xs text-[#727A90]">
                                        Show All
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="h-px bg-gray-200" />

                                {/* Chart area */}
                                <div className="relative h-[360px] bg-white pt-4">
                                    <RevenuePerformanceChart />
                                </div>
                            </div>

                            {/* Waste Patterns and Improvements Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Waste Patterns Card */}
                                <div className="relative overflow-hidden rounded-2xl border border-[#E9EAEA] bg-white p-6">
                                    {/* Yellow left border */}
                                    <span className="pointer-events-none absolute inset-y-0 left-0 w-[6px] rounded-full bg-yellow-500" />

                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Waste Patterns</h3>

                                    {/* Separator */}
                                    <div className="h-px bg-gray-200 mb-4" />

                                    <div className="space-y-3">
                                        <div className="bg-[#F8F8FC] rounded-lg p-3">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Peak Waste Days</h4>
                                            <p className="text-sm text-gray-500">Highly Waste Typically occurred on Mondays & Fridays</p>
                                        </div>
                                        <div className="bg-[#F8F8FC] rounded-lg p-3">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Seasonal trends</h4>
                                            <p className="text-sm text-gray-500">Vegetables waste increases during summer months</p>
                                        </div>
                                        <div className="bg-[#F8F8FC] rounded-lg p-3">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Time Patterns</h4>
                                            <p className="text-sm text-gray-500">Most Waste Patterns reported during evening cleanup</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Improvements Card */}
                                <div className="relative overflow-hidden rounded-2xl border border-[#E9EAEA] bg-white p-6">
                                    {/* Purple left border */}
                                    <span className="pointer-events-none absolute inset-y-0 left-0 w-[6px] rounded-full bg-purple-600" />

                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Improvements</h3>

                                    {/* Separator */}
                                    <div className="h-px bg-gray-200 mb-4" />

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Waste vs Revenue</span>
                                            <span className="text-sm font-semibold text-gray-900">2.1%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Monthly Trends</span>
                                            <span className="text-sm font-semibold text-red-500">-2.5%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Potential Saving</span>
                                            <span className="text-sm font-semibold text-gray-900">$2,100/Month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === 'Prevention' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Prevention Techniques Panel */}
                            <div className="relative overflow-hidden rounded-2xl border border-[#E9EAEA] bg-white p-6">
                                {/* Green left border */}
                                <span className="pointer-events-none absolute inset-y-0 left-0 w-[6px] rounded-full bg-[#34C759]" />
                                
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Prevention Techniques</h3>
                                
                                {/* Separator */}
                                <div className="h-px bg-gray-200 mb-4" />
                                
                                <div className="space-y-4">
                                    {preventionTechniques.map((technique, index) => (
                                        <div key={index} className="bg-gray-100 rounded-lg p-4">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">{technique.title}</h4>
                                            <p className="text-sm text-gray-500">{technique.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Predictions Panel */}
                            <div className="relative overflow-hidden rounded-2xl border border-[#E9EAEA] bg-white p-6">
                                {/* Orange/Yellow left border */}
                                <span className="pointer-events-none absolute inset-y-0 left-0 w-[6px] rounded-full bg-[#E7AA0B]" />
                                
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Predictions</h3>
                                
                                {/* Separator */}
                                <div className="h-px bg-gray-200 mb-4" />
                                
                                <div className="space-y-4">
                                    {upcomingPredictions.map((prediction, index) => (
                                        <div key={index} className="bg-gray-100 rounded-lg p-4">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">{prediction.title}</h4>
                                            <p className="text-sm text-gray-500">{prediction.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}












                </main>

            </div>

            {/* Waste Management Modal */}
            <WasteManagementModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitModal}
                mode={modalMode}
                editingEvent={editingEvent}
                showMarkAsIssued={!!(modalMode === 'edit' && editingEvent && !editingEvent.status.includes('Issued') && !issuedEvents.has(wasteEvents.findIndex(event => event === editingEvent) || -1))}
                onMarkAsIssued={handleModalMarkAsIssued}
            />
        </div>

    )
}

export default Page;