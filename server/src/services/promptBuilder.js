/**
 * PromptBuilder - Structured prompt generation for all analysis types
 */

const SYSTEM_PROMPT = `You are TrendlyInside, an expert AI creator intelligence platform specializing in YouTube content analysis, creator growth strategies, and viral content optimization. 

You analyze content with the precision of a top-tier content strategist who has studied thousands of viral videos.

ALWAYS return valid JSON matching the exact schema requested.
Be specific, actionable, and data-driven in your insights.
Score everything on a 0-100 scale unless specified otherwise.`;

function buildVideoAnalysisPrompt(videoData) {
  return {
    system: SYSTEM_PROMPT,
    user: `Analyze this YouTube video and provide a comprehensive creator intelligence report.

VIDEO DATA:
Title: ${videoData.title || 'Unknown'}
Channel: ${videoData.channel || 'Unknown'}
Description: ${videoData.description?.substring(0, 1000) || 'Not available'}
Duration: ${videoData.duration || 'Unknown'}
Published: ${videoData.publishedAt || 'Unknown'}
URL: ${videoData.url}

TRANSCRIPT EXCERPT (first 2000 chars):
${videoData.transcript?.substring(0, 2000) || 'Transcript not available - analyze based on title and description'}

Provide analysis in this EXACT JSON format:
{
  "overallScore": <0-100 integer>,
  "hookScore": <0-100 integer>,
  "thumbnailScore": <0-100 integer>,
  "storytellingScore": <0-100 integer>,
  "engagementScore": <0-100 integer>,
  "ctaScore": <0-100 integer>,
  "retentionScore": <0-100 integer>,
  "hookAnalysis": {
    "score": <0-100>,
    "verdict": "<Strong/Moderate/Weak>",
    "details": "<2-3 sentences analyzing the hook>",
    "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
  },
  "thumbnailAnalysis": {
    "score": <0-100>,
    "verdict": "<Strong/Moderate/Weak>",
    "details": "<2-3 sentences>",
    "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"]
  },
  "storytellingAnalysis": {
    "score": <0-100>,
    "verdict": "<Strong/Moderate/Weak>",
    "details": "<2-3 sentences>",
    "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
  },
  "engagementAnalysis": {
    "score": <0-100>,
    "verdict": "<Strong/Moderate/Weak>",
    "details": "<2-3 sentences>",
    "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
  },
  "ctaAnalysis": {
    "score": <0-100>,
    "verdict": "<Strong/Moderate/Weak>",
    "details": "<2-3 sentences>",
    "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
  },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "recommendations": [
    {"title": "<recommendation title>", "description": "<detailed recommendation>", "priority": "High"},
    {"title": "<recommendation title>", "description": "<detailed recommendation>", "priority": "Medium"},
    {"title": "<recommendation title>", "description": "<detailed recommendation>", "priority": "Medium"},
    {"title": "<recommendation title>", "description": "<detailed recommendation>", "priority": "Low"}
  ],
  "nextSteps": ["<action 1>", "<action 2>", "<action 3>", "<action 4>", "<action 5>"],
  "viralPotential": "<High/Medium/Low>",
  "summaryInsight": "<2-3 sentence overall summary of this video's performance potential>"
}`
  };
}

function buildShortsAnalysisPrompt(videoData) {
  return {
    system: SYSTEM_PROMPT,
    user: `Analyze this YouTube Short and provide a detailed creator intelligence report.

SHORTS DATA:
Title: ${videoData.title || 'Unknown'}
Channel: ${videoData.channel || 'Unknown'}
Description: ${videoData.description?.substring(0, 500) || 'Not available'}
URL: ${videoData.url}

TRANSCRIPT/SCRIPT:
${videoData.transcript?.substring(0, 1500) || 'Transcript not available - analyze based on title and description'}

Provide analysis in this EXACT JSON format:
{
  "overallScore": <0-100 integer>,
  "hookScore": <0-100 integer>,
  "retentionScore": <0-100 integer>,
  "engagementScore": <0-100 integer>,
  "viralPotentialScore": <0-100 integer>,
  "pacingScore": <0-100 integer>,
  "firstThreeSeconds": {
    "score": <0-100>,
    "verdict": "<Scroll-Stopping/Good/Weak>",
    "analysis": "<detailed analysis of the opening>",
    "improvements": ["<improvement 1>", "<improvement 2>"]
  },
  "hookAnalysis": {
    "score": <0-100>,
    "verdict": "<Strong/Moderate/Weak>",
    "analysis": "<hook effectiveness analysis>",
    "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
  },
  "pacingAnalysis": {
    "score": <0-100>,
    "verdict": "<Fast/Perfect/Slow>",
    "analysis": "<pacing analysis>",
    "improvements": ["<improvement 1>", "<improvement 2>"]
  },
  "viralPotentialAnalysis": {
    "score": <0-100>,
    "verdict": "<High/Medium/Low>",
    "trendRelevance": "<trend relevance analysis>",
    "shareability": "<shareability analysis>",
    "replayValue": "<replay value analysis>"
  },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "recommendations": [
    {"title": "<title>", "description": "<description>", "priority": "High"},
    {"title": "<title>", "description": "<description>", "priority": "Medium"},
    {"title": "<title>", "description": "<description>", "priority": "Low"}
  ],
  "nextSteps": ["<action 1>", "<action 2>", "<action 3>", "<action 4>"],
  "summaryInsight": "<2-3 sentence summary>"
}`
  };
}

