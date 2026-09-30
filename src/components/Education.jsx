import React from 'react';
import { GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Education = () => {
  const { education } = portfolioData;

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pt-1">
        <GraduationCap className="w-4 h-4 text-orange-500 flex-shrink-0" />
        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-sans">
          Education
        </h2>
        <div className="flex-1 h-px bg-stone-200"></div>
      </div>

      {/* Vertical Timeline */}
      <div className="overflow-y-auto max-h-[460px] scrollbar-thin-visible pr-2">
        {education.map((item, idx) => (
          <div
            key={idx}
            className="relative pl-5 border-l-2 border-orange-200 pb-6 last:pb-2 group"
          >
            {/* Timeline Marker */}
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-100 group-hover:scale-125 transition-transform" />

            {/* Duration & Location */}
            <p className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider mb-0.5 font-mono">
              {item.duration} · {item.location}
            </p>

            {/* Degree Title */}
            <h3 className="text-sm font-semibold text-stone-900 leading-snug">
              {item.degree}
            </h3>

            {/* Institution & Affiliation */}
            <p className="text-xs text-stone-600 mt-0.5">
              {item.institution} {item.affiliation ? `(${item.affiliation})` : ''}
            </p>

            {/* Score / Grade */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200/80">
                {item.score}
              </span>
              <span className="text-[10px] text-stone-400 font-medium">
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
