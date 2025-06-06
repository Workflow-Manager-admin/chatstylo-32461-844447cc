import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * TalkBuddyNavBar: Modern, accessible navigation bar with light/dark theme toggle.
 * Fixed at top, responsive, with bold logo left and navigation links + mode toggle right.
 */
function TalkBuddyNavBar() {
  // Theme State: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    // Prefer saved user preference, else respect system preference
    const stored = localStorage.getItem("tb-theme");
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  // Apply theme to <body> and persist user preference
  useEffect(() => {
    document.body.setAttribute("data-tb-theme", theme);
    localStorage.setItem("tb-theme", theme);
  }, [theme]);

  // Hamburger menu for mobile
  const [menuOpen, setMenuOpen] = useState(false);
  const handleHamburger = () => setMenuOpen((prev) => !prev);

  // Close menu on nav or resize
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  // For active nav highlighting
  const location = useLocation();

  return (
    <>
      <nav className={`tb-navbar ${theme}`}>
        <div className="tb-navbar-inner">
          <div className="tb-logo" style={{ fontFamily: "'Poppins', 'Raleway', sans-serif" }}>
            <span className="tb-logo-emoji" aria-label="logo" role="img">💬</span>
            <span className="tb-app-name">TalkBuddy</span>
          </div>

          {/* Hamburger for mobile */}
          <button
            className="tb-hamburger"
            aria-label="Open nav"
            aria-controls="tb-navlinks"
            aria-expanded={menuOpen}
            onClick={handleHamburger}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`tb-navlinks ${menuOpen ? "open" : ""}`} id="tb-navlinks">
            {/* Use React Router's Link for SPA navigation to /chat */}
            <Link
              to="/chat"
              className={location.pathname === "/chat" ? "active" : ""}
              style={{
                transition: "color 0.20s, background 0.19s, box-shadow 0.13s",
                position: 'relative',
                borderRadius: 7,
                padding: '3px 10px',
                fontSize: "1.08rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                textDecoration: "none",
                color: "inherit",
                outline: "none",
                ...(location.pathname === "/chat"
                  ? {
                      background: theme === "light"
                        ? "rgba(170,170,170,0.13)"
                        : "rgba(80,255,236,0.063)",
                      color: theme === "light" ? "#252531" : "#fafcfb",
                      textDecoration:
                        theme === "light"
                          ? "underline wavy #868c5f 1.5px"
                          : "underline wavy #2b9de3 1.5px",
                    }
                  : {}),
              }}
              onMouseOver={e => {
                e.currentTarget.style.background =
                  theme === "light"
                    ? "rgba(170,170,170,0.13)"
                    : "rgba(80,255,236,0.063)";
                e.currentTarget.style.color =
                  theme === "light" ? "#252531" : "#fafcfb";
                e.currentTarget.style.textDecoration =
                  theme === "light"
                    ? "underline wavy #868c5f 1.5px"
                    : "underline wavy #2b9de3 1.5px";
                if (theme === "dark") {
                  e.currentTarget.style.boxShadow =
                    "0 0 9px 2px #87ffff44, 0 0 10px 2px #68826911";
                  e.currentTarget.style.textShadow =
                    "0 0 4px #fff, 0 0 7px #87ffff99";
                }
              }}
              onMouseOut={e => {
                // Reset style to default/active on mouse out
                e.currentTarget.style.background =
                  location.pathname === "/chat"
                    ? theme === "light"
                      ? "rgba(170,170,170,0.13)"
                      : "rgba(80,255,236,0.063)"
                    : "unset";
                e.currentTarget.style.color =
                  location.pathname === "/chat"
                    ? theme === "light"
                      ? "#252531"
                      : "#fafcfb"
                    : "inherit";
                e.currentTarget.style.textDecoration =
                  location.pathname === "/chat"
                    ? theme === "light"
                      ? "underline wavy #868c5f 1.5px"
                      : "underline wavy #2b9de3 1.5px"
                    : "none";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.textShadow = "";
              }}
              tabIndex={0}
              aria-current={location.pathname === "/chat" ? "page" : undefined}
            >
              Chat
            </Link>
            <a href="#about" onClick={e => {
              e.preventDefault();
              // If not on landing page, navigate to root first and then scroll after mount.
              if (location.pathname !== "/") {
                window.location.href = "/#about";
              } else {
                const section = document.getElementById("about");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }
            }}>About</a>
          </div>

          {/* Theme toggle */}
          <button
            className="tb-theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light"
              ? (
                // Moon icon
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M19 13.5A7.5 7.5 0 0 1 8.5 3a7.5 7.5 0 1 0 10.5 10.5Z"
                    stroke="#202020" strokeWidth="2" fill="none" />
                </svg>
              ) : (
                // Sun icon
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="5" stroke="#f8e97a" strokeWidth="2" fill="none"/>
                  <g stroke="#f8e97a" strokeWidth="2">
                    <line x1="11" y1="1" x2="11" y2="4"/>
                    <line x1="11" y1="18" x2="11" y2="21"/>
                    <line x1="1" y1="11" x2="4" y2="11"/>
                    <line x1="18" y1="11" x2="21" y2="11"/>
                    <line x1="4" y1="4" x2="6" y2="6"/>
                    <line x1="18" y1="4" x2="16" y2="6"/>
                    <line x1="4" y1="18" x2="6" y2="16"/>
                    <line x1="16" y1="16" x2="18" y2="18"/>
                  </g>
                </svg>
              )
            }
          </button>
        </div>
      </nav>
      <style>{`
/* Poppins and Raleway fonts import */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Raleway:wght@700&display=swap');

/* --- NavBar Core Styles --- */
.tb-navbar {
  top: 0; left: 0; width: 100vw;
  position: fixed;
  z-index: 1100;
  transition: background 0.4s, box-shadow 0.35s;
  box-shadow: 0 2px 18px 0 rgba(20,20,20,0.08);
  font-family: 'Poppins', 'Raleway', sans-serif;
}
/* Light mode */
.tb-navbar.light {
  background: rgb(208,204,199);
  color: #1a1a1a;
  box-shadow: 0 1px 14px 0 rgba(50,50,50,0.06);
}
/* Dark mode: gradient */
.tb-navbar.dark {
  background: linear-gradient(to right, #000000 0%, #1a1a1a 55%, #333333 100%);
  color: #eee;
  box-shadow: 0 2px 18px 0 rgba(0,0,0,0.27);
}
.tb-navbar-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 2.5vw;
  min-height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

/* --- Logo styles --- */
.tb-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.1;
  cursor: pointer;
}
.tb-logo-emoji {
  font-size: 1.25em;
  margin-right: 2px;
  vertical-align: -4%;
  /* Modern color for chat symbol */
  filter: drop-shadow(0 0 2px #7cfcfc);
}
.tb-navbar.light .tb-logo-emoji { filter: drop-shadow(0 0 2px #4ecdc4); }
.tb-navbar.dark .tb-logo-emoji { filter: drop-shadow(0 0 5px #baffff); }
.tb-app-name {
  font-family: 'Poppins', 'Raleway', sans-serif;
  font-weight: 800;
  letter-spacing: 0.01em;
}

/* --- Navigation Links --- */
.tb-navlinks {
  display: flex;
  align-items: center;
  gap: 26px;
}
.tb-navlinks a {
  font-size: 1.08rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: inherit;
  padding: 3px 10px;
  border-radius: 7px;
  position: relative;
  transition: color 0.27s, background 0.18s, box-shadow 0.17s;
}
.tb-navbar.light .tb-navlinks a:hover,
.tb-navbar.light .tb-navlinks a:focus {
  background: rgba(170,170,170,0.13);
  color: #252531;
  text-decoration: underline wavy #868c5f 1.5px;
}
.tb-navbar.dark .tb-navlinks a:hover,
.tb-navbar.dark .tb-navlinks a:focus {
  color: #fafcfb;
  background: rgba(80,255,236,0.063);
  box-shadow: 0 0 9px 2px #87ffff44, 0 0 10px 2px #68826911;
  text-shadow: 0 0 4px #fff,
               0 0 7px #87ffff99;
  filter: blur(0.02px);
  animation: tb-nav-glow 1.02s cubic-bezier(0.3,0.6,0.3,1) 1;
}
@keyframes tb-nav-glow {
  0% { box-shadow: 0 0 0 #87ffff00; text-shadow: 0 0 0 #fff0;}
  45% { box-shadow: 0 0 16px #87ffff55; text-shadow: 0 0 9px #fff3;}
  100% { box-shadow: 0 0 9px #87ffff44; text-shadow: 0 0 7px #fff;}
}

/* --- Theme Toggle Button --- */
.tb-theme-toggle {
  margin-left: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 8px 7px 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  transition: background 0.23s, box-shadow 0.23s;
  box-shadow: 0 0 0 0 rgba(0,0,0,0);
}
.tb-theme-toggle:hover,
.tb-theme-toggle:focus {
  background: rgba(130, 185, 188, 0.27);
  box-shadow: 0 0 0 1.5px #4ecdc4;
}
.tb-theme-toggle svg { display: block; }

/* --- Hamburger Menu styles --- */
.tb-hamburger {
  background: none;
  border: none;
  display: none;
  flex-direction: column;
  gap: 3.5px;
  height: 32px; width: 38px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 4px;
  margin-left: 12px;
}
.tb-hamburger span {
  display: block;
  width: 24px;
  height: 3px;
  margin: 2px 0;
  border-radius: 2px;
  background: currentColor;
  transition: .25s;
}
.tb-hamburger[aria-expanded='true'] span:nth-child(1) {
  transform: translateY(5.2px) rotate(45deg);
}
.tb-hamburger[aria-expanded='true'] span:nth-child(2) {
  opacity: 0;
}
.tb-hamburger[aria-expanded='true'] span:nth-child(3) {
  transform: translateY(-5.2px) rotate(-45deg);
}
/* Show hamburger on narrow screens. Hide nav-links unless open. */
@media (max-width: 740px) {
  .tb-hamburger {
    display: flex;
  }
  .tb-navlinks {
    display: none;
    position: absolute;
    top: 56px; right: 12px;
    flex-direction: column;
    align-items: flex-end;
    background: inherit;
    box-shadow: 0 3px 24px 0 #2225, 0 1px 15px 0 #4444;
    border-radius: 11px;
    min-width: 128px;
    padding: 8px 18px 8px 34px;
    z-index: 1200;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-7px) scale(0.98);
    transition: opacity 0.26s, transform 0.26s;
  }
  .tb-navlinks.open {
    display: flex;
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }
}

/* Responsive: shrink font a bit for very small screens */
@media (max-width: 480px) {
  .tb-navbar-inner { min-height: 52px; }
  .tb-logo { font-size: 1.1rem; }
  .tb-navlinks a { font-size: 0.98rem; }
  .tb-theme-toggle { margin-left: 12px; }
}

/* --- Theme logic for app (body) --- */
body[data-tb-theme='light'] {
  background: rgb(208,204,199);
  color: #1a1a1a;
  transition: background .45s, color .29s;
}
body[data-tb-theme='dark'] {
  background: #17181c;
  color: #e3e3e3;
  transition: background .41s, color .33s;
}
      `}</style>
    </>
  );
}

export default TalkBuddyNavBar;
