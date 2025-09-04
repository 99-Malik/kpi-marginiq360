'use client';

import React, { useState } from 'react'
import Pagination from '@/components/Pagination/ManageProducts/page';
import DataFetchingModal from '@/components/Modal/ManageProducts/DataFetching/DataFetchingModal';
import DataPreviewModal from '@/components/Modal/ManageProducts/DataPreview/DataPreviewModal';
import ProductUpdatedModal from '@/components/Modal/ManageProducts/ProductUpdated/ProductUpdateModal';

function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDataFetchingOpen, setIsDataFetchingOpen] = useState(false);
    const [isDataPreviewOpen, setIsDataPreviewOpen] = useState(false);
    const [isProductUpdatedOpen, setIsProductUpdatedOpen] = useState(false);

    const handleLogoClick = () => {
        setMenuOpen(!menuOpen);
    };

    // Handle upload file button click
    const handleUploadFile = () => {
        setIsDataFetchingOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsDataFetchingOpen(false);
    };

    // Handle export report button click
    const handleExportReport = () => {
        setIsDataPreviewOpen(true);
    };

    // Handle data preview modal close
    const handleCloseDataPreview = () => {
        setIsDataPreviewOpen(false);
    };

    // Handle data preview save
    const handleDataPreviewSave = (columns: { id: string; name: string; example: string; action: 'keep' | 'discard' }[]) => {
        console.log('Selected columns:', columns);
        setIsDataPreviewOpen(false);
        setIsProductUpdatedOpen(true);
        // Add your save logic here
    };

    // Handle data preview discard
    const handleDataPreviewDiscard = () => {
        setIsDataPreviewOpen(false);
        // Add your discard logic here
    };

    return (
      <>

                <main className="flex-1 overflow-auto px-2 pb-6 bg-white">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                            {/* left: title + subtitle */}
                            <div className="min-w-0">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Manage Products</h1>
                                <p className="text-gray-500 mt-2 sm:max-w-[60ch] md:text-xs lg:text-xs xl:text-base">
                                    You can manage your products details here
                                </p>
                            </div>

                            {/* right: actions - buttons below on md, same row on lg */}
                            <div className="flex items-center lg:mt-6 xl:mt-4 gap-2 sm:gap-3 flex-wrap lg:flex-nowrap justify-end lg:justify-start">


                                {/* Button 3 */}
                                <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-2 rounded-lg bg-none border border-[#D2B3E9] px-3 text-sm font-semibold text-primary cursor-pointer"
                                    onClick={handleExportReport}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2741_38943)">
                                            <path d="M6.58614 12.0813C6.77187 12.2672 6.9924 12.4146 7.23514 12.5152C7.47787 12.6158 7.73805 12.6676 8.0008 12.6676C8.26355 12.6676 8.52373 12.6158 8.76646 12.5152C9.0092 12.4146 9.22973 12.2672 9.41547 12.0813L11.5561 9.94067C11.6709 9.81373 11.7325 9.64752 11.7281 9.47644C11.7237 9.30536 11.6537 9.14253 11.5325 9.02165C11.4114 8.90077 11.2484 8.8311 11.0773 8.82707C10.9062 8.82304 10.7402 8.88496 10.6135 9L8.6628 10.9513L8.66747 0.666667C8.66747 0.489856 8.59723 0.320286 8.47221 0.195262C8.34718 0.0702379 8.17761 0 8.0008 0V0C7.82399 0 7.65442 0.0702379 7.5294 0.195262C7.40437 0.320286 7.33413 0.489856 7.33413 0.666667L7.32814 10.9387L5.38814 9C5.26304 8.875 5.09341 8.8048 4.91657 8.80486C4.73972 8.80493 4.57014 8.87524 4.44514 9.00033C4.32013 9.12543 4.24994 9.29506 4.25 9.4719C4.25006 9.64875 4.32037 9.81833 4.44547 9.94333L6.58614 12.0813Z" fill="#6E0AB8" />
                                            <path d="M15.3333 10.666C15.1565 10.666 14.987 10.7363 14.8619 10.8613C14.7369 10.9863 14.6667 11.1559 14.6667 11.3327V13.9993C14.6667 14.1762 14.5964 14.3457 14.4714 14.4707C14.3464 14.5958 14.1768 14.666 14 14.666H2C1.82319 14.666 1.65362 14.5958 1.5286 14.4707C1.40357 14.3457 1.33333 14.1762 1.33333 13.9993V11.3327C1.33333 11.1559 1.2631 10.9863 1.13807 10.8613C1.01305 10.7363 0.843478 10.666 0.666667 10.666C0.489856 10.666 0.320286 10.7363 0.195262 10.8613C0.0702379 10.9863 0 11.1559 0 11.3327L0 13.9993C0 14.5298 0.210714 15.0385 0.585786 15.4136C0.960859 15.7886 1.46957 15.9993 2 15.9993H14C14.5304 15.9993 15.0391 15.7886 15.4142 15.4136C15.7893 15.0385 16 14.5298 16 13.9993V11.3327C16 11.1559 15.9298 10.9863 15.8047 10.8613C15.6797 10.7363 15.5101 10.666 15.3333 10.666Z" fill="#6E0AB8" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2741_38943">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>


                                    <span className="whitespace-nowrap text-xs text-primary">Export Report</span>
                                </button>

                                <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-sm text-white cursor-pointer"
                                    onClick={handleUploadFile}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2741_38937)">
                                            <path d="M12.2661 4.91861C12.1455 4.88421 12.0354 4.8202 11.9459 4.73241C11.8563 4.64462 11.7902 4.53583 11.7534 4.41594C11.5492 3.72397 11.2068 3.08062 10.7468 2.5248C10.2869 1.96899 9.71891 1.51228 9.07734 1.18231C8.43576 0.852343 7.73391 0.655971 7.01425 0.605082C6.29459 0.554192 5.57208 0.649843 4.89046 0.886245C4.20883 1.12265 3.58225 1.49489 3.04864 1.98044C2.51503 2.46599 2.08548 3.05476 1.78598 3.71111C1.48648 4.36747 1.32327 5.07776 1.30621 5.79902C1.28915 6.52027 1.4186 7.23749 1.68673 7.90728C1.74833 8.04823 1.76159 8.20559 1.72445 8.35487C1.68731 8.50414 1.60186 8.63695 1.4814 8.73261C0.95055 9.1266 0.536095 9.65679 0.281899 10.267C0.0277025 10.8773 -0.0567782 11.5449 0.037398 12.1993C0.184367 13.0839 0.643614 13.8864 1.33179 14.4613C2.01996 15.0362 2.89144 15.3454 3.78806 15.3326H7.33273C7.50954 15.3326 7.67911 15.2624 7.80414 15.1373C7.92916 15.0123 7.9994 14.8428 7.9994 14.6659C7.9994 14.4891 7.92916 14.3196 7.80414 14.1945C7.67911 14.0695 7.50954 13.9993 7.33273 13.9993H3.78806C3.21225 14.0132 2.65048 13.8205 2.20457 13.4559C1.75866 13.0913 1.45811 12.579 1.3574 12.0119C1.29353 11.5951 1.34529 11.1687 1.50705 10.7793C1.6688 10.3898 1.93434 10.0522 2.27473 9.80328C2.63228 9.53605 2.89092 9.15762 3.01002 8.72743C3.12912 8.29724 3.10194 7.83967 2.93273 7.42661C2.59817 6.54308 2.58096 5.57075 2.88406 4.67594C3.1262 3.97499 3.55979 3.35586 4.13572 2.88868C4.71165 2.4215 5.40691 2.12494 6.14273 2.03261C6.31341 2.01063 6.48531 1.9995 6.6574 1.99927C7.51943 1.99643 8.3592 2.27289 9.05096 2.78727C9.74272 3.30164 10.2493 4.02625 10.4947 4.85261C10.5906 5.16752 10.7632 5.45366 10.9971 5.68525C11.231 5.91684 11.5189 6.08661 11.8347 6.17928C12.6077 6.40789 13.2924 6.86719 13.7972 7.49569C14.302 8.12418 14.6027 8.89188 14.6591 9.696C14.7155 10.5001 14.5249 11.3023 14.1128 11.9951C13.7008 12.6879 13.0869 13.2383 12.3534 13.5726C12.2448 13.6282 12.1541 13.7132 12.0915 13.8178C12.0289 13.9225 11.997 14.0427 11.9994 14.1646C11.9981 14.2749 12.0245 14.3838 12.0763 14.4812C12.128 14.5787 12.2034 14.6616 12.2955 14.7223C12.3876 14.783 12.4935 14.8196 12.6034 14.8288C12.7134 14.8379 12.8239 14.8193 12.9247 14.7746C15.6807 13.4499 17.1781 9.96527 14.8447 6.59861C14.2023 5.76055 13.2923 5.16769 12.2661 4.91861Z" fill="white" />
                                            <path d="M12.4716 11.1383C12.5966 11.0133 12.6668 10.8438 12.6668 10.667C12.6668 10.4902 12.5966 10.3207 12.4716 10.1956L11.4143 9.13831C11.0392 8.76336 10.5306 8.55273 10.0003 8.55273C9.46994 8.55273 8.96133 8.76336 8.58627 9.13831L7.52894 10.1956C7.4075 10.3214 7.3403 10.4898 7.34182 10.6646C7.34334 10.8394 7.41345 11.0066 7.53706 11.1302C7.66066 11.2538 7.82787 11.3239 8.00267 11.3254C8.17747 11.3269 8.34587 11.2597 8.4716 11.1383L9.3336 10.2763V15.3336C9.3336 15.5105 9.40384 15.68 9.52887 15.805C9.65389 15.9301 9.82346 16.0003 10.0003 16.0003C10.1771 16.0003 10.3467 15.9301 10.4717 15.805C10.5967 15.68 10.6669 15.5105 10.6669 15.3336V10.2763L11.5289 11.1383C11.654 11.2633 11.8235 11.3335 12.0003 11.3335C12.177 11.3335 12.3466 11.2633 12.4716 11.1383Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2741_38937">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>


                                    <span className="whitespace-nowrap text-xs text-white font-semibold">Upload File</span>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className='mt-6'>
                        <Pagination />
                    </div>

                </main>
            
            <DataFetchingModal isOpen={isDataFetchingOpen} onClose={handleCloseModal} />
            <DataPreviewModal
                isOpen={isDataPreviewOpen}
                onClose={handleCloseDataPreview}
                onSave={handleDataPreviewSave}
                onDiscard={handleDataPreviewDiscard}
            />
            <ProductUpdatedModal
                isOpen={isProductUpdatedOpen}
                onClose={() => setIsProductUpdatedOpen(false)}
            />
            </>
    )
}

export default Page