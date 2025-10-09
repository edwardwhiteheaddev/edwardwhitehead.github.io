import { HeroMarkdownData } from "@/schemas";

export function normalizeButtons(hero: HeroMarkdownData) {
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