'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '@/assets/logo.svg'
import Topbar from './Topbar';

const NAV_ITEMS = [
    { label: 'Home', target: '/' },
    { label: 'About', target: '/#about' },
    { label: 'Expertise', target: '/#skills' },
    { label: 'Experience', target: '/#experience' },
    { label: 'Projects', target: '/#projects' },
    { label: 'Contact', target: '/#contact' },
    { label: 'Blog', target: '/blog' }
];

export function KyrosNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '';

    useEffect(() => {
        const handleScroll = () => {
            // Removed scroll detection to keep navbar transparent
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const navLinks = useMemo(() => {
        return NAV_ITEMS.map((item) => {
            if (isHome && item.target !== '' && item.target.startsWith('/#')) {
                return (
                    <ScrollLink
                        key={item.target}
                        to={item.target.slice(2)}
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
                    href={item.target}
                    className="kyros-navbar__item"
                >
                    {item.label}
                </Link>
            );
        });
    }, [isHome]);

    return (
        <header className={`kyros-navbar`}>
            <div className="container">
                <Topbar />
                <div className="kyros-navbar__inner">
                    <div className="kyros-navbar__brand">
                        <Link href="/">
                            <Image src={Logo} alt="Logo" width={80} height={80} />
                        </Link>
                    </div>
                    {/* <Link href="/" className="kyros-navbar__brand">
                        Edward <span>Whitehead</span>
                    </Link> */}

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
