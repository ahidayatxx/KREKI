import React, { useState } from 'react';
import { SlideProps, ScoreItem } from '../../types';
import { Calculator, RotateCcw } from 'lucide-react';

export const DecisionMatrixSlide: React.FC<SlideProps> = () => {
  const [scores, setScores] = useState<ScoreItem[]>([
    { id: 1, category: "Market Size & Growth", weight: 0.20, score: 3 },
    { id: 2, category: "Competitive Positioning", weight: 0.15, score: 3 },
    { id: 3, category: "Regulatory Feasibility", weight: 0.15, score: 3 },
    { id: 4, category: "Talent Availability", weight: 0.15, score: 3 },
    { id: 5, category: "Site Network Access", weight: 0.10, score: 3 },
    { id: 6, category: "Financial Viability", weight: 0.15, score: 3 },
    { id: 7, category: "Risk Manageability", weight: 0.10, score: 3 },
  ]);

  const handleScoreChange = (id: number, val: number) => {
    setScores(scores.map(s => s.id === id ? { ...s, score: val } : s));
  };

  const weightedScore = scores.reduce((acc, curr) => acc + (curr.score * curr.weight), 0).toFixed(2);
  const numericScore = parseFloat(weightedScore);

  let recommendation = "";
  let recColor = "";

  if (numericScore >= 4.0) {
    recommendation = "GO to Phase 2 (Setup)";
    recColor = "text-emerald-400";
  } else if (numericScore >= 3.0) {
    recommendation = "CONDITIONAL GO (Mitigate)";
    recColor = "text-amber-400";
  } else {
    recommendation = "NO-GO or PARTNERSHIP";
    recColor = "text-red-400";
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calculator /> Decision Matrix Calculator
        </h2>
        <button 
            onClick={() => setScores(scores.map(s => ({...s, score: 3})))}
            className="text-xs flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
            <RotateCcw size={14}/> Reset
        </button>
      </div>

      <div className="flex gap-8 flex-grow">
        {/* Sliders */}
        <div className="w-2/3 bg-slate-800/50 p-6 rounded-xl border border-slate-700 overflow-y-auto">
            <div className="space-y-6">
                {scores.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="w-48 text-sm font-medium text-slate-200">
                            {item.category} <span className="text-slate-500 text-xs block">Weight: {(item.weight * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex-grow">
                             <input 
                                type="range" 
                                min="1" 
                                max="5" 
                                step="0.5"
                                value={item.score}
                                onChange={(e) => handleScoreChange(item.id, parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>1 (Poor)</span>
                                <span>3 (Avg)</span>
                                <span>5 (Excellent)</span>
                            </div>
                        </div>
                        <div className="w-12 text-right font-bold text-blue-400 text-lg">
                            {item.score}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Result */}
        <div className="w-1/3 flex flex-col justify-center gap-6">
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl text-center shadow-2xl">
                <h3 className="text-slate-400 uppercase text-sm tracking-widest mb-4">Weighted Score</h3>
                <div className={`text-6xl font-black mb-2 ${recColor}`}>
                    {weightedScore}
                </div>
                <div className={`text-lg font-bold border-t border-slate-800 pt-4 ${recColor}`}>
                    {recommendation}
                </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl text-xs text-slate-400 leading-relaxed">
                <strong>Decision Rule:</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li><span className="text-emerald-400">≥ 4.0</span>: Proceed to Setup</li>
                    <li><span className="text-amber-400">3.0 - 3.9</span>: Conditional Go (Specific Risk Mitigation required)</li>
                    <li><span className="text-red-400">&lt; 3.0</span>: Explore Partnership or Delay</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};