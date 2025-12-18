import heroData from '../data/hero-content.json'

export interface HeroContent {
  title: string
  description: string
  variant?: 'gradient' | 'responsive'
  height?: 'half' | 'full'
}

export interface PostSectionContent {
  title: string
  viewAllText: string
  variant?: 'default' | 'neutral' | 'primary' | 'primary-dark' | 'primary-light'
}

/**
 * Get hero content for a specific page
 */
export function getHeroContent(pageKey: string): HeroContent | null {
  const content = heroData.heroContent[pageKey as keyof typeof heroData.heroContent]
  if (!content) return null
  
  return {
    title: content.title,
    description: content.description,
    variant: content.variant as HeroContent['variant'],
    height: content.height as HeroContent['height']
  }
}

/**
 * Get post section content for home page sections
 */
export function getPostSectionContent(sectionKey: string): PostSectionContent | null {
  const content = heroData.postSections[sectionKey as keyof typeof heroData.postSections]
  if (!content) return null
  
  return {
    title: content.title,
    viewAllText: content.viewAllText,
    variant: content.variant as PostSectionContent['variant']
  }
}

/**
 * Get all available hero content keys
 */
export function getAvailableHeroKeys(): string[] {
  return Object.keys(heroData.heroContent)
}

/**
 * Get all available post section keys  
 */
export function getAvailablePostSectionKeys(): string[] {
  return Object.keys(heroData.postSections)
}