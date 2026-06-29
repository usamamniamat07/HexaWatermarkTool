import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate a fixed set of particles on load to guarantee hydration consistency
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div id="ambient-background" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Ambient Blur Blobs */}
      <motion.div
        id="blur-blob-blue"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-300/15 dark:bg-blue-600/10 blur-[120px]"
      />
      
      <motion.div
        id="blur-blob-indigo"
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 90, -40, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-300/15 dark:bg-purple-600/10 blur-[130px]"
      />

      <motion.div
        id="blur-blob-cyan"
        animate={{
          x: [0, 50, -60, 0],
          y: [0, 80, -90, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-10 w-[350px] h-[350px] rounded-full bg-cyan-200/10 dark:bg-cyan-600/5 blur-[100px]"
      />

      {/* Floating Sparkles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/25 dark:bg-blue-300/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
          }}
          animate={{
            y: ['0vh', '-100vh'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
