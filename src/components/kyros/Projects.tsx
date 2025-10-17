'use client';

import Aos from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@mantine/core';

export interface ProjectItem {
    id: number | string;
    title: string;
    category: string;
    image?: string;
    description: string;
    url?: string;
    featured?: boolean;
}

export interface ProjectsSectionProps {
    title: string;
    projects: ProjectItem[];
}

export function ProjectsSection({ title, projects }: ProjectsSectionProps) {
    useEffect(() => {
        Aos.init({ easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    return (
        <section id="projects" className="kyros-section kyros-section--alt">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h2>{title}</h2>
                    <div className="divider" />
                    <p className="text-muted">A snapshot of initiatives, product launches, and architecture work.</p>
                </div>
                <div className="kyros-portfolio-grid">
                    {projects.map((project, index) => {
                        const cardContent = (
                            <>
                                {project.image && (
                                    <div className="kyros-portfolio-card__image">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={index < 2}
                                        />
                                    </div>
                                )}
                                <div className="kyros-portfolio-content">
                                    {project.featured && (
                                        <span className="kyros-featured-badge">
                                            <i className="fa fa-star" aria-hidden="true" /> Featured
                                        </span>
                                    )}
                                    <span>{project.category}</span>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    {project.url && (
                                        <span>
                                            View project <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                        </span>
                                    )}
                                </div>
                            </>
                        );

                        if (project.url) {
                            const isExternal = project.url.startsWith('http');
                            return (
                                <Link
                                    key={project.id ?? project.title}
                                    href={project.url}
                                    className="kyros-portfolio-card"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    target={isExternal ? '_blank' : undefined}
                                    rel={isExternal ? 'noreferrer' : undefined}
                                >
                                    {cardContent}
                                </Link>
                            );
                        }

                        return (
                            <div
                                key={project.id ?? project.title}
                                className="kyros-portfolio-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {cardContent}
                            </div>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <Button
                        variant="filled"
                        size="lg"
                        component={Link}
                        href="/projects"
                        style={{
                            backgroundColor: 'var(--kyros-primary)',
                            borderColor: 'var(--kyros-primary)'
                        }}
                    >
                        View All Projects
                    </Button>
                </div>
            </div>
        </section>
    );
}
