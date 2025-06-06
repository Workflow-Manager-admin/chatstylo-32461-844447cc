import React, { useEffect, useState, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * TalkBuddyChatPage: AI Chat UI for TalkBuddy using OpenAI API (frontend-only).
 * Features: Modern chat bubbles (user/AI), light/dark background gradients, smooth transitions, responsive, and dark mode from NavBar.
 */
const OPENAI_API_KEY = "your_api_key_here"; // <-- Insert your OpenAI API Key here (DO NOT HARDCODE IT IN PRODUCTION)

/**
 * System message for the OpenAI chat API
 */
const SYSTEM_MESSAGE = {
  role: "system",
  content:
    "You are TalkBuddy, a friendly, helpful AI chat companion. Be concise, informative, and positive.",
};

const MODEL = "gpt-3.5-turbo"; // You may change to "gpt-4" if preferred

function TalkBuddyChatPage() {
  // Theme: should sync with body[data-tb-theme] (set by NavBar)
  const [theme, setTheme] = useState(
    document.body.getAttribute("data-tb-theme") === "light" ? "light" : "dark"
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.body.getAttribute("data-tb-theme") === "light" ? "light" : "dark"
      );
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-tb-theme"] });
    return () => observer.disconnect();
  }, []);

  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      content:
        "Hi! 👋 I'm TalkBuddy. Ask me anything or just start the conversation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // For auto-scroll
  const chatEndRef = useRef(null);
  useEffect(() => {
    // Always scroll to latest message
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isTyping]);

  // Handle input submit (send)
  async function handleSend(e) {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || isTyping) return;

    // Add user's message
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: userText,
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setIsTyping(true);

    // Add Typing... placeholder
    const typingMsg = { id: "typing", role: "assistant", content: "Typing..." };
    setMessages((msgs) => [...msgs, userMsg, typingMsg]);

    // Fetch AI reply
    try {
      const apiMessages = [
        SYSTEM_MESSAGE,
        ...[...messages, userMsg].map(({ role, content }) => ({ role, content })),
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`, // Insert API key above!
        },
        body: JSON.stringify({
          model: MODEL,
          messages: apiMessages,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data && data.choices && data.choices.length > 0) {
        const aiReply = data.choices[0].message.content.trim();
        setMessages((msgs) =>
          [
            ...msgs.slice(0, -1), // remove 'Typing...'
            {
              id: Date.now() + 1,
              role: "assistant",
              content: aiReply,
            },
          ]
        );
      } else {
        setMessages((msgs) =>
          [
            ...msgs.slice(0, -1),
            {
              id: Date.now() + 1,
              role: "assistant",
              content: "Sorry, I couldn't get a reply. Try again!",
            },
          ]
        );
      }
    } catch (err) {
      setMessages((msgs) =>
        [
          ...msgs.slice(0, -1),
          {
            id: Date.now() + 1,
            role: "assistant",
            content: "Network error. Please check your connection and API key.",
          },
        ]
      );
    } finally {
      setIsTyping(false);
    }
  }

  // Handle Enter submit
  function handleInputKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  }

  // Styles - can be moved to CSS but keeping here for easy context
  // Bubble coloring: user (blue, right, shadow), ai (grey/white, left, shadow), rounded, .chat-main gets gradient bg & transition.
  // Responsive, mobile-friendly
  return (
    <div
      className={`tb-chat-root ${theme}`}
      style={{
        minHeight: "calc(100vh - 72px)",
        padding: 0,
        boxSizing: "border-box",
        transition: "background .52s cubic-bezier(.45,.16,.44,.93)",
        background:
          theme === "light"
            ? "linear-gradient(108deg,#e7f3ff 30%, #e3eeff 99%)"
            : "linear-gradient(108deg, #161a26 0%, #253046 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main
        className="tb-chat-main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div style={{width:"100%",maxWidth:602,margin:"0 auto",paddingTop:theme==="light"?32:28}}>
          <h1
            style={{
              fontFamily: "'Poppins','Montserrat',sans-serif",
              fontWeight: 800,
              fontSize: "2.25rem",
              margin: "0 0 12px 0",
              textAlign: "center",
              background: theme === "light" ? "linear-gradient(90deg,#4e6fa7,#154cca 85%)" : "linear-gradient(90deg,#c4ffe0, #4ed3ef 88%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "0.012em",
              textShadow: theme==="dark" ? "0 2px 12px #19355249" : "0 3px 15px #82b7f259"
            }}
          >
            TalkBuddy – AI Chat
          </h1>
        </div>
        {/* Chat Area */}
        <div
          className="tb-chat-area"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 602,
            margin: "0 auto",
            marginTop: 8,
            marginBottom: 0,
            padding: theme==="light"? "18px 10px 8px 10px" : "16px 6px 3px 6px",
            background: theme === "light"
              ? "linear-gradient(112deg,#eaf2ff 68%,#f9fcff 100%)"
              : "linear-gradient(112deg,#222d41 60%,#1b263b 100%)",
            borderRadius: 19,
            boxShadow: theme === "light"
              ? "0 8px 64px 0 #6ca1f222, 0 2.5px 12px 0 #67b7f113"
              : "0 8px 64px 0 #11223b17, 0 2.5px 11px 0 #39526711",
            minHeight: 416,
            maxHeight: "calc(100vh - 240px)",
            overflowY: "auto",
            transition: "background 0.57s, box-shadow 0.42s"
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={msg.id || i}
              className={`tb-msg-row ${msg.role === "user" ? "right" : "left"}`}
              style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                marginBottom: 16,
              }}
            >
              {/* Bubble */}
              <div
                className={`tb-msg-bubble ${msg.role}`}
                style={{
                  maxWidth: "84%",
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(98deg,#70b5ff 25%,#2e79fd 100%)"
                      : theme === "light"
                        ? "linear-gradient(98deg,#f9fafc 78%,#dcdff9 100%)"
                        : "linear-gradient(98deg,#2a415b 90%,#395f7c 100%)",
                  color:
                    msg.role === "user"
                      ? "#fff"
                      : theme === "light"
                        ? "#213253"
                        : "#c3e0f7",
                  boxShadow:
                    msg.role === "user"
                      ? "0 1.4px 14px #86cefccc, 0 2px 11px #315cac11, 0 1.5px 4px #1760e721"
                      : theme === "light"
                        ? "0 1.2px 10px #cacaea22, 0 1.5px 8px #b6cdfb24"
                        : "0 1.6px 12px #15223238, 0 1.3px 6px #18394c51",
                  borderRadius:
                    msg.role === "user"
                      ? "19px 4px 17px 18px"
                      : "4px 19px 18px 17px",
                  padding: msg.role === "user" ? "12px 19px 11px 16px" : "11px 16px 12px 19px",
                  marginRight: msg.role === "user" ? 0 : 10,
                  marginLeft: msg.role === "user" ? 10 : 0,
                  fontFamily: "'Poppins','Montserrat',sans-serif",
                  fontWeight: msg.role === "assistant" ? 500 : 600,
                  fontSize: "1.04rem",
                  minHeight: 30,
                  transition: "background 0.3s, color 0.3s"
                }}
                aria-label={msg.role === "user" ? "You" : "AI"}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* Anchor for scroll-to-bottom */}
          <div ref={chatEndRef} />
        </div>
        {/* Input Area */}
        <form
          className="tb-chat-form"
          autoComplete="off"
          onSubmit={handleSend}
          style={{
            width: "100%",
            maxWidth: 602,
            margin: "0 auto",
            marginTop: 8,
            marginBottom: 30,
            display: "flex",
            alignItems: "flex-end",
            gap: 7,
            background: "none"
          }}
        >
          <textarea
            className="tb-chat-input"
            placeholder="Type your message…"
            aria-label="Your message"
            rows={1}
            style={{
              resize: "none",
              width: "100%",
              minHeight: 44,
              maxHeight: 118,
              borderRadius: 14,
              background: theme === "light"
                ? "#fff"
                : "#1d2632",
              color: theme === "light"
                ? "#213253"
                : "#e2f1fe",
              fontSize: "1.08rem",
              fontFamily: "'Montserrat','Poppins',sans-serif",
              fontWeight: 500,
              border: "none",
              boxShadow: theme === "light"
                ? "0 2.5px 10px #aeefff22"
                : "0 2.5px 10px #10214223",
              padding: "12px 14px",
              outline: "none",
              transition: "background 0.27s, color 0.33s",
              boxSizing: "border-box"
            }}
            value={input}
            disabled={isTyping}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
          <button
            type="submit"
            className="tb-send-btn"
            disabled={!input.trim() || isTyping}
            style={{
              background: "linear-gradient(90deg, #0ab8ce 0%, #257dff 98%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.12rem",
              border: "none",
              borderRadius: 14,
              padding: "13px 22px",
              boxShadow: "0 3px 19px #2590f929, 0 1.5px 7px #6fc8fa13",
              cursor: (!input.trim() || isTyping) ? "not-allowed" : "pointer",
              opacity: (!input.trim() || isTyping) ? 0.65 : 1,
              transition: "background .18s, opacity .2s",
            }}
            aria-label="Send message"
            tabIndex={0}
          >
            {isTyping ? "..." : "Send"}
          </button>
        </form>
      </main>
      {/* Inline styles for over-ride, and for mobile/responsiveness */}
      <style>{`
.tb-chat-root {
  transition: background .45s cubic-bezier(.39,.38,.38,.82);
}
@media (max-width: 670px) {
  .tb-chat-area, .tb-chat-form { max-width: 97vw; }
}
@media (max-width: 430px) {
  .tb-chat-area, .tb-chat-form { padding-left: 2px; padding-right: 2px; }
  .tb-chat-root { min-height: unset; }
  .tb-chat-area { min-height: 300px; }
}
.tb-send-btn:focus, .tb-chat-input:focus {
  outline: 2px solid ${theme === "light" ? "#196cf0" : "#45fbff"};
  outline-offset: 2px;
}
.tb-msg-bubble { transition: background .3s, color 0.3s; }
`}</style>
    </div>
  );
}

export default TalkBuddyChatPage;
