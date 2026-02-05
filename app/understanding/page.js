import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import { Dna, Activity, Users2, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Understanding Coeliac Disease - Coeliac Information Hub',
  description: 'Learn about Coeliac disease (Celiac disease), an autoimmune disorder triggered by gluten. Understand the basics, symptoms, and how it affects the body.',
  keywords: 'coeliac disease, celiac disease, autoimmune disorder, gluten intolerance, symptoms, villi damage',
}

export default function UnderstandingPage() {
  const relatedLinks = [
    { href: '/diagnosis-marsh', title: 'Diagnosis & Marsh Classification' },
    { href: '/healing', title: 'Healing Process and Timeline' },
    { href: '/living', title: 'Living with Coeliac Disease' },
  ]

  const symptoms = {
    digestive: [
      'Chronic diarrhea or constipation',
      'Abdominal pain and bloating',
      'Gas and nausea',
      'Vomiting'
    ],
    other: [
      'Fatigue and weakness',
      'Weight loss',
      'Anemia',
      'Bone or joint pain'
    ]
  }

  return (
    <div className="bg-slate-50">
      {/* Geometric Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Dna className="w-4 h-4" />
              <span>Fundamentals</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Understanding Coeliac Disease
            </h1>
            <p className="text-lg text-slate-600">Learn the fundamentals of this autoimmune condition</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                <strong>Coeliac disease</strong> is an autoimmune disorder where eating gluten causes the immune system to attack the small intestine. This damages the villi—tiny, finger-like projections that line the intestine and absorb nutrients. Over time, this damage leads to malabsorption of essential nutrients. The only treatment is a strict, lifelong gluten-free diet.
              </p>
            </InOneMinute>
          </div>

          {/* Main Content */}
          <div className="space-y-8 mb-12">
            {/* What is Coeliac Disease */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">What is Coeliac Disease?</h2>
                </div>
              </div>
              <div className="space-y-4 text-slate-600">
                <p>
                  Coeliac disease is a chronic autoimmune disorder that occurs in genetically predisposed individuals. When people with celiac disease eat gluten—a protein found in wheat, barley, and rye—their immune system responds by damaging the lining of the small intestine.
                </p>
                <p>
                  This damage reduces the intestine's ability to absorb nutrients, potentially leading to malnutrition and other serious health complications if left untreated.
                </p>
              </div>
            </div>

            {/* Common Symptoms */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Common Symptoms</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Digestive Symptoms</span>
                  </h3>
                  <ul className="space-y-3">
                    {symptoms.digestive.map((symptom, index) => (
                      <li key={index} className="flex items-start space-x-3 text-slate-600">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Other Symptoms</span>
                  </h3>
                  <ul className="space-y-3">
                    {symptoms.other.map((symptom, index) => (
                      <li key={index} className="flex items-start space-x-3 text-slate-600">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Who Gets Coeliac Disease */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Users2 className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">Who Gets Coeliac Disease?</h2>
                  <div className="space-y-3 text-slate-700">
                    <p>
                      Coeliac disease affects approximately <strong>1% of the population worldwide</strong>. It can develop at any age and occurs in people who have a genetic predisposition. Having a first-degree relative with celiac disease increases your risk significantly.
                    </p>
                    <p>
                      The disease is more common in people with other autoimmune disorders, such as Type 1 diabetes, autoimmune thyroid disease, and Down syndrome.
                    </p>
                  </div>
                </div>
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