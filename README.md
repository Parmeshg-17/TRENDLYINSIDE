# TrendlyInside — AI Creator Intelligence Platform

> **Understand Why Content Performs.**
> Free AI-powered YouTube video, Shorts, and channel intelligence platform. No login required. No subscriptions. 100% free.

---

## 🏔️ Design Theme: Winter Mountain Intelligence

TrendlyInside delivers clarity through the **Winter Mountain** aesthetic:
- **Soft Alpenglow (`#FADADD`)**: Accent highlights, badges, and attention points
- **Glacial Sky (`#C2D6EC`)**: Soft backgrounds, subtle borders, and focus rings
- **Frosty Slate (`#94A9D0`)**: Secondary text, metrics, and dividers
- **Deep Fjord Blue (`#4A6D99`)**: Primary buttons, interactive elements, headings
- **Midnight Abyss (`#223354`)**: Primary high-contrast text, navigation, and dark footer

---

## ⚡ Core Features

1. **YouTube Video Analyzer** (`/youtube-video-analyzer`)
   - Real-time video metadata extraction via oEmbed
   - Multi-dimensional AI evaluation: Hook (0-100), Thumbnail (0-100), Storytelling (0-100), Engagement (0-100), CTA (0-100)
   - Strengths, Weaknesses, and prioritized Recommendations with Action Plan

2. **YouTube Shorts Analyzer** (`/youtube-shorts-analyzer`)
   - First 3 Seconds retention diagnosis
   - Hook effectiveness & Scroll-stopping score
   - Pacing & Editing density analysis
   - Algorithmic Viral Potential & Replay Value metrics

3. **YouTube Channel Analyzer** (`/youtube-channel-analyzer`)
   - Overall Creator Score & 6 sub-metric diagnostics
   - Content consistency, Topic clarity, and Branding audit
   - 4-Week tailored creator action plan

4. **Viral Hook Generator** (`/hook-generator`)
   - 20 high-converting hooks across 6 psychology categories (Curiosity, Story, Authority, Contrarian, Emotional, Problem-Based)
   - One-click copy buttons and "Copy All" export

5. **Viral Idea Generator** (`/viral-idea-generator`)
   - 50 structured content ideas customized by niche and audience goal
   - Filterable categories: Educational, Storytelling, Challenge, Trend-Based, Contrarian, Personal Experience
   - Estimated viral potential scoring (High / Medium)

6. **Growth Roadmap Generator** (`/growth-roadmap-generator`)
   - Personalized 30-day week-by-week execution plan
   - Task priorities (High/Med/Low), time estimates, milestones, and success tips
   - Formatted text export for Notion or Google Docs

7. **SEO Landing Pages & Blog**
   - High-intent landing pages for all tools
   - Articles covering YouTube retention science, Shorts strategy, and thumbnail psychology
   - OpenGraph, Twitter Cards, and Schema.org JSON-LD Structured Data

---

## 🛠️ Architecture

```
viral inside/
├── client/                      # React 19 + TypeScript + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── components/          # Navbar, Footer, ScoreCircle, ScoreCard, AdBanner, etc.
│   │   ├── pages/               # Home, VideoAnalyzer, ShortsAnalyzer, ChannelAnalyzer, etc.
│   │   ├── services/            # Axios API client with strict TypeScript definitions
│   │   └── types/               # Complete TypeScript data model interfaces
│   └── index.html               # Production SEO metadata, Google Fonts, JSON-LD
│
└── server/                      # Node.js + Express.js API
    ├── src/
    │   ├── routes/              # /api/v1/analyze and /api/v1/generate
    │   └── services/
    │       ├── openRouterService.js     # Multi-model AI router (DeepSeek, Qwen, Gemma, Llama)
    │       ├── fallbackIntelligence.js  # Resilient fallback engine
    │       ├── promptBuilder.js         # Structured prompt constructors
    │       └── youtubeService.js        # YouTube metadata extraction
    └── test_api.js              # Automated end-to-end endpoint test suite
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher

### 2. Backend Setup
```bash
cd server
npm install
npm test          # Runs automated verification across all 7 endpoints
npm run dev       # Starts server on http://localhost:5000
```

*(Optional)* To use live OpenRouter AI models:
Set your key in `server/.env`:
```env
OPENROUTER_API_KEY=your_key_here
```
*Note: If no API key is provided, TrendlyInside automatically uses its internal intelligence engine so you can test all features offline without any setup.*

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev       # Starts Vite dev server on http://localhost:5173
npm run build     # Production build (TypeScript check + Minification)
```

---

## 🧪 Testing & Validation

```bash
# In server directory:
npm test

# In client directory:
npm run build
```

---

## 📄 License
MIT License. Built for creators worldwide.
