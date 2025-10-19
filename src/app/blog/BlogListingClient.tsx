'use client';

import { Badge, Button, Card, Container, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { BlogPost } from '@/lib/markdown';
import Link from 'next/link';
import { IconCalendar, IconCategory, IconEye } from '@tabler/icons-react';

interface BlogListingClientProps {
  posts: BlogPost[];
}

export function BlogListingClient({ posts }: BlogListingClientProps) {
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Page Header */}
        <div style={{ textAlign: 'center' }}>
          <Title order={1} size="h1" c="white" mb="md">
            Blog
          </Title>
          <Text c="dimmed" size="lg" maw={600} mx="auto">
            Insights and thoughts on web development, technology, and software engineering.
          </Text>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <Stack gap="md">
            <Title order={2} size="h2" c="white">
              Featured Posts
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {featuredPosts.map((post) => (
                <Card
                  key={post.slug}
                  shadow="md"
                  padding="lg"
                  component={Link}
                  href={`/blog/${post.slug}`}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                  }}
                >
                  {post.image && (
                    <Card.Section>
                      <Image
                        src={post.image}
                        height={160}
                        alt={post.title}
                      />
                    </Card.Section>
                  )}

                  <Group justify="space-between" mt="md" mb="xs">
                    <Badge variant="light" color="blue">
                      {post.category}
                    </Badge>
                    <Text size="sm" c="dimmed">
                      <IconCalendar size={14} style={{ marginRight: 4 }} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                  </Group>

                  <Text fw={500} size="lg" c="white" mb="sm" lineClamp={2}>
                    {post.title}
                  </Text>

                  <Text size="sm" c="dimmed" lineClamp={3} mb="md">
                    {post.description}
                  </Text>

                  {post.tags && post.tags.length > 0 && (
                    <Group gap={4} mb="md">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" size="xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" size="xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </Group>
                  )}

                  <Button variant="light" color="blue" fullWidth mt="auto">
                    Read More
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        )}

        {/* All Posts */}
        <Stack gap="md">
          <Title order={2} size="h2" c="white">
            All Posts
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            {posts.map((post) => (
              <Card
                key={post.slug}
                shadow="sm"
                padding="lg"
                component={Link}
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between">
                    <Badge variant="light" color="blue">
                      {post.category}
                    </Badge>
                    <Text size="sm" c="dimmed">
                      <IconCalendar size={14} style={{ marginRight: 4 }} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                  </Group>

                  <Text fw={500} size="lg" c="white" lineClamp={2}>
                    {post.title}
                  </Text>

                  <Text size="sm" c="dimmed" lineClamp={3}>
                    {post.description}
                  </Text>

                  {post.tags && post.tags.length > 0 && (
                    <Group gap={4}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" size="xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" size="xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </Group>
                  )}
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
}
