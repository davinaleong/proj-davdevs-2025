import siteConfig from '../data/site-config.json'
import { PostSummary, PostType } from './content'

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

// Safe formatting for religious terms
export function formatHighlightedTerms(text: string): string {
  const highlightedTerms = siteConfig.highlightTerms;
  
  // Sort by length (longest first) to handle overlapping terms correctly
  const sortedTerms = highlightedTerms.sort((a, b) => b.length - a.length);
  
  let result = text;
  
  sortedTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    result = result.replace(regex, `<strong><mark>$&</mark></strong>`);
  });
  
  return result;
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

// Knowledge sharing
export function getKnowledgeSharingLinks() {
  return siteConfig.knowledgeSharing
}

export function getKnowledgeSharingPosts(): { devto: PostSummary; talks: PostSummary } {
  const posts = siteConfig.knowledgeSharingPosts as Record<string, Omit<PostSummary, 'type'> & { type: string }>;
  return {
    devto: {
      ...posts.devto,
      type: posts.devto.type as PostType
    },
    talks: {
      ...posts.talks,
      type: posts.talks.type as PostType
    }
  };
}

// Legacy type export for backwards compatibility
export type LinkItem = NavigationLink