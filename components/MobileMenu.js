'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { X, BookOpen, FileText, HeartPulse, Users, Link2, Utensils, FlaskConical, Info, Home, MapPin } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/understanding', label: 'Understanding', icon: BookOpen },
  { href: '/diagnosis-marsh', label: 'Diagnosis & Marsh', icon: FileText },
  { href: '/healing', label: 'Healing', icon: HeartPulse },
  { href: '/parents', label: 'Parents', icon: Users },
  { href: '/related', label: 'Related', icon: Link2 },
  { href: '/living', label: 'Living', icon: Utensils },
  { href: '/research', label: 'Research', icon: FlaskConical },
  { href: '/local/austria/vienna', label: 'Local Support', icon: MapPin },
  { href: '/about', label: 'About', icon: Info },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuPanelRef = useRef(null)
  const buttonRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Handle scroll lock
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position and lock
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle outside click on overlay
  const handleOverlayClick = useCallback((e) => {
    // Only close if clicking the overlay itself, not the menu panel
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setIsOpen(false)
    // Use setTimeout to ensure menu closes before navigation
    setTimeout(() => {
      router.push(href)
    }, 10)
  }, [router])

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay and Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden"
          aria-hidden="true"
        >
          {/* Semi-transparent backdrop - clickable to close */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer transition-opacity duration-300" 
            onClick={closeMenu}
            aria-label="Close menu"
          />

          {/* Menu Panel - slides in from right */}
          <div
            ref={menuPanelRef}
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute top-0 right-0 h-full w-[300px] max-w-[85vw] shadow-2xl overflow-y-auto overflow-x-hidden"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f8f7fc 50%, #f3f0f7 100%)'
            }}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none" style={{background: 'radial-gradient(circle, rgba(133, 79, 155, 0.3) 0%, transparent 70%)'}} />
            <div className="absolute bottom-20 left-0 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none" style={{background: 'radial-gradient(circle, rgba(133, 79, 155, 0.4) 0%, transparent 70%)'}} />

            {/* Menu Header */}
            <div className="relative sticky top-0 px-5 py-5 flex items-center justify-between" style={{background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.95) 100%)', backdropFilter: 'blur(10px)'}}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}>
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <span className="text-base font-semibold text-slate-800 block">Navigate</span>
                  <span className="text-xs text-slate-500">Coeliac Info Hub</span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white/80 active:bg-slate-100 transition-all cursor-pointer touch-manipulation shadow-sm border border-slate-200/50"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider with accent */}
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

            {/* Navigation Links */}
            <nav className="relative px-4 py-5">
              <ul className="space-y-1.5">
                {navLinks.map((link, index) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`group flex items-center space-x-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all cursor-pointer touch-manipulation ${
                          isActive
                            ? 'shadow-md'
                            : 'hover:bg-white/70 active:bg-white/90 hover:shadow-sm'
                        }`}
                        style={{ 
                          WebkitTapHighlightColor: 'transparent',
                          ...(isActive ? {
                            background: 'linear-gradient(135deg, rgba(133, 79, 155, 0.12) 0%, rgba(133, 79, 155, 0.06) 100%)',
                            borderLeft: '3px solid #854F9B'
                          } : {})
                        }}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                          isActive 
                            ? 'shadow-sm' 
                            : 'group-hover:scale-105'
                        }`}
                        style={{
                          background: isActive 
                            ? 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' 
                            : 'rgba(133, 79, 155, 0.08)'
                        }}>
                          <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-purple-600/70'}`} style={{width: '18px', height: '18px'}} />
                        </div>
                        <span className={isActive ? 'text-purple-800' : 'text-slate-700'}>{link.label}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 rounded-full" style={{background: '#854F9B'}} />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer in menu */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-5 border-t border-purple-100/50" style={{background: 'linear-gradient(180deg, rgba(243, 240, 247, 0.5) 0%, rgba(243, 240, 247, 0.9) 100%)'}}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{background: '#854F9B'}} />
                <div className="w-1 h-1 rounded-full" style={{background: '#854F9B', opacity: 0.5}} />
                <div className="w-1.5 h-1.5 rounded-full" style={{background: '#854F9B'}} />
              </div>
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                Evidence-based coeliac disease information
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
