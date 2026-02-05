import LocalListingCard from '@/components/LocalListingCard'
import { MapPin, Building2, Heart } from 'lucide-react'

export const metadata = {
  title: 'Local Support in Vienna - Coeliac Information Hub',
  description: 'Find local coeliac disease support resources, gluten-free shops, restaurants, and medical facilities in Vienna, Austria.',
  keywords: 'coeliac disease, celiac disease, vienna, austria, gluten-free, local support, restaurants, shops, medical',
}

// Sample data for Vienna local support listings
const viennaListings = [
  {
    id: 1,
    name: 'Österreichische Arbeitsgemeinschaft Zöliakie',
    district: '9th',
    description: 'The Austrian Coeliac Society providing support, information, and advocacy for people with coeliac disease throughout Austria.',
    notes: 'Membership includes access to product guides and local events',
    websiteUrl: 'https://www.zoeliakie.or.at/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Österreichische+Arbeitsgemeinschaft+Zöliakie+Vienna',
    category: 'organization'
  },
  {
    id: 2,
    name: 'Denn\'s Biomarkt - Mariahilfer Straße',
    district: '7th',
    description: 'Organic supermarket with extensive gluten-free section including fresh bread, pasta, and specialty items.',
    notes: 'Staff knowledgeable about gluten-free products',
    websiteUrl: 'https://www.denns-biomarkt.at/',
    address: 'Mariahilfer Straße 45, 1060 Wien',
    category: 'shop'
  },
  {
    id: 3,
    name: 'Reformhaus Martin',
    district: '1st',
    description: 'Health food store in the city center with a dedicated gluten-free aisle and knowledgeable staff.',
    websiteUrl: 'https://www.reformhaus-martin.at/',
    address: 'Kärntner Straße 26, 1010 Wien',
    category: 'shop'
  },
  {
    id: 4,
    name: 'Swing Kitchen',
    district: '1st',
    description: 'Vegan fast food chain with clearly marked gluten-free options and staff trained in allergen awareness.',
    notes: 'Multiple locations across Vienna',
    websiteUrl: 'https://www.swingkitchen.com/',
    address: 'Schottenfeldgasse 3, 1070 Wien',
    category: 'restaurant'
  },
  {
    id: 5,
    name: 'AKH Wien - Gastroenterologie',
    district: '9th',
    description: 'Vienna General Hospital gastroenterology department with specialists experienced in coeliac disease diagnosis and management.',
    notes: 'Referral from GP typically required',
    websiteUrl: 'https://www.akhwien.at/',
    address: 'Währinger Gürtel 18-20, 1090 Wien',
    category: 'medical'
  },
  {
    id: 6,
    name: 'Bio Company - Prater',
    district: '2nd',
    description: 'Large organic supermarket near Prater with comprehensive gluten-free product range.',
    websiteUrl: 'https://www.biocompany.de/',
    address: 'Praterstraße 42, 1020 Wien',
    category: 'shop'
  },
  {
    id: 7,
    name: 'Tian Bistro',
    district: '1st',
    description: 'Upscale vegetarian restaurant with dedicated gluten-free menu options and allergy-aware kitchen practices.',
    notes: 'Reservations recommended',
    websiteUrl: 'https://www.tian-bistro.com/',
    address: 'Himmelpfortgasse 23, 1010 Wien',
    category: 'restaurant'
  },
  {
    id: 8,
    name: 'Stiftung Kindergesundheit',
    district: '3rd',
    description: 'Foundation supporting children\'s health including resources for paediatric coeliac disease.',
    websiteUrl: 'https://www.kindergesundheit.at/',
    category: 'organization'
  }
]

// Group listings by category
const categories = {
  organization: { label: 'Support Organizations', icon: Heart },
  shop: { label: 'Gluten-Free Shops', icon: Building2 },
  restaurant: { label: 'Restaurants & Cafés', icon: Building2 },
  medical: { label: 'Medical Facilities', icon: Building2 }
}

export default function ViennaLocalPage() {
  const groupedListings = viennaListings.reduce((acc, listing) => {
    const category = listing.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(listing)
    return acc
  }, {})

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
              </div>
            </div>
          </div>

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
                    <LocalListingCard
                      key={listing.id}
                      name={listing.name}
                      district={listing.district}
                      description={listing.description}
                      notes={listing.notes}
                      websiteUrl={listing.websiteUrl}
                      mapsUrl={listing.mapsUrl}
                      address={listing.address}
                    />
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
