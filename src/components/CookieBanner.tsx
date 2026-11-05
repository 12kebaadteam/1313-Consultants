interface CookieBannerProps {
  onAccept: () => void
  onDecline: () => void
}

export default function CookieBanner({ onAccept, onDecline }: CookieBannerProps) {
  return (
    <aside
      aria-label="Cookie consent banner"
      style={{
        position: 'fixed', bottom: 24, right: 24, left: 24,
        maxWidth: 420, marginLeft: 'auto',
        zIndex: 150,
        animation: 'fadeUp 0.4s ease forwards',
      }}
    >
      <div style={{
        background: 'var(--navy)',
        border: '1px solid rgba(201,168,76,0.3)',
        boxShadow: '0 16px 60px rgba(10,22,40,0.35)',
        padding: 24,
      }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', margin: '-24px -24px 20px -24px' }} />
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
          <span style={{ fontSize: 24 }} aria-hidden="true">🍪</span>
          <div>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
              Privacy & Cookie Notice
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 1.6 }}>
              We use essential cookies to ensure our website functions securely and reliably. Non-essential tracking is disabled by default under UK GDPR.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onAccept}
            className="btn-primary"
            style={{ flex: 1, padding: '10px 16px', minHeight: 40, fontSize: 10 }}
          >
            Accept Essential
          </button>
          <button
            onClick={onDecline}
            style={{
              flex: 1, padding: '10px 16px',
              border: '1.5px solid rgba(255,255,255,0.2)',
              background: 'none', color: 'rgba(255,255,255,0.7)',
              fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s', minHeight: 40,
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </aside>
  )
}