function buildChannelAnalysisPrompt(channelData) {
  return {
    system: SYSTEM_PROMPT,
    user: `Analyze this YouTube channel and provide a comprehensive creator intelligence report.

CHANNEL DATA:
Channel: ${channelData.channel || 'Unknown'}
URL: ${channelData.url}
Description: ${channelData.description?.substring(0, 800) || 'Not available'}
Recent Video Titles:
${channelData.recentVideos?.map((v, i) => `${i + 1}. ${v}`).join('\n') || 'Not available'}

Provide analysis in this EXACT JSON format:
{
  "creatorScore": <0-100 integer>,
  "consistencyScore": <0-100>,
  "brandingScore": <0-100>,
  "contentQualityScore": <0-100>,
  "growthPotentialScore": <0-100>,
  "audienceAlignmentScore": <0-100>,
  "contentConsistency": {
    "score": <0-100>,
    "verdict": "<Excellent/Good/Needs Work>",
    "analysis": "<detailed analysis>",
    "uploadFrequency": "<estimated posting frequency>"
  },
  "topicClarity": {
    "score": <0-100>,
    "verdict": "<Focused/Mixed/Unclear>",
    "analysis": "<topic niche analysis>",
    "primaryNiche": "<main content niche>",
    "subNiches": ["<sub-niche 1>", "<sub-niche 2>"]
  },
  "branding": {
    "score": <0-100>,
    "verdict": "<Strong/Developing/Weak>",
    "analysis": "<branding analysis>"
  },
  "contentThemes": ["<theme 1>", "<theme 2>", "<theme 3>", "<theme 4>"],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "growthOpportunities": [
    {"opportunity": "<opportunity title>", "description": "<detailed description>", "impact": "High"},
    {"opportunity": "<opportunity title>", "description": "<detailed description>", "impact": "Medium"},
    {"opportunity": "<opportunity title>", "description": "<detailed description>", "impact": "Medium"}
  ],
  "roadmap": {
    "week1": {
      "focus": "<week 1 focus area>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>", "<task 4>"]
    },
    "week2": {
      "focus": "<week 2 focus area>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>", "<task 4>"]
    },
    "week3": {
      "focus": "<week 3 focus area>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>", "<task 4>"]
    },
    "week4": {
      "focus": "<week 4 focus area>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>", "<task 4>"]
    }
  },
  "summaryInsight": "<3-4 sentence comprehensive channel summary>"
}`
  };
}

function buildHookGenerationPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Generate 20 high-performing content hooks for the following:

Topic: ${data.topic}
Platform: ${data.platform || 'YouTube'}
Content Type: ${data.contentType || 'Video'}
Target Audience: ${data.audience || 'General creators'}

Create diverse hooks across all categories. Each hook should be compelling, specific, and optimized for the platform.

Return in this EXACT JSON format:
{
  "hooks": [
    {
      "id": 1,
      "category": "Curiosity",
      "hook": "<the actual hook text>",
      "why": "<why this hook works>"
    },
    {
      "id": 2,
      "category": "Story",
      "hook": "<the actual hook text>",
      "why": "<why this hook works>"
    },
    {
      "id": 3,
      "category": "Authority",
      "hook": "<the actual hook text>",
      "why": "<why this hook works>"
    },
    {
      "id": 4,
      "category": "Contrarian",
      "hook": "<the actual hook text>",
      "why": "<why this hook works>"
    },
    {
      "id": 5,
      "category": "Emotional",
      "hook": "<the actual hook text>",
      "why": "<why this hook works>"
    },
    {
      "id": 6,
      "category": "Problem-Based",
      "hook": "<the actual hook text>",
      "why": "<why this hook works>"
    }
  ]
}

Generate exactly 20 hooks. Distribute them: 4 Curiosity, 3 Story, 3 Authority, 3 Contrarian, 4 Emotional, 3 Problem-Based.`
  };
}

function buildIdeaGenerationPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Generate 50 viral content ideas for a YouTube creator.

Niche: ${data.niche}
Target Audience: ${data.audience || 'General viewers'}
Creator Goal: ${data.goal || 'Grow subscribers and views'}

Create diverse, specific, actionable content ideas. Each idea should have a clear angle and viral potential.

Return in this EXACT JSON format:
{
  "ideas": [
    {
      "id": 1,
      "category": "Educational",
      "title": "<compelling video title>",
      "angle": "<unique content angle>",
      "viralPotential": "High"
    }
  ],
  "topPicks": [1, 3, 7, 12, 18],
  "contentCalendarSuggestion": "<brief suggestion for content calendar>"
}

Generate exactly 50 ideas across these categories:
- Educational (10 ideas)
- Storytelling (8 ideas)
- Challenge/Experiment (8 ideas)
- Trend-Based (8 ideas)
- Contrarian/Controversial (8 ideas)
- Personal Experience (8 ideas)`
  };
}

function buildRoadmapPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Create a personalized 30-day growth roadmap for a YouTube creator.

Niche: ${data.niche}
Current Stage: ${data.currentStage || 'Beginner (0-1K subscribers)'}
Primary Goal: ${data.goal || 'Reach 10K subscribers'}
Posting Frequency Goal: ${data.postingFrequency || '3x per week'}

Create a detailed, actionable week-by-week plan with specific tasks.

Return in this EXACT JSON format:
{
  "roadmapTitle": "<personalized roadmap title>",
  "goal": "${data.goal || 'Reach 10K subscribers'}",
  "niche": "${data.niche}",
  "overview": "<2-3 sentence overview of the strategy>",
  "weeks": [
    {
      "week": 1,
      "focus": "<week 1 primary focus>",
      "theme": "<catchy week theme>",
      "tasks": [
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Low", "timeEstimate": "<time estimate>"}
      ],
      "milestone": "<what success looks like at end of week 1>"
    },
    {
      "week": 2,
      "focus": "<week 2 primary focus>",
      "theme": "<catchy week theme>",
      "tasks": [
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Low", "timeEstimate": "<time estimate>"}
      ],
      "milestone": "<week 2 milestone>"
    },
    {
      "week": 3,
      "focus": "<week 3 primary focus>",
      "theme": "<catchy week theme>",
      "tasks": [
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Low", "timeEstimate": "<time estimate>"}
      ],
      "milestone": "<week 3 milestone>"
    },
    {
      "week": 4,
      "focus": "<week 4 primary focus>",
      "theme": "<catchy week theme>",
      "tasks": [
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "High", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Medium", "timeEstimate": "<time estimate>"},
        {"task": "<task description>", "priority": "Low", "timeEstimate": "<time estimate>"}
      ],
      "milestone": "<week 4 milestone>"
    }
  ],
  "keyMetrics": ["<metric 1 to track>", "<metric 2>", "<metric 3>", "<metric 4>"],
  "toolsRecommended": ["<tool 1>", "<tool 2>", "<tool 3>"],
  "successTip": "<one powerful success tip for this creator's niche>"
}`
  };
}

function buildReelAnalysisPrompt(reelData) {
  return {
    system: SYSTEM_PROMPT,
    user: `Analyze this Instagram Reel and provide a specialized creator intelligence report focused on the Instagram algorithm, saves, and DM shareability.

REEL DATA:
URL: ${reelData.url}
Caption/Topic: ${reelData.caption || reelData.topic || 'General Reel content'}
Audio/Sound: ${reelData.audio || 'Original Audio'}
Creator: ${reelData.creator || 'Creator'}

Provide analysis in this EXACT JSON format:
{
  "overallScore": <0-100 integer>,
  "audioScore": <0-100 integer>,
  "hookScore": <0-100 integer>,
  "saveabilityScore": <0-100 integer>,
  "shareabilityScore": <0-100 integer>,
  "captionScore": <0-100 integer>,
  "audioAnalysis": {
    "verdict": "<Trending/Good/Suboptimal>",
    "trendLevel": "<High/Moderate/Low>",
    "advice": "<actionable audio recommendation>"
  },
  "hookAnalysis": {
    "verdict": "<Strong/Moderate/Weak>",
    "score": <0-100>,
    "improvements": ["<improvement 1>", "<improvement 2>"]
  },
  "saveabilityAnalysis": {
    "verdict": "<High/Moderate/Low>",
    "tactics": ["<tactic 1 to boost saves>", "<tactic 2>"],
    "reasonsToSave": "<why viewers would save this to a collection>"
  },
  "hashtagSuggestions": ["<tag 1>", "<tag 2>", "<tag 3>", "<tag 4>", "<tag 5>", "<tag 6>", "<tag 7>", "<tag 8>"],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendations": [
    {"title": "<title 1>", "description": "<description 1>", "priority": "High"},
    {"title": "<title 2>", "description": "<description 2>", "priority": "Medium"},
    {"title": "<title 3>", "description": "<description 3>", "priority": "Low"}
  ],
  "viralPotential": "<High/Medium/Low>",
  "summaryInsight": "<2-3 sentence strategic summary>"
}`
  };
}

function buildTikTokAnalysisPrompt(tikTokData) {
  return {
    system: SYSTEM_PROMPT,
    user: `Analyze this TikTok video and provide an in-depth creator intelligence report tailored for the TikTok For You Page (FYP) algorithm, loop completion, and viral sound dynamics.

TIKTOK DATA:
URL: ${tikTokData.url}
Sound/Song: ${tikTokData.sound || 'Trending TikTok Audio'}
Description/Hashtags: ${tikTokData.description || tikTokData.topic || 'TikTok short-form video'}
Creator: ${tikTokData.creator || 'Creator'}

