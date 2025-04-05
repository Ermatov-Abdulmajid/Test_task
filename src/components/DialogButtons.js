import React, { useState } from "react";
import { deleteCompany } from "../api";

const DialogButtons = ({ companyId }) => {
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newName, setNewName] = useState("Eternal Rest Funeral Home");

  const handleDelete = async () => {
    try {
      await deleteCompany(companyId);
      alert("Organization deleted");
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  const handleNameSave = () => {
    setShowNameDialog(false);
  };

  return (
    <div className="dialog-buttons">
      <div>Made by Abdumajid</div>
    </div>
  );
};

export default DialogButtons;
