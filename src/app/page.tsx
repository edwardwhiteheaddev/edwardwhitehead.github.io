import { HeroSection } from "@/components/Hero/HeroSection";
import { ProjectCardsGrid } from "@/components/ProjectCards/ProjectCardsSection";
import { getMarkdownData } from "@/lib/markdown";
import { HeroSectionProps } from "@/schemas/HeroSectionProps";


export const metadata = {
  title: "Edward Whitehead | Seasoned Software Developer",
  description: "Welcome to the personal resume website of Edward Whitehead, a software developer specializing in AI, web, and mobile projects.",
};

// interface AboutData {
//   contentHtml: string;
// }

interface ProjectsData {
  title: string;
  projects: {
    id: number;
    title: string;
    slug: string;
    category: string;
    image: string;
    date: string;
    description: string;
    url?: string;
  }[];
}

async function HomePage() {
  // const aboutData = await getMarkdownData<AboutData>("about");
  // const introSnippet = aboutData.contentHtml.split("</p>")[0] + "</p>";
  const heroData = await getMarkdownData<HeroSectionProps>("hero");
  const projectsData = await getMarkdownData<ProjectsData>("projects");

  return (
    <>
      <HeroSection
        title={heroData.title}
        titleGradientText={heroData.titleGradientText}
        titleEndText={heroData.titleEndText}
        description={heroData.description}
        contentHtml={heroData.contentHtml.replace(/<[^>]*>/g, '')} // Strip HTML tags for description
        btnGradientIsEnabled={heroData.btnGradientIsEnabled}
        btnGradientHref={heroData.btnGradientHref}
        btnGradientText={heroData.btnGradientText}
        btnDefaultIsEnabled={heroData.btnDefaultIsEnabled}
        btnDefaultHref={heroData.btnDefaultHref}
        btnDefaultText={heroData.btnDefaultText}
      />
      <ProjectCardsGrid
        title={projectsData.title}
        projects={projectsData.projects}
      />
    </>
  );
}

export default HomePage;
