import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useNavigate } from "react-router-dom";
import '../index.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  

  // Mock user data (replace with Firestore or backend data later)
  const subscription = {
    plan: "Pro Plan",
    balance: "120 USDC",
    status: "Active",
    renewal: "2025-09-01",
  };

  // Mock recent activity
  const recentActivity = [
    { type: "Payment", desc: "Subscription renewal", amount: "-10 USDC", date: "2025-08-01" },
    { type: "Deposit", desc: "Added funds", amount: "+50 USDC", date: "2025-07-28" },
    { type: "Upgrade", desc: "Upgraded to Pro Plan", amount: "-10 USDC", date: "2025-07-01" },
  ];

  // Mock transaction history
  const transactionHistory = [
    { hash: "0x8a1b...e3f2", type: "Deposit", amount: "+50 USDC", date: "2025-07-28", status: "Success" },
    { hash: "0x7b2c...d1a9", type: "Payment", amount: "-10 USDC", date: "2025-08-01", status: "Success" },
    { hash: "0x5c3d...b7e4", type: "Upgrade", amount: "-10 USDC", date: "2025-07-01", status: "Success" },
    { hash: "0x4d4e...c8f5", type: "Deposit", amount: "+30 USDC", date: "2025-06-15", status: "Success" },
    { hash: "0x3e5f...a9b6", type: "Payment", amount: "-10 USDC", date: "2025-06-01", status: "Success" },
  ];


// Replace with your contract's address and ABI
const CONTRACT_ADDRESS = "0xYourContractAddressHere";
const CONTRACT_ABI = [
  // Example ABI, replace with your contract's ABI
  // {
  //   "inputs": [],
  //   "name": "getValue",
  //   "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  //   "stateMutability": "view",
  //   "type": "function"
  // },
  // {
  //   "inputs": [{ "internalType": "uint256", "name": "newValue", "type": "uint256" }],
  //   "name": "setValue",
  //   "outputs": [],
  //   "stateMutability": "nonpayable",
  //   "type": "function"
  // }
];

// Removed unused getContract function to fix compile error.

// Call fetchContractValue() after wallet connect or on demand
// Removed unused fetchContractValue function to fix compile error.

