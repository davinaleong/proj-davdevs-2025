import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostType = 'projects' | 'articles' | 'fem-solutions' | 'notebooks' | 'tools' | 'sermons' | 'static' | 'technical-demos';

export interface PostMetadata {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  published: boolean;
}

export interface Post extends PostMetadata {
  content: string;
  type: PostType;
  filePath: string;
}

export interface PostSummary extends PostMetadata {
  type: PostType;
  filePath: string;
}

/**
 * Get the content directory path for a given post type
 */
function getContentDir(type: PostType): string {
  const contentRoot = path.join(process.cwd(), 'app', 'content');
  return path.join(contentRoot, type);
}

/**
 * Parse a single MDX file and extract metadata
 */
function parsePostFile(filePath: string, type: PostType): Post | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validate required fields
    const requiredFields: (keyof PostMetadata)[] = [
      'title', 'slug', 'description', 'date', 'author', 'tags', 'featured', 'readingTime', 'published'
    ];
    
    for (const field of requiredFields) {
      if (!(field in data)) {
        console.warn(`Missing required field '${field}' in ${filePath}`);
        return null;
      }
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
      content,
      type,
      filePath
    };
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all posts of a specific type
 */
export function getPostsByType(type: PostType): Post[] {
  const contentDir = getContentDir(type);
  
  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory does not exist: ${contentDir}`);
    return [];
  }

  try {
    const files = fs.readdirSync(contentDir);
    const posts: Post[] = [];

    for (const file of files) {
      // Only process .md and .mdx files
      if (!/\.(md|mdx)$/.test(file)) {
        continue;
      }

      const filePath = path.join(contentDir, file);
      const post = parsePostFile(filePath, type);
      
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
 * Get the latest N posts of a specific type
 */
export function getLatestPostsByType(type: PostType, count: number = 3): PostSummary[] {
  const posts = getPostsByType(type);
  return posts.slice(0, count).map(post => ({
    title: post.title,
    slug: post.slug,
    description: post.description,
    date: post.date,
    author: post.author,
    tags: post.tags,
    featured: post.featured,
    readingTime: post.readingTime,
    published: post.published,
    type: post.type,
    filePath: post.filePath
  }));
}

/**
 * Get latest posts from all types
 */
export function getLatestPostsAllTypes(countPerType: number = 3): Record<PostType, PostSummary[]> {
  const types: PostType[] = ['projects', 'articles', 'fem-solutions', 'notebooks', 'tools', 'sermons', 'static'];
  const result: Record<PostType, PostSummary[]> = {} as Record<PostType, PostSummary[]>;

  for (const type of types) {
    result[type] = getLatestPostsByType(type, countPerType);
  }

  return result;
}

/**
 * Get a single post by type and slug
 */
export function getPostBySlug(type: PostType, slug: string): Post | null {
  const posts = getPostsByType(type);
  return posts.find(post => post.slug === slug) || null;
}

/**
 * Get all posts across all types, sorted by date
 */
export function getAllPostsSorted(limit?: number): PostSummary[] {
  const types: PostType[] = ['projects', 'articles', 'fem-solutions', 'notebooks', 'tools', 'sermons', 'static'];
  const allPosts: PostSummary[] = [];

  for (const type of types) {
    const posts = getPostsByType(type);
    // getPostsByType now already filters for published posts
    allPosts.push(...posts.map(post => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      date: post.date,
      author: post.author,
      tags: post.tags,
      featured: post.featured,
      readingTime: post.readingTime,
      published: post.published,
      type: post.type,
      filePath: post.filePath
    })));
  }

  // Sort by date (newest first)
  const sorted = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get featured posts across all types
 */
export function getFeaturedPosts(limit?: number): PostSummary[] {
  const allPosts = getAllPostsSorted();
  const featuredPosts = allPosts.filter(post => post.featured);
  
  return limit ? featuredPosts.slice(0, limit) : featuredPosts;
}

/**
 * Get posts by tag across all types
 */
export function getPostsByTag(tag: string, limit?: number): PostSummary[] {
  const allPosts = getAllPostsSorted();
  const taggedPosts = allPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
  
  return limit ? taggedPosts.slice(0, limit) : taggedPosts;
}

/**
 * Get all unique tags across all posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllPostsSorted();
  const tagSet = new Set<string>();
  
  for (const post of allPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  
  return Array.from(tagSet).sort();
}