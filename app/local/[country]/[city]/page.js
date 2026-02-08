import LocalDirectory from '@/components/LocalDirectory'
import { notFound } from 'next/navigation'

// Location data for verified cities only (5 cities, 29 total places)
const LOCATIONS = {
  at: {
    name: 'Austria',
    cities: {
      vienna: { name: 'Vienna', description: 'Discover verified gluten-free restaurants, bakeries, cafes, and coeliac support resources in Vienna, Austria.' }
    }
  },
  cz: {
    name: 'Czech Republic',
    cities: {
      prague: { name: 'Prague', description: 'Discover verified gluten-free restaurants and bakeries in Prague, Czech Republic. All places hand-checked for coeliac safety.' }
    }
  },
  de: {
    name: 'Germany',
    cities: {
      berlin: { name: 'Berlin', description: 'Find verified gluten-free bakeries, restaurants, and coeliac community resources in Berlin, Germany.' },
      munich: { name: 'Munich', description: 'Find verified gluten-free cafes and restaurants in Munich, Germany. All places hand-checked for coeliac safety.' }
    }
  },
  gb: {
    name: 'United Kingdom',
    cities: {
      london: { name: 'London', description: 'Explore verified gluten-free restaurants and bakeries in London, UK. All places hand-checked for coeliac safety.' }
    }
  }
}

export async function generateMetadata({ params }) {
  const { country, city } = await params
  const countryData = LOCATIONS[country?.toLowerCase()]
  const cityData = countryData?.cities[city?.toLowerCase()]

  if (!cityData) {
    return { title: 'Location Not Found' }
  }

  return {
    title: `Verified Gluten-Free Places in ${cityData.name}, ${countryData.name} - Coeliac Connect`,
    description: cityData.description,
    keywords: `coeliac, celiac, gluten-free, ${cityData.name}, ${countryData.name}, restaurants, bakeries, verified`
  }
}

export async function generateStaticParams() {
  const params = []
  for (const [countryCode, countryData] of Object.entries(LOCATIONS)) {
    for (const citySlug of Object.keys(countryData.cities)) {
      params.push({ country: countryCode, city: citySlug })
    }
  }
  return params
}

export default async function CityLocalPage({ params }) {
  const { country, city } = await params
  const countryCode = country?.toUpperCase()
  const citySlug = city?.toLowerCase()
  
  const countryData = LOCATIONS[country?.toLowerCase()]
  const cityData = countryData?.cities[citySlug]

  if (!cityData) {
    notFound()
  }

  return (
    <LocalDirectory 
      initialCountry={countryCode}
      initialCity={citySlug}
      showLocationFilters={false}
      pageTitle={`Verified Places in ${cityData.name}`}
      pageDescription={cityData.description}
    />
  )
}
