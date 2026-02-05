import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import { Users, GraduationCap, Home, Heart } from 'lucide-react'

export const metadata = {
  title: 'Resources for Parents - Coeliac Information Hub',
  description: 'Information and support for parents of children with Coeliac disease. Learn about pediatric diagnosis, school management, and family adaptation.',
}

export default function ParentsPage() {
  const relatedLinks = [
    { href: '/living', title: 'Living with Coeliac Disease' },
    { href: '/understanding', title: 'Understanding Coeliac Disease' },
    { href: '/healing', title: 'Healing Process' },
  ]

  return (
    <div className="bg-slate-50">
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>Family Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Resources for Parents
            </h1>
            <p className="text-lg text-slate-600">Supporting families with children who have celiac disease</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                Parenting a child with celiac disease brings unique challenges but is completely manageable. Children can thrive on a gluten-free diet with proper education and family support. Key areas include safe school lunches, educating caregivers, preventing cross-contamination at home, and helping your child develop confidence in managing their condition. Most children adapt quickly and lead normal, healthy lives.
              </p>
            </InOneMinute>
          </div>

          {/* Coeliac Disease in Children */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-orange-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Coeliac Disease in Children</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Children with celiac disease can experience different symptoms than adults, including:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span>Common Symptoms</span>
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Chronic diarrhea or constipation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Abdominal pain and bloating</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Failure to thrive or poor weight gain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Short stature or delayed puberty</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Behavioral Signs</span>
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Irritability or mood changes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fatigue or lack of energy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Difficulty concentrating</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Dental enamel defects</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Managing School Life */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Managing School Life</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Communication with School</h3>
                <p className="text-slate-600 text-sm mb-3">Work closely with teachers, cafeteria staff, and school nurses to ensure your child's safety:</p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Provide written information about celiac disease and dietary needs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Consider a 504 plan or IEP if needed for accommodations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Discuss safe snack options for classroom celebrations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Ensure understanding of cross-contamination risks</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Lunch and Snacks</h3>
                <p className="text-slate-600 text-sm mb-3">Safe lunch strategies:</p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pack lunches from home in clearly labeled containers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Work with cafeteria to identify safe menu options if available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Keep emergency gluten-free snacks at school</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Teach your child to read labels and ask questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Creating Safe Home */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-green-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Creating a Safe Home Environment</h2>
            </div>
            <p className="text-slate-600 mb-6">Consider these options for your household:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-slate-800 mb-3">Fully Gluten-Free Home</h3>
                <p className="text-sm text-slate-700">Eliminates all gluten products from the house. Safest option that prevents cross-contamination and helps the child feel "normal."</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-3">Mixed Kitchen</h3>
                <p className="text-sm text-slate-700">Keep some gluten products but implement strict protocols: separate prep areas, dedicated utensils, clear labeling, and thorough cleaning.</p>
              </div>
            </div>
          </div>

          {/* Supporting Emotionally */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100 mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Supporting Your Child Emotionally</h2>
            <p className="text-slate-700 mb-4">Help your child develop a healthy relationship with their diagnosis:</p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm"><strong>Normalize the condition:</strong> Help them understand they're not alone and many children have dietary restrictions</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm"><strong>Empower with knowledge:</strong> Teach them about celiac disease in age-appropriate ways</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm"><strong>Connect with others:</strong> Find support groups or camps for children with celiac disease</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm"><strong>Focus on what they can eat:</strong> Explore delicious gluten-free options together</span>
              </li>
            </ul>
          </div>

          {/* Related Reading Section */}
          <RelatedReading links={relatedLinks} />
        </div>
      </div>
    </div>
  )
}