'use client';

import { FadeIn } from "@/components/FadeIn";
import { ProjectsMarkdownData } from '@/schemas';
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface ProjectContentClientProps {
    projectData: Omit<ProjectsMarkdownData, 'structuredData'>;
    structuredDataJson?: string;
}

export function ProjectContentClient({ projectData, structuredDataJson }: Readonly<ProjectContentClientProps>) {
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
                {/* Page Header */}
                <div className="projects-content-hero">
                    <div className="projects-content__overlay" />
                    <div className="projects-content__content">
                        <Title order={1} size="h1" c="white" mb="sm">
                            {projectData.title}
                        </Title>
                        <Text c="gray.2" size="xl" maw={800} mx="auto">
                            {projectData.overview}
                        </Text>
                    </div>
                </div>

                <Container py="xl">
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