import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const WorkExperience = () => {
  const { workExperience } = portfolioData;
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pt-1">
        <Briefcase className="w-4 h-4 text-orange-500 flex-shrink-0" />
        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-sans">
          Work Experience
        </h2>
        <div className="flex-1 h-px bg-stone-200"></div>
      </div>

      {/* Vertical Timeline */}
      <div className="overflow-y-auto max-h-[460px] scrollbar-thin-visible pr-2">
        {workExperience.map((item, idx) => {
          const isExpanded = !!expandedItems[idx];
          return (
            <div
              key={idx}
              className="relative pl-5 border-l-2 border-orange-200 pb-7 last:pb-2 group"
            >
              {/* Marker */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-100 group-hover:scale-125 transition-transform" />

              {/* Period & Location */}
              <p className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider mb-0.5 font-mono">
                {item.period} · {item.location}
              </p>

              {/* Role Title */}
              <h3 className="text-sm font-semibold text-stone-900 leading-snug">
                {item.role}
              </h3>

              {/* Company */}
              <p className="text-xs text-stone-500 mt-0.5 mb-1.5">
                {item.company}
              </p>

              {/* Summary */}
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                {item.summary}
              </p>

              {/* Expandable Bullet Points */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <p className="font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
                    Key Contributions & Responsibilities:
                  </p>
                  <ul className="space-y-1.5 pl-0.5">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack pills */}
                  {item.technologies && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-2">
                      <span className="text-[10px] text-stone-400 font-medium">Stack:</span>
                      {item.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono border border-stone-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Toggle Button matching reference site */}
              <button
                onClick={() => toggleExpand(idx)}
                className="text-xs text-orange-600 hover:text-orange-700 mt-2 font-semibold transition-colors flex items-center gap-1"
                aria-label={isExpanded ? "Show less details" : "Show more details"}
              >
                {isExpanded ? (
                  <>
                    <span>show less</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>show more</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
