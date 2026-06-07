import React, { useState, useCallback, useEffect } from 'react';
import { PresentationLayout } from './components/PresentationLayout';
import { TitleSlide } from './components/slides/TitleSlide';
import { ContextSlide } from './components/slides/ContextSlide';
import { PillarsSlide } from './components/slides/PillarsSlide';
import { MarketSlide } from './components/slides/MarketSlide';
import { RegulatorySlide } from './components/slides/RegulatorySlide';
import { OperationalSlide } from './components/slides/OperationalSlide';
import { FinancialSlide } from './components/slides/FinancialSlide';
import { RiskSlide } from './components/slides/RiskSlide';
import { TimelineSlide } from './components/slides/TimelineSlide';
import { DecisionMatrixSlide } from './components/slides/DecisionMatrixSlide';
import { FinalSlide } from './components/slides/FinalSlide';
import { ThankYouSlide } from './components/slides/ThankYouSlide';
import { SlideDefinition } from './types';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides: SlideDefinition[] = [
    { id: 'title', title: 'Start', component: TitleSlide },
    { id: 'context', title: 'Strategic Context', component: ContextSlide },
    { id: 'pillars', title: 'MECE Framework', component: PillarsSlide },
    { id: 'market', title: 'Market Opportunity', component: MarketSlide },
    { id: 'regulatory', title: 'Regulatory & Compliance', component: RegulatorySlide },
    { id: 'ops', title: 'Operational Execution', component: OperationalSlide },
    { id: 'finance', title: 'Financial Viability', component: FinancialSlide },
    { id: 'risk', title: 'Risk Assessment', component: RiskSlide },
    { id: 'timeline', title: '6-12 Month Plan', component: TimelineSlide },
    { id: 'decision', title: 'Decision Calculator', component: DecisionMatrixSlide },
    { id: 'final', title: 'Critical Success Factors', component: FinalSlide },
    { id: 'thankyou', title: 'Q&A', component: ThankYouSlide },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = slides[currentSlideIndex].component;

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex flex-col overflow-hidden selection:bg-blue-500 selection:text-white">
      <PresentationLayout
        currentSlide={currentSlideIndex + 1}
        totalSlides={slides.length}
        title={slides[currentSlideIndex].title}
        onNext={nextSlide}
        onPrev={prevSlide}
      >
        <CurrentSlideComponent isActive={true} goToNext={nextSlide} />
      </PresentationLayout>
    </div>
  );
};

export default App;