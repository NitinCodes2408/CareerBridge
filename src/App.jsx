import React from 'react';
import { Hero } from './components/Hero';
import { RecentUpdates } from './components/RecentUpdates';
import { Education } from './components/Education';
import { WorkExperience } from './components/WorkExperience';
import { FeaturedProjects } from './components/FeaturedProjects';
import { TechnicalSkills } from './components/TechnicalSkills';
import { Certifications } from './components/Certifications';
import { ContactFooter } from './components/ContactFooter';
import { BottomNavbar } from './components/BottomNavbar';

export function App() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900 relative">
      {/* Background ambient lighting - subtle editorial warmth */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-35 -z-10"></div>
      
      {/* Main Editorial Container */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Hero Section (About) */}
        <Hero />

        {/* Recent Updates Timeline */}
        <RecentUpdates />

        {/* Education and Work Experience in clean 2-column or stacked layout */}
        <section id="work" className="py-10 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            <Education />
            <WorkExperience />
          </div>
        </section>

        {/* Featured Projects (GymTrack AI, CareerBridge, Varsa) */}
        <FeaturedProjects />

        {/* Technical Skills */}
        <TechnicalSkills />

        {/* Training & Certifications */}
        <Certifications />

        {/* Contact & Footer */}
        <ContactFooter />
      </main>

      {/* Floating Bottom Pill Navbar */}
      <BottomNavbar />
    </div>
  );
}

export default App;
