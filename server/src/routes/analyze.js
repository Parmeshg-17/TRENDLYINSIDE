const express = require('express');
const { z } = require('zod');
const NodeCache = require('node-cache');
const { callWithFallback } = require('../services/openRouterService');
const {
  buildVideoAnalysisPrompt,
  buildShortsAnalysisPrompt,
  buildChannelAnalysisPrompt,
  buildReelAnalysisPrompt,
  buildTikTokAnalysisPrompt,
  buildThumbnailAnalysisPrompt,
  buildCompetitorAnalysisPrompt
} = require('../services/promptBuilder');
const {
  extractVideoId,
  extractChannelHandle,
  fetchVideoMetadata,
  validateYouTubeUrl,
  detectUrlType,
  fetchChannelData
} = require('../services/youtubeService');
const { logAnalysis } = require('../services/analyticsService');

const router = express.Router();
const cache = new NodeCache({ stdTTL: 86400 }); // 24 hour cache

// Validation schemas
const urlSchema = z.object({
  url: z.string().url('Please provide a valid URL').min(1)
});

// POST /api/v1/analyze/video
router.post('/video', async (req, res) => {
  try {
    const { url } = urlSchema.parse(req.body);

    if (!validateYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Please provide a valid YouTube video URL' });
    }

    const urlType = detectUrlType(url);
    if (urlType === 'channel') {
      return res.status(400).json({ error: 'This looks like a channel URL. Use the Channel Analyzer instead.' });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'Could not extract video ID from URL' });
    }

    // Check cache
    const cacheKey = `video_${videoId}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    // Fetch video metadata
    const metadata = await fetchVideoMetadata(videoId);

    // Build prompt and call AI
    const promptData = buildVideoAnalysisPrompt({
      ...metadata,
      url,
      description: '',
      transcript: ''
    });

    const analysis = await callWithFallback(promptData.user, promptData.system, 'video');

    const result = {
      videoId,
      url,
      metadata,
      analysis,
      analyzedAt: new Date().toISOString()
    };

    // Cache result
    cache.set(cacheKey, result);
    logAnalysis('video', 'youtube_video', metadata?.title);

    res.json(result);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Video analysis error:', error.message);
    res.status(500).json({ error: 'Analysis failed. Please try again.' });
  }
});

// POST /api/v1/analyze/shorts
router.post('/shorts', async (req, res) => {
  try {
    const { url } = urlSchema.parse(req.body);

    if (!validateYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Please provide a valid YouTube Shorts URL' });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'Could not extract video ID from URL' });
    }

    // Check cache
    const cacheKey = `shorts_${videoId}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const metadata = await fetchVideoMetadata(videoId);

    const promptData = buildShortsAnalysisPrompt({
      ...metadata,
      url,
      transcript: ''
    });

    const analysis = await callWithFallback(promptData.user, promptData.system, 'shorts');

    const result = {
      videoId,
      url,
      metadata,
      analysis,
      analyzedAt: new Date().toISOString()
    };

    cache.set(cacheKey, result);
    logAnalysis('shorts', 'youtube_shorts', metadata?.title);
    res.json(result);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Shorts analysis error:', error.message);
    res.status(500).json({ error: 'Analysis failed. Please try again.' });
  }
});

