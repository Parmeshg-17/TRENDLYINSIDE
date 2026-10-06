const express = require('express');
const router = express.Router();
const { callWithFallback } = require('../services/openRouterService');
const { buildTrendPredictionPrompt } = require('../services/promptBuilder');
const { logSearch } = require('../services/analyticsService');

/**
 * POST /api/v1/predict/trend
 * Forecasts algorithmic lifecycle trajectory, peak velocity, saturation hazard, and breakout angles
 */
router.post('/trend', async (req, res) => {
  try {
    const { topic, niche = 'General', platform = 'YouTube & Short-form', timeframe = '90-Day Outlook' } = req.body;

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return res.status(400).json({ error: 'Please provide a topic or trend keyword to predict.' });
    }

    logSearch(req, 'predict_trend', { topic, niche, platform });

    const promptObj = buildTrendPredictionPrompt({
      topic: topic.trim(),
      niche,
      platform,
      timeframe
    });

    const prediction = await callWithFallback(promptObj.user, promptObj.system);

    res.json({
      success: true,
      topic: topic.trim(),
      niche,
      platform,
      timeframe,
      prediction,
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Trend Prediction Error:', error);
    res.status(500).json({
      error: 'Failed to predict trend trajectory',
      details: error.message
    });
  }
});

module.exports = router;
