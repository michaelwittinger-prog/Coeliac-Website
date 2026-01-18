import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Celiac Disease Information Hub',
  description: 'Comprehensive information about Celiac disease, diagnosis, treatment, and living with the condition',
}

const navLinks = [
  { href: '/understanding', label: 'Understanding' },
  { href: '/diagnosis-marsh', label: 'Diagnosis & Marsh' },
  { href: '/healing', label: 'Healing' },
  { href: '/parents', label: 'Parents' },
  { href: '/related', label: 'Related' },
  { href: '/living', label: 'Living' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white">
          {/* Header Navigation */}
          <header className="bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="text-xl font-bold text-purple-900">Celiac Info Hub</span>
                </Link>
                
                <nav className="hidden md:flex space-x-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-100 hover:text-purple-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile menu button */}
                <button className="md:hidden p-2 rounded-md text-purple-700 hover:bg-purple-100">
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
          <footer className="bg-white border-t border-purple-100 mt-16">
            <div className="container mx-auto px-4 py-8">
              <MedicalDisclaimer />
              <div className="mt-8 pt-8 border-t border-purple-100 text-center text-sm text-purple-600">
                <p>&copy; {new Date().getFullYear()} Celiac Information Hub. All rights reserved.</p>
                <p className="mt-2">For educational purposes only.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}