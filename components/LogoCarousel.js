'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import authoritativeVoices from '@/data/authoritativeVoices'

// Clean, professional tile component
function OrganisationTile({ voice }) {
  return (
    <div 
      className="flex-shrink-0 mx-3"
      title={voice.name}
    >
      <div className="w-56 h-24 bg-white border border-slate-200 rounded-lg px-5 py-4 flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div>
          <span className="text-sm font-semibold text-slate-800 leading-tight line-clamp-1">
            {voice.shortName || voice.name.split('(')[0].trim()}
          </span>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {voice.bestFor}
          </p>
        </div>
        <span className="text-[10px] text-slate-400">
          {voice.region.split('/')[0].trim()}
        </span>
      </div>
    </div>
  )
}

export default function LogoCarousel() {
  const voices = authoritativeVoices

  return (
    <section className="py-12 bg-white border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 mb-1">Our content is informed by</p>
          <h2 className="text-lg font-medium text-slate-700">
            Trusted medical and patient organisations
          </h2>
        </div>
      </div>

      {/* Rolling Tile Carousel */}
      <div className="relative py-2">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          <div className="flex items-center">
            {voices.map((voice) => (
              <OrganisationTile key={voice.id} voice={voice} />
            ))}
          </div>
          <div className="flex items-center">
            {voices.map((voice) => (
              <OrganisationTile key={`dup-${voice.id}`} voice={voice} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link
          href="/trust/authoritative-voices"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <span>See all authoritative voices</span>
          <ArrowRight className="w-3.5 h-3.5" />
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
          animation: scroll 50s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
