import React, { useState, useEffect, useCallback } from 'react';
import { HiSearch } from 'react-icons/hi';

function SearchBar({ onSearch, placeholder = "Search doctor by name..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <HiSearch className="h-5 w-5 text-slate-400 text-slate-500" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white bg-slate-800 text-slate-800 text-slate-100 border border-slate-200 border-slate-700 pl-11 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition-all placeholder:text-slate-400"
      />
    </div>
  );
}

export default SearchBar;
