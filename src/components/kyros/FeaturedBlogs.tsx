'use client';

import Aos from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@mantine/core';

export interface BlogItem {
    slug: string;
    title: string;
    date: string;
    description: string;
    category: string;
    tags?: string[];
    image?: string;
    featured?: boolean;
    author?: string;
}

export interface FeaturedBlogsSectionProps {
    title: string;
    blogs: BlogItem[];
}

export function FeaturedBlogsSection({ title, blogs }: FeaturedBlogsSectionProps) {
    useEffect(() => {
        Aos.init({ easing: 'ease-out-cubic', once: true, offset: 50 });
    }, []);

    return (
        <section id="featured-blogs" className="kyros-section">
            <div className="container">
                <div className="section-heading" data-aos="fade-up">
                    <h2>{title}</h2>
                    <div className="divider" />
                    <p className="text-muted">Latest insights, tutorials, and thoughts on technology and development.</p>
                </div>
                <div className="kyros-portfolio-grid">
                    {blogs.map((blog, index) => {
                        const cardContent = (
                            <>
                                {blog.image && (
                                    <div className="kyros-portfolio-card__image">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={index < 2}
                                        />
                                    </div>
                                )}
                                <div className="kyros-portfolio-content">
                                    {blog.featured && (
                                        <span className="kyros-featured-badge">
                                            <i className="fa fa-star" aria-hidden="true" /> Featured
                                        </span>
                                    )}
                                    <span>{blog.category}</span>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.description}</p>
                                    <div className="blog-meta">
                                        <span className="blog-date">
                                            <i className="fa fa-calendar" aria-hidden="true" /> {blog.date}
                                        </span>
                                        {blog.author && (
                                            <span className="blog-author">
                                                <i className="fa fa-user" aria-hidden="true" /> {blog.author}
                                            </span>
                                        )}
                                    </div>
                                    <span>
                                        Read more <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                    </span>
                                </div>
                            </>
                        );

                        return (
                            <Link
                                key={blog.slug}
                                href={`/blog/${blog.slug}`}
                                className="kyros-portfolio-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {cardContent}
                            </Link>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <Button
                        variant="filled"
                        size="lg"
                        component={Link}
                        href="/blog"
                        style={{
                            backgroundColor: 'var(--kyros-primary)',
                            borderColor: 'var(--kyros-primary)'
                        }}
                    >
                        View All Blog Posts
                    </Button>
                </div>
            </div>
        </section>
    );
}
