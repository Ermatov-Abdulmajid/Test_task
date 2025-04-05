import React, { useState } from "react";
import { updateContact } from "../api";

const Contacts = ({ contact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: contact.firstname,
    lastname: contact.lastname,
    phone: contact.phone,
    email: contact.email,
  });

  const handleSave = async () => {
    try {
      const updatedData = await updateContact(contact.id, formData);
      setFormData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save contact details:", error);
    }
  };

  return (
    <div className="contacts">
      <h3>Contacts</h3>
      {isEditing ? (
        <>
          <input
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
          />
          <input
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          />
          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
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
            <label>Responsible Person</label>
            <span>
              {contact.firstname} {contact.lastname}
            </span>
          </div>
          <div className="data-row">
            <label>Phone Number</label>
            <span>{contact.phone}</span>
          </div>
          <div className="data-row">
            <label>E-mail</label>
            <span>{contact.email}</span>
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
