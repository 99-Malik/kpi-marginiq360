import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { DatePicker } from './Calendar/DatePicker';

interface AddInventoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCount?: (newItem: {
        id: string;
        product: string;
        category: string;
        expected: string;
        actual: string;
        price: string;
        date: string;
    }) => void; // Add callback prop
}

const AddInventoryModal = ({ isOpen, onClose, onAddCount }: AddInventoryModalProps) => {
    const [selectedDate] = useState<Date | undefined>(new Date());
    const [formData, setFormData] = useState({
        product: '',
        expectedQuantity: '',
        actualQuantity: '',
        date: new Date()
    });
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = () => {
        if (onAddCount) {
            const newItem = {
                id: `30${2000 + Math.floor(Math.random() * 1000)}`,
                product: formData.product || 'New Product',
                category: 'Food',
                expected: `${formData.expectedQuantity || '25'} (Units)`,
                actual: `${formData.actualQuantity || '30'} (Units)`,
                price: `$${(100 + Math.floor(Math.random() * 50)).toFixed(2)}`,
                date: format(selectedDate || new Date(), 'dd MMM yyyy'),
            };
            onAddCount(newItem);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-xl"
                ref={modalRef}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-gray-900">
                        Edit Inventory Count
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                            <g clipPath="url(#clip0_2935_13684)">
                                <path d="M16.9425 16L23.8045 9.13799C23.926 9.01225 23.9932 8.84385 23.9916 8.66905C23.9901 8.49425 23.92 8.32705 23.7964 8.20344C23.6728 8.07984 23.5056 8.00972 23.3308 8.0082C23.156 8.00668 22.9876 8.07388 22.8619 8.19532L15.9999 15.0573L9.13786 8.19532C9.01212 8.07388 8.84372 8.00668 8.66892 8.0082C8.49413 8.00972 8.32692 8.07984 8.20331 8.20344C8.07971 8.32705 8.00959 8.49425 8.00807 8.66905C8.00656 8.84385 8.07375 9.01225 8.19519 9.13799L15.0572 16L8.19519 22.862C8.07021 22.987 8 23.1565 8 23.3333C8 23.5101 8.07021 23.6796 8.19519 23.8047C8.32021 23.9296 8.48975 23.9998 8.66652 23.9998C8.8433 23.9998 9.01284 23.9296 9.13786 23.8047L15.9999 16.9427L22.8619 23.8047C22.9869 23.9296 23.1564 23.9998 23.3332 23.9998C23.51 23.9998 23.6795 23.9296 23.8045 23.8047C23.9295 23.6796 23.9997 23.5101 23.9997 23.3333C23.9997 23.1565 23.9295 22.987 23.8045 22.862L16.9425 16Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2935_13684">
                                    <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-500">Product</label>
                        <input
                            type="text"
                            value={formData.product}
                            onChange={(e) => setFormData({...formData, product: e.target.value})}
                            placeholder="Enter product name"
                            className="mt-1 w-full border border-gray-200 rounded-md h-10 px-3 text-xs"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="text-sm text-gray-500">Expected Quantity (kg)</label>
                            <input
                                type="text"
                                value={formData.expectedQuantity}
                                onChange={(e) => setFormData({...formData, expectedQuantity: e.target.value})}
                                placeholder="25"
                                className="mt-1 w-full border border-gray-200 rounded-md h-10 px-3 text-xs"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm text-gray-500">Actually Quantity (kg)</label>
                            <input
                                type="text"
                                value={formData.actualQuantity}
                                onChange={(e) => setFormData({...formData, actualQuantity: e.target.value})}
                                placeholder="30"
                                className="mt-1 w-full border border-gray-200 rounded-md h-10 px-3 text-xs"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full  mx-auto">
                        <label className="text-sm text-gray-500">Count Date</label>

                        {/* Input UI */}


                        <DatePicker />

                    </div>
                </div>
                <div className="-mx-6 py-3">
                    <div className="w-full h-[0.5px] bg-gray-200 " />
                </div>

                <div className="flex justify-between mt-2 gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs border border-gray-200 rounded-lg text-gray-600 flex items-center gap-2"
                    >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2955_18244)">
                                <path d="M8.94252 7.99999L15.8045 1.13799C15.926 1.01225 15.9932 0.84385 15.9916 0.669052C15.9901 0.494255 15.92 0.327046 15.7964 0.203441C15.6728 0.0798355 15.5056 0.00972286 15.3308 0.00820391C15.156 0.00668497 14.9876 0.0738812 14.8619 0.19532L7.99986 7.05732L1.13786 0.19532C1.01212 0.0738812 0.843721 0.00668497 0.668923 0.00820391C0.494126 0.00972286 0.326917 0.0798355 0.203312 0.203441C0.0797065 0.327046 0.00959389 0.494255 0.00807494 0.669052C0.00655599 0.84385 0.0737523 1.01225 0.195191 1.13799L7.05719 7.99999L0.195191 14.862C0.0702103 14.987 0 15.1565 0 15.3333C0 15.5101 0.0702103 15.6796 0.195191 15.8047C0.320209 15.9296 0.489748 15.9998 0.666524 15.9998C0.8433 15.9998 1.01284 15.9296 1.13786 15.8047L7.99986 8.94265L14.8619 15.8047C14.9869 15.9296 15.1564 15.9998 15.3332 15.9998C15.51 15.9998 15.6795 15.9296 15.8045 15.8047C15.9295 15.6796 15.9997 15.5101 15.9997 15.3333C15.9997 15.1565 15.9295 14.987 15.8045 14.862L8.94252 7.99999Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2955_18244">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-4 py-2 text-xs bg-primary text-white rounded-lg flex items-center gap-2"
                    >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2955_18249)">
                                <path d="M14.8784 2.95401L5.66577 12.166C5.60383 12.2282 5.53022 12.2775 5.44917 12.3112C5.36811 12.3449 5.28121 12.3622 5.19344 12.3622C5.10567 12.3622 5.01876 12.3449 4.93771 12.3112C4.85665 12.2775 4.78304 12.2282 4.7211 12.166L1.15844 8.60001C1.0965 8.53782 1.02289 8.48848 0.941834 8.45481C0.860779 8.42114 0.773874 8.40381 0.686104 8.40381C0.598335 8.40381 0.51143 8.42114 0.430375 8.45481C0.34932 8.48848 0.275711 8.53782 0.213771 8.60001C0.151586 8.66194 0.102245 8.73555 0.068577 8.81661C0.0349092 8.89767 0.0175781 8.98457 0.0175781 9.07234C0.0175781 9.16011 0.0349092 9.24701 0.068577 9.32807C0.102245 9.40912 0.151586 9.48273 0.213771 9.54467L3.77777 13.108C4.15374 13.4833 4.66324 13.694 5.19444 13.694C5.72564 13.694 6.23514 13.4833 6.6111 13.108L15.8231 3.89801C15.8852 3.83608 15.9344 3.76251 15.9681 3.68152C16.0017 3.60052 16.019 3.5137 16.019 3.42601C16.019 3.33832 16.0017 3.25149 15.9681 3.17049C15.9344 3.0895 15.8852 3.01593 15.8231 2.95401C15.7612 2.89182 15.6876 2.84248 15.6065 2.80881C15.5254 2.77514 15.4385 2.75781 15.3508 2.75781C15.263 2.75781 15.1761 2.77514 15.095 2.80881C15.014 2.84248 14.9404 2.89182 14.8784 2.95401Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2955_18249">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        Add Count
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddInventoryModal;
