const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const analyzeRoutes = require('./routes/analyze');
const generateRoutes = require('./routes/generate');
const assistantRoutes = require('./routes/assistant');
const predictRoutes = require('./routes/predict');
const databaseRoutes = require('./routes/database');
const benchmarkRoutes = require('./routes/benchmark');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (Cloudflare, AWS, Heroku, Railway, Render, Nginx)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
  hsts: process.env.NODE_ENV === 'production' ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  } : false,
}));

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'https://trendlyinside.com'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON
app.use(express.json({ limit: '1mb' }));

// Rate limiting - 20 requests per hour per IP (higher in dev)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.NODE_ENV === 'production' ? 20 : 500,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: "You've reached the free analysis limit for this hour. Try again shortly."
    },
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Health check endpoints (root & versioned)
const healthHandler = (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    service: 'TrendlyInside Creator Intelligence API',
    timestamp: new Date().toISOString()
  });
};

app.get('/health', healthHandler);
app.get('/api/v1/health', healthHandler);

const contactRoutes = require('./routes/contact');
const path = require('path');
const fs = require('fs');

// HTTPS redirect in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const proto = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
    if (proto === 'http') {
      const host = req.headers.host || req.hostname;
      return res.redirect(301, `https://${host}${req.url}`);
    }
  }
  next();
});

// Phase 1 & Phase 2 Routes
app.use('/api/v1/analyze', analyzeRoutes);
app.use('/api/v1/generate', generateRoutes);
app.use('/api/v1/contact', contactRoutes);

// Phase 3 Routes
app.use('/api/v1/assistant', assistantRoutes);
app.use('/api/v1/predict', predictRoutes);
app.use('/api/v1/database', databaseRoutes);
app.use('/api/v1/benchmark', benchmarkRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Static Client Serving & Real HTTP 404 Status Handling
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const VALID_CLIENT_ROUTES = new Set([
  '/',
  '/youtube-video-analyzer',
  '/youtube-shorts-analyzer',
  '/youtube-channel-analyzer',
  '/hook-generator',
  '/viral-idea-generator',
  '/growth-roadmap-generator',
  '/instagram-reel-analyzer',
  '/tiktok-analyzer',
  '/thumbnail-analyzer',
  '/competitor-analyzer',
  '/trend-discovery',
  '/content-calendar-generator',
  '/creator-assistant',
  '/trend-prediction',
  '/viral-database',
  '/creator-benchmarking',
  '/advanced-analytics',
  '/blog',
  '/about',
  '/contact',
  '/thank-you',
  '/privacy',
  '/privacy-policy',
  '/terms',
  '/sitemap.xml',
  '/robots.txt'
]);

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api/')) return next();
    const isBlog = req.path.startsWith('/blog/');
    const isValid = VALID_CLIENT_ROUTES.has(req.path) || isBlog;
    const indexPath = path.join(clientDistPath, 'index.html');

    if (isValid) {
      res.status(200).sendFile(indexPath);
    } else {
      // Returns real HTTP 404 status code while rendering the React 404 SPA view
      res.status(404).sendFile(indexPath);
    }
  });
}

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'The requested TrendlyInside endpoint was not found.'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred during content intelligence processing.'
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[TrendlyInside API] Running on port ${PORT}`);
    console.log(`[TrendlyInside API] Environment: ${process.env.NODE_ENV || 'development'}`);
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY.includes('your_openrouter_api_key')) {
      console.log('[TrendlyInside API] Notice: OPENROUTER_API_KEY not configured. Intelligent fallback engine is active.');
    }
  });
}

module.exports = app;
