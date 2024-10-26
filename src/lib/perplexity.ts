interface PerplexityResponse {
  score: number;
  explanation: string;
  sources?: string[];
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
