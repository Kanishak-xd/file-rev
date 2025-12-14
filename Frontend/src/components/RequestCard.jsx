export default function RequestCard({ request, onApprove, onReject }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                        #{request.id.slice(0, 8)}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {formatDate(request.createdAt)}
                    </p>
                </div>
                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full whitespace-nowrap ml-2">
                    {request.files.length} file{request.files.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="mb-3">
                <div className="space-y-1">
                    {request.files.slice(0, 2).map((file, index) => (
                        <div key={index} className="flex items-center text-xs text-muted-foreground truncate">
                            <span className="mr-1">•</span>
                            <span className="truncate">{file.name}</span>
                        </div>
                    ))}
                    {request.files.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                            +{request.files.length - 2} more
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onApprove(request.id)}
                    className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs font-medium"
                >
                    Approve
                </button>
                <button
                    onClick={() => onReject(request.id)}
                    className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs font-medium"
                >
                    Reject
                </button>
            </div>
        </div>
    );
}
