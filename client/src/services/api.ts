import axios from 'axios';
import type {
  VideoAnalysisResult,
  ShortsAnalysisResult,
  ChannelAnalysisResult,
  HookGenerationResult,
  IdeaGenerationResult,
  RoadmapResult,
  ReelAnalysisResult,
  TikTokAnalysisResult,
  ThumbnailAnalysisResult,
  CompetitorAnalysisResult,
  TrendDiscoveryResult,
  ContentCalendarResult,
  ChatMessage,
  CreatorContext,
  AssistantChatResult,
  TrendPredictionResult,
  ViralDatabaseResult,
  DatabaseCategoriesResult,
  CreatorBenchmarkResult,
  AdvancedAnalyticsResult,
} from '../types';

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  '/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 45000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor returning directly data or unwrapping success envelope
api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success !== undefined && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      throw new Error(
        'Unable to connect to the TrendlyInside API server. Please ensure the backend server is running on port 5000.'
      );
    }
    const errData = error.response?.data;
    const message =
      errData?.error?.message ||
      errData?.error ||
      errData?.message ||
      error.message ||
      'Something went wrong during content intelligence analysis.';
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }
);

// Phase 1 Analysis endpoints
export const analyzeVideo = (url: string): Promise<VideoAnalysisResult> =>
  api.post('/analyze/video', { url }) as unknown as Promise<VideoAnalysisResult>;

export const analyzeShorts = (url: string): Promise<ShortsAnalysisResult> =>
  api.post('/analyze/shorts', { url }) as unknown as Promise<ShortsAnalysisResult>;

export const analyzeChannel = (url: string): Promise<ChannelAnalysisResult> =>
  api.post('/analyze/channel', { url }) as unknown as Promise<ChannelAnalysisResult>;

// Phase 1 Generation endpoints
export const generateHooks = (data: {
  topic: string;
  platform?: string;
  contentType?: string;
  audience?: string;
}): Promise<HookGenerationResult> =>
  api.post('/generate/hooks', data) as unknown as Promise<HookGenerationResult>;

export const generateIdeas = (data: {
  niche: string;
  audience?: string;
  goal?: string;
}): Promise<IdeaGenerationResult> =>
  api.post('/generate/ideas', data) as unknown as Promise<IdeaGenerationResult>;

export const generateRoadmap = (data: {
  niche: string;
  currentStage?: string;
  goal: string;
  postingFrequency?: string;
}): Promise<RoadmapResult> =>
  api.post('/generate/roadmap', data) as unknown as Promise<RoadmapResult>;

// Phase 2 Analysis endpoints
export const analyzeReel = (data: {
  url: string;
  caption?: string;
  audio?: string;
}): Promise<ReelAnalysisResult> =>
  api.post('/analyze/reel', data) as unknown as Promise<ReelAnalysisResult>;

export const analyzeTikTok = (data: {
  url: string;
  sound?: string;
  description?: string;
}): Promise<TikTokAnalysisResult> =>
  api.post('/analyze/tiktok', data) as unknown as Promise<TikTokAnalysisResult>;

export const analyzeThumbnail = (data: {
  title: string;
  imageUrl?: string;
  niche?: string;
}): Promise<ThumbnailAnalysisResult> =>
  api.post('/analyze/thumbnail', data) as unknown as Promise<ThumbnailAnalysisResult>;

export const analyzeCompetitor = (data: {
  channelA: string;
  channelB: string;
  niche?: string;
}): Promise<CompetitorAnalysisResult> =>
  api.post('/analyze/competitor', data) as unknown as Promise<CompetitorAnalysisResult>;

// Phase 2 Generation endpoints
export const discoverTrends = (data: {
  niche: string;
  platform?: string;
  timeframe?: string;
}): Promise<TrendDiscoveryResult> =>
  api.post('/generate/trends', data) as unknown as Promise<TrendDiscoveryResult>;

export const generateCalendar = (data: {
  niche: string;
  frequency?: string;
  formats?: string;
  audience?: string;
}): Promise<ContentCalendarResult> =>
  api.post('/generate/calendar', data) as unknown as Promise<ContentCalendarResult>;

// Phase 3 Endpoints
export const askAssistant = (data: {
  message: string;
  history?: ChatMessage[];
  creatorContext?: CreatorContext;
}): Promise<AssistantChatResult> =>
  api.post('/assistant/chat', data) as unknown as Promise<AssistantChatResult>;

export const predictTrend = (data: {
  topic: string;
  niche?: string;
  platform?: string;
  timeframe?: string;
}): Promise<TrendPredictionResult> =>
  api.post('/predict/trend', data) as unknown as Promise<TrendPredictionResult>;

export const getViralDatabase = (params?: {
  niche?: string;
  platform?: string;
  search?: string;
  sort?: string;
}): Promise<ViralDatabaseResult> =>
  api.get('/database/viral', { params }) as unknown as Promise<ViralDatabaseResult>;

export const getDatabaseCategories = (): Promise<DatabaseCategoriesResult> =>
  api.get('/database/categories') as unknown as Promise<DatabaseCategoriesResult>;

export const benchmarkCreator = (data: {
  niche: string;
  subscribers: number;
  avgViews: number;
  uploadFrequency?: string;
  engagementRate?: number;
  currentStage?: string;
}): Promise<CreatorBenchmarkResult> =>
  api.post('/benchmark/creator', data) as unknown as Promise<CreatorBenchmarkResult>;

export const auditChannel = (data: {
  channelUrl?: string;
  niche: string;
  subscribers?: number;
  avgWatchTimePercent?: number;
  ctrAverage?: number;
  primaryFormat?: string;
}): Promise<AdvancedAnalyticsResult> =>
  api.post('/analytics/audit', data) as unknown as Promise<AdvancedAnalyticsResult>;

export default api;
