// ============================================================
// TrendlyInside - TypeScript Types
// ============================================================

export interface VideoMetadata {
  videoId: string;
  title: string;
  channel: string;
  channelUrl?: string;
  thumbnail: string;
  thumbnailFallback?: string;
  embedUrl?: string;
  duration?: string;
  publishedAt?: string;
}

export interface AnalysisCategory {
  score: number;
  verdict: string;
  details?: string;
  analysis?: string;
  improvements?: string[];
  suggestions?: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface GrowthOpportunity {
  opportunity: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

// Video Analysis
export interface VideoAnalysis {
  overallScore: number;
  hookScore: number;
  thumbnailScore: number;
  storytellingScore: number;
  engagementScore: number;
  ctaScore: number;
  retentionScore: number;
  hookAnalysis: AnalysisCategory;
  thumbnailAnalysis: AnalysisCategory;
  storytellingAnalysis: AnalysisCategory;
  engagementAnalysis: AnalysisCategory;
  ctaAnalysis: AnalysisCategory;
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  nextSteps: string[];
  viralPotential: 'High' | 'Medium' | 'Low';
  summaryInsight: string;
}

export interface VideoAnalysisResult {
  videoId: string;
  url: string;
  metadata: VideoMetadata;
  analysis: VideoAnalysis;
  analyzedAt: string;
  fromCache?: boolean;
}

// Shorts Analysis
export interface ShortsAnalysis {
  overallScore: number;
  hookScore: number;
  retentionScore: number;
  engagementScore: number;
  viralPotentialScore: number;
  pacingScore: number;
  firstThreeSeconds: AnalysisCategory;
  hookAnalysis: AnalysisCategory;
  pacingAnalysis: AnalysisCategory;
  viralPotentialAnalysis: {
    score: number;
    verdict: string;
    trendRelevance: string;
    shareability: string;
    replayValue: string;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  nextSteps: string[];
  summaryInsight: string;
}

export interface ShortsAnalysisResult {
  videoId: string;
  url: string;
  metadata: VideoMetadata;
  analysis: ShortsAnalysis;
  analyzedAt: string;
  fromCache?: boolean;
}

// Channel Analysis
export interface ChannelAnalysis {
  creatorScore: number;
  consistencyScore: number;
  brandingScore: number;
  contentQualityScore: number;
  growthPotentialScore: number;
  audienceAlignmentScore: number;
  contentConsistency: AnalysisCategory & { uploadFrequency?: string };
  topicClarity: AnalysisCategory & { primaryNiche?: string; subNiches?: string[] };
  branding: AnalysisCategory;
  contentThemes: string[];
  strengths: string[];
  weaknesses: string[];
  growthOpportunities: GrowthOpportunity[];
  roadmap: {
    week1: { focus: string; tasks: string[] };
    week2: { focus: string; tasks: string[] };
    week3: { focus: string; tasks: string[] };
    week4: { focus: string; tasks: string[] };
  };
  summaryInsight: string;
}

export interface ChannelAnalysisResult {
  channelHandle: string;
  url: string;
  channelData: { channel: string; handle: string };
  analysis: ChannelAnalysis;
  analyzedAt: string;
  fromCache?: boolean;
}

// Hook Generator
export interface Hook {
  id: number;
  category: string;
  hook: string;
  why: string;
}

export interface HookGenerationResult {
  hooks: Hook[];
  generatedAt: string;
  fromCache?: boolean;
}

// Idea Generator
export interface ContentIdea {
  id: number;
  category: string;
  title: string;
  angle: string;
  viralPotential: 'High' | 'Medium' | 'Low';
}

export interface IdeaGenerationResult {
  ideas: ContentIdea[];
  topPicks?: number[];
  contentCalendarSuggestion?: string;
  generatedAt: string;
  fromCache?: boolean;
}

// Roadmap Generator
export interface RoadmapTask {
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  timeEstimate: string;
}

export interface RoadmapWeek {
  week: number;
  focus: string;
  theme: string;
  tasks: RoadmapTask[];
  milestone: string;
}

export interface RoadmapResult {
  roadmapTitle: string;
  goal: string;
  niche: string;
  overview: string;
  weeks: RoadmapWeek[];
  keyMetrics: string[];
  toolsRecommended: string[];
  successTip: string;
  generatedAt: string;
  fromCache?: boolean;
}

// Phase 2 Types
export interface ReelAnalysis {
  overallScore: number;
  audioScore: number;
  hookScore: number;
  saveabilityScore: number;
  shareabilityScore: number;
  captionScore: number;
  audioAnalysis: {
    verdict: string;
    trendLevel: string;
    advice: string;
  };
  hookAnalysis: {
    verdict: string;
    score: number;
    improvements: string[];
  };
  saveabilityAnalysis: {
    verdict: string;
    tactics: string[];
    reasonsToSave: string;
  };
  hashtagSuggestions: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  viralPotential: string;
  summaryInsight: string;
}

export interface ReelAnalysisResult {
  url: string;
  platform: string;
  analysis: ReelAnalysis;
  analyzedAt: string;
  fromCache?: boolean;
}

export interface TikTokAnalysis {
  overallScore: number;
  hookScore: number;
  soundScore: number;
  loopScore: number;
  engagementScore: number;
  pacingScore: number;
  foryouPagePotential: number;
  loopAnalysis: {
    verdict: string;
    score: number;
    loopTechnique: string;
  };
  soundAnalysis: {
    verdict: string;
    soundStrategy: string;
  };
  hookAnalysis: {
    verdict: string;
    opening2Seconds: string;
    improvements: string[];
  };
  commentBaitTactics: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  summaryInsight: string;
}

export interface TikTokAnalysisResult {
  url: string;
  platform: string;
  analysis: TikTokAnalysis;
  analyzedAt: string;
  fromCache?: boolean;
}

export interface ThumbnailAnalysis {
  overallScore: number;
  contrastScore: number;
  readabilityScore: number;
  emotionScore: number;
  clickabilityScore: number;
  predictedCTR: string;
  focalPointAnalysis: {
    focalPoint: string;
    clarityVerdict: string;
    suggestions: string[];
  };
  textOverlayAnalysis: {
    textDetected: string;
    wordCount: number;
    readabilityVerdict: string;
    advice: string;
  };
  colorPsychology: {
    dominantColors: string[];
    emotionalVibe: string;
    recommendations: string;
  };
  abTestSuggestions: {
    concept: string;
    hypothesis: string;
  }[];
  recommendations: Recommendation[];
  mobileVerdict: string;
  summaryInsight: string;
}

export interface ThumbnailAnalysisResult {
  title: string;
  imageUrl: string | null;
  niche: string;
  analysis: ThumbnailAnalysis;
  analyzedAt: string;
  fromCache?: boolean;
}

export interface CompetitorAnalysis {
  winnerVerdict: string;
  channelAScore: number;
  channelBScore: number;
  channelAAnalysis: {
    name: string;
    coreStrengths: string[];
    weaknesses: string[];
  };
  channelBAnalysis: {
    name: string;
    coreStrengths: string[];
    weaknesses: string[];
  };
  contentGapOpportunities: {
    title: string;
    angle: string;
    demand: string;
    whyItWins: string;
  }[];
  formatComparison: {
    thumbnailDifference: string;
    pacingDifference: string;
    frequencyDifference: string;
  };
  audienceStealStrategy: string[];
  summaryInsight: string;
}

export interface CompetitorAnalysisResult {
  channelA: string;
  channelB: string;
  niche: string;
  analysis: CompetitorAnalysis;
  analyzedAt: string;
  fromCache?: boolean;
}

export interface TrendingTopic {
  topic: string;
  searchVelocity: string;
  competitionLevel: string;
  contentAngle: string;
  estimatedViewsPotential: string;
}

export interface TrendDiscoveryResult {
  niche: string;
  platform: string;
  saturationLevel: string;
  growthMomentum: string;
  trendingTopics: TrendingTopic[];
  viralFormats: {
    formatName: string;
    whyItWorks: string;
    executionTip: string;
  }[];
  breakoutKeywords: {
    keyword: string;
    trendDirection: string;
    searchVolume: string;
  }[];
  firstMoverAdvantageTips: string[];
  summaryInsight: string;
  generatedAt: string;
  fromCache?: boolean;
}

export interface CalendarDay {
  day: number;
  dayName: string;
  title: string;
  format: string;
  platform: string;
  hook: string;
  status: string;
}

export interface CalendarWeek {
  weekNumber: number;
  theme: string;
  days: CalendarDay[];
}

export interface ContentCalendarResult {
  calendarTitle: string;
  niche: string;
  totalScheduledPosts: number;
  contentPillars: {
    pillar: string;
    percentage: string;
  }[];
  weeks: CalendarWeek[];
  productionRules: string[];
  generatedAt: string;
  fromCache?: boolean;
}

// Phase 3: AI Creator Assistant
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface CreatorContext {
  niche?: string;
  channelName?: string;
  primaryGoal?: string;
}

export interface AssistantChatResult {
  success: boolean;
  message: string;
  timestamp: string;
}

// Phase 3: Trend Prediction Engine
export interface TrendPredictionAngle {
  angle: string;
  suggestedTitle: string;
  format: string;
  expectedCTR: string;
}

export interface TrendPredictionVelocity {
  day: string;
  velocity: number;
}

export interface TrendPredictionData {
  topic: string;
  niche: string;
  platform: string;
  breakoutProbability: number;
  lifecycleStage: string;
  predictedPeakDate: string;
  optimalPublishWindow: string;
  saturationIndex: number;
  velocityForecast: TrendPredictionVelocity[];
  breakoutAngles: TrendPredictionAngle[];
  saturationHazards: string[];
  monetizationPotential: {
    rating: string;
    estimatedRPM: string;
    bestMonetizationRoute: string;
  };
  summaryVerdict: string;
}

export interface TrendPredictionResult {
  success: boolean;
  topic: string;
  niche: string;
  platform: string;
  timeframe: string;
  prediction: TrendPredictionData;
  analyzedAt: string;
}

// Phase 3: Viral Content Database
export interface ViralCaseStudy {
  id: string;
  title: string;
  creator: string;
  niche: string;
  platform: string;
  views: string;
  multiplier: string;
  duration: string;
  thumbnailConcept: string;
  hookBreakdown: string;
  retentionTechnique: string;
  viralFactors: string[];
  frameworkTemplate: string;
  keyTakeaway: string;
}

export interface ViralDatabaseResult {
  success: boolean;
  total: number;
  cases: ViralCaseStudy[];
}

export interface DatabaseCategoriesResult {
  success: boolean;
  niches: string[];
  platforms: string[];
  totalRecords: number;
}

// Phase 3: Creator Benchmarking
export interface BenchmarkMetric {
  creatorValue: string;
  nicheMedian: string;
  top10Percent: string;
  status: string;
  verdict: string;
}

export interface BenchmarkScoreMetric {
  score: number;
  nicheMedian: number;
  top10Percent: number;
  status: string;
  verdict: string;
}

export interface CreatorBenchmarkData {
  tierRank: string;
  percentileScore: number;
  overallHealthScore: number;
  niche: string;
  subscribers: number;
  avgViews: number;
  metrics: {
    viewToSubRatio: BenchmarkMetric;
    engagementRate: BenchmarkMetric;
    consistencyScore: BenchmarkMetric;
    retentionEfficiency: BenchmarkScoreMetric;
    monetizationReadiness: BenchmarkScoreMetric;
  };
  primaryBottleneck: string;
  targetMilestones: {
    nextTierName: string;
    targetSubscribers: string;
    targetAvgViews: string;
    estimatedTimeToUnlock: string;
  };
  unlockRoadmap: {
    step: number;
    title: string;
    action: string;
  }[];
  competitiveAdvantage: string;
}

export interface CreatorBenchmarkResult {
  success: boolean;
  niche: string;
  subscribers: number;
  avgViews: number;
  uploadFrequency: string;
  benchmark: CreatorBenchmarkData;
  benchmarkedAt: string;
}

// Phase 3: Advanced Analytics
export interface AdvancedAnalyticsAuditData {
  algorithmicHealthScore: number;
  healthStatus: string;
  retentionDiagnostics: {
    first30SecDropoff: string;
    midVideoDipTimestamp: string;
    endScreenConversion: string;
    retentionScore: number;
    keyFix: string;
  };
  audienceFatigueIndex: {
    thumbnailFatigueScore: number;
    titleFormulaStatus: string;
    churnRiskLevel: string;
    browseVsSearchRatio: string;
    fatigueDiagnosis: string;
  };
  monetizationValuation: {
    estimatedRPM: string;
    monthlyEstimatedRevenue: string;
    annualEarningPotential: string;
    missingRevenueStreams: string[];
  };
  algorithmicRemediationPlan: {
    priority: string;
    area: string;
    action: string;
  }[];
  executiveSummary: string;
}

export interface AdvancedAnalyticsResult {
  success: boolean;
  channelUrl: string;
  niche: string;
  subscribers: number;
  audit: AdvancedAnalyticsAuditData;
  auditedAt: string;
}

// Blog
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image?: string;
  content?: string;
}

// API
export interface ApiError {
  error: string;
  message?: string;
}

export type AnalysisState = 'idle' | 'loading' | 'success' | 'error';
