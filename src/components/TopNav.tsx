import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Maximize, 
  Minimize, 
  Edit3, 
  Eye, 
  LayoutGrid, 
  Download, 
  Upload, 
  Printer, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  Video
} from 'lucide-react';
import { PresentationData } from '../types/slide';

interface TopNavProps {
  currentSlideIndex: number;
  totalSlides: number;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenOverview: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onExportJSON: () => void;
  onImportJSON: (file: File) => void;
  onPrint: () => void;
  onResetDefaults: () => void;
  schoolName: string;
  onUpdateSchoolName: (name: string) => void;
  isBgVideoEnabled: boolean;
  currentBgVideoTitle: string;
  onOpenBgSettings: () => void;
  onNextBgVideo?: () => void;
  onPrevBgVideo?: () => void;
  onOpenGeminiAI: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentSlideIndex,
  totalSlides,
  isEditMode,
  onToggleEditMode,
  onOpenOverview,
  isFullscreen,
  onToggleFullscreen,
  isPlaying,
  onTogglePlay,
  onExportJSON,
  onImportJSON,
  onPrint,
  onResetDefaults,
  schoolName,
  onUpdateSchoolName,
  isBgVideoEnabled,
  currentBgVideoTitle,
  onOpenBgSettings,
  onNextBgVideo,
  onPrevBgVideo,
  onOpenGeminiAI,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="h-14 px-4 md:px-6 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between gap-4 z-40 select-none">
      {/* Zone 1: Single text element wordmark with subtle leaf badge */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm shadow-sm">
            🌱
          </div>
          <span className="text-sm md:text-base font-bold text-white tracking-tight whitespace-nowrap">
            Eco-Schools Oʻzbekiston
          </span>
        </div>

        {/* School Name (Editable in edit mode or clean badge) */}
        <div className="hidden lg:flex items-center text-xs text-slate-400 border-l border-slate-800 pl-3">
          {isEditMode ? (
            <input
              type="text"
              value={schoolName}
              onChange={(e) => onUpdateSchoolName(e.target.value)}
              placeholder="Maktab nomi..."
              className="bg-transparent border-b border-dashed border-slate-700 text-slate-300 text-xs py-0.5 focus:outline-none w-56 truncate"
            />
          ) : (
            <span className="text-slate-400 truncate max-w-[220px]">
              {schoolName}
            </span>
          )}
        </div>
      </div>

      {/* Zone 2: Navigation controls & Slide Counter */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Slide Overview (Mundarija) button */}
        <button
          type="button"
          onClick={onOpenOverview}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors whitespace-nowrap"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Mundarija</span>
          <span className="text-slate-500 font-mono text-[11px]">({totalSlides})</span>
        </button>

        {/* Auto Play Slideshow Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
            isPlaying
              ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
              : 'text-slate-300 hover:text-white bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
          title={isPlaying ? "Slaydshouni to'xtatish" : "Avtomatik slaydshou"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          <span className="hidden sm:inline">{isPlaying ? 'Toʻxtatish' : 'Avto-ijro'}</span>
        </button>

        {/* Nature Video Background Control Widget */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          {onPrevBgVideo && (
            <button
              type="button"
              onClick={onPrevBgVideo}
              className="px-1 py-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Oldingi tabiat manzarasi"
            >
              <ChevronDown className="w-3 h-3 rotate-90" />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenBgSettings}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded transition-colors whitespace-nowrap"
            title="Jonli tabiat video fonini sozlash (Xiralik, videolar, ketma-ket almashish)"
          >
            <span className="relative flex h-2 w-2">
              {isBgVideoEnabled && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isBgVideoEnabled ? 'bg-emerald-500' : 'bg-slate-600'}`}></span>
            </span>
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline max-w-[130px] truncate text-emerald-300 font-medium">
              {currentBgVideoTitle}
            </span>
          </button>

          {onNextBgVideo && (
            <button
              type="button"
              onClick={onNextBgVideo}
              className="px-1 py-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Keyingi tabiat manzarasi"
            >
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          )}
        </div>

        {/* Slide Counter Indicator */}
        <div className="px-2.5 py-1 text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-slate-800 rounded-lg whitespace-nowrap">
          <span className="text-emerald-400 font-semibold">{currentSlideIndex + 1}</span> / {totalSlides}
        </div>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2">
        {/* Gemini AI Assistant Button */}
        <button
          type="button"
          onClick={onOpenGeminiAI}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-sm border border-emerald-400/40 transition-all whitespace-nowrap"
          title="Google Gemini AI - Eko-Yordamchi va API Kalit"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Gemini AI</span>
          <span className="hidden sm:inline text-[9px] bg-black/40 px-1 py-0.2 rounded border border-white/20 text-emerald-300 font-mono">
            Faol
          </span>
        </button>

        {/* Mode Switcher: Tahrirlash / Taqdimot */}
        <button
          type="button"
          onClick={onToggleEditMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap ${
            isEditMode
              ? 'bg-amber-600 hover:bg-amber-500 text-white ring-2 ring-amber-500/30'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
          }`}
        >
          {isEditMode ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Taqdimot Rejimi</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Tahrirlash</span>
            </>
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          title={isFullscreen ? "To'liq ekrandan chiqish" : "To'liq ekran (Taqdimot)"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        {/* More Actions Dropdown (Export, Import, Print, Reset) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1 p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Qo'shimcha amallar"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 text-xs text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  onExportJSON();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-800 text-left transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Taqdimotni Saqlash (.json)</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-800 text-left transition-colors"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Taqdimotni Yuklash (.json)</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                type="button"
                onClick={() => {
                  onPrint();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-800 text-left transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Chop etish / PDF Saqlash</span>
              </button>

              <div className="my-1 border-t border-slate-800" />

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Barcha oʻzgarishlarni bekor qilib, boshlangʻich shablonga qaytmoqchimisiz?")) {
                    onResetDefaults();
                    setIsMenuOpen(false);
                  }
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-rose-400 hover:bg-rose-950/30 text-left transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Boshlangʻichga Qaytarish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
