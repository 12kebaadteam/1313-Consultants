import { useEffect, useRef, useState } from 'react'
import type { ServiceSlug } from '../App'

interface ServiceDetailProps {
  service: ServiceSlug
  onContactOpen: () => void
  onBack: () => void
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

export default function ServiceDetailPage({ service, onContactOpen, onBack }: ServiceDetailProps) {
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal()

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '60vh', display: 'flex', alignItems: 'flex-end',
        background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}ee 60%, ${service.color}99 100%)`,
        position: 'relative', overflow: 'hidden', padding: '120px 32px 64px',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', fontSize: 'clamp(120px, 18vw, 220px)', opacity: 0.06, fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'white', userSelect: 'none', lineHeight: 1 }}>{service.icon}</div>

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.55)', fontSize: 12, letterSpacing: '0.1em',
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32,
            fontFamily: 'DM Sans, sans-serif',
          }}>
            ← Back to Services
          </button>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', marginBottom: 20,
            border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.1)',
          }}>
            <span style={{ color: 'var(--gold-light)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>Our Services</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 600,
            color: 'white', lineHeight: 1.15, marginBottom: 20, maxWidth: 700,
          }}>{service.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.7, maxWidth: 560 }}>{service.heroDesc}</p>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0,50 C360,0 1080,0 1440,50 L1440,50 L0,50 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* Overview + Benefits */}
      <section ref={r1.ref} style={{
        padding: '80px 32px', background: 'var(--cream)',
        opacity: r1.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: r1.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Overview</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: 'var(--navy)', marginBottom: 20 }}>{service.tagline}</h2>
            <p style={{ color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>{service.overview}</p>
            <button onClick={onContactOpen} className="btn-primary">Enquire About This Service →</button>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontWeight: 500 }}>What's Included</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {service.benefits.map((b, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 18px', background: 'white',
                  border: '1px solid rgba(201,168,76,0.12)',
                  transition: 'all 0.2s',
                }}>
                  <div style={{
                    width: 24, height: 24, minWidth: 24,
                    background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 600, color: 'var(--navy)',
                  }}>✓</div>
                  <span style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={r2.ref} style={{
        padding: '80px 32px', background: 'white',
        opacity: r2.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: r2.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>How We Work</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--navy)' }}>Our Process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {service.process.map((p, i) => (
              <div key={i} style={{
                padding: '40px 28px', background: 'var(--cream)',
                borderTop: `3px solid ${i === 0 ? 'var(--gold)' : 'transparent'}`,
                transition: 'border-top-color 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.borderTopColor = 'var(--gold)'}
              onMouseOut={e => e.currentTarget.style.borderTopColor = i === 0 ? 'var(--gold)' : 'transparent'}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, color: 'rgba(201,168,76,0.25)', fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>{p.step}</div>
                <div style={{ fontWeight: 500, color: 'var(--navy)', fontSize: 16, marginBottom: 10 }}>{p.title}</div>
                <p style={{ color: 'var(--text-mid)', fontSize: 13, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section ref={r3.ref} style={{
        padding: '80px 32px', background: 'var(--cream)',
        opacity: r3.visible ? 1 : 0, transition: 'all 0.8s ease',
        transform: r3.visible ? 'translateY(0)' : 'translateY(32px)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>FAQ</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--navy)' }}>Common Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {service.faqs.map(({ q, a }, i) => (
              <FAQItem key={i} q={q} a={a} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <p style={{ color: 'var(--text-mid)', fontSize: 14, marginBottom: 20 }}>Have more questions? We're happy to help.</p>
            <button onClick={onContactOpen} className="btn-primary">Speak with a Consultant →</button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
        textAlign: 'left', gap: 16,
      }}>
        <span style={{ fontWeight: 500, color: 'var(--navy)', fontSize: 15, lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 28, height: 28, minWidth: 28,
          border: '1.5px solid var(--gold)', color: 'var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0, overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.75, paddingTop: 16 }}>{a}</p>
        </div>
      </div>
    </div>
  )
}
