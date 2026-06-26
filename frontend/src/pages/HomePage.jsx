import React ,{ useEffect, useState } from "react";
import axios from "axios";
import SearchBar from '../components/SearchBar';
import DepartmentFilter from '../components/DepartmentFilter';
import DoctorCard from '../components/DoctorCard';
import { FaUserMd, FaRegCalendarCheck, FaAward, FaBuilding } from 'react-icons/fa';

function HomePage() {
  const [doctors, setDoctors] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    axios
        .get("http://localhost:8080/api/doctors/all")
        .then((response) => {
            setDoctors(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
}, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Filter doctors based on search term & department
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || doc.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section - Mint green theme matching reference */}
     <section className="relative rounded-3xl overflow-hidden bg-[#F7F9F5] p-8 md:p-16 shadow-lg border border-[#D4DDCB]">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 bg-primary-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-200/25 bg-primary-500/5 rounded-full blur-3xl -ml-24 -mb-24"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-green-200/20 bg-green-500/5 rounded-full blur-2xl"></div>

        <div className="max-w-3xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 bg-primary-100/80 bg-primary-900/40 text-primary-700 text-primary-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border-l-4 border-primary-500">
            Smart Scheduling Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-800 text-black">
            Find and Book the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500 from-primary-400 to-primary-300">Best Doctors</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 text-slate-300 font-medium max-w-xl">
            Book appointments with experienced specialists instantly. Choose from virtual consultations or in-person clinic visits.
          </p>

          <div className="pt-4">
            <a 
              href="#doctors-section" 
              className="inline-block bg-primary-500 hover:bg-primary-600 text-black font-bold px-8 py-3.5 rounded-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Hospital Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <FaUserMd className="text-primary-500 w-6 h-6" />, count: '200+', label: 'Specialist Doctors' },
          { icon: <FaRegCalendarCheck className="text-primary-500 w-6 h-6" />, count: '50k+', label: 'Happy Patients' },
          { icon: <FaAward className="text-amber-500 w-6 h-6" />, count: '15+', label: 'Years of Service' },
          { icon: <FaBuilding className="text-green-600 w-6 h-6" />, count: '12+', label: 'Clinics & Departments' }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white bg-slate-800 p-6 rounded-2xl border border-slate-100 border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex items-center gap-4 group">
            <div className="p-3 bg-primary-50 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
              {metric.icon}
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-slate-800 text-black">{metric.count}</h4>
              <p className="text-xs text-slate-500 text-slate-400 font-medium mt-0.5">{metric.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Search & Filters Section */}
      <section id="doctors-section" className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 text-black">Our Medical Specialists</h2>
          <p className="text-sm text-slate-500 text-slate-400 max-w-md mx-auto">
            Search doctors by name or refine by medical department category below.
          </p>
        </div>

        <div className="space-y-6">
          <SearchBar onSearch={setSearchTerm} />
          <DepartmentFilter selectedDept={selectedDept} onSelectDept={setSelectedDept} />
        </div>
      </section>

      {/* Doctor Listings Grid */}
      <section className="space-y-6">
        {loading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white bg-slate-800 rounded-2xl h-80 border border-slate-100 border-slate-700 p-4 space-y-4">
                <div className="h-44 rounded-xl animate-shimmer"></div>
                <div className="h-4 w-3/4 rounded animate-shimmer"></div>
                <div className="h-4 w-1/2 rounded animate-shimmer"></div>
              </div>
            ))}
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white bg-slate-800 text-center py-16 px-6 rounded-3xl border border-dashed border-slate-200 border-slate-700 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-primary-50 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-primary-500">
              <FaUserMd className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 text-black">No Doctors Found</h3>
              <p className="text-sm text-slate-500 text-slate-400 mt-1">
                We couldn't find any specialist matching your search. Try adjusting your search term or department.
              </p>
            </div>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDept('ALL'); }}
              className="bg-primary-50 hover:bg-primary-100 text-primary-600 bg-primary-950/40 text-primary-400 font-bold px-5 py-2.5 rounded-xl text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

    </div>
  );
}

export default HomePage;
