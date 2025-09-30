'use client';

import Aos from 'aos';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import Typed from 'typed.js';

export interface HeroLocation {
    label: string;
    description: string;
}

export interface HeroButton {
    text: string;
    href: string;
    variant: 'primary' | 'ghost';
    enabled?: boolean;
}

export interface HeroProps {
    name: string;
    title: string;
    titleGradientText?: string;
    titleEndText?: string;
    descriptionHtml: string;
    typedPhrases: string[];
    locations: HeroLocation[];
    buttons: HeroButton[];
}

export function HeroSection({
    name,
    title,
    titleGradientText,
    titleEndText,
    descriptionHtml,
    typedPhrases,
    locations,
    buttons,
}: HeroProps) {
    const typedRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        Aos.init({
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            duration: 800,
        });
    }, []);

    useEffect(() => {
        if (!typedRef.current || typedPhrases.length === 0) {
            return;
        }

        const typed = new Typed(typedRef.current, {
            strings: typedPhrases,
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            backDelay: 1800,
            smartBackspace: true,
        });

        return () => {
            typed.destroy();
        };
    }, [typedPhrases]);

    const filteredButtons = useMemo(
        () => buttons.filter((button) => button.enabled !== false),
        [buttons]
    );

    return (
        <section id="hero" className="kyros-hero">
            <div className="kyros-hero__background" aria-hidden="true" />
            <div className="container">
                <div className="kyros-hero__inner">
                    <p
                        className="kyros-hero__eyebrow"
                        data-aos="fade-up"
                        data-aos-delay="0"
                    >
                        I am {name}
                    </p>
                    <h1
                        className="kyros-hero__headline"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        {titleGradientText ? (
                            <>
                                {title}{' '}
                                <span>{titleGradientText}</span>{' '}
                                {titleEndText}
                            </>
                        ) : (
                            title
                        )}
                    </h1>
                    <div
                        className="kyros-hero__typed"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <span ref={typedRef} aria-label={typedPhrases.join(', ')} />
                    </div>
                    <div
                        className="kyros-hero__description"
                        data-aos="fade-up"
                        data-aos-delay="450"
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                    <div
                        className="kyros-hero__cta"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        {filteredButtons.map((button) => {
                            const isExternal = button.href.startsWith('http') || button.href.startsWith('mailto:') || button.href.startsWith('tel:');
                            const className = `kyros-button ${button.variant === 'ghost' ? 'kyros-button--primary' : 'kyros-button--ghost'}`;

                            if (isExternal) {
                                return (
                                    <a
                                        key={button.text}
                                        href={button.href}
                                        className={className}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {button.text}
                                    </a>
                                );
                            }

                            return (
                                <Link key={button.text} href={button.href} className={className}>
                                    {button.text}
                                </Link>
                            );
                        })}
                    </div>

                    {locations.length > 0 && (
                        <ul
                            className="kyros-hero__locations"
                            data-aos="fade-up"
                            data-aos-delay="750"
                        >
                            {locations.map((location) => (
                                <li key={location.label}>
                                    <strong>{location.label}</strong>
                                    <span>{location.description}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
