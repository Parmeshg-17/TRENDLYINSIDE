import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import type { BlogPost } from '../types';
import { AdBanner } from '../components/AnalysisComponents';

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'youtube-hooks-that-stop-scroll',
    title: 'How to Write YouTube Hooks That Stop the Scroll',
    excerpt: 'The first 5 seconds determine if your video lives or dies. Here is the science behind scroll-stopping hooks and how to write them every time.',
    category: 'Viral Hooks',
    readTime: '7 min read',
    publishedAt: '2026-09-28',
  },
  {
    id: '2',
    slug: 'youtube-shorts-strategies-2025',
    title: '10 YouTube Shorts Strategies That Actually Work in 2026',
    excerpt: 'Shorts are the fastest path to channel growth. These 10 strategies are backed by data from 1,000+ creator channels we have analyzed.',
    category: 'Shorts Strategy',
    readTime: '9 min read',
    publishedAt: '2026-09-20',
  },
  {
    id: '3',
    slug: 'why-youtube-channel-not-growing',
    title: 'Why Your YouTube Channel Isn\'t Growing (And How to Fix It)',
    excerpt: 'Most creators make the same 5 mistakes. This guide will show you exactly how to diagnose and fix them — based on analysis of 10,000+ channels.',
    category: 'YouTube Growth',
    readTime: '12 min read',
    publishedAt: '2026-09-15',
  },
  {
    id: '4',
    slug: 'thumbnail-psychology-clicks',
    title: 'The Psychology Behind YouTube Thumbnails That Get Clicked',
    excerpt: 'Learn why some thumbnails get 12% click-through rates while others get 2% — and how to design thumbnails that viewers cannot resist.',
    category: 'YouTube Growth',
    readTime: '8 min read',
    publishedAt: '2026-09-10',
  },
  {
    id: '5',
    slug: 'retention-tactics-2025',
    title: 'Advanced Retention Tactics: Keep Viewers Watching Until the End',
    excerpt: 'Viewer retention is the #1 algorithm signal on YouTube. Here are 12 proven tactics to keep people watching from first second to last.',
    category: 'Retention Tactics',
    readTime: '10 min read',
    publishedAt: '2026-09-05',
  },
  {
    id: '6',
    slug: 'creator-psychology-consistency',
    title: 'Creator Psychology: How Top YouTubers Stay Consistent for Years',
    excerpt: 'Consistency is what separates successful creators from those who quit. Here is how to build the mindset and systems that make it inevitable.',
    category: 'Creator Psychology',
    readTime: '6 min read',
    publishedAt: '2026-08-28',
  },
];

const CATEGORIES = ['All', 'YouTube Growth', 'Shorts Strategy', 'Viral Hooks', 'Creator Psychology', 'Retention Tactics'];

const categoryColors: Record<string, string> = {
  'YouTube Growth': 'bg-blue-50 text-blue-700',
  'Shorts Strategy': 'bg-purple-50 text-purple-700',
  'Viral Hooks': 'bg-red-50 text-red-700',
  'Creator Psychology': 'bg-green-50 text-green-700',
  'Retention Tactics': 'bg-amber-50 text-amber-700',
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'Creator Growth Blog & Guides — TrendlyInside';
  }, []);

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0];

  return (
    <>
      {/* Header */}
      <div className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}>
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-4">Creator Resources</span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mt-3 mb-4">
              Creator Growth Blog
            </h1>
            <p className="text-frosty-slate max-w-xl mx-auto">
              In-depth guides, algorithmic teardowns, and actionable case studies to help you grow your YouTube channel faster.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-main py-10">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs font-semibold text-frosty-slate uppercase tracking-wider mr-2">Filter by:</span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-midnight-abyss text-white shadow-sm'
                    : 'bg-white border border-glacial-sky/30 text-midnight-abyss hover:bg-glacial-sky/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Post (shown if All or matches category) */}
        {selectedCategory === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="card p-8 flex flex-col md:flex-row gap-6 group hover:shadow-card-hover transition-all no-underline block"
            >
              <div
                className="w-full md:w-72 h-48 rounded-xl flex-shrink-0 flex flex-col justify-between p-6 text-white"
                style={{ background: 'linear-gradient(135deg, #223354 0%, #4A6D99 100%)' }}
              >
                <span className="badge bg-white/20 text-white text-xs w-fit">Featured Guide</span>
                <div>
                  <Sparkles className="w-6 h-6 text-alpenglow mb-2" />
                  <p className="font-heading font-bold text-lg text-white">The Anatomy of a Viral Hook</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`badge text-xs ${categoryColors[featuredPost.category] || 'badge-primary'}`}>
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-frosty-slate">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-frosty-slate">
                      <Calendar className="w-3 h-3" />
                      {featuredPost.publishedAt}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-midnight-abyss group-hover:text-fjord-blue transition-colors mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-frosty-slate text-sm md:text-base leading-relaxed mb-4">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-fjord-blue text-sm font-semibold mt-2">
                  Read complete article <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* AdSense Placement */}
        <div className="mb-10">
          <AdBanner />
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === 'All' ? filteredPosts.slice(1) : filteredPosts).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="card p-6 flex flex-col justify-between hover:shadow-card-hover transition-all group no-underline w-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge text-xs ${categoryColors[post.category] || 'badge-primary'}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-frosty-slate">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-midnight-abyss group-hover:text-fjord-blue transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-frosty-slate text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-glacial-sky/20 flex items-center justify-between text-xs">
                  <span className="text-frosty-slate">{post.publishedAt}</span>
                  <span className="flex items-center gap-1 text-fjord-blue font-semibold group-hover:text-midnight-abyss transition-colors">
                    Read guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
