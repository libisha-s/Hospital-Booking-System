import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaList } from 'react-icons/fa';


function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking details passed from navigation state
  const booking = location.state || {
    doctorName: "Dr. Sarah Jenkins",
    department: "Cardiology",
    day: "MONDAY",
    slotTime: "10:00 AM",
    patientName: "John Doe"
  };

  const formatDay = (d) => {
    if (!d) return '';
    return d.charAt(0).toUpperCase() + d.slice(1).toLowerCase();
  };

  return (
    <div className="max-w-xl mx-auto py-12 text-center">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-premium border border-slate-100 dark:border-slate-700/60 space-y-6">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
            <FaCheckCircle className="w-14 h-14" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Appointment Booked!</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your appointment has been confirmed and scheduled with the specialist.
          </p>
        </div>

        {/* Details card */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-6 rounded-2xl text-left space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700 pb-2">
            Appointment Summary
          </h3>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Patient</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{booking.patientName}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Doctor</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{booking.doctorName}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Department</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{booking.department}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Schedule</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {formatDay(booking.day)} at {booking.slotTime}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <Link
            to="/admin/appointments"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-md text-sm transition-all flex items-center justify-center gap-2"
          >
            <FaList className="text-lg" />
            View Appointments
          </Link>
          <Link
            to="/"
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-250 text-slate-750 dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            <FaHome className="text-lg" />
            Back To Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default BookingSuccessPage;
