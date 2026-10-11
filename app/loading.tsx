import styles from './status.module.css';

export default function Loading() {
  return (
    <div className={styles.page} role="status" aria-live="polite">
      <main className={styles.main}>
        <p className={styles.label}>AeroBMSCE · Initializing</p>
        <h1 className={styles.title}>Loading flight data...</h1>
      </main>
    </div>
  );
}
