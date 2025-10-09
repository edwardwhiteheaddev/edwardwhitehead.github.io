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

export type { AboutMarkdownData, TbcAboutMarkdownData, HeroMarkdownData };