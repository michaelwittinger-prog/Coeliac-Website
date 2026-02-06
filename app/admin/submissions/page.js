'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Shield, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar, FileText, MessageSquare } from 'lucide-react'

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
}

const TYPE_LABELS = {
  local_resource: 'Local Resource',
  recipe: 'Recipe',
  tip: 'Living Tip',
  experience: 'Personal Experience',
  correction: 'Correction',
  other: 'Other',
}

export default function AdminSubmissionsPage() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState([])
  const [loadingSubmissions, setLoadingSubmissions] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [processing, setProcessing] = useState(false)
  const [filter, setFilter] = useState('pending')
  const [updateError, setUpdateError] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login')
          return
        }
        
        setUser(session.user)
        
        // Check admin status
        const res = await fetch('/api/admin/check')
        const data = await res.json()
        
        if (!data.isAdmin) {
          router.push('/account')
          return
        }
        
        setIsAdmin(true)
        fetchSubmissions()
      } catch (error) {
        console.error('Error checking access:', error)
        router.push('/account')
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [router, supabase.auth])

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true)
    try {
      const { data, error } = await supabase
        .from('user_submissions')
        .select('*')
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

  const handleUpdateStatus = async (submissionId, newStatus) => {
    setProcessing(true)
    setUpdateError('')
    
    try {
      const response = await fetch('/api/admin/submissions/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: submissionId,
          status: newStatus,
          admin_notes: adminNotes.trim() || null
        })
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMsg = result.error || 'Failed to update submission'
        console.error('Update error:', errorMsg)
        setUpdateError(errorMsg)
        return
      }

      // Refresh submissions list
      await fetchSubmissions()
      setSelectedSubmission(null)
      setAdminNotes('')
    } catch (err) {
      console.error('Error:', err)
      setUpdateError('An unexpected error occurred. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Checking access...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredSubmissions = submissions.filter(s => 
    filter === 'all' ? true : s.status === filter
  )

  const pendingCount = submissions.filter(s => s.status === 'pending').length

  return (
    <div className="min-h-[80vh] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
            <Shield className="w-4 h-4" />
            <span>Admin Panel</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Review Submissions</h1>
          <p className="text-slate-600 mt-2">
            Review and approve community submissions. {pendingCount > 0 && (
              <span className="font-semibold text-yellow-600">{pendingCount} pending review</span>
            )}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: 'pending', label: 'Pending', count: submissions.filter(s => s.status === 'pending').length },
            { value: 'approved', label: 'Approved', count: submissions.filter(s => s.status === 'approved').length },
            { value: 'rejected', label: 'Rejected', count: submissions.filter(s => s.status === 'rejected').length },
            { value: 'all', label: 'All', count: submissions.length },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === tab.value
                  ? 'text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
              style={filter === tab.value ? { background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' } : {}}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {loadingSubmissions ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No submissions found</h3>
              <p className="text-slate-600">
                {filter === 'pending' ? 'All caught up! No pending submissions.' : `No ${filter} submissions.`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredSubmissions.map((submission) => {
                const statusConfig = STATUS_CONFIG[submission.status] || STATUS_CONFIG.pending
                const StatusIcon = statusConfig.icon
                const isSelected = selectedSubmission?.id === submission.id
                
                return (
                  <div key={submission.id} className={`p-6 ${isSelected ? 'bg-purple-50' : 'hover:bg-slate-50'} transition-colors`}>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900">{submission.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {TYPE_LABELS[submission.type] || submission.type}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(submission.created_at)}
                          </span>
                        </div>
                      </div>
                      
                      {submission.status === 'pending' && (
                        <button
                          onClick={() => {
                            setSelectedSubmission(isSelected ? null : submission)
                            setAdminNotes('')
                          }}
                          className="px-4 py-2 text-sm font-medium rounded-lg border transition-all"
                          style={{ 
                            borderColor: '#854F9B', 
                            color: isSelected ? 'white' : '#854F9B',
                            background: isSelected ? 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' : 'transparent'
                          }}
                        >
                          {isSelected ? 'Cancel' : 'Review'}
                        </button>
                      )}
                    </div>
                    
                    <div className="bg-slate-100 rounded-lg p-4 mb-3">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{submission.content}</p>
                    </div>
                    
                    {submission.admin_notes && (
                      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100 mb-3">
                        <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-blue-600 mb-1">Admin Notes</p>
                          <p className="text-sm text-blue-800">{submission.admin_notes}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Review Actions */}
                    {isSelected && submission.status === 'pending' && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Admin Notes (optional)
                        </label>
                        <textarea
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="Add notes about your decision..."
                          rows={3}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 placeholder-slate-400 resize-none mb-4"
                          disabled={processing}
                        />
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleUpdateStatus(submission.id, 'approved')}
                            disabled={processing}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(submission.id, 'rejected')}
                            disabled={processing}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
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
  )
}
