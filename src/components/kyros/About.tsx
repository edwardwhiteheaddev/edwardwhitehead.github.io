'use client';

import Aos from 'aos';
import { useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css';

export interface AboutSectionProps {
    title: string;
    contentHtml: string;
}

export function AboutSection({ title, contentHtml }: Readonly<AboutSectionProps>) {
    useEffect(() => {
        Aos.init({ easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    return (
        <section id="about" className="kyros-section">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h2>{title}</h2>
                    <div className="divider" />
                </div>
                <div
                    className="kyros-about__intro"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </div>
        </section>
    );
}
