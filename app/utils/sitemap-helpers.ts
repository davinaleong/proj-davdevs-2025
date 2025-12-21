interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapConfig {
  baseUrl: string;
  urls: SitemapUrl[];
}

/**
 * Generate XML sitemap content
 */
export function generateSitemap(config: SitemapConfig): string {
  const { baseUrl, urls } = config;
  
  const urlsXml = urls.map(({ url, lastModified, changeFrequency, priority }) => {
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    
    return `  <url>
    <loc>${fullUrl}</loc>${lastModified ? `
    <lastmod>${lastModified}</lastmod>` : ''}${changeFrequency ? `
    <changefreq>${changeFrequency}</changefreq>` : ''}${priority ? `
    <priority>${priority}</priority>` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

/**
 * Get default sitemap configuration for the website
 */
export function getDefaultSitemapConfig(baseUrl: string = 'https://yourwebsite.com'): SitemapConfig {
  const currentDate = new Date().toISOString();
  
  return {
    baseUrl,
    urls: [
      {
        url: '/',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1.0
      },
      {
        url: '/articles',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/faith',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/fem',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/funny',
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.8
      },
      {
        url: '/knowledge-sharing',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/notebooks',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/projects',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/technical-demos',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/tools',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: '/test',
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.3
      }
    ]
  };
}

/**
 * Automatically discover routes from Next.js app directory (helper for manual configuration)
 */
export function getStaticRoutes(): string[] {
  // This is a helper - you'll need to manually maintain this list or use file system scanning
  return [
    '/',
    '/articles',
    '/faith',
    '/fem',
    '/funny',
    '/knowledge-sharing',
    '/notebooks',
    '/projects',
    '/technical-demos',
    '/tools',
    '/test'
  ];
}

// Helper functions for sitemap generation
// Use the separate script in /scripts/generate-sitemap.mjs for static sitemap generation