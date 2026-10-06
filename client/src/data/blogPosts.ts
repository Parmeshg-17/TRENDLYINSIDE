import type { BlogPost } from '../types';

// ============================================================
// TrendlyInside - Blog Content
// Single source of truth for both /blog and /blog/:slug
// ============================================================

export const CATEGORY_COLORS: Record<string, string> = {
  'YouTube Growth': 'bg-blue-50 text-blue-700',
  'Shorts Strategy': 'bg-purple-50 text-purple-700',
  'Viral Hooks': 'bg-red-50 text-red-700',
  'Creator Psychology': 'bg-green-50 text-green-700',
  'Retention Tactics': 'bg-amber-50 text-amber-700',
};

export const BLOG_CATEGORIES = [
  'All',
  'YouTube Growth',
  'Shorts Strategy',
  'Viral Hooks',
  'Creator Psychology',
  'Retention Tactics',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'youtube-hooks-that-stop-scroll',
    title: 'How to Write YouTube Hooks That Stop the Scroll',
    excerpt:
      "The first 5 seconds determine if your video lives or dies. Here's the science behind scroll-stopping hooks and how to write them every time.",
    category: 'Viral Hooks',
    readTime: '7 min read',
    publishedAt: '2026-09-28',
    content: `## Why the hook decides everything

YouTube does not rank videos. It ranks sessions. When a viewer clicks your thumbnail, the algorithm watches one number above all others for the next thirty seconds: are they still here?

If they leave, your video gets shown to fewer people next time. If they stay, it gets shown to more. That is the entire game, and it is decided almost entirely by your first five seconds.

## The four jobs of a hook

Every effective hook does four things at once. Most creators manage one or two.

- **Creates a gap.** It opens a question the viewer cannot answer without watching.
- **Signals relevance.** It confirms in a single sentence that this video is for *them*.
- **Sets stakes.** It makes clear something is at risk, gained, or lost.
- **Establishes credibility.** It gives a reason to trust what comes next.

## The techniques that actually work

### 1. Lead with tension, not topic

Weak: "Today I'm talking about weight loss."

Strong: "I tried every diet for a year and found the one that actually worked — and it wasn't the one everyone recommends."

The second version creates a gap. The viewer now needs the answer.

### 2. Open a curiosity loop you close later

State a specific, intriguing fact and promise the explanation. Then deliver it — a loop you never close is the fastest way to lose a returning viewer.

### 3. Start mid-scene

If your video contains a story, do not build up to it. Drop the viewer into the most tense moment, then rewind.

### 4. Promise a transformation, not information

People do not watch for facts. They watch for change. "How I went from 0 to 100,000 subscribers" outperforms "10 YouTube growth tips" because one is a transformation and the other is a list.

## The mistakes that kill hooks

- **The 20-second intro.** Nobody cares who you are yet. Earn that later.
- **Burying the promise.** If the payoff is at 0:45, say so at 0:05.
- **Over-explaining setup.** Cut every sentence that does not raise a question or answer one.
- **Apologising.** "Sorry this took so long" tells the viewer the video is not worth their time.

## A hook-writing system you can repeat

1. Write the hook **last**, after you know what the video actually delivers.
2. Write ten versions. Your first is never your best.
3. Read each one out loud. If it sounds like writing, rewrite it.
4. Cut the first sentence of every draft. It is almost always throat-clearing.
5. Test the thumbnail and hook as a pair. They are one unit, not two.

## How to score your own hook

Ask these five questions and give each a score out of ten.

- Does it create a question?
- Is it specific rather than generic?
- Does it promise something concrete?
- Would a stranger stop scrolling for this?
- Does it sound like a person talking?

Below 35 out of 50 means rewrite it. Above 40 means you can start editing.

## The one-line summary

A hook is not an introduction. It is a contract. You are promising the viewer that the next several minutes are worth more than everything else competing for their attention — and the best hooks make that promise specific, urgent, and impossible to ignore.`,
  },
  {
    id: '2',
    slug: 'youtube-shorts-strategies-2025',
    title: '10 YouTube Shorts Strategies That Actually Work in 2026',
    excerpt:
      "Shorts are the fastest path to channel growth. These 10 strategies are backed by data from 1,000+ creator channels we've analyzed.",
    category: 'Shorts Strategy',
    readTime: '9 min read',
    publishedAt: '2026-09-20',
    content: `## Shorts are still the fastest growth lever

Long-form builds depth. Shorts build reach. For a channel under 10,000 subscribers, Shorts are almost always the faster path — because the algorithm tests every Short against a fresh audience, regardless of how many subscribers you already have.

Here are the ten strategies that consistently show up in the data.

## 1. Win the first second, not the first three

The conventional advice says three seconds. In practice, most swipe-aways happen before the end of the first. Your opening frame and first spoken word carry almost all the weight.

## 2. Front-load the payoff, then earn the watch

Unlike long-form, Shorts reward giving the answer early and making the viewer stay for the nuance. Withholding everything until the end gets you swiped.

## 3. Design for loopability

A Short that ends where it began earns a second view, and replays are weighted heavily. End on a line that makes the opening land differently.

## 4. One idea per Short

Every additional idea halves your retention. If you have three ideas, you have three Shorts, not one.

## 5. Optimise the caption line

The first line of your description appears on screen under the video. Treat it as a second hook, not an afterthought.

## 6. Use text as a retention device

On-screen text tells silent viewers what is happening and gives them a reason to keep watching. It is not decoration — it is structure.

## 7. Cut every pause

Silence reads as a natural exit point. Tighten your edit until it feels almost too fast, then stop.

## 8. Hook the topic trends without chasing them

Trending audio and formats give you distribution. But a trend with no relevance to your niche brings viewers who will never come back. Borrow the format, keep your subject.

## 9. Convert Shorts viewers into subscribers

A Short that performs well brings thousands of first-time viewers. Without a clear reason to subscribe, most leave. A single sentence — what they get by following — is enough.

## 10. Post enough to learn

One Short is a coin flip. Twenty is a dataset. You cannot read a pattern from three attempts.

## Measuring what matters

Ignore views as a primary metric. Track these instead:

- **Swipe-away rate** in the first three seconds
- **Average view duration** as a percentage of length
- **Replays** per view
- **Subscribers gained per thousand views**

The last one tells you whether your Shorts are growing a channel or just harvesting fleeting attention.

## A 30-day Shorts sprint

- **Days 1–5:** Post five Shorts in one idea format. Do not vary anything else.
- **Days 6–10:** Change only the hook style. Keep the format identical.
- **Days 11–20:** Take the best-performing hook and format, and make ten variations.
- **Days 21–30:** Double down. Publish two per day of the winning combination.

The point is not to find the perfect Short. It is to find the repeatable one.`,
  },
  {
    id: '3',
    slug: 'why-youtube-channel-not-growing',
    title: "Why Your YouTube Channel Isn't Growing (And How to Fix It)",
    excerpt:
      'Most creators make the same 5 mistakes. This guide will show you exactly how to diagnose and fix them — based on analysis of 10,000+ channels.',
    category: 'YouTube Growth',
    readTime: '12 min read',
    publishedAt: '2026-09-15',
    content: `## Growth is a symptom, not a goal

Almost every creator who says "my channel is not growing" is describing a symptom. The cause is always upstream of the subscriber count. This guide walks through the five most common causes, in the order they should be diagnosed.

## Diagnosis 1: Your thumbnails are losing the click

Open YouTube Studio and find your impressions click-through rate. Compare only within your own channel, using videos with similar topics.

- Below 3%: your packaging is the bottleneck. Nothing downstream matters until this improves.
- 4–6%: healthy. Move on.
- Above 8%: your packaging is working harder than your content. Expect a retention problem.

If click-through is the issue, the problem is rarely the artwork quality. It is almost always one of these: no clear subject, too much text, low contrast at small size, or a promise that duplicates the title instead of extending it.

## Diagnosis 2: Your retention curve has a cliff, not a slope

A healthy retention curve falls gradually. A cliff — a sudden drop at a specific timestamp — tells you exactly where you lost people. Watch that forty-five second window of your own video and you will usually find the cause immediately: a tangent, a sponsor read, a topic change, or a long pause.

## Diagnosis 3: Your topic is unrelated to your last ten videos

The algorithm builds a model of who your channel is for. When you publish a video that does not fit that model, it gets shown to the wrong people, performs badly, and drags down the whole channel's recommendations.

Check your last ten titles. If a stranger could not describe your channel in one sentence after reading them, your topic signal is too broad.

## Diagnosis 4: Your upload cadence is unpredictable

Consistency does two things. It trains the algorithm to expect your content, and it trains your audience to expect it. An unpredictable schedule weakens both.

This does not mean daily uploads. Three videos a month, published on the same days, outperforms twelve videos published at random.

## Diagnosis 5: You are competing on a topic you cannot win

If ten established channels with a million subscribers each already cover your exact topic, you need an angle they do not have — a different format, a narrower audience, or a stronger personal story.

## The order to fix things in

Most creators work on the wrong problem first. Follow this order:

1. **Packaging.** Title and thumbnail. If nobody clicks, nothing else is measured.
2. **Hook.** The first thirty seconds. If nobody stays, packaging gains are wasted.
3. **Structure.** Pacing and payoffs. If viewers leave halfway, you lose session time.
4. **Topic focus.** Narrow until you are unmistakable.
5. **Cadence.** Only once the above are working.

## A weekly review you can run in fifteen minutes

- Which video had the highest click-through? What did its thumbnail do differently?
- Which had the best retention? Where did it hold attention?
- What was the single biggest drop-off timestamp across all videos?
- Do the week's titles share a clear theme?

Answer those four questions every week for a year and you will understand your channel better than any dashboard can tell you.`,
  },
  {
    id: '4',
    slug: 'thumbnail-psychology-clicks',
    title: 'The Psychology Behind YouTube Thumbnails That Get Clicked',
    excerpt:
      'Learn why some thumbnails get 12% click-through rates while others get 2% — and how to design thumbnails that viewers can resist less.',
    category: 'YouTube Growth',
    readTime: '8 min read',
    publishedAt: '2026-09-10',
    content: `## A thumbnail is a question, not a picture

The most common mistake in thumbnail design is treating it as a summary of the video. It is not. It is an unanswered question that the video promises to resolve.

A thumbnail that answers the question removes the reason to click.

## The three signals viewers process

Thumbnails are read in under half a second, at a fraction of their designed size. In that time, a viewer processes three things:

### 1. Contrast

What stands out against the surrounding feed? Feed backgrounds are predominantly light. Faces and high-contrast subjects win attention. Three identical face-thumbnails in a row cancel each other out.

### 2. Emotion

Viewers read the face before they read the text. A genuine expression — surprise, concern, delight — outperforms a neutral one almost every time. Exaggerated expressions perform worse than real ones because viewers detect the performance.

### 3. Readability

At phone size you have room for roughly three or four words. More than that and the text becomes texture, not information.

## What separates 2% from 12%

In practice, four things:

- **A single clear subject.** Multiple competing elements split attention and reduce comprehension.
- **A gap between thumbnail and title.** If the thumbnail repeats the title, one of them is wasted. They should combine into a complete idea.
- **A visual cue for the category.** Viewers scan for content type. A recognisable visual language gets you categorised instantly.
- **Colour that is not accidental.** Use the surrounding feed's colour to your advantage — contrast against it rather than matching it.

## The mistake that costs the most

Faces with no expression. A neutral face communicates nothing, and viewers scrolling do not stop for nothing.

## A practical testing method

1. Design three thumbnails with genuinely different approaches — not three crops of the same photo.
2. Shrink all three to 20% size. If you cannot tell what each one is about, that is your answer.
3. Check them against your channel's recent thumbnails. Do they look like a set without looking identical?
4. Publish and check click-through after 48 hours, then swap.

## Consistency beats cleverness

The channels that win at thumbnails are not the most creative. They are the most consistent. A recognisable system means returning viewers spot your videos instantly in a crowded feed — and that recognition alone earns clicks before the design does any work.`,
  },
  {
    id: '5',
    slug: 'retention-tactics-2025',
    title: 'Advanced Retention Tactics: Keep Viewers Watching Until the End',
    excerpt:
      'Viewer retention is the #1 algorithm signal on YouTube. Here are 12 proven tactics to keep people watching from first second to last.',
    category: 'Retention Tactics',
    readTime: '10 min read',
    publishedAt: '2026-09-05',
    content: `## Retention is the signal that compounds

Every other metric is downstream of retention. Higher retention means more session time, which means more impressions, which means more views. Nothing else improves a channel as reliably.

Here are twelve tactics that show up repeatedly in high-retention videos.

## Opening

**1. Answer the title question in the first sixty seconds.** Not fully — but enough to prove the video will deliver. Viewers abandon when they suspect the answer is being withheld.

**2. Establish stakes immediately.** Tell the viewer what happens if they keep watching, and what they lose if they leave.

## Structure

**3. Use pattern interrupts every 30–45 seconds.** A cut, a B-roll change, a graphic, a shift in tone. Not gimmicks — changes of pace that reset attention.

**4. Open a loop, close a loop, open a new one.** The moment you resolve one question, raise the next. Never leave the viewer with nothing pending.

**5. Put the strongest material at the front, not the back.** Save something for the end, but never the best thing. Viewers who never reach the end never see it.

## Pacing

**6. Cut every pause longer than half a second.** Silence reads as an exit point. Edit until it feels almost uncomfortably tight.

**7. Vary sentence length.** Long, explanatory sentences followed by a short one. Rhythm holds attention better than consistency.

**8. Remove every sentence that begins with "before we get started."** It is a signal that the real content is still coming.

## Payoff

**9. Deliver on the specific promise you made.** If the title implies a number, give the number. Vague payoffs lose returning viewers permanently.

**10. End on the next question, not a summary.** A summary is a natural exit. A new question is a reason to stay subscribed.

## Craft

**11. Use visuals to carry information the audio does not.** Viewers who watch without sound should still follow the argument.

**12. Watch your own video with the retention graph open.** Identify the exact timestamp of every drop, then find the sentence that caused it. Fix one per video.

## The only retention metric worth tracking daily

Absolute retention percentage varies enormously by video length and topic. What matters more is **relative retention** — how this video's curve compares to your channel's average, at the same timestamp.

A video that holds 60% of viewers at the three-minute mark when your average is 45% is a win, regardless of what the raw number looks like. Track the delta, not the score.`,
  },
  {
    id: '6',
    slug: 'creator-psychology-consistency',
    title: 'Creator Psychology: How Top YouTubers Stay Consistent for Years',
    excerpt:
      'Consistency is what separates successful creators from those who quit. Here is how to build the mindset and systems that make it inevitable.',
    category: 'Creator Psychology',
    readTime: '6 min read',
    publishedAt: '2026-08-28',
    content: `## Consistency is a systems problem

Most advice treats consistency as discipline. It is not. Creators who publish for years without burning out have built systems that make publishing the default, not a daily decision.

## Why motivation fails

Motivation is a feeling. Feelings fluctuate with sleep, mood, and how your last video performed. A publishing schedule that depends on how you feel will break the first week a video underperforms.

The fix is to remove the decision entirely.

## The systems that actually hold

### Batch by activity, not by video

Writing, filming, and editing use different parts of your attention. Doing all three for one video each week means constant context-switching. Batching — script four videos in one sitting, film them in one day — is dramatically more efficient and easier to sustain.

### Set a floor, not a target

"I will publish three times a week" is fragile. "I will publish at least once a week, no matter what" is durable. A floor you always hit beats a target you frequently miss.

### Keep a permanent idea backlog

The hardest part of a new video is deciding what it is about. If you always have twenty drafted ideas waiting, you never face a blank page on filming day.

### Separate creating from evaluating

Checking analytics while making a video is poison. The numbers from the last video have no bearing on whether the current one is good, and they will change your decisions for the worse. Look at analytics on one fixed day per week, and not otherwise.

## The comparison trap

Every creator compares their current work to another creator's most successful work. That comparison is structurally unfair — you are comparing your behind-the-scenes to someone else's highlight reel, and their tenth year to your first.

A more useful comparison: your videos from six months ago. That is the only benchmark with any signal in it.

## Handling a video that flops

A flop is data, not a verdict. Separate the two questions:

- **What was wrong with this video?** Answerable, useful, fixable.
- **Am I bad at this?** Unanswerable, useless, and almost always false.

Answer the first, refuse the second. Every channel with a long history has a long list of failures. The channels that survived are the ones that treated each failure as a specific, answerable question.

## The long game

Most channels that appear to grow overnight are the result of two or three years of consistent publishing that only became visible at the end. Consistency is not a strategy for going viral. It is a strategy for still being here when the thing that works finally shows up.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
