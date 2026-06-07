import React from 'react';
import { SlideProps } from '../../types';
import { Globe, ArrowRight } from 'lucide-react';

export const TitleSlide: React.FC<SlideProps> = ({ goToNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fade-in-up">
      <div className="relative">
        <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full"></div>
        <Globe size={80} className="text-blue-400 relative z-10" />
      </div>
      
      <div className="space-y-4 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Indonesia Market Entry <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Strategic Assessment</span>
        </h1>
        <p className="text-slate-400 text-lg font-medium">Prepared by Ahmad Hidayat</p>
      </div>

      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl max-w-2xl w-full backdrop-blur-sm">
        <h3 className="text-slate-300 uppercase text-xs font-bold tracking-widest mb-2">Core Decision</h3>
        <p className="text-xl font-medium text-white">
          "Can we profitably localize our international CRO capabilities in Indonesia within acceptable risk parameters?"
        </p>
      </div>

      <button 
        onClick={goToNext}
        className="mt-8 group flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-bold transition-all transform hover:scale-105"
      >
        Begin Assessment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};