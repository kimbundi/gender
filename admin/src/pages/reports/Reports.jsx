import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Reports.css";
import Modal from "react-modal";

const Reports = ({ url }) => {
  const [reports, setReports] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch reports
  const fetchReports = async () => {
    try {
      const response = await axios.get(`${url}/api/report/list`);
      if (response.data.success) {
        setReports(response.data.data);
      } else {
        toast.error("Failed to load reports");
      }
    } catch (error) {
      toast.error("Error fetching reports");
    }
  };

  useEffect(() => {
    fetchReports(); // Initial fetch
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);

  // Remove a report instantly from state
  const removeReport = async (reportId) => {
    toast.info("Deleting report...", { autoClose: 1000 });

    try {
      const response = await axios.post(`${url}/api/report/remove`, { id: reportId });

      if (response.data.success) {
        setReports((prev) => prev.filter((item) => item._id !== reportId));
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting report");
      }
    } catch (error) {
      toast.error("Error deleting report");
    }
  };

  // Open the evidence modal
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  // Update Case Status instantly in state
  const updateStatus = async (reportId, newStatus) => {
    try {
      const response = await axios.post(`${url}/api/report/update`, { reportId, status: newStatus });

      if (response.data.success) {
        toast.success("Status updated successfully!");

        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id === reportId ? { ...report, status: newStatus } : report
          )
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin - Reported Cases</h2>

      {reports.length === 0 ? (
        <p className="no-reports">No reports available.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Case Type</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Witness</th>
              <th>Evidence</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const formattedDate = new Date(report.date).toISOString().split("T")[0];
              return (
                <tr key={report._id}>
                  <td>{report.caseType}</td>
                  <td>{formattedDate}</td>
                  <td>{report.location}</td>
                  <td>{report.description}</td>
                  <td>{report.witnessDetails ? report.witnessDetails : "No Witness"}</td>
                  
                  {/* View Evidence Button */}
                  <td>
                    {report.image ? (
                      <button onClick={() => openModal(report.image)}>View Evidence</button>
                    ) : (
                      "No Evidence"
                    )}
                  </td>

                  {/* Case Status Dropdown */}
                  <td>
                    <select
                      value={report.status}
                      onChange={(e) => updateStatus(report._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Investigation">Under Investigation</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  {/* Delete Button */}
                  <td>
                    <button onClick={() => removeReport(report._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal for Viewing Evidence */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{ content: { width: "50%", margin: "auto" } }}
      >
        {selectedImage ? (
          <>
            <img src={`${url}/images/` + selectedImage} alt="Evidence" width="100%" />
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </>
        ) : (
          <p>No evidence available.</p>
        )}
      </Modal>
    </div>
  );
};

export default Reports;
