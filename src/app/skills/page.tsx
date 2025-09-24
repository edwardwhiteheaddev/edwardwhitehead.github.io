import { getMarkdownData } from "@/lib/markdown";
import { SkillsClient } from "./SkillsClient";

interface SkillCategory {
  category: string;
  list: string;
}

interface SkillsData {
  title: string;
  skills: SkillCategory[];
  contentHtml: string;
}

export const metadata = {
  title: "Skills & Highlights | Edward Whitehead",
  description: "An overview of Edward Whitehead's core technical skills and career highlights.",
};

export default async function SkillsPage() {
  const skillsData = await getMarkdownData<SkillsData>("skills");
  return <SkillsClient data={skillsData} />;
}
