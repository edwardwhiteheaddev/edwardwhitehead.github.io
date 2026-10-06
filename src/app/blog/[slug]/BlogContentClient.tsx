'use client';

import { FadeIn } from '@/components/FadeIn';
import { BlogPostMarkdownData } from '@/schemas';
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconCalendar, IconCategory, IconTag } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface BlogContentClientProps {
    postData: Omit<BlogPostMarkdownData, 'structuredData'>;
    structuredDataJson?: string;
}

export function BlogContentClient({ postData, structuredDataJson }: Readonly<BlogContentClientProps>) {
    const router = useRouter();

    const handleLinkClick = (href: string) => {
        if (href.startsWith('http')) {
            window.open(href, '_blank');
        } else {
            router.push(href);
        }
    };

    return (
        <>
            {/* Structured Data for SEO/AEO */}
            {structuredDataJson && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: structuredDataJson,
                    }}
                />
            )}

            <FadeIn>
                <div className="experience-hero" style={{ backgroundImage: `url(${postData.image})` }}>
                    <div className="experience-hero__overlay" />
                    <div className="experience-hero__content">
                        <Group gap="xs" justify="center" mb="md">
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

                        <Title order={1} size="h1" c="white" mb="md" style={{ fontSize: '2.5rem' }}>
                            {postData.title}
                        </Title>

                        <Text c="gray.2" size="xl" maw={800} mx="auto" mb="md">
                            {postData.description}
                        </Text>

                        {postData.tags && postData.tags.length > 0 && (
                            <Group gap={8} justify="center">
                                {postData.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" color="gray">
                                        <IconTag size={12} style={{ marginRight: 4 }} />
                                        {tag}
                                    </Badge>
                                ))}
                            </Group>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <Container size="md" py="xl">
                    <Stack gap="xl">
                        {/* Back Button */}
                        <Button
                            onClick={() => handleLinkClick('/blog')}
                            variant="subtle"
                            size="sm"
                            style={{ alignSelf: 'flex-start' }}
                        >
                            ← Back to Blog
                        </Button>

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
                                    onClick={() => handleLinkClick('/blog')}
                                    variant="filled"
                                    size="lg"
                                >
                                    ← Back to Blog
                                </Button>

                                <Button
                                    onClick={() => handleLinkClick('/#contact')}
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
            </FadeIn>
        </>
    );
}
