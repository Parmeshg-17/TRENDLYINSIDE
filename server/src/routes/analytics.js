const express = require('express');
const router = express.Router();
const { callWithFallback } = require('../services/openRouterService');
const { buildAdvancedAnalyticsPrompt } = require('../services/promptBuilder');
const { logSearch, getAnalyticsSummary } = require('../services/analyticsService');

/**
 * GET /api/v1/analytics/stats
 * Aggregate anonymous platform metrics
 */
router.get('/stats', (req, res) => {
  res.json(getAnalyticsSummary());
});

/**
 * POST /api/v1/analytics/audit
 * Advanced channel audit: retention dropoff curves, thumbnail fatigue, monetization potential
 */
router.post('/audit', async (req, res) => {
  try {
    const {
      channelUrl = '',
      niche = 'General Creator',
      subscribers = 10000,
      avgWatchTimePercent = 48,
      ctrAverage = 6.5,
      primaryFormat = 'Hybrid Long-form & Shorts'
    } = req.body;

    logSearch(req, 'advanced_analytics_audit', { channelUrl, niche, subscribers });

    const promptObj = buildAdvancedAnalyticsPrompt({
      channelUrl,
      niche,
      subscribers,
      avgWatchTimePercent,
      ctrAverage,
      primaryFormat
    });

    const audit = await callWithFallback(promptObj.user, promptObj.system);

    res.json({
      success: true,
      channelUrl,
      niche,
      subscribers,
      audit,
      auditedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Advanced Analytics Audit Error:', error);
    res.status(500).json({
      error: 'Failed to run advanced channel audit',
      details: error.message
    });
  }
});

module.exports = router;
