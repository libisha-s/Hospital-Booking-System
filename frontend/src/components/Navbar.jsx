import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useApp } from '../context/AppContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole } = useApp();
  const location = useLocation();

  const handleScrollToDoctors = () => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/#doctors';
    } else {
      const el = document.getElementById('doctors-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/#doctors', onClick: handleScrollToDoctors },
    { name: 'Appointments', path: '/book' },
    // Admin link is only shown to admins
    ...(userRole === 'admin' ? [{ name: 'Admin', path: '/admin' }] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#D4DDCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-1.5 group">
              <span className="text-2xl font-extrabold text-slate-800 text-black tracking-tight transition-transform group-hover:scale-105">
                HealthCare<span className="text-primary-500 font-medium">+</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="text-slate-600 hover:text-primary-600 text-slate-300 hover:text-primary-400 text-sm font-semibold transition-colors duration-200"
                >
                  {link.name}
                </button>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'text-primary-600 text-primary-400'
                        : 'text-slate-600 hover:text-primary-600 text-slate-300 hover:text-primary-400'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-3">
            
            
            <button 
              onClick={() => alert("Login mock clicked!")}
              className="text-slate-600 hover:text-primary-600 text-slate-300 hover:text-primary-400 text-sm font-semibold transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => alert("Register mock clicked!")}
              className="bg-primary-500 hover:bg-primary-600 text-black text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-200"
            >
              Register
            </button>
          </div>

          {/* Hamburger Icon */}
          <div className="flex md:hidden items-center gap-2">
    

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-slate-900 border-t border-slate-100 border-slate-800 px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            link.onClick ? (
              <button
                key={link.name}
                onClick={link.onClick}
                className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 text-slate-300 hover:text-primary-400 hover:bg-slate-800"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 text-slate-300 hover:text-primary-400 hover:bg-slate-800"
              >
                {link.name}
              </Link>
            )
          ))}
          <div className="border-t border-slate-100 border-slate-800 mt-2 pt-2 flex items-center justify-around">
            <button 
              onClick={() => { setIsOpen(false); alert("Login clicked!"); }}
              className="text-slate-600 text-slate-300 font-semibold px-4 py-2 w-1/2 text-center"
            >
              Login
            </button>
            <button 
              onClick={() => { setIsOpen(false); alert("Register clicked!"); }}
              className="bg-primary-500 text-black font-semibold px-4 py-2 rounded-full w-1/2 text-center"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
