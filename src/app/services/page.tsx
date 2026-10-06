import { KyrosNavbar } from '@/components/kyros/Navbar';
import { Preloader } from '@/components/kyros/Preloader';
import { ServicesSection } from '@/components/kyros/Services';
import { getMarkdownData } from '@/lib/markdown';
import { ServicesMarkdownData } from '@/schemas';
import { Metadata, Viewport } from 'next';
import { ScrollToTop } from '@/components/kyros/ScrollToTop';

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL('https://edwardwhitehead.dev'),
        title: 'Services | Edward Whitehead',
        description: 'Straightforward, no-fuss AI-native and technical delivery services. AI product development, legacy modernisation, SaaS architecture, fractional CTO, and more.',
        openGraph: {
            title: 'Services | Edward Whitehead',
            description: 'Straightforward, no-fuss AI-native and technical delivery services.',
            type: 'website',
            images: '/assets/images/og-image.png',
        },
        twitter: {
            images: ['/assets/images/og-image.png'],
            title: 'Services | Edward Whitehead',
            description: 'Straightforward, no-fuss AI-native and technical delivery services.',
        },
    };
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#171a1d',
    colorScheme: 'dark',
};

export default async function ServicesPage() {
    const servicesData = await getMarkdownData<ServicesMarkdownData>('services');

    return (
        <>
            <Preloader />
            <KyrosNavbar />
            <main>
                <ServicesSection
                    title={servicesData.title}
                    subtitle={servicesData.subtitle}
                    introHtml={servicesData.introHtml}
                    services={servicesData.services ?? []}
                    engagementModels={servicesData.engagementModels ?? []}
                    processSteps={servicesData.processSteps ?? []}
                    ctaText={servicesData.ctaText}
                    ctaHref={servicesData.ctaHref}
                />
            </main>
            <ScrollToTop />
        </>
    );
}