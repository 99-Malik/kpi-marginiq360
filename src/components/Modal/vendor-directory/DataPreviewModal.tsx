'use client';

import React, { useMemo, useState } from 'react';

type Action = 'keep' | 'discard';

interface ColumnData {
    id: string;
    name: string;
    example: string;
    action: Action;
}

interface DataPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (columns: ColumnData[]) => void;
    onDiscard: () => void;
    keepLimit?: number; // default 5
}

const DataPreviewModal: React.FC<DataPreviewModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDiscard,
    keepLimit = 5,
}) => {
    const [columns, setColumns] = useState<ColumnData[]>([
        { id: '1', name: 'Vendor Name', example: '(e.g, Gordon Food Service)', action: 'keep' },
        { id: '2', name: 'Contact Person', example: '(e.g, Maya Thompson)', action: 'keep' },
        { id: '3', name: 'Phone', example: '(e.g, 102-242-26426)', action: 'keep' },
        { id: '4', name: 'Address', example: '(e.g, USA, New York Avenue 15, Central Park)', action: 'keep' },
        { id: '5', name: 'Delivery Days', example: '(e.g, 5 Days)', action: 'keep' },
        { id: '6', name: 'Payment Terms', example: '(e.g, Cash)', action: 'discard' },
        { id: '7', name: 'Action', example: '(e.g, Edit/Delete)', action: 'discard' },
    ]);

    const keptCount = useMemo(
        () => columns.filter(c => c.action === 'keep').length,
        [columns]
    );

    const toggleAction = (id: string) => {
        setColumns(prev =>
            prev.map(c => {
                if (c.id !== id) return c;
                if (c.action === 'discard' && keptCount >= keepLimit) return c; // don’t exceed limit
                return { ...c, action: c.action === 'keep' ? 'discard' : 'keep' };
            })
        );
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
            onClick={onClose}
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
                    <h2 className="text-[22px] leading-7 font-semibold text-[#1D2433]">
                        Data Preview
                    </h2>
                    <button
                        onClick={onClose}
                        className="h-9 w-9 grid place-items-center"
                        aria-label="Close"
                    >
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="1" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                            <g clip-path="url(#clip0_3807_5491)">
                                <path d="M16.9425 16.4996L23.8045 9.63762C23.926 9.51189 23.9932 9.34348 23.9916 9.16869C23.9901 8.99389 23.92 8.82668 23.7964 8.70307C23.6728 8.57947 23.5056 8.50936 23.3308 8.50784C23.156 8.50632 22.9876 8.57352 22.8619 8.69495L15.9999 15.557L9.13786 8.69495C9.01212 8.57352 8.84372 8.50632 8.66892 8.50784C8.49413 8.50936 8.32692 8.57947 8.20331 8.70307C8.07971 8.82668 8.00959 8.99389 8.00807 9.16869C8.00656 9.34348 8.07375 9.51189 8.19519 9.63762L15.0572 16.4996L8.19519 23.3616C8.07021 23.4866 8 23.6562 8 23.833C8 24.0097 8.07021 24.1793 8.19519 24.3043C8.32021 24.4293 8.48975 24.4995 8.66652 24.4995C8.8433 24.4995 9.01284 24.4293 9.13786 24.3043L15.9999 17.4423L22.8619 24.3043C22.9869 24.4293 23.1564 24.4995 23.3332 24.4995C23.51 24.4995 23.6795 24.4293 23.8045 24.3043C23.9295 24.1793 23.9997 24.0097 23.9997 23.833C23.9997 23.6562 23.9295 23.4866 23.8045 23.3616L16.9425 16.4996Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3807_5491">
                                    <rect width="16" height="16" fill="white" transform="translate(8 8.5)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </div>
                <div className="h-[1px] bg-[#E7E9EE] mb-6"></div>
                {/* Table */}
                <div className="px-6">
                    <div className="rounded-[18px] border border-[#E7E9EE] overflow-hidden">
                        {/* Header row */}
                        <div className="grid grid-cols-2 items-center bg-white px-5 py-4 border-b border-[#E7E9EE]">
                            <div className="flex items-center justify-between text-[13px] font-medium text-[#3A4356]">
                                <span className='text-[#727A90] font-semibold'>Column Names</span>
                                <div className="pr-6">
                                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.81039 7.25H13.1894C13.3377 7.25003 13.4827 7.29404 13.606 7.37645C13.7293 7.45886 13.8254 7.57598 13.8821 7.71301C13.9389 7.85003 13.9538 8.00081 13.9248 8.14627C13.8959 8.29174 13.8245 8.42536 13.7196 8.53025L9.53014 12.7197C9.38949 12.8603 9.19876 12.9393 8.99989 12.9393C8.80101 12.9393 8.61028 12.8603 8.46964 12.7197L4.28014 8.53025C4.17528 8.42536 4.10388 8.29174 4.07495 8.14627C4.04602 8.00081 4.06088 7.85003 4.11763 7.71301C4.17438 7.57598 4.27049 7.45886 4.39379 7.37645C4.5171 7.29404 4.66207 7.25003 4.81039 7.25Z" fill="#8E95A6" />
                                    </svg>

                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-[13px] font-medium text-[#3A4356]">
                                <span className='text-[#727A90] font-semibold'>Actions</span>
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.81039 7.25H13.1894C13.3377 7.25003 13.4827 7.29404 13.606 7.37645C13.7293 7.45886 13.8254 7.57598 13.8821 7.71301C13.9389 7.85003 13.9538 8.00081 13.9248 8.14627C13.8959 8.29174 13.8245 8.42536 13.7196 8.53025L9.53014 12.7197C9.38949 12.8603 9.19876 12.9393 8.99989 12.9393C8.80101 12.9393 8.61028 12.8603 8.46964 12.7197L4.28014 8.53025C4.17528 8.42536 4.10388 8.29174 4.07495 8.14627C4.04602 8.00081 4.06088 7.85003 4.11763 7.71301C4.17438 7.57598 4.27049 7.45886 4.39379 7.37645C4.5171 7.29404 4.66207 7.25003 4.81039 7.25Z" fill="#8E95A6" />
                                </svg>

                            </div>
                        </div>

                        {/* Body rows */}
                        <div className="divide-y divide-[#F0F2F5]">
                            {columns.map((col, i) => {
                                const isKeep = col.action === 'keep';
                                const atLimit = keptCount >= keepLimit && !isKeep;
                                const zebra = i % 2 === 1 ? 'bg-[#F7F8FA]' : 'bg-white';
                                return (
                                    <div
                                        key={col.id}
                                        className={`grid grid-cols-2 items-center px-5 py-4 ${zebra} relative`}
                                    >
                                        {/* Left cell */}
                                        <div className="pr-4">
                                            <div className="text-[14px] font-medium text-[#1D2433]">{col.name}</div>
                                            <div className="mt-1 text-[12px] text-[#7A8397]">{col.example}</div>
                                        </div>

                                        {/* Right cell */}
                                        <div className="pl-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <span className={`text-[13px] ${isKeep ? 'text-[#A0A7B8]' : 'text-[#E51B1B] font-medium'}`}>
                                                    Discard
                                                </span>

                                                {/* Toggle */}
                                                <button
                                                    role="switch"
                                                    aria-checked={isKeep}
                                                    aria-label={`Toggle ${col.name}`}
                                                    onClick={() => toggleAction(col.id)}
                                                    disabled={atLimit}
                                                    className={`
                                                         relative inline-flex h-6 w-10 items-center rounded-full transition-colors 
                                                         ${isKeep ? 'bg-[#6E0AB8] border-[#6E0AB8]' : 'bg-red-100 border-[#E51B1B] border-2'}
                                                         ${atLimit ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-95'}
                                                     `}
                                                >
                                                    <span
                                                        className={`
                                                             inline-block h-3 w-3 transform rounded-full shadow
                                                             transition-transform ${isKeep ? 'translate-x-6 bg-white' : 'translate-x-1 bg-[#E51B1B]'}
                                                         `}
                                                    />
                                                </button>

                                                <span className={`text-[13px] ${isKeep ? 'text-[#6E0AB8] font-medium' : 'text-[#A0A7B8]'}`}>
                                                    Keep
                                                </span>
                                            </div>
                                        </div>

                                        {/* Vertical divider line */}
                                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E7E9EE]"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Info pill */}
                    <div className="mt-4 rounded-2xl border border-[#E7E9EE] bg-[#F7F8FA] px-4 py-2 flex items-center gap-2">
                        <svg width="32" height="37" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="4.5" width="32" height="32" rx="16" fill="white" />
                            <g clip-path="url(#clip0_2755_72809)">
                                <path d="M16 28.5C17.5823 28.5 19.129 28.0308 20.4446 27.1518C21.7602 26.2727 22.7855 25.0233 23.391 23.5615C23.9965 22.0997 24.155 20.4911 23.8463 18.9393C23.5376 17.3874 22.7757 15.962 21.6569 14.8431C20.538 13.7243 19.1126 12.9624 17.5607 12.6537C16.0089 12.345 14.4003 12.5035 12.9385 13.109C11.4767 13.7145 10.2273 14.7398 9.34824 16.0554C8.46919 17.371 8 18.9178 8 20.5C8.00229 22.621 8.84589 24.6545 10.3457 26.1543C11.8455 27.6541 13.879 28.4977 16 28.5ZM16 15.8333C16.1978 15.8333 16.3911 15.892 16.5556 16.0019C16.72 16.1117 16.8482 16.2679 16.9239 16.4507C16.9996 16.6334 17.0194 16.8344 16.9808 17.0284C16.9422 17.2224 16.847 17.4006 16.7071 17.5404C16.5673 17.6803 16.3891 17.7755 16.1951 17.8141C16.0011 17.8527 15.8 17.8329 15.6173 17.7572C15.4346 17.6815 15.2784 17.5534 15.1685 17.3889C15.0586 17.2245 15 17.0311 15 16.8333C15 16.5681 15.1054 16.3138 15.2929 16.1262C15.4804 15.9387 15.7348 15.8333 16 15.8333ZM15.3333 19.1667H16C16.3536 19.1667 16.6928 19.3071 16.9428 19.5572C17.1929 19.8072 17.3333 20.1464 17.3333 20.5V24.5C17.3333 24.6768 17.2631 24.8464 17.1381 24.9714C17.013 25.0964 16.8435 25.1667 16.6667 25.1667C16.4899 25.1667 16.3203 25.0964 16.1953 24.9714C16.0702 24.8464 16 24.6768 16 24.5V20.5H15.3333C15.1565 20.5 14.987 20.4298 14.8619 20.3047C14.7369 20.1797 14.6667 20.0101 14.6667 19.8333C14.6667 19.6565 14.7369 19.487 14.8619 19.3619C14.987 19.2369 15.1565 19.1667 15.3333 19.1667Z" fill="#E7AA0B" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2755_72809">
                                    <rect width="16" height="16" fill="white" transform="translate(8 12.5)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className="text-[14px] text-[#3A4356] font-medium">
                            Only {keepLimit} Columns allowed to keep
                        </span>
                    </div>

                </div>
                <div className="h-[1px] bg-[#E7E9EE] my-6"></div>
                {/* Footer */}
                <div className="mt-6 mb-6 flex items-center justify-between px-6">
                    <button
                        onClick={onDiscard}
                        className="inline-flex items-center gap-1 rounded-xl border border-[#E9EAEA] bg-white px-5 py-2 text-[#3A4356] hover:bg-[#F7F8FA]"
                    >
                        <span className="inline-grid h-6 w-6 ">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3807_28241)">
                                    <path d="M10.9425 10.4996L17.8045 3.63762C17.926 3.51189 17.9932 3.34348 17.9916 3.16869C17.9901 2.99389 17.92 2.82668 17.7964 2.70307C17.6728 2.57947 17.5056 2.50936 17.3308 2.50784C17.156 2.50632 16.9876 2.57352 16.8619 2.69495L9.99986 9.55695L3.13786 2.69495C3.01212 2.57352 2.84372 2.50632 2.66892 2.50784C2.49413 2.50936 2.32692 2.57947 2.20331 2.70307C2.07971 2.82668 2.00959 2.99389 2.00807 3.16869C2.00656 3.34348 2.07375 3.51189 2.19519 3.63762L9.05719 10.4996L2.19519 17.3616C2.07021 17.4866 2 17.6562 2 17.833C2 18.0097 2.07021 18.1793 2.19519 18.3043C2.32021 18.4293 2.48975 18.4995 2.66652 18.4995C2.8433 18.4995 3.01284 18.4293 3.13786 18.3043L9.99986 11.4423L16.8619 18.3043C16.9869 18.4293 17.1564 18.4995 17.3332 18.4995C17.51 18.4995 17.6795 18.4293 17.8045 18.3043C17.9295 18.1793 17.9997 18.0097 17.9997 17.833C17.9997 17.6562 17.9295 17.4866 17.8045 17.3616L10.9425 10.4996Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3807_28241">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2.5)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </span>
                        <span className="text-[14px] font-medium text-[#727A90]">Discard</span>
                    </button>

                    <button
                        onClick={() => onSave(columns)}
                        disabled={keptCount === 0}
                        className="
                inline-flex items-center gap-2 rounded-xl px-4 py-3
                bg-primary text-white
             transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                    >
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3807_590)">
                                <path d="M14.8794 3.45401L5.66675 12.666C5.60481 12.7282 5.5312 12.7775 5.45014 12.8112C5.36909 12.8449 5.28218 12.8622 5.19441 12.8622C5.10665 12.8622 5.01974 12.8449 4.93868 12.8112C4.85763 12.7775 4.78402 12.7282 4.72208 12.666L1.15941 9.10001C1.09747 9.03782 1.02387 8.98848 0.94281 8.95481C0.861755 8.92114 0.77485 8.90381 0.687081 8.90381C0.599312 8.90381 0.512406 8.92114 0.431351 8.95481C0.350296 8.98848 0.276687 9.03782 0.214747 9.10001C0.152563 9.16194 0.103221 9.23555 0.0695536 9.31661C0.0358858 9.39767 0.0185547 9.48457 0.0185547 9.57234C0.0185547 9.66011 0.0358858 9.74701 0.0695536 9.82807C0.103221 9.90912 0.152563 9.98273 0.214747 10.0447L3.77875 13.608C4.15471 13.9833 4.66421 14.194 5.19541 14.194C5.72662 14.194 6.23612 13.9833 6.61208 13.608L15.8241 4.39801C15.8862 4.33608 15.9354 4.26251 15.969 4.18152C16.0026 4.10052 16.0199 4.0137 16.0199 3.92601C16.0199 3.83832 16.0026 3.75149 15.969 3.67049C15.9354 3.5895 15.8862 3.51593 15.8241 3.45401C15.7621 3.39182 15.6885 3.34248 15.6075 3.30881C15.5264 3.27514 15.4395 3.25781 15.3517 3.25781C15.264 3.25781 15.1771 3.27514 15.096 3.30881C15.015 3.34248 14.9414 3.39182 14.8794 3.45401Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3807_590">
                                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className="text-[14px] font-medium">Save &amp; Update to Products</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataPreviewModal;
