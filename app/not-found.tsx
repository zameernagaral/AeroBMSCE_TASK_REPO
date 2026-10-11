import Link from 'next/link';
import Image from 'next/image';
import styles from './status.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/images/logo.png"
            width={1537}
            height={699}
            alt=""
            priority
            className={styles.brandMark}
          />
          <span className={styles.brandWordmark}>AeroBMSCE</span>
        </Link>
      </header>

      <main className={styles.main}>
        <p className={styles.label}>404 · Error</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.prose}>
          No page exists at this address. Check the link, or go to the home page.
        </p>
        <Link href="/" className={styles.actionBtn}>
          Go to home page
        </Link>
      </main>
    </div>
  );
}
