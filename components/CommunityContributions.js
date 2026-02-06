'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Users, ArrowRight, Sparkles } from 'lucide-react'

const TYPE_LABELS = {
  local_resource: 'Local Resource',
  recipe: 'Recipe',
  tip: 'Tip',
  experience: 'Story',
  correction: 'Update',
  other: 'Contribution',
}

export default function CommunityContributions({ maxItems = 3 }) {
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const { data, error } = await supabase
          .from('user_submissions')
          .select('id, type, title, content, created_at, is_active')
          .eq('status', 'approved')
          .neq('is_active', false)  // Only show active submissions
          .order('created_at', { ascending: false })
          .limit(maxItems)

        if (error) {
          console.error('Error fetching contributions:', error)
        } else {
          setContributions(data || [])
        }
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [maxItems, supabase])

  // Don't render if no contributions or still loading
  if (loading || contributions.length === 0) {
    return null
  }

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-2xl border border-purple-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(133, 79, 155, 0.1)' }}>
            <Users className="w-5 h-5" style={{ color: '#854F9B' }} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Community Contributions</h3>
            <p className="text-sm text-slate-500">Shared by our members</p>
          </div>
        </div>
        <Link
          href="/submit"
          className="text-sm font-medium hover:underline flex items-center gap-1"
          style={{ color: '#854F9B' }}
        >
          Contribute
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {contributions.map((contribution) => (
          <div key={contribution.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(133, 79, 155, 0.1)' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#854F9B' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-medium text-slate-900 text-sm">{contribution.title}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {TYPE_LABELS[contribution.type] || contribution.type}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {truncateContent(contribution.content)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-purple-100 text-center">
        <p className="text-sm text-slate-600">
          Have something to share?{' '}
          <Link href="/submit" className="font-medium hover:underline" style={{ color: '#854F9B' }}>
            Submit your contribution
          </Link>
        </p>
      </div>
    </div>
  )
}