Provide analysis in this EXACT JSON format:
{
  "overallScore": <0-100 integer>,
  "hookScore": <0-100 integer>,
  "soundScore": <0-100 integer>,
  "loopScore": <0-100 integer>,
  "engagementScore": <0-100 integer>,
  "pacingScore": <0-100 integer>,
  "foryouPagePotential": <0-100 integer>,
  "loopAnalysis": {
    "verdict": "<Seamless Loop/Standard/Abrupt>",
    "score": <0-100>,
    "loopTechnique": "<recommendation on how to make beginning & end connect seamlessly>"
  },
  "soundAnalysis": {
    "verdict": "<Viral Audio/Original Sound/Generic>",
    "soundStrategy": "<how to leverage this sound or switch to breakout audio>"
  },
  "hookAnalysis": {
    "verdict": "<Scroll-Stopping/Fair/Weak>",
    "opening2Seconds": "<critique of the first 2 seconds>",
    "improvements": ["<improvement 1>", "<improvement 2>"]
  },
  "commentBaitTactics": ["<comment prompt 1>", "<comment prompt 2>", "<intentional subtle detail to provoke remarks>"],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendations": [
    {"title": "<title 1>", "description": "<description 1>", "priority": "High"},
    {"title": "<title 2>", "description": "<description 2>", "priority": "Medium"},
    {"title": "<title 3>", "description": "<description 3>", "priority": "Low"}
  ],
  "summaryInsight": "<2-3 sentence summary for maximizing FYP distribution>"
}`
  };
}

function buildThumbnailAnalysisPrompt(thumbnailData) {
  return {
    system: SYSTEM_PROMPT,
    user: `Analyze this YouTube thumbnail and packaging concept to predict Click-Through Rate (CTR) and visual psychology.

THUMBNAIL DATA:
Image/Context: ${thumbnailData.imageUrl || thumbnailData.title || 'YouTube Thumbnail Visual'}
Video Title: ${thumbnailData.title || 'Untitled Video'}
Niche: ${thumbnailData.niche || 'General'}

Provide analysis in this EXACT JSON format:
{
  "overallScore": <0-100 integer>,
  "contrastScore": <0-100 integer>,
  "readabilityScore": <0-100 integer>,
  "emotionScore": <0-100 integer>,
  "clickabilityScore": <0-100 integer>,
  "predictedCTR": "<e.g. 7.2% - 10.5%>",
  "focalPointAnalysis": {
    "focalPoint": "<primary visual subject>",
    "clarityVerdict": "<Clear/Cluttered/Weak>",
    "suggestions": ["<suggestion 1>", "<suggestion 2>"]
  },
  "textOverlayAnalysis": {
    "textDetected": "<words on thumbnail>",
    "wordCount": <number>,
    "readabilityVerdict": "<Instant Read/Hard to Read/Too Long>",
    "advice": "<text placement and font styling recommendation>"
  },
  "colorPsychology": {
    "dominantColors": ["<color 1>", "<color 2>"],
    "emotionalVibe": "<emotional impact, e.g. Urgency, Curiosity, Wonder>",
    "recommendations": "<how to tweak color saturation or backdrop contrast>"
  },
  "abTestSuggestions": [
    {"concept": "<Concept A - Extreme close-up>", "hypothesis": "<why this may boost CTR by 2%>"},
    {"concept": "<Concept B - High contrast contrarian visual>", "hypothesis": "<why this attracts casual scrollers>"},
    {"concept": "<Concept C - Simplified 3-element composition>", "hypothesis": "<why this excels on mobile feed>"}
  ],
  "recommendations": [
    {"title": "<title 1>", "description": "<description 1>", "priority": "High"},
    {"title": "<title 2>", "description": "<description 2>", "priority": "Medium"},
    {"title": "<title 3>", "description": "<description 3>", "priority": "Low"}
  ],
  "mobileVerdict": "<Great for Mobile/Too small details>",
  "summaryInsight": "<2-3 sentence packaging optimization summary>"
}`
  };
}

function buildCompetitorAnalysisPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Perform a detailed competitive creator analysis comparing two channels or auditing a niche competitor.

COMPETITOR AUDIT:
Your Channel / URL A: ${data.channelA || data.urlA || 'Primary Creator'}
Competitor Channel / URL B: ${data.channelB || data.urlB || 'Competitor Creator'}
Niche/Category: ${data.niche || 'Digital Content'}

Provide analysis in this EXACT JSON format:
{
  "winnerVerdict": "<Channel A / Channel B / Even>",
  "channelAScore": <0-100 integer>,
  "channelBScore": <0-100 integer>,
  "channelAAnalysis": {
    "name": "<name A>",
    "coreStrengths": ["<strength 1>", "<strength 2>"],
    "weaknesses": ["<weakness 1>", "<weakness 2>"]
  },
  "channelBAnalysis": {
    "name": "<name B>",
    "coreStrengths": ["<strength 1>", "<strength 2>"],
    "weaknesses": ["<weakness 1>", "<weakness 2>"]
  },
  "contentGapOpportunities": [
    {"title": "<Content Idea 1>", "angle": "<Unique Angle>", "demand": "High", "whyItWins": "<reason>"},
    {"title": "<Content Idea 2>", "angle": "<Unique Angle>", "demand": "High", "whyItWins": "<reason>"},
    {"title": "<Content Idea 3>", "angle": "<Unique Angle>", "demand": "Medium", "whyItWins": "<reason>"},
    {"title": "<Content Idea 4>", "angle": "<Unique Angle>", "demand": "Medium", "whyItWins": "<reason>"}
  ],
  "formatComparison": {
    "thumbnailDifference": "<comparison of thumbnail strategies>",
    "pacingDifference": "<comparison of intro and pacing>",
    "frequencyDifference": "<comparison of publishing cadence>"
  },
  "audienceStealStrategy": [
    "<actionable tactic 1 to win their viewers>",
    "<actionable tactic 2>",
    "<actionable tactic 3>",
    "<actionable tactic 4>"
  ],
  "summaryInsight": "<2-3 sentence strategic roadmap to outrank competitor>"
}`
  };
}

function buildTrendDiscoveryPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Identify real-time emerging trends, breakout keywords, and viral content formats for content creators.

TREND CRITERIA:
Niche: ${data.niche || 'Tech & AI'}
Platform: ${data.platform || 'YouTube'}
Timeframe: ${data.timeframe || 'Real-time & Next 30 Days'}

Provide analysis in this EXACT JSON format:
{
  "niche": "${data.niche || 'Content Creation'}",
  "platform": "${data.platform || 'YouTube'}",
  "saturationLevel": "<Low/Moderate/High>",
  "growthMomentum": "<Surging/Steady/Emerging>",
  "trendingTopics": [
    {"topic": "<Topic 1>", "searchVelocity": "+185%", "competitionLevel": "Low", "contentAngle": "<Angle 1>", "estimatedViewsPotential": "50K - 250K"},
    {"topic": "<Topic 2>", "searchVelocity": "+120%", "competitionLevel": "Moderate", "contentAngle": "<Angle 2>", "estimatedViewsPotential": "30K - 150K"},
    {"topic": "<Topic 3>", "searchVelocity": "+95%", "competitionLevel": "Low", "contentAngle": "<Angle 3>", "estimatedViewsPotential": "20K - 100K"},
    {"topic": "<Topic 4>", "searchVelocity": "+78%", "competitionLevel": "Moderate", "contentAngle": "<Angle 4>", "estimatedViewsPotential": "15K - 80K"},
    {"topic": "<Topic 5>", "searchVelocity": "+64%", "competitionLevel": "Low", "contentAngle": "<Angle 5>", "estimatedViewsPotential": "10K - 50K"}
  ],
  "viralFormats": [
    {"formatName": "<Format 1>", "whyItWorks": "<reason>", "executionTip": "<tip>"},
    {"formatName": "<Format 2>", "whyItWorks": "<reason>", "executionTip": "<tip>"},
    {"formatName": "<Format 3>", "whyItWorks": "<reason>", "executionTip": "<tip>"}
  ],
  "breakoutKeywords": [
    {"keyword": "<keyword 1>", "trendDirection": "Surging", "searchVolume": "High"},
    {"keyword": "<keyword 2>", "trendDirection": "Surging", "searchVolume": "High"},
    {"keyword": "<keyword 3>", "trendDirection": "Rising", "searchVolume": "Medium"},
    {"keyword": "<keyword 4>", "trendDirection": "Rising", "searchVolume": "Medium"},
    {"keyword": "<keyword 5>", "trendDirection": "Breakout", "searchVolume": "Emerging"},
    {"keyword": "<keyword 6>", "trendDirection": "Breakout", "searchVolume": "Emerging"}
  ],
  "firstMoverAdvantageTips": [
    "<tip 1 on how to be first to publish on this wave>",
    "<tip 2 on title framing>",
    "<tip 3 on thumbnail styling>"
  ],
  "summaryInsight": "<2-3 sentence overview on where the attention is moving in this niche>"
}`
  };
}

function buildCalendarPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Generate an actionable, structured 30-Day Content Publishing Calendar for a creator.

CREATOR PARAMETERS:
Niche: ${data.niche || 'General'}
Posting Frequency: ${data.frequency || '4 videos/week'}
Primary Formats: ${data.formats || 'Shorts & Long-form'}
Target Audience: ${data.audience || 'Target viewers'}

Provide analysis in this EXACT JSON format:
{
  "calendarTitle": "30-Day Publishing Blueprint: ${data.niche || 'Creator Growth'}",
  "niche": "${data.niche || 'General'}",
  "totalScheduledPosts": 30,
  "contentPillars": [
    {"pillar": "Educational / How-To", "percentage": "40%"},
    {"pillar": "Trending & Contrarian Opinions", "percentage": "30%"},
    {"pillar": "Storytelling & Personal Case Studies", "percentage": "20%"},
    {"pillar": "Community & Engagement Hooks", "percentage": "10%"}
  ],
  "weeks": [
    {
      "weekNumber": 1,
      "theme": "Foundation & High-Velocity Hooks",
      "days": [
        {"day": 1, "dayName": "Monday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 2, "dayName": "Tuesday", "title": "<title>", "format": "Short", "platform": "Reels/Shorts", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 3, "dayName": "Wednesday", "title": "<title>", "format": "Long-form", "platform": "YouTube", "hook": "<opening hook>", "status": "Outlining"},
        {"day": 4, "dayName": "Thursday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 5, "dayName": "Friday", "title": "<title>", "format": "Carousel / Community", "platform": "Instagram/YouTube", "hook": "<headline>", "status": "Drafting"},
        {"day": 6, "dayName": "Saturday", "title": "<title>", "format": "Short", "platform": "Shorts/Reels", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 7, "dayName": "Sunday", "title": "Weekly Analytics Review & Batch Scripting", "format": "Planning", "platform": "Internal", "hook": "Review week 1 CTR and watch time", "status": "Scheduled"}
      ]
    },
    {
      "weekNumber": 2,
      "theme": "Retention & Trend Capitalization",
      "days": [
        {"day": 8, "dayName": "Monday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 9, "dayName": "Tuesday", "title": "<title>", "format": "Short", "platform": "Reels/Shorts", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 10, "dayName": "Wednesday", "title": "<title>", "format": "Long-form", "platform": "YouTube", "hook": "<opening hook>", "status": "Outlining"},
        {"day": 11, "dayName": "Thursday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 12, "dayName": "Friday", "title": "<title>", "format": "Community Post", "platform": "YouTube", "hook": "<question hook>", "status": "Drafting"},
        {"day": 13, "dayName": "Saturday", "title": "<title>", "format": "Short", "platform": "Shorts/Reels", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 14, "dayName": "Sunday", "title": "Mid-Month Optimization & Feedback", "format": "Planning", "platform": "Internal", "hook": "Analyze top 3 retention drivers", "status": "Scheduled"}
      ]
    },
    {
      "weekNumber": 3,
      "theme": "Authority & Deep Audience Engagement",
      "days": [
        {"day": 15, "dayName": "Monday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 16, "dayName": "Tuesday", "title": "<title>", "format": "Short", "platform": "Reels/Shorts", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 17, "dayName": "Wednesday", "title": "<title>", "format": "Long-form", "platform": "YouTube", "hook": "<opening hook>", "status": "Outlining"},
        {"day": 18, "dayName": "Thursday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 19, "dayName": "Friday", "title": "<title>", "format": "Carousel / Guide", "platform": "Instagram", "hook": "<headline>", "status": "Drafting"},
        {"day": 20, "dayName": "Saturday", "title": "<title>", "format": "Short", "platform": "Shorts/Reels", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 21, "dayName": "Sunday", "title": "Workflow Check & Rest Day", "format": "Planning", "platform": "Internal", "hook": "Prepare Week 4 batch filming", "status": "Scheduled"}
      ]
    },
    {
      "weekNumber": 4,
      "theme": "Conversion, Monetization & System Scaling",
      "days": [
        {"day": 22, "dayName": "Monday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 23, "dayName": "Tuesday", "title": "<title>", "format": "Short", "platform": "Reels/Shorts", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 24, "dayName": "Wednesday", "title": "<title>", "format": "Long-form", "platform": "YouTube", "hook": "<opening hook>", "status": "Outlining"},
        {"day": 25, "dayName": "Thursday", "title": "<title>", "format": "Short", "platform": "Shorts/TikTok", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 26, "dayName": "Friday", "title": "<title>", "format": "Lead Magnet / Community", "platform": "YouTube/Newsletter", "hook": "<action hook>", "status": "Drafting"},
        {"day": 27, "dayName": "Saturday", "title": "<title>", "format": "Short", "platform": "Shorts/Reels", "hook": "<opening hook>", "status": "Ready to Script"},
        {"day": 28, "dayName": "Sunday", "title": "Monthly Growth Audit", "format": "Planning", "platform": "Internal", "hook": "Review sub growth, watch hours, RPM", "status": "Scheduled"},
        {"day": 29, "dayName": "Day 29 Bonus", "title": "<bonus high-energy short>", "format": "Short", "platform": "Omni-channel", "hook": "<punchy hook>", "status": "Ready to Script"},
        {"day": 30, "dayName": "Day 30 Finale", "title": "<monthly recap / transformation>", "format": "Long-form / Short", "platform": "YouTube", "hook": "<inspiring wrap-up>", "status": "Ready to Script"}
      ]
    }
  ],
  "productionRules": [
    "Batch film at least 4 Shorts in a single session to protect creative energy.",
    "Draft titles and hooks 24 hours BEFORE filming.",
    "Spend 50% of editing time on the first 15% of the video."
  ]
}`
  };
}

