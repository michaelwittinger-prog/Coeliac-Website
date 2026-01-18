import Link from 'next/link'

export default function RelatedReading({ links }) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md border border-purple-100">
      <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center space-x-2">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>Related Reading</span>
      </h2>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition-colors group"
            >
              <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-medium">{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}