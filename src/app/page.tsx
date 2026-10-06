import { ContactSection } from '@/components/kyros/Contact';
import { FeaturedBlogsSection } from '@/components/kyros/FeaturedBlogs';
import { HeroSection } from '@/components/kyros/Hero';
import { Preloader } from '@/components/kyros/Preloader';
import { ProjectsSection } from '@/components/kyros/Projects';
import { ScrollToTop } from '@/components/kyros/ScrollToTop';
import { SkillsSection } from '@/components/kyros/Skills';
import { generateMetadata as generateMetadataUtil } from '@/lib/generate-metadata';
import { getFeaturedBlogs, getFeaturedProjects, getMarkdownData } from '@/lib/markdown';
import { normalizeButtons } from '@/lib/normalizers';
import {
  ContactMarkdownData,
  HeroMarkdownData,
  SkillsMarkdownData
} from '@/schemas';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataUtil({ metaDataFile: 'metadata' });
}

export default async function HomePage() {
  const [
    heroData,
    skillsData,
    featuredProjects,
    featuredBlogs,
    contactData,
  ] = await Promise.all([
    getMarkdownData<HeroMarkdownData>('hero'),
    getMarkdownData<SkillsMarkdownData>('skills'),
    getFeaturedProjects(),
    getFeaturedBlogs(),
    getMarkdownData<ContactMarkdownData>('contact'),
  ]);

  return (
    <>
      <Preloader />
      <HeroSection
        name={heroData.name}
        title={heroData.title}
        titleGradientText={heroData.titleGradientText}
        titleEndText={heroData.titleEndText}
        descriptionHtml={heroData.contentHtml}
        typedPhrases={heroData.typedPhrases ?? []}
        locations={heroData.locations ?? []}
        buttons={normalizeButtons(heroData)}
      />
      <SkillsSection
        title={skillsData.title}
        subtitle={skillsData.subtitle}
        skills={skillsData.skills ?? []}
        contentHtml={skillsData.contentHtml}
      />
      <ProjectsSection title="Featured Projects" projects={featuredProjects} />
      <FeaturedBlogsSection title="Featured Blog Posts" blogs={featuredBlogs} />
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
