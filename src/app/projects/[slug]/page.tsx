import LoadingFallback from '@/lib/loading-fallback';
import { getProjectData, getMarkdownData } from '@/lib/markdown';
import { ContactMarkdownData, ProjectsMarkdownData } from '@/schemas';
import { Button, Container, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProjectContentClient } from './ProjectContentClient';

import { ScrollToTop } from '@/components/kyros/ScrollToTop';
import { ContactSection } from '@/components/kyros/Contact';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Readonly<ProjectPageProps>) {
  const resolvedParams = await params;

  let projectData: ProjectsMarkdownData | undefined;

  try {
    // Fetch project data
    projectData = await getProjectData<ProjectsMarkdownData>(resolvedParams.slug);
  } catch (error) {
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

  // Extract structured data and serialize it separately to avoid serialization issues
  const { structuredData, ...cleanProjectData } = projectData;
  const structuredDataJson = structuredData ? JSON.stringify(structuredData) : undefined;

  // Fetch contact data
  const contactData = await getMarkdownData<ContactMarkdownData>('contact');

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProjectContentClient
        projectData={cleanProjectData as Omit<ProjectsMarkdownData, 'structuredData'>}
        structuredDataJson={structuredDataJson}
      />
      <ContactSection
              title={contactData.title}
              subtitle={contactData.subtitle}
              email={contactData.email}
              phone={contactData.phone}
              location={contactData.location}
              socials={contactData.socials ?? []}
              bodyHtml={contactData.contentHtml}
            />
            <ScrollToTop />
    </Suspense>
  );
}

export {generateStaticParams, generateMetadata} from './metadata';