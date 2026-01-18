import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import { Utensils, X, Check, AlertTriangle, ShieldCheck } from 'lucide-react'

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
    <div className="bg-slate-50">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Utensils className="w-4 h-4" />
              <span>Daily Life</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Living with Celiac Disease
            </h1>
            <p className="text-lg text-slate-600">Practical guidance for thriving with celiac disease</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                Living well with celiac disease means following a strict gluten-free diet for life. While this requires learning and adaptation, people with celiac disease can enjoy a full, healthy life. Focus on naturally gluten-free whole foods, learn to read labels carefully, prevent cross-contamination, and connect with support communities. With time, the gluten-free lifestyle becomes second nature.
              </p>
            </InOneMinute>
          </div>

          {/* The Gluten-Free Diet */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-emerald-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">The Gluten-Free Diet</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <X className="w-5 h-5 text-red-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Avoid (Contains Gluten)</h3>
                </div>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Wheat (including spelt, kamut, farro, durum)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Barley and malt</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Rye</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Triticale</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Most breads, pastas, cereals, and baked goods</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Safe to Eat (Naturally GF)</h3>
                </div>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fresh fruits and vegetables</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fresh meat, poultry, fish (unprocessed)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Rice, quinoa, corn, potatoes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Beans and legumes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Most dairy products (check labels)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Label Reading */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Label Reading & Hidden Gluten</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Always read ingredient labels carefully. Gluten can hide in unexpected places:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span>Watch Out For:</span>
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Soy sauce (use tamari instead)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Beer (look for gluten-free options)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Processed meats and sausages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Salad dressings and sauces</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Medications and supplements</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Look For:</span>
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>"Certified Gluten-Free" label</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>"Gluten-Free" on packaging</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Simple, recognizable ingredients</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Dedicated gluten-free facilities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Contact manufacturer if unsure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cross-Contamination */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Preventing Cross-Contamination</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Even tiny amounts of gluten can cause damage. Follow these guidelines:
            </p>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-semibold text-slate-800 mb-4">In the Kitchen:</h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use separate toaster, cutting boards, and colander for gluten-free items</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Store gluten-free foods in separate containers or higher shelves</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Avoid wooden utensils (can harbor gluten in grooves)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Don't share butter, jam, or condiments unless using clean utensils</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Clean surfaces thoroughly before preparing gluten-free food</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Message */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">You're Not Alone</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Living with celiac disease becomes easier with time. Join support groups, connect with others in the celiac community, and remember that millions of people worldwide manage this condition successfully. With proper diet adherence, you can live a completely normal, healthy, and fulfilling life.
                </p>
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