import Link from 'next/link'
import { ArrowRight, MapPin, BookOpen, Users, Heart, Stethoscope, HelpCircle, Baby, Utensils, Send, MessageCircle, Bell, Globe } from 'lucide-react'
import LogoCarousel from '@/components/LogoCarousel'

export const metadata = {
  title: 'Coeliac Info Hub - Support for Living with Coeliac Disease',
  description: 'Find trusted local support, clear guidance, and a community that understands. Your guide to living well with coeliac disease.',
  keywords: 'coeliac disease, celiac disease, gluten free, local support, diagnosis, community',
}

export default function Home() {
  // Situational shortcuts - "I am here because..."
  const situations = [
    {
      label: 'I was recently diagnosed',
      href: '/diagnosis-marsh',
      icon: Stethoscope,
    },
    {
      label: 'I suspect coeliac disease',
      href: '/understanding',
      icon: HelpCircle,
    },
    {
      label: 'I live with coeliac disease',
      href: '/living',
      icon: Utensils,
    },
    {
      label: 'I support someone with coeliac disease',
      href: '/parents',
      icon: Baby,
    },
  ]

  // Education topics
  const topics = [
    {
      title: 'Diagnosis & Marsh Classification',
      description: 'Testing, biopsy results, and what they mean',
      href: '/diagnosis-marsh',
      icon: Stethoscope,
    },
    {
      title: 'Understanding Coeliac Disease',
      description: 'Symptoms, causes, and misdiagnosis',
      href: '/understanding',
      icon: BookOpen,
    },
    {
      title: 'Living Gluten-Free',
      description: 'Daily life, food choices, and practical tips',
      href: '/living',
      icon: Utensils,
    },
    {
      title: 'Children & Family',
      description: 'Supporting young ones with coeliac disease',
      href: '/parents',
      icon: Baby,
    },
    {
      title: 'Healing & Recovery',
      description: 'Timeline, monitoring, and feeling better',
      href: '/healing',
      icon: Heart,
    },
    {
      title: 'Research & Updates',
      description: 'Latest findings and developments',
      href: '/research',
      icon: BookOpen,
    },
  ]

  // Community actions
  const communityActions = [
    {
      title: 'Submit a local place',
      description: 'Share a restaurant, shop, or resource',
      href: '/submit',
      icon: MapPin,
    },
    {
      title: 'Share an experience',
      description: 'Help others with your story',
      href: '/submit',
      icon: MessageCircle,
    },
    {
      title: 'Join for updates',
      description: 'Stay informed about new resources',
      href: '/signup',
      icon: Bell,
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{backgroundColor: '#854F9B'}}></div>
        <div className="absolute top-32 left-10 w-56 h-56 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Hero Section - Minimal, Action-Oriented */}
      <section className="relative">
        <div className="container mx-auto px-4 pt-12 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Support for living with{' '}
              <span style={{color: '#854F9B'}}>coeliac disease</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Find trusted local support, clear guidance, and a community that understands.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Action Cards - CRITICAL: Must be visible without scrolling */}
      <section className="relative pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {/* Action 1 - Local Support - Teal */}
              <Link
                href="/local"
                className="group bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg border border-slate-200 hover:border-teal-300 transform hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br from-teal-500 to-teal-600">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-1.5">Find support nearby</h2>
                <p className="text-slate-500 text-xs md:text-sm mb-3 leading-relaxed">
                  Restaurants, shops & doctors in your city
                </p>
                <div className="flex items-center text-xs md:text-sm font-medium text-teal-600">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Action 2 - Learn - Indigo */}
              <Link
                href="/understanding"
                className="group bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg border border-slate-200 hover:border-indigo-300 transform hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br from-indigo-500 to-indigo-600">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-1.5">Learn the essentials</h2>
                <p className="text-slate-500 text-xs md:text-sm mb-3 leading-relaxed">
                  Diagnosis, symptoms & gluten-free living
                </p>
                <div className="flex items-center text-xs md:text-sm font-medium text-indigo-600">
                  <span>Start learning</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Action 3 - Contribute - Amber */}
              <Link
                href="/submit"
                className="group bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg border border-slate-200 hover:border-amber-300 transform hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br from-amber-500 to-orange-500">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-1.5">Share a discovery</h2>
                <p className="text-slate-500 text-xs md:text-sm mb-3 leading-relaxed">
                  Add a place, tip, or story to help others
                </p>
                <div className="flex items-center text-xs md:text-sm font-medium text-amber-600">
                  <span>Contribute</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Action 4 - Community - Blue */}
              <Link
                href="/signup"
                className="group bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg border border-slate-200 hover:border-blue-300 transform hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br from-blue-500 to-blue-600">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-1.5">Join the community</h2>
                <p className="text-slate-500 text-xs md:text-sm mb-3 leading-relaxed">
                  Get updates & connect with others
                </p>
                <div className="flex items-center text-xs md:text-sm font-medium text-blue-600">
                  <span>Sign up</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Situational Shortcuts - "I am here because..." */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-500 mb-6 text-center">
              I am here because...
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {situations.map((situation, index) => {
                const Icon = situation.icon
                return (
                  <Link
                    key={index}
                    href={situation.href}
                    className="group flex flex-col items-center p-4 md:p-5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition-all text-center"
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-purple-600 mb-2 transition-colors" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-purple-700 transition-colors">
                      {situation.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Local Support Preview */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header with badge */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
                <MapPin className="w-4 h-4" />
                <span>Local Directory</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Trusted support near you
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Discover gluten-free restaurants, bakeries, shops, and healthcare providers across 20 European cities
              </p>
            </div>

            {/* Featured Cities Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { flag: '🇬🇧', city: 'London', country: 'United Kingdom', slug: '/local/gb/london', listings: '16+' },
                { flag: '🇫🇷', city: 'Paris', country: 'France', slug: '/local/fr/paris', listings: '16+' },
                { flag: '🇩🇪', city: 'Berlin', country: 'Germany', slug: '/local/de/berlin', listings: '18+' },
                { flag: '🇮🇹', city: 'Rome', country: 'Italy', slug: '/local/it/rome', listings: '16+' },
                { flag: '🇪🇸', city: 'Madrid', country: 'Spain', slug: '/local/es/madrid', listings: '16+' },
                { flag: '🇳🇱', city: 'Amsterdam', country: 'Netherlands', slug: '/local/nl/amsterdam', listings: '16+' },
                { flag: '🇦🇹', city: 'Vienna', country: 'Austria', slug: '/local/at/vienna', listings: '17+' },
                { flag: '🇵🇱', city: 'Warsaw', country: 'Poland', slug: '/local/pl/warsaw', listings: '16+' },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{item.flag}</span>
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{item.listings}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 group-hover:text-purple-700 transition-colors text-base mb-0.5">{item.city}</h3>
                    <p className="text-xs text-slate-500">{item.country}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs font-medium text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* More cities - styled pills */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-4 text-center">More cities to explore</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { flag: '🇮🇹', city: 'Milan', slug: '/local/it/milan' },
                  { flag: '🇪🇸', city: 'Barcelona', slug: '/local/es/barcelona' },
                  { flag: '🇩🇪', city: 'Munich', slug: '/local/de/munich' },
                  { flag: '🇨🇿', city: 'Prague', slug: '/local/cz/prague' },
                  { flag: '🇭🇺', city: 'Budapest', slug: '/local/hu/budapest' },
                  { flag: '🇧🇪', city: 'Brussels', slug: '/local/be/brussels' },
                  { flag: '🇷🇺', city: 'Moscow', slug: '/local/ru/moscow' },
                  { flag: '🇹🇷', city: 'Istanbul', slug: '/local/tr/istanbul' },
                  { flag: '🇷🇴', city: 'Bucharest', slug: '/local/ro/bucharest' },
                  { flag: '🇧🇬', city: 'Sofia', slug: '/local/bg/sofia' },
                  { flag: '🇩🇪', city: 'Hamburg', slug: '/local/de/hamburg' },
                  { flag: '🇷🇺', city: 'St Petersburg', slug: '/local/ru/saint-petersburg' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={item.slug}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all"
                  >
                    <span className="text-base">{item.flag}</span>
                    <span>{item.city}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/local"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-xl transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
              >
                <Globe className="w-4 h-4" />
                <span>Browse all 334 listings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-medium rounded-xl hover:border-purple-300 hover:text-purple-700 transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>Add your city</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Education Preview - Topics, Not Articles */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Learn at your own pace
              </h2>
              <p className="text-slate-600">
                Clear, evidence-based information when you need it
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {topics.map((topic, index) => {
                const Icon = topic.icon
                return (
                  <Link
                    key={index}
                    href={topic.href}
                    className="group bg-slate-50 hover:bg-white rounded-xl p-5 md:p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-700 mb-1 transition-colors text-sm md:text-base">
                      {topic.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {topic.description}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Community & Contribution Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Help others by sharing what you know
              </h2>
              <p className="text-slate-600">
                Your experience can make someone else's journey easier
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {communityActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="group bg-white rounded-xl p-5 md:p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center mx-auto mb-3 transition-colors">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-700 mb-1 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {action.description}
                    </p>
                  </Link>
                )
              })}
            </div>

            <div className="text-center">
              <Link
                href="/signup"
                className="inline-flex items-center space-x-2 px-6 py-3 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}
              >
                <span>Join the community</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal - Rolling Logo Carousel */}
      <LogoCarousel />

      {/* Minimal Footer Note */}
      <section className="py-8 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-slate-500">
              Coeliac Info Hub provides evidence-based information for educational purposes. 
              Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
