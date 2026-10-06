const app = require('./src/index');

async function testPhase3() {
  const PORT = 5020;
  const server = app.listen(PORT, async () => {
    console.log(`Phase 3 Test server running on port ${PORT}`);

    try {
      // 1. Test AI Creator Assistant Chat
      console.log('\n--- 1. Testing /api/v1/assistant/chat ---');
      const chatRes = await fetch(`http://localhost:${PORT}/api/v1/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'How can I fix a massive drop-off in the first 30 seconds of my tech videos?',
          creatorContext: { niche: 'Tech & Coding', primaryGoal: 'Improve Retention' }
        })
      });
      const chatData = await chatRes.json();
      console.log('Assistant Response Length:', chatData.message?.length);
      console.log('Assistant Preview:', chatData.message?.substring(0, 120) + '...');
      if (!chatData.success || !chatData.message) throw new Error('Assistant chat test failed');

      // 2. Test Trend Prediction Engine
      console.log('\n--- 2. Testing /api/v1/predict/trend ---');
      const predictRes = await fetch(`http://localhost:${PORT}/api/v1/predict/trend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'AI Agents for Freelance Developers',
          niche: 'Tech & AI',
          platform: 'YouTube',
          timeframe: '90-Day Outlook'
        })
      });
      const predictData = await predictRes.json();
      console.log('Breakout Probability:', predictData.prediction?.breakoutProbability);
      console.log('Lifecycle Stage:', predictData.prediction?.lifecycleStage);
      console.log('Optimal Window:', predictData.prediction?.optimalPublishWindow);
      if (!predictData.success || !predictData.prediction?.breakoutAngles) throw new Error('Trend prediction test failed');

      // 3. Test Viral Content Database Query
      console.log('\n--- 3. Testing /api/v1/database/viral ---');
      const dbRes = await fetch(`http://localhost:${PORT}/api/v1/database/viral?niche=Tech&sort=views`);
      const dbData = await dbRes.json();
      console.log('Total Cases Returned:', dbData.total);
      console.log('First Case Title:', dbData.cases[0]?.title);
      console.log('First Case Multiplier:', dbData.cases[0]?.multiplier);
      if (!dbData.success || dbData.total === 0) throw new Error('Viral database test failed');

      // 4. Test Viral Content Database Categories
      console.log('\n--- 4. Testing /api/v1/database/categories ---');
      const catRes = await fetch(`http://localhost:${PORT}/api/v1/database/categories`);
      const catData = await catRes.json();
      console.log('Niches Available:', catData.niches?.length);
      console.log('Platforms Available:', catData.platforms?.length);
      if (!catData.success || catData.totalRecords === 0) throw new Error('Categories test failed');

      // 5. Test Creator Benchmarking
      console.log('\n--- 5. Testing /api/v1/benchmark/creator ---');
      const benchRes = await fetch(`http://localhost:${PORT}/api/v1/benchmark/creator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: 'Finance & Investing',
          subscribers: 25000,
          avgViews: 8500,
          uploadFrequency: '2x / week'
        })
      });
      const benchData = await benchRes.json();
      console.log('Tier Rank:', benchData.benchmark?.tierRank);
      console.log('Percentile Score:', benchData.benchmark?.percentileScore);
      console.log('Bottleneck:', benchData.benchmark?.primaryBottleneck?.substring(0, 80) + '...');
      if (!benchData.success || !benchData.benchmark?.metrics) throw new Error('Benchmarking test failed');

      // 6. Test Advanced Analytics Audit
      console.log('\n--- 6. Testing /api/v1/analytics/audit ---');
      const auditRes = await fetch(`http://localhost:${PORT}/api/v1/analytics/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelUrl: 'youtube.com/@AlexTechReviews',
          niche: 'Tech Reviews',
          subscribers: 45000,
          avgWatchTimePercent: 52,
          ctrAverage: 7.8
        })
      });
      const auditData = await auditRes.json();
      console.log('Algorithmic Health Score:', auditData.audit?.algorithmicHealthScore);
      console.log('Estimated RPM:', auditData.audit?.monetizationValuation?.estimatedRPM);
      console.log('Remediation Steps Count:', auditData.audit?.algorithmicRemediationPlan?.length);
      if (!auditData.success || !auditData.audit?.retentionDiagnostics) throw new Error('Advanced audit test failed');

      // 7. Test Analytics Stats
      console.log('\n--- 7. Testing /api/v1/analytics/stats ---');
      const statsRes = await fetch(`http://localhost:${PORT}/api/v1/analytics/stats`);
      const statsData = await statsRes.json();
      console.log('Platform Stats Total Searches:', statsData.totalSearches);

      console.log('\n=======================================');
      console.log('ALL PHASE 3 BACKEND ENDPOINTS PASSED! [PASS]');
      console.log('=======================================\n');

      server.close();
      process.exit(0);
    } catch (err) {
      console.error('\n[FAIL] Phase 3 Test Failed:', err.message);
      server.close();
      process.exit(1);
    }
  });
}

testPhase3();
