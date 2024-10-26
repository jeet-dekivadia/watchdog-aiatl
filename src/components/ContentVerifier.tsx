import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { analyzeContent } from '@/lib/perplexity';

interface AnalysisResult {
  truthScore: number;
  summary: string;
  sources?: string[];
}

export default function ContentVerifier() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const analysis = await analyzeContent(content);
      setResult({
        truthScore: analysis.score,
        summary: analysis.explanation,
        sources: analysis.sources,
      });
    } catch (error) {
      setError('Failed to analyze content');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Enter social media content to verify
          </label>
          <textarea
            id="content"
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Paste the content you want to verify..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button 
          type="submit" 
          disabled={isLoading || !content.trim()}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <span>Analyzing...</span> : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Verify Content
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Analysis Result</h2>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              result.truthScore > 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {result.truthScore}% Truth Score
            </span>
          </div>

          <div className="flex items-start space-x-3">
            {result.truthScore > 70 ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            )}
            <div>
              <p className="text-gray-700">{result.summary}</p>
              {result.sources && result.sources.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Sources:</h4>
                  <ul className="space-y-2">
                    {result.sources.map((source, index) => (
                      <li key={index} className="text-sm text-gray-600">• {source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
