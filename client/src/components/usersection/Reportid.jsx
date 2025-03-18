import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReportSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve reportId from state or localStorage
  const reportId = location.state?.reportId || localStorage.getItem("reportId");

  // Save reportId in localStorage when it's received
  useEffect(() => {
    if (location.state?.reportId) {
      localStorage.setItem("reportId", location.state.reportId);
    }
  }, [location.state?.reportId]);

  if (!reportId) {
    return (
      <div className="max-w-md mx-auto bg-red-100 p-6 rounded-lg text-red-600">
        <h2 className="text-xl font-bold">Error</h2>
        <p>No report ID found.</p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg text-center">
      <h2 className="text-2xl font-semibold text-green-600">Report Submitted!</h2>
      <p className="text-gray-700 mt-2">Your report has been successfully submitted.</p>
      <p className="mt-4 text-lg font-mono bg-gray-200 p-2 rounded-lg">
        Report ID: <strong>{reportId}</strong>
      </p>
      <button 
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg" 
        onClick={() => navigate("/")}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ReportSuccessPage;
