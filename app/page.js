import InOneMinute from '@/components/InOneMinute'
import ExternalResources from '@/components/ExternalResources'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, HeartPulse, Users, Microscope, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Home - Coeliac Disease Information Hub',
  description: 'Your comprehensive resource for understanding, diagnosing, and living with Coeliac disease (Celiac disease). Evidence-based information for patients, families, and caregivers.',
  keywords: 'coeliac disease, celiac disease, gluten free, autoimmune, diagnosis, gluten intolerance',
}

export default function Home() {
  const externalLinks = [
    {
      title: 'Coeliac UK',
      url: 'https://www.coeliac.org.uk/',
      description: 'The UK\'s leading charity for coeliac disease information and support.',
      region: 'United Kingdom'
    },
    {
      title: 'Beyond Celiac',
      url: 'https://www.beyondceliac.org/',
      description: 'Leading US organisation for celiac disease awareness and research.',
      region: 'United States'
    },
    {
      title: 'Association of European Coeliac Societies (AOECS)',
      url: 'https://www.aoecs.org/',
      description: 'Pan-European organisation representing coeliac societies across Europe.',
      region: 'Europe'
    }
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'Understanding',
      description: 'Comprehensive overview of coeliac disease fundamentals',
      href: '/understanding',
    },
    {
      icon: FileText,
      title: 'Diagnosis & Marsh',
      description: 'Testing procedures and classification systems',
      href: '/diagnosis-marsh',
    },
    {
      icon: HeartPulse,
      title: 'Healing',
      description: 'Recovery timeline and monitoring progress',
      href: '/healing',
    },
    {
      icon: Users,
      title: 'Parents',
      description: 'Resources for families with children',
      href: '/parents',
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
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{backgroundColor: '#854F9B'}}></div>
        <div className="absolute top-40 left-20 w-48 h-48 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
              <Microscope className="w-4 h-4" />
              <span>Evidence-Based Medical Information</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Coeliac Disease<br />
              <span style={{color: '#854F9B'}}>Information Hub</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your trusted resource for comprehensive, evidence-based information about coeliac disease diagnosis, management, and living well.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/understanding"
                className="inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                style={{backgroundColor: '#854F9B'}}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/diagnosis-marsh"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-lg font-medium hover:bg-slate-50 transition-all shadow-sm border-2" 
                style={{color: '#854F9B', borderColor: '#854F9B'}}
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
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#854F9B'}} />
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
                <strong>Coeliac disease</strong> is an autoimmune disorder where consuming gluten triggers an immune response that damages the small intestine. It affects approximately 1% of the population worldwide. The only treatment is a strict, lifelong gluten-free diet. Early diagnosis and proper management can prevent serious complications and help patients live healthy, normal lives.
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
              <p className="text-slate-600">Comprehensive information organised by topic</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={index}
                    href={feature.href}
                    className="group bg-slate-50 hover:bg-white rounded-xl p-6 transition-all hover:shadow-lg border border-slate-200 feature-card-hover"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover-title transition-colors">{feature.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium" style={{color: '#854F9B'}}>
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