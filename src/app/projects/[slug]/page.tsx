import LoadingFallback from '@/lib/loading-fallback';
import { getProjectData } from '@/lib/markdown';
import { ProjectsMarkdownData } from '@/schemas';
import { Button, Container, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProjectContentClient } from './ProjectContentClient';
import { generateMetadata, generateStaticParams } from './metadata';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Re-export server functions for Next.js
export { generateMetadata, generateStaticParams };

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  console.log('ProjectPage - slug:', resolvedParams.slug);

  try {
    // Fetch project data
    const projectData = await getProjectData<ProjectsMarkdownData>(resolvedParams.slug);
    console.log('ProjectPage - data fetched successfully:', projectData.title);
    console.log('ProjectPage - contentHtml length:', projectData.contentHtml?.length || 0);

    // Extract structured data and serialize it separately to avoid serialization issues
    const { structuredData, ...cleanProjectData } = projectData;
    const structuredDataJson = structuredData ? JSON.stringify(structuredData) : undefined;

    return (
      <Suspense fallback={<LoadingFallback />}>
        <ProjectContentClient
          projectData={cleanProjectData as Omit<ProjectsMarkdownData, 'structuredData'>}
          structuredDataJson={structuredDataJson}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('ProjectPage - error fetching data:', error);
    return (
      <Container py="xl">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <Title order={1} c="red" mb="md">Project Not Found</Title>
          <Text c="dimmed" size="lg" mb="xl">
            The project &#34;{resolvedParams.slug}&#34; could not be found.
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
