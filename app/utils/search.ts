export interface SearchResult {
  title: string
  description: string
  url: string
  type: 'sermon' | 'static' | 'navigation' | 'social'
  tags?: string[]
  author?: string
  date?: string
}

/**
 * Client-side search through pre-loaded results
 */
export function searchResults(query: string, allResults: SearchResult[]): SearchResult[] {
  if (!query.trim()) {
    return []
  }
  
  const searchTerm = query.toLowerCase().trim()
  
  return allResults.filter(result => {
    // Search in title
    if (result.title.toLowerCase().includes(searchTerm)) {
      return true
    }
    
    // Search in description
    if (result.description.toLowerCase().includes(searchTerm)) {
      return true
    }
    
    // Search in tags
    if (result.tags && result.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    )) {
      return true
    }
    
    // Search in author
    if (result.author && result.author.toLowerCase().includes(searchTerm)) {
      return true
    }
    
    return false
  }).slice(0, 8) // Limit to 8 results
}

/**
 * Get quick suggestions based on popular content and common searches
 */
export function getSearchSuggestions(query: string): string[] {
  const suggestions = [
    'privacy policy',
    'terms and conditions',
    'sitemap',
    'sermons',
    'faith',
    'Jesus',
    'prayer', 
    'Bible',
    'God',
    'Holy Spirit',
    'Christmas',
    'meditation',
    'psalm'
  ]
  
  if (!query.trim()) {
    return suggestions.slice(0, 5)
  }
  
  const searchTerm = query.toLowerCase()
  return suggestions
    .filter(suggestion => suggestion.includes(searchTerm))
    .slice(0, 5)
}