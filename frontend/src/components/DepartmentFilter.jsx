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
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/10'
                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-emerald-500/50'
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
