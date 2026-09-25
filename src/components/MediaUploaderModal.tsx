import React, { useState } from 'react';
import { SlideMedia } from '../types/slide';
import { saveMediaBlob } from '../utils/storage';
import { Upload, Video, Image as ImageIcon, Link, X, Check, RefreshCw } from 'lucide-react';

interface MediaUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMedia: SlideMedia;
  defaultMediaUrl?: string;
  onSave: (updatedMedia: SlideMedia) => void;
}

export const MediaUploaderModal: React.FC<MediaUploaderModalProps> = ({
  isOpen,
  onClose,
  currentMedia,
  defaultMediaUrl,
  onSave,
}) => {
  const [mediaType, setMediaType] = useState<'image' | 'video'>(currentMedia.type || 'image');
  const [url, setUrl] = useState(currentMedia.url || '');
  const [caption, setCaption] = useState(currentMedia.caption || '');
  const [alt, setAlt] = useState(currentMedia.alt || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setPreviewError(false);
    try {
      const blobId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const blobUrl = await saveMediaBlob(blobId, file);
      
      setMediaType(type);
      setUrl(blobUrl);
      if (!caption) {
        setCaption(file.name.replace(/\.[^/.]+$/, ''));
      }
    } catch (err) {
      console.error('File processing error:', err);
      // Fallback to FileReader DataURL
      const reader = new FileReader();
      reader.onload = () => {
        setMediaType(type);
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApply = () => {
    if (!url.trim()) return;
    onSave({
      type: mediaType,
      url: url.trim(),
      caption: caption.trim(),
      alt: alt.trim() || caption.trim() || 'Slayd mediasi',
    });
    onClose();
  };

  const handleResetToDefault = () => {
    if (defaultMediaUrl) {
      setMediaType('image');
      setUrl(defaultMediaUrl);
      setCaption('Maktabimiz ekologik faoliyatidan lavha');
      setAlt('Eco-Schools media');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-emerald-800/40 rounded-2xl shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Rasm yoki Video Yuklash</h3>
              <p className="text-xs text-slate-400">Sayt deploy qilingandan keyin ham oʻz rasmlaringiz va videolaringiz saqlanadi</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Media Type Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setMediaType('image')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                mediaType === 'image'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Rasm (Foto)
            </button>
            <button
              type="button"
              onClick={() => setMediaType('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                mediaType === 'video'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              Video (MP4 / WebM / Havola)
            </button>
          </div>

          {/* Upload Dropzones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File input image */}
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl cursor-pointer bg-slate-950/40 hover:bg-emerald-950/20 transition-all group">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'image')}
              />
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full group-hover:scale-110 transition-transform mb-2">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-200">Kompyuterdan Rasm Yuklash</span>
              <span className="text-[11px] text-slate-400 mt-1">JPG, PNG, WebP (maks. 20MB)</span>
            </label>

            {/* File input video */}
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl cursor-pointer bg-slate-950/40 hover:bg-emerald-950/20 transition-all group">
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'video')}
              />
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-full group-hover:scale-110 transition-transform mb-2">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-slate-200">Kompyuterdan Video Yuklash</span>
              <span className="text-[11px] text-slate-400 mt-1">MP4, WebM, MOV video fayllar</span>
            </label>
          </div>

          {/* Direct URL Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5 text-emerald-400" />
              Yoki Internetdan Havola (URL) orqali kiritish:
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setPreviewError(false);
              }}
              placeholder={mediaType === 'image' ? 'https://example.com/rasm.jpg' : 'https://example.com/video.mp4 yoki YouTube havola'}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Caption & Alt inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Rasm / Video Taglavhasi (Izoh):</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Masalan: 7-sinf oʻquvchilari daraxt ekish jarayonida"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Qisqa Tavsif (Alt text):</label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Masalan: Eko-qoʻmita aʼzolari"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          {url && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Koʻrinishi (Preview):</span>
                {isProcessing && <span className="text-emerald-400 animate-pulse">Yuklanmoqda...</span>}
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-slate-800 flex items-center justify-center">
                {mediaType === 'video' ? (
                  <video 
                    src={url} 
                    controls 
                    className="w-full h-full object-contain"
                    onError={() => setPreviewError(true)}
                  >
                    Brauzeringiz ushbu videoni qoʻllab-quvvatlamaydi.
                  </video>
                ) : (
                  <img
                    src={url}
                    alt={alt || 'Tanlangan rasm'}
                    referrerPolicy="no-referrer"
                    onError={() => setPreviewError(true)}
                    className="w-full h-full object-cover"
                  />
                )}
                {previewError && (
                  <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-xs text-rose-400">Fayl yoki havolani ochib boʻlmadi. Toʻgʻri fayl yoki URL kiritilganiga ishonch hosil qiling.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <div>
            {defaultMediaUrl && (
              <button
                type="button"
                onClick={handleResetToDefault}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Asl rasmni tiklash
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="button"
              disabled={!url.trim() || isProcessing}
              onClick={handleApply}
              className="flex items-center gap-2 px-5 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              Slaydga Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
