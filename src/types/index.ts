export interface AnalysisResult {
  truthScore: number;
  summary: string;
  sources?: string[];
}

export interface CredibilityResult {
  score: number;
  analysis: string;
  recentPosts: number;
  verifiedStatus: boolean;
}
