import { useState, useEffect } from 'react'
import type { Page } from '../App'

interface NavbarProps {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  onContactOpen: () => void
}

export default function Navbar({ currentPage, setCurrentPage, onContactOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(250,247,240,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
      padding: scrolled ? '12px 0' : '20px 0',
      boxShadow: scrolled ? '0 4px 30px rgba(10,22,40,0.08)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button onClick={() => setCurrentPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{
            width: 44, height: 44,
            background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <span style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 700, letterSpacing: 1, fontFamily: 'Playfair Display, serif' }}>13</span>
            <div style={{
              position: 'absolute', inset: 0, border: '1px solid rgba(201,168,76,0.4)',
              transform: 'scale(0.85)',
            }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'var(--navy)', fontWeight: 600, lineHeight: 1.1 }}>1313</div>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500 }}>Consultants</div>
          </div>
        </button>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {navLinks.map(({ label, page }) => (
            <button key={page} onClick={() => setCurrentPage(page)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              fontWeight: 500,
              color: currentPage === page ? 'var(--gold)' : 'var(--navy)',
              borderBottom: currentPage === page ? '1.5px solid var(--gold)' : '1.5px solid transparent',
              paddingBottom: 2, transition: 'all 0.25s ease',
            }}>{label}</button>
          ))}
          <button onClick={onContactOpen} className="btn-primary" style={{ padding: '10px 24px' }}>
            Contact Us
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="show-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 8,
          display: 'none',
        }}>
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', height: 1.5,
                background: 'var(--navy)',
                transition: 'all 0.3s',
                transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px,4px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'var(--cream)', borderTop: '1px solid rgba(201,168,76,0.2)', padding: '16px 32px 24px' }}>
          {navLinks.map(({ label, page }) => (
            <button key={page} onClick={() => { setCurrentPage(page); setMenuOpen(false) }} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--navy)', padding: '10px 0', fontWeight: 500,
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}>{label}</button>
          ))}
          <button onClick={() => { onContactOpen(); setMenuOpen(false) }} className="btn-primary" style={{ marginTop: 16, width: '100%' }}>
            Contact Us
          </button>
        </div>
      )}
    </nav>
  )
}
