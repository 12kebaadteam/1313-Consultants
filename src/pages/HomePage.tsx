import { useEffect, useRef, useState } from 'react'

interface HomePageProps {
  onContactOpen: () => void
}

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

const stats = [
  { value: '1,200+', label: 'Clients Served' },
  { value: '£100M+', label: 'Assets Managed' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Retention' },
]

const testimonials = [
  { name: 'James Hartley', role: 'CEO, Meridian Group', quote: '1313 Consultants transformed our financial operations. Their proactive approach saved us over £80,000 in tax in year one alone.' },
  { name: 'Sarah Chen', role: 'Founder, Luminos Studio', quote: 'As a growing startup, having 1313 on our side has been invaluable. They speak plain English, deliver results, and are genuinely invested in our success.' },
  { name: 'Michael Davies', role: 'Director, Davies Properties', quote: 'Impeccable service. The team handles everything seamlessly — complex property tax structuring to day-to-day accounts management.' },
]

const badges = ['GDPR Compliant', 'FCA Registered', 'Making Tax Digital Ready']

export default function HomePage({ onContactOpen }: HomePageProps) {
  const r3 = useReveal(); const rStats = useReveal()
  const r4 = useReveal(); const r5 = useReveal(); const r6 = useReveal()

  const scrollToWhyUs = () => {
    r3.ref.current?.scrollIntoView({ behavior: 'smooth' })
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
        <div style={{
          position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(200px, 30vw, 400px)', fontFamily: 'Playfair Display, serif',
          fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none',
          letterSpacing: -10,
        }}>1313</div>
        <div style={{
          position: 'absolute', bottom: -100, left: '60%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
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
              London, United Kingdom
            </span>
          </div>

          <h1 className="animate-fade-up anim-delay-2" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(42px, 7vw, 84px)',
            fontWeight: 600, color: 'white', lineHeight: 1.1,
            marginBottom: 28, maxWidth: 700,
          }}>
            Precision<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Accounting</span><br />
            Consultancy
          </h1>

          <p className="animate-fade-up anim-delay-3" style={{
            color: 'rgba(255,255,255,0.65)', fontSize: 17, lineHeight: 1.8,
            maxWidth: 540, marginBottom: 44,
          }}>
            Expert financial guidance for ambitious businesses and individuals across the United Kingdom. Where strategic insight meets meticulous execution.
          </p>

          <div className="animate-fade-up anim-delay-4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={onContactOpen} className="btn-primary">Book Free Consultation</button>
            <button 
              onClick={scrollToWhyUs}
              style={{
                padding: '14px 32px', border: '1.5px solid rgba(255,255,255,0.25)',
                background: 'none', color: 'white', fontSize: 11,
                letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
            >Learn More</button>
          </div>

          <div className="animate-fade-up anim-delay-5" style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', gap: 28 }}>
            {badges.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.45)', fontSize: 11, letterSpacing: '0.1em' }}>
                <span style={{ color: 'var(--gold)', fontSize: 10 }}>✓</span>{b}
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section ref={r3.ref} style={{
        padding: '80px 32px', background: 'white',
        opacity: r3.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: r3.visible ? 'translateY(0)' : 'translateY(24px)',
      }}>
        <div id="why-us" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Why Choose Us</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 36px)', color: 'var(--navy)', marginBottom: 20 }}>The 1313 Difference</h2>
            <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              We don't just manage your numbers — we partner with you to deliver financial strategy that drives real outcomes. Every client receives a dedicated senior consultant.
            </p>
            {[
              ['Dedicated Senior Consultants', 'Your account is managed by qualified professionals, not delegated to juniors.'],
              ['Proactive Tax Planning', 'We identify savings opportunities before deadlines — not after them.'],
              ['Fixed Monthly Fees', 'No surprise invoices. Transparent pricing that scales with your business.'],
              ['Regulated & Insured', 'Fully regulated and insured, operating to the highest professional standards.'],
              ['24-Hour Response Guarantee', 'Every client query answered within one business day, without exception.'],
            ].map(([title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 28, height: 28, minWidth: 28, background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginTop: 2,
                }}>✓</div>
                <div>
                  <div style={{ fontWeight: 500, color: 'var(--navy)', fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: 'var(--text-mid)', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
            <button onClick={onContactOpen} className="btn-primary" style={{ marginTop: 12 }}>Book a Consultation</button>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--sapphire))', padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontSize: 44, fontWeight: 600 }}>15+</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Years of Excellence</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['£80k+', 'Tax Saved'],
                  ['1,200+', 'Businesses'],
                  ['4.9/5', 'Rating'],
                  ['100%', 'Compliance'],
                ].map(([val, desc]) => (
                  <div key={val} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.1)', padding: '16px 12px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold-light)', fontSize: 20 }}>{val}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, letterSpacing: '0.1em', marginTop: 4, textTransform: 'uppercase' }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'absolute', inset: -10, border: '1px solid rgba(201,168,76,0.1)', zIndex: -1 }} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div ref={rStats.ref} style={{
        padding: '48px 32px', background: 'white',
        borderBottom: '1px solid var(--cream-mid)',
        opacity: rStats.visible ? 1 : 0, transform: rStats.visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.6s ease',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: '16px', borderRight: '1px solid var(--cream-mid)' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: 'var(--sapphire)', fontWeight: 600, lineHeight: 1.1 }}>{value}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section ref={r4.ref} style={{
        padding: '80px 32px', background: 'var(--cream)',
        opacity: r4.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: r4.visible ? 'translateY(0)' : 'translateY(24px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Testimonials</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--navy)' }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonials-grid">
            {testimonials.map(({ name, role, quote }) => (
              <div key={name} className="glass-card" style={{ padding: 32, position: 'relative' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, color: 'var(--gold)', opacity: 0.2, lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>{quote}</p>
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 16 }}>
                  <div style={{ fontWeight: 500, color: 'var(--navy)', fontSize: 14 }}>{name}</div>
                  <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.05em', marginTop: 4 }}>{role}</div>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 991px) {
              .testimonials-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section ref={r5.ref} style={{
        padding: '64px 32px', background: 'white', borderTop: '1px solid var(--cream-mid)',
        opacity: r5.visible ? 1 : 0, transition: 'all 0.8s ease',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 32 }}>Regulated & Accredited</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="accred-grid">
            {[
              { name: 'Tax Office', desc: 'Agent Registered', icon: '🏛' },
              { name: 'ICO', desc: 'Data Protection', icon: '🛡' },
              { name: 'FCA', desc: 'Financial Conduct', icon: '✅' },
              { name: 'AAT', desc: 'Accounting Technicians', icon: '🎓' },
            ].map(({ name, desc, icon }) => (
              <div key={name} style={{ 
                textAlign: 'center', padding: '24px 16px', 
                border: '1px solid var(--cream-mid)',
                background: 'var(--cream)',
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--sapphire)', fontWeight: 600, letterSpacing: '0.05em' }}>{name}</div>
                <div style={{ fontSize: 9, color: 'var(--text-light)', letterSpacing: '0.1em', marginTop: 4, textTransform: 'uppercase' }}>{desc}</div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 768px) {
              .accred-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={r6.ref} style={{
        padding: '80px 32px', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
        position: 'relative', overflow: 'hidden',
        opacity: r6.visible ? 1 : 0, transition: 'all 0.8s ease',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontWeight: 500 }}>Get Started Today</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 5vw, 44px)', color: 'white', marginBottom: 20 }}>
            Ready to Elevate<br />
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Your Finances?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            Book a complimentary consultation with one of our senior consultants. No obligations — just expert insight tailored to your situation.
          </p>
          <button onClick={onContactOpen} className="btn-primary" style={{ fontSize: 11, padding: '14px 40px' }}>
            Book Free Consultation →
          </button>
        </div>
      </section>
    </div>
  )
}
