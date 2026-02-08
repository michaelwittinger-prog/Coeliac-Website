'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink, BookOpen } from 'lucide-react'
import { getVoiceById, typeLabels, typeColors } from '@/data/authoritativeVoices'

export default function SourcesPanel({ sources = [] }) {
  const [isOpen, setIsOpen] = useState(false)

  // Get full voice data for each source ID
  const voiceData = sources
    .map(id => getVoiceById(id))
    .filter(Boolean)

  if (voiceData.length === 0) {
    return null
  }

  return (
    <div className="mt-12 border-t border-slate-200 pt-8">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-slate-500" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-slate-800">Sources and authority</h3>
            <p className="text-sm text-slate-500">{voiceData.length} authoritative sources</p>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-4 p-5 bg-slate-50 rounded-xl">
          {/* Intro text */}
          <p className="text-sm text-slate-600 mb-6 pb-4 border-b border-slate-200">
            The information on this page is informed by guidance and research from the following organisations.
          </p>

          {/* Sources list */}
          <div className="space-y-4">
            {voiceData.map((voice) => (
              <div 
                key={voice.id}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 bg-white rounded-lg border border-slate-200"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-medium text-slate-800">{voice.name}</h4>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[voice.type]}`}>
                      {typeLabels[voice.type]}
                    </span>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {voice.region}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{voice.bestFor}</p>
                </div>
                <a
                  href={voice.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-purple-700 bg-slate-50 hover:bg-purple-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Official source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Footer link */}
          <div className="mt-6 pt-4 border-t border-slate-200 text-center">
            <a
              href="/trust/authoritative-voices"
              className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors"
            >
              View all authoritative voices →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
