import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/appointments';

export const bookAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_BASE}`, appointmentData);
  return response.data;
};

export const getAppointments = async () => {
  const response = await axios.get(`${API_BASE}`);
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await axios.put(`${API_BASE}/${id}/cancel`);
  return response.data;
};
