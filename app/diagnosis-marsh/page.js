import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'Diagnosis & Marsh Classification - Celiac Information Hub',
  description: 'Understand how Celiac disease is diagnosed through blood tests, endoscopy, and the Marsh classification system for intestinal damage.',
}

export default function DiagnosisMarchPage() {
  const relatedLinks = [
    { href: '/understanding', title: 'Understanding Celiac Disease' },
    { href: '/healing', title: 'Healing Process and Timeline' },
    { href: '/research', title: 'Latest Research' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          Diagnosis & Marsh Classification
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              Celiac disease diagnosis involves blood tests for specific antibodies, followed by an endoscopic biopsy of the small intestine. The Marsh classification system (Modified Marsh stages 0-3) categorizes the degree of intestinal damage, from normal villi to complete villous atrophy. Accurate diagnosis requires consuming gluten before testing—never start a gluten-free diet before being tested.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Diagnostic Process</h2>
            <div className="space-y-4 text-purple-700">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Blood Tests</h3>
                  <p>Screening for specific antibodies including tTG-IgA, EMA, and total serum IgA. These tests must be done while on a gluten-containing diet.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Endoscopy & Biopsy</h3>
                  <p>If blood tests are positive, an upper endoscopy with small intestinal biopsy is performed to confirm diagnosis and assess damage.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Genetic Testing</h3>
                  <p>HLA-DQ2 and HLA-DQ8 genetic testing can help rule out celiac disease but cannot confirm it on its own.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">The Marsh Classification System</h2>
            <p className="text-purple-700 mb-6">
              The Marsh classification (modified by Oberhuber) is used to categorize the degree of damage to the small intestine based on biopsy results:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-purple-900 mb-1">Marsh 0 - Normal</h3>
                <p className="text-purple-700">Normal intestinal architecture with no significant changes.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="font-semibold text-purple-900 mb-1">Marsh 1 - Infiltrative</h3>
                <p className="text-purple-700">Increased intraepithelial lymphocytes (IELs) with normal villi and crypts.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="font-semibold text-purple-900 mb-1">Marsh 2 - Hyperplastic</h3>
                <p className="text-purple-700">Increased IELs with crypt hyperplasia, but villi still present.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-semibold text-purple-900 mb-1">Marsh 3 - Destructive (3a, 3b, 3c)</h3>
                <p className="text-purple-700">Villous atrophy ranging from partial (3a) to subtotal (3b) to total (3c), along with crypt hyperplasia and increased IELs.</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Important Note</span>
            </h3>
            <p className="text-purple-700 text-sm">
              You must continue eating gluten-containing foods before testing. Starting a gluten-free diet before diagnosis can lead to false-negative results and delay proper treatment.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}