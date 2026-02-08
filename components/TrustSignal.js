'use client'

import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'
import { getFeaturedVoices, typeLabels, typeColors } from '@/data/authoritativeVoices'

export default function TrustSignal({ variant = 'default' }) {
  const featuredVoices = getFeaturedVoices()

  if (variant === 'compact') {
    // Compact version for footer or smaller sections
    return (
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-3">
          Guided by trusted medical and patient organisations
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {featuredVoices.slice(0, 6).map((voice) => (
            <span
              key={voice.id}
              className="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600"
            >
              {voice.name.length > 25 ? voice.name.split('(')[0].trim() : voice.name}
            </span>
          ))}
        </div>
        <Link
          href="/trust/authoritative-voices"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors"
        >
          <span>See all authoritative voices</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    )
  }

  // Default full version
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
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

          {/* Organisation chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {featuredVoices.map((voice) => (
              <div
                key={voice.id}
                className="group bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                    {voice.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-purple-700 transition-colors">
                      {voice.name.length > 30 ? voice.name.split('(')[0].trim() : voice.name}
                    </p>
                    <p className="text-xs text-slate-400">{voice.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/trust/authoritative-voices"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-purple-300 hover:text-purple-700 transition-all"
            >
              <span>See all authoritative voices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
