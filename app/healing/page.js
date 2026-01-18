import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'Healing Process - Celiac Information Hub',
  description: 'Learn about the intestinal healing process after starting a gluten-free diet, timelines for recovery, and monitoring progress.',
}

export default function HealingPage() {
  const relatedLinks = [
    { href: '/living', title: 'Living with Celiac Disease' },
    { href: '/diagnosis-marsh', title: 'Diagnosis & Marsh Classification' },
    { href: '/understanding', title: 'Understanding Celiac Disease' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          Healing Process
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              Once you start a strict gluten-free diet, the small intestine begins to heal. Most people notice symptom improvement within days to weeks, but complete intestinal healing can take months to years. Children typically heal faster than adults. Follow-up testing helps monitor recovery. Continued symptoms may indicate inadvertent gluten exposure or other conditions.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">The Healing Timeline</h2>
            <p className="text-purple-700 mb-6">
              Healing happens in stages, and the timeline varies significantly between individuals:
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700 pt-1">Days - Weeks</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-2">Symptom Improvement</h3>
                  <p className="text-purple-700">Many people notice digestive symptoms begin to improve. Energy levels may start to increase.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700 pt-1">3-6 Months</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-2">Antibody Levels Drop</h3>
                  <p className="text-purple-700">Blood antibody levels typically begin to decrease. Most children show significant intestinal healing.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700 pt-1">1-2 Years</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-2">Intestinal Healing</h3>
                  <p className="text-purple-700">Most adults achieve complete or near-complete healing of the intestinal lining with strict diet adherence.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700 pt-1">2+ Years</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-2">Complete Recovery</h3>
                  <p className="text-purple-700">Some adults may take longer to achieve complete healing. Ongoing monitoring is important.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Factors Affecting Healing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Promotes Healing</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>100% gluten-free diet adherence</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Young age at diagnosis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Nutritional supplementation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Regular follow-up care</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Delays Healing</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Accidental gluten exposure</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Severe initial damage (Marsh 3c)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Older age at diagnosis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Other autoimmune conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Monitoring Your Progress</h2>
            <p className="text-purple-700 mb-4">
              Regular follow-up with your healthcare provider is essential. Typical monitoring includes:
            </p>
            <ul className="space-y-3 text-purple-700">
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Blood tests</strong> to check antibody levels (usually at 3-6 months, then annually)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Nutritional screening</strong> for deficiencies (iron, B12, vitamin D, calcium)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Follow-up biopsy</strong> may be recommended if symptoms persist or to confirm healing</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Bone density testing</strong> for adults diagnosed with celiac disease</span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>When to Contact Your Doctor</span>
            </h3>
            <p className="text-purple-700 text-sm">
              If symptoms persist or worsen after 3-6 months on a strict gluten-free diet, contact your healthcare provider. This may indicate inadvertent gluten exposure, another condition, or refractory celiac disease.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}