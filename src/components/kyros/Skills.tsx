'use client';

import Aos from 'aos';
import { useEffect } from 'react';

export interface SkillCategory {
    category: string;
    list: string;
}

export interface SkillsSectionProps {
    title: string;
    subtitle?: string;
    skills: SkillCategory[];
}

export function SkillsSection({ title, subtitle, skills }: SkillsSectionProps) {
    useEffect(() => {
        Aos.init({ easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    return (
        <section id="skills" className="kyros-section kyros-section--alt">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h2>{title}</h2>
                    <div className="divider" />
                    {subtitle && <p className="text-muted">{subtitle}</p>}
                </div>
                <div className="kyros-skill-cards">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.category}
                            className="kyros-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <h3>{skill.category}</h3>
                            <p>{skill.list}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
