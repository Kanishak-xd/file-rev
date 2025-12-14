// Report generation utilities
import { storage } from './storage';

export const generateReport = () => {
  const { requests, reviews } = storage.getAllData();
  
  // Combine all files from reviews
  const allFiles = [];
  reviews.forEach(review => {
    review.files.forEach(file => {
      allFiles.push({
        name: file.name,
        status: file.status,
        comment: file.comment || '',
        reviewedAt: review.reviewedAt
      });
    });
  });

  const totalFiles = allFiles.length;
  const approvedCount = allFiles.filter(f => f.status === 'approved').length;
  const rejectedCount = allFiles.filter(f => f.status === 'rejected').length;

  return {
    summary: {
      totalFiles,
      approvedCount,
      rejectedCount,
      pendingCount: requests.reduce((sum, req) => sum + req.files.length, 0)
    },
    files: allFiles
  };
};

export const exportToJSON = () => {
  const report = generateReport();
  return JSON.stringify(report, null, 2);
};

export const exportToCSV = () => {
  const report = generateReport();
  
  // CSV header
  let csv = 'File Name,Status,Comment,Reviewed At\n';
  
  // CSV rows
  report.files.forEach(file => {
    const name = `"${file.name}"`;
    const status = `"${file.status}"`;
    const comment = `"${(file.comment || '').replace(/"/g, '""')}"`;
    const date = `"${file.reviewedAt}"`;
    csv += `${name},${status},${comment},${date}\n`;
  });
  
  return csv;
};

export const downloadReport = (format = 'json') => {
  const content = format === 'json' ? exportToJSON() : exportToCSV();
  const blob = new Blob([content], { 
    type: format === 'json' ? 'application/json' : 'text/csv' 
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `file-review-report.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

