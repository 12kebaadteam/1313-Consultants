import { useState, useEffect, useCallback } from 'react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import CookieBanner from './components/CookieBanner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

export type Page = 'home' | 'about' | 'admin' | 'terms' | 'privacy' | 'services' | 'service'

export interface ServiceSlug {
  id: string
  title: string
  tagline: string
  icon: string
  color: string
  heroDesc: string
  overview: string
  benefits: string[]
  process: { step: string; title: string; desc: string }[]
  faqs: { q: string; a: string }[]
}

export const SERVICES: ServiceSlug[] = [
  {
    id: 'bookkeeping',
    title: 'Bookkeeping & Accounts',
    tagline: 'Accurate, real-time back-office ledger support for UK bookkeepers and practices',
    icon: '📒',
    color: '#2d6a4f',
    heroDesc: 'End-to-end outsourced bookkeeping, bank reconciliations, and management accounts for UK bookkeeping practices and growing businesses.',
    overview: 'Clean, reliable books are the backbone of any trusted practice. Our dedicated back-office bookkeeping team manages transaction coding, reconciliations, and trial balance preparation in real time, giving your practice reliable capacity without the overhead of in-house recruitment.',
    benefits: [
      'Monthly and quarterly management accounts preparation',
      'Bank, credit card, and multi-currency reconciliations',
      'Cloud bookkeeping via Xero, QuickBooks, Sage, and FreeAgent',
      'Trial balance review and year-end ledger clean-up',
      'Aged debtor and creditor reporting with variance analysis',
      'Seamless white-label workflow integration for UK practices',
    ],
    process: [
      { step: '01', title: 'Practice Onboarding', desc: 'We align on your chart of accounts, standard operating procedures, and delivery timetable.' },
      { step: '02', title: 'Secure Integration', desc: 'Direct, secure access setup in Xero, QuickBooks, Sage, or your preferred cloud software.' },
      { step: '03', title: 'Routine Processing', desc: 'Daily or weekly bank reconciliations, document matching, and transaction categorisation.' },
      { step: '04', title: 'Quality-Reviewed Delivery', desc: 'Two-tier reviewed management accounts and reports delivered directly to your inbox.' },
    ],
    faqs: [
      { q: 'Which bookkeeping software platforms do you support?', a: 'We work across Xero, QuickBooks Online, Sage Business Cloud, and FreeAgent. We plug directly into your practice’s existing accounting stack.' },
      { q: 'How does your white-label outsourced support work?', a: 'We work seamlessly in the background as your back-office team. All reports and working papers reflect your practice standards, leaving client relationships entirely under your control.' },
      { q: 'What quality control processes do you follow?', a: 'Every ledger and set of management accounts undergoes a structured two-tier review by senior quality reviewers before work is released to your team.' },
      { q: 'Can you handle backlog or catch-up bookkeeping?', a: 'Yes. We routinely assist UK bookkeepers with historical ledger clean-ups, missing document reconciliations, and year-end preparation.' },
    ],
  },
  {
    id: 'payroll-management',
    title: 'Payroll Services',
    tagline: 'Compliant, on-time payroll processing for your clients — every cycle',
    icon: '💳',
    color: '#7b3f00',
    heroDesc: 'Full-service outsourced payroll processing for UK bookkeepers and businesses, handling everything from calculations to Tax office submissions.',
    overview: 'Payroll compliance requires meticulous precision and strict deadline adherence. Our outsourced payroll specialists handle weekly, fortnightly, and monthly payrolls, RTI submissions, auto-enrolment pensions, and leaver/starter processing seamlessly.',
    benefits: [
      'Weekly, fortnightly, and monthly payroll execution',
      'Full Real Time Information (RTI) submissions to Tax office',
      'Workplace pension auto-enrolment and contribution files',
      'P45, P60, and statutory pay (SSP, SMP, SPP) calculations',
      'Comprehensive gross-to-net reports and digital payslip distribution',
      'Customised practice white-label reporting packs',
    ],
    process: [
      { step: '01', title: 'Payroll Setup', desc: 'We configure pay elements, pension schemes, and migrate employee records accurately.' },
      { step: '02', title: 'Variable Data Input', desc: 'Hours, overtime, bonuses, and statutory payments are audited and inputted.' },
      { step: '03', title: 'Calculation & Check', desc: 'Pre-run draft summary generated and cross-checked against variance tolerances.' },
      { step: '04', title: 'RTI Filing & Distribution', desc: 'Timely submission of FPS/EPS to Tax office and distribution of approved payslips.' },
    ],
    faqs: [
      { q: 'How do you handle starters, leavers, and tax code notices?', a: 'We process all starter declarations, leaver forms (P45s), and update student loans and tax code changes promptly from Tax office notifications.' },
      { q: 'Do you handle Construction Industry Scheme (CIS) deductions?', a: 'Yes, we manage CIS subcontractor verifications, deduction calculations, and monthly return preparations.' },
      { q: 'What turnaround time can our bookkeeping practice expect?', a: 'Standard payroll runs are delivered within 24 to 48 hours of receiving variable data, well ahead of payday.' },
    ],
  },
  {
    id: 'timesheets',
    title: 'Timesheet Management',
    tagline: 'Precise contractor tracking and billable hour verification',
    icon: '⏱',
    color: '#1a3a6b',
    heroDesc: 'Detailed timesheet processing, attendance auditing, and billable hour verification that feeds cleanly into your client billing and payroll.',
    overview: 'Manual timesheet collation and verification can consume dozens of practice hours each week. Our back-office team standardises, audits, and processes contractor and employee timesheets, eliminating billing discrepancies and ensuring accurate client invoicing.',
    benefits: [
      'Multi-source timesheet collation (spreadsheets, software exports, portals)',
      'Discrepancy reconciliation against approved project rates and budgets',
      'Overtime, break, and holiday calculation verification',
      'Direct synchronization with payroll and sales billing schedules',
      'Audit trails and manager sign-off tracking',
      'Time utilisation and variance reporting for practices',
    ],
    process: [
      { step: '01', title: 'Timesheet Ingestion', desc: 'Collection and aggregation of raw timesheet records from digital tools or client files.' },
      { step: '02', title: 'Scope & Rate Audit', desc: 'Verification of billable hours against engagement terms, pay scales, and authorisations.' },
      { step: '03', title: 'Discrepancy Resolution', desc: 'Proactive flagging and resolution of unapproved hours or variance errors.' },
      { step: '04', title: 'Export & Sync', desc: 'Formatted feeds delivered directly into payroll runs and sales invoice batches.' },
    ],
    faqs: [
      { q: 'Can you work with client-specific timesheet tools?', a: 'Yes, we work with spreadsheets, CSV exports, Clockify, Harvest, Deputy, Toggl, and practice management portals.' },
      { q: 'How do you handle unapproved or missing timesheets?', a: 'We maintain proactive chasing logs and provide timely alerts before payroll deadlines so no hours are left unaccounted.' },
      { q: 'Does this service integrate directly with invoicing?', a: 'Yes, approved timesheet batches feed directly into our invoice processing workflow for rapid billing.' },
    ],
  },
  {
    id: 'invoicing',
    title: 'Invoice Processing & Billing',
    tagline: 'Fast, accurate sales and purchase ledger processing',
    icon: '📄',
    color: '#4a1278',
    heroDesc: 'Outsourced invoice capture, 3-way matching, sales invoicing, and aged debtor tracking to keep cash flow healthy.',
    overview: 'Efficient invoice processing is crucial for working capital. We take over repetitive accounts payable and receivable operations—extracting line items, matching purchase orders, preparing sales invoices, and monitoring aged ledgers.',
    benefits: [
      'Prompt sales invoice generation, batching, and dispatch',
      'Purchase invoice capture, optical recognition, and account coding',
      'Supplier statement reconciliations and discrepancy checks',
      'Aged debtor and creditor tracking reports',
      'Credit control support and payment reconciliation assistance',
      'Full integration with Xero, Dext, AutoEntry, and QuickBooks',
    ],
    process: [
      { step: '01', title: 'Document Ingestion', desc: 'Invoices captured via receipt apps, dedicated inboxes, or portal uploads.' },
      { step: '02', title: 'Coding & Matching', desc: 'Line-by-line coding to the correct nominal codes with 3-way PO matching.' },
      { step: '03', title: 'Approval Verification', desc: 'Cross-checking against client authorisation thresholds and payment terms.' },
      { step: '04', title: 'Ledger Post & Reporting', desc: 'Final posting into accounting software and aged ledger updating.' },
    ],
    faqs: [
      { q: 'Which document capture tools do you work with?', a: 'We regularly work with Dext Prepare, AutoEntry, Hubdoc, and native Xero/QuickBooks document capture features.' },
      { q: 'How quickly are purchase invoices processed?', a: 'Standard turnaround is within 24 business hours from receipt of the source documents.' },
      { q: 'Can you assist with credit control summaries?', a: 'Yes, we provide aged debtor summaries and draft structured reminder schedules on behalf of your practice.' },
    ],
  },
  {
    id: 'tax-office-compliance',
    title: 'Tax Office Compliance Support',
    tagline: 'Accurate return preparation and Making Tax Digital support for practices',
    icon: '🏛',
    color: '#1a4a4a',
    heroDesc: 'Back-office compliance assistance for UK bookkeepers, ensuring VAT returns and filings are prepared accurately and on time.',
    overview: 'Staying on top of Tax office requirements requires rigorous detail. We support UK bookkeeping practices by preparing quarterly VAT returns, MTD filings, and year-end schedules, allowing you to focus on client advisory and growth.',
    benefits: [
      'VAT return preparation under Standard, Flat Rate, and Cash schemes',
      'Making Tax Digital (MTD) digital links compliance check',
      'Partial exemption calculations and adjustments',
      'Year-end trial balance preparation and review',
      'Audit-ready workpapers and reconciliation schedules',
      'Proactive filing deadline monitoring',
    ],
    process: [
      { step: '01', title: 'Pre-Submission Audit', desc: 'Comprehensive review of input/output tax, nominal coding, and transaction evidence.' },
      { step: '02', title: 'VAT Reconciliation', desc: 'Control account reconciliation and verification of digital links compliance.' },
      { step: '03', title: 'Draft Pack Delivery', desc: 'Complete working paper pack provided to your practice for review and client sign-off.' },
      { step: '04', title: 'Filing Archiving', desc: 'Timely filing documentation archived with clear audit trail notes.' },
    ],
    faqs: [
      { q: 'Does 1313 Consultants file directly or provide packs for our practice?', a: 'We prepare complete, audit-ready workpapers and submission packs for your practice’s final review and sign-off.' },
      { q: 'Do you handle Making Tax Digital compliance?', a: 'Yes, we ensure all bookkeeping data adheres to Making Tax Digital digital links requirements.' },
      { q: 'What if there are past reconciliation discrepancies?', a: 'Our team can conduct a comprehensive ledger health check to identify and resolve historical discrepancies.' },
    ],
  },
  {
    id: 'business-consultancy',
    title: 'Practice Advisory & Consultancy',
    tagline: 'Operational guidance and capacity scaling for UK bookkeepers',
    icon: '📈',
    color: '#0f2044',
    heroDesc: 'Strategic back-office guidance to help UK bookkeeping practices scale profitably without burnout.',
    overview: 'Scaling a bookkeeping practice requires smart processes, reliable capacity, and strategic delegation. We advise UK bookkeepers on workflow optimisation, software stack integration, and scalable back-office team structures.',
    benefits: [
      'Practice capacity analysis and workload balancing',
      'Cloud accounting tech stack recommendations',
      'Standard Operating Procedure (SOP) documentation',
      'White-label back-office team structuring',
      'Gross margin and pricing structure reviews',
      'Growth planning and client onboarding workflows',
    ],
    process: [
      { step: '01', title: 'Practice Diagnostic', desc: 'Deep dive into your current workflows, client turnaround times, and software stack.' },
      { step: '02', title: 'Bottleneck Analysis', desc: 'Identification of manual bottlenecks and repetitive admin that can be delegated.' },
      { step: '03', title: 'SOP & Capacity Plan', desc: 'Documented standard operating procedures and a dedicated back-office capacity model.' },
      { step: '04', title: 'Ongoing Review', desc: 'Quarterly reviews to adapt capacity as your practice signs new clients.' },
    ],
    faqs: [
      { q: 'Who is this advisory service designed for?', a: 'Solo bookkeepers looking to take on larger clients, as well as established bookkeeping firms seeking scalable outsourced capacity.' },
      { q: 'How is this different from day-to-day bookkeeping?', a: 'Day-to-day bookkeeping handles ledger execution; our practice advisory helps you structure your practice operations for higher profitability and scale.' },
      { q: 'Can you help us streamline our onboarding process?', a: 'Yes, we provide proven onboarding checklists and standardized client handover procedures.' },
    ],
  },
]

