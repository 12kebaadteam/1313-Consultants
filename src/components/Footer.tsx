import type { Page } from '../App'

interface FooterProps {
  setCurrentPage: (page: Page) => void
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--navy)', color: 'white' }}>
      {/* Gold top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--sapphire), var(--gold), var(--sapphire))' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg, var(--sapphire), var(--gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: 13, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>13</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white', fontWeight: 600, lineHeight: 1.1 }}>1313 Consultants</div>
                <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500 }}>Accounting Consultancy</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.8, maxWidth: 300 }}>
              Premium accounting consultancy for businesses and individuals across the United Kingdom. GDPR compliant.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              {['LI', 'TW', 'FB'].map(s => (
                <div key={s} style={{
                  width: 32, height: 32, border: '1px solid rgba(201,168,76,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, color: 'rgba(201,168,76,0.6)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontWeight: 500 }}>Pages</div>
            {[
              { label: 'Home', page: 'home' as Page },
              { label: 'About Us', page: 'about' as Page },
            ].map(({ label, page }) => (
              <button key={page} onClick={() => setCurrentPage(page)} style={{
                display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 12,
                textAlign: 'left', transition: 'color 0.2s',
                letterSpacing: '0.04em',
              }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{label}</button>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontWeight: 500 }}>Legal</div>
            {[
              { label: 'Terms & Conditions', page: 'terms' as Page },
              { label: 'Privacy Policy', page: 'privacy' as Page },
              { label: 'Admin', page: 'admin' as Page },
            ].map(({ label, page }) => (
              <button key={page} onClick={() => setCurrentPage(page)} style={{
                display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                color: page === 'admin' ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.5)',
                fontSize: page === 'admin' ? 11 : 13,
                marginBottom: 12, textAlign: 'left', transition: 'color 0.2s',
                letterSpacing: page === 'admin' ? '0.1em' : undefined,
              }}
              onMouseOver={e => (e.currentTarget.style.color = page === 'admin' ? 'rgba(201,168,76,0.6)' : 'var(--gold-light)')}
              onMouseOut={e => (e.currentTarget.style.color = page === 'admin' ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.5)')}
              >{label}</button>
            ))}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Contact</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 2 }}>
                info@1313consultants.com<br />
                +91 8572038707<br />
                London, United Kingdom
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.05em' }}>
            © {year} 1313 Consultants Ltd. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontStyle: 'italic' }}>
            Designed and developed by <span style={{ color: 'var(--gold)', opacity: 0.8 }}>MyPaperTrail</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
