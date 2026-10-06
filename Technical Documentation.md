# TrendlyInside

## Technical Documentation

Version: 1.0

Project Type: AI Creator Intelligence Platform

Architecture Style: Modern Full-Stack SaaS (No Authentication)

Business Model: Free + Ad Supported

Platform: Web Application

---

# Project Overview

TrendlyInside is an AI-powered creator analysis platform that helps users analyze YouTube videos, YouTube Shorts, and YouTube channels.

Users simply paste a URL and receive AI-generated insights, recommendations, content ideas, and growth roadmaps.

No login required.

No subscription required.

No user accounts.

---

# Core Objectives

### Performance

* Fast page loads
* Analysis under 15 seconds

### Simplicity

* No authentication
* No onboarding

### Scalability

* Serverless-first architecture
* Stateless backend

### SEO

* SEO-first architecture
* Landing pages for every tool

---

# System Architecture

```text
┌─────────────────────────────┐
│          User               │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         Frontend            │
│ React + TypeScript          │
│ Tailwind + Shadcn UI        │
└──────────────┬──────────────┘
               │ API Request
               ▼
┌─────────────────────────────┐
│         Backend API         │
│ Node.js + Express           │
└──────────────┬──────────────┘
               │
     ┌─────────┴──────────┐
     │                    │
     ▼                    ▼
YouTube Data       OpenRouter AI
Extraction         Analysis Engine

     │                    │
     └─────────┬──────────┘
               ▼
        Analysis Result

               ▼
            Frontend
```

---

# Technology Stack

## Frontend

### Framework

React

### Language

TypeScript

### Build Tool

Vite

### Styling

Tailwind CSS

### UI Components

Shadcn UI

### Animations

Framer Motion

### Icons

Lucide React

### Charts

Recharts

---

# Backend

### Runtime

Node.js

### Framework

Express.js

### Validation

Zod

### HTTP Client

Axios

### Environment

dotenv

---

# AI Layer

## Provider

OpenRouter

### Official Website

