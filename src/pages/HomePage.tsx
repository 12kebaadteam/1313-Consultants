import { useEffect, useRef, useState } from 'react'
import { SERVICES, type ServiceSlug } from '../App'

interface HomePageProps {
  onContactOpen: () => void
  onSelectService: (service: ServiceSlug) => void
  onNavigateServices: () => void
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    }, { threshold: 0.05, rootMargin: '40px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const stats = [
  { value: '100%', label: 'Two-Tier Quality Review' },
  { value: '24h', label: 'Query Turnaround SLA' },
  { value: '99.4%', label: 'On-Time Filing Record' },
  { value: 'UK', label: 'GDPR & Practice Compliant' },
]

const testimonials = [
  {
    name: 'James Hartley',
    role: 'Principal, Hartley Bookkeeping & Advisory',
    quote: '1313 Consultants transformed our practice operations. Their dedicated back-office support allows us to take on higher-volume clients with complete confidence in ledger accuracy.',
  },
  {
    name: 'Sarah Chen',
    role: 'Managing Director, Apex Practice Solutions',
    quote: 'As a growing UK bookkeeping firm, having 1313 handle our payroll and timesheet processing has been invaluable. Transparent, punctual, and meticulous in every delivery.',
  },
  {
    name: 'Michael Davies',
    role: 'Director, Davies Practice Management',
    quote: 'Impeccable service. The team handles everything seamlessly — from bank reconciliations to year-end workpaper preparation. Our capacity has effectively doubled.',
  },
]

const badges = ['UK Practice Support', 'GDPR Compliant', 'Making Tax Digital Ready']