function buildAssistantChatPrompt(message, history = [], creatorContext = {}) {
  const contextStr = creatorContext.niche || creatorContext.channelName || creatorContext.primaryGoal
    ? `CREATOR CONTEXT:
Niche: ${creatorContext.niche || 'General Creator'}
Channel/Handle: ${creatorContext.channelName || 'Not specified'}
Primary Goal: ${creatorContext.primaryGoal || 'Audience Growth & Higher Retention'}
`
    : '';

  const historyStr = history.length > 0
    ? `PREVIOUS CONVERSATION:
${history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n\n')}
`
    : '';

  return {
    system: `You are TrendlyInside AI Creator Assistant, an elite creator strategist, script doctor, and growth coach.
You give concrete, tactical advice to creators across YouTube, Instagram Reels, and TikTok.
Always provide specific examples (e.g., exact hook wording, title formulas with curiosity gaps, thumbnail layout descriptions, sponsor email scripts).
Format your response in clean, beautiful Markdown with bullet points, bold highlights, and headers where helpful.
Never give fluffy or generic advice like "just make good videos". Give exact blueprints and algorithmic reasoning.`,
    user: `${contextStr}${historyStr}USER QUESTION:
${message}`
  };
}

function buildTrendPredictionPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Forecast the algorithmic trajectory, lifespan, and breakout velocity for this creator trend or topic.

