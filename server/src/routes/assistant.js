const express = require('express');
const router = express.Router();
const { callAssistantChat } = require('../services/openRouterService');
const { logSearch } = require('../services/analyticsService');

/**
 * POST /api/v1/assistant/chat
 * Interactive AI Creator Copilot for brainstorming, script Doctor, title/hook critique, and growth strategy
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [], creatorContext = {} } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Please provide a message for the assistant.' });
    }

    logSearch(req, 'assistant', {
      messagePreview: message.substring(0, 100),
      niche: creatorContext.niche || 'General',
      hasHistory: history.length > 0
    });

    const reply = await callAssistantChat(message.trim(), history, creatorContext);

    res.json({
      success: true,
      message: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Creator Assistant Error:', error);
    res.status(500).json({
      error: 'Failed to process assistant request',
      details: error.message
    });
  }
});

module.exports = router;
