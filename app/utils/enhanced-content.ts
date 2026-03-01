import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface EnhancedPostMetadata {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  published: boolean;
  links?: Array<{ label: string; href: string }>;
  images?: Array<{ src: string; alt: string }>;
  url?: string;
  
  // Enhanced fields for component handling
  components?: string[];
  componentConfig?: Record<string, any>;
  toolType?: string;
}

export interface EnhancedPost extends EnhancedPostMetadata {
  content: string;
  htmlContent: string;
  type: PostType;
  filePath: string;
}

export type PostType = 'projects' | 'articles' | 'fem' | 'notebooks' | 'tools' | 'sermons' | 'static' | 'technical-demos' | 'knowledge-sharing';

/**
 * Configure marked with sensible defaults
 */
function configureMarked() {
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false,
  });
  
  // Add custom renderer for component placeholders
  const renderer = new marked.Renderer();
  const originalParagraph = renderer.paragraph.bind(renderer);
  
  renderer.paragraph = function(text: string) {
    // Handle component placeholders
    if (text.match(/^<!-- COMPONENT:/)) {
      const componentMatch = text.match(/<!-- COMPONENT:(\w+)(?:\s+(.+?))? -->/);
      if (componentMatch) {
        const [, componentName, config] = componentMatch;
        return `<div data-component="${componentName}" ${config ? `data-config="${encodeURIComponent(config)}"` : ''}></div>`;
      }
    }
    return originalParagraph(text);
  };
  
  marked.setOptions({ renderer });
}

// Initialize marked configuration
configureMarked();

/**
 * Parse a single Markdown file and extract metadata
 */
function parseEnhancedPostFile(filePath: string, type: PostType): EnhancedPost | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validate required fields
    const requiredFields: (keyof EnhancedPostMetadata)[] = [
      'title', 'slug', 'description', 'date', 'author', 'tags', 'featured', 'readingTime', 'published'
    ];
    
    for (const field of requiredFields) {
      if (!(field in data)) {
        console.warn(`Missing required field '${field}' in ${filePath}`);
        return null;
      }
    }

    // Transform image paths to absolute paths
    const transformedImages = Array.isArray(data.images) 
      ? data.images.map((image: any) => ({
          ...image,
          src: image.src.startsWith('/') ? image.src : `/${type}/${image.src}`
        }))
      : undefined;

    // Process markdown content to HTML
    let htmlContent = '';
    try {
      htmlContent = marked(content);
    } catch (error) {
      console.error(`Error processing markdown in ${filePath}:`, error);
      htmlContent = content; // Fallback to raw content
    }

    return {
      title: data.title,
      slug: data.slug,
      description: data.description,
      date: data.date,
      author: data.author,
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: Boolean(data.featured),
      readingTime: Number(data.readingTime) || 0,
      published: Boolean(data.published),
      links: Array.isArray(data.links) ? data.links : undefined,
      images: transformedImages,
      content,
      htmlContent,
      type,
      filePath,
      
      // Enhanced fields
      components: Array.isArray(data.components) ? data.components : [],
      componentConfig: data.componentConfig || {},
      toolType: data.toolType,
    };
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get the content directory path for a given post type
 */
function getContentDir(type: PostType): string {
  const contentRoot = path.join(process.cwd(), 'app', 'content');
  return path.join(contentRoot, type);
}

/**
 * Get all enhanced posts of a specific type
 */
export function getEnhancedPostsByType(type: PostType): EnhancedPost[] {
  const contentDir = getContentDir(type);
  
  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory does not exist: ${contentDir}`);
    return [];
  }

  try {
    const files = fs.readdirSync(contentDir);
    const posts: EnhancedPost[] = [];

    for (const file of files) {
      // Process both .md and .mdx files
      if (!/\.(md|mdx)$/.test(file)) {
        continue;
      }

      const filePath = path.join(contentDir, file);
      const post = parseEnhancedPostFile(filePath, type);
      
      // Only include published posts
      if (post && post.published) {
        posts.push(post);
      }
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading content directory ${contentDir}:`, error);
    return [];
  }
}

/**
 * Get a single enhanced post by slug and type
 */
export function getEnhancedPostBySlug(type: PostType, slug: string): EnhancedPost | null {
  const posts = getEnhancedPostsByType(type);
  return posts.find(post => post.slug === slug) || null;
}

/**
 * Get all enhanced posts across all types
 */
export function getAllEnhancedPosts(): EnhancedPost[] {
  const allTypes: PostType[] = [
    'articles', 'projects', 'fem', 'notebooks', 'tools', 
    'sermons', 'static', 'technical-demos', 'knowledge-sharing'
  ];
  
  return allTypes.flatMap(type => getEnhancedPostsByType(type));
}

/**
 * Get enhanced posts summaries (without content) for listing pages
 */
export function getEnhancedPostSummaries(type?: PostType): Omit<EnhancedPost, 'content' | 'htmlContent'>[] {
  const posts = type ? getEnhancedPostsByType(type) : getAllEnhancedPosts();
  
  return posts.map(({ content, htmlContent, ...summary }) => summary);
}

/**
 * Search enhanced posts by title, description, or tags
 */
export function searchEnhancedPosts(query: string, type?: PostType): EnhancedPost[] {
  const posts = type ? getEnhancedPostsByType(type) : getAllEnhancedPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.content.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get related enhanced posts based on tags
 */
export function getRelatedEnhancedPosts(post: EnhancedPost, limit = 3): EnhancedPost[] {
  const allPosts = getEnhancedPostsByType(post.type);
  
  return allPosts
    .filter(p => p.slug !== post.slug)
    .map(p => ({
      post: p,
      score: p.tags.filter(tag => post.tags.includes(tag)).length
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}