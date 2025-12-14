import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import FilePreview from '../components/FilePreview';
import { storage } from '../utils/storage';
import { Button } from '@/components/ui/button';

export default function UserPage() {
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFilesSelected = (selectedFiles) => {
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const handleRemoveFile = (fileName) => {
        setFiles(prev => prev.filter(f => f.name !== fileName));
    };

    const handleSubmit = () => {
        if (files.length === 0) {
            alert('Please upload at least one file');
            return;
        }

        setIsSubmitting(true);

        const request = {
            id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            files: files,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        storage.saveRequest(request);

        // Clear files
        setFiles([]);
        setIsSubmitting(false);

        alert('Files submitted successfully! Admin will review them.');
    };

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        File Upload
                    </h1>
                    <p className="text-muted-foreground">
                        Upload PDF or image files for review
                    </p>
                </div>

                <div className="mb-6">
                    <FileUpload onFilesSelected={handleFilesSelected} />
                </div>

                {files.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            Preview ({files.length} {files.length === 1 ? 'file' : 'files'})
                        </h2>
                        <div className="space-y-4">
                            {files.map((file, index) => (
                                <FilePreview
                                    key={index}
                                    file={file}
                                    onRemove={handleRemoveFile}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {files.length > 0 && (
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            size="lg"
                            className='bg-black text-white cursor-pointer hover:bg-black/80'
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
