import { getMarkdownData } from "@/lib/markdown";
import { AboutClient } from "./AboutClient";

interface AboutData {
  title: string;
  contentHtml: string;
}

export const metadata = {
  title: "About Me | Edward Whitehead",
  description: "A summary of Edward Whitehead's professional experience and skills.",
};

export default async function AboutPage() {
  const aboutData = await getMarkdownData<AboutData>("about");
  return <AboutClient data={aboutData} />;
}
