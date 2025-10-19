import { getAllBlogSlugs, getBlogPostBySlug, BlogPost } from '@/lib/markdown';
import { Badge, Button, Container, Group, Image, Stack, Text, Title } from '@mantine/core';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IconCalendar, IconCategory, IconTag } from '@tabler/icons-react';

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
    const postData = await getBlogPostBySlug<BlogPost>(resolvedParams.slug);
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
  let postData: BlogPost;

  try {
    postData = await getBlogPostBySlug<BlogPost>(resolvedParams.slug);
  } catch {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      {postData.image && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            backgroundImage: `url(${postData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              width: '100%',
              padding: '40px 20px 20px',
            }}
          >
            <Container size="lg">
              <Stack gap="md">
                <Group gap="xs">
                  <Badge variant="light" color="blue" size="lg">
                    <IconCategory size={14} style={{ marginRight: 4 }} />
                    {postData.category}
                  </Badge>
                  <Text size="sm" c="white">
                    <IconCalendar size={14} style={{ marginRight: 4 }} />
                    {new Date(postData.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </Group>

                <Title order={1} size="h1" c="white" style={{ fontSize: '2.5rem' }}>
                  {postData.title}
                </Title>

                <Text size="xl" c="gray.2" maw={800}>
                  {postData.description}
                </Text>

                {postData.tags && postData.tags.length > 0 && (
                  <Group gap={8}>
                    {postData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" color="gray">
                        <IconTag size={12} style={{ marginRight: 4 }} />
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                )}
              </Stack>
            </Container>
          </div>
        </div>
      )}

      {/* Content Section */}
      <Container size="md" py="xl">
        <Stack gap="xl">
          {/* Back Button */}
          <Button
            component={Link}
            href="/blog"
            variant="subtle"
            size="sm"
            style={{ alignSelf: 'flex-start' }}
          >
            ← Back to Blog
          </Button>

          {/* Article Header (if no hero image) */}
          {!postData.image && (
            <Stack gap="md">
              <Group gap="xs">
                <Badge variant="light" color="blue" size="lg">
                  <IconCategory size={14} style={{ marginRight: 4 }} />
                  {postData.category}
                </Badge>
                <Text size="sm" c="dimmed">
                  <IconCalendar size={14} style={{ marginRight: 4 }} />
                  {new Date(postData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </Group>

              <Title order={1} size="h1" c="white">
                {postData.title}
              </Title>

              <Text size="xl" c="gray.5" maw={800}>
                {postData.description}
              </Text>

              {postData.tags && postData.tags.length > 0 && (
                <Group gap={8}>
                  {postData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" color="gray">
                      <IconTag size={12} style={{ marginRight: 4 }} />
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}
            </Stack>
          )}

          {/* Article Content */}
          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            style={{
              lineHeight: 1.7,
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          />

          {/* Article Footer */}
          <Stack gap="md" pt="xl" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Group>
              <Button
                component={Link}
                href="/blog"
                variant="filled"
                size="lg"
              >
                ← Back to Blog
              </Button>

              <Button
                component={Link}
                href="/#contact"
                variant="outline"
                size="lg"
              >
                Get In Touch
              </Button>
            </Group>

            {postData.tags && postData.tags.length > 0 && (
              <Group gap={8}>
                <Text size="sm" c="dimmed">Tags:</Text>
                {postData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </Group>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
