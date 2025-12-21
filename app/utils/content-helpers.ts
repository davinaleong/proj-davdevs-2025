import { 
  getLatestPostsByType, 
  getLatestPostsAllTypes, 
  getAllPostsSorted,
  getFeaturedPosts,
  getPostsByTag,
  getAllTags,
  type PostType, 
  type PostSummary 
} from '../utils/content';

/**
 * Example usage of the content utility functions
 */

// Get latest 3 sermons
export function getLatestSermons(): PostSummary[] {
  return getLatestPostsByType('sermons', 3);
}

// Get latest 3 articles
export function getLatestArticles(): PostSummary[] {
  return getLatestPostsByType('articles', 3);
}

// Get latest 3 projects
export function getLatestProjects(): PostSummary[] {
  return getLatestPostsByType('projects', 3);
}

// Get latest 3 FEM solutions
export function getLatestFEMSolutions(): PostSummary[] {
  return getLatestPostsByType('fem', 3);
}

// Get latest 3 notebooks
export function getLatestNotebooks(): PostSummary[] {
  return getLatestPostsByType('notebooks', 3);
}

// Get latest 3 tools
export function getLatestTools(): PostSummary[] {
  return getLatestPostsByType('tools', 3);
}

// Get latest posts from all categories
export function getLatestFromAllCategories() {
  return getLatestPostsAllTypes(3);
}

// Get overall latest 10 posts across all types
export function getRecentPosts(): PostSummary[] {
  return getAllPostsSorted(10);
}

// Get featured posts for homepage
export function getFeaturedHomepagePosts(): PostSummary[] {
  return getFeaturedPosts(5);
}

// Get posts by specific tag
export function getPostsByFaithTag(): PostSummary[] {
  return getPostsByTag('Faith', 5);
}

// Get all available tags for tag cloud/filter
export function getAllContentTags(): string[] {
  return getAllTags();
}

/**
 * Component data fetcher functions for different pages
 */

// Homepage data
export interface HomepageData {
  featuredPosts: PostSummary[];
  latestByType: Record<PostType, PostSummary[]>;
  recentPosts: PostSummary[];
}

export function getHomepageData(): HomepageData {
  return {
    featuredPosts: getFeaturedPosts(3),
    latestByType: getLatestPostsAllTypes(2),
    recentPosts: getAllPostsSorted(6)
  };
}

// Blog page data
export interface BlogPageData {
  allPosts: PostSummary[];
  featuredPosts: PostSummary[];
  tags: string[];
}

export function getBlogPageData(): BlogPageData {
  return {
    allPosts: getAllPostsSorted(),
    featuredPosts: getFeaturedPosts(),
    tags: getAllTags()
  };
}

// Category page data
export function getCategoryPageData(type: PostType) {
  return {
    posts: getLatestPostsByType(type),
    relatedPosts: getAllPostsSorted(5).filter(post => post.type !== type)
  };
}