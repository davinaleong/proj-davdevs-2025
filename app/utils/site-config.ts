import siteConfig from '../data/site-config.json'

// Type definitions
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

export interface NavigationLink {
  label: string
  href: string
  external: boolean
}

export interface SortOption {
  label: string
  value: string
}

export interface SortGroup {
  label: string
  options: SortOption[]
}

// Site configuration
export function getSiteTitle(): string {
  return siteConfig.site.title
}

export function getSiteDescription(): string {
  return siteConfig.site.description
}

export function getBrandLink(): { href: string; external: boolean } {
  return siteConfig.site.brand
}

// Navigation
export function getNavigationLinks(): NavigationLink[] {
  return siteConfig.navigation
}

export function findLinkByLabel(label: string): NavigationLink | undefined {
  return siteConfig.navigation.find(link => 
    link.label.toLowerCase() === label.toLowerCase()
  )
}

// Hero content
export function getHeroContent(pageKey: string): HeroContent | null {
  const content = siteConfig.heroContent[pageKey as keyof typeof siteConfig.heroContent]
  if (!content) return null
  
  return {
    title: content.title,
    description: content.description,
    variant: content.variant as HeroContent['variant'],
    height: content.height as HeroContent['height']
  }
}

export function getPostSectionContent(sectionKey: string): PostSectionContent | null {
  const content = siteConfig.postSections[sectionKey as keyof typeof siteConfig.postSections]
  if (!content) return null
  
  return {
    title: content.title,
    viewAllText: content.viewAllText,
    variant: content.variant as PostSectionContent['variant']
  }
}

// UI configuration
export function getDateFormatConfig() {
  return siteConfig.ui.dateFormat
}

export function getSortOptions() {
  return siteConfig.ui.sortOptions
}

export function getItemsPerPage(): number {
  return siteConfig.ui.pagination.itemsPerPage
}

export function getHomepageItemsPerSection(): number {
  return siteConfig.ui.homepage.itemsPerSection
}

// Utility functions
export function getAllHeroKeys(): string[] {
  return Object.keys(siteConfig.heroContent)
}

export function getAllPostSectionKeys(): string[] {
  return Object.keys(siteConfig.postSections)
}

// Additional link functions for backwards compatibility
export function getSocialLinks(): NavigationLink[] {
  return siteConfig.socialLinks
}

export function getLegalLinks(): NavigationLink[] {
  return siteConfig.legalLinks
}

export function getFooterNavigationLinks(): NavigationLink[] {
  return siteConfig.navigation
}

export function getLinkProps(link: NavigationLink) {
  return link.external 
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}
}

// Legacy type export for backwards compatibility
export type LinkItem = NavigationLink