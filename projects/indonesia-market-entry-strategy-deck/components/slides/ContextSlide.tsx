import React from 'react';
import { SlideProps } from '../../types';
import { Clock, Crosshair, TrendingUp, AlertTriangle } from 'lucide-react';

export const ContextSlide: React.FC<SlideProps> = () => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className="mb-10">
                <h2 className="text-5xl font-bold mb-4 text-white">Strategic Approach</h2>
                <p className="text-2xl text-slate-400">Not building from scratch—localizing an international engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">

                {/* Card 1: Urgency */}
                <div className="flex flex-col p-8 bg-slate-800 rounded-2xl border-t-8 border-amber-500 shadow-xl hover:bg-slate-750 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-white">Urgency Filter</h3>
                        <div className="bg-amber-900/30 p-3 rounded-lg">
                            <Clock className="text-amber-500" size={32} />
                        </div>
                    </div>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        This is a <strong>6-12 month Go/No-Go decision</strong>.
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-700/50">
                        <p className="text-lg text-slate-400 italic">
                            Focus only on <span className="text-amber-400 font-bold">"Knockout Factors"</span> that could kill the deal, not implementation details.
                        </p>
                    </div>
                </div>

                {/* Card 2: Differentiation */}
                <div className="flex flex-col p-8 bg-slate-800 rounded-2xl border-t-8 border-blue-500 shadow-xl hover:bg-slate-750 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-white">Differentiation</h3>
                        <div className="bg-blue-900/30 p-3 rounded-lg">
                            <Crosshair className="text-blue-500" size={32} />
                        </div>
                    </div>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Indonesia has incumbents (IQVIA, PAREXEL). We must identify a <strong>"Competitive Wedge"</strong>.
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-700/50">
                        <p className="text-lg text-slate-400 italic">
                            Risk: Commoditization without specific niche expertise.
                        </p>
                    </div>
                </div>

                {/* Card 3: Opportunity */}
                <div className="flex flex-col p-8 bg-slate-800 rounded-2xl border-t-8 border-emerald-500 shadow-xl hover:bg-slate-750 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-white">The Opportunity Lens</h3>
                        <div className="bg-emerald-900/30 p-3 rounded-lg">
                            <TrendingUp className="text-emerald-500" size={32} />
                        </div>
                    </div>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        The question isn't "Can we operate?" but <strong>"Can we profit?"</strong>
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-700/50">
                        <p className="text-xl font-bold text-emerald-400">
                            Goal: Min. Viable Revenue {'>'} Fixed Costs + 20%.
                        </p>
                    </div>
                </div>

                {/* Card 4: Risk */}
                <div className="flex flex-col p-8 bg-slate-800 rounded-2xl border-t-8 border-red-500 shadow-xl hover:bg-slate-750 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-white">Phase-Gate Risk</h3>
                        <div className="bg-red-900/30 p-3 rounded-lg">
                            <AlertTriangle className="text-red-500" size={32} />
                        </div>
                    </div>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        We are evaluating initial entry. Expansion decisions come later.
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-700/50">
                        <p className="text-lg text-slate-300">
                            Must identify <strong className="text-white">3-5 named trial opportunities</strong> in Year 1 or <span className="text-red-400 font-bold uppercase">Exit</span>.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};