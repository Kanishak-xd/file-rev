// Utility to save report to output folder (for build/deployment)
// Note: This runs in browser, so we'll use download functionality
// For actual file system writes, this would need to be done server-side

import { exportToJSON, exportToCSV } from './reportGenerator';

export const saveReportToOutput = async (format = 'json') => {
  // In a browser environment, we can't directly write to the file system
  // This function will trigger a download, and the user can save it to the output folder
  // For production, this would typically be handled by a build script or backend
  
  const content = format === 'json' ? exportToJSON() : exportToCSV();
  const blob = new Blob([content], { 
    type: format === 'json' ? 'application/json' : 'text/csv' 
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `output/report.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

