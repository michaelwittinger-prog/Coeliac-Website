export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Get admin emails from environment variable
function getAdminEmails() {
  const adminEmails = process.env.ADMIN_EMAILS || ''
  return adminEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
    }

    const adminEmails = getAdminEmails()
    const isAdmin = adminEmails.includes(user.email?.toLowerCase() || '')

    return NextResponse.json({ isAdmin, email: user.email })
  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json({ isAdmin: false, error: 'Server error' }, { status: 500 })
  }
}
