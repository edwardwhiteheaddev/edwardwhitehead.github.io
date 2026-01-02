import styles from '@/app/univrs/univrs.module.scss';
import Link from 'next/link';

export function UnivrsFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerMeta}>
                    <div className={styles.footerBrand}>UNIVRS</div>
                    <div className={styles.footerNote}>
                        Calm, senior technical consulting. Built for long-term partnerships.
                    </div>
                </div>

                <div className={styles.footerLinks}>
                    <a href="mailto:hello@edwardwhitehead.dev" className={styles.footerLink}>
                        hello@edwardwhitehead.dev
                    </a>
                    <Link href="/#contact" className={styles.footerLink}>
                        Reach Out
                    </Link>
                </div>
            </div>
        </footer>
    );
}
