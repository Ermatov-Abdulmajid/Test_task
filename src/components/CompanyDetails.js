import React, { useState, useEffect } from "react";
import { updateCompany } from "../api";

const CompanyDetails = ({ company, setCompany }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: company.name,
    businessEntity: company.businessEntity,
    contract: company.contract,
    type: company.type,
  });
  const [error, setError] = useState(null); // Error state for handling errors

  // Reset formData if company prop changes
  useEffect(() => {
    setFormData({
      name: company.name,
      businessEntity: company.businessEntity,
      contract: company.contract,
      type: company.type,
    });
  }, [company]); // Dependency on company prop

  const handleSave = async () => {
    try {
      const updatedData = await updateCompany(company.id, formData);
      setCompany((prev) => ({ ...prev, ...updatedData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save company details:", error);
      setError("There was an error saving the details. Please try again."); // Set error message
    }
  };

  return (
    <div className="company-details">
      <h3>Company Details</h3>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Display error message */}
      {isEditing ? (
        <>
          <div className="input-group">
            <label>Business Entity</label>
            <input
              value={formData.businessEntity}
              onChange={(e) =>
                setFormData({ ...formData, businessEntity: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label>Contract Number</label>
            <input
              value={formData.contract.no}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contract: { ...formData.contract, no: e.target.value },
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Contract Issue Date</label>
            <input
              value={formData.contract.issue_date}
              type="date"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contract: {
                    ...formData.contract,
                    issue_date: e.target.value,
                  },
                })
              }
            />
          </div>

          <button className="primary-button" onClick={handleSave}>
            Save
          </button>
          <button
            className="secondary-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="data-row">
            <label>Agreement</label>
            <span>
              {company.contract.no},{" "}
              {new Date(company.contract.issue_date).toLocaleDateString()}
            </span>
          </div>
          <div className="data-row">
            <label>Business Entity</label>
            <span>{company.businessEntity}</span>
          </div>
          <div className="data-row">
            <label>Company Type</label>
            <span>{company.type.join(", ")}</span>
          </div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
