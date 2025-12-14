import React from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalDescription,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ReviewModal({ request, isOpen, onClose, onSubmit }) {
    const [fileStatuses, setFileStatuses] = React.useState({});
    const [comments, setComments] = React.useState({});

    if (!request) return null;

    const handleStatusChange = (fileName, status) => {
        setFileStatuses(prev => ({
            ...prev,
            [fileName]: status
        }));
    };

    const handleCommentChange = (fileName, comment) => {
        setComments(prev => ({
            ...prev,
            [fileName]: comment
        }));
    };

    const handleSubmit = () => {
        const files = request.files.map(file => ({
            name: file.name,
            status: fileStatuses[file.name] || 'approved',
            comment: comments[file.name] || ''
        }));

        onSubmit(request.id, files);
        onClose();

        // Reset state
        setFileStatuses({});
        setComments({});
    };

    const allFilesReviewed = request.files.every(
        file => fileStatuses[file.name] === 'approved' || fileStatuses[file.name] === 'rejected'
    );

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className="md:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <ModalHeader className="items-center py-6">
                    <div className="flex flex-col items-center space-y-1">
                        <ModalTitle className="text-2xl font-semibold">
                            Review Request #{request.id.slice(0, 8)}
                        </ModalTitle>
                        <ModalDescription className="text-muted-foreground text-center text-sm">
                            Review each file and mark as approve or reject
                        </ModalDescription>
                    </div>
                </ModalHeader>
                <ModalBody className="space-y-6">
                    {request.files.map((file, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div>
                                <h3 className="font-medium text-foreground mb-1">{file.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>

                            <div className="border rounded overflow-hidden bg-muted/50">
                                {file.type === 'application/pdf' ? (
                                    <iframe
                                        src={file.preview}
                                        className="w-full h-64"
                                        title={file.name}
                                    />
                                ) : (
                                    <img
                                        src={file.preview}
                                        alt={file.name}
                                        className="w-full h-auto max-h-64 object-contain"
                                    />
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleStatusChange(file.name, 'approved')}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${fileStatuses[file.name] === 'approved'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                                            }`}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(file.name, 'rejected')}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${fileStatuses[file.name] === 'rejected'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
                                            }`}
                                    >
                                        Reject
                                    </button>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Comment (optional)</Label>
                                    <Textarea
                                        value={comments[file.name] || ''}
                                        onChange={(e) => handleCommentChange(file.name, e.target.value)}
                                        placeholder="Add a comment..."
                                        rows="2"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!allFilesReviewed}
                        className="bg-black text-white"
                    >
                        Submit Review
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