// Renamed to avoid conflict with useState setter






  // Wallet connection state
  const [walletAddress, setWalletAddress] = useState("");
  // Removed unused setProvider state to fix compile error.

  // Web3Modal config
  // Removed unused web3Modal variable to fix compile error.


   

  async function handleConnectWallet() {
    setShowAddFunds(false);

    // Connect to wallet and set wallet address
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (err) {
        alert("Failed to connect wallet!");
        console.error(err);
        return;
      }
    } else {
      alert("No Ethereum wallet found. Please install MetaMask!");
      return;
    }
  }

  // Add Funds popup state
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  // Upgrade Plan popup state
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState("");

  // Handle Upgrade Plan
  const handleUpgradePlan = () => setShowUpgrade(true);
  const handleUpgradeConfirm = () => {
    setShowUpgrade(false);
    alert(`Upgraded to ${selectedUpgrade || "Premium"}!`);
  };

  // Handle Add Funds
  const handleAddFunds = () => setShowAddFunds(true);
  const handleAddFundsConfirm = () => {
    setShowAddFunds(false);
    alert(`Added ${fundAmount} USDC to your balance!`);
    setFundAmount("");
  };

  // Handle View Plans
  const handleViewPlans = () => navigate("/plans");

  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#18182f] to-[#232344] text-lg text-gray-300 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="animated-bg-blobs">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>
        <div className="dashboard-access-card">
          <svg width="56" height="56" fill="none" viewBox="0 0 56 56" className="mb-4">
            <circle cx="28" cy="28" r="26" fill="#4deaff22" />
            <path d="M28 16v12M28 40h.01M28 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="#4deaff" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <h2>Access Restricted</h2>
          <p>
            Please log in to access your dashboard and manage your subscriptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="/signin"
              className="sign-in-btn"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="create-account-btn"
            >
              Create Account
            </a>
          </div>
          <div className="help-text">
            <span>Need help? </span>
            <a href="/support">Contact Support</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-pulse-dark text-white flex flex-col items-center relative overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="animated-bg-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
      <div
        className="dashboard-container fade-in-up w-full max-w-3xl mx-auto p-4 sm:p-8"
        style={{
          borderRadius: '1.5rem',
          background: 'linear-gradient(135deg, #232344 80%, #2e2e4d 100%)',
          boxShadow: '0 12px 40px 0 rgba(77,234,255,0.13)',
          margin: '3rem 0',
        }}
      >
        {/* Profile Section */}
        <div className="profile-card flex flex-col sm:flex-row items-center gap-6 mb-10">
          <div className="dashboard-avatar bg-pulse-cyan text-[#232344] font-extrabold text-3xl flex items-center justify-center rounded-full w-20 h-20 mb-3 sm:mb-0 shadow-lg border-4 border-[#4deaff33]">
            {user.displayName ? user.displayName[0].toUpperCase() : (user.email[0]?.toUpperCase() || "U")}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 justify-center sm:justify-start">👤 User Profile</h2>
            <p>
              <span className="font-semibold text-[#4deaff]">Username:</span>{" "}
              <span className="user-username">{user.displayName || "N/A"}</span>
            </p>
            <p>
              <span className="font-semibold text-[#4deaff]">Email:</span>{" "}
              <span className="user-email">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Connect Wallet Button */}
        <div className="flex justify-end mb-8">
          {walletAddress ? (
            <div className="flex items-center gap-3 bg-[#232344] px-4 py-2 rounded-full text-[#4deaff] font-semibold shadow-lg border border-[#4deaff] text-sm sm:text-base">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          ) : (
            <button
              className="btn-ghost bg-gradient-to-r from-pulse-cyan to-pulse-purple text-white font-bold py-2 px-6 shadow-lg hover:from-pulse-purple hover:to-pulse-cyan transition-all duration-300 text-sm sm:text-base tracking-wide border-none rounded-lg"
              style={{ minWidth: 120 }}
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Subscription Section */}
        <div className="subscription-card mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📦 Subscription</h2>
          <div className="subscription-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <p><span className="font-semibold text-[#a78bfa]">Plan:</span> {subscription.plan}</p>
            <p><span className="font-semibold text-[#a78bfa]">Balance:</span> {subscription.balance}</p>
            <p><span className="font-semibold text-[#a78bfa]">Status:</span> <span className="status-pill">{subscription.status}</span></p>
            <p><span className="font-semibold text-[#a78bfa]">Renewal:</span> {subscription.renewal}</p>
          </div>
          <div className="dashboard-actions flex flex-col sm:flex-row flex-wrap gap-3">
            <button onClick={handleUpgradePlan} className="bg-yellow-500 hover:bg-yellow-600 text-[#232344] font-bold py-2 px-4 rounded-full transition w-full sm:w-auto shadow">
              Upgrade Plan
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition w-full sm:w-auto shadow" onClick={handleAddFunds}>
              Add Funds
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition w-full sm:w-auto shadow" onClick={handleViewPlans}>
              View Plans
            </button>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition w-full sm:w-auto shadow"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Upgrade Plan Popup */}
        {showUpgrade && (
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            background: "rgba(24,24,47,0.75)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#232344",
              borderRadius: "1.2rem",
              padding: "2rem 2.5rem",
              color: "#4deaff",
              fontWeight: 700,
              fontSize: "1.1rem",
              minWidth: 260,
              maxWidth: 340,
              width: "90vw",
              boxShadow: "0 8px 32px 0 rgba(77,234,255,0.18)"
            }}>
              <h3 style={{marginBottom: "1rem"}}>Upgrade Your Plan</h3>
              <select
                value={selectedUpgrade}
                onChange={e => setSelectedUpgrade(e.target.value)}
                style={{padding: "0.5rem", borderRadius: "0.5rem", marginBottom: "1.2rem", width: "100%"}}
              >
                <option value="">Select a plan</option>
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <div style={{display: "flex", gap: "1rem", justifyContent: "center"}}>
                <button
                  style={{background: "#4deaff", color: "#18182f", borderRadius: "9999px", padding: "0.5rem 1.5rem", fontWeight: 700, border: "none"}}
                  onClick={handleUpgradeConfirm}
                  disabled={!selectedUpgrade}
                >
                  Confirm
                </button>
                <button
                  style={{background: "none", color: "#a78bfa", borderRadius: "9999px", padding: "0.5rem 1.5rem", fontWeight: 700, border: "2px solid #a78bfa"}}
                  onClick={() => setShowUpgrade(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Funds Popup */}
        {showAddFunds && (
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            background: "rgba(24,24,47,0.75)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#232344",
              borderRadius: "1.2rem",
              padding: "2rem 2.5rem",
              color: "#4deaff",
              fontWeight: 700,
              fontSize: "1.1rem",
              minWidth: 260,
              maxWidth: 340,
              width: "90vw",
              boxShadow: "0 8px 32px 0 rgba(77,234,255,0.18)"
            }}>
              <h3 style={{marginBottom: "1rem"}}>Add Funds</h3>
              <input
                type="number"
                placeholder="Amount (USDC)"
                value={fundAmount}
                onChange={e => setFundAmount(e.target.value)}
                style={{padding: "0.5rem", borderRadius: "0.5rem", marginBottom: "1.2rem", width: "100%"}}
              />
              <div style={{display: "flex", gap: "1rem", justifyContent: "center"}}>
                <button
                  style={{background: "#4deaff", color: "#18182f", borderRadius: "9999px", padding: "0.5rem 1.5rem", fontWeight: 700, border: "none"}}
                  onClick={handleAddFundsConfirm}
                  disabled={!fundAmount}
                >
                  Confirm
                </button>
                <button
                  style={{background: "none", color: "#a78bfa", borderRadius: "9999px", padding: "0.5rem 1.5rem", fontWeight: 700, border: "2px solid #a78bfa"}}
                  onClick={() => setShowAddFunds(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="activity-card mt-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🕒 Recent Activity</h2>
          <ul className="activity-list space-y-3">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="flex flex-col sm:flex-row items-center justify-between bg-[#232344] px-4 py-3 rounded-xl shadow mb-2 sm:mb-0 border border-[#4deaff11]">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <span className="activity-type text-xl">
                    {item.type === "Payment" && "💸"}
                    {item.type === "Deposit" && "💰"}
                    {item.type === "Upgrade" && "⬆️"}
                  </span>
                  <span className="activity-desc">{item.desc}</span>
                  <span className="activity-date text-xs text-gray-400 ml-2">{item.date}</span>
                </div>
                <span className={`activity-amount font-bold ${item.amount.startsWith("-") ? "text-red-400" : "text-green-400"}`}>{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transaction History Section */}
        <div className="transaction-history-card mt-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🔗 Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="py-2 px-3 text-[#4deaff] font-semibold">Txn Hash</th>
                  <th className="py-2 px-3 text-[#4deaff] font-semibold">Type</th>
                  <th className="py-2 px-3 text-[#4deaff] font-semibold">Amount</th>
                  <th className="py-2 px-3 text-[#4deaff] font-semibold">Date</th>
                  <th className="py-2 px-3 text-[#4deaff] font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((tx, idx) => (
                  <tr key={idx} className="border-b border-[#4deaff11] hover:bg-[#232344cc] transition">
                    <td className="py-2 px-3 font-mono text-xs text-[#a78bfa]">
                      <span title={tx.hash}>{tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}</span>
                    </td>
                    <td className="py-2 px-3">{tx.type}</td>
                    <td className={`py-2 px-3 font-bold ${tx.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>{tx.amount}</td>
                    <td className="py-2 px-3">{tx.date}</td>
                    <td className="py-2 px-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#4deaff22] text-[#4deaff] font-semibold text-xs">{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}