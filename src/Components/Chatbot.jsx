import { useState } from "react";

// Simple PulsePay FAQ for demo purposes
const pulsepayAnswers = [
  {
    keywords: ["what", "pulsepay"],
    answer: "PulsePay is a modern Web3 subscription platform that lets you create, manage, and subscribe to decentralized services with gasless transactions and secure blockchain payments."
  },
  {
    keywords: ["how", "subscribe"],
    answer: "To subscribe on PulsePay, connect your wallet, browse available plans, and click 'Subscribe' on your chosen plan. Your subscription will be managed securely on-chain."
  },
  {
    keywords: ["wallet", "connect"],
    answer: "PulsePay supports MetaMask, WalletConnect, Coinbase Wallet, Sonic Wallet, and other EIP-1193 compatible wallets. Connect your wallet from the Dashboard page."
  },
  {
    keywords: ["gasless", "transaction"],
    answer: "PulsePay enables gasless transactions for supported plans, so you can subscribe without paying network fees directly."
  },
  {
    keywords: ["support", "help", "contact"],
    answer: "For support, please use the chatbot or contact our team at support@pulsepay.app."
  },
  {
    keywords: ["feature", "plan"],
    answer: "PulsePay offers features like decentralized subscriptions, secure payments, and easy plan management for both creators and users."
  }
];

function getPulsePayAnswer(input) {
  const lower = input.toLowerCase();
  for (const item of pulsepayAnswers) {
    if (item.keywords.every(k => lower.includes(k))) return item.answer;
    if (item.keywords.some(k => lower.includes(k))) return item.answer;
  }
  // Default fallback
  if (lower.includes("pulsepay")) {
    return "PulsePay is a Web3 subscription platform for decentralized, gasless, and secure blockchain payments.";
  }
  return "I'm here to help with anything about PulsePay! Please ask your question.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, user: true }]);
    setInput("");

    setTimeout(() => {
      const answer = getPulsePayAnswer(input);
      setMessages((prev) => [
        ...prev,
        { text: answer, user: false }
      ]);
    }, 500);
  };

  return (
    <>
      {open && (
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <span>PulsePay Bot</span>
            <button onClick={() => setOpen(false)} style={{background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#18182f'}}>✖</button>
          </div>
          <div
            className="chatbot-messages"
            style={{
              maxHeight: "320px",
              overflowY: "auto",
              paddingRight: "0.5rem",
              marginBottom: "0.5rem",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.user ? 'flex-end' : 'flex-start',
                  background: msg.user
                    ? 'linear-gradient(90deg, #a78bfa 0%, #4deaff 100%)'
                    : 'rgba(24,24,47,0.7)',
                  color: msg.user ? '#18182f' : '#fff',
                  borderRadius: '1.1rem',
                  marginBottom: '0.5rem',
                  padding: '0.5rem 1rem',
                  maxWidth: '80%',
                  fontWeight: 500,
                  boxShadow: msg.user ? '0 2px 8px 0 rgba(167,139,250,0.10)' : 'none',
                  marginLeft: msg.user ? 'auto' : 0
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(true)}
        className="chatbot-toggle"
        style={{ display: open ? 'none' : 'flex' }}
        aria-label="Open chatbot"
      >
        💬
      </button>
    </>
  );
}