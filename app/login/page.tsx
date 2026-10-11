'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/sign-in/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Authentication failed. Please check your credentials.');
      }

      router.push('/admin');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign-in failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.loginHeader}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <span>AeroBMSCE</span>
            <span className={styles.brandBadge}>Console</span>
          </Link>
          <Link href="/" className={styles.backLink}>
            ← Return to public site
          </Link>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.card}>
          <div className={styles.titleArea}>
            <p className={styles.kicker}>Propel Lab–3 · BMS College of Engineering</p>
            <h1 className={styles.title}>Admin Portal</h1>
            <p className={styles.lead}>
              Sign in with your team credentials to triage partnership inquiries and publish verified competition results.
            </p>
          </div>

          {error && (
            <div className={styles.alertBox} data-type="error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="admin-email" className={styles.label}>
                Team Email
              </label>
              <input
                id="admin-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aerobmsce.ac.in"
                className={styles.input}
                disabled={loading}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="admin-password" className={styles.label}>
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Authenticating…' : 'Sign in to Console'}
            </button>
          </form>

          <p className={styles.footerNote}>
            Restricted access. Internal team authorization enforced server-side.
          </p>
        </div>
      </main>
    </div>
  );
}
