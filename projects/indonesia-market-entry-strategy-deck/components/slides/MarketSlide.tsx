import React from 'react';
import { SlideProps } from '../../types';
import { Users, ShieldAlert, BarChart3, Search, Target } from 'lucide-react';

export const MarketSlide: React.FC<SlideProps> = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-end pb-4 border-b border-slate-700 mb-2">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-red-500/20 text-red-400 text-sm font-bold px-3 py-1 rounded-full border border-red-500/30">KNOCKOUT PILLAR</span>
          </div>
          <h2 className="text-5xl font-bold text-white">Market Entry Opportunity</h2>
        </div>
        <div className="text-right bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30">
          <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-1">Critical Success Metric</p>
          <div className="flex items-center justify-end gap-3 text-emerald-400">
            <Target size={28} />
            <p className="text-3xl font-bold">Target Share {'>'} Fixed Costs + 20%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">

        {/* Card 1: Addressable Market */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-blue-500 p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-900/30 p-3 rounded-lg">
              <BarChart3 className="text-blue-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">Addressable Market</h3>
          </div>
          <ul className="space-y-4 text-slate-300 flex-grow">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1 text-xl">•</span>
              <span className="text-lg"><strong>BPOM Registrations:</strong> Check 2020-2024 trend (excluding COVID spike) for volume baseline.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1 text-xl">•</span>
              <span className="text-lg"><strong>Market Share:</strong> <br />Year 1 Target: <span className="text-white font-bold">5-8%</span> <br /> Year 3 Target: <span className="text-white font-bold">12-15%</span>.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Client Acquisition */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-purple-500 p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <Search className="text-purple-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">Client Acquisition Feasibility</h3>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700 mb-4">
            <h4 className="text-purple-300 font-bold text-sm uppercase mb-3">The Critical Test</h4>
            <p className="text-xl text-white">
              Can we identify <strong className="text-purple-400 text-2xl">3-5 named trial opportunities</strong> for Year 1?
            </p>
          </div>
          <p className="text-slate-400 text-lg">
            Can we "import" business from global contracts or must we compete locally from scratch?
          </p>
        </div>

        {/* Card 3: Competitive Positioning */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-amber-500 p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-amber-900/30 p-3 rounded-lg">
              <Users className="text-amber-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">Competitive Positioning</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <strong className="block text-amber-200 text-lg mb-2">Incumbents</strong>
              <p className="text-slate-300 text-base leading-relaxed">IQVIA, PAREXEL. <br /><em>Weakness:</em> Niche TAs & Small Bio flexibility.</p>
            </div>
            <div>
              <strong className="block text-amber-200 text-lg mb-2">Locals</strong>
              <p className="text-slate-300 text-base leading-relaxed">Prodia, Equilab. <br /><em>Weakness:</em> Global QA standards & data integration.</p>
            </div>
          </div>
        </div>

        {/* Card 4: Strategic Timing */}
        <div className="bg-slate-800 rounded-2xl border-t-8 border-red-500 p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-900/30 p-3 rounded-lg">
              <ShieldAlert className="text-red-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">Strategic Timing</h3>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed flex-grow">
            <strong>First Mover vs. Late Mover:</strong> INA-CRC is launching 2024-2025.
            Being "the CRO that understood INA-CRC" is a wedge.
          </p>
          <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/20">
            <p className="text-red-200 font-bold text-base">
              Decision: If regulatory advantage is unclear, consider 12-month delay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};