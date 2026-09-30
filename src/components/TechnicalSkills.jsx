import React from 'react';
import { Cpu, Code2, Database, Wrench, Sparkles, Binary } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const TechnicalSkills = () => {
  const { skills } = portfolioData;

  const categories = [
    { title: "Languages", items: skills.languages, icon: Code2 },
    { title: "Frontend", items: skills.frontend, icon: Sparkles },
    { title: "Backend", items: skills.backend, icon: Cpu },
    { title: "Databases", items: skills.databases, icon: Database },
    { title: "Tools & Platforms", items: skills.tools, icon: Wrench },
    { title: "Concepts & Fundamentals", items: skills.concepts, icon: Binary }
  ];

  return (
    <section id="skills" className="py-10 border-b border-gray-100">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pt-1">
        <Cpu className="w-4 h-4 text-orange-500 flex-shrink-0" />
        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-sans">
          Technical Skills
        </h2>
        <div className="flex-1 h-px bg-stone-200"></div>
      </div>

      {/* Skills Grid by Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                <Icon className="w-3.5 h-3.5 text-orange-500" />
                <span>{cat.title}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {cat.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-2.5 py-1 rounded-full bg-stone-100/90 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300 text-stone-700 font-sans border border-stone-200/80 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
