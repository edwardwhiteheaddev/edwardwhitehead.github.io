'use client';

import styles from '@/app/univrs/univrs.module.scss';
import { useChatbot } from '@/components/chatbot/ChatbotProvider';
import { IconSparkles } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV = [
    { label: 'What we do', href: '#services' },
    { label: 'How we work', href: '#process' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Fit', href: '#fit' },
    { label: 'Contact', href: '#cta' },
];

export function UnivrsHeader() {
    const [open, setOpen] = useState(false);
    const { open: openChatbot } = useChatbot();

    useEffect(() => {
        const onResize = () => setOpen(false);
        window.addEventListener('resize', onResize, { passive: true });
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link href="/univrs" className={styles.brand} aria-label="UNIVRS">
                    {/*
                        Logo placement:
                        Add your provided logo asset at `public/univrs/univrs-logo.png`.
                        This keeps the page aligned with the existing UNIVRS mark.
                    */}
                    <Image
                        src="/assets/images/1.png"
                        alt="UNIVRS"
                        width={44}
                        height={44}
                        priority
                    />
                    <span className={styles.brandText}>UNIVRS</span>
                </Link>

                <nav className={styles.nav} aria-label="UNIVRS">
                    {NAV.map((item) => (
                        <a key={item.href} href={item.href} className={styles.navLink}>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.headerActions}>
                    <button
                        type="button"
                        className={styles.botBtn}
                        onClick={() => openChatbot()}
                        aria-label="Open AI assistant"
                    >
                        <IconSparkles stroke={1.8} />
                    </button>

                    <button
                        type="button"
                        className={styles.menuBtn}
                        aria-label="Toggle navigation"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className={styles.menuIcon} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {open ? (
                <div className={styles.mobileNav}>
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={styles.mobileNavLink}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            ) : null}
        </header>
    );
}