export default function HomePage({ onContactOpen, onSelectService, onNavigateServices }: HomePageProps) {
  const rServices = useReveal()
  const r3 = useReveal()
  const rStats = useReveal()
  const r4 = useReveal()
  const rStandards = useReveal()
  const r6 = useReveal()

  const scrollToServices = () => {
    rServices.ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative',
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--sapphire) 50%, #2a5298 100%)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="hidden sm:block" style={{
          position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(200px, 30vw, 400px)', fontFamily: 'Playfair Display, serif',
          fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none',
          letterSpacing: -10, pointerEvents: 'none',
        }}>1313</div>
        <div style={{
          position: 'absolute', bottom: -100, right: 0,
          width: 'clamp(200px, 50vw, 500px)', height: 'clamp(200px, 50vw, 500px)', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 32px 80px', position: 'relative', zIndex: 1 }}>
          <div className="animate-fade-up anim-delay-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 20px', marginBottom: 32,
            border: '1px solid rgba(201,168,76,0.4)',
            background: 'rgba(201,168,76,0.08)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', boxShadow: '0 0 8px var(--gold)' }} />
            <span style={{ color: 'var(--gold-light)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>
              London & UK Wide
            </span>
          </div>

          <h1 className="animate-fade-up anim-delay-2" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 6.5vw, 80px)',
            fontWeight: 600, color: 'white', lineHeight: 1.12,
            marginBottom: 28, maxWidth: 740,
          }}>
            Precision<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Bookkeeping</span><br />
            Practice Support
          </h1>

          <p className="animate-fade-up anim-delay-3" style={{
            color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.8,
            maxWidth: 560, marginBottom: 44,
          }}>
            Expert outsourced back-office support for UK bookkeepers and bookkeeping practices. Dedicated ledger management, payroll processing, timesheets, and VAT compliance with senior quality control.
          </p>

          <div className="animate-fade-up anim-delay-4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={onContactOpen} className="btn-primary">
              Book Practice Consultation
            </button>
            <button 
              onClick={scrollToServices}
              className="btn-secondary"
            >
              Explore Services ↓
            </button>
          </div>

          <div className="animate-fade-up anim-delay-5" style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', gap: 28 }}>
            {badges.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: '0.1em' }}>
                <span style={{ color: 'var(--gold)', fontSize: 11 }}>✓</span>{b}
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, overflow: 'hidden' }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto', minWidth: '100%' }}>
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ── CORE SERVICES SHOWCASE ── */}
      <section ref={rServices.ref} style={{
        padding: '88px 32px 72px', background: 'var(--cream)',
        opacity: rServices.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: rServices.visible ? 'translateY(0)' : 'translateY(24px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>
              Specialised Solutions
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--navy)', marginBottom: 16 }}>
              Outsourced Back-Office Services
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: 15, maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
              Scalable, white-label operational support engineered specifically for UK bookkeepers, bookkeeping practices, and growing businesses.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 28 }}>
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="glass-card"
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'white',
                }}
              >
                <div>
                  <div style={{
                    width: 52, height: 52, borderRadius: 2,
                    background: 'var(--cream)', border: '1px solid rgba(201,168,76,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, marginBottom: 20,
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 21, color: 'var(--navy)', marginBottom: 10 }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--text-mid)', fontSize: 13.5, lineHeight: 1.75, marginBottom: 24 }}>
                    {s.tagline}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => onSelectService(s)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--navy)', fontSize: 11, letterSpacing: '0.12em',
                      textTransform: 'uppercase', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: 0,
                    }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--navy)'}
                  >
                    View Details <span>→</span>
                  </button>
                  <span style={{ fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.05em' }}>UK SLA</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button onClick={onNavigateServices} className="btn-primary" style={{ padding: '12px 32px' }}>
              View All Services & Specifications →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section ref={r3.ref} style={{
        padding: '88px 32px', background: 'white',
        opacity: r3.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: r3.visible ? 'translateY(0)' : 'translateY(24px)',
      }}>
        <div id="why-us" className="responsive-grid" style={{ maxWidth: 1200, margin: '0 auto', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>
              The 1313 Advantage
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--navy)', marginBottom: 20 }}>
              Purpose-Built for UK Bookkeepers
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85, marginBottom: 32 }}>
              We operate as a seamless extension of your firm. By taking on time-intensive reconciliation, payroll, and invoice processing, we empower UK bookkeepers to scale their client roster without growing overheads.
            </p>
            {[
              ['Dedicated Senior Reviewers', 'Every client ledger is reviewed by senior bookkeeping specialists before delivery.'],
              ['Multi-Tier Quality Control', 'Robust internal checking protocols eliminate errors before work reaches your desk.'],
              ['Fixed, Transparent Pricing', 'Predictable monthly costs that scale with your client volume, avoiding hidden surprises.'],
              ['Complete Data Confidentiality', 'Strict UK GDPR compliance and secure cloud-portal workflows protect all client data.'],
              ['24-Hour Response Guarantee', 'Punctual communication and reliable SLAs ensure deadlines are never in jeopardy.'],
            ].map(([title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 28, height: 28, minWidth: 28, background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginTop: 2,
                }}>✓</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: 'var(--text-mid)', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
            <button onClick={onContactOpen} className="btn-primary" style={{ marginTop: 12 }}>
              Discuss Practice Requirements
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--sapphire))', padding: '44px 36px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontSize: 40, fontWeight: 600 }}>100%</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Quality & Compliance Review</div>
              </div>
              <div className="stack-on-mobile">
                {[
                  ['UK GDPR', 'Strict Data Protection'],
                  ['Two-Tier', 'Senior Review Sign-Off'],
                  ['24h', 'Query Turnaround SLA'],
                  ['Xero / QBO', 'Cloud Practice Mastery'],
                ].map(([val, desc]) => (
                  <div key={val} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.15)', padding: '18px 14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold-light)', fontSize: 19 }}>{val}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9.5, letterSpacing: '0.1em', marginTop: 4, textTransform: 'uppercase' }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'absolute', inset: -10, border: '1px solid rgba(201,168,76,0.12)', zIndex: -1 }} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div ref={rStats.ref} style={{
        padding: '48px 32px', background: 'white',
        borderTop: '1px solid var(--cream-mid)',
        borderBottom: '1px solid var(--cream-mid)',
        opacity: rStats.visible ? 1 : 0, transform: rStats.visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.6s ease',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: '16px' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: 'var(--sapphire)', fontWeight: 600, lineHeight: 1.1 }}>{value}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: 6, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section ref={r4.ref} style={{
        padding: '88px 32px', background: 'var(--cream)',
        opacity: r4.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: r4.visible ? 'translateY(0)' : 'translateY(24px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Feedback</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 38px)', color: 'var(--navy)' }}>What Bookkeepers & Practices Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map(({ name, role, quote }) => (
              <div key={name} className="glass-card" style={{ padding: 32, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, color: 'var(--gold)', opacity: 0.3, lineHeight: 1, marginBottom: 12 }}>"</div>
                  <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>{quote}</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 16 }}>
                  <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 14 }}>{name}</div>
                  <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.05em', marginTop: 4 }}>{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY & OPERATIONAL STANDARDS (REPLACED REGULATED SECTION) ── */}
      <section ref={rStandards.ref} style={{
        padding: '72px 32px', background: 'white', borderTop: '1px solid var(--cream-mid)',
        opacity: rStandards.visible ? 1 : 0, transition: 'all 0.8s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 12, fontWeight: 500 }}>
            Operational Standards
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'var(--navy)', marginBottom: 36 }}>
            Security, Accuracy & Practice Governance
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { name: 'UK GDPR Compliant', desc: 'Strict data privacy & encryption', icon: '🛡' },
              { name: 'Two-Tier Review', desc: 'Internal senior quality sign-off', icon: '🔍' },
              { name: 'MTD Ready', desc: 'Digital links & VAT verification', icon: '⚡' },
              { name: 'Seamless Cloud Stack', desc: 'Direct Xero, QBO & Sage access', icon: '☁' },
            ].map(({ name, desc, icon }) => (
              <div key={name} style={{ 
                textAlign: 'center', padding: '28px 18px', 
                border: '1px solid var(--cream-mid)',
                background: 'var(--cream)',
                transition: 'all 0.2s ease',
              }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'var(--sapphire)', fontWeight: 600, letterSpacing: '0.02em', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-mid)', letterSpacing: '0.04em' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={r6.ref} style={{
        padding: '88px 32px', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
        position: 'relative', overflow: 'hidden',
        opacity: r6.visible ? 1 : 0, transition: 'all 0.8s ease',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(280px, 80vw, 600px)', height: 'clamp(280px, 80vw, 600px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 660, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontWeight: 500 }}>
            Scale Your Capacity
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 5vw, 44px)', color: 'white', marginBottom: 20 }}>
            Ready to Expand<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Your Bookkeeping Practice?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            Book a complimentary practice consultation with our senior team. We will review your current workflow requirements and provide tailored back-office capacity options.
          </p>
          <button onClick={onContactOpen} className="btn-primary" style={{ padding: '14px 40px' }}>
            Book Practice Consultation →
          </button>
        </div>
      </section>
    </div>
  )
}
