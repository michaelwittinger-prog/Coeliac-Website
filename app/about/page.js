import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'About - Celiac Information Hub',
  description: 'Learn about the Celiac Information Hub, our mission to provide evidence-based information about Celiac disease, and our commitment to supporting the community.',
}

export default function AboutPage() {
  const relatedLinks = [
    { href: '/understanding', title: 'Understanding Celiac Disease' },
    { href: '/diagnosis-marsh', title: 'Diagnosis & Marsh Classification' },
    { href: '/research', title: 'Latest Research' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          About Celiac Information Hub
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              The Celiac Information Hub is dedicated to providing accurate, evidence-based information about celiac disease to patients, families, and healthcare providers. Our mission is to empower individuals with the knowledge they need to understand, diagnose, and manage celiac disease effectively. All information is based on current medical research and guidelines from leading celiac disease organizations.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Mission</h2>
            <p className="text-purple-700 mb-4">
              We believe that accurate information is the foundation of effective health management. Our mission is to:
            </p>
            <ul className="space-y-3 text-purple-700">
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Educate:</strong> Provide clear, accessible information about celiac disease, its diagnosis, and management</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Empower:</strong> Help patients and families make informed decisions about their health</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Support:</strong> Offer practical guidance for living well with celiac disease</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Update:</strong> Keep our community informed about the latest research and developments</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Approach</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Evidence-Based</h3>
                  <p className="text-purple-700">All information is grounded in current medical research and guidelines from reputable celiac disease organizations and research institutions.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Clear & Accessible</h3>
                  <p className="text-purple-700">We translate complex medical information into language that patients and families can understand without sacrificing accuracy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Regularly Updated</h3>
                  <p className="text-purple-700">Celiac disease research is constantly evolving. We regularly review and update our content to reflect the latest scientific understanding.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Patient-Centered</h3>
                  <p className="text-purple-700">We understand the challenges of living with celiac disease and strive to address the real-world concerns of patients and families.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Content Coverage</h2>
            <p className="text-purple-700 mb-4">
              Our comprehensive resource covers all aspects of celiac disease:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">📚 Understanding</h3>
                <p className="text-purple-700 text-sm">What celiac disease is, how it affects the body, symptoms, and who is at risk</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🔬 Diagnosis</h3>
                <p className="text-purple-700 text-sm">Testing procedures, Marsh classification system, and interpreting results</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">💚 Healing</h3>
                <p className="text-purple-700 text-sm">Recovery timeline, monitoring progress, and factors affecting healing</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">👨‍👩‍👧‍👦 Parents</h3>
                <p className="text-purple-700 text-sm">Managing celiac disease in children, school support, and family adaptation</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🔗 Related Conditions</h3>
                <p className="text-purple-700 text-sm">Associated autoimmune conditions and screening recommendations</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🥗 Living</h3>
                <p className="text-purple-700 text-sm">Gluten-free diet, dining out, travel, and maintaining quality of life</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🧬 Research</h3>
                <p className="text-purple-700 text-sm">Latest scientific developments and emerging treatment options</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">ℹ️ About</h3>
                <p className="text-purple-700 text-sm">Our mission, approach, and commitment to the celiac community</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Important Resources</h2>
            <p className="text-purple-700 mb-4">
              We recommend these trusted organizations for additional support and information:
            </p>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Celiac Disease Foundation</strong> - Patient advocacy and research support</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Beyond Celiac</strong> - Research acceleration and patient support</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Gluten Intolerance Group</strong> - Education and certification programs</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>North American Society for the Study of Celiac Disease</strong> - Healthcare provider education</span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Stay Connected</span>
            </h3>
            <p className="text-purple-700 text-sm">
              This website is a living resource that grows and improves based on the needs of our community. We're committed to providing you with the most current, accurate, and helpful information about celiac disease.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}