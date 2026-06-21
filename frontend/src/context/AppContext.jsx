import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const DEFAULT_DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    department: "CARDIOLOGY",
    experience: "12 Years",
    rating: 4.9,
    consultingFee: 150,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Dr. Matthew Cole",
    department: "NEUROLOGY",
    experience: "15 Years",
    rating: 4.8,
    consultingFee: 200,
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Dr. Elena Rostova",
    department: "ORTHOPEDICS",
    experience: "10 Years",
    rating: 4.7,
    consultingFee: 130,
    imageUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Dr. Marcus Vance",
    department: "DERMATOLOGY",
    experience: "8 Years",
    rating: 4.6,
    consultingFee: 120,
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    name: "Dr. Chloe Patel",
    department: "PEDIATRICS",
    experience: "9 Years",
    rating: 4.9,
    consultingFee: 110,
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    name: "Dr. Alan Grant",
    department: "GENERAL_MEDICINE",
    experience: "18 Years",
    rating: 4.9,
    consultingFee: 100,
    imageUrl: "https://images.unsplash.com/photo-1582750433449-64c3e20cf741?auto=format&fit=crop&q=80&w=400"
  }
];

const DEFAULT_AVAILABILITIES = [
  { id: 1, doctorId: 1, day: "MONDAY", startTime: "09:00 AM", endTime: "12:00 PM" },
  { id: 2, doctorId: 1, day: "WEDNESDAY", startTime: "09:00 AM", endTime: "12:00 PM" },
  { id: 3, doctorId: 1, day: "FRIDAY", startTime: "02:00 PM", endTime: "05:00 PM" },
  
  { id: 4, doctorId: 2, day: "TUESDAY", startTime: "10:00 AM", endTime: "01:00 PM" },
  { id: 5, doctorId: 2, day: "THURSDAY", startTime: "02:00 PM", endTime: "05:00 PM" },
  
  { id: 6, doctorId: 3, day: "MONDAY", startTime: "01:00 PM", endTime: "04:00 PM" },
  { id: 7, doctorId: 3, day: "THURSDAY", startTime: "09:00 AM", endTime: "12:00 PM" },
  
  { id: 8, doctorId: 4, day: "WEDNESDAY", startTime: "10:00 AM", endTime: "02:00 PM" },
  { id: 9, doctorId: 4, day: "FRIDAY", startTime: "10:00 AM", endTime: "02:00 PM" },
  
  { id: 10, doctorId: 5, day: "TUESDAY", startTime: "09:00 AM", endTime: "01:00 PM" },
  { id: 11, doctorId: 5, day: "FRIDAY", startTime: "09:00 AM", endTime: "01:00 PM" },

  { id: 12, doctorId: 6, day: "MONDAY", startTime: "09:00 AM", endTime: "12:00 PM" },
  { id: 13, doctorId: 6, day: "WEDNESDAY", startTime: "01:00 PM", endTime: "04:00 PM" }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: 1,
    patientName: "John Doe",
    age: 32,
    dob: "1994-05-12",
    gender: "MALE",
    doctorId: 1,
    day: "MONDAY",
    slotTime: "09:00 AM",
    status: "CONFIRMED"
  },
  {
    id: 2,
    patientName: "Emily Smith",
    age: 28,
    dob: "1998-09-24",
    gender: "FEMALE",
    doctorId: 3,
    day: "THURSDAY",
    slotTime: "10:00 AM",
    status: "CONFIRMED"
  }
];

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(() => {
    const local = localStorage.getItem('healthcare_doctors');
    return local ? JSON.parse(local) : DEFAULT_DOCTORS;
  });

  const [availabilities, setAvailabilities] = useState(() => {
    const local = localStorage.getItem('healthcare_availabilities');
    return local ? JSON.parse(local) : DEFAULT_AVAILABILITIES;
  });

  const [appointments, setAppointments] = useState(() => {
    const local = localStorage.getItem('healthcare_appointments');
    return local ? JSON.parse(local) : DEFAULT_APPOINTMENTS;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Theme & Filters
  const [darkMode, setDarkMode] = useState(() => {
    const local = localStorage.getItem('healthcare_dark_mode');
    return local === 'true';
  });

  // User role state (admin or user)
  const [userRole, setUserRole] = useState(() => {
    const local = localStorage.getItem('healthcare_user_role');
    return local || 'user';
  });

  useEffect(() => {
    localStorage.setItem('healthcare_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('healthcare_availabilities', JSON.stringify(availabilities));
  }, [availabilities]);

  useEffect(() => {
    localStorage.setItem('healthcare_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('healthcare_dark_mode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Syncing with backend API
  const syncWithBackend = async () => {
    try {
      setLoading(true);
      // Attempt to load doctors from Spring Boot API (GET /api/doctors)
      const res = await axios.get('http://localhost:8080/api/doctors');
      if (res.data && res.data.length > 0) {
        // Map the backend structure to our state structure, keeping local fields like image if backend lacks them
        const synced = res.data.map(d => {
          const matchedLocal = doctors.find(ld => ld.id === d.id || ld.name === d.name);
          return {
            id: d.id,
            name: d.name,
            department: d.department,
            experience: d.experience,
            rating: d.rating,
            consultingFee: d.consultingFee || (matchedLocal ? matchedLocal.consultingFee : 120),
            imageUrl: matchedLocal ? matchedLocal.imageUrl : "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
          };
        });
        setDoctors(synced);
      }
      setError(null);
    } catch (err) {
      console.warn("Backend API offline or unreachable, using local storage state.", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncWithBackend();
  }, []);

  // Doctors CRUD
  const addDoctor = (doc) => {
    const newDoc = {
      ...doc,
      id: Date.now(),
      rating: parseFloat(doc.rating) || 4.5,
      consultingFee: parseFloat(doc.consultingFee) || 100,
      imageUrl: doc.imageUrl || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
    };
    setDoctors(prev => [...prev, newDoc]);
    return newDoc;
  };

  const updateDoctor = (id, updatedDoc) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...updatedDoc } : d));
  };

  const deleteDoctor = (id) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
    // clean up associated availabilities & appointments
    setAvailabilities(prev => prev.filter(a => a.doctorId !== id));
    setAppointments(prev => prev.filter(app => app.doctorId !== id));
  };

  // Availability CRUD
  const addAvailability = (avail) => {
    const newAvail = {
      ...avail,
      id: Date.now(),
      doctorId: Number(avail.doctorId)
    };
    setAvailabilities(prev => [...prev, newAvail]);
    return newAvail;
  };

  const updateAvailability = (id, updatedAvail) => {
    setAvailabilities(prev => prev.map(a => a.id === id ? { ...a, ...updatedAvail, doctorId: Number(updatedAvail.doctorId || a.doctorId) } : a));
  };

  const deleteAvailability = (id) => {
    setAvailabilities(prev => prev.filter(a => a.id !== id));
  };

  // Appointment CRUD
  const bookAppointment = (app) => {
    const newApp = {
      ...app,
      id: Date.now(),
      age: Number(app.age),
      doctorId: Number(app.doctorId),
      status: "CONFIRMED"
    };
    setAppointments(prev => [...prev, newApp]);
    return newApp;
  };

  const cancelAppointment = (id) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: "CANCELLED" } : app));
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <AppContext.Provider value={{
      doctors,
      availabilities,
      appointments,
      loading,
      error,
      darkMode,
      setDarkMode,
      userRole,
      setUserRole,
      syncWithBackend,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      addAvailability,
      updateAvailability,
      deleteAvailability,
      bookAppointment,
      cancelAppointment,
      updateAppointmentStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
