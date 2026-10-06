'use client';

import Aos from 'aos';
import Link from 'next/link';
import { useEffect } from 'react';

export interface ServiceItem {
    title: string;
    description: string;
    includes: string;
    icon?: string;
}

export interface EngagementModel {
    model: string;
    bestFor: string;
    structure: string;
}

export interface ServicesSectionProps {
    title: string;
    subtitle?: string;
    introHtml: string;
    services: ServiceItem[];
    engagementModels: EngagementModel[];
    processSteps: { step: string; description: string }[];
    ctaText?: string;
    ctaHref?: string;
}

export function ServicesSection({
    title,
    subtitle,
    introHtml,
    services,
    engagementModels,
    processSteps,
    ctaText = 'Get In Touch',
    ctaHref = '/#contact',
}: Readonly<ServicesSectionProps>) {
    useEffect(() => {
        Aos.init({ easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    return (
        <section id="services" className="kyros-section kyros-section--alt">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h2>{title}</h2>
                    <div className="divider" />
                    {subtitle && <p className="text-muted">{subtitle}</p>}
                </div>

                {introHtml && (
                    <div
                        className="kyros-services__intro"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        dangerouslySetInnerHTML={{ __html: introHtml }}
                    />
                )}

                {/* Services Grid */}
                <div className="kyros-service-cards">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className="kyros-card kyros-service-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="kyros-service-card__header">
                                <h3>{service.title}</h3>
                                <p className="kyros-service-card__description">{service.description}</p>
                            </div>
                            <div className="kyros-service-card__includes">
                                {service.includes}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Engagement Models */}
                {engagementModels.length > 0 && (
                    <div className="kyros-engagement-models" data-aos="fade-up" data-aos-delay={services.length * 100 + 100}>
                        <div className="section-heading">
                            <h3>Engagement Models</h3>
                            <div className="divider" />
                        </div>
                        <div className="kyros-engagement-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Best For</th>
                                        <th>Structure</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {engagementModels.map((model, index) => (
                                        <tr key={model.model} data-aos="fade-up" data-aos-delay={index * 80}>
                                            <td><strong>{model.model}</strong></td>
                                            <td>{model.bestFor}</td>
                                            <td>{model.structure}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Process Steps */}
                {processSteps.length > 0 && (
                    <div className="kyros-process-steps" data-aos="fade-up" data-aos-delay={services.length * 100 + engagementModels.length * 80 + 200}>
                        <div className="section-heading">
                            <h3>How It Works</h3>
                            <div className="divider" />
                        </div>
                        <div className="kyros-process-grid">
                            {processSteps.map((step, index) => (
                                <div
                                    key={step.step}
                                    className="kyros-process-card"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="kyros-process-card__number">{index + 1}</div>
                                    <h4>{step.step}</h4>
                                    <p>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="kyros-services__cta" data-aos="fade-up" data-aos-delay={services.length * 100 + engagementModels.length * 80 + processSteps.length * 100 + 200}>
                    
<p>Have a complex technology problem that needs an experienced technical perspective? <Link href="/#contact">Get in touch</Link> &mdash; I&rsquo;ll respond within 24 hours with initial thoughts and next steps.</p>
                    
                    <Link href={ctaHref} className="kyros-button kyros-button--primary">
                        {ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
}