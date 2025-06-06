import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TalkBuddyLandingPage: Stylish, themed, and responsive landing page for TalkBuddy with animated backgrounds,
 * hero, feature cards, interactive button, and footer. Theme adapts to parent <body data-tb-theme>.
 */
const FEATURES = [
  {
    icon: (
      <span
        style={{
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #a2cfff 60%, #c2e5ff 100%)",
          width: 54,
          height: 54,
          fontSize: 28,
          marginBottom: 12,
          color: "#415488",
        }}
        aria-label="AI"
        role="img"
      >
        🤖
      </span>
    ),
    title: "AI Chat Partner",
    desc: "Brainstorm, chat, and practice with an AI that helps you anytime."
  },
  {
    icon: (
      <span
        style={{
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f7e3a6 70%, #fff8cd 100%)",
          width: 54,
          height: 54,
          fontSize: 28,
          marginBottom: 12,
          color: "#b19d2a",
        }}
        aria-label="LockOpen"
        role="img"
      >
        🔓
      </span>
    ),
    title: "No Login Needed",
    desc: "Just open, chat, and create. No account. No hassle."
  },
  {
    icon: (
      <span
        style={{
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #bad7df 66%, #fff 100%)",
          width: 54,
          height: 54,
          fontSize: 28,
          marginBottom: 12,
          color: "#537983",
        }}
        aria-label="Palette"
        role="img"
      >
        🎨
      </span>
    ),
    title: "Light / Dark Mode",
    desc: "Enjoy a smooth, easy-on-eyes UI that switches seamlessly."
  },
  {
    icon: (
      <span
        style={{
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #b2e8d2 60%, #dafbe9 100%)",
          width: 54,
          height: 54,
          fontSize: 28,
          marginBottom: 12,
          color: "#397d6e",
        }}
        aria-label="Lightning"
        role="img"
      >
        ⚡️
      </span>
    ),
    title: "Fast, Private",
    desc: "All in your browser. Messages & history stay private to your device."
  },
];

import { useNavigate } from "react-router-dom";

