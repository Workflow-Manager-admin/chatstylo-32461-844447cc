import React, { useEffect } from 'react';
import './App.css';
import TalkBuddyNavBar from './TalkBuddyNavBar';
import TalkBuddyLandingPage from './TalkBuddyLandingPage';
import TalkBuddyChatPage from './TalkBuddyChatPage';

// PUBLIC_INTERFACE
function App() {
  // Smoothly scroll to anchor if present in URL hash on mount or hash change.
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      }
    };
    window.addEventListener("hashchange", scrollToHash, false);
    scrollToHash();
    return () => window.removeEventListener("hashchange", scrollToHash, false);
  }, []);

  return (
    <div className="app">
      <TalkBuddyNavBar />

      {/* Landing Page */}
      <TalkBuddyLandingPage />

      <main>
        <div className="container" style={{marginTop: 36}}>
          {/* Chat Page anchor target */}
          <div id="chat" tabIndex={-1} style={{outline: "none", marginTop: 54, marginBottom: 0}}>
            <TalkBuddyChatPage />
          </div>
          <div id="about" style={{height:220, background:"rgba(120,181,136,0.06)",borderRadius:12, marginTop:80, padding:24, marginBottom:38}}>
            <h2 style={{marginTop:0}}>About TalkBuddy</h2>
            <p>TalkBuddy is a stylish AI chat demo. NavBar scrolls here. Add more info as needed!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;