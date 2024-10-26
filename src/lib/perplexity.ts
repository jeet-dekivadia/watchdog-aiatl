interface PerplexityResponse {
  score: number;
  explanation: string;
  sources?: string[];
}

export async function analyzeContent(content: string): Promise<PerplexityResponse> {
  // Replace with actual API integration
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze content');
  }

  return response.json();
}
