import { useState } from "react";
import '../index.css'; // Ensure CSS is imported

// Simple subscription popup component
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
          Subscribe to {plan?.name}
        </h2>
        <p style={{ color: "#a78bfa", marginBottom: "1.2rem" }}>{plan?.price} - {plan?.category}</p>
        <p style={{ color: "#cbd5e1", marginBottom: "1.5rem" }}>
          Confirm your subscription to <span style={{ color: "#4deaff", fontWeight: 700 }}>{plan?.name}</span> using your connected wallet.
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

function getWalletAddress() {
  return typeof window !== 'undefined' ? localStorage.getItem('pulsepay_wallet') : null;
}

export default function Plans() {
  const allPlans = [
    { name: "Streaming+", price: "0.02 ETH / mo", category: "Streaming" },
    { name: "Dev Pro", price: "0.05 ETH / mo", category: "Developer Tools" },
    { name: "Gaming VIP", price: "0.03 ETH / mo", category: "Gaming" },
    { name: "Community Gold", price: "0.04 ETH / mo", category: "Premium Community" },
    { name: "Music Pro", price: "0.025 ETH / mo", category: "Music" },
    { name: "Design Suite", price: "0.06 ETH / mo", category: "Pro Subscriptions" },
    { name: "Analytics Pro", price: "0.045 ETH / mo", category: "Developer Tools" },
    { name: "NFT Insights", price: "0.03 ETH / mo", category: "Premium Community" },
    { name: "Crypto News+", price: "0.01 ETH / mo", category: "Streaming" },
    { name: "AI Assistant", price: "0.07 ETH / mo", category: "Pro Subscriptions" },
  ];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load More state
  const PLANS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(PLANS_PER_PAGE);

  const filteredPlans = allPlans.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All Categories" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const visiblePlans = filteredPlans.slice(0, visibleCount);

  const handleSubscribeClick = (plan) => {
    const wallet = getWalletAddress();
    if (!wallet) {
      alert('Please connect your wallet on the Dashboard page before subscribing.');
    } else {
      setSelectedPlan(plan);
      setPopupOpen(true);
    }
  };

  const handleConfirm = () => {
    setPopupOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    // You can add your real subscription logic here
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PLANS_PER_PAGE);
  };

  return (
    <section
      className="plans-section fade-in-up"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18182f 0%, #232344 100%)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Animated Background Blobs */}
      <div className="animated-bg-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="plans-header">
          <div>
            <h1 className="plans-title" style={{ letterSpacing: '-0.02em', fontWeight: 900, fontSize: '2.5rem', color: '#4deaff', textShadow: '0 4px 24px #4deaff22' }}>Explore Plans</h1>
            <p className="plans-desc" style={{ fontSize: '1.15rem', color: '#cbd5e1' }}>Find the perfect Web3 subscriptions for your needs</p>
          </div>
          <div className="plans-filters">
            <input
              className="form-input pr-10"
              placeholder="Search plans..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ minWidth: '200px', fontWeight: 600, borderRadius: '0.75rem' }}
            />
            <select
              className="form-input plans-category-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ fontWeight: 600, borderRadius: '0.75rem' }}
            >
              <option>All Categories</option>
              <option>Streaming</option>
              <option>Gaming</option>
              <option>Developer Tools</option>
              <option>Premium Community</option>
              <option>Music</option>
              <option>Pro Subscriptions</option>
            </select>
          </div>
        </div>

        <div className="plans-grid" style={{ maxHeight: '68vh', overflowY: 'auto', paddingRight: '0.5rem', scrollbarWidth: 'thin' }}>
          {visiblePlans.map((p, i) => (
            <div key={i} className="plans-card" style={{ transition: 'box-shadow 0.3s, transform 0.3s', boxShadow: '0 8px 32px 0 rgba(77,234,255,0.10), 0 1.5px 8px 0 rgba(178,89,255,0.10)', border: '1.5px solid rgba(168,139,250,0.13)', borderRadius: '1.1rem', background: 'linear-gradient(135deg, #232344 80%, #2e2e4d 100%)' }}>
              <img className="plan-card-image w-full" src={`https://picsum.photos/seed/plan${i}/800/400`} alt="" style={{ borderTopLeftRadius: '1.1rem', borderTopRightRadius: '1.1rem', height: '160px', objectFit: 'cover' }} />
              <div className="p-6">
                <h3 className="plans-card-title flex items-center gap-2" style={{ fontWeight: 700, color: '#4deaff', fontSize: '1.18rem' }}>
                  {p.name}
                  <span className="plans-card-category px-2 py-1 rounded-full text-xs font-semibold ml-2" style={{ background: 'linear-gradient(90deg, #4deaff 0%, #a78bfa 100%)', color: '#18182f', fontWeight: 700, fontSize: '0.78rem', boxShadow: '0 2px 8px 0 rgba(77,234,255,0.13)' }}>
                    {p.category}
                  </span>
                </h3>
                <p className="plans-card-price" style={{ color: '#a78bfa', fontSize: '1.08rem', marginBottom: '1.2rem' }}>{p.price}</p>
                <button
                  className="plans-card-btn mt-2"
                  style={{ fontWeight: 700, borderRadius: '9999px', boxShadow: '0 2px 12px 0 rgba(77,234,255,0.10)', fontSize: '1.08rem', background: 'linear-gradient(90deg, #a78bfa 0%, #4deaff 100%)', color: '#18182f', padding: '0.7rem 0', width: '100%', transition: 'background 0.3s, color 0.3s, transform 0.2s' }}
                  onClick={() => handleSubscribeClick(p)}
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          {visibleCount < filteredPlans.length && (
            <button
              className="plans-load-btn"
              style={{ fontWeight: 700, borderRadius: '9999px', padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <SubscriptionPopup
        open={popupOpen}
        plan={selectedPlan}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleConfirm}
      />
      {showSuccess && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(24,24,47,0.75)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#232344", borderRadius: "1.2rem", padding: "2rem 2.5rem", color: "#4deaff", fontWeight: 700, fontSize: "1.2rem"
          }}>
            Subscription successful!
          </div>
        </div>
      )}
    </section>
  );
}

