import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ── Eagerly loaded (critical path) ──
import HomePage from './pages/Home';

// ── Lazy loaded (code-split) ──
const VideoAnalyzerPage       = lazy(() => import('./pages/VideoAnalyzer'));
const ShortsAnalyzerPage      = lazy(() => import('./pages/ShortsAnalyzer'));
const ChannelAnalyzerPage     = lazy(() => import('./pages/ChannelAnalyzer'));
const HookGeneratorPage       = lazy(() => import('./pages/HookGenerator'));
const IdeaGeneratorPage       = lazy(() => import('./pages/IdeaGenerator'));
const RoadmapGeneratorPage    = lazy(() => import('./pages/RoadmapGenerator'));
const ReelAnalyzerPage        = lazy(() => import('./pages/ReelAnalyzer'));
const TikTokAnalyzerPage      = lazy(() => import('./pages/TikTokAnalyzer'));
const ThumbnailAnalyzerPage   = lazy(() => import('./pages/ThumbnailAnalyzer'));
const CompetitorAnalyzerPage  = lazy(() => import('./pages/CompetitorAnalyzer'));
const TrendDiscoveryPage      = lazy(() => import('./pages/TrendDiscovery'));
const ContentCalendarPage     = lazy(() => import('./pages/ContentCalendar'));
const CreatorAssistantPage    = lazy(() => import('./pages/CreatorAssistant'));
const TrendPredictionPage     = lazy(() => import('./pages/TrendPrediction'));
const ViralDatabasePage       = lazy(() => import('./pages/ViralDatabase'));
const CreatorBenchmarkingPage = lazy(() => import('./pages/CreatorBenchmarking'));
const AdvancedAnalyticsPage   = lazy(() => import('./pages/AdvancedAnalytics'));
const BlogPage                = lazy(() => import('./pages/Blog'));
const BlogPostPage            = lazy(() => import('./pages/BlogPost'));
const AboutPage               = lazy(() => import('./pages/About'));
const ContactPage             = lazy(() => import('./pages/Contact'));
const PrivacyPage             = lazy(() => import('./pages/Legal').then(m => ({ default: m.PrivacyPage })));
const TermsPage               = lazy(() => import('./pages/Legal').then(m => ({ default: m.TermsPage })));

/* ── Scroll restoration ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

/* ── Page loading fallback ── */
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-glacial-sky border-t-fjord-blue animate-spin" />
        <p className="text-sm text-frosty-slate">Loading…</p>
      </div>
    </div>
  );
}

/* ── 404 page (Section 63) ── */
function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[72vh] flex-col gap-6 text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-glacial-sky/20 border border-glacial-sky/40 flex items-center justify-center text-4xl shadow-sm">
        🏔️
      </div>
      <div className="max-w-md">
        <span className="badge-primary text-xs mb-3 inline-flex">Trail Not Found</span>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-2">
          Looks like this trail ends here.
        </h1>
        <p className="text-frosty-slate text-sm leading-relaxed">
          The peak or page you're looking for doesn't exist or has moved. Return to TrendlyInside to analyze your content.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href="/" className="btn-primary text-sm py-2.5 px-5">
          Go Home
        </a>
        <a href="/youtube-video-analyzer" className="btn-secondary text-sm py-2.5 px-5">
          Analyze a Video
        </a>
      </div>
    </div>
  );
}

/* ── App ── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F4F7FB]">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home — no lazy (critical first paint) */}
              <Route path="/" element={<HomePage />} />

              {/* Phase 1 Tools */}
              <Route path="/youtube-video-analyzer"   element={<VideoAnalyzerPage />} />
              <Route path="/youtube-shorts-analyzer"  element={<ShortsAnalyzerPage />} />
              <Route path="/youtube-channel-analyzer" element={<ChannelAnalyzerPage />} />
              <Route path="/hook-generator"           element={<HookGeneratorPage />} />
              <Route path="/viral-idea-generator"     element={<IdeaGeneratorPage />} />
              <Route path="/growth-roadmap-generator" element={<RoadmapGeneratorPage />} />

              {/* Phase 2 Tools */}
              <Route path="/instagram-reel-analyzer"     element={<ReelAnalyzerPage />} />
              <Route path="/tiktok-analyzer"             element={<TikTokAnalyzerPage />} />
              <Route path="/thumbnail-analyzer"          element={<ThumbnailAnalyzerPage />} />
              <Route path="/competitor-analyzer"         element={<CompetitorAnalyzerPage />} />
              <Route path="/trend-discovery"             element={<TrendDiscoveryPage />} />
              <Route path="/content-calendar-generator"  element={<ContentCalendarPage />} />

              {/* Phase 3 Tools */}
              <Route path="/creator-assistant"   element={<CreatorAssistantPage />} />
              <Route path="/trend-prediction"    element={<TrendPredictionPage />} />
              <Route path="/viral-database"      element={<ViralDatabasePage />} />
              <Route path="/creator-benchmarking" element={<CreatorBenchmarkingPage />} />
              <Route path="/advanced-analytics"  element={<AdvancedAnalyticsPage />} />

              {/* Blog & Static */}
              <Route path="/blog"           element={<BlogPage />} />
              <Route path="/blog/:slug"     element={<BlogPostPage />} />
              <Route path="/about"          element={<AboutPage />} />
              <Route path="/contact"        element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/terms"          element={<TermsPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
