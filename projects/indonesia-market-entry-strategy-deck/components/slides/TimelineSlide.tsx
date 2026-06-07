import React from 'react';
import { SlideProps } from '../../types';
import { CheckCircle2, AlertOctagon, Rocket, Flag } from 'lucide-react';

export const TimelineSlide: React.FC<SlideProps> = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-4xl font-bold text-white mb-8">6-12 Month Action Plan</h2>
      
      {/* Container for the 3 phases - Horizontal on Desktop */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Phase 1 */}
        <div className="flex flex-col bg-slate-800 rounded-2xl border-t-8 border-red-500 p-6 relative group hover:bg-slate-750 transition-colors shadow-lg">
            <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-red-400 font-bold uppercase text-lg tracking-wider">Phase 1: Rapid Assessment</h3>
                    <AlertOctagon className="text-red-500" size={28} />
                </div>
                <div className="text-5xl font-bold text-white mb-4">Mo 1-3</div>
                <div className="inline-block bg-red-900/50 text-red-200 px-4 py-2 rounded-full text-base font-bold border border-red-500/30">
                    GO / NO-GO GATE
                </div>
            </div>

            <div className="flex-grow space-y-6">
                <div>
                    <h4 className="text-slate-200 font-bold text-xl mb-4 border-b border-slate-700 pb-2">Key Activities</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-red-500 mt-1.5">•</span>
                            <span>Detailed Market Sizing & Competitor Scan</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-red-500 mt-1.5">•</span>
                            <span>Legal Feasibility (PMA vs Partner)</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-red-500 mt-1.5">•</span>
                            <span>Key Talent Identification</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 bg-slate-900/60 p-5 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-lg">
                    <CheckCircle2 size={24} /> Exit Criteria
                </div>
                <p className="text-slate-300 text-lg">Identify <strong>3-5 named trial opportunities</strong> with weighted score ≥ 4.0.</p>
            </div>
        </div>

        {/* Phase 2 */}
        <div className="flex flex-col bg-slate-800 rounded-2xl border-t-8 border-amber-500 p-6 relative group hover:bg-slate-750 transition-colors shadow-lg">
             <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-amber-400 font-bold uppercase text-lg tracking-wider">Phase 2: Setup & Launch</h3>
                    <Rocket className="text-amber-500" size={28} />
                </div>
                <div className="text-5xl font-bold text-white mb-4">Mo 4-9</div>
                <div className="inline-block bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-base border border-slate-600 font-medium">
                    Proceeds if Phase 1 = GO
                </div>
            </div>

            <div className="flex-grow space-y-6">
                <div>
                    <h4 className="text-slate-200 font-bold text-xl mb-4 border-b border-slate-700 pb-2">Key Activities</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-amber-500 mt-1.5">•</span>
                            <span>Establish Legal Entity (PT PMA)</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-amber-500 mt-1.5">•</span>
                            <span>Hire Country Head & Regulatory Lead</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-amber-500 mt-1.5">•</span>
                            <span>Secure 15+ Site Agreements</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 bg-slate-900/60 p-5 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-lg">
                    <CheckCircle2 size={24} /> Exit Criteria
                </div>
                <p className="text-slate-300 text-lg"><strong>First trial contract signed</strong> by Month 9.</p>
            </div>
        </div>

        {/* Phase 3 */}
        <div className="flex flex-col bg-slate-800 rounded-2xl border-t-8 border-emerald-500 p-6 relative group hover:bg-slate-750 transition-colors shadow-lg">
             <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-emerald-400 font-bold uppercase text-lg tracking-wider">Phase 3: Pilot Ops</h3>
                    <Flag className="text-emerald-500" size={28} />
                </div>
                <div className="text-5xl font-bold text-white mb-4">Mo 10-12</div>
                 <div className="inline-block bg-emerald-900/30 text-emerald-200 px-4 py-2 rounded-full text-base font-bold border border-emerald-500/30">
                    Operational Go-Live
                </div>
            </div>

            <div className="flex-grow space-y-6">
                <div>
                    <h4 className="text-slate-200 font-bold text-xl mb-4 border-b border-slate-700 pb-2">Key Activities</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-emerald-500 mt-1.5">•</span>
                            <span>Trial Startup & First Patient In</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-emerald-500 mt-1.5">•</span>
                            <span>Initial Quality Audit (Global Standard)</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-lg leading-snug">
                            <span className="text-emerald-500 mt-1.5">•</span>
                            <span>Expansion Planning</span>
                        </li>
                    </ul>
                </div>
            </div>

             <div className="mt-8 bg-slate-900/60 p-5 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-lg">
                    <CheckCircle2 size={24} /> Success
                </div>
                <p className="text-slate-300 text-lg">0 Major QA findings. <strong>2-3 Trials Active.</strong></p>
            </div>
        </div>

      </div>
    </div>
  );
};