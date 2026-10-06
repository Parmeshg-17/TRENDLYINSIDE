# TrendlyInside

## Design Specification (.md)

Version: 1.0

Design Theme: Winter Mountain Intelligence

Design Style: Modern SaaS + Glassmorphism + AI Intelligence Dashboard

Brand Personality:

* Intelligent
* Trustworthy
* Calm
* Professional
* Premium
* Data Driven
* Creator Focused

---

# Design Vision

TrendlyInside should feel like:

> "Standing at the top of a snowy mountain with complete clarity."

Most creator tools feel overwhelming.

TrendlyInside should feel:

* Clean
* Focused
* Peaceful
* Professional

The user should instantly trust the analysis and feel guided rather than overloaded.

The Winter Mountain design system creates a unique visual identity compared to typical dark AI products.

---

# Brand Identity

## Brand Name

TrendlyInside

## Tagline

Understand Why Content Performs.

Alternative:

Analyze. Improve. Grow.

Alternative:

Your AI Creator Intelligence Platform.

---

# Color System

## Primary Colors

### Soft Alpenglow

```css
#FADADD
```

Usage:

* Accent highlights
* Badges
* Success states
* Section highlights

---

### Glacial Sky

```css
#C2D6EC
```

Usage:

* Background sections
* Hover states
* Input focus backgrounds

---

### Frosty Slate

```css
#94A9D0
```

Usage:

* Secondary text
* Borders
* Icons
* Dividers

---

### Deep Fjord Blue

```css
#4A6D99
```

Usage:

* Primary buttons
* Navigation
* Headings
* Charts

---

### Midnight Abyss

```css
#223354
```

Usage:

* Main text
* Footer
* Dark backgrounds
* Hero overlays

---

# CSS Variables

```css
:root {
  --color-alpenglow: #FADADD;
  --color-glacial-sky: #C2D6EC;
  --color-frosty-slate: #94A9D0;
  --color-fjord-blue: #4A6D99;
  --color-midnight-abyss: #223354;

  --bg-main: #F7FAFC;
  --bg-card: #FFFFFF;

  --text-main: #223354;
  --text-muted: #4A6D99;
}
```

---

# Typography

## Headings

Font:

Playfair Display

Fallback:

Georgia

Weights:

400

700

---

## Body

Font:

Inter

Fallback:

system-ui

Weights:

300

400

500

---

# Typography Scale

## H1

```css
48px
font-weight:700;
line-height:1.2;
```

Used For:

Hero Headlines

---

## H2

```css
36px
font-weight:700;
line-height:1.3;
```

Used For:

Section Titles

---

## H3

```css
24px
font-weight:600;
line-height:1.4;
```

Used For:

Cards

---

## Body

```css
16px
font-weight:400;
line-height:1.6;
```

---

## Caption

```css
14px
font-weight:300;
line-height:1.5;
```

---

# Layout System

## Container Width

```css
max-width: 1280px;
margin: auto;
padding: 0 24px;
```

---

# Grid

Desktop

```css
12 Columns
```

Tablet

```css
8 Columns
```

Mobile

```css
4 Columns
```

---

# Border Radius

Small

```css
8px
```

Cards

```css
12px
```

Large Components

```css
20px
```

---

# Shadow System

Cards

```css
0 10px 25px -5px rgba(34,51,84,0.05)
```

Floating Elements

```css
0 20px 40px rgba(34,51,84,0.10)
```

---

# Navigation Design

## Style

Glassmorphism

---

## Background

```css
rgba(255,255,255,0.85)
```

---

## Blur

```css
backdrop-filter: blur(10px)
```

---

## Layout

```text
Logo

Video Analyzer
Channel Analyzer
AI Tools
Blog

Analyze Now
```

---

# Hero Section

## Goal

Immediately explain the product.

---

## Background

Winter mountain landscape.

Snow-covered mountains.

Blue glacial water.

Subtle animated particles.

---

## Overlay

```css
linear-gradient(
to bottom,
rgba(34,51,84,0.30),
rgba(34,51,84,0.70)
)
```

---

## Hero Headline

Understand Why Content Performs

---

## Hero Subtitle

Analyze YouTube videos, Shorts and channels with AI.

Get actionable insights, growth opportunities and content recommendations instantly.

---

## URL Input

Large center aligned input.

```text
Paste YouTube URL Here
```

---

## Primary CTA

Analyze Content

---

## Secondary CTA

View Demo Report

---

# Homepage Structure

## Section 1

Hero

---

## Section 2

How It Works

### Step 1

Paste URL

### Step 2

AI Analysis

### Step 3

Get Growth Insights

---

## Section 3

Core Features

Grid Layout

---

### Card 1

Video Analyzer

---

### Card 2

Shorts Analyzer

---

### Card 3

Channel Analyzer

---

### Card 4

Hook Generator

---

### Card 5

Idea Generator

---

### Card 6

Growth Roadmap

---

## Section 4

Example Analysis

Show realistic AI report preview.

---

## Section 5

Benefits

Why Creators Use TrendlyInside

---

## Section 6

Blog

Latest Creator Growth Articles

---

## Section 7

Footer

---

# AI Analysis Results Page

## Header

Video Thumbnail

Video Title

Channel Name

---

## Score Section

Large circular score.

```text
Overall Score

82 / 100
```

---

# Analysis Cards

## Hook Score

---

## Retention Score

---

## Storytelling Score

---

## Engagement Score

---

## CTA Score

---

# Recommendations Section

Card Layout

```text
What Works

What Doesn't

How To Improve
```

---

# Channel Analysis Page

## Hero

Paste Channel URL

---

## Creator Score

```text
84 / 100
```

---

## Sections

Strengths

Weaknesses

Growth Opportunities

30-Day Roadmap

---

# Viral Idea Generator

## Layout

Form Left

Results Right

---

## Inputs

Niche

Audience

Goal

---

## Results

50 Ideas

Grouped by category.

---

# Hook Generator

## Input

Topic

Platform

Content Type

---

## Output

20 Hooks

Copy Buttons

---

# Growth Roadmap Generator

## Output Layout

Week 1

Week 2

Week 3

Week 4

---

# AdSense Placement Strategy

## Homepage

Below Features Section

---

## Analysis Page

Between Score Cards and Recommendations

---

## Blog

After every 2 sections

---

# Animations

## Framer Motion

Used for:

* Hero fade in
* Card hover
* Scroll reveal
* Score animations

---

## Hover Effects

Cards:

```css
transform: translateY(-5px);
```

---

Buttons:

```css
scale(1.02)
```

---

# Mobile Design

## Priority

Mobile First

Most creators use mobile.

---

## Mobile Navigation

Hamburger Menu

---

## Mobile Hero

Stacked Layout

---

## Mobile Cards

Single Column

---

# Accessibility

Minimum Contrast Ratio

WCAG AA

---

Keyboard Navigation

Supported

---

Screen Readers

Supported

---

# Visual Inspiration

Mix of:

* Linear
* Stripe
* Framer
* Notion
* Apple
* Alpine Mountain Photography

---
