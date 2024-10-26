'use client'

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
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="content" 
            className="block text-sm font-medium text-brand-purple-700"
          >
            Enter social media content to verify
          </label>
          <textarea
            id="content"
            rows={4}
            className="mt-1 block w-full rounded-lg border-brand-purple-200 shadow-sm focus:border-brand-purple-500 focus:ring-brand-purple-500"
            placeholder="Paste the content you want to verify..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading}
          className="w-full"
        >
          <Search className="mr-2 h-4 w-4" />
          Verify Content
        </Button>
      </form>

      {result && (
        <Card className="mt-8 animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-brand-purple-900">
                Analysis Result
              </CardTitle>
              <Badge
                variant={result.truthScore > 70 ? "success" : "warning"}
                className="ml-2"
              >
                {result.truthScore}% Truth Score
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3">
              {result.truthScore > 70 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              )}
              <p className="text-gray-700">{result.summary}</p>
            </div>
            {result.sources && result.sources.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-brand-purple-700 mb-2">Sources:</h4>
                <ul className="space-y-2">
                  {result.sources.map((source, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {source}
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
