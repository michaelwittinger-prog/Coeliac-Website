export const dynamic = "force-dynamic";

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'vienna'

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      // Return empty array if Supabase not configured
      return NextResponse.json({ success: true, data: [] })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Query: Get approved submissions of type 'local_resource'
    // The content should mention the location (e.g., "vienna" or "Wien")
    const { data, error } = await supabase
      .from('user_submissions')
      .select('id, title, content, created_at')
      .eq('status', 'approved')
      .eq('type', 'local_resource')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
      return NextResponse.json({ success: true, data: [] })
    }

    // Filter by location (case-insensitive search in content)
    const locationLower = location.toLowerCase()
    const filteredData = (data || []).filter(item => {
      const contentLower = (item.content || '').toLowerCase()
      const titleLower = (item.title || '').toLowerCase()
      // Match vienna, wien, or austria
      return contentLower.includes(locationLower) || 
             contentLower.includes('wien') || 
             contentLower.includes('austria') ||
             titleLower.includes(locationLower) ||
             titleLower.includes('wien')
    })

    return NextResponse.json({ success: true, data: filteredData })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ success: true, data: [] })
  }
}
