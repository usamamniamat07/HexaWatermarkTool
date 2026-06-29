import React from 'react';
import { ShieldCheck, EyeOff, Scale, ServerCrash } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div id="privacy-section-container" className="max-w-4xl mx-auto px-4 py-16 relative z-10 transition-colors duration-1000">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
          Legal Framework
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 dark:text-white mt-4 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: June 20, 2026. Effective Immediately.
        </p>

        <div className="space-y-8 text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
          
          <section className="border-b border-gray-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <EyeOff size={20} className="text-blue-600" />
              1. Local-Only Image Processing
            </h2>
            <p className="mb-3">
              At Hexa Watermark Adder, your data privacy is our absolute priority. We operate under a **Zero-Storage Policy**. 
            </p>
            <p>
              When you upload photographic files (PNG, JPG, JPEG, WebP) to our editor, the file is loaded into your browser's local memory stack using the HTML5 FileReader API. The compositing and rendering of the watermark onto the image occur entirely on the client side, within your browser. **No image data is ever uploaded, transmitted, or stored on our servers.**
            </p>
          </section>

          <section className="border-b border-gray-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" />
              2. Data Collected & Analytics
            </h2>
            <p className="mb-3">
              Because Hexa does not require registration or credentials, we do not collect personal identify information such as your name, physical address, or account logins.
            </p>
            <p>
              We may collect anonymous aggregate telemetry (such as screen size, browser agent, page view interactions) to help improve CSS load timings, verify performance benchmarks, and monitor device-specific layout scaling constraints.
            </p>
          </section>

          <section className="border-b border-gray-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Scale size={20} className="text-blue-600" />
              3. Regulatory Compliance
            </h2>
            <p className="mb-3">
              Since our design functions purely client-side and keeps no personal record files, we comply seamlessly with leading international guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>GDPR (General Data Protection Regulation):</strong> No personal data is stored, meaning you hold exclusive control.</li>
              <li><strong>CCPA (California Consumer Privacy Act):</strong> We do not sell, trade, or distribute your content or identity logs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              4. Changes to Policy
            </h2>
            <p>
              Hexa reserves the right to amend this policy at any time. Any changes will be indicated on this page with an updated timestamp. Continuing usage of our web layout after updates constitutes standard acceptance of the parameters.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
