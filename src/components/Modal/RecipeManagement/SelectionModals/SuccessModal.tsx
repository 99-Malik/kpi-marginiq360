'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Check, X } from 'lucide-react';
import { Fragment } from 'react';

export default function SuccessModal({
    open,
    onClose,
    createdAt,
    title = "Recipe Created Successfully!",
}: {
    open: boolean;
    onClose: () => void;
    createdAt: Date;
    title?: string;
}) {
    // Format like: "26 Mon 2025, 11:00 AM"
    const d = createdAt ?? new Date();
    const day = d.getDate();
    const wk = d.toLocaleDateString('en-US', { weekday: 'short' });
    const year = d.getFullYear();
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <Transition show={open} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-[9999]">
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" />
                </Transition.Child>

                {/* Panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-2 scale-95"
                        enterTo="opacity-100 translate-y-0 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0 scale-100"
                        leaveTo="opacity-0 translate-y-1 scale-95"
                    >
                        <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                            {/* Close */}
                            <button
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute right-3.5 top-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2092_22249)">
                                        <path d="M15.8045 0.195435C15.6795 0.0704544 15.51 0.000244141 15.3332 0.000244141C15.1564 0.000244141 14.9869 0.0704544 14.8619 0.195435L7.99986 7.05744L1.13786 0.195435C1.01284 0.0704544 0.8433 0.000244141 0.666524 0.000244141C0.489748 0.000244141 0.320209 0.0704544 0.195191 0.195435C0.0702103 0.320454 0 0.489992 0 0.666768C0 0.843545 0.0702103 1.01308 0.195191 1.1381L7.05719 8.0001L0.195191 14.8621C0.0702103 14.9871 0 15.1567 0 15.3334C0 15.5102 0.0702103 15.6798 0.195191 15.8048C0.320209 15.9298 0.489748 16 0.666524 16C0.8433 16 1.01284 15.9298 1.13786 15.8048L7.99986 8.94277L14.8619 15.8048C14.9869 15.9298 15.1564 16 15.3332 16C15.51 16 15.6795 15.9298 15.8045 15.8048C15.9295 15.6798 15.9997 15.5102 15.9997 15.3334C15.9997 15.1567 15.9295 14.9871 15.8045 14.8621L8.94252 8.0001L15.8045 1.1381C15.9295 1.01308 15.9997 0.843545 15.9997 0.666768C15.9997 0.489992 15.9295 0.320454 15.8045 0.195435Z" fill="#727A90" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2092_22249">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </button>

                            <div className="px-6 py-8 text-center">
                                {/* Check icon badge */}
                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-ful">
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="72" height="72" rx="36" fill="#F4ECFA" />
                                        <g clipPath="url(#clip0_2092_22251)">
                                            <path d="M49.7588 25.908L31.3335 44.332C31.2096 44.4564 31.0624 44.5551 30.9003 44.6224C30.7382 44.6897 30.5644 44.7244 30.3888 44.7244C30.2133 44.7244 30.0395 44.6897 29.8774 44.6224C29.7153 44.5551 29.568 44.4564 29.4442 44.332L22.3188 37.2C22.1949 37.0756 22.0477 36.977 21.8856 36.9096C21.7235 36.8423 21.5497 36.8076 21.3742 36.8076C21.1986 36.8076 21.0248 36.8423 20.8627 36.9096C20.7006 36.977 20.5534 37.0756 20.4295 37.2C20.3051 37.3239 20.2064 37.4711 20.1391 37.6332C20.0718 37.7953 20.0371 37.9691 20.0371 38.1447C20.0371 38.3202 20.0718 38.494 20.1391 38.6561C20.2064 38.8182 20.3051 38.9655 20.4295 39.0893L27.5575 46.216C28.3094 46.9665 29.3284 47.3881 30.3908 47.3881C31.4532 47.3881 32.4722 46.9665 33.2242 46.216L51.6482 27.796C51.7723 27.6722 51.8708 27.525 51.9381 27.363C52.0053 27.201 52.0399 27.0274 52.0399 26.852C52.0399 26.6766 52.0053 26.503 51.9381 26.341C51.8708 26.179 51.7723 26.0319 51.6482 25.908C51.5243 25.7836 51.3771 25.685 51.215 25.6176C51.0528 25.5503 50.879 25.5156 50.7035 25.5156C50.528 25.5156 50.3541 25.5503 50.192 25.6176C50.0299 25.685 49.8827 25.7836 49.7588 25.908Z" fill="#6E0AB8" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2092_22251">
                                                <rect width="32" height="32" fill="white" transform="translate(20 20)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>

                                <Dialog.Title className="text-base font-semibold text-gray-900">
                                    {title}
                                </Dialog.Title>
                                <p className="mt-2 text-sm text-gray-500">
                                    Your recipe has been created at<br />
                                    <span className="font-bold text-gray-500">
                                        {day} {wk} {year}, {time}
                                    </span>
                                </p>


                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
