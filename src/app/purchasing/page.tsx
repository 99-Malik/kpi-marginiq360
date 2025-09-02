'use client';

import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import SideBarMenu from '../../components/Sidebar/SideBarMenu';
import MenuBar from '../../components/MenuBar/MenuBar';
import ChartCard from '@/components/LineChartCard/ChartCards';
import PurchasingCard, { Order as PurchasingOrder } from '@/components/Cards/Purchasing/PurchasingCard';
import PendingCard from '@/components/Cards/Purchasing/PendingCard';
import PendingApproval from '@/components/Modal/Purchasing/Approvals/PendingApproval';
import ViewDetailsModal from '@/components/Modal/Purchasing/PurchaseOrders/ViewDetailsModal';
import ReportIssueModal from '@/components/Modal/Purchasing/PurchaseOrders/ReportIssueModal';
import IssueReportedSuccessFully from '@/components/Modal/Purchasing/PurchaseOrders/IssueReportedSuccessFully';
import NewOrderModal from '@/components/Modal/Purchasing/NewOrder/NewOrderModal';
import OrderRequestSubmitted from '@/components/Modal/Purchasing/NewOrder/OrderRequestSubmitted';
import BorrowCard from '@/components/Cards/Purchasing/BorrowCard';
import NewBorrowOrderModal from '@/components/Modal/Purchasing/NewBorrowOrder/NewBorrowOrder';
import BorrowOrderSubmitted from '@/components/Modal/Purchasing/NewBorrowOrder/BorrowOrderSubmitted';

// Interface for borrowing items
interface BorrowingItem {
    id: string;
    vendor: string;
    status: 'Request Sent' | 'Delivered' | 'Borrowed';
    theme: 'gray' | 'purple' | 'green';
    expected?: string;
    dated?: string;
    active?: boolean;
}

// Interface for pending orders
interface PendingOrder {
    id: string;
    vendor: string;
    dated: string;
    items: number;
    total: number;
}


