import React from 'react';

function SlotCard({ day, slots = [], selectedDay, selectedSlotTime, onSelect }) {
  // Format day name (e.g. MONDAY -> Monday)
  const formatDay = (d) => {
    if (!d) return '';
    return d.charAt(0).toUpperCase() + d.slice(1).toLowerCase();
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-premium border border-slate-100 dark:border-slate-700/60">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
        <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          {formatDay(day)}
        </h4>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          {slots.length} slots available
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {slots.map((time) => {
          const isSelected = selectedDay === day && selectedSlotTime === time;
          return (
            <button
              key={time}
              onClick={() => onSelect(day, time)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 border text-center ${
                isSelected
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-emerald-300 dark:bg-slate-900 dark:hover:bg-slate-750 dark:text-slate-300 dark:border-slate-700'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SlotCard;
