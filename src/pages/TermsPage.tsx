export default function TermsPage() {
  const sections = [
    [
      '1. Acceptance of Terms',
      'By accessing this website and utilising the services provided by 1313 Consultants, you accept and agree to be bound by the terms and conditions set forth herein. These terms apply to all practice clients, visitors, and users of our services.',
    ],
    [
      '2. Scope of Services',
      '1313 Consultants provides outsourced back-office bookkeeping and operational consultancy services in the United Kingdom. Our services include bookkeeping and management accounts, payroll processing support, timesheet management, invoice processing, and back-office compliance assistance.',
    ],
    [
      '3. Professional Engagement & Workpapers',
      'Information provided on this website is for general informational purposes only and does not constitute formal tax or legal advice. All outsourced practice support is delivered in accordance with agreed service level agreements (SLAs) and standard operating procedures defined during client onboarding.',
    ],
    [
      '4. Confidentiality & Data Protection',
      'We maintain strict confidentiality in accordance with UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. All financial data, employee payroll details, and practice working papers are processed securely with restricted, authenticated access.',
    ],
    [
      '5. Limitation of Liability',
      '1313 Consultants shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website, subject to statutory obligations that cannot be excluded under English law.',
    ],
    [
      '6. Governing Law & Jurisdiction',
      'These terms and any non-contractual obligations arising out of or in connection with them are governed by and construed in accordance with the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction to settle any dispute.',
    ],
  ]

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--sapphire))', padding: '120px 32px 64px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>
            Legal
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 48px)', color: 'white' }}>
            Terms & Conditions
          </h1>
        </div>
      </div>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '64px 32px' }}>
        <p style={{ color: 'var(--text-light)', fontSize: 13, marginBottom: 40 }}>
          Last updated: November 2026
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {sections.map(([title, content]) => (
            <div key={title} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', paddingBottom: 32 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--navy)', marginBottom: 12 }}>
                {title}
              </h2>
              <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.85 }}>
                {content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
