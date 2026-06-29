import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Type, Image as ImageIcon, Trash2, Download, RotateCcw, 
  Sliders, Settings, GripHorizontal, Palette, LayoutGrid, Check, Info, ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WatermarkSettings } from '../types';

interface WatermarkEditorProps {
  onImageProcessed?: () => void;
}

export default function WatermarkEditor({ onImageProcessed }: WatermarkEditorProps) {
  // Original uploaded image
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Editor settings
  const [settings, setSettings] = useState<WatermarkSettings>({
    type: 'text',
    text: '© Hexa Watermark',
    fontFamily: 'Space Grotesk',
    fontSize: 24, // Visual size in preview, will scale in HD canvas
    color: '#ffffff',
    opacity: 0.7,
    rotation: 0,
    positionX: 50, // 0 to 100 percentage
    positionY: 85, // 0 to 100 percentage
    imageScale: 20, // percentage of background width
    imageSrc: null,
    useBackground: false,
    backgroundColor: '#000000',
    backgroundPadding: 10,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoNaturalSize, setLogoNaturalSize] = useState({ width: 0, height: 0 });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  // Supported fonts list
  const fonts = [
    { name: 'Sans (Inter)', value: 'Inter, system-ui, sans-serif' },
    { name: 'Display (Space Grotesk)', value: '"Space Grotesk", sans-serif' },
    { name: 'Mono (JetBrains)', value: '"JetBrains Mono", monospace' },
    { name: 'Serif (Playfair)', value: '"Playfair Display", serif' },
    { name: 'Casual Signature', value: '"Caveat", "Great Vibes", cursive' },
  ];

  // Preset Colors
  const colors = [
    '#ffffff', '#000000', '#2563EB', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'
  ];

  // Load standard cursor location changes on drag
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!previewContainerRef.current || !watermarkRef.current) return;
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const watermarkRect = watermarkRef.current.getBoundingClientRect();
    const containerRect = previewContainerRef.current.getBoundingClientRect();

    // Store offset inside the watermark clicked block
    dragStartOffset.current = {
      x: clientX - (watermarkRect.left + watermarkRect.width / 2),
      y: clientY - (watermarkRect.top + watermarkRect.height / 2),
    };

    e.preventDefault();
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !previewContainerRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const containerRect = previewContainerRef.current.getBoundingClientRect();

    // Calculate requested new position coordinates relative to background image block
    const calculatedX = clientX - containerRect.left - dragStartOffset.current.x;
    const calculatedY = clientY - containerRect.top - dragStartOffset.current.y;

    // Convert to percentages
    let pctX = (calculatedX / containerRect.width) * 100;
    let pctY = (calculatedY / containerRect.height) * 100;

    // Clamp to boundaries
    pctX = Math.max(0, Math.min(100, pctX));
    pctY = Math.max(0, Math.min(100, pctY));

    setSettings(prev => ({
      ...prev,
      positionX: Math.round(pctX * 10) / 10,
      positionY: Math.round(pctY * 10) / 10,
    }));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  // Handle Photo input load
  const handlePhotoUpload = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);

      // Extract raw measurements
      const img = window.document.createElement('img');
      img.onload = () => {
        setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag over background upload container
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle Logo uploading
  const handleLogoUpload = (file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setSettings(prev => ({ ...prev, imageSrc: src }));

      const img = window.document.createElement('img');
      img.onload = () => {
        setLogoNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Corner Presets mapping
  const applyPresetPosition = (preset: 'tl' | 'tr' | 'center' | 'bl' | 'br') => {
    switch (preset) {
      case 'tl':
        setSettings(prev => ({ ...prev, positionX: 10, positionY: 10 }));
        break;
      case 'tr':
        setSettings(prev => ({ ...prev, positionX: 90, positionY: 10 }));
        break;
      case 'center':
        setSettings(prev => ({ ...prev, positionX: 50, positionY: 50 }));
        break;
      case 'bl':
        setSettings(prev => ({ ...prev, positionX: 10, positionY: 90 }));
        break;
      case 'br':
        setSettings(prev => ({ ...prev, positionX: 90, positionY: 90 }));
        break;
    }
  };

  // Reset function
  const handleReset = () => {
    setImageSrc(null);
    setImageFile(null);
    setLogoFile(null);
    setNaturalSize({ width: 0, height: 0 });
    setSettings({
      type: 'text',
      text: '© Hexa Watermark',
      fontFamily: 'Space Grotesk',
      fontSize: 24,
      color: '#ffffff',
      opacity: 0.7,
      rotation: 0,
      positionX: 50,
      positionY: 85,
      imageScale: 20,
      imageSrc: null,
      useBackground: false,
      backgroundColor: '#000000',
      backgroundPadding: 12,
    });
  };

  // Render original high quality image inside HTML5 Canvas element
  const handleDownload = async () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    try {
      // Create offscreen canvas
      const canvas = window.document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Could not create 2D canvas context');

      // Set dimension to raw natural size
      canvas.width = naturalSize.width;
      canvas.height = naturalSize.height;

      // Draw background
      const bgImg = await loadImage(imageSrc);
      ctx.drawImage(bgImg, 0, 0);

      // Compute visual coordinates translated to native pixels
      const absX = (settings.positionX / 100) * naturalSize.width;
      const absY = (settings.positionY / 100) * naturalSize.height;

      // Save context
      ctx.save();
      ctx.translate(absX, absY);
      ctx.rotate((settings.rotation * Math.PI) / 180);
      ctx.globalAlpha = settings.opacity;

      if (settings.type === 'text') {
        // Calculate font size proportional to natural image width compared to preview size state.
        // Let's assume a baseline width preview of 500px, so we scale visual font appropriately:
        const previewWidth = previewContainerRef.current?.getBoundingClientRect().width || 500;
        const fontScaleFactor = naturalSize.width / previewWidth;
        const nativeFontSize = settings.fontSize * fontScaleFactor;

        // Custom Font setup for drawing
        ctx.font = `500 ${nativeFontSize}px ${settings.fontFamily}`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        const textWidth = ctx.measureText(settings.text).width;
        const textHeight = nativeFontSize; // Approx height

        // Draw solid background badge if enabled
        if (settings.useBackground) {
          const padding = settings.backgroundPadding * fontScaleFactor;
          ctx.fillStyle = settings.backgroundColor;
          
          // Draw simple solid rounded background rect
          const rectWidth = textWidth + padding * 2;
          const rectHeight = textHeight + padding * 1.5;
          ctx.beginPath();
          ctx.roundRect
            ? ctx.roundRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight, padding / 2)
            : ctx.rect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
          ctx.fill();
        }

        // Draw text
        ctx.fillStyle = settings.color;
        // Text is drawn centering vertical and horizontal
        ctx.fillText(settings.text, 0, 0);

      } else if (settings.type === 'image' && settings.imageSrc) {
        const logoImg = await loadImage(settings.imageSrc);
        
        // Size proportional to background canvas width
        const ratio = logoNaturalSize.height / logoNaturalSize.width;
        const w = (settings.imageScale / 100) * naturalSize.width;
        const h = w * ratio;

        ctx.drawImage(logoImg, -w / 2, -h / 2, w, h);
      }

      ctx.restore();

      // Trigger high definition download
      const format = imageFile?.type || 'image/jpeg';
      const fileExtension = format.split('/')[1] || 'jpg';
      const outputDataUrl = canvas.toDataURL(format, 1.0);

      const link = window.document.createElement('a');
      link.download = `watermarked_${Date.now()}.${fileExtension}`;
      link.href = outputDataUrl;
      link.click();

      // Trigger feedback toast
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);

      if (onImageProcessed) {
        onImageProcessed();
      }

    } catch (err) {
      console.error("HD synthesis failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper async loaded image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  };

  return (
    <div id="editor-workspace" className="grid lg:grid-cols-12 gap-8 items-start relative z-10 font-sans max-w-7xl mx-auto px-4 py-8">
      
      {/* Visual Display Workbench (Left Column) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        
        {!imageSrc ? (
          /* Blank Upload Dropzone */
          <div 
            id="upload-dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50/40 dark:bg-slate-900/30 backdrop-blur-md rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col items-center justify-center min-h-[465px]"
          >
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-md border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform shrink-0">
              <Upload size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Your Image</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              Drag and drop your photography here or click to browse local files. Supports high resolution PNG, JPG, JPEG, and WebP.
            </p>
            <div className="flex gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">PNG</span>
              <span className="text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">JPEG</span>
              <span className="text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">WebP</span>
            </div>
            
            <input 
              id="file-photo-upload"
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handlePhotoUpload(e.target.files[0]);
                }
              }}
              className="hidden" 
            />
          </div>
        ) : (
          /* Active Image Editing Workbench Preview */
          <div className="flex flex-col gap-4">
            
            {/* Header controls inside active workbench */}
            <div id="workbench-active-header" className="flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-3xl border border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-3">
                <div className="py-1 px-2.5 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 font-mono text-xs rounded-full font-semibold">
                  Preview Active
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {naturalSize.width} × {naturalSize.height} px
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 text-red-650 dark:text-red-400 rounded-full text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                >
                  <Trash2 size={13} />
                  Change Image
                </button>
              </div>
            </div>

            {/* Main Interactive Canvas Area */}
            <div 
              id="preview-viewport-box"
              className="relative overflow-hidden bg-slate-100/50 dark:bg-slate-950/45 rounded-3xl border border-slate-200 dark:border-slate-850 p-4 flex items-center justify-center min-h-[460px] max-h-[640px] select-none"
            >
              {/* Inner container sized by image */}
              <div 
                id="preview-scaled-canvas"
                ref={previewContainerRef}
                className="relative shadow-xl overflow-hidden cursor-crosshair max-w-full"
                style={{
                  lineHeight: 0,
                  transform: 'translate3d(0,0,0)',
                }}
              >
                {/* Background Image asset */}
                <img 
                  id="target-background-image"
                  src={imageSrc} 
                  alt="Source asset watermark preview" 
                  className="max-h-[500px] object-contain rounded-lg select-none pointer-events-none"
                  draggable={false}
                />

                {/* Draggable Watermark Node Overlay */}
                <div 
                  id="draggable-watermark-overlay"
                  ref={watermarkRef}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  className={`absolute group cursor-grab active:cursor-grabbing origin-center select-none ${isDragging ? 'ring-2 ring-blue-500 border-none' : ''}`}
                  style={{
                    left: `${settings.positionX}%`,
                    top: `${settings.positionY}%`,
                    transform: `translate(-50%, -50%) rotate(${settings.rotation}deg)`,
                    opacity: settings.opacity,
                    // Handle dynamic dimensions for logo vs text
                    width: settings.type === 'image' ? `${settings.imageScale}%` : 'auto',
                    whiteSpace: 'nowrap',
                    padding: settings.type === 'text' && settings.useBackground ? `${settings.backgroundPadding}px` : '0px',
                    backgroundColor: settings.type === 'text' && settings.useBackground ? settings.backgroundColor : 'transparent',
                    borderRadius: settings.useBackground ? `${settings.backgroundPadding / 2}px` : '0px'
                  }}
                >
                  {/* Small alignment handle box shown when dragging */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripHorizontal size={10} />
                  </div>

                  {settings.type === 'text' ? (
                    <span 
                      id="rendering-text-node"
                      style={{
                        fontFamily: settings.fontFamily,
                        fontSize: `${settings.fontSize}px`,
                        color: settings.color,
                        fontWeight: 500,
                        display: 'inline-block',
                        lineHeight: 1.1,
                      }}
                    >
                      {settings.text || 'Enter signature text...'}
                    </span>
                  ) : (
                    /* Image logo overlay inside canvas preview */
                    settings.imageSrc ? (
                      <img 
                        id="rendering-logo-node"
                        src={settings.imageSrc} 
                        alt="Logo watermark watermark preview" 
                        className="w-full h-auto select-none pointer-events-none"
                        style={{ display: 'block' }}
                        draggable={false}
                      />
                    ) : (
                      <div className="px-4 py-2 bg-black/80 text-white text-xs border border-dashed rounded-lg font-semibold">
                        No logo loaded
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Quick Presets Corners & Details */}
            <div id="quick-preset-alignment" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-3xl border border-slate-100 dark:border-slate-850 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <LayoutGrid size={14} />
                Quick Corner Safe Zones:
              </span>
              <div className="flex flex-wrap gap-1">
                <button 
                  type="button" 
                  onClick={() => applyPresetPosition('tl')}
                  className="px-3 py-1.5 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-705 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-full transition-transform hover:scale-105 cursor-pointer font-medium"
                >
                  Top Left
                </button>
                <button 
                  type="button" 
                  onClick={() => applyPresetPosition('tr')}
                  className="px-3 py-1.5 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-705 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-full transition-transform hover:scale-105 cursor-pointer font-medium"
                >
                  Top Right
                </button>
                <button 
                  type="button" 
                  onClick={() => applyPresetPosition('center')}
                  className="px-3 py-1.5 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-705 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-full transition-transform hover:scale-105 cursor-pointer font-medium"
                >
                  Center
                </button>
                <button 
                  type="button" 
                  onClick={() => applyPresetPosition('bl')}
                  className="px-3 py-1.5 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-705 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-full transition-transform hover:scale-105 cursor-pointer font-medium"
                >
                  Bottom Left
                </button>
                <button 
                  type="button" 
                  onClick={() => applyPresetPosition('br')}
                  className="px-3 py-1.5 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 rounded-full transition-transform hover:scale-105 cursor-pointer font-bold"
                >
                  Bottom Right (Default)
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Editor Control Sidemenu (Right Column) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Primary Download HD Trigger Card */}
        {imageSrc && (
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-2xl shadow-xl transition-all">
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              <Download size={20} />
              HD Processing Engine
            </h3>
            <p className="text-blue-100 text-xs mb-4">
              We compile coordinates directly onto raw pixels, maintaining native 100% photo resolution. No server exposure.
            </p>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isProcessing}
              className={`w-full py-3.5 px-4 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                  Generating HD Asset...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download HD Image
                </>
              )}
            </button>

            {/* Success Prompt Inside block */}
            <AnimatePresence>
              {downloadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-2 bg-blue-800/60 border border-blue-400/40 p-2.5 rounded-lg text-xs"
                >
                  <Check size={14} className="text-emerald-300 shrink-0" />
                  <span>Success! HD image compiled & saved locally.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Configuration Setup Form */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
          
          <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <Sliders size={18} className="text-blue-600" />
              Settings Panel
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Customize typographies, logo sizes, transparency, background layers and offsets.
            </p>
          </div>

          {!imageSrc ? (
            <div className="py-8 text-center text-gray-400 dark:text-slate-500 text-sm">
              <Info size={32} className="mx-auto mb-2 text-gray-300 dark:text-slate-700" />
              Upload photography file to unlock customizable controls and slider sets.
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
                  Watermark Class
                </label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-slate-950 p-1 rounded-lg border border-gray-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, type: 'text' }))}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${settings.type === 'text' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    <Type size={14} />
                    Custom Text
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, type: 'image' }))}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${settings.type === 'image' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    <ImageIcon size={14} />
                    Brand Logo
                  </button>
                </div>
              </div>

              {/* Text specific parameters */}
              {settings.type === 'text' ? (
                <div className="space-y-4">
                  {/* Text Input */}
                  <div>
                    <label htmlFor="settings-text" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
                      Watermark Caption
                    </label>
                    <input
                      id="settings-text"
                      type="text"
                      value={settings.text}
                      onChange={(e) => setSettings(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="e.g. © 2026 Studio"
                    />
                  </div>

                  {/* Font Family selector */}
                  <div>
                    <label htmlFor="settings-fontFamily" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
                      Typography Line
                    </label>
                    <select
                      id="settings-fontFamily"
                      value={settings.fontFamily}
                      onChange={(e) => setSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {fonts.map((f, i) => (
                        <option key={i} value={f.value}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Font Size slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="settings-fontSize" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                        Size Scale
                      </label>
                      <span className="text-xs font-mono font-semibold text-gray-700 dark:text-slate-300">{settings.fontSize}px</span>
                    </div>
                    <input
                      id="settings-fontSize"
                      type="range"
                      min="10"
                      max="80"
                      value={settings.fontSize}
                      onChange={(e) => setSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                      className="w-full accent-blue-600 h-1 bg-gray-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Color Preset Palette */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
                      Color Tint
                    </label>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {colors.map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSettings(prev => ({ ...prev, color: c }))}
                          aria-label={`Select color ${c}`}
                          className="w-7 h-7 rounded-sm border border-gray-200 dark:border-slate-700 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                          style={{ backgroundColor: c }}
                        >
                          {settings.color.toLowerCase() === c.toLowerCase() && (
                            <Check size={14} className={c.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'} />
                          )}
                        </button>
                      ))}
                      {/* Advanced color picker */}
                      <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-gray-200 dark:border-slate-700 flex items-center justify-center">
                        <label htmlFor="input-color-picker" className="sr-only">Color Picker</label>
                        <input
                          id="input-color-picker"
                          type="color"
                          value={settings.color}
                          onChange={(e) => setSettings(prev => ({ ...prev, color: e.target.value }))}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                        <Palette size={14} className="text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Background filled options */}
                  <div className="border-t border-gray-100 dark:border-slate-800/80 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="toggle-background" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 cursor-pointer">
                        Use Solid Backdrop
                      </label>
                      <input
                        id="toggle-background"
                        type="checkbox"
                        checked={settings.useBackground}
                        onChange={(e) => setSettings(prev => ({ ...prev, useBackground: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                    </div>

                    {settings.useBackground && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3 pt-2"
                      >
                        <div>
                          <label htmlFor="select-bg-color" className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                            Backdrop Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              id="select-bg-color"
                              type="color"
                              value={settings.backgroundColor}
                              onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                              className="w-8 h-8 rounded border dark:border-slate-800 cursor-pointer bg-transparent"
                            />
                            <span className="text-xs text-gray-500 dark:text-slate-400 font-mono">{settings.backgroundColor}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label htmlFor="range-bg-padding" className="text-xs font-medium text-gray-500 dark:text-slate-400">
                              Backdrop Padding
                            </label>
                            <span className="text-xs font-mono text-gray-700 dark:text-slate-300">{settings.backgroundPadding}px</span>
                          </div>
                          <input
                            id="range-bg-padding"
                            type="range"
                            min="4"
                            max="30"
                            value={settings.backgroundPadding}
                            onChange={(e) => setSettings(prev => ({ ...prev, backgroundPadding: parseInt(e.target.value) }))}
                            className="w-full accent-blue-600 h-1 bg-gray-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              ) : (
                /* Brand Logo selection parameters */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
                      Logo Source File
                    </label>
                    <div 
                      onClick={() => logoInputRef.current?.click()}
                      className="border border-dashed border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-xl p-4 text-center cursor-pointer transition-colors"
                    >
                      <ImageIcon size={20} className="mx-auto mb-1 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-slate-300 block">
                        {logoFile ? logoFile.name : 'Choose Logo PNG/JPG'}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">Recommended: Transparent PNG</span>
                    </div>

                    <input 
                      id="input-logo-source"
                      ref={logoInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleLogoUpload(e.target.files[0]);
                        }
                      }}
                      className="hidden" 
                    />
                  </div>

                  {settings.imageSrc && (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label htmlFor="settings-imageScale" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                          Logo Width Scale
                        </label>
                        <span className="text-xs font-mono font-semibold text-gray-700 dark:text-slate-300">{settings.imageScale}%</span>
                      </div>
                      <input
                        id="settings-imageScale"
                        type="range"
                        min="5"
                        max="60"
                        value={settings.imageScale}
                        onChange={(e) => setSettings(prev => ({ ...prev, imageScale: parseInt(e.target.value) }))}
                        className="w-full accent-blue-600 h-1 bg-gray-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Shared Parameters (Rotation, Opacity, Manual Coordinates) */}
              <div className="border-t border-gray-100 dark:border-slate-800/80 pt-4 space-y-4">
                
                {/* Opacity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="shared-opacity" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      Transparency Layer
                    </label>
                    <span className="text-xs font-mono font-semibold text-gray-700 dark:text-slate-300">{Math.round(settings.opacity * 100)}%</span>
                  </div>
                  <input
                    id="shared-opacity"
                    type="range"
                    min="10"
                    max="100"
                    value={settings.opacity * 100}
                    onChange={(e) => setSettings(prev => ({ ...prev, opacity: parseFloat(e.target.value) / 100 }))}
                    className="w-full accent-blue-600 h-1 bg-gray-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Rotation Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="shared-rotation" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      Rotational Swing
                    </label>
                    <span className="text-xs font-mono font-semibold text-gray-700 dark:text-slate-300">{settings.rotation}°</span>
                  </div>
                  <input
                    id="shared-rotation"
                    type="range"
                    min="-180"
                    max="180"
                    value={settings.rotation}
                    onChange={(e) => setSettings(prev => ({ ...prev, rotation: parseInt(e.target.value) }))}
                    className="w-full accent-blue-600 h-1 bg-gray-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Manual X Coordinate Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="shared-positionX" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      Horizontal Position (X)
                    </label>
                    <span className="text-xs font-mono font-semibold text-gray-700 dark:text-slate-300">{settings.positionX}%</span>
                  </div>
                  <input
                    id="shared-positionX"
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={settings.positionX}
                    onChange={(e) => setSettings(prev => ({ ...prev, positionX: parseFloat(e.target.value) }))}
                    className="w-full accent-blue-600 h-1 bg-gray-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Manual Y Coordinate Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="shared-positionY" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      Vertical Position (Y)
                    </label>
                    <span className="text-xs font-mono font-semibold text-gray-700 dark:text-slate-300">{settings.positionY}%</span>
                  </div>
                  <input
                    id="shared-positionY"
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={settings.positionY}
                    onChange={(e) => setSettings(prev => ({ ...prev, positionY: parseFloat(e.target.value) }))}
                    className="w-full accent-blue-600 h-1 bg-gray-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
