import LocalDirectory from '@/components/LocalDirectory'
import { notFound } from 'next/navigation'

// Location data for verified cities (45 places from spreadsheet)
const LOCATIONS = {
  at: {
    name: 'Austria',
    cities: {
      vienna: { name: 'Vienna', description: 'Discover 11 verified gluten-free restaurants, bakeries, and cafes in Vienna, Austria. All places have real addresses and website links.' }
    }
  },
  cz: {
    name: 'Czech Republic',
    cities: {
      prague: { name: 'Prague', description: 'Find 5 verified gluten-free restaurants and bakeries in Prague, Czech Republic. Including 100% dedicated GF venues.' }
    }
  },
  de: {
    name: 'Germany',
    cities: {
      munich: { name: 'Munich', description: 'Explore 5 verified gluten-free cafes and restaurants in Munich, Germany. Including Palmtreeclub - 100% dedicated GF.' }
    }
  },
  es: {
    name: 'Spain',
    cities: {
      madrid: { name: 'Madrid', description: 'Browse 19 verified gluten-free restaurants, bakeries, and tapas bars in Madrid, Spain. The largest GF directory in our network.' }
    }
  },
  gb: {
    name: 'United Kingdom',
    cities: {
      london: { name: 'London', description: 'Discover 5 verified gluten-free restaurants and bakeries in London, UK. Including 100% dedicated GF venues.' }
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
