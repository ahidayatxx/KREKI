import React from 'react';
import { SlideProps } from '../../types';
import { UserPlus, MapPin, Laptop, ShieldCheck, AlertTriangle } from 'lucide-react';

export const OperationalSlide: React.FC<SlideProps> = () => {
  return (
    <div className="h-full flex flex-col">
       <div className="flex items-end justify-between mb-6">
        <div>
            <h2 className="text-4xl font-bold text-white mb-2">Operational Execution</h2>
            <p className="text-xl text-slate-400">Building the engine: People, Places, Tech, and Quality.</p>
        </div>
        <div className="bg-blue-900/30 px-6 py-3 rounded-xl border border-blue-500/30 text-blue-300 text-lg font-bold">
            Launch Timeline: 6-9 Months
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        
        {/* Card 1: Team Building */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-blue-500 p-6 flex flex-col shadow-lg hover:bg-slate-750 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg"><UserPlus className="text-blue-400" size={28} /></div>
                    Team Building
                </h3>
                <span className="bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-red-500/30">Knockout Factor</span>
            </div>
            
            <div className="flex-grow space-y-4">
                <p className="text-lg text-slate-300"><strong>Minimum Viable Team</strong> (By Month 6):</p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                        <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">1</span>
                        <span className="text-lg text-slate-200">Country Head <span className="text-slate-500 text-base">(Global Exp)</span></span>
                    </li>
                    <li className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                        <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">2</span>
                        <span className="text-lg text-slate-200">Regulatory Lead <span className="text-slate-500 text-base">(Ex-BPOM)</span></span>
                    </li>
                </ul>
            </div>
             <div className="mt-4 bg-red-900/20 p-4 rounded-xl border border-red-500/20 flex items-start gap-3">
                <AlertTriangle className="text-red-400 shrink-0 mt-1" size={20} />
                <p className="text-base text-red-200"><strong>Risk:</strong> Failure to hire top 2 roles by Month 3 = <span className="underline decoration-red-500 decoration-2 font-bold">PROJECT PAUSE</span>.</p>
            </div>
        </div>

        {/* Card 2: Site Network */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-amber-500 p-6 flex flex-col shadow-lg hover:bg-slate-750 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg"><MapPin className="text-amber-400" size={28} /></div>
                    Site Network
                </h3>
                 <span className="bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-red-500/30">Knockout Factor</span>
            </div>

             <div className="flex-grow space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 p-4 rounded-xl text-center border border-slate-600">
                        <div className="text-3xl font-bold text-white mb-1">15-20</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wide">Target Sites</div>
                    </div>
                     <div className="bg-slate-700/50 p-4 rounded-xl text-center border border-slate-600">
                        <div className="text-3xl font-bold text-white mb-1">3-4</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wide">Key Cities</div>
                    </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                    <strong>Strategy:</strong> Bypass incumbent fatigue by offering free GCP training and "borrowing" regional relationships.
                </p>
            </div>
        </div>

        {/* Card 3: Technology */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-purple-500 p-6 flex flex-col shadow-lg hover:bg-slate-750 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg"><Laptop className="text-purple-400" size={28} /></div>
                    Technology
                </h3>
            </div>
             <div className="flex-grow">
                <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b border-slate-700 pb-2">
                        <span className="text-lg text-slate-300">EDC Localization</span>
                        <span className="text-purple-400 font-bold text-lg">Bahasa Support?</span>
                    </li>
                     <li className="flex justify-between items-center border-b border-slate-700 pb-2">
                        <span className="text-lg text-slate-300">Cloud Infra</span>
                        <span className="text-purple-400 font-bold text-lg">Latency Check</span>
                    </li>
                     <li className="flex justify-between items-center pb-2">
                        <span className="text-lg text-slate-300">SATUSEHAT Integration</span>
                        <span className="text-purple-400 font-bold text-lg">API Ready?</span>
                    </li>
                </ul>
            </div>
        </div>

         {/* Card 4: Quality */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-emerald-500 p-6 flex flex-col shadow-lg hover:bg-slate-750 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg"><ShieldCheck className="text-emerald-400" size={28} /></div>
                    Quality & Compliance
                </h3>
            </div>
             <div className="flex-grow space-y-4">
                <p className="text-xl text-slate-200 font-light italic leading-relaxed">
                    "Indonesia ops must meet global QA metrics from <strong className="text-emerald-400 not-italic">Day 1</strong>."
                </p>
                <div className="flex gap-3 mt-4">
                    <span className="px-4 py-2 bg-slate-700 rounded-lg text-base text-emerald-200 border border-emerald-500/20">Regional Oversight</span>
                    <span className="px-4 py-2 bg-slate-700 rounded-lg text-base text-emerald-200 border border-emerald-500/20">Quarterly Audits</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};