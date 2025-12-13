# Sitemap Generator

This project includes a comprehensive sitemap generator for SEO optimization.

## Features

- ✅ **Dynamic API Route** - Auto-generates sitemap at `/sitemap.xml`
- ✅ **Static Generation** - Build-time sitemap creation
- ✅ **Configurable URLs** - Easy to add/modify pages
- ✅ **SEO Optimized** - Includes lastmod, changefreq, priority
- ✅ **Caching** - Performance optimized responses

## Usage

### 1. Dynamic Sitemap (Recommended)

The sitemap is automatically available at:
```
https://yoursite.com/sitemap.xml
```

### 2. Static Generation

Generate a static sitemap file:

```bash
# Run the generation script
node scripts/generate-sitemap.mjs

# Or add to package.json scripts:
npm run generate-sitemap
```

### 3. Build Integration

Add to your `package.json`:

```json
{
  "scripts": {
    "generate-sitemap": "node scripts/generate-sitemap.mjs",
    "build": "next build && npm run generate-sitemap"
  }
}
```

## Configuration

### Environment Variables

Set your base URL in `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Adding New URLs

Update `app/utils/sitemap.ts` in the `getDefaultSitemapConfig` function:

```typescript
urls: [
  {
    url: '/new-page',
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8
  }
]
```

### URL Properties

- **url**: Page path (relative or absolute)
- **lastModified**: ISO date string (optional)
- **changeFrequency**: How often page changes (optional)
- **priority**: Relative importance 0.0-1.0 (optional)

## Files Created

1. **`app/utils/sitemap.ts`** - Core sitemap generation utilities
2. **`app/sitemap.xml/route.ts`** - Next.js API route for dynamic serving
3. **`scripts/generate-sitemap.mjs`** - Static generation script
4. **`public/sitemap.xml`** - Generated static file (when using script)

## SEO Benefits

- 📈 **Better Crawling** - Search engines discover all pages
- 🚀 **Faster Indexing** - Pages get indexed quicker
- 📊 **Priority Signals** - Indicate important pages
- 🔄 **Update Frequency** - Signal content freshness

## Next Steps

1. Update `NEXT_PUBLIC_BASE_URL` in your environment
2. Add all your pages to the sitemap configuration
3. Submit sitemap to Google Search Console
4. Set up automatic regeneration on content updates