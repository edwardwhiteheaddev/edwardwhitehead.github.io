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

export function BlogContentClient({ postData, structuredDataJson }: BlogContentClientProps) {
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
                {/* Hero Section */}
                <Container size="lg" py="xl">
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '300px',
                            backgroundImage: postData.image
                                ? `url(${postData.image})`
                                : 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170)',
                            backgroundColor: '#1a1b1e',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '3rem',
                            border: '1px solid rgba(220, 38, 38, 0.2)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Dark overlay for text readability */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                                zIndex: 1,
                            }}
                        />
                        <div style={{ textAlign: 'center', padding: '2rem', position: 'relative', zIndex: 2 }}>
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
                </Container>

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
