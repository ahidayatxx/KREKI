import React from 'react';
import { SlideProps } from '../../types';
import { MessageCircleQuestion, Smile } from 'lucide-react';

export const ThankYouSlide: React.FC<SlideProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-12 animate-fade-in-up">
      <div className="relative">
        <div className="absolute -inset-8 bg-emerald-500/20 blur-xl rounded-full"></div>
        {/* Combined Icon Representation: Q&A Bubble with a Smiley Badge */}
        <div className="relative z-10 flex flex-col items-center">
             <div className="flex items-center justify-center relative">
                 <MessageCircleQuestion size={140} className="text-emerald-400" />
                 <div className="absolute -bottom-4 -right-4 bg-slate-900 rounded-full p-1 border-4 border-slate-900">
                    <Smile size={50} className="text-emerald-300" />
                 </div>
             </div>
        </div>
      </div>
      
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Terima Kasih
        </h1>
        <p className="text-2xl text-slate-400 font-light">
          The floor is open for questions and discussion.
        </p>
      </div>

      <div className="text-slate-500 text-sm mt-12">
        <p>Indonesia Market Entry Strategy • Q1 2026</p>
      </div>
    </div>
  );
};