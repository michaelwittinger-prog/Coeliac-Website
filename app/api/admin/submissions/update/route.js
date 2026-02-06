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

    // Use admin client (service role) to bypass RLS
    let adminSupabase
    try {
      adminSupabase = createAdminClient()
    } catch (e) {
      return NextResponse.json({ error: 'Admin client error: ' + e.message }, { status: 500 })
    }

    // First, verify the submission exists
    const { data: existingData, error: selectError } = await adminSupabase
      .from('user_submissions')
      .select('id, status')
      .eq('id', id)
      .single()

    if (selectError) {
      console.error('Select error:', selectError)
      return NextResponse.json({ 
        error: 'Failed to find submission', 
        details: selectError.message,
        code: selectError.code 
      }, { status: 404 })
    }

    if (!existingData) {
      return NextResponse.json({ error: 'Submission not found with id: ' + id }, { status: 404 })
    }

    // Now perform the update
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
      return NextResponse.json({ 
        error: 'Update failed', 
        details: updateError.message,
        code: updateError.code 
      }, { status: 500 })
    }

    // Return success
    return NextResponse.json({ 
      success: true, 
      data: data && data.length > 0 ? data[0] : existingData,
      message: `Submission ${status}`
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
