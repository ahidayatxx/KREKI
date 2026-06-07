import React from 'react';
import { SlideProps } from '../../types';
import { Key, UserCheck, ShieldCheck, Handshake, TrendingDown, AlertTriangle } from 'lucide-react';

export const FinalSlide: React.FC<SlideProps> = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-white mb-2">Critical Success Factors</h2>
        <p className="text-xl text-slate-400">Five non-negotiable pillars for market viability.</p>
      </div>
      
      {/* Top Row: The "Must Haves" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-600/10 border-l-4 border-blue-500 p-6 rounded-r-xl flex flex-col gap-4">
             <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center">
                <Key className="text-blue-400" size={32} />
             </div>
             <div>
                 <h3 className="font-bold text-2xl text-white mb-2">1. Client Importation</h3>
                 <p className="text-lg text-slate-300 leading-relaxed">
                    <strong>The Make-or-Break:</strong> Route existing global client trials to Indonesia immediately.
                 </p>
                 <p className="text-base text-slate-500 mt-3 italic">Without this, we compete from zero.</p>
             </div>
        </div>

        <div className="bg-purple-600/10 border-l-4 border-purple-500 p-6 rounded-r-xl flex flex-col gap-4">
             <div className="bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center">
                <UserCheck className="text-purple-400" size={32} />
             </div>
             <div>
                 <h3 className="font-bold text-2xl text-white mb-2">2. Regulatory Talent</h3>
                 <p className="text-lg text-slate-300 leading-relaxed">
                    <strong>Non-Negotiable:</strong> Hire a Lead with deep BPOM relationships by Month 4.
                 </p>
                 <p className="text-base text-slate-500 mt-3 italic">Approval delays destroy economics.</p>
             </div>
        </div>

        <div className="bg-emerald-600/10 border-l-4 border-emerald-500 p-6 rounded-r-xl flex flex-col gap-4">
             <div className="bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center">
                <ShieldCheck className="text-emerald-400" size={32} />
             </div>
             <div>
                 <h3 className="font-bold text-2xl text-white mb-2">3. Quality Consistency</h3>
                 <p className="text-lg text-slate-300 leading-relaxed">
                    <strong>Reputation Risk:</strong> Ops must meet global QA metrics from Day 1.
                 </p>
                 <p className="text-base text-slate-500 mt-3 italic">Requires regional QA oversight.</p>
             </div>
        </div>
      </div>

      {/* Middle Row: Operational Enablers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 flex-grow">
         <div className="bg-amber-600/10 border border-amber-500/30 p-6 rounded-xl flex items-center gap-6">
             <div className="bg-amber-900/30 p-4 rounded-lg">
                <Handshake className="text-amber-400" size={40} />
             </div>
             <div>
                <h3 className="font-bold text-2xl text-white mb-1">4. Site Relationships</h3>
                <p className="text-lg text-slate-300">
                    Develop trust with <strong>15-20 sites</strong> within 9 months.
                </p>
             </div>
        </div>

         <div className="bg-red-600/10 border border-red-500/30 p-6 rounded-xl flex items-center gap-6">
             <div className="bg-red-900/30 p-4 rounded-lg">
                <TrendingDown className="text-red-400" size={40} />
             </div>
             <div>
                <h3 className="font-bold text-2xl text-white mb-1">5. Financial Discipline</h3>
                <p className="text-lg text-slate-300">
                    Staged investment. <strong>No over-commitment</strong> before revenue validation.
                </p>
             </div>
        </div>
      </div>

      {/* Bottom Recommendation Banner */}
      <div className="bg-slate-800 border-t-2 border-slate-600 p-8 rounded-xl flex items-center gap-8 shadow-xl">
            <div className="bg-slate-700 p-4 rounded-full">
                <AlertTriangle className="text-yellow-400" size={40} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Strategic Pivot Trigger</h3>
                <p className="text-xl text-slate-300">
                    If any "Must Have" factor fails during Phase 1 assessment: <br/>
                    <span className="text-white font-bold text-2xl bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Stop internal build. Pivot immediately to Partnership or Acquisition.</span>
                </p>
            </div>
      </div>
    </div>
  );
};