import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';

const DEPARTMENTS = [
  "CARDIOLOGY",
  "NEUROLOGY",
  "ORTHOPEDICS",
  "DERMATOLOGY",
  "PEDIATRICS",
  "GENERAL_MEDICINE",
  "ENT",
  "GYNECOLOGY"
];

function DoctorManagementPage() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  
  // Popup form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null means adding
  const [formName, setFormName] = useState('');
  const [formDept, setFormDept] = useState('CARDIOLOGY');
  const [formExp, setFormExp] = useState('');
  const [formRating, setFormRating] = useState('');
  const [formFee, setFormFee] = useState('');
  const [formImg, setFormImg] = useState('');

  const [errors, setErrors] = useState({});

  // Filter list
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDept = (dept) => {
    if (!dept) return '';
    return dept
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormDept('CARDIOLOGY');
    setFormExp('5 Years');
    setFormRating('4.5');
    setFormFee('100');
    setFormImg('');
    setErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingId(doc.id);
    setFormName(doc.name);
    setFormDept(doc.department);
    setFormExp(doc.experience);
    setFormRating(String(doc.rating));
    setFormFee(String(doc.consultingFee));
    setFormImg(doc.imageUrl || '');
    setErrors({});
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      deleteDoctor(id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formName.trim()) {
      newErrors.name = 'Doctor name is required.';
    }

    if (!formExp.trim()) {
      newErrors.experience = 'Experience is required.';
    }

    const r = parseFloat(formRating);
    if (isNaN(r) || r < 1 || r > 5) {
      newErrors.rating = 'Rating must be between 1.0 and 5.0.';
    }

    const f = parseFloat(formFee);
    if (isNaN(f) || f <= 0) {
      newErrors.fee = 'Consulting fee must be greater than 0.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const doctorData = {
      name: formName,
      department: formDept,
      experience: formExp,
      rating: parseFloat(formRating),
      consultingFee: parseFloat(formFee),
      imageUrl: formImg
    };

    if (editingId) {
      updateDoctor(editingId, doctorData);
    } else {
      addDoctor(doctorData);
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 text-black">Doctor Roster Management</h1>
          <p className="text-sm text-slate-500 mt-1">Add, update or remove medical consultants from the system catalog.</p>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="bg-sky-500 hover:bg-sky-600 text-black font-bold px-5 py-3 rounded-xl shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-200 text-sm flex items-center gap-2 self-stretch sm:self-auto justify-center"
        >
          <FaPlus />
          Add Doctor
        </button>
      </div>

      {/* Roster Table controls */}
      <div className="bg-white bg-slate-800 rounded-3xl overflow-hidden shadow-premium border border-slate-100 border-slate-700/60 p-4 space-y-4">
        
        {/* Search */}
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FaSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 bg-slate-900 text-slate-800 text-slate-100 border border-slate-200 border-slate-700 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 border-slate-700 text-slate-450 text-slate-400 font-bold uppercase text-[10px] tracking-wider bg-slate-50/50 bg-slate-900/50">
                <th className="py-3 px-4">Profile</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Consulting Fee</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 divide-slate-700/60">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/30 hover:bg-slate-750/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <img
                      src={doc.imageUrl || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100'}
                      alt={doc.name}
                      className="w-10 h-10 rounded-xl object-cover bg-slate-100"
                    />
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 text-slate-200">{doc.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-50 text-sky-600 bg-sky-950/40 text-sky-400">
                      {formatDept(doc.department)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-slate-400 font-medium">{doc.experience}</td>
                  <td className="py-3.5 px-4 text-amber-500 font-bold">★ {doc.rating.toFixed(1)}</td>
                  <td className="py-3.5 px-4 text-primary-500 font-extrabold">${doc.consultingFee}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(doc)}
                        className="p-2 rounded-lg text-sky-500 hover:bg-sky-50 hover:bg-sky-950/30 transition-colors"
                        title="Edit Doctor"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.name)}
                        className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 hover:bg-rose-950/30 transition-colors"
                        title="Delete Doctor"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No matching doctors found.
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
          <div className="bg-white bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl relative border border-slate-150 border-slate-700/60 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 border-slate-700 bg-sky-50 bg-slate-900/50">
              <h3 className="text-lg font-extrabold text-slate-850 text-black">
                {editingId ? 'Edit Doctor Profile' : 'Add New Doctor'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:bg-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1">Doctor Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Arthur Pendelton"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-black ${
                    errors.name ? 'border-rose-500' : 'border-slate-200 border-slate-700'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 font-medium mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1">Department</label>
                <select
                  value={formDept}
                  onChange={(e) => setFormDept(e.target.value)}
                  className="w-full bg-slate-55 bg-slate-900 text-sm border border-slate-200 border-slate-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {formatDept(dept)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1">Experience *</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Years"
                    value={formExp}
                    onChange={(e) => setFormExp(e.target.value)}
                    className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-black ${
                      errors.experience ? 'border-rose-500' : 'border-slate-200 border-slate-700'
                    }`}
                  />
                  {errors.experience && <p className="text-xs text-rose-500 font-medium mt-1">{errors.experience}</p>}
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1">Rating (1-5) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    placeholder="4.8"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-black ${
                      errors.rating ? 'border-rose-500' : 'border-slate-200 border-slate-700'
                    }`}
                  />
                  {errors.rating && <p className="text-xs text-rose-500 font-medium mt-1">{errors.rating}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1">Consulting Fee ($) *</label>
                <input
                  type="number"
                  min="1"
                  placeholder="150"
                  value={formFee}
                  onChange={(e) => setFormFee(e.target.value)}
                  className={`w-full bg-slate-55 bg-slate-900 text-sm border px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-black ${
                    errors.fee ? 'border-rose-500' : 'border-slate-200 border-slate-700'
                  }`}
                />
                {errors.fee && <p className="text-xs text-rose-500 font-medium mt-1">{errors.fee}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 text-slate-400 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formImg}
                  onChange={(e) => setFormImg(e.target.value)}
                  className="w-full bg-slate-55 bg-slate-900 text-sm border border-slate-200 border-slate-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
                />
                <p className="text-[10px] text-slate-400 mt-1">Leave empty to auto-generate a professional stock profile avatar.</p>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 border-slate-700 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold border border-slate-200 border-slate-700 text-slate-600 text-slate-350 hover:bg-slate-50 hover:bg-slate-750 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-black font-bold py-2 px-6 rounded-xl shadow-md text-sm transition-all"
                >
                  Save Doctor
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default DoctorManagementPage;
