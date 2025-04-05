import axios from "axios";

const API_URL = "https://test-task-api.allfuneral.com";
let token = "";

export const authenticate = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/auth?user=${username}`);
    token = response.headers.authorization.split(" ")[1]; // Extract Bearer token
    return token;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};

export const getCompany = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch company:", error);
    throw error;
  }
};

export const getContact = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    throw error;
  }
};

export const updateCompany = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/companies/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update company:", error);
    throw error;
  }
};

export const updateContact = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/contacts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update contact:", error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    await axios.delete(`${API_URL}/companies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Failed to delete company:", error);
    throw error;
  }
};

export const uploadImage = async (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      `${API_URL}/companies/${id}/image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};

export const deleteImage = async (id, imageName) => {
  try {
    await axios.delete(`${API_URL}/companies/${id}/image/${imageName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
};
