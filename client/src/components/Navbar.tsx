import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Zap, ChevronDown, Play, Video, BarChart2,
  Lightbulb, Map, Film, Music2, Image as ImageIcon,
  Users, Bot, Sparkles, Database, Calendar, TrendingUp, Award, Activity
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setAiToolsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Click outside and ESC key listener for dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAiToolsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setAiToolsOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-glacial-sky/35 shadow-sm py-2.5'
          : 'bg-white/80 backdrop-blur-md border-b border-glacial-sky/20 py-3.5'
      }`}
    >
      <nav className="container-main flex items-center justify-between" aria-label="Main Navigation">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group flex-shrink-0"
          aria-label="TrendlyInside Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fjord-blue via-[#3b5d88] to-midnight-abyss flex items-center justify-center shadow-btn group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-tight text-midnight-abyss leading-tight">
              TrendlyInside
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          <Link
            to="/youtube-video-analyzer"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/youtube-video-analyzer')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Video Analyzer
          </Link>

          <Link
            to="/youtube-shorts-analyzer"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/youtube-shorts-analyzer')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Shorts Analyzer
          </Link>

          <Link
            to="/youtube-channel-analyzer"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/youtube-channel-analyzer')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Channel Analyzer
          </Link>

          {/* All 17 Tools Mega Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setAiToolsOpen(!aiToolsOpen)}
              onMouseEnter={() => setAiToolsOpen(true)}
              aria-expanded={aiToolsOpen}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                aiToolsOpen
                  ? 'bg-glacial-sky/25 text-fjord-blue'
                  : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
              }`}
            >
              <span>All Tools</span>
              <span className="badge-primary text-2xs py-0.5 px-1.5">17</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-frosty-slate ${
                  aiToolsOpen ? 'rotate-180 text-fjord-blue' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {aiToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  onMouseLeave={() => setAiToolsOpen(false)}
                  className="absolute top-full -left-56 mt-2 w-[760px] bg-white rounded-2xl p-5 border border-glacial-sky/35 shadow-card-hover z-50 grid grid-cols-3 gap-4"
                >
                  {/* Column 1: Video & Social Audits */}
                  <div className="space-y-1">
                    <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-2 pb-1.5 border-b border-glacial-sky/20 flex items-center justify-between">
                      <span>Video & Social</span>
                      <span className="text-fjord-blue">6 Tools</span>
                    </div>

                    <Link to="/youtube-video-analyzer" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                        <Video className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Video Analyzer</div>
                        <div className="text-[11px] text-frosty-slate">Hooks & retention score</div>
                      </div>
                    </Link>

                    <Link to="/youtube-shorts-analyzer" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Shorts Analyzer</div>
                        <div className="text-[11px] text-frosty-slate">First 3s drop-off & loops</div>
                      </div>
                    </Link>

                    <Link to="/youtube-channel-analyzer" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-fjord-blue flex items-center justify-center shrink-0">
                        <BarChart2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Channel Analyzer</div>
                        <div className="text-[11px] text-frosty-slate">Consistency & roadmap</div>
                      </div>
                    </Link>

                    <Link to="/instagram-reel-analyzer" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                        <Film className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Instagram Reel Analyzer</div>
                        <div className="text-[11px] text-frosty-slate">Audio & Explore reach</div>
                      </div>
                    </Link>

                    <Link to="/tiktok-analyzer" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                        <Music2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">TikTok Analyzer</div>
                        <div className="text-[11px] text-frosty-slate">FYP viral completion</div>
                      </div>
                    </Link>

                    <Link to="/competitor-analyzer" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Competitor Analyzer</div>
                        <div className="text-[11px] text-frosty-slate">Head-to-head comparison</div>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: Packaging & Content Creation */}
                  <div className="space-y-1">
                    <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-2 pb-1.5 border-b border-glacial-sky/20 flex items-center justify-between">
                      <span>Packaging & Creation</span>
                      <span className="text-fjord-blue">5 Tools</span>
                    </div>

                    <Link to="/thumbnail-analyzer" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <ImageIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Thumbnail CTR Analyzer</div>
                        <div className="text-[11px] text-frosty-slate">Visual contrast & score</div>
                      </div>
                    </Link>

                    <Link to="/hook-generator" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Viral Hook Generator</div>
                        <div className="text-[11px] text-frosty-slate">20 psychological angles</div>
                      </div>
                    </Link>

                    <Link to="/viral-idea-generator" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Viral Idea Generator</div>
                        <div className="text-[11px] text-frosty-slate">50 niche video concepts</div>
                      </div>
                    </Link>

                    <Link to="/growth-roadmap-generator" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <Map className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Growth Roadmap</div>
                        <div className="text-[11px] text-frosty-slate">30-day milestone blueprint</div>
                      </div>
                    </Link>

                    <Link to="/content-calendar-generator" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Content Calendar</div>
                        <div className="text-[11px] text-frosty-slate">Automated 30-day schedule</div>
                      </div>
                    </Link>
                  </div>

                  {/* Column 3: AI Intelligence & Data */}
                  <div className="space-y-1">
                    <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-2 pb-1.5 border-b border-glacial-sky/20 flex items-center justify-between">
                      <span>AI Intelligence</span>
                      <span className="text-fjord-blue">6 Tools</span>
                    </div>

                    <Link to="/creator-assistant" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-fjord-blue flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">AI Creator Assistant</div>
                        <div className="text-[11px] text-frosty-slate">Chat copilot & coaching</div>
                      </div>
                    </Link>

                    <Link to="/trend-discovery" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Trend Discovery</div>
                        <div className="text-[11px] text-frosty-slate">Breakout keywords & velocity</div>
                      </div>
                    </Link>

                    <Link to="/trend-prediction" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Trend Prediction</div>
                        <div className="text-[11px] text-frosty-slate">Longevity & saturation risk</div>
                      </div>
                    </Link>

                    <Link to="/viral-database" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Viral Database</div>
                        <div className="text-[11px] text-frosty-slate">30+ case study breakdowns</div>
                      </div>
                    </Link>

                    <Link to="/creator-benchmarking" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Creator Benchmarking</div>
                        <div className="text-[11px] text-frosty-slate">Top 10% niche percentiles</div>
                      </div>
                    </Link>

                    <Link to="/advanced-analytics" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-glacial-sky/15 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Activity className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-midnight-abyss group-hover:text-fjord-blue">Advanced Analytics</div>
                        <div className="text-[11px] text-frosty-slate">Packaging fatigue audit</div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/blog"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/blog')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Right Action CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/youtube-video-analyzer"
            className="btn-primary text-sm py-2 px-4 shadow-btn"
            id="nav-analyze-now-btn"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Analyze Now</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/youtube-video-analyzer"
            className="btn-primary text-xs py-1.5 px-3 shadow-btn"
          >
            Analyze
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            className="p-2 rounded-xl bg-glacial-sky/20 text-midnight-abyss hover:bg-glacial-sky/40 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden border-t border-glacial-sky/30 bg-white shadow-xl overflow-hidden"
          >
            <div className="container-main py-5 flex flex-col gap-2 max-h-[82vh] overflow-y-auto">
              {/* Category 1: Video & Social */}
              <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pb-1 flex items-center justify-between">
                <span>Video &amp; Social Audits</span>
                <span className="text-fjord-blue font-semibold">6 Tools</span>
              </div>
              <Link to="/youtube-video-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-midnight-abyss hover:bg-glacial-sky/15">
                <Video className="w-4 h-4 text-red-500" />
                <span>YouTube Video Analyzer</span>
              </Link>
              <Link to="/youtube-shorts-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-midnight-abyss hover:bg-glacial-sky/15">
                <Play className="w-4 h-4 text-purple-500" />
                <span>YouTube Shorts Analyzer</span>
              </Link>
              <Link to="/youtube-channel-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-midnight-abyss hover:bg-glacial-sky/15">
                <BarChart2 className="w-4 h-4 text-fjord-blue" />
                <span>YouTube Channel Analyzer</span>
              </Link>
              <Link to="/instagram-reel-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-midnight-abyss hover:bg-glacial-sky/15">
                <Film className="w-4 h-4 text-pink-500" />
                <span>Instagram Reel Analyzer</span>
              </Link>
              <Link to="/tiktok-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-midnight-abyss hover:bg-glacial-sky/15">
                <Music2 className="w-4 h-4 text-cyan-500" />
                <span>TikTok Video Analyzer</span>
              </Link>
              <Link to="/competitor-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-midnight-abyss hover:bg-glacial-sky/15">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Competitor Channel Analyzer</span>
              </Link>

              {/* Category 2: Packaging & Content Creation */}
              <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pt-3 pb-1 flex items-center justify-between">
                <span>Packaging &amp; Creation</span>
                <span className="text-fjord-blue font-semibold">5 Tools</span>
              </div>
              <Link to="/thumbnail-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <ImageIcon className="w-4 h-4 text-amber-500" />
                <span>Thumbnail CTR Analyzer</span>
              </Link>
              <Link to="/hook-generator" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Viral Hook Generator (20 Hooks)</span>
              </Link>
              <Link to="/viral-idea-generator" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Lightbulb className="w-4 h-4 text-emerald-500" />
                <span>Viral Idea Generator (50 Ideas)</span>
              </Link>
              <Link to="/growth-roadmap-generator" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Map className="w-4 h-4 text-teal-500" />
                <span>30-Day Growth Roadmap</span>
              </Link>
              <Link to="/content-calendar-generator" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>Content Calendar Generator</span>
              </Link>

              {/* Category 3: AI Intelligence & Data */}
              <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pt-3 pb-1 flex items-center justify-between">
                <span>AI Intelligence &amp; Data</span>
                <span className="text-fjord-blue font-semibold">6 Tools</span>
              </div>
              <Link to="/creator-assistant" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Bot className="w-4 h-4 text-fjord-blue" />
                <span>AI Creator Assistant (Copilot)</span>
              </Link>
              <Link to="/trend-discovery" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <TrendingUp className="w-4 h-4 text-violet-500" />
                <span>Trend Discovery Engine</span>
              </Link>
              <Link to="/trend-prediction" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Trend Prediction Engine</span>
              </Link>
              <Link to="/viral-database" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Database className="w-4 h-4 text-purple-500" />
                <span>Viral Content Database</span>
              </Link>
              <Link to="/creator-benchmarking" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Creator Benchmarking</span>
              </Link>
              <Link to="/advanced-analytics" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-midnight-abyss hover:bg-glacial-sky/15">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Advanced Analytics</span>
              </Link>

              <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pt-3 pb-1">
                Resources &amp; Company
              </div>
              <Link to="/blog" className="px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15">
                Creator Blog
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15">
                About TrendlyInside
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15">
                Contact
              </Link>

              <div className="pt-3 mt-2 border-t border-glacial-sky/20">
                <Link to="/youtube-video-analyzer" className="btn-primary w-full text-sm py-2.5 justify-center">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Free Analysis</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
