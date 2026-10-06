import { Link } from 'react-router-dom';
import { Zap, Play, Sparkles } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-midnight-abyss text-white border-t border-glacial-sky/20">
      {/* Footer CTA Bar */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#172540] via-[#223354] to-[#2c4168]">
        <div className="container-main py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-glacial-sky border border-white/15 mb-2">
              <Sparkles className="w-3 h-3 text-[#FADADD]" />
              Free AI Creator Intelligence
            </span>
            <h3 className="font-heading font-bold text-2xl text-white">
              Understand Why Your Content Performs.
            </h3>
            <p className="text-frosty-slate text-sm mt-1">
              Analyze YouTube videos, Shorts, and creator channels with AI in seconds. No login required.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/youtube-video-analyzer"
              className="btn-primary py-3 px-6 text-sm font-semibold shadow-btn"
              id="footer-start-analyzing-btn"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Analyzing Free</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="container-main py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Positioning */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fjord-blue to-glacial-sky flex items-center justify-center group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">TrendlyInside</span>
            </Link>
            <p className="text-frosty-slate text-sm leading-relaxed max-w-sm mb-4">
              AI creator intelligence for better content decisions. Discover what works, what hurts retention, and exactly what to improve next.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-glacial-sky">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              100% Free · No Signup Required
            </div>
          </div>

          {/* Product (Core 6 Tools) */}
          <div>
            <h4 className="text-xs font-bold text-glacial-sky uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/youtube-video-analyzer" className="text-frosty-slate hover:text-white transition-colors">
                  Video Analyzer
                </Link>
              </li>
              <li>
                <Link to="/youtube-shorts-analyzer" className="text-frosty-slate hover:text-white transition-colors">
                  Shorts Analyzer
                </Link>
              </li>
              <li>
                <Link to="/youtube-channel-analyzer" className="text-frosty-slate hover:text-white transition-colors">
                  Channel Analyzer
                </Link>
              </li>
              <li>
                <Link to="/hook-generator" className="text-frosty-slate hover:text-white transition-colors">
                  Hook Generator
                </Link>
              </li>
              <li>
                <Link to="/viral-idea-generator" className="text-frosty-slate hover:text-white transition-colors">
                  Idea Generator
                </Link>
              </li>
              <li>
                <Link to="/growth-roadmap-generator" className="text-frosty-slate hover:text-white transition-colors">
                  Growth Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-glacial-sky uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/blog" className="text-frosty-slate hover:text-white transition-colors">
                  Creator Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-frosty-slate hover:text-white transition-colors">
                  About TrendlyInside
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-frosty-slate hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/creator-assistant" className="text-frosty-slate hover:text-white transition-colors">
                  AI Creator Assistant
                </Link>
              </li>
              <li>
                <Link to="/viral-database" className="text-frosty-slate hover:text-white transition-colors">
                  Viral Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-glacial-sky uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-frosty-slate hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-frosty-slate hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-frosty-slate/70">
          <p>© {year} TrendlyInside. All rights reserved.</p>
          <p>Analyze. Improve. Grow.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI intelligence engine operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
