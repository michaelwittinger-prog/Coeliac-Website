export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Get admin emails from environment variable
function getAdminEmails() {
  const adminEmails = process.env.ADMIN_EMAILS || ''
  return adminEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

export async function GET() {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify user is admin
    const adminEmails = getAdminEmails()
    const isAdmin = adminEmails.includes(user.email?.toLowerCase() || '')

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    // Use admin client to fetch all submissions (bypasses RLS)
    const adminSupabase = createAdminClient()
    
    const { data, error } = await adminSupabase
      .from('user_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch submissions' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data || [] })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
