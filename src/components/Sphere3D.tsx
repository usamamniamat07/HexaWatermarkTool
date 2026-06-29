import React from 'react';
import { motion } from 'motion/react';

export default function Sphere3D() {
  return (
    <div id="sphere-3d-container" className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center">
      {/* Background Soft Glow */}
      <div 
        id="sphere-bg-glow"
        className="absolute w-72 h-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse"
      />

      {/* Sphere Body with Multiple Layer Rings & Gradients */}
      <div 
        id="sphere-outer"
        className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden flex items-center justify-center shadow-2xl border border-white/10"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(15, 23, 42, 0.95) 70%, rgba(59, 130, 246, 0.5) 100%)',
          boxShadow: '0 0 50px 10px rgba(37, 99, 235, 0.25), inset 0 0 40px rgba(255, 255, 255, 0.25)'
        }}
      >
        {/* Animated Inner Swirling Orbs using CSS animation */}
        <div 
          id="sphere-plasma-1"
          className="absolute inset-0 opacity-75 mix-blend-color-dodge rounded-full animate-[spin_12s_linear_infinite]"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #2563EB, #60A5FA, transparent 60%)',
            filter: 'blur(8px)',
          }}
        />
        
        <div 
          id="sphere-plasma-2"
          className="absolute inset-2 opacity-60 mix-blend-overlay rounded-full animate-[spin_8s_linear_infinite_reverse]"
          style={{
            background: 'conic-gradient(from 120deg, transparent, #3B82F6, #93C5FD, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />

        {/* 3D Wireframe Overlay Layer (CSS Perspective Lines) */}
        <div id="sphere-grid-latitude" className="absolute inset-0 rounded-full border border-white/10 flex flex-col justify-between p-4 pointer-events-none opacity-40">
          <div className="w-full border-t border-white/10 scale-x-50 mx-auto" />
          <div className="w-full border-t border-white/20 scale-x-90" />
          <div className="w-full border-t border-white/20" />
          <div className="w-full border-t border-white/20 scale-x-90" />
          <div className="w-full border-t border-white/10 scale-x-50 mx-auto" />
        </div>
        
        <div id="sphere-grid-longitude" className="absolute inset-0 rounded-full border border-white/15 pointer-events-none opacity-30 flex justify-between p-4">
          <div className="h-full border-l border-white/10 scale-y-50 my-auto" />
          <div className="h-full border-l border-white/20 scale-y-90" />
          <div className="h-full border-l border-white/20" />
          <div className="h-full border-l border-white/20 scale-y-90" />
          <div className="h-full border-l border-white/10 scale-y-50 my-auto" />
        </div>

        {/* Shading Highlights for 3D Spheroid depth */}
        <div 
          id="sphere-highlight"
          className="absolute top-2 left-6 w-24 h-16 bg-white/25 rounded-full blur-md -rotate-12 pointer-events-none"
        />

        {/* Dynamic Light Speckles */}
        <div 
          id="sphere-glint"
          className="absolute top-8 left-12 w-4 h-4 bg-white rounded-full opacity-60 filter blur-[1px] pointer-events-none"
        />
      </div>

      {/* Floating Orbital Particle Mini-Sphere */}
      <motion.div 
        id="sphere-satellite"
        animate={{
          x: [100, -130, 100],
          y: [-40, 50, -40],
          z: [0, 50, 0],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-300 shadow-lg border border-white/20 mix-blend-screen"
        style={{
          boxShadow: '0 0 15px #3B82F6',
        }}
      />

      {/* Second Satellite orbital particle */}
      <motion.div 
        id="sphere-satellite-2"
        animate={{
          x: [-120, 110, -120],
          y: [30, -60, 30],
          scale: [1.1, 0.8, 1.1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 shadow-lg border border-white/20 mix-blend-screen"
        style={{
          boxShadow: '0 0 12px #6366F1',
        }}
      />
    </div>
  );
}
