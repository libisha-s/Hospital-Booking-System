import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/doctors';

export const getAllDoctors = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const getDoctorsByDepartment = async (dept) => {
  const response = await axios.get(`${API_BASE}/dept/${dept}`);
  return response.data;
};
