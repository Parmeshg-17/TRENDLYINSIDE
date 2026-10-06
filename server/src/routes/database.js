const express = require('express');
const router = express.Router();
const { getViralDatabase, getDatabaseCategories } = require('../services/viralDatabaseService');
const { logSearch } = require('../services/analyticsService');

/**
 * GET /api/v1/database/viral
 * Searchable repository of analyzed viral content case studies across platforms and niches
 */
router.get('/viral', (req, res) => {
  try {
    const { niche, platform, search, sort } = req.query;

    logSearch(req, 'viral_database_query', { niche, platform, search, sort });

    const data = getViralDatabase({
      niche,
      platform,
      search,
      sort
    });

    res.json({
      success: true,
      total: data.total,
      cases: data.cases
    });
  } catch (error) {
    console.error('Viral Database Query Error:', error);
    res.status(500).json({
      error: 'Failed to query viral database',
      details: error.message
    });
  }
});

/**
 * GET /api/v1/database/categories
 * Returns distinct niches, platforms, and metadata counts
 */
router.get('/categories', (req, res) => {
  try {
    const categories = getDatabaseCategories();
    res.json({
      success: true,
      ...categories
    });
  } catch (error) {
    console.error('Database Categories Error:', error);
    res.status(500).json({
      error: 'Failed to fetch categories',
      details: error.message
    });
  }
});

module.exports = router;
