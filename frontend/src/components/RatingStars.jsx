import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function RatingStars({ rating }) {
  const score = parseFloat(rating) || 0;
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.25 && score - fullStars < 0.75;
  const extraFull = score - fullStars >= 0.75 ? 1 : 0;
  const activeFull = fullStars + extraFull;
  
  const emptyStars = Math.max(0, 5 - activeFull - (hasHalf ? 1 : 0));

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400 gap-0.5" aria-label={`Rating: ${score} out of 5 stars`}>
        {[...Array(activeFull)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-3.5 h-3.5 fill-current" />
        ))}
        {hasHalf && <FaStarHalfAlt className="w-3.5 h-3.5 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 fill-current" />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

export default RatingStars;
