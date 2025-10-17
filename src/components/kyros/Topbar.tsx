import Link from "next/link";

export default function KyrosTopbar() {
    return (
        <div className="kyros-navbar__topbar">
            <span>
                <a href="tel:+27617609568">+27 61-760-9568</a> |{' '}
                <a href="mailto:ed.surreal@gmail.com">ed.surreal@gmail.com</a> |{' '}
                <Link href="https://www.linkedin.com/in/edwardwhiteheaddev" target="_blank" rel="noopener noreferrer">LinkedIn</Link> |{' '}
                <Link href="https://github.com/ultracoolbru" target="_blank" rel="noopener noreferrer">GitHub</Link> |{' '}
                <Link href="https://x.com/ultracoolbru" target="_blank" rel="noopener noreferrer">X</Link> |{' '}
                <Link href="https://www.instagram.com/ultracoolbru" target="_blank" rel="noopener noreferrer">Instagram</Link>
            </span>
        </div>
    );
}