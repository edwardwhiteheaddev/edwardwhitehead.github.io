import { getMarkdownData } from "@/lib/markdown";
import { AboutClient } from "./AboutClient";
import { ContactSection } from "@/components/kyros/Contact";
import { ContactMarkdownData } from '@/schemas';
import { ScrollToTop } from "@/components/kyros/ScrollToTop";

interface AboutData {
  title: string;
  contentHtml: string;
  skillProgress?: { label: string; value: number }[];
}

export const metadata = {
  title: "About | Edward Whitehead",
  description: "Edward Whitehead, professional experience and skills.",
};

export default async function AboutPage() {
  const [
    aboutData,
    contactData
  ] = await Promise.all([
    getMarkdownData<AboutData>("about"),
    getMarkdownData<ContactMarkdownData>('contact'),
  ]);
  return (
    <>
      <AboutClient data={aboutData} />
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
