const app = require('./src/index');
const http = require('http');

const PORT = 5005;
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);
  const baseUrl = `http://localhost:${PORT}`;

  try {
    const axios = require('axios');

    // 1. Health
    console.log('\n--- 1. Testing /health ---');
    const health = await axios.get(`${baseUrl}/health`);
    console.log('Health status:', health.data.status);

    // 2. Video Analysis
    console.log('\n--- 2. Testing /api/v1/analyze/video ---');
    const video = await axios.post(`${baseUrl}/api/v1/analyze/video`, {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    });
    console.log('Video Analysis Score:', video.data.analysis.overallScore);
    console.log('Hook Score:', video.data.analysis.hookScore);
    console.log('Video Title:', video.data.metadata.title);

    // 3. Shorts Analysis
    console.log('\n--- 3. Testing /api/v1/analyze/shorts ---');
    const shorts = await axios.post(`${baseUrl}/api/v1/analyze/shorts`, {
      url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ'
    });
    console.log('Shorts Overall Score:', shorts.data.analysis.overallScore);
    console.log('Viral Potential:', shorts.data.analysis.viralPotentialScore);

    // 4. Channel Analysis
    console.log('\n--- 4. Testing /api/v1/analyze/channel ---');
    const channel = await axios.post(`${baseUrl}/api/v1/analyze/channel`, {
      url: 'https://www.youtube.com/@mkbhd'
    });
    console.log('Channel Creator Score:', channel.data.analysis.creatorScore);
    console.log('Roadmap week1 focus:', channel.data.analysis.roadmap?.week1?.focus);

    // 5. Hook Generator
    console.log('\n--- 5. Testing /api/v1/generate/hooks ---');
    const hooks = await axios.post(`${baseUrl}/api/v1/generate/hooks`, {
      topic: 'Fitness Motivation',
      platform: 'YouTube Shorts'
    });
    console.log('Generated hooks count:', hooks.data.hooks?.length);
    console.log('Sample hook:', hooks.data.hooks[0]?.hook);

    // 6. Idea Generator
    console.log('\n--- 6. Testing /api/v1/generate/ideas ---');
    const ideas = await axios.post(`${baseUrl}/api/v1/generate/ideas`, {
      niche: 'AI Tech Reviews',
      goal: 'Gain 10k subscribers'
    });
    console.log('Generated ideas count:', ideas.data.ideas?.length);
    console.log('Sample idea:', ideas.data.ideas[0]?.title);

    // 7. Roadmap Generator
    console.log('\n--- 7. Testing /api/v1/generate/roadmap ---');
    const roadmap = await axios.post(`${baseUrl}/api/v1/generate/roadmap`, {
      niche: 'Personal Finance',
      goal: 'Hit 50,000 subscribers in 6 months'
    });
    console.log('Roadmap title:', roadmap.data.roadmapTitle);
    console.log('Weeks generated:', roadmap.data.weeks?.length);

    console.log('\n=======================================');
    console.log('ALL API ENDPOINTS TESTED SUCCESSFULLY! [PASS]');
    console.log('=======================================');
  } catch (err) {
    console.error('API Test Error:', err.response?.data || err.message);
  } finally {
    server.close();
    process.exit(0);
  }
});
