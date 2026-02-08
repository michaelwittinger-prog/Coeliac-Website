export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Get admin emails from environment variable
function getEnvAdminEmails() {
  const adminEmails = process.env.ADMIN_EMAILS || ''
  return adminEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

// Check if user is admin
async function isUserAdmin(email, adminClient) {
  const normalizedEmail = email?.toLowerCase() || ''
  
  const envAdmins = getEnvAdminEmails()
  if (envAdmins.includes(normalizedEmail)) {
    return true
  }
  
  try {
    const { data, error } = await adminClient
      .from('admin_users')
      .select('id')
      .eq('email', normalizedEmail)
      .single()
    
    return !error && data
  } catch (err) {
    return false
  }
}

export async function GET(request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const adminClient = createAdminClient()
    
    const isAdmin = await isUserAdmin(user.email, adminClient)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const now = new Date()
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    // Get daily page views
    const { data: pageViews, error: viewsError } = await adminClient
      .from('page_views')
      .select('created_at, path')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    if (viewsError) {
      console.error('Error fetching page views:', viewsError)
    }

    // Aggregate by day
    const dailyViews = {}
    const pathCounts = {}

    if (pageViews) {
      pageViews.forEach(view => {
        const date = new Date(view.created_at).toISOString().split('T')[0]
        dailyViews[date] = (dailyViews[date] || 0) + 1
        
        // Clean path for aggregation
        const cleanPath = view.path?.split('?')[0] || '/'
        pathCounts[cleanPath] = (pathCounts[cleanPath] || 0) + 1
      })
    }

    // Generate all dates in range for chart
    const chartData = []
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      chartData.push({
        date: dateStr,
        views: dailyViews[dateStr] || 0
      })
    }

    // Get top pages
    const topPages = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }))

    return NextResponse.json({
      chartData,
      topPages,
      totalViews: pageViews?.length || 0
    })
  } catch (error) {
    console.error('Analytics traffic error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
