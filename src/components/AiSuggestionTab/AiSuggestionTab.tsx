import React, { useState } from 'react'
import SuggestionsCard from '../SuggestionCards/SuggestionCards'

function AiSuggestionTab({ activeTab }: { activeTab: string }) {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5; // Show 5 recommendation cards per page
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [automationToggles, setAutomationToggles] = useState<{ [key: number]: boolean }>({});

    // Mock data for pagination (you can replace this with real data)
    const recommendationData = [
        {
            title: "Increase Your Prices Upto 10%",
            description: "You have to increase your pricing to get more profit",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Launch a New Marketing Campaign",
            description: "Invest in targeted advertising to boost customer acquisition",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            )
        },
        {
            title: "Expand Product Line",
            description: "Consider adding new items to cater to broader customer preferences",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            title: "Enhance Customer Support",
            description: "Improve response times and support channels for better user experience",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
            )
        },
        {
            title: "Optimize Website Performance",
            description: "Increase load speed and mobile responsiveness to improve user engagement",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "Implement Customer Loyalty Program",
            description: "Create a rewards system to increase customer retention and repeat purchases",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        },
        {
            title: "Streamline Order Processing",
            description: "Automate order workflows to reduce processing time and improve efficiency",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
        {
            title: "Improve Inventory Management",
            description: "Implement better tracking systems to reduce waste and optimize stock levels",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        }
    ];

    // Calculate pagination values
    const totalPages = Math.ceil(recommendationData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = recommendationData.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <SuggestionsCard
                        title="Potential Savings"
                        value="250"
                        color="green"
                        icon={
                            <svg width="60" height="60" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="44" height="44" rx="22" fill="#E6F4F5" />
                                <path d="M20.068 30C19.2546 29.9992 18.4747 29.6757 17.8995 29.1005C17.3243 28.5253 17.0008 27.7454 17 26.932C17 26.6668 16.8946 26.4124 16.7071 26.2249C16.5196 26.0374 16.2652 25.932 16 25.932C15.7348 25.932 15.4804 26.0374 15.2929 26.2249C15.1054 26.4124 15 26.6668 15 26.932V27C15 27.019 15 27.036 15 27.055C15.0334 28.3773 15.5819 29.6342 16.5286 30.5579C17.4753 31.4817 18.7453 31.9991 20.068 32H21V33C21 33.2652 21.1054 33.5196 21.2929 33.7071C21.4804 33.8946 21.7348 34 22 34C22.2652 34 22.5196 33.8946 22.7071 33.7071C22.8946 33.5196 23 33.2652 23 33V32H23.932C25.1347 31.9987 26.2977 31.5698 27.2132 30.7898C28.1287 30.0099 28.737 28.9298 28.9293 27.7426C29.1217 26.5554 28.8856 25.3385 28.2632 24.3093C27.6408 23.2802 26.6727 22.506 25.532 22.125L23 21.28V14H23.932C24.7454 14.0008 25.5253 14.3243 26.1005 14.8995C26.6757 15.4747 26.9992 16.2546 27 17.068C27 17.3332 27.1054 17.5876 27.2929 17.7751C27.4804 17.9626 27.7348 18.068 28 18.068C28.2652 18.068 28.5196 17.9626 28.7071 17.7751C28.8946 17.5876 29 17.3332 29 17.068V17C29 16.981 29 16.964 29 16.945C28.9666 15.6227 28.4181 14.3658 27.4714 13.4421C26.5247 12.5183 25.2547 12.0009 23.932 12H23V11C23 10.7348 22.8946 10.4804 22.7071 10.2929C22.5196 10.1054 22.2652 10 22 10C21.7348 10 21.4804 10.1054 21.2929 10.2929C21.1054 10.4804 21 10.7348 21 11V12H20.068C18.8653 12.0013 17.7023 12.4302 16.7868 13.2102C15.8713 13.9901 15.263 15.0702 15.0707 16.2574C14.8783 17.4446 15.1144 18.6615 15.7368 19.6907C16.3592 20.7198 17.3273 21.494 18.468 21.875L21 22.72V30H20.068ZM23 23.387L24.9 24.021C25.5913 24.2511 26.1781 24.7196 26.5555 25.3428C26.9328 25.966 27.0761 26.7031 26.9597 27.4223C26.8433 28.1415 26.4747 28.7958 25.92 29.2681C25.3652 29.7403 24.6605 29.9998 23.932 30H23V23.387ZM19.1 19.979C18.4087 19.7489 17.8219 19.2804 17.4445 18.6572C17.0672 18.034 16.9239 17.2969 17.0403 16.5777C17.1567 15.8585 17.5253 15.2042 18.08 14.7319C18.6348 14.2597 19.3395 14.0002 20.068 14H21V20.613L19.1 19.979Z" fill="#34C759" />
                            </svg>
                        }
                    />
                    <SuggestionsCard
                        title="Inventory SKU's"
                        value="15000"
                        color="yellow"
                        icon={<svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.333008" width="44" height="44" rx="22" fill="#FDF7E7" />
                            <g clipPath="url(#clip0_2160_27613)">
                                <path d="M34.3326 21.5C34.332 20.8103 34.1278 20.1362 33.7454 19.5623C33.3631 18.9884 32.8197 18.5402 32.1836 18.274C31.7776 15.9563 30.5673 13.8561 28.7657 12.3426C26.9641 10.8292 24.6865 9.99951 22.3336 9.99951C19.9806 9.99951 17.703 10.8292 15.9014 12.3426C14.0998 13.8561 12.8896 15.9563 12.4836 18.274C11.7576 18.5794 11.1558 19.1208 10.7756 19.8106C10.3954 20.5004 10.259 21.2982 10.3884 22.0752C10.5178 22.8521 10.9055 23.5626 11.4887 24.0919C12.072 24.6213 12.8168 24.9384 13.6026 24.992C14.1191 26.088 14.8195 27.0875 15.6736 27.947C14.4222 29.3134 13.628 31.036 13.4016 32.875C13.3852 33.0053 13.3946 33.1376 13.4294 33.2643C13.4641 33.391 13.5235 33.5096 13.6041 33.6133C13.6847 33.717 13.785 33.8039 13.8992 33.8688C14.0134 33.9338 14.1392 33.9757 14.2696 33.992C14.3107 33.997 14.3521 33.9997 14.3936 34C14.6369 33.9997 14.8718 33.9107 15.0543 33.7496C15.2367 33.5885 15.3541 33.3664 15.3846 33.125C15.5659 31.6751 16.2012 30.3198 17.1996 29.253C18.6887 30.3522 20.4821 30.9625 22.3326 31C24.1776 30.9622 25.9657 30.3544 27.4516 29.26C28.4456 30.325 29.0783 31.6765 29.2596 33.122C29.2898 33.3636 29.4071 33.5859 29.5896 33.7472C29.772 33.9085 30.007 33.9977 30.2506 33.998C30.2924 33.9978 30.3341 33.9951 30.3756 33.99C30.6386 33.957 30.8778 33.8209 31.0406 33.6117C31.2034 33.4024 31.2764 33.1371 31.2436 32.874C31.0188 31.0397 30.2286 29.3208 28.9826 27.956C29.8413 27.0939 30.5456 26.0906 31.0646 24.99C31.9503 24.9311 32.7806 24.5379 33.3874 23.89C33.9941 23.242 34.332 22.3877 34.3326 21.5ZM30.5806 22.973C30.3473 22.9302 30.1065 22.9724 29.9016 23.0918C29.6967 23.2112 29.5414 23.4 29.4636 23.624C28.5476 26.222 25.4626 29 22.3326 29C19.2026 29 16.1176 26.22 15.2016 23.622C15.1236 23.3981 14.9682 23.2094 14.7634 23.0901C14.5585 22.9707 14.3178 22.9284 14.0846 22.971C14.0015 22.9873 13.9172 22.997 13.8326 23C13.4614 22.9955 13.105 22.8536 12.8323 22.6016C12.5597 22.3496 12.3902 22.0055 12.3566 21.6358C12.3231 21.2661 12.4278 20.897 12.6505 20.6C12.8733 20.3031 13.1982 20.0992 13.5626 20.028C13.7752 19.9894 13.9696 19.8831 14.1167 19.7248C14.2638 19.5665 14.3557 19.3648 14.3786 19.15C14.5121 17.8713 14.9534 16.644 15.6646 15.573C16.3758 14.5019 17.3358 13.6191 18.4626 13C18.2988 13.6361 18.2913 14.3023 18.4406 14.942C18.6439 15.7879 19.1174 16.5444 19.7894 17.0969C20.4614 17.6495 21.2953 17.9678 22.1645 18.0038C23.0337 18.0397 23.891 17.7913 24.6063 17.2962C25.3217 16.801 25.8561 16.0862 26.1286 15.26C26.173 15.1132 26.1822 14.958 26.1556 14.807C26.1289 14.656 26.0671 14.5134 25.9751 14.3907C25.8831 14.268 25.7635 14.1687 25.626 14.1009C25.4885 14.033 25.3369 13.9984 25.1836 14H25.0326C24.8486 14.006 24.6714 14.0704 24.5265 14.1838C24.3816 14.2973 24.2766 14.4539 24.2266 14.631C24.1103 14.9806 23.8998 15.2913 23.6181 15.5288C23.3365 15.7663 22.9947 15.9215 22.6305 15.9771C22.2663 16.0327 21.8938 15.9866 21.5541 15.8439C21.2145 15.7012 20.9208 15.4675 20.7056 15.1684C20.4903 14.8694 20.3618 14.5168 20.3343 14.1494C20.3068 13.782 20.3813 13.4141 20.5496 13.0864C20.7179 12.7586 20.9734 12.4837 21.288 12.292C21.6027 12.1003 21.9641 11.9993 22.3326 12C24.3084 11.9952 26.2157 12.7239 27.6851 14.0448C29.1545 15.3656 30.0815 17.1848 30.2866 19.15C30.3095 19.3648 30.4013 19.5665 30.5484 19.7248C30.6955 19.8831 30.89 19.9894 31.1026 20.028C31.4669 20.0992 31.7919 20.3031 32.0146 20.6C32.2374 20.897 32.3421 21.2661 32.3085 21.6358C32.2749 22.0055 32.1054 22.3496 31.8328 22.6016C31.5602 22.8536 31.2038 22.9955 30.8326 23C30.748 22.9976 30.6637 22.9886 30.5806 22.973Z" fill="#E7AA0B" />
                                <path d="M19.833 23.0001C20.6614 23.0001 21.333 22.3285 21.333 21.5001C21.333 20.6717 20.6614 20.0001 19.833 20.0001C19.0046 20.0001 18.333 20.6717 18.333 21.5001C18.333 22.3285 19.0046 23.0001 19.833 23.0001Z" fill="#374957" />
                                <path d="M24.833 23.0001C25.6614 23.0001 26.333 22.3285 26.333 21.5001C26.333 20.6717 25.6614 20.0001 24.833 20.0001C24.0046 20.0001 23.333 20.6717 23.333 21.5001C23.333 22.3285 24.0046 23.0001 24.833 23.0001Z" fill="#374957" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2160_27613">
                                    <rect width="24" height="24" fill="white" transform="translate(10.333 10)" />
                                </clipPath>
                            </defs>
                        </svg>}
                    />
                    <SuggestionsCard
                        title="Variance %"
                        value="20"
                        color="red"
                        icon={<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.666992" width="40" height="40" rx="20" fill="#FCEDF8" />
                            <path d="M20.6673 28.3333C25.2697 28.3333 29.0007 24.6023 29.0007 20C29.0007 15.3976 25.2697 11.6666 20.6673 11.6666C16.0649 11.6666 12.334 15.3976 12.334 20C12.334 24.6023 16.0649 28.3333 20.6673 28.3333Z" fill="#E44FBA" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.667 25C23.4284 25 25.667 22.7614 25.667 20C25.667 17.2386 23.4284 15 20.667 15C17.9056 15 15.667 17.2386 15.667 20C15.667 22.7614 17.9056 25 20.667 25Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.6667 21.6667C21.5871 21.6667 22.3333 20.9205 22.3333 20C22.3333 19.0796 21.5871 18.3334 20.6667 18.3334C19.7462 18.3334 19 19.0796 19 20C19 20.9205 19.7462 21.6667 20.6667 21.6667Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>}
                    />
                </div>

                {/* Content area with flex layout to push pagination to bottom */}
                <div className="flex flex-col h-full border border-[#E9EAEA] rounded-xl bg-white mb-6">
                    {/* Recommendation Cards */}
                    <div className="flex-1 space-y-4 p-6">
                        {currentData.map((item, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-[#E5E7EB] bg-[#F8F8FC] px-5 py-4 "
                            >
                                <div className="flex items-center gap-4">
                                    {/* Icon pill */}
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                                        <div className="text-teal-600"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="22" fill="white" />
                                            <path d="M22 32C27.5228 32 32 27.5228 32 22C32 16.4772 27.5228 12 22 12C16.4772 12 12 16.4772 12 22C12 27.5228 16.4772 32 22 32Z" fill="#009499" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 28C25.3137 28 28 25.3137 28 22C28 18.6863 25.3137 16 22 16C18.6863 16 16 18.6863 16 22C16 25.3137 18.6863 28 22 28Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 24C23.1046 24 24 23.1046 24 22C24 20.8954 23.1046 20 22 20C20.8954 20 20 20.8954 20 22C20 23.1046 20.8954 24 22 24Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="mb-1 font-semibold text-[#1F2430]">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>

                                                                                                              {/* Conditional button/toggle based on active tab */}
                                     {activeTab === 'automation-settings' ? (
                                         <div className="flex items-center">
                                             <button
                                                 onClick={() => setAutomationToggles(prev => ({
                                                     ...prev,
                                                     [i]: !prev[i]
                                                 }))}
                                                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors  ${
                                                     automationToggles[i] ? 'bg-primary' : 'bg-gray-200'
                                                 }`}
                                             >
                                                 <span
                                                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                         automationToggles[i] ? 'translate-x-6' : 'translate-x-1'
                                                     }`}
                                                 />
                                             </button>
                                            
                                         </div>
                                     ) : activeTab === 'smart-inventory' && i === 0 ? (
                                         <div className="flex items-center">
                                             <button
                                                 onClick={() => setSelectedCard(selectedCard === i ? null : i)}
                                                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                                                     selectedCard === i ? 'bg-purple-600' : 'bg-gray-200'
                                                 }`}
                                             >
                                                 <span
                                                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                         selectedCard === i ? 'translate-x-6' : 'translate-x-1'
                                                     }`}
                                                 />
                                             </button>
                                             <span className="ml-2 text-sm font-medium text-gray-700">
                                                 {selectedCard === i ? 'Enabled' : 'Disabled'}
                                             </span>
                                         </div>
                                     ) : (
                                        <button
                                            className="rounded-full border border-[#E51B1B] bg-red-50 px-3.5 py-1.5 text-xs font-bold text-[#E51B1B] hover:bg-[#FCE8E8]"
                                        >
                                            Review Needed
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination - Always at bottom */}
                    <div className="flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-500">
                        {/* Left text */}
                        <span>
                            Showing {startIndex + 1}–{Math.min(endIndex, recommendationData.length)} from{" "}
                            {recommendationData.length}
                        </span>

                        {/* Pagination controls */}
                        <div className="flex items-center space-x-2">
                            {/* Previous button */}
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.86015 12.3933L5.14015 8.66667C5.01598 8.54176 4.94629 8.3728 4.94629 8.19667C4.94629 8.02055 5.01598 7.85158 5.14015 7.72667L8.86015 4.00001C8.9534 3.90599 9.07253 3.84187 9.20236 3.81582C9.3322 3.78977 9.46684 3.80298 9.58914 3.85376C9.71143 3.90454 9.81584 3.99058 9.88904 4.10093C9.96224 4.21128 10.0009 4.34092 10.0002 4.47334V11.92C10.0009 12.0524 9.96224 12.1821 9.88904 12.2924C9.81584 12.4028 9.71143 12.4888 9.58914 12.5396C9.46684 12.5904 9.3322 12.6036 9.20236 12.5775C9.07253 12.5515 8.9534 12.4874 8.86015 12.3933Z"
                                        fill="#686F83"
                                    />
                                </svg>
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setCurrentPage(num)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-sm ${num === currentPage
                                        ? "bg-purple-100 text-purple-700 border-purple-300"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}

                            {/* Next button */}
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.00001 13.92V6.47334C7.99924 6.34092 8.03792 6.21128 8.11112 6.10093C8.18432 5.99058 8.28873 5.90454 8.41102 5.85376C8.53332 5.80298 8.66797 5.78977 8.7978 5.81582C8.92763 5.84187 9.04677 5.90599 9.14001 6.00001L12.86 9.72667C12.9842 9.85158 13.0539 10.0205 13.0539 10.1967C13.0539 10.3728 12.9842 10.5418 12.86 10.6667L9.14001 14.3933C9.04677 14.4874 8.92763 14.5515 8.7978 14.5775C8.66797 14.6036 8.53332 14.5904 8.41102 14.5396C8.28873 14.4888 8.18432 14.4028 8.11112 14.2924C8.03792 14.1821 7.99924 14.0524 8.00001 13.92Z"
                                        fill="#686F83"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiSuggestionTab