import React, { useState } from "react";
import { updateCompany } from "../api";

const CompanyDetails = ({ company, setCompany }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: company.name,
    businessEntity: company.businessEntity,
    contract: company.contract,
    type: company.type,
  });

  const handleSave = async () => {
    try {
      const updatedData = await updateCompany(company.id, formData);
      setCompany((prev) => ({ ...prev, ...updatedData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save company details:", error);
    }
  };

  return (
    <div className="company-details">
      <h3>Company Details</h3>
      {isEditing ? (
        <>
          <input
            value={formData.businessEntity}
            onChange={(e) =>
              setFormData({ ...formData, businessEntity: e.target.value })
            }
          />
          <input
            value={formData.contract.no}
            onChange={(e) =>
              setFormData({
                ...formData,
                contract: { ...formData.contract, no: e.target.value },
              })
            }
          />
          <input
            value={formData.contract.issue_date}
            type="date"
            onChange={(e) =>
              setFormData({
                ...formData,
                contract: { ...formData.contract, issue_date: e.target.value },
              })
            }
          />
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
