import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Cases.css";

const CaseTracking = ({ url }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [investigators, setInvestigators] = useState([]); // List of all investigators
    const [filteredInvestigators, setFilteredInvestigators] = useState([]); // Case type-based investigators
    const [selectedCase, setSelectedCase] = useState(null);
    const [selectedInvestigator, setSelectedInvestigator] = useState(null);
    const [selectedCaseType, setSelectedCaseType] = useState("");

    useEffect(() => {
        fetchReports();
    }, [statusFilter]);

    useEffect(() => {
        if (selectedCaseType) {
            fetchInvestigators(selectedCaseType); // Fetch investigators when case type changes
        }
    }, [selectedCaseType]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/report/list`, { params: { status: statusFilter } });
            setReports(response.data.data);
        } catch (error) {
            toast.error("Error fetching reports!");
            console.error("Error fetching reports:", error);
        }
        setLoading(false);
    };

    const fetchInvestigators = async (caseType) => {
        try {
            const response = await axios.get(`${url}/api/investigator/list`);
            const allInvestigators = response.data.data;

            console.log("All investigators:", allInvestigators);

            // Normalize caseType (convert to lowercase and trim spaces)
            const normalizedCaseType = caseType?.toLowerCase().trim() || "";

            // Filter investigators based on normalized case type
            const filteredInvestigators = allInvestigators.filter(inv =>
                inv.caseType?.toLowerCase().trim() === normalizedCaseType
            );

            console.log("Filtered investigators:", filteredInvestigators);

            setInvestigators(filteredInvestigators); // Set the filtered investigators here
            setFilteredInvestigators(filteredInvestigators); // Update filteredInvestigators state
        } catch (error) {
            toast.error("Error fetching investigators!");
            console.error("Error fetching investigators:", error);
        }
    };

    const handleUpdateStatus = async (id, newStatus, caseType) => {
        if (newStatus === "Under Investigation") {
            const selectedReport = reports.find(report => report._id === id); // Get the full report details
            setSelectedCase(selectedReport); // Store the full case details
            setSelectedCaseType(caseType); // Store the case type
            return;
        }

        try {
            await axios.post(`${url}/api/report/update`, { reportId: id, status: newStatus });
            toast.success("Status updated successfully!");
            fetchReports(); // Refetch reports
        } catch (error) {
            toast.error("Failed to update status!");
            console.error("Error updating status:", error);
        }
    };

    const handleAssignInvestigator = async () => {
        if (!selectedInvestigator) {
            toast.error("Please select an investigator!");
            return;
        }
    
        // Log the full details to the console
        console.log("Selected Case Details:", selectedCase);
        console.log("Selected Investigator Details:", selectedInvestigator);
    
        // Ensure the required fields are available
        if (!selectedCase || !selectedCase.caseType || !selectedCase.date || !selectedCase.description || !selectedCase.location) {
            toast.error("Case details are missing required information!");
            return;
        }
    
        try {
            // Prepare the data to send to the backend
            const data = {
                case: {
                    caseType: selectedCase.caseType,
                    date: selectedCase.date,
                    location: selectedCase.location,
                    description: selectedCase.description,
                    witnessDetails: selectedCase.witnessDetails,
                    confidentiality: selectedCase.confidentiality,
                    image: selectedCase.image, // Assuming image URL or file path is included
                },
                investigator: {
                    name: selectedInvestigator.name,
                    phone: selectedInvestigator.phone,
                    location: selectedInvestigator.location,
                    caseType: selectedInvestigator.caseType,
                }
            };
    console.log(data)
            // Make the API request to the backend to assign the investigator and update the case
            const response = await axios.post('http://localhost:4000/Case/add', data);
    
            if (response.data.success) {
                toast.success("Investigator assigned successfully!");
                setSelectedCase(null); // Close modal
                fetchReports(); // Refetch the reports list
            } else {
                toast.error("Failed to assign investigator!");
            }
        } catch (error) {
            toast.error("Error assigning investigator!");
            console.error("Error assigning investigator:", error);
        }
    };
    
    return (
        <div className="case-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="case-title">Case Tracking</h2>

            <select className="filter-dropdown" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Cases</option>
                <option value="Pending">Pending</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
            </select>

            {loading ? (
                <p>Loading reports...</p>
            ) : reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <table className="case-table">
                    <thead>
                        <tr>
                            <th>Case Type</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id}>
                                <td>{report.caseType}</td>
                                <td>{new Date(report.date).toLocaleDateString()}</td>
                                <td>{report.location}</td>
                                <td>
                                    <select
                                        value={report.status}
                                        onChange={(e) => handleUpdateStatus(report._id, e.target.value, report.caseType)}
                                        className="status-dropdown"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Under Investigation">Under Investigation</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => removeReport(report._id)} className="delete-button">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedCase && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Assign Investigator</h3>
                        <p>Filtering investigators for case type: {selectedCaseType}</p>
                        <select 
                            value={selectedInvestigator ? selectedInvestigator._id : ""} 
                            onChange={(e) => {
                                const selected = investigators.find(inv => inv._id === e.target.value);
                                setSelectedInvestigator(selected); // Store the full investigator details
                            }}
                        >
                            <option value="">Select Investigator</option>
                            {filteredInvestigators.length === 0 ? (
                                <option value="" disabled>No investigators available</option>
                            ) : (
                                filteredInvestigators.map((investigator) => (
                                    <option key={investigator._id} value={investigator._id}>
                                        {investigator.name}
                                    </option>
                                ))
                            )}
                        </select>

                        <button onClick={handleAssignInvestigator}>Assign</button>
                        <button onClick={() => setSelectedCase(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseTracking;
