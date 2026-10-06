import { motion } from 'framer-motion';
import { Zap, Target, Heart, Globe } from 'lucide-react';
import { useSEO } from '../lib/seo';

export default function AboutPage() {
  useSEO({
    title: 'About TrendlyInside — Free AI Creator Intelligence',
    description: 'Learn why TrendlyInside exists, who it helps, and our mission to provide completely free, no-login AI creator intelligence to help creators understand why content performs.',
    path: '/about',
  });
  return (
    <>
      <div className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}>
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-4">About Us</span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mt-3 mb-4">
              Built for Creators.<br />Powered by AI. Completely Free.
            </h1>
            <p className="text-frosty-slate max-w-xl mx-auto leading-relaxed">
              TrendlyInside was built with one goal: make professional-grade creator intelligence 
              accessible to everyone — from a creator with 100 subscribers to a brand with 1 million.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-main py-16">
        {/* Mission */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 text-center" style={{ background: 'linear-gradient(135deg, #223354 0%, #4A6D99 100%)' }}>
            <Zap className="w-10 h-10 text-white mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl text-white mb-3">Our Mission</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              "Democratize creator intelligence so that any creator — regardless of budget — 
              can understand their content, grow their audience, and build a sustainable creative career."
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Target className="w-6 h-6" />, title: 'Always Free', desc: 'TrendlyInside will always be free for creators. We believe information shouldn\'t cost money. Our tools are sustained by non-intrusive advertising.' },
            { icon: <Heart className="w-6 h-6" />, title: 'Creator First', desc: 'Every feature we build starts with a creator\'s real problem. We don\'t build technology for the sake of it — we build it because creators need it.' },
            { icon: <Globe className="w-6 h-6" />, title: 'Accessible Intelligence', desc: 'AI shouldn\'t be locked behind expensive subscriptions. We use the best open-source and affordable AI models to deliver enterprise-quality analysis.' },
          ].map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-glacial-sky/20 text-fjord-blue flex items-center justify-center mb-4">{v.icon}</div>
              <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-2">{v.title}</h3>
              <p className="text-frosty-slate text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tools */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl text-midnight-abyss mb-4">What We've Built</h2>
          <p className="text-frosty-slate mb-8">Six free AI tools designed to help creators at every stage grow faster on YouTube.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['YouTube Video Analyzer', 'YouTube Shorts Analyzer', 'Channel Analyzer', 'Hook Generator', 'Viral Idea Generator', 'Growth Roadmap'].map(tool => (
              <div key={tool} className="card p-4 text-center text-sm font-medium text-midnight-abyss">{tool}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
