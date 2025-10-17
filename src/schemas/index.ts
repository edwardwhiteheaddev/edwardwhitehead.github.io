interface AboutMarkdownData {
    title: string;
    contentHtml: string;
    skillProgress?: { label: string; description: string, value: number; imageUrl: string }[];
}

interface TbcAboutMarkdownData {
    title: string;
    contentHtml: string;
    skillProgress?: { label: string; description: string, value: string; imageUrl: string }[];
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

interface CurrentOfferData {
    title: string;
    description: string;
    offers: { title: string; includes: string; cost: string }[];
    offerIncludes: string;
}

interface WhyThisMattersData {
    title: string;
    details: string;
    contentHtml: string;
}

interface ConnectData {
    title: string;
    channels: { network: string; url: string }[];
    contentHtml: string;
}

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
    applicationName?: string;
    generator?: string;
    locale?: string;
    type?: string;
}

export type {
    AboutMarkdownData,
    TbcAboutMarkdownData,
    HeroMarkdownData,
    CurrentOfferData,
    WhyThisMattersData,
    ConnectData,
    MetadataData
};