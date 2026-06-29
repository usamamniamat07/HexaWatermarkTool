import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate premium visual submitting feedback
    setSubmitted(true);
  };

  return (
    <div id="contact-section-container" className="max-w-5xl mx-auto px-4 py-16 relative z-10 transition-colors duration-1000">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-100/60 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50">
          Contact Us
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-6">
          How Can We Help You?
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-300">
          Have an inquiry regarding automated API access, enterprise bulk watermarking licensing, or custom features? Drop us a prompt below.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Contact details */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
            <p className="text-gray-600 dark:text-slate-400 mb-8 leading-relaxed">
              We respond to developer questions, corporate integration proposals, and general bug reporting tickets within 24 business hours.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</h4>
                  <p className="text-gray-900 dark:text-white font-medium">support@hexawatermark.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider">Direct Line</h4>
                  <p className="text-gray-900 dark:text-white font-medium">+1 (555) 791-0320</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider">Headquarters</h4>
                  <p className="text-gray-900 dark:text-white font-medium">100 Cyber Tower, Suite 3400, SF</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Form */}
        <div className="md:col-span-3">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 px-4"
              >
                <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Transmitted!</h3>
                <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Thank you for reaching out to Hexa Watermark Adder support. Our operations desk has received your ticket and will follow up shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                    setSubmitted(false);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="input-name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="input-email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="select-subject" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Subject Matter
                  </label>
                  <select
                    id="select-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Enterprise Agreement">Enterprise licensing</option>
                    <option value="Feature Suggestion">Feature request</option>
                    <option value="Bug Report">Technical Bug Report</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="textarea-message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Detailed Message
                  </label>
                  <textarea
                    id="textarea-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message details here..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Send size={18} />
                    Send Secure Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
