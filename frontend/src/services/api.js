import axios from 'axios';

const API_URL = "http://18.208.128.79:3000";

// Function to get a patient by patientId
export const getPatient = async (patientId) => {
  try {
    const response = await axios.get(`${API_URL}/patients/${patientId}`);
    return response.data; // Return the patient data from the API
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to add or update a patient
export const addPatient = async (patientId, patientData) => {
  try {
    const response = await axios.post(`${API_URL}/patients/${patientId}`, patientData);
    return response.data; // Return the response message after saving data
  } catch (error) {
    console.error("Error saving patient data:", error);
    throw error; // Rethrow the error for further handling
  }
};

