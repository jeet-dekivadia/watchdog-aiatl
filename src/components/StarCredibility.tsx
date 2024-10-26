'use client'

import { useState } from 'react';
import { Star, User, Activity } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import type { CredibilityResult } from '@/types';

export default function StarCredibility() {
  const [handle, setHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CredibilityResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/check-credibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle }),
      });
      
      const data = await response.json();
      setResult(data);
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
            htmlFor="handle" 
            className="block text-sm font-medium text-brand-purple-700"
          >
            Enter star's social media handle
          </label>
          <div className="mt-1 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="handle"
              className="block w-full pl-10 rounded-lg border-brand-purple-200 focus:border-brand-purple-500 focus:ring-brand-purple-500"
              placeholder="@username"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading}
          className="w-full"
        >
          <Star className="mr-2 h-4 w-4" />
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
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Activity className="h-5 w-5 text-brand-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Account Activity</p>
                  <p className="text-sm text-gray-600">
                    {result.recentPosts} posts in the last 30 days
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-brand-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Verification Status</p>
                  <p className="text-sm text-gray-600">
                    {result.verifiedStatus ? 'Verified Account' : 'Not Verified'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-brand-purple-700 mb-2">Analysis Summary:</h4>
                <p className="text-gray-700">{result.analysis}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
