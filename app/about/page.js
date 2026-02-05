import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import { Target, CheckCircle2, RefreshCcw, Users, Info } from 'lucide-react'

export const metadata = {
  title: 'About - Celiac Information Hub',
  description: 'Learn about the Celiac Information Hub, our mission to provide evidence-based information about Coeliac disease, and our commitment to supporting the community.',
}

export default function AboutPage() {
  const relatedLinks = [
    { href: '/understanding', title: 'Understanding Coeliac Disease' },
    { href: '/diagnosis-marsh', title: 'Diagnosis & Marsh Classification' },
    { href: '/research', title: 'Latest Research' },
  ]

  const missions = [
    {
      title: 'Educate',
      description: 'Provide clear, accessible information about celiac disease, its diagnosis, and management',
      icon: Target
    },
    {
      title: 'Empower',
      description: 'Help patients and families make informed decisions about their health',
      icon: CheckCircle2
    },
    {
      title: 'Support',
      description: 'Offer practical guidance for living well with celiac disease',
      icon: Users
    },
    {
      title: 'Update',
      description: 'Keep our community informed about the latest research and developments',
      icon: RefreshCcw
    }
  ]

  return (
    <div className="bg-slate-50">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Info className="w-4 h-4" />
              <span>About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              About Celiac Information Hub
            </h1>
            <p className="text-lg text-slate-600">Our mission to provide trusted celiac disease information</p>
          </div>

          {/* In One Minute Section */}
          <div className="mb-12">
            <InOneMinute>
              <p>
                The Celiac Information Hub is dedicated to providing accurate, evidence-based information about celiac disease to patients, families, and healthcare providers. Our mission is to empower individuals with the knowledge they need to understand, diagnose, and manage celiac disease effectively. All information is based on current medical research and guidelines from leading celiac disease organizations.
              </p>
            </InOneMinute>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <p className="text-slate-600 mb-6">
              We believe that accurate information is the foundation of effective health management. Our mission is to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {missions.map((mission, index) => {
                const Icon = mission.icon
                return (
                  <div key={index} className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">{mission.title}</h3>
                        <p className="text-slate-600 text-sm">{mission.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Approach</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Evidence-Based</h3>
                  <p className="text-slate-600 text-sm">
                    All information is grounded in current medical research and guidelines from reputable celiac disease organizations and research institutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Clear & Accessible</h3>
                  <p className="text-slate-600 text-sm">
                    We translate complex medical information into language that patients and families can understand without sacrificing accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCcw className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Regularly Updated</h3>
                  <p className="text-slate-600 text-sm">
                    Coeliac disease research is constantly evolving. We regularly review and update our content to reflect the latest scientific understanding.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Patient-Centered</h3>
                  <p className="text-slate-600 text-sm">
                    We understand the challenges of living with celiac disease and strive to address the real-world concerns of patients and families.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Coverage */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Content Coverage</h2>
            <p className="text-slate-600 mb-6">
              Our comprehensive resource covers all aspects of celiac disease:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">Understanding</h3>
                <p className="text-slate-600 text-xs">Disease basics and fundamentals</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <div className="text-2xl mb-2">🔬</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">Diagnosis</h3>
                <p className="text-slate-600 text-xs">Testing and classification</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="text-2xl mb-2">💚</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">Healing</h3>
                <p className="text-slate-600 text-xs">Recovery and monitoring</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">Parents</h3>
                <p className="text-slate-600 text-xs">Family resources</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200">
                <div className="text-2xl mb-2">🔗</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">Related</h3>
                <p className="text-slate-600 text-xs">Associated conditions</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                <div className="text-2xl mb-2">🥗</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">Living</h3>
                <p className="text-slate-600 text-xs">Daily life guidance</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                <div className="text-2xl mb-2">🧬</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">Research</h3>
                <p className="text-slate-600 text-xs">Latest developments</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <div className="text-2xl mb-2">ℹ️</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">About</h3>
                <p className="text-slate-600 text-xs">Our mission</p>
              </div>
            </div>
          </div>

          {/* Stay Connected */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Stay Connected</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  This website is a living resource that grows and improves based on the needs of our community. We're committed to providing you with the most current, accurate, and helpful information about celiac disease.
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