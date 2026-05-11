export default function PrivacyPage() {
  const sections = [
    ['1. Data Controller', '1313 Consultants is the data controller responsible for your personal data under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.'],
    ['2. Data We Collect', 'We collect information you provide directly, including: name, email address, phone number, company details, and any other information you share through our contact forms or during service delivery.'],
    ['3. How We Use Your Data', 'Your data is used to: provide our accounting services, respond to enquiries, send service updates, comply with legal obligations, and improve our website and services.'],
    ['4. Data Retention', 'We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.'],
    ['5. Your Rights', 'Under UK GDPR, you have the right to: access your personal data, rectify inaccurate data, erase your data, restrict processing, data portability, and object to processing. Contact us to exercise these rights.'],
    ['6. Cookies', 'Our website uses essential cookies to ensure proper functioning. We also use analytics cookies to understand how visitors use our site. You can control cookie preferences through your browser settings.'],
    ['7. Contact Us', 'For any privacy-related queries, please contact our Data Protection Officer at privacy@1313consultants.com.'],
  ]
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--sapphire))', padding: '120px 32px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontWeight: 500 }}>Legal</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, color: 'white' }}>Privacy Policy</h1>
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
