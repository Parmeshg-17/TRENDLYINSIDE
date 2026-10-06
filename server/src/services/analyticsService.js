const crypto = require('crypto');

// In-memory analytics store for anonymous metrics tracking
// Matches schema in PRD.md and Technical Documentation.md:
// Table: analysis_logs (id UUID, url_type TEXT, analysis_type TEXT, created_at TIMESTAMP)
const analysisLogs = [];
const popularQueries = new Map();

function logAnalysis(urlType, analysisType, query = null) {
  try {
    const entry = {
      id: crypto.randomUUID(),
      url_type: urlType || 'unknown',
      analysis_type: analysisType || 'general',
      created_at: new Date().toISOString()
    };

    analysisLogs.unshift(entry);
    if (analysisLogs.length > 1000) {
      analysisLogs.pop(); // keep last 1000 anonymous events
    }

    if (query) {
      const q = query.trim().toLowerCase();
      popularQueries.set(q, (popularQueries.get(q) || 0) + 1);
    }

    return entry;
  } catch (err) {
    console.warn('Analytics log error:', err.message);
  }
}

function logSearch(req, analysisType, metadata = null) {
  const queryStr = typeof metadata === 'string'
    ? metadata
    : (metadata?.topic || metadata?.query || metadata?.messagePreview || metadata?.niche || null);
  return logAnalysis('platform_tool', analysisType, queryStr);
}

function getAnalyticsSummary() {
  const byType = {};
  for (const log of analysisLogs) {
    byType[log.analysis_type] = (byType[log.analysis_type] || 0) + 1;
  }

  const topQueries = Array.from(popularQueries.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalSearches: analysisLogs.length,
    totalEvents: analysisLogs.length,
    eventsByType: byType,
    popularQueries: topQueries,
    recentEvents: analysisLogs.slice(0, 10)
  };
}

module.exports = {
  logAnalysis,
  logSearch,
  getAnalyticsSummary
};
