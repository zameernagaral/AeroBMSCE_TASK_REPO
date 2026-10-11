'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './status.module.css';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        <p className={styles.label}>500 · System error</p>
        <h1 className={styles.title}>This page did not load</h1>
        <p className={styles.prose}>
          Our server failed to send this page. Reload in a minute, or email aerobmsce@bmsce.ac.in.
        </p>
        <button type="button" onClick={() => reset()} className={styles.actionBtn}>
          Reload page
        </button>
      </main>
    </div>
  );
}
