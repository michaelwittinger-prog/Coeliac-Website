import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import { HeartPulse, TrendingUp, Clock, Info } from 'lucide-react'

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

  const timeline = [
    { period: 'Days - Weeks', title: 'Symptom Improvement', description: 'Many people notice digestive symptoms begin to improve. Energy levels may start to increase.' },
    { period: '3-6 Months', title: 'Antibody Levels Drop', description: 'Blood antibody levels typically begin to decrease. Most children show significant intestinal healing.' },
    { period: '1-2 Years', title: 'Intestinal Healing', description: 'Most adults achieve complete or near-complete healing of the intestinal lining with strict diet adherence.' },
    { period: '2+ Years', title: 'Complete Recovery', description: 'Some adults may take longer to achieve complete healing. Ongoing monitoring is important.' }
  ]

  const factors = {
    promotes: [
      '100% gluten-free diet adherence',
      'Young age at diagnosis',
      'Nutritional supplementation',
      'Regular follow-up care'
    ],
    delays: [
      'Accidental gluten exposure',
      'Severe initial damage (Marsh 3c)',
      'Older age at diagnosis',
      'Other autoimmune conditions'
    ]
  }

  return (
    <div className="bg-slate-50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <HeartPulse className="w-4 h-4" />
              <span>Recovery Process</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Healing Process
            </h1>
            <p className="text-lg text-slate-600">Understanding recovery timelines and progress</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                Once you start a strict gluten-free diet, the small intestine begins to heal. Most people notice symptom improvement within days to weeks, but complete intestinal healing can take months to years. Children typically heal faster than adults. Follow-up testing helps monitor recovery. Continued symptoms may indicate inadvertent gluten exposure or other conditions.
              </p>
            </InOneMinute>
          </div>

          {/* Healing Timeline */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">The Healing Timeline</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Healing happens in stages, and the timeline varies significantly between individuals:
            </p>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-6 pb-6 border-l-2 border-slate-200 last:border-transparent last:pb-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full"></div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded">{item.period}</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Factors Affecting Healing */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Factors Affecting Healing</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Promotes Healing</span>
                </h3>
                <ul className="space-y-3">
                  {factors.promotes.map((factor, index) => (
                    <li key={index} className="flex items-start space-x-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Delays Healing</span>
                </h3>
                <ul className="space-y-3">
                  {factors.delays.map((factor, index) => (
                    <li key={index} className="flex items-start space-x-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Monitoring Progress */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <Info className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Monitoring Your Progress</h2>
                <p className="text-slate-700 mb-4">
                  Regular follow-up with your healthcare provider is essential. Typical monitoring includes:
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm"><strong>Blood tests</strong> to check antibody levels (usually at 3-6 months, then annually)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm"><strong>Nutritional screening</strong> for deficiencies (iron, B12, vitamin D, calcium)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm"><strong>Follow-up biopsy</strong> may be recommended if symptoms persist or to confirm healing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm"><strong>Bone density testing</strong> for adults diagnosed with celiac disease</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Reading Section */}
          <RelatedReading links={relatedLinks} />
        </div>
      </div>
    </div>
  )
}