import Link from "next/link";

export default function KyrosTopbar() {
    return (
        <div className="kyros-navbar__topbar">
            <span>
                <a href="tel:+27617609568">+27 61-760-9568</a> |{' '}
                <a href="mailto:hello@edwardwhitehead.dev">hello@edwardwhitehead.dev</a> |{' '}
                <Link href="https://www.linkedin.com/in/edwardwhiteheaddev" target="_blank" rel="noopener noreferrer">LinkedIn</Link> |{' '}
                <Link href="https://github.com/edwardwhiteheaddev" target="_blank" rel="noopener noreferrer">GitHub</Link> |{' '}
                <Link href="https://x.com/edwhiteheaddev" target="_blank" rel="noopener noreferrer">X</Link> |{' '}
                <Link href="https://www.instagram.com/edwardwhiteheaddev" target="_blank" rel="noopener noreferrer">Instagram</Link> |{' '}
                <Link href="https://www.facebook.com/edwardwhiteheaddev" target="_blank" rel="noopener noreferrer">Facebook</Link> |{' '}
                <Link href="https://wa.me/+27617609568" target="_blank" rel="noopener noreferrer">WhatsApp</Link>
            </span>
        </div>
    );
}