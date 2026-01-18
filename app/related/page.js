import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'Related Conditions - Celiac Information Hub',
  description: 'Learn about conditions associated with Celiac disease including Type 1 diabetes, thyroid disorders, and other autoimmune conditions.',
}

export default function RelatedPage() {
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
          Related Conditions
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              Celiac disease is often associated with other autoimmune conditions. People with celiac disease have a higher risk of developing Type 1 diabetes, autoimmune thyroid disease, autoimmune liver disease, and other conditions. First-degree relatives of people with celiac disease should be screened. If you have celiac disease and experience new symptoms, discuss screening for related conditions with your healthcare provider.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Common Associated Conditions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Type 1 Diabetes</h3>
                <p className="text-purple-700 mb-2">
                  5-10% of people with Type 1 diabetes also have celiac disease. Regular screening is recommended for diabetic patients.
                </p>
                <p className="text-sm text-purple-600 italic">
                  Screening recommended: At diagnosis and periodically thereafter
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Autoimmune Thyroid Disease</h3>
                <p className="text-purple-700 mb-2">
                  Hashimoto's thyroiditis and Graves' disease occur more frequently in people with celiac disease.
                </p>
                <p className="text-sm text-purple-600 italic">
                  Screening recommended: If symptoms of thyroid dysfunction develop
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Dermatitis Herpetiformis</h3>
                <p className="text-purple-700 mb-2">
                  A skin manifestation of celiac disease characterized by intensely itchy, blistering rash. Responds to a gluten-free diet.
                </p>
                <p className="text-sm text-purple-600 italic">
                  Consider: Skin biopsy for diagnosis
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Autoimmune Liver Disease</h3>
                <p className="text-purple-700 mb-2">
                  Includes autoimmune hepatitis and primary biliary cholangitis. Elevated liver enzymes may be the only sign.
                </p>
                <p className="text-sm text-purple-600 italic">
                  Monitoring: Regular liver function tests
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Addison's Disease</h3>
                <p className="text-purple-700 mb-2">
                  Autoimmune adrenal insufficiency is rare but more common in people with celiac disease.
                </p>
                <p className="text-sm text-purple-600 italic">
                  Symptoms to watch: Fatigue, low blood pressure, skin darkening
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Chromosomal Conditions</h2>
            <p className="text-purple-700 mb-4">
              Certain genetic conditions are associated with higher rates of celiac disease:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Down Syndrome</h3>
                <p className="text-purple-700 text-sm">12-16% of individuals with Down syndrome have celiac disease. Regular screening is recommended.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Turner Syndrome</h3>
                <p className="text-purple-700 text-sm">4-8% of individuals with Turner syndrome have celiac disease. Screening should be performed.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Family Screening</h2>
            <p className="text-purple-700 mb-4">
              First-degree relatives (parents, siblings, children) of people with celiac disease have a 10-15% chance of also having the condition.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">Screening Recommendations:</h3>
              <ul className="space-y-2 text-purple-700">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>All first-degree relatives should be tested, even without symptoms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Testing should include celiac antibody blood tests</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Consider genetic testing (HLA-DQ2/DQ8) to help assess risk</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Repeat testing every 2-3 years if initial tests are negative</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Other Conditions to Monitor</h2>
            <div className="space-y-3 text-purple-700">
              <div className="flex items-start space-x-3">
                <span className="text-purple-500 mt-1">•</span>
                <div>
                  <span className="font-semibold text-purple-900">Osteoporosis:</span>
                  <span className="ml-1">Reduced bone density is common due to malabsorption. Regular bone density testing recommended.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-500 mt-1">•</span>
                <div>
                  <span className="font-semibold text-purple-900">Lactose Intolerance:</span>
                  <span className="ml-1">Temporary lactose intolerance can occur due to intestinal damage but often improves with healing.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-500 mt-1">•</span>
                <div>
                  <span className="font-semibold text-purple-900">Microscopic Colitis:</span>
                  <span className="ml-1">Chronic diarrhea may persist in some patients even on a gluten-free diet.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-500 mt-1">•</span>
                <div>
                  <span className="font-semibold text-purple-900">Neurological Issues:</span>
                  <span className="ml-1">Some patients experience peripheral neuropathy, ataxia, or other neurological symptoms.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Important Note</span>
            </h3>
            <p className="text-blue-800 text-sm">
              If you have celiac disease and develop new symptoms or have a family history of autoimmune conditions, discuss appropriate screening with your healthcare provider. Early detection and management of related conditions can prevent complications.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}