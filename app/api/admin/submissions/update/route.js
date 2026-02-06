export const dynamic = "force-dynamic";

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Get admin emails from environment variable
function getAdminEmails() {
  const adminEmails = process.env.ADMIN_EMAILS || ''
  return adminEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

// Parse submission content to extract structured data for local_listings
function parseLocalResourceSubmission(submission) {
  const content = submission.content || ''
  const title = submission.title || ''
  
  // Extract city/country from content
  let citySlug = 'vienna'
  let cityName = 'Vienna'
  let countryCode = 'AT'
  
  const contentLower = content.toLowerCase()
  if (contentLower.includes('berlin')) {
    citySlug = 'berlin'
    cityName = 'Berlin'
    countryCode = 'DE'
  } else if (contentLower.includes('vienna') || contentLower.includes('wien')) {
    citySlug = 'vienna'
    cityName = 'Vienna'
    countryCode = 'AT'
  }
  
  // Extract address
  const addressMatch = content.match(/address[:\s]+([^\n]+)/i) ||
                       content.match(/(\d+[^\n]*(?:straße|gasse|platz|weg|strasse|str\.)[^\n]*)/i)
  const address = addressMatch ? addressMatch[1].trim() : null
  
  // Extract website URL
  const urlMatch = content.match(/https?:\/\/[^\s\n]+/i)
  const websiteUrl = urlMatch ? urlMatch[0] : null
  
  // Extract district
  const districtMatch = content.match(/(\d{1,2})(?:st|nd|rd|th)?\s*(?:district|bezirk)/i) ||
                        content.match(/(?:district|bezirk)\s*(\d{1,2})/i)
  const district = districtMatch ? `${districtMatch[1]}${getOrdinalSuffix(parseInt(districtMatch[1]))}` : null
  
  // Determine category from content keywords
  let category = 'other'
  if (contentLower.includes('restaurant') || contentLower.includes('dining')) category = 'restaurant'
  else if (contentLower.includes('café') || contentLower.includes('cafe') || contentLower.includes('coffee')) category = 'cafe'
  else if (contentLower.includes('bakery') || contentLower.includes('bäckerei') || contentLower.includes('bread')) category = 'bakery'
  else if (contentLower.includes('hotel') || contentLower.includes('accommodation')) category = 'hotel'
  else if (contentLower.includes('doctor') || contentLower.includes('arzt') || contentLower.includes('physician')) category = 'doctor'
  else if (contentLower.includes('dietitian') || contentLower.includes('nutritionist')) category = 'dietitian'
  else if (contentLower.includes('pharmacy') || contentLower.includes('apotheke')) category = 'pharmacy'
  else if (contentLower.includes('hospital') || contentLower.includes('clinic') || contentLower.includes('krankenhaus')) category = 'hospital'
  else if (contentLower.includes('shop') || contentLower.includes('store') || contentLower.includes('supermarket')) category = 'shop'
  else if (contentLower.includes('event') || contentLower.includes('meetup')) category = 'event'
  else if (contentLower.includes('support') || contentLower.includes('group') || contentLower.includes('community') || contentLower.includes('association')) category = 'community'
  
  // Clean description
  let description = content
    .replace(/address[:\s]+[^\n]+/gi, '')
    .replace(/website[:\s]+[^\n]+/gi, '')
    .replace(/https?:\/\/[^\s\n]+/gi, '')
    .trim()
    .substring(0, 500)
  
  return {
    source: 'community',
    submission_id: submission.id,
    is_active: true,
    country_code: countryCode,
    city_slug: citySlug,
    city_name: cityName,
    category,
    name: title,
    description: description || null,
    address,
    district,
    website_url: websiteUrl
  }
}

function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
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

    // First, get the full submission data
    const { data: submission, error: selectError } = await adminSupabase
      .from('user_submissions')
      .select('*')
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

    if (!submission) {
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

    // If approving a local_resource submission, create a local_listing entry
    let listingCreated = false
    if (status === 'approved' && submission.type === 'local_resource') {
      try {
        const listingData = parseLocalResourceSubmission(submission)
        
        // Check if listing already exists for this submission
        const { data: existingListing } = await adminSupabase
          .from('local_listings')
          .select('id')
          .eq('submission_id', id)
          .single()

        if (!existingListing) {
          const { error: listingError } = await adminSupabase
            .from('local_listings')
            .insert(listingData)

          if (listingError) {
            console.error('Failed to create local_listing:', listingError)
            // Don't fail the whole request, just log it
          } else {
            listingCreated = true
          }
        }
      } catch (listingErr) {
        console.error('Error creating local listing:', listingErr)
      }
    }

    // Return success
    return NextResponse.json({ 
      success: true, 
      data: data && data.length > 0 ? data[0] : submission,
      message: `Submission ${status}`,
      listingCreated
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
