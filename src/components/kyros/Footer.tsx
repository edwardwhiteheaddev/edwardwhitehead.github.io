import Link from 'next/link';

const FOOTER_LINKS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edwardwhiteheaddev/' },
    { label: 'GitHub', href: 'https://github.com/ultracoolbru' },
    { label: 'X', href: 'https://x.com/ultracoolbru' },
    { label: 'Instagram', href: 'https://www.instagram.com/ultracoolbru' },
];

export function KyrosFooter() {
    return (
        <footer className="kyros-footer">
            <div className="container">
                <div className="kyros-footer__inner">
                    <span className="kyros-footer__brand">Edward Whitehead © {new Date().getFullYear()}</span>
                    <div className="kyros-footer__links">
                        {FOOTER_LINKS.map((link) => (
                            <Link key={link.label} href={link.href} target="_blank" rel="noreferrer">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
