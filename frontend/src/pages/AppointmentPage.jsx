import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FaUserMd, FaRegClock, FaRegCalendarAlt, FaStethoscope } from 'react-icons/fa';

function AppointmentPage() {
  const navigate = useNavigate();
  const { doctors, availabilities, bookAppointment } = useApp();

  const [selectedDocId, setSelectedDocId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('MALE');
  const [day, setDay] = useState('');
  const [slotTime, setSlotTime] = useState('');

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const selectedDoctor = doctors.find((d) => d.id === Number(selectedDocId));

  // Reset day & slot when doctor changes
  useEffect(() => {
    setDay('');
    setSlotTime('');
  }, [selectedDocId]);

  // Format department
  const formatDept = (dept) => {
    if (!dept) return '';
    return dept
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  // Get available days for selected doctor
  const doctorDays = selectedDoctor
    ? availabilities.filter((a) => a.doctorId === selectedDoctor.id).map((a) => a.day)
    : [];
  const uniqueDays = [...new Set(doctorDays)];

  const getSlotsForDay = (selectedDay) => {
    if (!selectedDoctor) return [];
    return ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
  };

  const daySlots = day ? getSlotsForDay(day) : [];

  const handleConfirm = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!selectedDocId) {
      newErrors.doctorId = 'Please select a doctor.';
    }

    if (!patientName.trim()) {
      newErrors.patientName = 'Patient name is required.';
    }

    if (!age || Number(age) <= 0) {
      newErrors.age = 'Age must be a positive number greater than 0.';
    }

    if (!day) {
      newErrors.day = 'Please select an appointment day.';
    }

    if (!slotTime) {
      newErrors.slotTime = 'Please select a time slot.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    // Simulate save spinner
    setTimeout(() => {
      const appObj = {
        patientName,
        age: Number(age),
        dob,
        gender,
        doctorId: Number(selectedDocId),
        day,
        slotTime
      };

      bookAppointment(appObj);
      setIsSaving(false);

      navigate('/success', {
        state: {
          doctorName: selectedDoctor.name,
          department: formatDept(selectedDoctor.department),
          day: day,
          slotTime: slotTime,
          patientName: patientName
        }
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white bg-slate-800 rounded-3xl p-8 shadow-premium border border-slate-100 border-slate-700/60 space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2 border-b border-slate-100 border-slate-700 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-800 text-black">Schedule Medical Appointment</h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Book an instant consulting slot with any of our board certified specialists.
          </p>
        </div>

        <form onSubmit={handleConfirm} className="space-y-5">
          
          {/* Select Doctor */}
          <div>
            <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1.5 flex items-center gap-1">
              <FaUserMd className="text-primary-500" /> Choose Doctor *
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              disabled={isSaving}
              className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-black transition-all ${
                errors.doctorId ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 border-slate-700'
              }`}
            >
              <option value="">-- Select Specialist --</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({formatDept(d.department)}) - ${d.consultingFee} Fee
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="text-xs text-rose-500 font-medium mt-1">{errors.doctorId}</p>
            )}
          </div>

          {/* Prefilled Department & Fee details */}
          {selectedDoctor && (
            <div className="grid grid-cols-2 gap-4 bg-primary-50/50 bg-primary-950/20 p-4 rounded-2xl border border-primary-100/50 border-primary-900/40">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Department</span>
                <span className="text-sm font-extrabold text-primary-600 text-primary-400">{formatDept(selectedDoctor.department)}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Consulting Fee</span>
                <span className="text-sm font-extrabold text-primary-500">${selectedDoctor.consultingFee} USD</span>
              </div>
            </div>
          )}

          {/* Patient Details */}
          <div>
            <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1.5">Patient Full Name *</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g. Johnathan Doe"
              disabled={isSaving}
              className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-black transition-all ${
                errors.patientName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 border-slate-700'
              }`}
            />
            {errors.patientName && (
              <p className="text-xs text-rose-500 font-medium mt-1">{errors.patientName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1.5">Age *</label>
              <input
                type="number"
                min="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 25"
                disabled={isSaving}
                className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-black transition-all ${
                  errors.age ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 border-slate-700'
                }`}
              />
              {errors.age && (
                <p className="text-xs text-rose-500 font-medium mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={isSaving}
                className="w-full bg-slate-55 bg-slate-900 text-sm border border-slate-200 border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-black transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1.5">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={isSaving}
                className="w-full bg-slate-55 bg-slate-900 text-sm border border-slate-200 border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-black transition-all"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_DISCLOSE">Prefer not to disclose</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1.5">Select Day *</label>
              <select
                value={day}
                onChange={(e) => { setDay(e.target.value); setSlotTime(''); }}
                disabled={isSaving || !selectedDocId}
                className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-black transition-all ${
                  errors.day ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 border-slate-700'
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
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1.5">Select Time Slot *</label>
            <select
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              disabled={isSaving || !day}
              className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-black transition-all ${
                errors.slotTime ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 border-slate-700'
              }`}
            >
              <option value="">-- Choose Time Slot --</option>
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

          {/* Confirm Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-black font-bold py-3.5 px-4 rounded-xl shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving Appointment details...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AppointmentPage;
