import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Untrustworthy Figures - WatchDog',
  description: 'View credibility scores and analysis of potentially untrustworthy public figures.',
};

export default function UntrustworthyPage() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const celebrities = [
    {
      name: "John Doe",
      credibilityScore: "32%",
      description: "Frequently shares unverified health claims and conspiracy theories. Multiple fact-checking organizations have debunked their statements.",
      category: "Health Misinformation"
    },
    {
      name: "Jane Smith",
      credibilityScore: "45%",
      description: "Known for spreading misleading financial advice and promoting questionable investment schemes without proper disclaimers.",
      category: "Financial Scams"
    },
    {
      name: "Mike Johnson",
      credibilityScore: "28%",
      description: "Regular publisher of manipulated images and false news stories. Has been flagged multiple times for content violations.",
      category: "Fake News"
    },
    {
      name: "Sarah Williams",
      credibilityScore: "39%",
      description: "Often shares pseudoscientific claims and promotes unproven medical treatments to their large follower base.",
      category: "Pseudoscience"
    },
    {
      name: "David Brown",
      credibilityScore: "41%",
      description: "Known for spreading misinformation about current events and sharing doctored videos without verification.",
      category: "Digital Manipulation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Untrustworthy Public Figures
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI analysis has identified these public figures as having consistently low credibility scores based on their social media activity.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Analysis
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {celebrities.map((celebrity, index) => (
                      <tr 
                        key={celebrity.name}
                        className={`
                          transition-colors duration-200 
                          ${hoveredRow === index ? 'bg-purple-50' : 'bg-white'}
                        `}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{celebrity.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100">
                              <span className="text-red-600 font-bold">{celebrity.credibilityScore}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            {celebrity.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {celebrity.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <h2 className="text-lg font-semibold text-purple-800 mb-2">How We Calculate Scores</h2>
              <p className="text-sm text-gray-600">
                Our credibility scores are calculated using advanced AI algorithms that analyze multiple factors including:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Content authenticity verification</li>
                <li>• Historical fact-checking records</li>
                <li>• Cross-referenced information accuracy</li>
                <li>• Pattern analysis of misleading content</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Scores are updated regularly and should be used as part of a comprehensive approach to evaluating information sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
