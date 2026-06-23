import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

function DoctorCard({ doctor }) {
  const { id, name, department, experience, rating, consultingFee, imageUrl } = doctor;

  // Format department name (e.g. GENERAL_MEDICINE -> General Medicine)
  const formatDept = (dept) => {
    if (!dept) return '';
    return dept
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="bg-white bg-slate-800 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full border border-slate-100 border-slate-700/60 group">
      {/* Image container */}
      <div className="relative h-56 overflow-hidden bg-primary-50 bg-slate-900 shrink-0">
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 bg-slate-800/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-primary-600 text-primary-400 shadow-sm">
          {formatDept(department)}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 text-black mb-1.5 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 text-slate-400 mb-3">
            <span>{experience} Experience</span>
            <span>•</span>
            <span className="text-primary-500 text-primary-400">${consultingFee} Fee</span>
          </div>

          <div className="mb-4">
            <RatingStars rating={rating} />
          </div>
        </div>

        <Link
          to={`/doctor/${id}`}
          className="w-full text-center block bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all duration-200 text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;