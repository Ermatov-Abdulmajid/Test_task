import React, { useState, useRef } from "react";
import { uploadImage, deleteImage } from "../api";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Photos = ({ photos, companyId, setCompany }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await handleUpload(selectedFile); // Trigger upload immediately after file selection
    }
  };

  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload) return;
    try {
      const newImage = await uploadImage(companyId, fileToUpload);
      setCompany((prev) => ({
        ...prev,
        photos: [...prev.photos, newImage],
      }));
      setFile(null);
      fileInputRef.current.value = null; // Reset
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleDelete = async (imageName) => {
    try {
      await deleteImage(companyId, imageName);
      setCompany((prev) => ({
        ...prev,
        photos: prev.photos.filter((photo) => photo.name !== imageName),
      }));
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  return (
    <div className="photos">
      <h3>Photos</h3>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.name} className="photo-item">
            <img src={photo.thumbpath} alt="thumbnail" />
            <button
              className="delete-photo-button"
              onClick={() => handleDelete(photo.name)}
            >
              <DeleteIcon style={{ fontSize: 16 }} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        className="file-input"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
      <button
        className="add-photo-button"
        onClick={() => fileInputRef.current.click()}
      >
        <AddIcon style={{ fontSize: 16 }} />
        Add
      </button>
    </div>
  );
};

export default Photos;
