import { useState } from 'react'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

interface FormData {
  name: string; email: string; phone: string
  company: string; service: string; message: string
}

const EMPTY: FormData = { name: '', email: '', phone: '', company: '', service: '', message: '' }

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    setError('')

    let savedToDb = false

    // ── 1. Try Neon via Vercel API ────────────────────────────
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) savedToDb = true
    } catch {
      // API not available (local dev without Vercel CLI) — fall through to localStorage
    }

    // ── 2. Always save to localStorage as local backup ────────
    try {
      const existing = JSON.parse(localStorage.getItem('1313_submissions') || '[]')
      localStorage.setItem('1313_submissions', JSON.stringify([
        { ...form, id: Date.now(), date: new Date().toLocaleString(), source: savedToDb ? 'neon' : 'local' },
        ...existing,
      ]))
    } catch { /* localStorage unavailable */ }

    setLoading(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setForm(EMPTY)
    setError('')
    onClose()
  }

  if (!open) return null

  const inputStyle = {
    width: '100%', background: 'var(--cream-mid)',
    border: '1.5px solid rgba(201,168,76,0.2)',
    padding: '11px 14px', fontSize: 13, color: 'var(--text-dark)',
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'DM Sans, sans-serif',
  }
  const labelStyle = {
    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color: 'var(--gold)', display: 'block', marginBottom: 6, fontWeight: 500 as const,
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,22,40,0.65)', backdropFilter: 'blur(6px)' }} onClick={handleClose} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 520,
        background: 'var(--cream)', border: '1px solid rgba(201,168,76,0.25)',
        boxShadow: '0 24px 80px rgba(10,22,40,0.2)',
        maxHeight: '92vh', overflowY: 'auto',
        animation: 'fadeUp 0.35s ease forwards',
      }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, var(--sapphire), var(--gold))' }} />
        <div style={{ padding: 36 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{
                width: 64, height: 64, margin: '0 auto 24px',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>✓</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--navy)', marginBottom: 12 }}>
                Enquiry Received
              </h3>
              <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.7 }}>
                Thank you for reaching out. A member of our team will contact you within 24 business hours.
              </p>
              <button onClick={handleClose} className="btn-primary" style={{ marginTop: 28 }}>Close</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--navy)', marginBottom: 4 }}>Get In Touch</h2>
                  <p style={{ color: 'var(--text-light)', fontSize: 12, letterSpacing: '0.05em' }}>We respond within 24 business hours</p>
                </div>
                <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: 'var(--text-light)', lineHeight: 1 }}>×</button>
              </div>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle} placeholder="John Smith"
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                      style={inputStyle} placeholder="Company Ltd"
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle} placeholder="john@company.co.uk"
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle} placeholder="+44 (0) 20 0000 0000"
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                </div>

                <div>
                  <label style={labelStyle}>Service Interested In</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    style={{ ...inputStyle, background: 'var(--cream-mid)' }}>
                    <option value="">Select a service</option>
                    {['Tax Advisory', 'Bookkeeping & Accounts', 'Payroll Services',
                      'Business Consultancy', 'Tax office Compliance', 'Financial Planning', 'Other'
                    ].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={3} style={{ ...inputStyle, resize: 'none' }}
                    placeholder="How can we help you?"
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: 14, opacity: (!form.name || !form.email) ? 0.5 : 1 }}
                >
                  {loading ? 'Sending…' : 'Send Enquiry →'}
                </button>
                <p style={{ fontSize: 10, color: 'var(--text-light)', textAlign: 'center', letterSpacing: '0.05em' }}>
                  Protected under UK GDPR · We never share your information
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
