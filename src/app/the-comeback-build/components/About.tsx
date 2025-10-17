'use client';

import Aos from 'aos';
import { useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';

export interface SkillProgressItem {
    label: string;
    value: string;
    description: string;
    imageUrl: string;
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
                    <div className="tcb-divider" />
                </div>
                <div
                    className="kyros-about__intro"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <div className="section-heading" data-aos="fade-up">
                    <h2>How I Work</h2>
                    <div className="tcb-divider" />
                </div>
                {skillProgress.length > 0 && (
                    <div className="kyros-progress-grid">
                        {skillProgress.map((item, index) => (
                            <div
                                key={item.label}
                                className="kyros-progress-card"
                                data-aos="fade-up"
                                data-aos-delay={200 + index * 80}
                            >
                                <Card variant="plain" sx={{ backgroundColor: '#171a1d' }}>
                                    <CardOverflow>
                                        <AspectRatio ratio="2">
                                            <Image
                                                src={item.imageUrl || 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318'}
                                                loading="lazy"
                                                alt={`Image representing ${item.label}`}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </AspectRatio>
                                    </CardOverflow>
                                    <CardContent>
                                        <Typography level="title-md" sx={{ color: '#fff' }}>
                                            {item.label}
                                        </Typography>
                                        <Typography level="body-sm" sx={{ color: '#fff' }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardOverflow variant="plain" sx={{ backgroundColor: '#0066ff' }}>
                                        <Divider inset="context" />
                                        <CardContent orientation="horizontal">
                                            <Typography level="body-xs" style={{ color: '#fff' }}>{item.value}</Typography>
                                        </CardContent>
                                    </CardOverflow>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
