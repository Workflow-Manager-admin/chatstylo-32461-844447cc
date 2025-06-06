import React from 'react';
import './App.css';
import TalkBuddyNavBar from './TalkBuddyNavBar';
import TalkBuddyLandingPage from './TalkBuddyLandingPage';

function App() {
  return (
    <div className="app">
      <TalkBuddyNavBar />

      {/* Landing Page */}
      <TalkBuddyLandingPage />

      {/* The Chat and About sections remain present for anchor navigation and demo */}
      <main>
        <div className="container" style={{marginTop: 36}}>
          <div id="chat" style={{height:320, background:"rgba(245,245,245,0.06)", borderRadius:12, marginTop:54, padding:32}}>
            <h2 style={{marginTop:0}}>Chat Section</h2>
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