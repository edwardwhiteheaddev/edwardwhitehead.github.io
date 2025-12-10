import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/markdown';
import { BlogPostMarkdownData } from '@/schemas';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogContentClient } from './BlogContentClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogSlugs = getAllBlogSlugs();
  return blogSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const postData = await getBlogPostBySlug<BlogPostMarkdownData>(resolvedParams.slug);
    return {
      title: `${postData.title} | Edward Whitehead`,
      description: postData.description,
      openGraph: {
        title: postData.title,
        description: postData.description,
        images: postData.image ? [postData.image] : [],
        type: 'article',
        publishedTime: postData.date,
        authors: ['Edward Whitehead'],
        tags: postData.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: postData.description,
        images: postData.image ? [postData.image] : [],
      },
    };
  } catch {
    return {
      title: 'Blog Post Not Found | Edward Whitehead',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  let postData: BlogPostMarkdownData;

  try {
    postData = await getBlogPostBySlug<BlogPostMarkdownData>(resolvedParams.slug);
  } catch {
    notFound();
  }

  // Extract structured data and serialize it separately to avoid serialization issues
  const { structuredData, ...cleanPostData } = postData;
  const structuredDataJson = structuredData ? JSON.stringify(structuredData) : undefined;

  return (
    <BlogContentClient
      postData={cleanPostData as Omit<BlogPostMarkdownData, 'structuredData'>}
      structuredDataJson={structuredDataJson}
    />
  );
}
