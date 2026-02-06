'use client'

import { ExternalLink, MapPin } from 'lucide-react'

/**
 * Generate OpenStreetMap URL from listing data
 * @param {Object} listing - The listing object
 * @returns {string} - OpenStreetMap URL
 */
function generateMapsUrl(listing) {
  if (listing.mapsUrl) {
    return listing.mapsUrl
  }
  
  // Construct query from available data - prioritize address for accuracy
  let query = ''
  
  if (listing.address) {
    // Use just the address for best results
    query = listing.address
  } else {
    // Fallback: construct from name and location
    const queryParts = [listing.name]
    if (listing.district) {
      queryParts.push(`${listing.district} district`)
    }
    queryParts.push('Vienna', 'Austria')
    query = queryParts.join(', ')
  }
  
  const encodedQuery = encodeURIComponent(query)
  // Use OpenStreetMap which is not blocked
  return `https://www.openstreetmap.org/search?query=${encodedQuery}`
}

/**
 * LocalListingCard Component
 * Displays a local support resource with district badge, description, and action buttons
 * 
 * @param {Object} props
 * @param {string} props.name - Name of the listing
 * @param {string} [props.district] - District number (e.g., "7th", "9th")
 * @param {string} [props.description] - Short description of the listing
 * @param {string} [props.notes] - Optional additional notes
 * @param {string} [props.websiteUrl] - URL to the listing's website
 * @param {string} [props.mapsUrl] - Direct Google Maps URL (optional, will be generated if not provided)
 * @param {string} [props.address] - Physical address (used for maps URL generation)
 */
export default function LocalListingCard({
  name,
  district,
  description,
  notes,
  websiteUrl,
  mapsUrl,
  address
}) {
  const finalMapsUrl = generateMapsUrl({ name, district, address, mapsUrl })

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Top row: Name and District Badge */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <h3 className="text-lg font-semibold text-slate-800 leading-tight flex-1 min-w-0">
          {name}
        </h3>
        {district && (
          <span 
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
            style={{ 
              backgroundColor: 'rgba(133, 79, 155, 0.08)', 
              color: '#854F9B' 
            }}
          >
            {district} district
          </span>
        )}
      </div>

      {/* Body: Description and Notes */}
      <div className="mb-4">
        {description && (
          <p className="text-slate-600 text-sm leading-relaxed">
            {description}
          </p>
        )}
        {notes && (
          <p className="text-slate-500 text-xs mt-2 leading-relaxed italic">
            {notes}
          </p>
        )}
      </div>

      {/* Actions row: Website and Google Maps buttons */}
      <div className="flex flex-wrap gap-2">
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ 
              background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)',
              '--tw-ring-color': '#854F9B'
            }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Website</span>
          </a>
        )}
        
        <a
          href={finalMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ 
            borderColor: 'rgba(133, 79, 155, 0.3)',
            color: '#854F9B',
            '--tw-ring-color': '#854F9B'
          }}
        >
          <MapPin className="w-4 h-4" />
          <span>View Map</span>
        </a>
      </div>
    </div>
  )
}
