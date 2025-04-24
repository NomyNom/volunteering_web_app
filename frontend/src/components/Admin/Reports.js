// /frontend/src/components/Admin/Reports.js
import React, { useState } from 'react';
import './Reports.css';  // Import the CSS file for styling

const Reports = () => {
  const [format, setFormat] = useState('json');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = 'http://localhost:4000/api/reports';
      if (format !== 'json') {
        url += `?format=${format}`;
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        // Attempt to read a meaningful error from the response body
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || errBody.msg || `HTTP ${response.status}`);
      }

      if (format === 'csv' || format === 'pdf') {
        
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', `report.${format}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setReportData(null);
      } else {
        // For JSON, display a preview on the page.
        const data = await response.json();
        setReportData(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>Generate Report</h1>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="report-actions">
        <label>Choose Report Format: </label>
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option value="json">JSON (Preview)</option>
          <option value="csv">CSV (Download)</option>
          <option value="pdf">PDF (Download)</option>
        </select>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>

      {format === 'json' && reportData && (
        <pre className="report-preview">
          {JSON.stringify(reportData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Reports;
