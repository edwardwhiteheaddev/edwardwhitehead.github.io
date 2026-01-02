'use client';

import styles from '@/app/univrs/univrs.module.scss';
import { useChatbot } from '@/components/chatbot/ChatbotProvider';
import Image from 'next/image';

export function UnivrsHero() {
    const { open } = useChatbot();

    return (
        <section className={styles.hero} aria-labelledby="univrs-hero-title">
            <div className={styles.container}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroCopy}>
                        <h1 id="univrs-hero-title" className={styles.h1}>
                            Senior leadership for moments that matter.
                        </h1>
                        <p className={styles.lede}>
                            UNIVRS partners with founders and leaders to turn uncertainty into a plan, and a plan into shipping.
                        </p>
                        <p className={styles.value}>
                            Strategic clarity, disciplined execution, and AI-augmented delivery—without noise.
                        </p>

                        <div className={styles.heroCtas}>
                            <button type="button" className={styles.primaryCta} onClick={() => open()}>
                                Discuss your challenge
                            </button>
                            <a className={styles.secondaryCta} href="#cta">
                                Or send a brief note
                            </a>
                        </div>

                        <p className={styles.microCopy}>
                            No pressure. If it’s not a fit, you’ll still leave with clarity.
                        </p>
                    </div>

                    <div className={styles.heroAside} aria-hidden="true">
                        <div className={styles.mark}>
                            <Image
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop"
                                alt="Senior leadership for moments that matter."
                                title="Senior leadership for moments that matter."
                                fill
                                sizes="(min-width: 920px) 400px, 100vw"
                                className={styles.markImage}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
