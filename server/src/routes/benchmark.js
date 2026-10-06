const express = require('express');
const router = express.Router();
const { callWithFallback } = require('../services/openRouterService');
const { buildBenchmarkPrompt } = require('../services/promptBuilder');
const { logSearch } = require('../services/analyticsService');

/**
 * POST /api/v1/benchmark/creator
 * Benchmarks creator metrics against median and top 10% peers in their specific niche
 */
router.post('/creator', async (req, res) => {
  try {
    const {
      niche = 'Tech',
      subscribers = 5000,
      avgViews = 2000,
      uploadFrequency = '2x / week',
      engagementRate,
      currentStage
    } = req.body;

    const subs = Math.max(0, parseInt(subscribers, 10) || 0);
    const views = Math.max(0, parseInt(avgViews, 10) || 0);

    logSearch(req, 'creator_benchmarking', { niche, subscribers: subs, avgViews: views });

    const promptObj = buildBenchmarkPrompt({
      niche,
      subscribers: subs,
      avgViews: views,
      uploadFrequency,
      engagementRate,
      currentStage
    });

    const benchmark = await callWithFallback(promptObj.user, promptObj.system);

    res.json({
      success: true,
      niche,
      subscribers: subs,
      avgViews: views,
      uploadFrequency,
      benchmark,
      benchmarkedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Creator Benchmarking Error:', error);
    res.status(500).json({
      error: 'Failed to benchmark creator metrics',
      details: error.message
    });
  }
});

module.exports = router;
