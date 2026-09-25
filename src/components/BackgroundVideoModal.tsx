import React, { useState, useRef } from 'react';
import { 
  X, 
  Video, 
  Eye, 
  EyeOff, 
  Sliders, 
  RefreshCw, 
  Plus, 
  Check, 
  Sparkles,
  Upload,
  Link as LinkIcon,
  Play
} from 'lucide-react';
import { BgVideoItem, BgVideoSettings } from './BackgroundVideoPlayer';

interface BackgroundVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BgVideoSettings;
  onUpdateSettings: (newSettings: BgVideoSettings) => void;
  videos: BgVideoItem[];
  currentVideoIndex: number;
  onSelectVideo: (index: number) => void;
  onAddCustomVideo: (video: BgVideoItem) => void;
}

export const BackgroundVideoModal: React.FC<BackgroundVideoModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  videos,
  currentVideoIndex,
  onSelectVideo,
  onAddCustomVideo,
}) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'upload'>('preset');
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAddCustomVideo({
        id: `custom-${Date.now()}`,
        title: customTitle.trim() || file.name.replace(/\.[^/.]+$/, ''),
        subtitle: 'Foydalanuvchi videosi',
        url,
        isCustom: true,
      });
      setCustomTitle('');
      setActiveTab('preset');
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    onAddCustomVideo({
      id: `custom-${Date.now()}`,
      title: customTitle.trim() || 'Internet videosi',
      subtitle: 'Tashqi video manbasi',
      url: customUrl.trim(),
      isCustom: true,
    });
    setCustomTitle('');
    setCustomUrl('');
    setActiveTab('preset');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Jonli Tabiat Fonini Sozlash
              </h3>
              <p className="text-xs text-slate-400">
                Orqa fonda video ketma-ket almashinuvi va xiralik darajasi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Toggle (Enabled / Disabled) */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${settings.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                {settings.enabled ? <Video className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Jonli Orqa Fon Videolari
                </div>
                <div className="text-xs text-slate-400">
                  {settings.enabled ? 'Faol: orqa fonda tabiat videolari aylanadi' : 'Oʻchiq: oddiy toʻq fon'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onUpdateSettings({ ...settings, enabled: !settings.enabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.enabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.enabled && (
            <>
              {/* Blur Level (Sal hiraroq qilib) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    Xiralik Darajasi (Blur): <span className="text-emerald-400 font-mono font-bold">{settings.blur}px</span>
                  </label>
                  <span className="text-xs text-slate-400">
                    {settings.blur === 0 ? 'Tiniq' : settings.blur <= 6 ? 'Sal xira (Tavsiya)' : 'Kuchli xira'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Tiniq (0px)', val: 0 },
                    { label: 'Yengil (2px)', val: 2 },
                    { label: 'Sal xira (4px)', val: 4 },
                    { label: 'Oʻrtacha (8px)', val: 8 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => onUpdateSettings({ ...settings, blur: preset.val })}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        settings.blur === preset.val
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                          : 'bg-slate-800/70 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="0"
                  max="16"
                  step="1"
                  value={settings.blur}
                  onChange={(e) => onUpdateSettings({ ...settings, blur: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Auto Cycle & Interval */}
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 ${settings.autoCycle ? 'text-emerald-400 animate-spin-slow' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                      Ketma-ket Avto-Oʻtish
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ ...settings, autoCycle: !settings.autoCycle })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                      settings.autoCycle ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        settings.autoCycle ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {settings.autoCycle && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Har bir video davomiyligi:</span>
                    <div className="flex items-center gap-1.5">
                      {[8, 12, 18, 25].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => onUpdateSettings({ ...settings, cycleIntervalSec: sec })}
                          className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${
                            settings.cycleIntervalSec === sec
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {sec}s
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Darkness/Dimmer overlay */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-slate-300">
                    Fon yorugʻligi / Qoraytirish:
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {settings.dim <= 15 ? `${settings.dim}% (Ochiq va tiniq)` : `${settings.dim}%`}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Juda ochiq (5%)', val: 5 },
                    { label: 'Ochiq (15%)', val: 15 },
                    { label: 'Yumshoq (25%)', val: 25 },
                    { label: 'Toʻqroq (40%)', val: 40 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => onUpdateSettings({ ...settings, dim: preset.val })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        settings.dim === preset.val
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                          : 'bg-slate-800/70 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={settings.dim}
                  onChange={(e) => onUpdateSettings({ ...settings, dim: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Video List & Switcher */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Tabiat Videolari ({videos.length})
                  </div>
                  <div className="flex rounded-lg bg-slate-800 p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('preset')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeTab === 'preset' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'
                      }`}
                    >
                      Mavjud videolar
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('upload')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeTab === 'upload' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'
                      }`}
                    >
                      + Yangi qoʻshish
                    </button>
                  </div>
                </div>

                {activeTab === 'preset' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {videos.map((item, idx) => {
                      const isActive = currentVideoIndex === idx;
                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectVideo(idx)}
                          className={`relative group rounded-xl overflow-hidden cursor-pointer border-2 transition-all p-2 text-left bg-slate-950/60 ${
                            isActive
                              ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                              : 'border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 mb-2">
                            {item.poster ? (
                              <img 
                                src={item.poster} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                                <Video className="w-6 h-6" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                              {isActive ? (
                                <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                  <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-xs font-bold text-white truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <div className="text-xs text-slate-300">
                      Oʻzingizning ekologik videolaringizni orqa fonga yuklashingiz mumkin:
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-4 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 flex flex-col items-center justify-center gap-2 text-center text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
                      >
                        <Upload className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">Kompyuterdan Video (MP4)</span>
                        <span className="text-[10px] text-slate-400">Fayl tanlash uchun bosing</span>
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                          <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />
                          Video URL manzili
                        </div>
                        <input
                          type="url"
                          placeholder="https://...mp4"
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddUrl}
                          disabled={!customUrl.trim()}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium disabled:opacity-50 transition-colors"
                        >
                          URL qoʻshish
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Hozirgi video: <span className="text-emerald-400 font-semibold">{videos[currentVideoIndex]?.title}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm"
          >
            Tayyor va Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};
