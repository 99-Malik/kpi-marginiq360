import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Check, X, Upload } from "lucide-react";
import { useDropzone, FileRejection } from "react-dropzone";
import ProductDropdown from "@/components/DropDown/ProductDropDown";
import UnitDropdown from "@/components/DropDown/UnitDropDown";


interface UploadedImage {
    id: string;
    file: File;
    preview: string;
    name: string;
}

export default function DealsModal({
    isOpen,
    onClose,
    onFinish,
    onSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    onFinish: () => void;
    onSuccess?: () => void;
}) {
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
    const [uploadError, setUploadError] = useState<string>("");
    const [currentStep, setCurrentStep] = useState<number>(0);
    const steps = ["General Info", "Items", "Pricing"];
    const [qty, setQty] = useState<number>(5);
    const [unit, setUnit] = useState<'kg' | 'g' | 'lb' | 'oz'>('kg');

    // Instructions state
    const [instructionSteps, setInstructionSteps] = useState([
        { id: 1, text: "Mix all the ingredients for pizza dough", isActive: true },
        { id: 2, text: "", isActive: false },
        { id: 3, text: "", isActive: false }
    ]);

    // Video upload state
    const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [videoError, setVideoError] = useState<string>("");
    const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);

    const dec = () => setQty(q => Math.max(0, q - 1));
    const inc = () => setQty(q => q + 1);
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        setUploadError("");

        if (rejectedFiles.length > 0) {
            const error = rejectedFiles[0].errors[0];
            if (error.code === 'file-invalid-type') {
                setUploadError(' Please upload a valid image file (JPEG, PNG, GIF, WebP)');
            } else if (error.code === 'file-too-large') {
                setUploadError(' File size must be less than 5MB');
            } else if (error.code === 'file-too-small') {
                setUploadError(' File is too small');
            } else if (error.code === 'too-many-files') {
                setUploadError(' Please upload only one file');
            } else {
                setUploadError(' Error uploading file. Please try again.');
            }
            return;
        }

        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const preview = URL.createObjectURL(file);
            setUploadedImage({
                id: Date.now().toString(),
                file,
                preview,
                name: file.name
            });
            setSelectedSuggestion(null); // Clear AI suggestion when uploading
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: false
    });

    const handleImageChange = () => {
        document.getElementById('image-input')?.click();
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setUploadError(' File size must be less than 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                setUploadError(' Please upload a valid image file (JPEG, PNG, GIF, WebP)');
                return;
            }

            const preview = URL.createObjectURL(file);
            setUploadedImage({
                id: Date.now().toString(),
                file,
                preview,
                name: file.name
            });
            setSelectedSuggestion(null); // Clear AI suggestion when uploading
            setUploadError("");
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleClose = () => {
        setCurrentStep(0); // Reset to first step when closing
        setUploadedImage(null);
        setSelectedSuggestion(null);
        setUploadError("");
        setInstructionSteps([
            { id: 1, text: "Mix all the ingredients for pizza dough", isActive: true },
            { id: 2, text: "", isActive: false },
            { id: 3, text: "", isActive: false }
        ]);
        // Reset video state
        setUploadedVideo(null);
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
            setVideoPreview(null);
        }
        setVideoError("");
        setIsVideoLoading(false);
        onClose();
    };

    // Instructions functions
    const addNewStep = () => {
        const newId = Math.max(...instructionSteps.map(step => step.id)) + 1;
        setInstructionSteps(prev => [...prev, { id: newId, text: "", isActive: false }]);
    };

    const removeStep = (stepId: number) => {
        if (instructionSteps.length > 1) {
            setInstructionSteps(prev => prev.filter(step => step.id !== stepId));
        }
    };

    const updateStepText = (stepId: number, text: string) => {
        setInstructionSteps(prev =>
            prev.map(step =>
                step.id === stepId ? { ...step, text, isActive: text.length > 0 } : step
            )
        );
    };

    // Video upload functions
    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoError("");
            setIsVideoLoading(true);

            // Check file type with more specific validation
            const allowedTypes = [
                'video/mp4',
                'video/avi',
                'video/mov',
                'video/wmv',
                'video/flv',
                'video/webm',
                'video/mkv',
                'video/3gp',
                'video/ogg'
            ];

            if (!allowedTypes.includes(file.type)) {
                setVideoError('Please upload a valid video file. Supported formats: MP4, AVI, MOV, WMV, FLV, WebM, MKV, 3GP, OGG');
                setIsVideoLoading(false);
                return;
            }

            // Check file size with different limits based on format
            const maxSizeMB = 50; // 50MB default
            const maxSizeBytes = maxSizeMB * 1024 * 1024;

            if (file.size > maxSizeBytes) {
                setVideoError(`Video file size must be less than ${maxSizeMB}MB. Current file size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
                setIsVideoLoading(false);
                return;
            }

            // Check minimum file size (to prevent empty or corrupted files)
            const minSizeBytes = 1024; // 1KB minimum
            if (file.size < minSizeBytes) {
                setVideoError('Video file appears to be empty or corrupted. Please select a valid video file.');
                setIsVideoLoading(false);
                return;
            }

            // Validate file extension
            const fileName = file.name.toLowerCase();
            const allowedExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.3gp', '.ogg'];
            const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

            if (!hasValidExtension) {
                setVideoError('Please upload a video file with a valid extension (.mp4, .avi, .mov, .wmv, .flv, .webm, .mkv, .3gp, .ogg)');
                setIsVideoLoading(false);
                return;
            }

            try {
                setUploadedVideo(file);
                const preview = URL.createObjectURL(file);
                setVideoPreview(preview);
                setIsVideoLoading(false);
            } catch (error) {
                setVideoError('Failed to process video file. Please try uploading a different video.');
                setIsVideoLoading(false);
                console.error('Video processing error:', error);
            }
        }
    };

    const handleVideoChange = () => {
        document.getElementById('video-input')?.click();
    };

    const removeVideo = () => {
        setUploadedVideo(null);
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
            setVideoPreview(null);
        }
        setVideoError("");
    };

    const handleVideoError = (error: unknown) => {
        console.error('Video loading error:', error);
        setVideoError('Failed to load video. The file may be corrupted or in an unsupported format. Please try uploading a different video.');
        setIsVideoLoading(false);
        // Clean up the failed video
        setUploadedVideo(null);
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
            setVideoPreview(null);
        }
    };
    const handleFinish = () => {
        // do any final save here...
        onFinish();
        // Show success modal if onSuccess is provided
        if (onSuccess) {
            onSuccess();
        }
    };
    const handleVideoLoad = () => {
        setVideoError(""); // Clear any previous errors when video loads successfully
        setIsVideoLoading(false);
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
            <div className={`bg-white rounded-2xl shadow-lg w-full max-h-[90vh] relative flex flex-col py-4 transition-all duration-300 ${currentStep === 0 ? 'max-w-lg' :
                currentStep === 1 ? 'max-w-3xl' :
                    currentStep === 2 ? 'max-w-xl' :
                        'max-w-lg'
                }`}>

                {/* Close Button */}


                {/* Scrollable Content Container */}
                <div className="flex-1 overflow-y-auto scroll-hidden">
                    <div>

                        <div className="px-4 ">
                            <div className="flex items-center justify-between">
                                <h2 className="text-md font-semibold text-gray-900">Create Deal and Combo</h2>

                                <button
                                    onClick={handleClose}
                                    aria-label="Close"
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.925781" width="31" height="31" rx="9.5" stroke="#E9EAEA" />
                                        <g clipPath="url(#clip0_3201_15289)">
                                            <path d="M16.9425 16.4256L23.8045 9.56365C23.926 9.43791 23.9932 9.26951 23.9916 9.09471C23.9901 8.91991 23.92 8.75271 23.7964 8.6291C23.6728 8.50549 23.5056 8.43538 23.3308 8.43386C23.156 8.43234 22.9876 8.49954 22.8619 8.62098L15.9999 15.483L9.13786 8.62098C9.01212 8.49954 8.84372 8.43234 8.66892 8.43386C8.49413 8.43538 8.32692 8.50549 8.20331 8.6291C8.07971 8.75271 8.00959 8.91991 8.00807 9.09471C8.00656 9.26951 8.07375 9.43791 8.19519 9.56365L15.0572 16.4256L8.19519 23.2876C8.07021 23.4127 8 23.5822 8 23.759C8 23.9358 8.07021 24.1053 8.19519 24.2303C8.32021 24.3553 8.48975 24.4255 8.66652 24.4255C8.8433 24.4255 9.01284 24.3553 9.13786 24.2303L15.9999 17.3683L22.8619 24.2303C22.9869 24.3553 23.1564 24.4255 23.3332 24.4255C23.51 24.4255 23.6795 24.3553 23.8045 24.2303C23.9295 24.1053 23.9997 23.9358 23.9997 23.759C23.9997 23.5822 23.9295 23.4127 23.8045 23.2876L16.9425 16.4256Z" fill="#727A90" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3201_15289">
                                                <rect width="16" height="16" fill="white" transform="translate(8 8.42578)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </button>
                            </div>
                        </div>
                        {/* <p className="text-sm text-gray-500 mb-6">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p> */}
                        <div className="w-full h-[0.5px] bg-gray-200 my-4" />

                        {/* Steps */}
                        <div
                            className={`flex flex-col items-stretch mt-4
    ${currentStep === 0 ? 'px-8 sm:px-18' :
                                    currentStep === 1 ? 'px-8 sm:px-32' :
                                        currentStep === 2 ? 'px-6 sm:px-10' :
                                            'px-8 sm:px-12'
                                }`}
                        >                            {/* Row 1: Icons + Lines */}
                            <div className="grid items-center grid-cols-[60px_1fr_60px_1fr_60px] gap-0">
                                {steps.map((step, index) => (
                                    <React.Fragment key={step}>
                                        {/* Icon */}
                                        <div className="flex justify-center">
                                            <div
                                                className={`flex items-center justify-center w-8 h-8 rounded-full ${index <= currentStep ? "bg-primary text-white" : "border-2 border-gray-300 text-gray-500"
                                                    }`}
                                            >
                                                <Check size={16} />
                                            </div>
                                        </div>

                                        {/* Connector - Longer and responsive */}
                                        {index < steps.length - 1 && (
                                            <div className="min-w-0 px-2">
                                                <div className={`h-0.5 w-full ${index < currentStep ? "bg-primary" : "bg-gray-300"}`} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Row 2: Labels - Perfectly aligned with icons above */}
                            <div className="grid mt-2 grid-cols-[60px_1fr_60px_1fr_60px] gap-0">
                                {steps.map((step, index) => (
                                    <React.Fragment key={step}>
                                        {/* Label under icon - Same column structure */}
                                        <div className="flex justify-center ">
                                            <span
                                                className={`text-xs font-medium text-center break-words leading-tight max-w-[72px] ${index <= currentStep ? "text-primary" : "text-gray-500"
                                                    }`}
                                            >
                                                {step}
                                            </span>
                                        </div>

                                        {/* Empty cell under connector - Same column structure */}
                                        {index < steps.length - 1 && <div />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>



                        {/* Step-specific Content */}
                        {currentStep === 0 && (
                            <>
                                {/* Recipe Details Step */}
                                <div className="space-y-6 px-4 mt-4">

                                    <div className="w-full h-[0.5px] bg-gray-200" />

                                    {/* Recipe Name */}
                                    <label className="block mb-2 text-sm font-medium text-[#727A90]">
                                        Recipe Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Classic Margarita Pizza"
                                        className="w-full mb-6 px-4 py-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                    />

                                    {/* Upload Media */}
                                    <label className="block mb-2 text-sm font-medium text-[#727A90]">
                                        Upload Media
                                    </label>
                                    <div
                                        {...getRootProps()}
                                        className={`border border-[#E9EAEA] rounded-lg p-6 text-center mb-6 cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'hover:border-gray-400'
                                            }`}
                                    >
                                        <input {...getInputProps()} />
                                        <input
                                            id="image-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInput}
                                            className="hidden"
                                        />

                                        {(uploadedImage || selectedSuggestion !== null) ? (
                                            <div className="relative w-28 h-28 mx-auto mb-4">
                                                <Image
                                                    src={uploadedImage ? uploadedImage.preview : "/images/pizza.png"}
                                                    alt={uploadedImage ? "Uploaded" : "AI Suggestion"}
                                                    fill
                                                    className="rounded-lg object-cover"
                                                />
                                                <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white">
                                                    <Check size={12} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-28 h-28 mx-auto mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                                <Upload size={32} className="text-gray-400" />
                                            </div>
                                        )}

                                        <p className="text-sm text-gray-500 mb-4">
                                            {isDragActive
                                                ? "Drop the image here..."
                                                : uploadedImage ? "Image uploaded successfully" : selectedSuggestion !== null ? "AI suggestion selected" : "Drag and drop image here, or click to change image"
                                            }
                                        </p>

                                        {(uploadedImage || selectedSuggestion !== null) && (
                                            <button
                                                type="button"
                                                onClick={handleImageChange}
                                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors"
                                            >
                                                Change Image
                                            </button>
                                        )}

                                        {uploadError && (
                                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                <p className="text-red-600 text-sm font-medium text-center">{uploadError}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* AI Suggestions */}
                                    {/* <label className="block mb-2 text-sm font-medium text-[#727A90]">
                                        AI Suggestions
                                    </label>
                                    <div className="flex gap-3 overflow-x-auto mb-6 pb-2 border border-[#E9EAEA] rounded-lg px-2 items-center py-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`relative w-16 h-16 border rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all ${selectedSuggestion === i
                                                    ? 'border-primary ring-2 ring-primary/20'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                onClick={() => {
                                                    if (selectedSuggestion === i) {
                                                        // If clicking the same suggestion, deselect it
                                                        setSelectedSuggestion(null);
                                                    } else {
                                                        // If clicking a different suggestion, select it and clear uploaded image
                                                        setSelectedSuggestion(i);
                                                        setUploadedImage(null);
                                                    }
                                                }}
                                            >
                                                <Image
                                                    src="/images/pizza.png"
                                                    alt="Suggestion"
                                                    fill
                                                    sizes="100vw"
                                                    className="object-cover"
                                                />
                                                {selectedSuggestion === i && (
                                                    <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white">
                                                        <Check size={10} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div> */}
                                </div>
                                <div className="w-full h-[0.5px] bg-gray-200" />

                            </>
                        )}

                        {currentStep === 1 && (
                            <>
                                {/* Items Step */}
                                <div className="space-y-6 px-4 mt-4">
                                    <div className="w-full h-[0.5px] bg-gray-200 my-4" />


                                    {/* Choose Item */}
                                    <div className="flex flex-wrap items-end gap-4 md:gap-6">

                                        {/* Choose Item */}
                                        <div className="flex-1 min-w-[220px]">
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Choose Item
                                            </label>
                                            <ProductDropdown options={['Boneless Chicken', 'Beef Mince', 'Whole Fish', 'Eggs']}
                                                onChange={(v) => console.log(v)} />
                                        </div>

                                        {/* Quantity */}
                                        <div className="min-w-[240px]  ">
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Quantity* ($0.25/kg)
                                            </label>

                                            <div className="flex items-center gap-2 justify-between ">
                                                {/* Connected Quantity & Unit */}
                                                <div className="flex h-10 items-stretch  border border-gray-200 rounded-l-lg rounded-r-lg">
                                                    {/* Unit Selector */}
                                                    <div className="relative bg-[#F9F9FB] rounded-l-lg">
                                                        <UnitDropdown value={unit} onChange={setUnit} listMaxHeight={130} gutter={1} />


                                                    </div>

                                                    {/* Divider */}
                                                    <div className="w-px bg-gray-200" />

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center px-5 ">
                                                        <button
                                                            type="button"
                                                            onClick={dec}
                                                            className="h-6 w-6 rounded-lg   text-gray-600  text-sm leading-none "
                                                        >
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="0.5" y="0.574463" width="20" height="20" rx="4" fill="#F8F8FC" />
                                                                <path d="M14.6667 9.74097H6.33333C5.8731 9.74097 5.5 10.1141 5.5 10.5743C5.5 11.0345 5.8731 11.4076 6.33333 11.4076H14.6667C15.1269 11.4076 15.5 11.0345 15.5 10.5743C15.5 10.1141 15.1269 9.74097 14.6667 9.74097Z" fill="#727A90" />
                                                            </svg>

                                                        </button>

                                                        <input
                                                            type="number"
                                                            value={qty}
                                                            onChange={(e) => setQty(Math.max(0, Number(e.target.value || 0)))}
                                                            className="w-8 text-center bg-transparent text-sm text-gray-800 focus:outline-none
                         [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={inc}
                                                            className="h-6 w-6 rounded-lg text-sm leading-none"
                                                        >
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="0.5" y="0.574463" width="20" height="20" rx="4" fill="#F8F8FC" />
                                                                <path d="M14.6667 9.74113H11.3333V6.4078C11.3333 6.18678 11.2455 5.97482 11.0893 5.81854C10.933 5.66226 10.721 5.57446 10.5 5.57446C10.279 5.57446 10.067 5.66226 9.91074 5.81854C9.75446 5.97482 9.66667 6.18678 9.66667 6.4078V9.74113H6.33333C6.11232 9.74113 5.90036 9.82893 5.74408 9.98521C5.5878 10.1415 5.5 10.3534 5.5 10.5745C5.5 10.7955 5.5878 11.0074 5.74408 11.1637C5.90036 11.32 6.11232 11.4078 6.33333 11.4078H9.66667V14.7411C9.66667 14.9621 9.75446 15.1741 9.91074 15.3304C10.067 15.4867 10.279 15.5745 10.5 15.5745C10.721 15.5745 10.933 15.4867 11.0893 15.3304C11.2455 15.1741 11.3333 14.9621 11.3333 14.7411V11.4078H14.6667C14.8877 11.4078 15.0996 11.32 15.2559 11.1637C15.4122 11.0074 15.5 10.7955 15.5 10.5745C15.5 10.3534 15.4122 10.1415 15.2559 9.98521C15.0996 9.82893 14.8877 9.74113 14.6667 9.74113Z" fill="#727A90" />
                                                            </svg>

                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200  text-red-500 hover:text-red-700"
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




                                    </div>
                                    <div className="flex">
                                        <button
                                            className="ml-auto rounded-xl border border-primary text-primary px-4 py-2 text-sm font-medium hover:bg-primary/5 whitespace-nowrap"
                                        >
                                            Add Items
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full h-[0.5px] bg-gray-200 mt-6" />

                            </>
                        )}

                      

                        {currentStep === 2 && (
                            <>
                                {/* Pricing Step */}
                                <div className="space-y-6 px-4 mt-4">
                                    <div className="w-full h-[0.5px] bg-gray-200 my-4" />

                                    {/* Cost Breakdown Card */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <h4 className="text-base font-semibold text-gray-900 mb-4">Cost Breakdown</h4>

                                        {/* Ingredients List */}
                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">Pizza Dough</span>
                                                <span className="text-sm text-gray-700">$2.00</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">Pepperoni</span>
                                                <span className="text-sm text-gray-700">$2.50</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">Bell Peppers</span>
                                                <span className="text-sm text-gray-700">$1.00</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">Tomato Sauce</span>
                                                <span className="text-sm text-gray-700">$1.50</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">Mozzarella Cheese</span>
                                                <span className="text-sm text-gray-700">$3.00</span>
                                            </div>
                                        </div>

                                        {/* Total Cost */}
                                        <div className="flex justify-between items-center mb-6 p-3 border border-gray-200 rounded-lg">
                                            <span className="text-sm font-medium text-primary">Total Cost:</span>
                                            <span className="text-sm font-semibold text-primary">$18.75</span>
                                        </div>

                                        {/* Margin and Market Price */}
                                        <div className="flex-1">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-500">Margin</label>
                                                <input
                                                    type="text"
                                                    defaultValue="20%"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                                <div className="w-full h-[0.5px] bg-gray-200 my-4" />

                            </>
                        )}

                        {/* Footer */}
                        <div className="flex justify-between gap-3 mt-6 px-4">
                            <button
                                onClick={handleClose}
                                className="flex items-center gap-2 text-gray-500 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                            >
                                <X size={16} />
                                Cancel
                            </button>

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 pl-4 pr-0 pb-1">
                                {currentStep > 0 && (
                                    <button
                                        onClick={handleBack}
                                        className="flex items-center gap-2 text-gray-500 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors bg-white"
                                    >
                                        Back
                                    </button>
                                )}

                                {currentStep < steps.length - 1 ? (
                                    <button
                                        onClick={handleNext}
                                        className="bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors flex items-center gap-2"
                                    >
                                        <Check size={16} />
                                        Next
                                    </button>
                                ) : (
                                    <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center gap-2"
                                        onClick={handleFinish}>
                                        <Check size={16} />
                                        Next
                                    </button>
                                )}
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
