'use client';

import React, { useState, useEffect } from 'react';
import ProductDropdown from '../../DropDown/ProductDropDown';
import VendorUpdatedModal from './VendorChangedModal';

interface AddVendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: VendorFormData) => void;
    mode?: 'add' | 'edit';
    editingVendor?: VendorFormData | null;
}

interface VendorFormData {
    vendorName: string;
    category: string;
    paymentTerms: string;
    deliveryDays: string;
    phoneNumber: string;
    contactPerson: string;
    address: string;
}

// Sample data for dropdowns
const categoryOptions = ['Supplies', 'Ingredients', 'Equipment', 'Packaging', 'Other'];
const paymentTermsOptions = ['Cash', 'COD', 'Prepaid', 'Net 30', 'Net 60'];
const deliveryDaysOptions = ['1', '2', '3', '4', '5'];

export default function AddVendorModal({ isOpen, onClose, onSubmit, mode = 'add', editingVendor }: AddVendorModalProps) {
    const [formData, setFormData] = useState<VendorFormData>({
        vendorName: 'Name',
        category: 'Supplies',
        paymentTerms: 'COD',
        deliveryDays: '5',
        phoneNumber: '108-505-15152',
        contactPerson: 'Jeff Haddy',
        address: 'USA, New York Avenue 15, By Central Park'
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Update form data when mode or editingVendor changes
    useEffect(() => {
        if (mode === 'edit' && editingVendor) {
            setFormData(editingVendor);
        } else {
            setFormData({
                vendorName: 'Name',
                category: 'Supplies',
                paymentTerms: 'COD',
                deliveryDays: '5',
                phoneNumber: '108-505-15152',
                contactPerson: 'Jeff Haddy',
                address: 'USA, New York Avenue 15, By Central Park'
            });
        }
    }, [mode, editingVendor]);

    // Reset success modal when main modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setShowSuccessModal(false);
            setSuccessMessage('');
        }
    }, [isOpen]);

    const handleInputChange = (field: keyof VendorFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onSubmit(formData);
        
        // Show success modal with appropriate message
        const message = mode === 'edit' ? 'Vendor updated successfully!' : 'Vendor added successfully!';
        setSuccessMessage(message);
        setShowSuccessModal(true);
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        setSuccessMessage('');
        // Close the main modal after success modal closes
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
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
                            {mode === 'edit' ? 'Edit Vendor' : 'Add Vendor'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                                <g clipPath="url(#clip0_3899_26560)">
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

                    {/* Form */}
                    <div className="overflow-y-auto max-h-[calc(90vh-120px)] scroll-hidden">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Vendor Name */}
                            <div>
                                <label className="block text-sm font-medium text-[#727A90] mb-2">
                                    Vendor Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.vendorName}
                                    onChange={(e) => handleInputChange('vendorName', e.target.value)}
                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="Name"
                                />
                            </div>

                            {/* Select Category */}
                            <div>
                                <label className="block text-sm font-medium text-[#727A90] mb-2">
                                    Select Category
                                </label>
                                <ProductDropdown
                                    options={categoryOptions}
                                    value={formData.category}
                                    onChange={(value) => handleInputChange('category', value)}
                                    buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                />
                            </div>

                            {/* Payment Terms and Delivery Days in one row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Payment Terms */}
                                <div>
                                    <label className="block text-sm font-medium text-[#727A90] mb-2">
                                        Payment Terms
                                    </label>
                                    <ProductDropdown
                                        options={paymentTermsOptions}
                                        value={formData.paymentTerms}
                                        onChange={(value) => handleInputChange('paymentTerms', value)}
                                        buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    />
                                </div>

                                {/* Delivery Days */}
                                <div>
                                    <label className="block text-sm font-medium text-[#727A90] mb-2">
                                        Delivery Days
                                    </label>
                                    <ProductDropdown
                                        options={deliveryDaysOptions}
                                        value={formData.deliveryDays}
                                        onChange={(value) => handleInputChange('deliveryDays', value)}
                                        buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-[#727A90] mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="108-505-15152"
                                />
                            </div>

                            {/* Contact Person */}
                            <div>
                                <label className="block text-sm font-medium text-[#727A90] mb-2">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    value={formData.contactPerson}
                                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="Jeff Haddy"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-[#727A90] mb-2">
                                    Address
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                                    placeholder="USA, New York Avenue 15, By Central Park"
                                />
                            </div>
                            
                        </form>
                        <div className="flex gap-3 p-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-[#727A90] text-md hover:bg-gray-50 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_3899_26535)">
                                    <path d="M10.9425 9.99962L17.8045 3.13762C17.926 3.01189 17.9932 2.84348 17.9916 2.66869C17.9901 2.49389 17.92 2.32668 17.7964 2.20307C17.6728 2.07947 17.5056 2.00936 17.3308 2.00784C17.156 2.00632 16.9876 2.07352 16.8619 2.19495L9.99986 9.05695L3.13786 2.19495C3.01212 2.07352 2.84372 2.00632 2.66892 2.00784C2.49413 2.00936 2.32692 2.07947 2.20331 2.20307C2.07971 2.32668 2.00959 2.49389 2.00807 2.66869C2.00656 2.84348 2.07375 3.01189 2.19519 3.13762L9.05719 9.99962L2.19519 16.8616C2.07021 16.9866 2 17.1562 2 17.333C2 17.5097 2.07021 17.6793 2.19519 17.8043C2.32021 17.9293 2.48975 17.9995 2.66652 17.9995C2.8433 17.9995 3.01284 17.9293 3.13786 17.8043L9.99986 10.9423L16.8619 17.8043C16.9869 17.9293 17.1564 17.9995 17.3332 17.9995C17.51 17.9995 17.6795 17.9293 17.8045 17.8043C17.9295 17.6793 17.9997 17.5097 17.9997 17.333C17.9997 17.1562 17.9295 16.9866 17.8045 16.8616L10.9425 9.99962Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3899_26535">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Discard
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="flex items-center gap-1 px-3 text-sm py-1 bg-[#6E0AB8] text-white rounded-xl hover:bg-[#5a0894] transition-colors ml-auto"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_3899_33584)">
                                    <path d="M16.8784 4.95401L7.66577 14.166C7.60383 14.2282 7.53022 14.2775 7.44917 14.3112C7.36811 14.3449 7.28121 14.3622 7.19344 14.3622C7.10567 14.3622 7.01876 14.3449 6.93771 14.3112C6.85665 14.2775 6.78304 14.2282 6.7211 14.166L3.15844 10.6C3.0965 10.5378 3.02289 10.4885 2.94183 10.4548C2.86078 10.4211 2.77387 10.4038 2.6861 10.4038C2.59834 10.4038 2.51143 10.4211 2.43037 10.4548C2.34932 10.4885 2.27571 10.5378 2.21377 10.6C2.15159 10.6619 2.10224 10.7356 2.06858 10.8166C2.03491 10.8977 2.01758 10.9846 2.01758 11.0723C2.01758 11.1601 2.03491 11.247 2.06858 11.3281C2.10224 11.4091 2.15159 11.4827 2.21377 11.5447L5.77777 15.108C6.15374 15.4833 6.66324 15.694 7.19444 15.694C7.72564 15.694 8.23514 15.4833 8.6111 15.108L17.8231 5.89801C17.8852 5.83608 17.9344 5.76251 17.9681 5.68152C18.0017 5.60052 18.019 5.5137 18.019 5.42601C18.019 5.33832 18.0017 5.25149 17.9681 5.17049C17.9344 5.0895 17.8852 5.01593 17.8231 4.95401C17.7612 4.89182 17.6876 4.84248 17.6065 4.80881C17.5254 4.77514 17.4385 4.75781 17.3508 4.75781C17.263 4.75781 17.1761 4.77514 17.095 4.80881C17.014 4.84248 16.9404 4.89182 16.8784 4.95401Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3899_33584">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {mode === 'edit' ? 'Update Vendor' : 'Add Vendor'}
                        </button>
                    </div>
                    </div>

                    {/* Footer Buttons */}
                   
                </div>
            </div>

            {/* Success Modal */}
            <VendorUpdatedModal
                isOpen={showSuccessModal}
                onClose={handleSuccessModalClose}
                message={successMessage}
            />
        </>
    );
}
