'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't track admin pages or API routes
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/api')) {
      return
    }

    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || null
          })
        })
      } catch (err) {
        // Silent fail - don't disrupt user experience
        console.debug('Page view tracking failed:', err)
      }
    }

    // Small delay to not block initial render
    const timer = setTimeout(trackPageView, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  // This component doesn't render anything
  return null
}
