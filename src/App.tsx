import { useState, useEffect } from 'react'
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

export type Page = 'home' | 'about' | 'admin' | 'terms' | 'privacy' | 'service'

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
    id: 'tax-advisory',
    title: 'Tax Advisory',
    tagline: 'Strategic tax planning that keeps more money in your business',
    icon: '⚖',
    color: '#1a3a6b',
    heroDesc: 'Comprehensive tax strategy for individuals, sole traders, partnerships and limited companies across the UK.',
    overview: 'Our tax advisory team delivers proactive, forward-thinking tax planning that minimises liabilities while maintaining full Tax office compliance. We look beyond the current tax year to build strategies that protect and grow your wealth.',
    benefits: [
      'Reduce your tax liability legally and sustainably',
      'Full compliance with all Tax office requirements',
      'Personal tax, corporation tax, capital gains and inheritance tax',
      'Property investor tax structuring',
      'R&D tax credits for innovative businesses',
      'SDLT planning for property transactions',
    ],
    process: [
      { step: '01', title: 'Tax Health Check', desc: 'We review your current structure and identify savings opportunities often missed.' },
      { step: '02', title: 'Strategy Development', desc: 'We build a bespoke tax plan aligned with your financial goals and circumstances.' },
      { step: '03', title: 'Implementation', desc: 'We execute the strategy and handle all Tax office communications on your behalf.' },
      { step: '04', title: 'Ongoing Review', desc: 'Annual reviews ensure your plan adapts to legislative changes and life events.' },
    ],
    faqs: [
      { q: 'How much can I save on tax?', a: 'On average our clients save £15,000–£80,000 annually depending on their circumstances. We always assess your specific situation before making projections.' },
      { q: 'Do you handle Tax office investigations?', a: 'Yes. We provide full representation and support throughout Tax office enquiries and investigations, protecting your interests at every stage.' },
      { q: 'Is your advice Accounting Standards compliant?', a: 'Absolutely. All advice is given by qualified Accounting Standards members and adheres strictly to professional standards and Tax office regulations.' },
    ],
  },
  {
    id: 'bookkeeping',
    title: 'Bookkeeping & Accounts',
    tagline: 'Accurate, real-time financial records you can rely on',
    icon: '📒',
    color: '#2d6a4f',
    heroDesc: 'End-to-end bookkeeping and statutory accounts for businesses of all sizes across the United Kingdom.',
    overview: 'Clean, accurate books are the foundation of every successful business. Our bookkeeping team maintains your financial records in real time, ensuring your accounts are always up to date, compliant, and ready for decision-making.',
    benefits: [
      'Monthly or quarterly management accounts',
      'Statutory annual accounts prepared to FRS standards',
      'Cloud-based bookkeeping via Xero, QuickBooks or Sage',
      'Bank reconciliations and transaction coding',
      'Aged debtor and creditor reporting',
      'Companies House filing and compliance',
    ],
    process: [
      { step: '01', title: 'Systems Setup', desc: 'We configure your bookkeeping software and establish clean chart of accounts.' },
      { step: '02', title: 'Ongoing Bookkeeping', desc: 'Regular reconciliation, transaction coding, and financial record maintenance.' },
      { step: '03', title: 'Management Reports', desc: 'Monthly P&L, balance sheet and cash flow reports delivered to your inbox.' },
      { step: '04', title: 'Year-End Accounts', desc: 'Full statutory accounts prepared and filed with Companies House on time.' },
    ],
    faqs: [
      { q: 'What software do you use?', a: 'We work across Xero, QuickBooks, Sage and FreeAgent. We can set up a new system or work within your existing one.' },
      { q: 'How quickly do you turn around accounts?', a: 'Management accounts are typically delivered within 5 working days of month end. Year-end accounts within 4–6 weeks of receiving all information.' },
      { q: 'Can you take over from my current bookkeeper?', a: 'Yes, we handle transitions smoothly and ensure no continuity is lost. We request records from your previous provider on your behalf.' },
    ],
  },
  {
    id: 'payroll',
    title: 'Payroll Services',
    tagline: 'Compliant, on-time payroll — every single time',
    icon: '💳',
    color: '#7b3f00',
    heroDesc: 'Full-service payroll management for UK businesses, handling everything from calculations to Tax office submissions.',
    overview: 'Payroll is one of the most time-sensitive and compliance-heavy areas of running a business. Our dedicated payroll team ensures your employees are paid accurately and on time, with all RTI submissions filed and pension obligations met.',
    benefits: [
      'Weekly, fortnightly or monthly payroll runs',
      'RTI submissions to Tax office on every payroll',
      'Auto-enrolment pension management',
      'P11D benefits in kind reporting',
      'Statutory payments — SSP, SMP, SPP',
      'PAYE settlement agreements',
    ],
    process: [
      { step: '01', title: 'Payroll Setup', desc: 'We register your PAYE scheme and migrate existing employee records accurately.' },
      { step: '02', title: 'Monthly Processing', desc: 'Payslips calculated, approved and distributed. RTI filed the same day.' },
      { step: '03', title: 'Pension Compliance', desc: 'Auto-enrolment contributions calculated and submitted to your pension provider.' },
      { step: '04', title: 'Year-End P60s', desc: 'All P60s issued to employees and P11Ds filed by the Tax office deadline.' },
    ],
    faqs: [
      { q: 'What if I have employees joining or leaving?', a: 'We handle all starter and leaver processing including P45s, ensuring Tax office records are updated promptly.' },
      { q: 'Do you handle CIS (Construction Industry Scheme)?', a: 'Yes, we manage CIS deductions, monthly returns, and contractor/subcontractor verification.' },
      { q: 'What is your turnaround time for payslips?', a: 'Payslips are typically processed and ready for distribution 2 working days before your payment date.' },
    ],
  },
  {
    id: 'business-consultancy',
    title: 'Business Consultancy',
    tagline: 'Strategic financial guidance to accelerate your growth',
    icon: '📈',
    color: '#4a1278',
    heroDesc: 'Expert business and financial strategy for UK SMEs looking to scale, restructure or improve profitability.',
    overview: 'Growth demands more than good accounts — it requires strategic financial thinking. Our business consultancy team partners with ambitious UK businesses to provide the insight, planning and challenge needed to achieve sustainable growth.',
    benefits: [
      'Business plans and financial forecasting',
      'Profitability improvement and cost reduction reviews',
      'Business structuring and incorporation advice',
      'Management buyout and acquisition support',
      'Cash flow modelling and working capital management',
      'KPI dashboards and performance monitoring',
    ],
    process: [
      { step: '01', title: 'Business Diagnostic', desc: 'Deep dive into your financials, structure, and performance to identify key levers.' },
      { step: '02', title: 'Strategy Workshop', desc: 'Collaborative session to define goals, challenges and opportunities.' },
      { step: '03', title: 'Plan & Forecast', desc: 'Detailed financial model with scenarios, sensitivities and milestones.' },
      { step: '04', title: 'Ongoing Advisory', desc: 'Monthly or quarterly advisory sessions to track progress and adapt strategy.' },
    ],
    faqs: [
      { q: 'Do you work with startups?', a: 'Yes. We work with early-stage businesses on financial modelling, funding preparation, and setting up financial controls from day one.' },
      { q: 'Can you help us prepare for investment?', a: 'Absolutely. We prepare investor-ready financial projections and data rooms, and can support due diligence processes.' },
      { q: 'How is this different from accounting?', a: 'Accounting looks backward at what happened. Business consultancy looks forward — helping you make better decisions based on financial insight.' },
    ],
  },
  {
    id: 'tax-office-compliance',
    title: 'Tax office Compliance',
    tagline: 'Full compliance, zero stress — we handle it all',
    icon: '🏛',
    color: '#1a4a4a',
    heroDesc: 'Comprehensive Tax office compliance services ensuring every return is filed accurately and on time.',
    overview: 'Falling behind on Tax office obligations costs money through penalties and interest, and creates real stress. Our compliance team takes complete ownership of your obligations, ensuring you are always up to date and protected.',
    benefits: [
      'Self Assessment tax returns — individuals and sole traders',
      'Corporation Tax returns (CT600)',
      'VAT registration and quarterly VAT returns',
      'Making Tax Digital (MTD) compliance',
      'Tax office correspondence and enquiry handling',
      'Penalty appeals and negotiations with Tax office',
    ],
    process: [
      { step: '01', title: 'Compliance Audit', desc: 'Review of all current Tax office obligations and identification of any outstanding matters.' },
      { step: '02', title: 'Returns Preparation', desc: 'Accurate preparation of all required returns using latest Tax office guidance.' },
      { step: '03', title: 'Review & Submit', desc: 'Client review and approval, followed by timely submission to Tax office.' },
      { step: '04', title: 'Deadline Management', desc: 'We track all deadlines proactively and ensure nothing is ever missed.' },
    ],
    faqs: [
      { q: 'What if I have missed filing deadlines?', a: 'We regularly help clients get back up to date. We can file overdue returns and in many cases negotiate penalty reductions with Tax office.' },
      { q: 'Do you handle Making Tax Digital?', a: 'Yes. We ensure full MTD compliance for VAT and prepare clients for MTD for income tax (from April 2026).' },
      { q: 'Can you deal with Tax office on my behalf?', a: 'Yes, we hold a 64-8 agent authorisation meaning we can deal with Tax office directly on all matters, removing the burden from you entirely.' },
    ],
  },
  {
    id: 'financial-planning',
    title: 'Financial Planning',
    tagline: 'Protecting and growing your wealth for the future',
    icon: '🔮',
    color: '#1a3a6b',
    heroDesc: 'Long-term financial planning and wealth strategies for individuals and business owners across the UK.',
    overview: 'Sustainable wealth requires a forward-thinking plan. Our financial planning service helps individuals and business owners build clarity around their financial future — from retirement planning and succession to personal investment strategy.',
    benefits: [
      'Personal financial planning and goal setting',
      'Retirement planning and pension optimisation',
      'Business exit and succession planning',
      'Inheritance tax mitigation strategies',
      'Protection and insurance needs analysis',
      'Investment portfolio review and structuring',
    ],
    process: [
      { step: '01', title: 'Financial Discovery', desc: 'We build a complete picture of your assets, liabilities, income and goals.' },
      { step: '02', title: 'Planning Workshop', desc: 'Collaborative session to define your financial objectives and timeline.' },
      { step: '03', title: 'Plan Creation', desc: 'Bespoke financial plan with clear recommendations and projected outcomes.' },
      { step: '04', title: 'Annual Review', desc: 'Regular reviews to keep the plan aligned with life changes and market conditions.' },
    ],
    faqs: [
      { q: 'When should I start financial planning?', a: 'The best time is now, regardless of age or stage. The earlier you start, the more options you have — but it is never too late to create a plan.' },
      { q: 'Do you provide regulated financial advice?', a: 'For investment and pension advice, we work alongside FCA-regulated independent financial advisers and can facilitate introductions where appropriate.' },
      { q: 'Can you help with business exit planning?', a: 'Yes. We help business owners structure exits — whether a trade sale, MBO or succession — to maximise value and minimise tax.' },
    ],
  },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [contactOpen, setContactOpen] = useState(false)
  const [cookieAccepted, setCookieAccepted] = useState(false)
  const [activeService, setActiveService] = useState<ServiceSlug | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('1313_cookie_consent')
    if (stored === 'accepted') setCookieAccepted(true)

    // Initial route handling
    const path = window.location.pathname.replace('/', '') as Page || 'home'
    if (['home', 'about', 'admin', 'terms', 'privacy'].includes(path)) {
      setCurrentPage(path as Page)
    }

    // Browser navigation (back/forward)
    const handlePopState = () => {
      const p = window.location.pathname.replace('/', '') as Page || 'home'
      setCurrentPage(p)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    // Sync URL with state
    const currentPath = window.location.pathname.replace('/', '') || 'home'
    if (currentPage !== currentPath && currentPage !== 'service') {
      const targetPath = currentPage === 'home' ? '/' : `/${currentPage}`
      window.history.pushState({}, '', targetPath)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage, activeService])

  const handleCookieAccept = () => {
    localStorage.setItem('1313_cookie_consent', 'accepted')
    setCookieAccepted(true)
  }

  const openService = (service: ServiceSlug) => {
    setActiveService(service)
    setCurrentPage('service')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onContactOpen={() => setContactOpen(true)} onServiceClick={openService} />
      case 'about': return <AboutPage onContactOpen={() => setContactOpen(true)} />
      case 'admin': return <AdminPage />
      case 'terms': return <TermsPage />
      case 'privacy': return <PrivacyPage />
      case 'service': return activeService
        ? <ServiceDetailPage service={activeService} onContactOpen={() => setContactOpen(true)} onBack={() => setCurrentPage('home')} />
        : <HomePage onContactOpen={() => setContactOpen(true)} onServiceClick={openService} />
      default: return <HomePage onContactOpen={() => setContactOpen(true)} onServiceClick={openService} />
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)', color: 'var(--text-dark)' }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onContactOpen={() => setContactOpen(true)} />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      {!cookieAccepted && <CookieBanner onAccept={handleCookieAccept} />}
    </div>
  )
}
