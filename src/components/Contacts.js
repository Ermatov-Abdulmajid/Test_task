import React, { useState } from "react";
import { updateContact } from "../api";

const Contacts = ({ contact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: contact.firstname || "",
    lastname: contact.lastname || "",
    phone: contact.phone || "",
    email: contact.email || "",
  });
  const [error, setError] = useState(""); // State for error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.phone ||
      !formData.email
    ) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Log contact ID for debugging
      console.log("Contact ID:", contact.id);
      if (!contact.id) {
        throw new Error("Contact ID is missing.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("firstname", formData.firstname);
      formDataToSend.append("lastname", formData.lastname);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);

      const updatedData = await updateContact(contact.id, formDataToSend);
      console.log("Updated Data:", updatedData);

      setFormData({
        firstname: updatedData.firstname || formData.firstname,
        lastname: updatedData.lastname || formData.lastname,
        phone: updatedData.phone || formData.phone,
        email: updatedData.email || formData.email,
      });

      setIsEditing(false);
      setError(""); // Clear any errors
    } catch (error) {
      console.error("Failed to save contact details:", error);
      setError("Failed to save contact details. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      firstname: contact.firstname || "",
      lastname: contact.lastname || "",
      phone: contact.phone || "",
      email: contact.email || "",
    });
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="contacts">
      <h3>Contacts</h3>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {isEditing ? (
        <>
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />

          <button className="primary-button" onClick={handleSave}>
            Save
          </button>
          <button className="secondary-button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="data-row">
            <label>Responsible Person</label>
            <span>
              {formData.firstname} {formData.lastname}
            </span>
          </div>
          <div className="data-row">
            <label>Phone Number</label>
            <span>{formData.phone}</span>
          </div>
          <div className="data-row">
            <label>E-mail</label>
            <span>{formData.email}</span>
          </div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        </>
      )}
    </div>
  );
};

export default Contacts;