// POST /api/v1/analyze/channel
router.post('/channel', async (req, res) => {
  try {
    const { url } = urlSchema.parse(req.body);

    if (!validateYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Please provide a valid YouTube channel URL' });
    }

    const channelHandle = extractChannelHandle(url);
    if (!channelHandle) {
      return res.status(400).json({ error: 'Could not extract channel from URL. Use format: youtube.com/@channelname' });
    }

    // Check cache
    const cacheKey = `channel_${channelHandle}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const channelData = await fetchChannelData(channelHandle);

    const promptData = buildChannelAnalysisPrompt({
      ...channelData,
      url
    });

    const analysis = await callWithFallback(promptData.user, promptData.system, 'channel');

    const result = {
      channelHandle,
      url,
      channelData,
      analysis,
      analyzedAt: new Date().toISOString()
    };

    cache.set(cacheKey, result);
    logAnalysis('channel', 'youtube_channel', channelHandle);
    res.json(result);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Channel analysis error:', error.message);
    res.status(500).json({ error: 'Analysis failed. Please try again.' });
  }
});

// POST /api/v1/analyze/reel (Instagram Reel Analyzer)
router.post('/reel', async (req, res) => {
  try {
    const reelSchema = z.object({
      url: z.string().min(5, 'Please provide an Instagram Reel URL'),
      caption: z.string().optional(),
      audio: z.string().optional()
    });

    const data = reelSchema.parse(req.body);
    const cleanUrl = data.url.trim();

    if (!cleanUrl.includes('instagram.com') && !cleanUrl.includes('instagr.am')) {
      return res.status(400).json({ error: 'Please provide a valid Instagram URL (e.g., instagram.com/reel/...)' });
    }

    const cacheKey = `reel_${Buffer.from(cleanUrl).toString('base64').slice(0, 32)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildReelAnalysisPrompt({
      url: cleanUrl,
      caption: data.caption,
      audio: data.audio
    });

    const analysis = await callWithFallback(promptData.user, promptData.system, 'reel');

    const result = {
      url: cleanUrl,
      platform: 'Instagram Reels',
      analysis,
      analyzedAt: new Date().toISOString()
    };

    cache.set(cacheKey, result);
    logAnalysis('reel', 'instagram_reel', data.caption || cleanUrl);
    res.json(result);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Instagram Reel analysis error:', error.message);
    res.status(500).json({ error: 'Reel analysis failed. Please try again.' });
  }
});

// POST /api/v1/analyze/tiktok (TikTok Analyzer)
router.post('/tiktok', async (req, res) => {
  try {
    const tikTokSchema = z.object({
      url: z.string().min(5, 'Please provide a TikTok video URL'),
      sound: z.string().optional(),
      description: z.string().optional()
    });

    const data = tikTokSchema.parse(req.body);
    const cleanUrl = data.url.trim();

    if (!cleanUrl.includes('tiktok.com')) {
      return res.status(400).json({ error: 'Please provide a valid TikTok URL (e.g., tiktok.com/@creator/video/...)' });
    }

    const cacheKey = `tiktok_${Buffer.from(cleanUrl).toString('base64').slice(0, 32)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildTikTokAnalysisPrompt({
      url: cleanUrl,
      sound: data.sound,
      description: data.description
    });

    const analysis = await callWithFallback(promptData.user, promptData.system, 'tiktok');

    const result = {
      url: cleanUrl,
      platform: 'TikTok',
      analysis,
      analyzedAt: new Date().toISOString()
    };

    cache.set(cacheKey, result);
    logAnalysis('tiktok', 'tiktok_video', data.description || cleanUrl);
    res.json(result);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('TikTok analysis error:', error.message);
    res.status(500).json({ error: 'TikTok analysis failed. Please try again.' });
  }
});

// POST /api/v1/analyze/thumbnail (Thumbnail CTR & Packaging Analyzer)
router.post('/thumbnail', async (req, res) => {
  try {
    const thumbSchema = z.object({
      title: z.string().min(2, 'Video title is required to evaluate thumbnail context'),
      imageUrl: z.string().optional(),
      niche: z.string().optional().default('General')
    });

    const data = thumbSchema.parse(req.body);
    const cacheKey = `thumb_${Buffer.from(data.title + (data.imageUrl || '')).toString('base64').slice(0, 32)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildThumbnailAnalysisPrompt({
      imageUrl: data.imageUrl,
      title: data.title,
      niche: data.niche
    });

    const analysis = await callWithFallback(promptData.user, promptData.system, 'thumbnail');

    const result = {
      title: data.title,
      imageUrl: data.imageUrl || null,
      niche: data.niche,
      analysis,
      analyzedAt: new Date().toISOString()
    };

    cache.set(cacheKey, result);
    logAnalysis('thumbnail', 'thumbnail_analysis', data.title);
    res.json(result);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Thumbnail analysis error:', error.message);
    res.status(500).json({ error: 'Thumbnail analysis failed. Please try again.' });
  }
});

// POST /api/v1/analyze/competitor (Competitor Channel Analysis)
router.post('/competitor', async (req, res) => {
  try {
    const competitorSchema = z.object({
      channelA: z.string().min(2, 'Your channel name or URL is required'),
      channelB: z.string().min(2, 'Competitor channel name or URL is required'),
      niche: z.string().optional().default('Digital Content')
    });

    const data = competitorSchema.parse(req.body);
    const cacheKey = `comp_${Buffer.from(data.channelA + '_' + data.channelB).toString('base64').slice(0, 32)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildCompetitorAnalysisPrompt(data);
    const analysis = await callWithFallback(promptData.user, promptData.system, 'competitor');

    const result = {
      channelA: data.channelA,
      channelB: data.channelB,
      niche: data.niche,
      analysis,
      analyzedAt: new Date().toISOString()
    };

    cache.set(cacheKey, result);
    logAnalysis('competitor', 'competitor_analysis', `${data.channelA} vs ${data.channelB}`);
    res.json(result);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Competitor analysis error:', error.message);
    res.status(500).json({ error: 'Competitor analysis failed. Please try again.' });
  }
});

module.exports = router;
