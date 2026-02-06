import LocalDirectory from '@/components/LocalDirectory'
import { notFound } from 'next/navigation'

// Location data for metadata generation
const LOCATIONS = {
  at: {
    name: 'Austria',
    cities: {
      vienna: { name: 'Vienna', description: 'Find gluten-free restaurants, shops, and coeliac support in Vienna, Austria.' }
    }
  },
  de: {
    name: 'Germany',
    cities: {
      berlin: { name: 'Berlin', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Berlin, Germany.' }
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
    title: `Local Support in ${cityData.name}, ${countryData.name} - Coeliac Information Hub`,
    description: cityData.description,
    keywords: `coeliac, celiac, gluten-free, ${cityData.name}, ${countryData.name}, restaurants, shops, support`
  }
}

export async function generateStaticParams() {
  return [
    { country: 'at', city: 'vienna' },
    { country: 'de', city: 'berlin' }
  ]
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
      pageTitle={`Local Support in ${cityData.name}`}
      pageDescription={cityData.description}
    />
  )
}
