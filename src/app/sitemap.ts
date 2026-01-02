import { getAllBlogPosts, getAllProjects } from '@/lib/markdown';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://edwardwhitehead.dev';

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/experience`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/github`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/the-comeback-build`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/univrs`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
    ];

    // Dynamic blog post routes
    const blogPosts = await getAllBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic project routes
    const projects = await getAllProjects();
    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => {
        // Try to parse the date, fallback to current date if invalid
        let lastModified = new Date();
        try {
            // Extract first year from date strings like "2024 – 2026" or "Aug 2021 – Jun 2025"
            const yearMatch = project.date.match(/\d{4}/);
            if (yearMatch) {
                const year = yearMatch[0];
                lastModified = new Date(`${year}-01-01`);
            }
        } catch {
            // Use current date if parsing fails
            lastModified = new Date();
        }

        return {
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        };
    });

    return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
