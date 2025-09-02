import React from 'react';

interface LineItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

interface PendingApprovalProps {
    isOpen: boolean;
    onClose: () => void;
    onReportIssue: () => void;
    order: {
        id: string;
        status: string;
        vendor: string;
        expectedDelivery: string;
        dated: string;
        lineItems: LineItem[];
        totalAmount: number;
    } | null;
}

const PendingApproval: React.FC<PendingApprovalProps> = ({ isOpen, onClose, onReportIssue, order }) => {

    if (!isOpen || !order) {
        console.log('Modal not rendering - isOpen:', isOpen, 'order:', order);
        return null;
    }

    const handleClose = () => {
        console.log('Modal close triggered');
        onClose();
    };

    const handleReportIssue = () => {
        onReportIssue();
    };



    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatTime = (timeString: string) => {
        return timeString;
    };

    const getStatusStyling = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-gray-100 border-gray-300 text-gray-600 font-semibold';
            case 'Order Sent':
                return 'bg-white border-[#A1A6B5] text-[#727A90] font-semibold';
            case 'Delivered':
                return 'bg-[#ebf9ee] border-[#34C759] text-[#34C759] font-semibold';
            case 'Confirmed':
                return 'bg-[#E6F4F5] border-[#009499] text-[#009499] font-semibold';
            case 'Issued':
                return 'bg-[#FDF7E7] border-[#E7AA0B] text-[#A47908] font-semibold';
            default:
                return 'bg-gray-100 border-gray-300 text-gray-600 font-semibold';
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40"
                onMouseDown={(e) => {
                    // only close if the user clicked directly on the backdrop
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
          w-[min(600px,calc(100%-32px))]
          rounded-[24px] bg-white
          shadow-[0_24px_60px_rgba(24,35,51,0.16)]
          ring-1 ring-[#E7E9EE]
          overflow-y-auto scroll-hidden h-[90vh]
        "
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="text-lg leading-7 font-semibold text-[#1D2433]">
                        View Details
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

                {/* Order Information Section */}
                <div className="px-6 space-y-4">
                    {/* Order Details Grid */}
                    <div className="flex items-center start space-x-26">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Order number</p>
                            <p className="font-bold text-gray-900 text-sm">{order.id}</p>
                        </div>
                                                 <div>
                             <p className="text-gray-500 text-sm mb-1">Status</p>
                             <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 border ${getStatusStyling(order.status)}`}>
                                 {order.status}
                             </span>
                         </div>
                    </div>

                                         {/* Vendor, Expected Delivery, and Dated in single row */}
                     <div className="grid grid-cols-3 gap-6">
                         <div>
                             <p className="text-gray-500 text-sm mb-1">Vendor</p>
                             <p className="font-bold text-gray-900 text-sm">{order.vendor}</p>
                         </div>
                         <div>
                             <p className="text-gray-500 text-sm mb-1">Expected Delivery</p>
                             <p className="font-bold text-gray-900 text-sm">{order.expectedDelivery}</p>
                         </div>
                         <div>
                             <p className="text-gray-500 text-sm mb-1">Dated</p>
                             <p className="font-bold text-gray-900 text-sm">{formatTime(order.dated)}</p>
                         </div>
                     </div>

                     {/* Issue Remarks Section - Only show when status is "Issued" */}
                     {order.status === 'Issued' && (
                         <>
                             <div className="mt-4">
                                 <h3 className="font-bold text-gray-900 mb-4 text-sm">Issue Remarks</h3>
                                 <div className="bg-[#F8F8FC] rounded-lg px-4 py-3">
                                     <p className="text-[#24282E] text-sm leading-relaxed">
                                         Dear Vendor, I hope this message finds you well. I wanted to bring to your attention that the recent deliverables we received do not meet our expectations. We appreciate your continued partnership and would like to discuss how we can improve the quality and timeliness of future deliveries. Please let us know if you have any questions or if you would like to schedule a call to discuss this further.
                                     </p>
                                 </div>
                             </div>
                         </>
                     )}

                     {/* Divider */}
                     <div className="h-[1px] bg-[#E7E9EE]"></div>

                    {/* Line Items Section */}
                    <div className="mt-4">
                        <h3 className=" font-bold text-gray-900 mb-4 text-sm">Line Items</h3>
                        <div className="max-h-48 overflow-y-auto scroll-hidden space-y-3">
                            {order.lineItems.map((item, index) => (
                                <div key={index} className="bg-[#F8F8FC] rounded-lg px-4 py-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium text-[#24282E] text-sm">{item.productName}</p>
                                            <p className="text-[#727A90] text-xs">
                                                QTY: {item.quantity}*{formatCurrency(item.unitPrice)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 text-sm">
                                                {formatCurrency(item.totalPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                                         {/* Total Amount Section */}
                     <div className="mt-6 pt-4 border-t border-gray-200">
                         <div className="flex items-center gap-2">
                             <span className="text-md font-medium text-[#727A90]">Total Amount :</span>
                             <span className="text-sm font-bold text-gray-900">
                                 {formatCurrency(order.totalAmount)}
                             </span>
                         </div>
                     </div>
                </div>



                {/* Action Buttons Section */}
                <div className="px-6 flex justify-between pt-6 border-t border-gray-200 mt-6 pb-6">
                    <button
                        className="bg-[#FCE8E8] text-[#E51B1B] text-xs font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9999 3.99988C11.8749 3.8749 11.7053 3.80469 11.5285 3.80469C11.3518 3.80469 11.1822 3.8749 11.0572 3.99988L7.99988 7.05721L4.94255 3.99988C4.81753 3.8749 4.64799 3.80469 4.47121 3.80469C4.29444 3.80469 4.1249 3.8749 3.99988 3.99988C3.8749 4.1249 3.80469 4.29444 3.80469 4.47121C3.80469 4.64799 3.8749 4.81753 3.99988 4.94255L7.05721 7.99988L3.99988 11.0572C3.8749 11.1822 3.80469 11.3518 3.80469 11.5285C3.80469 11.7053 3.8749 11.8749 3.99988 11.9999C4.1249 12.1249 4.29444 12.1951 4.47121 12.1951C4.64799 12.1951 4.81753 12.1249 4.94255 11.9999L7.99988 8.94254L11.0572 11.9999C11.1822 12.1249 11.3518 12.1951 11.5285 12.1951C11.7053 12.1951 11.8749 12.1249 11.9999 11.9999C12.1249 11.8749 12.1951 11.7053 12.1951 11.5285C12.1951 11.3518 12.1249 11.1822 11.9999 11.0572L8.94254 7.99988L11.9999 4.94255C12.1249 4.81753 12.1951 4.64799 12.1951 4.47121C12.1951 4.29444 12.1249 4.1249 11.9999 3.99988Z" fill="#EA4949" />
                        </svg>
                        Reject
                    </button>
                    <button
                        className="bg-[#34C759] text-white text-xs font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.00892 12.3243L5.78625 15.1017C6.16131 15.4766 6.66992 15.6872 7.20025 15.6872C7.73058 15.6872 8.2392 15.4766 8.61425 15.1017L17.1916 6.52434C17.313 6.3986 17.3802 6.2302 17.3787 6.0554C17.3772 5.88061 17.3071 5.7134 17.1835 5.58979C17.0599 5.46619 16.8927 5.39608 16.7179 5.39456C16.5431 5.39304 16.3747 5.46023 16.2489 5.58167L7.67159 14.159C7.54657 14.284 7.37703 14.3542 7.20025 14.3542C7.02348 14.3542 6.85394 14.284 6.72892 14.159L3.95159 11.3817C3.82585 11.2602 3.65745 11.193 3.48265 11.1946C3.30785 11.1961 3.14064 11.2662 3.01704 11.3898C2.89343 11.5134 2.82332 11.6806 2.8218 11.8554C2.82028 12.0302 2.88748 12.1986 3.00892 12.3243Z" fill="white" />
                        </svg>
                        Approve
                    </button>
                </div>
            </div>

            </div>

            {/* Report Issue Modal - Rendered completely outside PendingApproval */}
         
        </>
    );
};

export default PendingApproval;
