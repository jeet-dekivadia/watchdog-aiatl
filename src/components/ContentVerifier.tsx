'use client';

import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { analyzeContent } from '@/lib/perplexity';
import type { AnalysisResult } from '@/types';

export default function ContentVerifier() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const analysis = await analyzeContent(content);
      setResult({
        truthScore: analysis.score,
        summary: analysis.explanation,
        sources: analysis.sources,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 rounded-2xl p-6 shadow-2xl transition-all duration-300
                   transform hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:-translate-y-2"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white">Content Verification</h2>
          <p className="text-gray-400 text-sm">Paste your content below to verify its authenticity</p>
        </div>

        <div>
          <textarea
            id="content"
            rows={5}
            className="mt-3 w-full rounded-xl border-none bg-gray-800 text-white shadow-inner placeholder-gray-500 px-4 py-3
                       focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Paste the content you want to verify..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white
                     font-semibold py-3 px-4 rounded-xl shadow-lg transform transition-transform duration-200 hover:-translate-y-1"
        >
          <Search className="mr-2 h-4 w-4" />
          Verify Content
        </Button>
      </form>

      {result && (
        <Card className="w-full mt-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-indigo-500 rounded-xl shadow-lg p-6
                         transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-indigo-400">
                Analysis Result
              </CardTitle>
              <Badge
                variant={result.truthScore > 70 ? "success" : "warning"}
                className={`ml-2 py-1 px-3 rounded-full ${result.truthScore > 70 ? "bg-green-600" : "bg-yellow-500"} text-white`}
              >
                {result.truthScore}% Truth Score
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3 mt-2">
              {result.truthScore > 70 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              )}
              <p className="text-gray-300">{result.summary}</p>
            </div>
            {result.sources && result.sources.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-indigo-400 mb-2">Sources:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  {result.sources.map((source, index) => (
                    <li key={index} className="text-sm text-gray-400">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
