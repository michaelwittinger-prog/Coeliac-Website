'use client'

import { useState, useEffect } from 'react'
import LocalListingCard from '@/components/LocalListingCard'
import { MapPin, Building2, Heart, Users, Sparkles } from 'lucide-react'

// Static curated listings for Vienna
const curatedListings = [
  {
    id: 'curated-1',
    name: 'Österreichische Arbeitsgemeinschaft Zöliakie',
    district: '9th',
    description: 'The Austrian Coeliac Society providing support, information, and advocacy for people with coeliac disease throughout Austria.',
    notes: 'Membership includes access to product guides and local events',
    websiteUrl: 'https://www.zoeliakie.or.at/',
    address: 'Antonsplatz 16, 1100 Wien',
    category: 'organization',
    isCurated: true
  },
  {
    id: 'curated-2',
    name: 'Denn\'s Biomarkt',
    district: '7th',
    description: 'Organic supermarket with extensive gluten-free section including fresh bread, pasta, and specialty items.',
    notes: 'Staff knowledgeable about gluten-free products',
    websiteUrl: 'https://www.denns-biomarkt.at/',
    address: 'Mariahilfer Straße 45, 1060 Wien',
    category: 'shop',
    isCurated: true
  },
  {
    id: 'curated-3',
    name: 'Reformstark Martin',
    district: '1st',
    description: 'Health food store chain in Vienna with dedicated gluten-free products, natural remedies, and knowledgeable staff.',
    notes: 'Multiple locations including Wien Mitte and Westfield Donau Zentrum',
    websiteUrl: 'https://www.reformstark.at/',
    address: 'Wien Mitte The Mall, Landstraßer Hauptstraße 1b, 1030 Wien',
    category: 'shop',
    isCurated: true
  },
  {
    id: 'curated-4',
    name: 'Swing Kitchen',
    district: '1st',
    description: 'Vegan fast food chain with clearly marked gluten-free options and staff trained in allergen awareness.',
    notes: 'Multiple locations across Vienna',
    websiteUrl: 'https://www.swingkitchen.com/',
    address: 'Schottenfeldgasse 3, 1070 Wien',
    category: 'restaurant',
    isCurated: true
  },
  {
    id: 'curated-5',
    name: 'Medical University of Vienna - Gastroenterology',
    district: '9th',
    description: 'Vienna\'s leading university hospital with specialists experienced in coeliac disease diagnosis and management at AKH Wien.',
    notes: 'Referral from GP typically required',
    websiteUrl: 'https://www.meduniwien.ac.at/',
    address: 'Währinger Gürtel 18-20, 1090 Wien',
    category: 'medical',
    isCurated: true
  },
  {
    id: 'curated-6',
    name: 'Bio Company',
    district: '2nd',
    description: 'Large organic supermarket near Prater with comprehensive gluten-free product range.',
    websiteUrl: 'https://www.biocompany.de/',
    address: 'Praterstraße 42, 1020 Wien',
    category: 'shop',
    isCurated: true
  },
  {
    id: 'curated-7',
    name: 'Tian Bistro',
    district: '1st',
    description: 'Upscale vegetarian restaurant with dedicated gluten-free menu options and allergy-aware kitchen practices.',
    notes: 'Reservations recommended',
    websiteUrl: 'https://www.tian-bistro.com/',
    address: 'Himmelpfortgasse 23, 1010 Wien',
    category: 'restaurant',
    isCurated: true
  },
  {
    id: 'curated-8',
    name: 'Stiftung Kindergesundheit',
    description: 'Child Health Foundation supporting children\'s health including resources for paediatric coeliac disease and the Tigerkids nutrition program.',
    notes: 'Programs available in Germany and Austria',
    websiteUrl: 'https://www.kindergesundheit.de/',
    category: 'organization',
    isCurated: true
  }
]

// Category configuration
const categories = {
  organization: { label: 'Support Organizations', icon: Heart },
  shop: { label: 'Gluten-Free Shops', icon: Building2 },
  restaurant: { label: 'Restaurants & Cafés', icon: Building2 },
  medical: { label: 'Medical Facilities', icon: Building2 },
  community: { label: 'Community Submissions', icon: Users }
}

/**
 * Parse community submission content to extract listing details
 */
