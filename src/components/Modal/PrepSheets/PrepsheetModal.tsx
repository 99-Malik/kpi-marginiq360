'use client';

import React, { useState, useEffect } from 'react';
import { DatePicker } from '../InventoryCounts/Calendar/DatePicker';
import ProductDropdown from "@/components/DropDown/ProductDropDown";
import TimeSelector from '../TimeSelector/TimeSelector';

interface PrepsheetData {
    id?: string;
    prepSheetName: string;
    dueDate: string;
    dueTime: string;
    assignedTo: string;
    description: string;
}

interface PrepsheetModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    editData?: PrepsheetData;
}

const PrepsheetModal: React.FC<PrepsheetModalProps> = ({ isOpen, onClose, mode, editData }) => {
    console.log('PrepsheetModal props:', { isOpen, mode, editData });
    const [formData, setFormData] = useState<PrepsheetData>({
        prepSheetName: '',
        dueDate: '',
        dueTime: '',
        assignedTo: '',
        description: ''
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const assignmentOptions = [
        'Front of House',
        'Kitchen Team',
        'Back of House',
        'Management',
        'All Staff'
    ];

    useEffect(() => {
        if (mode === 'edit' && editData) {
            setFormData(editData);
        } else {
            setFormData({
                prepSheetName: 'Wash Dishes',
                dueDate: '26 October 2025',
                dueTime: '11:00 AM',
                assignedTo: 'Front of House',
                description: ''
            });
        }
    }, [mode, editData]);

    const handleInputChange = (field: keyof PrepsheetData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // Handle form submission here
        console.log('Form submitted:', formData);
        onClose();
    };

    console.log('Modal render check - isOpen:', isOpen);
    if (!isOpen) {
        console.log('Modal not rendering because isOpen is false');
        return null;
    }
    console.log('Modal rendering with isOpen true');

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative bg-white rounded-[20px] shadow-xl w-xl max-w-xl mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-md font-semibold text-gray-900">
                        {mode === 'create' ? 'Create New Prepsheet' : 'Edit Prepsheet'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                            <g clip-path="url(#clip0_3807_28428)">
                                <path d="M16.9425 15.9996L23.8045 9.13762C23.926 9.01189 23.9932 8.84348 23.9916 8.66869C23.9901 8.49389 23.92 8.32668 23.7964 8.20307C23.6728 8.07947 23.5056 8.00936 23.3308 8.00784C23.156 8.00632 22.9876 8.07352 22.8619 8.19495L15.9999 15.057L9.13786 8.19495C9.01212 8.07352 8.84372 8.00632 8.66892 8.00784C8.49413 8.00936 8.32692 8.07947 8.20331 8.20307C8.07971 8.32668 8.00959 8.49389 8.00807 8.66869C8.00656 8.84348 8.07375 9.01189 8.19519 9.13762L15.0572 15.9996L8.19519 22.8616C8.07021 22.9866 8 23.1562 8 23.333C8 23.5097 8.07021 23.6793 8.19519 23.8043C8.32021 23.9293 8.48975 23.9995 8.66652 23.9995C8.8433 23.9995 9.01284 23.9293 9.13786 23.8043L15.9999 16.9423L22.8619 23.8043C22.9869 23.9293 23.1564 23.9995 23.3332 23.9995C23.51 23.9995 23.6795 23.9293 23.8045 23.8043C23.9295 23.6793 23.9997 23.5097 23.9997 23.333C23.9997 23.1562 23.9295 22.9866 23.8045 22.8616L16.9425 15.9996Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3807_28428">
                                    <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </div>

                {/* Form */}
                <div className="px-4 py-4 space-y-2">
                    {/* Prep sheet Name */}
                    <div>
                        <label className="block text-xs font-medium text-[#727A90] mb-2">
                            Prep sheet Name
                        </label>
                        <input
                            type="text"
                            value={formData.prepSheetName}
                            onChange={(e) => handleInputChange('prepSheetName', e.target.value)}
                            className="w-full h-9 lg:h-10 px-2 rounded-lg border border-[#E9EAEA] bg-white text-xs text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                        />
                    </div>

                    {/* Due Date and Due Time - Side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Due Date */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                Due Date
                            </label>
                            <div className="relative">
                                <DatePicker />

                            </div>
                        </div>

                        {/* Due Time */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                Due Time
                            </label>
                            <TimeSelector
                                value={formData.dueTime}
                                onChange={(time) => handleInputChange('dueTime', time)}
                                placeholder="Select time"
                            />
                        </div>
                    </div>

                    {/* Assigned to */}
                    <div>
                        <label className="block text-xs font-medium text-[#727A90] mb-2">
                            Assigned to
                        </label>
                        <div className="relative">
                            <ProductDropdown
                                options={assignmentOptions}
                                value={formData.assignedTo}
                                onChange={(value) => handleInputChange('assignedTo', value)}
                                menuClassName="z-[10001] rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm overflow-auto overscroll-contain"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium text-[#727A90] mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Write here"
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA] resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 border border-[#E9EAEA] rounded-lg text-[#727A90] text-xs hover:bg-gray-50 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3807_7148)">
                                <path d="M10.9425 9.99962L17.8045 3.13762C17.926 3.01189 17.9932 2.84348 17.9916 2.66869C17.9901 2.49389 17.92 2.32668 17.7964 2.20307C17.6728 2.07947 17.5056 2.00936 17.3308 2.00784C17.156 2.00632 16.9876 2.07352 16.8619 2.19495L9.99986 9.05695L3.13786 2.19495C3.01212 2.07352 2.84372 2.00632 2.66892 2.00784C2.49413 2.00936 2.32692 2.07947 2.20331 2.20307C2.07971 2.32668 2.00959 2.49389 2.00807 2.66869C2.00656 2.84348 2.07375 3.01189 2.19519 3.13762L9.05719 9.99962L2.19519 16.8616C2.07021 16.9866 2 17.1562 2 17.333C2 17.5097 2.07021 17.6793 2.19519 17.8043C2.32021 17.9293 2.48975 17.9995 2.66652 17.9995C2.8433 17.9995 3.01284 17.9293 3.13786 17.8043L9.99986 10.9423L16.8619 17.8043C16.9869 17.9293 17.1564 17.9995 17.3332 17.9995C17.51 17.9995 17.6795 17.9293 17.8045 17.8043C17.9295 17.6793 17.9997 17.5097 17.9997 17.333C17.9997 17.1562 17.9295 16.9866 17.8045 16.8616L10.9425 9.99962Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3807_7148">
                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                            </defs>
                        </svg>


                        Discard
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 text-xs  py-2 bg-primary text-white rounded-lg  transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3807_7118)">
                                <path d="M14.8784 2.95401L5.66577 12.166C5.60383 12.2282 5.53022 12.2775 5.44917 12.3112C5.36811 12.3449 5.28121 12.3622 5.19344 12.3622C5.10567 12.3622 5.01876 12.3449 4.93771 12.3112C4.85665 12.2775 4.78304 12.2282 4.7211 12.166L1.15844 8.60001C1.0965 8.53782 1.02289 8.48848 0.941834 8.45481C0.860779 8.42114 0.773874 8.40381 0.686104 8.40381C0.598335 8.40381 0.51143 8.42114 0.430375 8.45481C0.34932 8.48848 0.275711 8.53782 0.213771 8.60001C0.151586 8.66194 0.102245 8.73555 0.068577 8.81661C0.0349092 8.89767 0.0175781 8.98457 0.0175781 9.07234C0.0175781 9.16011 0.0349092 9.24701 0.068577 9.32807C0.102245 9.40912 0.151586 9.48273 0.213771 9.54467L3.77777 13.108C4.15374 13.4833 4.66324 13.694 5.19444 13.694C5.72564 13.694 6.23514 13.4833 6.6111 13.108L15.8231 3.89801C15.8852 3.83608 15.9344 3.76251 15.9681 3.68152C16.0017 3.60052 16.019 3.5137 16.019 3.42601C16.019 3.33832 16.0017 3.25149 15.9681 3.17049C15.9344 3.0895 15.8852 3.01593 15.8231 2.95401C15.7612 2.89182 15.6876 2.84248 15.6065 2.80881C15.5254 2.77514 15.4385 2.75781 15.3508 2.75781C15.263 2.75781 15.1761 2.77514 15.095 2.80881C15.014 2.84248 14.9404 2.89182 14.8784 2.95401Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3807_7118">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        {mode === 'create' ? 'Create Prepsheet' : 'Update Prepsheet'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrepsheetModal;
