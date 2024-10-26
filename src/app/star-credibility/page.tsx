import { Metadata } from 'next'
import StarCredibility from '@/components/StarCredibility'

export const metadata: Metadata = {
  title: 'Star Credibility Check - Watchdog AI ATL',
  description: 'Analyze the credibility of social media influencers and celebrities.',
}

export default function StarCredibilityPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-brand-purple-900">
            Star Credibility Check
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Analyze the authenticity and credibility of social media influencers
          </p>
        </div>
        <StarCredibility />
      </div>
    </div>
  )
}
