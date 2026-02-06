export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const city = searchParams.get('city')
    const category = searchParams.get('category')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseKey = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: true, data: [] })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // Build query
    let query = supabase
      .from('local_listings')
      .select('*')
      .eq('is_active', true)

    // Apply filters if provided
    if (country) {
      query = query.eq('country_code', country.toUpperCase())
    }
    if (city) {
      query = query.eq('city_slug', city.toLowerCase())
    }
    if (category) {
      query = query.eq('category', category.toLowerCase())
    }

    // Execute query
    const { data, error } = await query

    if (error) {
      console.error('Query error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Sort: curated first, then community, then alphabetically by name
    const sortedData = (data || []).sort((a, b) => {
      // Curated first
      if (a.source === 'curated' && b.source !== 'curated') return -1
      if (a.source !== 'curated' && b.source === 'curated') return 1
      // Then alphabetically
      return a.name.localeCompare(b.name)
    })

    return NextResponse.json({ success: true, data: sortedData })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
