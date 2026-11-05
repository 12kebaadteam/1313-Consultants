export default function PrivacyPage() {
  const sections = [
    [
      '1. Data Controller',
      '1313 Consultants is the data controller responsible for personal data processed under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.',
    ],
    [
      '2. Information We Collect',
      'We collect information provided directly by clients and practice partners, including: full name, corporate email address, contact telephone numbers, practice/company details, and necessary accounting and payroll data shared securely for service delivery.',
    ],
    [
      '3. How We Use Information',
      'Personal and financial data is strictly used to: execute outsourced bookkeeping and back-office support, process approved payroll schedules, respond to client inquiries, fulfill statutory reporting requirements, and maintain secure portal access.',
    ],
    [
      '4. Data Retention & Security',
      'We retain financial records and working papers only for as long as required by UK statutory and regulatory obligations. All data is protected with enterprise-grade encryption, authenticated access controls, and strict internal quality handling.',
    ],
    [
      '5. Your Rights Under UK GDPR',
      'Under UK data protection law, you possess rights to: request access to personal data, rectify inaccuracies, request deletion where legally permissible, restrict processing, and exercise data portability. Contact our Data Protection Officer for any requests.',
    ],
    [
      '6. Cookies & Tracking',
      'Our website uses essential functional cookies necessary for page security, session management, and routing. Minimal anonymised performance indicators may be analysed to optimise user experience.',
    ],
    [
      '7. Privacy Enquiries',
      'For any questions regarding this Privacy Policy or our security protocols, please contact info@1313consultants.com.',
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
            Privacy Policy
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
