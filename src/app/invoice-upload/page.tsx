'use client'
import React, { useState, useRef, useCallback } from 'react'
import DataFetchingModal from '../../components/Modal/ManageProducts/DataFetching/DataFetchingModal';

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadDate: Date;
    url?: string;
    status: 'uploading' | 'success' | 'error' | 'retrying';
    error?: string;
    progress?: number;
}

interface UploadError {
    type: 'validation' | 'size' | 'type' | 'network' | 'server' | 'unknown';
    message: string;
    fileName?: string;
    retryable: boolean;
}

function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Products');
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadErrors, setUploadErrors] = useState<UploadError[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isDataFetchingOpen, setIsDataFetchingOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // File upload restrictions
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_FILES_PER_UPLOAD = 10;
    const ALLOWED_TYPES = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.doc', '.docx', '.xls', '.xlsx'];

    const handleLogoClick = () => {
        console.log('Logo clicked');
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Format date
    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    // Comprehensive file validation
    const validateFile = (file: File): UploadError | null => {
        // Check file name
        if (!file.name || file.name.trim() === '') {
            return {
                type: 'validation',
                message: 'File name is required',
                fileName: file.name,
                retryable: false
            };
        }

        // Check file name length
        if (file.name.length > 255) {
            return {
                type: 'validation',
                message: 'File name is too long (maximum 255 characters)',
                fileName: file.name,
                retryable: false
            };
        }

        // Check for invalid characters in filename
        const invalidChars = /[<>:"/\\|?*]/;
        if (invalidChars.test(file.name)) {
            return {
                type: 'validation',
                message: 'File name contains invalid characters',
                fileName: file.name,
                retryable: false
            };
        }

        // Check file size
        if (file.size === 0) {
            return {
                type: 'validation',
                message: 'File is empty',
                fileName: file.name,
                retryable: false
            };
        }

        if (file.size > MAX_FILE_SIZE) {
            return {
                type: 'size',
                message: `File size (${formatFileSize(file.size)}) exceeds maximum allowed size of ${formatFileSize(MAX_FILE_SIZE)}`,
                fileName: file.name,
                retryable: false
            };
        }

        // Check file type by MIME type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return {
                type: 'type',
                message: `File type "${file.type}" is not supported. Please upload: ${ALLOWED_EXTENSIONS.join(', ')}`,
                fileName: file.name,
                retryable: false
            };
        }

        // Additional check by file extension
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
            return {
                type: 'type',
                message: `File extension "${fileExtension}" is not supported. Please upload: ${ALLOWED_EXTENSIONS.join(', ')}`,
                fileName: file.name,
                retryable: false
            };
        }

        // Check for duplicate files
        const isDuplicate = uploadedFiles.some(existingFile =>
            existingFile.name.toLowerCase() === file.name.toLowerCase() &&
            existingFile.size === file.size
        );

        if (isDuplicate) {
            return {
                type: 'validation',
                message: 'A file with the same name and size already exists',
                fileName: file.name,
                retryable: false
            };
        }

        return null;
    };

    // Simulate file upload with progress and error handling
    const simulateFileUpload = async (file: File, fileId: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;

                setUploadedFiles(prev => prev.map(f =>
                    f.id === fileId
                        ? { ...f, progress: Math.min(progress, 100) }
                        : f
                ));

                if (progress >= 100) {
                    clearInterval(interval);

                    // Simulate random upload failures (10% chance)
                    if (Math.random() < 0.1) {
                        setUploadedFiles(prev => prev.map(f =>
                            f.id === fileId
                                ? { ...f, status: 'error', error: 'Upload failed due to network error' }
                                : f
                        ));
                        reject(new Error('Upload failed due to network error'));
                    } else {
                        setUploadedFiles(prev => prev.map(f =>
                            f.id === fileId
                                ? { ...f, status: 'success', progress: 100 }
                                : f
                        ));
                        resolve();
                    }
                }
            }, 200);
        });
    };

    // Handle file upload with comprehensive error handling
    const handleFileUpload = useCallback(async (files: FileList) => {
        setUploadErrors([]);
        setIsUploading(true);
        setIsDataFetchingOpen(true); // Show DataFetchingModal

        const fileArray = Array.from(files);
        const errors: UploadError[] = [];
        const validFiles: File[] = [];

        // Validate number of files
        if (fileArray.length > MAX_FILES_PER_UPLOAD) {
            errors.push({
                type: 'validation',
                message: `Too many files selected. Maximum ${MAX_FILES_PER_UPLOAD} files allowed per upload.`,
                retryable: false
            });
        }

        // Validate each file
        fileArray.forEach((file) => {
            const validationError = validateFile(file);
            if (validationError) {
                errors.push(validationError);
            } else {
                validFiles.push(file);
            }
        });

        // Set validation errors
        if (errors.length > 0) {
            setUploadErrors(errors);
        }

        // Process valid files
        if (validFiles.length > 0) {
            const newFiles: UploadedFile[] = validFiles.map(file => ({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                uploadDate: new Date(),
                status: 'uploading',
                progress: 0,
                url: URL.createObjectURL(file) // Create URL for download
            }));

            setUploadedFiles(prev => [...newFiles, ...prev]);

            // Upload files with error handling
            const uploadPromises = newFiles.map(async (fileData) => {
                const file = validFiles.find(f => f.name === fileData.name);
                if (!file) return;

                try {
                    await simulateFileUpload(file, fileData.id);
                } catch (error) {
                    console.error(`Upload failed for ${fileData.name}:`, error);

                    // Update file status to error
                    setUploadedFiles(prev => prev.map(f =>
                        f.id === fileData.id
                            ? {
                                ...f,
                                status: 'error',
                                error: error instanceof Error ? error.message : 'Upload failed'
                            }
                            : f
                    ));

                    // Add to errors list
                    setUploadErrors(prev => [...prev, {
                        type: 'network',
                        message: `Failed to upload ${fileData.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
                        fileName: fileData.name,
                        retryable: true
                    }]);
                }
            });

            await Promise.allSettled(uploadPromises);
        }

        setIsUploading(false);
        setIsDataFetchingOpen(false); // Close DataFetchingModal
    }, [uploadedFiles]);

    // Retry upload for failed files
    const retryUpload = async (fileId: string) => {
        const fileToRetry = uploadedFiles.find(f => f.id === fileId);
        if (!fileToRetry) return;

        setUploadedFiles(prev => prev.map(f =>
            f.id === fileId
                ? { ...f, status: 'retrying', error: undefined, progress: 0 }
                : f
        ));

        try {
            // Simulate retry upload
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUploadedFiles(prev => prev.map(f =>
                f.id === fileId
                    ? { ...f, status: 'success', progress: 100 }
                    : f
            ));

            // Remove from errors
            setUploadErrors(prev => prev.filter(e => e.fileName !== fileToRetry.name));
        } catch (error) {
            setUploadedFiles(prev => prev.map(f =>
                f.id === fileId
                    ? { ...f, status: 'error', error: 'Retry failed' }
                    : f
            ));
        }
    };

    // Handle file input change
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            handleFileUpload(files);
        }
        // Reset input value to allow uploading the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle drag and drop
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files) {
            handleFileUpload(files);
        }
    }, [handleFileUpload]);

    // Handle file download
    const handleDownload = (file: UploadedFile) => {
        if (file.url) {
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Handle file delete
    const handleDelete = (fileId: string) => {
        setUploadedFiles(prev => {
            const fileToDelete = prev.find(f => f.id === fileId);
            if (fileToDelete?.url) {
                URL.revokeObjectURL(fileToDelete.url);
            }
            return prev.filter(f => f.id !== fileId);
        });

        // Remove from errors if exists
        const fileToDelete = uploadedFiles.find(f => f.id === fileId);
        if (fileToDelete) {
            setUploadErrors(prev => prev.filter(e => e.fileName !== fileToDelete.name));
        }
    };

    // Clear all errors
    const clearErrors = () => {
        setUploadErrors([]);
    };

    // Handle DataFetchingModal close
    const handleCloseDataFetchingModal = () => {
        setIsDataFetchingOpen(false);
    };

    // Get status icon
    const getStatusIcon = (status: string, error?: string) => {
        switch (status) {
            case 'uploading':
            case 'retrying':
                return (
                    <div className="animate-spin">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="7" stroke="#E5E7EB" strokeWidth="2" />
                            <path d="M15 8C15 4.13401 11.866 1 8 1" stroke="#6E0AB8" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                );
            case 'success':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="8" fill="#10B981" />
                        <path d="M6 8L7.5 9.5L10 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'error':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="8" fill="#EF4444" />
                        <path d="M10 6L6 10M6 6L10 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            default:
                return null;
        }
    };

    // Get file icon based on type
    const getFileIcon = (fileType: string) => {
        if (fileType.includes('pdf')) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#EF4444" />
                    <path d="M7 8H17M7 12H17M7 16H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        } else if (fileType.includes('image')) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#10B981" />
                    <path d="M8 12L11 15L16 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        } else {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#3B82F6" />
                    <path d="M7 8H17M7 12H17M7 16H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        }
    };

    return (
        <>

            <main className="flex-1 overflow-auto px-2 pb-6 bg-white ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Invoice Upload
                        </h1>
                        <p className="text-gray-500">Upload invoice images and extract data automatically using OCR technology</p>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <div className="flex gap-8 mt-12" role="tablist">
                            <button
                                onClick={() => handleTabClick('Purchases')}
                                role="tab"
                                aria-selected={activeTab === 'Purchases'}
                                className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Purchases'
                                        ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-18 after:rounded-full after:bg-[#6E0AB8]'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Purchases
                            </button>
                            <button
                                onClick={() => handleTabClick('Products')}
                                role="tab"
                                aria-selected={activeTab === 'Products'}
                                className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Products'
                                        ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-16 after:rounded-full after:bg-[#6E0AB8]'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Products
                            </button>

                            <button
                                onClick={() => handleTabClick('Inventory')}
                                role="tab"
                                aria-selected={activeTab === 'Inventory'}
                                className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Inventory'
                                        ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-16 after:rounded-full after:bg-[#6E0AB8]'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Inventory
                            </button>

                            <button
                                onClick={() => handleTabClick('Recipes')}
                                role="tab"
                                aria-selected={activeTab === 'Recipes'}
                                className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Recipes'
                                        ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-14 after:rounded-full after:bg-[#6E0AB8]'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Recipes
                            </button>

                            <button
                                onClick={() => handleTabClick('Other Files')}
                                role="tab"
                                aria-selected={activeTab === 'Other Files'}
                                className={`relative -mb-px pb-2 text-sm transition-colors
      ${activeTab === 'Other Files'
                                        ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-20 after:rounded-full after:bg-[#6E0AB8]'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Other Files
                            </button>
                        </div>
                    </div>
                </div>

                {activeTab === 'Products' && (
                    <div className="space-y-6">
                        {/* Error Summary */}
                        {uploadErrors.length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-red-800 font-medium">
                                        Upload Errors ({uploadErrors.length})
                                    </h3>
                                    <button
                                        onClick={clearErrors}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {uploadErrors.map((error, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                                                <circle cx="8" cy="8" r="8" fill="#EF4444" />
                                                <path d="M10 6L6 10M6 6L10 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex-1">
                                                <p className="text-red-700 text-sm">
                                                    {error.fileName && <span className="font-medium">{error.fileName}: </span>}
                                                    {error.message}
                                                </p>
                                                {error.retryable && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        This error can be retried
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* File Upload Section */}
                        <div className={`bg-white rounded-2xl  border border-[#E9EAEA] p-8 transition-colors ${isDragOver
                            ? 'border-[#6E0AB8] bg-purple-50'
                            : 'border-gray-200'
                            }`}>
                            <div
                                className="flex flex-col items-center justify-center py-12"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {/* Upload Icon */}
                                <div className="mb-4">
                                    <svg width="44" height="44" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="36" height="36" rx="18" fill="#F1E7F8" />
                                        <path d="M20.0006 15.3353H24.3606C24.1279 14.7185 23.7663 14.1585 23.3 13.6926L20.9773 11.3686C20.5109 10.9028 19.9507 10.5415 19.334 10.3086V14.6686C19.334 15.0368 19.6325 15.3353 20.0006 15.3353Z" fill="#6E0AB8" />
                                        <path d="M24.6513 16.6667H20.0006C18.8961 16.6667 18.0006 15.7712 18.0006 14.6667V10.016C17.8933 10.0087 17.786 10 17.6773 10H14.6673C12.8273 10.0022 11.3362 11.4933 11.334 13.3333V22.6667C11.3362 24.5067 12.8273 25.9978 14.6673 26H21.334C23.174 25.9978 24.6651 24.5067 24.6673 22.6667V16.99C24.6673 16.8813 24.6586 16.774 24.6513 16.6667Z" fill="#6E0AB8" />
                                    </svg>

                                </div>

                                {/* Upload Text */}
                                <p className="text-gray-500 text-sm mb-2">
                                    {isDragOver ? 'Drop files here' : 'Drag and drop files here, or click add file'}
                                </p>

                                {/* File restrictions info */}
                                <p className="text-gray-400 text-xs mb-6 text-center">
                                    Supported: {ALLOWED_EXTENSIONS.join(', ')} (Max: {formatFileSize(MAX_FILE_SIZE)}, Up to {MAX_FILES_PER_UPLOAD} files)
                                </p>

                                {/* Upload Status */}
                                {isUploading && (
                                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <div className="animate-spin">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="7" stroke="#E5E7EB" strokeWidth="2" />
                                                    <path d="M15 8C15 4.13401 11.866 1 8 1" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <p className="text-blue-700 text-sm">Uploading files...</p>
                                        </div>
                                    </div>
                                )}

                                {/* Add File Button */}
                                <button
                                    className="bg-primary text-white px-4 text-xs py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                >
                                    {isUploading ? 'Uploading...' : 'Add file'}
                                </button>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept={ALLOWED_EXTENSIONS.join(',')}
                                    onChange={handleFileInputChange}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                            </div>
                        </div>

                        {/* Recent Uploads Section */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Uploads</h3>

                            {uploadedFiles.length === 0 ? (
                                <div className="text-center py-8">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-gray-300">
                                        <rect width="48" height="48" rx="24" fill="#F3F4F6" />
                                        <path d="M24 12L24 28M24 12L18 18M24 12L30 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 32L12 36C12 36.5304 12.2107 37.0391 12.5858 37.4142C12.9609 37.7893 13.4696 38 14 38L34 38C34.5304 38 35.0391 37.7893 35.4142 37.4142C35.7893 37.0391 36 36.5304 36 36L36 32" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-gray-500 text-sm">No files uploaded yet</p>
                                    <p className="text-gray-400 text-xs mt-1">Upload your first file to get started</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {uploadedFiles.map((file, index) => (
                                        <div
                                            key={file.id}
                                            className={`flex items-center justify-between p-4 bg-white border rounded-lg ${index === 0 ? 'border-primary' : 'border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3 flex-1">
                                                {/* File Icon */}
                                                {getFileIcon(file.type)}

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2">
                                                        <p className="text-gray-900 font-semibold text-md truncate">{file.name}</p>

                                                    </div>
                                                    <p className="text-gray-500 text-xs">
                                                        {formatDate(file.uploadDate)} • {formatFileSize(file.size)}
                                                    </p>

                                                    {/* Progress Bar */}
                                                    {(file.status === 'uploading' || file.status === 'retrying') && file.progress !== undefined && (
                                                        <div className="mt-2">
                                                            <div className="w-full bg-gray-200 rounded-full h-1">
                                                                <div
                                                                    className="bg-[#6E0AB8] h-1 rounded-full transition-all duration-300"
                                                                    style={{ width: `${file.progress}%` }}
                                                                ></div>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {file.status === 'retrying' ? 'Retrying...' : 'Uploading...'} {Math.round(file.progress)}%
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Error Message */}
                                                    {file.status === 'error' && file.error && (
                                                        <p className="text-red-600 text-xs mt-1">{file.error}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                {/* Retry Button */}
                                                {/* {file.status === 'error' && (
                                                        <button
                                                            className="text-blue-600 hover:text-blue-800 p-1"
                                                            onClick={() => retryUpload(file.id)}
                                                            title="Retry upload"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 3C4.5 3 1.5 6 1.5 9.5S4.5 16 8 16C11.5 16 14.5 13 14.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M14.5 3L14.5 9.5L8 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </button>
                                                    )} */}

                                                {/* Download Icon */}
                                                {file.url && (
                                                    <button
                                                        className="text-gray-400 hover:text-gray-600 p-1"
                                                        onClick={() => handleDownload(file)}
                                                        title="Download file"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 2V12M10 12L6 8M10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M3 15V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H15C15.5304 18 16.0391 17.7893 16.4142 17.4142C16.7893 17.0391 17 16.5304 17 16V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Delete Icon */}
                                                {/* <button
                                                        className="text-gray-400 hover:text-red-600 p-1"
                                                        onClick={() => handleDelete(file.id)}
                                                        title="Delete file"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3 6H5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2C10.5304 2 11.0391 2.21071 11.4142 2.58579C11.7893 2.96086 12 3.46957 12 4V6M15 6V16C15 16.5304 14.7893 17.0391 14.4142 17.4142C14.0391 17.7893 13.5304 18 13 18H7C6.46957 18 5.96086 17.7893 5.58579 17.4142C5.21071 17.0391 5 16.5304 5 16V6H15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </main>


            {/* DataFetchingModal */}
            <DataFetchingModal
                isOpen={isDataFetchingOpen}
                onClose={handleCloseDataFetchingModal}
            />
        </>
    )
}

export default Page