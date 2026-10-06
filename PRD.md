# TrendlyInside

## Master Product Requirements Document (PRD)

Version: 1.0

Status: MVP

Platform: Web Application

Business Model: Free + Ad Supported

Authentication: None

Target Launch: 30 Days

---

# Product Overview

TrendlyInside is a free AI-powered creator intelligence platform that helps content creators understand why their videos perform, identify growth opportunities, generate better content ideas, and improve future content.

Unlike traditional creator tools that require expensive subscriptions, TrendlyInside is completely free and monetized through advertising.

The platform acts as an AI Content Coach for creators by analyzing publicly available content and generating personalized recommendations.

Users simply paste a YouTube URL and receive actionable insights.

No login.

No account creation.

No subscriptions.

No credit card required.

---

# Vision

Become the easiest way for creators to improve their content using AI.

Core Promise:

> Paste a URL. Get insights. Improve content. Grow faster.

---

# Problem Statement

Most creators struggle with:

* Not knowing why videos perform poorly
* Running out of content ideas
* Weak hooks
* Low audience retention
* Lack of content strategy
* No personalized feedback
* Expensive coaching services

Most solutions require subscriptions or advanced analytics knowledge.

TrendlyInside provides simple AI-powered feedback in seconds.

---

# Target Audience

## Primary Audience

### Beginner Creators

Followers:

0–10K

Needs:

* Content ideas
* Growth guidance
* Understanding platform algorithms

---

### Growing Creators

Followers:

10K–100K

Needs:

* Better retention
* Better hooks
* Consistent growth

---

### Personal Brands

Needs:

* Audience growth
* Authority building
* Content strategy

---

### Small Businesses

Needs:

* Organic reach
* Lead generation
* Better social content

---

# Core User Journey

## User Flow

User Visits Website

↓

Paste URL

↓

AI Analysis

↓

Results Page

↓

Recommendations

↓

Try Another Analysis

No Signup Required

---

# MVP Features

---

# Feature 1: YouTube Video Analyzer

## Purpose

Analyze long-form YouTube videos and provide actionable recommendations.

---

## User Input

Supported Format:

https://youtube.com/watch?v=xxxx

---

## Data Extraction

Backend collects:

* Video Title
* Description
* Thumbnail
* Transcript
* Publish Date
* View Count
* Like Count
* Channel Information

---

## AI Analysis

### Hook Analysis

Evaluates:

* Curiosity
* Emotional trigger
* Clarity
* Attention grabbing ability

Output:

* Hook Score
* Improvements

---

### Thumbnail Analysis

Evaluates:

* Visual contrast
* Clickability
* Emotional impact
* Readability

Output:

* Thumbnail Score
* Suggestions

---

### Story Structure Analysis

Evaluates:

* Opening
* Main content
* Ending

Output:

* Storytelling Score
* Structural Improvements

---

### Engagement Analysis

Evaluates:

* Shareability
* Comment potential
* Viewer interest

Output:

* Engagement Score

---

### CTA Analysis

Evaluates:

* Call-to-action placement
* CTA quality
* CTA effectiveness

Output:

* CTA Score

---

## Final Output

Overall Content Score

Strengths

Weaknesses

Recommendations

Action Plan

---

# Feature 2: YouTube Shorts Analyzer

## Purpose

Analyze short-form videos.

---

## User Input

https://youtube.com/shorts/xxxx

---

## AI Analysis

### First 3 Seconds

Evaluates:

* Attention grabbing
* Curiosity
* Viewer retention

---

### Hook Analysis

Evaluates:

* Opening impact
* Scroll-stopping ability

---

### Pacing Analysis

Evaluates:

* Editing speed
* Content density
* Viewer engagement

---

### Viral Potential Analysis

Evaluates:

* Trend relevance
* Shareability
* Replay value

---

## Output

Hook Score

Retention Score

Engagement Score

Viral Potential Score

Recommended Improvements

---

# Feature 3: YouTube Channel Analyzer

## Purpose

Analyze creator profiles and identify growth opportunities.

---

## User Input

https://youtube.com/@creator

---

## Data Collection

