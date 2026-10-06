const axios = require('axios');

/**
 * YouTube Data Extraction Service
 * Extracts video metadata using YouTube's oEmbed API and yt-dlp style approaches
 */

// Extract video ID from various YouTube URL formats
function extractVideoId(url) {
  const patterns = [
    /(?:v=|\/v\/|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Extract channel handle from URL
function extractChannelHandle(url) {
  const patterns = [
    /youtube\.com\/@([a-zA-Z0-9_.-]+)/,
    /youtube\.com\/c\/([a-zA-Z0-9_.-]+)/,
    /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Fetch video metadata using YouTube oEmbed API (no API key required)
async function fetchVideoMetadata(videoId) {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await axios.get(oembedUrl, { timeout: 10000 });

    return {
      title: response.data.title,
      channel: response.data.author_name,
      channelUrl: response.data.author_url,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      thumbnailFallback: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  } catch (error) {
    // Return partial data even if oEmbed fails
    return {
      title: 'Video Analysis',
      channel: 'YouTube Creator',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      thumbnailFallback: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  }
}

// Validate YouTube URL
function validateYouTubeUrl(url) {
  try {
    const urlObj = new URL(url);
    const isYouTube = urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be');
    return isYouTube;
  } catch {
    return false;
  }
}

// Detect URL type
function detectUrlType(url) {
  if (url.includes('/shorts/')) return 'shorts';
  if (url.includes('watch?v=') || url.includes('youtu.be/')) return 'video';
  if (url.includes('@') || url.includes('/c/') || url.includes('/channel/') || url.includes('/user/')) return 'channel';
  return 'unknown';
}

// Build mock channel data (since we can't scrape YouTube without API key)
async function fetchChannelData(channelHandle) {
  return {
    channel: channelHandle,
    handle: `@${channelHandle}`,
    // We'll pass this to AI and let it work with what's available
    description: `YouTube channel: @${channelHandle}`,
    recentVideos: []
  };
}

module.exports = {
  extractVideoId,
  extractChannelHandle,
  fetchVideoMetadata,
  validateYouTubeUrl,
  detectUrlType,
  fetchChannelData
};
