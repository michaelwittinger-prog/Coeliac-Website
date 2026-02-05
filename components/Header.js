'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'
import { BookOpen, FileText, HeartPulse, Users, Link2, Utensils, FlaskConical, Info } from 'lucide-react'

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

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded flex items-center justify-center transform group-hover:scale-105 transition-transform" style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}>
                <span className="text-white font-semibold text-lg">C</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-75" style={{backgroundColor: '#854F9B'}}></div>
            </div>
            <div>
              <span className="text-lg font-semibold text-slate-800 block leading-none">Coeliac Info Hub</span>
              <span className="text-xs text-slate-500">Evidence-based information</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-slate-600 hover:bg-opacity-10 nav-link-hover'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
