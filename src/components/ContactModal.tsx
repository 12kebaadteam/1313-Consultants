import { useState } from 'react'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

const EMPTY: FormData = { name: '', email: '', phone: '', company: '', service: '', message: '' }

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please provide your name and email address.')
      return
    }
    setLoading(true)
    setError('')

    let savedToDb = false

    // 1. Try Vercel Serverless API
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) savedToDb = true
    } catch {
      // Local dev fallback
    }

    // 2. Local backup
    try {
      const existing = JSON.parse(localStorage.getItem('1313_submissions') || '[]')
      localStorage.setItem('1313_submissions', JSON.stringify([
        { ...form, id: Date.now(), date: new Date().toLocaleString(), source: savedToDb ? 'neon' : 'local' },
        ...existing,
      ]))
    } catch {
      // Storage unavailable
    }

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
    width: '100%',
    background: 'var(--cream-mid)',
    border: '1.5px solid rgba(201,168,76,0.25)',
    padding: '12px 14px',
    fontSize: 13,
    color: 'var(--text-dark)',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'DM Sans, sans-serif',
    minHeight: 44,
  }

  const labelStyle = {
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'var(--gold)',
    display: 'block',
    marginBottom: 6,
    fontWeight: 600 as const,
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        onClick={handleClose}
      />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 540,
        background: 'var(--cream)', border: '1px solid rgba(201,168,76,0.3)',
        boxShadow: '0 24px 80px rgba(10,22,40,0.25)',
        maxHeight: '92vh', overflowY: 'auto',
        animation: 'fadeUp 0.35s ease forwards',
      }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, var(--sapphire), var(--gold))' }} />
        <div style={{ padding: '36px 32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{
                width: 64, height: 64, margin: '0 auto 24px',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>✓</div>
              <h2 id="contact-modal-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--navy)', marginBottom: 12 }}>
                Enquiry Received
              </h2>
              <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.75 }}>
                Thank you for reaching out. A senior member of our team will contact you within 24 business hours to discuss your practice requirements.
              </p>
              <button onClick={handleClose} className="btn-primary" style={{ marginTop: 28 }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <h2 id="contact-modal-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--navy)', marginBottom: 4 }}>
                    Practice Consultation
                  </h2>
                  <p style={{ color: 'var(--text-light)', fontSize: 12, letterSpacing: '0.05em' }}>
                    We respond within 24 business hours
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 26, color: 'var(--text-light)', lineHeight: 1, padding: 4 }}
                >
                  ×
                </button>
              </div>

              {error && (
                <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="stack-on-mobile">
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>Full Name *</label>
                    <input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Eleanor Vance"
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" style={labelStyle}>Practice / Firm Name</label>
                    <input
                      id="contact-company"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Vance Bookkeeping"
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    placeholder="eleanor@vancebookkeeping.co.uk"
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" style={labelStyle}>Contact Telephone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    placeholder="e.g. 020 7946 0192"
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" style={labelStyle}>Service of Interest</label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    style={{ ...inputStyle, background: 'var(--cream-mid)' }}
                  >
                    <option value="">Select a service category</option>
                    {[
                      'Bookkeeping & Accounts',
                      'Payroll Services',
                      'Timesheet Management',
                      'Invoice Processing & Billing',
                      'Tax Office Compliance Support',
                      'Practice Advisory & Consultancy',
                      'Other Back-Office Support',
                    ].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" style={labelStyle}>Practice Requirements / Notes</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                    placeholder="Tell us about your client volume, software stack, or specific back-office requirements..."
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!form.name.trim() || !form.email.trim() || loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px 20px', minHeight: 48 }}
                >
                  {loading ? 'Submitting Enquiry…' : 'Submit Consultation Request →'}
                </button>

                <p style={{ fontSize: 10.5, color: 'var(--text-light)', textAlign: 'center', letterSpacing: '0.04em' }}>
                  Protected under UK GDPR · Strict Confidentiality Guaranteed
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
