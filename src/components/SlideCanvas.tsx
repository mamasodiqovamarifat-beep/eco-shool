import React, { useState } from 'react';
import { Slide, SlideMedia, SlideStat, ActionItem } from '../types/slide';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Video, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  Sparkles, 
  FileText,
  ChevronDown,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import { MediaUploaderModal } from './MediaUploaderModal';

interface SlideCanvasProps {
  slide: Slide;
  slideIndex: number;
  totalSlides: number;
  isEditMode: boolean;
  onUpdateSlide: (updatedSlide: Slide) => void;
  onJumpToStep?: (stepNumber: number) => void;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  slideIndex,
  totalSlides,
  isEditMode,
  onUpdateSlide,
  onJumpToStep,
}) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Helper updates
  const updateField = <K extends keyof Slide>(field: K, value: Slide[K]) => {
    onUpdateSlide({
      ...slide,
      [field]: value,
    });
  };

  const handleBulletChange = (idx: number, text: string) => {
    const updated = [...slide.bulletPoints];
    updated[idx] = text;
    updateField('bulletPoints', updated);
  };

  const handleAddBullet = () => {
    updateField('bulletPoints', [...slide.bulletPoints, 'Yangi reja yoki maʼlumot matni']);
  };

  const handleRemoveBullet = (idx: number) => {
    const updated = slide.bulletPoints.filter((_, i) => i !== idx);
    updateField('bulletPoints', updated);
  };

  const handleStatChange = (idx: number, key: keyof SlideStat, value: string) => {
    if (!slide.stats) return;
    const updated = [...slide.stats];
    updated[idx] = { ...updated[idx], [key]: value };
    updateField('stats', updated);
  };

  const handleAddStat = () => {
    const currentStats = slide.stats || [];
    updateField('stats', [...currentStats, { label: 'Koʻrsatkich', value: '100%', detail: 'qisqa izoh' }]);
  };

  const handleRemoveStat = (idx: number) => {
    if (!slide.stats) return;
    updateField('stats', slide.stats.filter((_, i) => i !== idx));
  };

  const handleActionStatusToggle = (actionId: string) => {
    if (!slide.actionItems) return;
    const statusCycle: Record<ActionItem['status'], ActionItem['status']> = {
      rejalashtirilgan: 'jarayonda',
      jarayonda: 'bajarildi',
      bajarildi: 'rejalashtirilgan',
    };
    const updated = slide.actionItems.map((item) =>
      item.id === actionId ? { ...item, status: statusCycle[item.status] } : item
    );
    updateField('actionItems', updated);
  };

  const handleActionTextChange = (actionId: string, task: string) => {
    if (!slide.actionItems) return;
    const updated = slide.actionItems.map((item) =>
      item.id === actionId ? { ...item, task } : item
    );
    updateField('actionItems', updated);
  };

  // Determine media element
  const renderMedia = (className = "w-full h-full object-cover") => {
    const isVideo = slide.media.type === 'video' || slide.media.url.match(/\.(mp4|webm|ogg|mov)$/i);

    if (isVideo) {
      return (
        <div className="relative w-full h-full bg-black/90 flex items-center justify-center overflow-hidden group">
          <video
            src={slide.media.url}
            controls
            playsInline
            className={className}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          >
            Video brauzeringizda ochilmadi.
          </video>
        </div>
      );
    }

    return (
      <img
        src={slide.media.url}
        alt={slide.media.alt || slide.title}
        referrerPolicy="no-referrer"
        className={className}
      />
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden text-slate-100 select-text">
      {/* Background Ambience & Open Translucency */}
      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Slide Content Area */}
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between max-w-7xl mx-auto w-full rounded-2xl bg-slate-950/40 backdrop-blur-[2px] border border-white/10 shadow-2xl my-2"
      >
        {/* Top Header Row of the Slide */}
        <div className="space-y-3">
          {/* Step Tag & Page Indicator */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={slide.stepBadge}
                    onChange={(e) => updateField('stepBadge', e.target.value)}
                    className="bg-transparent border-b border-dashed border-emerald-400/50 text-emerald-300 focus:outline-none w-48"
                  />
                ) : (
                  slide.stepBadge
                )}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span>Slayd {slideIndex + 1}</span>
              <span>/</span>
              <span>{totalSlides}</span>
            </div>
          </div>

          {/* Slide Title */}
          <div>
            {isEditMode ? (
              <textarea
                value={slide.title}
                rows={2}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Slayd sarlavhasi..."
                className="w-full text-2xl md:text-3xl lg:text-4xl font-extrabold text-white bg-slate-900/60 border border-emerald-500/40 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            ) : (
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {slide.title}
              </h1>
            )}

            {/* Slide Subtitle */}
            {isEditMode ? (
              <input
                type="text"
                value={slide.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="Qisqa izoh yoki shior..."
                className="w-full mt-2 text-sm md:text-base text-emerald-300 bg-slate-900/40 border-b border-dashed border-slate-700 p-1.5 focus:outline-none"
              />
            ) : (
              slide.subtitle && (
                <p className="mt-1.5 text-sm md:text-base font-medium text-emerald-300/90 leading-relaxed">
                  {slide.subtitle}
                </p>
              )
            )}
          </div>
        </div>

        {/* Dynamic Center Layout Body */}
        <div className="my-6 flex-1 flex flex-col justify-center">
          {/* LAYOUT 1: ROADMAP (7 Qadam Xaritasi) */}
          {slide.layout === 'roadmap' ? (
            <div className="space-y-6">
              {isEditMode ? (
                <textarea
                  value={slide.description || ''}
                  rows={2}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full text-sm text-slate-300 bg-slate-900/40 border border-slate-800 rounded-lg p-2"
                />
              ) : (
                slide.description && (
                  <p className="text-sm md:text-base text-slate-300 max-w-4xl leading-relaxed">
                    {slide.description}
                  </p>
                )
              )}

              {/* 7 Steps interactive timeline pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { step: 1, name: "Eko-Qo'mita", desc: "Yetakchilar va faol o'quvchilar jamoasi", icon: "👥" },
                  { step: 2, name: "Eko-Audit", desc: "Resurslar sarfi va tabiat tahlili", icon: "📋" },
                  { step: 3, name: "Harakatlar Rejasi", desc: "Aniq muddatli amaliy rejalar", icon: "🚀" },
                  { step: 4, name: "Monitoring", desc: "Doimiy nazorat va ko'rsatkichlar", icon: "📊" },
                  { step: 5, name: "Darsga Integratsiya", desc: "STEM va fanlararo uzviy bog'lanish", icon: "🔬" },
                  { step: 6, name: "Jamoani Jalb Etish", desc: "Aksiyalar va ota-onalar hamkorligi", icon: "🌍" },
                  { step: 7, name: "Eko-Kod", desc: "Maktabning oltin ekologik qoidasi", icon: "🌱" },
                  { step: 8, name: "Yashil Bayroq", desc: "Xalqaro oliy mukofot va sertifikat", icon: "🏆" }
                ].map((item) => (
                  <div
                    key={item.step}
                    onClick={() => onJumpToStep && onJumpToStep(item.step)}
                    className="p-3.5 bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer hover:bg-emerald-950/20 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-800/40">
                        {item.step === 8 ? 'Mukofot' : `${item.step}-Qadam`}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : slide.layout === 'checklist' ? (
            /* LAYOUT 2: ACTION PLAN CHECKLIST */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                {isEditMode ? (
                  <textarea
                    value={slide.description || ''}
                    rows={2}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full text-sm text-slate-300 bg-slate-900/40 border border-slate-800 rounded-lg p-2"
                  />
                ) : (
                  slide.description && (
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                      {slide.description}
                    </p>
                  )
                )}

                <div className="space-y-2.5">
                  {slide.actionItems?.map((item) => {
                    const isDone = item.status === 'bajarildi';
                    const isInProgress = item.status === 'jarayonda';
                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-emerald-950/20 border-emerald-800/50 text-slate-200'
                            : isInProgress
                            ? 'bg-amber-950/20 border-amber-800/50 text-slate-200'
                            : 'bg-slate-900/40 border-slate-800 text-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleActionStatusToggle(item.id)}
                          title="Holatni oʻzgartirish"
                          className="mt-0.5 shrink-0"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isInProgress ? (
                            <Clock className="w-5 h-5 text-amber-400" />
                          ) : (
                            <CircleDot className="w-5 h-5 text-slate-500" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.task}
                              onChange={(e) => handleActionTextChange(item.id, e.target.value)}
                              className="w-full bg-transparent border-b border-dashed border-slate-700 text-sm text-white focus:outline-none"
                            />
                          ) : (
                            <p className={`text-sm font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                              {item.task}
                            </p>
                          )}
                          {item.responsible && (
                            <span className="text-[11px] text-slate-400 mt-0.5 block">
                              Masʼul: {item.responsible}
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          isDone 
                            ? 'bg-emerald-500/20 text-emerald-300' 
                            : isInProgress 
                            ? 'bg-amber-500/20 text-amber-300' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.status === 'bajarildi' ? 'Bajarildi' : item.status === 'jarayonda' ? 'Jarayonda' : 'Reja'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Media Card alongside */}
              <div className="lg:col-span-5 relative group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
                  {renderMedia()}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-emerald-600 text-white text-xs font-medium backdrop-blur-md transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Rasm / Video Almashtirish
                    </button>
                  )}
                </div>
                {slide.media.caption && (
                  <p className="text-xs text-slate-400 text-center mt-2 italic">
                    {slide.media.caption}
                  </p>
                )}
              </div>
            </div>
          ) : slide.layout === 'three-col' ? (
            /* LAYOUT 3: THREE-COLUMN CARDS */
            <div className="space-y-6">
              {slide.description && (
                <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                  {slide.description}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {slide.bulletPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-colors relative group"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
                        0{idx + 1}
                      </div>
                      {isEditMode ? (
                        <textarea
                          rows={4}
                          value={point}
                          onChange={(e) => handleBulletChange(idx, e.target.value)}
                          className="w-full text-xs text-slate-200 bg-slate-950/60 border border-slate-700 rounded p-2 focus:outline-none"
                        />
                      ) : (
                        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                          {point}
                        </p>
                      )}
                    </div>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(idx)}
                        className="mt-3 text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1 self-end"
                      >
                        <Trash2 className="w-3 h-3" />
                        Oʻchirish
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditMode && (
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/40 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Yangi Karta Qoʻshish
                </button>
              )}
            </div>
          ) : slide.layout === 'quote' ? (
            /* LAYOUT 4: MANIFESTO / EKO-KOD QUOTE */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 border border-emerald-500/30 rounded-3xl relative shadow-2xl">
                  <div className="text-4xl text-emerald-400/40 font-serif absolute top-4 left-4">“</div>
                  <div className="space-y-3 relative z-10 pl-4">
                    {slide.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={point}
                            onChange={(e) => handleBulletChange(idx, e.target.value)}
                            className="flex-1 text-sm md:text-base font-semibold text-emerald-100 bg-transparent border-b border-dashed border-emerald-400/40 focus:outline-none"
                          />
                        ) : (
                          <p className="text-sm md:text-base font-semibold text-emerald-100">
                            {point}
                          </p>
                        )}
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(idx)}
                            className="text-rose-400 hover:text-rose-300 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddBullet}
                      className="mt-4 flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Qoida qoʻshish
                    </button>
                  )}
                </div>

                {slide.description && (
                  <p className="text-xs md:text-sm text-slate-400 italic">
                    {slide.description}
                  </p>
                )}
              </div>

              {/* Right Media Card */}
              <div className="lg:col-span-5 relative group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                  {renderMedia()}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-emerald-600 text-white text-xs font-medium backdrop-blur-md transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Rasm / Video Almashtirish
                    </button>
                  )}
                </div>
                {slide.media.caption && (
                  <p className="text-xs text-slate-400 text-center mt-2 italic">
                    {slide.media.caption}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* DEFAULT LAYOUT: SPLIT MEDIA OR STANDARD */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Text & Bullets */}
              <div className="lg:col-span-7 space-y-5">
                {/* Description */}
                {isEditMode ? (
                  <textarea
                    rows={3}
                    value={slide.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Batafsil maʼlumot..."
                    className="w-full text-sm text-slate-200 bg-slate-900/60 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                  />
                ) : (
                  slide.description && (
                    <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal">
                      {slide.description}
                    </p>
                  )
                )}

                {/* Bullet Points List */}
                <div className="space-y-2.5">
                  {slide.bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {isEditMode ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={point}
                            onChange={(e) => handleBulletChange(idx, e.target.value)}
                            className="flex-1 text-xs md:text-sm text-slate-100 bg-slate-900/50 border-b border-dashed border-slate-700 py-1 focus:outline-none focus:border-emerald-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(idx)}
                            className="text-rose-400 hover:text-rose-300 p-1 opacity-70 hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                          {point}
                        </p>
                      )}
                    </div>
                  ))}

                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleAddBullet}
                      className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 pt-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Yangi band qoʻshish
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Media Display with Video Support */}
              <div className="lg:col-span-5 relative group">
                <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                  {renderMedia()}

                  {/* Edit Media Button */}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-emerald-600 text-white text-xs font-medium backdrop-blur-md transition-colors shadow-lg"
                    >
                      {slide.media.type === 'video' ? <Video className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                      Rasm / Video Almashtirish
                    </button>
                  )}
                </div>

                {/* Media Caption */}
                {slide.media.caption && (
                  <p className="text-xs text-slate-400 text-center mt-2.5 italic">
                    {slide.media.caption}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Highlights & Key Stats Row */}
        {slide.stats && slide.stats.length > 0 && (
          <div className="pt-4 border-t border-slate-800/80">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {slide.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl relative group hover:border-slate-700 transition-colors"
                >
                  {isEditMode ? (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                        placeholder="100%"
                        className="w-full text-base font-bold text-emerald-400 bg-transparent border-b border-dashed border-slate-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                        placeholder="Sarlavha"
                        className="w-full text-[11px] text-slate-300 bg-transparent border-b border-dashed border-slate-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={stat.detail || ''}
                        onChange={(e) => handleStatChange(idx, 'detail', e.target.value)}
                        placeholder="Izoh"
                        className="w-full text-[10px] text-slate-500 bg-transparent border-b border-dashed border-slate-700 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStat(idx)}
                        className="text-rose-400 text-[10px] flex items-center gap-1 mt-1"
                      >
                        <Trash2 className="w-2.5 h-2.5" /> Oʻchirish
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-base md:text-lg font-bold text-emerald-400 font-mono">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-slate-200">
                        {stat.label}
                      </div>
                      {stat.detail && (
                        <div className="text-[11px] text-slate-400">
                          {stat.detail}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isEditMode && (
                <button
                  type="button"
                  onClick={handleAddStat}
                  className="flex flex-col items-center justify-center p-3 border border-dashed border-slate-800 rounded-xl text-slate-400 hover:text-emerald-400 hover:border-emerald-600/40 text-xs transition-colors"
                >
                  <Plus className="w-4 h-4 mb-1" />
                  Statistika qoʻshish
                </button>
              )}
            </div>
          </div>
        )}

        {/* Collapsible Speaker Notes */}
        <div className="mt-3 pt-2">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              <FileText className="w-3 h-3 text-emerald-500" />
              <span>Spiker eslatmalari</span>
              {showNotes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 p-3 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden"
              >
                {isEditMode ? (
                  <textarea
                    rows={2}
                    value={slide.speakerNotes || ''}
                    onChange={(e) => updateField('speakerNotes', e.target.value)}
                    placeholder="Ushbu slaydni taqdimot qilishda spiker aytishi kerak boʻlgan eslatmalar..."
                    className="w-full text-xs text-slate-300 bg-transparent border-none focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-slate-300 italic">
                    {slide.speakerNotes || "Ushbu slayd uchun eslatmalar kiritilmagan. Tahrirlash rejimidan kiritishingiz mumkin."}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Media Uploader Modal */}
      <MediaUploaderModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        currentMedia={slide.media}
        onSave={(updatedMedia) => updateField('media', updatedMedia)}
      />
    </div>
  );
};
