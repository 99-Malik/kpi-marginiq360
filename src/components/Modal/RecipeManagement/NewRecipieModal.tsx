import React from "react";
import { RecipeIcon, MenuIcon, DealsIcon } from "../../SVGIcons/RecipieManagement/RecipieManagementSvg";
interface CreateItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    selected: string;
    setSelected: (value: string) => void;
    onNext: () => void;
}

const options = [
    { label: "Recipe Item", icon: <RecipeIcon /> },
    { label: "Menu Item", icon: <MenuIcon /> },
    { label: "Deals & Combos", icon: <DealsIcon /> },
];

export default function NewRecipieModal({
    isOpen,
    onClose,
    selected,
    setSelected,
    onNext,
}: CreateItemModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md ">

                {/* Header */}
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-semibold">Want to Create?</h2>
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
                <div className="w-full h-[0.5px] bg-[#E5E7EB] "></div>
                {/* Options */}
                <div className="space-y-3 p-4">
                {options.map((opt, index) => (
                        <label
                        key={`${opt.label}-${index}`}
                        className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition ${selected === opt.label
                                ? " bg-[#F8F8FC] border-[#E5E7EB]"
                                : " bg-[#F8F8FC] border-[#E5E7EB]"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {opt.icon}
                                <span className="font-bold text-[14px]">{opt.label}</span>
                            </div>
                            <input
                                type="radio"
                                name="createType"
                                value={opt.label}
                                checked={selected === opt.label}
                                onChange={() => setSelected(opt.label)}
                                className={`
    w-5 h-5 rounded-full border-2 border-primary bg-white
    appearance-none cursor-pointer flex items-center justify-center
    checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5
    checked:after:rounded-full checked:after:bg-primary
  `}
                            />
                        </label>
                    ))}
                </div>
                <div className="w-full h-[0.5px] bg-[#E5E7EB] "></div>

                {/* Footer */}
                <div className="flex justify-between  p-4 gap-3">
                    {/* Cancel Button */}
                    <button
                        onClick={onClose}
                        className="flex items-center text-xs gap-1 px-4 py-1 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                        {/* Cancel icon (X) */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3182_18603)">
                                <path d="M10.9425 9.99986L17.8045 3.13786C17.926 3.01213 17.9932 2.84373 17.9916 2.66893C17.9901 2.49413 17.92 2.32692 17.7964 2.20332C17.6728 2.07971 17.5056 2.0096 17.3308 2.00808C17.156 2.00656 16.9876 2.07376 16.8619 2.1952L9.99986 9.0572L3.13786 2.1952C3.01212 2.07376 2.84372 2.00656 2.66892 2.00808C2.49413 2.0096 2.32692 2.07971 2.20331 2.20332C2.07971 2.32692 2.00959 2.49413 2.00807 2.66893C2.00656 2.84373 2.07375 3.01213 2.19519 3.13786L9.05719 9.99986L2.19519 16.8619C2.07021 16.9869 2 17.1564 2 17.3332C2 17.51 2.07021 17.6795 2.19519 17.8045C2.32021 17.9295 2.48975 17.9997 2.66652 17.9997C2.8433 17.9997 3.01284 17.9295 3.13786 17.8045L9.99986 10.9425L16.8619 17.8045C16.9869 17.9295 17.1564 17.9997 17.3332 17.9997C17.51 17.9997 17.6795 17.9295 17.8045 17.8045C17.9295 17.6795 17.9997 17.51 17.9997 17.3332C17.9997 17.1564 17.9295 16.9869 17.8045 16.8619L10.9425 9.99986Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3182_18603">
                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                            </defs>
                        </svg>

                        Cancel
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={onNext}
                        className="flex items-center gap-1 px-4 text-xs py-2 rounded-xl bg-primary text-white hover:bg-primary/90"
                    >
                        {/* Check icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3182_13353)">
                                <path d="M16.8784 4.95401L7.66577 14.166C7.60383 14.2282 7.53022 14.2775 7.44917 14.3112C7.36811 14.3449 7.28121 14.3622 7.19344 14.3622C7.10567 14.3622 7.01876 14.3449 6.93771 14.3112C6.85665 14.2775 6.78304 14.2282 6.7211 14.166L3.15844 10.6C3.0965 10.5378 3.02289 10.4885 2.94183 10.4548C2.86078 10.4211 2.77387 10.4038 2.6861 10.4038C2.59834 10.4038 2.51143 10.4211 2.43037 10.4548C2.34932 10.4885 2.27571 10.5378 2.21377 10.6C2.15159 10.6619 2.10224 10.7356 2.06858 10.8166C2.03491 10.8977 2.01758 10.9846 2.01758 11.0723C2.01758 11.1601 2.03491 11.247 2.06858 11.3281C2.10224 11.4091 2.15159 11.4827 2.21377 11.5447L5.77777 15.108C6.15374 15.4833 6.66324 15.694 7.19444 15.694C7.72564 15.694 8.23514 15.4833 8.6111 15.108L17.8231 5.89801C17.8852 5.83608 17.9344 5.76251 17.9681 5.68152C18.0017 5.60052 18.019 5.5137 18.019 5.42601C18.019 5.33832 18.0017 5.25149 17.9681 5.17049C17.9344 5.0895 17.8852 5.01593 17.8231 4.95401C17.7612 4.89182 17.6876 4.84248 17.6065 4.80881C17.5254 4.77514 17.4385 4.75781 17.3508 4.75781C17.263 4.75781 17.1761 4.77514 17.095 4.80881C17.014 4.84248 16.9404 4.89182 16.8784 4.95401Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3182_13353">
                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                            </defs>
                        </svg>

                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}


