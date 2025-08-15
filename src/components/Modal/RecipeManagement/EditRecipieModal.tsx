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

export default function EditRecipeModal({
    isOpen,
    onClose,
    onFinish,
}: {
    isOpen: boolean;
    onClose: () => void;
    onFinish: () => void;
}) {
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
    const [uploadError, setUploadError] = useState<string>("");
    const [currentStep, setCurrentStep] = useState<number>(0);
    const steps = ["Recipe Details", "Items", "Instructions", "Pricing"];
    const [qty, setQty] = useState<number>(5);
    const [unit, setUnit] = useState<'kg' | 'g' | 'lb' | 'oz'>('kg');

    // Drag and drop state
    const [draggedStep, setDraggedStep] = useState<{ id: number; text: string } | null>(null);
    const [dragOverStep, setDragOverStep] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

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
    };
    const handleVideoLoad = () => {
        setVideoError(""); // Clear any previous errors when video loads successfully
        setIsVideoLoading(false);
    };

    const handleDragStart = (e: React.DragEvent, step: { id: number; text: string }) => {
        setDraggedStep(step);
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', step.id.toString());
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, stepId: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverStep(stepId);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOverStep(null);
    };

    const handleDrop = (e: React.DragEvent, targetStepId: number) => {
        e.preventDefault();
        setDragOverStep(null);
        setIsDragging(false);

        if (!draggedStep) return;

        // If dragging from step 2 to step 1 or step 3, interchange the steps
        if (currentStep === 2) {
            const draggedStepIndex = instructionSteps.findIndex(step => step.id === draggedStep.id);
            const targetStepIndex = instructionSteps.findIndex(step => step.id === targetStepId);

            if (draggedStepIndex !== -1 && targetStepIndex !== -1) {
                const newSteps = [...instructionSteps];
                [newSteps[draggedStepIndex], newSteps[targetStepIndex]] = [newSteps[targetStepIndex], newSteps[draggedStepIndex]];
                setInstructionSteps(newSteps);
            }
        }

        setDraggedStep(null);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedStep(null);
        setDragOverStep(null);
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
                                <h2 className="text-md font-semibold text-gray-900">Edit Recipe</h2>

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

                        {/* Steps - Tab Style */}
                        <div className="px-4">
                            {/* Tab Headers */}
                            <div className="flex w-md justify-start">
                                {steps.map((step, index) => (
                                    <div
                                        key={step}
                                        className={`flex-1 flex flex-col items-center cursor-pointer transition-all duration-200 ${index === currentStep ? 'text-primary' : 'text-gray-400'
                                            }`}
                                        onClick={() => setCurrentStep(index)}
                                    >
                                        {/* Step Icon */}
                                        <div className="flex items-center justify-center w-10 h-2 rounded-full mb-2 transition-all duration-200 ${
                                            index === currentStep 
                                                ? 'bg-primary text-white shadow-md' 
                                                : index < currentStep
                                                ? 'bg-green-500 text-white'
                                                : 'border-2 border-gray-300 text-gray-400'
                                        }">
                                            {index < currentStep ? (
                                                <Check size={18} />
                                            ) : (
                                                <span className="text-sm font-medium">{index + 1}</span>
                                            )}
                                        </div>

                                        {/* Step Label */}
                                        <span className={`text-xs font-medium text-center px-2 transition-colors duration-200 ${index === currentStep ? 'text-primary' : index < currentStep ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4 w-full bg-gray-200 rounded-full h-[2px] relative">
                                <div
                                    className="bg-primary h-[2px] rounded-full transition-all duration-300 ease-out absolute top-0 left-0"
                                    style={{
                                        width:
                                            currentStep === 0 ? "25%" :
                                                currentStep === 1 ? "8%" :
                                                    currentStep === 2 ? "16%" :
                                                        "12%",
                                        left:
                                            currentStep === 0 ? "0%" :
                                                currentStep === 1 ? "19.5%" :
                                                    currentStep === 2 ? "43%" :
                                                        "76%",
                                    }}
                                />
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
                                    <label className="block mb-2 text-sm font-medium text-[#727A90]">
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
                                    </div>
                                </div>
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
                                            Add Ingredients
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full h-[0.5px] bg-gray-200 mt-6" />

                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                {/* Instructions Step */}
                                <div className="space-y-6 px-6 mt-4">
                                    <div className="w-full h-[0.5px] bg-gray-200 my-4" />

                                    {/* Add Instructions Section */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-[#727A90]">Add Instructions</h4>

                                        {instructionSteps.map((step, index) => (
                                            <React.Fragment key={step.id}>
                                                <div className="text-sm font-medium text-gray-700 mb-1">
                                                    Step {index + 1}
                                                </div>

                                                <div
                                                    key={step.id}
                                                    className={`flex items-center flex-nowrap py-1 transition-all duration-200 ${dragOverStep === step.id ? 'bg-blue-50 border-2 border-blue-200 rounded-lg' : ''
                                                        } ${draggedStep?.id === step.id ? 'opacity-50' : ''}`}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, step)}
                                                    onDragOver={(e) => handleDragOver(e, step.id)}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={(e) => handleDrop(e, step.id)}
                                                    onDragEnd={handleDragEnd}
                                                >
                                                    {/* Drag handle */}
                                                    <button
                                                        type="button"
                                                        aria-label="Reorder"
                                                        className="shrink-0 inline-flex items-center justify-center w-7 h-7 cursor-grab active:cursor-grabbing"
                                                    >
                                                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 3.57471H11.5C11.6326 3.57471 11.7598 3.52203 11.8536 3.42826C11.9473 3.33449 12 3.20731 12 3.07471C12 2.9421 11.9473 2.81492 11.8536 2.72115C11.7598 2.62739 11.6326 2.57471 11.5 2.57471H5C4.86739 2.57471 4.74021 2.62739 4.64645 2.72115C4.55268 2.81492 4.5 2.9421 4.5 3.07471C4.5 3.20731 4.55268 3.33449 4.64645 3.42826C4.74021 3.52203 4.86739 3.57471 5 3.57471Z" fill="#374957" />
                                                            <path d="M11.5 6.07422H5C4.86739 6.07422 4.74021 6.1269 4.64645 6.22067C4.55268 6.31444 4.5 6.44161 4.5 6.57422C4.5 6.70683 4.55268 6.83401 4.64645 6.92778C4.74021 7.02155 4.86739 7.07422 5 7.07422H11.5C11.6326 7.07422 11.7598 7.02155 11.8536 6.92778C11.9473 6.83401 12 6.70683 12 6.57422C12 6.44161 11.9473 6.31444 11.8536 6.22067C11.7598 6.1269 11.6326 6.07422 11.5 6.07422Z" fill="#374957" />
                                                            <path d="M11.5 9.57446H5C4.86739 9.57446 4.74021 9.62714 4.64645 9.72091C4.55268 9.81468 4.5 9.94186 4.5 10.0745C4.5 10.2071 4.55268 10.3343 4.64645 10.428C4.74021 10.5218 4.86739 10.5745 5 10.5745H11.5C11.6326 10.5745 11.7598 10.5218 11.8536 10.428C11.9473 10.3343 12 10.2071 12 10.0745C12 9.94186 11.9473 9.81468 11.8536 9.72091C11.7598 9.62714 11.6326 9.57446 11.5 9.57446Z" fill="#374957" />
                                                            <path d="M3.04395 3.57463C3.09342 3.57462 3.14177 3.55994 3.18289 3.53243C3.224 3.50493 3.25604 3.46585 3.27493 3.42013C3.29383 3.37442 3.29874 3.32412 3.28904 3.27561C3.27934 3.22711 3.25547 3.18257 3.22045 3.14763L2.00045 1.92813C1.90668 1.8344 1.77953 1.78174 1.64695 1.78174C1.51437 1.78174 1.38721 1.8344 1.29345 1.92813L0.0739474 3.14763C0.0389243 3.18257 0.0150524 3.22711 0.00535314 3.27561C-0.0043461 3.32412 0.000563327 3.37442 0.0194601 3.42013C0.0383568 3.46585 0.0703913 3.50493 0.111509 3.53243C0.152627 3.55994 0.20098 3.57462 0.250447 3.57463H1.14745V9.57463H0.250447C0.200937 9.57454 0.152515 9.58916 0.111321 9.61662C0.0701262 9.64409 0.038014 9.68316 0.0190553 9.7289C9.64869e-05 9.77464 -0.00485507 9.82497 0.00482833 9.87353C0.0145117 9.92208 0.038394 9.96667 0.0734474 10.0016L1.29345 11.2211C1.38721 11.3149 1.51437 11.3675 1.64695 11.3675C1.77953 11.3675 1.90668 11.3149 2.00045 11.2211L3.22045 10.0016C3.25547 9.9667 3.27934 9.92216 3.28904 9.87365C3.29874 9.82514 3.29383 9.77485 3.27493 9.72913C3.25604 9.68342 3.224 9.64433 3.18289 9.61683C3.14177 9.58933 3.09342 9.57464 3.04395 9.57463H2.14745V3.57463H3.04395Z" fill="#374957" />
                                                        </svg>
                                                    </button>

                                                    {/* Input */}
                                                    <div className="flex-1 min-w-0">
                                                        <input
                                                            type="text"
                                                            value={step.text}
                                                            onChange={(e) => updateStepText(step.id, e.target.value)}
                                                            placeholder="Write here"
                                                            className="w-full h-10 px-3 rounded-lg border border-[#E9EAEA] text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                                                        />
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="shrink-0 flex items-center pl-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeStep(step.id)}
                                                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-red-600 hover:bg-red-50"
                                                            aria-label="Delete"
                                                        >
                                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clipPath="url(#clip0_2755_55657)">
                                                                    <path d="M15.9997 5.24112H13.933C13.614 3.69018 12.2497 2.57646 10.6663 2.57446H9.33298C7.74957 2.57646 6.38526 3.69018 6.06632 5.24112H3.99966C3.63148 5.24112 3.33301 5.53959 3.33301 5.90778C3.33301 6.27596 3.63148 6.57446 3.99966 6.57446H4.66632V15.2411C4.66854 17.0812 6.15963 18.5723 7.99966 18.5745H11.9997C13.8397 18.5723 15.3308 17.0812 15.333 15.2411V6.57446H15.9997C16.3679 6.57446 16.6663 6.27599 16.6663 5.90781C16.6663 5.53962 16.3679 5.24112 15.9997 5.24112ZM9.33301 13.9078C9.33301 14.276 9.03454 14.5745 8.66635 14.5745C8.29813 14.5745 7.99966 14.276 7.99966 13.9078V9.90781C7.99966 9.53962 8.29813 9.24115 8.66632 9.24115C9.03451 9.24115 9.33298 9.53962 9.33298 9.90781V13.9078H9.33301ZM11.9997 13.9078C11.9997 14.276 11.7012 14.5745 11.333 14.5745C10.9648 14.5745 10.6664 14.276 10.6664 13.9078V9.90781C10.6664 9.53962 10.9648 9.24115 11.333 9.24115C11.7012 9.24115 11.9997 9.53962 11.9997 9.90781V13.9078ZM7.44701 5.24112C7.73057 4.44265 8.4857 3.90881 9.33301 3.90778H10.6664C11.5137 3.90881 12.2688 4.44265 12.5524 5.24112H7.44701Z" fill="#E51B1B" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_2755_55657">
                                                                        <rect width="16" height="16" fill="white" transform="translate(2 2.57446)" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </button>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))}

                                        {/* Add New Step Button */}
                                        <div className="flex">
                                            <button
                                                onClick={addNewStep}
                                                className=" ml-auto border border-primary text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"
                                            >
                                                Add New Step
                                            </button>
                                        </div>
                                    </div>

                                    {/* Instruction Media Section */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-[#727A90]">Instruction Media</h4>

                                        {/* Hidden video input */}
                                        <input
                                            id="video-input"
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoUpload}
                                            className="hidden"
                                        />

                                        {uploadedVideo ? (
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="relative">
                                                    <video
                                                        src={videoPreview || ""}
                                                        controls
                                                        className="w-full h-48 object-cover rounded-lg"
                                                        onError={handleVideoError}
                                                        onLoadedData={handleVideoLoad}
                                                        preload="metadata"
                                                    />
                                                    <button
                                                        onClick={removeVideo}
                                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        <strong>File:</strong> {uploadedVideo.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        <strong>Size:</strong> {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <strong>Type:</strong> {uploadedVideo.type || 'Unknown'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={handleVideoChange}
                                                    className="mt-3 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors"
                                                >
                                                    Change Video
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="border-1 border-[#E9EAEA] rounded-lg p-8 text-center">
                                                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                                    {isVideoLoading ? (
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                    ) : (
                                                        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect y="0.574463" width="36" height="36" rx="18" fill="#F1E7F8" />
                                                            <g clipPath="url(#clip0_3201_804)">
                                                                <path d="M19.3473 14.6445L16.5287 11.8265C16.3435 11.64 16.1232 11.4922 15.8805 11.3916C15.6377 11.291 15.3774 11.2397 15.1147 11.2405H10.6667C10.4899 11.2405 10.3203 11.3107 10.1953 11.4358C10.0702 11.5608 10 11.7303 10 11.9072C10 12.084 10.0702 12.2535 10.1953 12.3786C10.3203 12.5036 10.4899 12.5738 10.6667 12.5738H15.1147C15.2914 12.5743 15.4608 12.6445 15.586 12.7692L17.3907 14.5738H13.3333C12.4496 14.5749 11.6024 14.9264 10.9775 15.5513C10.3526 16.1762 10.0011 17.0234 10 17.9072L10 23.2405C10.0011 24.1242 10.3526 24.9715 10.9775 25.5963C11.6024 26.2212 12.4496 26.5728 13.3333 26.5738H18.6667C19.5504 26.5728 20.3976 26.2212 21.0225 25.5963C21.6474 24.9715 21.9989 24.1242 22 23.2405V17.9072C21.9989 17.1416 21.7348 16.3997 21.2518 15.8057C20.7689 15.2118 20.0965 14.8018 19.3473 14.6445Z" fill="#6E0AB8" />
                                                                <path d="M25.2669 16.5449C25.0461 16.4331 24.7985 16.3853 24.552 16.407C24.3055 16.4286 24.07 16.5189 23.8722 16.6676L23.3389 17.0676V24.0823L23.8722 24.4823C24.0703 24.6308 24.3058 24.7213 24.5525 24.7435C24.7991 24.7658 25.047 24.7189 25.2685 24.6082C25.49 24.4974 25.6762 24.3272 25.8064 24.1166C25.9366 23.9059 26.0055 23.6632 26.0055 23.4156V17.7369C26.0062 17.489 25.9373 17.2459 25.8068 17.0352C25.6762 16.8245 25.4891 16.6547 25.2669 16.5449Z" fill="#6E0AB8" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_3201_804">
                                                                    <rect width="16" height="16" fill="white" transform="translate(10 10.5745)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {isVideoLoading ? 'Processing video...' : 'Upload Instruction Video'}
                                                </p>
                                                <p className="text-xs text-gray-500 mb-4">
                                                    Supported formats: MP4, AVI, MOV, WMV, FLV, WebM, MKV, 3GP, OGG (Max: 50MB)
                                                </p>
                                                <button
                                                    onClick={handleVideoChange}
                                                    disabled={isVideoLoading}
                                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${isVideoLoading
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-primary text-white hover:bg-primary-hover'
                                                        }`}
                                                >
                                                    {isVideoLoading ? 'Processing...' : 'Add Video'}
                                                </button>
                                            </div>
                                        )}

                                        {videoError && (
                                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0">
                                                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-red-600 text-sm font-medium mb-2">Upload Error</p>
                                                        <p className="text-red-600 text-sm">{videoError}</p>
                                                        <div className="mt-3 flex gap-2">
                                                            <button
                                                                onClick={handleVideoChange}
                                                                className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                                                            >
                                                                Try Again
                                                            </button>
                                                            <button
                                                                onClick={removeVideo}
                                                                className="text-gray-600 hover:text-gray-800 text-sm font-medium underline"
                                                            >
                                                                Clear Error
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Serving and Duration Section */}
                                    <div className="grid grid-cols-2 gap-4 pb-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-[#727A90]">Serving</label>
                                            <ProductDropdown
                                                options={['2 Persons', '4 Persons', '6 Persons', '8 Persons']}
                                                onChange={(v) => console.log(v)} />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-[#727A90]">Duration</label>
                                            <ProductDropdown options={['20 Min', '30 Min', '40 Min', '60 Min']}
                                                onChange={(v) => console.log(v)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[0.5px] bg-gray-200 mt-4" />

                            </>
                        )}

                        {currentStep === 3 && (
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
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-500">Margin</label>
                                                <input
                                                    type="text"
                                                    defaultValue="20%"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-500">Market Price</label>
                                                <input
                                                    type="text"
                                                    defaultValue="$12.00"
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
