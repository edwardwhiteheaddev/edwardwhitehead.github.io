import styles from '@/app/univrs/univrs.module.scss';
import { UnivrsHero } from '@/app/univrs/UnivrsHero';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: 'UNIVRS — Senior Technical Consulting',
    description:
        'Calm, senior technical consulting for founders and leaders: strategic clarity, execution discipline, and AI-augmented delivery.',
    alternates: { canonical: '/univrs' },
    openGraph: {
        title: 'UNIVRS — Senior Technical Consulting',
        description:
            'Strategic technical partnership for high-stakes delivery: clarity, architecture, and shipping with discipline.',
        url: 'https://edwardwhitehead.dev/univrs',
        type: 'website',
    },
};

export default function UnivrsPage() {
    return (
        <div className={styles.page}>
            {/* FONT STRATEGY: Frutiger-first with fallbacks (see univrs.module.scss) */}

            {/* HERO */}
            <UnivrsHero />

            {/* TRUST STRIP */}
            <section className={styles.trust} aria-label="Trust signals">
                <div className={styles.container}>
                    <ul className={styles.trustList}>
                        <li>
                            <strong>20+ years</strong> across software, systems, and platforms
                        </li>
                        <li>
                            Worked across <strong>startups, scale-ups</strong>, and complex environments
                        </li>
                        <li>
                            Built and shipped <strong>real systems</strong> — not slideware
                        </li>
                    </ul>
                </div>
            </section>

            {/* WHAT UNIVRS DOES */}
            <section id="services" className={styles.section} aria-labelledby="services-title">
                <div className={styles.container}>
                    <header className={styles.sectionHeader}>
                        <h2 id="services-title" className={styles.h2}>
                            What UNIVRS actually does
                        </h2>
                        <p className={styles.sectionIntro}>
                            Practical senior support when you need clear thinking, steady hands, and delivery that respects reality.
                        </p>
                    </header>

                    <div className={styles.cards}>
                        <article className={styles.card}>
                            <h3 className={styles.h3}>Fractional CTO / Technical leadership</h3>
                            <p>
                                Direction when the roadmap is noisy: help aligning stakeholders, shaping priorities, and setting standards that stick.
                            </p>
                            <p className={styles.cardOutcome}>
                                Outcome: a team that knows what “good” looks like—and how to get there.
                            </p>
                        </article>

                        <article className={styles.card}>
                            <h3 className={styles.h3}>AI-augmented delivery systems</h3>
                            <p>
                                Integrate AI where it genuinely helps: assisting analysis, reducing repetitive work, and improving feedback loops without breaking trust.
                            </p>
                            <p className={styles.cardOutcome}>
                                Outcome: faster cycles with predictable quality, not chaotic velocity.
                            </p>
                        </article>

                        <article className={styles.card}>
                            <h3 className={styles.h3}>Platform & architecture design</h3>
                            <p>
                                Make architecture a tool for calm execution: define the seams, pick the right constraints, and keep complexity in its place.
                            </p>
                            <p className={styles.cardOutcome}>
                                Outcome: systems you can evolve—without heroics.
                            </p>
                        </article>

                        <article className={styles.card}>
                            <h3 className={styles.h3}>Rescue, stabilisation, and clarity</h3>
                            <p>
                                When delivery feels fragile: identify failure modes, remove bottlenecks, and create a plan the whole team can commit to.
                            </p>
                            <p className={styles.cardOutcome}>
                                Outcome: fewer surprises, better decisions, and regained momentum.
                            </p>
                        </article>

                        <article className={styles.card}>
                            <h3 className={styles.h3}>Strategic technical advisory</h3>
                            <p>
                                Senior perspective for key choices: build vs buy, risk tradeoffs, hiring, and long-term technical direction.
                            </p>
                            <p className={styles.cardOutcome}>
                                Outcome: confidence to move forward without guessing.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* HOW UNIVRS WORKS */}
            <section id="process" className={styles.sectionAlt} aria-labelledby="process-title">
                <div className={styles.container}>
                    <header className={styles.sectionHeader}>
                        <h2 id="process-title" className={styles.h2}>
                            How UNIVRS works
                        </h2>
                        <p className={styles.sectionIntro}>
                            A predictable way of working that creates trust: calm entry, clear picture, steady progress.
                        </p>
                    </header>

                    <ol className={styles.steps}>
                        <li className={styles.step}>
                            <h3 className={styles.h3}>Start small</h3>
                            <p>
                                A short conversation to understand the context, urgency, and the people involved. If it’s not a fit, we say so early.
                            </p>
                        </li>
                        <li className={styles.step}>
                            <h3 className={styles.h3}>Create clarity</h3>
                            <p>
                                Map constraints, risks, and priorities. Establish the few decisions that unlock everything else.
                            </p>
                        </li>
                        <li className={styles.step}>
                            <h3 className={styles.h3}>Guide execution</h3>
                            <p>
                                Ship in sensible increments, keep quality visible, and protect the team from thrash.
                            </p>
                        </li>
                        <li className={styles.step}>
                            <h3 className={styles.h3}>Build trust over time</h3>
                            <p>
                                Patterns, documentation, and decision trails that make the work legible—so progress survives handoffs and growth.
                            </p>
                        </li>
                    </ol>
                </div>
            </section>

            {/* PHILOSOPHY */}
            <section id="philosophy" className={styles.section} aria-labelledby="philosophy-title">
                <div className={styles.container}>
                    <header className={styles.sectionHeader}>
                        <h2 id="philosophy-title" className={styles.h2}>
                            Philosophy
                        </h2>
                        <p className={styles.sectionIntro}>
                            The principles that guide the work—especially when timelines and expectations get tight.
                        </p>
                    </header>

                    <div className={styles.philosophyGrid}>
                        <div className={styles.quote}>
                            <p className={styles.quoteText}>
                                “Technology should reduce chaos, not create it.”
                            </p>
                            <p className={styles.quoteSub}>
                                The goal is calmer operations and clearer decisions—not cleverness for its own sake.
                            </p>
                        </div>

                        <ul className={styles.beliefs}>
                            <li>
                                <strong>AI is a collaborator</strong>, not a replacement: it supports judgment, it doesn’t substitute for it.
                            </li>
                            <li>
                                <strong>Good systems respect humans</strong>: teams need legibility, safety, and ownership to do great work.
                            </li>
                            <li>
                                <strong>Delivery without clarity is waste</strong>: shipping the wrong thing quickly is still the wrong thing.
                            </li>
                            <li>
                                <strong>Long-term thinking beats short-term hacks</strong>: shortcuts compound interest—in the wrong direction.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* WHO THIS IS FOR */}
            <section id="fit" className={styles.sectionAlt} aria-labelledby="fit-title">
                <div className={styles.container}>
                    <header className={styles.sectionHeader}>
                        <h2 id="fit-title" className={styles.h2}>
                            Fit
                        </h2>
                        <p className={styles.sectionIntro}>
                            Clear alignment makes everything easier—for you and for the people doing the work.
                        </p>
                    </header>

                    <div className={styles.fitGrid}>
                        <div className={styles.fitCol}>
                            <h3 className={styles.h3}>This is for</h3>
                            <ul className={styles.list}>
                                <li>Founders who want clarity before committing to big builds</li>
                                <li>Teams under pressure that need stability, not drama</li>
                                <li>Leaders who value quality, thinking, and honest tradeoffs</li>
                                <li>Organisations ready to name the real problems—and fix them</li>
                            </ul>
                        </div>

                        <div className={styles.fitCol}>
                            <h3 className={styles.h3}>This is not for</h3>
                            <ul className={styles.list}>
                                <li>Cheap outsourcing or anonymous ticket delivery</li>
                                <li>Feature factories optimised for throughput over outcomes</li>
                                <li>Hype-chasing initiatives without a grounded purpose</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="cta" className={styles.cta} aria-labelledby="cta-title">
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2 id="cta-title" className={styles.h2}>
                            Start with a quiet conversation
                        </h2>
                        <p className={styles.sectionIntro}>
                            No obligation. Share what’s happening, what’s at risk, and what “better” should look like. You’ll get a clear next step—even if it’s not with UNIVRS.
                        </p>

                        <div className={styles.ctaActions}>
                            <a className={styles.primaryCta} href="https://calendly.com/univrs" target="_blank" rel="noopener noreferrer">
                                Book a clarity call
                            </a>
                            <a className={styles.secondaryCta} href="mailto:hello@univrs.consulting?subject=UNIVRS%20%E2%80%94%20Clarity%20conversation">
                                Email hello@univrs.consulting
                            </a>
                        </div>

                        <p className={styles.microCopy}>
                            Prefer chat? Use the assistant in the header and we’ll route you to the right next step.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
