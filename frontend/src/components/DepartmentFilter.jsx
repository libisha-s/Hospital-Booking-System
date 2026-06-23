import React from 'react';

const DEPARTMENTS = [
  { key: 'ALL', label: 'All' },
  { key: 'CARDIOLOGY', label: 'Cardiology' },
  { key: 'NEUROLOGY', label: 'Neurology' },
  { key: 'ORTHOPEDICS', label: 'Orthopedics' },
  { key: 'DERMATOLOGY', label: 'Dermatology' },
  { key: 'PEDIATRICS', label: 'Pediatrics' }
];

function DepartmentFilter({ selectedDept, onSelectDept }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar justify-start md:justify-center">
      {DEPARTMENTS.map((dept) => {
        const isSelected = selectedDept === dept.key;
        return (
          <button
            key={dept.key}
            onClick={() => onSelectDept(dept.key)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-sm border ${
              isSelected
                ? 'bg-primary-500 text-black border-primary-500 shadow-md shadow-primary-500/10'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300 bg-slate-800 text-slate-300 border-slate-700 hover:border-primary-500/50'
            }`}
          >
            {dept.label}
          </button>
        );
      })}
    </div>
  );
}

export default DepartmentFilter;
