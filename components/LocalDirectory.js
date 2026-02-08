'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { 
  MapPin, Building2, Coffee, Cake, Hotel, 
  Stethoscope, Heart, Pill, Hospital, ShoppingBag, 
  Calendar, Users, MoreHorizontal, Filter, X, Globe,
  ExternalLink, Map, Sparkles, ChevronDown, Plus
} from 'lucide-react'

// Location data
const LOCATIONS = {
  AT: {
    name: 'Austria',
    flag: '🇦🇹',
    cities: [
      { slug: 'vienna', name: 'Vienna' }
    ]
  },
  DE: {
    name: 'Germany', 
    flag: '🇩🇪',
    cities: [
      { slug: 'berlin', name: 'Berlin' }
    ]
  }
}

// Category configuration
const CATEGORIES = {
  restaurant: { label: 'Restaurant', icon: Building2, color: 'bg-orange-100 text-orange-700' },
  cafe: { label: 'Café', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
  bakery: { label: 'Bakery', icon: Cake, color: 'bg-pink-100 text-pink-700' },
  hotel: { label: 'Hotel', icon: Hotel, color: 'bg-blue-100 text-blue-700' },
  doctor: { label: 'Doctor', icon: Stethoscope, color: 'bg-teal-100 text-teal-700' },
  dietitian: { label: 'Dietitian', icon: Heart, color: 'bg-rose-100 text-rose-700' },
  pharmacy: { label: 'Pharmacy', icon: Pill, color: 'bg-green-100 text-green-700' },
  hospital: { label: 'Hospital', icon: Hospital, color: 'bg-red-100 text-red-700' },
  shop: { label: 'Shop', icon: ShoppingBag, color: 'bg-violet-100 text-violet-700' },
  event: { label: 'Event', icon: Calendar, color: 'bg-indigo-100 text-indigo-700' },
  community: { label: 'Community', icon: Users, color: 'bg-purple-100 text-purple-700' },
  other: { label: 'Other', icon: MoreHorizontal, color: 'bg-slate-100 text-slate-700' }
}

function generateMapsUrl(listing) {
  if (listing.maps_url) return listing.maps_url
  if (!listing.address) return null
  const query = encodeURIComponent(listing.address)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

function ListingCard({ listing }) {
  const categoryConfig = CATEGORIES[listing.category] || CATEGORIES.other
  const CategoryIcon = categoryConfig.icon
  const mapsUrl = generateMapsUrl(listing)

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow relative">
      {listing.source === 'community' && (
        <div className="absolute -top-2 -right-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            <Sparkles className="w-3 h-3" />
            Community
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${categoryConfig.color}`}>
          <CategoryIcon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-slate-900">{listing.name}</h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${categoryConfig.color}`}>
              {categoryConfig.label}
            </span>
            {listing.district && (
              <span className="text-xs text-slate-500">{listing.district}</span>
            )}
          </div>
          
          {listing.description && (
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">{listing.description}</p>
          )}
          
          {listing.address && (
            <p className="text-xs text-slate-500 mb-3 flex items-start gap-1">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
              {listing.address}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {listing.website_url && (
              <a
                href={listing.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Website
              </a>
            )}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Map className="w-3 h-3" />
                Map
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LocalDirectory({ 
  initialCountry = null, 
  initialCity = null,
  showLocationFilters = true,
  pageTitle = null,
  pageDescription = null
}) {
  return (
    <Suspense fallback={<DirectoryLoadingState />}>
      <LocalDirectoryContent
        initialCountry={initialCountry}
        initialCity={initialCity}
        showLocationFilters={showLocationFilters}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
    </Suspense>
  )
}

function DirectoryLoadingState() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="h-6 w-32 bg-slate-200 rounded-full animate-pulse mb-4"></div>
            <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mb-3"></div>
            <div className="h-6 w-96 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LocalDirectoryContent({ 
  initialCountry = null, 
  initialCity = null,
  showLocationFilters = true,
  pageTitle = null,
  pageDescription = null
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(initialCountry || searchParams.get('country') || '')
  const [selectedCity, setSelectedCity] = useState(initialCity || searchParams.get('city') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  
  // Check for logged-in user
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])
  
  // Get available cities based on selected country
  const availableCities = selectedCountry && LOCATIONS[selectedCountry] 
    ? LOCATIONS[selectedCountry].cities 
    : []

  // Update URL when filters change (only if showLocationFilters is true)
  useEffect(() => {
    if (!showLocationFilters) return
    
    const params = new URLSearchParams()
    if (selectedCountry) params.set('country', selectedCountry)
    if (selectedCity) params.set('city', selectedCity)
    if (selectedCategory) params.set('category', selectedCategory)
    
    const newUrl = params.toString() ? `/local?${params.toString()}` : '/local'
    router.replace(newUrl, { scroll: false })
  }, [selectedCountry, selectedCity, selectedCategory, showLocationFilters, router])

  // Reset city when country changes
  useEffect(() => {
    if (showLocationFilters && selectedCountry) {
      const cities = LOCATIONS[selectedCountry]?.cities || []
      if (!cities.find(c => c.slug === selectedCity)) {
        setSelectedCity('')
      }
    }
  }, [selectedCountry, selectedCity, showLocationFilters])

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedCountry) params.set('country', selectedCountry)
        if (selectedCity) params.set('city', selectedCity)
        if (selectedCategory) params.set('category', selectedCategory)
        
        const response = await fetch(`/api/local/listings?${params.toString()}`)
        const result = await response.json()
        
        if (result.success) {
          setListings(result.data || [])
        }
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [selectedCountry, selectedCity, selectedCategory])

  const clearFilters = () => {
    if (!showLocationFilters) {
      setSelectedCategory('')
    } else {
      setSelectedCountry('')
      setSelectedCity('')
      setSelectedCategory('')
    }
  }

  const hasFilters = showLocationFilters 
    ? (selectedCountry || selectedCity || selectedCategory)
    : selectedCategory

  // Group listings by category for display
  const groupedListings = listings.reduce((acc, listing) => {
    const cat = listing.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(listing)
    return acc
  }, {})

  const locationDisplay = selectedCity && selectedCountry
    ? `${LOCATIONS[selectedCountry]?.cities.find(c => c.slug === selectedCity)?.name || selectedCity}, ${LOCATIONS[selectedCountry]?.name}`
    : selectedCountry
      ? LOCATIONS[selectedCountry]?.name
      : 'All Locations'

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
              <MapPin className="w-4 h-4" />
              <span>Local Support</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              {pageTitle || 'Local Support Directory'}
            </h1>
            <p className="text-lg text-slate-600">
              {pageDescription || 'Find gluten-free friendly restaurants, shops, healthcare providers, and community support near you.'}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filters</span>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              {/* Country Filter */}
              {showLocationFilters && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Country</label>
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-3 py-2 pr-8 border border-slate-200 rounded-lg text-sm bg-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">All Countries</option>
                      {Object.entries(LOCATIONS).map(([code, loc]) => (
                        <option key={code} value={code}>{loc.flag} {loc.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* City Filter */}
              {showLocationFilters && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">City</label>
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedCountry}
                      className="w-full px-3 py-2 pr-8 border border-slate-200 rounded-lg text-sm bg-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-50 disabled:text-slate-400"
                    >
                      <option value="">All Cities</option>
                      {availableCities.map((city) => (
                        <option key={city.slug} value={city.slug}>{city.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div className={!showLocationFilters ? 'md:col-span-3' : ''}>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 pr-8 border border-slate-200 rounded-lg text-sm bg-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Categories</option>
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Location Links (only on main directory) */}
          {showLocationFilters && !selectedCountry && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-slate-500 mb-3">Browse by Location</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(LOCATIONS).map(([countryCode, country]) => (
                  country.cities.map((city) => (
                    <Link
                      key={`${countryCode}-${city.slug}`}
                      href={`/local/${countryCode.toLowerCase()}/${city.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <span>{country.flag}</span>
                      <span>{city.name}</span>
                    </Link>
                  ))
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          ) : listings.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No listings found</h3>
              <p className="text-slate-600 mb-4">
                {hasFilters 
                  ? 'Try adjusting your filters to see more results.'
                  : 'No listings are available yet.'}
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500">
                  Showing <span className="font-medium text-slate-700">{listings.length}</span> listings
                  {!showLocationFilters && pageTitle && ` in ${pageTitle.replace('Local Support in ', '')}`}
                </p>
              </div>

              {/* Display by category */}
              {Object.entries(groupedListings).map(([category, categoryListings]) => {
                const catConfig = CATEGORIES[category] || CATEGORIES.other
                const CatIcon = catConfig.icon
                
                return (
                  <div key={category} className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${catConfig.color}`}>
                        <CatIcon className="w-4 h-4" />
                      </div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {catConfig.label}s
                      </h2>
                      <span className="text-sm text-slate-500">({categoryListings.length})</span>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {categoryListings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-12 p-6 rounded-xl border border-amber-200 bg-amber-50">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> These listings are provided for informational purposes only. Always verify current gluten-free options directly with establishments, as menus and policies can change. Community submissions are reviewed but not independently verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
