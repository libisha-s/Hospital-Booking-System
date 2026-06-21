import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                HealthCare<span className="text-emerald-500 font-medium">+</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              Connecting patients with top-tier medical specialists. Book appointments securely and experience reliable, modern medical care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-400 transition-colors"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><FaLinkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><FaInstagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/#doctors" className="hover:text-emerald-400 transition-colors">Find Doctors</Link></li>
              <li><Link to="/book" className="hover:text-emerald-400 transition-colors">Book Appointment</Link></li>
              <li><Link to="/admin/appointments" className="hover:text-emerald-400 transition-colors">My Appointments</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>100 HealthCare Ave, Suite 300</li>
              <li>New York, NY 10001</li>
              <li>Phone: +1 (555) 234-5678</li>
              <li>Email: contact@healthcareplus.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe to receive wellness articles and hospital updates.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                required 
                className="w-full bg-slate-800 text-slate-100 px-3 py-2 rounded-l-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 border border-slate-700" 
              />
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-r-xl text-sm transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} HealthCare+. All rights reserved. Designed for excellence in medical scheduling.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
