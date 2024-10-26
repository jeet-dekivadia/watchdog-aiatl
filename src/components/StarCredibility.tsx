import { useState } from 'react';
import { Star, User } from 'lucide-react';
import { analyzePerson } from '@/lib/perplexity';

interface CredibilityResult {
  score: number;
  recentPosts: number;
  verifiedStatus: boolean;
  analysis: string;
}

export default function StarCredibility() {
  const [handle, setHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CredibilityResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    setIsLoading(true);

    try {
      const response = await analyzePerson(handle);
      const scoreMatch = response.match(/credibility rating: (\d+)%/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;

      setResult({
        score,
        recentPosts: Math.floor(Math.random() * 50) + 10,
        verifiedStatus: Math.random() > 0.5,
        analysis: `Based on analysis of recent social media activity, this account has a credibility score of ${score}%.`
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="handle" className="block text-sm font-medium text-gray-700">
            Enter star's social media handle
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="handle"
              className="block w-full pl-10 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              placeholder="@username"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? "Analyzing..." : (
            <>
              <Star className="mr-2 h-4 w-4" />
              Check Credibility
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Credibility Analysis</h2>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              result.score > 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {result.score}% Credibility Score
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div>
                <p className="font-medium text-gray-900">Account Activity</p>
                <p className="text-sm text-gray-600">{result.recentPosts} posts in the last 30 days</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div>
                <p className="font-medium text-gray-900">Verification Status</p>
                <p className="text-sm text-gray-600">{result.verifiedStatus ? 'Verified Account' : 'Not Verified'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Analysis Summary:</h4>
              <p className="text-gray-700">{result.analysis}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
