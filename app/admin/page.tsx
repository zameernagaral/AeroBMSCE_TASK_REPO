'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { AnimatedBackground } from '../../components/core/animated-background';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Inquiry {
  id: number;
  name: string;
  email: string;
  organization: string;
  message: string;
  status: 'new' | 'contacted' | 'reviewing' | 'closed';
  createdAt: string;
}

interface ResultItem {
  id: number;
  title: string;
  event: string;
  year: number;
  placement: string | null;
  verified: boolean;
}

interface TeamItem {
  id: number;
  name: string;
  discipline: string;
  description: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'results' | 'teams'>('inquiries');

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Results state
  const [resultsList, setResultsList] = useState<ResultItem[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [newResult, setNewResult] = useState({
    title: '',
    event: '',
    year: new Date().getFullYear(),
    placement: '',
    verified: true,
  });
  const [submittingResult, setSubmittingResult] = useState(false);

  // Teams state
  const [teamsList, setTeamsList] = useState<TeamItem[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    discipline: '',
    description: '',
  });
  const [submittingTeam, setSubmittingTeam] = useState(false);

  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // 1. Verify Authentication
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        if (data.user?.role !== 'admin') {
          router.push('/login');
          return;
        }
        setUser(data.user);
      } catch {
        router.push('/login');
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, [router]);

  // 2. Fetch Inquiries
  const fetchInquiries = useCallback(async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.data || []);
      }
    } catch {
      // ignore
    } finally {
      setInquiriesLoading(false);
    }
  }, []);

  // 3. Fetch Results
  const fetchResults = useCallback(async () => {
    setResultsLoading(true);
    try {
      const res = await fetch('/api/results');
      if (res.ok) {
        const json = await res.json();
        setResultsList(json.data || []);
      }
    } catch {
      // ignore
    } finally {
      setResultsLoading(false);
    }
  }, []);

  // 4. Fetch Teams
  const fetchTeams = useCallback(async () => {
    setTeamsLoading(true);
    try {
      const res = await fetch('/api/teams');
      if (res.ok) {
        const json = await res.json();
        setTeamsList(json.data || []);
      }
    } catch {
      // ignore
    } finally {
      setTeamsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    if (activeTab === 'inquiries') fetchInquiries();
    if (activeTab === 'results') fetchResults();
    if (activeTab === 'teams') fetchTeams();
  }, [user, activeTab, fetchInquiries, fetchResults, fetchTeams]);

  // Handle status update for inquiries
  const updateInquiryStatus = async (id: number, status: 'new' | 'contacted' | 'closed') => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setActionNotice(`Inquiry #${id} status updated to ${status}`);
        fetchInquiries();
        setTimeout(() => setActionNotice(null), 4000);
      }
    } catch {
      // ignore
    }
  };

  // Handle result publishing
  const handleCreateResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingResult(true);
    try {
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newResult.title.trim(),
          event: newResult.event.trim(),
          year: Number(newResult.year),
          placement: newResult.placement.trim() || null,
          verified: newResult.verified,
        }),
      });
      if (res.ok) {
        setActionNotice('New competition result published successfully');
        setNewResult({
          title: '',
          event: '',
          year: new Date().getFullYear(),
          placement: '',
          verified: true,
        });
        fetchResults();
        setTimeout(() => setActionNotice(null), 4000);
      }
    } catch {
      // ignore
    } finally {
      setSubmittingResult(false);
    }
  };

  // Handle team registration
  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingTeam(true);
    try {
      const res = await fetch('/api/admin/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTeam.name.trim(),
          discipline: newTeam.discipline.trim(),
          description: newTeam.description.trim(),
        }),
      });
      if (res.ok) {
        setActionNotice('Flight division created successfully');
        setNewTeam({ name: '', discipline: '', description: '' });
        fetchTeams();
        setTimeout(() => setActionNotice(null), 4000);
      }
    } catch {
      // ignore
    } finally {
      setSubmittingTeam(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    await fetch('/api/auth/sign-out', { method: 'POST' }).catch(() => {});
    router.push('/login');
  };

  if (authChecking) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <p className={styles.emptyNotice}>Verifying team credentials…</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.brandGroup}>
            <Link href="/" className={styles.brandTitle}>
              AeroBMSCE Console
            </Link>
            <span className={styles.roleBadge}>ADMIN</span>
          </div>

          <div className={styles.userNav}>
            <span className={styles.userInfo}>
              {user?.name} · {user?.email}
            </span>
            <Link href="/" className={styles.siteLink}>
              View Live Site
            </Link>
            <button type="button" onClick={handleSignOut} className={styles.signOutBtn}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Administrative Management</h1>
          <p className={styles.pageSubtitle}>
            Triage inbound corporate inquiries, publish SAE competition standings, and manage flight divisions.
          </p>
        </div>

        {actionNotice && (
          <div
            role="status"
            style={{
              padding: 'var(--space-3)',
              backgroundColor: '#F0FDF4',
              color: '#166534',
              border: 'var(--rule-1) solid var(--color-rule)',
              fontFamily: 'var(--font-data)',
              fontSize: 'var(--text-data)',
            }}
          >
            ✓ {actionNotice}
          </div>
        )}

        {/* Tab Navigation */}
        <nav className={styles.tabBar} aria-label="Admin console sections">
          <AnimatedBackground
            value={activeTab}
            enableHover
            className={styles.tabIndicator}
            transition={{
              type: 'spring',
              bounce: 0.15,
              duration: 0.25,
            }}
          >
            <button
              type="button"
              data-id="inquiries"
              className={styles.tabBtn}
              aria-selected={activeTab === 'inquiries'}
              onClick={() => setActiveTab('inquiries')}
            >
              Partnership Inquiries
              {inquiries.length > 0 && <span className={styles.badgeCount}>{inquiries.length}</span>}
            </button>
            <button
              type="button"
              data-id="results"
              className={styles.tabBtn}
              aria-selected={activeTab === 'results'}
              onClick={() => setActiveTab('results')}
            >
              Competition Results
              {resultsList.length > 0 && <span className={styles.badgeCount}>{resultsList.length}</span>}
            </button>
            <button
              type="button"
              data-id="teams"
              className={styles.tabBtn}
              aria-selected={activeTab === 'teams'}
              onClick={() => setActiveTab('teams')}
            >
              Flight Divisions
            </button>
          </AnimatedBackground>
        </nav>

        {/* TAB 1: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <section className={styles.sectionCard} aria-labelledby="inquiries-heading">
            <div className={styles.cardHeader}>
              <div>
                <h2 id="inquiries-heading" className={styles.cardTitle}>
                  Inbound Partnership Inquiries
                </h2>
                <p className={styles.cardDescription}>
                  Review submissions from prospective sponsors, industry partners, and alumni mentors.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchInquiries}
                className={styles.statusBtn}
                disabled={inquiriesLoading}
              >
                {inquiriesLoading ? 'Refreshing…' : '↻ Refresh list'}
              </button>
            </div>

            {inquiries.length === 0 ? (
              <p className={styles.emptyNotice}>No inbound inquiries recorded yet.</p>
            ) : (
              <div className={styles.inquiriesList}>
                {inquiries.map((inq) => (
                  <article key={inq.id} className={styles.inquiryItem}>
                    <div className={styles.inquiryHeader}>
                      <div className={styles.inquiryMeta}>
                        <span className={styles.orgName}>{inq.organization}</span>
                        <span className={styles.contactName}>· {inq.name}</span>
                        <a href={`mailto:${inq.email}`} className={styles.inquiryEmail}>
                          {inq.email}
                        </a>
                      </div>
                      <time className={styles.inquiryDate} dateTime={inq.createdAt}>
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>

                    <blockquote className={styles.inquiryMessage}>
                      {inq.message}
                    </blockquote>

                    <div className={styles.statusRow}>
                      <span className={styles.statusPill} data-status={inq.status}>
                        Status: {inq.status}
                      </span>
                      <div className={styles.statusActions}>
                        <button
                          type="button"
                          onClick={() => updateInquiryStatus(inq.id, 'contacted')}
                          className={styles.statusBtn}
                          disabled={inq.status === 'contacted'}
                        >
                          Mark Contacted
                        </button>
                        <button
                          type="button"
                          onClick={() => updateInquiryStatus(inq.id, 'closed')}
                          className={styles.statusBtn}
                          disabled={inq.status === 'closed'}
                        >
                          Mark Closed
                        </button>
                        <button
                          type="button"
                          onClick={() => updateInquiryStatus(inq.id, 'new')}
                          className={styles.statusBtn}
                          disabled={inq.status === 'new'}
                        >
                          Reset to New
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: RESULTS */}
        {activeTab === 'results' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <section className={styles.sectionCard} aria-labelledby="publish-heading">
              <div className={styles.cardHeader}>
                <div>
                  <h2 id="publish-heading" className={styles.cardTitle}>
                    Publish Competition Award
                  </h2>
                  <p className={styles.cardDescription}>
                    Add verified SAE Aerothon, SAE Aero Design West, or national podium placement.
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateResult} className={styles.formGrid}>
                <div className={styles.formField}>
                  <label htmlFor="result-title" className={styles.label}>
                    Title / Award Description
                  </label>
                  <input
                    id="result-title"
                    type="text"
                    required
                    value={newResult.title}
                    onChange={(e) => setNewResult({ ...newResult, title: e.target.value })}
                    placeholder="e.g. 1st place overall, ₹1,25,000"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="result-event" className={styles.label}>
                    Competition & Venue
                  </label>
                  <input
                    id="result-event"
                    type="text"
                    required
                    value={newResult.event}
                    onChange={(e) => setNewResult({ ...newResult, event: e.target.value })}
                    placeholder="e.g. SAE Aerothon 2026"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="result-year" className={styles.label}>
                    Season Year
                  </label>
                  <input
                    id="result-year"
                    type="number"
                    required
                    min={2000}
                    max={2030}
                    value={newResult.year}
                    onChange={(e) => setNewResult({ ...newResult, year: Number(e.target.value) })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="result-placement" className={styles.label}>
                    Rank / Placement (Optional)
                  </label>
                  <input
                    id="result-placement"
                    type="text"
                    value={newResult.placement}
                    onChange={(e) => setNewResult({ ...newResult, placement: e.target.value })}
                    placeholder="e.g. 1st place overall"
                    className={styles.input}
                  />
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label className={styles.checkboxField}>
                    <input
                      type="checkbox"
                      checked={newResult.verified}
                      onChange={(e) => setNewResult({ ...newResult, verified: e.target.checked })}
                    />
                    <span className={styles.label}>Verified by Faculty Mentor / Chief Engineer</span>
                  </label>
                </div>

                <div className={styles.fullWidth}>
                  <button type="submit" className={styles.actionBtn} disabled={submittingResult}>
                    {submittingResult ? 'Publishing…' : 'Publish Result to Public Site'}
                  </button>
                </div>
              </form>
            </section>

            <section className={styles.sectionCard} aria-labelledby="catalog-heading">
              <div className={styles.cardHeader}>
                <h2 id="catalog-heading" className={styles.cardTitle}>
                  Published Results Catalog
                </h2>
              </div>

              {resultsList.length === 0 ? (
                <p className={styles.emptyNotice}>No results published yet.</p>
              ) : (
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th scope="col">Year</th>
                      <th scope="col">Award</th>
                      <th scope="col">Event</th>
                      <th scope="col">Placement</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsList.map((res) => (
                      <tr key={res.id}>
                        <td>{res.year}</td>
                        <td><strong>{res.title}</strong></td>
                        <td>{res.event}</td>
                        <td>{res.placement || '—'}</td>
                        <td>
                          {res.verified ? (
                            <span className={styles.verifiedBadge}>✓ Verified</span>
                          ) : (
                            <span>Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>
        )}

        {/* TAB 3: TEAMS */}
        {activeTab === 'teams' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <section className={styles.sectionCard} aria-labelledby="teams-form-heading">
              <div className={styles.cardHeader}>
                <h2 id="teams-form-heading" className={styles.cardTitle}>
                  Register Flight Division
                </h2>
              </div>

              <form onSubmit={handleCreateTeam} className={styles.formGrid}>
                <div className={styles.formField}>
                  <label htmlFor="team-name" className={styles.label}>
                    Division Name
                  </label>
                  <input
                    id="team-name"
                    type="text"
                    required
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    placeholder="e.g. Team AeroDynamics"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="team-discipline" className={styles.label}>
                    Discipline
                  </label>
                  <input
                    id="team-discipline"
                    type="text"
                    required
                    value={newTeam.discipline}
                    onChange={(e) => setNewTeam({ ...newTeam, discipline: e.target.value })}
                    placeholder="e.g. Fixed-Wing Aeromodelling"
                    className={styles.input}
                  />
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label htmlFor="team-desc" className={styles.label}>
                    Description & Mandate
                  </label>
                  <textarea
                    id="team-desc"
                    required
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                    placeholder="Mandate, aircraft classes, and research focus at BMS College of Engineering…"
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.fullWidth}>
                  <button type="submit" className={styles.actionBtn} disabled={submittingTeam}>
                    {submittingTeam ? 'Registering…' : 'Register Flight Division'}
                  </button>
                </div>
              </form>
            </section>

            <section className={styles.sectionCard} aria-labelledby="teams-catalog-heading">
              <div className={styles.cardHeader}>
                <h2 id="teams-catalog-heading" className={styles.cardTitle}>
                  Active Flight Divisions
                </h2>
              </div>

              {teamsList.length === 0 ? (
                <p className={styles.emptyNotice}>No flight divisions found.</p>
              ) : (
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th scope="col">Division</th>
                      <th scope="col">Discipline</th>
                      <th scope="col">Mandate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamsList.map((t) => (
                      <tr key={t.id}>
                        <td><strong>{t.name}</strong></td>
                        <td>{t.discipline}</td>
                        <td>{t.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
