import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import DepartmentFilter from '../components/DepartmentFilter';
import DoctorCard from '../components/DoctorCard';
import { FaUserMd, FaRegCalendarCheck, FaAward, FaBuilding } from 'react-icons/fa';

function HomePage() {
  const { doctors, loading } = useApp();
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
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 p-8 md:p-16 shadow-sm border border-emerald-100/60 dark:border-emerald-900/30">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200/25 dark:bg-teal-500/5 rounded-full blur-3xl -ml-24 -mb-24"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-green-200/20 dark:bg-green-500/5 rounded-full blur-2xl"></div>

        <div className="max-w-3xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border-l-4 border-emerald-500">
            Smart Scheduling Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-800 dark:text-white">
            Find and Book the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Best Doctors</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-xl">
            Book appointments with experienced specialists instantly. Choose from virtual consultations or in-person clinic visits.
          </p>

          <div className="pt-4">
            <a 
              href="#doctors-section" 
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Hospital Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <FaUserMd className="text-emerald-500 w-6 h-6" />, count: '200+', label: 'Specialist Doctors' },
          { icon: <FaRegCalendarCheck className="text-teal-500 w-6 h-6" />, count: '50k+', label: 'Happy Patients' },
          { icon: <FaAward className="text-amber-500 w-6 h-6" />, count: '15+', label: 'Years of Service' },
          { icon: <FaBuilding className="text-green-600 w-6 h-6" />, count: '12+', label: 'Clinics & Departments' }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex items-center gap-4 group">
            <div className="p-3 bg-emerald-50 dark:bg-slate-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
              {metric.icon}
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">{metric.count}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{metric.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Search & Filters Section */}
      <section id="doctors-section" className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">Our Medical Specialists</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
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
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl h-80 border border-slate-100 dark:border-slate-700 p-4 space-y-4">
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
          <div className="bg-white dark:bg-slate-800 text-center py-16 px-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <FaUserMd className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Doctors Found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We couldn't find any specialist matching your search. Try adjusting your search term or department.
              </p>
            </div>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDept('ALL'); }}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold px-5 py-2.5 rounded-xl text-xs"
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
