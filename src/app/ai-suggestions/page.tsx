'use client';

import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SideBarMenu from '../../components/Sidebar/SideBarMenu';
import MenuBar from '../../components/MenuBar/MenuBar';
import ChatInputBar from '../../components/ChatInputBar/chatInputBar';
import AiSuggestionSvg from '../../components/SVGIcons/AiSuggestionSvg/AiSuggestionSvg';
import Image from "next/image";
import AiSuggestionTab from '@/components/AiSuggestionTab/AiSuggestionTab';
interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
    isSuggestion?: boolean;
}

function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ai-assistant');
    const [messages, setMessages] = useState<Message[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(true);


    // auto-scroll to bottom
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const id = requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
        return () => cancelAnimationFrame(id);
    }, [messages, activeTab, showSuggestions]);

    const handleLogoClick = () => setMenuOpen((v) => !v);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };
    const suggestions = [
        'Order Items from Vendor',
        'Forecast Wastes',
        'Figure out Peak hours',
        'Enlist Top 5 Recipes',
        'How to order Items from the Vendors',
    ];

    const vendors = ['Engro Foods', 'Dairy Foods', 'Atlantic Foods', 'Jazzy Milk Products'];

    const generateAIResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (
            suggestions.some((suggestion) => {
                const words = suggestion.toLowerCase().split(' ');
                return words.some((w) => lowerMessage.includes(w));
            })
        ) {
            if (lowerMessage.includes('order') || lowerMessage.includes('vendor')) {
                return 'Select Vendor You want to order from?';
            } else if (lowerMessage.includes('forecast') || lowerMessage.includes('waste')) {
                return "I'll help you analyze waste patterns. What time period would you like me to forecast?";
            } else if (lowerMessage.includes('peak') || lowerMessage.includes('hour')) {
                return 'I can help identify peak hours. Which day of the week would you like me to analyze?';
            } else if (lowerMessage.includes('recipe') || lowerMessage.includes('top')) {
                return "I'll analyze your recipe performance. Would you like me to show recipes by popularity or profitability?";
            }
        }

        if (lowerMessage.includes('engro') || lowerMessage.includes('dairy')) {
            return 'Tell me about the Items you want to order and their quantity as well';
        }
        if (lowerMessage.includes('cooking oil') || lowerMessage.includes('eggs') || lowerMessage.includes('salt')) {
            return 'Here is your order for this vendor, confirm this order to send the request.';
        }

        return 'I understand you want to ' + userMessage + 'How can I help you with that?';
    };

    const handleSendMessage = (message: string) => {
        if (!message.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: message,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setShowSuggestions(false);

        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: aiResponse,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 500);
    };

    const handleSuggestionClick = (suggestion: string) => handleSendMessage(suggestion);

    return (
        <div
            className={
                activeTab === 'ai-assistant'
                    ? 'h-screen w-full flex flex-col overflow-hidden'
                    : 'h-screen w-full flex flex-col'
            }
        >
            {/* Top bar */}
            <NavBar onLogoClick={handleLogoClick} />

            {/* Row: sidebar + content */}
            <div
                className={
                    activeTab === 'ai-assistant'
                        ? 'flex flex-1 min-h-0 w-full overflow-hidden'
                        : 'flex flex-1 w-full'
                }
            >
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

                <main
                    className={
                        activeTab === 'ai-assistant'
                            ? 'flex-1 bg-white border-l border-gray-200 flex flex-col min-h-0 overflow-hidden'
                            : 'flex-1 overflow-auto  bg-white border-l border-gray-200'
                    }
                >
                    {/* Header + tabs (non-scrolling) */}
                    <div className="p-6 pb-4 shrink-0">
                        <div className="flex justify-between items-start mb-6">
                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">AI Automation</h1>
                                <p className="text-gray-500 mt-2 text-sm">Intelligent process optimization and recommendations</p>
                            </div>
                            <button className="bg-[#F1E7F8] text-[#6E0AB8] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Insights
                            </button>
                        </div>

                        <div className="flex space-x-8 border-b border-gray-200">
                            {[
                                { id: 'ai-assistant', label: 'AI Assistant' },
                                { id: 'recommendations', label: 'Recommendations' },
                                { id: 'smart-inventory', label: 'Smart Inventory' },
                                { id: 'automation-settings', label: 'Automation Settings' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}

                                    className={`pb-3 px-1 font-medium transition-colors ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <span className="text-xs">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>


                    {activeTab === 'ai-assistant' && (
                        <div className="flex flex-col flex-1 min-h-0">
                            {showSuggestions && messages.length === 0 ? (
                                // --- Suggestions screen ---
                                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                                    {/* Scrollable content: SVG + Heading + Suggestions */}
                                    <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-28 custom-scroll">
                                        <div className="max-w-xl mx-auto text-center">
                                            {/* SVG */}
                                            <div className="relative mx-auto w-60 h-60 grid items-center justify-start ">
                                                <AiSuggestionSvg className="block w-60 h-60 pointer-events-none select-none" />
                                            </div>

                                            {/* Heading & Subtext */}
                                            <h2 className=" text-xl font-semibold text-gray-800">
                                                How I can help you today!
                                            </h2>
                                            <p className="mt-1 text-gray-500 text-sm">
                                                Here are some suggestions, you may start with this
                                            </p>
                                        </div>

                                        {/* Suggestions */}
                                        <div className="max-w-xl mx-auto w-full mt-6 flex flex-col items-center justify-center">
                                            {/* First 4 as 2x2 grid */}
                                            <div className="flex flex-wrap  gap-y-3 gap-x-1 items-center justify-center max-w-md">
                                                {suggestions.slice(0, 4).map((suggestion, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="bg-gray-50 font-bold rounded-md px-2 py-2 inline-flex items-center gap-1 text-left hover:bg-gray-100 w-fit"
                                                    >
                                                        <span className="flex items-center justify-center w-8 h-8">
                                                            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect y="0.122559" width="32" height="32" rx="16" fill="#F4ECFA" />
                                                                <g clipPath="url(#clip0_2489_38825)">
                                                                    <path d="M22.4977 14.3632C22.3854 14.0057 22.1611 13.6939 21.8578 13.4738C21.5546 13.2537 21.1886 13.137 20.8139 13.1411H18.4152L17.6867 10.8703C17.5721 10.5129 17.347 10.2011 17.0438 9.97984C16.7405 9.75861 16.3749 9.6394 15.9995 9.6394C15.6242 9.6394 15.2585 9.75861 14.9553 9.97984C14.6521 10.2011 14.427 10.5129 14.3124 10.8703L13.5838 13.1411H11.1852C10.8117 13.1416 10.448 13.2601 10.1459 13.4798C9.8438 13.6994 9.61885 14.0088 9.50316 14.3639C9.38747 14.719 9.38696 15.1016 9.5017 15.457C9.61643 15.8125 9.84055 16.1225 10.142 16.3429L12.0944 17.7704L11.3521 20.0691C11.2321 20.4257 11.2306 20.8114 11.3477 21.1689C11.4649 21.5263 11.6944 21.8364 12.0021 22.0527C12.3045 22.2761 12.671 22.3957 13.047 22.3938C13.4229 22.392 13.7882 22.2687 14.0884 22.0423L15.9995 20.6357L17.9112 22.0407C18.2131 22.2627 18.5776 22.3833 18.9524 22.3852C19.3271 22.387 19.6928 22.2699 19.9968 22.0508C20.3008 21.8317 20.5276 21.5219 20.6444 21.1658C20.7612 20.8097 20.7621 20.4258 20.647 20.0691L19.9047 17.7704L21.8592 16.3429C22.1642 16.1253 22.3909 15.8152 22.5059 15.4587C22.6209 15.1021 22.618 14.718 22.4977 14.3632ZM21.2114 15.4563L18.9362 17.1193C18.8428 17.1874 18.7733 17.2834 18.7376 17.3934C18.7019 17.5034 18.7019 17.6219 18.7375 17.732L19.6022 20.4057C19.646 20.5413 19.6456 20.6873 19.6011 20.8227C19.5567 20.9581 19.4704 21.0759 19.3548 21.1591C19.2392 21.2424 19.1002 21.2869 18.9577 21.2862C18.8152 21.2855 18.6766 21.2396 18.5618 21.1551L16.3246 19.508C16.2303 19.4388 16.1165 19.4015 15.9995 19.4015C15.8826 19.4015 15.7687 19.4388 15.6745 19.508L13.4373 21.1551C13.3226 21.2407 13.1836 21.2875 13.0405 21.2888C12.8973 21.2901 12.7575 21.2458 12.6413 21.1623C12.5251 21.0788 12.4385 20.9605 12.394 20.8244C12.3496 20.6884 12.3496 20.5417 12.3941 20.4057L13.2616 17.732C13.2972 17.6219 13.2972 17.5034 13.2615 17.3934C13.2258 17.2834 13.1563 17.1874 13.0628 17.1193L10.7877 15.4563C10.6731 15.3724 10.588 15.2544 10.5444 15.1193C10.5009 14.9841 10.5012 14.8386 10.5453 14.7036C10.5894 14.5686 10.675 14.451 10.7899 14.3676C10.9048 14.2842 11.0432 14.2392 11.1852 14.2391H13.9852C14.1014 14.2391 14.2147 14.2022 14.3086 14.1337C14.4025 14.0653 14.4723 13.9687 14.5078 13.8581L15.3588 11.2058C15.4025 11.07 15.4881 10.9517 15.6034 10.8677C15.7186 10.7837 15.8575 10.7385 16.0001 10.7385C16.1427 10.7385 16.2816 10.7837 16.3968 10.8677C16.512 10.9517 16.5977 11.07 16.6413 11.2058L17.4923 13.8581C17.5279 13.9687 17.5977 14.0653 17.6916 14.1337C17.7855 14.2022 17.8987 14.2391 18.015 14.2391H20.815C20.957 14.2392 21.0953 14.2842 21.2103 14.3676C21.3252 14.451 21.4108 14.5686 21.4549 14.7036C21.499 14.8386 21.4993 14.9841 21.4557 15.1193C21.4122 15.2544 21.3271 15.3724 21.2125 15.4563H21.2114Z" fill="#6E0AB8" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_2489_38825">
                                                                        <rect width="13.1765" height="13.1765" fill="white" transform="translate(9.41211 9.5343)" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </span>
                                                        <span className="text-gray-900 text-xs font-bold">{suggestion}</span>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Last one centered below */}
                                            <div className=" flex justify-center mt-3">
                                                <button
                                                    onClick={() =>
                                                        handleSuggestionClick(suggestions[suggestions.length - 1])
                                                    }
                                                    className="bg-gray-50  rounded-md  px-2 py-2 font-bold inline-flex items-center gap-2 text-left hover:bg-gray-100 w-fit"
                                                >
                                                    <span className="flex items-center justify-center w-8 h-8">
                                                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect y="0.122559" width="32" height="32" rx="16" fill="#F4ECFA" />
                                                            <g clipPath="url(#clip0_2489_38825)">
                                                                <path d="M22.4977 14.3632C22.3854 14.0057 22.1611 13.6939 21.8578 13.4738C21.5546 13.2537 21.1886 13.137 20.8139 13.1411H18.4152L17.6867 10.8703C17.5721 10.5129 17.347 10.2011 17.0438 9.97984C16.7405 9.75861 16.3749 9.6394 15.9995 9.6394C15.6242 9.6394 15.2585 9.75861 14.9553 9.97984C14.6521 10.2011 14.427 10.5129 14.3124 10.8703L13.5838 13.1411H11.1852C10.8117 13.1416 10.448 13.2601 10.1459 13.4798C9.8438 13.6994 9.61885 14.0088 9.50316 14.3639C9.38747 14.719 9.38696 15.1016 9.5017 15.457C9.61643 15.8125 9.84055 16.1225 10.142 16.3429L12.0944 17.7704L11.3521 20.0691C11.2321 20.4257 11.2306 20.8114 11.3477 21.1689C11.4649 21.5263 11.6944 21.8364 12.0021 22.0527C12.3045 22.2761 12.671 22.3957 13.047 22.3938C13.4229 22.392 13.7882 22.2687 14.0884 22.0423L15.9995 20.6357L17.9112 22.0407C18.2131 22.2627 18.5776 22.3833 18.9524 22.3852C19.3271 22.387 19.6928 22.2699 19.9968 22.0508C20.3008 21.8317 20.5276 21.5219 20.6444 21.1658C20.7612 20.8097 20.7621 20.4258 20.647 20.0691L19.9047 17.7704L21.8592 16.3429C22.1642 16.1253 22.3909 15.8152 22.5059 15.4587C22.6209 15.1021 22.618 14.718 22.4977 14.3632ZM21.2114 15.4563L18.9362 17.1193C18.8428 17.1874 18.7733 17.2834 18.7376 17.3934C18.7019 17.5034 18.7019 17.6219 18.7375 17.732L19.6022 20.4057C19.646 20.5413 19.6456 20.6873 19.6011 20.8227C19.5567 20.9581 19.4704 21.0759 19.3548 21.1591C19.2392 21.2424 19.1002 21.2869 18.9577 21.2862C18.8152 21.2855 18.6766 21.2396 18.5618 21.1551L16.3246 19.508C16.2303 19.4388 16.1165 19.4015 15.9995 19.4015C15.8826 19.4015 15.7687 19.4388 15.6745 19.508L13.4373 21.1551C13.3226 21.2407 13.1836 21.2875 13.0405 21.2888C12.8973 21.2901 12.7575 21.2458 12.6413 21.1623C12.5251 21.0788 12.4385 20.9605 12.394 20.8244C12.3496 20.6884 12.3496 20.5417 12.3941 20.4057L13.2616 17.732C13.2972 17.6219 13.2972 17.5034 13.2615 17.3934C13.2258 17.2834 13.1563 17.1874 13.0628 17.1193L10.7877 15.4563C10.6731 15.3724 10.588 15.2544 10.5444 15.1193C10.5009 14.9841 10.5012 14.8386 10.5453 14.7036C10.5894 14.5686 10.675 14.451 10.7899 14.3676C10.9048 14.2842 11.0432 14.2392 11.1852 14.2391H13.9852C14.1014 14.2391 14.2147 14.2022 14.3086 14.1337C14.4025 14.0653 14.4723 13.9687 14.5078 13.8581L15.3588 11.2058C15.4025 11.07 15.4881 10.9517 15.6034 10.8677C15.7186 10.7837 15.8575 10.7385 16.0001 10.7385C16.1427 10.7385 16.2816 10.7837 16.3968 10.8677C16.512 10.9517 16.5977 11.07 16.6413 11.2058L17.4923 13.8581C17.5279 13.9687 17.5977 14.0653 17.6916 14.1337C17.7855 14.2022 17.8987 14.2391 18.015 14.2391H20.815C20.957 14.2392 21.0953 14.2842 21.2103 14.3676C21.3252 14.451 21.4108 14.5686 21.4549 14.7036C21.499 14.8386 21.4993 14.9841 21.4557 15.1193C21.4122 15.2544 21.3271 15.3724 21.2125 15.4563H21.2114Z" fill="#6E0AB8" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_2489_38825">
                                                                    <rect width="13.1765" height="13.1765" fill="white" transform="translate(9.41211 9.5343)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                    </span>
                                                    <span className="text-gray-900 text-xs font-bold">
                                                        {suggestions[suggestions.length - 1]}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ) : (
                                // Messages list (scrollable)
                                <div className="flex-1 min-h-0 overflow-y-auto px-10 py-4 space-y-4 custom-scroll">
                                    {messages.map((message) => (
                                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`px-4 py-2 rounded-lg overflow-hidden
                    ${message.type === 'user'
                                                        ? 'bg-[#F8F8FC] text-gray-800 w-full'
                                                        : 'bg-[#F4ECFA] text-gray-800 border border-[#6E0AB8] w-full'}`}
                                            >
                                                <div className={`flex items-center justify-between mb-1 ${message.type === 'user' ? 'justify-between' : 'justify-between'}`}>
                                                    {message.type === 'user' ? (
                                                        <>
                                                            <span className="text-xs text-gray-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12Z" fill="#727A90" />
                                                            </svg>
                                                            </span>
                                                            <span className="text-xs font-bold text-black">You</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-center gap-3">
                                                                {/* Avatar circle with your AI SVG */}
                                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70  overflow-hidden">
                                                                    <Image
                                                                        src="/icons/ai-assistant.png"          // e.g. "/images/ai-avatar.png"
                                                                        alt="AI Assistant"
                                                                        width={32}
                                                                        height={32}
                                                                        className="w-8 h-8 object-cover"
                                                                        priority={false}
                                                                    />
                                                                </span>

                                                                <span className="text-[15px] font-semibold text-gray-900">AI Assistant</span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                aria-label="More options"
                                                                className="p-1 rounded hover:bg-white/60 text-gray-500 hover:text-gray-700"
                                                            >
                                                                {/* use your 3-dots svg here, or swap for 2-dots */}
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                                    <path d="M17 12C17 10.895 17.895 10 19 10s2 .895 2 2-.895 2-2 2-2-.895-2-2ZM10 12c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2ZM3 12c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2Z" fill="currentColor" />
                                                                </svg>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                                {message.type === 'ai' && message.content === "Select Vendor You want to order from?" ? (
                                                    // styled line inside the bubble
                                                    <p className="mb-3 text-sm sm:text-[15px] leading-6">
                                                        <span className=" text-gray-600">Select Vendor</span>
                                                        <span className="ml-1 text-gray-600">you want to order from?</span>
                                                    </p>
                                                ) : (
                                                    !(message.type === 'user' && (suggestions.includes(message.content) || vendors.includes(message.content))) && (
                                                        <div
                                                            className={`text-sm [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&>*]:mb-1 [&>*:last-child]:mb-0 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_s]:line-through [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_a]:text-blue-600 [&_a]:underline [overflow-wrap:anywhere] [word-break:break-word] [&_a]:break-all [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:whitespace-pre-wrap [&_code]:break-words [&_p]:text-left [&_div]:text-left [&_h1]:text-left [&_h2]:text-left [&_h3]:text-left [&_p[style*='text-align:left']]:text-left [&_div[style*='text-align:left']]:text-left [&_h1[style*='text-align:left']]:text-left [&_h2[style*='text-align:left']]:text-left [&_h3[style*='text-align:left']]:text-left [&_p[style*='text-align:center']]:text-center [&_div[style*='text-align:center']]:text-center [&_h1[style*='text-align:center']]:text-center [&_h2[style*='text-align:center']]:text-center [&_h3[style*='text-align:center']]:text-center [&_p[style*='text-align:right']]:text-right [&_div[style*='text-align:right']]:text-right [&_h1[style*='text-align:right']]:text-right [&_h2[style*='text-align:right']]:text-right [&_h3[style*='text-align:right']]:text-right ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                                                            dangerouslySetInnerHTML={{ __html: message.content }}
                                                        />
                                                    )
                                                )}

                                                {/* Suggestion card for user messages */}
                                                {message.type === 'user' && (suggestions.includes(message.content) || vendors.includes(message.content)) && (
                                                    <div className="mt-2 flex justify-end">
                                                        <div className="bg-purple-100 rounded-md px-3 py-2 inline-flex items-center gap-2 text-left w-fit">
                                                            <span className="flex items-center justify-center w-6 h-6">
                                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="32" height="32" rx="16" fill="white" />
                                                                    <g clipPath="url(#clip0_2489_38871)">
                                                                        <path d="M22.4977 14.2406C22.3854 13.8832 22.1611 13.5713 21.8578 13.3512C21.5546 13.1311 21.1886 13.0145 20.8139 13.0185H18.4152L17.6867 10.7478C17.5721 10.3903 17.347 10.0785 17.0438 9.85728C16.7405 9.63605 16.3749 9.51685 15.9995 9.51685C15.6242 9.51685 15.2585 9.63605 14.9553 9.85728C14.6521 10.0785 14.427 10.3903 14.3124 10.7478L13.5838 13.0185H11.1852C10.8117 13.019 10.448 13.1376 10.1459 13.3572C9.8438 13.5768 9.61885 13.8863 9.50316 14.2414C9.38747 14.5965 9.38696 14.9791 9.5017 15.3345C9.61643 15.6899 9.84055 16 10.142 16.2204L12.0944 17.6478L11.3521 19.9466C11.2321 20.3031 11.2306 20.6889 11.3477 21.0463C11.4649 21.4038 11.6944 21.7138 12.0021 21.9302C12.3045 22.1535 12.671 22.2732 13.047 22.2713C13.4229 22.2694 13.7882 22.1461 14.0884 21.9198L15.9995 20.5132L17.9112 21.9181C18.2131 22.1402 18.5776 22.2608 18.9524 22.2626C19.3271 22.2644 19.6928 22.1474 19.9968 21.9283C20.3008 21.7092 20.5276 21.3993 20.6444 21.0432C20.7612 20.6872 20.7621 20.3032 20.647 19.9466L19.9047 17.6478L21.8592 16.2204C22.1642 16.0027 22.3909 15.6927 22.5059 15.3361C22.6209 14.9795 22.618 14.5954 22.4977 14.2406ZM21.2114 15.3337L18.9362 16.9967C18.8428 17.0649 18.7733 17.1608 18.7376 17.2708C18.7019 17.3809 18.7019 17.4994 18.7375 17.6094L19.6022 20.2831C19.646 20.4187 19.6456 20.5647 19.6011 20.7001C19.5567 20.8355 19.4704 20.9533 19.3548 21.0366C19.2392 21.1199 19.1002 21.1644 18.9577 21.1636C18.8152 21.1629 18.6766 21.117 18.5618 21.0325L16.3246 19.3855C16.2303 19.3163 16.1165 19.2789 15.9995 19.2789C15.8826 19.2789 15.7687 19.3163 15.6745 19.3855L13.4373 21.0325C13.3226 21.1181 13.1836 21.165 13.0405 21.1663C12.8973 21.1676 12.7575 21.1233 12.6413 21.0398C12.5251 20.9563 12.4385 20.8379 12.394 20.7019C12.3496 20.5658 12.3496 20.4192 12.3941 20.4057L13.2616 17.6094C13.2972 17.4994 13.2972 17.3809 13.2615 17.2708C13.2258 17.1608 13.1563 17.0649 13.0628 16.9967L10.7877 15.3337C10.6731 15.2498 10.588 15.1319 10.5444 14.9967C10.5009 14.8615 10.5012 14.7161 10.5453 14.5811C10.5894 14.4461 10.675 14.3285 10.7899 14.245C10.9048 14.1616 11.0432 14.1166 11.1852 14.1165H13.9852C14.1014 14.1165 14.2147 14.0796 14.3086 14.0112C14.4025 13.9427 14.4723 13.8462 14.5078 13.7355L15.3588 11.0832C15.4025 10.9475 15.4881 10.8291 15.6034 10.7451C15.7186 10.6612 15.8575 10.6159 16.0001 10.6159C16.1427 10.6159 16.2816 10.6612 16.3968 10.7451C16.512 10.8291 16.5977 10.9475 16.6413 11.0832L17.4923 13.7355C17.5279 13.8462 17.5977 13.9427 17.6916 14.0112C17.7855 14.0796 17.8987 14.1165 18.015 14.1165H20.815C20.957 14.1166 21.0953 14.1616 21.2103 14.245C21.3252 14.3285 21.4108 14.4461 21.4549 14.5811C21.499 14.7161 21.4993 14.8615 21.4557 14.9967C21.4122 15.1319 21.3271 15.2498 21.2125 15.3337H21.2114Z" fill="#6E0AB8" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2489_38871">
                                                                            <rect width="13.1765" height="13.1765" fill="white" transform="translate(9.41211 9.41174)" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                            </span>
                                                            <span className="text-gray-900 text-xs font-bold">{message.content}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Vendor list */}
                                                {message.type === 'ai' && message.content === 'Select Vendor You want to order from?' && (
                                                    <div className="mt-2">


                                                        <div className="mt-3 w-full flex flex-wrap gap-3">
                                                            {vendors.map((vendor) => (
                                                                <button
                                                                    key={vendor}
                                                                    onClick={() => handleSendMessage(vendor)}
                                                                    className="
            inline-flex items-center gap-2
            rounded-xl border border-gray-200 bg-white
            px-3 py-2 text-[13px] font-semibold text-gray-900
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]
            hover:border-gray-300 hover:bg-gray-50 transition-colors
          "
                                                                >
                                                                    <span className="truncate">{vendor}</span>

                                                                    {/* tiny rounded '+' */}
                                                                    <span

                                                                    >
                                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11.3333 8.23934H8.66667V5.57267C8.66667 5.39586 8.59643 5.22629 8.4714 5.10127C8.34638 4.97624 8.17681 4.90601 8 4.90601C7.82319 4.90601 7.65362 4.97624 7.5286 5.10127C7.40357 5.22629 7.33333 5.39586 7.33333 5.57267V8.23934H4.66667C4.48986 8.23934 4.32029 8.30958 4.19526 8.4346C4.07024 8.55963 4 8.72919 4 8.90601C4 9.08282 4.07024 9.25239 4.19526 9.37741C4.32029 9.50243 4.48986 9.57267 4.66667 9.57267H7.33333V12.2393C7.33333 12.4162 7.40357 12.5857 7.5286 12.7107C7.65362 12.8358 7.82319 12.906 8 12.906C8.17681 12.906 8.34638 12.8358 8.4714 12.7107C8.59643 12.5857 8.66667 12.4162 8.66667 12.2393V9.57267H11.3333C11.5101 9.57267 11.6797 9.50243 11.8047 9.37741C11.9298 9.25239 12 9.08282 12 8.90601C12 8.72919 11.9298 8.55963 11.8047 8.4346C11.6797 8.30958 11.5101 8.23934 11.3333 8.23934Z" fill="#374957" />
                                                                        </svg>
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Order card */}
                                                {message.type === 'ai' &&
                                                    message.content === 'Here is your order for this vendor, confirm this order to send the request.' && (
                                                        <div className="mt-3 bg-white border border-[#E5E7EB] rounded-xl p-4 md:w-md lg:w-lg">
                                                            {/* Order Number */}
                                                            <div className="mb-3">
                                                                <h4 className="font-semibold text-gray-800">Order #4788</h4>
                                                            </div>

                                                            {/* Vendor and Date Chips */}
                                                            <div className="flex gap-2 mb-3">
                                                                <div className="bg-[#F8F8FC] border border-[#E5E7EB] rounded-sm px-1 h-[22px] flex items-center">
                                                                    <span className="text-xs font-bold text-gray-900">Vendor : US Foods</span>
                                                                </div>
                                                                <div className="bg-[#F8F8FC] border border-[#E5E7EB] rounded-sm px-1 h-[22px] flex items-center">
                                                                    <span className="text-xs font-bold text-gray-900">Dated :12/06/25</span>
                                                                </div>
                                                            </div>

                                                            {/* Separation Bar */}
                                                            <div className="border-t border-gray-200 mb-3"></div>

                                                            {/* Items Section */}
                                                            <div className="bg-[#F8F8FC] border border-[#E5E7EB] rounded-md py-2 px-2 mb-3">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xs text-gray-700">Items</span>
                                                                    <div className="bg-[#F8F8FC] border border-[#E5E7EB] rounded-md px-1 flex items-center py-1 ">
                                                                        <span className="text-xs text-gray-700">25</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Order Details */}
                                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                                <div>
                                                                    <div className="text-xs text-gray-500 mb-1">Expected</div>
                                                                    <div className="text-xs font-medium text-[#515766]">01/02/2025</div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs text-gray-500 mb-1">Total</div>
                                                                    <div className="text-sm font-medium text-[#24282E]">$590.00</div>
                                                                </div>
                                                            </div>

                                                            <button className="w-fit bg-primary cursor-pointer text-white py-2 px-3 rounded-lg font-medium text-xs transition-colors">
                                                                Confirm Order
                                                            </button>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                                    {/* scroll target */}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Input (sticky at bottom) */}
                    {activeTab === 'ai-assistant' && (
                        <div className="sticky bottom-0 bg-white flex-shrink-0 mb-4">
                            <ChatInputBar onSendMessage={handleSendMessage} />
                        </div>
                    )}

                    {activeTab === 'recommendations' && (
                        // <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                        //     {/* Scrollable content */}
                        //     <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll">
                        //         {/* Summary Cards */}
                        //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        //             {/* Potential Savings */}
                        //             <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        //                 <div className="flex items-center gap-3">
                        //                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        //                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        //                         </svg>
                        //                     </div>
                        //                     <div>
                        //                         <p className="text-sm text-gray-600">Potential Savings</p>
                        //                         <p className="text-xl font-bold text-gray-900">$0</p>
                        //                     </div>
                        //                 </div>
                        //             </div>

                        //             {/* High Priority */}
                        //             <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        //                 <div className="flex items-center gap-3">
                        //                     <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        //                         <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        //                         </svg>
                        //                     </div>
                        //                     <div>
                        //                         <p className="text-sm text-gray-600">High Priority</p>
                        //                         <p className="text-xl font-bold text-gray-900">0</p>
                        //                     </div>
                        //                 </div>
                        //             </div>

                        //             {/* Recommendations */}
                        //             <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        //                 <div className="flex items-center gap-3">
                        //                     <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        //                         <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        //                         </svg>
                        //                     </div>
                        //                     <div>
                        //                         <p className="text-sm text-gray-600">Recommendations</p>
                        //                         <p className="text-xl font-bold text-gray-900">05</p>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </div>

                        //         {/* Recommendation Cards */}
                        //         <div className="space-y-4">
                        //             {[
                        //                 {
                        //                     title: "Increase Your Prices Upto 10%",
                        //                     description: "You have to increase your pricing to get more profit",
                        //                     icon: (
                        //                         <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        //                         </svg>
                        //                     )
                        //                 },
                        //                 {
                        //                     title: "Launch a New Marketing Campaign",
                        //                     description: "Expand your reach with targeted marketing strategies",
                        //                     icon: (
                        //                         <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        //                         </svg>
                        //                     )
                        //                 },
                        //                 {
                        //                     title: "Expand Product Line",
                        //                     description: "Diversify your offerings to capture more market share",
                        //                     icon: (
                        //                         <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        //                         </svg>
                        //                     )
                        //                 },
                        //                 {
                        //                     title: "Enhance Customer Support",
                        //                     description: "Improve customer satisfaction with better support systems",
                        //                     icon: (
                        //                         <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                        //                         </svg>
                        //                     )
                        //                 },
                        //                 {
                        //                     title: "Optimize Website Performance",
                        //                     description: "Speed up your website for better user experience",
                        //                     icon: (
                        //                         <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        //                         </svg>
                        //                     )
                        //                 }
                        //             ].map((recommendation, index) => (
                        //                 <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        //                     <div className="flex items-start gap-4">
                        //                         {/* Icon */}
                        //                         <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        //                             {recommendation.icon}
                        //                         </div>

                        //                         {/* Content */}
                        //                         <div className="flex-1 min-w-0">
                        //                             <h3 className="font-semibold text-gray-900 mb-1">{recommendation.title}</h3>
                        //                             <p className="text-sm text-gray-600">{recommendation.description}</p>
                        //                         </div>

                        //                         {/* Review Needed Button */}
                        //                         <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex-shrink-0">
                        //                             Review Needed
                        //                         </button>
                        //                     </div>
                        //                 </div>
                        //             ))}
                        //         </div>
                        //     </div>

                        //     {/* Pagination - Fixed at bottom */}
                        //     <div className="border-t border-gray-200 bg-white px-6 py-4 flex-shrink-0">
                        //         <div className="flex items-center justify-between">
                        //             {/* Left side - Showing info */}
                        //             <div className="text-sm text-gray-600">
                        //                 Showing 1-10 from 100
                        //             </div>

                        //             {/* Right side - Pagination controls */}
                        //             <div className="flex items-center gap-2">
                        //                 {/* Previous button */}
                        //                 <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                        //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        //                     </svg>
                        //                 </button>

                        //                 {/* Page numbers */}
                        //                 <div className="flex items-center gap-1">
                        //                     <button className="w-8 h-8 bg-purple-600 text-white rounded text-sm font-medium">1</button>
                        //                     <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">2</button>
                        //                     <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">3</button>
                        //                     <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">4</button>
                        //                     <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">5</button>
                        //                     <span className="text-gray-400">...</span>
                        //                 </div>

                        //                 {/* Next button */}
                        //                 <button className="p-2 text-gray-400 hover:text-gray-600">
                        //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        //                     </svg>
                        //                 </button>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                        <AiSuggestionTab activeTab={activeTab}/>
                    )}
                      {activeTab === 'smart-inventory' && (
                        <AiSuggestionTab activeTab={activeTab}/>
                      )}
                      {activeTab === 'automation-settings' && (
                        <AiSuggestionTab activeTab={activeTab}/>
                      )}
                </main>


            </div>
        </div>
    );
}

export default Page;
