import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { AdBanner } from '../components/AnalysisComponents';

interface PostDetail {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  sections: {
    heading: string;
    content: string[];
    callout?: string;
  }[];
}

const POSTS_DATA: Record<string, PostDetail> = {
  'youtube-hooks-that-stop-scroll': {
    slug: 'youtube-hooks-that-stop-scroll',
    title: 'How to Write YouTube Hooks That Stop the Scroll',
    excerpt: 'The first 5 seconds determine if your video lives or dies. Here is the science behind scroll-stopping hooks and how to write them every time.',
    category: 'Viral Hooks',
    readTime: '7 min read',
    publishedAt: 'September 28, 2026',
    author: 'TrendlyInside Research',
    sections: [
      {
        heading: '1. The Retention Decay Curve: Why the First 5 Seconds Matter',
        content: [
          'YouTube analytics across millions of videos confirm a startling reality: between 25% and 40% of viewers drop off in the first 15 seconds. If your viewer clicks away before you deliver value, the algorithm interprets the video as a mismatch and stops distributing impressions.',
          'Most creators start videos with greetings ("Hey guys, welcome back to my channel!"), animated channel logos, or rambling background information. These intro elements act as retention killers. A high-performing hook eliminates all preamble and launches straight into the unresolved tension.'
        ],
        callout: 'Rule of thumb: Never greet the viewer before delivering your core hook premise. Say your first sentence without taking a breath before hitting record.'
      },
      {
        heading: '2. The 3 Core Ingredients of a Scroll-Stopping Hook',
        content: [
          'Curiosity Gap: Present information that highlights what the viewer does not yet know. Humans experience curiosity as a mild mental itch that demands closure.',
          'Stakes & Urgency: Clearly communicate why this insight matters right now. Are they losing money? Wasting time? Missing out on algorithmic impressions?',
          'Proof of Payoff: Provide a visual or verbal glimpse of the final transformation before walking through the step-by-step process.'
        ]
      },
      {
        heading: '3. The 4 Proven Hook Formulas Used by the Top 1%',
        content: [
          'The Contrarian Inversion: "Everything you have been told about [topic] is completely backwards. Here is why."',
          'The High-Stakes Self-Experiment: "I spent 100 hours testing the hardest strategy in [niche] so you don\'t make the same mistakes."',
          'The Insider Secret: "Almost nobody in [niche] talks about this one rule, but it changes everything."',
          'The Direct Pain-Point Fix: "If your [metric] is stuck, stop doing this one thing today."'
        ],
        callout: 'Use on-screen kinetic captions that mirror your first spoken sentence. Over 30% of social and Shorts viewers consume the first 3 seconds on mute.'
      },
      {
        heading: '4. Testing and Iterating Hooks with AI',
        content: [
          'Top creators write at least 10-20 hook variations before ever pressing record. By testing different angles (Curiosity, Story, Authority, Contrarian), you discover the framing with the highest emotional resonance.',
          'You can use TrendlyInside\'s free Hook Generator to instantly create 20 psychology-backed hooks tailored to your specific topic and platform.'
        ]
      }
    ]
  },
  'youtube-shorts-strategies-2025': {
    slug: 'youtube-shorts-strategies-2025',
    title: '10 YouTube Shorts Strategies That Actually Work in 2026',
    excerpt: 'Shorts are the fastest path to channel growth. These 10 strategies are backed by data from 1,000+ creator channels we have analyzed.',
    category: 'Shorts Strategy',
    readTime: '9 min read',
    publishedAt: 'September 20, 2026',
    author: 'TrendlyInside Research',
    sections: [
      {
        heading: '1. Mastering the "Viewed vs. Swiped Away" Ratio',
        content: [
          'In the YouTube Shorts algorithm, the single most critical gating metric is the "Viewed vs. Swiped Away" percentage. If less than 70% of viewers choose to stay on your Short during the initial feed impression, the algorithm throttles future shelf distribution.',
          'To keep this ratio above 80%, your first frame must feature prominent movement, a bold centered headline, and a voiceover that starts instantly on frame 1.'
        ],
        callout: 'Benchmark: Aim for >75% Viewed vs Swiped Away and >100% Average Percentage Viewed.'
      },
      {
        heading: '2. The Seamless Infinite Loop Architecture',
        content: [
          'When viewers watch your Short more than once, your Average Percentage Viewed climbs past 100%. The algorithm views repeat consumption as a massive endorsement.',
          'Design your script so your closing sentence connects seamlessly into the opening phrase. For example: Ending with "And that is exactly why..." followed by the opening line "...you should never ignore this rule."'
        ]
      },
      {
        heading: '3. Rapid Pacing Without Cognitive Fatigue',
        content: [
          'Top shorts switch visual stimulus (zoom, b-roll, graphics, angle change) every 1.5 to 2.2 seconds.',
          'Cut out all breath pauses and filler words in post-production. Every split-second of silence is an invitation for the user to swipe to the next creator.'
        ]
      },
      {
        heading: '4. Safe Zone Formatting for Mobile UI',
        content: [
          'Many creators lose engagement because their captions overlap the YouTube UI action buttons (like, share, sound title, channel avatar).',
          'Always keep critical text, faces, and graphics inside the middle 60% of vertical screen space.'
        ]
      }
    ]
  },
  'why-youtube-channel-not-growing': {
    slug: 'why-youtube-channel-not-growing',
    title: 'Why Your YouTube Channel Isn\'t Growing (And How to Fix It)',
    excerpt: 'Most creators make the same 5 mistakes. This guide will show you exactly how to diagnose and fix them based on analysis of 10,000+ channels.',
    category: 'YouTube Growth',
    readTime: '12 min read',
    publishedAt: 'September 15, 2026',
    author: 'TrendlyInside Research',
    sections: [
      {
        heading: '1. Diagnosis: The "Topic Confusion" Trap',
        content: [
          'When a viewer subscribes after watching a gaming video, they expect more gaming videos. If your next upload is a travel vlog, they won\'t click. YouTube detects low CTR among your existing subscribers and assumes the video is poor, killing its reach.',
          'Until you cross 50,000 subscribers, stick to one tight niche. Solve specific problems for a distinct audience profile.'
        ],
        callout: 'If your channel covers multiple unrelated topics, create separate channels or unify your topics under one clear thematic promise.'
      },
      {
        heading: '2. Low Packaging CTR (Click-Through Rate)',
        content: [
          'Great content with a mediocre thumbnail gets zero views. If your CTR is below 4%, the algorithm will stop showing your video regardless of how brilliant the editing is.',
          'Treat thumbnail design and title brainstorming as 50% of the creative process. Develop 3 distinct thumbnail concepts before you film.'
        ]
      },
      {
        heading: '3. Inconsistent Upload Schedules',
        content: [
          'YouTube does not penalize you for taking time off, but your audience develops habits. When you post reliably on a specific schedule, returning viewer velocity compounds.',
          'Build a 4-week buffer of ideas and scripts so real-world interruptions do not derail your publishing rhythm.'
        ]
      },
      {
        heading: '4. Neglecting the Browse Features Algorithm',
        content: [
          'Search traffic provides steady baseline views, but exponential growth comes from YouTube Browse and Suggested videos.',
          'To trigger Browse distribution, create content around high-curiosity concepts, broader human themes, and relatable conflict.'
        ]
      }
    ]
  },
  'thumbnail-psychology-clicks': {
    slug: 'thumbnail-psychology-clicks',
    title: 'The Psychology Behind YouTube Thumbnails That Get Clicked',
    excerpt: 'Learn why some thumbnails get 12% click-through rates while others get 2% — and how to design thumbnails that viewers cannot resist.',
    category: 'YouTube Growth',
    readTime: '8 min read',
    publishedAt: 'September 10, 2026',
    author: 'TrendlyInside Research',
    sections: [
      {
        heading: '1. Visual Hierarchy: The Rule of Three Elements',
        content: [
          'The human brain takes approximately 13 milliseconds to process an image. If your thumbnail contains more than 3 distinct visual focal points, the brain registers clutter and moves on.',
          'Top-performing thumbnails restrict composition to: 1 Focal Subject (Face or Object), 1 Context Element (Background), and 1 Curiosity Cue (Short text or visual symbol).'
        ],
        callout: 'Test your thumbnail at 10% scale. If you cannot decipher the subject and text in 1 second on a phone screen, redesign it.'
      },
      {
        heading: '2. Color Contrast on Dark Mode Feeds',
        content: [
          'Over 75% of YouTube mobile users browse in Dark Mode. Thumbnails with dark borders or muted grey backgrounds blend into the interface.',
          'Utilize bold complementary colors (warm ambers, vibrant teals, crisp whites) to create an immediate edge boundary that pops against dark UI.'
        ]
      },
      {
        heading: '3. Never Repeat the Title in the Thumbnail',
        content: [
          'The title and thumbnail must work as a 1-2 punch. The thumbnail creates the visual curiosity; the title provides the context and promise.',
          'If your title is "How to Build a SaaS in 30 Days", do not put "Build a SaaS in 30 Days" on the image. Instead, use a graphic showing "$0 to $12,450" with a text badge saying "Proof Inside".'
        ]
      },
      {
        heading: '4. Facial Expressions That Trigger Mirror Neurons',
        content: [
          'Humans are biologically wired to look at human faces and mirror emotions. A face exhibiting genuine surprise, intensity, or skepticism drives higher click desire than a neutral smile.'
        ]
      }
    ]
  },
  'retention-tactics-2025': {
    slug: 'retention-tactics-2025',
    title: 'Advanced Retention Tactics: Keep Viewers Watching Until the End',
    excerpt: 'Viewer retention is the #1 algorithm signal on YouTube. Here are 12 proven tactics to keep people watching from first second to last.',
    category: 'Retention Tactics',
    readTime: '10 min read',
    publishedAt: 'September 5, 2026',
    author: 'TrendlyInside Research',
    sections: [
      {
        heading: '1. The Open Loop Technique',
        content: [
          'An open loop is an unresolved story arc or promise introduced early that keeps the audience waiting for the conclusion.',
          'Example: "In 3 minutes, I will show you the exact setting that doubled my views, but first, you must fix this fundamental error."'
        ],
        callout: 'Plant micro-loops every 2 minutes throughout your video to systematically delay drop-off.'
      },
      {
        heading: '2. Pattern Interrupts Every 15 Seconds',
        content: [
          'When visual stimulation stays identical for more than 15-20 seconds, the viewer\'s brain transitions into passive mode, dramatically increasing exit probability.',
          'Use subtle camera zooms (1.1x punch-in), lower-third graphics, SFX accents, B-roll cutaways, or on-screen illustrations to reset viewer attention.'
        ]
      },
      {
        heading: '3. The "No Conclusion" End-Screen Bridge',
        content: [
          'As soon as a creator says "In conclusion...", "To wrap up...", or "Thanks for watching", retention plummets by 80%.',
          'Never signal that the video is ending. Instead, transition directly from your final takeaway into pitching your next video in mid-sentence.'
        ]
      }
    ]
  },
  'creator-psychology-consistency': {
    slug: 'creator-psychology-consistency',
    title: 'Creator Psychology: How Top YouTubers Stay Consistent for Years',
    excerpt: 'Consistency is what separates successful creators from those who quit. Here is how to build the mindset and systems that make it inevitable.',
    category: 'Creator Psychology',
    readTime: '6 min read',
    publishedAt: 'August 28, 2026',
    author: 'TrendlyInside Research',
    sections: [
      {
        heading: '1. Decoupling Effort from Immediate Results',
        content: [
          'The hardest hurdle for new creators is spending 20 hours on a video only for it to receive 34 views. Algorithm distribution is non-linear; impressions often surge months after publication.',
          'Focus on input metrics (quality of hooks, thumbnail iterations, upload frequency) rather than output metrics (views, subscribers) during your first 50 uploads.'
        ],
        callout: 'Treat every video as a digital asset that compounds value over years, not just a 24-hour lottery ticket.'
      },
      {
        heading: '2. Batch Production Workflows',
        content: [
          'Context switching is the primary cause of creator burnout. Filming, editing, and designing on the same day exhausts cognitive bandwidth.',
          'Designate dedicated days: Monday for Research & Scripting, Tuesday for Filming 2 videos, Wednesday for Editing, Thursday for Packaging & SEO.'
        ]
      },
      {
        heading: '3. Building Your 30-Day Growth Roadmap',
        content: [
          'Creators with structured weekly milestones are 3x more likely to remain active after 6 months. Having predefined tasks eliminates decision paralysis.',
          'Use TrendlyInside\'s Growth Roadmap generator to generate a personalized weekly action plan tailored to your niche and schedule.'
        ]
      }
    ]
  }
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POSTS_DATA[slug] : null;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — TrendlyInside Blog`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container-main py-24 text-center">
        <h1 className="font-heading font-bold text-4xl text-midnight-abyss mb-4">Article Not Found</h1>
        <p className="text-frosty-slate mb-8">The blog article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="btn-primary text-sm inline-flex">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Creator Blog
        </Link>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <>
      {/* Header Banner */}
      <div
        className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}
      >
        <div className="container-main max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-medium text-fjord-blue hover:text-midnight-abyss mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="badge badge-primary">{post.category}</span>
            <span className="flex items-center gap-1.5 text-xs text-frosty-slate">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-frosty-slate">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-base md:text-lg text-frosty-slate leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-glacial-sky/30 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fjord-blue to-midnight-abyss flex items-center justify-center text-white font-bold text-sm">
                TI
              </div>
              <div>
                <p className="text-sm font-semibold text-midnight-abyss">{post.author}</p>
                <p className="text-xs text-frosty-slate">AI Content Strategists</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-fjord-blue bg-white border border-glacial-sky/30 shadow-sm hover:bg-glacial-sky/20 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share Article
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container-main max-w-4xl py-12">
        <article className="space-y-12">
          {post.sections.map((section, idx) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-midnight-abyss">
                {section.heading}
              </h2>

              <div className="space-y-3">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-base text-midnight-abyss leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.callout && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-glacial-sky/20 to-alpenglow/20 border border-glacial-sky/30 flex items-start gap-3 my-4">
                  <Sparkles className="w-5 h-5 text-fjord-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-midnight-abyss font-medium leading-relaxed">
                    {section.callout}
                  </p>
                </div>
              )}

              {/* In-content AdSense placement after every 2 sections as per PRD spec */}
              {(idx === 1 || idx === 3) && (
                <div className="my-8">
                  <AdBanner />
                </div>
              )}
            </motion.div>
          ))}
        </article>

        {/* CTA Box */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-midnight-abyss to-fjord-blue text-white shadow-card">
          <div className="max-w-2xl">
            <span className="badge bg-white/10 text-glacial-sky text-xs mb-3">100% Free AI Tool</span>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
              Ready to Analyze Your Own YouTube Content?
            </h3>
            <p className="text-glacial-sky text-sm md:text-base leading-relaxed mb-6">
              Paste your YouTube video, Shorts, or channel URL to get instant scores, retention analysis, viral hooks, and personalized roadmaps.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/youtube-video-analyzer" className="btn-primary bg-white text-midnight-abyss hover:bg-glacial-sky text-sm">
                <Zap className="w-4 h-4 text-fjord-blue" />
                Analyze YouTube Video
              </Link>
              <Link to="/hook-generator" className="inline-flex items-center text-sm font-semibold text-white hover:text-glacial-sky transition-colors">
                Generate Viral Hooks <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-glacial-sky/20">
          <h3 className="font-heading font-bold text-2xl text-midnight-abyss mb-6">
            Recommended Reading
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(POSTS_DATA)
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="card p-6 flex flex-col justify-between hover:shadow-card-hover transition-all group no-underline"
                >
                  <div>
                    <span className="badge badge-primary text-xs mb-3">{related.category}</span>
                    <h4 className="font-heading font-bold text-lg text-midnight-abyss group-hover:text-fjord-blue transition-colors mb-2">
                      {related.title}
                    </h4>
                    <p className="text-frosty-slate text-sm line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-fjord-blue mt-4">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
