import React from 'react';
import { SlideProps, RiskItem } from '../../types';

export const RiskSlide: React.FC<SlideProps> = () => {
  const risks: RiskItem[] = [
    { name: "Market Volume Low", prob: 35, impact: 80, category: "Market" },
    { name: "Price War", prob: 45, impact: 50, category: "Competitive" },
    { name: "BPOM Delays", prob: 40, impact: 85, category: "Regulatory" },
    { name: "Talent Shortage", prob: 35, impact: 60, category: "Operational" },
    { name: "Cost Overruns", prob: 60, impact: 70, category: "Financial" },
    { name: "Quality/Reputation", prob: 15, impact: 95, category: "Reputational" },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-white mb-6">Risk Assessment Matrix</h2>

      <div className="flex-grow flex gap-8">
        {/* Matrix Visualization */}
        <div className="w-2/3 relative bg-slate-800 rounded-xl border border-slate-700 p-8">
            {/* Axis Labels */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-400 font-bold text-sm uppercase">Impact (Severity)</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-slate-400 font-bold text-sm uppercase">Probability</div>

            {/* Grid Background */}
            <div className="w-full h-full relative grid grid-cols-2 grid-rows-2">
                <div className="bg-green-500/5 border-r border-b border-slate-600 rounded-tl-lg"></div>
                <div className="bg-yellow-500/5 border-b border-slate-600 rounded-tr-lg"></div>
                <div className="bg-yellow-500/5 border-r border-slate-600 rounded-bl-lg"></div>
                <div className="bg-red-500/5 rounded-br-lg"></div>
            </div>

            {/* Plot Points */}
            {risks.map((risk, i) => (
                <div 
                    key={i}
                    className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-help group transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform z-10"
                    style={{ 
                        left: `${risk.impact}%`, 
                        bottom: `${risk.prob}%`,
                        backgroundColor: risk.impact * risk.prob > 4000 ? '#ef4444' : risk.impact * risk.prob > 2000 ? '#f59e0b' : '#10b981'
                    }}
                >
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-slate-700 z-20">
                        {risk.name}
                    </div>
                </div>
            ))}
        </div>

        {/* Legend / Detail */}
        <div className="w-1/3 space-y-4">
            <h3 className="font-bold text-lg text-slate-200">Mitigation Strategies</h3>
            
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
                <div className="p-3 bg-red-900/10 border-l-2 border-red-500 rounded">
                    <strong className="text-red-300 block text-xs uppercase">Quality/Reputation (High Impact)</strong>
                    <p className="text-xs text-slate-300 mt-1">Zero compromise. Regional QA oversight essential in Year 1.</p>
                </div>
                 <div className="p-3 bg-slate-800 border-l-2 border-blue-500 rounded">
                    <strong className="text-blue-300 block text-xs uppercase">Market Volume (Strategic)</strong>
                    <p className="text-xs text-slate-300 mt-1">Phase investment. Don't fully staff until trials materialize.</p>
                </div>
                 <div className="p-3 bg-slate-800 border-l-2 border-amber-500 rounded">
                    <strong className="text-amber-300 block text-xs uppercase">Cost Overruns (Financial)</strong>
                    <p className="text-xs text-slate-300 mt-1">Strict Go/No-Go gates at 6, 12, 18 months.</p>
                </div>
            </div>

            <div className="mt-4 p-4 bg-slate-800 rounded text-center">
                <span className="text-xs text-slate-500">Aggregate Risk Score</span>
                <div className="text-2xl font-bold text-amber-500">MEDIUM-HIGH</div>
                <div className="text-xs text-slate-400 mt-1">Requires partnership or staged entry if risk appetite is low.</div>
            </div>
        </div>
      </div>
    </div>
  );
};