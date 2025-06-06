import React from 'react';
import './App.css';
import TalkBuddyNavBar from './TalkBuddyNavBar';

function App() {
  return (
    <div className="app">
      <TalkBuddyNavBar />
      <main>
        <div className="container">
          <div style={{height: 50}} />
          <div id="home" className="hero" style={{paddingTop: 120}}>
            <div className="subtitle">AI Workflow Manager Template</div>
            <h1 className="title">chatstylo</h1>
            <div className="description">
              Start building your application.
            </div>
            <button className="btn btn-large">Button</button>
          </div>
          <div id="chat" style={{height:300, background:"rgba(245,245,245,0.06)", borderRadius:12, marginTop:150, padding:32}}>
            <h2 style={{marginTop:0}}>Chat Section (Demo Anchor)</h2>
            <p>This is the #chat anchor target for smooth scroll navigation. Replace with your chat UI.</p>
          </div>
          <div id="about" style={{height:220, background:"rgba(120,181,136,0.06)",borderRadius:12, marginTop:160, padding:24, marginBottom:100}}>
            <h2 style={{marginTop:0}}>About TalkBuddy</h2>
            <p>TalkBuddy is a stylish AI chat demo. NavBar scrolls here. Add more info as needed!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;