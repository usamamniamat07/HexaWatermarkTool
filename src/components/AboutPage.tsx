import React from 'react';
import { Shield, Sparkles, Image as ImageIcon, Zap, Monitor, Lock } from 'lucide-react';

interface AboutPageProps {
  onStartEditor: () => void;
}

export default function AboutPage({ onStartEditor }: AboutPageProps) {
  return (
    <div id="about-section-container" className="max-w-5xl mx-auto px-4 py-16 relative z-10 transition-colors duration-1000">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
          About Our Platform
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-6">
          Securing Your Creative Assets Seamlessly
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-300">
          Hexa Watermark Adder was born out of a simple need: to provide professional photographers, designers, and e-commerce creators with an instant, local-first safety tool that never sacrifices data integrity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Intellectual Property Protection for the Modern Developer & Creator
          </h2>
          <p className="text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">
            Every image uploaded to Hexa Watermark Adder is processed as a client-side execution block. Your photos never leave your device, meaning maximum compliance with data hosting and zero bandwidth overhead. By integrating direct HTML5 Canvas compilation, high-definition previews are composited at native resolution.
          </p>
          <p className="text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">
            Whether you need signature font watermarks, subtle opaque gray seals, or floating company banners, Hexa gives you the control you need to ward off reverse-image harvesting scripts and uncredited social republishing.
          </p>
          <button
            onClick={onStartEditor}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Start Protecting Now
          </button>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl">
          <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-6 flex items-center gap-2">
            <Shield className="text-blue-600" />
            Core Values & Standards
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Lock size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Absolute Privacy</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">No database stores or records your images. Processing compiles locally inside your Google Chrome, Safari, or Firefox runtime environment.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Zap size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Blazing Core Processing</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">Engineered with low-overhead visual matrix layers, compiling huge 4K file canvases under 150 milliseconds.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Precision Customization</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">Control positioning, custom rotations, opacity layers, background paddings, colors, and premium font structures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
