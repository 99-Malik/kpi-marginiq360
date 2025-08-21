'use client'
import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import SideBarMenu from '../../components/Sidebar/SideBarMenu';
import MenuBar from '../../components/MenuBar/MenuBar';
import CogsCharts from '@/components/Cogs/CogsCharts';
import RevenuePerformanceChart from '@/components/LineChartCard/RevenuePerformanceChart';
import SaleTodayCard from '@/components/Cogs/SaleTodayCard';
import Pagination from '@/components/Pagination/CogsPagination/Page';

function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogoClick = () => {
        setMenuOpen(!menuOpen);
    };
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            {/* left: title + subtitle */}
                            <div className="min-w-0">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">COGS Reports</h1>
                                <p className="text-gray-500 sm:max-w-[60ch] md:mt-4 lg:mt-2 text-sm lg:text-base">
                                    Cost of Goods Sold analysis and trends
                                </p>
                            </div>

                            {/* right: actions */}
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap md:mt-4 lg:mt-2">
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

                                    <span className="whitespace-nowrap text-xs text-[#727A90]">Last 30 Days</span>
                                </button>

                                {/* Button 2 */}
                                <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-2 rounded-lg border border-primary bg-white px-3 text-sm font-semibold text-primary cursor-pointer hover:bg-purple-50"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3627_20640)">
                                            <path d="M10.0008 3.33352C10.8851 3.33642 11.7601 3.51468 12.5751 3.85798C13.3901 4.20127 14.1289 4.7028 14.7488 5.33352H12.6675C12.4906 5.33352 12.3211 5.40376 12.196 5.52878C12.071 5.6538 12.0008 5.82337 12.0008 6.00018C12.0008 6.177 12.071 6.34656 12.196 6.47159C12.3211 6.59661 12.4906 6.66685 12.6675 6.66685H15.4295C15.7577 6.66667 16.0725 6.53619 16.3047 6.30405C16.5368 6.07192 16.6673 5.75714 16.6675 5.42885V2.66685C16.6675 2.49004 16.5972 2.32047 16.4722 2.19545C16.3472 2.07042 16.1776 2.00018 16.0008 2.00018C15.824 2.00018 15.6544 2.07042 15.5294 2.19545C15.4044 2.32047 15.3341 2.49004 15.3341 2.66685V4.05218C14.2322 3.05982 12.8758 2.39379 11.4169 2.12868C9.95786 1.86358 8.45387 2.00986 7.07331 2.55115C5.69275 3.09244 4.49013 4.00736 3.60013 5.19347C2.71012 6.37957 2.16788 7.79001 2.03412 9.26685C2.02551 9.35969 2.03633 9.4533 2.06589 9.54173C2.09546 9.63015 2.14312 9.71145 2.20584 9.78044C2.26855 9.84943 2.34496 9.9046 2.43017 9.94243C2.51539 9.98027 2.60755 9.99994 2.70079 10.0002C2.86384 10.0023 3.02181 9.94341 3.14376 9.83515C3.26571 9.72689 3.34286 9.57701 3.36012 9.41485C3.50853 7.75535 4.2721 6.21132 5.50084 5.08608C6.72958 3.96083 8.33466 3.33571 10.0008 3.33352Z" fill="#6E0AB8" />
                                            <path d="M17.3013 10.0001C17.1383 9.99798 16.9803 10.0568 16.8583 10.1651C16.7364 10.2734 16.6592 10.4232 16.642 10.5854C16.5318 11.8542 16.0599 13.0648 15.2824 14.0735C14.5049 15.0823 13.4544 15.8468 12.2554 16.2764C11.0565 16.7061 9.75945 16.7828 8.51822 16.4975C7.27699 16.2122 6.14365 15.5768 5.25265 14.6667H7.33398C7.5108 14.6667 7.68037 14.5965 7.80539 14.4715C7.93041 14.3464 8.00065 14.1769 8.00065 14.0001C8.00065 13.8233 7.93041 13.6537 7.80539 13.5287C7.68037 13.4036 7.5108 13.3334 7.33398 13.3334H4.57198C4.40938 13.3333 4.24836 13.3653 4.09812 13.4275C3.94788 13.4896 3.81137 13.5808 3.69639 13.6958C3.58141 13.8108 3.49023 13.9473 3.42804 14.0975C3.36586 14.2478 3.3339 14.4088 3.33398 14.5714V17.3334C3.33398 17.5102 3.40422 17.6798 3.52925 17.8048C3.65427 17.9298 3.82384 18.0001 4.00065 18.0001C4.17746 18.0001 4.34703 17.9298 4.47206 17.8048C4.59708 17.6798 4.66732 17.5102 4.66732 17.3334V15.9481C5.7692 16.9404 7.12559 17.6065 8.58459 17.8716C10.0436 18.1367 11.5476 17.9904 12.9281 17.4491C14.3087 16.9078 15.5113 15.9929 16.4013 14.8068C17.2913 13.6207 17.8336 12.2102 17.9673 10.7334C17.9759 10.6406 17.9651 10.5469 17.9355 10.4585C17.906 10.3701 17.8583 10.2888 17.7956 10.2198C17.7329 10.1508 17.6565 10.0956 17.5713 10.0578C17.4861 10.02 17.3939 10.0003 17.3007 10.0001H17.3013Z" fill="#6E0AB8" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3627_20640">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="whitespace-nowrap text-xs text-primary">Refresh Data</span>
                                </button>

                                {/* Button 3 */}
                                <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-2 rounded-lg bg-[#F1E7F8] px-3 text-sm font-semibold text-primary cursor-pointer "
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3627_24019)">
                                            <path d="M7.33852 1.71891L7.33386 12.0109C7.33386 12.1877 7.4041 12.3573 7.52912 12.4823C7.65414 12.6073 7.82371 12.6776 8.00052 12.6776C8.17734 12.6776 8.3469 12.6073 8.47193 12.4823C8.59695 12.3573 8.66719 12.1877 8.66719 12.0109L8.67186 1.73024L10.6132 3.67224C10.7382 3.79722 10.9077 3.86743 11.0845 3.86743C11.2613 3.86743 11.4308 3.79722 11.5559 3.67224C11.6808 3.54722 11.751 3.37768 11.751 3.20091C11.751 3.02413 11.6808 2.85459 11.5559 2.72957L9.41519 0.58624C9.22946 0.400387 9.00892 0.252953 8.76619 0.152364C8.52345 0.051774 8.26328 0 8.00052 0C7.73777 0 7.4776 0.051774 7.23486 0.152364C6.99213 0.252953 6.77159 0.400387 6.58586 0.58624L4.44519 2.72757C4.32021 2.85259 4.25 3.02213 4.25 3.19891C4.25 3.37568 4.32021 3.54522 4.44519 3.67024C4.57021 3.79522 4.73975 3.86543 4.91652 3.86543C5.0933 3.86543 5.26284 3.79522 5.38786 3.67024L7.33852 1.71891Z" fill="#6E0AB8" />
                                            <path d="M14.6667 11.3327V13.9993C14.6667 14.1762 14.5964 14.3457 14.4714 14.4707C14.3464 14.5958 14.1768 14.666 14 14.666H2C1.82319 14.666 1.65362 14.5958 1.5286 14.4707C1.40357 14.3457 1.33333 14.1762 1.33333 13.9993V11.3327C1.33333 11.1559 1.2631 10.9863 1.13807 10.8613C1.01305 10.7363 0.843478 10.666 0.666667 10.666C0.489856 10.666 0.320286 10.7363 0.195262 10.8613C0.0702379 10.9863 0 11.1559 0 11.3327L0 13.9993C0 14.5298 0.210714 15.0385 0.585786 15.4136C0.960859 15.7886 1.46957 15.9993 2 15.9993H14C14.5304 15.9993 15.0391 15.7886 15.4142 15.4136C15.7893 15.0385 16 14.5298 16 13.9993V11.3327C16 11.1559 15.9298 10.9863 15.8047 10.8613C15.6797 10.7363 15.5101 10.666 15.3333 10.666C15.1565 10.666 14.987 10.7363 14.8619 10.8613C14.7369 10.9863 14.6667 11.1559 14.6667 11.3327Z" fill="#6E0AB8" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3627_24019">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="whitespace-nowrap text-xs text-primary">Export Report</span>
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Revenue Performance (2/3 width) */}
                        <div className="lg:col-span-2 rounded-3xl bg-white ring-1 ring-gray-200/70 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-start justify-between px-5 pt-5 pb-3">
                                <div>
                                    <h3 className="text-xl leading-7 font-semibold text-gray-900">
                                        Revenue Performance
                                    </h3>
                                    <p className="text-sm text-gray-500 -mt-0.5">Income and Expenses</p>
                                </div>
                                <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-2 text-xs text-[#727A90]">
                                    Food Items
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

                        {/* Hourly Performance (1/3 width) */}
                        <div className="lg:col-span-1 rounded-3xl pb-4 bg-white ring-1 ring-gray-200/70 overflow-hidden">
                            <div className="flex items-start justify-between px-5 pt-5 pb-3">
                                <div>
                                    <h3 className="text-xl leading-7 font-semibold text-gray-900">Best Items</h3>
                                    <p className="text-sm text-gray-500 -mt-0.5">Based on Sales</p>
                                </div>
                                <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-2 text-xs text-[#727A90]">
                                    Top 10 Items
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
                                    </svg>

                                </button>
                            </div>
                            <div className="h-px bg-gray-200" />

                            <div className="relative">
                                <div className="max-h-[360px] overflow-y-auto pr-3 pl-5  pt-2 custom-scroll">
                                    {["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00"].map(t => (
                                        <div key={t} className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-3">
                                                {/* Item Image */}
                                                <img
                                                    src="/images/pizza.png" 
                                                    alt="Cheese Burger"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />

                                                {/* Text Content */}
                                                <div>
                                                    <div className="text-base font-semibold text-gray-900">
                                                        Cheese Burger
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        340 Sales
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 tabular-nums">$17.678</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <CogsCharts />
                    </div>
                    <div className='mt-10'>
                        <SaleTodayCard />
                        </div>

                        <div className='mt-10'>
                            <Pagination />
                        </div>


                </main>
            </div>
        </div>
    )
}

export default Page