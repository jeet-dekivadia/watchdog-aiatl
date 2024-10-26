import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Watchdog AI ATL',
  description: 'Learn about our mission to promote truth and authenticity on social media.',
}

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-brand-purple-900 mb-6">
            About Watchdog AI ATL
          </h1>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Watchdog AI ATL was founded with a simple mission: to promote truth and authenticity 
              in social media through the power of artificial intelligence.
            </p>

            <h2 className="text-2xl font-semibold text-brand-purple-800 mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              In today's digital age, misinformation spreads faster than ever. We're here to provide 
              tools that help people make informed decisions about the content they consume and share.
            </p>

            <h2 className="text-2xl font-semibold text-brand-purple-800 mt-8 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 mb-6">
              We use advanced AI models to analyze social media content and user profiles. Our 
              technology examines multiple factors including content authenticity, account history, 
              and cross-referenced information to provide comprehensive credibility assessments.
            </p>

            <h2 className="text-2xl font-semibold text-brand-purple-800 mt-8 mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 mb-6">
              We're a team of AI researchers, software engineers, and social media experts based 
              in Atlanta, Georgia. We're passionate about using technology to make social media 
              a more trustworthy space.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}