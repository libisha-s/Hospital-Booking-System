import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
];

function AvailabilityManagementPage() {
  const { doctors, availabilities, addAvailability, updateAvailability, deleteAvailability } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null means adding

  const [formDoctorId, setFormDoctorId] = useState('');
  const [formDay, setFormDay] = useState('MONDAY');
  const [formStartTime, setFormStartTime] = useState('09:00 AM');
  const [formEndTime, setFormEndTime] = useState('05:00 PM');

  const [errors, setErrors] = useState({});

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormDoctorId(doctors[0]?.id || '');
    setFormDay('MONDAY');
    setFormStartTime('09:00 AM');
    setFormEndTime('12:00 PM');
    setErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (avail) => {
    setEditingId(avail.id);
    setFormDoctorId(String(avail.doctorId));
    setFormDay(avail.day);
    setFormStartTime(avail.startTime);
    setFormEndTime(avail.endTime);
    setErrors({});
    setModalOpen(true);
  };

  const handleDelete = (id, doctorName, day) => {
    if (window.confirm(`Delete availability for ${doctorName} on ${day.toLowerCase()}?`)) {
      deleteAvailability(id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formDoctorId) {
      newErrors.doctorId = 'Doctor is required.';
    }
    if (!formStartTime.trim()) {
      newErrors.startTime = 'Start time is required.';
    }
    if (!formEndTime.trim()) {
      newErrors.endTime = 'End time is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const availabilityData = {
      doctorId: Number(formDoctorId),
      day: formDay,
      startTime: formStartTime,
      endTime: formEndTime
    };

    if (editingId) {
      updateAvailability(editingId, availabilityData);
    } else {
      addAvailability(availabilityData);
    }

    setModalOpen(false);
  };

  const getDoctorName = (id) => {
    const doc = doctors.find((d) => d.id === id);
    return doc ? doc.name : 'Unknown Doctor';
  };

  const formatDay = (d) => {
    if (!d) return '';
    return d.charAt(0).toUpperCase() + d.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-6">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Doctor Availability Slots</h1>
          <p className="text-sm text-slate-500 mt-1">Configure weekly workdays and scheduling intervals for consultants.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-3 rounded-xl shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-200 text-sm flex items-center gap-2 self-stretch sm:self-auto justify-center"
        >
          <FaPlus />
          Add Availability
        </button>
      </div>

      {/* Grid List */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-premium border border-slate-100 dark:border-slate-700/60 p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-450 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider bg-slate-50/50 dark:bg-slate-900/50">
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Day</th>
                <th className="py-3 px-4">Shift Hours</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {availabilities.map((avail) => (
                <tr key={avail.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-750/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                    {getDoctorName(avail.doctorId)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-sky-600 dark:text-sky-450">
                    {formatDay(avail.day)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400">
                    {avail.startTime} - {avail.endTime}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(avail)}
                        className="p-2 rounded-lg text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                        title="Edit Availability"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(avail.id, getDoctorName(avail.doctorId), avail.day)}
                        className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Delete Availability"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {availabilities.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-400">
                    No doctor schedules configured.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl relative border border-slate-150 dark:border-slate-700/60 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700 bg-sky-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-extrabold text-slate-850 dark:text-white">
                {editingId ? 'Edit Schedule Slot' : 'Add Weekly Schedule'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Select Doctor *</label>
                <select
                  value={formDoctorId}
                  onChange={(e) => setFormDoctorId(e.target.value)}
                  className={`w-full bg-slate-55 dark:bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white ${
                    errors.doctorId ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <option value="">-- Choose Doctor --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {errors.doctorId && <p className="text-xs text-rose-500 font-medium mt-1">{errors.doctorId}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Weekday *</label>
                <select
                  value={formDay}
                  onChange={(e) => setFormDay(e.target.value)}
                  className="w-full bg-slate-55 dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white"
                >
                  {DAYS.map((day) => (
                    <option key={day} value={day}>
                      {day.charAt(0) + day.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Start Time *</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:00 AM"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className={`w-full bg-slate-55 dark:bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white ${
                      errors.startTime ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.startTime && <p className="text-xs text-rose-500 font-medium mt-1">{errors.startTime}</p>}
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">End Time *</label>
                  <input
                    type="text"
                    placeholder="e.g. 12:00 PM"
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className={`w-full bg-slate-55 dark:bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white ${
                      errors.endTime ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.endTime && <p className="text-xs text-rose-500 font-medium mt-1">{errors.endTime}</p>}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-xl shadow-md text-sm transition-all"
                >
                  Save Availability
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AvailabilityManagementPage;
