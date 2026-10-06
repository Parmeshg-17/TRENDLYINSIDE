const express = require('express');
const { z } = require('zod');
const NodeCache = require('node-cache');
const { callWithFallback } = require('../services/openRouterService');
const {
  buildHookGenerationPrompt,
  buildIdeaGenerationPrompt,
  buildRoadmapPrompt,
  buildTrendDiscoveryPrompt,
  buildCalendarPrompt
} = require('../services/promptBuilder');
const { logAnalysis } = require('../services/analyticsService');

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache for generations

// POST /api/v1/generate/hooks
router.post('/hooks', async (req, res) => {
  try {
    const schema = z.object({
      topic: z.string().min(2, 'Topic must be at least 2 characters').max(200),
      platform: z.string().optional().default('YouTube'),
      contentType: z.string().optional().default('Video'),
      audience: z.string().optional()
    });

    const data = schema.parse(req.body);
    const cacheKey = `hooks_${data.topic}_${data.platform}_${data.contentType}`.toLowerCase().replace(/\s/g, '_');
    
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildHookGenerationPrompt(data);
    const result = await callWithFallback(promptData.user, promptData.system, 'hooks');

    const response = { ...result, generatedAt: new Date().toISOString() };
    cache.set(cacheKey, response);
    logAnalysis('hooks', 'hook_generation', data.topic);

    res.json(response);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Hook generation error:', error.message);
    res.status(500).json({ error: 'Generation failed. Please try again.' });
  }
});

// POST /api/v1/generate/ideas
router.post('/ideas', async (req, res) => {
  try {
    const schema = z.object({
      niche: z.string().min(2, 'Niche must be at least 2 characters').max(200),
      audience: z.string().optional(),
      goal: z.string().optional()
    });

    const data = schema.parse(req.body);
    const cacheKey = `ideas_${data.niche}_${data.goal}`.toLowerCase().replace(/\s/g, '_');

    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildIdeaGenerationPrompt(data);
    const result = await callWithFallback(promptData.user, promptData.system, 'ideas');

    const response = { ...result, generatedAt: new Date().toISOString() };
    cache.set(cacheKey, response);
    logAnalysis('ideas', 'idea_generation', data.niche);

    res.json(response);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Idea generation error:', error.message);
    res.status(500).json({ error: 'Generation failed. Please try again.' });
  }
});

// POST /api/v1/generate/roadmap
router.post('/roadmap', async (req, res) => {
  try {
    const schema = z.object({
      niche: z.string().min(2, 'Niche must be at least 2 characters').max(200),
      currentStage: z.string().optional(),
      goal: z.string().min(2, 'Goal must be at least 2 characters').max(300),
      postingFrequency: z.string().optional()
    });

    const data = schema.parse(req.body);
    const cacheKey = `roadmap_${data.niche}_${data.currentStage}_${data.goal}`.toLowerCase().replace(/\s/g, '_');

    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildRoadmapPrompt(data);
    const result = await callWithFallback(promptData.user, promptData.system, 'roadmap');

    const response = { ...result, generatedAt: new Date().toISOString() };
    cache.set(cacheKey, response);
    logAnalysis('roadmap', 'roadmap_generation', data.niche);

    res.json(response);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Roadmap generation error:', error.message);
    res.status(500).json({ error: 'Generation failed. Please try again.' });
  }
});

// POST /api/v1/generate/trends (Trend Discovery Engine)
router.post('/trends', async (req, res) => {
  try {
    const schema = z.object({
      niche: z.string().min(2, 'Niche must be at least 2 characters').max(200),
      platform: z.string().optional().default('YouTube'),
      timeframe: z.string().optional().default('Real-time')
    });

    const data = schema.parse(req.body);
    const cacheKey = `trends_${data.niche}_${data.platform}`.toLowerCase().replace(/\s/g, '_');

    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildTrendDiscoveryPrompt(data);
    const result = await callWithFallback(promptData.user, promptData.system, 'trends');

    const response = { ...result, generatedAt: new Date().toISOString() };
    cache.set(cacheKey, response);
    logAnalysis('trends', 'trend_discovery', data.niche);

    res.json(response);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Trend discovery error:', error.message);
    res.status(500).json({ error: 'Trend discovery failed. Please try again.' });
  }
});

// POST /api/v1/generate/calendar (Content Calendar Generator)
router.post('/calendar', async (req, res) => {
  try {
    const schema = z.object({
      niche: z.string().min(2, 'Niche must be at least 2 characters').max(200),
      frequency: z.string().optional().default('4 videos/week'),
      formats: z.string().optional().default('Shorts & Long-form'),
      audience: z.string().optional()
    });

    const data = schema.parse(req.body);
    const cacheKey = `calendar_${data.niche}_${data.frequency}`.toLowerCase().replace(/\s/g, '_');

    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const promptData = buildCalendarPrompt(data);
    const result = await callWithFallback(promptData.user, promptData.system, 'calendar');

    const response = { ...result, generatedAt: new Date().toISOString() };
    cache.set(cacheKey, response);
    logAnalysis('calendar', 'calendar_generation', data.niche);

    res.json(response);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Calendar generation error:', error.message);
    res.status(500).json({ error: 'Calendar generation failed. Please try again.' });
  }
});

module.exports = router;
