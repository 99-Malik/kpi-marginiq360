import React, { useState, useEffect } from 'react';
import PurchasingDropdown from '../../../../components/DropDown/PurchasingDropDown';
import UnitDropdown from '../../../../components/DropDown/UnitDropDown';

interface NewOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOrderSubmit?: () => void;
}

interface ProductItem {
    id: string;
    product: string;
    quantity: number;
    unit: 'kg' | 'g' | 'lb' | 'oz';
}

const NewOrderModal: React.FC<NewOrderModalProps> = ({ isOpen, onClose, onOrderSubmit }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedVendor, setSelectedVendor] = useState('Syco Food Services');
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [productItems, setProductItems] = useState<ProductItem[]>([
        { id: '1', product: 'Chicken Breast', quantity: 5, unit: 'kg' }
    ]);

    // Monitor for ProductDropdown open state
    useEffect(() => {
        if (!isOpen) return;

        const checkDropdownState = () => {
            const dropdownMenu = document.querySelector('[role="listbox"]') as HTMLElement;
            if (dropdownMenu && dropdownMenu.style.display !== 'none' && dropdownMenu.offsetHeight > 0) {
                setIsProductDropdownOpen(true);
            } else {
                setIsProductDropdownOpen(false);
            }
        };

        // Check immediately and then periodically
        checkDropdownState();
        const interval = setInterval(checkDropdownState, 100);

        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    const vendors = [
        'Syco Food Services',
        'The Gourmet Taco Truck',
        'Fresh Catch Seafood Stand',
        'Artisan Pizza Co.',
        'Sweet Treats Dessert Bar'
    ];

    const products = [
        'Chicken Breast',
        'Ground Beef',
        'Salmon Fillet',
        'Rice',
        'Pasta',
        'Tomatoes',
        'Onions',
        'Bell Peppers',
        'Cheese',
        'Bread'
    ];

    const handleVendorSelect = (vendor: string) => {
        setSelectedVendor(vendor);
        setIsVendorDropdownOpen(false);
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const addProductItem = () => {
        const newItem: ProductItem = {
            id: Date.now().toString(),
            product: 'Chicken Breast',
            quantity: 5,
            unit: 'kg'
        };
        setProductItems([...productItems, newItem]);
    };

    const removeProductItem = (id: string) => {
        if (productItems.length > 1) {
            setProductItems(productItems.filter(item => item.id !== id));
        }
    };

    const updateProductItem = (id: string, field: keyof ProductItem, value: string | number) => {
        setProductItems(productItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const decQuantity = (id: string) => {
        const item = productItems.find(item => item.id === id);
        if (item) {
            updateProductItem(id, 'quantity', Math.max(0, item.quantity - 1));
        }
    };

    const incQuantity = (id: string) => {
        const item = productItems.find(item => item.id === id);
        if (item) {
            updateProductItem(id, 'quantity', item.quantity + 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-[10000] flex items-center justify-center">
            <div
                className={`bg-white rounded-2xl shadow-xl w-[min(600px,calc(100%-32px))] transition-all duration-300 ease-out ${isProductDropdownOpen ? 'min-h-[430px]' : 'max-h-[100vh]'
                    } overflow-visible`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Create New Order</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                            <g clip-path="url(#clip0_3899_33009)">
                                <path d="M16.9425 15.9996L23.8045 9.13762C23.926 9.01189 23.9932 8.84348 23.9916 8.66869C23.9901 8.49389 23.92 8.32668 23.7964 8.20307C23.6728 8.07947 23.5056 8.00936 23.3308 8.00784C23.156 8.00632 22.9876 8.07352 22.8619 8.19495L15.9999 15.057L9.13786 8.19495C9.01212 8.07352 8.84372 8.00632 8.66892 8.00784C8.49413 8.00936 8.32692 8.07947 8.20331 8.20307C8.07971 8.32668 8.00959 8.49389 8.00807 8.66869C8.00656 8.84348 8.07375 9.01189 8.19519 9.13762L15.0572 15.9996L8.19519 22.8616C8.07021 22.9866 8 23.1562 8 23.333C8 23.5097 8.07021 23.6793 8.19519 23.8043C8.32021 23.9293 8.48975 23.9995 8.66652 23.9995C8.8433 23.9995 9.01284 23.9293 9.13786 23.8043L15.9999 16.9423L22.8619 23.8043C22.9869 23.9293 23.1564 23.9995 23.3332 23.9995C23.51 23.9995 23.6795 23.9293 23.8045 23.8043C23.9295 23.6793 23.9997 23.5097 23.9997 23.333C23.9997 23.1562 23.9295 22.9866 23.8045 22.8616L16.9425 15.9996Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3899_33009">
                                    <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </div>

                {/* Progress Timeline - Centered */}
                <div className="px-12 py-4 border-b border-gray-200">
                    {/* Row 1: Icons + Lines - Fixed spacing */}
                    <div className="flex items-center justify-center space-x-4">
                        {/* Step 1: Select Vendor */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#6E0AB8]' : 'bg-gray-200'
                            }`}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Line to next step */}
                        <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-[#6E0AB8]' : 'bg-gray-200'
                            }`}></div>

                        {/* Step 2: Add Products */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#6E0AB8]' : 'bg-gray-200'
                            }`}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Line to next step */}
                        <div className={`w-16 h-0.5 ${currentStep >= 3 ? 'bg-[#6E0AB8]' : 'bg-gray-200'
                            }`}></div>

                        {/* Step 3: Review Order */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#6E0AB8]' : 'bg-gray-200'
                            }`}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Row 2: Text Labels - Aligned with icons above */}
                    <div className="flex justify-center mt-2 space-x-10">
                        <div className="w-auto  text-center">
                            <span className={`text-xs font-medium  ${currentStep >= 1 ? 'text-[#6E0AB8]' : 'text-gray-600'
                                }`}>Select Vendor</span>
                        </div>


                        <div className="w-auto ml-2 text-center">
                            <span className={`text-xs font-medium ${currentStep >= 2 ? 'text-[#6E0AB8]' : 'text-gray-600'
                                }`}>Add Products</span>
                        </div>



                        <div className="w-auto ml-4 text-center">
                            <span className={`text-xs font-medium ${currentStep >= 3 ? 'text-[#6E0AB8]' : 'text-gray-600'
                                }`}>Review Order</span>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="py-6 relative overflow-y-auto max-h-[60vh] scroll-hidden">
                    {currentStep === 1 && (
                        <div className="space-y-2 px-4">
                            <h3 className="text-sm font-medium text-[#727A90]">Select Vendor</h3>

                            <div>
                                <PurchasingDropdown
                                    defaultValue="Syco Food Services"
                                    value={selectedVendor}
                                    onChange={handleVendorSelect}
                                    options={vendors.map((vendor) => ({
                                        value: vendor,
                                        label: vendor,
                                    }))}
                                    buttonClassName="flex items-center justify-between w-full h-8 px-3 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    menuClassName="z-[10002] rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm overflow-auto overscroll-contain"
                                />
                            </div>

                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className='px-2 '>
                            <div className="space-y-4 border border-[#E5E7EB] rounded-xl py-4">
                                <h3 className="text-sm font-medium text-gray-700 px-4">Add Products</h3>

                                {/* Product Items */}
                                <div className="space-y-4 max-h-[250px] overflow-y-auto custom-scroll  pb-4">
                                    {productItems.map((item, index) => (
                                        <div key={item.id} className=" grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-6 items-end">
                                            {/* Product Selection */}
                                            <div className="px-4">
                                                <label className="block text-xs font-medium text-[#727A90] mb-2 ">
                                                    Search & Add
                                                </label>
                                                <PurchasingDropdown
                                                    defaultValue="Chicken Breast"
                                                    value={item.product}
                                                    onChange={(value) => updateProductItem(item.id, 'product', value)}
                                                    options={products.map((product) => ({
                                                        value: product,
                                                        label: product,
                                                    }))}
                                                    buttonClassName="flex items-center justify-between w-full h-9 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none "
                                                    menuClassName="z-[10002] rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm overflow-auto overscroll-contain"
                                                />
                                            </div>

                                            {/* Quantity */}
                                            <div className="min-w-[240px]  ">
                                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                                    Quantity* ($0.25/kg)
                                                </label>

                                                <div className="flex items-center gap-2 justify-between ">
                                                    {/* Connected Quantity & Unit */}
                                                    <div className="flex h-9 items-stretch  border border-gray-200 rounded-l-lg rounded-r-lg">
                                                        {/* Unit Selector */}
                                                        <div className="relative bg-[#F9F9FB] rounded-l-lg">
                                                            <UnitDropdown
                                                                value={item.unit}
                                                                onChange={(value) => updateProductItem(item.id, 'unit', value)}
                                                                listMaxHeight={130}
                                                                gutter={1}
                                                            />
                                                        </div>

                                                        {/* Divider */}
                                                        <div className="w-px bg-gray-200" />

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center px-5 ">
                                                            <button
                                                                type="button"
                                                                onClick={() => updateProductItem(item.id, 'quantity', Math.max(0, item.quantity - 1))}
                                                                className="h-6 w-6 rounded-lg   text-gray-600  text-sm leading-none "
                                                            >
                                                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="0.5" y="0.574463" width="20" height="20" rx="4" fill="#F8F8FC" />
                                                                    <path d="M14.6667 9.74097H6.33333C5.8731 9.74097 5.5 10.1141 5.5 10.5743C5.5 11.0345 5.8731 11.4076 6.33333 11.4076H14.6667C15.1269 11.4076 15.5 11.0345 15.5 10.5743C15.5 10.1141 15.1269 9.74097 14.6667 9.74097Z" fill="#727A90" />
                                                                </svg>

                                                            </button>

                                                            <input
                                                                type="number"
                                                                value={item.quantity}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (value === '' || value === null || value === undefined) {
                                                                        updateProductItem(item.id, 'quantity', 0);
                                                                    } else {
                                                                        const numValue = Number(value);
                                                                        if (!isNaN(numValue) && numValue >= 0) {
                                                                            updateProductItem(item.id, 'quantity', numValue);
                                                                        }
                                                                    }
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (e.target.value === '' || e.target.value === null || e.target.value === undefined) {
                                                                        updateProductItem(item.id, 'quantity', 0);
                                                                    }
                                                                }}
                                                                className="w-8 text-center bg-transparent text-sm text-gray-800 focus:outline-none
                         [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() => updateProductItem(item.id, 'quantity', item.quantity + 1)}
                                                                className="h-6 w-6 rounded-lg text-sm leading-none"
                                                            >
                                                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="0.5" y="0.574463" width="20" height="20" rx="4" fill="#F8F8FC" />
                                                                    <path d="M14.6667 9.74113H11.3333V6.18678 11.2455 5.97482 11.0893 5.81854C10.933 5.66226 10.721 5.57446 10.5 5.57446C10.279 5.57446 10.067 5.66226 9.91074 5.81854C9.75446 5.97482 9.66667 6.18678 9.66667 6.4078V9.74113H6.33333C6.11232 9.74113 5.90036 9.82893 5.74408 9.98521C5.5878 10.1415 5.5 10.3534 5.5 10.5745C5.5 10.7955 5.5878 11.0074 5.74408 11.1637C5.90036 11.32 6.11232 11.4078 6.33333 11.4078H9.66667V14.7411C9.66667 14.9621 9.75446 15.1741 9.91074 15.3304C10.067 15.4867 10.279 15.5745 10.5 15.5745C10.721 15.5745 10.933 15.4867 11.0893 15.3304C11.2455 15.1741 11.3333 14.9621 11.3333 14.7411V11.4078H14.6667C14.8877 11.4078 15.0996 11.32 15.2559 11.1637C15.4122 11.0074 15.5 10.7955 15.5 10.5745C15.5 10.3534 15.4122 10.1415 15.2559 9.98521C15.0996 9.82893 14.8877 9.74113 14.6667 9.74113Z" fill="#727A90" />
                                                                </svg>

                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Delete Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeProductItem(item.id)}
                                                        className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-xl border border-gray-200  text-red-500 hover:text-red-700"
                                                        aria-label="Remove"
                                                    >
                                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_23_55306)">
                                                                <path d="M15.9997 5.24112H13.933C13.614 3.69018 12.2497 2.57646 10.6663 2.57446H9.33298C7.74957 2.57646 6.38526 3.69018 6.06632 5.24112H3.99966C3.63148 5.24112 3.33301 5.53959 3.33301 5.90778C3.33301 6.27596 3.63148 6.57446 3.99966 6.57446H4.66632V15.2411C4.66854 17.0812 6.15963 18.5723 7.99966 18.5745H11.9997C13.8397 18.5723 15.3308 17.0812 15.333 15.2411V6.57446H15.9997C16.3679 6.57446 16.6663 6.27599 16.6663 5.90781C16.6663 5.53962 16.3679 5.24112 15.9997 5.24112ZM9.33301 13.9078C9.33301 14.276 9.03454 14.5745 8.66635 14.5745C8.29813 14.5745 7.99966 14.276 7.99966 13.9078V9.90781C7.99966 9.53962 8.29813 9.24115 8.66632 9.24115C9.03451 9.24115 9.33298 9.53962 9.33298 9.90781V13.9078H9.33301ZM11.9997 13.9078C11.9997 14.276 11.7012 14.5745 11.333 14.5745C10.9648 14.5745 10.6664 14.276 10.6664 13.9078V9.90781C10.6664 9.53962 10.9648 9.24115 11.333 9.24115C11.7012 9.24115 11.9997 9.53962 11.9997 9.90781V13.9078ZM7.44701 5.24112C7.73057 4.44265 8.4857 3.90881 9.33301 3.90778H10.6664C11.5137 3.90881 12.2688 4.44265 12.5524 5.24112H7.44701Z" fill="#E51B1B" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_23_55306">
                                                                    <rect width="16" height="16" fill="white" transform="translate(2 2.57446)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                    </button>
                                                </div>
                                            </div>






                                            {/* Delete Button */}

                                        </div>
                                    ))}
                                </div>

                                {/* Add More Item Button */}
                                <div className="flex justify-end pr-4">
                                    <button
                                        onClick={addProductItem}
                                        className="flex items-center px-2 py-3 bg-white rounded-xl border border-[#D2B3E9] text-primary transition-colors text-xs font-bold"
                                    >
                                        Add More Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="px-4">
                            <div className="border border-gray-200 rounded-xl p-6 space-y-6">
                                {/* Header */}
                                <div className="space-y-2">
                                    <h3 className="text-md font-semibold text-gray-900">Order Details</h3>
                                    <p className="text-sm text-gray-600">Review your order information and the line items</p>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200"></div>

                                {/* Order Information */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Order number</p>
                                        <p className="text-sm font-semibold text-gray-900">PO-2024-001</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Vendor</p>
                                        <p className="text-sm font-semibold text-gray-900">{selectedVendor}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Time & Date</p>
                                        <p className="text-sm font-semibold text-gray-900">26 Mon 2025, 11:00 AM</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="text-sm font-semibold text-gray-900">+1 (415) 555-1234</p>
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-sm font-semibold text-gray-900">vendor123@gmail.com</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200"></div>

                                {/* Line Items */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-semibold text-gray-900">Line Items</h4>
                                        <button className="text-sm text-gray-900 underline hover:text-gray-700">Edit</button>
                                    </div>

                                    <div className="max-h-[200px] overflow-y-auto custom-scroll space-y-3 pr-2">
                                        {/* Chicken Breast */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-900">Chicken Breast - 40lb Case</p>
                                                    <p className="text-xs text-gray-500">QTY: 8*$25</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">$200.00</p>
                                            </div>
                                        </div>

                                        {/* Salmon Fillets */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-900">Salmon Fillets - 30lb Case</p>
                                                    <p className="text-xs text-gray-500">QTY: 6*$30</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">$180.00</p>
                                            </div>
                                        </div>

                                        {/* Ground Beef */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-900">Ground Beef - 50lb Case</p>
                                                    <p className="text-xs text-gray-500">QTY: 10*$20</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">$200.00</p>
                                            </div>
                                        </div>

                                        {/* Pork Chops */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-900">Pork Chops - 40lb Case</p>
                                                    <p className="text-xs text-gray-500">QTY: 5*$35</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">$175.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200"></div>

                                {/* Total Amount */}
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-sm font-medium text-gray-500">Total Amount :</p>
                                    <p className="text-md font-bold text-gray-900">$2,500</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                    {currentStep === 1 ? (
                        <button
                            onClick={onClose}
                            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Cancel
                        </button>
                    ) : (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                        >
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3899_13668)">
                                    <path d="M2.58686 11.5417L5.16686 14.1484C5.22884 14.2109 5.30257 14.2605 5.38381 14.2943C5.46505 14.3281 5.55219 14.3456 5.64019 14.3456C5.7282 14.3456 5.81534 14.3281 5.89658 14.2943C5.97782 14.2605 6.05155 14.2109 6.11353 14.1484C6.17601 14.0864 6.22561 14.0127 6.25945 13.9314C6.2933 13.8502 6.31073 13.763 6.31073 13.675C6.31073 13.587 6.2933 13.4999 6.25945 13.4187C6.22561 13.3374 6.17601 13.2637 6.11353 13.2017L3.74019 10.815H17.3335C17.5103 10.815 17.6799 10.7448 17.8049 10.6198C17.93 10.4948 18.0002 10.3252 18.0002 10.1484C18.0002 9.97156 17.93 9.80199 17.8049 9.67697C17.6799 9.55194 17.5103 9.4817 17.3335 9.4817H3.70019L6.11353 7.06837C6.23172 6.94439 6.29765 6.77966 6.29765 6.60837C6.29765 6.43708 6.23172 6.27236 6.11353 6.14837C6.05155 6.08589 5.97782 6.03629 5.89658 6.00244C5.81534 5.9686 5.7282 5.95117 5.64019 5.95117C5.55219 5.95117 5.46505 5.9686 5.38381 6.00244C5.30257 6.03629 5.22884 6.08589 5.16686 6.14837L2.58686 8.71504C2.21233 9.09004 2.00195 9.59837 2.00195 10.1284C2.00195 10.6584 2.21233 11.1667 2.58686 11.5417Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3899_13668">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2.14844)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Back
                        </button>
                    )}

                    <button
                        onClick={currentStep === 3 ? (onOrderSubmit || (() => {})) : handleNext}
                        className="flex items-center gap-1 px-4 py-2 bg-[#6E0AB8] text-white rounded-lg hover:bg-[#5a0894] transition-colors text-sm font-medium cursor-pointer"
                    >
                        {currentStep === 3 ? (
                            <>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Submit Order Request
                            </>
                        ) : (
                            <>
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_3899_18646)">
                                        <path d="M16.8794 5.10244L7.66675 14.3144C7.60481 14.3766 7.5312 14.426 7.45014 14.4596C7.36909 14.4933 7.28218 14.5106 7.19441 14.5106C7.10665 14.5106 7.01974 14.4933 6.93868 14.4596C6.85763 14.426 6.78402 14.3766 6.72208 14.3144L3.15941 10.7484C3.09747 10.6863 3.02387 10.6369 2.94281 10.6032C2.86176 10.5696 2.77485 10.5522 2.68708 10.5522C2.59931 10.5522 2.51241 10.5696 2.43135 10.6032C2.3503 10.6369 2.27669 10.6863 2.21475 10.7484C2.15256 10.8104 2.10322 10.884 2.06955 10.965C2.03589 11.0461 2.01855 11.133 2.01855 11.2208C2.01855 11.3085 2.03589 11.3955 2.06955 11.4765C2.10322 11.5576 2.15256 11.6312 2.21475 11.6931L5.77875 15.2564C6.15471 15.6317 6.66421 15.8425 7.19541 15.8425C7.72662 15.8425 8.23612 15.6317 8.61208 15.2564L17.8241 6.04644C17.8862 5.98452 17.9354 5.91095 17.969 5.82995C18.0026 5.74896 18.0199 5.66213 18.0199 5.57444C18.0199 5.48675 18.0026 5.39992 17.969 5.31893C17.9354 5.23794 17.8862 5.16437 17.8241 5.10244C17.7621 5.04026 17.6885 4.99092 17.6075 4.95725C17.5264 4.92358 17.4395 4.90625 17.3517 4.90625C17.264 4.90625 17.1771 4.92358 17.096 4.95725C17.015 4.99092 16.9414 5.04026 16.8794 5.10244Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3899_18646">
                                            <rect width="16" height="16" fill="white" transform="translate(2 2.14844)" />
                                        </clipPath>
                                    </defs>
                                </svg>


                                Next
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default NewOrderModal;