# Dynamic Sitemap Implementation

## Overview

A dynamic sitemap has been implemented for your portfolio site that automatically updates whenever content changes. The sitemap follows Next.js 15 conventions and includes all static and dynamic routes.

## Files Created

### 1. `/src/app/sitemap.ts`

This is the main sitemap generator that creates an XML sitemap at `/sitemap.xml`.

**Features:**

- ✅ Automatically includes all static pages (home, about, projects, blog, experience, skills, github, contact, the-comeback-build)
- ✅ Dynamically fetches and includes all blog posts from `/content/blog/`
- ✅ Dynamically fetches and includes all projects from `/content/projects/`
- ✅ Uses actual content dates for `lastModified` timestamps
- ✅ Sets appropriate `changeFrequency` and `priority` for SEO optimization
- ✅ Updates automatically when you add/remove/modify markdown files

**Priority Levels:**

- Homepage: 1.0 (highest)
- Projects & Blog listings: 0.9
- About & The Comeback Build: 0.8
- Individual projects: 0.8
- Experience & Skills: 0.7
- Individual blog posts: 0.7
- GitHub: 0.6
- Contact: 0.5

### 2. `/src/app/robots.ts`

This generates a `robots.txt` file at `/robots.txt` that tells search engines how to crawl your site.

**Features:**

- ✅ Allows all search engines to crawl your site
- ✅ Blocks crawling of `/api/`, `/_next/`, and `/private/` directories
- ✅ References your sitemap for search engines to discover all pages

## How It Works

### Automatic Updates

The sitemap is **dynamically generated at build time** and includes:

1. **Static Routes**: Hardcoded list of your main pages
2. **Blog Posts**: Fetched from `getAllBlogPosts()` - automatically includes any new blog posts you add
3. **Projects**: Fetched from `getAllProjects()` - automatically includes any new projects you add

### When Content Updates

Whenever you:

- Add a new blog post markdown file
- Add a new project markdown file
- Modify existing content
- Remove content

The sitemap will automatically reflect these changes on the next build.

## Accessing the Sitemap

### Development

Run your dev server and visit:

- Sitemap: `http://localhost:4000/sitemap.xml`
- Robots: `http://localhost:4000/robots.txt`

### Production

After deployment, your sitemap will be available at:

- Sitemap: `https://edwardwhitehead.dev/sitemap.xml`
- Robots: `https://edwardwhitehead.dev/robots.txt`

## SEO Benefits

1. **Search Engine Discovery**: Search engines can easily find all your pages
2. **Crawl Efficiency**: Helps search engines prioritize important pages
3. **Fresh Content**: `lastModified` dates help search engines know when to re-crawl
4. **Better Indexing**: All dynamic routes (blog posts, projects) are discoverable
5. **Robots.txt**: Prevents crawling of unnecessary paths, saving crawl budget

## Submit to Search Engines

After deployment, submit your sitemap to:

### Google Search Console

1. [Go to https://search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (edwardwhitehead.dev)
3. Navigate to "Sitemaps" in the left sidebar
4. Enter: `sitemap.xml`
5. Click "Submit"

### Bing Webmaster Tools

1. [Go to https://www.bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Navigate to "Sitemaps"
4. Submit: `https://edwardwhitehead.dev/sitemap.xml`

## Verification

To verify your sitemap is working:

```bash
# Build your site
npm run build

# Start production server
npm run start

# Visit in browser
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
```

You should see a properly formatted XML sitemap with all your routes.

## Customization

### Change Base URL

If your domain changes, update the `baseUrl` constant in both files:

```typescript
const baseUrl = 'https://your-new-domain.com';
```

### Adjust Priorities

Modify the `priority` values (0.0 to 1.0) based on page importance:

```typescript
{
  url: `${baseUrl}/your-page`,
  priority: 0.9, // Adjust this value
}
```

### Change Update Frequency

Adjust `changeFrequency` based on how often pages update:

- `'always'` - Changes constantly
- `'hourly'` - Updates every hour
- `'daily'` - Updates daily
- `'weekly'` - Updates weekly (default for most pages)
- `'monthly'` - Updates monthly
- `'yearly'` - Rarely changes
- `'never'` - Archived content

## Technical Details

- **Framework**: Next.js 15 App Router
- **Type Safety**: Full TypeScript support with `MetadataRoute` types
- **Build Time**: Generated during `next build`
- **Caching**: Automatically cached by Next.js
- **Format**: Standard XML sitemap protocol
- **Validation**: [Follows https://www.sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html)

## Troubleshooting

### Sitemap not showing

1. Run `npm run build` to regenerate
2. Clear your browser cache
3. Check for TypeScript errors in the terminal

### Missing routes

1. Verify markdown files exist in `/content/blog/` and `/content/projects/`
2. Check that files have proper frontmatter with required fields
3. Ensure `getAllBlogPosts()` and `getAllProjects()` are working

### Wrong dates

1. Check the `date` field in your markdown frontmatter
2. Ensure dates are in valid format (YYYY-MM-DD)

## Next Steps

1. ✅ Build your site: `npm run build`
2. ✅ Verify sitemap: Visit `/sitemap.xml` locally
3. ✅ Deploy to production
4. ✅ Submit to Google Search Console
5. ✅ Submit to Bing Webmaster Tools
6. ✅ Monitor indexing status in search console

Your sitemap is now live and will automatically update with any content changes! 🚀
