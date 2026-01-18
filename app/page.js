import InOneMinute from '@/components/InOneMinute'
import RelatedReading from '@/components/RelatedReading'
import Link from 'next/link'

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

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-purple-900 mb-6">
          Celiac Disease Information Hub
        </h1>
        <p className="text-xl text-purple-700 mb-8">
          Your trusted resource for comprehensive, evidence-based information about Celiac disease
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/understanding"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md"
          >
            Get Started
          </Link>
          <Link
            href="/diagnosis-marsh"
            className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors shadow-md"
          >
            Learn About Diagnosis
          </Link>
        </div>
      </div>

      {/* In One Minute Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <InOneMinute>
          <p className="text-purple-900">
            <strong>Celiac disease</strong> is an autoimmune disorder where consuming gluten triggers an immune response that damages the small intestine. It affects approximately 1% of the population worldwide. The only treatment is a strict, lifelong gluten-free diet. Early diagnosis and proper management can prevent serious complications and help patients live healthy, normal lives.
          </p>
        </InOneMinute>
      </div>

      {/* Quick Navigation Cards */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Explore Topics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/understanding" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Understanding</h3>
            <p className="text-sm text-purple-600">Learn the basics about Celiac disease</p>
          </Link>

          <Link href="/diagnosis-marsh" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Diagnosis & Marsh</h3>
            <p className="text-sm text-purple-600">Understanding testing and classification</p>
          </Link>

          <Link href="/healing" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Healing</h3>
            <p className="text-sm text-purple-600">The journey to intestinal recovery</p>
          </Link>

          <Link href="/parents" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Parents</h3>
            <p className="text-sm text-purple-600">Resources for families and children</p>
          </Link>
        </div>
      </div>

      {/* Related Reading Section */}
      <div className="max-w-4xl mx-auto">
        <RelatedReading links={relatedLinks} />
      </div>
    </div>
  )
}