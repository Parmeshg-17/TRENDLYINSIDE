import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, AlertCircle } from 'lucide-react';
import { useSEO } from '../lib/seo';

export default function ContactPage() {
  const navigate = useNavigate();
  useSEO({
    title: 'Contact Creator Support | TrendlyInside',
    description: 'Get in touch with the TrendlyInside team for creator feedback, feature requests, or partnership inquiries.',
    path: '/contact',
  });

  const [form, setForm] = useState({ name: '', email: '', subject: 'General Question', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side honeypot check (fast reject for bots)
    if (honeypot.trim()) {
      navigate('/thank-you');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _gotcha: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to submit form. Please try again.');
      }

      // Navigate to dedicated thank-you page
      navigate('/thank-you');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please email hello@trendlyinside.com directly.');
    } finally {
      setIsSubmitting(false);
    }
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
                <p className="font-semibold text-midnight-abyss text-sm">Direct Email</p>
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

          {/* Contact Form */}
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="card p-8 space-y-5">
            <h2 className="font-heading font-bold text-xl text-midnight-abyss">Send a Message</h2>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Honeypot field - hidden from humans */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="contact_extra_field">Do not fill this field</label>
              <input
                id="contact_extra_field"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-midnight-abyss mb-2">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="input-base text-sm"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-midnight-abyss mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                  className="input-base text-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-midnight-abyss mb-2">Subject</label>
              <select
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="input-base text-sm cursor-pointer"
                disabled={isSubmitting}
              >
                <option value="General Question">General Question</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Business Inquiry">Business Inquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-midnight-abyss mb-2">Message *</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                placeholder="Tell us how we can help..."
                className="input-base text-sm resize-none"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center py-3 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </motion.form>
        </div>
      </div>
    </>
  );
}
