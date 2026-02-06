export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Get admin emails from environment variable
function getEnvAdminEmails() {
  const adminEmails = process.env.ADMIN_EMAILS || ''
  return adminEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

// Check if user is admin (env or database)
async function isUserAdmin(email, adminClient) {
  const normalizedEmail = email?.toLowerCase() || ''
  
  // Check env variable first
  const envAdmins = getEnvAdminEmails()
  if (envAdmins.includes(normalizedEmail)) {
    return true
  }
  
  // Check database
  const { data, error } = await adminClient
    .from('admin_users')
    .select('id')
    .eq('email', normalizedEmail)
    .single()
  
  return !error && data
}

// GET - List all admin users
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

    // Fetch all admin users from database
    const { data: dbAdmins, error: fetchError } = await adminClient
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Error fetching admin users:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 })
    }

    // Get env admins
    const envAdmins = getEnvAdminEmails()

    return NextResponse.json({
      dbAdmins: dbAdmins || [],
      envAdmins: envAdmins,
      currentUserEmail: user.email
    })
  } catch (error) {
    console.error('Admin users fetch error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST - Add new admin user
export async function POST(request) {
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

    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if already an env admin
    const envAdmins = getEnvAdminEmails()
    if (envAdmins.includes(normalizedEmail)) {
      return NextResponse.json({ error: 'This email is already an admin (via environment config)' }, { status: 400 })
    }

    // Check if already in database
    const { data: existing } = await adminClient
      .from('admin_users')
      .select('id')
      .eq('email', normalizedEmail)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'This email is already an admin' }, { status: 400 })
    }

    // Add to database
    const { data: newAdmin, error: insertError } = await adminClient
      .from('admin_users')
      .insert({
        email: normalizedEmail,
        added_by: user.email
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error adding admin:', insertError)
      return NextResponse.json({ error: 'Failed to add admin user' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      admin: newAdmin,
      message: `${normalizedEmail} has been added as an admin`
    })
  } catch (error) {
    console.error('Add admin error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE - Remove admin user
export async function DELETE(request) {
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

    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Cannot remove env admins via API
    const envAdmins = getEnvAdminEmails()
    if (envAdmins.includes(normalizedEmail)) {
      return NextResponse.json({ 
        error: 'Cannot remove environment-configured admins. Please update ADMIN_EMAILS environment variable.' 
      }, { status: 400 })
    }

    // Cannot remove yourself
    if (normalizedEmail === user.email?.toLowerCase()) {
      return NextResponse.json({ error: 'You cannot remove yourself as admin' }, { status: 400 })
    }

    // Remove from database
    const { error: deleteError } = await adminClient
      .from('admin_users')
      .delete()
      .eq('email', normalizedEmail)

    if (deleteError) {
      console.error('Error removing admin:', deleteError)
      return NextResponse.json({ error: 'Failed to remove admin user' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `${normalizedEmail} has been removed as admin`
    })
  } catch (error) {
    console.error('Remove admin error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
