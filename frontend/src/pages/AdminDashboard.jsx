import React from 'react';
import { useApp } from '../context/AppContext';
import { FaUserMd, FaRegCalendarCheck, FaStethoscope, FaRegClock, FaCalendarDay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const { doctors, appointments, availabilities } = useApp();

  const totalDoctors = doctors.length;
  
  // Compute unique departments count
  const uniqueDepts = [...new Set(doctors.map((d) => d.department))].length;
  
  // Compute slots
  const totalSlots = availabilities.length * 7; // Assuming 7 slots per availability configuration

  // Today's appointments count
  const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const todayWeekday = weekdays[new Date().getDay()];
  const todaysAppointments = appointments.filter(
    (app) => app.day === todayWeekday && app.status !== 'CANCELLED'
  ).length;

  const statCards = [
    {
      title: 'Total Doctors',
      value: totalDoctors,
      icon: <FaUserMd className="text-sky-500 w-7 h-7" />,
      bg: 'bg-sky-50 bg-sky-950/20',
      link: '/admin/doctors'
    },
    {
      title: "Today's Appointments",
      value: todaysAppointments,
      icon: <FaRegCalendarCheck className="text-primary-500 w-7 h-7" />,
      bg: 'bg-primary-50 bg-primary-950/20',
      link: '/admin/appointments'
    },
    {
      title: 'Active Departments',
      value: uniqueDepts,
      icon: <FaStethoscope className="text-indigo-500 w-7 h-7" />,
      bg: 'bg-indigo-50 bg-indigo-950/20',
      link: '/'
    },
    {
      title: 'Available Slots Today',
      value: totalSlots,
      icon: <FaRegClock className="text-amber-500 w-7 h-7" />,
      bg: 'bg-amber-50 bg-amber-950/20',
      link: '/admin/availability'
    }
  ];

  // Helper format department
  const formatDept = (dept) => {
    if (!dept) return '';
    return dept
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 text-black">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 text-slate-400 mt-1">Here is a quick snapshot of the HealthCare+ operational status.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <Link
            key={idx}
            to={card.link}
            className="bg-white bg-slate-800 rounded-3xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 border border-slate-100 border-slate-700/60 flex items-center justify-between group cursor-pointer"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 text-slate-500 uppercase tracking-wider">{card.title}</span>
              <h2 className="text-3xl font-extrabold text-slate-850 text-black group-hover:text-sky-500 transition-colors">
                {card.value}
              </h2>
            </div>
            <div className={`p-4 rounded-2xl ${card.bg} group-hover:scale-105 transition-transform duration-200`}>
              {card.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Detailed section: split list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Bookings List */}
        <div className="lg:col-span-7 bg-white bg-slate-800 p-6 rounded-3xl shadow-premium border border-slate-100 border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 border-slate-700 pb-3">
            <h3 className="text-lg font-bold text-slate-850 text-black">Recent Confirmed Bookings</h3>
            <Link to="/admin/appointments" className="text-xs font-semibold text-sky-500 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {appointments.slice(-3).reverse().map((app) => {
              const doc = doctors.find((d) => d.id === app.doctorId) || { name: 'Doctor' };
              return (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 bg-slate-900 border border-slate-100 border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 bg-sky-950 text-sky-600 text-sky-400 flex items-center justify-center font-bold">
                      {app.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 text-black">{app.patientName}</h4>
                      <p className="text-xs text-slate-400">Consulting {doc.name}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-primary-50 text-primary-600 bg-primary-950/20 text-primary-400">
                      {app.status}
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {app.day.charAt(0) + app.day.slice(1).toLowerCase()} • {app.slotTime}
                    </p>
                  </div>
                </div>
              );
            })}

            {appointments.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">No appointments booked yet.</p>
            )}
          </div>
        </div>

        {/* Doctor Specialties overview */}
        <div className="lg:col-span-5 bg-white bg-slate-800 p-6 rounded-3xl shadow-premium border border-slate-100 border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 border-slate-700 pb-3">
            <h3 className="text-lg font-bold text-slate-850 text-black">Active Roster Summary</h3>
            <Link to="/admin/doctors" className="text-xs font-semibold text-sky-500 hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-4">
            {doctors.slice(0, 3).map((doc) => (
              <div key={doc.id} className="flex items-center gap-3">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 text-black truncate">{doc.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{formatDept(doc.department)}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-700 text-slate-350">{doc.experience}</span>
                  <p className="text-[10px] text-amber-500 font-bold">★ {doc.rating.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
