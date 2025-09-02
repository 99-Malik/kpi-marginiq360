import React from 'react';

interface PendingOrder {
    id: string;
    vendor: string;
    dated: string;
    items: number;
    total: number;
}

interface PendingCardProps {
    order: PendingOrder;
    onViewDetails: (order: PendingOrder) => void;
    onApprove: (order: PendingOrder) => void;
    onReject: (order: PendingOrder) => void;
}

const PendingCard: React.FC<PendingCardProps> = ({
    order,
    onViewDetails,
    onApprove,
    onReject
}) => {
    return (
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 transition-shadow">
            {/* Order ID */}
            <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
            </div>

            {/* Vendor Badge */}
            <div className="mb-4">
                <span className="w-full px-2 py-0.5 mt-2 bg-[#F8F8FC] border border-gray-200 text-black text-xs rounded-md font-bold ">
                    Vendor : {order.vendor}
                </span>
            </div>

            {/* Separator Line */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Order Details */}
            <div className="grid grid-cols-3 gap-2 text-[12px] mt-auto mb-4">
                <div>
                    <p className="text-[#727A90]">Dated</p>
                    <p className="font-semibold text-[#515766] mt-1">{order.dated ?? '01/02/2025'}</p>
                </div>
                <div>
                    <p className="text-[#727A90]">Items</p>
                    <p className="font-semibold text-gray-900 mt-1">{order.items ?? 15}</p>
                </div>
                <div>
                    <p className="text-[#727A90]">Total</p>
                    <p className="font-semibold text-gray-900 mt-1">{order.total ?? '$590.00'}</p>
                </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={() => onViewDetails(order)}
                    className="inline-flex bg-[#F4ECFA] text-primary text-xs font-medium py-2 px-2 rounded-lg  transition-colors items-center justify-center gap-1 cursor-pointer"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_3116_75389)">
                            <path d="M17.514 8.27886C16.48 6.59486 14.128 3.76953 10 3.76953C5.87203 3.76953 3.52003 6.59486 2.48603 8.27886C2.16639 8.79587 1.99707 9.39169 1.99707 9.99953C1.99707 10.6074 2.16639 11.2032 2.48603 11.7202C3.52003 13.4042 5.87203 16.2295 10 16.2295C14.128 16.2295 16.48 13.4042 17.514 11.7202C17.8337 11.2032 18.003 10.6074 18.003 9.99953C18.003 9.39169 17.8337 8.79587 17.514 8.27886ZM16.3774 11.0222C15.4894 12.4662 13.4794 14.8962 10 14.8962C6.5207 14.8962 4.5107 12.4662 3.6227 11.0222C3.43279 10.7149 3.3322 10.3608 3.3322 9.99953C3.3322 9.63828 3.43279 9.28417 3.6227 8.97686C4.5107 7.53286 6.5207 5.10286 10 5.10286C13.4794 5.10286 15.4894 7.5302 16.3774 8.97686C16.5673 9.28417 16.6679 9.63828 16.6679 9.99953C16.6679 10.3608 16.5673 10.7149 16.3774 11.0222Z" fill="#6E0AB8" />
                            <path d="M9.99984 6.66602C9.34057 6.66602 8.6961 6.86151 8.14794 7.22778C7.59977 7.59405 7.17253 8.11465 6.92024 8.72374C6.66795 9.33283 6.60194 10.003 6.73055 10.6497C6.85917 11.2963 7.17664 11.8902 7.64282 12.3564C8.10899 12.8225 8.70293 13.14 9.34954 13.2686C9.99614 13.3973 10.6664 13.3312 11.2755 13.0789C11.8845 12.8267 12.4051 12.3994 12.7714 11.8513C13.1377 11.3031 13.3332 10.6586 13.3332 9.99935C13.3321 9.11562 12.9806 8.26839 12.3557 7.6435C11.7308 7.0186 10.8836 6.66707 9.99984 6.66602ZM9.99984 11.9993C9.60428 11.9993 9.2176 11.8821 8.8887 11.6623C8.5598 11.4425 8.30345 11.1302 8.15208 10.7647C8.0007 10.3993 7.9611 9.99713 8.03827 9.60917C8.11544 9.22121 8.30592 8.86484 8.58562 8.58514C8.86533 8.30543 9.2217 8.11495 9.60966 8.03778C9.99762 7.96061 10.3998 8.00021 10.7652 8.15159C11.1307 8.30297 11.443 8.55931 11.6628 8.88821C11.8825 9.21711 11.9998 9.60379 11.9998 9.99935C11.9998 10.5298 11.7891 11.0385 11.4141 11.4136C11.039 11.7886 10.5303 11.9993 9.99984 11.9993Z" fill="#6E0AB8" />
                        </g>
                        <defs>
                            <clipPath id="clip0_3116_75389">
                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                            </clipPath>
                        </defs>
                    </svg>

                    View Details
                </button>
                <button
                    onClick={() => onReject(order)}
                    className="bg-[#FCE8E8] text-[#E51B1B] text-xs font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9999 3.99988C11.8749 3.8749 11.7053 3.80469 11.5285 3.80469C11.3518 3.80469 11.1822 3.8749 11.0572 3.99988L7.99988 7.05721L4.94255 3.99988C4.81753 3.8749 4.64799 3.80469 4.47121 3.80469C4.29444 3.80469 4.1249 3.8749 3.99988 3.99988C3.8749 4.1249 3.80469 4.29444 3.80469 4.47121C3.80469 4.64799 3.8749 4.81753 3.99988 4.94255L7.05721 7.99988L3.99988 11.0572C3.8749 11.1822 3.80469 11.3518 3.80469 11.5285C3.80469 11.7053 3.8749 11.8749 3.99988 11.9999C4.1249 12.1249 4.29444 12.1951 4.47121 12.1951C4.64799 12.1951 4.81753 12.1249 4.94255 11.9999L7.99988 8.94254L11.0572 11.9999C11.1822 12.1249 11.3518 12.1951 11.5285 12.1951C11.7053 12.1951 11.8749 12.1249 11.9999 11.9999C12.1249 11.8749 12.1951 11.7053 12.1951 11.5285C12.1951 11.3518 12.1249 11.1822 11.9999 11.0572L8.94254 7.99988L11.9999 4.94255C12.1249 4.81753 12.1951 4.64799 12.1951 4.47121C12.1951 4.29444 12.1249 4.1249 11.9999 3.99988Z" fill="#EA4949" />
                    </svg>

                    Reject
                </button>
                <button
                    onClick={() => onApprove(order)}
                    className="bg-[#34C759] text-white text-xs font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.00892 12.3243L5.78625 15.1017C6.16131 15.4766 6.66992 15.6872 7.20025 15.6872C7.73058 15.6872 8.2392 15.4766 8.61425 15.1017L17.1916 6.52434C17.313 6.3986 17.3802 6.2302 17.3787 6.0554C17.3772 5.88061 17.3071 5.7134 17.1835 5.58979C17.0599 5.46619 16.8927 5.39608 16.7179 5.39456C16.5431 5.39304 16.3747 5.46023 16.2489 5.58167L7.67159 14.159C7.54657 14.284 7.37703 14.3542 7.20025 14.3542C7.02348 14.3542 6.85394 14.284 6.72892 14.159L3.95159 11.3817C3.82585 11.2602 3.65745 11.193 3.48265 11.1946C3.30785 11.1961 3.14064 11.2662 3.01704 11.3898C2.89343 11.5134 2.82332 11.6806 2.8218 11.8554C2.82028 12.0302 2.88748 12.1986 3.00892 12.3243Z" fill="white" />
                    </svg>

                    Approve
                </button>
            </div>
        </div>
    );
};

export default PendingCard;
