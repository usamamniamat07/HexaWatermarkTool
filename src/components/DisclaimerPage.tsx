import React from 'react';
import { AlertTriangle, Hammer, Scale, ShieldCheck } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div id="disclaimer-section-container" className="max-w-4xl mx-auto px-4 py-16 relative z-10 transition-colors duration-1000">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
          Intellectual Policy
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 dark:text-white mt-4 mb-4">
          Disclaimer & Terms
        </h1>
        <p className="text-sm text-gray-500 mb-8 font-sans">
          Last Updated: June 20, 2026
        </p>

        <div className="space-y-8 text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
          
          <section className="border-b border-gray-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-500" />
              1. No Warranty & "As-Is" Service
            </h2>
            <p>
              Hexa Watermark Adder is provided on an **"as-is" and "as available" basis** without representations or warranties of any kind, whether express, statutory, or implied. 
            </p>
            <p className="mt-2">
              We do not warrant that the application will function completely error-free, uninterrupted, or compatible with all web browsers and devices. The speed of client-side canvas generation depends on your native hardware capability (CPU/GPU acceleration).
            </p>
          </section>

          <section className="border-b border-gray-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Hammer size={20} className="text-blue-600" />
              2. Limitation of Liability
            </h2>
            <p>
              In no event shall Hexa, its authors, partners, or developers be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, loss of graphics, creative copyright infringements, system crashes, data corruption, or operational delays) arising in any way out of the use of this custom canvas tool.
            </p>
          </section>

          <section className="border-b border-gray-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Scale size={20} className="text-blue-600" />
              3. Copyright Clearance
            </h2>
            <p>
              Users must hold valid intellectual property rights, licenses, or explicit permissions for any image files they load into the Hexa Watermark Adder editor. Hexa does not review user-uploaded materials, does not claim ownership, and is not responsible for any copyright infringements resulting from user-generated compositions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              4. Complete Agreement
            </h2>
            <p>
              By accessing any section of this web layout, you explicitly consent to these limitations of liability and terms. If you do not agree to these terms, you must discontinue your use of our watermark tools.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
