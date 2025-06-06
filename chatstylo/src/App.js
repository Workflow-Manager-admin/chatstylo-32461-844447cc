import React, { useEffect } from 'react';
import './App.css';
import TalkBuddyNavBar from './TalkBuddyNavBar';
import TalkBuddyLandingPage from './TalkBuddyLandingPage';

// PUBLIC_INTERFACE
function App() {
  // Smoothly scroll to anchor if present in URL hash on mount or hash change.
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        // Remove the '#' char
        const id = window.location.hash.substring(1);
        // Try scrolling to the element with that id
        const el = document.getElementById(id);
        if (el) {
          // Timeout ensures DOM is ready
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      }
    };
    window.addEventListener("hashchange", scrollToHash, false);
    // Run on mount in case initial link has a hash
    scrollToHash();
    return () => window.removeEventListener("hashchange", scrollToHash, false);
  }, []);

  return (
    <div className="app">
      <TalkBuddyNavBar />

      {/* Landing Page */}
      <TalkBuddyLandingPage />

      {/* The Chat and About sections remain present for anchor navigation and demo */}
      <main>
        <div className="container" style={{marginTop: 36}}>
          <div
            id="chat"
            tabIndex={-1}
            aria-labelledby="chat-section-title"
            style={{
              height:320,
              background:"rgba(245,245,245,0.06)",
              borderRadius:12,
              marginTop:54,
              padding:32,
              outline: "none"
            }}
          >
            <h2 id="chat-section-title" style={{marginTop:0}}>Chat Section</h2>
            <p>This is the #chat anchor target for smooth scroll navigation. Replace with your chat UI.</p>
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