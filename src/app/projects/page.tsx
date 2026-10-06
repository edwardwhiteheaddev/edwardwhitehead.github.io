import { getAllProjects, getMarkdownData } from "@/lib/markdown";
import { ContactMarkdownData, ProjectsMarkdownData } from "@/schemas";
import { ProjectsClient } from "./ProjectsClient";
import { Suspense } from "react";
import LoadingFallback from "@/lib/loading-fallback";
import { Metadata } from "next";
import { generateMetadata as generateMetadataUtil } from "@/lib/generate-metadata";
import { ContactSection } from "@/components/kyros/Contact";
import { ScrollToTop } from "@/components/kyros/ScrollToTop";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataUtil({ metaDataFile: "metadata" });
}

function ProjectsContent({
  projects,
}: Readonly<{ projects: ProjectsMarkdownData[] }>) {
  return <ProjectsClient projects={projects} />;
}

export default async function ProjectsPage() {
  const [allProjects, contactData] = await Promise.all([
    getAllProjects(),
    getMarkdownData<ContactMarkdownData>("contact"),
  ]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProjectsContent projects={allProjects} />
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
