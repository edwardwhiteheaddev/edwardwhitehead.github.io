import { getMarkdownData } from "@/lib/markdown";
import { ExperienceClient } from "./ExperienceClient";

interface Job {
  role: string;
  company: string;
  dates: string;
  description: string;
  skills: string;
}

interface ExperienceData {
  title: string;
  jobs: Job[];
}

export const metadata = {
  title: "Professional Experience | Edward Whitehead",
  description: "A detailed history of Edward Whitehead's professional roles and accomplishments.",
};

export default async function ExperiencePage() {
  const experienceData = await getMarkdownData<ExperienceData>("experience");
  return <ExperienceClient data={experienceData} />;
}