Analyze latest 20 videos.

Collect:

* Upload frequency
* Average views
* Content categories
* Posting consistency
* Video performance

---

## AI Analysis

### Content Consistency

### Topic Clarity

### Branding

### Upload Frequency

### Audience Alignment

### Content Quality

---

## Output

Creator Score

Strengths

Weaknesses

Growth Opportunities

30-Day Roadmap

---

# Feature 4: Viral Idea Generator

## Purpose

Generate content ideas based on niche and goals.

---

## Inputs

Niche

Audience

Goal

---

## Example

Niche:

Fitness

Audience:

18-35

Goal:

Gain Followers

---

## Output

50 Content Ideas

Categories:

* Educational
* Storytelling
* Challenge
* Trend-Based
* Contrarian
* Personal Experience

---

# Feature 5: Hook Generator

## Purpose

Generate high-performing content hooks.

---

## Inputs

Topic

Platform

Content Type

---

## Output

20 Hooks

Categories:

* Curiosity
* Story
* Authority
* Contrarian
* Problem Based
* Emotional

---

# Feature 6: Growth Roadmap Generator

## Purpose

Create personalized creator action plans.

---

## Inputs

Niche

Current Stage

Goal

---

## Output

30 Day Growth Plan

Week 1

Week 2

Week 3

Week 4

Specific Action Steps

---

# AI Architecture

## AI Provider

OpenRouter

---

## Free Models

Primary Models:

* DeepSeek
* Qwen
* Gemma
* Llama

---

## AI Workflow

User URL

↓

Content Extraction

↓

Prompt Builder

↓

OpenRouter

↓

Analysis Engine

↓

Results Page

---

# Technical Architecture

## Frontend

React

TypeScript

Tailwind CSS

Shadcn UI

Framer Motion

---

## Backend

Node.js

Express.js

---

## Hosting

Frontend:

Vercel

Backend:

Railway

---

# Database Strategy

Authentication is not required.

No user accounts.

No user profiles.

No saved history.

No dashboards.

---

## Analytics Database

Only store anonymous usage metrics.

Table:

analysis_logs

Columns:

* id
* url_type
* analysis_type
* timestamp

Purpose:

* Usage tracking
* Popular tools
* Product analytics

No personal information stored.

---

# SEO Strategy

Dedicated Landing Pages:

/youtube-video-analyzer

/youtube-shorts-analyzer

/youtube-channel-analyzer

/hook-generator

/viral-idea-generator

/growth-roadmap-generator

---

# Blog Strategy

Create SEO content around:

* YouTube Growth Tips
* Shorts Strategy
* Viral Hooks
* Creator Case Studies
* Retention Techniques
* Thumbnail Psychology

Goal:

Organic traffic acquisition.

---

# Monetization Strategy

## Primary Revenue

Google AdSense

Placement:

Homepage

Results Pages

Tool Pages

Blog Pages

---

## Secondary Revenue

Affiliate Marketing

Partners:

* Canva
* CapCut
* TubeBuddy
* VidIQ
* Beehiiv
* Notion

---

# Performance Requirements

Analysis Time:

Under 15 Seconds

Page Load:

Under 2 Seconds

Mobile Friendly:

100%

Core Web Vitals:

Pass

SEO Optimized:

Yes

---

# MVP Success Metrics

Monthly Visitors

Tool Usage

Average Session Duration

Pages Per Session

Ad Revenue

Affiliate Revenue

Return Visitor Rate

---

# Future Roadmap

## Phase 2

Instagram Reel Analyzer

TikTok Analyzer

Thumbnail Analyzer

Competitor Analyzer

Trend Discovery

Content Calendar Generator

---

## Phase 3

AI Creator Assistant

Trend Prediction Engine

Viral Content Database

Creator Benchmarking

Advanced Analytics

---

# Product Positioning

TrendlyInside

### Free AI Creator Intelligence Platform

Analyze YouTube videos, Shorts, and creator channels with AI.

Get content feedback, growth insights, viral content ideas, and personalized creator roadmaps instantly.

No signup required.

No subscription required.

Just paste a URL and start growing.
