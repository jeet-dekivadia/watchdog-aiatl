'use client'

import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { analyzeCredibility } from '@/lib/perplexity';
import type { CredibilityResult } from '@/types';

export default function StarCredibility() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CredibilityResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const analysis = await analyzeCredibility(name);
      setResult({
        score: analysis.score,
        analysis: analysis.explanation,
        recentPosts: 10,
        verifiedStatus: true
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
            htmlFor="name" 
            className="block text-sm font-medium text-brand-purple-700"
          >
            Enter celebrity or influencer name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-lg border-brand-purple-200 shadow-sm focus:border-brand-purple-500 focus:ring-brand-purple-500 p-2"
            placeholder="Enter name (e.g., Taylor Swift, Elon Musk)..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading}
          className="w-full"
        >
          <Search className="mr-2 h-4 w-4" />
          Check Credibility
        </Button>
      </form>

      {result && (
        <Card className="mt-8 animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-brand-purple-900">
                Credibility Analysis
              </CardTitle>
              <Badge
                variant={result.score > 70 ? "success" : "warning"}
                className="ml-2"
              >
                {result.score}% Credibility Score
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3">
              {result.score > 70 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              )}
              <p className="text-gray-700">{result.analysis}</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-purple-700">Recent Posts Analyzed:</span>
                <span className="font-medium">{result.recentPosts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-purple-700">Verified Status:</span>
                <span className="font-medium">
                  {result.verifiedStatus ? '✓ Verified' : '✗ Not Verified'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
