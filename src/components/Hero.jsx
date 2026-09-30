import React from 'react';
import { Linkedin, Github, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="pt-8 sm:pt-14 pb-10 border-b border-gray-100">
      {/* Profile Portrait on top matching reference */}
      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-sm ring-1 ring-stone-200/80 bg-stone-100 relative mb-6 sm:mb-8">
        <img
          src={personal.profilePhoto}
          alt={personal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.48]"
          style={{
            transform: 'scale(1.38)',
            transformOrigin: '50% 16%'
          }}
          loading="eager"
        />
      </div>

      {/* Hero Details */}
      <div className="w-full space-y-2">
        {/* Name and Social Links Row */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-950 leading-tight">
            {personal.name}
          </h1>

          {/* Social & Contact Links on the right side of the name */}
          <div className="flex items-center gap-3 pt-2 flex-shrink-0">
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-stone-400 hover:text-orange-600 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-stone-400 hover:text-orange-600 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Send Email"
              className="text-stone-400 hover:text-orange-600 transition-colors"
              title={`Email: ${personal.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${personal.phone.replace(/\s+/g, '')}`}
              aria-label="Phone / Contact"
              className="text-stone-400 hover:text-orange-600 transition-colors"
              title={`Call: ${personal.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Subtitle / Tagline */}
        <p className="text-sm font-medium text-orange-600 tracking-wide font-serif">
          {personal.tagline}
        </p>

          {/* Location / Status tag */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            <span>{personal.location}</span>
          </div>

          {/* Bio text */}
          <div className="space-y-3 pt-2 text-sm text-stone-700 leading-relaxed font-sans">
            <p>
              I'm pursuing my Bachelor of Technology in <span className="font-semibold text-stone-900">Artificial Intelligence</span> at{' '}
              <span className="font-semibold text-stone-900">G. H. Raisoni College of Engineering & Management</span>, Nagpur (CGPA: 8.12, Expected 2027).
            </p>
            <p>
              My engineering focus centers on building responsive full-stack web applications, dependable backend systems, and clean user interfaces. I build with <span className="font-semibold text-stone-900">React, JavaScript, Node.js, Express, MySQL</span>, and <span className="font-semibold text-stone-900">Java / Python</span>, with a strong foundation in Object-Oriented Programming, Data Structures & Algorithms, and CI/CD practices.
            </p>
            <p>
              Alongside core software development, I have practical familiarity with basic Machine Learning workflows and Data Analysis using Python, Pandas, NumPy, and Scikit-learn—applied toward high-utility platforms like campus recruitment automation and cultural heritage preservation.
            </p>
            <p>
              I'm passionate about writing maintainable code and solving real user problems. Feel free to explore my work below or reach out directly!
            </p>
          </div>

          {/* Editorial Quote matching reference */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 italic">
            <span>
              {personal.quote} <span className="not-italic text-stone-500">— {personal.quoteAuthor}</span>
            </span>
          </div>
        </div>
    </section>
  );
};
