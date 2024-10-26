interface PerplexityResponse {
  score: number;
  explanation: string;
  sources?: string[];
}

export async function analyzeContent(content: string): Promise<PerplexityResponse> {
  const API_KEY = "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";
  const ENDPOINT = "https://api.perplexity.ai/chat/completions";
  const MODEL_NAME = "llama-3.1-sonar-small-128k-online";

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [{ role: "user", content }],
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
    explanation: botResponse,
    sources: extractSources(botResponse),
  };
}

function extractScore(response: string): number {
  const scoreMatch = response.match(/(\d+)%/);
  return scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[1]))) : 50;
}

function extractSources(response: string): string[] {
  const sourcesMatch = response.match(/Sources?:?\s*\[(.*?)\]/is);
  return sourcesMatch ? sourcesMatch[1].split(',').map(s => s.trim()).filter(Boolean) : [];
}

export async function analyzePerson(person: string): Promise<string> {
  const API_KEY = "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";
  const ENDPOINT = "https://api.perplexity.ai/chat/completions";
  const MODEL_NAME = "llama-3.1-sonar-small-128k-online";

  const prompt = `analyze the credibility of the following person: ${person} give a credibility rating for this individual as a percentage. The output should only be the text in the bracket: (credibility rating: xx%) where xx is the credibility rating. Judge this rating based off the person's recent social media history`;

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [{ role: "user", content: prompt }],
      return_citations: false,
      return_images: false,
      return_related_questions: false,
      stream: false
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze person');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
