import LocalDirectory from '@/components/LocalDirectory'
import { notFound } from 'next/navigation'

// Location data for all 20 European cities
const LOCATIONS = {
  at: {
    name: 'Austria',
    cities: {
      vienna: { name: 'Vienna', description: 'Find gluten-free restaurants, shops, and coeliac support in Vienna, Austria.' }
    }
  },
  be: {
    name: 'Belgium',
    cities: {
      brussels: { name: 'Brussels', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Brussels, Belgium.' }
    }
  },
  bg: {
    name: 'Bulgaria',
    cities: {
      sofia: { name: 'Sofia', description: 'Find gluten-free restaurants, shops, and coeliac support in Sofia, Bulgaria.' }
    }
  },
  cz: {
    name: 'Czech Republic',
    cities: {
      prague: { name: 'Prague', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Prague, Czech Republic.' }
    }
  },
  de: {
    name: 'Germany',
    cities: {
      berlin: { name: 'Berlin', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Berlin, Germany.' },
      hamburg: { name: 'Hamburg', description: 'Find gluten-free restaurants, shops, and coeliac support in Hamburg, Germany.' },
      munich: { name: 'Munich', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Munich, Germany.' }
    }
  },
  es: {
    name: 'Spain',
    cities: {
      barcelona: { name: 'Barcelona', description: 'Find gluten-free restaurants, shops, and coeliac support in Barcelona, Spain.' },
      madrid: { name: 'Madrid', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Madrid, Spain.' }
    }
  },
  fr: {
    name: 'France',
    cities: {
      paris: { name: 'Paris', description: 'Find gluten-free restaurants, bakeries, and coeliac support in Paris, France.' }
    }
  },
  gb: {
    name: 'United Kingdom',
    cities: {
      london: { name: 'London', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in London, UK.' }
    }
  },
  hu: {
    name: 'Hungary',
    cities: {
      budapest: { name: 'Budapest', description: 'Find gluten-free restaurants, shops, and coeliac support in Budapest, Hungary.' }
    }
  },
  it: {
    name: 'Italy',
    cities: {
      milan: { name: 'Milan', description: 'Find gluten-free restaurants, shops, and coeliac support in Milan, Italy.' },
      rome: { name: 'Rome', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Rome, Italy.' }
    }
  },
  nl: {
    name: 'Netherlands',
    cities: {
      amsterdam: { name: 'Amsterdam', description: 'Find gluten-free restaurants, shops, and coeliac support in Amsterdam, Netherlands.' }
    }
  },
  pl: {
    name: 'Poland',
    cities: {
      warsaw: { name: 'Warsaw', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Warsaw, Poland.' }
    }
  },
  ro: {
    name: 'Romania',
    cities: {
      bucharest: { name: 'Bucharest', description: 'Find gluten-free restaurants, shops, and coeliac support in Bucharest, Romania.' }
    }
  },
  ru: {
    name: 'Russia',
    cities: {
      moscow: { name: 'Moscow', description: 'Find gluten-free restaurants, shops, and coeliac support in Moscow, Russia.' },
      'saint-petersburg': { name: 'Saint Petersburg', description: 'Discover gluten-free bakeries, restaurants, and healthcare providers in Saint Petersburg, Russia.' }
    }
  },
  tr: {
    name: 'Turkey',
    cities: {
      istanbul: { name: 'Istanbul', description: 'Find gluten-free restaurants, shops, and coeliac support in Istanbul, Turkey.' }
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
      pageTitle={`Local Support in ${cityData.name}`}
      pageDescription={cityData.description}
    />
  )
}
