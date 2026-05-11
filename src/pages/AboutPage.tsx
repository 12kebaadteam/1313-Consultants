import { useEffect, useRef, useState } from 'react'

interface AboutPageProps { onContactOpen: () => void }

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const team = [
  { name: 'Satwant Singh', role: 'Chief Executive Officer', bio: 'Leading the firm\'s strategic growth, Satwant brings deep expertise in business development, client relations, and scaling professional services firms.', initials: 'SS', accent: '#1a3a6b' },
]

const values = [
  { icon: '⚖', title: 'Integrity First', desc: 'We uphold the highest ethical standards in every engagement, ensuring full transparency with every client.' },
  { icon: '◎', title: 'Precision & Detail', desc: 'Every figure matters. Our meticulous approach ensures accuracy across all financial reporting and advice.' },
  { icon: '◈', title: 'Client-Centric', desc: 'Your goals are our goals. We tailor every solution to your unique business and personal situation.' },
  { icon: '◬', title: 'Continuous Growth', desc: 'We stay ahead of legislative changes, ensuring our advice is always current, relevant, and compliant.' },
]

export default function AboutPage({ onContactOpen }: AboutPageProps) {
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal(); const r4 = useReveal()

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '65vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
        position: 'relative', overflow: 'hidden', padding: '120px 32px 72px',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '30vw', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>1313</div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontWeight: 500 }}>About 1313 Consultants</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 600, color: 'white', lineHeight: 1.15, marginBottom: 24 }}>
            Who We Are
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, lineHeight: 1.8 }}>
            A premier accounting consultancy serving clients across the United Kingdom with distinction, expertise, and genuine care for their financial success.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0,50 C360,0 1080,0 1440,50 L1440,50 L0,50 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section ref={r1.ref} style={{
        padding: '88px 32px', background: 'var(--cream)',
        opacity: r1.visible ? 1 : 0, transition: 'all 0.8s ease', transform: r1.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Our Story</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--navy)', marginBottom: 24 }}>Fifteen Years of Financial Excellence</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85 }}>
                Founded in 2009 in the heart of London, 1313 Consultants was built on a simple belief: every business and individual deserves access to the same calibre of financial expertise.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85 }}>
                We set out to create a boutique consultancy where clients are known by name, not account number. Where strategy comes before paperwork, and results are measured in real outcomes.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85 }}>
                Today, under the leadership of CEO Satwant Singh, we support over 1,200 clients — from entrepreneurs and freelancers to mid-market companies and property investors across the UK.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { year: '2009', event: 'Founded in London', desc: '1313 Consultants is established to bring clarity to complex finances.' },
              { year: '2013', event: 'Strategic Expansion', desc: 'The firm expands its core advisory and tax services.' },
              { year: '2018', event: '4 Service Divisions', desc: 'Formal divisions for tax, payroll, advisory & compliance are created.' },
              { year: '2024', event: '1,200+ Clients', desc: 'Serving businesses and individuals across the United Kingdom.' },
            ].map(({ year, event, desc }) => (
              <div key={year} style={{ background: 'white', padding: '28px 24px', border: '1px solid rgba(201,168,76,0.1)' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontSize: 28, fontWeight: 600, marginBottom: 8 }}>{year}</div>
                <div style={{ fontWeight: 500, color: 'var(--navy)', fontSize: 13, marginBottom: 6 }}>{event}</div>
                <div style={{ color: 'var(--text-light)', fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={r2.ref} style={{
        padding: '88px 32px', background: 'white',
        opacity: r2.visible ? 1 : 0, transition: 'all 0.8s ease', transform: r2.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Leadership</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--navy)' }}>The Person Behind 1313</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 440 }}>
              {team.map(({ name, role, bio, initials, accent }) => (
                <div key={name} className="glass-card" style={{ padding: '36px 28px', transition: 'transform 0.3s, box-shadow 0.3s' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(10,22,40,0.12)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,22,40,0.08)'; }}
                >
                  <div style={{
                    width: 60, height: 60, background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'white', fontWeight: 600,
                    marginBottom: 20,
                  }}>{initials}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--navy)', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 16, fontWeight: 500 }}>{role}</div>
                  <p style={{ color: 'var(--text-mid)', fontSize: 13, lineHeight: 1.7 }}>{bio}</p>
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
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Our Values</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--navy)' }}>The Principles We Live By</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {values.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: 'white', padding: '40px 28px', textAlign: 'center',
                borderTop: '3px solid transparent', transition: 'all 0.3s',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
              onMouseOver={e => { e.currentTarget.style.borderTopColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(10,22,40,0.08)'; }}
              onMouseOut={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 20 }}>{icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--navy)', marginBottom: 12 }}>{title}</div>
                <p style={{ color: 'var(--text-mid)', fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={r4.ref} style={{
        padding: '80px 32px', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
        opacity: r4.visible ? 1 : 0, transition: 'all 0.8s ease',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, color: 'white', marginBottom: 16 }}>Work With Our Team</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>Let's discuss how 1313 Consultants can help you achieve financial clarity and sustainable growth.</p>
          <button onClick={onContactOpen} className="btn-primary" style={{ padding: '14px 40px' }}>Contact Our Team →</button>
        </div>
      </section>
    </div>
  )
}
