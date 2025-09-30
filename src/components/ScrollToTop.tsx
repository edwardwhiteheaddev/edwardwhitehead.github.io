"use client";

import { useEffect, useState } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.pageYOffset > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            toggleVisibility();
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array to run the effect only once on mount

    return (
        <div id='scroll-to-top'>
            {isVisible && (
                <div onClick={scrollToTop}>
                    <i className="fa fa-chevron-up" style={{ color: 'red' }}></i>
                </div>
            )}
        </div>
    );
};

export default ScrollToTop;
