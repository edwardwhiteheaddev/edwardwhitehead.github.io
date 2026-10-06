import { getMarkdownData } from "@/lib/markdown";
import { ExperienceClient } from "./ExperienceClient";
import { ContactSection } from "@/components/kyros/Contact";
import { ContactMarkdownData, ExperienceMarkdownData } from '@/schemas';
import { ScrollToTop } from "@/components/kyros/ScrollToTop";

export const metadata = {
  title: "Professional Experience | Edward Whitehead",
  description: "A detailed history of Edward Whitehead's professional roles and accomplishments.",
};

export default async function ExperiencePage() {
  const [experienceData, contactData] = await Promise.all([
    getMarkdownData<ExperienceMarkdownData>("experience"),
    getMarkdownData<ContactMarkdownData>("contact")
  ]);
  return (
    <>
      <ExperienceClient experience={experienceData} title={experienceData.title} />
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
    </>
  );
}
