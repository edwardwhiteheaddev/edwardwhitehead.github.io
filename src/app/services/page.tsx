import { KyrosNavbar } from '@/components/kyros/Navbar';
import { Preloader } from '@/components/kyros/Preloader';
import { ServicesSection } from '@/components/kyros/Services';
import { getMarkdownData } from '@/lib/markdown';
import { ServicesMarkdownData } from '@/schemas';
import { Metadata, Viewport } from 'next';
import { ScrollToTop } from '@/components/kyros/ScrollToTop';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
    const requestHeaders = await headers();
    const host = (requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? 'localhost:3000').split(',')[0].trim();
    const protocol = (requestHeaders.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')).split(',')[0].trim();
    const imageUrl = new URL('/assets/images/og-image.png', `${protocol}://${host}`).toString();

    return {
        title: 'Services | Edward Whitehead',
        description: 'Straightforward, no-fuss AI-native and technical delivery services. AI product development, legacy modernisation, SaaS architecture, fractional CTO, and more.',
        openGraph: {
            title: 'Services | Edward Whitehead',
            description: 'Straightforward, no-fuss AI-native and technical delivery services.',
            type: 'website',
            images: imageUrl,
        },
        twitter: {
            images: [imageUrl],
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