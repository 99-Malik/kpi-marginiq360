'use client';

import React, { useState } from 'react'
import ChartCard from '@/components/LineChartCard/ChartCards';
import RevenueBreakdownChart from "../../components/LineChartCard/RevenueBreakdownChart"
import AvgPerformance from '../../components/LineChartCard/AvgPerformance';
function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogoClick = () => {
        setMenuOpen(!menuOpen);
    }
    const [activeTab, setActiveTab] = useState('Over View');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
      <>
                <main className="flex-1 overflow-auto px-2 pb-6 bg-white">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                            {/* left: title + subtitle */}
                            <div className="min-w-0">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Performance Dashboard</h1>
                                <p className="text-gray-500 mt-2 sm:max-w-[60ch] md:text-xs lg:text-xs xl:text-base">
                                    Track KPIs and operational metrics across your restaurant
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
                                    className="inline-flex h-8 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-white cursor-pointer"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3627_25107)">
                                            <path d="M7.33852 1.71891L7.33386 12.0109C7.33386 12.1877 7.4041 12.3573 7.52912 12.4823C7.65414 12.6073 7.82371 12.6776 8.00052 12.6776C8.17734 12.6776 8.3469 12.6073 8.47193 12.4823C8.59695 12.3573 8.66719 12.1877 8.66719 12.0109L8.67186 1.73024L10.6132 3.67224C10.7382 3.79722 10.9077 3.86743 11.0845 3.86743C11.2613 3.86743 11.4308 3.79722 11.5559 3.67224C11.6808 3.54722 11.751 3.37768 11.751 3.20091C11.751 3.02413 11.6808 2.85459 11.5559 2.72957L9.41519 0.58624C9.22946 0.400387 9.00892 0.252953 8.76619 0.152364C8.52345 0.051774 8.26328 0 8.00052 0C7.73777 0 7.4776 0.051774 7.23486 0.152364C6.99213 0.252953 6.77159 0.400387 6.58586 0.58624L4.44519 2.72757C4.32021 2.85259 4.25 3.02213 4.25 3.19891C4.25 3.37568 4.32021 3.54522 4.44519 3.67024C4.57021 3.79522 4.73975 3.86543 4.91652 3.86543C5.0933 3.86543 5.26284 3.79522 5.38786 3.67024L7.33852 1.71891Z" fill="white" />
                                            <path d="M14.6667 11.3327V13.9993C14.6667 14.1762 14.5964 14.3457 14.4714 14.4707C14.3464 14.5958 14.1768 14.666 14 14.666H2C1.82319 14.666 1.65362 14.5958 1.5286 14.4707C1.40357 14.3457 1.33333 14.1762 1.33333 13.9993V11.3327C1.33333 11.1559 1.2631 10.9863 1.13807 10.8613C1.01305 10.7363 0.843478 10.666 0.666667 10.666C0.489856 10.666 0.320286 10.7363 0.195262 10.8613C0.0702379 10.9863 0 11.1559 0 11.3327L0 13.9993C0 14.5298 0.210714 15.0385 0.585786 15.4136C0.960859 15.7886 1.46957 15.9993 2 15.9993H14C14.5304 15.9993 15.0391 15.7886 15.4142 15.4136C15.7893 15.0385 16 14.5298 16 13.9993V11.3327C16 11.1559 15.9298 10.9863 15.8047 10.8613C15.6797 10.7363 15.5101 10.666 15.3333 10.666C15.1565 10.666 14.987 10.7363 14.8619 10.8613C14.7369 10.9863 14.6667 11.1559 14.6667 11.3327Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3627_25107">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>


                                    <span className="whitespace-nowrap text-xs text-white">Export Report</span>
                                </button>


                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-4 ">
                        <ChartCard
                            title="Revenue"
                            value="46,420.00"
                            change="+10%"
                            amount="Up From Last Year"
                            color="green"
                            icon={
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="44" height="44" rx="22" fill="#E6F4F5" />
                                    <path d="M23.932 14C24.7454 14.0008 25.5253 14.3243 26.1005 14.8995C26.6757 15.4747 26.9992 16.2546 27 17.068C27 17.3332 27.1054 17.5876 27.2929 17.7751C27.4804 17.9626 27.7348 18.068 28 18.068C28.2652 18.068 28.5196 17.9626 28.7071 17.7751C28.8946 17.5876 29 17.3332 29 17.068V17C29 16.981 29 16.964 29 16.945C28.9666 15.6227 28.4181 14.3658 27.4714 13.4421C26.5247 12.5183 25.2547 12.0009 23.932 12H23V11C23 10.7348 22.8946 10.4804 22.7071 10.2929C22.5196 10.1054 22.2652 10 22 10C21.7348 10 21.4804 10.1054 21.2929 10.2929C21.1054 10.4804 21 10.7348 21 11V12H20.068C18.8653 12.0013 17.7023 12.4302 16.7868 13.2102C15.8713 13.9901 15.263 15.0702 15.0707 16.2574C14.8783 17.4446 15.1144 18.6615 15.7368 19.6907C16.3592 20.7198 17.3273 21.494 18.468 21.875L21 22.72V30H20.068C19.2546 29.9992 18.4747 29.6757 17.8995 29.1005C17.3243 28.5253 17.0008 27.7454 17 26.932C17 26.6668 16.8946 26.4124 16.7071 26.2249C16.5196 26.0374 16.2652 25.932 16 25.932C15.7348 25.932 15.4804 26.0374 15.2929 26.2249C15.1054 26.4124 15 26.6668 15 26.932V27C15 27.019 15 27.036 15 27.055C15.0334 28.3773 15.5819 29.6342 16.5286 30.5579C17.4753 31.4817 18.7453 31.9991 20.068 32H21V33C21 33.2652 21.1054 33.5196 21.2929 33.7071C21.4804 33.8946 21.7348 34 22 34C22.2652 34 22.5196 33.8946 22.7071 33.7071C22.8946 33.5196 23 33.2652 23 33V32H23.932C25.1347 31.9987 26.2977 31.5698 27.2132 30.7898C28.1287 30.0099 28.737 28.9298 28.9293 27.7426C29.1217 26.5554 28.8856 25.3385 28.2632 24.3093C27.6408 23.2802 26.6727 22.506 25.532 22.125L23 21.28V14H23.932ZM24.902 24.021C25.5934 24.2511 26.1804 24.7198 26.5577 25.3432C26.9351 25.9666 27.0782 26.704 26.9615 27.4233C26.8448 28.1426 26.4759 28.7969 25.9208 29.269C25.3657 29.7411 24.6607 30.0003 23.932 30H23V23.387L24.902 24.021ZM21 20.613L19.1 19.979C18.4087 19.7489 17.8219 19.2804 17.4445 18.6572C17.0672 18.034 16.9239 17.2969 17.0403 16.5777C17.1567 15.8585 17.5253 15.2042 18.08 14.7319C18.6348 14.2597 19.3395 14.0002 20.068 14H21V20.613Z" fill="#009499" />
                                </svg>



                            }
                        />
                        <ChartCard
                            title="Food Cost"
                            value="25.00"
                            amount="0.5% overtarget"
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
                            title="Customer Rating"
                            value="4.7"
                            change="Above Target (4.5)"
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
                        <ChartCard
                            title="Table Turns"
                            value="4.2"
                            amount="per day average"
                            color="purpleDeep"
                            icon={<svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" width="44" height="44" rx="22" fill="#F4ECFA" />
                                <g clip-path="url(#clip0_2058_16453)">
                                    <path d="M22.5 10C20.1266 10 17.8066 10.7038 15.8332 12.0224C13.8598 13.3409 12.3217 15.2151 11.4135 17.4078C10.5052 19.6005 10.2676 22.0133 10.7306 24.3411C11.1936 26.6689 12.3365 28.8071 14.0147 30.4853C15.693 32.1635 17.8312 33.3064 20.1589 33.7694C22.4867 34.2324 24.8995 33.9948 27.0922 33.0866C29.2849 32.1783 31.1591 30.6402 32.4776 28.6668C33.7962 26.6935 34.5 24.3734 34.5 22C34.4966 18.8185 33.2312 15.7682 30.9815 13.5185C28.7318 11.2688 25.6815 10.0034 22.5 10V10ZM22.5 32C20.5222 32 18.5888 31.4135 16.9443 30.3147C15.2998 29.2159 14.0181 27.6541 13.2612 25.8268C12.5043 23.9996 12.3063 21.9889 12.6922 20.0491C13.078 18.1093 14.0304 16.3275 15.4289 14.9289C16.8275 13.5304 18.6093 12.578 20.5491 12.1921C22.4889 11.8063 24.4996 12.0043 26.3268 12.7612C28.1541 13.5181 29.7159 14.7998 30.8147 16.4443C31.9135 18.0888 32.5 20.0222 32.5 22C32.4971 24.6513 31.4426 27.1931 29.5679 29.0679C27.6931 30.9426 25.1513 31.9971 22.5 32ZM24.5 22C24.5016 22.3515 24.4105 22.6971 24.236 23.0022C24.0615 23.3072 23.8097 23.5609 23.5059 23.7377C23.2021 23.9144 22.8571 24.008 22.5057 24.009C22.1542 24.01 21.8087 23.9184 21.504 23.7434C21.1992 23.5683 20.9459 23.3161 20.7697 23.012C20.5934 22.7079 20.5004 22.3628 20.5 22.0113C20.4996 21.6599 20.5918 21.3145 20.7674 21.01C20.943 20.7056 21.1956 20.4527 21.5 20.277V17C21.5 16.7348 21.6054 16.4804 21.7929 16.2929C21.9804 16.1054 22.2348 16 22.5 16C22.7652 16 23.0196 16.1054 23.2071 16.2929C23.3946 16.4804 23.5 16.7348 23.5 17V20.277C23.8031 20.4513 24.0551 20.7023 24.2306 21.0047C24.4061 21.3071 24.499 21.6503 24.5 22Z" fill="#6E0AB8" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2058_16453">
                                        <rect width="24" height="24" fill="white" transform="translate(10.5 10)" />
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
                                    onClick={() => handleTabClick('Over View')}
                                    role="tab"
                                    aria-selected={activeTab === 'Over View'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Over View'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-16 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => handleTabClick('Goal & Targets')}
                                    role="tab"
                                    aria-selected={activeTab === 'Goal & Targets'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Goal & Targets'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-25 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Goal & Targets
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
                                    onClick={() => handleTabClick('Benchmarks')}
                                    role="tab"
                                    aria-selected={activeTab === 'Benchmarks'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Benchmarks'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-22 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Benchmarks
                                </button>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'Over View' && (
                        <div className="w-full mt-10 pr-4">
                            <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
                                {/* LEFT: Stepper card */}
                                <div>

                                    <RevenueBreakdownChart />


                                </div>

                                {/* RIGHT: Content card with inner panel & colored sections */}
                                <div className="rounded-[16px] border border-[#E9EAEA] bg-white py-4">
                                    <div className="flex items-center justify-between mb-3 px-4">
                                        {/* Title */}
                                        <div>
                                            <h3 className="text-[16px] font-semibold text-gray-900">
                                                Budget Planning
                                            </h3>
                                            <p className="text-xs mt-1 text-gray-500">
                                                Current period performance vs targets
                                            </p>
                                        </div>

                                        {/* 3-dot menu icon */}
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="cursor-pointer"
                                        >
                                            <g clipPath="url(#clip0_3782_23122)">
                                                <path
                                                    d="M9 3C9.82842 3 10.5 2.32843 10.5 1.5C10.5 0.671573 9.82842 0 9 0C8.17157 0 7.5 0.671573 7.5 1.5C7.5 2.32843 8.17157 3 9 3Z"
                                                    fill="#727A90"
                                                />
                                                <path
                                                    d="M9 10.5C9.82842 10.5 10.5 9.82842 10.5 9C10.5 8.17157 9.82842 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82842 8.17157 10.5 9 10.5Z"
                                                    fill="#727A90"
                                                />
                                                <path
                                                    d="M9 18C9.82842 18 10.5 17.3284 10.5 16.5C10.5 15.6716 9.82842 15 9 15C8.17157 15 7.5 15.6716 7.5 16.5C7.5 17.3284 8.17157 18 9 18Z"
                                                    fill="#727A90"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3782_23122">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="h-[1px] bg-[#E9EAEA]"></div>

                                    {/* inner pale panel with scrollable cards */}
                                    <div className="py-4 px-4 lg:py-5 h-[400px] overflow-y-auto scroll-hidden space-y-3">
                                        {[
                                            {
                                                label: "Food Costs (25% of Sales)",
                                                value: "$60,000 (25% of $240,000 Sales)",
                                            },
                                            {
                                                label: "Marketing Expenses (10% of Sales)",
                                                value: "$25,000 (10% of $250,000 Sales)",
                                            },
                                            {
                                                label: "Food Costs (25% of Sales)",
                                                value: "$60,000 (25% of $240,000 Sales)",
                                            },
                                            {
                                                label: "Utilities (5% of Sales)",
                                                value: "$15,000 (5% of $300,000 Sales)",
                                            },
                                            {
                                                label: "Labor Costs (40% of Sales)",
                                                value: "$80,000 (40% of $200,000 Sales)",
                                            },
                                            {
                                                label: "Labor Costs (40% of Sales)",
                                                value: "$80,000 (40% of $200,000 Sales)",
                                            },
                                            {
                                                label: "Labor Costs (40% of Sales)",
                                                value: "$80,000 (40% of $200,000 Sales)",
                                            },
                                            {
                                                label: "Labor Costs (40% of Sales)",
                                                value: "$80,000 (40% of $200,000 Sales)",
                                            },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-[#F8F8FC] px-4 py-4"
                                            >
                                                <span className="text-[14px] font-semibold text-gray-900">
                                                    {item.label}
                                                </span>
                                                <span className="text-sm font-semibold text-[#727A90]">
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    {activeTab === 'Goal & Targets' && (
                        <div className="rounded-[16px] border border-[#E9EAEA] bg-white">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4 px-4 pt-4">
                                <div>
                                    <h3 className="text-[16px] font-semibold text-gray-900">
                                        Performance Goals
                                    </h3>
                                    <p className="text-[14px] text-gray-500">
                                        Track progress against operational targets
                                    </p>
                                </div>
                                {/* 3-dot menu */}
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="cursor-pointer"
                                >
                                    <path
                                        d="M9 3C9.82842 3 10.5 2.32843 10.5 1.5C10.5 0.671573 9.82842 0 9 0C8.17157 0 7.5 0.671573 7.5 1.5C7.5 2.32843 8.17157 3 9 3Z"
                                        fill="#727A90"
                                    />
                                    <path
                                        d="M9 10.5C9.82842 10.5 10.5 9.82842 10.5 9C10.5 8.17157 9.82842 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82842 8.17157 10.5 9 10.5Z"
                                        fill="#727A90"
                                    />
                                    <path
                                        d="M9 18C9.82842 18 10.5 17.3284 10.5 16.5C10.5 15.6716 9.82842 15 9 15C8.17157 15 7.5 15.6716 7.5 16.5C7.5 17.3284 8.17157 18 9 18Z"
                                        fill="#727A90"
                                    />
                                </svg>
                            </div>
                            <div className="h-[0.5px] bg-[#E9EAEA] my-4"></div>
                            {/* Goal List */}
                            <div className="space-y-3 px-4 pb-4">
                                {[
                                    {
                                        label: "Food Cost %",
                                        target: "Target: 28%",
                                        value: "28.5%",
                                        status: "Attention",
                                        color: "bg-[#FDF7E7] text-[#D29B0A] border border-[#E7AA0B]",
                                    },
                                    {
                                        label: "Labor Cost %",
                                        target: "Target: 25%",
                                        value: "24.8%",
                                        status: "On Track",
                                        color: "bg-[#FEEFEC] text-[#F05D3D] border border-[#F05D3D]",
                                    },
                                    {
                                        label: "Operating Expenses %",
                                        target: "Target: 15%",
                                        value: "16.2%",
                                        status: "Review Needed",
                                        color: "bg-[#FCE8E8] text-[#E51B1B] border border-[#E51B1B]",
                                    },
                                    {
                                        label: "Sales Revenue Growth",
                                        target: "Target: 10%",
                                        value: "9%",
                                        status: "Action Required",
                                        color: "bg-[#F4ECFA] text-[#6E0AB8] border border-[#6E0AB8]",
                                    },
                                    {
                                        label: "Customer Satisfaction Score",
                                        target: "Target: 90%",
                                        value: "88%",
                                        status: "Below Target",
                                        color: "bg-[#FDF7E7] text-[#D29B0A] border border-[#E7AA0B]",
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between rounded-[12px] border border-[#E9EAEA] bg-[#F9FAFB] px-4 py-3"
                                    >
                                        {/* Left side */}
                                        <div className="flex items-start gap-3">
                                            {/* Icon */}
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#E9EAEA]">
                                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="44" height="44" rx="22" fill="white" />
                                                    <path d="M22 32C27.5228 32 32 27.5228 32 22C32 16.4772 27.5228 12 22 12C16.4772 12 12 16.4772 12 22C12 27.5228 16.4772 32 22 32Z" fill="#009499" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M22 28C25.3137 28 28 25.3137 28 22C28 18.6863 25.3137 16 22 16C18.6863 16 16 18.6863 16 22C16 25.3137 18.6863 28 22 28Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M22 24C23.1046 24 24 23.1046 24 22C24 20.8954 23.1046 20 22 20C20.8954 20 20 20.8954 20 22C20 23.1046 20.8954 24 22 24Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                            </div>
                                            <div>
                                                <p className="text-[14px] font-semibold text-gray-900">
                                                    {item.label}
                                                </p>
                                                <p className="text-[13px] text-gray-500">{item.target}</p>
                                            </div>
                                        </div>

                                        {/* Right side */}
                                        {/* Right side */}
                                        <div className="flex flex-col items-end">
                                            <span className="text-[14px] font-semibold text-gray-900">
                                                {item.value}
                                            </span>
                                            <span
                                                className={`mt-1 px-3 py-0.5 text-[12px] font-medium rounded-full ${item.color}`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Trends' && (
                        <div>
                            <AvgPerformance />
                        </div>
                    )}

                    {activeTab === 'Benchmarks' && (
                        <div className="rounded-[16px] border border-[#E9EAEA] bg-white p-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-[18px] font-semibold text-gray-900">Industry Benchmarks</h3>
                                    <p className="text-[14px] text-gray-500">Compare your performance against industry standards</p>
                                </div>

                                {/* Segmented control */}
                                <div className="flex items-center gap-1 rounded-md border border-[#E9EAEA] p-1">
                                    {['Text Here', 'Text Here', 'Text Here'].map((t, i) => (
                                        <button
                                            key={i}
                                            className={[
                                                'px-3 py-1 rounded-md text-sm transition',
                                                i === 0
                                                    ? 'bg-[#F2EAFE] text-[#6E0AB8] font-semibold ring-1 ring-black/5'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            ].join(' ')}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-[#E9EAEA] my-4" />

                            {/* Bars */}
                            <div className="space-y-8">
                                {[
                                    {
                                        title: 'Food Cost Percentage',
                                        industry: [28, 32],
                                        you: 28.5,
                                        color: '#E7AA0B', // gold
                                    },
                                    {
                                        title: 'Labor Cost Percentage',
                                        industry: [25, 30],
                                        you: 72,
                                        color: '#6E0AB8', // purple
                                    },
                                    {
                                        title: 'Operating Expenses Percentage',
                                        industry: [15, 20],
                                        you: 18,
                                        color: '#E51B1B', // red
                                    },
                                    {
                                        title: 'Profit Margin Percentage',
                                        industry: [5, 10],
                                        you: 7,
                                        color: '#E51B1B', // red
                                    },
                                    {
                                        title: 'Sales Growth Rate',
                                        industry: [10, 15],
                                        you: 65,
                                        color: '#34C759', // green
                                    },
                                ].map((row, idx) => {
                                    const width = Math.max(0, Math.min(100, row.you)); // clamp 0–100
                                    return (
                                        <div key={idx} className="w-full">
                                            {/* Top line: left title, right meta */}
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[16px] font-semibold text-gray-900">{row.title}</span>
                                                <span className="text-[16px] text-gray-900">
                                                    <span className="text-gray-600">Industry : </span>
                                                    <span className="font-semibold">{row.industry[0]}–{row.industry[1]}%</span>
                                                    <span className="text-gray-600 ml-2">You:</span>{row.you}%
                                                </span>
                                            </div>

                                            {/* Track + fill */}
                                            <div className="relative h-2 rounded-full bg-[#E6E9EF]">
                                                <div
                                                    className="relative h-2 rounded-full"
                                                    style={{ width: `${width}%`, background: row.color }}
                                                >
                                                    {/* rounded cap dot */}

                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}



                </main>

                </>

    )
}

export default Page;