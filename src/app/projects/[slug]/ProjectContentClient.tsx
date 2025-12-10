'use client';

import { FadeIn } from "@/components/FadeIn";
import { ProjectsMarkdownData } from '@/schemas';
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface ProjectContentClientProps {
    projectData: Omit<ProjectsMarkdownData, 'structuredData'>;
    structuredDataJson?: string;
}

export function ProjectContentClient({ projectData, structuredDataJson }: ProjectContentClientProps) {
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
                <Container py="xl">
                    {/* Page Header */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '300px',
                            backgroundImage: `url(${projectData.image})`,
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
                            <Title order={1} size="h1" c="white" mb="md" style={{ fontSize: '2.5rem' }}>
                                {projectData.title}
                            </Title>
                            <Text c="gray.2" size="xl" maw={800} mx="auto">
                                {projectData.overview}
                            </Text>
                        </div>
                    </div>
                    <Stack gap="xl">
                        {/* Back Button */}
                        <Button
                            onClick={() => handleLinkClick('/projects')}
                            variant="subtle"
                            size="sm"
                            style={{ alignSelf: 'flex-start' }}
                        >
                            ← Back to Projects
                        </Button>

                        {/* Project Header */}
                        <Stack gap="md">
                            <Group gap="xs">
                                <Badge variant="light" color="blue" size="lg">
                                    {projectData.category}
                                </Badge>
                                <Text size="sm" c="dimmed">
                                    {projectData.date}
                                </Text>
                            </Group>

                            <Text size="lg" c="gray.5" maw={800}>
                                {projectData.description}
                            </Text>
                        </Stack>

                        {/* Project Content */}
                        {projectData.contentHtml && (
                            <div
                                dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
                                style={{
                                    lineHeight: 1.6,
                                    fontSize: '16px',
                                }}
                            />
                        )}

                        {/* Action Buttons */}
                        <Group>
                            <Button
                                onClick={() => handleLinkClick('/projects')}
                                variant="filled"
                                size="lg"
                            >
                                View More Projects
                            </Button>

                            <Button
                                onClick={() => handleLinkClick('/#contact')}
                                variant="outline"
                                size="lg"
                            >
                                Get In Touch
                            </Button>

                            {projectData.github && (
                                <Button
                                    onClick={() => handleLinkClick(projectData.github!)}
                                    variant="outline"
                                    size="lg"
                                >
                                    GitHub Repository
                                </Button>
                            )}
                        </Group>
                    </Stack>
                </Container>
            </FadeIn>
        </>
    );
}