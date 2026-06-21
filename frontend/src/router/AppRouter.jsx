import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import HomePage from '../pages/HomePage';
import DoctorDetailsPage from '../pages/DoctorDetailsPage';
import AppointmentPage from '../pages/AppointmentPage';
import BookingSuccessPage from '../pages/BookingSuccessPage';
import AdminDashboard from '../pages/AdminDashboard';
import DoctorManagementPage from '../pages/DoctorManagementPage';
import AvailabilityManagementPage from '../pages/AvailabilityManagementPage';
import AppointmentListPage from '../pages/AppointmentListPage';

function AppRouter() {
  return (
    <Routes>
      {/* Front-End Main Layout Routes */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/doctor/:id" element={<MainLayout><DoctorDetailsPage /></MainLayout>} />
      <Route path="/book" element={<MainLayout><AppointmentPage /></MainLayout>} />
      <Route path="/success" element={<MainLayout><BookingSuccessPage /></MainLayout>} />

      {/* Back-End Admin Layout Routes */}
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/doctors" element={<AdminLayout><DoctorManagementPage /></AdminLayout>} />
      <Route path="/admin/availability" element={<AdminLayout><AvailabilityManagementPage /></AdminLayout>} />
      <Route path="/admin/appointments" element={<AdminLayout><AppointmentListPage /></AdminLayout>} />
    </Routes>
  );
}

export default AppRouter;
