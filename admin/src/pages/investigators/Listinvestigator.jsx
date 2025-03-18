import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Listinvestigator.css";

const ListInvestigator = ({ url }) => {
  const [investigators, setInvestigators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Investigators
  const fetchInvestigators = async () => {
    try {
      const response = await axios.get(`${url}/api/investigator/list`);
      console.log("API Response:", response.data);

      if (response.data.success) {
        setInvestigators(response.data.data);
      } else {
        toast.error("Failed to load investigators");
      }
    } catch (error) {
      console.error("Error fetching investigators:", error);
      toast.error("Error fetching investigators");
    } finally {
      setLoading(false);
    }
  };

  // Delete Investigator
  const removeInvestigator = async (investigatorId) => {
    if (!window.confirm("Are you sure you want to delete this investigator?")) return;

    try {
     const response = await axios.post(`${url}/api/investigator/remove`, { id: investigatorId });
      if (response.data.success) {
        toast.success(response.data.message);

        // ✅ Corrected: Update state immediately instead of re-fetching
        setInvestigators((prevInvestigators) =>
          prevInvestigators.filter((investigator) => investigator._id !== investigatorId)
        );
      } else {
        toast.error("Error deleting investigator");
      }
    } catch (error) {
      toast.error("Error deleting investigator");
    }
  };

  useEffect(() => {
    fetchInvestigators();
  }, [url]);

  return (
    <div className="investigator-list">
      <h2>List of Investigators</h2>
      {loading ? (
        <p>Loading investigators...</p>
      ) : investigators.length === 0 ? (
        <p>No investigators found.</p>
      ) : (
        <ul>
          {investigators.map((investigator) => (
            <li key={investigator._id}>
              <strong>Name:</strong> {investigator.name} <br />
              <strong>Phone:</strong> {investigator.phone} <br />
              <strong>Location:</strong> {investigator.location} <br />
              <strong>Case Type:</strong> {investigator.caseType} <br />
              <button
                onClick={() => removeInvestigator(investigator._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListInvestigator;
