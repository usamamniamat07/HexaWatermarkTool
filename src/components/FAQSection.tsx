import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is a Watermark Adder?",
      answer: "A Watermark Adder is a dedicated digital design utility that lets you overlay visible text strings or graphic logos on top of photography and diagrams. This visually asserts ownership and deters unauthorised reuse, download, or indexing by search scraping algorithms."
    },
    {
      question: "How do I add a watermark using Hexa?",
      answer: "Upload your image via our click-drop target space, select raw 'Text' or 'Image Logo' from the configuration panels, alter settings like size, opacity, color or font rotation, then position the watermark either by dragging the canvas directly or adjusting precision sliders. Once satisfied, hit 'Download HD Image'."
    },
    {
      question: "Is this tool completely free?",
      answer: "Yes, Hexa is 100% free with no premium subscriptions, membership paywalls, or hidden limitations. Your downloaded images never contain forced brand tags—you preserve full rights and visual purity."
    },
    {
      question: "Is my image secure on your platform?",
      answer: "Absolutely. Unlike traditional online converters, Hexa operates 100% client-side in your local browser sandbox. Your images are never sent to external servers, protecting secure creative files, sensitive mockups, and personal data from leakage."
    },
    {
      question: "Can I upload custom logo watermarks?",
      answer: "Yes, simply select the 'Logo' option in our main editor toolbar and upload any custom PNG, JPEG, or SVG asset. We recommend using transparent PNG logos for the cleanest professional blending outcome."
    },
    {
      question: "Does the process reduce final image quality?",
      answer: "No, Hexa reads and exports the original image resolution. When you download, the watermark layers are synthesized at native canvas dimensions, maintaining pristine quality without introducing compression artifacts."
    },
    {
      question: "Can I use Hexa on a mobile phone?",
      answer: "Yes, Hexa is completely optimized with a mobile-first responsive layout. You can upload photos directly from your phone gallery, drag watermarks with touch tap controls, and retrieve finished HD images instantly."
    },
    {
      question: "Is registration or login required?",
      answer: "No registration, active login, or email disclosure is required. We stand for speed and accessibility; open the app, upload, secure, and move on instantly."
    },
    {
      question: "Which file formats are supported?",
      answer: "We support loads of high fidelity image standards, including PNG, JPG, JPEG, and WebP. The exported files match key extension properties for painless universal compatibility."
    },
    {
      question: "Is Hexa completely online, or is there a local file system app?",
      answer: "Hexa is browser-native and runs entirely online through standard web browser runtimes. It does not load system background services or require app store installation, though it can function completely offline once loaded!"
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="max-w-4xl mx-auto px-4 py-16 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50 flex items-center gap-1.5 w-fit mx-auto">
          <HelpCircle size={14} />
          Frequently Asked Questions
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-4">
          Got Questions? We Have Answers
        </h2>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          Answers to your most frequent queries regarding security, watermarking techniques, output formats, and hardware requirements.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index}
              id={`faq-item-${index}`}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none cursor-pointer"
              >
                <span>{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}>
                  <ChevronDown size={20} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-1 text-gray-600 dark:text-slate-300 text-sm leading-relaxed border-t border-gray-50 dark:border-slate-800/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
