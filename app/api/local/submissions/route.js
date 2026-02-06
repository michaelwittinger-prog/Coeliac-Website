export const dynamic = "force-dynamic";

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const debug = {
    step: 'init',
    supabaseConfigured: false,
    queryResult: null,
    error: null,
    allSubmissions: null,
    approvedCount: 0,
    localResourceCount: 0,
    finalCount: 0
  }

  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'vienna'
    const showDebug = searchParams.get('debug') === 'true'

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    debug.supabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

    if (!supabaseUrl || !supabaseAnonKey) {
      debug.error = 'Supabase not configured'
      if (showDebug) return NextResponse.json({ success: false, debug })
      return NextResponse.json({ success: true, data: [] })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    debug.step = 'client_created'

    // First, get ALL approved submissions (no type filter) to debug
    const { data: allApproved, error: allError } = await supabase
      .from('user_submissions')
      .select('id, type, title, content, status, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (allError) {
      debug.step = 'query_all_failed'
      debug.error = allError.message
      debug.errorCode = allError.code
      debug.errorDetails = allError.details
      if (showDebug) return NextResponse.json({ success: false, debug })
      return NextResponse.json({ success: true, data: [] })
    }

    debug.step = 'query_all_success'
    debug.approvedCount = allApproved?.length || 0
    debug.allSubmissions = showDebug ? allApproved : null

    // Now filter for local_resource type
    const localResources = (allApproved || []).filter(item => item.type === 'local_resource')
    debug.localResourceCount = localResources.length

    // Filter by location (case-insensitive search in content)
    const locationLower = location.toLowerCase()
    const filteredData = localResources.filter(item => {
      const contentLower = (item.content || '').toLowerCase()
      const titleLower = (item.title || '').toLowerCase()
      // Match vienna, wien, or austria - be more permissive
      return contentLower.includes(locationLower) || 
             contentLower.includes('wien') || 
             contentLower.includes('austria') ||
             contentLower.includes('österreich') ||
             titleLower.includes(locationLower) ||
             titleLower.includes('wien') ||
             titleLower.includes('austria')
    })

    debug.step = 'filtering_complete'
    debug.finalCount = filteredData.length

    // If no local_resource submissions, return ALL approved as fallback for local support page
    // This is more permissive - any approved submission can appear
    let resultData = filteredData

    // If strict filtering returns nothing, try without type filter
    if (resultData.length === 0 && allApproved && allApproved.length > 0) {
      const allFiltered = allApproved.filter(item => {
        const contentLower = (item.content || '').toLowerCase()
        const titleLower = (item.title || '').toLowerCase()
        return contentLower.includes(locationLower) || 
               contentLower.includes('wien') || 
               contentLower.includes('austria') ||
               contentLower.includes('österreich') ||
               titleLower.includes(locationLower) ||
               titleLower.includes('wien')
      })
      if (allFiltered.length > 0) {
        resultData = allFiltered
        debug.step = 'using_all_approved_fallback'
        debug.finalCount = resultData.length
      }
    }

    if (showDebug) {
      return NextResponse.json({ success: true, data: resultData, debug })
    }

    return NextResponse.json({ success: true, data: resultData })
  } catch (error) {
    debug.step = 'exception'
    debug.error = error.message
    console.error('Server error:', error)
    return NextResponse.json({ success: true, data: [], debug })
  }
}
