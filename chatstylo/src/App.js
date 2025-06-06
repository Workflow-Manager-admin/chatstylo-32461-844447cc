import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import TalkBuddyNavBar from './TalkBuddyNavBar';
import TalkBuddyLandingPage from './TalkBuddyLandingPage';
import TalkBuddyChatPage from './TalkBuddyChatPage';

// PUBLIC_INTERFACE
function App() {
  // With React Router, scroll to top on route change (optional: see React Router docs for use)
  return (
    <Router>
      <div className="app">
        <TalkBuddyNavBar />
        <Routes>
          <Route path="/" element={
            <>
              <TalkBuddyLandingPage />
              <main>
                <div className="container" style={{marginTop: 36}}>
                  <div id="about" style={{height:220, background:"rgba(120,181,136,0.06)",borderRadius:12, marginTop:80, padding:24, marginBottom:38}}>
                    <h2 style={{marginTop:0}}>About TalkBuddy</h2>
                    <p>TalkBuddy is a stylish AI chat demo. NavBar scrolls here. Add more info as needed!</p>
                  </div>
                </div>
              </main>
            </>
          } />
          <Route path="/chat" element={<TalkBuddyChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;