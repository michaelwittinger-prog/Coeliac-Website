import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'Living with Celiac Disease - Celiac Information Hub',
  description: 'Practical tips for living well with Celiac disease. Learn about the gluten-free diet, dining out, travel, and maintaining quality of life.',
}

export default function LivingPage() {
  const relatedLinks = [
    { href: '/healing', title: 'Healing Process' },
    { href: '/parents', title: 'Resources for Parents' },
    { href: '/understanding', title: 'Understanding Celiac Disease' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          Living with Celiac Disease
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              Living well with celiac disease means following a strict gluten-free diet for life. While this requires learning and adaptation, people with celiac disease can enjoy a full, healthy life. Focus on naturally gluten-free whole foods, learn to read labels carefully, prevent cross-contamination, and connect with support communities. With time, the gluten-free lifestyle becomes second nature.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">The Gluten-Free Diet</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">❌ Avoid (Contains Gluten)</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Wheat (including spelt, kamut, farro, durum)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Barley and malt</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Rye</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Triticale</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Most breads, pastas, cereals, and baked goods</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">✓ Safe to Eat (Naturally GF)</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Fresh fruits and vegetables</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Fresh meat, poultry, fish (unprocessed)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Rice, quinoa, corn, potatoes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Beans and legumes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Most dairy products (check labels)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Label Reading & Hidden Gluten</h2>
            <p className="text-purple-700 mb-4">
              Always read ingredient labels carefully. Gluten can hide in unexpected places:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Watch Out For:</h3>
                <ul className="space-y-1 text-yellow-800 text-sm">
                  <li>• Soy sauce (use tamari instead)</li>
                  <li>• Beer (look for gluten-free options)</li>
                  <li>• Processed meats and sausages</li>
                  <li>• Salad dressings and sauces</li>
                  <li>• Soups and broths</li>
                  <li>• Candy and chocolate</li>
                  <li>• Medications and supplements</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">✓ Look For:</h3>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• "Certified Gluten-Free" label</li>
                  <li>• "Gluten-Free" on packaging</li>
                  <li>• Simple, recognizable ingredients</li>
                  <li>• Dedicated gluten-free facilities</li>
                  <li>• Contact manufacturer if unsure</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Preventing Cross-Contamination</h2>
            <p className="text-purple-700 mb-4">
              Even tiny amounts of gluten can cause damage. Follow these guidelines:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">In the Kitchen:</h3>
                <ul className="space-y-2 text-purple-700 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Use separate toaster, cutting boards, and colander for gluten-free items</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Store gluten-free foods in separate containers or higher shelves</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Avoid wooden utensils (can harbor gluten in grooves)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Don't share butter, jam, peanut butter, or condiments unless using clean utensils</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Clean surfaces thoroughly before preparing gluten-free food</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Dining Out & Social Situations</h2>
            <div className="space-y-4 text-purple-700">
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Restaurant Tips:</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Call ahead to discuss gluten-free options and preparation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Speak directly with the chef or manager, not just the server</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Ask about dedicated gluten-free prep areas and equipment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Order simple dishes: grilled meat, steamed vegetables, baked potato</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Use dining cards that explain celiac disease in multiple languages when traveling</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-2 mt-4">Social Events:</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Inform hosts in advance about dietary needs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Offer to bring a gluten-free dish to share</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Eat beforehand if you're unsure about food safety</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Carry emergency snacks when traveling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Nutrition Considerations</h2>
            <p className="text-purple-700 mb-4">
              Work with a registered dietitian experienced in celiac disease to ensure adequate nutrition:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Common Deficiencies</h3>
                <ul className="space-y-1 text-purple-700 text-sm">
                  <li>• Iron</li>
                  <li>• Calcium and Vitamin D</li>
                  <li>• B vitamins (especially B12, folate)</li>
                  <li>• Fiber</li>
                  <li>• Zinc and magnesium</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">To Support Healing</h3>
                <ul className="space-y-1 text-purple-700 text-sm">
                  <li>• Focus on whole, unprocessed foods</li>
                  <li>• Choose fortified gluten-free products</li>
                  <li>• Consider supplements as recommended</li>
                  <li>• Monitor bone health</li>
                  <li>• Regular nutritional follow-ups</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>You're Not Alone</span>
            </h3>
            <p className="text-green-800 text-sm">
              Living with celiac disease becomes easier with time. Join support groups, connect with others in the celiac community, and remember that millions of people worldwide manage this condition successfully. With proper diet adherence, you can live a completely normal, healthy, and fulfilling life.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}