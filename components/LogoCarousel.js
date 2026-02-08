'use client'

import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'
import authoritativeVoices from '@/data/authoritativeVoices'

// Logo item component with fallback
function LogoItem({ voice }) {
  return (
    <div 
      className="flex-shrink-0 mx-4 group"
      title={voice.name}
    >
      <div className="w-24 h-16 flex items-center justify-center bg-white rounded-xl border border-slate-200 px-3 py-2 transition-all group-hover:border-purple-300 group-hover:shadow-sm">
        {voice.logo ? (
          <img 
            src={voice.logo} 
            alt={voice.name}
            className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div 
          className={`${voice.logo ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
          style={{ display: voice.logo ? 'none' : 'flex' }}
        >
          <span className="text-sm font-bold text-slate-400 group-hover:text-purple-600 transition-colors text-center leading-tight">
            {voice.shortName || voice.logoFallback}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function LogoCarousel() {
  // Use all voices for the carousel
  const voices = authoritativeVoices

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
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

      {/* Rolling Logo Carousel */}
      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {/* First set of logos */}
          <div className="flex items-center">
            {voices.map((voice) => (
              <LogoItem key={voice.id} voice={voice} />
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center">
            {voices.map((voice) => (
              <LogoItem key={`dup-${voice.id}`} voice={voice} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link
          href="/trust/authoritative-voices"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-purple-300 hover:text-purple-700 transition-all"
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
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
