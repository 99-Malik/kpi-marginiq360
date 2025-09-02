import React from 'react';

interface LineItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

interface ViewDetailsModalProps {
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
    hideActionButtons?: boolean;
    modalHeight?: string;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ isOpen, onClose, onReportIssue, order, hideActionButtons = false, modalHeight = '90vh' }) => {

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
            case 'Order Sent':
                return 'bg-white border-[#A1A6B5] text-[#727A90] font-semibold';
            case 'Delivered':
                return 'bg-[#ebf9ee] border-[#34C759] text-[#34C759] font-semibold';
            case 'Confirmed':
                return 'bg-[#E6F4F5] border-[#009499] text-[#009499] font-semibold';
            case 'Issued':
                return 'bg-[#FDF7E7] border-[#E7AA0B] text-[#A47908] font-semibold';
            case 'Request Sent':
                return 'bg-white border-[#A1A6B5] text-[#727A90] font-semibold';
            case 'Borrowed':
                return 'bg-[#ebf9ee] border-[#34C759] text-[#34C759] font-semibold';
            case 'Delivered-Borrowing':
                return 'bg-[#F4ECFA] border-[#6E0AB8] text-[#6A04B5] font-semibold';
            default:
                return 'bg-green-100 text-green-800 text-sm font-medium';
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
          overflow-y-auto scroll-hidden
        "
                style={{ height: modalHeight }}
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



                {/* Action Buttons Section - Only show when not hidden */}
                {!hideActionButtons && (
                    <div className="px-6 flex gap-3 pt-6 border-t border-gray-200 mt-6 pb-6">
                        <button
                            type="button"
                            onClick={handleReportIssue}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F1E7F8] text-primary text-sm font-semibold  transition-colors cursor-pointer"
                        >
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2755_48741)">
                                    <path d="M9.99935 12.5748C9.77834 12.5748 9.56638 12.487 9.4101 12.3307C9.25382 12.1745 9.16602 11.9625 9.16602 11.7415V5.07482C9.16602 4.85381 9.25382 4.64185 9.4101 4.48557C9.56638 4.32929 9.77834 4.24149 9.99935 4.24149C10.2204 4.24149 10.4323 4.32929 10.5886 4.48557C10.7449 4.64185 10.8327 4.85381 10.8327 5.07482V11.7415C10.8327 11.9625 10.7449 12.1745 10.5886 12.3307C10.4323 12.487 10.2204 12.5748 9.99935 12.5748ZM10.6602 19.8748C12.4602 19.1515 18.3327 16.3073 18.3327 10.1107V5.80149C18.3336 4.92567 18.0581 4.07188 17.5455 3.36175C17.0329 2.65162 16.3093 2.12136 15.4777 1.84649L10.2619 0.117324C10.0916 0.0598504 9.90713 0.0598504 9.73685 0.117324L4.52102 1.84649C3.68944 2.12136 2.96581 2.65162 2.45319 3.36175C1.94056 4.07188 1.66509 4.92567 1.66602 5.80149V10.1107C1.66602 15.579 7.50352 18.924 9.29352 19.819C9.51992 19.927 9.75631 20.0127 9.99935 20.0748C10.2253 20.0286 10.4465 19.9617 10.6602 19.8748V19.8748ZM14.9527 3.42816C15.4515 3.5935 15.8854 3.91181 16.193 4.33785C16.5006 4.7639 16.6661 5.27603 16.666 5.80149V10.1107C16.666 15.2632 11.5935 17.7032 10.0385 18.3282C8.46518 17.5415 3.33268 14.624 3.33268 10.1107V5.80149C3.33262 5.27603 3.49812 4.7639 3.80569 4.33785C4.11325 3.91181 4.54725 3.5935 5.04602 3.42816L9.99935 1.78649L14.9527 3.42816ZM9.99935 14.2415C9.83453 14.2415 9.67342 14.2904 9.53638 14.3819C9.39934 14.4735 9.29253 14.6036 9.22945 14.7559C9.16638 14.9082 9.14988 15.0757 9.18203 15.2374C9.21418 15.3991 9.29355 15.5475 9.4101 15.6641C9.52664 15.7806 9.67513 15.86 9.83678 15.8921C9.99843 15.9243 10.166 15.9078 10.3183 15.8447C10.4705 15.7817 10.6007 15.6748 10.6922 15.5378C10.7838 15.4008 10.8327 15.2396 10.8327 15.0748C10.8327 14.8538 10.7449 14.6418 10.5886 14.4856C10.4323 14.3293 10.2204 14.2415 9.99935 14.2415Z" fill="#6E0AB8" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2755_48741">
                                        <rect width="20" height="20" fill="white" transform="translate(0 0.0742188)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Report Issue
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-1 px-3 text-sm py-1 bg-[#6E0AB8] text-white rounded-xl hover:bg-[#5a0894] transition-colors ml-auto cursor-pointer"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_3899_33584)">
                                    <path d="M16.8784 4.95401L7.66577 14.166C7.60383 14.2282 7.53022 14.2775 7.44917 14.3112C7.36811 14.3449 7.28121 14.3622 7.19344 14.3622C7.10567 14.3622 7.01876 14.3449 6.93771 14.3112C6.85665 14.2775 6.78304 14.2282 6.7211 14.166L3.15844 10.6C3.0965 10.5378 3.02289 10.4885 2.94183 10.4548C2.86078 10.4211 2.77387 10.4038 2.6861 10.4038C2.59834 10.4038 2.51143 10.4211 2.43037 10.4548C2.34932 10.4885 2.27571 10.5378 2.21377 10.6C2.15159 10.6619 2.10224 10.7356 2.06858 10.8166C2.03491 10.8977 2.01758 10.9846 2.01758 11.0723C2.01758 11.1601 2.03491 11.247 2.06858 11.3281C2.10224 11.4091 2.15159 11.4827 2.21377 11.5447L5.77777 15.108C6.15374 15.4833 6.66324 15.694 7.19444 15.694C7.72564 15.694 8.23514 15.4833 8.6111 15.108L17.8231 5.89801C17.8852 5.83608 17.9344 5.76251 17.9681 5.68152C18.0017 5.60052 18.019 5.5137 18.019 5.42601C18.019 5.33832 18.0017 5.25149 17.9681 5.17049C17.9344 5.0895 17.8852 5.01593 17.8231 4.95401C17.7612 4.89182 17.6876 4.84248 17.6065 4.80881C17.5254 4.77514 17.4385 4.75781 17.3508 4.75781C17.263 5.75781 17.1761 5.77514 17.095 5.80881C17.014 5.84248 16.9404 5.89182 16.8784 5.95401Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3899_33584">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Confirm Delivery
                        </button>
                    </div>
                )}
            </div>

            </div>

            {/* Report Issue Modal - Rendered completely outside ViewDetailsModal */}
         
        </>
    );
};

export default ViewDetailsModal;
