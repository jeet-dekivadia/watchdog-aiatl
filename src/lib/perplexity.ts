interface PerplexityResponse {
  score: number;
  explanation: string;
  sources?: string[];
}

export async function analyzeCredibility(name: string): Promise<StarCredibility> {
  const API_KEY = "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";
  const ENDPOINT = "https://api.perplexity.ai/chat/completions";
  const MODEL_NAME = "llama-3.1-sonar-small-128k-online";

  const prompt = `Please analyze the last 10 social media posts of ${name} and evaluate their credibility.
Consider factors like:
- Accuracy of their statements
- Consistency of their messaging
- Verification of their claims
- Professional conduct
- Engagement with followers
- Quality of content

Provide your response in this exact format:
SCORE: [credibility score between 0-100]
ANALYSIS: [detailed explanation of the credibility assessment]
VERIFIED: [true/false indicating if the account is verified]`;

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [{ role: "user", content: prompt }],
      stream: false
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze credibility');
  }

  const data = await response.json();
  const botResponse = data.choices[0].message.content;

  // Extract score
  const scoreMatch = botResponse.match(/SCORE:\s*(\d+)/i);
  const score = scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[1]))) : 50;

  // Extract analysis
  const analysisMatch = botResponse.match(/ANALYSIS:\s*([\s\S]*?)(?=VERIFIED:|$)/i);
  const analysis = analysisMatch ? analysisMatch[1].trim() : "No analysis provided";

  // Extract verified status
  const verifiedMatch = botResponse.match(/VERIFIED:\s*(true|false)/i);
  const verifiedStatus = verifiedMatch ? verifiedMatch[1].toLowerCase() === 'true' : false;

  return {
    score,
    analysis,
    recentPosts: 10,
    verifiedStatus
  };
}

export async function analyzeContent(content: string): Promise<PerplexityResponse> {
  const API_KEY = "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";
  const ENDPOINT = "https://api.perplexity.ai/chat/completions";
  const MODEL_NAME = "llama-3.1-sonar-small-128k-online";

  const prompt = `Please analyze the following social media post for truthfulness and accuracy. 
Rate it from 0-100, where 100 means completely true and verified, and 0 means completely false.
Provide your response in this exact format:
SCORE: [your score]
ANALYSIS: [your detailed analysis]
SOURCES: [list any relevant sources, if available]

Content to analyze: "${content}"`;

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [{ role: "user", content: prompt }],
      return_citations: true,
      return_images: false,
      return_related_questions: false,
      stream: false
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze content');
  }

  const data = await response.json();
  const botResponse = data.choices[0].message.content;

  return {
    score: extractScore(botResponse),
    explanation: extractExplanation(botResponse),
    sources: extractSources(botResponse),
  };
}

function extractScore(response: string): number {
  const scoreMatch = response.match(/SCORE:\s*(\d+)/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
  return Math.min(100, Math.max(0, score));
}

function extractExplanation(response: string): string {
  const analysisMatch = response.match(/ANALYSIS:\s*([\s\S]*?)(?=SOURCES:|$)/i);
  return analysisMatch ? analysisMatch[1].trim() : response.trim();
}

function extractSources(response: string): string[] {
  const sourcesMatch = response.match(/SOURCES:\s*([\s\S]*?)$/i);
  if (!sourcesMatch) return [];
  
  return sourcesMatch[1]
    .split('\n')
    .map(s => s.trim())
    .filter(s => s && s !== '-');
}
