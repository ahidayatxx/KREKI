import React from 'react';
import { SlideProps } from '../../types';
import { Target, Scale, Zap, DollarSign } from 'lucide-react';

export const PillarsSlide: React.FC<SlideProps> = () => {
  const pillars = [
    {
      icon: Target,
      title: "1. Market Entry",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      borderColor: "border-blue-500",
      items: ["Addressable Market Size", "Competitive Positioning", "Strategic Timing", "Service Scope"]
    },
    {
      icon: Scale,
      title: "2. Regulatory",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      borderColor: "border-purple-500",
      items: ["Licensing Barriers", "INA-CRC Compliance", "Approval Efficiency", "Compliance Costs"]
    },
    {
      icon: Zap,
      title: "3. Operational",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      borderColor: "border-amber-500",
      items: ["Rapid Team Building", "Site Network Access", "Tech Localization", "QA Infrastructure"]
    },
    {
      icon: DollarSign,
      title: "4. Financial",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      borderColor: "border-emerald-500",
      items: ["Investment Cap", "Revenue Model", "Breakeven Timeline", "Risk Assessment"]
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-5xl font-bold text-white mb-4">The Scope of Strategy</h2>
        <p className="text-2xl text-slate-400">A holistic framework covering market, regulatory, operational, and financial dimensions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
        {pillars.map((pillar, index) => (
          <div key={index} className={`flex flex-col p-8 rounded-2xl border-t-8 ${pillar.borderColor} bg-slate-800 shadow-xl hover:bg-slate-750 transition-all hover:-translate-y-1`}>
            <div className={`w-20 h-20 rounded-2xl ${pillar.bg} flex items-center justify-center mb-8`}>
              <pillar.icon className={pillar.color} size={40} />
            </div>
            <h3 className={`text-3xl font-bold mb-6 ${pillar.color}`}>{pillar.title}</h3>
            <ul className="space-y-4">
              {pillar.items.map((item, i) => (
                <li key={i} className="flex items-start text-slate-300 text-lg leading-snug">
                  <span className={`w-2.5 h-2.5 rounded-full mr-3 mt-2 ${pillar.color.replace('text', 'bg')} flex-shrink-0`}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-slate-900 border border-slate-700 rounded-xl flex justify-between items-center text-lg shadow-lg">
         <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Assessment Priority:</span>
         <div className="flex gap-8">
             <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></span>
                <span className="text-slate-200"><strong>Knockout:</strong> Mo 1-3</span>
             </div>
             <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></span>
                <span className="text-slate-200"><strong>Major:</strong> Mo 3-6</span>
             </div>
             <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
                <span className="text-slate-200"><strong>Optimization:</strong> Mo 6-12</span>
             </div>
         </div>
      </div>
    </div>
  );
};