import React, { useState } from 'react';
import { Slide } from '../types/slide';
import { X, Search, Plus, Copy, Trash2, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

interface SlideOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
  isEditMode: boolean;
}

export const SlideOverviewModal: React.FC<SlideOverviewModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
  isEditMode,
}) => {
  const [search, setSearch] = useState('');
  const [selectedStep, setSelectedStep] = useState<number | 'all'>('all');

  if (!isOpen) return null;

  const filteredSlides = slides
    .map((slide, originalIndex) => ({ slide, originalIndex }))
    .filter(({ slide }) => {
      const matchSearch =
        slide.title.toLowerCase().includes(search.toLowerCase()) ||
        slide.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        slide.stepBadge.toLowerCase().includes(search.toLowerCase());
      
      const matchStep = selectedStep === 'all' || slide.stepNumber === selectedStep;
      return matchSearch && matchStep;
    });

  const stepTabs = [
    { label: 'Barchasi', value: 'all' as const },
    { label: 'Kirish', value: 0 },
    { label: '1-Qadam', value: 1 },
    { label: '2-Qadam', value: 2 },
    { label: '3-Qadam', value: 3 },
    { label: '4-Qadam', value: 4 },
    { label: '5-Qadam', value: 5 },
    { label: '6-Qadam', value: 6 },
    { label: '7-Qadam', value: 7 },
    { label: 'Xulosa', value: 8 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-6xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Slaydlar Mundarijasi va Boshqaruvi
              <span className="text-xs font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                Jami: {slides.length} ta varoq
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Istalgan slaydga tezkor oʻtish, tartibini oʻzgartirish yoki yangi varoq qoʻshish</p>
          </div>

          <div className="flex items-center gap-2">
            {isEditMode && (
              <button
                type="button"
                onClick={onAddSlide}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Yangi Slayd Qoʻshish
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/40 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
          {/* Step Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {stepTabs.map((tab) => (
              <button
                key={String(tab.value)}
                type="button"
                onClick={() => setSelectedStep(tab.value)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedStep === tab.value
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Slayd nomini qidirish..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Slides Grid */}
        <div className="flex-1 p-6 overflow-y-auto min-h-[300px]">
          {filteredSlides.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
              <p className="text-sm">Qidiruv boʻyicha slayd topilmadi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSlides.map(({ slide, originalIndex }) => {
                const isCurrent = originalIndex === currentSlideIndex;
                return (
                  <div
                    key={slide.id}
                    onClick={() => {
                      onSelectSlide(originalIndex);
                      onClose();
                    }}
                    className={`group relative flex flex-col bg-slate-950 border rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                      isCurrent
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-950/40'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Slide preview image */}
                    <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                      {slide.media?.type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400">
                          <span className="text-xs flex items-center gap-1">🎥 Video lavha</span>
                        </div>
                      ) : slide.media?.url ? (
                        <img
                          src={slide.media.url}
                          alt={slide.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600 text-xs">
                          Rasm yoʻq
                        </div>
                      )}

                      {/* Number badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-mono text-white">
                        #{originalIndex + 1}
                      </div>

                      {/* Step Tag */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-[10px] font-medium text-emerald-300 bg-emerald-950/80 backdrop-blur-sm px-2 py-0.5 rounded truncate max-w-[85%] border border-emerald-800/40">
                          {slide.stepBadge}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Content snippet */}
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-100 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                          {slide.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {slide.subtitle || slide.description}
                        </p>
                      </div>

                      {/* Actions for edit mode */}
                      {isEditMode && (
                        <div 
                          className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              title="Yuqoriga koʻchirish"
                              disabled={originalIndex === 0}
                              onClick={() => onMoveSlide(originalIndex, 'up')}
                              className="p-1 hover:text-white hover:bg-slate-800 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Pastga koʻchirish"
                              disabled={originalIndex === slides.length - 1}
                              onClick={() => onMoveSlide(originalIndex, 'down')}
                              className="p-1 hover:text-white hover:bg-slate-800 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Nusxalash"
                              onClick={() => onDuplicateSlide(originalIndex)}
                              className="p-1 hover:text-emerald-400 hover:bg-slate-800 rounded ml-1"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {slides.length > 1 && (
                            <button
                              type="button"
                              title="Slaydni oʻchirish"
                              onClick={() => onDeleteSlide(originalIndex)}
                              className="p-1 hover:text-rose-400 hover:bg-rose-950/40 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
