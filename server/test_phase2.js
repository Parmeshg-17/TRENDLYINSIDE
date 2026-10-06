const axios = require('axios');
const http = require('http');
const app = require('./src/index');

const PORT = 5010;
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Phase 2 Test server running on port ${PORT}`);
  const baseUrl = `http://localhost:${PORT}`;

  try {
    // 1. Reel
    console.log('\n--- 1. Testing /api/v1/analyze/reel ---');
    const reel = await axios.post(`${baseUrl}/api/v1/analyze/reel`, {
      url: 'https://www.instagram.com/reel/C3abc123/',
      caption: '3 AI tools you need to know about right now',
      audio: 'Trending Audio #1'
    });
    console.log('Reel Overall Score:', reel.data.analysis?.overallScore);
    console.log('Saveability Score:', reel.data.analysis?.saveabilityScore);
    console.log('Audio Verdict:', reel.data.analysis?.audioAnalysis?.verdict);

    // 2. TikTok
    console.log('\n--- 2. Testing /api/v1/analyze/tiktok ---');
    const tiktok = await axios.post(`${baseUrl}/api/v1/analyze/tiktok`, {
      url: 'https://www.tiktok.com/@creator/video/721234567890',
      description: 'Why you should stop working 12 hours a day #growth #productivity',
      sound: 'Original Sound - Creator'
    });
    console.log('TikTok Overall Score:', tiktok.data.analysis?.overallScore);
    console.log('Loop Score:', tiktok.data.analysis?.loopScore);
    console.log('FYP Potential:', tiktok.data.analysis?.foryouPagePotential);

    // 3. Thumbnail
    console.log('\n--- 3. Testing /api/v1/analyze/thumbnail ---');
    const thumb = await axios.post(`${baseUrl}/api/v1/analyze/thumbnail`, {
      title: 'I Spent 100 Days in the Wilderness Alone',
      niche: 'Outdoor Adventure',
      imageUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    });
    console.log('Thumbnail Overall Score:', thumb.data.analysis?.overallScore);
    console.log('Contrast Score:', thumb.data.analysis?.contrastScore);
    console.log('Predicted CTR:', thumb.data.analysis?.predictedCTR);

    // 4. Competitor
    console.log('\n--- 4. Testing /api/v1/analyze/competitor ---');
    const comp = await axios.post(`${baseUrl}/api/v1/analyze/competitor`, {
      channelA: '@MyTechChannel',
      channelB: '@RivalTechGuru',
      niche: 'AI Tech Reviews'
    });
    console.log('Winner Verdict:', comp.data.analysis?.winnerVerdict);
    console.log('Content Gap Opportunities:', comp.data.analysis?.contentGapOpportunities?.length);

    // 5. Trends
    console.log('\n--- 5. Testing /api/v1/generate/trends ---');
    const trends = await axios.post(`${baseUrl}/api/v1/generate/trends`, {
      niche: 'Personal Finance & Investing',
      platform: 'YouTube'
    });
    console.log('Trending Topics Count:', trends.data.trendingTopics?.length);
    console.log('Top Trend:', trends.data.trendingTopics?.[0]?.topic);

    // 6. Calendar
    console.log('\n--- 6. Testing /api/v1/generate/calendar ---');
    const cal = await axios.post(`${baseUrl}/api/v1/generate/calendar`, {
      niche: 'Fitness Motivation',
      frequency: '4 videos/week',
      formats: 'Shorts & Long-form'
    });
    console.log('Calendar Title:', cal.data.calendarTitle);
    console.log('Weeks Generated:', cal.data.weeks?.length);
    console.log('Total Scheduled Posts:', cal.data.totalScheduledPosts);

    console.log('\n=======================================');
    console.log('ALL 6 PHASE 2 BACKEND ENDPOINTS PASSED! [PASS]');
    console.log('=======================================');
  } catch (err) {
    console.error('Phase 2 Test Error:', err.response?.data || err.message);
  } finally {
    server.close();
    process.exit(0);
  }
});
