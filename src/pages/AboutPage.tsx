import { useEffect, useRef, useState } from 'react'

interface AboutPageProps { onContactOpen: () => void }

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

const team = [
  {
    name: 'Satwant Singh',
    role: 'Chief Executive Officer',
    bio: 'Leading the firm’s strategic vision, Satwant brings deep expertise in back-office operational excellence, client relations, and scaling support infrastructure for UK professional practices.',
    initials: 'SS',
    accent: '#1a3a6b',
  },
]

const values = [
  { icon: '⚖', title: 'Integrity & Discretion', desc: 'We operate with strict confidentiality under UK GDPR, treating your client data with absolute discretion and care.' },
  { icon: '◎', title: 'Precision & Quality', desc: 'Every figure matters. Our multi-tier review process ensures pinpoint accuracy across all ledgers, payroll runs, and reconciliations.' },
  { icon: '◈', title: 'Practice Partnership', desc: 'Your deadlines are our commitments. We adapt to your standard operating procedures, acting as an invisible extension of your team.' },
  { icon: '◬', title: 'Continuous Compliance', desc: 'We stay continuously updated on UK Tax office guidance, MTD rules, and statutory deadlines so your practice remains fully compliant.' },
]

export default function AboutPage({ onContactOpen }: AboutPageProps) {
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal(); const r4 = useReveal()

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
        position: 'relative', overflow: 'hidden', padding: '120px 32px 72px',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="hidden sm:block" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '30vw', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>1313</div>
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontWeight: 500 }}>About 1313 Consultants</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 600, color: 'white', lineHeight: 1.15, marginBottom: 24 }}>
            Who We Are
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.8 }}>
            A premier bookkeeping consultancy and practice support firm serving UK bookkeepers, practices, and businesses with distinction, expertise, and genuine care for operational excellence.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, overflow: 'hidden' }}>
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <path d="M0,50 C360,0 1080,0 1440,50 L1440,50 L0,50 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section ref={r1.ref} style={{
        padding: '88px 32px', background: 'var(--cream)',
        opacity: r1.visible ? 1 : 0, transition: 'all 0.8s ease', transform: r1.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div className="responsive-grid" style={{ maxWidth: 1200, margin: '0 auto', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Our Story</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--navy)', marginBottom: 24 }}>
              Dedicated Back-Office Excellence for UK Practices
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85 }}>
                1313 Consultants Ltd (Company No. 11719129) was established to provide UK bookkeeping practices and growing firms with reliable, scalable back-office capacity without the friction, overhead, and delays of constant recruitment.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85 }}>
                We created a dedicated practice support infrastructure where working papers are prepared to rigorous professional standards, ledgers are meticulously reconciled, and client data is protected under strict UK GDPR governance.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85 }}>
                Led by experienced management, we serve as an invisible operational backbone for UK bookkeepers — delivering seamless outsourced bookkeeping, payroll management, timesheet auditing, and compliance support.
              </p>
            </div>
          </div>
          <div className="stack-on-mobile">
            {[
              { year: '2018', event: 'UK Incorporation', desc: '1313 Consultants Ltd established in England & Wales to deliver dedicated administrative and back-office support.' },
              { year: '2020', event: 'Practice Support Specialisation', desc: 'Expansion into structured white-label back-office services tailored specifically for UK bookkeepers.' },
              { year: '2023', event: 'Cloud Platform Standardization', desc: 'Deployment of standardised, secure workflows across Xero, QuickBooks Online, and Sage.' },
              { year: 'Present', event: 'Dedicated Practice Partner', desc: 'Delivering consistent back-office capacity, multi-tier review, and SLA-backed turnaround across the UK.' },
            ].map(({ year, event, desc }) => (
              <div key={year} style={{ background: 'white', padding: '28px 24px', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontSize: 26, fontWeight: 600, marginBottom: 8 }}>{year}</div>
                <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 13, marginBottom: 6 }}>{event}</div>
                <div style={{ color: 'var(--text-mid)', fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section ref={r2.ref} style={{
        padding: '88px 32px', background: 'white',
        opacity: r2.visible ? 1 : 0, transition: 'all 0.8s ease', transform: r2.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Leadership</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--navy)' }}>Leadership & Vision</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 460 }}>
              {team.map(({ name, role, bio, initials, accent }) => (
                <div key={name} className="glass-card" style={{ padding: '36px 30px', textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, margin: '0 auto 20px',
                    background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white', fontWeight: 600,
                  }}>{initials}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--navy)', marginBottom: 4 }}>{name}</h3>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontWeight: 600 }}>{role}</div>
                  <p style={{ color: 'var(--text-mid)', fontSize: 13.5, lineHeight: 1.8 }}>{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={r3.ref} style={{
        padding: '88px 32px', background: 'var(--cream)',
        opacity: r3.visible ? 1 : 0, transition: 'all 0.8s ease', transform: r3.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Our Values</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--navy)' }}>The Standards We Live By</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: 'white', padding: '36px 28px', textAlign: 'center',
                borderTop: '3px solid transparent', transition: 'all 0.3s',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
              onMouseOver={e => { e.currentTarget.style.borderTopColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,22,40,0.08)'; }}
              onMouseOut={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 18 }}>{icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--navy)', marginBottom: 12 }}>{title}</h3>
                <p style={{ color: 'var(--text-mid)', fontSize: 13, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={r4.ref} style={{
        padding: '88px 32px', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
        opacity: r4.visible ? 1 : 0, transition: 'all 0.8s ease',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 38px)', color: 'white', marginBottom: 16 }}>
            Partner With Our Team
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            Let’s discuss how 1313 Consultants can provide dedicated, cost-effective back-office capacity for your bookkeeping practice.
          </p>
          <button onClick={onContactOpen} className="btn-primary" style={{ padding: '14px 40px' }}>
            Enquire Today →
          </button>
        </div>
      </section>
    </div>
  )
}
