import React, { useState, useEffect } from "react";
import axios from "axios";
import CaseDetails from "./Assigned";
import "./Caselist.css";  // Import the CSS file

const CaseList = () => {
    const [cases, setCases] = useState([]);
    const [selectedCaseId, setSelectedCaseId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get("https://gender-backend.onrender.com/api/case/list");
                setCases(response.data.data);  // Store case list
            } catch (error) {
                setError("Error fetching cases.");
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

    if (loading) return <p className="loading">Loading cases...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="case-list-container">
            <h2>Cases List</h2>
            <ul className="case-list">
                {cases.map((caseItem) => (
                    <li key={caseItem._id} className="case-item">
                        <span className="case-info">
                            {caseItem.caseType} - {new Date(caseItem.date).toDateString()}
                        </span>
                        <button className="view-button" onClick={() => setSelectedCaseId(caseItem._id)}>
                            View Details
                        </button>
                    </li>
                ))}
            </ul>

            {selectedCaseId && <div className="case-details"><CaseDetails caseId={selectedCaseId} /></div>}
        </div>
    );
};

export default CaseList;

