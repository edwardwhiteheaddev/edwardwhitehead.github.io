import { getAllProjects } from "@/lib/markdown";
import { ProjectsMarkdownData } from '@/schemas';
import { ProjectsClient } from "./ProjectsClient";
import { Suspense } from "react";
import LoadingFallback from "@/lib/loading-fallback";

export const revalidate = 0; // Revalidate on every request

export const metadata = {
  title: "Projects | Edward Whitehead",
  description: "A selection of projects by Edward Whitehead.",
};

function ProjectsContent({ projects }: { projects: ProjectsMarkdownData[] }) {
  return <ProjectsClient projects={projects} />;
}

export default async function ProjectsPage() {
  console.log('ProjectsPage: Starting to fetch projects...');
  const allProjects = await getAllProjects();
  console.log('ProjectsPage: Fetched projects:', allProjects.length, allProjects.map(p => p.title));

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProjectsContent projects={allProjects} />
    </Suspense>
  );
}
