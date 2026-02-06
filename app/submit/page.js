'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle2, AlertCircle, FileText } from 'lucide-react'

const SUBMISSION_TYPES = [
  { value: 'local_resource', label: 'Local Resource', description: 'A shop, restaurant, or support group' },
  { value: 'recipe', label: 'Recipe', description: 'A gluten-free recipe to share' },
  { value: 'tip', label: 'Living Tip', description: 'A helpful tip for daily life' },
  { value: 'experience', label: 'Personal Experience', description: 'Your coeliac journey story' },
  { value: 'correction', label: 'Correction', description: 'A correction to existing content' },
  { value: 'other', label: 'Other', description: 'Something else' },
]

export default function SubmitPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: ''
  })
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login?redirect=/submit')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.type || !formData.title || !formData.content) {
      setError('Please fill in all fields')
      return
    }

    if (formData.title.length < 5) {
      setError('Title must be at least 5 characters')
      return
    }

    if (formData.content.length < 20) {
      setError('Content must be at least 20 characters')
      return
    }

    setSubmitting(true)

    try {
      const { error: insertError } = await supabase
        .from('user_submissions')
        .insert({
          user_id: user.id,
          type: formData.type,
          title: formData.title.trim(),
          content: formData.content.trim(),
          status: 'pending'
        })

      if (insertError) {
        console.error('Insert error:', insertError)
        setError(insertError.message || 'Failed to submit. Please try again.')
        return
      }

      setSuccess(true)
      setFormData({ type: '', title: '', content: '' })
    } catch (err) {
      console.error('Submission error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Submission Received!</h1>
            <p className="text-slate-600 mb-6">
              Thank you for your contribution. Our team will review your submission and you&apos;ll be notified once it&apos;s approved.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setSuccess(false)}
                className="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
              >
                Submit Another
              </button>
              <Link
                href="/account"
                className="block w-full px-6 py-3 text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                View My Submissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(133, 79, 155, 0.1)', color: '#854F9B'}}>
            <FileText className="w-4 h-4" />
            <span>Community Contribution</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Submit Content</h1>
          <p className="text-slate-600 mt-2">
            Share your knowledge with the coeliac community. All submissions are reviewed before publishing.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Field */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
                Submission Type *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 bg-white"
                disabled={submitting}
              >
                <option value="">Select a type...</option>
                {SUBMISSION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your submission a clear title"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 placeholder-slate-400"
                disabled={submitting}
                maxLength={200}
              />
              <p className="text-xs text-slate-500 mt-1">{formData.title.length}/200 characters</p>
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Provide the details of your submission. Include relevant information like addresses, ingredients, tips, etc."
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 placeholder-slate-400 resize-none"
                disabled={submitting}
                maxLength={5000}
              />
              <p className="text-xs text-slate-500 mt-1">{formData.content.length}/5000 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #854F9B 0%, #9d6bb3 100%)' }}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit for Review
                </>
              )}
            </button>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Submission Guidelines</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span>
              Be specific and provide accurate information
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span>
              For local resources, include address and contact details if available
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span>
              For recipes, list all ingredients and note any potential cross-contamination risks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span>
              Submissions are reviewed within 48-72 hours
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
