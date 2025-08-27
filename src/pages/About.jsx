import React from 'react'

const About = () => {
  return (
    <div>
      <section className="about-section">
        <h1 className="about-title">Why Choose PulsePay</h1>
        <p className="about-desc">
          PulsePay is revolutionizing the way you manage subscriptions in the Web3 ecosystem.
          With our platform, you can easily discover, manage, and pay for your favorite Web3 services using cryptocurrencies.
        </p>
        <div className="about-cards-container" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2.5rem'}}>
          {/* Card 1 */}
          <div className="about-card" style={{
            background: 'rgba(35,35,68,0.92)',
            borderRadius: '1.2rem',
            boxShadow: '0 8px 32px 0 rgba(77,234,255,0.13)',
            border: '1.5px solid #4deaff33',
            padding: '2rem 1.5rem',
            maxWidth: 340,
            minWidth: 260,
            color: '#fff',
            flex: '1 1 260px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.2rem', marginBottom: '1rem'}}>🔒</div>
            <h2 style={{fontWeight: 700, fontSize: '1.3rem', color: '#4deaff', marginBottom: '0.7rem'}}>Secure & Private</h2>
            <p style={{color: '#cbd5e1', fontSize: '1.08rem'}}>
              Your data and payments are protected with industry-leading encryption and privacy-first smart contracts. You stay in control of your subscriptions and funds.
            </p>
          </div>
          {/* Card 2 */}
          <div className="about-card" style={{
            background: 'rgba(35,35,68,0.92)',
            borderRadius: '1.2rem',
            boxShadow: '0 8px 32px 0 rgba(167,139,250,0.13)',
            border: '1.5px solid #a78bfa33',
            padding: '2rem 1.5rem',
            maxWidth: 340,
            minWidth: 260,
            color: '#fff',
            flex: '1 1 260px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.2rem', marginBottom: '1rem'}}>⚡</div>
            <h2 style={{fontWeight: 700, fontSize: '1.3rem', color: '#a78bfa', marginBottom: '0.7rem'}}>Instant & Flexible Payments</h2>
            <p style={{color: '#cbd5e1', fontSize: '1.08rem'}}>
              Enjoy seamless crypto payments for all your subscriptions. Top up, pause, or cancel anytime—no hidden fees, no hassle, just full flexibility.
            </p>
          </div>
          {/* Card 3 */}
          <div className="about-card" style={{
            background: 'rgba(35,35,68,0.92)',
            borderRadius: '1.2rem',
            boxShadow: '0 8px 32px 0 rgba(77,234,255,0.13)',
            border: '1.5px solid #4deaff33',
            padding: '2rem 1.5rem',
            maxWidth: 340,
            minWidth: 260,
            color: '#fff',
            flex: '1 1 260px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.2rem', marginBottom: '1rem'}}>🌐</div>
            <h2 style={{fontWeight: 700, fontSize: '1.3rem', color: '#4deaff', marginBottom: '0.7rem'}}>All-in-One Web3 Dashboard</h2>
            <p style={{color: '#cbd5e1', fontSize: '1.08rem'}}>
              Manage all your Web3 subscriptions in one place. Discover new services, track spending, and get real-time insights—effortlessly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About