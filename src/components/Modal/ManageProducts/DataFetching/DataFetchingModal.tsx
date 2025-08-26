'use client';

import React from 'react';

interface DataFetchingModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

const DataFetchingModal: React.FC<DataFetchingModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center" onClick={(e) => e.stopPropagation()}>
                {/* Loading Indicator */}
                <div className="flex justify-center mt-4 mb-2">
                    <div className="relative w-16 h-16">
                        {/* Light purple circle background */}
                        <svg width="60" height="60" viewBox="0 0 68 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="68" height="68" rx="34" fill="#F4ECFA" />
                            <circle cx="21" cy="34.5" r="4" fill="#6E0AB8" />
                            <circle cx="34" cy="34.5" r="4" fill="#6E0AB8" />
                            <circle cx="47" cy="34.5" r="4" fill="#6E0AB8" />
                        </svg>

                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-[#24282E] mb-4">
                    Data is being Fetched
                </h2>

                {/* Description */}
                <p className="text-[#515766] text-sm leading-relaxed">
                    Please wait while system is reading your data<br />
                    details here, it will took long depending upon<br />
                    the document size at <span className="font-bold text-[#515766]">11:00 AM</span>
                </p>
            </div>
        </div>
    );
};

export default DataFetchingModal;
