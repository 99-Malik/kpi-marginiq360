'use client';

import React from 'react';

interface BorrowOrderSubmitted {
    isOpen: boolean;
    onClose: () => void;
}

const BorrowOrderSubmitted: React.FC<BorrowOrderSubmitted> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Generate current timestamp in the format shown in the image
    const getCurrentTimestamp = () => {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleDateString('en-US', { month: 'short' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        return `${day} ${month} ${year}, ${time}`;
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40" onClick={onClose}>
            <div
                className="bg-white rounded-2xl px-6 py-4 max-w-md w-full mx-4 text-center shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label="Close"
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2755_73737)">
                                <path d="M15.8045 0.195191C15.6795 0.0702103 15.51 0 15.3332 0C15.1564 0 14.9869 0.0702103 14.8619 0.195191L7.99986 7.05719L1.13786 0.195191C1.01284 0.0702103 0.8433 0 0.666524 0C0.489748 0 0.320209 0.0702103 0.195191 0.195191C0.0702103 0.320209 0 0.489748 0 0.666524C0 0.8433 0.0702103 1.01284 0.195191 1.13786L7.05719 7.99986L0.195191 14.8619C0.0702103 14.9869 0 15.1564 0 15.3332C0 15.51 0.0702103 15.6795 0.195191 15.8045C0.320209 15.9295 0.489748 15.9997 0.666524 15.9997C0.8433 15.9997 1.01284 15.9295 1.13786 15.8045L7.99986 8.94252L14.8619 15.8045C14.9869 15.9295 15.1564 15.9997 15.3332 15.9997C15.51 15.9997 15.6795 15.9295 15.8045 15.8045C15.9295 15.6795 15.9997 15.51 15.9997 15.3332C15.9997 15.1564 15.9295 14.9869 15.8045 14.8619L8.94252 7.99986L15.8045 1.13786C15.9295 1.01284 15.9997 0.8433 15.9997 0.666524C15.9997 0.489748 15.9295 0.320209 15.8045 0.195191Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2755_73737">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </div>

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="72" height="72" rx="36" fill="#F4ECFA" />
                            <g clip-path="url(#clip0_2755_73739)">
                                <path d="M49.7588 25.908L31.3335 44.332C31.2096 44.4564 31.0624 44.5551 30.9003 44.6224C30.7382 44.6897 30.5644 44.7244 30.3888 44.7244C30.2133 44.7244 30.0395 44.6897 29.8774 44.6224C29.7153 44.5551 29.568 44.4564 29.4442 44.332L22.3188 37.2C22.1949 37.0756 22.0477 36.977 21.8856 36.9096C21.7235 36.8423 21.5497 36.8076 21.3742 36.8076C21.1986 36.8076 21.0248 36.8423 20.8627 36.9096C20.7006 36.977 20.5534 37.0756 20.4295 37.2C20.3051 37.3239 20.2064 37.4711 20.1391 37.6332C20.0718 37.7953 20.0371 37.9691 20.0371 38.1447C20.0371 38.3202 20.0718 38.494 20.1391 38.6561C20.2064 38.8182 20.3051 38.9655 20.4295 39.0893L27.5575 46.216C28.3094 46.9665 29.3284 47.3881 30.3908 47.3881C31.4532 47.3881 32.4722 46.9665 33.2242 46.216L51.6482 27.796C51.7723 27.6722 51.8708 27.525 51.9381 27.363C52.0053 27.201 52.0399 27.0274 52.0399 26.852C52.0399 26.6766 52.0053 26.503 51.9381 26.341C51.8708 26.179 51.7723 26.0319 51.6482 25.908C51.5243 25.7836 51.3771 25.685 51.215 25.6176C51.0528 25.5503 50.879 25.5156 50.7035 25.5156C50.528 25.5156 50.3541 25.5503 50.192 25.6176C50.0299 25.685 49.8827 25.7836 49.7588 25.908Z" fill="#6E0AB8" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2755_73739">
                                    <rect width="32" height="32" fill="white" transform="translate(20 20)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                </div>

                {/* Success Message */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your borrowing Successfully Sent!  
                </h2>
                
                {/* Secondary Message with Timestamp */}
                <div className="text-center pb-4">
                    <p className="text-gray-500 text-sm mb-1">
                        Your order request has been submitted at
                    </p>
                    <p className="text-[#727A90] text-sm font-semibold">
                        {getCurrentTimestamp()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BorrowOrderSubmitted;
