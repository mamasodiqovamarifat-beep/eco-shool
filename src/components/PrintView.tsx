import React from 'react';
import { Slide } from '../types/slide';

interface PrintViewProps {
  slides: Slide[];
  schoolName: string;
}

export const PrintView: React.FC<PrintViewProps> = ({ slides, schoolName }) => {
  return (
    <div className="hidden print:block w-full text-black bg-white">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className="print-page w-full p-10 flex flex-col justify-between border-b border-gray-200"
          style={{ height: '100vh', pageBreakAfter: 'always' }}
        >
          {/* Print Header */}
          <div className="flex items-center justify-between border-b border-emerald-700 pb-3 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-800">
                Eco-Schools Oʻzbekiston · {slide.stepBadge}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{slide.title}</h2>
              {slide.subtitle && <p className="text-sm text-gray-600 italic">{slide.subtitle}</p>}
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-gray-500">Slayd {index + 1} / {slides.length}</span>
              <p className="text-xs text-gray-700 font-semibold">{schoolName}</p>
            </div>
          </div>

          {/* Print Content Body */}
          <div className="grid grid-cols-12 gap-6 flex-1 items-center">
            <div className="col-span-7 space-y-4">
              {slide.description && (
                <p className="text-sm text-gray-800 leading-relaxed font-medium">
                  {slide.description}
                </p>
              )}

              <ul className="space-y-2 list-disc list-inside text-sm text-gray-700">
                {slide.bulletPoints.map((point, i) => (
                  <li key={i} className="leading-snug">
                    {point}
                  </li>
                ))}
              </ul>

              {slide.actionItems && slide.actionItems.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase">Harakatlar rejasi:</h4>
                  {slide.actionItems.map((act) => (
                    <div key={act.id} className="text-xs text-gray-700 flex items-center gap-2">
                      <span className="font-mono">[{act.status === 'bajarildi' ? '✓' : ' '}]</span>
                      <span>{act.task}</span>
                      {act.responsible && <span className="text-gray-500">({act.responsible})</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Print Media Slot */}
            <div className="col-span-5 flex flex-col items-center">
              {slide.media.url && slide.media.type !== 'video' ? (
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={slide.media.url}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                  [Video lavha / Rasm]
                </div>
              )}
              {slide.media.caption && (
                <p className="text-[11px] text-gray-500 italic mt-1 text-center">
                  {slide.media.caption}
                </p>
              )}
            </div>
          </div>

          {/* Print Stats Footer */}
          {slide.stats && slide.stats.length > 0 && (
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200 mt-6">
              {slide.stats.map((stat, i) => (
                <div key={i} className="border border-gray-200 p-2.5 rounded bg-gray-50">
                  <div className="text-base font-bold text-emerald-700">{stat.value}</div>
                  <div className="text-xs font-semibold text-gray-800">{stat.label}</div>
                  {stat.detail && <div className="text-[10px] text-gray-500">{stat.detail}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
