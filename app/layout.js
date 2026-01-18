import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'
import { Home, BookOpen, FileText, HeartPulse, Users, Link2, Utensils, FlaskConical, Info } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Celiac Disease Information Hub',
  description: 'Comprehensive information about Celiac disease, diagnosis, treatment, and living with the condition',
}

const navLinks = [
  { href: '/understanding', label: 'Understanding', icon: BookOpen },
  { href: '/diagnosis-marsh', label: 'Diagnosis & Marsh', icon: FileText },
  { href: '/healing', label: 'Healing', icon: HeartPulse },
  { href: '/parents', label: 'Parents', icon: Users },
  { href: '/related', label: 'Related', icon: Link2 },
  { href: '/living', label: 'Living', icon: Utensils },
  { href: '/research', label: 'Research', icon: FlaskConical },
  { href: '/about', label: 'About', icon: Info },
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-slate-50">
          {/* Header Navigation */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded flex items-center justify-center transform group-hover:scale-105 transition-transform">
                      <span className="text-white font-semibold text-lg">C</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full opacity-75"></div>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-slate-800 block leading-none">Celiac Info Hub</span>
                    <span className="text-xs text-slate-500">Evidence-based information</span>
                  </div>
                </Link>
                
                <nav className="hidden lg:flex items-center space-x-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-1.5 px-3 py-2 rounded text-sm font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{link.label}</span>
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile menu button */}
                <button className="lg:hidden p-2 rounded text-slate-600 hover:bg-slate-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 mt-20">
            <div className="container mx-auto px-4 py-12">
              <MedicalDisclaimer />
              
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">C</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700">Celiac Information Hub</span>
                  </div>
                  <div className="text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} All rights reserved. For educational purposes only.</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}