function TalkBuddyLandingPage() {
  // Detect light/dark mode from parent (body[data-tb-theme])
  const [theme, setTheme] = useState(() =>
    document.body.getAttribute("data-tb-theme") === "light" ? "light" : "dark"
  );
  useEffect(() => {
    // Listen for theme changes (when NavBar toggles mode)
    const observer = new MutationObserver(() => {
      setTheme(document.body.getAttribute("data-tb-theme") === "light" ? "light" : "dark");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-tb-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`tb-landing-root ${theme}`}>
      {/* Animated background gradient */}
      <div className="tb-bg-gradient" aria-hidden="true" />

      {/* Main content */}
      <main className="tb-landing-main">
        {/* Hero Section */}
        <section className="tb-hero">
          <div className="tb-hero-illu">
            {/* Cute chat icon as illustrative bubble */}
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
              <ellipse cx="44" cy="44" rx="44" ry="44" fill={theme === "light" ? "#a2cfff" : "#223447"} />
              <ellipse cx="44" cy="52" rx="28" ry="17" fill={theme === "light" ? "#e9f6ff" : "#24394c"} />
              <circle cx="34" cy="50" r="5" fill={theme === "light" ? "#5693d4" : "#9adcff"} />
              <circle cx="54" cy="50" r="5" fill={theme === "light" ? "#5693d4" : "#9adcff"} />
            </svg>
          </div>
          <div className="tb-hero-main">
            <h1 className="tb-hero-title">Meet TalkBuddy!</h1>
            <p className="tb-hero-desc">
              A smart, friendly AI chat companion—brainstorm, get answers, or practice languages.
              No login. No hassle. Try TalkBuddy free, right now.
            </p>
            <button
              className="tb-chat-btn"
              onClick={scrollToChat}
              aria-label="Start chatting"
            >
              Start Chatting
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="tb-features">
          <h2 className="tb-features-title">Why TalkBuddy?</h2>
          <div className="tb-features-grid">
            {FEATURES.map((f, idx) => (
              <div className="tb-feature-card" key={f.title}>
                {f.icon}
                <div className="tb-feature-title">{f.title}</div>
                <div className="tb-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="tb-landing-footer">
        <span>© {new Date().getFullYear()} TalkBuddy &middot; Powered by AI</span>
        <div className="tb-footer-links">
          <a href="#chat" onClick={e => { e.preventDefault(); scrollToChat(); }}>Chat</a>
          <a href="#about" onClick={e => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>About</a>
          <a href="https://github.com/">GitHub</a>
        </div>
      </footer>
      {/* Styles */}
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Montserrat:wght@600&family=Raleway:wght@700&display=swap');
.tb-landing-root {
  /* Removed min-height: 100vh and width: 100vw to allow flow below landing */
  position: relative;
  z-index: 0;
  overflow-x: hidden;
  font-family: 'Poppins', 'Montserrat', 'Raleway', Arial, Helvetica, sans-serif;
  color: #223447;
  transition: color .4s;
  padding-top: 80px; /* To keep under NavBar */
  background: none;
}
.tb-landing-root.dark {
  color: #edf6fa;
}
.tb-bg-gradient {
  position: fixed;
  z-index: -1;
  inset: 0;
  width: 100vw; height: 100vh;
  background: linear-gradient(to right, #a2cfff 0%, #c2e5ff 100%);
  transition: background 0.62s cubic-bezier(.56,.07,.21,.94);
  pointer-events: none;
}
.tb-landing-root.light .tb-bg-gradient {
  background: linear-gradient(112deg, #a2cfff 0%, #c2e5ff 100%);
}
.tb-landing-root.dark .tb-bg-gradient {
  background: linear-gradient(to right, #0f2027 0%, #203a43 55%, #2c5364 100%);
}

.tb-landing-main {
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 18px;
}
.tb-hero {
  margin-top: 54px;
  margin-bottom: 56px;
  min-height: 340px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 42px;
}
.tb-hero-illu {
  min-width: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: tb-bounce-in 1.1s cubic-bezier(.13,.67,.22,1.16);
}
@keyframes tb-bounce-in {
  0% { transform: translateY(-30px) scale(0.85); opacity: 0.1;}
  60% { transform: translateY(10px) scale(1.04);}
  100% { transform: none; opacity: 1;}
}
.tb-hero-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 484px;
}
/* Headline without background/gradient: solid color, max contrast, sharp text shadow for readability. */
.tb-hero-title {
  margin: 0 0 8px 0;
  font-size: 3.2rem;
  font-weight: 900;
  font-family: 'Poppins', 'Raleway', Arial, sans-serif;
  letter-spacing: 0.01em;
  line-height: 1.08;
  color: #18395e;
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  /* Add strong contrasting shadow for both light/dark */
  text-shadow:
    0 2.5px 16px rgba(26,33,70,0.18),
    0 1.5px 0 #fff,
    0 2.5px 8px #31468430,
    0 6px 32px #10356722,
    0 1px 1.5px #bfe8fe55;
  transition: color .4s, text-shadow .4s, font-size .2s;
}
/* Force readability in both themes */
.tb-landing-root.light .tb-hero-title {
  color: #114e82;
  text-shadow:
    0 2px 16px #BEE8FFbb,
    0 1.2px 0 #fff,
    0 2px 8px #70b7e155,
    0 0.8px 1.4px #c2cdfd77;
}
.tb-landing-root.dark .tb-hero-title {
  color: #f7fcff;
  text-shadow:
    0 2px 14px #193a57bb,
    0 0.7px 2.2px #193a575a,
    0 1.2px 0 #1e242a80,
    0 0.5px 1.2px #fff6;
}
@media (max-width: 650px) {
  .tb-hero-title { font-size: 2.1rem; }
}
@media (max-width: 420px) {
  .tb-hero-title { font-size: 1.38rem; }
}

.tb-hero-desc {
  font-size: 1.15rem;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.55;
  margin-bottom: 22px;
  margin-top: 0;
  color: inherit;
  letter-spacing: 0.01em;
  opacity: 0.92;
}
.tb-chat-btn {
  font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
  font-weight: 600;
  font-size: 1.13rem;
  padding: 14px 38px;
  border-radius: 999px;
  background: linear-gradient(90deg,#389be2 20%,#51c7fc 90%);
  color: #fff;
  border: none;
  box-shadow: 0 2px 16px 0 #0098df15;
  cursor: pointer;
  transition: background 0.22s, box-shadow 0.27s, color .15s;
  margin-top: 6px;
  margin-bottom: 0;
  outline: none;
}
.tb-chat-btn:hover,
.tb-chat-btn:focus {
  background: linear-gradient(90deg,#51c7fc 10%,#418dde 85%);
  box-shadow: 0 7px 30px 0 #93f3fa24, 0 1.5px 16px 0 #82b7f661;
  color: #e1f2ff;
}

.tb-features {
  margin-top: 32px;
  margin-bottom: 42px;
  width: 100%;
}
.tb-features-title {
  margin-top: 0;
  margin-bottom: 32px;
  font-size: 2rem;
  font-family: 'Raleway', 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  background: linear-gradient(90deg,#35529b 40%,#005c98 86%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-align: center;
  transition: background .5s;
}
.tb-landing-root.light .tb-features-title {
  background: linear-gradient(82deg, #306381 24%, #77cdfc 85%);
}
.tb-landing-root.dark .tb-features-title {
  background: linear-gradient(80deg, #cdd6f5 24%, #cdebf7 90%);
}
.tb-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  max-width: 930px;
  margin: 0 auto;
}
.tb-feature-card {
  background: rgba(255,255,255,0.74);
  border-radius: 18px;
  min-height: 190px;
  box-shadow: 0 8px 42px 0 #c9eaff22, 0 2.5px 12px 0 #6fc8fa13;
  padding: 34px 26px 24px 26px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.37s, box-shadow 0.36s, transform .13s;
  cursor: default;
}
.tb-feature-card:hover,
.tb-feature-card:focus-within {
  background: rgba(174,201,237,0.95);
  transform: translateY(-4.5px) scale(1.027);
  box-shadow: 0 10px 54px 0 #96e6fa35, 0 2.5px 16px 0 #7dd9ff1e;
}
.tb-landing-root.dark .tb-feature-card {
  background: rgba(34,44,56,0.93);
  box-shadow: 0 8px 42px 0 #15313a38, 0 2.5px 12px 0 #001b1629;
}
.tb-landing-root.dark .tb-feature-card:hover,
.tb-landing-root.dark .tb-feature-card:focus-within {
  background: rgba(41,65,97, 0.99);
  box-shadow: 0 10px 54px 0 #184b6266, 0 2.5px 16px 0 #0b364b2e;
}
.tb-feature-title {
  font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  font-size: 1.18rem;
  margin-bottom: 6px;
  margin-top: 0;
}
.tb-feature-desc {
  color: #426582;
  font-family: 'Montserrat', Arial, sans-serif;
  opacity: 0.88;
  font-size: 1.01rem;
  margin-top: 0;
}
.tb-landing-root.dark .tb-feature-desc {
  color: #caddfd;
  opacity: 0.87;
}

/* Footer styles */
.tb-landing-footer {
  width: 100vw;
  max-width: 100vw;
  margin: 60px 0 0 0;
  padding: 32px 0 18px 0;
  background: rgba(250,250,250,0.11);
  color: #325174;
  font-family: 'Montserrat', Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 18px;
  border-top: 1.5px solid #badffc31;
  font-size: 1.03rem;
  text-align: center;
  transition: background .4s, color .36s;
}
.tb-landing-root.dark .tb-landing-footer {
  background: rgba(21,34,47,0.21);
  color: #baceea;
  border-top: 1.5px solid #33587236;
}
.tb-footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
}
.tb-footer-links a {
  color: inherit;
  opacity: 0.77;
  text-decoration: none;
  transition: color .16s, opacity .24s;
  border-radius: 8px;
  padding: 3px 10px;
  font-weight: 500;
}
.tb-footer-links a:hover,.tb-footer-links a:focus {
  opacity: 1;
  color: #2b9de3;
  background: #bfe8ff32;
  text-decoration: underline wavy #2b9de3 1.5px;
}
@media (max-width: 660px) {
  .tb-hero {
    flex-direction: column;
    align-items: center;
    margin-top: 36px;
    gap: 32px;
  }
  .tb-hero-illu {
    margin-bottom: 0;
  }
  .tb-landing-footer {
    flex-direction: column;
    gap: 6px;
    padding: 22px 0 9px 0;
    font-size: 0.97rem;
  }
}
@media (max-width: 420px) {
  .tb-hero-title { font-size: 2.0rem;}
  .tb-hero-desc { font-size: 1rem;}
  .tb-feature-card { padding: 23px 7px 18px 7px;}
  .tb-features-title { font-size: 1.29rem;}
}
      `}</style>
    </div>
  );
}

export default TalkBuddyLandingPage;
