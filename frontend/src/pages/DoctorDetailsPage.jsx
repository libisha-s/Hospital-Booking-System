import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RatingStars from '../components/RatingStars';
import SlotCard from '../components/SlotCard';
import AppointmentModal from '../components/AppointmentModal';
import { HiOutlineArrowLeft, HiOutlineShieldCheck, HiOutlineClock } from 'react-icons/hi';
import { FaUserMd, FaRegCheckCircle } from 'react-icons/fa';

function DoctorDetailsPage() {
  const { id } = useParams();
  const { doctors, availabilities } = useApp();
  
  const [doctor, setDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlotTime, setSelectedSlotTime] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const foundDoc = doctors.find((d) => d.id === Number(id));
    if (foundDoc) {
      setDoctor(foundDoc);
    }
  }, [id, doctors]);

  if (!doctor) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 bg-rose-50 bg-rose-950/20 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <HiOutlineArrowLeft className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold">Doctor Not Found</h3>
        <p className="text-sm text-slate-500">The doctor you are looking for does not exist in our roster.</p>
        <Link to="/" className="inline-block bg-primary-500 text-black px-6 py-2 rounded-xl text-sm font-semibold">
          Back to Home
        </Link>
      </div>
    );
  }

  // Get availabilities for this doctor
  const doctorAvails = availabilities.filter((a) => a.doctorId === doctor.id);

  // Group slots by day
  // Since availability holds startTime and endTime, we will generate standard slots for them:
  // e.g. ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]
  const getSlotsForDay = (dayName) => {
    return ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
  };

  // Determine if available today
  const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const currentDayName = weekdays[new Date().getDay()];
  const isAvailableToday = doctorAvails.some((a) => a.day === currentDayName);

  const formatDept = (dept) => {
    if (!dept) return '';
    return dept
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const handleSelectSlot = (day, time) => {
    setSelectedDay(day);
    setSelectedSlotTime(time);
  };

  const handleBookClick = () => {
    if (!selectedDay || !selectedSlotTime) {
      alert("Please select an available day and time slot first.");
      return;
    }
    setModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Back button */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 text-slate-400 hover:text-primary-400 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
          Back to Doctor Directory
        </Link>
      </div>

      {/* Profile Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column - Large Image */}
        <div className="md:col-span-5 bg-white bg-slate-800 rounded-3xl overflow-hidden shadow-premium border border-slate-100 border-slate-700/60 p-4 shrink-0">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary-50 bg-slate-900">
            <img
              src={doctor.imageUrl || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
            {isAvailableToday && (
              <span className="absolute top-4 left-4 bg-primary-500 text-black text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Available Today
              </span>
            )}
          </div>
        </div>

        {/* Right Column - Doctor info & stats */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Header text */}
          <div className="space-y-3">
            <span className="bg-primary-50 bg-primary-950/40 text-primary-600 text-primary-400 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              {formatDept(doctor.department)} Specialist
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 text-black leading-tight">
              {doctor.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4">
              <RatingStars rating={doctor.rating} />
              <span className="text-slate-300 text-slate-700">•</span>
              <span className="text-sm font-semibold text-slate-500 text-slate-400">
                {doctor.experience} Experience
              </span>
              <span className="text-slate-300 text-slate-700">•</span>
              <span className="text-sm font-bold text-primary-500 text-primary-400">
                Fee: ${doctor.consultingFee} USD
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 border-slate-800 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 text-black">Professional Profile</h3>
            <p className="text-sm text-slate-600 text-slate-300 leading-relaxed">
              Dr. {doctor.name.split('. ').pop()} is a highly trained specialist in the department of {formatDept(doctor.department)}. 
              Possessing over {doctor.experience.split(' ')[0]} years of patient-centric service, they are dedicated to delivering robust healthcare options, custom treatments, and diagnostic treatments.
            </p>
          </div>

          {/* Info cards row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 bg-slate-900 p-4 rounded-2xl border border-slate-100 border-slate-850 flex items-center gap-3">
              <HiOutlineShieldCheck className="w-8 h-8 text-primary-500" />
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase">Verified Doctor</h5>
                <p className="text-xs font-semibold text-slate-600 text-slate-300 mt-0.5">Board Certified Specialist</p>
              </div>
            </div>
            <div className="bg-slate-50 bg-slate-900 p-4 rounded-2xl border border-slate-100 border-slate-850 flex items-center gap-3">
              <HiOutlineClock className="w-8 h-8 text-primary-500" />
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase">Avg Response</h5>
                <p className="text-xs font-semibold text-slate-600 text-slate-300 mt-0.5">Under 15 minutes</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Appointment Slots Area */}
      <div className="border-t border-slate-200 border-slate-800 pt-10 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 text-black">Choose a Booking Slot</h2>
          <p className="text-sm text-slate-500 mt-1">Select an available day and time slot to book your consulting appointment.</p>
        </div>

        {doctorAvails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctorAvails.map((avail) => (
              <SlotCard
                key={avail.id}
                day={avail.day}
                slots={getSlotsForDay(avail.day)}
                selectedDay={selectedDay}
                selectedSlotTime={selectedSlotTime}
                onSelect={handleSelectSlot}
              />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 bg-amber-950/20 text-amber-800 text-amber-300 p-5 rounded-2xl border border-amber-100 border-amber-900/40 text-sm font-semibold">
            No regular weekly availability has been configured for Dr. {doctor.name} yet. Please check back later.
          </div>
        )}

        {/* Selected Slot Recap */}
        {selectedDay && selectedSlotTime && (
          <div className="bg-primary-50 bg-primary-950/40 border border-primary-100 border-primary-900/40 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaRegCheckCircle className="text-primary-500 text-xl" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Selected Appointment Schedule</p>
                <p className="text-sm font-bold text-slate-700 text-primary-300 mt-0.5">
                  {selectedDay.charAt(0) + selectedDay.slice(1).toLowerCase()} at {selectedSlotTime}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleBookClick}
              className="bg-primary-500 hover:bg-primary-600 text-black font-bold px-6 py-2.5 rounded-xl shadow-md text-sm transition-all"
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        doctor={doctor}
        initialDay={selectedDay}
        initialSlot={selectedSlotTime}
      />

    </div>
  );
}

export default DoctorDetailsPage;
