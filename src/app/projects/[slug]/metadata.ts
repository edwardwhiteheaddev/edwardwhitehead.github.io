import { getAllProjectSlugs, getProjectData, Project } from '@/lib/markdown';
import { Metadata } from 'next';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projectSlugs = getAllProjectSlugs();
    return projectSlugs.map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    try {
        const projectData = await getProjectData<Project>(resolvedParams.slug);
        const { generateMetadata: generateMetadataUtil } = await import('@/lib/generate-metadata');
        return generateMetadataUtil({ projectData });
    } catch {
        return {
            title: 'Project Not Found | Edward Whitehead',
            description: 'The requested project could not be found.',
        };
    }
}
