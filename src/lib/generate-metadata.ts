import { Metadata } from "next";
import { getMarkdownData } from "./markdown";
import { MetadataData, ProjectsMarkdownData } from "@/schemas";

export async function generateMetadata({ metaDataFile, projectData }: { metaDataFile?: string; projectData?: ProjectsMarkdownData }): Promise<Metadata> {
    // If project data is provided, use it for metadata
    if (projectData) {
        const allowedTwitterCards = ['summary', 'summary_large_image', 'app', 'player'] as const;
        const twitterCard = allowedTwitterCards.find((card) => card === projectData.twitterCard) ?? 'summary_large_image';

        return {
            metadataBase: new URL('https://edwardwhitehead.dev'),
            title: projectData.metaTitle || `${projectData.title} | Edward Whitehead`,
            description: projectData.metaDescription || projectData.description,
            keywords: projectData.keywords,
            openGraph: {
                siteName: 'Edward Whitehead',
                locale: 'en_US',
                type: 'website',
                title: projectData.ogTitle || projectData.title,
                description: projectData.ogDescription || projectData.description,
                images: projectData.ogImage ? [{ url: projectData.ogImage }] : projectData.image ? [{ url: projectData.image }] : undefined,
                url: projectData.canonicalUrl || `https://edwardwhitehead.dev/projects/${projectData.slug}`,
            },
            twitter: {
                card: twitterCard,
                title: projectData.twitterTitle || projectData.title,
                description: projectData.twitterDescription || projectData.description,
                images: projectData.twitterImage ? [projectData.twitterImage] : projectData.image ? [projectData.image] : undefined,
            },
            icons: {
                icon: '/favicon.ico',
            },
            robots: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1
            },
            alternates: {
                canonical: projectData.canonicalUrl || `https://edwardwhitehead.dev/projects/${projectData.slug}`,
            }
        };
    }

    // Fallback to general metadata if no project data provided
    if (metaDataFile) {
        try {
            const metadataData = await getMarkdownData<MetadataData>(metaDataFile);
            const allowedTwitterCards = ['summary', 'summary_large_image', 'app', 'player'] as const;
            const twitterCard = allowedTwitterCards.find((card) => card === metadataData.twitterCard) ?? 'summary_large_image';

            return {
                metadataBase: new URL('https://edwardwhitehead.dev'),
                title: metadataData.title,
                description: metadataData.description,
                keywords: metadataData.keywords,
                creator: metadataData.author,
                authors: metadataData.author ? [{ name: metadataData.author }] : undefined,
                applicationName: metadataData.applicationName,
                generator: metadataData.generator,
                openGraph: {
                    siteName: metadataData.applicationName,
                    locale: metadataData.locale,
                    type: 'website',
                    title: metadataData.ogTitle || metadataData.title,
                    description: metadataData.ogDescription || metadataData.description,
                    images: metadataData.ogImage ? [metadataData.ogImage] : undefined,
                    url: new URL('https://edwardwhitehead.dev'),
                },
                twitter: {
                    card: twitterCard,
                    title: metadataData.twitterTitle || metadataData.title,
                    description: metadataData.twitterDescription || metadataData.description,
                    images: metadataData.twitterImage ? [metadataData.twitterImage] : undefined,
                },
                icons: {
                    icon: '/favicon.ico',
                },
                robots: {
                    index: true,
                    follow: false,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                    "max-video-preview": -1
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

    // Final fallback
    return {
        title: 'Edward Whitehead | Seasoned Software Developer',
        description:
            "Welcome to the personal resume website of Edward Whitehead, a software developer specializing in AI, web, and mobile projects.",
    };
}