export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Get admin emails from environment variable
function getAdminEmails() {
  const adminEmails = process.env.ADMIN_EMAILS || ''
  return adminEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json()
    const { id, status, admin_notes } = body

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Missing submission id' }, { status: 400 })
    }

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status. Must be "approved" or "rejected"' }, { status: 400 })
    }

    // Get authenticated user (using regular client for auth check)
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify user is admin using ADMIN_EMAILS env var
    const adminEmails = getAdminEmails()
    const isAdmin = adminEmails.includes(user.email?.toLowerCase() || '')

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    // Use admin client (service role) to bypass RLS for the update
    const adminSupabase = createAdminClient()
    
    const { data, error: updateError } = await adminSupabase
      .from('user_submissions')
      .update({
        status: status,
        admin_notes: admin_notes?.trim() || null,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id
      })
      .eq('id', id)
      .select()

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: updateError.message || 'Failed to update submission' }, { status: 500 })
    }

    // Check if any row was updated
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
