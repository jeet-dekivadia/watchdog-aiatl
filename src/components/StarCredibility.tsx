'use client';

import { useState } from 'react';

async function askPerplexity(prompt: string): Promise<string> {
    const response = await fetch('https://api.perplexity.ai/chat/completions', { // Replace with the actual API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`, // Replace with your actual API key
        },
        body: JSON.stringify({ query: prompt }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data from Perplexity API');
    }

    const data = await response.json();
    return data.result; // Adjust based on the actual response structure
}

async function crv1(person: string): Promise<string> {
    const prompt = `analyze the credibility of the following person: ${person} give a credibility rating for this individual as a percentage. The output should only be the text in the bracket: (credibility rating: xx%) where xx is the credibility rating. Judge this rating based off the person's recent social media history.`;

    const response = await askPerplexity(prompt);
    return response;
}

export default function StarCredibility() {
    const [handle, setHandle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null); // Reset result on new submission

        try {
            const response = await crv1(handle);
            const scoreMatch = response.match(/credibility rating: (\d+)%/);
            if (scoreMatch) {
                const score = scoreMatch[0];
                setResult(score);
            } else {
                console.error("Failed to parse credibility score");
            }
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
                    <input
                        type="text"
                        id="handle"
                        className="block w-full pl-2 rounded-lg border-gray-200 focus:border-brand-purple-500 focus:ring-brand-purple-500"
                        placeholder="@username"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-brand-purple-600 text-white font-medium rounded-lg"
                >
                    {isLoading ? 'Checking...' : 'Check Credibility'}
                </button>
            </form>

            {result && (
                <div className="mt-4 text-lg font-semibold text-center text-brand-purple-800">
                    Credibility Result: {result}
                </div>
            )}
        </div>
    );
}
