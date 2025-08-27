import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import '../index.css';
import CreatePlanPopup from '../Components/CreatePlanPopup';

// Subscription Popup for demo
function SubscriptionPopup({ open, plan, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(24,24,47,0.75)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#232344", borderRadius: "1.2rem", padding: "2rem 2.5rem", boxShadow: "0 8px 32px 0 rgba(77,234,255,0.18)",
        minWidth: 320, maxWidth: "90vw", color: "#fff", textAlign: "center"
      }}>
        <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.7rem", color: "#4deaff" }}>
          Subscribe to {plan?.title || plan?.name}
        </h2>
        <p style={{ color: "#a78bfa", marginBottom: "1.2rem" }}>{plan?.price}</p>
        <p style={{ color: "#cbd5e1", marginBottom: "1.5rem" }}>
          Confirm your subscription to <span style={{ color: "#4deaff", fontWeight: 700 }}>{plan?.title || plan?.name}</span> using your connected wallet.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={onConfirm}
            style={{
              background: "linear-gradient(90deg, #a78bfa 0%, #4deaff 100%)",
              color: "#18182f",
              fontWeight: 700,
              borderRadius: "9999px",
              padding: "0.7rem 2.2rem",
              fontSize: "1.08rem",
              boxShadow: "0 2px 12px 0 rgba(77,234,255,0.10)",
              border: "none",
              cursor: "pointer"
            }}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              color: "#a78bfa",
              fontWeight: 700,
              borderRadius: "9999px",
              padding: "0.7rem 2.2rem",
              fontSize: "1.08rem",
              border: "2px solid #a78bfa",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [customPlans, setCustomPlans] = useState([]);
  const [animatedText, setAnimatedText] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const paragraph =
    "Create, manage, and subscribe to decentralized services with gasless transactions and secure blockchain payments.";
  const intervalRef = useRef();

  // Animated typing effect for the paragraph, loops infinitely, slower and smoother
  useEffect(() => {
    let idx = 0;
    let typingTimeout;
    function startTyping() {
      typingTimeout = setTimeout(function type() {
        setAnimatedText(paragraph.slice(0, idx + 1));
        idx++;
        if (idx === paragraph.length) {
          setTimeout(() => {
            idx = 0;
            setAnimatedText("");
            typingTimeout = setTimeout(type, 350); // Pause before restarting
          }, 1600); // Longer pause at end
        } else {
          typingTimeout = setTimeout(type, 55); // Slower, smoother typing
        }
      }, 55);
    }
    startTyping();
    return () => clearTimeout(typingTimeout);
  }, []);

  const handleCreatePlan = (plan) => {
    setCustomPlans([...customPlans, plan]);
  };

  // Handle subscribe for featured and custom plans
  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    setPopupOpen(true);
  };

  const handleConfirm = () => {
    setPopupOpen(false);
    alert(`Subscribed to ${selectedPlan.title || selectedPlan.name}!`);
  };

  return (
    <div className="home-hero min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="animated-bg-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
      {/* Animated Decorative Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-tr from-pulse-cyan/30 via-pulse-purple/20 to-transparent rounded-b-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-pulse-purple/20 rounded-full blur-3xl animate-blob-move"></div>
      </div>
      {/* Hero Section */}
      <section className="home-hero-section text-center relative z-10 flex-1 flex flex-col justify-center">
        <div className="home-hero-content mx-auto px-4 max-w-2xl">
          <h1 className="home-hero-title gradient-text drop-shadow-xl text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
            Build or Subscribe to <br />
            <span className="text-pulse-purple animate-gradient-x bg-gradient-to-r from-pulse-purple via-pulse-cyan to-pulse-purple bg-clip-text text-transparent">
              Web3
            </span>{" "}
            Plans
          </h1>
          <p className="home-hero-subtitle text-lg md:text-xl text-white/80 mb-7 animate-fade-in delay-100" style={{ minHeight: 56 }}>
            {animatedText}
            <span className="animate-pulse text-pulse-cyan font-semibold">
              {animatedText.length < paragraph.length ? "|" : ""}
            </span>
          </p>
          <div className="home-hero-actions flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in delay-200">
            <Link
              to="/plans"
              className="btn-ghost home-hero-btn-primary px-4 py-1.5 text-sm font-bold shadow hover:scale-105 transition-transform duration-200 relative overflow-hidden group"
              style={{ boxShadow: '0 2px 8px 0 rgba(77,234,255,0.10)', borderRadius: '0.375rem' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {/* Search icon */}
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-pulse-cyan to-pulse-purple shadow">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" fill="#232344" />
                    <path d="M13.5 13.5L17 17" stroke="#4deaff" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="9" r="4" stroke="#4deaff" strokeWidth="1.5"/>
                  </svg>
                </span>
                Explore Plans
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pulse-cyan/30 via-pulse-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Link>
            <button
              className="btn-ghost home-hero-btn-secondary px-4 py-1.5 text-sm font-bold shadow hover:scale-105 transition-transform duration-200 border-2 border-pulse-cyan hover:border-pulse-purple relative overflow-hidden group"
              onClick={() => setShowModal(true)}
              style={{ boxShadow: '0 2px 8px 0 rgba(167,139,250,0.10)', borderRadius: '0.375rem' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {/* Plus icon */}
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-pulse-cyan to-pulse-purple shadow">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" fill="#232344" />
                    <path d="M10 6v8M6 10h8" stroke="#4deaff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                Create Plan
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pulse-purple/20 via-pulse-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Popup for custom plan */}
      <CreatePlanPopup show={showModal} onClose={() => setShowModal(false)} onCreate={handleCreatePlan} />
      <br /> <br /> <br /> <br />
      {/* Featured Plans Section */}
      <section className="home-featured-section relative overflow-visible py-20 px-2 md:px-0">
        {/* Animated Decorative Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[90vw] h-[40vh] bg-gradient-to-tr from-pulse-purple/30 via-pulse-cyan/20 to-transparent rounded-b-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-pulse-cyan/20 rounded-full blur-3xl animate-blob-move"></div>
        </div>
        {/* Section Divider */}
        <div className="w-full flex justify-center mb-10">
          <span className="inline-block w-32 h-1 rounded-full bg-gradient-to-r from-pulse-cyan via-pulse-purple to-pulse-cyan opacity-60 animate-pulse"></span>
        </div>
        <div className="home-featured-content mx-auto max-w-6xl">
          <h2 className="home-featured-title gradient-text text-4xl md:text-5xl font-extrabold mb-2 animate-fade-in">Featured Plans</h2>
          <p className="home-featured-subtitle text-lg md:text-xl mb-10 animate-fade-in delay-100">Discover top subscription options across various categories</p>
          <div className="home-featured-grid gap-10">
            {[
              {
                title: 'Premium Streaming Bundle',
                desc: 'Enjoy unlimited access to top movies, music, and live events. All-in-one entertainment, gasless and secure.',
                price: '0.05 ETH',
                img: 'https://picsum.photos/seed/pulse1/800/400',
              },
              {
                title: 'Pro Productivity Suite',
                desc: 'Unlock advanced tools for teams: cloud docs, AI assistants, and seamless collaboration. Boost your workflow today.',
                price: '0.03 ETH',
                img: 'https://picsum.photos/seed/pulse2/800/400',
              },
              {
                title: 'Web3 Learning Hub',
                desc: 'Access premium courses, expert webinars, and certification tracks. Learn blockchain, DeFi, and more—at your pace.',
                price: '0.02 ETH',
                img: 'https://picsum.photos/seed/pulse3/800/400',
              },
            ].map((plan, i) => (
              <div key={i} className="card home-featured-card relative overflow-hidden group shadow-2xl border border-pulse-cyan/30 hover:border-pulse-purple/50 transition-all duration-300">
                <img className="plan-card-image w-full transition-transform duration-500 group-hover:scale-105" src={plan.img} alt="" />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#232344ee] via-transparent to-transparent pointer-events-none z-10"></div>
                {/* Badge */}
                <span className="absolute top-4 left-4 z-20 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pulse-cyan to-pulse-purple text-white shadow-lg tracking-wide animate-pulse">Featured</span>
                <div className="p-7 relative z-20 flex flex-col items-start">
                  <h3 className="home-featured-card-title mb-2 flex items-center gap-2 text-xl font-bold">
                    <span className="inline-block w-2 h-2 rounded-full bg-pulse-cyan animate-ping"></span>
                    {plan.title} <span className="ml-2 text-pulse-cyan font-semibold">{plan.price}</span>
                  </h3>
                  <p className="home-featured-card-desc mb-6 text-base">{plan.desc}</p>
                  <button
                    className="btn-ghost home-featured-card-btn w-full bg-gradient-to-r from-pulse-purple to-pulse-cyan text-white font-bold py-2.5 rounded-full shadow-xl hover:from-pulse-cyan hover:to-pulse-purple transition-all duration-300 scale-100 group-hover:scale-105 text-lg tracking-wide"
                    onClick={() => handleSubscribeClick(plan)}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            ))}
            {customPlans.map((plan, idx) => (
              <div
                key={"custom-" + idx}
                className="relative overflow-hidden group shadow-2xl border-2 border-dashed border-pulse-cyan rounded-2xl bg-gradient-to-br from-[#1e293b] via-[#232344] to-[#4deaff22] hover:scale-[1.025] transition-transform duration-300 min-h-[340px] flex flex-col justify-between"
                style={{ boxShadow: '0 8px 32px 0 rgba(77,234,255,0.18), 0 1.5px 8px 0 rgba(178,89,255,0.13)' }}
              >
                {/* Decorative Icon */}
                <div className="absolute top-4 right-4 z-30">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-pulse-cyan to-pulse-purple shadow-lg border-4 border-white/10 animate-spin-slow">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                </div>
                {/* Custom Plan Badge */}
                <span className="absolute top-4 left-4 z-20 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pulse-cyan to-pulse-purple text-white shadow-lg tracking-wide animate-bounce">Future Plan</span>
                {/* Plan Content */}
                <div className="p-7 pt-16 relative z-20 flex flex-col items-start flex-1 w-full">
                  <h3 className="text-xl font-extrabold text-pulse-cyan mb-2 flex items-center gap-2 drop-shadow-lg">
                    <span className="inline-block w-3 h-3 rounded-full bg-pulse-cyan animate-pulse"></span>
                    {plan.name} <span className="ml-2 text-pulse-purple font-semibold text-lg">{plan.price}</span>
                  </h3>
                  <p className="text-base text-white/90 mb-6 font-medium drop-shadow-sm">{plan.desc || 'Your custom subscription plan.'}</p>
                  <button
                    className="mt-auto btn-ghost w-full bg-gradient-to-r from-pulse-cyan to-pulse-purple text-white font-bold py-2.5 rounded-full shadow-xl hover:from-pulse-purple hover:to-pulse-cyan transition-all duration-300 scale-100 group-hover:scale-105 text-lg tracking-wide"
                    onClick={() => handleSubscribeClick(plan)}
                  >
                    Subscribe
                  </button>
                </div>
                {/* Decorative Glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pulse-cyan opacity-20 rounded-full blur-2xl z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SubscriptionPopup
        open={popupOpen}
        plan={selectedPlan}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
