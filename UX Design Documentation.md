### TrendlyInside — UX Design Documentation

# 1. Sitemap / Information Architecture

```text
Home
│
├── Video Analyzer
│   ├── YouTube Video Analyzer
│   └── YouTube Shorts Analyzer
│
├── Channel Analyzer
│   └── YouTube Channel Analyzer
│
├── AI Generators
│   ├── Viral Idea Generator
│   ├── Hook Generator
│   └── Growth Roadmap Generator
│
├── Blog
│   ├── Creator Growth
│   ├── YouTube Tips
│   ├── Viral Hooks
│   ├── Shorts Strategy
│   └── Case Studies
│
├── About
│
├── Contact
│
└── Privacy Policy
```

---

# 2. Navigation Structure

## Header Navigation

```text
[Logo]

Video Analyzer
Channel Analyzer
AI Tools
Blog

[Analyze Now]
```

### Desktop

```text
--------------------------------------------------
 TrendlyInside

 Video Analyzer
 Channel Analyzer
 AI Tools
 Blog

                     [Analyze Now]
--------------------------------------------------
```

### Mobile

```text
-------------------------
☰          TrendlyInside
-------------------------

Menu

• Video Analyzer
• Channel Analyzer
• AI Tools
• Blog
• About
```

---

# 3. User Flow Diagrams

---

## Flow 1 — YouTube Video Analysis

### Goal

User analyzes a YouTube video.

```text
Landing Page

↓

Paste YouTube URL

↓

Click Analyze

↓

Loading Screen

↓

AI Processing

↓

Results Page

↓

View Recommendations

↓

Try Another Analysis
```

---

### Detailed Flow

```text
Home

↓

Input URL

↓

Validate URL

↓

Valid?
├─ No → Show Error
│
└─ Yes

↓

Extract Video Data

↓

Send to AI

↓

Generate Analysis

↓

Display Results

↓

CTA:
Analyze Another Video
```

---

# Flow 2 — YouTube Shorts Analysis

```text
Home

↓

Paste Shorts URL

↓

Analyze

↓

Extract Metadata

↓

AI Analysis

↓

Results

↓

Improvement Suggestions
```

---

# Flow 3 — Channel Analysis

```text
Home

↓

Paste Channel URL

↓

Fetch Recent Videos

↓

Analyze Channel

↓

Generate Creator Report

↓

Show:

Creator Score

Strengths

Weaknesses

Roadmap
```

---

# Flow 4 — Viral Idea Generator

```text
Home

↓

Open Generator

↓

Enter Niche

↓

Enter Audience

↓

Enter Goal

↓

Generate Ideas

↓

View 50 Ideas

↓

Copy Ideas
```

---

# Flow 5 — Hook Generator

```text
Home

↓

Hook Generator

↓

Enter Topic

↓

Select Platform

↓

Generate Hooks

↓

View Results

↓

Copy Hooks
```

---

# Flow 6 — Growth Roadmap Generator

```text
Home

↓

Roadmap Generator

↓

Enter Niche

↓

Enter Goal

↓

Generate

↓

30-Day Growth Plan

↓

Download / Copy
```

---

# 4. Page Structure

---

# Homepage

### Purpose

Convert visitors into tool users immediately.

---

## Wireframe

```text
+------------------------------------------------+
| LOGO                              Analyze Now  |
+------------------------------------------------+

                HERO SECTION

       Understand Why Videos Go Viral

 Analyze YouTube Videos, Shorts & Channels
        With AI — Completely Free

+------------------------------------------+
| Paste YouTube URL Here                   |
+------------------------------------------+

            [ Analyze Content ]

------------------------------------------------

Features

[ Video Analysis ]
[ Channel Analysis ]
[ AI Growth Plan ]

------------------------------------------------

How It Works

1. Paste URL
2. AI Analysis
3. Get Insights

------------------------------------------------

Popular Tools

Video Analyzer
Hook Generator
Idea Generator

------------------------------------------------

Blog Preview

------------------------------------------------

Footer
```

---

# Video Analyzer Page

## Wireframe

```text
+------------------------------------+
| TrendlyInside                      |
+------------------------------------+

Analyze Any YouTube Video

+------------------------------------+
| Paste Video URL                    |
+------------------------------------+

          [ Analyze ]

--------------------------------------

Example Results

--------------------------------------

FAQ

--------------------------------------

Footer
```

---

# Loading State

```text
--------------------------------------

Analyzing Your Video...

[███████░░░░░]

✓ Fetching Metadata

✓ Extracting Transcript

⟳ Running AI Analysis

--------------------------------------
```

---

# Results Page

## Wireframe

```text
+-----------------------------------+
| Analysis Complete                 |
+-----------------------------------+

Overall Score

       78 / 100

-----------------------------------

Hook Score

7.5 / 10

-----------------------------------

Strengths

✓ Strong Title
✓ Good Topic

-----------------------------------

Weaknesses

✗ Weak Intro
✗ Weak CTA

-----------------------------------

Recommendations

1.
2.
3.

-----------------------------------

[ Analyze Another Video ]
```

---

# Channel Analyzer Page

## Wireframe

```text
+----------------------------------+
| Analyze Creator Channel          |
+----------------------------------+

Paste Channel URL

+-------------------------------+
| https://youtube.com/@creator |
+-------------------------------+

          [ Analyze ]

----------------------------------

Creator Score

85 / 100

----------------------------------

Strengths

----------------------------------

Weaknesses

----------------------------------

30-Day Roadmap

----------------------------------
```

---

# Hook Generator Page

## Wireframe

```text
+-----------------------------------+
| Hook Generator                    |
+-----------------------------------+

Topic

+-----------------------------+
|                             |
+-----------------------------+

Platform

[YouTube ▼]

-----------------------------------

[ Generate Hooks ]

-----------------------------------

Results

1.

2.

3.

4.

-----------------------------------

[ Copy All ]
```

---

# Viral Idea Generator Page

## Wireframe

```text
+--------------------------------+
| Viral Idea Generator           |
+--------------------------------+

Niche

+---------------------------+

Audience

+---------------------------+

Goal

+---------------------------+

--------------------------------

[ Generate Ideas ]

--------------------------------

50 Content Ideas

1.
2.
3.
4.

--------------------------------
```

---

# Growth Roadmap Page

## Wireframe

```text
+-----------------------------------+
| Growth Roadmap Generator          |
+-----------------------------------+

Niche

Goal

Current Stage

-----------------------------------

[ Generate Plan ]

-----------------------------------

Week 1

Tasks

-----------------------------------

Week 2

Tasks

-----------------------------------

Week 3

Tasks

-----------------------------------

Week 4

Tasks

-----------------------------------

[ Copy Plan ]
```

---

# Ad Placement UX

Keep ads non-intrusive.

### Homepage

```text
Hero

↓

Features

↓

Ad Banner

↓

How It Works
```

### Results Page

```text
Analysis

↓

Recommendations

↓

Ad Block

↓

Additional Insights
```

### Blog

```text
Content

↓

Ad

↓

Content
```

---

# UX Principles

### Fast

No login required.

### Frictionless

Paste URL → Analyze.

### Mobile First

70%+ creators likely arrive from mobile.

### Actionable

Every analysis ends with clear next steps.

### Shareable

Users can share analysis results.

### SEO Optimized

Every tool has its own landing page.

---


