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
  
  // Check env variable first
  const envAdmins = getEnvAdminEmails()
  if (envAdmins.includes(normalizedEmail)) {
    return true
  }
  
  // Check database
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

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const adminClient = createAdminClient()
    
    // Verify requester is admin
    const isAdmin = await isUserAdmin(user.email, adminClient)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get page views for last 7 days
    const { count: views7Days } = await adminClient
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString())

    // Get page views for last 30 days
    const { count: views30Days } = await adminClient
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Get total users count
    const { data: usersData, error: usersError } = await adminClient.auth.admin.listUsers({
      perPage: 1,
      page: 1
    })

    let totalUsers = 0
    let newUsersLast7Days = 0
    let newUsersLast30Days = 0

    if (!usersError && usersData) {
      // Get all users to count properly
      const { data: allUsers } = await adminClient.auth.admin.listUsers({
        perPage: 1000,
        page: 1
      })
      
      if (allUsers?.users) {
        totalUsers = allUsers.users.length
        newUsersLast7Days = allUsers.users.filter(u => 
          new Date(u.created_at) >= sevenDaysAgo
        ).length
        newUsersLast30Days = allUsers.users.filter(u => 
          new Date(u.created_at) >= thirtyDaysAgo
        ).length
      }
    }

    // Get total submissions count
    const { count: totalSubmissions } = await adminClient
      .from('user_submissions')
      .select('*', { count: 'exact', head: true })

    // Get pending submissions count
    const { count: pendingSubmissions } = await adminClient
      .from('user_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
      .eq('is_active', true)

    // Get total local listings count
    const { count: totalListings } = await adminClient
      .from('local_listings')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    return NextResponse.json({
      pageViews: {
        last7Days: views7Days || 0,
        last30Days: views30Days || 0
      },
      users: {
        total: totalUsers,
        newLast7Days: newUsersLast7Days,
        newLast30Days: newUsersLast30Days
      },
      submissions: {
        total: totalSubmissions || 0,
        pending: pendingSubmissions || 0
      },
      listings: {
        total: totalListings || 0
      }
    })
  } catch (error) {
    console.error('Analytics overview error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
