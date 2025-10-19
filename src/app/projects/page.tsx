import { getAllProjects, Project } from "@/lib/markdown";
import { ProjectsClient } from "./ProjectsClient";
import { Suspense } from "react";
import LoadingFallback from "@/lib/loading-fallback";

export const revalidate = 0; // Revalidate on every request

export const metadata = {
  title: "Projects | Edward Whitehead",
  description: "A selection of projects by Edward Whitehead.",
};

function ProjectsContent({ projects }: { projects: Project[] }) {
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
