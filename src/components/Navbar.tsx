import { useState, useEffect } from 'react'
import type { Page, ServiceSlug } from '../App'

interface NavbarProps {
  currentPage: Page
  setCurrentPage: (page: Page, service?: ServiceSlug) => void
  onContactOpen: () => void
  services: ServiceSlug[]
  onSelectService: (service: ServiceSlug) => void
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  onContactOpen,
  services,
  onSelectService,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesDropdown, setServicesDropdown] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About Us', page: 'about' },
  ]

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.35s ease',
        background: scrolled ? 'rgba(250,247,240,0.98)' : 'rgba(250,247,240,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(201,168,76,0.1)',
        padding: scrolled ? '12px 0' : '18px 0',
        boxShadow: scrolled ? '0 4px 24px rgba(10,22,40,0.06)' : 'none',
      }}
      aria-label="Main Navigation"
    >
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button
          onClick={() => setCurrentPage('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          aria-label="1313 Consultants Homepage"
        >
          <img src="/logo.png" alt="1313 Consultants Logo" style={{ height: 44, width: 44, objectFit: 'contain' }} />
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--navy)', fontWeight: 700, lineHeight: 1.1 }}>1313</div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>Consultants</div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div style={{ alignItems: 'center', gap: 32 }} className="hidden md:flex">
          {navLinks.map(({ label, page }) => {
            if (page === 'services') {
              return (
                <div
                  key={page}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <button
                    onClick={() => setCurrentPage('services')}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                      fontWeight: 600,
                      color: currentPage === 'services' || currentPage === 'service' ? 'var(--gold)' : 'var(--navy)',
                      borderBottom: currentPage === 'services' || currentPage === 'service' ? '2px solid var(--gold)' : '2px solid transparent',
                      padding: '8px 0', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}
                    aria-expanded={servicesDropdown}
                  >
                    Services <span style={{ fontSize: 8 }}>▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {servicesDropdown && (
                    <div style={{
                      position: 'absolute', top: '100%', left: -20,
                      width: 280, background: 'white',
                      border: '1px solid rgba(201,168,76,0.2)',
                      boxShadow: '0 12px 36px rgba(10,22,40,0.12)',
                      padding: '12px 0',
                      animation: 'fadeIn 0.2s ease forwards',
                      zIndex: 110,
                    }}>
                      <div style={{ padding: '6px 20px 8px', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', borderBottom: '1px solid var(--cream-mid)', fontWeight: 600 }}>
                        Practice Solutions
                      </div>
                      {services.map(s => (
                        <button
                          key={s.id}
                          onClick={() => {
                            onSelectService(s)
                            setServicesDropdown(false)
                          }}
                          style={{
                            display: 'block', width: '100%', textAlign: 'left',
                            padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--navy)', fontSize: 13, transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--cream)'
                            e.currentTarget.style.color = 'var(--gold)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.color = 'var(--navy)'
                          }}
                        >
                          <span style={{ marginRight: 8 }}>{s.icon}</span>
                          {s.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontWeight: 600,
                  color: currentPage === page ? 'var(--gold)' : 'var(--navy)',
                  borderBottom: currentPage === page ? '2px solid var(--gold)' : '2px solid transparent',
                  padding: '8px 0', transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            )
          })}

          <button
            onClick={onContactOpen}
            className="btn-primary"
            style={{ padding: '10px 24px', minHeight: 40 }}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile toggle button */}
        <button
          className="flex md:hidden items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            width: 44, height: 44,
          }}
        >
          <div style={{ width: 24, height: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span
              style={{
                display: 'block', width: 24, height: 2, borderRadius: 1,
                background: '#0a1628',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block', width: 24, height: 2, borderRadius: 1,
                background: '#0a1628',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block', width: 24, height: 2, borderRadius: 1,
                background: '#0a1628',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--cream)',
          borderTop: '1px solid rgba(201,168,76,0.2)',
          padding: '20px 24px 28px',
          boxShadow: '0 8px 32px rgba(10,22,40,0.1)',
          animation: 'fadeUp 0.25s ease forwards',
        }}>
          <button
            onClick={() => { setCurrentPage('home'); setMenuOpen(false) }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: currentPage === 'home' ? 'var(--gold)' : 'var(--navy)',
              padding: '12px 0', fontWeight: 600, minHeight: 44,
              borderBottom: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            Home
          </button>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
              <button
                onClick={() => { setCurrentPage('services'); setMenuOpen(false) }}
                style={{
                  textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: currentPage === 'services' || currentPage === 'service' ? 'var(--gold)' : 'var(--navy)',
                  padding: '12px 0', fontWeight: 600, minHeight: 44, flex: 1,
                }}
              >
                Services
              </button>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 14px', fontSize: 12, color: 'var(--gold)',
                }}
                aria-label="Toggle services list"
              >
                {mobileServicesOpen ? '▲' : '▼'}
              </button>
            </div>

            {mobileServicesOpen && (
              <div style={{ paddingLeft: 12, background: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                {services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectService(s)
                      setMenuOpen(false)
                    }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 12, color: 'var(--navy)', padding: '10px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.06)',
                    }}
                  >
                    <span style={{ marginRight: 6 }}>{s.icon}</span> {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => { setCurrentPage('about'); setMenuOpen(false) }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: currentPage === 'about' ? 'var(--gold)' : 'var(--navy)',
              padding: '12px 0', fontWeight: 600, minHeight: 44,
              borderBottom: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            About Us
          </button>

          <button
            onClick={() => { onContactOpen(); setMenuOpen(false) }}
            className="btn-primary"
            style={{ marginTop: 20, width: '100%', minHeight: 44 }}
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  )
}
