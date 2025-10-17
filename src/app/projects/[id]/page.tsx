import { HeroImageRight } from '@/components/Hero/HeroImageRight';
import { getAllProjectIds, getProjectData } from '@/lib/markdown';
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectData {
    id: number;
    title: string;
    slug: string;
    category: string;
    image: string;
    date: string;
    description: string;
    url?: string;
    contentHtml: string;
}

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const projectIds = getAllProjectIds();
    return projectIds.map((id) => ({
        id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    try {
        const projectData = await getProjectData<ProjectData>(resolvedParams.id);
        return {
            title: `${projectData.title} | Edward Whitehead`,
            description: projectData.description,
            openGraph: {
                title: projectData.title,
                description: projectData.description,
                images: [projectData.image],
            },
        };
    } catch {
        return {
            title: 'Project Not Found | Edward Whitehead',
            description: 'The requested project could not be found.',
        };
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const resolvedParams = await params;
    let projectData: ProjectData;

    try {
        projectData = await getProjectData<ProjectData>(resolvedParams.id);
    } catch {
        notFound();
    }

    return (
        <>
            <HeroImageRight
                title={projectData.title}
                description={projectData.description}
                image={projectData.image}
            />

            <Container size="md" py="xl">
                <Stack gap="xl">
                    {/* Back Button */}
                    <Button
                        component={Link}
                        href="/"
                        variant="subtle"
                        size="sm"
                        style={{ alignSelf: 'flex-start' }}
                    >
                        ← Back to Home
                    </Button>

                    {/* Project Header */}
                    <Stack gap="md">
                        <Badge variant="light" size="lg" color="blue">
                            {projectData.category}
                        </Badge>

                        <Title order={1} size="h1" c={'white'} style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                            {projectData.title}
                        </Title>

                        <Text c="dimmed" size="lg">
                            {projectData.date}
                        </Text>

                        <Text size="xl" lh={1.6} c={'gray.5'}>
                            {projectData.description}
                        </Text>
                    </Stack>

                    {/* Project Image */}
                    {projectData.image && (
                        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
                            <Image
                                src={projectData.image}
                                alt={projectData.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                loading='lazy'
                            />
                        </div>
                    )}

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
                            component={Link}
                            href="/projects"
                            variant="filled"
                            size="lg"
                        >
                            View More Projects
                        </Button>

                        <Button
                            component={Link}
                            href="/#contact"
                            variant="outline"
                            size="lg"
                        >
                            Get In Touch
                        </Button>

                        {projectData.url && (
                            <Button
                                component={Link}
                                href={projectData.url}
                                variant="outline"
                                size="lg"
                                target='_blank'
                                rel='noreferrer'
                            >
                                GitHub Repository
                            </Button>
                        )}
                    </Group>
                </Stack>
            </Container>
        </>
    );
}