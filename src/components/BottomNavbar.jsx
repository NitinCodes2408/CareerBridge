import React, { useState, useEffect } from 'react';

export const BottomNavbar = () => {
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'updates', label: 'Updates' },
    { id: 'work', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -40;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw]">
      <nav 
        className="relative inline-flex items-center h-11 rounded-full text-white px-1.5 sm:px-2 bg-neutral-900/95 backdrop-blur-md border border-neutral-700/60 shadow-2xl ring-1 ring-white/10"
        aria-label="Bottom Navigation Bar"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative z-20 flex h-full cursor-pointer flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 transition-all"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active Glow Pill Background */}
              {isActive && (
                <span className="absolute inset-y-1.5 inset-x-1 bg-neutral-800 rounded-full -z-10 shadow-inner"></span>
              )}

              {/* Text */}
              <span
                className={`text-[11px] sm:text-xs tracking-wide transition-all duration-200 font-medium ${
                  isActive
                    ? 'opacity-100 text-white font-semibold scale-105'
                    : 'opacity-50 hover:opacity-85 text-neutral-300'
                }`}
              >
                {item.label}
              </span>

              {/* Active Top Light Bar matching reference recording */}
              {isActive && (
                <div className="absolute top-0 w-5 sm:w-6 h-[2px] rounded-full bg-orange-400">
                  <div className="absolute left-[-20%] top-[2px] w-[140%] h-4 bg-gradient-to-b from-orange-400/20 to-transparent pointer-events-none"></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
