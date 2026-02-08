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
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'newest'
    const emailConfirmed = searchParams.get('emailConfirmed')
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '20')

    // Fetch all users from Supabase Auth
    const { data: usersData, error: usersError } = await adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 1000 // Get all users, we'll filter/paginate client-side
    })

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    let users = usersData?.users || []

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      users = users.filter(u => 
        u.email?.toLowerCase().includes(searchLower)
      )
    }

    // Filter by email confirmed
    if (emailConfirmed === 'true') {
      users = users.filter(u => u.email_confirmed_at)
    } else if (emailConfirmed === 'false') {
      users = users.filter(u => !u.email_confirmed_at)
    }

    // Sort
    if (sortBy === 'newest') {
      users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sortBy === 'oldest') {
      users.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sortBy === 'lastSignIn') {
      users.sort((a, b) => {
        const aTime = a.last_sign_in_at ? new Date(a.last_sign_in_at) : new Date(0)
        const bTime = b.last_sign_in_at ? new Date(b.last_sign_in_at) : new Date(0)
        return bTime - aTime
      })
    }

    const totalUsers = users.length
    const totalPages = Math.ceil(totalUsers / perPage)

    // Paginate
    const startIndex = (page - 1) * perPage
    const paginatedUsers = users.slice(startIndex, startIndex + perPage)

    // Format users for response
    const formattedUsers = paginatedUsers.map(u => ({
      id: u.id,
      email: u.email,
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at,
      emailConfirmed: !!u.email_confirmed_at,
      provider: u.app_metadata?.provider || 'email',
      userMetadata: u.user_metadata || {}
    }))

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        perPage,
        totalUsers,
        totalPages
      }
    })
  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