TOPIC: ${data.topic}
NICHE: ${data.niche || 'General'}
PLATFORM: ${data.platform || 'YouTube & Short-form'}
TIMEFRAME: ${data.timeframe || '90-Day Outlook'}

Provide the forecast in this EXACT JSON format:
{
  "topic": "${data.topic}",
  "niche": "${data.niche || 'General'}",
  "platform": "${data.platform || 'YouTube & Short-form'}",
  "breakoutProbability": 84,
  "lifecycleStage": "High Acceleration",
  "predictedPeakDate": "Within 14-21 Days",
  "optimalPublishWindow": "Next 48-72 Hours for maximum organic momentum",
  "saturationIndex": 38,
  "velocityForecast": [
    {"day": "Day 1", "velocity": 45},
    {"day": "Day 7", "velocity": 72},
    {"day": "Day 14", "velocity": 94},
    {"day": "Day 30", "velocity": 85},
    {"day": "Day 60", "velocity": 58},
    {"day": "Day 90", "velocity": 36}
  ],
  "breakoutAngles": [
    {
      "angle": "<High CTR Hook Angle>",
      "suggestedTitle": "<Click-worthy Title without clickbait deception>",
      "format": "<Short-form / Long-form Documentary / Tutorial>",
      "expectedCTR": "8.5% - 12.2%"
    },
    {
      "angle": "<Second Angle>",
      "suggestedTitle": "<Title>",
      "format": "<Format>",
      "expectedCTR": "7.8% - 10.5%"
    },
    {
      "angle": "<Third Angle>",
      "suggestedTitle": "<Title>",
      "format": "<Format>",
      "expectedCTR": "9.1% - 13.0%"
    }
  ],
  "saturationHazards": [
    "<Saturated angle or cliché to avoid 1>",
    "<Saturated angle or cliché to avoid 2>",
    "<Saturated angle or cliché to avoid 3>"
  ],
  "monetizationPotential": {
    "rating": "High",
    "estimatedRPM": "$4.50 - $12.00",
    "bestMonetizationRoute": "Affiliate software links, digital templates, brand integration"
  },
  "summaryVerdict": "<2-3 sentence executive synthesis of why and how to capture this trend>"
}`
  };
}

function buildBenchmarkPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Perform a comprehensive creator benchmarking audit comparing this channel to median and top 10% elite creators in their exact niche.

CREATOR METRICS:
Niche: ${data.niche}
Subscribers / Followers: ${data.subscribers}
Average Views Per Upload: ${data.avgViews}
Upload Frequency: ${data.uploadFrequency}
Engagement Rate: ${data.engagementRate || 'Estimated from view counts'}

Provide the benchmark audit in this EXACT JSON format:
{
  "tierRank": "Top 15% of ${data.niche} Creators (Growth Tier)",
  "percentileScore": 85,
  "overallHealthScore": 82,
  "niche": "${data.niche}",
  "subscribers": ${data.subscribers},
  "avgViews": ${data.avgViews},
  "metrics": {
    "viewToSubRatio": {
      "creatorValue": "34%",
      "nicheMedian": "12%",
      "top10Percent": "45%",
      "status": "Strong",
      "verdict": "Your core audience has high returning loyalty above the niche median."
    },
    "engagementRate": {
      "creatorValue": "5.2%",
      "nicheMedian": "2.8%",
      "top10Percent": "6.5%",
      "status": "Above Average",
      "verdict": "Comments and shares indicate strong active viewer resonance."
    },
    "consistencyScore": {
      "creatorValue": "${data.uploadFrequency}",
      "nicheMedian": "1x / week",
      "top10Percent": "3x / week",
      "status": "Optimal",
      "verdict": "Pacing keeps the algorithmic recommender system engaged."
    },
    "retentionEfficiency": {
      "score": 78,
      "nicheMedian": 65,
      "top10Percent": 84,
      "status": "Strong",
      "verdict": "Story arc holds interest past the 50% milestone."
    },
    "monetizationReadiness": {
      "score": 82,
      "nicheMedian": 55,
      "top10Percent": 88,
      "status": "Ready for Sponsors",
      "verdict": "Audience size and view velocity qualify for direct brand integrations."
    }
  },
  "primaryBottleneck": "Packaging disparity: While watch time is strong, thumbnail click-through rate fluctuates, causing algorithmic distribution plateaus.",
  "targetMilestones": {
    "nextTierName": "100K Creator Authority Tier",
    "targetSubscribers": "50,000 - 100,000",
    "targetAvgViews": "20,000+ views per video",
    "estimatedTimeToUnlock": "3 to 6 months with disciplined execution"
  },
  "unlockRoadmap": [
    {"step": 1, "title": "A/B Test Thumbnail Faces vs Objects", "action": "Test 3 thumbnail variants within first 4 hours of upload."},
    {"step": 2, "title": "Tighten Opening 15 Seconds", "action": "Eliminate greetings; deliver first promised value by second 12."},
    {"step": 3, "title": "Build a Recurring Signature Format", "action": "Establish 1 predictable monthly franchise video series."},
    {"step": 4, "title": "Launch Owned Email Newsletter", "action": "Capture 5% of viewers into an off-platform subscriber base."}
  ],
  "competitiveAdvantage": "Authentic subject authority and higher-than-average retention compared to peers in ${data.niche}."
}`
  };
}

