import React, { useState, useRef, useEffect } from 'react';

interface ReportIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowSuccessModal: () => void;
}

interface Item {
    id: string;
    name: string;
    category: string;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose, onShowSuccessModal }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Sample items for demonstration
    const sampleItems: Item[] = [
        { id: '1', name: 'Fresh Tomatoes', category: 'Vegetables' },
        { id: '2', name: 'Organic Lettuce', category: 'Vegetables' },
        { id: '3', name: 'Chicken Breast', category: 'Meat' },
        { id: '4', name: 'Salmon Fillet', category: 'Seafood' },
        { id: '5', name: 'Whole Milk', category: 'Dairy' },
        { id: '6', name: 'Cheddar Cheese', category: 'Dairy' },
        { id: '7', name: 'Apples', category: 'Fruits' },
        { id: '8', name: 'Bananas', category: 'Fruits' },
        { id: '9', name: 'Rice', category: 'Grains' },
        { id: '10', name: 'Pasta', category: 'Grains' },
    ];

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredItems([]);
            setIsDropdownOpen(false);
        } else {
            const filtered = sampleItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredItems(filtered);
            setIsDropdownOpen(filtered.length > 0);
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleItemSelect = (item: Item) => {
        if (!selectedItems.find(selected => selected.id === item.id)) {
            setSelectedItems([...selectedItems, item]);
        }
        setSearchQuery('');
        setIsDropdownOpen(false);
        inputRef.current?.focus();
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleInputFocus = () => {
        if (searchQuery.trim() !== '' && filteredItems.length > 0) {
            setIsDropdownOpen(true);
        }
    };

    if (!isOpen) {
        return null;
    }

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
            onMouseDown={(e) => {
                // only close if the user clicked directly on the backdrop
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                     w-[min(600px,calc(100%-32px))]
                     rounded-[24px] bg-white
                     shadow-[0_24px_60px_rgba(24,35,51,0.16)]
                     ring-1 ring-[#E7E9EE]
                     ${isDropdownOpen ? 'max-h-[90vh] overflow-y-auto' : 'h-fit'}
                     scroll-hidden
                 `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="text-lg leading-7 font-semibold text-[#1D2433]">
                        Report Issue
                    </h2>
                    <button
                        onClick={handleClose}
                        className="h-9 w-9 grid place-items-center"
                        aria-label="Close"
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
                <div className="h-[1px] bg-[#E7E9EE] mb-6"></div>

                {/* Content */}
                <div className="px-6 space-y-6">
                    {/* Search Input with Bubbles */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Choose Item to Report (Optional)
                        </label>
                        <div className={`p-2 ${selectedItems.length === 0 ? 'border border-gray-200' : ''} rounded-xl`}>
                            <div className='border border-gray-200 rounded-xl p-2 overflow-hidden' ref={dropdownRef}>
                                {/* Input Container - Fixed size, doesn't expand */}
                                <div className={`${selectedItems.length === 0 ? 'h-[24px]' : 'min-h-[24px]'} rounded-lg p-2`}>
                                    {/* Selected Items Bubbles - Only show when there are items */}
                                    {selectedItems.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {selectedItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-2 bg-[#F1E7F8] text-primary px-3 text-xs py-1 rounded-md font-semibold"
                                                >
                                                    <span>{item.name}</span>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Input Field - Centered when no bubbles */}
                                    <div className={`flex items-center ${selectedItems.length === 0 ? 'h-full' : ''}`}>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                            placeholder={selectedItems.length === 0 ? "Search for items..." : "Add more items..."}
                                            className="flex-1 border-none outline-none bg-transparent text-xs text-gray-700 placeholder:text-xs placeholder:text-gray-400 text-left h-8 flex items-center"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Dropdown - Appears below input, scrollbar on outer container */}
                                {isDropdownOpen && (
                                    <div className="mt-2 bg-white  rounded-lg max-h-48 overflow-y-auto custom-scroll">
                                        {filteredItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleItemSelect(item)}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="font-medium text-gray-900 text-xs">{item.name}</div>
                                                <div className="text-xs text-gray-500">{item.category}</div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label className="block text-sm font-medium text-[#727A90] mb-2">
                                Report Issue*
                            </label>
                            <textarea
                                placeholder="Write here"
                                className="w-full min-h-[120px] p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent placeholder:text-gray-400 text-sm"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-6 border-t border-gray-200 pb-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex items-center gap-2 px-4 py-2 borde rounded-lg bg-[#F1E7F8] text-primary text-sm font-semibold  transition-colors"
                            >
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2755_49488)">
                                        <path d="M15.8045 0.76941C15.6795 0.644429 15.51 0.574219 15.3332 0.574219C15.1564 0.574219 14.9869 0.644429 14.8619 0.76941L7.99986 7.63141L1.13786 0.76941C1.01284 0.644429 0.8433 0.574219 0.666524 0.574219C0.489748 0.574219 0.320209 0.644429 0.195191 0.76941V0.76941C0.0702103 0.894428 0 1.06397 0 1.24074C0 1.41752 0.0702103 1.58706 0.195191 1.71208L7.05719 8.57408L0.195191 15.4361C0.0702103 15.5611 0 15.7306 0 15.9074C0 16.0842 0.0702103 16.2537 0.195191 16.3787V16.3787C0.320209 16.5037 0.489748 16.5739 0.666524 16.5739C0.8433 16.5739 1.01284 16.5037 1.13786 16.3787L7.99986 9.51674L14.8619 16.3787C14.9869 16.5037 15.1564 16.5739 15.3332 16.5739C15.51 16.5739 15.6795 16.5037 15.8045 16.3787C15.9295 16.2537 15.9997 16.0842 15.9997 15.9074C15.9997 15.7306 15.9295 15.5611 15.8045 15.4361L8.94252 8.57408L15.8045 1.71208C15.9295 1.58706 15.9997 1.41752 15.9997 1.24074C15.9997 1.06397 15.9295 0.894428 15.8045 0.76941V0.76941Z" fill="#6E0AB8" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2755_49488">
                                            <rect width="16" height="16" fill="white" transform="translate(0 0.574219)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                Cancel
                            </button>
                                                         <button
                                 type="button"
                                 onClick={onShowSuccessModal}
                                 className="flex items-center gap-1 px-4 py-2 bg-[#6E0AB8] text-white rounded-lg hover:bg-[#5a0894] transition-colors text-sm font-semibold ml-auto"
                             >
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2755_49491)">
                                        <path d="M12.6667 0.574219H3.33333C2.4496 0.575277 1.60237 0.926807 0.97748 1.5517C0.352588 2.17659 0.00105857 3.02382 0 3.90755L0 13.2409C0.00105857 14.1246 0.352588 14.9718 0.97748 15.5967C1.60237 16.2216 2.4496 16.5732 3.33333 16.5742H12.6667C13.5504 16.5732 14.3976 16.2216 15.0225 15.5967C15.6474 14.9718 15.9989 14.1246 16 13.2409V3.90755C15.9989 3.02382 15.6474 2.17659 15.0225 1.5517C14.3976 0.926807 13.5504 0.575277 12.6667 0.574219V0.574219ZM14.6667 13.2409C14.6667 13.7713 14.456 14.28 14.0809 14.6551C13.7058 15.0302 13.1971 15.2409 12.6667 15.2409H3.33333C2.8029 15.2409 2.29419 15.0302 1.91912 14.6551C1.54405 14.28 1.33333 13.7713 1.33333 13.2409V3.90755C1.33333 3.37712 1.54405 2.86841 1.91912 2.49334C2.29419 2.11827 2.8029 1.90755 3.33333 1.90755H12.6667C13.1971 1.90755 13.7058 2.11827 14.0809 2.49334C14.456 2.86841 14.6667 3.37712 14.6667 3.90755V13.2409Z" fill="white" />
                                        <path d="M6.2222 11.1874L3.60954 8.57474C3.48452 8.44976 3.31498 8.37955 3.1382 8.37955C2.96143 8.37955 2.79189 8.44976 2.66687 8.57474C2.54189 8.69976 2.47168 8.8693 2.47168 9.04607C2.47168 9.22285 2.54189 9.39239 2.66687 9.5174L5.27954 12.1301C5.40336 12.2539 5.55037 12.3522 5.71217 12.4192C5.87397 12.4863 6.0474 12.5208 6.22254 12.5208C6.39768 12.5208 6.5711 12.4863 6.73291 12.4192C6.89471 12.3522 7.04172 12.2539 7.16554 12.1301L13.3335 5.96208C13.4585 5.83706 13.5287 5.66752 13.5287 5.49074C13.5287 5.31397 13.4585 5.14443 13.3335 5.01941C13.2085 4.89443 13.039 4.82422 12.8622 4.82422C12.6854 4.82422 12.5159 4.89443 12.3909 5.01941L6.2222 11.1874Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2755_49491">
                                            <rect width="16" height="16" fill="white" transform="translate(0 0.574219)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                Report Issue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportIssueModal;
