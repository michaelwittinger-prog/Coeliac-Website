import Link from 'next/link'
import { BookMarked, ArrowRight } from 'lucide-react'

export default function RelatedReading({ links }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <BookMarked className="w-5 h-5 text-purple-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Related Reading</h2>
      </div>
      <div className="space-y-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group flex items-center justify-between p-4 rounded-lg hover:bg-purple-50 transition-all border border-transparent hover:border-purple-200"
          >
            <span className="font-medium text-slate-700 group-hover:text-purple-700 transition-colors">{link.title}</span>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  )
}