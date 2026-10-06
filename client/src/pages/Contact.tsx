import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { useSEO } from '../lib/seo';

export default function ContactPage() {
  useSEO({
    title: 'Contact TrendlyInside — Support & Creator Feedback',
    description: 'Get in touch with the TrendlyInside team for feature requests, bug reports, and creator inquiries. No login required.',
    path: '/contact',
  });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, submit to a form service
    setSubmitted(true);
  };

  return (
    <>
      <div className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}>
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-4">Contact Us</span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mt-3 mb-4">Get in Touch</h1>
            <p className="text-frosty-slate max-w-md mx-auto">
              Have a question, feature request, or want to report an issue? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-glacial-sky/20 text-fjord-blue flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-midnight-abyss text-sm">Email</p>
                <a href="mailto:hello@trendlyinside.com" className="text-fjord-blue text-sm hover:underline">hello@trendlyinside.com</a>
              </div>
            </div>
            <div className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-glacial-sky/20 text-fjord-blue flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-midnight-abyss text-sm">Response Time</p>
                <p className="text-frosty-slate text-sm">Within 24-48 hours</p>
              </div>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-2">Message Sent!</h3>
              <p className="text-frosty-slate text-sm">We'll get back to you within 24-48 hours. Thank you!</p>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="card p-8 space-y-5">
              <h2 className="font-heading font-bold text-xl text-midnight-abyss">Send a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-midnight-abyss mb-2">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Your name" className="input-base text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-midnight-abyss mb-2">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="your@email.com" className="input-base text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-midnight-abyss mb-2">Subject</label>
                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-base text-sm">
                  <option value="">Select a topic...</option>
                  <option>General Question</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>Business Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-midnight-abyss mb-2">Message</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="Tell us how we can help..." className="input-base text-sm resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
            </motion.form>
          )}
        </div>
      </div>
    </>
  );
}
