/**
 * Ramapp Solutions — AI Chat Widget
 * Smart rule-based assistant: qualifies leads, books calls, answers questions.
 */

(function () {
  'use strict';

  /* ── Knowledge base ── */
  const KB = {
    services: [
      { k: ['content pipeline','content automation','social media','posting','video','tiktok','instagram','youtube','facebook','18 posts','automated content'], r: 'The AI Content Pipeline posts 18+ pieces of short-form video content per day across YouTube, Instagram, Facebook, and TikTok — fully automated. You approve topics once a week (5 minutes), the system handles everything else 24/7.\n\n📦 Starter: $997 setup + $500/mo\n🚀 Pro: $1,497 setup + $1,000/mo\n\nWant me to book you a free call to see what a pipeline built around your brand would look like?', cta: 'book' },
      { k: ['chatbot','chat bot','website bot','lead capture','bot for website','ai assistant','widget'], r: 'I build custom AI chatbots trained on your specific business — services, FAQs, tone, everything. They answer questions, qualify leads, and book Calendly appointments 24/7 on your website.\n\n💬 Setup: $1,500–$3,000\n📅 Maintenance: $99–$299/mo\n\nWant to get a quote?', cta: 'contact' },
      { k: ['audit','process audit','automation audit','497','workflow review','where to start'], r: 'The Automation Audit is the fastest way to know exactly where you\'re leaving money on the table.\n\n🔍 2-hour deep-dive into your workflow\n📋 Top 3 automation opportunities ranked by ROI\n📄 Written report with cost estimates\n📞 30-min follow-up call included\n\n💵 $497 flat — 100% credited toward any project you book within 30 days.\n\nWant to book yours?', cta: 'book' },
      { k: ['volleycenter','volleyball','club management','sports','coaches','rosters','scheduling'], r: 'VolleyCenter is my all-in-one club management platform — built for volleyball clubs but adaptable to any sport. It covers rosters, scheduling, AI practice plans, messaging, payments, registration, and more.\n\n📱 Live at ramos-volleyball-app.netlify.app\n\nI also build custom versions for other sports organizations. Want to discuss what your club needs?', cta: 'contact' },
      { k: ['listingos','real estate','listing','agent','property description','mls','realtors'], r: 'ListingOS is an AI content engine for real estate agents. Fill out one form with listing details and it instantly generates a full suite: property description, marketing email, follow-up text, social captions, and more.\n\n⏱ Under 30 seconds. 2hr+ saved per listing.\n\nWant to see it or get something similar built?', cta: 'contact' },
      { k: ['trading bot','trading','stocks','market scanner','alpaca','automated trading','finance'], r: 'I built an autonomous trading bot that scans markets, evaluates signals, and executes trades 24/7 using custom strategy logic — no manual intervention.\n\nStack: Python, Pandas, Alpaca API, Matplotlib, Cron.\n\nI build similar systems for finance, ops, and data automation. Want to talk through your use case?', cta: 'contact' },
      { k: ['ai tool','ai tools','custom ai','ai app','build ai','ai system','artificial intelligence'], r: 'I build custom AI-powered tools — dashboards, automation pipelines, content engines, bots — whatever your workflow needs.\n\nEvery project starts with a free scoping call. No commitment required.\n\nWhat are you trying to build or automate?', cta: 'contact' },
      { k: ['automation','automate','workflow','pipeline','repetitive','manual work','save time'], r: 'Automation is what I do best. I map your current workflow, find the bottlenecks, and build systems that run while you sleep.\n\nNot sure where to start? The Automation Audit ($497) will show you exactly where to focus first.\n\nWant to book an audit or jump straight to a call?', cta: 'book' },
    ],
    pricing: [
      { k: ['price','pricing','cost','how much','rates','fee','charge','invest'], r: 'Here\'s a quick breakdown:\n\n🔨 Starter Project: $750 — single automation or AI script\n🚀 Growth Project: $2,000 — full AI system with dashboard\n🏢 Enterprise: Custom\n\n📦 AI Content Pipeline: $500–$1,000/mo\n💬 AI Chatbot: $1,500–$3,000 setup\n🔍 Automation Audit: $497 flat\n\nAll custom projects include a free scoping call and fixed-price proposal. Want me to book that for you?', cta: 'book' },
    ],
    process: [
      { k: ['how does it work','process','how long','timeline','how do you','what happens','steps','next steps'], r: 'Here\'s how every project works:\n\n1️⃣ Free call (45–60 min) — I learn your problem, your data, your goals\n2️⃣ Written scope + fixed price — no surprises\n3️⃣ Build in 1–2 week sprints — you see real software early\n4️⃣ Deploy + handoff — full docs, walkthrough, 14–60 day support\n\nMost projects ship in 1–4 weeks. Want to start with a free call?', cta: 'book' },
    ],
    about: [
      { k: ['who are you','about you','nick','who is nick','about ramapp','experience','background'], r: 'I\'m Nick Ramos — founder of Ramapp Solutions, based in Aurora, IL.\n\nI\'m a Risk Analyst, former Club Director, and Varsity Coach. I built my first automation tools to survive wearing too many hats — and turned that into a consulting business.\n\nI build AI tools and automation systems for businesses of all sizes. No agency overhead. Just real software that works.\n\nAnything else you want to know?', cta: null },
      { k: ['location','where','aurora','illinois','chicago','remote','local'], r: 'I\'m based in Aurora, IL (Chicago area) and work with clients remotely across the US.\n\n📍 Aurora, IL\n📞 (630) 453-0223\n📧 nramos@ramappsolutions.com\n\nHappy to hop on a call anytime — first one is always free.', cta: 'book' },
      { k: ['contact','email','phone','reach','talk','call'], r: 'Here\'s how to reach me:\n\n📧 nramos@ramappsolutions.com\n📞 (630) 453-0223\n📅 Free 30-min call: calendly.com/nramos-ramappsolutions/30min\n\nOr I can book a call for you right now — just say the word.', cta: 'book' },
    ],
    support: [
      { k: ['support','maintenance','ongoing','retainer','after launch','support plan'], r: 'I offer three monthly support plans for clients after launch:\n\n🔧 Basic: $149/mo — uptime monitoring, bug fixes, security updates\n⚡ Priority: $299/mo — up to 5hrs changes, 24hr response, monthly call\n🚀 Growth Partner: $499/mo — up to 10hrs, same-day response, Slack access\n\nAll plans are month-to-month. Want details on any of these?', cta: 'contact' },
    ],
  };

  const FALLBACK_RESPONSES = [
    'That\'s a good question — it might be better answered on a quick call. Want me to help you book a free 30-min session with Nick?',
    'I\'m not sure I have the perfect answer for that, but Nick definitely would. Want to book a free call?',
    'Let me connect you with Nick directly — he can answer that better than I can. Should I help you schedule a free call, or would you prefer to send a message?',
  ];

  let fallbackIndex = 0;

  /* ── State ── */
  let open = false;
  let leadCaptured = false;
  let awaitingEmail = false;
  let awaitingName = false;
  let pendingName = '';
  let messageCount = 0;

  /* ── Helpers ── */
  function match(input, keywords) {
    const low = input.toLowerCase();
    return keywords.some(k => low.includes(k));
  }

  function getResponse(input) {
    const low = input.toLowerCase();

    // Greetings
    if (/^(hi|hey|hello|howdy|sup|yo|hiya|good morning|good afternoon)[\s!?.,]*$/.test(low.trim())) {
      return { text: 'Hey! 👋 I\'m the Ramapp AI assistant. I can tell you about services, pricing, or how Nick works — or I can help you book a free call.\n\nWhat brings you here today?', cta: null };
    }

    // Yes/book/call intents
    if (/\b(yes|yeah|sure|ok|okay|book|schedule|call|let'?s|sounds good|absolutely|definitely)\b/.test(low)) {
      return { text: 'Perfect! You can book directly here 👇', cta: 'book' };
    }

    // All KB categories
    const allEntries = [...KB.services, ...KB.pricing, ...KB.process, ...KB.about, ...KB.support];
    for (const entry of allEntries) {
      if (match(input, entry.k)) {
        return { text: entry.r, cta: entry.cta };
      }
    }

    // Fallback
    const resp = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
    fallbackIndex++;
    return { text: resp, cta: 'fallback' };
  }

  /* ── Build DOM ── */
  function buildWidget() {
    const style = document.createElement('style');
    style.textContent = `
      #rmp-chat-btn {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 9999;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4af37, #b8942a);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 24px rgba(212,175,55,0.45);
        transition: transform 0.2s, box-shadow 0.2s;
        outline: none;
      }
      #rmp-chat-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 32px rgba(212,175,55,0.6);
      }
      #rmp-chat-btn svg { transition: opacity 0.2s; }

      #rmp-chat-bubble {
        position: fixed;
        bottom: 100px;
        right: 28px;
        z-index: 9998;
        background: #14120d;
        border: 1px solid rgba(212,175,55,0.3);
        border-radius: 12px;
        padding: 12px 16px;
        font-family: 'Inter', sans-serif;
        font-size: 0.82rem;
        color: #f5f0e8;
        max-width: 220px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        animation: rmp-bubble-in 0.4s ease;
        cursor: pointer;
        line-height: 1.5;
      }
      #rmp-chat-bubble::after {
        content: '';
        position: absolute;
        bottom: -7px;
        right: 24px;
        width: 0; height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid rgba(212,175,55,0.3);
      }
      @keyframes rmp-bubble-in {
        from { opacity: 0; transform: translateY(8px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      #rmp-chat-panel {
        position: fixed;
        bottom: 100px;
        right: 28px;
        z-index: 9999;
        width: 360px;
        max-width: calc(100vw - 40px);
        height: 520px;
        max-height: calc(100vh - 140px);
        background: #0c0b09;
        border: 1px solid rgba(212,175,55,0.2);
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1);
        font-family: 'Inter', sans-serif;
        transform-origin: bottom right;
        animation: rmp-panel-in 0.25s cubic-bezier(0.34,1.56,0.64,1);
      }
      #rmp-chat-panel.rmp-hidden {
        display: none;
      }
      @keyframes rmp-panel-in {
        from { opacity: 0; transform: scale(0.85); }
        to   { opacity: 1; transform: scale(1); }
      }

      .rmp-header {
        background: linear-gradient(135deg, #14120d, #1a1710);
        border-bottom: 1px solid rgba(212,175,55,0.12);
        padding: 16px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      .rmp-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4af37, #b8942a);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        flex-shrink: 0;
      }
      .rmp-header-info { flex: 1; }
      .rmp-header-name {
        font-size: 0.88rem;
        font-weight: 700;
        color: #f5f0e8;
        line-height: 1.2;
      }
      .rmp-header-status {
        font-size: 0.72rem;
        color: #6b6456;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .rmp-status-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: #22c55e;
        animation: rmp-pulse 2s infinite;
      }
      @keyframes rmp-pulse {
        0%,100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .rmp-close {
        background: none;
        border: none;
        color: #6b6456;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        transition: color 0.2s;
      }
      .rmp-close:hover { color: #f5f0e8; }

      .rmp-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scroll-behavior: smooth;
      }
      .rmp-messages::-webkit-scrollbar { width: 4px; }
      .rmp-messages::-webkit-scrollbar-track { background: transparent; }
      .rmp-messages::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.15); border-radius: 2px; }

      .rmp-msg {
        display: flex;
        flex-direction: column;
        max-width: 88%;
        animation: rmp-msg-in 0.2s ease;
      }
      @keyframes rmp-msg-in {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .rmp-msg--bot { align-self: flex-start; }
      .rmp-msg--user { align-self: flex-end; }

      .rmp-bubble {
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 0.85rem;
        line-height: 1.65;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .rmp-msg--bot .rmp-bubble {
        background: #14120d;
        border: 1px solid rgba(212,175,55,0.1);
        color: #a89880;
        border-radius: 4px 14px 14px 14px;
      }
      .rmp-msg--user .rmp-bubble {
        background: linear-gradient(135deg, #d4af37, #c9a227);
        color: #0c0b09;
        font-weight: 600;
        border-radius: 14px 14px 4px 14px;
      }

      .rmp-cta-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 6px;
      }
      .rmp-cta-btn {
        font-family: 'Inter', sans-serif;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 7px 14px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: transform 0.15s, opacity 0.15s;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .rmp-cta-btn:hover { transform: translateY(-1px); opacity: 0.9; }
      .rmp-cta-btn--primary {
        background: linear-gradient(135deg, #d4af37, #b8942a);
        color: #0c0b09;
      }
      .rmp-cta-btn--ghost {
        background: rgba(212,175,55,0.08);
        border: 1px solid rgba(212,175,55,0.25);
        color: #d4af37;
      }

      .rmp-typing {
        align-self: flex-start;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 10px 14px;
        background: #14120d;
        border: 1px solid rgba(212,175,55,0.1);
        border-radius: 4px 14px 14px 14px;
        animation: rmp-msg-in 0.2s ease;
      }
      .rmp-typing span {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: #6b6456;
        animation: rmp-type 1.2s infinite;
      }
      .rmp-typing span:nth-child(2) { animation-delay: 0.2s; }
      .rmp-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes rmp-type {
        0%,60%,100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-4px); opacity: 1; }
      }

      .rmp-suggestions {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        padding: 0 14px 10px;
        flex-shrink: 0;
      }
      .rmp-suggestion {
        font-family: 'Inter', sans-serif;
        font-size: 0.74rem;
        padding: 5px 11px;
        border-radius: 20px;
        border: 1px solid rgba(212,175,55,0.18);
        background: rgba(212,175,55,0.04);
        color: #a89880;
        cursor: pointer;
        transition: border-color 0.2s, color 0.2s;
        white-space: nowrap;
      }
      .rmp-suggestion:hover {
        border-color: rgba(212,175,55,0.4);
        color: #d4af37;
      }

      .rmp-input-row {
        display: flex;
        gap: 8px;
        padding: 12px 14px;
        border-top: 1px solid rgba(212,175,55,0.08);
        flex-shrink: 0;
        background: #0c0b09;
      }
      .rmp-input {
        flex: 1;
        background: #14120d;
        border: 1px solid rgba(212,175,55,0.15);
        border-radius: 10px;
        padding: 9px 13px;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        color: #f5f0e8;
        outline: none;
        transition: border-color 0.2s;
        resize: none;
        line-height: 1.4;
      }
      .rmp-input::placeholder { color: #3d3830; }
      .rmp-input:focus { border-color: rgba(212,175,55,0.4); }
      .rmp-send {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, #d4af37, #b8942a);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: opacity 0.2s, transform 0.15s;
        align-self: flex-end;
      }
      .rmp-send:hover { opacity: 0.85; transform: scale(1.05); }
      .rmp-send:disabled { opacity: 0.35; cursor: default; }

      .rmp-lead-form {
        background: #14120d;
        border: 1px solid rgba(212,175,55,0.15);
        border-radius: 12px;
        padding: 16px;
        margin-top: 6px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .rmp-lead-input {
        background: #0c0b09;
        border: 1px solid rgba(212,175,55,0.15);
        border-radius: 8px;
        padding: 9px 12px;
        font-family: 'Inter', sans-serif;
        font-size: 0.84rem;
        color: #f5f0e8;
        outline: none;
        width: 100%;
        box-sizing: border-box;
        transition: border-color 0.2s;
      }
      .rmp-lead-input:focus { border-color: rgba(212,175,55,0.4); }
      .rmp-lead-input::placeholder { color: #3d3830; }
      .rmp-lead-submit {
        background: linear-gradient(135deg, #d4af37, #b8942a);
        border: none;
        border-radius: 8px;
        padding: 9px;
        font-family: 'Inter', sans-serif;
        font-size: 0.84rem;
        font-weight: 700;
        color: #0c0b09;
        cursor: pointer;
        transition: opacity 0.2s;
      }
      .rmp-lead-submit:hover { opacity: 0.9; }

      #rmp-notif-badge {
        position: absolute;
        top: -3px;
        right: -3px;
        width: 16px;
        height: 16px;
        background: #ef4444;
        border-radius: 50%;
        font-size: 0.6rem;
        font-weight: 700;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        border: 2px solid #0c0b09;
      }
    `;
    document.head.appendChild(style);

    // Toggle button
    const btn = document.createElement('button');
    btn.id = 'rmp-chat-btn';
    btn.setAttribute('aria-label', 'Chat with Ramapp Solutions');
    btn.innerHTML = `
      <svg id="rmp-icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c0b09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg id="rmp-icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c0b09" stroke-width="2.5" stroke-linecap="round" style="display:none">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <div id="rmp-notif-badge">1</div>
    `;
    document.body.appendChild(btn);

    // Teaser bubble
    const bubble = document.createElement('div');
    bubble.id = 'rmp-chat-bubble';
    bubble.innerHTML = '👋 Have a question? I can help.';
    document.body.appendChild(bubble);
    setTimeout(() => { if (!open) bubble.style.display = 'none'; }, 8000);
    bubble.addEventListener('click', toggleChat);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'rmp-chat-panel';
    panel.classList.add('rmp-hidden');
    panel.innerHTML = `
      <div class="rmp-header">
        <div class="rmp-avatar">⚡</div>
        <div class="rmp-header-info">
          <div class="rmp-header-name">Ramapp AI</div>
          <div class="rmp-header-status">
            <div class="rmp-status-dot"></div>
            Online — usually replies instantly
          </div>
        </div>
        <button class="rmp-close" id="rmp-close-btn" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="rmp-messages" id="rmp-messages"></div>
      <div class="rmp-suggestions" id="rmp-suggestions"></div>
      <div class="rmp-input-row">
        <textarea class="rmp-input" id="rmp-input" placeholder="Ask me anything..." rows="1"></textarea>
        <button class="rmp-send" id="rmp-send" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c0b09" stroke-width="2.5" stroke-linecap="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    // Wire events
    btn.addEventListener('click', toggleChat);
    document.getElementById('rmp-close-btn').addEventListener('click', toggleChat);
    document.getElementById('rmp-send').addEventListener('click', handleSend);
    const input = document.getElementById('rmp-input');
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    input.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Initial message after short delay
    setTimeout(() => {
      addBotMessage(
        'Hi! I\'m the Ramapp AI assistant. 👋\n\nI can tell you about services, pricing, or how Nick works — or help you book a free call.\n\nWhat can I help you with?',
        null,
        ['Content Pipeline', 'AI Chatbot', 'Pricing', 'Book a call', 'About Nick']
      );
    }, 600);
  }

  /* ── Toggle ── */
  function toggleChat() {
    open = !open;
    const panel = document.getElementById('rmp-chat-panel');
    const bubble = document.getElementById('rmp-chat-bubble');
    const iconChat = document.getElementById('rmp-icon-chat');
    const iconClose = document.getElementById('rmp-icon-close');
    const badge = document.getElementById('rmp-notif-badge');

    if (open) {
      panel.classList.remove('rmp-hidden');
      bubble.style.display = 'none';
      iconChat.style.display = 'none';
      iconClose.style.display = 'block';
      badge.style.display = 'none';
      document.getElementById('rmp-input').focus();
    } else {
      panel.classList.add('rmp-hidden');
      iconChat.style.display = 'block';
      iconClose.style.display = 'none';
    }
  }

  /* ── Messages ── */
  function addBotMessage(text, cta, suggestions) {
    const msgs = document.getElementById('rmp-messages');

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'rmp-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    setTimeout(() => {
      msgs.removeChild(typing);

      const wrap = document.createElement('div');
      wrap.className = 'rmp-msg rmp-msg--bot';

      const bub = document.createElement('div');
      bub.className = 'rmp-bubble';
      bub.textContent = text;
      wrap.appendChild(bub);

      // CTA buttons
      if (cta) {
        const row = document.createElement('div');
        row.className = 'rmp-cta-row';

        if (cta === 'book' || cta === 'fallback') {
          const a = document.createElement('a');
          a.href = 'https://calendly.com/nramos-ramappsolutions/30min';
          a.target = '_blank';
          a.className = 'rmp-cta-btn rmp-cta-btn--primary';
          a.innerHTML = '📅 Book Free Call';
          row.appendChild(a);
        }
        if (cta === 'contact' || cta === 'fallback') {
          const a = document.createElement('a');
          a.href = 'contact.html';
          a.className = 'rmp-cta-btn rmp-cta-btn--ghost';
          a.innerHTML = '✉️ Send Message';
          row.appendChild(a);
        }
        wrap.appendChild(row);
      }

      msgs.appendChild(wrap);

      // Lead capture prompt after 3 bot messages
      messageCount++;
      if (messageCount === 3 && !leadCaptured) {
        setTimeout(() => addLeadCapture(), 800);
      }

      // Suggestions
      const suggBox = document.getElementById('rmp-suggestions');
      suggBox.innerHTML = '';
      if (suggestions && suggestions.length) {
        suggestions.forEach(s => {
          const btn = document.createElement('button');
          btn.className = 'rmp-suggestion';
          btn.textContent = s;
          btn.addEventListener('click', () => {
            suggBox.innerHTML = '';
            addUserMessage(s);
            processInput(s);
          });
          suggBox.appendChild(btn);
        });
      }

      msgs.scrollTop = msgs.scrollHeight;
    }, 900 + Math.random() * 400);
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('rmp-messages');
    const wrap = document.createElement('div');
    wrap.className = 'rmp-msg rmp-msg--user';
    const bub = document.createElement('div');
    bub.className = 'rmp-bubble';
    bub.textContent = text;
    wrap.appendChild(bub);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addLeadCapture() {
    const msgs = document.getElementById('rmp-messages');
    const wrap = document.createElement('div');
    wrap.className = 'rmp-msg rmp-msg--bot';

    const bub = document.createElement('div');
    bub.className = 'rmp-bubble';
    bub.textContent = 'Before I forget — want Nick to follow up with you directly? Drop your name and email and he\'ll reach out within 24 hours. No spam, ever.';
    wrap.appendChild(bub);

    const form = document.createElement('div');
    form.className = 'rmp-lead-form';
    form.innerHTML = `
      <input class="rmp-lead-input" id="rmp-lead-name" placeholder="Your name" type="text" />
      <input class="rmp-lead-input" id="rmp-lead-email" placeholder="your@email.com" type="email" />
      <button class="rmp-lead-submit" id="rmp-lead-submit">Send to Nick →</button>
    `;
    wrap.appendChild(form);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;

    document.getElementById('rmp-lead-submit').addEventListener('click', submitLead);
  }

  function submitLead() {
    const name = document.getElementById('rmp-lead-name').value.trim();
    const email = document.getElementById('rmp-lead-email').value.trim();
    if (!name || !email) {
      document.getElementById('rmp-lead-name').style.borderColor = 'rgba(239,68,68,0.5)';
      return;
    }

    // Submit to Formspree
    fetch('https://formspree.io/f/mrevbgdg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        message: 'Chat widget lead — visitor requested follow-up from the site chatbot.',
        _subject: 'New Chat Lead: ' + name,
      }),
    }).catch(() => {});

    leadCaptured = true;
    // Remove form
    const form = document.getElementById('rmp-lead-submit').closest('.rmp-lead-form');
    if (form) form.remove();

    addBotMessage(
      `Got it, ${name}! 🙌 Nick will be in touch at ${email} within 24 hours.\n\nIn the meantime, feel free to book a call directly — slots go fast.`,
      'book',
      ['See Pricing', 'View Our Work', 'Learn How It Works']
    );
  }

  /* ── Input handler ── */
  function handleSend() {
    const input = document.getElementById('rmp-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('rmp-suggestions').innerHTML = '';
    addUserMessage(text);
    processInput(text);
  }

  function processInput(text) {
    const { text: responseText, cta } = getResponse(text);

    let suggestions = null;
    const low = text.toLowerCase();

    // Contextual follow-up suggestions
    if (low.includes('price') || low.includes('cost') || low.includes('how much')) {
      suggestions = ['Book a free call', 'Content Pipeline', 'AI Chatbot', 'Automation Audit'];
    } else if (low.includes('content') || low.includes('social') || low.includes('pipeline')) {
      suggestions = ['See full pricing', 'Book a call', 'How does it work?'];
    } else if (low.includes('book') || low.includes('call') || low.includes('schedule')) {
      suggestions = null; // CTA handles it
    } else {
      suggestions = ['Pricing', 'Book a free call', 'Services'];
    }

    addBotMessage(responseText, cta, suggestions);
  }

  /* ── Init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }

})();
