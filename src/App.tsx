import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, Image as ImageIcon, RotateCw, Eye, Download, Sparkles, 
  Trash2, Sliders, ArrowRight, ShieldCheck, Zap, Lock, Smartphone, 
  Award, HelpCircle, Menu, X, Facebook, Instagram, Linkedin, Github, 
  Twitter, Code, CheckCircle, Scale, Info, Layers, Compass, LayoutGrid
} from 'lucide-react';

import { PageId } from './types';
import Sphere3D from './components/Sphere3D';
import BackgroundParticles from './components/BackgroundParticles';
import WatermarkEditor from './components/WatermarkEditor';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import DisclaimerPage from './components/DisclaimerPage';
import SEOContent from './components/SEOContent';
import FAQSection from './components/FAQSection';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reference to jump straight to editor when CTA clicked
  const editorSectionRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position for dynamic dark mode transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Is Dark Mode active based on scrolling towards bottom of home page
  // Limit transition point to 35% scroll for home page so it smoothly shifts over a natural zone.
  const isDark = currentPage === 'home' ? scrollPercent > 0.35 : true; // Keep other technical details pages dark by default for a pristine consistent high-end UI

  // Smooth scroll helper
  const scrollToEditor = () => {
    setCurrentPage('home');
    setTimeout(() => {
      editorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Nav page helper
  const navigateToPage = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Inject structured JSON-LD SEO Schema on page mount
  useEffect(() => {
    const existingScript = window.document.getElementById('hexa-seo-schema');
    if (!existingScript) {
      const script = window.document.createElement('script');
      script.id = 'hexa-seo-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Hexa Watermark Adder",
        "alternateName": "Free Watermark Adder Online",
        "url": "https://hexawatermark.com",
        "description": "Add professional text and image watermarks to your photos instantly using our free online Watermark Adder. Fast, secure, and fully browser-based.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires Modern Web Browser with HTML5 Canvas",
        "features": [
          "Add Text Watermark with premium fonts",
          "Add logo image overlay with rotation",
          "Adjust watermark transparency layer",
          "Drag and drop visually to reposition",
          "Download HD quality lossless results"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      });
      window.document.head.appendChild(script);
    }
  }, []);

  return (
    <div 
      className={`min-h-screen font-sans mode-transition-all relative overflow-x-hidden ${isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-white text-slate-900'}`}
      style={{
        transition: 'background-color 1.2s cubic-bezier(0.25, 1, 0.5, 1), color 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
      }}
    >
      {/* Elegant Radial glowing blobs from Sleek Interface Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]" 
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]" 
          style={{ background: 'radial-gradient(circle, #0F172A 0%, transparent 70%)' }}
        />
      </div>

      {/* Dynamic Moving Background Blobs and Floating Dust Particles */}
      <BackgroundParticles />

      {/* Header element */}
      <header 
        className={`sticky top-0 z-50 backdrop-blur-md border-b mode-transition-all h-20 flex items-center ${isDark ? 'bg-[#0b0f19]/80 border-slate-900/60' : 'bg-white/50 border-slate-100 backdrop-blur-md'}`}
        style={{ transition: 'background-color 1.5s, border-color 1.5s' }}
      >
        <div className="w-full max-w-7xl mx-auto px-12 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => navigateToPage('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Geometric Custom SVG Hexagon Logo */}
            <div className={`w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 ${isDark ? 'shadow-blue-500/20' : 'shadow-blue-200'}`}>
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-current stroke-[7]" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
                <path d="M50 30 V70 M30 50 H70" className="stroke-[8]" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
                Hexa<span className="text-blue-600 dark:text-blue-400">Watermark</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-widest leading-none mt-0.5">
                SECURE IMAGING
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Nodes */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold select-none">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'disclaimer', label: 'Disclaimer' }
            ].map((link) => {
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateToPage(link.id as PageId)}
                  className={`relative py-1.5 transition-colors cursor-pointer text-sm font-semibold ${
                    active 
                      ? 'text-blue-600 dark:text-blue-450 font-bold' 
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                  {/* Premium animated sliding underline indicator */}
                  {active && (
                    <motion.div 
                      layoutId="nav-underline" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-450 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side workbench button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={scrollToEditor}
              className={`px-6 py-2.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 text-sm font-bold rounded-full shadow-md hover:-translate-y-0.5 transition-all cursor-pointer`}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburguer trigger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b z-40 relative mode-transition-all ${isDark ? 'bg-[#0f172a] border-slate-900/80 text-white' : 'bg-white border-slate-100 text-slate-900'}`}
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'privacy', label: 'Privacy Policy' },
                { id: 'disclaimer', label: 'Disclaimer' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateToPage(link.id as PageId)}
                  className={`text-left text-base py-2 px-3 rounded-xl font-bold transition-colors cursor-pointer ${
                    currentPage === link.id 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={scrollToEditor}
                className="w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg cursor-pointer"
              >
                Start Adding Watermark
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pages router framework */}
      <main className="relative min-h-[calc(100vh-160px)] z-10">
        
        {currentPage === 'home' ? (
          <div>
            
            {/* Dynamic visual indicator warning dark mode transition on home */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-20 pointer-events-none tracking-widest uppercase">
              Scroll down to transition to Dark Mode ({Math.floor(scrollPercent * 100)}%)
            </div>

            {/* Impressive Hero Section */}
            <section id="hero-section" className="max-w-7xl mx-auto px-12 py-16 md:py-20 grid md:grid-cols-12 gap-12 items-center">
              
              {/* Left Column texts & actions */}
              <div className="md:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  #1 Free Watermark Adder
                </div>

                <h1 className="text-5xl sm:text-6xl font-black leading-none tracking-tighter text-slate-900 dark:text-white">
                  Free Watermark <br />
                  <span className="text-blue-600 dark:text-blue-400">Adder Online.</span>
                </h1>

                <p className="text-lg text-slate-500 dark:text-slate-300 max-w-lg leading-relaxed font-sans">
                  Add professional text and image watermarks to your photos instantly. Fast, secure, and responsive. No registration required.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  {/* Primary Call to Action Start editor */}
                  <button
                    onClick={scrollToEditor}
                    className={`px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-base font-bold transition-transform hover:scale-105 active:scale-95 duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl ${isDark ? 'shadow-blue-500/10' : 'shadow-blue-200'}`}
                  >
                    Start Adding Watermark
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      const featuresSection = window.document.getElementById('features-section');
                      featuresSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl text-base font-bold transition-transform hover:scale-105 duration-300 cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>

                {/* Micro metrics highlight */}
                <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-100 dark:border-slate-900 max-w-md">
                  <div>
                    <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 leading-none">100%</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-505 font-bold uppercase mt-1 block tracking-wider">Local Secure</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 leading-none">Zero</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-505 font-bold uppercase mt-1 block tracking-wider">Registry Fee</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 leading-none">Lossless</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-505 font-bold uppercase mt-1 block tracking-wider">HD Export</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Rotating Sphere */}
              <div className="md:col-span-5 flex justify-center items-center">
                <Sphere3D />
              </div>

            </section>

            {/* Core Interactive Editor Section Container */}
            <section 
              id="editor-workspace-section" 
              ref={editorSectionRef}
              className={`py-16 border-y mode-transition-all scroll-mt-24 ${isDark ? 'bg-slate-950/30 border-slate-900/50' : 'bg-gray-50/50 border-gray-100'}`}
            >
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                    Interactive Workbench
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mt-4">
                    Apply Professional Seals Instantly
                  </h2>
                </div>

                {/* Embedded Fully Interactive Watermark Adder Workbench */}
                <WatermarkEditor />
              </div>
            </section>

            {/* 1. Features Grid Section */}
            <section id="features-section" className="max-w-7xl mx-auto px-4 py-20">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  Feature Set
                </span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-4">
                  Everything You Need to Claim Ownership
                </h2>
                <p className="text-lg text-gray-500 dark:text-slate-400 font-sans">
                  Hexa pairs high performance matrix computing with easy to use configuration toggles.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Type className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Add Text Watermark",
                    desc: "Inject smart copyright notices, timestamps, signature texts or creator brand tags instantly."
                  },
                  {
                    icon: <ImageIcon className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Add Image Logo Watermark",
                    desc: "Overlay custom transparent branding logos, sub-icons, vector templates or signatures safely."
                  },
                  {
                    icon: <Compass className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Rotate Watermark",
                    desc: "Dial in any rotation swing values from -180° to 180° to align with visual perspective planes perfectly."
                  },
                  {
                    icon: <Layers className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Change Opacity",
                    desc: "Achieve the ultimate premium balance by adjusting transparency layers from solid to light seals."
                  },
                  {
                    icon: <Sliders className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Change Font Size",
                    desc: "Dynamically adjust font size scale parameters to maintain proportional balance on micro or macro assets."
                  },
                  {
                    icon: <ArrowRight className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Custom Position",
                    desc: "Position via touch/mouse dragging directly or enter pixel-precision X and Y coordinate percentage guides."
                  },
                  {
                    icon: <Download className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Download HD Image",
                    desc: "Synthesis compiles raw images in memory, exporting maximum lossless high definition resolution."
                  },
                  {
                    icon: <Zap className="text-blue-600 dark:text-blue-400" size={24} />,
                    title: "Fast Processing",
                    desc: "Client-side pipeline compiles huge canvases in milliseconds without uploading overhead."
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 space-y-3 shadow-none hover:shadow-lg transition-all duration-300 flex flex-col text-left group"
                  >
                    <div className="w-10 h-10 bg-white dark:bg-slate-950 rounded-xl shadow-sm flex items-center justify-center text-blue-600 dark:text-blue-450 font-bold group-hover:scale-105 transition-transform shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. How It Works Section */}
            <section id="how-it-works" className={`py-20 border-y mode-transition-all ${isDark ? 'bg-slate-950/20 border-slate-900/40' : 'bg-gray-50/30 border-gray-100'}`}>
              <div className="max-w-7xl mx-auto px-4">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                    Operation Steps
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-4">
                    Securing Images is Just a Minutes Matter
                  </h2>
                  <p className="text-lg text-gray-500 dark:text-slate-400 font-sans">
                    Simple, straightforward operations flow. No registration required.
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                  
                  {/* Step Item 1 */}
                  <div className="text-center space-y-4 relative">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-blue-500/20 relative z-10">
                      1
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Upload Image</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Choose, drag or dropshoot any photography layout directly to our target workbench.
                    </p>
                  </div>

                  {/* Step Item 2 */}
                  <div className="text-center space-y-4 relative">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-blue-500/20 relative z-10">
                      2
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Customize Seal</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Pick font colors, adjust spacing width scale, type credits, or upload brand vectors.
                    </p>
                  </div>

                  {/* Step Item 3 */}
                  <div className="text-center space-y-4 relative">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-blue-500/20 relative z-10">
                      3
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Live Preview</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Drag position visually and preview exactly how components blend onto your photograph.
                    </p>
                  </div>

                  {/* Step Item 4 */}
                  <div className="text-center space-y-4 relative">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-blue-500/20 relative z-10">
                      4
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Secure HD Download</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Synthesis engine compiles layers, and triggers immediate download sequence.
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* 3. Why Choose Us Section */}
            <section id="why-choose-us" className="max-w-7xl mx-auto px-12 py-20">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  Core Advantages
                </span>
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mt-4 mb-4">
                  Why Digital Artists Rely on Hexa
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-sans">
                  The ideal synergy of local confidentiality and robust layout processing.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                
                <div className="p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 text-left space-y-4 shadow-none hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 dark:text-blue-450 border border-slate-100 dark:border-slate-800 shadow-sm font-bold shrink-0">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free Forever</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    No subscriptions, pricing scales, trial expirations, or watermark insertions of our own. It is completely public and zero charge.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 text-left space-y-4 shadow-none hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 dark:text-blue-450 border border-slate-100 dark:border-slate-800 shadow-sm font-bold shrink-0">
                    <Lock size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Registration</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Skip logging sequences, password management setup, or email disclosure trackers. Protect and save instantly.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 text-left space-y-4 shadow-none hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 dark:text-blue-450 border border-slate-100 dark:border-slate-800 shadow-sm font-bold shrink-0">
                    <Zap size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fast Processing</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    By bypassing server uploading workflows, processing compiles locally in raw memory, reducing timing coordinates under 150ms.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 text-left space-y-4 shadow-none hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 dark:text-blue-450 border border-slate-100 dark:border-slate-800 shadow-sm font-bold shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Absolute Security</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Zero image file telemetry leaves your physical device browser sandbox, protecting designs from corporate scraping.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 text-left space-y-4 shadow-none hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 dark:text-blue-450 border border-slate-100 dark:border-slate-800 shadow-sm font-bold shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Mobile Friendly</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Engineered with responsive canvas targets, enabling tap touch drag and responsive adjustments right in your mobile pocket browser.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 text-left space-y-4 shadow-none hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 dark:text-blue-450 border border-slate-100 dark:border-slate-800 shadow-sm font-bold shrink-0">
                    <LayoutGrid size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">High Quality Output</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Original EXIF metadata properties and native photographic resolutions are fully preserved across compiled layout formats.
                  </p>
                </div>

              </div>
            </section>

            {/* 4. SEO optimized guide article section */}
            <section id="seo-content" className={`border-y mode-transition-all ${isDark ? 'bg-slate-950/25 border-slate-900/60' : 'bg-gray-50/40 border-gray-100'}`}>
              <SEOContent onNavigate={navigateToPage} />
            </section>

            {/* 5. Frequently Asked Questions accordion */}
            <FAQSection />

            {/* 6. Ultimate Call To Action banner */}
            <section id="banner-cta" className="max-w-6xl mx-auto px-4 py-16 text-center">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-x-20 -translate-y-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl -translate-x-20 translate-y-20 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight">
                    Protect Your Images Today
                  </h2>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Claim your visual copy credit guidelines instantly. High performance, zero wait, and local confidentiality. Guaranteed.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={scrollToEditor}
                      className="px-8 py-4 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
                    >
                      Start Free
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        ) : currentPage === 'about' ? (
          <AboutPage onStartEditor={scrollToEditor} />
        ) : currentPage === 'contact' ? (
          <ContactPage />
        ) : currentPage === 'privacy' ? (
          <PrivacyPage />
        ) : (
          <DisclaimerPage />
        )}

      </main>

      {/* Consistent Professional Footer */}
      <footer 
        className={`border-t py-12 px-4 mode-transition-all relative z-10 ${isDark ? 'bg-slate-950/90 border-slate-900/60 text-slate-400' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
        style={{ transition: 'background-color 1s, border-color 1s' }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          
          {/* Logo & disclaimer brief brand */}
          <div className="space-y-4 text-left">
            <div 
              onClick={() => navigateToPage('home')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                H
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Hexa Watermark</span>
            </div>
            <p className="text-xs leading-relaxed">
              Hexa is a professional free watermark adder protecting photographers, artists and designers from image harvesting scraping. 100% Secure local operations sandbox.
            </p>
            <div className="font-mono text-[10px] text-gray-400 dark:text-slate-600">
              © 2026 Hexa Watermark Adder.
            </div>
          </div>

          {/* Quick links block */}
          <div className="text-left">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'privacy', label: 'Privacy Policy' },
                { id: 'disclaimer', label: 'Disclaimer' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateToPage(link.id as PageId)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase font-mono tracking-wider text-[11px] cursor-pointer block"
                    style={{ textAlign: 'left' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Guidelines features list */}
          <div className="text-left">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4">Core Utilities</h3>
            <ul className="space-y-2 text-xs">
              <li>Free Watermark Adder</li>
              <li>Add Watermark to Images</li>
              <li>Text Watermark Maker</li>
              <li>Image Logo Overlay Maker</li>
              <li>HD Image Synthesis</li>
            </ul>
          </div>

          {/* Social media connections */}
          <div className="text-left space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-1">Developer Links</h3>
            <p className="text-xs">Follow us on social channels to retrieve latest releases and API developments.</p>
            
            <div className="flex items-center gap-3">
              <a 
                href="#facebook" 
                aria-label="Facebook Link"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#twitter" 
                aria-label="X Twitter Link"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-900 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(15,23,42,0.4)] cursor-pointer"
              >
                <Twitter size={15} />
              </a>
              <a 
                href="#instagram" 
                aria-label="Instagram Link"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(219,39,119,0.4)] cursor-pointer"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#linkedin" 
                aria-label="LinkedIn Link"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-900 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(29,78,216,0.4)] cursor-pointer"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="#github" 
                aria-label="GitHub Link"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-900 flex items-center justify-center hover:bg-neutral-800 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(38,38,38,0.4)] cursor-pointer"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Core disclaimer note */}
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-100 dark:border-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>
            Hexa Watermark Adder operates completely client-side in our public sandboxed environment. Image processing occurs strictly in local buffers.
          </span>
          <div className="flex gap-4">
            <button onClick={() => navigateToPage('privacy')} className="hover:underline cursor-pointer">Privacy Policies</button>
            <span>•</span>
            <button onClick={() => navigateToPage('disclaimer')} className="hover:underline cursor-pointer">Disclaimers & Terms</button>
          </div>
        </div>

      </footer>
    </div>
  );
}
