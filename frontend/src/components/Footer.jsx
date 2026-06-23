import React from "react";

function Footer() {
  return (
    <footer className="bg-[#F7F9F5] border-t border-[#D4DDCB] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#719A90]">
              HealthCare<span className="text-[#91BFA8]">+</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Book appointments with trusted doctors easily and quickly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-8 text-slate-600 font-medium">
            <a href="/" className="hover:text-[#719A90]">
              Home
            </a>
            <a href="#doctors-section" className="hover:text-[#719A90]">
              Doctors
            </a>
            <a href="/book" className="hover:text-[#719A90]">
              Appointments
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#D4DDCB] mt-8 pt-4 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} HealthCare+. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;