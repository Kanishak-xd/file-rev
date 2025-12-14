import { useState, useEffect } from 'react';
import RequestCard from '../components/RequestCard';
import ReviewModal from '../components/ReviewModal';
import { storage } from '../utils/storage';
import { generateReport, downloadReport } from '../utils/reportGenerator';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadRequests();
    loadReport();
  }, []);

  const loadRequests = () => {
    const pendingRequests = storage.getRequests();
    setRequests(pendingRequests);
  };

  const loadReport = () => {
    const reportData = generateReport();
    setReport(reportData);
  };

  const handleApprove = (requestId) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setIsModalOpen(true);
    }
  };

  const handleReject = (requestId) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setIsModalOpen(true);
    }
  };

  const handleReviewSubmit = (requestId, files) => {
    const review = {
      requestId,
      files,
      reviewedAt: new Date().toISOString()
    };

    storage.saveReview(review);
    storage.removeRequest(requestId);

    loadRequests();
    loadReport();
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleExportJSON = () => {
    downloadReport('json');
  };

  const handleExportCSV = () => {
    downloadReport('csv');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Review and manage file submissions
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExportJSON} className='bg-black text-white cursor-pointer'>
                Export JSON
              </Button>
              <Button variant="outline" onClick={handleExportCSV} className='bg-black text-white cursor-pointer'>
                Export CSV
              </Button>
            </div>
          </div>

          {report && (
            <div className="bg-card rounded-lg p-6 shadow-sm mb-6 border">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Summary Report
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {report.summary.totalFiles}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {report.summary.approvedCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {report.summary.rejectedCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {report.summary.pendingCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Pending Requests ({requests.length})
          </h2>

          {requests.length === 0 ? (
            <div className="bg-card rounded-lg p-12 text-center shadow-sm border">
              <p className="text-muted-foreground text-lg">
                No pending requests
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>

        <ReviewModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
          onSubmit={handleReviewSubmit}
        />
      </div>
    </div>
  );
}
