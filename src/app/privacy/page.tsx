import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Watchdog AI ATL',
  description: 'Our privacy policy and data handling practices.',
}

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-brand-purple-900 mb-6">
            Privacy Policy
          </h1>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Last updated: October 27, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-purple-800 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                We collect information that you provide directly to us when using our services:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Social media content submitted for verification</li>
                <li>Social media handles for credibility checks</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-purple-800 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Provide and improve our services</li>
                <li>Analyze content for verification purposes</li>
                <li>Generate credibility reports</li>
                <li>Improve our AI models and algorithms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-brand-purple-800 mb-4">
                Data Security
              </h2>
              <p className="text-gray-600">
                We take data security seriously and implement appropriate technical and organizational 
                measures to protect your information. All data is encrypted in transit and at rest.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
