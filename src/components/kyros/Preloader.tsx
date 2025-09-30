'use client';

import { useEffect, useState } from 'react';

export function Preloader() {
    const [isVisible, setVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const fadeTimeout = window.setTimeout(() => setVisible(false), 1200);
        const removeTimeout = window.setTimeout(() => setShouldRender(false), 1600);
        return () => {
            window.clearTimeout(fadeTimeout);
            window.clearTimeout(removeTimeout);
        };
    }, []);

    if (!shouldRender) {
        return null;
    }

    return (
        <div className={`kyros-preloader${isVisible ? '' : ' hidden'}`} id="mainpreloader">
            <div className="kyros-preloader__spinner">
                <span />
            </div>
        </div>
    );
}
