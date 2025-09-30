'use client';

import Aos from 'aos';
import Link from 'next/link';
import { useEffect } from 'react';

export interface ContactSocial {
    label: string;
    url: string;
}

export interface ContactSectionProps {
    title: string;
    subtitle?: string;
    email: string;
    phone?: string;
    location?: string;
    socials: ContactSocial[];
    bodyHtml: string;
}

export function ContactSection({ title, subtitle, email, phone, location, socials, bodyHtml }: ContactSectionProps) {
    useEffect(() => {
        Aos.init({ easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    return (
        <section id="contact" className="kyros-section">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h2>{title}</h2>
                    <div className="divider" />
                    {subtitle && <p className="text-muted">{subtitle}</p>}
                </div>
                <div className="kyros-contact" data-aos="fade-up" data-aos-delay="150">
                    <div dangerouslySetInnerHTML={{ __html: bodyHtml }} className="text-muted" />
                    <div className="kyros-contact__grid">
                        <div className="kyros-contact__item">
                            <h4>Email</h4>
                            <a href={`mailto:${email}`}>{email}</a>
                        </div>
                        {phone && (
                            <div className="kyros-contact__item">
                                <h4>Phone</h4>
                                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`}>{phone}</a>
                            </div>
                        )}
                        {location && (
                            <div className="kyros-contact__item">
                                <h4>Location</h4>
                                <p>{location}</p>
                            </div>
                        )}
                        {socials.length > 0 && (
                            <div className="kyros-contact__item">
                                <h4>Social</h4>
                                <div className="kyros-social-list">
                                    {socials.map((social) => (
                                        <Link key={social.label} href={social.url} target="_blank" rel="noreferrer">
                                            {social.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
