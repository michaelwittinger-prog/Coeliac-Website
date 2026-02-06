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
    return { isAdmin: true, source: 'environment' }
  }
  
  // Check database
  try {
    const { data, error } = await adminClient
      .from('admin_users')
      .select('id')
      .eq('email', normalizedEmail)
      .single()
    
    if (!error && data) {
      return { isAdmin: true, source: 'database' }
    }
  } catch (err) {
    // Table might not exist yet, continue
    console.log('Admin users table check:', err.message)
  }
  
  return { isAdmin: false, source: null }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
    }

    const adminClient = createAdminClient()
    const { isAdmin, source } = await isUserAdmin(user.email, adminClient)

    return NextResponse.json({ isAdmin, email: user.email, source })
  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json({ isAdmin: false, error: 'Server error' }, { status: 500 })
  }
}
