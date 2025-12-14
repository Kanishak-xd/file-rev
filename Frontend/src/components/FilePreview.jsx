export default function FilePreview({ file, onRemove }) {
    const isPDF = file.type === 'application/pdf';

    return (
        <div className="border rounded-lg p-4 bg-card shadow-sm">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                    </p>
                </div>
                {onRemove && (
                    <button
                        onClick={() => onRemove(file.name)}
                        className="ml-2 text-destructive hover:text-destructive/80"
                        aria-label="Remove file"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="mt-3 border rounded overflow-hidden bg-muted/50">
                {isPDF ? (
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
        </div>
    );
}