[OpenRouter](https://openrouter.ai?utm_source=chatgpt.com)

---

# AI Models

## Primary Analysis

### DeepSeek

Used for:

* Content analysis
* Growth recommendations
* Roadmap generation

---

## Qwen

Used for:

* Creator profile analysis
* Trend detection
* Strategy generation

---

## Gemma

Used for:

* Hook generation
* Idea generation
* Content recommendations

---

## Llama

Used for:

* Backup model
* Fallback processing

---

# Hosting Architecture

## Frontend

Vercel

Responsibilities:

* Static pages
* SEO pages
* Tool interfaces

---

## Backend

Railway

Alternative:

Render

Alternative:

DigitalOcean VPS

---

# Folder Structure

```text
trendlyinside/

├── client/
│
├── server/
│
├── shared/
│
├── docs/
│
├── public/
│
└── scripts/
```

---

# Frontend Structure

```text
client/

├── src/
│
├── components/
│
├── pages/
│
├── layouts/
│
├── hooks/
│
├── services/
│
├── utils/
│
├── lib/
│
├── types/
│
└── assets/
```

---

# Pages Structure

```text
pages/

Home.tsx

VideoAnalyzer.tsx

ShortsAnalyzer.tsx

ChannelAnalyzer.tsx

HookGenerator.tsx

IdeaGenerator.tsx

RoadmapGenerator.tsx

Blog.tsx

BlogPost.tsx

About.tsx

Contact.tsx

Privacy.tsx
```

---

# Component Structure

```text
components/

Navbar

Footer

Hero

AnalysisCard

ScoreCard

FeatureCard

ToolCard

LoadingState

ResultSection

BlogCard

AdBanner
```

---

# Backend Structure

```text
server/

controllers/

services/

routes/

middlewares/

prompts/

utils/

types/

config/
```

---

# API Architecture

Base URL

```text
/api/v1
```

---

# Video Analysis API

## Endpoint

```http
POST /api/v1/analyze/video
```

---

## Request

```json
{
  "url": "https://youtube.com/watch?v=123"
}
```

---

## Response

```json
{
  "overallScore": 82,
  "hookScore": 78,
  "engagementScore": 85,
  "retentionScore": 75,
  "recommendations": []
}
```

---

# Shorts Analysis API

## Endpoint

```http
POST /api/v1/analyze/shorts
```

---

## Request

```json
{
  "url": "https://youtube.com/shorts/123"
}
```

---

# Channel Analysis API

## Endpoint

```http
POST /api/v1/analyze/channel
```

---

## Request

```json
{
  "url": "https://youtube.com/@creator"
}
```

---

# Hook Generator API

## Endpoint

```http
POST /api/v1/generate/hooks
```

---

## Request

```json
{
  "topic": "fitness",
  "platform": "youtube"
}
```

---

# Idea Generator API

## Endpoint

```http
POST /api/v1/generate/ideas
```

---

## Request

```json
{
  "niche": "fitness",
  "goal": "followers"
}
```

---

# Growth Roadmap API

## Endpoint

```http
POST /api/v1/generate/roadmap
```

---

## Request

```json
{
  "niche": "fitness",
  "goal": "10000 subscribers"
}
```

---

# URL Processing Pipeline

## Step 1

Validate URL

Supported:

```text
youtube.com/watch

youtube.com/shorts

youtube.com/@channel
```

---

## Step 2

Extract Metadata

Retrieve:

* Title
* Description
* Thumbnail
* Publish Date
* Channel

---

## Step 3

Transcript Extraction

Retrieve transcript if available.

---

## Step 4

Prompt Generation

Build structured AI prompt.

---

## Step 5

OpenRouter Request

Send prompt to selected model.

---

## Step 6

Response Formatting

Normalize AI output.

---

## Step 7

Frontend Rendering

Display analysis.

---

# AI Prompt Architecture

## Video Analysis Prompt

Sections:

```text
Video Information

Transcript

Analysis Tasks

Output Format
```

---

## Required Outputs

* Hook Score
* Engagement Score
* Retention Score
* CTA Score
* Recommendations

---

# Caching Strategy

Purpose:

Reduce AI costs.

---

## Cache Layer

Memory Cache

Alternative:

Redis

---

## Cache Key

```text
video_url_hash
```

---

## Cache Duration

```text
24 Hours
```

---

# Rate Limiting

Purpose:

Prevent abuse.

---

## Limits

Anonymous User

```text
20 Requests / Hour
```

---

## Implementation

Express Rate Limit

---

# Database

Authentication not required.

User accounts not required.

---

# Database Provider

Supabase PostgreSQL

---

# Tables

## Analysis Logs

```sql
CREATE TABLE analysis_logs (
 id UUID PRIMARY KEY,
 url_type TEXT,
 analysis_type TEXT,
 created_at TIMESTAMP
);
```

---

## Popular Queries

```sql
CREATE TABLE popular_queries (
 id UUID PRIMARY KEY,
 query TEXT,
 count INTEGER
);
```

---

# SEO Architecture

## Dynamic Landing Pages

```text
/youtube-video-analyzer

/youtube-shorts-analyzer

/youtube-channel-analyzer

/hook-generator

/viral-idea-generator

/growth-roadmap-generator
```

---

# Analytics

## PostHog

Track:

* Tool usage
* Conversion funnels
* Popular features

---

## Google Analytics

Track:

* Traffic
* Sources
* SEO performance

---

# Advertising

## Provider

Google AdSense

---

# Placement Strategy

Homepage

Results Pages

Blog Pages

Tool Pages

---

# Security

## Input Validation

Zod

---

## Rate Limiting

Express Rate Limit

---

## CORS

Restricted origins

---

## XSS Protection

Helmet

---

## Environment Variables

Never exposed to frontend.

---

# Environment Variables

```env
OPENROUTER_API_KEY=

YOUTUBE_API_KEY=

SUPABASE_URL=

SUPABASE_ANON_KEY=

POSTHOG_KEY=

GOOGLE_ANALYTICS_ID=
```

---

# Performance Targets

Homepage Load:

< 2 Seconds

Analysis Time:

< 15 Seconds

API Response:

< 5 Seconds

Lighthouse Score:

95+

SEO Score:

95+

Accessibility:

95+

---

# Deployment Pipeline

GitHub

↓

GitHub Actions

↓

Vercel (Frontend)

↓

Railway (Backend)

---

# Future Technical Roadmap

## Phase 2

Instagram Reel Analysis

TikTok Analysis

Thumbnail Analysis

Competitor Analysis

---

## Phase 3

AI Trend Prediction

Creator Benchmarking

Trend Database

Advanced Analytics

---
