import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-primary-50 text-slate-800">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
