'use client';

import React, { useState, useEffect } from 'react';
import ProductDropdown from '@/components/DropDown/ProductDropDown';
import { DatePicker } from '../InventoryCounts/Calendar/DatePicker';

interface WasteEvent {
    title: string;
    date: string;
    quantity: string;
    status: string[];
    reason: string;
}

interface WasteManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: WasteFormData) => void;
    mode?: 'create' | 'edit';
    editingEvent?: WasteEvent | null;
    showMarkAsIssued?: boolean;
    onMarkAsIssued?: () => void;
}

interface WasteFormData {
    eventName: string;
    item: string;
    quantityKg: string;
    reportDate: string;
    category: string;
    description: string;
}

// Sample data for dropdowns
const categoryOptions = ['Supplies', 'Ingredients', 'Equipment', 'Packaging', 'Other'];
const itemOptions = ['Cucumber', 'Lettuce', 'Tomato', 'Carrot', 'Onion', 'Potato', 'Chicken', 'Beef', 'Fish'];

export default function WasteManagementModal({ isOpen, onClose, onSubmit, mode = 'create', editingEvent, showMarkAsIssued = false, onMarkAsIssued }: WasteManagementModalProps) {
    const [formData, setFormData] = useState<WasteFormData>({
        eventName: mode === 'edit' && editingEvent ? editingEvent.title : 'Cucumber Waste',
        item: mode === 'edit' && editingEvent ? editingEvent.title.replace(' Waste Event', '') : 'Cucumber',
        quantityKg: mode === 'edit' && editingEvent ? editingEvent.quantity.replace(' Kg', '') : '30',
        reportDate: mode === 'edit' && editingEvent ? editingEvent.date : '26 October 2024',
        category: 'Supplies',
        description: mode === 'edit' && editingEvent ? editingEvent.reason : ''
    });

    const handleInputChange = (field: keyof WasteFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Update form data when mode or editing event changes
    useEffect(() => {
        if (mode === 'edit' && editingEvent) {
            setFormData({
                eventName: editingEvent.title,
                item: editingEvent.title.replace(' Waste Event', ''),
                quantityKg: editingEvent.quantity.replace(' Kg', ''),
                reportDate: editingEvent.date,
                category: 'Supplies',
                description: editingEvent.reason
            });
        } else {
            setFormData({
                eventName: 'Cucumber Waste',
                item: 'Cucumber',
                quantityKg: '30',
                reportDate: '26 October 2024',
                category: 'Supplies',
                description: ''
            });
        }
    }, [mode, editingEvent]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {mode === 'edit' ? 'Edit Waste Event' : 'Report Waste Event'}
                    </h2>
                    <div className="flex items-center gap-3">
                        {showMarkAsIssued && onMarkAsIssued && (
                            <button
                                onClick={onMarkAsIssued}
                                className="flex items-center gap-1 px-3 py-1 bg-[#FDF7E7] text-[#D29B0A] text-xs font-semibold rounded-xl border border-[#FCE8E8] hover:bg-[#FCE8E8] transition-colors"
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2249_46138)">
                                        <path d="M6 7.50036C5.86739 7.50036 5.74022 7.44768 5.64645 7.35392C5.55268 7.26015 5.5 7.13297 5.5 7.00036V3.00036C5.5 2.86775 5.55268 2.74058 5.64645 2.64681C5.74022 2.55304 5.86739 2.50036 6 2.50036C6.13261 2.50036 6.25979 2.55304 6.35356 2.64681C6.44732 2.74058 6.5 2.86775 6.5 3.00036V7.00036C6.5 7.13297 6.44732 7.26015 6.35356 7.35392C6.25979 7.44768 6.13261 7.50036 6 7.50036ZM6.3965 11.8804C7.4765 11.4464 11 9.73986 11 6.02186V3.43636C11.0006 2.91087 10.8353 2.3986 10.5277 1.97252C10.2201 1.54644 9.78595 1.22828 9.287 1.06336L6.1575 0.0258631C6.05533 -0.00862103 5.94467 -0.00862103 5.8425 0.0258631L2.713 1.06336C2.21406 1.22828 1.77988 1.54644 1.4723 1.97252C1.16473 2.3986 0.999447 2.91087 1 3.43636V6.02186C1 9.30286 4.5025 11.3099 5.5765 11.8469C5.71234 11.9117 5.85418 11.9631 6 12.0004C6.13558 11.9726 6.26831 11.9325 6.3965 11.8804ZM8.972 2.01236C9.27127 2.11157 9.53166 2.30255 9.7162 2.55818C9.90074 2.81381 10 3.12108 10 3.43636V6.02186C10 9.11336 6.9565 10.5774 6.0235 10.9524C5.0795 10.4804 2 8.72986 2 6.02186V3.43636C1.99996 3.12108 2.09926 2.81381 2.2838 2.55818C2.46834 2.30255 2.72874 2.11157 3.028 2.01236L6 1.02736L8.972 2.01236ZM6 8.50036C5.90111 8.50036 5.80444 8.52969 5.72222 8.58463C5.63999 8.63957 5.57591 8.71766 5.53806 8.80902C5.50022 8.90038 5.49032 9.00092 5.50961 9.09791C5.5289 9.1949 5.57652 9.28399 5.64645 9.35392C5.71637 9.42384 5.80547 9.47146 5.90246 9.49076C5.99945 9.51005 6.09998 9.50015 6.19134 9.4623C6.28271 9.42446 6.3608 9.36037 6.41574 9.27815C6.47068 9.19592 6.5 9.09925 6.5 9.00036C6.5 8.86775 6.44732 8.74058 6.35356 8.64681C6.25979 8.55304 6.13261 8.50036 6 8.50036Z" fill="#D29B0A"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2249_46138">
                                            <rect width="12" height="12" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                Mark As Issued
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                                <g clip-path="url(#clip0_3899_26560)">
                                    <path d="M16.9425 15.9996L23.8045 9.13762C23.926 9.01189 23.9932 8.84348 23.9916 8.66869C23.9901 8.49389 23.92 8.32668 23.7964 8.20307C23.6728 8.07947 23.5056 8.00936 23.3308 8.00784C23.156 8.00632 22.9876 8.07352 22.8619 8.19495L15.9999 15.057L9.13786 8.19495C9.01212 8.07352 8.84372 8.00632 8.66892 8.00784C8.49413 8.00936 8.32692 8.07947 8.20331 8.20307C8.07971 8.32668 8.00959 8.49389 8.00807 8.66869C8.00656 8.84348 8.07375 9.01189 8.19519 9.13762L15.0572 15.9996L8.19519 22.8616C8.07021 22.9866 8 23.1562 8 23.333C8 23.5097 8.07021 23.6793 8.19519 23.8043C8.32021 23.9293 8.48975 23.9995 8.66652 23.9995C8.8433 23.9995 9.01284 23.9293 9.13786 23.8043L15.9999 16.9423L22.8619 23.8043C22.9869 23.9293 23.1564 23.9995 23.3332 23.9995C23.51 23.9995 23.6795 23.9293 23.8045 23.8043C23.9295 23.6793 23.9997 23.5097 23.9997 23.333C23.9997 23.1562 23.9295 22.9866 23.8045 22.8616L16.9425 15.9996Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3899_26560">
                                        <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="py-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)] scroll-hidden">
                    {/* Event Name */}
                    <div className='px-6 space-y-4'>
                        <div>
                            <label className="block text-sm font-medium text-[#727A90] mb-2">
                                Event Name
                            </label>
                            <input
                                type="text"
                                value={formData.eventName}
                                onChange={(e) => handleInputChange('eventName', e.target.value)}
                                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                placeholder="Enter event name"
                            />
                        </div>

                        {/* Item & Quantity Kg - Side by side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#727A90] mb-2">
                                    Item
                                </label>
                                <input
                                    type="text"
                                    value={formData.item}
                                    onChange={(e) => handleInputChange('item', e.target.value)}
                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="Enter item"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#727A90] mb-2">
                                    Quantity Kg
                                </label>
                                <input
                                    type="text"
                                    value={formData.quantityKg}
                                    onChange={(e) => handleInputChange('quantityKg', e.target.value)}
                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="Enter quantity"
                                />
                            </div>
                        </div>

                        {/* Report Date */}
                        <div>
                            <label className="block text-sm font-medium text-[#727A90] mb-2">
                                Report Date
                            </label>
                            <DatePicker />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-[#727A90] mb-2">
                                Category
                            </label>
                            <ProductDropdown
                                options={categoryOptions}
                                value={formData.category}
                                onChange={(value) => handleInputChange('category', value)}
                                buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-[#727A90] mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                                placeholder="Write here"
                            />
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className=" px-6 flex gap-3 pt-6 border-t border-gray-200 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-[#727A90] text-md hover:bg-gray-50 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3899_26535)">
                                    <path d="M10.9425 9.99962L17.8045 3.13762C17.926 3.01189 17.9932 2.84348 17.9916 2.66869C17.9901 2.49389 17.92 2.32668 17.7964 2.20307C17.6728 2.07947 17.5056 2.00936 17.3308 2.00784C17.156 2.00632 16.9876 2.07352 16.8619 2.19495L9.99986 9.05695L3.13786 2.19495C3.01212 2.07352 2.84372 2.00632 2.66892 2.00784C2.49413 2.00936 2.32692 2.07947 2.20331 2.20307C2.07971 2.32668 2.00959 2.49389 2.00807 2.66869C2.00656 2.84348 2.07375 3.01189 2.19519 3.13762L9.05719 9.99962L2.19519 16.8616C2.07021 16.9866 2 17.1562 2 17.333C2 17.5097 2.07021 17.6793 2.19519 17.8043C2.32021 17.9293 2.48975 17.9995 2.66652 17.9995C2.8433 17.9995 3.01284 17.9293 3.13786 17.8043L9.99986 10.9423L16.8619 17.8043C16.9869 17.9293 17.1564 17.9995 17.3332 17.9995C17.51 17.9995 17.6795 17.9293 17.8045 17.8043C17.9295 17.6793 17.9997 17.5097 17.9997 17.333C17.9997 17.1562 17.9295 16.9866 17.8045 16.8616L10.9425 9.99962Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3899_26535">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1 px-3 text-sm py-1 bg-[#6E0AB8] text-white rounded-xl hover:bg-[#5a0894] transition-colors ml-auto"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3899_33584)">
                                    <path d="M16.8784 4.95401L7.66577 14.166C7.60383 14.2282 7.53022 14.2775 7.44917 14.3112C7.36811 14.3449 7.28121 14.3622 7.19344 14.3622C7.10567 14.3622 7.01876 14.3449 6.93771 14.3112C6.85665 14.2775 6.78304 14.2282 6.7211 14.166L3.15844 10.6C3.0965 10.5378 3.02289 10.4885 2.94183 10.4548C2.86078 10.4211 2.77387 10.4038 2.6861 10.4038C2.59834 10.4038 2.51143 10.4211 2.43037 10.4548C2.34932 10.4885 2.27571 10.5378 2.21377 10.6C2.15159 10.6619 2.10224 10.7356 2.06858 10.8166C2.03491 10.8977 2.01758 10.9846 2.01758 11.0723C2.01758 11.1601 2.03491 11.247 2.06858 11.3281C2.10224 11.4091 2.15159 11.4827 2.21377 11.5447L5.77777 15.108C6.15374 15.4833 6.66324 15.694 7.19444 15.694C7.72564 15.694 8.23514 15.4833 8.6111 15.108L17.8231 5.89801C17.8852 5.83608 17.9344 5.76251 17.9681 5.68152C18.0017 5.60052 18.019 5.5137 18.019 5.42601C18.019 5.33832 18.0017 5.25149 17.9681 5.17049C17.9344 5.0895 17.8852 5.01593 17.8231 4.95401C17.7612 4.89182 17.6876 4.84248 17.6065 4.80881C17.5254 4.77514 17.4385 4.75781 17.3508 4.75781C17.263 4.75781 17.1761 4.77514 17.095 4.80881C17.014 4.84248 16.9404 4.89182 16.8784 4.95401Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3899_33584">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