// SEO metadata helper per route
const META_DATA: Record<string, { title: string; desc: string }> = {
  home: {
    title: '1313 Consultants | Outsourced Bookkeeping Services UK & Practice Support',
    desc: 'Premier outsourced back-office bookkeeping support for UK bookkeepers and bookkeeping practices. Dedicated ledger management, payroll, timesheets, and VAT compliance.',
  },
  about: {
    title: 'About 1313 Consultants | UK Bookkeeping Practice Support Specialists',
    desc: 'Learn about 1313 Consultants. We provide dedicated outsourced back-office bookkeeping and payroll support to UK bookkeeping practices and growing firms.',
  },
  services: {
    title: 'Outsourced Bookkeeping & Back-Office Services UK | 1313 Consultants',
    desc: 'Explore our full suite of outsourced back-office services for UK bookkeepers: bookkeeping, payroll management, timesheets, invoice processing, and compliance.',
  },
  bookkeeping: {
    title: 'Outsourced Bookkeeping Services UK | 1313 Consultants',
    desc: 'Expert outsourced bookkeeping and management accounts for UK bookkeepers and growing businesses. Real-time reconciliation in Xero, QuickBooks, and Sage.',
  },
  'payroll-management': {
    title: 'Payroll Outsourcing Services UK | 1313 Consultants',
    desc: 'Reliable, compliant outsourced payroll processing for UK bookkeepers. RTI submissions, auto-enrolment pensions, and year-end reporting handled on time.',
  },
  timesheets: {
    title: 'Timesheet Management Services UK | 1313 Consultants',
    desc: 'Accurate timesheet collation, contractor hour auditing, and billable hour verification services for UK bookkeeping practices.',
  },
  invoicing: {
    title: 'Invoice Processing & Billing Services UK | 1313 Consultants',
    desc: 'Outsourced sales invoicing, purchase ledger matching, and aged debtor tracking for UK businesses and bookkeeping practices.',
  },
  'tax-office-compliance': {
    title: 'Tax Office Compliance Support for Bookkeepers | 1313 Consultants',
    desc: 'Back-office VAT return preparation, MTD compliance checks, and audit-ready workpapers for UK bookkeeping practices.',
  },
  'business-consultancy': {
    title: 'Bookkeeping Practice Advisory & Consultancy | 1313 Consultants',
    desc: 'Strategic back-office guidance, capacity planning, and workflow optimisation to help UK bookkeepers scale their practices profitably.',
  },
  terms: {
    title: 'Terms & Conditions | 1313 Consultants',
    desc: 'Read the terms and conditions governing outsourced bookkeeping and back-office consultancy services provided by 1313 Consultants.',
  },
  privacy: {
    title: 'Privacy Policy | 1313 Consultants',
    desc: 'Our commitment to data privacy under UK GDPR. Learn how 1313 Consultants protects client and practice information.',
  },
  admin: {
    title: 'Admin Portal | 1313 Consultants',
    desc: 'Administrative portal for 1313 Consultants management.',
  },
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [activeService, setActiveService] = useState<ServiceSlug | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [cookieAccepted, setCookieAccepted] = useState(false)

  // Update SEO metadata dynamically
  const updateSEO = useCallback((key: string) => {
    const meta = META_DATA[key] || META_DATA.home
    document.title = meta.title

    let descEl = document.querySelector('meta[name="description"]')
    if (!descEl) {
      descEl = document.createElement('meta')
      descEl.setAttribute('name', 'description')
      document.head.appendChild(descEl)
    }
    descEl.setAttribute('content', meta.desc)

    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', meta.title)

    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', meta.desc)
  }, [])

  // Parse path into state
  const parsePath = useCallback((pathname: string) => {
    const clean = pathname.replace(/^\/+|\/+$/g, '')

    if (!clean || clean === 'home') {
      setCurrentPage('home')
      setActiveService(null)
      updateSEO('home')
      return
    }

    if (clean === 'about' || clean === 'admin' || clean === 'terms' || clean === 'privacy') {
      setCurrentPage(clean as Page)
      setActiveService(null)
      updateSEO(clean)
      return
    }

    if (clean === 'services') {
      setCurrentPage('services')
      setActiveService(null)
      updateSEO('services')
      return
    }

    if (clean.startsWith('services/') || clean.startsWith('service/')) {
      const slug = clean.split('/')[1]
      // Support payroll alias
      const normalizedSlug = slug === 'payroll' ? 'payroll-management' : slug
      const found = SERVICES.find(s => s.id === normalizedSlug)
      if (found) {
        setActiveService(found)
        setCurrentPage('service')
        updateSEO(found.id)
        return
      }
    }

    // Default fallback
    setCurrentPage('home')
    setActiveService(null)
    updateSEO('home')
  }, [updateSEO])

  // Initial load and popstate listener
  useEffect(() => {
    const stored = localStorage.getItem('1313_cookie_consent')
    if (stored === 'accepted') setCookieAccepted(true)

    parsePath(window.location.pathname)

    const handlePopState = () => {
      parsePath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [parsePath])

  const navigateTo = (page: Page, service?: ServiceSlug) => {
    let targetPath = '/'
    if (page === 'home') {
      targetPath = '/'
      setActiveService(null)
      setCurrentPage('home')
      updateSEO('home')
    } else if (page === 'service' && service) {
      targetPath = `/services/${service.id}`
      setActiveService(service)
      setCurrentPage('service')
      updateSEO(service.id)
    } else if (page === 'services') {
      targetPath = '/services'
      setActiveService(null)
      setCurrentPage('services')
      updateSEO('services')
    } else {
      targetPath = `/${page}`
      setActiveService(null)
      setCurrentPage(page)
      updateSEO(page)
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCookieAccept = () => {
    localStorage.setItem('1313_cookie_consent', 'accepted')
    setCookieAccepted(true)
  }

  const handleCookieDecline = () => {
    localStorage.setItem('1313_cookie_consent', 'declined')
    setCookieAccepted(true)
  }

  const openService = (service: ServiceSlug) => {
    navigateTo('service', service)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onContactOpen={() => setContactOpen(true)} onSelectService={openService} onNavigateServices={() => navigateTo('services')} />
      case 'about':
        return <AboutPage onContactOpen={() => setContactOpen(true)} />
      case 'services':
        return (
          <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: 80 }}>
            <section style={{
              minHeight: '40vh', display: 'flex', alignItems: 'center',
              background: 'linear-gradient(135deg, var(--navy), var(--sapphire))',
              position: 'relative', overflow: 'hidden', padding: '120px 32px 64px',
            }}>
              <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontWeight: 500 }}>
                  Practice Support
                </div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 56px)', color: 'white', marginBottom: 20 }}>
                  Outsourced Back-Office Services
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 640, lineHeight: 1.8 }}>
                  Comprehensive back-office bookkeeping, payroll, and ledger administration designed specifically to empower UK bookkeepers and bookkeeping firms.
                </p>
              </div>
            </section>
            <div style={{ maxWidth: 1200, margin: '64px auto 0', padding: '0 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {SERVICES.map(s => (
                  <div key={s.id} className="glass-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h2>
                      <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{s.tagline}</p>
                    </div>
                    <button onClick={() => openService(s)} className="btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: 10 }}>
                      View Service Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'service':
        return activeService
          ? <ServiceDetailPage service={activeService} onContactOpen={() => setContactOpen(true)} onBack={() => navigateTo('services')} />
          : <HomePage onContactOpen={() => setContactOpen(true)} onSelectService={openService} onNavigateServices={() => navigateTo('services')} />
      case 'admin':
        return <AdminPage />
      case 'terms':
        return <TermsPage />
      case 'privacy':
        return <PrivacyPage />
      default:
        return <HomePage onContactOpen={() => setContactOpen(true)} onSelectService={openService} onNavigateServices={() => navigateTo('services')} />
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)', color: 'var(--text-dark)' }}>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        onContactOpen={() => setContactOpen(true)}
        services={SERVICES}
        onSelectService={openService}
      />
      <main id="main-content">{renderPage()}</main>
      <Footer setCurrentPage={navigateTo} services={SERVICES} onSelectService={openService} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      {!cookieAccepted && <CookieBanner onAccept={handleCookieAccept} onDecline={handleCookieDecline} />}
    </div>
  )
}
