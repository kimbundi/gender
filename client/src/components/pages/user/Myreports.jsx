import {  useState } from "react";
import './Myreports.css';
import IncidentMap from "../../map/Map";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const ReportCaseForm = () => {
  const navigate = useNavigate();

  const url = "https://gender-backend.onrender.com";
  const [formData, setFormData] = useState({
    caseType: "",
    date: "",
    location: "",
    description: "",
    files: null,
    witnessDetails: "",
    confidentiality: false,
  });
  
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState([ -1.2921, 36.8219 ]); // Default to Nairobi

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates([latitude, longitude]); // Update coordinates

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
          setFormData({ ...formData, location: address });
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Could not fetch address. Please try again.");
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location.");
        setLoadingLocation(false);
      }
    );
  };
  const [reportId, setReportId] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    
    formDataToSend.append("caseType", formData.caseType);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("witnessDetails", formData.witnessDetails);
    
    formDataToSend.append("confidentiality", formData.confidentiality);
  
    // Ensure you're appending the file under the correct field name
    if (formData.files && formData.files.length > 0) {
      formDataToSend.append("image", formData.files[0]); // Use "image" to match backend
    }
  
    try {
      const response = await axios.post(`${url}/api/report/add`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        const submittedReportId = response.data.reportId; // Get reportId from response
        localStorage.setItem("reportId", submittedReportId);
        toast.success("Your report has been submiited we will follow up")

        navigate("/reportid", { state: { reportId: submittedReportId } });
      
        alert("Report submitted successfully!");
        
      setTimeout(() => {
        navigate("/");
      }, 10000); // Waits 10 seconds before navigating

        setFormData({
          caseType: "",
          date: "",
          location: "",
          description: "",
          witnessDetails: "",
          confidentiality: "",
          files: null,
        });
      
        
      }
      
      else {
        alert("Failed to submit report.");
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report. Please try again later.");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4">Report a Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <label>Select type of case</label>
        <select
          name="caseType"
          value={formData.caseType}
          onChange={handleChange}
          required
          className="input-style"
        >
          <option value="">Select Case Type</option>
          <option value="fraud">Fraud</option>
          <option value="harassment">Harassment</option>
          <option value="accident">Accident</option>
          <option value="missing">Missing Person</option>
          <option value="rape">Rape</option>
          <option value="defilement">Defilement</option>
          <option value="others">Others</option>
        </select>

        <label>Date it happened</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input-style"
        />

        <label>Location of Incident</label>
        <input
          type="text"
          name="location"
          placeholder="Click to fetch your location"
          value={formData.location}
          onClick={handleLocationClick}
          readOnly
          required
          className={`input-style cursor-pointer ${loadingLocation ? "opacity-50" : ""}`}
        />
        {loadingLocation && <p className="text-sm text-gray-500">Fetching location...</p>}

        
        <IncidentMap position={coordinates} />  {/* Pass coordinates as props */}

        <textarea
          name="description"
          placeholder="Describe the Incident"
          value={formData.description}
          onChange={handleChange}
          required
          className="input-style h-28"
        ></textarea>

        <label>Upload Evidence here</label>
        <input
          type="file"
          name="files"
          id="image"
          onChange={handleFileChange}
          multiple
          className="file-input-style"
        />

        <textarea
          name="witnessDetails"
          placeholder="Witness Details (if any)"
          value={formData.witnessDetails}
          onChange={handleChange}
          className="input-style h-20"
        ></textarea>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="confidentiality"
            checked={formData.confidentiality}
            onChange={handleChange}
          />
          <span>Keep my report confidential</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportCaseForm;

