const axios = require('axios');
const { generateFallbackResponse, generateAssistantFallback } = require('./fallbackIntelligence');

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Model preferences (DeepSeek, Qwen, Gemma, Llama as per specs)
const MODELS = {
  primary: 'deepseek/deepseek-chat',
  secondary: 'qwen/qwen-2.5-72b-instruct',
  tertiary: 'google/gemma-3-27b-it',
  fallback: 'meta-llama/llama-3.3-70b-instruct'
};

/**
 * Task-based model selection:
 * - video / shorts: DeepSeek (deep content reasoning)
 * - channel / competitor: Qwen (creator strategy)
 * - hooks / ideas / calendar: Gemma (creative generation)
 * - general / fallback: Llama
 */
function getModelsForTask(taskType) {
  switch (taskType) {
    case 'video':
    case 'shorts':
    case 'reel':
    case 'tiktok':
      return [MODELS.primary, MODELS.secondary, MODELS.fallback];
    case 'channel':
    case 'competitor':
    case 'benchmark':
    case 'analytics':
      return [MODELS.secondary, MODELS.primary, MODELS.fallback];
    case 'hooks':
    case 'ideas':
    case 'calendar':
    case 'roadmap':
    case 'trends':
      return [MODELS.tertiary, MODELS.secondary, MODELS.fallback];
    default:
      return [MODELS.primary, MODELS.secondary, MODELS.fallback];
  }
}

async function callOpenRouter(prompt, systemPrompt, model = null) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    throw new Error('No OpenRouter API key provided');
  }

  const selectedModel = model || MODELS.primary;

  const response = await axios.post(
    `${OPENROUTER_BASE_URL}/chat/completions`,
    {
      model: selectedModel,
      messages: [
        {
          role: 'system',
          content: systemPrompt || 'You are TrendlyInside, an expert AI creator intelligence assistant. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: 'json_object' }
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://trendlyinside.com',
        'X-Title': 'TrendlyInside',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(22000)
    }
  );

  const content = response.data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(response.data?.error?.message || 'No choices returned from AI model');
  }

  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error('Failed to parse AI response as JSON');
  }
}

async function callAssistantChat(message, history = [], creatorContext = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey && apiKey !== 'your_openrouter_api_key_here') {
    const systemPrompt = `You are TrendlyInside AI Creator Assistant, an elite creator strategist, script doctor, and growth coach.
You give concrete, tactical advice to creators across YouTube, Instagram Reels, and TikTok.
Always provide specific examples (e.g., exact hook wording, title formulas with curiosity gaps, thumbnail layout descriptions, sponsor email scripts).
Format your response in clean, beautiful Markdown with bullet points, bold highlights, and headers where helpful.
Never give fluffy or generic advice like "just make good videos". Give exact blueprints and algorithmic reasoning.`;

    const messages = [{ role: 'system', content: systemPrompt }];

    if (creatorContext.niche || creatorContext.channelName || creatorContext.primaryGoal) {
      messages.push({
        role: 'system',
        content: `CREATOR CONTEXT:
Niche: ${creatorContext.niche || 'General'}
Channel Handle: ${creatorContext.channelName || 'Not specified'}
Primary Goal: ${creatorContext.primaryGoal || 'Audience Growth & Higher Retention'}`
      });
    }

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role && item.content) {
          messages.push({ role: item.role, content: item.content });
        }
      }
    }

    messages.push({ role: 'user', content: message });

    for (const model of [MODELS.primary, MODELS.secondary]) {
      try {
        const response = await axios.post(
          `${OPENROUTER_BASE_URL}/chat/completions`,
          {
            model,
            messages,
            temperature: 0.7,
            max_tokens: 3000
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': 'https://trendlyinside.com',
              'X-Title': 'TrendlyInside',
              'Content-Type': 'application/json'
            },
            signal: AbortSignal.timeout(22000)
          }
        );
        const reply = response.data?.choices?.[0]?.message?.content;
        if (reply && reply.trim()) return reply;
      } catch (err) {
        console.warn(`Assistant chat OpenRouter model ${model} failed: ${err.message}`);
      }
    }
  }

  return generateAssistantFallback(message, creatorContext);
}

async function callWithFallback(prompt, systemPrompt, taskType = 'general') {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey && apiKey !== 'your_openrouter_api_key_here') {
    const candidateModels = getModelsForTask(taskType).slice(0, 2);
    for (const model of candidateModels) {
      try {
        return await callOpenRouter(prompt, systemPrompt, model);
      } catch (err) {
        console.warn(`OpenRouter model ${model} failed for task "${taskType}": ${err.message}`);
        // If quota, rate limit, auth, timeout, or cancellation occurs, immediately activate fallback engine
        if (
          err.response?.status === 429 ||
          err.response?.status === 402 ||
          err.response?.status === 401 ||
          err.response?.status === 400 ||
          err.code === 'ECONNABORTED' ||
          err.code === 'ERR_CANCELED' ||
          err.name === 'CanceledError' ||
          err.name === 'AbortError' ||
          err.message?.toLowerCase().includes('timeout') ||
          err.message?.toLowerCase().includes('cancel') ||
          err.message?.toLowerCase().includes('choices')
        ) {
          console.warn('OpenRouter limit, auth, or timeout encountered. Activating intelligent fallback engine immediately.');
          break;
        }
      }
    }
  } else {
    console.log('No OpenRouter API key configured. Using TrendlyInside intelligence engine.');
  }

  // Graceful fallback guarantees complete application functionality and speed
  return generateFallbackResponse(prompt);
}

module.exports = { callOpenRouter, callWithFallback, callAssistantChat, MODELS, getModelsForTask };
