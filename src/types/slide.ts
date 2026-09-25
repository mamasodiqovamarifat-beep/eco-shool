export type MediaType = 'image' | 'video';

export interface SlideMedia {
  type: MediaType;
  url: string;
  caption?: string;
  alt?: string;
  blobId?: string; // If stored in IndexedDB
}

export interface SlideStat {
  label: string;
  value: string;
  detail?: string;
}

export interface ActionItem {
  id: string;
  task: string;
  responsible?: string;
  status: 'bajarildi' | 'jarayonda' | 'rejalashtirilgan';
}

export type SlideLayout = 
  | 'title' 
  | 'standard' 
  | 'split-media' 
  | 'three-col' 
  | 'checklist' 
  | 'quote' 
  | 'roadmap';

export interface Slide {
  id: string;
  stepNumber: number; // 0: Kirish, 1-7: Eko-qadamlar, 8: Yutuqlar & Xulosa
  stepBadge: string;  // e.g. "1-QADAM: EKO-QO'MITA"
  title: string;
  subtitle: string;
  description?: string;
  bulletPoints: string[];
  media: SlideMedia;
  stats?: SlideStat[];
  actionItems?: ActionItem[];
  speakerNotes?: string;
  theme?: 'emerald' | 'teal' | 'slate' | 'amber';
  layout?: SlideLayout;
}

export interface PresentationData {
  id: string;
  title: string;
  schoolName: string;
  academicYear: string;
  updatedAt: string;
  slides: Slide[];
}
