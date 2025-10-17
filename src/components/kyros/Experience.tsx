'use client';

import Aos from 'aos';
import { useEffect } from 'react';

export interface ExperienceItem {
    role: string;
    company: string;
    dates: string;
    description: string;
    skills?: string;
    notableAchievements?: string;
}

export interface ExperienceSectionProps {
    title: string;
    experience: ExperienceItem[];
}

function renderDescription(description: string) {
    if (!description || description.trim().length === 0) {
        return null;
    }

    const lines = description
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    const bulletLines = lines.filter((line) => line.startsWith('-'));

    if (bulletLines.length === 0) {
        return <p className="text-muted">{description}</p>;
    }

    return (
        <ul className="text-muted">
            {bulletLines.map((line, index) => (
                <li key={index}>{line.replace(/^[-•]\s*/, '')}</li>
            ))}
        </ul>
    );
}

export function ExperienceSection({ title, experience }: ExperienceSectionProps) {
    useEffect(() => {
        Aos.init({ easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    return (
        <section id="experience" className="kyros-section">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h2>{title}</h2>
                    <div className="divider" />
                </div>
                <div className="kyros-resume">
                    {experience.map((item, index) => (
                        <div
                            key={`${item.role}-${item.company}-${index}`}
                            className="kyros-resume__item"
                            data-aos="fade-up"
                            data-aos-delay={index * 120}
                        >
                            <h3 className="kyros-resume__title">{item.role}</h3>
                            <div className="kyros-resume__meta">
                                <span>{item.company}</span>
                                <span>•</span>
                                <span>{item.dates}</span>
                            </div>
                            <div className="kyros-resume__description">
                                {renderDescription(item.description)}
                                {item.skills && item.skills.trim().length > 0 && (
                                    <p className="text-muted" style={{ marginTop: '0.75rem' }}>
                                        <strong>Skills:</strong> {item.skills}
                                    </p>
                                )}
                                {item.notableAchievements && item.notableAchievements.trim().length > 0 && (
                                    <p className="text-muted" style={{ marginTop: '0.75rem' }}>
                                        <strong>Notable Achievements:</strong> {item.notableAchievements}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
