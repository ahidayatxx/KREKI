import React from 'react';
import { SlideProps, ChartDataPoint } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const FinancialSlide: React.FC<SlideProps> = () => {
  const data: ChartDataPoint[] = [
    { month: '0', revenue: 0, cost: 384, cumulativeProfit: -384 },
    { month: '6', revenue: 0, cost: 750, cumulativeProfit: -750 },
    { month: '12', revenue: 400, cost: 550, cumulativeProfit: -900 }, // Cumulative deepens as costs > rev
    { month: '18', revenue: 800, cost: 500, cumulativeProfit: -600 }, // Turning point
    { month: '24', revenue: 1200, cost: 700, cumulativeProfit: -100 },
    { month: '30', revenue: 1500, cost: 1200, cumulativeProfit: 200 }, // Breakeven
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold text-white">Financial Viability</h2>
        <div className="text-right">
             <div className="text-sm text-slate-400">Investment Requirement</div>
             <div className="text-xl font-bold text-white">$1.5M - $2.0M</div>
        </div>
      </div>

      <div className="flex-grow flex gap-8">
        <div className="w-3/4 h-full bg-slate-800/50 rounded-xl p-4 border border-slate-700 relative">
          <h3 className="text-sm font-bold text-slate-400 mb-4 absolute top-4 left-4">Cumulative Profit/Loss Trajectory ($k)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <ReferenceLine y={0} stroke="#f8fafc" strokeDasharray="3 3" />
              <ReferenceLine x="25" stroke="#fbbf24" label={{ value: 'Breakeven', fill: '#fbbf24', fontSize: 12 }} />
              <Area type="monotone" dataKey="cumulativeProfit" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="w-1/4 space-y-4 overflow-y-auto">
           <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-500">
             <h4 className="font-bold text-white">Breakeven</h4>
             <p className="text-2xl font-mono text-emerald-400">24-30 Mo</p>
             <p className="text-xs text-slate-400 mt-1">Conservative estimate. Can accelerate to 18mo with existing client imports.</p>
           </div>

           <div className="bg-slate-800 p-4 rounded-lg">
             <h4 className="font-bold text-white text-sm mb-2">Upfront CapEx</h4>
             <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex justify-between"><span>Regulatory/Legal</span> <span>$50-125K</span></li>
                <li className="flex justify-between"><span>Office/Infra</span> <span>$90-200K</span></li>
                <li className="flex justify-between"><span>Talent Setup</span> <span>$60-120K</span></li>
                <li className="flex justify-between"><span>Contingency</span> <span>20%</span></li>
             </ul>
           </div>
           
           <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-bold text-red-200 text-sm">Knockout Test</h4>
              <p className="text-xs text-red-300 mt-1">
                 Is corporate willing to tolerate 36 months to meaningful profitability?
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};