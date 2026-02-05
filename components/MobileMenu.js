'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { X, BookOpen, FileText, HeartPulse, Users, Link2, Utensils, FlaskConical, Info, Home } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/understanding', label: 'Understanding', icon: BookOpen },
  { href: '/diagnosis-marsh', label: 'Diagnosis & Marsh', icon: FileText },
  { href: '/healing', label: 'Healing', icon: HeartPulse },
  { href: '/parents', label: 'Parents', icon: Users },
  { href: '/related', label: 'Related', icon: Link2 },
  { href: '/living', label: 'Living', icon: Utensils },
  { href: '/research', label: 'Research', icon: FlaskConical },
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer" 
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
            className="absolute top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
          >
            {/* Menu Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded flex items-center justify-center" style={{background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)'}}>
                  <span className="text-white font-semibold text-sm">C</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">Menu</span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="px-2 py-4">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer touch-manipulation ${
                          isActive
                            ? 'bg-purple-50 text-purple-700'
                            : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-slate-500'}`} />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer in menu */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-slate-200 bg-slate-50">
              <p className="text-xs text-slate-500 text-center">
                Evidence-based coeliac disease information
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
