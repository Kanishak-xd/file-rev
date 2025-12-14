import { useState, useRef } from 'react';
import { useImageUpload } from '@/hooks/use-image-upload';

export default function FileUpload({ onFilesSelected }) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        await processFiles(droppedFiles);
    };

    const handleFileInput = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        await processFiles(selectedFiles);
    };

    const processFiles = async (fileList) => {
        const validFiles = fileList.filter(file => {
            const isImage = file.type.startsWith('image/');
            const isPDF = file.type === 'application/pdf';
            return isImage || isPDF;
        });

        if (validFiles.length === 0) {
            alert('Please upload only PDF or image files');
            return;
        }

        const processedFiles = await Promise.all(
            validFiles.map(async (file) => {
                const preview = await getFilePreview(file);
                return {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: preview.data,
                    preview: preview.url
                };
            })
        );

        setFiles(prev => [...prev, ...processedFiles]);
        onFilesSelected(processedFiles);
    };

    const getFilePreview = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                resolve({
                    data: e.target.result,
                    url: e.target.result
                });
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            <div className="space-y-4">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <div>
                    <p className="text-lg font-medium text-gray-700">
                        Drag and drop files here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Supports PDF and image files
                    </p>
                </div>

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 hover:cursor-pointer transition-colors"
                >
                    Select Files
                </button>
            </div>
        </div>
    );
}
