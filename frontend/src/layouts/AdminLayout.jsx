import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX ,HiHome} from 'react-icons/hi';
import { MdDashboard, MdListAlt, MdEventAvailable, MdLogout } from 'react-icons/md';
import { FaUserMd } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, setDarkMode } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <MdDashboard className="text-xl" />, end: true },
    { name: 'Doctors', path: '/admin/doctors', icon: <FaUserMd className="text-xl" />, end: false },
    { name: 'Availability', path: '/admin/availability', icon: <MdEventAvailable className="text-xl" />, end: false },
    { name: 'Appointments', path: '/admin/appointments', icon: <MdListAlt className="text-xl" />, end: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 bg-slate-900 text-slate-100 flex transition-colors duration-300">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white bg-slate-800 border-r border-slate-200 border-slate-700 shadow-md">
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 border-slate-700">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-slate-800 text-black font-sans tracking-tight">HealthCare<span className="text-primary-500">+</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500 text-black shadow-md shadow-primary-500/20'
                    : 'text-slate-600 text-slate-300 hover:bg-slate-100 hover:bg-slate-700'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 border-slate-700 space-y-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm text-slate-600 text-slate-300 hover:bg-slate-100 hover:bg-slate-700 transition-colors"
          >
            <span className="flex items-center gap-4">
              
            </span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 text-rose-400 hover:bg-rose-50 hover:bg-rose-950/30 transition-colors"
          >
            <MdLogout className="text-xl" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar for Mobile (Drawer) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col w-64 bg-white bg-slate-800 shadow-xl transition-transform duration-300 transform md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 border-slate-700">
          <span className="text-xl font-extrabold text-slate-800 text-black">HealthCare<span className="text-primary-500">+</span></span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 hover:bg-slate-700"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500 text-black shadow-md shadow-primary-500/20'
                    : 'text-slate-600 text-slate-300 hover:bg-slate-100 hover:bg-slate-700'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 border-slate-700 space-y-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm text-slate-600 text-slate-300 hover:bg-slate-100 hover:bg-slate-700 transition-colors"
          >
            <span className="flex items-center gap-4">
              
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
          
          <button
            onClick={() => {
              setSidebarOpen(false);
              navigate('/');
            }}
            className="flex w-full items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 text-rose-400 hover:bg-rose-50 hover:bg-rose-950/30 transition-colors"
          >
            <MdLogout className="text-xl" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white bg-slate-800 border-b border-slate-200 border-slate-700 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:bg-slate-700 md:hidden"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-slate-800 text-slate-100">Admin Control Center</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-600 bg-primary-50 text-primary-400 bg-primary-950/40 hover:opacity-90"
            >
              <HiHome className="text-sm" />
              View Site
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-500 text-black font-extrabold flex items-center justify-center text-xs">
                AD
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-slate-600 text-slate-300">System Admin</span>
            </div>
          </div>
        </header>

        {/* Dynamic content */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;
