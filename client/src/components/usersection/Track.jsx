import { useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle, XCircle, AlertTriangle, Pencil } from "lucide-react";

const TrackReports = () => {
  const [reportId, setReportId] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const fetchStatus = async () => {
    if (!reportId.trim()) {
      setError("Please enter a valid Report ID.");
      return;
    }

    setLoading(true);
    setError("");
    setReportData(null);

    try {
      const response = await axios.get(`http://localhost:4000/api/report/status?reportId=${reportId}`);
      if (response.data.success) {
        setReportData(response.data.data); 
      } else {
        setError("Report not found.");
      }
    } catch (error) {
      setError("Error fetching report status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { text: "Pending", color: "bg-yellow-100 text-yellow-600", icon: <AlertTriangle className="w-5 h-5 inline" /> };
      case "Under Investigation":
        return { text: "Under Investigation", color: "bg-blue-100 text-blue-600", icon: <Loader2 className="w-5 h-5 inline animate-spin" /> };
      case "Resolved":
        return { text: "Resolved", color: "bg-green-100 text-green-600", icon: <CheckCircle className="w-5 h-5 inline" /> };
      case "Rejected":
        return { text: "Rejected", color: "bg-red-100 text-red-600", icon: <XCircle className="w-5 h-5 inline" /> };
      default:
        return { text: "Unknown", color: "bg-gray-100 text-gray-600", icon: <AlertTriangle className="w-5 h-5 inline" /> };
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Track Your Report</h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Report ID"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
        <button
          onClick={fetchStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Check
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {loading && <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto" />}
      {reportData && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <p><strong>Case Type:</strong> {reportData.caseType || "N/A"}</p>
          <p><strong>Location:</strong> {reportData.location || "N/A"}</p>
          <p><strong>Date:</strong> {reportData.date ? new Date(reportData.date).toLocaleDateString() : "N/A"}</p>
          <p><strong>Description:</strong> {reportData.description || "N/A"}</p>
          <p><strong>Witness:</strong> {reportData.witnessDetails || "N/A"}</p>
          <p><strong>Status:</strong> <span className={`px-3 py-1 rounded-full ${getStatusStyle(reportData.status).color}`}>{getStatusStyle(reportData.status).icon} {getStatusStyle(reportData.status).text}</span></p>
       
        </div>
      )}
    </div>
  );
};

export default TrackReports;
