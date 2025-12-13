import { generateSitemap, getDefaultSitemapConfig } from '../../utils/sitemap'

export async function GET() {
  try {
    // Configure your base URL - update this for production
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourwebsite.com'
    
    // Get sitemap configuration
    const sitemapConfig = getDefaultSitemapConfig(baseUrl)
    
    // Generate sitemap XML
    const sitemapXml = generateSitemap(sitemapConfig)
    
    // Return XML response with proper headers
    return new Response(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}