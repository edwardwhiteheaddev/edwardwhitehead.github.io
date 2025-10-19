import { getProjectData, Project } from '@/lib/markdown';
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { FadeIn } from "@/components/FadeIn";
import { generateStaticParams, generateMetadata } from './metadata';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Re-export server functions for Next.js
// Note: This page is statically generated at build time for static export compatibility
export { generateStaticParams, generateMetadata };

function ProjectContent({ projectData }: { projectData: Project }) {
  return (
    <>
      {/* Structured Data for SEO/AEO */}
      {projectData.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectData.structuredData),
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
              component={Link}
              href="/projects"
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
      </FadeIn>
    </>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  console.log('ProjectPage - slug:', resolvedParams.slug);

  try {
    // Fetch project data
    const projectData = await getProjectData<Project>(resolvedParams.slug);
    console.log('ProjectPage - data fetched successfully:', projectData.title);
    console.log('ProjectPage - contentHtml length:', projectData.contentHtml?.length || 0);

    return <ProjectContent projectData={projectData} />;
  } catch (error) {
    console.error('ProjectPage - error fetching data:', error);
    return (
      <Container py="xl">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <Title order={1} c="red" mb="md">Project Not Found</Title>
          <Text c="dimmed" size="lg" mb="xl">
            The project "{resolvedParams.slug}" could not be found.
          </Text>
          <Text c="dimmed" size="sm" mb="xl">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </Text>
          <Button component={Link} href="/projects" variant="light">
            Back to Projects
          </Button>
        </div>
      </Container>
    );
  }
}
