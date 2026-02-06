'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { User, LogIn } from 'lucide-react'

export default function AuthButton() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  if (loading) {
    return (
      <div className="w-9 h-9 rounded-lg bg-slate-100 animate-pulse"></div>
    )
  }

  if (user) {
    return (
      <Link
        href="/account"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-all"
        title={user.email}
      >
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}>
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden xl:inline max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
      </Link>
    )
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:shadow-md"
      style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
    >
      <LogIn className="w-4 h-4" />
      <span>Sign In</span>
    </Link>
  )
}
