import { getMarkdownData } from "@/lib/markdown";
import { ProjectsClient } from "./ProjectsClient";

interface Project {
  name: string;
  description: string;
}

interface ProjectsData {
  title: string;
  projects: Project[];
}

export const metadata = {
  title: "Projects | Edward Whitehead",
  description: "A selection of projects by Edward Whitehead.",
};

export default async function ProjectsPage() {
  const projectsData = await getMarkdownData<ProjectsData>("projects");
  return <ProjectsClient data={projectsData} />;
}
