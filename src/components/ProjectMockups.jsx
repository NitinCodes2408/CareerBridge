import React from 'react';
import { 
  Dumbbell, 
  UserCheck, 
  Activity, 
  Flame, 
  Briefcase, 
  FileText, 
  Award, 
  Search, 
  Compass, 
  Palette, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  Cpu,
  BarChart3
} from 'lucide-react';

export const GymTrackMockup = () => {
  return (
    <div className="w-full h-full bg-stone-900 text-stone-100 p-4 sm:p-6 font-sans select-none flex flex-col justify-between overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wide text-stone-200 flex items-center gap-1.5">
              <span>Gymation (GymTrack AI)</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">Live App</span>
            </div>
            <div className="text-[10px] text-stone-400 font-mono">gymation-jooz.vercel.app</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] bg-stone-800/80 px-2.5 py-1 rounded-full border border-stone-700/60 text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Deployment Active
        </div>
      </div>

      {/* Grid of Widgets */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-stone-800/60 border border-stone-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-stone-400 text-[10px] mb-1">
            <span>Active Members</span>
            <UserCheck className="w-3 h-3 text-orange-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-stone-100">482</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> +14% this month
          </div>
        </div>

        <div className="bg-stone-800/60 border border-stone-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-stone-400 text-[10px] mb-1">
            <span>Today's Check-ins</span>
            <Activity className="w-3 h-3 text-orange-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-stone-100">128</div>
          <div className="text-[9px] text-stone-400">Peak hour: 6:30 PM</div>
        </div>

        <div className="bg-stone-800/60 border border-stone-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-stone-400 text-[10px] mb-1">
            <span>AI Workout Plan</span>
            <Flame className="w-3 h-3 text-orange-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-stone-100">96.4%</div>
          <div className="text-[9px] text-orange-300">Goal compliance</div>
        </div>
      </div>

      {/* Bottom Interface Preview */}
      <div className="bg-stone-950/70 border border-stone-800 rounded-lg p-3 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-stone-400 text-[10px] pb-1.5 border-b border-stone-800/80">
          <span className="font-semibold text-stone-300">Live Attendance & Workout Queue</span>
          <span className="font-mono text-stone-500">Auto-sync: 2s ago</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-stone-300 py-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Rohan S. — Chest & Triceps Hypertrophy
            </span>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">Biometric Verified</span>
          </div>
          <div className="flex items-center justify-between text-stone-300 py-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Pooja M. — High Intensity Cardio & Core
            </span>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">Subscription Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CareerBridgeMockup = () => {
  return (
    <div className="w-full h-full bg-slate-900 text-slate-100 p-4 sm:p-6 font-sans select-none flex flex-col justify-between overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wide text-slate-200 flex items-center gap-1.5">
              <span>CareerBridge Platform</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Live App</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">career-bridge-rho.vercel.app</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/60 text-blue-300 font-mono">
          <Sparkles className="w-3 h-3 text-blue-400" />
          Live Deployment Active
        </div>
      </div>

      {/* Grid of Widgets */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Registered Students</span>
            <FileText className="w-3 h-3 text-blue-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-100">320+</div>
          <div className="text-[9px] text-emerald-400">Verified profiles</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Active Drives</span>
            <Award className="w-3 h-3 text-blue-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-100">18</div>
          <div className="text-[9px] text-blue-300">Tier-1 & Core IT</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span>Interview Rate</span>
            <BarChart3 className="w-3 h-3 text-blue-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-100">78.2%</div>
          <div className="text-[9px] text-slate-400">Shortlisted</div>
        </div>
      </div>

      {/* Bottom Pipeline */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1.5 border-b border-slate-800/80">
          <span className="font-semibold text-slate-300">Application Pipeline & AI Screening</span>
          <span className="font-mono text-slate-500">Live Campus Feed</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-300 py-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Full Stack SDE Intern — TechNova Solutions
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.5 rounded">Shortlisted (Score 96)</span>
          </div>
          <div className="flex items-center justify-between text-slate-300 py-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Associate Data Analyst — CloudMatrix
            </span>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/50 px-1.5 py-0.5 rounded">Technical Assessment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VarsaMockup = () => {
  return (
    <div className="w-full h-full bg-stone-900 text-stone-100 p-4 sm:p-6 font-sans select-none flex flex-col justify-between overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wide text-stone-200">Varsa (वारसा) Cultural Archive</div>
            <div className="text-[10px] text-stone-400 font-mono">Maharashtra Digital Heritage Portal · All 36 Districts</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] bg-stone-800/80 px-2.5 py-1 rounded-full border border-stone-700/60 text-emerald-300 font-mono">
          <MapPin className="w-3 h-3 text-emerald-400" />
          Statewide Heritage Registry
        </div>
      </div>

      {/* Grid of Widgets */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-stone-800/60 border border-stone-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-stone-400 text-[10px] mb-1">
            <span>Archived Crafts</span>
            <Palette className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-stone-100">380+</div>
          <div className="text-[9px] text-emerald-400">Paithani, Warli & Dokra</div>
        </div>

        <div className="bg-stone-800/60 border border-stone-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-stone-400 text-[10px] mb-1">
            <span>State Artisans</span>
            <Layers className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-stone-100">260+</div>
          <div className="text-[9px] text-stone-400">Verified communities</div>
        </div>

        <div className="bg-stone-800/60 border border-stone-700/50 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-stone-400 text-[10px] mb-1">
            <span>AI Classification</span>
            <Sparkles className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-stone-100">98.6%</div>
          <div className="text-[9px] text-emerald-300">Multilingual metadata</div>
        </div>
      </div>

      {/* Bottom Archive Samples */}
      <div className="bg-stone-950/70 border border-stone-800 rounded-lg p-3 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-stone-400 text-[10px] pb-1.5 border-b border-stone-800/80">
          <span className="font-semibold text-stone-300">Featured Maharashtra Heritage Records</span>
          <span className="font-mono text-stone-500">Digital Registry</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-stone-300 py-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Yeola Paithani Silk Handloom & Pure Zari Craft — Nashik Division
            </span>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">Handloom Archive</span>
          </div>
          <div className="flex items-center justify-between text-stone-300 py-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Warli Indigenous Tribal Canvas & Folklore Painting — Palghar / North Konkan
            </span>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">Folk Art Archive</span>
          </div>
        </div>
      </div>
    </div>
  );
};
