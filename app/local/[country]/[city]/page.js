import LocalDirectory from '@/components/LocalDirectory'
import { notFound } from 'next/navigation'

// Location data for all 13 verified cities (83 total places)
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
  es: {
    name: 'Spain',
    cities: {
      barcelona: { name: 'Barcelona', description: 'Explore verified 100% gluten-free restaurants and tapas bars in Barcelona, Spain. Certified by the Catalan coeliac society.' },
      madrid: { name: 'Madrid', description: 'Find verified dedicated gluten-free restaurants and bakeries in Madrid, Spain.' }
    }
  },
  fr: {
    name: 'France',
    cities: {
      paris: { name: 'Paris', description: 'Discover the best verified gluten-free bakeries, restaurants, and cafes in Paris, France. Award-winning patisseries and dedicated GF Italian.' }
    }
  },
  gb: {
    name: 'United Kingdom',
    cities: {
      london: { name: 'London', description: 'Explore verified gluten-free restaurants and bakeries in London, UK. All places hand-checked for coeliac safety.' }
    }
  },
  hu: {
    name: 'Hungary',
    cities: {
      budapest: { name: 'Budapest', description: 'Find verified dedicated gluten-free restaurants with traditional Hungarian cuisine in Budapest.' }
    }
  },
  it: {
    name: 'Italy',
    cities: {
      milan: { name: 'Milan', description: 'Discover verified gluten-free restaurants, risotterias, and bakeries in Milan, Italy. AIC-certified venues.' },
      rome: { name: 'Rome', description: 'Explore verified gluten-free pizzerias, gelaterias, and restaurants in Rome, Italy. AIC-certified and dedicated GF venues.' }
    }
  },
  nl: {
    name: 'Netherlands',
    cities: {
      amsterdam: { name: 'Amsterdam', description: 'Find verified dedicated gluten-free restaurants and bakeries in Amsterdam, Netherlands.' }
    }
  },
  pl: {
    name: 'Poland',
    cities: {
      warsaw: { name: 'Warsaw', description: 'Discover verified gluten-free restaurants certified by the Polish Celiac Society in Warsaw.' }
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
