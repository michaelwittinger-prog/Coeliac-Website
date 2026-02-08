'use client'

import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'
import authoritativeVoices, { typeLabels } from '@/data/authoritativeVoices'

// Color schemes for different organization types
const typeStyles = {
  patient_org: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    text: 'text-blue-700',
    accent: 'bg-blue-600',
    badge: 'bg-blue-100 text-blue-700'
  },
  guideline_body: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-200',
    text: 'text-purple-700',
    accent: 'bg-purple-600',
    badge: 'bg-purple-100 text-purple-700'
  },
  research_org: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    accent: 'bg-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700'
  },
  regulator: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    border: 'border-amber-200',
    text: 'text-amber-700',
    accent: 'bg-amber-600',
    badge: 'bg-amber-100 text-amber-700'
  },
  medical_publisher: {
    bg: 'bg-gradient-to-br from-rose-50 to-rose-100',
    border: 'border-rose-200',
    text: 'text-rose-700',
    accent: 'bg-rose-600',
    badge: 'bg-rose-100 text-rose-700'
  }
}

// Professional styled tile component
function OrganisationTile({ voice }) {
  const style = typeStyles[voice.type] || typeStyles.patient_org
  
  return (
    <div 
      className="flex-shrink-0 mx-3 group"
      title={voice.name}
    >
      <div className={`w-44 h-28 ${style.bg} ${style.border} border rounded-2xl p-4 transition-all hover:shadow-lg hover:scale-105 flex flex-col justify-between`}>
        {/* Top: Abbreviation */}
        <div className="flex items-start justify-between">
          <span className={`text-2xl font-bold ${style.text} leading-tight`}>
            {voice.shortName || voice.logoFallback}
          </span>
          <div className={`w-2 h-2 rounded-full ${style.accent}`}></div>
        </div>
        
        {/* Bottom: Region & Type */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium truncate max-w-[70px]">
            {voice.region.split('/')[0].trim()}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
            {voice.type === 'patient_org' ? 'Patient' : 
             voice.type === 'guideline_body' ? 'Guidelines' :
             voice.type === 'research_org' ? 'Research' :
             voice.type === 'regulator' ? 'Regulator' : 'Publisher'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function LogoCarousel() {
  const voices = authoritativeVoices

  return (
    <section className="py-14 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-3 bg-slate-100 text-slate-600">
            <Shield className="w-4 h-4" />
            <span>Trust & Transparency</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2">
            Guided by trusted medical and patient organisations
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Our content is informed by guidance from leading coeliac disease organisations worldwide
          </p>
        </div>
      </div>

      {/* Rolling Tile Carousel */}
      <div className="relative py-4">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {/* First set of tiles */}
          <div className="flex items-center">
            {voices.map((voice) => (
              <OrganisationTile key={voice.id} voice={voice} />
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center">
            {voices.map((voice) => (
              <OrganisationTile key={`dup-${voice.id}`} voice={voice} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href="/trust/authoritative-voices"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-purple-300 hover:text-purple-700 hover:shadow-md transition-all"
        >
          <span>See all authoritative voices</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
