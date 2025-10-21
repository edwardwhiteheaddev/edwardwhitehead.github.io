import { getAllProjects } from "@/lib/markdown";
import { ProjectsMarkdownData } from '@/schemas';
import { ProjectsClient } from "./ProjectsClient";
import { Suspense } from "react";
import LoadingFallback from "@/lib/loading-fallback";
import { Metadata } from "next";
import { generateMetadata as generateMetadataUtil } from '@/lib/generate-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataUtil({ metaDataFile: 'metadata' });
}

function ProjectsContent({ projects }: { projects: ProjectsMarkdownData[] }) {
  return <ProjectsClient projects={projects} />;
}

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProjectsContent projects={allProjects} />
    </Suspense>
  );
}
