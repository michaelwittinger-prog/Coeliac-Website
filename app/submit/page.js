'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle2, AlertCircle, FileText, MapPin, Utensils, Lightbulb, Heart, PenLine, HelpCircle } from 'lucide-react'

// Main submission types
const SUBMISSION_TYPES = [
  { value: 'local_place', label: 'Local Place', description: 'Restaurant, café, bakery, shop, or similar', icon: MapPin },
  { value: 'local_service', label: 'Local Service', description: 'Doctor, dietitian, pharmacy, or hospital', icon: Heart },
  { value: 'local_community', label: 'Local Community', description: 'Support group, event, or organisation', icon: Utensils },
  { value: 'tip', label: 'Living Tip', description: 'A helpful tip for daily life', icon: Lightbulb },
  { value: 'experience', label: 'Personal Experience', description: 'Your coeliac journey story', icon: PenLine },
  { value: 'other', label: 'Other', description: 'Something else', icon: HelpCircle },
]

// Categories for local places (aligned with local_listings table)
const LOCAL_PLACE_CATEGORIES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Café' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'shop', label: 'Shop' },
  { value: 'other', label: 'Other' },
]

// Categories for local services
const LOCAL_SERVICE_CATEGORIES = [
  { value: 'doctor', label: 'Doctor / Gastroenterologist' },
  { value: 'dietitian', label: 'Dietitian / Nutritionist' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'hospital', label: 'Hospital / Clinic' },
]

// Categories for local community
const LOCAL_COMMUNITY_CATEGORIES = [
  { value: 'community', label: 'Support Group / Organisation' },
  { value: 'event', label: 'Event / Meetup' },
]

export default function SubmitPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    title: '',
    location: '',
    content: ''
  })
  
  const router = useRouter()
  const supabase = createClient()

  // Determine if this is a local submission type
  const isLocalType = ['local_place', 'local_service', 'local_community'].includes(formData.type)
  
  // Get category options based on type
  const getCategoryOptions = () => {
    switch (formData.type) {
      case 'local_place': return LOCAL_PLACE_CATEGORIES
      case 'local_service': return LOCAL_SERVICE_CATEGORIES
      case 'local_community': return LOCAL_COMMUNITY_CATEGORIES
      default: return []
    }
  }

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

  // Reset category when type changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, category: '', location: '' }))
  }, [formData.type])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.type || !formData.title || !formData.content) {
      setError('Please fill in all required fields')
      return
    }

    if (isLocalType && !formData.category) {
      setError('Please select a category')
      return
    }

    if (isLocalType && !formData.location) {
      setError('Please provide a location (city/country)')
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
      // Build content with structured data for local submissions
      let fullContent = formData.content
      if (isLocalType) {
        fullContent = `Category: ${formData.category}\nLocation: ${formData.location}\n\n${formData.content}`
      }

      const { error: insertError } = await supabase
        .from('user_submissions')
        .insert({
          user_id: user.id,
          type: isLocalType ? formData.category : formData.type, // Use specific category for local types
          title: formData.title.trim(),
          content: fullContent.trim(),
          status: 'pending'
        })

      if (insertError) {
        console.error('Insert error:', insertError)
        setError(insertError.message || 'Failed to submit. Please try again.')
        return
      }

      setSuccess(true)
      setFormData({ type: '', category: '', title: '', location: '', content: '' })
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
          <h1 className="text-3xl font-bold text-slate-900">Share a Discovery</h1>
          <p className="text-slate-600 mt-2">
            Help the coeliac community by sharing local places, tips, or your experience. All submissions are reviewed before publishing.
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
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                What would you like to share? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SUBMISSION_TYPES.map((type) => {
                  const Icon = type.icon
                  const isSelected = formData.type === type.value
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                      disabled={submitting}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${isSelected ? 'text-purple-900' : 'text-slate-800'}`}>
                            {type.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category Selection (for local types) */}
            {isLocalType && (
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 bg-white"
                  disabled={submitting}
                >
                  <option value="">Select a category...</option>
                  {getCategoryOptions().map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Location (for local types) */}
            {isLocalType && (
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                  Location (City, Country) *
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Vienna, Austria"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 placeholder-slate-400"
                  disabled={submitting}
                />
              </div>
            )}

            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                {isLocalType ? 'Name *' : 'Title *'}
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={isLocalType ? 'Name of the place or service' : 'Give your submission a clear title'}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-slate-900 placeholder-slate-400"
                disabled={submitting}
                maxLength={200}
              />
              <p className="text-xs text-slate-500 mt-1">{formData.title.length}/200 characters</p>
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
                {isLocalType ? 'Details *' : 'Content *'}
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={isLocalType 
                  ? 'Include address, website, what makes it good for coeliac patients, any tips for visiting...'
                  : 'Provide the details of your submission...'
                }
                rows={6}
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
              For local places, include address and what makes it coeliac-friendly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">•</span>
              Share personal experience when relevant - it helps others
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
