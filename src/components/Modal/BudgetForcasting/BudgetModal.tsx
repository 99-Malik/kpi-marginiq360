'use client';

import React, { useState, useEffect } from 'react';
import { DatePicker } from '../InventoryCounts/Calendar/DatePicker';

interface BudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    editData?: {
        id: string;
        category: string;
        actual: string;
        difference: string;
        variance: string;
        status: string;
    };
}

const BudgetModal: React.FC<BudgetModalProps> = ({ isOpen, onClose, mode, editData }) => {
    const [budgetName, setBudgetName] = useState('August Budget');
    const [startDate, setStartDate] = useState('26 October 2024');
    const [endDate, setEndDate] = useState('26 October 2025');
    const [period, setPeriod] = useState('Monthly');
    const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const periodOptions = ['Weekly', 'Monthly', 'Yearly'];

    const filteredOptions = periodOptions.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset form when modal opens/closes or mode changes
    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && editData) {
                // Pre-fill form with edit data
                setBudgetName(editData.category);
                setStartDate('26 October 2024'); // You can add these fields to editData if needed
                setEndDate('26 October 2025');
                setPeriod('Monthly');
            } else {
                // Reset form for create mode
                setBudgetName('August Budget');
                setStartDate('26 October 2024');
                setEndDate('26 October 2025');
                setPeriod('Monthly');
            }
        }
    }, [isOpen, mode, editData]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (mode === 'create') {
            // Handle create budget logic here
            console.log('Creating new budget:', { budgetName, startDate, endDate, period });
        } else {
            // Handle edit budget logic here
            console.log('Editing budget:', { id: editData?.id, budgetName, startDate, endDate, period });
        }
        onClose();
    };

    return (
        <>
            <style jsx>{`
                 .custom-scrollbar::-webkit-scrollbar {
                     width: 4px;
                 }
                 .custom-scrollbar::-webkit-scrollbar-track {
                     background: #f3f4f6;
                     border-radius: 2px;
                 }
                 .custom-scrollbar::-webkit-scrollbar-thumb {
                     background: #6E0AB8;
                     border-radius: 2px;
                 }
                 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                     background: #5a0a9a;
                 }
             `}</style>
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className={`bg-white rounded-xl shadow-lg w-full max-w-md mx-4 transition-all duration-200 ${isPeriodDropdownOpen ? 'min-h-[500px]' : ''}`}>
                    {/* Header */}
                    <div className="flex justify-between items-center p-3 border-b border-gray-200">
                        <h2 className="text-md font-bold text-gray-900">
                            {mode === 'create' ? 'Create New Budget' : 'Edit Budget'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                                <g clip-path="url(#clip0_3627_24348)">
                                    <path d="M16.9425 15.9996L23.8045 9.13762C23.926 9.01189 23.9932 8.84348 23.9916 8.66869C23.9901 8.49389 23.92 8.32668 23.7964 8.20307C23.6728 8.07947 23.5056 8.00936 23.3308 8.00784C23.156 8.00632 22.9876 8.07352 22.8619 8.19495L15.9999 15.057L9.13786 8.19495C9.01212 8.07352 8.84372 8.00632 8.66892 8.00784C8.49413 8.00936 8.32692 8.07947 8.20331 8.20307C8.07971 8.32668 8.00959 8.49389 8.00807 8.66869C8.00656 8.84348 8.07375 9.01189 8.19519 9.13762L15.0572 15.9996L8.19519 22.8616C8.07021 22.9866 8 23.1562 8 23.333C8 23.5097 8.07021 23.6793 8.19519 23.8043C8.32021 23.9293 8.48975 23.9995 8.66652 23.9995C8.8433 23.9995 9.01284 23.9293 9.13786 23.8043L15.9999 16.9423L22.8619 23.8043C22.9869 23.9293 23.1564 23.9995 23.3332 23.9995C23.51 23.9995 23.6795 23.9293 23.8045 23.8043C23.9295 23.6793 23.9997 23.5097 23.9997 23.333C23.9997 23.1562 23.9295 22.9866 23.8045 22.8616L16.9425 15.9996Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3627_24348">
                                        <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="p-6 space-y-4">
                        {/* Budget Name */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                Budget Name
                            </label>
                            <input
                                type="text"
                                value={budgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                                className="w-full px-2 py-2 rounded-lg border border-[#E9EAEA] bg-white text-xs text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                            />
                        </div>

                        {/* Start Date & End Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[#727A90] mb-2">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <DatePicker />

                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#727A90] mb-2">
                                    End Date
                                </label>
                                <div className="relative">
                                    <DatePicker />

                                </div>
                            </div>
                        </div>

                        {/* Period */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                Period
                            </label>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                                    className={[
                                        "relative w-full h-11 px-4 pr-10 rounded-lg text-xs text-[#727A90] text-left",
                                        "border border-gray-200 focus:outline-none",
                                        // keep ring width constant; only change color
                                        "ring-1",
                                        isPeriodDropdownOpen ? "outline-none focus:ring- focus:ring-primary" : "ring-transparent",
                                    ].join(" ")}
                                >
                                    {period}

                                    {/* Chevron container — anchored to the same spot always */}
                                    <span
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center"
                                        aria-hidden
                                    >
                                        {isPeriodDropdownOpen ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.27325 12.6666H13.7266C13.8584 12.666 13.9872 12.6264 14.0965 12.5527C14.2058 12.479 14.2908 12.3745 14.3408 12.2525C14.3907 12.1304 14.4034 11.9964 14.3771 11.8671C14.3508 11.7379 14.2869 11.6194 14.1932 11.5266L10.4732 7.80657C10.4113 7.74409 10.3375 7.69449 10.2563 7.66065C10.1751 7.6268 10.0879 7.60937 9.99991 7.60938C9.91191 7.60937 9.82477 7.6268 9.74353 7.66065C9.66229 7.69449 9.58856 7.74409 9.52658 7.80657L5.80658 11.5266C5.71297 11.6194 5.64898 11.7379 5.62273 11.8671C5.59647 11.9964 5.60912 12.1304 5.65907 12.2525C5.70902 12.3745 5.79403 12.479 5.90335 12.5527C6.01267 12.6264 6.1414 12.666 6.27325 12.6666Z"
                                                    fill="#727A90" />
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z"
                                                    fill="#727A90" />
                                            </svg>
                                        )}
                                    </span>
                                </button>

                                {isPeriodDropdownOpen && (
                                    <div className="relative z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg" style={{ zIndex: 10 }}>
                                        {/* Search Bar */}
                                        <div className="p-3 border-b border-gray-200">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full pl-8 pr-3 py-2  rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                                />
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_3627_24397)">
                                                            <path d="M17.8045 16.8628L13.8252 12.8835C14.9096 11.5572 15.4428 9.86489 15.3144 8.15654C15.1861 6.44819 14.406 4.85452 13.1356 3.70518C11.8652 2.55584 10.2016 1.93876 8.48895 1.98158C6.77632 2.0244 5.14566 2.72385 3.93426 3.93524C2.72287 5.14663 2.02343 6.77729 1.9806 8.48993C1.93778 10.2026 2.55486 11.8661 3.7042 13.1366C4.85354 14.407 6.44721 15.187 8.15556 15.3154C9.86392 15.4438 11.5563 14.9106 12.8825 13.8262L16.8619 17.8055C16.9876 17.9269 17.156 17.9941 17.3308 17.9926C17.5056 17.9911 17.6728 17.921 17.7964 17.7974C17.92 17.6738 17.9901 17.5066 17.9916 17.3318C17.9932 17.157 17.926 16.9886 17.8045 16.8628ZM8.66652 14.0008C7.61169 14.0008 6.58054 13.688 5.70348 13.102C4.82642 12.516 4.14283 11.683 3.73916 10.7085C3.3355 9.73394 3.22988 8.66158 3.43567 7.62702C3.64145 6.59245 4.14941 5.64214 4.89529 4.89626C5.64117 4.15038 6.59147 3.64243 7.62604 3.43664C8.6606 3.23085 9.73296 3.33647 10.7075 3.74014C11.682 4.14381 12.515 4.82739 13.101 5.70446C13.6871 6.58152 13.9999 7.61266 13.9999 8.6675C13.9983 10.0815 13.4359 11.4371 12.436 12.437C11.4362 13.4368 10.0805 13.9992 8.66652 14.0008Z" fill="#727A90" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3627_24397">
                                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </div>
                                            </div>
                                        </div>

                                        {/* Options - Fixed height for 3 rows */}
                                        <div className="max-h-[120px] ">
                                            <div className="py-1">
                                                {filteredOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => {
                                                            setPeriod(option);
                                                            setIsPeriodDropdownOpen(false);
                                                            setSearchTerm('');
                                                        }}
                                                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${option === period ? 'bg-purple-50 text-primary text-xs' : 'text-gray-700 text-xs'}`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center p-6 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-1 px-4 py-2 text-xs border border-gray-200 rounded-lg text-gray-600"
                        >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3627_24423)">
                                    <path d="M8.94252 7.99962L15.8045 1.13762C15.926 1.01189 15.9932 0.843484 15.9916 0.668686C15.9901 0.493888 15.92 0.32668 15.7964 0.203075C15.6728 0.0794693 15.5056 0.00935665 15.3308 0.0078377C15.156 0.00631876 14.9876 0.073515 14.8619 0.194954L7.99986 7.05695L1.13786 0.194954C1.01212 0.073515 0.843721 0.00631876 0.668923 0.0078377C0.494126 0.00935665 0.326917 0.0794693 0.203312 0.203075C0.0797065 0.32668 0.00959389 0.493888 0.00807494 0.668686C0.00655599 0.843484 0.0737523 1.01189 0.195191 1.13762L7.05719 7.99962L0.195191 14.8616C0.0702103 14.9866 0 15.1562 0 15.333C0 15.5097 0.0702103 15.6793 0.195191 15.8043C0.320209 15.9293 0.489748 15.9995 0.666524 15.9995C0.8433 15.9995 1.01284 15.9293 1.13786 15.8043L7.99986 8.94229L14.8619 15.8043C14.9869 15.9293 15.1564 15.9995 15.3332 15.9995C15.51 15.9995 15.6795 15.9293 15.8045 15.8043C15.9295 15.6793 15.9997 15.5097 15.9997 15.333C15.9997 15.1562 15.9295 14.9866 15.8045 14.8616L8.94252 7.99962Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3627_24423">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Discard
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 text-xs px-4 py-2 bg-primary text-white rounded-lg"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {mode === 'create' ? 'Create Budget' : 'Update Budget'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BudgetModal;
