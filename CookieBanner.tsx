export default function CookieBanner({ onAccept }: { onAccept: () => void }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, left: 24,
      maxWidth: 400, marginLeft: 'auto',
      zIndex: 150,
      animation: 'fadeUp 0.5s ease forwards',
    }}>
      <div style={{
        background: 'var(--navy)', border: '1px solid rgba(201,168,76,0.25)',
        boxShadow: '0 16px 60px rgba(10,22,40,0.3)',
        padding: 24,
      }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: 20, marginTop: -24, marginLeft: -24, marginRight: -24, marginBottom: 20 }} />
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
          <span style={{ fontSize: 22 }}>🍪</span>
          <div>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Cookie Notice</div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>We use essential cookies to ensure our website functions correctly and to improve your experience.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onAccept} className="btn-primary" style={{ flex: 1, padding: '10px' }}>Accept All</button>
          <button onClick={onAccept} style={{
            flex: 1, padding: '10px', border: '1.5px solid rgba(255,255,255,0.15)',
            background: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.2s',
          }}>Decline</button>
        </div>
      </div>
    </div>
  )
}
