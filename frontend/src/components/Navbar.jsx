import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { useApp } from '../context/AppContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode, userRole } = useApp();
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
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-1.5 group">
              <span className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-transform group-hover:scale-105">
                HealthCare<span className="text-emerald-500 font-medium">+</span>
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
                  className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 text-sm font-semibold transition-colors duration-200"
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
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400'
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
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <HiSun className="w-5 h-5 text-amber-500" /> : <HiMoon className="w-5 h-5 text-slate-400" />}
            </button>
            
            <button 
              onClick={() => alert("Login mock clicked!")}
              className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 text-sm font-semibold transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => alert("Register mock clicked!")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200"
            >
              Register
            </button>
          </div>

          {/* Hamburger Icon */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <HiSun className="w-5 h-5 text-amber-500" /> : <HiMoon className="w-5 h-5 text-slate-400" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            link.onClick ? (
              <button
                key={link.name}
                onClick={link.onClick}
                className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800"
              >
                {link.name}
              </Link>
            )
          ))}
          <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2 flex items-center justify-around">
            <button 
              onClick={() => { setIsOpen(false); alert("Login clicked!"); }}
              className="text-slate-600 dark:text-slate-300 font-semibold px-4 py-2 w-1/2 text-center"
            >
              Login
            </button>
            <button 
              onClick={() => { setIsOpen(false); alert("Register clicked!"); }}
              className="bg-emerald-500 text-white font-semibold px-4 py-2 rounded-full w-1/2 text-center"
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
