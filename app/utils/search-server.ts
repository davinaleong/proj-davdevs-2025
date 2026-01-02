'use server'

import { getPostsByType } from './content'
import { SearchResult } from './search'
import siteLinks from '../data/site-links.json'

/**
 * Get all navigation items as search results
 */
function getNavigationResults(): SearchResult[] {
  const results: SearchResult[] = []
  
  // Add main navigation
  if (siteLinks.navigation) {
    siteLinks.navigation.forEach(item => {
      results.push({
        title: item.label,
        description: `Navigate to ${item.label} page`,
        url: item.href,
        type: 'navigation'
      })
    })
  }
  
  // Add social links
  if (siteLinks.socialLinks) {
    siteLinks.socialLinks.forEach(link => {
      results.push({
        title: link.label,
        description: `Visit our ${link.label} page`,
        url: link.href,
        type: 'social'
      })
    })
  }
  
  return results
}

/**
 * Get all content posts as search results
 */
function getContentResults(): SearchResult[] {
  const results: SearchResult[] = []
  
  // Get sermons
  const sermons = getPostsByType('sermons')
  sermons.forEach(sermon => {
    results.push({
      title: sermon.title,
      description: sermon.description,
      url: `/sermons/${sermon.slug}`,
      type: 'sermon',
      tags: sermon.tags,
      author: sermon.author,
      date: sermon.date
    })
  })
  
  // Get static pages
  const staticPages = getPostsByType('static')
  staticPages.forEach(page => {
    results.push({
      title: page.title,
      description: page.description,
      url: `/pages/${page.slug}`,
      type: 'static',
      tags: page.tags,
      author: page.author,
      date: page.date
    })
  })
  
  return results
}

/**
 * Server action to get all searchable content
 */
export async function getAllSearchResults(): Promise<SearchResult[]> {
  return [
    ...getNavigationResults(),
    ...getContentResults()
  ]
}