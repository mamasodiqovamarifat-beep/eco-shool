import React from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface SlideControlsProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  isFullscreen: boolean;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  currentSlideIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  isFullscreen,
}) => {
  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className="w-full flex flex-col z-30 select-none no-print">
      {/* Visual Progress Bar */}
      <div 
        className="w-full h-1 bg-slate-900 cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = clickX / rect.width;
          const targetIndex = Math.min(Math.floor(ratio * totalSlides), totalSlides - 1);
          onSelectSlide(targetIndex);
        }}
        title="Istalgan joyga bosib oʻtish"
      >
        <div 
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
        <div className="absolute inset-0 bg-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Floating or Docked Bar */}
      <div className="h-12 px-6 bg-slate-950/80 border-t border-slate-900 backdrop-blur-md flex items-center justify-between text-slate-400 text-xs">
        {/* Keyboard shortcut tips */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-mono">
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">→</kbd>
            <span>slaydlar</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 font-mono">
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">F</kbd>
            <span>ekran</span>
          </span>
        </div>

        {/* Quick jump slide pill markers */}
        <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center justify-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSlide(idx)}
              title={`${idx + 1}-slayd`}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlideIndex
                  ? 'w-6 bg-emerald-400 shadow-sm shadow-emerald-500/50'
                  : 'w-2 bg-slate-800 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            disabled={currentSlideIndex === 0}
            onClick={onPrev}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Oldingi</span>
          </button>

          <button
            type="button"
            disabled={currentSlideIndex === totalSlides - 1}
            onClick={onNext}
            className="flex items-center gap-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <span>Keyingi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
