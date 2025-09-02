// components/BorrowCard.tsx
import React from 'react';

export type Order = {
    id: string;
    vendor: string;
    status: 'Request Sent' | 'Delivered' | 'Borrowed';
    theme: 'gray' | 'green' | 'purple';
    expected?: string;
    items?: number | string;
    total?: string;
    active?: boolean; // highlight the first card
    lineItems?: Array<{
        productName: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }>;
    dated?: string;
};

const THEME = {
    gray: {
        border: 'border-[#E5E7EB]',
        badge: 'bg-white border-[#A1A6B5] text-[#727A90] font-semibold',
        iconWrap: 'bg-white',
        icon: (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="55" height="55" rx="9.5" fill="white" />
                <rect x="0.5" y="0.5" width="55" height="55" rx="9.5" stroke="#E5E7EB" />
                <g clipPath="url(#clip0_2019_15286)">
                    <path d="M24.0814 21.5053L27.0074 18.5783L27.0004 34.0161C27.0004 34.5683 27.4481 35.016 28.0004 35.016C28.5526 35.016 29.0003 34.5683 29.0003 34.0161L29.0073 18.5953L31.9193 21.5083C32.3166 21.892 32.9496 21.881 33.3333 21.4837C33.7076 21.0962 33.7076 20.4818 33.3333 20.0943L30.1223 16.8794C28.9511 15.7074 27.0517 15.7068 25.8797 16.878C25.8793 16.8785 25.8788 16.8789 25.8784 16.8794L22.6674 20.0913C22.2838 20.4886 22.2947 21.1216 22.692 21.5053C23.0795 21.8796 23.6939 21.8796 24.0814 21.5053Z" fill="#374957" />
                    <path d="M38.9996 32C38.4473 32 37.9996 32.4477 37.9996 33V36.9999C37.9996 37.5522 37.5519 37.9999 36.9996 37.9999H18.9999C18.4476 37.9999 17.9999 37.5522 17.9999 36.9999V33C17.9999 32.4477 17.5522 32 17 32C16.4477 32 16 32.4477 16 33V36.9999C16 38.6567 17.3431 39.9999 19 39.9999H36.9997C38.6565 39.9999 39.9996 38.6567 39.9996 36.9999V33C39.9995 32.4477 39.5518 32 38.9996 32Z" fill="#374957" />
                </g>
                <defs>
                    <clipPath id="clip0_2019_15286">
                        <rect width="24" height="24" fill="white" transform="translate(16 16)" />
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    green: {
        border: 'border border-[#34C759]',
        badge: 'bg-[#ebf9ee] border-[#34C759] text-[#34C759] font-semibold',
        iconWrap: 'bg-white',
        icon: (
            <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.16602" y="0.5" width="55" height="55" rx="9.5" fill="#ECFDF5" />
                <rect x="1.16602" y="0.5" width="55" height="55" rx="9.5" stroke="#10B981" />

                <g clipPath="url(#clip0_2755_48031)">
                    <path d="M35.666 16H21.666C20.3404 16.0016 19.0696 16.5289 18.1322 17.4662C17.1949 18.4036 16.6676 19.6744 16.666 21V35C16.6676 36.3256 17.1949 37.5964 18.1322 38.5338C19.0696 39.4711 20.3404 39.9984 21.666 40H35.666C36.9916 39.9984 38.2625 39.4711 39.1998 38.5338C40.1371 37.5964 40.6644 36.3256 40.666 35V21C40.6644 19.6744 40.1371 18.4036 39.1998 17.4662C38.2625 16.5289 36.9916 16.0016 35.666 16V16ZM38.666 35C38.666 35.7956 38.3499 36.5587 37.7873 37.1213C37.2247 37.6839 36.4617 38 35.666 38H21.666C20.8704 38 20.1073 37.6839 19.5447 37.1213C18.9821 36.5587 18.666 35.7956 18.666 35V21C18.666 20.2044 18.9821 19.4413 19.5447 18.8787C20.1073 18.3161 20.8704 18 21.666 18H35.666C36.4617 18 37.2247 18.3161 37.7873 18.8787C38.3499 19.4413 38.666 20.2044 38.666 21V35Z" fill="#10B981" />

                    <path d="M25.9988 31.9198L22.0798 28.0008C21.8923 27.8133 21.638 27.708 21.3728 27.708C21.1077 27.708 20.8534 27.8133 20.6658 28.0008C20.4784 28.1883 20.373 28.4426 20.373 28.7078C20.373 28.9729 20.4784 29.2273 20.6658 29.4148L24.5848 33.3338C24.7706 33.5196 24.9911 33.667 25.2338 33.7675C25.4765 33.8681 25.7366 33.9198 25.9993 33.9198C26.262 33.9198 26.5222 33.8681 26.7649 33.7675C27.0076 33.667 27.2281 33.5196 27.4138 33.3338L36.6658 24.0818C36.8533 23.8943 36.9586 23.6399 36.9586 23.3748C36.9586 23.1096 36.8533 22.8553 36.6658 22.6678C36.4783 22.4803 36.224 22.375 35.9588 22.375C35.6937 22.375 35.4394 22.4803 35.2518 22.6678L25.9988 31.9198Z" fill="#10B981" />
                </g>

                <defs>
                    <clipPath id="clip0_2755_48031">
                        <rect width="24" height="24" fill="white" transform="translate(16.666 16)" />
                    </clipPath>
                </defs>
            </svg>

        ),
    },
    purple: {
        border: 'border-[#6E0AB8]', 
        badge: 'bg-[#F4ECFA] border-[#6E0AB8] text-[#6A04B5] font-semibold',
        iconWrap: 'bg-white',
        icon: (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="55" height="55" rx="9.5" fill="#E6F4F5" />
                <rect x="0.5" y="0.5" width="55" height="55" rx="9.5" stroke="#E5E7EB" />
                <g clipPath="url(#clip0_7_57664)">
                    <path d="M35 16H21C19.6744 16.0016 18.4036 16.5289 17.4662 17.4662C16.5289 18.4036 16.0016 19.6744 16 21V35C16.0016 36.3256 16.5289 37.5964 17.4662 38.5338C18.4036 39.4711 19.6744 39.9984 21 40H35C36.3256 39.9984 37.5964 39.4711 38.5338 38.5338C39.4711 37.5964 39.9984 36.3256 40 35V21C39.9984 19.6744 39.4711 18.4036 38.5338 17.4662C37.5964 16.5289 36.3256 16.0016 35 16V16ZM38 35C38 35.7956 37.6839 36.5587 37.1213 37.1213C36.5587 37.6839 35.7956 38 35 38H21C20.2044 38 19.4413 37.6839 18.8787 37.1213C18.3161 36.5587 18 35.7956 18 35V21C18 20.2044 18.3161 19.4413 18.8787 18.8787C19.4413 18.3161 20.2044 18 21 18H35C35.7956 18 36.5587 18.3161 37.1213 18.8787C37.6839 19.4413 38 20.2044 38 21V35Z" fill="#009499" />
                    <path d="M25.3328 31.9198L21.4138 28.0008C21.2263 27.8133 20.972 27.708 20.7068 27.708C20.4417 27.708 20.1873 27.8133 19.9998 28.0008C19.8123 28.1883 19.707 28.4426 19.707 28.7078C19.707 28.9729 19.8123 29.2273 19.9998 29.4148L23.9188 33.3338C24.1045 33.5196 24.3251 33.667 24.5678 33.7675C24.8105 33.8681 25.0706 33.9198 25.3333 33.9198C25.596 33.9198 25.8562 33.8681 26.0989 33.7675C26.3416 33.667 26.5621 33.5196 26.7478 33.3338L35.9998 24.0818C36.1873 23.8943 36.2926 23.6399 36.2926 23.3748C36.2926 23.1096 36.1873 22.8553 35.9998 22.6678C35.8123 22.4803 35.558 22.375 35.2928 22.375C35.0277 22.375 34.7733 22.4803 34.5858 22.6678L25.3328 31.9198Z" fill="#009499" />
                </g>
                <defs>
                    <clipPath id="clip0_7_57664">
                        <rect width="24" height="24" fill="white" transform="translate(16 16)" />
                    </clipPath>
                </defs>
            </svg>

        ),
    },
    yellow: {
        border: 'border-[#E7AA0B]',
        badge: 'bg-[#FDF7E7] border-[#E7AA0B] text-[#A47908]',
        iconWrap: 'bg-white',
        icon: (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="55" height="55" rx="9.5" fill="#FDF7E7" />
                <rect x="0.5" y="0.5" width="55" height="55" rx="9.5" stroke="#E5E7EB" />
                <g clipPath="url(#clip0_21_50220)">
                    <path d="M28 31.0007C27.7348 31.0007 27.4804 30.8954 27.2929 30.7078C27.1054 30.5203 27 30.2659 27 30.0007V22.0007C27 21.7355 27.1054 21.4812 27.2929 21.2936C27.4804 21.1061 27.7348 21.0007 28 21.0007C28.2652 21.0007 28.5196 21.1061 28.7071 21.2936C28.8946 21.4812 29 21.7355 29 22.0007V30.0007C29 30.2659 28.8946 30.5203 28.7071 30.7078C28.5196 30.8954 28.2652 31.0007 28 31.0007ZM28.793 39.7607C30.953 38.8927 38 35.4797 38 28.0437V22.8727C38.0011 21.8217 37.6706 20.7972 37.0554 19.945C36.4403 19.0929 35.5719 18.4566 34.574 18.1267L28.315 16.0517C28.1107 15.9828 27.8893 15.9828 27.685 16.0517L21.426 18.1267C20.4281 18.4566 19.5598 19.0929 18.9446 19.945C18.3295 20.7972 17.9989 21.8217 18 22.8727V28.0437C18 34.6057 25.005 38.6197 27.153 39.6937C27.4247 39.8234 27.7084 39.9262 28 40.0007C28.2712 39.9453 28.5366 39.8649 28.793 39.7607ZM33.944 20.0247C34.5425 20.2231 35.0633 20.6051 35.4324 21.1164C35.8015 21.6276 36.0001 22.2422 36 22.8727V28.0437C36 34.2267 29.913 37.1547 28.047 37.9047C26.159 36.9607 20 33.4597 20 28.0437V22.8727C19.9999 22.2422 20.1985 21.6276 20.5676 21.1164C20.9367 20.6051 21.4575 20.2231 22.056 20.0247L28 18.0547L33.944 20.0247ZM28 33.0007C27.8022 33.0007 27.6089 33.0594 27.4444 33.1693C27.28 33.2791 27.1518 33.4353 27.0761 33.618C27.0004 33.8008 26.9806 34.0018 27.0192 34.1958C27.0578 34.3898 27.153 34.568 27.2929 34.7078C27.4327 34.8477 27.6109 34.9429 27.8049 34.9815C27.9989 35.0201 28.2 35.0003 28.3827 34.9246C28.5654 34.8489 28.7216 34.7207 28.8315 34.5563C28.9414 34.3918 29 34.1985 29 34.0007C29 33.7355 28.8946 33.4812 28.7071 33.2936C28.5196 33.1061 28.2652 33.0007 28 33.0007Z" fill="#D29B0A" />
                </g>
                <defs>
                    <clipPath id="clip0_21_50220">
                        <rect width="24" height="24" fill="white" transform="translate(16 16)" />
                    </clipPath>
                </defs>
            </svg>

        ),
    },
} as const;

export default function BorrowCard({ order, onCardClick }: { order: Order; onCardClick: (order: Order) => void }) {
    const t = THEME[order.theme];

    return (
        <div
            className={[
                // allow cards to grow naturally based on content
                'flex flex-col h-fit',
                'rounded-xl p-4 transition',
                'border cursor-pointer',
                order.active ? 'border-[#6E0AB8] bg-purple-50 ring-1 ring-[#6E0AB8]' : 'border-[#E5E7EB] bg-white hover:shadow-md',
            ].join(' ')}
            onClick={() => onCardClick(order)}
        >
            {/* TOP SECTION: icon + title/vendor (left) | status (right) */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                   

                    {/* Title and vendor text to the right of icon */}
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-gray-900 text-sm leading-5 truncate">
                            {order.id}
                        </h3>
                        <span className="w-full px-2 py-0.5 mt-2 bg-[#F8F8FC] border border-gray-200 text-black text-xs rounded-md ">
                            <span className=" font-semibold">Vendor :</span> <span className="font-semibold ml-1">{order.vendor}</span>
                        </span>
                    </div>
                </div>

                                 <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 border ${t.badge}`}>
                     {order.status}
                 </span>
            </div>

            {/* Divider */}
            <div className={`h-px my-3 ${order.active ? 'bg-[#A1A6B5]' : 'bg-[#E5E7EB]'}`} />

            {/* Bottom stats (stick to bottom if top grows) */}
            <div className="grid grid-cols-3 gap-2 text-[12px] mt-auto">
                <div>
                    <p className="text-[#727A90]">Expected</p>
                    <p className="font-semibold text-[#515766] mt-1">{order.expected ?? '01/02/2025'}</p>
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
            

        </div>
    );
}
