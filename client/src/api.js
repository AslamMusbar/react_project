// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/addresses'; // Backend URL

// Get all addresses
export const getAddresses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses', error);
    throw error;
  }
};

// Add a new address
export const addAddress = async (address) => {
  try {
    const response = await axios.post(API_URL, address);
    return response.data;
  } catch (error) {
    console.error('Error adding address', error);
    throw error;
  }
};

// Update an existing address
export const updateAddress = async (id, address) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, address);
    return response.data;
  } catch (error) {
    console.error('Error updating address', error);
    throw error;
  }
};

// Delete an address
export const deleteAddress = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting address', error);
    throw error;
  }
};
