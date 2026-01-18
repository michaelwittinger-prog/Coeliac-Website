import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'Understanding Celiac Disease - Celiac Information Hub',
  description: 'Learn about Celiac disease, an autoimmune disorder triggered by gluten. Understand the basics, symptoms, and how it affects the body.',
}

export default function UnderstandingPage() {
  const relatedLinks = [
    { href: '/diagnosis-marsh', title: 'Diagnosis & Marsh Classification' },
    { href: '/healing', title: 'Healing Process and Timeline' },
    { href: '/living', title: 'Living with Celiac Disease' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          Understanding Celiac Disease
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              Celiac disease is an autoimmune disorder where eating gluten causes the immune system to attack the small intestine. This damages the villi—tiny, finger-like projections that line the intestine and absorb nutrients. Over time, this damage leads to malabsorption of essential nutrients. The only treatment is a strict, lifelong gluten-free diet.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">What is Celiac Disease?</h2>
            <p className="text-purple-700 mb-4">
              Celiac disease is a chronic autoimmune disorder that occurs in genetically predisposed individuals. When people with celiac disease eat gluten—a protein found in wheat, barley, and rye—their immune system responds by damaging the lining of the small intestine.
            </p>
            <p className="text-purple-700">
              This damage reduces the intestine's ability to absorb nutrients, potentially leading to malnutrition and other serious health complications if left untreated.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Common Symptoms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Digestive Symptoms</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Chronic diarrhea or constipation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Abdominal pain and bloating</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Gas and nausea</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Vomiting</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Other Symptoms</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Fatigue and weakness</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Weight loss</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Anemia</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Bone or joint pain</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Who Gets Celiac Disease?</h2>
            <p className="text-purple-700 mb-4">
              Celiac disease affects approximately 1% of the population worldwide. It can develop at any age and occurs in people who have a genetic predisposition. Having a first-degree relative with celiac disease increases your risk significantly.
            </p>
            <p className="text-purple-700">
              The disease is more common in people with other autoimmune disorders, such as Type 1 diabetes, autoimmune thyroid disease, and Down syndrome.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}