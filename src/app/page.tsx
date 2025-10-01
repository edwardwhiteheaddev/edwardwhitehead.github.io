import { AboutSection } from '@/components/kyros/About';
import { ContactSection } from '@/components/kyros/Contact';
import { ExperienceSection } from '@/components/kyros/Experience';
import { HeroSection } from '@/components/kyros/Hero';
import { Preloader } from '@/components/kyros/Preloader';
import { ProjectsSection } from '@/components/kyros/Projects';
import { ScrollToTop } from '@/components/kyros/ScrollToTop';
import { SkillsSection } from '@/components/kyros/Skills';
import { getMarkdownData } from '@/lib/markdown';
import type { Metadata } from 'next';

interface MetadataData {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

interface HeroMarkdownData {
  name: string;
  title: string;
  titleGradientText?: string;
  titleEndText?: string;
  btnGradientIsEnabled: boolean;
  btnGradientHref: string;
  btnGradientText: string;
  btnDefaultIsEnabled: boolean;
  btnDefaultHref: string;
  btnDefaultText: string;
  typedPhrases?: string[];
  locations?: { label: string; description: string }[];
  contentHtml: string;
}

interface AboutMarkdownData {
  title: string;
  contentHtml: string;
  skillProgress?: { label: string; value: number }[];
}

interface SkillsMarkdownData {
  title: string;
  subtitle?: string;
  skills: { category: string; list: string }[];
  contentHtml: string;
}

interface ExperienceMarkdownData {
  title: string;
  jobs: {
    role: string;
    company: string;
    dates: string;
    description: string;
    skills?: string;
  }[];
}

interface ProjectsMarkdownData {
  title: string;
  projects: {
    id: number | string;
    title: string;
    slug?: string;
    category: string;
    image?: string;
    date?: string;
    description: string;
    url?: string;
  }[];
}

interface ContactMarkdownData {
  title: string;
  subtitle?: string;
  email: string;
  phone?: string;
  location?: string;
  socials?: { label: string; url: string }[];
  contentHtml: string;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const metadataData = await getMarkdownData<MetadataData>('metadata');
    const allowedTwitterCards = ['summary', 'summary_large_image', 'app', 'player'] as const;
    const twitterCard =
      allowedTwitterCards.find((card) => card === metadataData.twitterCard) ?? 'summary_large_image';
    return {
      title: metadataData.title,
      description: metadataData.description,
      keywords: metadataData.keywords,
      authors: metadataData.author ? [{ name: metadataData.author }] : undefined,
      openGraph: {
        title: metadataData.ogTitle || metadataData.title,
        description: metadataData.ogDescription || metadataData.description,
        images: metadataData.ogImage ? [metadataData.ogImage] : undefined,
        type: 'website',
      },
      twitter: {
        card: twitterCard,
        title: metadataData.twitterTitle || metadataData.title,
        description: metadataData.twitterDescription || metadataData.description,
        images: metadataData.twitterImage ? [metadataData.twitterImage] : undefined,
      },
    };
  } catch {
    return {
      title: 'Edward Whitehead | Seasoned Software Developer',
      description:
        "Welcome to the personal resume website of Edward Whitehead, a software developer specializing in AI, web, and mobile projects.",
    };
  }
}

function normalizeButtons(hero: HeroMarkdownData) {
  return [
    {
      text: hero.btnGradientText,
      href: hero.btnGradientHref,
      variant: 'primary' as const,
      enabled: hero.btnGradientIsEnabled,
    },
    {
      text: hero.btnDefaultText,
      href: hero.btnDefaultHref,
      variant: 'ghost' as const,
      enabled: hero.btnDefaultIsEnabled,
    },
  ];
}

export default async function HomePage() {
  const [
    heroData,
    aboutData,
    skillsData,
    experienceData,
    projectsData,
    contactData,
  ] = await Promise.all([
    getMarkdownData<HeroMarkdownData>('hero'),
    getMarkdownData<AboutMarkdownData>('about'),
    getMarkdownData<SkillsMarkdownData>('skills'),
    getMarkdownData<ExperienceMarkdownData>('experience'),
    getMarkdownData<ProjectsMarkdownData>('projects'),
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
      />
      <ExperienceSection
        title={experienceData.title}
        experience={experienceData.jobs ?? []}
      />
      <AboutSection
        title={aboutData.title}
        contentHtml={aboutData.contentHtml}
        skillProgress={aboutData.skillProgress ?? []}
      />
      <ProjectsSection title={projectsData.title} projects={projectsData.projects ?? []} />
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
