import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/admin';

export const getDoctors = async () => {
  const response = await axios.get(`${API_BASE}/doctors`);
  return response.data;
};

export const addDoctor = async (doctorData) => {
  const response = await axios.post(`${API_BASE}/add`, doctorData);
  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await axios.put(`${API_BASE}/doctors/${id}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await axios.delete(`${API_BASE}/doctors/${id}`);
  return response.data;
};

export const addAvailability = async (availabilityData) => {
  const response = await axios.post(`${API_BASE}/availability`, availabilityData);
  return response.data;
};
