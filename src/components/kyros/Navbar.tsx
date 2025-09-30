'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const NAV_ITEMS = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Expertise', target: 'skills' },
    { label: 'Experience', target: 'experience' },
    { label: 'Projects', target: 'projects' },
    { label: 'Contact', target: 'contact' },
];

export function KyrosNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const navLinks = useMemo(() => {
        return NAV_ITEMS.map((item) => {
            if (isHome) {
                return (
                    <ScrollLink
                        key={item.target}
                        to={item.target}
                        className="kyros-navbar__item"
                        smooth
                        spy
                        offset={-120}
                        duration={550}
                        activeClass="active"
                        onClick={() => setMobileOpen(false)}
                    >
                        {item.label}
                    </ScrollLink>
                );
            }

            return (
                <Link
                    key={item.target}
                    href={`/#${item.target}`}
                    className="kyros-navbar__item"
                >
                    {item.label}
                </Link>
            );
        });
    }, [isHome]);

    return (
        <header className={`kyros-navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="container">
                <div className="kyros-navbar__inner">
                    <Link href="/" className="kyros-navbar__brand">
                        Edward <span>Whitehead</span>
                    </Link>

                    <button
                        className="kyros-navbar__toggle"
                        aria-label="Toggle navigation"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        <i className="fa fa-bars" aria-hidden="true" />
                    </button>

                    <nav className={`kyros-navbar__menu${mobileOpen ? ' is-open' : ''}`}>
                        {navLinks}
                    </nav>
                </div>
            </div>
        </header>
    );
}