function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('purchase-orders');
    const [activeSubTab, setActiveSubTab] = useState('borrow-items');

    // Modal state management
    const [selectedOrder, setSelectedOrder] = useState<PurchasingOrder | null>(null);
    const [selectedPendingOrder, setSelectedPendingOrder] = useState<PendingOrder | null>(null);
    const [selectedBorrowingItem, setSelectedBorrowingItem] = useState<BorrowingItem | null>(null);
    const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
    const [isBorrowingDetailsModalOpen, setIsBorrowingDetailsModalOpen] = useState(false);
    const [isPendingApprovalModalOpen, setIsPendingApprovalModalOpen] = useState(false);
    const [isReportIssueModalOpen, setIsReportIssueModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isOrderRequestSubmitted, setIsOrderRequestSubmitted] = useState(false);
    const [isNewBorrowOrderModalOpen, setIsNewBorrowOrderModalOpen] = useState(false);
    const [isBorrowOrderSuccessModalOpen, setIsBorrowOrderSuccessModalOpen] = useState(false);

    const handleLogoClick = () => {
        setMenuOpen(!menuOpen);
    }

    // Modal handlers
    const handleCardClick = (order: PurchasingOrder) => {
        setSelectedOrder(order);
        setIsViewDetailsModalOpen(true);
    };

    const handleViewDetailsClose = () => {
        setIsViewDetailsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleReportIssue = () => {
        setIsViewDetailsModalOpen(false);
        setIsReportIssueModalOpen(true);
    };

    const handleReportIssueClose = () => {
        setIsReportIssueModalOpen(false);
    };

    const handleShowSuccessModal = () => {
        setIsReportIssueModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
    };

    const handleNewOrder = () => {
        console.log('handleNewOrder called, setting modal to open');
        setIsNewOrderModalOpen(true);
        console.log('isNewOrderModalOpen should now be true');
    };

    const handleNewOrderClose = () => {
        setIsNewOrderModalOpen(false);
    };

    const handleOrderRequestSubmit = () => {
        setIsOrderRequestSubmitted(true);
        setIsNewOrderModalOpen(false);
    };

    // New Borrow Order Modal handlers
    const handleNewBorrowOrder = () => {
        setIsNewBorrowOrderModalOpen(true);
    };

    const handleNewBorrowOrderClose = () => {
        setIsNewBorrowOrderModalOpen(false);
    };

    const handleBorrowOrderSubmit = () => {
        setIsNewBorrowOrderModalOpen(false);
        setIsBorrowOrderSuccessModalOpen(true);
    };

    const handleBorrowOrderSuccessClose = () => {
        setIsBorrowOrderSuccessModalOpen(false);
    };

    // Pending Approval Modal handlers
    const handlePendingOrderViewDetails = (order: PendingOrder) => {
        setSelectedPendingOrder(order);
        setIsPendingApprovalModalOpen(true);
    };

    const handlePendingApprovalClose = () => {
        setIsPendingApprovalModalOpen(false);
        setSelectedPendingOrder(null);
    };

    const handlePendingApprovalReportIssue = () => {
        setIsPendingApprovalModalOpen(false);
        setIsReportIssueModalOpen(true);
    };

    const handleBorrowingItemClick = (item: BorrowingItem) => {
        setSelectedBorrowingItem(item);
        setIsBorrowingDetailsModalOpen(true);
    };

    const handleBorrowingDetailsClose = () => {
        setIsBorrowingDetailsModalOpen(false);
        setSelectedBorrowingItem(null);
    };

    const tabs = [
        { id: 'purchase-orders', label: 'Purchase Orders' },
        { id: 'purchase-planning', label: 'Purchase Planning' },
        { id: 'approvals', label: 'Approvals' },
        { id: 'borrowing-items', label: 'Borrowing Items' }
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
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Purchases</h1>
                                <p className="text-gray-500 mt-2 sm:max-w-[60ch] md:text-xs lg:text-xs xl:text-base">
                                    Track and manage inventory purchases

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

                                    <span className="whitespace-nowrap text-xs text-[#727A90]">Last Week</span>
                                </button>



                                {/* Button 3 */}
                                <button
                                    type="button"

                                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#F1E7F8] px-3 text-sm  text-primary cursor-pointer"
                                ><svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2768_91730)">
                                            <path d="M6.58614 12.0813C6.77187 12.2672 6.9924 12.4146 7.23514 12.5152C7.47787 12.6158 7.73805 12.6676 8.0008 12.6676C8.26355 12.6676 8.52373 12.6158 8.76646 12.5152C9.0092 12.4146 9.22973 12.2672 9.41547 12.0813L11.5561 9.94067C11.6709 9.81373 11.7325 9.64752 11.7281 9.47644C11.7237 9.30536 11.6537 9.14253 11.5325 9.02165C11.4114 8.90077 11.2484 8.8311 11.0773 8.82707C10.9062 8.82304 10.7402 8.88496 10.6135 9L8.6628 10.9513L8.66747 0.666667C8.66747 0.489856 8.59723 0.320286 8.47221 0.195262C8.34718 0.0702379 8.17761 0 8.0008 0V0C7.82399 0 7.65442 0.0702379 7.5294 0.195262C7.40437 0.320286 7.33413 0.489856 7.33413 0.666667L7.32814 10.9387L5.38814 9C5.26304 8.875 5.09341 8.8048 4.91657 8.80486C4.73972 8.80493 4.57014 8.87524 4.44514 9.00033C4.32013 9.12543 4.24994 9.29506 4.25 9.4719C4.25006 9.64875 4.32037 9.81833 4.44547 9.94333L6.58614 12.0813Z" fill="#6E0AB8" />
                                            <path d="M15.3333 10.666C15.1565 10.666 14.987 10.7363 14.8619 10.8613C14.7369 10.9863 14.6667 11.1559 14.6667 11.3327V13.9993C14.6667 14.1762 14.5964 14.3457 14.4714 14.4707C14.3464 14.5958 14.1768 14.666 14 14.666H2C1.82319 14.666 1.65362 14.5958 1.5286 14.4707C1.40357 14.3457 1.33333 14.1762 1.33333 13.9993V11.3327C1.33333 11.1559 1.2631 10.9863 1.13807 10.8613C1.01305 10.7363 0.843478 10.666 0.666667 10.666C0.489856 10.666 0.320286 10.7363 0.195262 10.8613C0.0702379 10.9863 0 11.1559 0 11.3327L0 13.9993C0 14.5298 0.210714 15.0385 0.585786 15.4136C0.960859 15.7886 1.46957 15.9993 2 15.9993H14C14.5304 15.9993 15.0391 15.7886 15.4142 15.4136C15.7893 15.0385 16 14.5298 16 13.9993V11.3327C16 11.1559 15.9298 10.9863 15.8047 10.8613C15.6797 10.7363 15.5101 10.666 15.3333 10.666Z" fill="#374957" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2768_91730">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>




                                    <span className="whitespace-nowrap text-xs text-primary font-semibold">Export Report</span>
                                </button>


                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <ChartCard
                            title="Active Orders"
                            value="50"
                            amount=""
                            cardHeight="h-30"
                            change="10%"
                            color="green"
                            icon={
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="20" fill="#E6F4F5" />
                                    <g clip-path="url(#clip0_2249_44437)">
                                        <path d="M28.9275 13.3975C28.6931 13.1162 28.3996 12.89 28.0679 12.7348C27.7363 12.5797 27.3745 12.4996 27.0083 12.5H13.535L13.5 12.2075C13.4284 11.5995 13.1362 11.0389 12.6787 10.6321C12.2213 10.2252 11.6305 10.0003 11.0183 10H10.8333C10.6123 10 10.4004 10.0878 10.2441 10.2441C10.0878 10.4004 10 10.6123 10 10.8333C10 11.0543 10.0878 11.2663 10.2441 11.4226C10.4004 11.5789 10.6123 11.6667 10.8333 11.6667H11.0183C11.2224 11.6667 11.4194 11.7416 11.572 11.8773C11.7245 12.0129 11.822 12.1998 11.8458 12.4025L12.9925 22.1525C13.1115 23.1665 13.5987 24.1015 14.3616 24.78C15.1244 25.4585 16.1099 25.8334 17.1308 25.8333H25.8333C26.0543 25.8333 26.2663 25.7455 26.4226 25.5893C26.5789 25.433 26.6667 25.221 26.6667 25C26.6667 24.779 26.5789 24.567 26.4226 24.4107C26.2663 24.2545 26.0543 24.1667 25.8333 24.1667H17.1308C16.615 24.1652 16.1123 24.0043 15.6916 23.7059C15.2709 23.4075 14.9528 22.9863 14.7808 22.5H24.7142C25.6911 22.5001 26.6369 22.1569 27.3865 21.5304C28.1361 20.9039 28.6417 20.0339 28.815 19.0725L29.4692 15.4442C29.5345 15.0842 29.5198 14.7142 29.4262 14.3605C29.3326 14.0068 29.1623 13.6781 28.9275 13.3975Z" fill="#009499" />
                                        <path d="M15.8327 30.0013C16.7532 30.0013 17.4993 29.2551 17.4993 28.3346C17.4993 27.4142 16.7532 26.668 15.8327 26.668C14.9122 26.668 14.166 27.4142 14.166 28.3346C14.166 29.2551 14.9122 30.0013 15.8327 30.0013Z" fill="#009499" />
                                        <path d="M24.1667 30.0013C25.0871 30.0013 25.8333 29.2551 25.8333 28.3346C25.8333 27.4142 25.0871 26.668 24.1667 26.668C23.2462 26.668 22.5 27.4142 22.5 28.3346C22.5 29.2551 23.2462 30.0013 24.1667 30.0013Z" fill="#009499" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2249_44437">
                                            <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                                        </clipPath>
                                    </defs>
                                </svg>




                            }
                        />
                        <ChartCard
                            title="This Week's Orders"
                            value="8,502.00"
                            amount=""
                            change=""
                            cardHeight="h-30"
                            color="yellow"
                            icon={<svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" width="44" height="44" rx="22" fill="#FDF7E7" />
                                <g clip-path="url(#clip0_2249_44449)">
                                    <path d="M13.5 27.25C13.5012 28.2442 13.8967 29.1973 14.5997 29.9003C15.3027 30.6033 16.2558 30.9988 17.25 31H27.75C28.7442 30.9988 29.6973 30.6033 30.4003 29.9003C31.1033 29.1973 31.4988 28.2442 31.5 27.25V20.5H13.5V27.25ZM26.25 23.875C26.4725 23.875 26.69 23.941 26.875 24.0646C27.06 24.1882 27.2042 24.3639 27.2894 24.5695C27.3745 24.775 27.3968 25.0012 27.3534 25.2195C27.31 25.4377 27.2028 25.6382 27.0455 25.7955C26.8882 25.9528 26.6877 26.06 26.4695 26.1034C26.2512 26.1468 26.025 26.1245 25.8195 26.0394C25.6139 25.9542 25.4382 25.81 25.3146 25.625C25.191 25.44 25.125 25.2225 25.125 25C25.125 24.7016 25.2435 24.4155 25.4545 24.2045C25.6655 23.9935 25.9516 23.875 26.25 23.875ZM22.5 23.875C22.7225 23.875 22.94 23.941 23.125 24.0646C23.31 24.1882 23.4542 24.3639 23.5394 24.5695C23.6245 24.775 23.6468 25.0012 23.6034 25.2195C23.56 25.4377 23.4528 25.6382 23.2955 25.7955C23.1382 25.9528 22.9377 26.06 22.7195 26.1034C22.5012 26.1468 22.275 26.1245 22.0695 26.0394C21.8639 25.9542 21.6882 25.81 21.5646 25.625C21.441 25.44 21.375 25.2225 21.375 25C21.375 24.7016 21.4935 24.4155 21.7045 24.2045C21.9155 23.9935 22.2016 23.875 22.5 23.875ZM18.75 23.875C18.9725 23.875 19.19 23.941 19.375 24.0646C19.56 24.1882 19.7042 24.3639 19.7894 24.5695C19.8745 24.775 19.8968 25.0012 19.8534 25.2195C19.81 25.4377 19.7028 25.6382 19.5455 25.7955C19.3882 25.9528 19.1877 26.06 18.9695 26.1034C18.7512 26.1468 18.525 26.1245 18.3195 26.0394C18.1139 25.9542 17.9382 25.81 17.8146 25.625C17.691 25.44 17.625 25.2225 17.625 25C17.625 24.7016 17.7435 24.4155 17.9545 24.2045C18.1655 23.9935 18.4516 23.875 18.75 23.875Z" fill="#E7AA0B" />
                                    <path d="M27.75 14.5H27V13.75C27 13.5511 26.921 13.3603 26.7803 13.2197C26.6397 13.079 26.4489 13 26.25 13C26.0511 13 25.8603 13.079 25.7197 13.2197C25.579 13.3603 25.5 13.5511 25.5 13.75V14.5H19.5V13.75C19.5 13.5511 19.421 13.3603 19.2803 13.2197C19.1397 13.079 18.9489 13 18.75 13C18.5511 13 18.3603 13.079 18.2197 13.2197C18.079 13.3603 18 13.5511 18 13.75V14.5H17.25C16.2558 14.5012 15.3027 14.8967 14.5997 15.5997C13.8967 16.3027 13.5012 17.2558 13.5 18.25L13.5 19H31.5V18.25C31.4988 17.2558 31.1033 16.3027 30.4003 15.5997C29.6973 14.8967 28.7442 14.5012 27.75 14.5Z" fill="#E7AA0B" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2249_44449">
                                        <rect width="18" height="18" fill="white" transform="translate(13.5 13)" />
                                    </clipPath>
                                </defs>
                            </svg>



                            }
                        />
                        <ChartCard
                            title="Avg Order Values"
                            value="220,000.00"
                            amount=""
                            change=""
                            cardHeight="h-30"

                            color="purple"
                            icon={
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="20" fill="#FCEDF8" />
                                    <g clip-path="url(#clip0_2249_44463)">
                                        <path d="M23.1279 13.1925C23.1688 13.1923 23.1688 13.1923 23.2105 13.1921C23.3017 13.1917 23.3929 13.1918 23.484 13.192C23.5495 13.1918 23.6149 13.1916 23.6804 13.1914C23.858 13.1909 24.0357 13.1908 24.2133 13.1909C24.3616 13.191 24.51 13.1908 24.6583 13.1906C25.0082 13.1902 25.3582 13.1901 25.7081 13.1904C26.0691 13.1906 26.43 13.1901 26.791 13.1893C27.1009 13.1886 27.4109 13.1884 27.7209 13.1885C27.906 13.1886 28.0911 13.1885 28.2762 13.1879C28.4503 13.1874 28.6243 13.1875 28.7984 13.188C28.8622 13.1881 28.9261 13.188 28.9899 13.1877C29.0772 13.1873 29.1644 13.1876 29.2516 13.1881C29.3248 13.1881 29.3248 13.1881 29.3995 13.1881C29.6467 13.2154 29.8008 13.3312 29.9618 13.5152C30.0074 13.652 30.0062 13.7598 30.0068 13.9042C30.007 13.932 30.0072 13.9598 30.0074 13.9885C30.0079 14.0819 30.0081 14.1754 30.0084 14.2689C30.0087 14.3358 30.009 14.4027 30.0093 14.4696C30.0103 14.6896 30.0109 14.9096 30.0115 15.1296C30.0117 15.2053 30.0119 15.281 30.0121 15.3568C30.013 15.6718 30.0137 15.9867 30.0142 16.3017C30.0148 16.7532 30.0161 17.2046 30.0183 17.656C30.0198 17.9735 30.0206 18.2909 30.0208 18.6083C30.0209 18.7979 30.0214 18.9874 30.0227 19.177C30.0238 19.3554 30.0241 19.5338 30.0236 19.7122C30.0236 19.7776 30.0239 19.843 30.0246 19.9084C30.0301 20.4639 30.0301 20.4639 29.9083 20.6414C29.6837 20.8606 29.4887 20.8769 29.1891 20.8759C29.1527 20.8761 29.1163 20.8763 29.0788 20.8765C29.0021 20.8768 28.9254 20.8767 28.8487 20.8764C28.7317 20.876 28.6147 20.8772 28.4977 20.8784C28.423 20.8785 28.3482 20.8785 28.2735 20.8783C28.2213 20.879 28.2213 20.879 28.1681 20.8797C27.9522 20.8773 27.8283 20.8466 27.6571 20.7027C27.4842 20.5111 27.4569 20.3802 27.4537 20.1259C27.4534 20.0992 27.453 20.0725 27.4526 20.045C27.4513 19.9569 27.4504 19.8688 27.4494 19.7806C27.4486 19.7195 27.4478 19.6583 27.4469 19.5972C27.4448 19.4363 27.4429 19.2755 27.441 19.1146C27.439 18.9504 27.4368 18.7863 27.4347 18.6221C27.4305 18.3 27.4265 17.9779 27.4227 17.6558C27.3902 17.6884 27.3578 17.721 27.3244 17.7546C26.5531 18.5293 25.7814 19.3035 25.0092 20.0773C24.9141 20.1726 24.8189 20.268 24.7238 20.3633C24.7049 20.3823 24.6859 20.4013 24.6664 20.4208C24.3602 20.7277 24.0542 21.0349 23.7484 21.3422C23.4343 21.6578 23.1199 21.973 22.8052 22.288C22.6286 22.4648 22.4521 22.6418 22.276 22.8191C22.1101 22.9861 21.9438 23.1527 21.7772 23.319C21.7162 23.38 21.6554 23.4411 21.5947 23.5024C20.7882 24.3166 20.7882 24.3166 20.1707 24.3393C19.5707 24.3178 19.2008 23.9197 18.8088 23.518C18.7561 23.4648 18.7034 23.4117 18.6505 23.3587C18.5129 23.2201 18.3759 23.0808 18.2391 22.9414C18.0989 22.7988 17.958 22.6568 17.8171 22.5148C17.5418 22.237 17.2672 21.9584 16.993 21.6793C16.7332 21.8926 16.4986 22.1299 16.262 22.3681C16.2161 22.414 16.1703 22.46 16.1244 22.506C16.0261 22.6045 15.9279 22.7031 15.8297 22.8018C15.6744 22.9578 15.5188 23.1137 15.3633 23.2696C14.9211 23.7127 14.4792 24.156 14.0375 24.5995C13.7931 24.8448 13.5487 25.0899 13.3041 25.3349C13.1495 25.4897 12.9951 25.6447 12.8408 25.7999C12.7448 25.8964 12.6486 25.9927 12.5523 26.089C12.5078 26.1336 12.4634 26.1782 12.419 26.223C12.3583 26.2842 12.2974 26.3451 12.2364 26.406C12.2024 26.4401 12.1684 26.4742 12.1334 26.5094C11.9168 26.7056 11.7477 26.7976 11.4551 26.8093C11.2044 26.7724 11.0424 26.6049 10.8729 26.4327C10.849 26.4089 10.8252 26.385 10.8006 26.3605C10.7505 26.3103 10.7006 26.26 10.6508 26.2096C10.5745 26.1323 10.4976 26.0556 10.4207 25.9789C10.372 25.93 10.3233 25.8811 10.2747 25.8321C10.2517 25.8091 10.2287 25.7862 10.2051 25.7626C10.0375 25.592 9.99371 25.4822 9.98373 25.2462C9.98137 25.2073 9.979 25.1685 9.97656 25.1285C10.0297 24.846 10.2848 24.6259 10.4832 24.4286C10.5071 24.4046 10.5309 24.3806 10.5555 24.3558C10.6346 24.2762 10.7141 24.1968 10.7935 24.1175C10.8506 24.0601 10.9078 24.0027 10.9649 23.9453C11.1195 23.79 11.2743 23.6349 11.4293 23.4799C11.5262 23.383 11.623 23.286 11.7199 23.1889C12.058 22.8501 12.3963 22.5114 12.7348 22.173C13.0499 21.858 13.3645 21.5426 13.6789 21.2269C13.9493 20.9555 14.22 20.6843 14.491 20.4134C14.6526 20.2518 14.8141 20.0901 14.9753 19.9281C15.1269 19.7757 15.2789 19.6237 15.4312 19.4719C15.4869 19.4164 15.5424 19.3607 15.5978 19.3048C16.0153 18.884 16.3696 18.5393 16.993 18.5152C17.5964 18.541 17.9674 18.9599 18.3642 19.3633C18.4161 19.4155 18.4681 19.4678 18.5201 19.5199C18.656 19.6564 18.7913 19.7933 18.9266 19.9303C19.0651 20.0704 19.2041 20.2101 19.343 20.3498C19.6148 20.6232 19.8861 20.8972 20.1571 21.1715C20.4328 20.9461 20.6802 20.6926 20.9313 20.4407C20.9817 20.3903 21.0322 20.3398 21.0827 20.2894C21.219 20.153 21.3553 20.0165 21.4915 19.88C21.6342 19.7371 21.7769 19.5944 21.9196 19.4516C22.1896 19.1815 22.4595 18.9113 22.7293 18.6411C23.0366 18.3333 23.3441 18.0257 23.6515 17.7181C24.2837 17.0855 24.9157 16.4527 25.5477 15.8199C25.4987 15.8196 25.4987 15.8196 25.4487 15.8192C25.1401 15.8169 24.8315 15.8141 24.5229 15.8107C24.3642 15.8089 24.2056 15.8074 24.0469 15.8064C23.8937 15.8053 23.7405 15.8038 23.5873 15.8018C23.5289 15.8012 23.4706 15.8007 23.4123 15.8005C23.3303 15.8001 23.2483 15.799 23.1663 15.7977C23.1197 15.7973 23.0732 15.7969 23.0252 15.7964C22.8109 15.7715 22.6252 15.7018 22.4862 15.5294C22.4579 15.4956 22.4579 15.4956 22.4291 15.4612C22.3209 15.2923 22.3377 15.0977 22.3366 14.9036C22.3364 14.8715 22.3362 14.8395 22.336 14.8064C22.3356 14.7386 22.3353 14.6708 22.3352 14.603C22.3348 14.4999 22.3336 14.3968 22.3324 14.2936C22.3321 14.2276 22.3319 14.1615 22.3318 14.0955C22.3313 14.0649 22.3308 14.0344 22.3303 14.0029C22.3313 13.7468 22.3856 13.5663 22.5545 13.3663C22.7386 13.2129 22.8914 13.1929 23.1279 13.1925Z" fill="#E44FBA" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2249_44463">
                                            <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                                        </clipPath>
                                    </defs>
                                </svg>





                            }
                        />

                        <ChartCard
                            title="Issues"
                            value="03"
                            cardHeight="h-30"
                            color="red"
                            icon={<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" width="40" height="40" rx="20" fill="#FCE8E8" />
                                <g clip-path="url(#clip0_2249_44476)">
                                    <path d="M20.5 30C22.4778 30 24.4112 29.4135 26.0557 28.3147C27.7002 27.2159 28.9819 25.6541 29.7388 23.8268C30.4957 21.9996 30.6937 19.9889 30.3079 18.0491C29.922 16.1093 28.9696 14.3275 27.5711 12.9289C26.1725 11.5304 24.3907 10.578 22.4509 10.1922C20.5111 9.8063 18.5004 10.0043 16.6732 10.7612C14.8459 11.5181 13.2841 12.7998 12.1853 14.4443C11.0865 16.0888 10.5 18.0222 10.5 20C10.5029 22.6513 11.5574 25.1932 13.4321 27.0679C15.3068 28.9426 17.8487 29.9971 20.5 30ZM20.5 14.1667C20.7472 14.1667 20.9889 14.24 21.1945 14.3773C21.4 14.5147 21.5602 14.7099 21.6549 14.9383C21.7495 15.1667 21.7742 15.4181 21.726 15.6605C21.6778 15.903 21.5587 16.1257 21.3839 16.3006C21.2091 16.4754 20.9863 16.5944 20.7439 16.6427C20.5014 16.6909 20.2501 16.6661 20.0216 16.5715C19.7932 16.4769 19.598 16.3167 19.4607 16.1111C19.3233 15.9056 19.25 15.6639 19.25 15.4167C19.25 15.0852 19.3817 14.7672 19.6161 14.5328C19.8505 14.2984 20.1685 14.1667 20.5 14.1667ZM19.6667 18.3333H20.5C20.942 18.3333 21.366 18.5089 21.6785 18.8215C21.9911 19.1341 22.1667 19.558 22.1667 20V25C22.1667 25.221 22.0789 25.433 21.9226 25.5893C21.7663 25.7455 21.5543 25.8333 21.3333 25.8333C21.1123 25.8333 20.9004 25.7455 20.7441 25.5893C20.5878 25.433 20.5 25.221 20.5 25V20H19.6667C19.4457 20 19.2337 19.9122 19.0774 19.7559C18.9211 19.5996 18.8333 19.3877 18.8333 19.1667C18.8333 18.9457 18.9211 18.7337 19.0774 18.5774C19.2337 18.4211 19.4457 18.3333 19.6667 18.3333Z" fill="#E51B1B" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2249_44476">
                                        <rect width="20" height="20" fill="white" transform="translate(10.5 10)" />
                                    </clipPath>
                                </defs>
                            </svg>




                            }
                        />


                    </div>

                    {/* Tab Switcher with Search and Actions */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Left: Tab Switcher */}
                            <div className="flex items-center space-x-1 bg-white rounded-lg border border-[#E9EAEA] p-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`inline-flex h-8 items-center gap-2 rounded-lg px-3 text-sm cursor-pointer transition-colors ${activeTab === tab.id
                                            ? 'bg-[#F1E7F8] font-semibold text-primary'
                                            : ' bg-white font-medium text-[#727A90] '
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Right: Search and Action Buttons */}
                            <div className="flex items-center justify-between gap-3">
                                {/* Search Bar */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14 14L11.1 11.1" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-64 h-9 pl-10 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                    />
                                </div>
                                <div className='space-x-2'>

                                    {/* Upload File Button */}
                                    <button
                                        type="button"
                                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#D2B3E9] bg-white cursor-pointer px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_3899_4733)">
                                                <path d="M14.2661 6.91861C14.1455 6.88421 14.0354 6.8202 13.9459 6.73241C13.8563 6.64462 13.7902 6.53583 13.7534 6.41594C13.5492 5.72397 13.2068 5.08062 12.7468 4.5248C12.2869 3.96899 11.7189 3.51228 11.0773 3.18231C10.4358 2.85234 9.73391 2.65597 9.01425 2.60508C8.29459 2.55419 7.57208 2.64984 6.89046 2.88625C6.20883 3.12265 5.58225 3.49489 5.04864 3.98044C4.51503 4.46599 4.08548 5.05476 3.78598 5.71111C3.48648 6.36747 3.32327 7.07776 3.30621 7.79902C3.28915 8.52027 3.4186 9.23749 3.68673 9.90728C3.74833 10.0482 3.76159 10.2056 3.72445 10.3549C3.68731 10.5041 3.60186 10.6369 3.4814 10.7326C2.95055 11.1266 2.53609 11.6568 2.2819 12.267C2.0277 12.8773 1.94322 13.5449 2.0374 14.1993C2.18437 15.0839 2.64361 15.8864 3.33179 16.4613C4.01996 17.0362 4.89144 17.3454 5.78806 17.3326H9.33273C9.50954 17.3326 9.67911 17.2624 9.80414 17.1373C9.92916 17.0123 9.9994 16.8428 9.9994 16.6659C9.9994 16.4891 9.92916 16.3196 9.80414 16.1945C9.67911 16.0695 9.50954 15.9993 9.33273 15.9993H5.78806C5.21225 16.0132 4.65048 15.8205 4.20457 15.4559C3.75866 15.0913 3.45811 14.579 3.3574 14.0119C3.29353 13.5951 3.34529 13.1687 3.50705 12.7793C3.6688 12.3898 3.93434 12.0522 4.27473 11.8033C4.63228 11.5361 4.89092 11.1576 5.01002 10.7274C5.12912 10.2972 5.10194 9.83967 4.93273 9.42661C4.59817 8.54308 4.58096 7.57075 4.88406 6.67594C5.1262 5.97499 5.55979 5.35586 6.13572 4.88868C6.71165 4.4215 7.40691 4.12494 8.14273 4.03261C8.31341 4.01063 8.48531 3.9995 8.6574 3.99927C9.51943 3.99643 10.3592 4.27289 11.051 4.78727C11.7427 5.30164 12.2493 6.02625 12.4947 6.85261C12.5906 7.16752 12.7632 7.45366 12.9971 7.68525C13.231 7.91684 13.5189 8.08661 13.8347 8.17928C14.6077 8.40789 15.2924 8.86719 15.7972 9.49569C16.302 10.1242 16.6027 10.8919 16.6591 11.696C16.7155 12.5001 16.5249 13.3023 16.1128 13.9951C15.7008 14.6879 15.0869 15.2383 14.3534 15.5726C14.2448 15.6282 14.1541 15.7132 14.0915 15.8178C14.0289 15.9225 13.997 16.0427 13.9994 16.1646C13.9981 16.2749 14.0245 16.3838 14.0763 16.4812C14.128 16.5787 14.2034 16.6616 14.2955 16.7223C14.3876 16.783 14.4935 16.8196 14.6034 16.8288C14.7134 16.8379 14.8239 16.8193 14.9247 16.7746C17.6807 15.4499 19.1781 11.9653 16.8447 8.59861C16.2023 7.76055 15.2923 7.16769 14.2661 6.91861Z" fill="#6E0AB8" />
                                                <path d="M14.4716 13.1383C14.5966 13.0133 14.6668 12.8438 14.6668 12.667C14.6668 12.4902 14.5966 12.3207 14.4716 12.1956L13.4143 11.1383C13.0392 10.7634 12.5306 10.5527 12.0003 10.5527C11.4699 10.5527 10.9613 10.7634 10.5863 11.1383L9.52894 12.1956C9.4075 12.3214 9.3403 12.4898 9.34182 12.6646C9.34334 12.8394 9.41345 13.0066 9.53706 13.1302C9.66066 13.2538 9.82787 13.3239 10.0027 13.3254C10.1775 13.3269 10.3459 13.2597 10.4716 13.1383L11.3336 12.2763V17.3336C11.3336 17.5105 11.4038 17.68 11.5289 17.805C11.6539 17.9301 11.8235 18.0003 12.0003 18.0003C12.1771 18.0003 12.3467 17.9301 12.4717 17.805C12.5967 17.68 12.6669 17.5105 12.6669 17.3336V12.2763L13.5289 13.1383C13.654 13.2633 13.8235 13.3335 14.0003 13.3335C14.177 13.3335 14.3466 13.2633 14.4716 13.1383Z" fill="#6E0AB8" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3899_4733">
                                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span className="whitespace-nowrap text-xs text-primary font-semibold">Upload File</span>
                                    </button>

                                    {/* New Order Button - Hidden on borrowing-items tab */}
                                    {activeTab !== 'borrowing-items' && (
                                        <button
                                            type="button"
                                            onClick={handleNewOrder}
                                            className="inline-flex h-9 items-center gap-1 rounded-lg bg-[#6E0AB8] text-white cursor-pointer px-3 text-sm font-medium hover:bg-[#5a0894] transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3899_4760)">
                                                    <path d="M17.3333 9.33333H10.6667V2.66667C10.6667 2.48986 10.5964 2.32029 10.4714 2.19526C10.3464 2.07024 10.1768 2 10 2V2C9.82319 2 9.65362 2.07024 9.5286 2.19526C9.40357 2.32029 9.33333 2.48986 9.33333 2.66667V9.33333H2.66667C2.48986 9.33333 2.32029 9.40357 2.19526 9.5286C2.07024 9.65362 2 9.82319 2 10V10C2 10.1768 2.07024 10.3464 2.19526 10.4714C2.32029 10.5964 2.48986 10.6667 2.66667 10.6667H9.33333V17.3333C9.33333 17.5101 9.40357 17.6797 9.5286 17.8047C9.65362 17.9298 9.82319 18 10 18C10.1768 18 10.3464 17.9298 10.4714 17.8047C10.5964 17.6797 10.6667 17.5101 10.6667 17.3333V10.6667H17.3333C17.5101 10.6667 17.6797 10.5964 17.8047 10.4714C17.9298 10.3464 18 10.1768 18 10C18 9.82319 17.9298 9.65362 17.8047 9.5286C17.6797 9.40357 17.5101 9.33333 17.3333 9.33333Z" fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3899_4760">
                                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <span className="whitespace-nowrap text-xs font-semibold">New Order</span>
                                        </button>
                                    )}

                                    {/* Borrow New Items Button - Only shown on borrowing-items tab */}
                                    {activeTab === 'borrowing-items' && (
                                        <button
                                            type="button"
                                            onClick={handleNewBorrowOrder}
                                            className="inline-flex h-9 items-center gap-1 rounded-lg bg-[#6E0AB8] text-white cursor-pointer px-3 text-sm font-medium hover:bg-[#5a0894] transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3899_4760)">
                                                    <path d="M17.3333 9.33333H10.6667V2.66667C10.6667 2.48986 10.5964 2.32029 10.4714 2.19526C10.3464 2.07024 10.1768 2 10 2V2C9.82319 2 9.65362 2.07024 9.5286 2.19526C9.40357 2.32029 9.33333 2.48986 9.33333 2.66667V9.33333H2.66667C2.48986 9.33333 2.32029 9.40357 2.19526 9.5286C2.07024 9.65362 2 9.82319 2 10V10C2 10.1768 2.07024 10.3464 2.19526 10.4714C2.32029 10.5964 2.48986 10.6667 2.66667 10.6667H9.33333V17.3333C9.33333 17.5101 9.40357 17.6797 9.5286 17.8047C9.65362 17.9298 9.82319 18 10 18C10.1768 18 10.3464 17.9298 10.4714 17.8047C10.5964 17.6797 10.6667 17.5101 10.6667 17.3333V10.6667H17.3333C17.5101 10.6667 17.6797 10.5964 17.8047 10.4714C17.9298 10.3464 18 10.1768 18 10C18 9.82319 17.9298 9.65362 17.8047 9.5286C17.6797 9.40357 17.5101 9.33333 17.3333 9.33333Z" fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3899_4760">
                                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <span className="whitespace-nowrap text-xs font-semibold">Borrow New Items</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        {/* Purchase Orders Tab */}
                        {activeTab === 'purchase-orders' && (
                            <div className="bg-white rounded-lg border border-gray-200">
                                {/* Header Section */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">Purchase Orders</h2>
                                        <p className="text-gray-600 text-sm">Manage & track Orders here</p>
                                    </div>
                                    <div className='h-[1px] bg-[#E9EAEA] mb-6'></div>

                                    {/* Search and Filter Bar */}
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
                                        {/* Search Bar */}
                                        <div className="relative flex-1 max-w-full">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14 14L11.1 11.1" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="w-full h-10 pl-10 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                            />
                                        </div>

                                        {/* Status Dropdown */}
                                        <div className="relative">
                                            <button className="inline-flex items-center gap-4 px-4 py-2 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer min-w-[140px]">
                                                <span>All Status</span>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Purchase Order Cards Grid */}
                                <div className="px-6 pb-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto p-1 scroll-hidden">
                                        {([
                                            { id: 'PO-2024-001', vendor: 'Syco Food Services', status: 'Order Sent', theme: 'gray', active: true },
                                            { id: 'PO-2024-001', vendor: 'Syco Food Services', status: 'Delivered', theme: 'gray' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Issued', theme: 'yellow' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Order Sent', theme: 'gray' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Issued', theme: 'yellow' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Order Sent', theme: 'gray' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Issued', theme: 'yellow' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Order Sent', theme: 'gray' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Issued', theme: 'yellow' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Order Sent', theme: 'gray' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Confirmed', theme: 'blue' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Issued', theme: 'yellow' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'green' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'green' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'green' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'green' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'green' },
                                            { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'green' },
                                        ] as PurchasingOrder[]).map((o, i) => (

                                            <PurchasingCard
                                                key={`${o.id}-${i}`}
                                                order={{ ...o, active: i === 0 }}
                                                onCardClick={handleCardClick}
                                            />

                                        ))}
                                    </div>
                                </div>

                            </div>
                        )}
                        {activeTab === 'purchase-planning' && (
                            <div className="space-y-6 border border-[#E9EAEA] rounded-lg p-6 bg-white">
                                {/* Header Section */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" rx="20" fill="#F1E7F8" />
                                            <g clip-path="url(#clip0_21_52259)">
                                                <path d="M15.8333 19.9997C15.8334 19.1832 16.075 18.3851 16.5274 17.7055L12.3708 13.5488C10.8403 15.3498 10 17.6362 10 19.9997C10 22.3631 10.8403 24.6495 12.3708 26.4505L16.5274 22.2938C16.075 21.6143 15.8334 20.8161 15.8333 19.9997Z" fill="#6E0AB8" />
                                                <path d="M27.6293 13.5488L23.4727 17.7055C23.9253 18.385 24.1668 19.1832 24.1668 19.9997C24.1668 20.8161 23.9253 21.6143 23.4727 22.2938L27.6293 26.4505C29.1598 24.6495 30.0001 22.3631 30.0001 19.9997C30.0001 17.6362 29.1598 15.3498 27.6293 13.5488Z" fill="#6E0AB8" />
                                                <path d="M20.0001 24.1668C19.1837 24.1667 18.3855 23.9252 17.706 23.4727L13.5493 27.6293C15.3503 29.1598 17.6367 30.0001 20.0001 30.0001C22.3636 30.0001 24.65 29.1598 26.451 27.6293L22.2943 23.4727C21.6147 23.9252 20.8166 24.1667 20.0001 24.1668Z" fill="#6E0AB8" />
                                                <path d="M20.0001 15.8333C20.8166 15.8334 21.6147 16.075 22.2943 16.5274L26.451 12.3708C24.65 10.8403 22.3636 10 20.0001 10C17.6367 10 15.3503 10.8403 13.5493 12.3708L17.706 16.5274C18.3855 16.075 19.1837 15.8334 20.0001 15.8333Z" fill="#6E0AB8" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_21_52259">
                                                    <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-800">Purchase Planning</h1>
                                        <p className="text-gray-500 text-sm">AI-powered recommendations for optimal purchasing.</p>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="border-t border-[#E9EAEA] my-6"></div>

                                {/* Content Cards */}
                                <div className="flex flex-col lg:flex-row gap-4 justify-start">
                                    {/* Recommended Orders Card */}
                                    <div className="bg-white rounded-xl w-md border border-[#E9EAEA] overflow-hidden">
                                        <div className="bg-[#F1E7F8] px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-md font-bold text-gray-800">Recommended Orders (10)</h2>
                                                <button className="text-gray-600 hover:text-gray-800">
                                                    <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2C14 0.895431 14.8954 0 16 0C17.1046 0 18 0.895431 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2ZM7 2C7 0.895431 7.89543 0 9 0C10.1046 0 11 0.895431 11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2ZM0 2C0 0.895431 0.89543 0 2 0C3.10457 0 4 0.895431 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2Z" fill="#727A90" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 space-y-3">
                                            {[
                                                { name: 'Fresh Tomatoes' },
                                                { name: 'Ground Beef', tag: '(High Demand)' },
                                                { name: 'Savory Beef Delight' },
                                                { name: 'Crispy Chicken Crunch' },
                                                { name: 'Tasty Turkey Treats', priority: 'High Priority' },
                                                { name: 'Juicy Chicken Fiesta' }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <span className="text-gray-400 text-sm font-medium">-</span>
                                                    <span className="text-gray-700 text-sm font-medium">{item.name}</span>
                                                    {item.tag && <span className="text-sm text-gray-500 font-medium">{item.tag}</span>}
                                                    {item.priority && <span className="bg-[#E6F4F5] text-[#009499] text-xs px-2 py-1 rounded-md">{item.priority}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Alerts Card */}
                                    <div className="bg-white  w-md border border-[#E9EAEA] rounded-xl  overflow-hidden">
                                        <div className="bg-[#FDF7E7] px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-md font-bold text-gray-800">Price Alerts (10)</h2>
                                                <button className="text-gray-600 hover:text-gray-800">
                                                    <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2C14 0.895431 14.8954 0 16 0C17.1046 0 18 0.895431 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2ZM7 2C7 0.895431 7.89543 0 9 0C10.1046 0 11 0.895431 11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2ZM0 2C0 0.895431 0.89543 0 2 0C3.10457 0 4 0.895431 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2Z" fill="#727A90" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 space-y-3">
                                            {[
                                                { name: 'Fresh Tomatoes' },
                                                { name: 'Ground Beef', tag: '(High Demand)' },
                                                { name: 'Savory Beef Delight' },
                                                { name: 'Crispy Chicken Crunch' },
                                                { name: 'Tasty Turkey Treats' },
                                                { name: 'Juicy Chicken Fiesta' }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <span className="text-gray-400 text-sm font-medium">-</span>
                                                    <span className="text-gray-700 text-sm font-medium">{item.name}</span>
                                                    {item.tag && <span className="text-sm text-gray-500 font-medium">{item.tag}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Borrowing Items Tab */}
                        {activeTab === 'borrowing-items' && (
                            <div className="space-y-6 border border-[#E9EAEA] rounded-lg p-6 bg-white">
                                {/* Header Section */}
                                <div className="flex items-center gap-3 mb-6">

                                    <div>
                                        <h1 className="text-lg font-bold text-gray-800">Borrowing Items</h1>
                                        <p className="text-gray-500 text-sm">You can manage the borrowing items here.</p>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="border-t border-[#E9EAEA] my-6"></div>

                                {/* Sub Tabs */}
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8">
                                        <button
                                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeSubTab === 'borrow-items'
                                                    ? 'border-[#6E0AB8] text-[#6E0AB8]'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 '
                                                }`}
                                            onClick={() => setActiveSubTab('borrow-items')}
                                        >
                                            Borrow Items
                                        </button>
                                        <button
                                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeSubTab === 'pending-approvals'
                                                    ? 'border-[#6E0AB8] text-[#6E0AB8]'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 '
                                                }`}
                                            onClick={() => setActiveSubTab('pending-approvals')}
                                        >
                                            Pending Approvals
                                        </button>
                                    </nav>
                                </div>

                                {/* Sub Tab Content */}
                                {activeSubTab === 'borrow-items' && (
                                    <div className="bg-white ">
                                        {/* Header Section */}
                                        <div className="py-6">
                                            <div className="mb-4">
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">Purchase Orders</h2>
                                                <p className="text-gray-600 text-sm">Manage & track Orders here</p>
                                            </div>
                                            <div className='h-[1px] bg-[#E9EAEA] mb-6'></div>

                                            {/* Search and Filter Bar */}
                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
                                                {/* Search Bar */}
                                                <div className="relative flex-1 max-w-full">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M14 14L11.1 11.1" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="w-full h-10 pl-10 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                                    />
                                                </div>

                                                {/* Status Dropdown */}
                                                <div className="relative">
                                                    <button className="inline-flex items-center gap-4 px-4 py-2 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer min-w-[140px]">
                                                        <span>All Status</span>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
                                                        </svg>

                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Purchase Order Cards Grid */}
                                        <div className="pb-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto p-1 scroll-hidden">
                                                {([
                                                    { id: 'PO-2024-001', vendor: 'Syco Food Services', status: 'Request Sent', theme: 'gray', active: true },
                                                    { id: 'PO-2024-001', vendor: 'Syco Food Services', status: 'Request Sent', theme: 'gray' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Request Sent', theme: 'gray' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Request Sent', theme: 'gray' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Request Sent', theme: 'gray' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Request Sent', theme: 'gray' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Delivered', theme: 'purple' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Borrowed', theme: 'green' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Borrowed', theme: 'green' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Borrowed', theme: 'green' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Borrowed', theme: 'green' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Borrowed', theme: 'green' },
                                                    { id: 'PO-2024-001', vendor: 'US Foods', status: 'Borrowed', theme: 'green' },
                                                ] as BorrowingItem[]).map((item, i) => (

                                                    <BorrowCard
                                                        key={`${item.id}-${i}`}
                                                        order={{ ...item, active: i === 0 }}
                                                        onCardClick={handleBorrowingItemClick}
                                                    />

                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                )}

                                {activeSubTab === 'pending-approvals' && (
                                    <div className="py-6">


                                        {/* Search and Filter Bar */}
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
                                            {/* Search Bar */}
                                            <div className="relative flex-1 max-w-full">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14 14L11.1 11.1" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="w-full h-10 pl-10 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                                />
                                            </div>

                                            {/* Status Dropdown */}
                                            <div className="relative">
                                                <button className="inline-flex items-center gap-4 px-4 py-2 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer min-w-[140px]">
                                                    <span>All Status</span>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </div>
                                        <div className="border-t border-[#E9EAEA] my-6"></div>

                                        {/* Pending Orders Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { id: 'Order 25-254', vendor: 'Syco Food Services', dated: '01/02/2025', items: 15, total: 590.00 },
                                                { id: 'Order 25-255', vendor: 'US Foods', dated: '01/02/2025', items: 12, total: 445.00 },
                                                { id: 'Order 25-256', vendor: 'Sysco Corporation', dated: '01/02/2025', items: 18, total: 720.00 },
                                                { id: 'Order 25-257', vendor: 'Gordon Food Service', dated: '01/02/2025', items: 8, total: 320.00 },
                                                { id: 'Order 25-258', vendor: 'Performance Food Group', dated: '01/02/2025', items: 22, total: 890.00 },
                                                { id: 'Order 25-259', vendor: 'Aramark', dated: '01/02/2025', items: 14, total: 550.00 },
                                                { id: 'Order 25-260', vendor: 'Compass Group', dated: '01/02/2025', items: 16, total: 680.00 },
                                                { id: 'Order 25-261', vendor: 'Sodexo', dated: '01/02/2025', items: 11, total: 420.00 },
                                                { id: 'Order 25-262', vendor: 'Delaware North', dated: '01/02/2025', items: 9, total: 380.00 }
                                            ].map((order, index) => (
                                                <PendingCard
                                                    key={index}
                                                    order={order}
                                                    onViewDetails={handlePendingOrderViewDetails}
                                                                                                onApprove={(order: PendingOrder) => console.log('Approve:', order)}
                                            onReject={(order: PendingOrder) => console.log('Reject:', order)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Approvals Tab */}
                        {activeTab === 'approvals' && (
                            <div className="space-y-6 border border-[#E9EAEA] rounded-lg p-6 bg-white">
                                {/* Header Section */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" rx="20" fill="#F1E7F8" />
                                            <path d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM18 25L13 20L14.41 18.59L18 22.17L25.59 14.58L27 16L18 25Z" fill="#6E0AB8" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-800">Pending Approvals</h1>
                                        <p className="text-gray-500 text-sm">Orders requiring management approval.</p>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="border-t border-[#E9EAEA] my-6"></div>

                                {/* Pending Orders Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        { id: 'Order 25-254', vendor: 'Syco Food Services', dated: '01/02/2025', items: 15, total: 590.00 },
                                        { id: 'Order 25-255', vendor: 'US Foods', dated: '01/02/2025', items: 12, total: 445.00 },
                                        { id: 'Order 25-256', vendor: 'Sysco Corporation', dated: '01/02/2025', items: 18, total: 720.00 },
                                        { id: 'Order 25-257', vendor: 'Gordon Food Service', dated: '01/02/2025', items: 8, total: 320.00 },
                                        { id: 'Order 25-258', vendor: 'Performance Food Group', dated: '01/02/2025', items: 22, total: 890.00 },
                                        { id: 'Order 25-259', vendor: 'Aramark', dated: '01/02/2025', items: 14, total: 550.00 },
                                        { id: 'Order 25-260', vendor: 'Compass Group', dated: '01/02/2025', items: 16, total: 680.00 },
                                        { id: 'Order 25-261', vendor: 'Sodexo', dated: '01/02/2025', items: 11, total: 420.00 },
                                        { id: 'Order 25-262', vendor: 'Delaware North', dated: '01/02/2025', items: 9, total: 380.00 }
                                    ].map((order, index) => (
                                        <PendingCard
                                            key={index}
                                            order={order}
                                            onViewDetails={handlePendingOrderViewDetails}
                                            onApprove={(order: PendingOrder) => console.log('Approve:', order)}
                                            onReject={(order: PendingOrder) => console.log('Reject:', order)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}




                    </div>



                </main>

            </div>

            {/* Modals */}
            {selectedOrder && (
                <ViewDetailsModal
                    isOpen={isViewDetailsModalOpen}
                    onClose={handleViewDetailsClose}
                    order={{
                        id: selectedOrder.id,
                        status: selectedOrder.status,
                        vendor: selectedOrder.vendor,
                        expectedDelivery: selectedOrder.expected || '01/02/2025',
                        dated: selectedOrder.dated || '11:00:24 AM',
                        lineItems: selectedOrder.lineItems || [
                            { productName: 'Chicken Breast - 40lb Case', quantity: 8, unitPrice: 25, totalPrice: 200 },
                            { productName: 'Salmon Fillets - 30lb Case', quantity: 6, unitPrice: 30, totalPrice: 180 },
                            { productName: 'Ground Beef - 50lb Case', quantity: 10, unitPrice: 20, totalPrice: 200 },
                            { productName: 'Pork Chops - 40lb Case', quantity: 5, unitPrice: 35, totalPrice: 175 }
                        ],
                        totalAmount: selectedOrder.lineItems ?
                            selectedOrder.lineItems.reduce((sum, item) => sum + item.totalPrice, 0) :
                            755
                    }}
                    onReportIssue={handleReportIssue}
                />
            )}

            <ReportIssueModal
                isOpen={isReportIssueModalOpen}
                onClose={handleReportIssueClose}
                onShowSuccessModal={handleShowSuccessModal}
            />

            <IssueReportedSuccessFully
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessModalClose}
            />

            <NewOrderModal
                isOpen={isNewOrderModalOpen}
                onClose={handleNewOrderClose}
                onOrderSubmit={handleOrderRequestSubmit}
            />

            <OrderRequestSubmitted
                isOpen={isOrderRequestSubmitted}
                onClose={() => setIsOrderRequestSubmitted(false)}
            />

            {/* Borrow Order Success Modal */}
            <BorrowOrderSubmitted
                isOpen={isBorrowOrderSuccessModalOpen}
                onClose={handleBorrowOrderSuccessClose}
            />

            {/* Pending Approval Modal */}
            <PendingApproval
                isOpen={isPendingApprovalModalOpen}
                onClose={handlePendingApprovalClose}
                onReportIssue={handlePendingApprovalReportIssue}
                order={selectedPendingOrder ? {
                    id: selectedPendingOrder.id,
                    status: 'Pending',
                    vendor: selectedPendingOrder.vendor,
                    expectedDelivery: '01/02/2025',
                    dated: selectedPendingOrder.dated,
                    lineItems: [
                        { productName: 'Chicken Breast - 40lb Case', quantity: 8, unitPrice: 25, totalPrice: 200 },
                        { productName: 'Salmon Fillets - 30lb Case', quantity: 6, unitPrice: 30, totalPrice: 180 },
                        { productName: 'Ground Beef - 50lb Case', quantity: 10, unitPrice: 20, totalPrice: 200 },
                        { productName: 'Pork Chops - 40lb Case', quantity: 5, unitPrice: 35, totalPrice: 175 }
                    ],
                    totalAmount: selectedPendingOrder.total
                } : null}
            />

            {/* Borrowing Item Details Modal */}
            {selectedBorrowingItem && (
                <ViewDetailsModal
                    isOpen={isBorrowingDetailsModalOpen}
                    onClose={handleBorrowingDetailsClose}
                    hideActionButtons={true}
                    modalHeight="80vh"
                    order={{
                        id: selectedBorrowingItem.id,
                        status: selectedBorrowingItem.status === 'Delivered' ? 'Delivered-Borrowing' : selectedBorrowingItem.status,
                        vendor: selectedBorrowingItem.vendor,
                        expectedDelivery: selectedBorrowingItem.expected || '01/02/2025',
                        dated: selectedBorrowingItem.dated || '11:00:24 AM',
                        lineItems: [
                            { productName: 'Chicken Breast - 40lb Case', quantity: 8, unitPrice: 25, totalPrice: 200 },
                            { productName: 'Salmon Fillets - 30lb Case', quantity: 6, unitPrice: 30, totalPrice: 180 },
                            { productName: 'Ground Beef - 50lb Case', quantity: 10, unitPrice: 20, totalPrice: 200 },
                            { productName: 'Pork Chops - 40lb Case', quantity: 5, unitPrice: 35, totalPrice: 175 }
                        ],
                        totalAmount: 755
                    }}
                    onReportIssue={handleReportIssue}
                />
            )}

            {/* New Borrow Order Modal */}
            <NewBorrowOrderModal
                isOpen={isNewBorrowOrderModalOpen}
                onClose={handleNewBorrowOrderClose}
                onOrderSubmit={handleBorrowOrderSubmit}
            />
        </div>
    )
}

export default Page;
