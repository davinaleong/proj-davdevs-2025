'use client'

import Link from 'next/link'
import { SearchResult } from '../utils/search'
import { ExternalLink, FileText, MessageSquare, Globe, Users } from 'lucide-react'

interface SearchAutocompleteProps {
  results: SearchResult[]
  isVisible: boolean
  onResultClick?: () => void
}

export default function SearchAutocomplete({ 
  results, 
  isVisible, 
  onResultClick 
}: SearchAutocompleteProps) {
  if (!isVisible || results.length === 0) {
    return null
  }

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'sermon':
        return <MessageSquare size={16} />
      case 'static':
        return <FileText size={16} />
      case 'navigation':
        return <Globe size={16} />
      case 'social':
        return <Users size={16} />
      default:
        return <FileText size={16} />
    }
  }

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'sermon':
        return 'Sermon'
      case 'static':
        return 'Page'
      case 'navigation':
        return 'Navigation'
      case 'social':
        return 'Social'
      default:
        return 'Content'
    }
  }

  const isExternalLink = (url: string) => {
    return url.startsWith('http') && !url.includes('localhost')
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-b-md shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </div>
        
        {results.map((result, index) => {
          const LinkComponent = isExternalLink(result.url) ? 'a' : Link
          const linkProps = isExternalLink(result.url) 
            ? { href: result.url, target: '_blank', rel: 'noopener noreferrer' }
            : { href: result.url }

          return (
            <LinkComponent
              key={index}
              {...linkProps}
              className="flex items-start gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors group"
              onClick={onResultClick}
            >
              <div className="flex items-center gap-1 mt-0.5 text-gray-400 dark:text-gray-500">
                {getTypeIcon(result.type)}
                {isExternalLink(result.url) && (
                  <ExternalLink className="w-3 h-3" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    {result.title}
                  </h4>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full shrink-0">
                    {getTypeLabel(result.type)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {result.description}
                </p>
                
                {(result.tags || result.author || result.date) && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                    {result.author && (
                      <span>By {result.author}</span>
                    )}
                    {result.date && (
                      <span>{new Date(result.date).toLocaleDateString()}</span>
                    )}
                    {result.tags && result.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span>•</span>
                        <span>{result.tags.slice(0, 2).join(', ')}</span>
                        {result.tags.length > 2 && (
                          <span>+{result.tags.length - 2} more</span>
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </LinkComponent>
          )
        })}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-600 p-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Press Enter to search • Click to navigate
        </div>
      </div>
    </div>
  )
}