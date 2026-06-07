import React from 'react';
import { ChevronLeft, ChevronRight, PieChart } from 'lucide-react';

interface PresentationLayoutProps {
  children: React.ReactNode;
  currentSlide: number;
  totalSlides: number;
  title: string;
  onNext: () => void;
  onPrev: () => void;
}

export const PresentationLayout: React.FC<PresentationLayoutProps> = ({
  children,
  currentSlide,
  totalSlides,
  title,
  onNext,
  onPrev,
}) => {
  const progressPercentage = ((currentSlide - 1) / (totalSlides - 1)) * 100;

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <header className="flex-none h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <PieChart size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-slate-400 uppercase">Strategic Assessment</h1>
            <h2 className="text-lg font-semibold text-white leading-tight">Indonesia Market Entry</h2>
          </div>
        </div>
        <div className="text-slate-500 font-mono text-sm">
          {currentSlide} <span className="text-slate-700">/</span> {totalSlides}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 p-8 md:p-12 lg:p-16 overflow-y-auto">
           {/* Decorative background element */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          {children}
        </div>
      </main>

      {/* Footer / Controls */}
      <footer className="flex-none h-16 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-6 z-10">
        <div className="text-xs text-slate-500 max-w-md hidden md:block">
          Confidential • Internal Use Only • CEO Decision Deck
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onPrev}
            disabled={currentSlide === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 text-slate-300"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className="flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          >
            {currentSlide === totalSlides ? 'Finish' : 'Next'} <ChevronRight size={16} />
          </button>
        </div>
      </footer>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800 z-20">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};