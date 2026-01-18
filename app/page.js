import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, HeartPulse, Users, Microscope, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Home - Celiac Disease Information Hub',
  description: 'Your comprehensive resource for understanding, diagnosing, and living with Celiac disease. Evidence-based information for patients, families, and caregivers.',
}

export default function Home() {
  const relatedLinks = [
    { href: '/understanding', title: 'Understanding Celiac Disease' },
    { href: '/diagnosis-marsh', title: 'Diagnosis & Marsh Classification' },
    { href: '/healing', title: 'Healing Process' },
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'Understanding',
      description: 'Comprehensive overview of celiac disease fundamentals',
      href: '/understanding',
      color: 'purple'
    },
    {
      icon: FileText,
      title: 'Diagnosis & Marsh',
      description: 'Testing procedures and classification systems',
      href: '/diagnosis-marsh',
      color: 'blue'
    },
    {
      icon: HeartPulse,
      title: 'Healing',
      description: 'Recovery timeline and monitoring progress',
      href: '/healing',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Parents',
      description: 'Resources for families with children',
      href: '/parents',
      color: 'orange'
    },
  ]

  const keyPoints = [
    'Affects approximately 1% of the global population',
    'Autoimmune disorder triggered by gluten consumption',
    'Only treatment is a strict gluten-free diet',
    'Early diagnosis prevents serious complications',
  ]

  return (
    <div className="bg-slate-50">
      {/* Geometric Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-40 left-20 w-48 h-48 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Microscope className="w-4 h-4" />
              <span>Evidence-Based Medical Information</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Celiac Disease<br />
              <span className="text-purple-600">Information Hub</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your trusted resource for comprehensive, evidence-based information about celiac disease diagnosis, management, and living well.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/understanding"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/diagnosis-marsh"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 border-2 border-purple-200 rounded-lg font-medium hover:border-purple-300 hover:bg-purple-50 transition-all shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Learn About Diagnosis</span>
              </Link>
            </div>
          </div>

          {/* Key Points Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {keyPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* In One Minute Section */}
      <div className="relative bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <InOneMinute>
              <p className="text-white">
                <strong>Celiac disease</strong> is an autoimmune disorder where consuming gluten triggers an immune response that damages the small intestine. It affects approximately 1% of the population worldwide. The only treatment is a strict, lifelong gluten-free diet. Early diagnosis and proper management can prevent serious complications and help patients live healthy, normal lives.
              </p>
            </InOneMinute>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Explore Topics</h2>
              <p className="text-slate-600">Comprehensive information organized by topic</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={index}
                    href={feature.href}
                    className="group bg-slate-50 hover:bg-white rounded-xl p-6 transition-all hover:shadow-lg border border-slate-200 hover:border-purple-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Reading Section */}
      <div className="relative py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <RelatedReading links={relatedLinks} />
          </div>
        </div>
      </div>
    </div>
  )
}