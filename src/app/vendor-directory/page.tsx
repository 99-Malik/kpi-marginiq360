'use client';

import React, { useState } from 'react'
import Pagination from '@/components/Pagination/vendor-directory/page';
import AddVendorModal from '@/components/Modal/vendor-directory/AddVendor';

interface VendorFormData {
    vendorName: string;
    category: string;
    paymentTerms: string;
    deliveryDays: string;
    phoneNumber: string;
    contactPerson: string;
    address: string;
}

function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingVendor, setEditingVendor] = useState<VendorFormData | null>(null);

    const handleLogoClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleAddVendor = (data: VendorFormData) => {
        console.log('New vendor data:', data);
        setIsAddVendorOpen(false);
        setModalMode('add');
        setEditingVendor(null);
    };

    const handleEditVendor = (vendor: VendorFormData) => {
        setEditingVendor(vendor);
        setModalMode('edit');
        setIsAddVendorOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddVendorOpen(false);
        setModalMode('add');
        setEditingVendor(null);
    };

    return (
       <>

                <main className="flex-1 overflow-auto px-2 pb-6 bg-white">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                            {/* left: title + subtitle */}
                            <div className="min-w-0">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Vendor Directory
                                </h1>
                                <p className="text-gray-500 mt-2 sm:max-w-[60ch] md:text-xs lg:text-xs xl:text-base">
                                    You can add your vendor details here
                                </p>
                            </div>

                            {/* right: actions - buttons below on md, same row on lg */}
                            <div className="flex items-center lg:mt-6 xl:mt-4 gap-2 sm:gap-3 flex-wrap lg:flex-nowrap justify-end lg:justify-start">
                                {/* Button 1 */}

                                {/* Button 3 */}
                                <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-2 rounded-lg bg-[#F1E7F8] px-3 text-sm font-semibold text-primary cursor-pointer"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3899_30636)">
                                            <path d="M8.58614 14.0813C8.77187 14.2672 8.9924 14.4146 9.23514 14.5152C9.47787 14.6158 9.73805 14.6676 10.0008 14.6676C10.2636 14.6676 10.5237 14.6158 10.7665 14.5152C11.0092 14.4146 11.2297 14.2672 11.4155 14.0813L13.5561 11.9407C13.6709 11.8137 13.7325 11.6475 13.7281 11.4764C13.7237 11.3054 13.6537 11.1425 13.5325 11.0216C13.4114 10.9008 13.2484 10.8311 13.0773 10.8271C12.9062 10.823 12.7402 10.885 12.6135 11L10.6628 12.9513L10.6675 2.66667C10.6675 2.48986 10.5972 2.32029 10.4722 2.19526C10.3472 2.07024 10.1776 2 10.0008 2V2C9.82399 2 9.65442 2.07024 9.5294 2.19526C9.40437 2.32029 9.33413 2.48986 9.33413 2.66667L9.32814 12.9387L7.38814 11C7.26304 10.875 7.09341 10.8048 6.91657 10.8049C6.73972 10.8049 6.57014 10.8752 6.44514 11.0003C6.32013 11.1254 6.24994 11.2951 6.25 11.4719C6.25006 11.6487 6.32037 11.8183 6.44547 11.9433L8.58614 14.0813Z" fill="#6E0AB8" />
                                            <path d="M17.3333 12.666C17.1565 12.666 16.987 12.7363 16.8619 12.8613C16.7369 12.9863 16.6667 13.1559 16.6667 13.3327V15.9993C16.6667 16.1762 16.5964 16.3457 16.4714 16.4707C16.3464 16.5958 16.1768 16.666 16 16.666H4C3.82319 16.666 3.65362 16.5958 3.5286 16.4707C3.40357 16.3457 3.33333 16.1762 3.33333 15.9993V13.3327C3.33333 13.1559 3.2631 12.9863 3.13807 12.8613C3.01305 12.7363 2.84348 12.666 2.66667 12.666C2.48986 12.666 2.32029 12.7363 2.19526 12.8613C2.07024 12.9863 2 13.1559 2 13.3327V15.9993C2 16.5298 2.21071 17.0385 2.58579 17.4136C2.96086 17.7886 3.46957 17.9993 4 17.9993H16C16.5304 17.9993 17.0391 17.7886 17.4142 17.4136C17.7893 17.0385 18 16.5298 18 15.9993V13.3327C18 13.1559 17.9298 12.9863 17.8047 12.8613C17.6797 12.7363 17.5101 12.666 17.3333 12.666Z" fill="#8B3BC6" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3899_30636">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>


                                    <span className="whitespace-nowrap text-xs text-primary">Export Report</span>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-2 rounded-lg bg-white border border-primary px-3 text-sm font-semibold text-primary cursor-pointer"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3899_27000)">
                                            <path d="M7.38763 5.67019L9.33826 3.71888L9.3336 14.0107C9.3336 14.3789 9.63207 14.6774 10.0003 14.6774C10.3684 14.6774 10.6669 14.3789 10.6669 14.0107L10.6716 3.73022L12.6129 5.67219C12.8777 5.92797 13.2997 5.92066 13.5555 5.65582C13.805 5.39748 13.805 4.98789 13.5555 4.72955L11.4149 2.58624C10.6341 1.80494 9.36779 1.80453 8.58649 2.58533C8.58618 2.58565 8.5859 2.58593 8.58558 2.58624L6.44496 4.72755C6.18918 4.99239 6.19649 5.41442 6.46133 5.67019C6.71967 5.91972 7.12926 5.91972 7.38763 5.67019Z" fill="#6E0AB8" />
                                            <path d="M17.333 12.666C16.9649 12.666 16.6664 12.9645 16.6664 13.3327V15.9993C16.6664 16.3675 16.3679 16.6659 15.9998 16.6659H3.99994C3.63176 16.6659 3.33329 16.3675 3.33329 15.9993V13.3327C3.33329 12.9645 3.03483 12.666 2.66665 12.666C2.29846 12.666 2 12.9645 2 13.3327V15.9993C2 17.1038 2.89542 17.9993 3.99997 17.9993H15.9998C17.1043 17.9993 17.9997 17.1038 17.9997 15.9993V13.3327C17.9997 12.9645 17.7012 12.666 17.333 12.666Z" fill="#6E0AB8" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3899_27000">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>



                                    <span className="whitespace-nowrap text-xs text-primary">Upload File</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setModalMode('add');
                                        setEditingVendor(null);
                                        setIsAddVendorOpen(true);
                                    }}
                                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-sm text-white cursor-pointer"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3627_931)">
                                            <path d="M17.3333 9.33333H10.6667V2.66667C10.6667 2.48986 10.5964 2.32029 10.4714 2.19526C10.3464 2.07024 10.1768 2 10 2V2C9.82319 2 9.65362 2.07024 9.5286 2.19526C9.40357 2.32029 9.33333 2.48986 9.33333 2.66667V9.33333H2.66667C2.48986 9.33333 2.32029 9.40357 2.19526 9.5286C2.07024 9.65362 2 9.82319 2 10V10C2 10.1768 2.07024 10.3464 2.19526 10.4714C2.32029 10.5964 2.48986 10.6667 2.66667 10.6667H9.33333V17.3333C9.33333 17.5101 9.40357 17.6797 9.5286 17.8047C9.65362 17.9298 9.82319 18 10 18C10.1768 18 10.3464 17.9298 10.4714 17.8047C10.5964 17.6797 10.6667 17.5101 10.6667 17.3333V10.6667H17.3333C17.5101 10.6667 17.6797 10.5964 17.8047 10.4714C17.9298 10.3464 18 10.1768 18 10C18 9.82319 17.9298 9.65362 17.8047 9.5286C17.6797 9.40357 17.5101 9.33333 17.3333 9.33333Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3627_931">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="whitespace-nowrap text-xs text-white">Add vendor</span>
                                </button>
                            </div>

                        </div>


                    </div>
                    <div>
                        <Pagination onEditVendor={handleEditVendor} />
                    </div>
                </main>
            

            {/* Add/Edit Vendor Modal */}
            <AddVendorModal 
                isOpen={isAddVendorOpen}
                onClose={handleCloseModal}
                onSubmit={handleAddVendor}
                mode={modalMode}
                editingVendor={editingVendor}
            />
            </>

    )
}
export default Page