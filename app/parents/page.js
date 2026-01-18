import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'

export const metadata = {
  title: 'Resources for Parents - Celiac Information Hub',
  description: 'Information and support for parents of children with Celiac disease. Learn about pediatric diagnosis, school management, and family adaptation.',
}

export default function ParentsPage() {
  const relatedLinks = [
    { href: '/living', title: 'Living with Celiac Disease' },
    { href: '/understanding', title: 'Understanding Celiac Disease' },
    { href: '/healing', title: 'Healing Process' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-purple-900 mb-6">
          Resources for Parents
        </h1>

        {/* In One Minute Section */}
        <div className="mb-12">
          <InOneMinute>
            <p>
              Parenting a child with celiac disease brings unique challenges but is completely manageable. Children can thrive on a gluten-free diet with proper education and family support. Key areas include safe school lunches, educating caregivers, preventing cross-contamination at home, and helping your child develop confidence in managing their condition. Most children adapt quickly and lead normal, healthy lives.
            </p>
          </InOneMinute>
        </div>

        {/* Main Content */}
        <div className="prose max-w-none mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Celiac Disease in Children</h2>
            <p className="text-purple-700 mb-4">
              Children with celiac disease can experience different symptoms than adults, including:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Common Symptoms</h3>
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
                    <span>Failure to thrive or poor weight gain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Short stature or delayed puberty</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Behavioral Signs</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Irritability or mood changes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Fatigue or lack of energy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Difficulty concentrating</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Dental enamel defects</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Managing School Life</h2>
            <div className="space-y-4 text-purple-700">
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Communication with School</h3>
                <p className="mb-2">Work closely with teachers, cafeteria staff, and school nurses to ensure your child's safety:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Provide written information about celiac disease and dietary needs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Consider a 504 plan or IEP if needed for accommodations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Discuss safe snack options for classroom celebrations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Ensure understanding of cross-contamination risks</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Lunch and Snacks</h3>
                <p className="mb-2">Safe lunch strategies:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Pack lunches from home in clearly labeled containers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Work with cafeteria to identify safe menu options if available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Keep emergency gluten-free snacks at school</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Teach your child to read labels and ask questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Creating a Safe Home Environment</h2>
            <div className="space-y-4 text-purple-700">
              <p className="font-semibold text-purple-900">Consider these options for your household:</p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Fully Gluten-Free Home</h3>
                  <p className="text-sm">Eliminates all gluten products from the house. Safest option that prevents cross-contamination and helps the child feel "normal."</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Mixed Kitchen</h3>
                  <p className="text-sm">Keep some gluten products but implement strict protocols: separate prep areas, dedicated utensils, clear labeling, and thorough cleaning.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Supporting Your Child Emotionally</h2>
            <div className="space-y-3 text-purple-700">
              <p>Help your child develop a healthy relationship with their diagnosis:</p>
              <ul className="space-y-3 ml-4 mt-4">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Normalize the condition:</strong> Help them understand they're not alone and many children have dietary restrictions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Empower with knowledge:</strong> Teach them about celiac disease in age-appropriate ways</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Connect with others:</strong> Find support groups or camps for children with celiac disease</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Focus on what they can eat:</strong> Explore delicious gluten-free options together</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Practice self-advocacy:</strong> Role-play scenarios where they need to ask about food safety</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Good News</span>
            </h3>
            <p className="text-green-800 text-sm">
              Children diagnosed with celiac disease typically heal faster than adults and adapt well to the gluten-free diet. With proper management and family support, they can participate fully in all childhood activities and grow up healthy and strong.
            </p>
          </div>
        </div>

        {/* Related Reading Section */}
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}