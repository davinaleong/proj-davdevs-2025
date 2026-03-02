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
  componentConfig?: Record<string, unknown>;
  toolType?: string;
}

type ContentImage = {
  src?: string;
  alt?: string;
} & Record<string, unknown>;

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
  });
}

/**
 * Convert component placeholder comments into HTML placeholders before markdown parsing
 */
function preprocessComponentPlaceholders(content: string): string {
  return content.replace(
    /<!--\s*COMPONENT:([\w-]+)(?:\s+(.+?))?\s*-->/g,
    (_match, componentName: string, config?: string) => {
      const encodedConfig = typeof config === 'string' ? encodeURIComponent(config) : '';
      return `<div data-component="${componentName}"${encodedConfig ? ` data-config="${encodedConfig}"` : ''}></div>`;
    }
  );
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
    const frontmatter = data as Record<string, unknown>;

    const toString = (value: unknown): string => (typeof value === 'string' ? value : '');
    const toStringArray = (value: unknown): string[] =>
      Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
    const toLinks = (value: unknown): Array<{ label: string; href: string }> | undefined => {
      if (!Array.isArray(value)) {
        return undefined;
      }

      return value
        .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
        .map((item) => ({
          label: toString(item.label),
          href: toString(item.href),
        }))
        .filter((item) => item.label.length > 0 && item.href.length > 0);
    };
    
    // Validate required fields
    const requiredFields: (keyof EnhancedPostMetadata)[] = [
      'title', 'slug', 'description', 'date', 'author', 'tags', 'featured', 'readingTime', 'published'
    ];
    
    for (const field of requiredFields) {
      if (!(field in frontmatter)) {
        console.warn(`Missing required field '${field}' in ${filePath}`);
        return null;
      }
    }

    // Transform image paths to absolute paths
    const transformedImages = Array.isArray(frontmatter.images)
      ? frontmatter.images
          .filter((image): image is Record<string, unknown> => typeof image === 'object' && image !== null)
          .map((image) => {
            const imageData = image as ContentImage;
            const srcValue = typeof imageData.src === 'string' ? imageData.src : '';

            return {
              src: srcValue.startsWith('/') ? srcValue : `/${type}/${srcValue}`,
              alt: typeof imageData.alt === 'string' ? imageData.alt : '',
            };
          })
      : undefined;

    // Process markdown content to HTML
    let htmlContent = '';
    try {
      const processedContent = preprocessComponentPlaceholders(content);
      htmlContent = marked.parse(processedContent) as string;
    } catch (error) {
      console.error(`Error processing markdown in ${filePath}:`, error);
      htmlContent = content; // Fallback to raw content
    }

    return {
      title: toString(frontmatter.title),
      slug: toString(frontmatter.slug),
      description: toString(frontmatter.description),
      date: toString(frontmatter.date),
      author: toString(frontmatter.author),
      tags: toStringArray(frontmatter.tags),
      featured: Boolean(frontmatter.featured),
      readingTime: Number(frontmatter.readingTime) || 0,
      published: Boolean(frontmatter.published),
      links: toLinks(frontmatter.links),
      images: transformedImages,
      content,
      htmlContent,
      type,
      filePath,
      
      // Enhanced fields
      components: toStringArray(frontmatter.components),
      componentConfig: (typeof frontmatter.componentConfig === 'object' && frontmatter.componentConfig !== null)
        ? (frontmatter.componentConfig as Record<string, unknown>)
        : {},
      toolType: typeof frontmatter.toolType === 'string' ? frontmatter.toolType : undefined,
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
  
  return posts.map((post) => {
    const { content, htmlContent, ...summary } = post;
    void content;
    void htmlContent;
    return summary;
  });
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