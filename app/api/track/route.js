export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { path, referrer } = await request.json()

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Get user agent from headers
    const userAgent = request.headers.get('user-agent') || ''
    
    // Insert page view
    const { error } = await supabase
      .from('page_views')
      .insert({
        path: path,
        referrer: referrer || null,
        user_agent: userAgent.substring(0, 500) // Limit length
      })

    if (error) {
      console.error('Error tracking page view:', error)
      // Don't return error to client, just log it
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page view tracking error:', error)
    return NextResponse.json({ success: true }) // Silent fail
  }
}
