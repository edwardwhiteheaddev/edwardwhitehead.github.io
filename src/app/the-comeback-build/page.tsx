import Logo from "@/assets/logo.png";
import { AboutSection } from './components/About';
import { HeroSection } from './components/Hero';
import { Preloader } from "@/components/kyros/Preloader";
import { getMarkdownData } from "@/lib/markdown";
import { normalizeButtons } from "@/lib/normalizers";
import { TbcAboutMarkdownData, HeroMarkdownData } from "@/schemas";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    robots: {
        index: true,
        follow: true,
        nocache: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
    },
    title: "The Comeback Build",
    description: "Built fast. Built right. Built by experience.",
    formatDetection: {
        telephone: false
    },
    openGraph: {
        locale: "en_US",
        type: "website",
        title: "The Comeback Build",
        description: "Built fast. Built right. Built by experience.",
        url: "https://edwardwhitehead.dev/the-comeback-build",
        siteName: "The Comeback Build",
        images: [
            {
                url: "https://edwardwhitehead.dev/assets/images/the-comeback-build-og-image.png",
                width: 1200,
                height: 630,
                alt: "The Comeback Build - Built fast. Built right. Built by experience.",
                type: "image/png"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "The Comeback Build - Built fast. Built right. Built by experience.",
        description: "Built fast. Built right. Built by experience.",
        images: [
            {
                url: "https://edwardwhitehead.dev/assets/images/the-comeback-build-og-image.png",
                width: 1200,
                height: 630,
                alt: "The Comeback Build - Built fast. Built right. Built by experience.",
                type: "image/png"
            }
        ]
    },
    authors: [
        { name: "Edward Whitehead", url: "https://edwardwhitehead.dev" }
    ],
    creator: "Edward Whitehead",
    publisher: "Edward Whitehead",
    keywords: [
        "The Comeback Build",
        "Built fast",
        "Built right",
        "Built by experience",
        "Edward Whitehead",
        "edwardwhitehead.dev",
        "Next.js",
        "React",
        "JavaScript",
        "TypeScript",
        "Web Development",
        "Web Design",
        "Software Development",
        "Programming",
        "Frontend",
        "Backend",
        "Full Stack",
        "Development",
        "Design",
        "Software Engineer",
        "Developer",
        "Websites",
        "Apps",
        "Applications",
        "Portfolio",
        "Projects",
        "Tech",
        "Technology",
        "Innovation",
        "Coding",
        "Tutorials",
        "Blog",
        "Learning",
        "Tips",
        "Tricks",
        "Resources",
        "Tools",
        "Guides",
        "How To",
        "Best Practices",
        "Industry Insights",
        "Career",
        "Growth",
        "Business",
        "Marketing",
        "Sales",
        "Customer Service",
        "South Africa",
        "Business Directory",
        "Local Services",
        "Find the Best"
    ],
    applicationName: "The Comeback Build",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    icons: {
        icon: "/favicon.ico",
        shortcut: `${Logo.src}`
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    minimumScale: 1,
    themeColor: {
        color: "#000000",
        media: "(prefers-color-scheme: dark)"
    },
    colorScheme: "dark",
};

export default async function TheComebackBuildPage() {
    const [
        aboutData,
        heroData,
        // skillsData,
        // experienceData,
        // projectsData,
        // contactData,
    ] = await Promise.all([
        getMarkdownData<TbcAboutMarkdownData>('the-comeback-build/tcb-about'),
        getMarkdownData<HeroMarkdownData>('the-comeback-build/tcb-hero'),
    ]);

    return (
        <div className="relative">
            {/* Full screen hero section */}
            <div className="relative w-full h-screen">
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
            </div>

            {/* About Me section */}
            <div className="w-full bg-white p-8 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <AboutSection
                        title={aboutData.title}
                        contentHtml={aboutData.contentHtml}
                        skillProgress={aboutData.skillProgress ?? []}
                    />
                </div>
            </div>
        </div>
    );
}