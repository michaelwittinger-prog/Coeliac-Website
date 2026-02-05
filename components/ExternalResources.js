import { ExternalLink } from 'lucide-react'

export default function ExternalResources({ links, title = "Trusted External Resources" }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)'}}>
          <ExternalLink className="w-5 h-5" style={{color: '#854F9B'}} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
      <p className="text-sm text-slate-600 mb-6">
        Authoritative organisations providing evidence-based information and support for coeliac disease.
      </p>
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex items-start justify-between p-4 rounded-lg transition-all border border-slate-200 bg-white external-link-hover"
            title={`Visit ${link.title} - Opens in new window`}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-slate-800 group-hover-text transition-colors">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover-external-icon transition-colors" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{link.description}</p>
              {link.region && (
                <span className="inline-block mt-2 text-xs px-2 py-1 rounded" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
                  {link.region}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Note:</strong> External links are provided for informational purposes. We are not responsible for the content of external websites. Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  )
}