function buildAdvancedAnalyticsPrompt(data) {
  return {
    system: SYSTEM_PROMPT,
    user: `Perform an in-depth algorithmic health and revenue audit for this creator channel.

CHANNEL DATA:
URL / Handle: ${data.channelUrl || 'Channel Audit'}
Niche: ${data.niche}
Subscribers: ${data.subscribers || 'Estimated'}
Estimated Avg Watch Time %: ${data.avgWatchTimePercent || 48}%
Estimated CTR: ${data.ctrAverage || 6.5}%
Primary Format: ${data.primaryFormat || 'Hybrid Long-form & Shorts'}

Provide the audit in this EXACT JSON format:
{
  "algorithmicHealthScore": 81,
  "healthStatus": "Thriving & Algorithmically Favored",
  "retentionDiagnostics": {
    "first30SecDropoff": "24% dropoff in opening 30 seconds",
    "midVideoDipTimestamp": "02:45 - 03:20 (Boring transition detected)",
    "endScreenConversion": "16% click-through to recommended video",
    "retentionScore": 79,
    "keyFix": "Inject a visual pattern interrupt at 02:30 to preempt the mid-video dip."
  },
  "audienceFatigueIndex": {
    "thumbnailFatigueScore": 38,
    "titleFormulaStatus": "Fresh & Varied",
    "churnRiskLevel": "Low",
    "browseVsSearchRatio": "72% Browse Features / 20% YouTube Search / 8% Suggested",
    "fatigueDiagnosis": "Audience response remains receptive with minimal unsubscribe velocity."
  },
  "monetizationValuation": {
    "estimatedRPM": "$6.80 - $14.20",
    "monthlyEstimatedRevenue": "$1,800 - $3,900",
    "annualEarningPotential": "$24,000 - $52,000",
    "missingRevenueStreams": [
      "Affiliate tools and software recommendation pinned links",
      "Digital workflow or template pack downloadable via link-in-bio",
      "Dedicated mid-roll sponsor integrations ($1,500 - $2,500/placement)"
    ]
  },
  "algorithmicRemediationPlan": [
    {
      "priority": "Immediate (Week 1)",
      "area": "Thumbnail & Title Packaging",
      "action": "Increase visual contrast by 25% and reduce title length under 52 characters."
    },
    {
      "priority": "High (Week 2)",
      "area": "Retention Pacing & Intro Hook",
      "action": "Trim the first 10 seconds of every video to jump directly into the thesis."
    },
    {
      "priority": "Medium (Week 3-4)",
      "area": "Content Series Architecture",
      "action": "Link videos into tightly-themed 3-part playlists to spike session watch time."
    },
    {
      "priority": "Ongoing",
      "area": "Community & Multi-Platform Funnel",
      "action": "Repurpose top-performing moments into 9:16 vertical Shorts linking back to main video."
    }
  ],
  "executiveSummary": "Channel displays strong organic engagement and high browse discoverability. Addressing opening dropoff and establishing an owned monetization pipeline can double revenue within 90 days."
}`
  };
}

module.exports = {
  buildVideoAnalysisPrompt,
  buildShortsAnalysisPrompt,
  buildChannelAnalysisPrompt,
  buildHookGenerationPrompt,
  buildIdeaGenerationPrompt,
  buildRoadmapPrompt,
  buildReelAnalysisPrompt,
  buildTikTokAnalysisPrompt,
  buildThumbnailAnalysisPrompt,
  buildCompetitorAnalysisPrompt,
  buildTrendDiscoveryPrompt,
  buildCalendarPrompt,
  buildAssistantChatPrompt,
  buildTrendPredictionPrompt,
  buildBenchmarkPrompt,
  buildAdvancedAnalyticsPrompt
};
