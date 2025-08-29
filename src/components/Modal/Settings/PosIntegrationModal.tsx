import React, { useState } from 'react';
import ProductDropdown from '@/components/DropDown/ProductDropDown';

interface POSIntegrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStartIntegration: (data: POSIntegrationData) => void;
}

interface POSIntegrationData {
    posVendor: string;
    apiEndpoint: string;
    apiKey: string;
    accessToken: string;
    portNumber: string;
}

export default function POSIntegrationModal({ isOpen, onClose, onStartIntegration }: POSIntegrationModalProps) {
    const [formData, setFormData] = useState<POSIntegrationData>({
        posVendor: 'Toast',
        apiEndpoint: 'https://api.toasttab.com/v1/integration',
        apiKey: '12345678-ABCD-90EF-1234-567890ABCDEF',
        accessToken: 'abcdef1234567890abcdef1234567890',
        portNumber: '443 (default for HTTPS)'
    });

    const posVendors = [
        { value: 'Toast', label: 'Toast' },
        { value: 'Square', label: 'Square' },
        { value: 'Clover', label: 'Clover' },
        { value: 'Aloha', label: 'Aloha' },
        { value: 'Lightspeed', label: 'Lightspeed' },
        { value: 'Shopify', label: 'Shopify' }
    ];

    const handleInputChange = (field: keyof POSIntegrationData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        onStartIntegration(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">POS Integration</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6 space-y-4">
                        {/* POS Vendor */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                POS Vendor <span className="text-[#727A90]">*</span>
                            </label>
                            <ProductDropdown
                                value={formData.posVendor}
                                onChange={(value: string) => handleInputChange('posVendor', value)}
                                options={posVendors}
                                buttonClassName="w-full h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 flex justify-between items-center"
                            />
                        </div>

                        {/* API Endpoint */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                API Endpoint <span className="text-[#727A90]">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.apiEndpoint}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('apiEndpoint', e.target.value)}
                                className="w-full h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter API endpoint"
                            />
                        </div>

                        {/* API Key */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                API Key <span className="text-[#727A90]">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.apiKey}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('apiKey', e.target.value)}
                                className="w-full h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter API key"
                            />
                        </div>

                        {/* Access Token */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                Access Token
                            </label>
                            <input
                                type="text"
                                value={formData.accessToken}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('accessToken', e.target.value)}
                                className="w-full h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter access token"
                            />
                        </div>

                        {/* Port Number */}
                        <div>
                            <label className="block text-xs font-medium text-[#727A90] mb-2">
                                Port Number
                            </label>
                            <input
                                type="text"
                                value={formData.portNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('portNumber', e.target.value)}
                                className="w-full h-10 px-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter port number"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#E9EAEA] text-gray-700 rounded-lg cursor-pointer transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3807_25132)">
                                    <path d="M10.9425 9.99962L17.8045 3.13762C17.926 3.01189 17.9932 2.84348 17.9916 2.66869C17.9901 2.49389 17.92 2.32668 17.7964 2.20307C17.6728 2.07947 17.5056 2.00936 17.3308 2.00784C17.156 2.00632 16.9876 2.07352 16.8619 2.19495L9.99986 9.05695L3.13786 2.19495C3.01212 2.07352 2.84372 2.00632 2.66892 2.00784C2.49413 2.00936 2.32692 2.07947 2.20331 2.20307C2.07971 2.32668 2.00959 2.49389 2.00807 2.66869C2.00656 2.84348 2.07375 3.01189 2.19519 3.13762L9.05719 9.99962L2.19519 16.8616C2.07021 16.9866 2 17.1562 2 17.333C2 17.5097 2.07021 17.6793 2.19519 17.8043C2.32021 17.9293 2.48975 17.9995 2.66652 17.9995C2.8433 17.9995 3.01284 17.9293 3.13786 17.8043L9.99986 10.9423L16.8619 17.8043C16.9869 17.9293 17.1564 17.9995 17.3332 17.9995C17.51 17.9995 17.6795 17.9293 17.8045 17.8043C17.9295 17.6793 17.9997 17.5097 17.9997 17.333C17.9997 17.1562 17.9295 16.9866 17.8045 16.8616L10.9425 9.99962Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3807_25132">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className="text-sm font-medium text-[#727A90]">Cancel</span>
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3807_25262)">
                                    <path d="M14.8794 2.95401L5.66675 12.166C5.60481 12.2282 5.5312 12.2775 5.45014 12.3112C5.36909 12.3449 5.28218 12.3622 5.19441 12.3622C5.10665 12.3622 5.01974 12.3449 4.93868 12.3112C4.85763 12.2775 4.78402 12.2282 4.72208 12.166L1.15941 8.60001C1.09747 8.53782 1.02387 8.48848 0.94281 8.45481C0.861755 8.42114 0.77485 8.40381 0.687081 8.40381C0.599312 8.40381 0.512406 8.42114 0.431351 8.45481C0.350296 8.48848 0.276687 8.53782 0.214747 8.60001C0.152563 8.66194 0.103221 8.73555 0.0695536 8.81661C0.0358858 8.89767 0.0185547 8.98457 0.0185547 9.07234C0.0185547 9.16011 0.0358858 9.24701 0.0695536 9.32807C0.103221 9.40912 0.152563 9.48273 0.214747 9.54467L3.77875 13.108C4.15471 13.4833 4.66421 13.694 5.19541 13.694C5.72662 13.694 6.23612 13.4833 6.61208 13.108L15.8241 3.89801C15.8862 3.83608 15.9354 3.76251 15.969 3.68152C16.0026 3.60052 16.0199 3.5137 16.0199 3.42601C16.0199 3.33832 16.0026 3.25149 15.969 3.17049C15.9354 3.0895 15.8862 3.01593 15.8241 2.95401C15.7621 2.89182 15.6885 2.84248 15.6075 2.80881C15.5264 2.77514 15.4395 2.75781 15.3517 2.75781C15.264 2.75781 15.1771 2.77514 15.096 2.80881C15.015 2.84248 14.9414 2.89182 14.8794 2.95401Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3807_25262">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className="text-sm font-medium">Start Integrating</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
