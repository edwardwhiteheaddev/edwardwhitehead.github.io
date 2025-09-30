'use client';

import { useEffect, useState } from 'react';

export function ScrollToTop() {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 320);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div id="scroll-to-top">
            <button type="button" className='' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <i className="fa fa-chevron-up" aria-hidden="true" />
                <span className="sr-only">Back to top</span>
            </button>
        </div>
    );
}
