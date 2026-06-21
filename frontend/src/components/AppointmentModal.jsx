import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import { useApp } from '../context/AppContext';

function AppointmentModal({ isOpen, onClose, doctor, initialDay = '', initialSlot = '' }) {
  const navigate = useNavigate();
  const { bookAppointment, availabilities } = useApp();
  
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('MALE');
  const [day, setDay] = useState(initialDay);
  const [slotTime, setSlotTime] = useState(initialSlot);
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Sync initial inputs when doctor/days changes
  useEffect(() => {
    if (isOpen) {
      setDay(initialDay);
      setSlotTime(initialSlot);
      setPatientName('');
      setAge('');
      setDob('');
      setGender('MALE');
      setErrors({});
    }
  }, [isOpen, initialDay, initialSlot]);

  if (!isOpen || !doctor) return null;

  // Format department
  const formatDept = (dept) => {
    if (!dept) return '';
    return dept
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  // Get available days for this doctor
  const doctorDays = availabilities
    .filter((a) => a.doctorId === doctor.id)
    .map((a) => a.day);

  // Unique days list
  const uniqueDays = [...new Set(doctorDays)];

  // Get available slots for selected day (e.g. MONDAY -> convert to time slots list)
  const getSlotsForDay = (selectedDay) => {
    const avail = availabilities.find(
      (a) => a.doctorId === doctor.id && a.day === selectedDay
    );
    if (!avail) return [];
    
    // Split the interval start/end into some mock time slots
    // Since availability has startTime & endTime, let's generate 1-hour interval slots
    // or just return the standard times: e.g. 09:00 AM, 10:00 AM, 11:00 AM
    return ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
  };

  const daySlots = day ? getSlotsForDay(day) : [];

  const handleDayChange = (e) => {
    const d = e.target.value;
    setDay(d);
    setSlotTime('');
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!patientName.trim()) {
      newErrors.patientName = 'Patient name is required.';
    }

    if (!age || Number(age) <= 0) {
      newErrors.age = 'Age must be a positive number greater than 0.';
    }

    if (!day) {
      newErrors.day = 'Please select a day.';
    }

    if (!slotTime) {
      newErrors.slotTime = 'Please select a time slot.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validation passed
    setIsSaving(true);
    
    // Simulate loading/saving spinner as requested
    setTimeout(() => {
      const appointmentObj = {
        patientName,
        age: Number(age),
        dob,
        gender,
        doctorId: doctor.id,
        day,
        slotTime
      };
      
      const savedApp = bookAppointment(appointmentObj);
      setIsSaving(false);
      onClose();
      
      // Navigate to success page with booking info
      navigate('/success', {
        state: {
          doctorName: doctor.name,
          department: formatDept(doctor.department),
          day: day,
          slotTime: slotTime,
          patientName: patientName
        }
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg shadow-2xl relative border border-slate-150 dark:border-slate-700 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700 bg-emerald-50 dark:bg-slate-900/50">
          <div>
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Book Appointment</h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Fill in the details to schedule your slot</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirm} className="p-6 space-y-4">
          
          {/* Readonly Info */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Doctor</label>
              <input
                type="text"
                readOnly
                value={doctor.name}
                className="w-full bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 border-none outline-none p-0 cursor-default"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Department</label>
              <input
                type="text"
                readOnly
                value={formatDept(doctor.department)}
                className="w-full bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 border-none outline-none p-0 cursor-default"
              />
            </div>
          </div>

          {/* Patient Name */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Patient Name *</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Full Name"
              disabled={isSaving}
              className={`w-full bg-slate-55 dark:bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all ${
                errors.patientName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.patientName && (
              <p className="text-xs text-rose-500 font-medium mt-1">{errors.patientName}</p>
            )}
          </div>

          {/* Age & DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Age *</label>
              <input
                type="number"
                min="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                disabled={isSaving}
                className={`w-full bg-slate-55 dark:bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all ${
                  errors.age ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.age && (
                <p className="text-xs text-rose-500 font-medium mt-1">{errors.age}</p>
              )}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={isSaving}
                className="w-full bg-slate-55 dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={isSaving}
              className="w-full bg-slate-55 dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="PREFER_NOT_TO_DISCLOSE">Prefer not to disclose</option>
            </select>
          </div>

          {/* Day & Time Slot dropdowns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Day *</label>
              <select
                value={day}
                onChange={handleDayChange}
                disabled={isSaving}
                className={`w-full bg-slate-55 dark:bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all ${
                  errors.day ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <option value="">-- Choose Day --</option>
                {uniqueDays.map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0) + d.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors.day && (
                <p className="text-xs text-rose-500 font-medium mt-1">{errors.day}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Available Slot *</label>
              <select
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                disabled={isSaving || !day}
                className={`w-full bg-slate-55 dark:bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white transition-all ${
                  errors.slotTime ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <option value="">-- Choose Slot --</option>
                {daySlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.slotTime && (
                <p className="text-xs text-rose-500 font-medium mt-1">{errors.slotTime}</p>
              )}
            </div>
          </div>

          {/* Footer Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200 text-sm flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                'Confirm Appointment'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;
