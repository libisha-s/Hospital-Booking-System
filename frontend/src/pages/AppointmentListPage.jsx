import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaSearch, FaFilter, FaTimesCircle, FaCheckCircle, FaUndo } from 'react-icons/fa';

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function AppointmentListPage() {
  const { appointments, doctors, cancelAppointment, updateAppointmentStatus } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDocId, setFilterDocId] = useState('');
  const [filterDay, setFilterDay] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getDoctorName = (id) => {
    const doc = doctors.find((d) => d.id === id);
    return doc ? doc.name : 'Unknown Doctor';
  };

  const getDoctorDept = (id) => {
    const doc = doctors.find((d) => d.id === id);
    return doc ? doc.department : '';
  };

  const formatDept = (dept) => {
    if (!dept) return '';
    return dept
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const formatDay = (d) => {
    if (!d) return '';
    return d.charAt(0).toUpperCase() + d.slice(1).toLowerCase();
  };

  // Filter logic
  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch = app.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoc = !filterDocId || app.doctorId === Number(filterDocId);
    const matchesDay = !filterDay || app.day === filterDay;
    return matchesSearch && matchesDoc && matchesDay;
  });

  // Paginated listings
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-primary-50 text-primary-600 bg-primary-950/20 text-primary-400">
            Confirmed
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-600 bg-rose-950/20 text-rose-450">
            Cancelled
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-600 bg-indigo-950/20 text-indigo-400">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 text-black">Scheduled Appointments</h1>
        <p className="text-sm text-slate-500 mt-1">Review scheduled consultations, cancel items, or mark bookings as completed.</p>
      </div>

      {/* Filters card */}
      <div className="bg-white bg-slate-800 rounded-3xl p-6 shadow-premium border border-slate-100 border-slate-700/60 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Search patient */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 text-slate-400">Search Patient</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FaSearch className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Patient name..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 bg-slate-900 text-slate-850 text-slate-100 border border-slate-200 border-slate-700 pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Filter by Doctor */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 text-slate-400">Filter by Doctor</label>
          <select
            value={filterDocId}
            onChange={(e) => { setFilterDocId(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-50 bg-slate-900 text-slate-800 text-slate-100 border border-slate-200 border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">All Doctors</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Day */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 text-slate-400">Filter by Day</label>
          <select
            value={filterDay}
            onChange={(e) => { setFilterDay(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-50 bg-slate-900 text-slate-850 text-slate-100 border border-slate-200 border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">All Weekdays</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {formatDay(d)}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Appointment table */}
      <div className="bg-white bg-slate-800 rounded-3xl overflow-hidden shadow-premium border border-slate-100 border-slate-700/60 p-4">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 border-slate-700 text-slate-450 text-slate-400 font-bold uppercase text-[10px] tracking-wider bg-slate-50/50 bg-slate-900/50">
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Gender & Age</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Schedule</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 divide-slate-700/60">
              {currentAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/30 hover:bg-slate-750/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800 text-slate-200">{app.patientName}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-slate-400 font-medium">
                    {app.gender.charAt(0) + app.gender.slice(1).toLowerCase()} • {app.age} yrs
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-slate-700 text-slate-350">{getDoctorName(app.doctorId)}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{formatDept(getDoctorDept(app.doctorId))}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-semibold text-sky-600 text-sky-400">{formatDay(app.day)}</p>
                      <p className="text-[10px] text-slate-450 text-slate-500 font-medium">{app.slotTime}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(app.status)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {app.status === 'CONFIRMED' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(app.id, 'COMPLETED')}
                            className="p-2 rounded-lg text-primary-500 hover:bg-primary-50 hover:bg-primary-950/30 transition-colors"
                            title="Complete Appointment"
                          >
                            <FaCheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => cancelAppointment(app.id)}
                            className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 hover:bg-rose-950/30 transition-colors"
                            title="Cancel Appointment"
                          >
                            <FaTimesCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      {app.status !== 'CONFIRMED' && (
                        <button
                          onClick={() => updateAppointmentStatus(app.id, 'CONFIRMED')}
                          className="p-2 rounded-lg text-sky-500 hover:bg-sky-50 hover:bg-sky-950/30 transition-colors"
                          title="Restore Appointment"
                        >
                          <FaUndo className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400">
                    No appointments matches selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 border-slate-700/60 pt-4 mt-2">
            <span className="text-xs text-slate-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length} appointments
            </span>
            
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 border-slate-700 text-xs font-semibold text-slate-600 text-slate-300 disabled:opacity-50 hover:bg-slate-50 hover:bg-slate-800 transition-colors"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? 'bg-sky-500 text-black'
                      : 'border border-slate-250 text-slate-650 hover:bg-slate-50 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-250 border-slate-700 text-xs font-semibold text-slate-650 text-slate-350 disabled:opacity-50 hover:bg-slate-50 hover:bg-slate-800 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default AppointmentListPage;
