import LocalDirectory from '@/components/LocalDirectory'

export const metadata = {
  title: 'Local Support Directory - Coeliac Information Hub',
  description: 'Find gluten-free restaurants, shops, bakeries, healthcare providers, and community support for coeliac disease across Europe.',
  keywords: 'coeliac, celiac, gluten-free, restaurants, shops, bakeries, doctors, support groups, Europe, Austria, Germany'
}

export default function LocalPage() {
  return <LocalDirectory showLocationFilters={true} />
}
