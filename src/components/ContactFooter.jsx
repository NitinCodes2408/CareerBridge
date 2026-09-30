import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Check, Copy, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ContactFooter = () => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="py-12 pb-24">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pt-1">
        <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-widest font-sans">
          Get In Touch
        </h2>
        <div className="flex-1 h-px bg-stone-200"></div>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-stone-600 leading-relaxed font-sans max-w-xl">
          I am actively seeking software engineering and full-stack development opportunities. If you have an exciting project, opening, or just want to chat about engineering, I'd love to connect.
        </p>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Email Item */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/80 group">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">Email</div>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-xs font-medium text-stone-900 hover:text-orange-600 transition-colors truncate block"
                >
                  {personal.email}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-200/60 transition-colors flex-shrink-0 ml-2"
              title="Copy email to clipboard"
              aria-label="Copy email"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Item */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">Phone</div>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="text-xs font-medium text-stone-900 hover:text-orange-600 transition-colors truncate block"
                >
                  {personal.phone}
                </a>
              </div>
            </div>
            <a
              href={`tel:${personal.phone.replace(/\s+/g, '')}`}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-200/60 transition-colors flex-shrink-0 ml-2"
              title="Call"
              aria-label="Call"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* LinkedIn */}
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/80 hover:border-orange-300 hover:bg-orange-50/40 transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-700 group-hover:bg-orange-100 group-hover:text-orange-600 flex items-center justify-center flex-shrink-0 transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">LinkedIn</div>
                <div className="text-xs font-medium text-stone-900 group-hover:text-orange-600 transition-colors">
                  in/nitin-bhandare
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 transition-colors" />
          </a>

          {/* GitHub */}
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/80 hover:border-orange-300 hover:bg-orange-50/40 transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-700 group-hover:bg-orange-100 group-hover:text-orange-600 flex items-center justify-center flex-shrink-0 transition-colors">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">GitHub</div>
                <div className="text-xs font-medium text-stone-900 group-hover:text-orange-600 transition-colors">
                  @{personal.githubUsername}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 transition-colors" />
          </a>
        </div>

        {/* Footer Editorial Subtitle */}
        <div className="pt-8 border-t border-stone-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Nitin Bhandare. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>Nagpur, Maharashtra</span>
            <span>·</span>
            <span>Open to Relocation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
