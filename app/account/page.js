'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { User, Mail, LogOut, ArrowLeft, Shield, Calendar } from 'lucide-react'

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login')
          return
        }
        
        setUser(session.user)
      } catch (error) {
        console.error('Error checking session:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        } else if (session) {
          setUser(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-[80vh] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Account</h1>
          <p className="text-slate-600 mt-2">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="h-24 relative" style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 50%, #b388c5 100%)' }}>
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                <User className="w-10 h-10 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-14 px-8 pb-8">
            {/* User Info */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" style={{ color: '#854F9B' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-500">Email Address</p>
                  <p className="text-lg font-semibold text-slate-900 truncate">{user.email}</p>
                </div>
              </div>

              {/* Email Verification Status */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${user.email_confirmed_at ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <Shield className={`w-5 h-5 ${user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">Email Status</p>
                  <p className={`text-lg font-semibold ${user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user.email_confirmed_at ? 'Verified' : 'Pending Verification'}
                  </p>
                </div>
              </div>

              {/* Account Created */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">Member Since</p>
                  <p className="text-lg font-semibold text-slate-900">{formatDate(user.created_at)}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-slate-200"></div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loggingOut ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing Out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-100">
          <h3 className="font-semibold text-slate-900 mb-2">Welcome to Coeliac Information Hub</h3>
          <p className="text-slate-600 text-sm">
            As a registered member, you have access to all our resources about living with Coeliac disease. 
            Explore our guides, connect with local support groups, and stay informed about the latest research.
          </p>
        </div>
      </div>
    </div>
  )
}
