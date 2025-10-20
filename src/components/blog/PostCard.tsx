import { Badge, Button, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import { BlogPostMarkdownData } from '@/schemas';
import Link from 'next/link';
import { IconCalendar, IconCategory, IconTag } from '@tabler/icons-react';

interface PostCardProps {
  post: BlogPostMarkdownData;
  variant?: 'featured' | 'compact' | 'detailed';
  showTags?: boolean;
  showDescription?: boolean;
}

export function PostCard({
  post,
  variant = 'compact',
  showTags = true,
  showDescription = true
}: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (variant === 'featured') {
    return (
      <Card
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
            <IconCategory size={14} style={{ marginRight: 4 }} />
            {post.category}
          </Badge>
          <Text size="sm" c="dimmed">
            <IconCalendar size={14} style={{ marginRight: 4 }} />
            {formattedDate}
          </Text>
        </Group>

        <Text fw={500} size="lg" c="white" mb="sm" lineClamp={2}>
          {post.title}
        </Text>

        {showDescription && (
          <Text size="sm" c="dimmed" lineClamp={3} mb="md">
            {post.description}
          </Text>
        )}

        {showTags && post.tags && post.tags.length > 0 && (
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
    );
  }

  if (variant === 'detailed') {
    return (
      <Card
        shadow="sm"
        padding="xl"
        component={Link}
        href={`/blog/${post.slug}`}
        style={{
          textDecoration: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
        }}
      >
        <Stack gap="lg">
          <div>
            {post.image && (
              <Image
                src={post.image}
                height={200}
                alt={post.title}
                style={{ borderRadius: '8px' }}
              />
            )}
          </div>

          <Stack gap="md">
            <Group gap="xs">
              <Badge variant="light" color="blue" size="lg">
                <IconCategory size={14} style={{ marginRight: 4 }} />
                {post.category}
              </Badge>
              <Text size="sm" c="dimmed">
                <IconCalendar size={14} style={{ marginRight: 4 }} />
                {formattedDate}
              </Text>
            </Group>

            <Title order={3} c="white" lineClamp={2}>
              {post.title}
            </Title>

            {showDescription && (
              <Text size="lg" c="gray.5" lineClamp={3}>
                {post.description}
              </Text>
            )}

            {showTags && post.tags && post.tags.length > 0 && (
              <Group gap={8}>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" color="gray">
                    <IconTag size={12} style={{ marginRight: 4 }} />
                    {tag}
                  </Badge>
                ))}
              </Group>
            )}
          </Stack>
        </Stack>
      </Card>
    );
  }

  // Compact variant (default)
  return (
    <Card
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
            <IconCategory size={14} style={{ marginRight: 4 }} />
            {post.category}
          </Badge>
          <Text size="sm" c="dimmed">
            <IconCalendar size={14} style={{ marginRight: 4 }} />
            {formattedDate}
          </Text>
        </Group>

        <Text fw={500} size="lg" c="white" lineClamp={2}>
          {post.title}
        </Text>

        {showDescription && (
          <Text size="sm" c="dimmed" lineClamp={3}>
            {post.description}
          </Text>
        )}

        {showTags && post.tags && post.tags.length > 0 && (
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
  );
}
