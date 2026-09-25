import React, { useEffect, useRef } from 'react';

export interface BgVideoItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  poster?: string;
  isCustom?: boolean;
}

// 1080p Full HD haqiqiy jonli tabiat videolari (sharshara, o'rmon daryosi va zilol buloq suvi)
export const DEFAULT_BG_VIDEOS: BgVideoItem[] = [
  {
    id: 'waterfall',
    title: 'Muhtasham Zumrad Sharshara',
    subtitle: 'Toshlar uzra shovullab oqayotgan haqiqiy zilol sharshara',
    url: '/videos/nature_waterfall_real.mp4',
    poster: '/videos/nature_waterfall_real_poster.jpg',
  },
  {
    id: 'stream',
    title: 'Zilol Oʻrmon Soyi',
    subtitle: 'Yam-yashil oʻrmondagi toza, shaffof va silliq oqar suv',
    url: '/videos/nature_stream_real.mp4',
    poster: '/videos/nature_stream_real_poster.jpg',
  },
  {
    id: 'forest_river',
    title: 'Musaffo Buloq va Eko-Bogʻ',
    subtitle: 'Mox bosgan toshlar orasidan qaynayotgan billurdek buloq',
    url: '/videos/nature_forest_river_real.mp4',
    poster: '/videos/nature_forest_river_real_poster.jpg',
  },
];

export interface BgVideoSettings {
  enabled: boolean;
  blur: number; // in pixels, default 0 for crystal clear
  dim: number; // in percentage, default 10 for bright open background
  autoCycle: boolean;
  cycleIntervalSec: number; // default 12s
}

export const DEFAULT_BG_SETTINGS: BgVideoSettings = {
  enabled: true,
  blur: 0,
  dim: 10,
  autoCycle: true,
  cycleIntervalSec: 12,
};

interface BackgroundVideoPlayerProps {
  settings: BgVideoSettings;
  videos?: BgVideoItem[];
  currentVideoIndex: number;
  onVideoChange: (index: number) => void;
}

export const BackgroundVideoPlayer: React.FC<BackgroundVideoPlayerProps> = ({
  settings,
  videos = DEFAULT_BG_VIDEOS,
  currentVideoIndex,
  onVideoChange,
}) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Barcha videolarni fon rejimida uzluksiz va ravon ijro qilish
  useEffect(() => {
    if (!settings.enabled) {
      videoRefs.current.forEach((v) => v?.pause());
      return;
    }

    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;
      // Faol video yoki zaxira video har doim uzluksiz ijro holatida bo'lishini ta'minlash
      if (idx === currentVideoIndex) {
        if (videoEl.paused) {
          videoEl.play().catch(() => {});
        }
      }
    });
  }, [currentVideoIndex, settings.enabled, videos]);

  // Video avtomatik ketma-ket almashinuvi (har 12 soniyada silliq erib o'tadi)
  useEffect(() => {
    if (!settings.enabled || !settings.autoCycle || videos.length <= 1) {
      return;
    }

    const intervalMs = Math.max(5, settings.cycleIntervalSec) * 1000;
    const timer = setTimeout(() => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      onVideoChange(nextIndex);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [
    settings.enabled, 
    settings.autoCycle, 
    settings.cycleIntervalSec, 
    currentVideoIndex, 
    videos.length, 
    onVideoChange
  ]);

  if (!settings.enabled) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-slate-950 transition-colors duration-500" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Individual Video Layers with Pure GPU Crossfade */}
      {videos.map((item, index) => {
        const isActive = index === currentVideoIndex;
        const isVideo = item.url.endsWith('.mp4') || item.url.endsWith('.webm') || (item.url.startsWith('blob:') && !item.poster);

        return (
          <div
            key={item.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              filter: settings.blur > 0 ? `blur(${settings.blur}px)` : 'none',
              transform: 'none',
            }}
          >
            {isVideo ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={item.url}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  // Instant playback once video data is buffered
                  const vid = e.currentTarget;
                  if (settings.enabled && vid.paused && index === currentVideoIndex) {
                    vid.play().catch(() => {});
                  }
                }}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={item.poster || item.url}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            )}
          </div>
        );
      })}

      {/* Dimmer overlay for text readability without darkening the vibrant scene */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 bg-slate-950 pointer-events-none z-20"
        style={{
          opacity: Math.max(0, settings.dim) / 100,
        }}
      />
    </div>
  );
};
