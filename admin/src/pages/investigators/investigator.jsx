import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Investigator.css"; // Import CSS

const Investigator = ({ url }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [caseType, setCaseType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const investigatorData = { name, phone, location, caseType };

    try {
      const response = await axios.post(`${url}/api/investigator/add`, investigatorData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Investigator added successfully!");
        setName("");
        setPhone("");
        setLocation("");
        setCaseType("");
      } else {
        toast.error(response.data.message || "Failed to add investigator.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding investigator. Please try again.");
    }
  };

  return (
    <div className="investigator-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Add Investigator</h2>
      <form onSubmit={handleSubmit} className="investigator-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Case Type:</label>
          <select value={caseType} onChange={(e) => setCaseType(e.target.value)} required>
            <option value="">Select Case Type</option>
            <option value="Defilement">Defilement</option>
            <option value="Rape">Rape</option>
            <option value="Murder">Murder</option>
            <option value="Fraud">Fraud</option>
            <option value="Harassment">Harassment</option>
            <option value="Missing Person">Missing Person</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Add Investigator</button>
      </form>
    </div>
  );
};

export default Investigator;
