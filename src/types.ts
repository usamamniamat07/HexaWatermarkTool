export type PageId = 'home' | 'editor' | 'about' | 'contact' | 'privacy' | 'disclaimer';

export interface WatermarkSettings {
  type: 'text' | 'image';
  text: string;
  fontFamily: string;
  fontSize: number; // in px on the reference size
  color: string;
  opacity: number; // 0 to 1
  rotation: number; // -180 to 180 degrees
  positionX: number; // percentage 0 to 100
  positionY: number; // percentage 0 to 100
  imageScale: number; // percentage / multiplier
  imageSrc: string | null; // Data URL for the custom logo
  useBackground: boolean;
  backgroundColor: string;
  backgroundPadding: number;
}
