'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, ExternalLink, ChevronDown, Shield, Globe, BookOpen, Building, FileCheck, Library } from 'lucide-react'
import authoritativeVoices, { typeLabels, typeColors } from '@/data/authoritativeVoices'

// Type icons
const typeIcons = {
  patient_org: Shield,
  guideline_body: FileCheck,
  research_org: BookOpen,
  regulator: Building,
  medical_publisher: Library
}

// Unique regions from data
const allRegions = [...new Set(authoritativeVoices.map(v => v.region))]
const allTypes = Object.keys(typeLabels)

export default function AuthoritativeVoicesClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [expandedCard, setExpandedCard] = useState(null)

  // Filter voices
  const filteredVoices = useMemo(() => {
    return authoritativeVoices.filter(voice => {
      const matchesSearch = !searchQuery || 
        voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voice.bestFor.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = !selectedType || voice.type === selectedType
      const matchesRegion = !selectedRegion || voice.region.includes(selectedRegion)
      
      return matchesSearch && matchesType && matchesRegion
    })
  }, [searchQuery, selectedType, selectedRegion])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('')
    setSelectedRegion('')
  }

  const hasActiveFilters = searchQuery || selectedType || selectedRegion

  return (
    <div className="min-h-[80vh] py-12 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
            <Shield className="w-4 h-4" />
            <span>Trust & Transparency</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Authoritative Voices
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            coeliac.co is informed by guidance, research, and standards from trusted organisations worldwide. 
            These voices help ground our content and are available for those who want to explore further.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-sm"
              />
            </div>
            
            {/* Type filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none w-full md:w-48 px-4 py-2.5 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-sm bg-white"
              >
                <option value="">All types</option>
                {allTypes.map(type => (
                  <option key={type} value={type}>{typeLabels[type]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            
            {/* Region filter */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none w-full md:w-40 px-4 py-2.5 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-sm bg-white"
              >
                <option value="">All regions</option>
                {allRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6">
          Showing {filteredVoices.length} of {authoritativeVoices.length} organisations
        </p>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredVoices.map((voice) => {
            const TypeIcon = typeIcons[voice.type] || Shield
            const isExpanded = expandedCard === voice.id

            return (
              <div 
                key={voice.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <TypeIcon className="w-6 h-6 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 mb-1">{voice.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[voice.type]}`}>
                          {typeLabels[voice.type]}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          <Globe className="w-3 h-3" />
                          {voice.region}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{voice.bestFor}</p>
                    </div>
                  </div>

                  {/* Why it matters */}
                  <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                    {voice.whyItMatters}
                  </p>
                </div>

                {/* Expandable section */}
                <div className="border-t border-slate-100">
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : voice.id)}
                    className="w-full px-5 py-3 flex items-center justify-between text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <span>How we use this source</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">How coeliac.co uses this</p>
                        <p className="text-sm text-purple-900">{voice.howWeUseIt}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">How you can explore</p>
                        <p className="text-sm text-blue-900">{voice.howUsersCanExplore}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
                  <a
                    href={voice.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-purple-300 hover:text-purple-700 transition-all"
                  >
                    <span>Explore source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredVoices.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No organisations found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-purple-700 hover:text-purple-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Governance note */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-2">About our sources</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            coeliac.co curates, translates, and contextualises information from these authoritative voices 
            to make it accessible and actionable. We do not claim endorsement from these organisations. 
            Our content is informed by their guidance but represents our interpretation for educational purposes. 
            Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
