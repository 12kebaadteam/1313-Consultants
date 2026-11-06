import type { Page, ServiceSlug } from '../App'

interface FooterProps {
  setCurrentPage: (page: Page, service?: ServiceSlug) => void
  services?: ServiceSlug[]
  onSelectService?: (service: ServiceSlug) => void
}

export default function Footer({ setCurrentPage, services = [], onSelectService }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--navy)', color: 'white' }}>
      {/* Gold top accent line */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--sapphire), var(--gold), var(--sapphire))' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 44, marginBottom: 56 }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg, var(--sapphire), var(--gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: 13, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>13</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white', fontWeight: 600, lineHeight: 1.1 }}>
                  1313 Consultants
                </div>
                <div style={{ fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500 }}>
                  Bookkeeping Practice Support
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.8, maxWidth: 320 }}>
              Dedicated back-office bookkeeping, payroll, and ledger management for UK bookkeepers and bookkeeping practices. UK GDPR compliant.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              {['LI', 'TW', 'FB'].map(s => (
                <div
                  key={s}
                  style={{
                    width: 32, height: 32, border: '1px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700, color: 'rgba(201,168,76,0.7)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  aria-label={`1313 Consultants on ${s}`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Practice Services */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontWeight: 600 }}>
              Practice Solutions
            </div>
            {services.slice(0, 5).map(s => (
              <button
                key={s.id}
                onClick={() => onSelectService ? onSelectService(s) : setCurrentPage('service', s)}
                style={{
                  display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 12,
                  textAlign: 'left', transition: 'color 0.2s',
                  letterSpacing: '0.02em', padding: 0,
                }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--gold-light)')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Navigation Links */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontWeight: 600 }}>
              Company
            </div>
            {[
              { label: 'Home', page: 'home' as Page },
              { label: 'All Services', page: 'services' as Page },
              { label: 'About Us', page: 'about' as Page },
            ].map(({ label, page }) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 12,
                  textAlign: 'left', transition: 'color 0.2s',
                  letterSpacing: '0.04em', padding: 0,
                }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--gold-light)')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Legal & Contact */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontWeight: 600 }}>
              Legal & Enquiries
            </div>
            {[
              { label: 'Terms & Conditions', page: 'terms' as Page },
              { label: 'Privacy Policy', page: 'privacy' as Page },
              { label: 'Admin', page: 'admin' as Page },
            ].map(({ label, page }) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                  color: page === 'admin' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
                  fontSize: page === 'admin' ? 11 : 13,
                  marginBottom: 12, textAlign: 'left', transition: 'color 0.2s',
                  letterSpacing: page === 'admin' ? '0.1em' : undefined,
                  padding: 0,
                }}
                onMouseOver={e => (e.currentTarget.style.color = page === 'admin' ? 'rgba(201,168,76,0.6)' : 'var(--gold-light)')}
                onMouseOut={e => (e.currentTarget.style.color = page === 'admin' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)')}
              >
                {label}
              </button>
            ))}

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, fontWeight: 600 }}>
                Enquiries
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.8 }}>
                info@1313consultants.com<br />
                +91 8572038707<br />
                London, United Kingdom
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.05em' }}>
            © {year} 1313 Consultants. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontStyle: 'italic' }}>
            Outsourced Back-Office Support for UK Bookkeepers
          </p>
        </div>
      </div>
    </footer>
  )
}
