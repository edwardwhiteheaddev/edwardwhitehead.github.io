'use client';

import Aos from 'aos';
import { useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export interface SkillProgressItem {
    label: string;
    value: number;
}

export interface AboutSectionProps {
    title: string;
    contentHtml: string;
    skillProgress: SkillProgressItem[];
}

export function AboutSection({ title, contentHtml, skillProgress }: AboutSectionProps) {
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
                {skillProgress.length > 0 && (
                    <div className="kyros-progress-grid">
                        {skillProgress.map((item, index) => (
                            <div
                                key={item.label}
                                className="kyros-progress-card"
                                data-aos="fade-up"
                                data-aos-delay={200 + index * 80}
                            >
                                <CircularProgressbar
                                    value={item.value}
                                    text={`${item.value}%`}
                                    styles={buildStyles({
                                        textColor: '#ffffff',
                                        pathColor: '#FF575F',
                                        trailColor: 'rgba(255, 255, 255, 0.12)',
                                    })}
                                />
                                <h4>{item.label}</h4>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
