import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Casedetails.css";  // Import the CSS file

const CaseDetails = ({ caseId }) => {
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/case/status?caseId=${caseId}`);
                setCaseData(response.data.data);
            } catch (error) {
                setError("Error fetching case details.");
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseDetails();
    }, [caseId]);

    if (loading) return <p className="loading">Loading case details...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="case-details-container">
            <h2>Case Details</h2>
            <p><strong>Case Type:</strong> {caseData.caseType}</p>
            <p><strong>Date:</strong> {new Date(caseData.date).toDateString()}</p>
            <p><strong>Location:</strong> {caseData.location}</p>
            <p><strong>Description:</strong> {caseData.description}</p>
            <p><strong>Status:</strong> {caseData.status}</p>

            {caseData.investigator && (
                <div className="investigator-section">
                    <h3>Investigator Details</h3>
                    <p><strong>Name:</strong> {caseData.investigator.name}</p>
                    <p><strong>Phone:</strong> {caseData.investigator.phone}</p>
                    <p><strong>Location:</strong> {caseData.investigator.location}</p>
                </div>
            )}
        </div>
    );
};

export default CaseDetails;
