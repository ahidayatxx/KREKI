import React from 'react';
import { SlideProps } from '../../types';
import { FileCheck, Server, AlertOctagon } from 'lucide-react';

export const RegulatorySlide: React.FC<SlideProps> = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-5xl font-bold text-white mb-3">Regulatory & Compliance Feasibility</h2>
        <p className="text-2xl text-slate-400">Navigating the bureaucratic landscape to ensure speed and legality.</p>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Licensing */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-red-500 p-8 flex flex-col relative overflow-hidden group hover:bg-slate-750 transition-colors shadow-lg">
          <div className="absolute top-4 right-4 p-2 opacity-20">
            <FileCheck size={64} className="text-red-500" />
          </div>

          <div className="mb-6">
            <span className="bg-red-900/50 text-red-200 border border-red-500/30 px-3 py-1 rounded-full text-sm font-bold tracking-wider mb-4 inline-block">
              KNOCKOUT FACTOR
            </span>
            <h3 className="text-3xl font-bold text-white">Licensing & Barriers</h3>
          </div>

          <div className="flex-grow space-y-6">
            <div>
              <strong className="text-red-200 text-xl block mb-2">Entity Structure</strong>
              <p className="text-slate-300 text-lg leading-snug">
                Can we implement 100% foreign ownership (PT PMA)? Or do we need a local partner (49/51)?
              </p>
            </div>
            <div>
              <strong className="text-red-200 text-xl block mb-2">Permit Critical Path</strong>
              <p className="text-slate-300 text-lg leading-snug">
                Office lease <span className="text-red-500">→</span> Work permits (KITAS) <span className="text-red-500">→</span> Tax (NPWP) <span className="text-red-500">→</span> Operational License.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-red-500/20">
            <p className="text-lg text-slate-300">
              <strong className="text-red-400">Action:</strong> Engage local legal for definitive feasibility in Month 1.
            </p>
          </div>
        </div>

        {/* Card 2: Data */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-amber-500 p-8 flex flex-col relative overflow-hidden group hover:bg-slate-750 transition-colors shadow-lg">
          <div className="absolute top-4 right-4 p-2 opacity-20">
            <Server size={64} className="text-amber-500" />
          </div>

          <div className="mb-6">
            <span className="bg-amber-900/50 text-amber-200 border border-amber-500/30 px-3 py-1 rounded-full text-sm font-bold tracking-wider mb-4 inline-block">
              MAJOR FACTOR
            </span>
            <h3 className="text-3xl font-bold text-white">INA-CRC & Data</h3>
          </div>

          <div className="flex-grow space-y-6">
            <div>
              <strong className="text-amber-200 text-xl block mb-2">Tech Burden</strong>
              <p className="text-slate-300 text-lg leading-snug">
                Do our eClinical systems support FHIR-based exchange for SATUSEHAT integration?
              </p>
            </div>
            <div>
              <strong className="text-amber-200 text-xl block mb-2">Data Residency</strong>
              <p className="text-slate-300 text-lg leading-snug">
                Must clinical trial data be stored on local servers? Impact on global centralized data management?
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-amber-500/20">
            <p className="text-lg text-slate-300">
              <strong className="text-amber-400">Risk:</strong> Poor definition = massive IT cost overruns.
            </p>
          </div>
        </div>

        {/* Card 3: Approval */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-purple-500 p-8 flex flex-col relative overflow-hidden group hover:bg-slate-750 transition-colors shadow-lg">
          <div className="absolute top-4 right-4 p-2 opacity-20">
            <AlertOctagon size={64} className="text-purple-500" />
          </div>

          <div className="mb-6">
            <span className="bg-purple-900/50 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-sm font-bold tracking-wider mb-4 inline-block">
              MAJOR FACTOR
            </span>
            <h3 className="text-3xl font-bold text-white">Approval Efficiency</h3>
          </div>

          <div className="flex-grow space-y-6">
            <div>
              <strong className="text-purple-200 text-xl block mb-2">BPOM, MTA, and EC Timeline</strong>
              <p className="text-slate-300 text-lg leading-snug">
                If approval &gt; 6 months average, we lose competitive bids to faster markets.
              </p>
            </div>
            <div>
              <strong className="text-purple-200 text-xl block mb-2">Process Optimization</strong>
              <p className="text-slate-300 text-lg leading-snug">
                Do we have ex-BPOM staff or regulatory strategy as a competitive differentiator?
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-purple-500/20">
            <p className="text-lg text-slate-300">
              <strong className="text-purple-400">Threshold:</strong> &gt;6 mo approval is a deal-breaker.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};