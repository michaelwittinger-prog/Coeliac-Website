'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { User, Mail, LogOut, ArrowLeft, Shield, Calendar, FileText, Clock, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react'

const STATUS_CONFIG = {
  pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
}

const TYPE_LABELS = {
  local_resource: 'Local Resource',
  recipe: 'Recipe',
  tip: 'Living Tip',
  experience: 'Personal Experience',
  correction: 'Correction',
  other: 'Other',
}

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loadingSubmissions, setLoadingSubmissions] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  
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
        
        // Check admin status
        try {
          const res = await fetch('/api/admin/check')
          const data = await res.json()
          setIsAdmin(data.isAdmin)
        } catch (e) {
          console.error('Admin check failed:', e)
        }
        
        // Fetch user's submissions
        fetchSubmissions(session.user.id)
      } catch (error) {
        console.error('Error checking session:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        } else if (session) {
          setUser(session.user)
          fetchSubmissions(session.user.id)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  const fetchSubmissions = async (userId) => {
    setLoadingSubmissions(true)
    try {
      const { data, error } = await supabase
        .from('user_submissions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching submissions:', error)
      } else {
        setSubmissions(data || [])
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoadingSubmissions(false)
    }
  }

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
    return null
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatDateTime = (dateString) => {
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
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Account</h1>
            <p className="text-slate-600 mt-2">Manage your account and submissions</p>
          </div>
          {isAdmin && (
            <Link
              href="/admin/submissions"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </Link>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
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
            <div className="grid gap-4 md:grid-cols-2">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" style={{ color: '#854F9B' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-500">Email Address</p>
                  <p className="text-base font-semibold text-slate-900 truncate">{user.email}</p>
                </div>
              </div>

              {/* Email Verification Status */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${user.email_confirmed_at ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <Shield className={`w-5 h-5 ${user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">Email Status</p>
                  <p className={`text-base font-semibold ${user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`}>
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
                  <p className="text-base font-semibold text-slate-900">{formatDate(user.created_at)}</p>
                </div>
              </div>

              {/* Submissions Count */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" style={{ color: '#854F9B' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">Submissions</p>
                  <p className="text-base font-semibold text-slate-900">{submissions.length} total</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
              >
                <Plus className="w-5 h-5" />
                New Submission
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* My Submissions */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">My Submissions</h2>
            <p className="text-slate-600 text-sm mt-1">Track the status of your community contributions</p>
          </div>
          
          <div className="p-8">
            {loadingSubmissions ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No submissions yet</h3>
                <p className="text-slate-600 mb-6">Share your knowledge with the coeliac community</p>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Submission
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => {
                  const statusConfig = STATUS_CONFIG[submission.status] || STATUS_CONFIG.pending
                  const StatusIcon = statusConfig.icon
                  return (
                    <div key={submission.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 truncate">{submission.title}</h4>
                          <p className="text-sm text-slate-500">{TYPE_LABELS[submission.type] || submission.type}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">{submission.content}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span>Submitted: {formatDate(submission.created_at)}</span>
                        {submission.reviewed_at && (
                          <span>Reviewed: {formatDate(submission.reviewed_at)}</span>
                        )}
                      </div>
                      {submission.admin_notes && submission.status !== 'pending' && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
                          <p className="text-xs font-medium text-slate-500 mb-1">Admin Notes:</p>
                          <p className="text-sm text-slate-700">{submission.admin_notes}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
