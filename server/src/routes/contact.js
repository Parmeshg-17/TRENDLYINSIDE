const express = require('express');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Strict rate limit for contact form: 5 submissions per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many messages sent. Please wait an hour before submitting another message.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(150),
  subject: z.string().max(100).optional().default('General Inquiry'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
  // Honeypot field - must be empty
  _gotcha: z.string().optional()
});

router.post('/', contactLimiter, async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);

    // Honeypot check: If bot filled the hidden field, silently succeed without processing
    if (data._gotcha && data._gotcha.trim().length > 0) {
      console.warn('[SPAM BLOCKED] Honeypot triggered by submission from IP:', req.ip);
      return res.status(200).json({
        success: true,
        message: 'Your message has been received.'
      });
    }

    console.log(`[Contact Submission] From: ${data.name} <${data.email}> | Subject: ${data.subject}`);

    // In production, forward to internal inbox / webhook
    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We will respond within 24-48 hours.'
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.errors[0]?.message || 'Invalid form input'
        }
      });
    }

    console.error('Contact form error:', error.message);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to process message. Please try again or email hello@trendlyinside.com directly.'
      }
    });
  }
});

module.exports = router;
