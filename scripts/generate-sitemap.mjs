#!/usr/bin/env node

import { writeFileSync } from 'fs'
import { generateSitemap, getDefaultSitemapConfig } from '../utils/sitemap.js'

/**
 * Generate static sitemap.xml file
 */
function generateStaticSitemap() {
  console.info('🗺️  Generating sitemap...')
  
  try {
    // Configure your base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourwebsite.com'
    
    // Get sitemap configuration
    const sitemapConfig = getDefaultSitemapConfig(baseUrl)
    
    // Add any additional dynamic URLs here
    // sitemapConfig.urls.push({
    //   url: '/blog/some-post',
    //   lastModified: new Date().toISOString(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6
    // })
    
    // Generate sitemap XML
    const sitemapXml = generateSitemap(sitemapConfig)
    
    // Write to public directory
    writeFileSync('./public/sitemap.xml', sitemapXml, 'utf8')
    
    console.info('✅ Sitemap generated at ./public/sitemap.xml')
    console.info(`📊 Generated ${sitemapConfig.urls.length} URLs`)
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateStaticSitemap()
}

export { generateStaticSitemap }