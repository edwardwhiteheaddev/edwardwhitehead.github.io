import { getAllProjects } from "@/lib/markdown";
import { ProjectsClient } from "./ProjectsClient";
import LoadingFallback from "@/lib/loading-fallback";
import { Suspense } from "react";

export const metadata = {
  title: "Projects | Edward Whitehead",
  description: "A selection of projects by Edward Whitehead.",
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProjectsClient projects={allProjects} />
    </Suspense>
  );
}
