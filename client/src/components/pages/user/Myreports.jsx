import { useState } from "react";

const ReportCaseForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    nationalId: "",
    caseType: "",
    date: "",
    location: "",
    description: "",
    files: null,
    witnessDetails: "",
    confidentiality: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Report a Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="input-style"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="input-style"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={handleChange}
            className="input-style"
          />
          <input
            type="text"
            name="nationalId"
            placeholder="National ID / Passport Number"
            value={formData.nationalId}
            onChange={handleChange}
            required
            className="input-style"
          />
        </div>
        
        {/* Case Details */}
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
        </select>
        
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input-style"
        />
        <input
          type="text"
          name="location"
          placeholder="Incident Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="input-style"
        />
        <textarea
          name="description"
          placeholder="Describe the Incident"
          value={formData.description}
          onChange={handleChange}
          required
          className="input-style h-28"
        ></textarea>
        
        {/* Supporting Evidence */}
        <input
          type="file"
          name="files"
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
