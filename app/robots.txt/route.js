export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  const robotsTxt = `# Allow all crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}