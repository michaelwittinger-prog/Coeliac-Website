export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'vienna'
    const showDebug = searchParams.get('debug') === 'true'

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    // Use service role key to bypass RLS (since anon RLS might not be set up)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    // Fallback to anon key
    const supabaseKey = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      if (showDebug) {
        return NextResponse.json({ 
          success: false, 
          error: 'Supabase not configured',
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        })
      }
      return NextResponse.json({ success: true, data: [] })
    }

    // Dynamic import to avoid build issues
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get ALL approved AND active submissions first
    const { data: allApproved, error } = await supabase
      .from('user_submissions')
      .select('id, type, title, content, status, created_at, is_active')
      .eq('status', 'approved')
      .neq('is_active', false)  // Only show active submissions (true or null)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase query error:', error)
      if (showDebug) {
        return NextResponse.json({ 
          success: false, 
          error: error.message,
          code: error.code,
          details: error.details
        })
      }
      return NextResponse.json({ success: true, data: [] })
    }

    if (showDebug) {
      return NextResponse.json({ 
        success: true, 
        totalApproved: allApproved?.length || 0,
        submissions: allApproved,
        data: allApproved || []
      })
    }

    // For production: filter by location keywords
    // But be very permissive - include any local_resource OR anything mentioning the location
    const locationLower = location.toLowerCase()
    const filteredData = (allApproved || []).filter(item => {
      const contentLower = (item.content || '').toLowerCase()
      const titleLower = (item.title || '').toLowerCase()
      const isLocalResource = item.type === 'local_resource'
      
      // Include if it's a local_resource type
      if (isLocalResource) return true
      
      // Or if it mentions vienna/wien/austria anywhere
      const mentionsLocation = 
        contentLower.includes(locationLower) || 
        contentLower.includes('wien') || 
        contentLower.includes('austria') ||
        contentLower.includes('österreich') ||
        titleLower.includes(locationLower) ||
        titleLower.includes('wien') ||
        titleLower.includes('austria')
      
      return mentionsLocation
    })

    return NextResponse.json({ success: true, data: filteredData })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ success: true, data: [], error: error.message })
  }
}
