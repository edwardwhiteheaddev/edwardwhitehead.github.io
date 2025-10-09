'use client';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import Aos from 'aos';
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

export interface HeroLocation {
    label: string;
    description: string;
}

export interface HeroButton {
    text: string;
    href: string;
    variant: 'primary' | 'ghost';
    enabled?: boolean;
}

export interface HeroProps {
    name: string;
    title: string;
    titleGradientText?: string;
    titleEndText?: string;
    descriptionHtml: string;
    typedPhrases: string[];
    locations: HeroLocation[];
    buttons: HeroButton[];
}

export function HeroSection({
    name,
    title,
    titleGradientText,
    titleEndText,
    descriptionHtml,
    typedPhrases
}: HeroProps) {
    const typedRef = useRef<HTMLSpanElement | null>(null);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        Aos.init({
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            duration: 800,
        });
    }, []);

    useEffect(() => {
        if (!typedRef.current || typedPhrases.length === 0) {
            return;
        }

        const typed = new Typed(typedRef.current, {
            strings: typedPhrases,
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            backDelay: 1800,
            smartBackspace: true,
        });

        return () => {
            typed.destroy();
        };
    }, [typedPhrases]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setSubmitMessage('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('/the-comeback-build/api/submit-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage(data.message);
                setEmail('');
            } else {
                setSubmitMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            setSubmitMessage('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="hero" className="kyros-hero">
            <div className="kyros-hero__tcb-background" aria-hidden="true" />
            <div className="container">
                <div className="kyros-hero__inner">
                    <p
                        className="kyros-hero__eyebrow"
                        data-aos="fade-up"
                        data-aos-delay="0"
                    >
                        {name}
                    </p>
                    <h1
                        className="kyros-hero__headline"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        {titleGradientText ? (
                            <>
                                {title}{' '}
                                <span>{titleGradientText}</span>{' '}
                                {titleEndText}
                            </>
                        ) : (
                            title
                        )}
                    </h1>
                    <div
                        className="kyros-hero__typed"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <span ref={typedRef} aria-label={typedPhrases.join(', ')} />
                    </div>
                    <div
                        className="kyros-hero__description"
                        data-aos="fade-up"
                        data-aos-delay="450"
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                    <div
                        className="kyros-hero__cta"
                        data-aos="fade-up"
                        data-aos-delay="600"
                        style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={1}
                                useFlexGap
                                sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
                            >
                                <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
                                    Email
                                </InputLabel>
                                <TextField
                                    id="email-hero"
                                    hiddenLabel
                                    size="small"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    aria-label="Enter your email address"
                                    placeholder="Your email address"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: '#fff',
                                            '& fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.23)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#fff',
                                            },
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#fff',
                                            opacity: 0.7,
                                        },
                                    }}
                                    slotProps={{
                                        htmlInput: {
                                            autoComplete: 'off',
                                            'aria-label': 'Enter your email address',
                                        },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    disabled={isSubmitting}
                                    sx={{ minWidth: 'fit-content' }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Contact Me Now'}
                                </Button>
                            </Stack>
                        </form>
                        {submitMessage && (
                            <Typography
                                variant="caption"
                                sx={{
                                    textAlign: 'center',
                                    color: submitMessage.includes('Thank you') ? '#4caf50' : '#f44336',
                                    mt: 1
                                }}
                            >
                                {submitMessage}
                            </Typography>
                        )}
                        <Typography
                            variant="caption"
                            sx={{ textAlign: 'center', color: 'white', mt: 1 }}
                        >
                            By clicking &quot;Contact Me Now&quot; you agree to me contacting you
                            via email to setup a time to chat.
                        </Typography>
                    </div>
                </div>
            </div>
        </section>
    );
}