function parseSubmissionToListing(submission) {
  const content = submission.content || ''
  
  // Try to extract address from content (look for patterns like "Address:" or street names)
  const addressMatch = content.match(/address[:\s]+([^\n]+)/i) || 
                       content.match(/(\d+[^\n]*(?:straße|gasse|platz|weg)[^\n]*)/i)
  const address = addressMatch ? addressMatch[1].trim() : null
  
  // Try to extract district
  const districtMatch = content.match(/(\d{1,2})(?:st|nd|rd|th)?\s*(?:district|bezirk)/i) ||
                        content.match(/(?:district|bezirk)\s*(\d{1,2})/i)
  const district = districtMatch ? `${districtMatch[1]}${getOrdinalSuffix(parseInt(districtMatch[1]))}` : null
  
  // Try to extract website URL
  const urlMatch = content.match(/https?:\/\/[^\s\n]+/i)
  const websiteUrl = urlMatch ? urlMatch[0] : null
  
  // Clean description (remove extracted parts)
  let description = content
    .replace(/address[:\s]+[^\n]+/gi, '')
    .replace(/website[:\s]+[^\n]+/gi, '')
    .replace(/https?:\/\/[^\s\n]+/gi, '')
    .replace(/(\d{1,2})(?:st|nd|rd|th)?\s*(?:district|bezirk)/gi, '')
    .trim()
    .substring(0, 200)
  
  if (description.length === 200) {
    description += '...'
  }

  return {
    id: `community-${submission.id}`,
    name: submission.title,
    district,
    description: description || submission.title,
    notes: 'Community submitted',
    websiteUrl,
    address,
    category: 'community',
    isCurated: false,
    submittedAt: submission.created_at
  }
}

function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

export default function ViennaLocalPage() {
  const [communityListings, setCommunityListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCommunityListings = async () => {
      try {
        const response = await fetch('/api/local/submissions?location=vienna')
        const result = await response.json()
        
        if (result.success && result.data) {
          const parsed = result.data.map(parseSubmissionToListing)
          setCommunityListings(parsed)
        }
      } catch (error) {
        console.error('Error fetching community listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommunityListings()
  }, [])

  // Merge and deduplicate listings
  // Curated listings first, then community listings
  // Deduplicate by normalized name
  const allListings = [...curatedListings]
  
  const existingNames = new Set(
    curatedListings.map(l => l.name.toLowerCase().trim())
  )
  
  communityListings.forEach(listing => {
    const normalizedName = listing.name.toLowerCase().trim()
    if (!existingNames.has(normalizedName)) {
      allListings.push(listing)
      existingNames.add(normalizedName)
    }
  })

  // Group listings by category
  const groupedListings = allListings.reduce((acc, listing) => {
    const category = listing.category || 'community'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(listing)
    return acc
  }, {})

  // Sort within each category: curated first, then by name
  Object.keys(groupedListings).forEach(category => {
    groupedListings[category].sort((a, b) => {
      if (a.isCurated && !b.isCurated) return -1
      if (!a.isCurated && b.isCurated) return 1
      return a.name.localeCompare(b.name)
    })
  })

  const communityCount = communityListings.length

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
              <MapPin className="w-4 h-4" />
              <span>Local Support</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Vienna, Austria
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Local resources for people with coeliac disease in Vienna, including support organizations, gluten-free shops, restaurants, and medical facilities.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-10">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)'}}>
                <Heart className="w-6 h-6" style={{color: '#854F9B'}} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Community Contributed</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  These listings are curated from community recommendations and may change. Always verify current information, especially for dietary requirements. If you know of a resource that should be listed here, please let us know.
                </p>
                {communityCount > 0 && (
                  <p className="mt-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <Sparkles className="w-3 h-3" />
                      {communityCount} community submission{communityCount !== 1 ? 's' : ''} included
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-slate-500 text-sm">Loading community submissions...</p>
            </div>
          )}

          {/* Listings by Category */}
          {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
            const listings = groupedListings[categoryKey]
            if (!listings || listings.length === 0) return null

            const Icon = categoryInfo.icon

            return (
              <section key={categoryKey} className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)'}}>
                    <Icon className="w-5 h-5" style={{color: '#854F9B'}} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">{categoryInfo.label}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {listings.map((listing) => (
                    <div key={listing.id} className="relative">
                      {!listing.isCurated && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                            <Users className="w-3 h-3" />
                            Community
                          </span>
                        </div>
                      )}
                      <LocalListingCard
                        name={listing.name}
                        district={listing.district}
                        description={listing.description}
                        notes={listing.notes}
                        websiteUrl={listing.websiteUrl}
                        mapsUrl={listing.mapsUrl}
                        address={listing.address}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )
          })}

          {/* Disclaimer */}
          <div className="mt-12 p-6 rounded-xl border border-amber-200 bg-amber-50">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> The listings on this page are provided for informational purposes only. We do not endorse any specific business or service. Always inform staff about your dietary requirements and verify that products or meals are safe for your needs. Information may be outdated; please verify directly with the establishment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
