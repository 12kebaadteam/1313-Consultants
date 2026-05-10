export default function TermsPage() {
  const sections = [
    ['1. Acceptance of Terms', 'By accessing and using the services provided by 1313 Consultants, you accept and agree to be bound by the terms and conditions set forth herein. These terms apply to all visitors, users, and clients of our services.'],
    ['2. Services', '1313 Consultants provides professional accounting consultancy services in the United Kingdom. Our services include tax advisory, financial planning, business consultancy, bookkeeping, payroll services, and compliance support.'],
    ['3. Professional Advice', 'Information provided on this website is for general guidance only and does not constitute professional financial or legal advice. Always consult with a qualified professional before making financial decisions.'],
    ['4. Confidentiality', 'We maintain strict confidentiality in accordance with ICAEW standards and GDPR regulations. All client information is handled with the utmost discretion and security.'],
    ['5. Limitation of Liability', '1313 Consultants shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.'],
    ['6. Governing Law', 'These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.'],
  ]
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--sapphire))', padding: '120px 32px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Legal</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, color: 'white' }}>Terms & Conditions</h1>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px 32px' }}>
        <p style={{ color: 'var(--text-light)', fontSize: 13, marginBottom: 40 }}>Last updated: January 2025</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {sections.map(([title, content]) => (
            <div key={title} style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: 32 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--navy)', marginBottom: 12 }}>{title}</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.8 }}>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
