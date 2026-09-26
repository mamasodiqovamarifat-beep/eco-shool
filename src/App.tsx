/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Slide, PresentationData } from './types/slide';
import { initialSlides, defaultPresentation } from './data/defaultSlides';
import { 
  savePresentationToDB, 
  loadPresentationFromDB, 
  clearPresentationDB 
} from './utils/storage';
import { TopNav } from './components/TopNav';
import { SlideCanvas } from './components/SlideCanvas';
import { SlideControls } from './components/SlideControls';
import { SlideOverviewModal } from './components/SlideOverviewModal';
import { PrintView } from './components/PrintView';
import { 
  BackgroundVideoPlayer, 
  DEFAULT_BG_VIDEOS, 
  DEFAULT_BG_SETTINGS, 
  BgVideoItem, 
  BgVideoSettings 
} from './components/BackgroundVideoPlayer';
import { BackgroundVideoModal } from './components/BackgroundVideoModal';
import { GeminiAIModal } from './components/GeminiAIModal';

export default function App() {
  const [presentation, setPresentation] = useState<PresentationData>(defaultPresentation);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Background Video State with localStorage persistence
  const [bgSettings, setBgSettings] = useState<BgVideoSettings>(() => {
    try {
      const saved = localStorage.getItem('eco_bg_video_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new crisp standards (0px blur, 10% dim)
        if (parsed.dim > 15 || parsed.blur > 1) {
          parsed.dim = 10;
          parsed.blur = 0;
        }
        return parsed;
      }
    } catch {}
    return DEFAULT_BG_SETTINGS;
  });

  const [bgVideos, setBgVideos] = useState<BgVideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('eco_bg_videos_list');
      if (saved) {
        const parsed: BgVideoItem[] = JSON.parse(saved);
        // If it was previous presets without the real 1080p nature videos, upgrade to the real video presets
        if (!parsed[0] || !parsed[0].url.includes('nature_waterfall_real')) {
          localStorage.setItem('eco_bg_videos_list', JSON.stringify(DEFAULT_BG_VIDEOS));
          return DEFAULT_BG_VIDEOS;
        }
        return parsed;
      }
    } catch {}
    return DEFAULT_BG_VIDEOS;
  });

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Show a quick auto-dismiss toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Load from IndexedDB on startup
  useEffect(() => {
    async function initData() {
      try {
        const saved = await loadPresentationFromDB();
        if (saved && saved.slides && saved.slides.length > 0) {
          setPresentation(saved);
        } else {
          setPresentation(defaultPresentation);
          await savePresentationToDB(defaultPresentation);
        }
      } catch (err) {
        console.warn('Initial data load error:', err);
      } finally {
        setIsLoaded(true);
      }
    }
    initData();
  }, []);

  // Save changes to IndexedDB when presentation changes
  const handleUpdatePresentation = useCallback((newPres: PresentationData) => {
    setPresentation(newPres);
    savePresentationToDB(newPres).catch((err) => {
      console.warn('Auto-save error:', err);
    });
  }, []);

  // Update a single slide
  const handleUpdateSlide = useCallback((updatedSlide: Slide) => {
    const updatedSlides = [...presentation.slides];
    const index = updatedSlides.findIndex((s) => s.id === updatedSlide.id);
    if (index !== -1) {
      updatedSlides[index] = updatedSlide;
      const updatedPres: PresentationData = {
        ...presentation,
        updatedAt: new Date().toISOString(),
        slides: updatedSlides,
      };
      handleUpdatePresentation(updatedPres);
    }
  }, [presentation, handleUpdatePresentation]);

  // Slide Navigation
  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev < presentation.slides.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [presentation.slides.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleSelectSlide = useCallback((idx: number) => {
    if (idx >= 0 && idx < presentation.slides.length) {
      setCurrentSlideIndex(idx);
    }
  }, [presentation.slides.length]);

  // Jump to step
  const handleJumpToStep = (stepNumber: number) => {
    const targetIdx = presentation.slides.findIndex((s) => s.stepNumber === stepNumber);
    if (targetIdx !== -1) {
      setCurrentSlideIndex(targetIdx);
    }
  };

  // Slide CRUD Actions
  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: `slide_${Date.now()}`,
      stepNumber: 3,
      stepBadge: "YANGI EKO-SLAYD",
      title: "Yangi Mavzu Sarlavhasi",
      subtitle: "Qisqacha taʼrif yoki reja maqsadi",
      description: "Mazkur slaydda oʻz loyihangiz natijalari, fotosuratlari va rejalari haqida yozishingiz mumkin.",
      bulletPoints: [
        "Birinchi muhim vazifa yoki natija",
        "Ikkinchi erishilgan amaliy koʻrsatkich",
        "Kelgusi bosqichdagi rejalar"
      ],
      media: {
        type: 'image',
        url: '/images/eco_school_hero_1790352940234.jpg',
        caption: "Yangi faoliyatdan lavha",
        alt: "Eco School lavhasi"
      },
      stats: [
        { label: "Bajarilishi", value: "100%", detail: "reja boʻyicha" }
      ],
      layout: 'split-media'
    };

    const updatedSlides = [...presentation.slides, newSlide];
    handleUpdatePresentation({
      ...presentation,
      slides: updatedSlides
    });
    setCurrentSlideIndex(updatedSlides.length - 1);
    showToast("Yangi slayd muvaffaqiyatli qoʻshildi!");
  };

  const handleDuplicateSlide = (index: number) => {
    const target = presentation.slides[index];
    if (!target) return;
    const duplicated: Slide = {
      ...target,
      id: `slide_${Date.now()}`,
      title: `${target.title} (Nusxa)`,
    };
    const updatedSlides = [...presentation.slides];
    updatedSlides.splice(index + 1, 0, duplicated);
    handleUpdatePresentation({
      ...presentation,
      slides: updatedSlides
    });
    setCurrentSlideIndex(index + 1);
    showToast("Slayddan nusxa olindi!");
  };

  const handleDeleteSlide = (index: number) => {
    if (presentation.slides.length <= 1) {
      showToast("Taqdimotda kamida bitta slayd qolishi zarur!");
      return;
    }
    const updatedSlides = presentation.slides.filter((_, i) => i !== index);
    handleUpdatePresentation({
      ...presentation,
      slides: updatedSlides
    });
    if (currentSlideIndex >= updatedSlides.length) {
      setCurrentSlideIndex(updatedSlides.length - 1);
    }
    showToast("Slayd oʻchirildi.");
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const updatedSlides = [...presentation.slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updatedSlides.length) return;

    const temp = updatedSlides[index];
    updatedSlides[index] = updatedSlides[targetIndex];
    updatedSlides[targetIndex] = temp;

    handleUpdatePresentation({
      ...presentation,
      slides: updatedSlides
    });
    setCurrentSlideIndex(targetIndex);
  };

  // Fullscreen support
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.warn('Exit fullscreen error:', err);
      });
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setIsOverviewOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOverviewOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  // Slideshow Auto Play
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev >= presentation.slides.length - 1) {
            return 0; // Loop back to start
          }
          return prev + 1;
        });
      }, 7000);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    }
    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, presentation.slides.length]);

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(presentation, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `eco-schools-presentation-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Taqdimot fayli (.json) yuklab olindi!");
  };

  // Import JSON
  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed && Array.isArray(parsed.slides) && parsed.slides.length > 0) {
          handleUpdatePresentation(parsed);
          setCurrentSlideIndex(0);
          showToast("Taqdimot muvaffaqiyatli yuklandi!");
        } else {
          alert("Fayl formati mos kelmadi. Iltimos toʻgʻri taqdimot JSON faylini tanlang.");
        }
      } catch {
        alert("Faylni oʻqishda xatolik yuz berdi.");
      }
    };
    reader.readAsText(file);
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    await clearPresentationDB();
    setPresentation(defaultPresentation);
    await savePresentationToDB(defaultPresentation);
    setCurrentSlideIndex(0);
    showToast("Boshlangʻich shablon holatiga qaytarildi.");
  };

  // Print / PDF
  const handlePrint = () => {
    window.print();
  };

  const handleUpdateBgSettings = (newSettings: BgVideoSettings) => {
    setBgSettings(newSettings);
    try {
      localStorage.setItem('eco_bg_video_settings', JSON.stringify(newSettings));
    } catch {}
  };

  const handleAddCustomVideo = (newVideo: BgVideoItem) => {
    const updated = [...bgVideos, newVideo];
    setBgVideos(updated);
    setCurrentBgIndex(updated.length - 1);
    try {
      localStorage.setItem('eco_bg_videos_list', JSON.stringify(updated));
    } catch {}
    showToast(`"${newVideo.title}" fonga qoʻshildi!`);
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Eco-Schools taqdimoti yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const currentSlide = presentation.slides[currentSlideIndex] || presentation.slides[0];

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative"
    >
      {/* Dynamic Nature Video Background (Sal xira qilingan, ketma-ket aylanuvchi tabiat videolari) */}
      <BackgroundVideoPlayer
        settings={bgSettings}
        videos={bgVideos}
        currentVideoIndex={currentBgIndex}
        onVideoChange={setCurrentBgIndex}
      />

      {/* Top Bar (hidden in print or can be toggled) */}
      <div className="no-print relative z-30">
        <TopNav
          currentSlideIndex={currentSlideIndex}
          totalSlides={presentation.slides.length}
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
          onOpenOverview={() => setIsOverviewOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onExportJSON={handleExportJSON}
          onImportJSON={handleImportJSON}
          onPrint={handlePrint}
          onResetDefaults={handleResetDefaults}
          schoolName={presentation.schoolName}
          onUpdateSchoolName={(name) => handleUpdatePresentation({ ...presentation, schoolName: name })}
          isBgVideoEnabled={bgSettings.enabled}
          currentBgVideoTitle={bgVideos[currentBgIndex]?.title || 'Tabiat Foni'}
          onOpenBgSettings={() => setIsBgModalOpen(true)}
          onNextBgVideo={() => setCurrentBgIndex((prev) => (prev + 1) % bgVideos.length)}
          onPrevBgVideo={() => setCurrentBgIndex((prev) => (prev - 1 + bgVideos.length) % bgVideos.length)}
          onOpenGeminiAI={() => setIsGeminiModalOpen(true)}
        />
      </div>

      {/* Main Slide Interactive Stage */}
      <main className="flex-1 w-full relative z-10 overflow-hidden flex flex-col justify-center items-center no-print">
        <SlideCanvas
          slide={currentSlide}
          slideIndex={currentSlideIndex}
          totalSlides={presentation.slides.length}
          isEditMode={isEditMode}
          onUpdateSlide={handleUpdateSlide}
          onJumpToStep={handleJumpToStep}
        />
      </main>

      {/* Slide Navigation Controls */}
      <div className="no-print relative z-30">
        <SlideControls
          currentSlideIndex={currentSlideIndex}
          totalSlides={presentation.slides.length}
          onPrev={handlePrevSlide}
          onNext={handleNextSlide}
          onSelectSlide={handleSelectSlide}
          isFullscreen={isFullscreen}
        />
      </div>

      {/* Slide Overview / Table of Contents Modal */}
      <SlideOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        slides={presentation.slides}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={handleSelectSlide}
        onAddSlide={handleAddSlide}
        onDuplicateSlide={handleDuplicateSlide}
        onDeleteSlide={handleDeleteSlide}
        onMoveSlide={handleMoveSlide}
        isEditMode={isEditMode}
      />

      {/* Background Video Settings Modal */}
      <BackgroundVideoModal
        isOpen={isBgModalOpen}
        onClose={() => setIsBgModalOpen(false)}
        settings={bgSettings}
        onUpdateSettings={handleUpdateBgSettings}
        videos={bgVideos}
        currentVideoIndex={currentBgIndex}
        onSelectVideo={setCurrentBgIndex}
        onAddCustomVideo={handleAddCustomVideo}
      />

      {/* Google Gemini AI Modal */}
      <GeminiAIModal
        isOpen={isGeminiModalOpen}
        onClose={() => setIsGeminiModalOpen(false)}
        currentSlide={currentSlide}
        schoolName={presentation.schoolName}
        onUpdateSlideNotes={(notes) => {
          handleUpdateSlide({
            ...currentSlide,
            speakerNotes: notes,
          });
          setToastMessage("Nutq slaydga muvaffaqiyatli saqlandi!");
        }}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-16 right-6 z-50 px-4 py-2.5 bg-slate-900 border border-emerald-500/50 text-emerald-300 text-xs font-semibold rounded-xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Print View of All Slides */}
      <PrintView
        slides={presentation.slides}
        schoolName={presentation.schoolName}
      />
    </div>
  );
}
