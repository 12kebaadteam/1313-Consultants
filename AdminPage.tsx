import { useState, useEffect, useCallback } from 'react'

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin1313'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '147singhhh@'

interface Submission {
  id: number | string
  name: string; email: string; phone?: string
  company?: string; service?: string; message?: string
  date: string; ip_address?: string; source?: string
}

type DataSource = 'neon' | 'local' | 'none'

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [username, setUsername] = useState('')
  const [pw, setPw]           = useState('')
  const [loginError, setLoginError] = useState('')

  const [subs, setSubs]         = useState<Submission[]>([])
  const [selected, setSelected] = useState<Submission | null>(null)
  const [search, setSearch]     = useState('')
  const [loading, setLoading]   = useState(false)
  const [dataSource, setDataSource] = useState<DataSource>('none')
  const [dbError, setDbError]   = useState('')
  const [stats, setStats]       = useState({ total: 0, thisWeek: 0, topService: '' })

  // ── Fetch from Neon API ──────────────────────────────────
  const fetchFromNeon = useCallback(async (u: string, p: string): Promise<Submission[] | null> => {
    try {
      const creds = btoa(`${u}:${p}`)
      const res = await fetch('/api/submissions', {
        headers: { Authorization: `Basic ${creds}` },
      })
      if (!res.ok) return null
      const data = await res.json()
      return (data.submissions as Submission[]) ?? null
    } catch {
      return null
    }
  }, [])

  // ── Compute stats ────────────────────────────────────────
  const computeStats = (rows: Submission[]) => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const thisWeek = rows.filter(r => new Date(r.date).getTime() > oneWeekAgo).length
    const svcCount: Record<string, number> = {}
    rows.forEach(r => { if (r.service) svcCount[r.service] = (svcCount[r.service] || 0) + 1 })
    const topService = Object.entries(svcCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
    setStats({ total: rows.length, thisWeek, topService })
  }

  // ── Login ────────────────────────────────────────────────
  const handleLogin = async () => {
    if (username !== ADMIN_USERNAME || pw !== ADMIN_PASSWORD) {
      setLoginError('Incorrect username or password.')
      return
    }
    setAuth(true)
    setLoginError('')
    setLoading(true)

    // Try Neon first
    const neonRows = await fetchFromNeon(username, pw)
    if (neonRows) {
      setSubs(neonRows)
      setDataSource('neon')
      computeStats(neonRows)
    } else {
      // Fallback: localStorage
      const local: Submission[] = JSON.parse(localStorage.getItem('1313_submissions') || '[]')
      setSubs(local)
      setDataSource(local.length > 0 ? 'local' : 'none')
      computeStats(local)
      if (local.length === 0) {
        setDbError('Could not connect to Neon database. Showing local browser data. Set DATABASE_URL in Vercel to enable cloud storage.')
      } else {
        setDbError('Neon DB not connected — showing localStorage data. Deploy to Vercel with DATABASE_URL to enable cloud storage.')
      }
    }
    setLoading(false)
  }

  // ── Refresh ──────────────────────────────────────────────
  const handleRefresh = async () => {
    setLoading(true)
    setDbError('')
    const neonRows = await fetchFromNeon(username, pw)
    if (neonRows) {
      setSubs(neonRows); setDataSource('neon'); computeStats(neonRows)
    } else {
      setDbError('Neon DB unavailable. Showing local data.')
    }
    setLoading(false)
  }

  const filtered = subs.filter(s =>
    [s.name, s.email, s.company, s.service].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  )

  // ── Shared styles ────────────────────────────────────────
  const inputStyle = {
    width: '100%', background: 'var(--cream-mid)',
    border: '1.5px solid rgba(201,168,76,0.2)',
    padding: '11px 14px', fontSize: 13, color: 'var(--text-dark)',
    outline: 'none', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
  }
  const labelStyle = {
    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color: 'var(--gold)', display: 'block', marginBottom: 8, fontWeight: 500 as const,
  }

  // ════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ════════════════════════════════════════════════════════
  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 20px 60px rgba(10,22,40,0.1)', overflow: 'hidden' }}>
          <div style={{ height: 3, background: 'linear-gradient(90deg, var(--sapphire), var(--gold))' }} />
          <div style={{ padding: '44px 40px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{
                width: 64, height: 64, margin: '0 auto 20px',
                background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>🔒</div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--navy)', marginBottom: 6 }}>Admin Dashboard</h1>
              <p style={{ color: 'var(--text-light)', fontSize: 12, letterSpacing: '0.08em' }}>Restricted · Authorised personnel only</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={inputStyle} placeholder="Enter username"
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" value={pw} onChange={e => setPw(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={inputStyle} placeholder="Enter password"
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
              </div>
              {loginError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#dc2626' }}>⚠</span>
                  <p style={{ color: '#dc2626', fontSize: 12 }}>{loginError}</p>
                </div>
              )}
              <button onClick={handleLogin} className="btn-primary" style={{ width: '100%', padding: 14, marginTop: 4 }}>
                Access Dashboard →
              </button>
            </div>
          </div>
        </div>

        {/* Tech info */}
        <div style={{ marginTop: 16, background: 'rgba(10,22,40,0.04)', border: '1px solid rgba(201,168,76,0.12)', padding: '14px 18px' }}>
          <p style={{ fontSize: 11, color: 'var(--text-mid)', lineHeight: 1.7 }}>
            <strong>Storage:</strong> Neon PostgreSQL via Vercel serverless API.<br />
            <strong>Credentials:</strong> Set in <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 5px' }}>.env</code> →{' '}
            <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 5px' }}>VITE_ADMIN_USERNAME</code> /{' '}
            <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 5px' }}>VITE_ADMIN_PASSWORD</code>
          </p>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: 11, marginTop: 12 }}>This page is not publicly indexed</p>
      </div>
    </div>
  )

  // ════════════════════════════════════════════════════════
  // DASHBOARD
  // ════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--sapphire))', padding: '80px 32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Admin Dashboard</div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white' }}>Contact Submissions</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Data source badge */}
              <div style={{
                padding: '6px 14px', fontSize: 11, letterSpacing: '0.08em',
                background: dataSource === 'neon' ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)',
                border: `1px solid ${dataSource === 'neon' ? 'rgba(34,197,94,0.3)' : 'rgba(251,191,36,0.3)'}`,
                color: dataSource === 'neon' ? '#86efac' : '#fde68a',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: dataSource === 'neon' ? '#22c55e' : '#f59e0b', display: 'inline-block' }} />
                {dataSource === 'neon' ? '🗄 Neon PostgreSQL' : dataSource === 'local' ? '💾 localStorage (local only)' : '⚠ No data source'}
              </div>
              <button onClick={handleRefresh} disabled={loading} style={{
                padding: '8px 16px', border: '1.5px solid rgba(255,255,255,0.2)',
                background: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 11,
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                opacity: loading ? 0.5 : 1,
              }}>↻ Refresh</button>
              <button onClick={() => setAuth(false)} style={{
                padding: '8px 16px', border: '1.5px solid rgba(255,255,255,0.15)',
                background: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 11,
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              }}>Log Out</button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {[
              { label: 'Total Enquiries', value: stats.total, icon: '📬' },
              { label: 'This Week', value: stats.thisWeek, icon: '📅' },
              { label: 'Top Service', value: stats.topService || '—', icon: '⭐' },
              { label: 'Logged in as', value: username, icon: '👤' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.1)', padding: '16px 20px' }}>
                <div style={{ fontSize: 18, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold-light)', fontSize: 22, lineHeight: 1, marginBottom: 4 }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 32px' }}>

        {/* ── DB status / error banner ──────────────────────── */}
        {dbError && (
          <div style={{
            background: 'white', border: '1px solid rgba(251,191,36,0.3)',
            borderLeft: '3px solid #f59e0b', padding: '14px 20px',
            marginBottom: 20, display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <div>
              <strong style={{ color: 'var(--navy)', fontSize: 13 }}>Database not connected</strong>
              <p style={{ color: 'var(--text-mid)', fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>{dbError}</p>
              <p style={{ color: 'var(--text-mid)', fontSize: 12, marginTop: 6, lineHeight: 1.6 }}>
                <strong>To connect:</strong> Set <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 5px' }}>DATABASE_URL</code> in your Vercel project dashboard → Settings → Environment Variables → redeploy.
              </p>
            </div>
          </div>
        )}

        {/* ── DB Schema info ────────────────────────────────── */}
        {dataSource === 'neon' && (
          <div style={{
            background: 'white', border: '1px solid rgba(34,197,94,0.2)',
            borderLeft: '3px solid #22c55e', padding: '14px 20px',
            marginBottom: 20, display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 18 }}>🗄</span>
            <div>
              <strong style={{ color: 'var(--navy)', fontSize: 13 }}>Neon PostgreSQL — Connected</strong>
              <p style={{ color: 'var(--text-mid)', fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>
                Table: <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 5px' }}>contact_submissions</code> ·
                Columns: <code style={{ background: 'rgba(0,0,0,0.06)', padding: '1px 5px' }}>id, name, email, phone, company, service, message, ip_address, created_at</code>
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 32, marginBottom: 16, opacity: 0.4, animation: 'float 1s ease infinite' }}>⏳</div>
            <p style={{ color: 'var(--text-light)', fontSize: 13 }}>Loading submissions…</p>
          </div>
        ) : subs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', border: '1px solid rgba(201,168,76,0.1)' }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>📭</div>
            <p style={{ color: 'var(--text-mid)', fontSize: 14, fontWeight: 500 }}>No submissions yet</p>
            <p style={{ color: 'var(--text-light)', fontSize: 12, marginTop: 6 }}>Submissions from the Contact form will appear here</p>
          </div>
        ) : (
          <>
            {/* Search */}
            <div style={{ marginBottom: 16 }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, email, company or service…"
                style={{
                  width: '100%', maxWidth: 440, background: 'white',
                  border: '1.5px solid rgba(201,168,76,0.2)', padding: '10px 16px',
                  fontSize: 13, color: 'var(--text-dark)', outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 2, background: 'rgba(201,168,76,0.08)' }}>
              {/* ── List ────────────────────────────────────── */}
              <div style={{ background: 'white', overflowY: 'auto', maxHeight: 680 }}>
                <div style={{ padding: '12px 20px', background: 'var(--cream)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                    {filtered.length} of {subs.length}
                  </span>
                </div>
                {filtered.map(sub => (
                  <button key={sub.id} onClick={() => setSelected(sub)} style={{
                    width: '100%', textAlign: 'left', padding: '16px 20px',
                    background: selected?.id === sub.id ? 'var(--cream)' : 'white',
                    border: 'none', borderBottom: '1px solid var(--cream-mid)', cursor: 'pointer',
                    borderLeft: `3px solid ${selected?.id === sub.id ? 'var(--gold)' : 'transparent'}`,
                    transition: 'all 0.15s',
                  }}>
                    <div style={{ fontWeight: 500, color: 'var(--navy)', fontSize: 14 }}>{sub.name}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: 12, marginTop: 2 }}>{sub.email}</div>
                    {sub.service && (
                      <span style={{
                        display: 'inline-block', marginTop: 6, padding: '2px 8px',
                        background: 'rgba(201,168,76,0.1)', fontSize: 10, color: 'var(--gold)',
                      }}>{sub.service}</span>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                      <div style={{ color: 'var(--text-light)', fontSize: 10 }}>{sub.date}</div>
                      {sub.source === 'neon' || dataSource === 'neon'
                        ? <span style={{ fontSize: 9, color: '#86efac', letterSpacing: '0.05em' }}>● DB</span>
                        : <span style={{ fontSize: 9, color: '#fde68a', letterSpacing: '0.05em' }}>● local</span>
                      }
                    </div>
                  </button>
                ))}
              </div>

              {/* ── Detail panel ─────────────────────────────── */}
              <div style={{ background: 'white', padding: 36, minHeight: 400 }}>
                {selected ? (
                  <div>
                    <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: 28 }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
                      {([
                        ['Full Name', selected.name],
                        ['Email Address', selected.email],
                        ['Phone Number', selected.phone || '—'],
                        ['Company', selected.company || '—'],
                        ['Service Requested', selected.service || '—'],
                        ['Date Submitted', selected.date],
                        ...(selected.ip_address ? [['IP Address', selected.ip_address]] : []),
                      ] as [string, string][]).map(([label, value]) => (
                        <div key={label}>
                          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{label}</div>
                          <div style={{ color: 'var(--navy)', fontSize: 14 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                    {selected.message && (
                      <div>
                        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Message</div>
                        <div style={{ background: 'var(--cream)', padding: 20, border: '1px solid rgba(201,168,76,0.1)', color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.75 }}>
                          {selected.message}
                        </div>
                      </div>
                    )}
                    {/* Quick-reply mailto */}
                    <div style={{ marginTop: 24 }}>
                      <a href={`mailto:${selected.email}?subject=Re: Your enquiry to 1313 Consultants`}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '10px 20px', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                          color: 'var(--navy)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                          fontWeight: 500, textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
                        }}>
                        ✉ Reply via Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 300 }}>
                    <p style={{ color: 'var(--text-light)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      ← Select a submission to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
