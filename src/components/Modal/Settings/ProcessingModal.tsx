import React from 'react';

interface ProcessingModalProps {
    isOpen: boolean;
}

export default function ProcessingModal({ isOpen }: ProcessingModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-gray-800/50 z-40"
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-8 border border-gray-200">
                    {/* Loading Spinner */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {/* Animated spinner */}
                            <div className="w-20 h-20 border-4 border-gray-200 border-t-[#6E0AB8] rounded-full animate-spin"></div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                        <p className="text-gray-900 text-base font-medium">KPI is processing the data...</p>
                    </div>
                </div>
            </div>
        </>
    );
}
