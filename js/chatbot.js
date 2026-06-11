/**
 * Ramapp Solutions — AI Chat Widget
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     KNOWLEDGE BASE
     Each entry: keywords array + response text + optional cta
  ───────────────────────────────────────── */
  const KB = [

    // ── GREETING ──────────────────────────
    {
      k: ['hi', 'hey', 'hello', 'howdy', 'sup', 'good morning', 'good afternoon', 'hiya'],
      exact: true,
      r: `Hey! 👋 I'm the Ramapp AI assistant — I can answer real questions about what Nick builds, how long things take, what they cost, and whether your idea is actually doable.\n\nWhat are you working on or trying to solve?`,
      cta: null,
      sugg: ['What can you automate?', 'Pricing', 'How long does it take?', 'See examples']
    },

    // ── WHAT CAN BE BUILT / AUTOMATED ─────
    {
      k: ['what can you build', 'what can be automated', 'what do you build', 'what can you automate', 'what can be built', 'what kind of', 'examples of automation', 'what do you make'],
      r: `Here's what Ramapp builds — all powered by AI (Claude, OpenAI) plus automation tools:\n\n🤖 AI Tools\n— Custom chatbots trained on your business\n— Content generators (proposals, listings, social posts)\n— Document parsers and data extractors\n— Internal Q&A tools trained on your docs\n\n⚙️ Automation Systems\n— Lead follow-up sequences (email/text, triggered automatically)\n— CRM and spreadsheet sync (no more copy-paste)\n— Automated reporting — weekly summaries in your inbox\n— Multi-app workflows (Zapier, Make, n8n, custom APIs)\n\n📱 Full Applications\n— Custom dashboards with live data\n— Client portals and booking systems\n— Industry-specific platforms (like VolleyCenter for sports clubs)\n\nIf it's repetitive and follows a pattern, it can almost certainly be automated. What's your use case?`,
      cta: null,
      sugg: ['Pricing', 'How long does it take?', 'Book a free call']
    },

    // ── AI CAPABILITIES / WHAT AI CAN DO ──
    {
      k: ['what can ai do', 'what does ai do', 'how does ai help', 'can ai', 'will ai', 'ai capable', 'ai limitations', 'what is possible', 'ai replace'],
      r: `Great question — here's an honest breakdown of what AI can and can't do for a business:\n\n✅ AI is excellent at:\n— Writing and editing (proposals, emails, descriptions, responses)\n— Summarizing long documents or data sets\n— Classifying and routing information (like support tickets)\n— Generating structured output from unstructured input\n— Answering questions based on a knowledge base you provide\n— Pattern recognition in data\n\n⚠️ AI works with guardrails for:\n— Making real decisions with money or legal risk (human review needed)\n— Highly specialized domain knowledge (needs training data)\n— Real-time data without an integration\n\n❌ AI is not great at:\n— Replacing human relationships and judgment calls\n— Guaranteed factual accuracy without verification layers\n\nNick builds with Claude (Anthropic) and integrates it into real workflows. The key is pairing AI capability with solid engineering around it. Want to talk through a specific use case?`,
      cta: null,
      sugg: ['What have you built?', 'Pricing', 'Book a free call']
    },

    // ── CLAUDE / ANTHROPIC SPECIFIC ───────
    {
      k: ['claude', 'anthropic', 'gpt', 'openai', 'which ai', 'what model', 'what llm', 'gemini', 'llm'],
      r: `Nick builds primarily with Claude (by Anthropic) — it's one of the most capable models for business tasks like writing, analysis, and structured output.\n\nFor different use cases, the stack might include:\n— Claude (Anthropic) — writing, reasoning, analysis, chatbots\n— OpenAI GPT — when specific integrations require it\n— Whisper — audio transcription\n— Custom fine-tuned models — for specialized classification tasks\n\nThe model choice depends on what you're building. Nick picks the right tool for the job, not a one-size-fits-all answer.\n\nWant to know what model would make sense for your specific use case?`,
      cta: null,
      sugg: ['What can AI do?', 'Pricing', 'Book a free call']
    },

    // ── PROCESS / HOW IT WORKS ────────────
    {
      k: ['how does it work', 'process', 'how do you work', 'what happens', 'next steps', 'how do we start', 'what is the process', 'steps'],
      r: `Here's exactly how every project works:\n\n1️⃣ Free 30-min call\nTell Nick what you're trying to solve. He'll ask questions, clarify scope, and give you an honest take on what's possible and what it'll cost. No pitch, no pressure.\n\n2️⃣ Written scope + fixed price\nYou get a proposal with exact deliverables, timeline, and price before anything starts. No hourly billing, no surprise invoices.\n\n3️⃣ Build in 1–2 week sprints\nYou see real, working software early — not a prototype at the finish line. Nick checks in throughout.\n\n4️⃣ Handoff + documentation\nYou own the code. Nick walks you through how everything works, documents it, and is available for questions.\n\nSupport plans are available after launch if you want ongoing help.\n\nMost projects ship in 1–4 weeks depending on complexity.`,
      cta: 'book',
      sugg: ['Pricing', 'How long does it take?', 'What do you need from me?']
    },

    // ── WHAT DO YOU NEED FROM ME ──────────
    {
      k: ['what do you need from me', 'what do i need to provide', 'what information', 'do i need to be technical', 'do i need tech knowledge', 'technical skills', 'non technical'],
      r: `You don't need to be technical at all — that's the whole point.\n\nHere's what Nick typically needs from you:\n\n📋 To get started:\n— Description of the problem or task you want automated\n— Access to any tools, apps, or data the system needs to connect to (e.g. your CRM, Google Sheets, email platform)\n— Examples of what "good output" looks like (for AI tools)\n\n🔐 Access you may need to provide:\n— API keys or login credentials for your existing tools\n— Sample data or documents (anonymized is fine)\n— Brand voice examples if it's a content tool\n\nNick handles all the technical setup, code, and deployment. You just need to be available for a few check-ins and know what outcome you want.\n\nAny specific tool or system you're working with?`,
      cta: null,
      sugg: ['Pricing', 'How long does it take?', 'Book a free call']
    },

    // ── TIMELINE / HOW LONG ───────────────
    {
      k: ['how long', 'timeline', 'when will it be done', 'how fast', 'turnaround', 'delivery time', 'how quickly', 'time to build'],
      r: `Depends on the scope — here are realistic ranges:\n\n⚡ 3–5 days\n— Single automation (e.g. lead follow-up email trigger)\n— AI script or content generator\n— Simple webhook / Zapier workflow\n\n📅 1–2 weeks\n— AI chatbot for your website\n— Multi-step automation with integrations\n— Custom reporting dashboard\n— Proposal generator or document tool\n\n🗓 2–4 weeks\n— Full AI system with multiple connected parts\n— Client portal or management platform\n— Trading/data bot with custom strategy logic\n\nNick builds fast because he scopes tightly — you don't wait weeks for something simple. The free call usually gives you a clear timeline estimate for your specific project.`,
      cta: 'book',
      sugg: ['Pricing', 'What can you build?', 'Book a free call']
    },

    // ── PRICING ───────────────────────────
    {
      k: ['price', 'pricing', 'cost', 'how much', 'rates', 'fee', 'charge', 'invest', 'budget', 'expensive', 'affordable', 'cheap'],
      r: `Here's the full pricing breakdown:\n\n🔨 Custom Projects (fixed price)\n— Starter: $750 — single automation or AI tool\n— Growth: $2,000 — full AI system with dashboard\n— Enterprise: Custom — complex multi-system builds\n\n📦 Products (fast start)\n— AI Chatbot for your site: $1,500–$3,000\n— AI Content Pipeline: $997–$1,497 setup + $500–$1,000/mo\n— Automation Audit: $497 flat (credited if you book a project)\n— Proposal Generator: $49/proposal\n— Review Response Service: $297 setup + $199/mo per location\n— Automation Templates: $49–$99 each\n\n🔧 Ongoing Support\n— Basic: $149/mo — monitoring + bug fixes\n— Priority: $299/mo — up to 5hrs changes, 24hr response\n— Growth Partner: $499/mo — up to 10hrs, Slack access\n\nAll custom projects include a free scoping call and a written proposal before any money changes hands.`,
      cta: 'book',
      sugg: ['How long does it take?', 'What do you build?', 'Book a free call']
    },

    // ── AUTOMATION AUDIT ──────────────────
    {
      k: ['audit', 'automation audit', 'where to start', 'not sure what i need', 'don\'t know where', 'workflow review'],
      r: `The Automation Audit is designed for exactly this situation — you know you're wasting time but aren't sure what to fix first.\n\nHere's what it includes:\n\n🔍 2-hour deep-dive into your current workflow\n📋 Top 3 automation opportunities ranked by ROI\n📄 Written report with specific recommendations and cost estimates\n📞 30-min follow-up call to walk through findings\n\n💵 $497 flat — and 100% of that is credited toward any project you book within 30 days.\n\nMost clients find it pays for itself immediately — they stop wasting time on the wrong things and focus the build budget where it'll have the biggest impact.\n\nWant to book an audit?`,
      cta: 'book',
      sugg: ['Pricing', 'How long does a project take?', 'Book a free call']
    },

    // ── AI CONTENT PIPELINE ───────────────
    {
      k: ['content pipeline', 'content automation', 'social media', 'posting', 'video content', 'tiktok', 'instagram', 'youtube', 'facebook', '18 posts', 'automated content', 'short form'],
      r: `The AI Content Pipeline posts 18+ pieces of short-form video content per day across YouTube, Instagram, Facebook, and TikTok — fully automated.\n\nHow it works:\n— You approve topics once a week (about 5 minutes of your time)\n— The system writes scripts, generates voiceover, edits video, and posts across all platforms\n— Content is branded to your business\n\n📦 Starter: $997 setup + $500/mo\n🚀 Pro: $1,497 setup + $1,000/mo\n\nThis is a done-for-you system, not a tool you operate yourself. Once it's live, it runs without you.\n\nWant to see what a pipeline built for your brand would look like?`,
      cta: 'book',
      sugg: ['Pricing', 'How long does setup take?', 'Book a free call']
    },

    // ── CHATBOT ───────────────────────────
    {
      k: ['chatbot', 'chat bot', 'website bot', 'lead capture bot', 'bot for website', 'ai assistant for site', 'widget', 'customer service bot'],
      r: `Nick builds custom AI chatbots like the one you're talking to right now — trained specifically on your business.\n\nWhat's included:\n— Trained on your services, FAQs, pricing, and tone\n— Answers real questions (not just "contact us" deflections)\n— Qualifies leads and captures contact info\n— Books Calendly appointments automatically\n— Works 24/7 without you touching it\n— Integrates with Formspree, HubSpot, or your CRM\n\nThey're built in vanilla JavaScript — no monthly platform fee, no SaaS subscription. You own it.\n\n💵 $1,500–$3,000 depending on complexity\n🔧 Optional maintenance: $99–$299/mo\n\nWant a quote for your site?`,
      cta: 'contact',
      sugg: ['Pricing', 'How long does it take?', 'Book a free call']
    },

    // ── LEAD FOLLOW-UP / CRM ──────────────
    {
      k: ['lead follow up', 'follow up', 'crm', 'leads', 'missed leads', 'contact form', 'lead management', 'sales automation'],
      r: `Lead follow-up automation is one of the highest-ROI builds for small businesses — most leads go cold within the first hour if no one responds.\n\nHere's how it typically works:\n— New lead fills out your form or contacts you\n— System immediately sends a personalized reply (email or text)\n— Lead is logged to your CRM or spreadsheet automatically\n— Follow-up sequence triggers over the next 3–7 days if no response\n— You get notified, but you don't have to do the legwork\n\nStack options: Zapier, Make, n8n, or fully custom Python depending on your existing tools.\n\n💵 Most setups: $750–$1,500 depending on complexity\n\nWhat tools are you currently using for leads (website form, CRM, email platform)?`,
      cta: null,
      sugg: ['Pricing', 'How long does it take?', 'Book a free call']
    },

    // ── REPORTING / DASHBOARDS ────────────
    {
      k: ['report', 'reporting', 'dashboard', 'analytics', 'weekly report', 'data', 'metrics', 'kpi', 'visualization'],
      r: `Automated reporting is one of Nick's specialties — the trading bot project is built entirely around this concept.\n\nWhat can be automated:\n— Weekly or daily summary emails (revenue, leads, tasks, whatever you track)\n— Live dashboards pulling from Google Sheets, Airtable, or your database\n— Automated PDF reports sent to stakeholders on a schedule\n— Alerts when a KPI crosses a threshold\n\nStack: Python + scheduled scripts, or connected to your existing tools via API.\n\nExample: a client gets a Monday morning email with the previous week's revenue, top lead sources, and any outstanding follow-ups — all pulled automatically from their tools.\n\n💵 Reporting automation: $750–$2,000 depending on data sources and complexity\n\nWhat data do you want to stop tracking manually?`,
      cta: null,
      sugg: ['Pricing', 'Book a free call', 'See examples']
    },

    // ── PROPOSALS / CONTRACTOR ────────────
    {
      k: ['proposal', 'quote', 'contractor', 'estimate', 'bid', 'proposal generator'],
      r: `Nick built a proposal generator specifically for contractors and service businesses — fill out a short form and get a polished, professional proposal in under 60 seconds.\n\nWhat it produces:\n— Project scope and timeline\n— Itemized pricing breakdown\n— Professional formatting ready to send\n— Your branding and contact info\n\n💵 $49/proposal — no subscription needed\n\nIf you want a custom version trained on your specific pricing and services (so it fills in your numbers automatically), that's a custom project starting at $750.\n\nWant to try the $49 generator or talk about a custom version?`,
      cta: 'contact',
      sugg: ['See proposal generator', 'Pricing', 'Book a free call']
    },

    // ── REVIEW RESPONSE ───────────────────
    {
      k: ['review', 'google review', 'yelp', 'review response', 'review management', 'reputation'],
      r: `The Review Response Service uses AI to draft professional, on-brand responses to every Google review — so you never have an unanswered review again.\n\nHow it works:\n— 5-star reviews get a warm, grateful response\n— 3-star reviews get a professional acknowledgment and offer to resolve\n— 1-star reviews get a carefully worded, de-escalating reply\n— All responses match your brand voice (set during onboarding)\n— You can review before posting or enable auto-post\n\n💵 $297 setup + $199/mo per location\n\nUnanswered reviews — especially negative ones — cost you customers. This fixes that without adding to your to-do list.\n\nWant to get set up?`,
      cta: 'contact',
      sugg: ['Pricing', 'Book a free call', 'What else can be automated?']
    },

    // ── VOLLEYCENTER ──────────────────────
    {
      k: ['volleycenter', 'volleyball', 'club management', 'sports', 'coaches', 'rosters', 'sports platform'],
      r: `VolleyCenter is Nick's all-in-one club management platform — built for volleyball clubs but the architecture applies to any sport or community organization.\n\nWhat it includes:\n— Roster management with player profiles\n— Practice and game scheduling\n— AI-generated practice plans based on focus areas\n— Parent and player messaging (in-app)\n— Registration and payment processing\n— Drill library and court diagramming\n— Stats and scouting tools\n— Expense reporting for coaches\n\n📱 Live at volleycenter.ramappsolutions.com\n\nNick builds custom versions for other sports organizations too. If your club or organization is managing things across multiple apps and spreadsheets, this is the fix.\n\nWant to talk about what your organization needs?`,
      cta: 'contact',
      sugg: ['See it live', 'Pricing', 'Book a free call']
    },

    // ── LISTINGOS ─────────────────────────
    {
      k: ['listingos', 'real estate', 'listing', 'agent', 'property description', 'mls', 'realtor', 'property marketing'],
      r: `ListingOS is an AI content engine built for real estate agents — fill out one form with listing details and it generates a full marketing suite in under 30 seconds.\n\nOutput from one form:\n— MLS-ready property description\n— Marketing email to your list\n— Follow-up text message\n— Instagram caption\n— Facebook post\n— Twitter/X caption\n\nBefore: agents spent 2+ hours writing all this manually per listing.\nAfter: 30 seconds and it's done.\n\nNick builds custom versions for agents, teams, and brokerages — branded to your business, with your tone of voice.\n\n💵 Custom version: starting at $750\n\nWant to see a demo or get a quote?`,
      cta: 'contact',
      sugg: ['Pricing', 'Book a free call', 'What else can you build?']
    },

    // ── TRADING BOT ───────────────────────
    {
      k: ['trading bot', 'trading', 'stocks', 'market scanner', 'alpaca', 'automated trading', 'finance bot', 'investment'],
      r: `Nick built an autonomous trading bot that scans markets 24/7, applies custom strategy logic, and executes trades without any manual input.\n\nTechnical stack:\n— Python (core engine)\n— Pandas (data analysis and signal processing)\n— Alpaca API (brokerage connectivity and order execution)\n— Matplotlib (performance visualization)\n— Cron (scheduled execution)\n— Custom backtesting engine (tests strategy against historical data before going live)\n\n📊 Live at trader.ramappsolutions.com\n\nNick builds similar systems for finance, data pipelines, and operational automation. If you need something that watches data and takes action automatically, that's this.\n\nWant to talk through your use case?`,
      cta: 'contact',
      sugg: ['See it live', 'Pricing', 'Book a free call']
    },

    // ── TEMPLATES ─────────────────────────
    {
      k: ['template', 'templates', 'zapier template', 'make template', 'notion template', 'airtable'],
      r: `The Template Marketplace has pre-built automation templates you can buy and deploy immediately — no custom build needed.\n\nAvailable templates:\n⚡ Zapier — lead routing, CRM sync, notification workflows\n🔄 Make — multi-step data pipelines, form-to-spreadsheet automation\n📋 Notion/Airtable — project trackers, CRM setups, content calendars\n\n💵 $49–$99 per template\n\nIf none of the templates fit exactly, Nick builds custom versions — or you can request a custom template through the marketplace.\n\nWant to browse what's available?`,
      cta: 'contact',
      sugg: ['Pricing', 'Custom automation', 'Book a free call']
    },

    // ── SMALL BUSINESS ────────────────────
    {
      k: ['small business', 'small biz', 'local business', 'my business', 'business owner', 'entrepreneur', 'startup'],
      r: `Ramapp Solutions works with businesses of all sizes — solo operators, small teams, growing companies. You don't need to be a tech company to benefit from AI and automation.\n\nMost common wins for small businesses:\n— Lead follow-up that never misses (automated)\n— Proposals and quotes generated in seconds\n— Google reviews responded to automatically\n— Weekly business summaries sent to your inbox\n— Apps that don't talk to each other — connected\n\nThe ROI usually shows up fast. If a $750 automation saves 5 hours a week, it pays for itself in the first month.\n\nThere's also a dedicated page for small business owners: ramappsolutions.com/small-business.html\n\nWhat's the biggest time drain in your business right now?`,
      cta: null,
      sugg: ['Pricing', 'What can be automated?', 'Book a free call']
    },

    // ── OWNERSHIP / CODE ──────────────────
    {
      k: ['own the code', 'code ownership', 'do i own', 'who owns', 'source code', 'locked in', 'vendor lock', 'dependency'],
      r: `You own everything Nick builds — 100%.\n\nWhat that means in practice:\n— Full source code delivered to you at handoff\n— No ongoing fees to Nick to keep it running (unless you want a support plan)\n— You can hire another developer to modify it later\n— No platform lock-in — built on standard languages and tools\n— Fully documented so you (or anyone) can understand how it works\n\nThis is a deliberate philosophy. Nick builds things that work independently of him. You're not renting software — you're getting something you own permanently.\n\nAny questions about a specific technology or integration?`,
      cta: null,
      sugg: ['Pricing', 'What technology do you use?', 'Book a free call']
    },

    // ── TECH STACK ────────────────────────
    {
      k: ['technology', 'tech stack', 'what language', 'python', 'javascript', 'react', 'what tools', 'zapier', 'make', 'n8n', 'airtable', 'notion'],
      r: `Here's what Nick typically builds with:\n\n🧠 AI Layer\n— Claude (Anthropic) — reasoning, writing, analysis\n— OpenAI — when required by specific integrations\n\n💻 Backend / Automation\n— Python — scripts, bots, data pipelines, APIs\n— Node.js — server logic and integrations\n— Zapier / Make / n8n — no-code/low-code workflow automation\n\n🌐 Frontend\n— Vanilla HTML/CSS/JS — fast, lightweight, no framework overhead\n— React — for more complex UI\n\n🗄 Data\n— Google Sheets / Airtable — lightweight data storage\n— Supabase / PostgreSQL — full database for apps\n\n📡 Integrations\n— Any tool with an API (HubSpot, Salesforce, Stripe, Twilio, etc.)\n— Formspree — form handling\n— Calendly — booking\n— Alpaca — trading/brokerage\n\nNick picks the right tool for each job — not a one-size-fits-all stack.`,
      cta: null,
      sugg: ['Pricing', 'What can be built?', 'Book a free call']
    },

    // ── SUPPORT / AFTER LAUNCH ────────────
    {
      k: ['support', 'maintenance', 'ongoing', 'retainer', 'after launch', 'what if it breaks', 'bug', 'update', 'changes after'],
      r: `After every project ships, Nick offers three support plans:\n\n🔧 Basic — $149/mo\n— Uptime monitoring\n— Bug fixes\n— Security updates\n\n⚡ Priority — $299/mo\n— Everything in Basic\n— Up to 5 hours of changes per month\n— 24-hour response time\n— Monthly check-in call\n\n🚀 Growth Partner — $499/mo\n— Everything in Priority\n— Up to 10 hours of changes per month\n— Same-day response\n— Direct Slack access\n\nAll plans are month-to-month — no annual commitment.\n\nFor simpler projects, you may not need a support plan at all — most automations run without intervention once they're live.`,
      cta: 'contact',
      sugg: ['Pricing', 'How does handoff work?', 'Book a free call']
    },

    // ── ABOUT NICK ────────────────────────
    {
      k: ['who are you', 'about you', 'who is nick', 'about nick', 'about ramapp', 'experience', 'background', 'tell me about'],
      r: `Nick Ramos is the founder of Ramapp Solutions, based in Aurora, IL.\n\nBackground:\n— Risk Analyst by day\n— Club Director and Varsity Volleyball Coach\n— Taught himself to code to survive wearing too many hats\n\nHe started automating his own workflows out of necessity — managing a volleyball club, a full-time job, and coaching simultaneously. When the systems worked, he turned it into a business.\n\nWhat makes working with Nick different:\n— No agency overhead or account managers\n— He's the one who actually builds it\n— He's a business operator himself, not just a developer\n— Fixed prices, fast delivery, full code ownership\n\nBased in Aurora, IL. Works remotely with clients everywhere.\n\n📞 (630) 453-0223\n📧 nramos@ramappsolutions.com`,
      cta: null,
      sugg: ['See his work', 'Pricing', 'Book a free call']
    },

    // ── LOCATION ──────────────────────────
    {
      k: ['where are you', 'location', 'aurora', 'illinois', 'chicago', 'remote', 'local', 'in person'],
      r: `Nick is based in Aurora, IL — about 40 miles west of Chicago.\n\nHe works with clients remotely across the US. Most projects are handled entirely over video calls, email, and shared docs — no need to be local.\n\n📍 Aurora, IL\n📞 (630) 453-0223\n📧 nramos@ramappsolutions.com\n\nFirst call is free — just pick a time that works.`,
      cta: 'book',
      sugg: ['Book a free call', 'Pricing', 'Contact']
    },

    // ── SEE WORK / EXAMPLES ───────────────
    {
      k: ['portfolio', 'examples', 'see your work', 'what have you built', 'case study', 'projects', 'past work'],
      r: `Here's what Nick has built:\n\n🏐 VolleyCenter\nAll-in-one club management platform — replaced 3 apps and every spreadsheet. Rosters, scheduling, AI practice plans, payments, messaging.\n→ Live: volleycenter.ramappsolutions.com\n\n🏠 ListingOS\nAI content engine for real estate agents. One form → full marketing suite in under 30 seconds. Saves 2+ hours per listing.\n\n📈 Autonomous Trading Bot\n24/7 market scanner and trade executor. Built on Python + Alpaca API. Zero manual intervention since launch.\n→ Live: trader.ramappsolutions.com\n\nFull case studies at ramappsolutions.com/work`,
      cta: null,
      sugg: ['Pricing', 'How long does it take?', 'Book a free call']
    },

    // ── CONTACT ───────────────────────────
    {
      k: ['contact', 'email', 'phone', 'reach out', 'get in touch', 'send message'],
      r: `Here's how to reach Nick directly:\n\n📧 nramos@ramappsolutions.com\n📞 (630) 453-0223\n📅 Book a free call: calendly.com/nramos-ramappsolutions/30min\n\nOr use the contact form at ramappsolutions.com/contact\n\nHe responds within 24 hours — usually much faster.`,
      cta: 'both',
      sugg: ['Pricing', 'What do you build?']
    },

    // ── BOOKING INTENT ────────────────────
    {
      k: ['book a call', 'schedule a call', 'book a meeting', 'schedule time', 'get started', 'ready to start', 'let\'s go', 'sign me up', 'i\'m in', 'i want to'],
      r: `Let's do it. You can book directly here 👇\n\nThe first call is always free — 30 minutes, no commitment. Nick will ask about your project and give you a clear picture of what's possible and what it would cost.`,
      cta: 'book',
      sugg: null
    },

  ];

  /* ─────────────────────────────────────────
     SMART FALLBACKS
  ───────────────────────────────────────── */
  const FALLBACKS = [
    `I want to make sure I give you an accurate answer — can you tell me a bit more about what you're working on or trying to solve? That'll help me point you to the right info.`,
    `That's a bit outside my quick-answer range, but Nick can definitely speak to it. Want to drop him a message, or book a free 30-min call? He responds fast.`,
    `Good question — I don't want to guess. Here are a few things I can help with right now:`,
  ];
  let fallbackIdx = 0;
  const FALLBACK_SUGG = ['What can you build?', 'Pricing', 'How long does it take?', 'Book a free call'];

  /* ─────────────────────────────────────────
     STATE
  ───────────────────────────────────────── */
  let open = false;
  let leadCaptured = false;
  let messageCount = 0;

  /* ─────────────────────────────────────────
     MATCHING
  ───────────────────────────────────────── */
  function getResponse(raw) {
    const low = raw.toLowerCase().trim();

    // Greeting (exact match only)
    if (/^(hi|hey|hello|howdy|sup|yo|hiya|good morning|good afternoon)[\s!?.,]*$/.test(low)) {
      return KB[0]; // greeting entry
    }

    // Score each KB entry
    let best = null;
    let bestScore = 0;
    for (const entry of KB) {
      let score = 0;
      for (const kw of entry.k) {
        if (low.includes(kw)) {
          score += kw.split(' ').length; // longer phrases score higher
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    if (bestScore >= 1) return best;

    // Fallback
    const fb = {
      r: FALLBACKS[fallbackIdx % FALLBACKS.length],
      cta: fallbackIdx === 1 ? 'both' : null,
      sugg: FALLBACK_SUGG,
    };
    fallbackIdx++;
    return fb;
  }

  /* ─────────────────────────────────────────
     DOM BUILD
  ───────────────────────────────────────── */
  function buildWidget() {
    const style = document.createElement('style');
    style.textContent = `
      #rmp-chat-btn {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 9999;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #d4af37;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(212,175,55,0.4);
        transition: transform 0.2s, box-shadow 0.2s;
        outline: none;
      }
      #rmp-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(212,175,55,0.55); }

      /* Floating Book a Call sits at bottom:28px too — move chat btn up to avoid overlap */
      .floating-cta.visible ~ #rmp-chat-btn,
      body.has-floating-cta #rmp-chat-btn { bottom: 88px; }

      #rmp-chat-bubble {
        position: fixed;
        bottom: 94px;
        right: 28px;
        z-index: 9998;
        background: #14120d;
        border: 1px solid rgba(212,175,55,0.3);
        border-radius: 12px;
        padding: 11px 15px;
        font-family: 'Inter', sans-serif;
        font-size: 0.82rem;
        color: #f5f0e8;
        max-width: 210px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        animation: rmp-bubble-in 0.4s ease;
        cursor: pointer;
        line-height: 1.5;
      }
      #rmp-chat-bubble::after {
        content: '';
        position: absolute;
        bottom: -7px;
        right: 22px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid rgba(212,175,55,0.3);
      }
      @keyframes rmp-bubble-in {
        from { opacity: 0; transform: translateY(8px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0)  scale(1); }
      }

      #rmp-chat-panel {
        position: fixed;
        bottom: 94px;
        right: 28px;
        z-index: 9999;
        width: 370px;
        max-width: calc(100vw - 32px);
        /* Grows up but never clips the top of the viewport */
        max-height: min(560px, calc(100vh - 110px));
        background: #0c0b09;
        border: 1px solid rgba(212,175,55,0.18);
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 12px 48px rgba(0,0,0,0.6);
        font-family: 'Inter', sans-serif;
        transform-origin: bottom right;
        animation: rmp-panel-in 0.22s cubic-bezier(0.34,1.56,0.64,1);
      }
      #rmp-chat-panel.rmp-hidden { display: none; }
      @keyframes rmp-panel-in {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
      }

      .rmp-header {
        background: #14120d;
        border-bottom: 1px solid rgba(212,175,55,0.1);
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 11px;
        flex-shrink: 0;
      }
      .rmp-avatar {
        width: 34px; height: 34px;
        border-radius: 50%;
        background: #d4af37;
        display: flex; align-items: center; justify-content: center;
        font-size: 0.95rem; flex-shrink: 0;
      }
      .rmp-header-name { font-size: 0.86rem; font-weight: 700; color: #f5f0e8; line-height: 1.2; }
      .rmp-header-status { font-size: 0.7rem; color: #6b6456; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
      .rmp-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: rmp-pulse 2s infinite; }
      @keyframes rmp-pulse { 0%,100%{opacity:1}50%{opacity:.4} }
      .rmp-close { background:none; border:none; color:#6b6456; cursor:pointer; padding:4px; border-radius:6px; display:flex; align-items:center; margin-left:auto; transition:color .2s; }
      .rmp-close:hover { color:#f5f0e8; }

      .rmp-messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        scroll-behavior: smooth;
      }
      .rmp-messages::-webkit-scrollbar { width: 3px; }
      .rmp-messages::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.12); border-radius: 2px; }

      .rmp-msg { display:flex; flex-direction:column; max-width:90%; animation:rmp-msg-in .18s ease; }
      @keyframes rmp-msg-in { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      .rmp-msg--bot  { align-self: flex-start; }
      .rmp-msg--user { align-self: flex-end; }

      .rmp-bubble {
        padding: 9px 13px;
        border-radius: 14px;
        font-size: 0.84rem;
        line-height: 1.65;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .rmp-msg--bot  .rmp-bubble { background:#14120d; border:1px solid rgba(212,175,55,0.09); color:#a89880; border-radius:4px 14px 14px 14px; }
      .rmp-msg--user .rmp-bubble { background:#d4af37; color:#0c0b09; font-weight:600; border-radius:14px 14px 4px 14px; }

      .rmp-cta-row { display:flex; gap:7px; flex-wrap:wrap; margin-top:6px; }
      .rmp-cta-btn {
        font-family:'Inter',sans-serif; font-size:0.76rem; font-weight:600;
        padding:7px 13px; border-radius:8px; border:none; cursor:pointer;
        transition:opacity .15s,transform .15s; text-decoration:none;
        display:inline-flex; align-items:center; gap:5px;
      }
      .rmp-cta-btn:hover { opacity:.85; transform:translateY(-1px); }
      .rmp-cta-btn--primary { background:#d4af37; color:#0c0b09; }
      .rmp-cta-btn--ghost   { background:rgba(212,175,55,0.07); border:1px solid rgba(212,175,55,0.22); color:#d4af37; }

      .rmp-typing { align-self:flex-start; display:flex; align-items:center; gap:4px; padding:10px 14px; background:#14120d; border:1px solid rgba(212,175,55,0.09); border-radius:4px 14px 14px 14px; animation:rmp-msg-in .18s ease; }
      .rmp-typing span { width:5px; height:5px; border-radius:50%; background:#6b6456; animation:rmp-type 1.2s infinite; }
      .rmp-typing span:nth-child(2){animation-delay:.2s} .rmp-typing span:nth-child(3){animation-delay:.4s}
      @keyframes rmp-type { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-4px);opacity:1} }

      .rmp-suggestions { display:flex; gap:6px; flex-wrap:wrap; padding:0 12px 10px; flex-shrink:0; }
      .rmp-suggestion {
        font-family:'Inter',sans-serif; font-size:0.72rem; padding:5px 10px;
        border-radius:20px; border:1px solid rgba(212,175,55,0.16);
        background:rgba(212,175,55,0.04); color:#a89880; cursor:pointer;
        transition:border-color .2s,color .2s; white-space:nowrap;
      }
      .rmp-suggestion:hover { border-color:rgba(212,175,55,0.38); color:#d4af37; }

      .rmp-input-row { display:flex; gap:7px; padding:10px 12px; border-top:1px solid rgba(212,175,55,0.07); flex-shrink:0; background:#0c0b09; }
      .rmp-input {
        flex:1; background:#14120d; border:1px solid rgba(212,175,55,0.13); border-radius:10px;
        padding:8px 12px; font-family:'Inter',sans-serif; font-size:0.84rem; color:#f5f0e8;
        outline:none; transition:border-color .2s; resize:none; line-height:1.4;
      }
      .rmp-input::placeholder { color:#3d3830; }
      .rmp-input:focus { border-color:rgba(212,175,55,0.35); }
      .rmp-send {
        width:36px; height:36px; border-radius:9px; background:#d4af37; border:none;
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        flex-shrink:0; transition:opacity .2s,transform .15s; align-self:flex-end;
      }
      .rmp-send:hover { opacity:.85; transform:scale(1.05); }
      .rmp-send:disabled { opacity:.3; cursor:default; }

      .rmp-lead-form { background:#14120d; border:1px solid rgba(212,175,55,0.13); border-radius:12px; padding:14px; margin-top:6px; display:flex; flex-direction:column; gap:9px; }
      .rmp-lead-input { background:#0c0b09; border:1px solid rgba(212,175,55,0.13); border-radius:8px; padding:8px 11px; font-family:'Inter',sans-serif; font-size:0.83rem; color:#f5f0e8; outline:none; width:100%; box-sizing:border-box; transition:border-color .2s; }
      .rmp-lead-input:focus { border-color:rgba(212,175,55,0.35); }
      .rmp-lead-input::placeholder { color:#3d3830; }
      .rmp-lead-submit { background:#d4af37; border:none; border-radius:8px; padding:9px; font-family:'Inter',sans-serif; font-size:0.83rem; font-weight:700; color:#0c0b09; cursor:pointer; transition:opacity .2s; }
      .rmp-lead-submit:hover { opacity:.88; }

      #rmp-notif-badge { position:absolute; top:-3px; right:-3px; width:16px; height:16px; background:#ef4444; border-radius:50%; font-size:.6rem; font-weight:700; color:#fff; display:flex; align-items:center; justify-content:center; font-family:'Inter',sans-serif; border:2px solid #0c0b09; }
    `;
    document.head.appendChild(style);

    // Toggle button
    const btn = document.createElement('button');
    btn.id = 'rmp-chat-btn';
    btn.setAttribute('aria-label', 'Chat with Ramapp Solutions');
    btn.innerHTML = `
      <svg id="rmp-icon-chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c0b09" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg id="rmp-icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c0b09" stroke-width="2.5" stroke-linecap="round" style="display:none">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <div id="rmp-notif-badge">1</div>`;
    document.body.appendChild(btn);

    // Teaser bubble
    const bubble = document.createElement('div');
    bubble.id = 'rmp-chat-bubble';
    bubble.innerHTML = '👋 Have a question? I can help.';
    document.body.appendChild(bubble);
    setTimeout(() => { if (!open) bubble.style.display = 'none'; }, 7000);
    bubble.addEventListener('click', toggleChat);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'rmp-chat-panel';
    panel.classList.add('rmp-hidden');
    panel.innerHTML = `
      <div class="rmp-header">
        <div class="rmp-avatar">⚡</div>
        <div>
          <div class="rmp-header-name">Ramapp AI</div>
          <div class="rmp-header-status"><div class="rmp-status-dot"></div>Online — usually replies instantly</div>
        </div>
        <button class="rmp-close" id="rmp-close-btn" aria-label="Close chat">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="rmp-messages" id="rmp-messages"></div>
      <div class="rmp-suggestions" id="rmp-suggestions"></div>
      <div class="rmp-input-row">
        <textarea class="rmp-input" id="rmp-input" placeholder="Ask me anything..." rows="1"></textarea>
        <button class="rmp-send" id="rmp-send" aria-label="Send">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0c0b09" stroke-width="2.5" stroke-linecap="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>`;
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
      this.style.height = Math.min(this.scrollHeight, 96) + 'px';
    });

    // Check if floating CTA is present and bump button up
    const checkFloating = () => {
      const fCta = document.querySelector('.floating-cta');
      if (fCta && fCta.classList.contains('visible')) {
        btn.style.bottom = '88px';
        bubble.style.bottom = '154px';
        panel.style.bottom = '154px';
      } else {
        btn.style.bottom = '28px';
        bubble.style.bottom = '94px';
        panel.style.bottom = '94px';
      }
    };
    window.addEventListener('scroll', checkFloating, { passive: true });
    checkFloating();

    // Welcome message
    setTimeout(() => {
      addBotMessage(
        `Hi! I'm the Ramapp AI assistant. 👋\n\nI can answer real questions about services, pricing, timelines, what's actually possible with AI — or help you get in touch with Nick.\n\nWhat are you working on?`,
        null,
        ['What can be automated?', 'Pricing', 'How long does it take?', 'See examples', 'About Nick']
      );
    }, 500);
  }

  /* ─────────────────────────────────────────
     TOGGLE
  ───────────────────────────────────────── */
  function toggleChat() {
    open = !open;
    const panel  = document.getElementById('rmp-chat-panel');
    const bubble = document.getElementById('rmp-chat-bubble');
    const iChat  = document.getElementById('rmp-icon-chat');
    const iClose = document.getElementById('rmp-icon-close');
    const badge  = document.getElementById('rmp-notif-badge');
    if (open) {
      panel.classList.remove('rmp-hidden');
      bubble.style.display = 'none';
      iChat.style.display  = 'none';
      iClose.style.display = 'block';
      badge.style.display  = 'none';
      document.getElementById('rmp-input').focus();
    } else {
      panel.classList.add('rmp-hidden');
      iChat.style.display  = 'block';
      iClose.style.display = 'none';
    }
  }

  /* ─────────────────────────────────────────
     MESSAGES
  ───────────────────────────────────────── */
  function addBotMessage(text, cta, suggestions) {
    const msgs = document.getElementById('rmp-messages');
    const typing = document.createElement('div');
    typing.className = 'rmp-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    const delay = 700 + Math.min(text.length * 1.2, 1200);

    setTimeout(() => {
      msgs.removeChild(typing);
      const wrap = document.createElement('div');
      wrap.className = 'rmp-msg rmp-msg--bot';

      const bub = document.createElement('div');
      bub.className = 'rmp-bubble';
      bub.textContent = text;
      wrap.appendChild(bub);

      if (cta) {
        const row = document.createElement('div');
        row.className = 'rmp-cta-row';
        if (cta === 'book' || cta === 'both') {
          const a = document.createElement('a');
          a.href = 'https://calendly.com/nramos-ramappsolutions/30min';
          a.target = '_blank';
          a.className = 'rmp-cta-btn rmp-cta-btn--primary';
          a.innerHTML = '📅 Book Free Call';
          row.appendChild(a);
        }
        if (cta === 'contact' || cta === 'both') {
          const a = document.createElement('a');
          a.href = 'contact.html';
          a.className = 'rmp-cta-btn rmp-cta-btn--ghost';
          a.innerHTML = '✉️ Send Message';
          row.appendChild(a);
        }
        wrap.appendChild(row);
      }

      msgs.appendChild(wrap);
      messageCount++;

      // Lead capture after 4th bot message
      if (messageCount === 4 && !leadCaptured) {
        setTimeout(addLeadCapture, 900);
      }

      // Suggestions
      const suggBox = document.getElementById('rmp-suggestions');
      suggBox.innerHTML = '';
      (suggestions || []).forEach(s => {
        const b = document.createElement('button');
        b.className = 'rmp-suggestion';
        b.textContent = s;
        b.addEventListener('click', () => {
          suggBox.innerHTML = '';
          addUserMessage(s);
          respond(s);
        });
        suggBox.appendChild(b);
      });

      msgs.scrollTop = msgs.scrollHeight;
    }, delay);
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
    bub.textContent = 'Want Nick to follow up with you directly? Drop your name and email — he\'ll reach out within 24 hours. No spam, ever.';
    wrap.appendChild(bub);
    const form = document.createElement('div');
    form.className = 'rmp-lead-form';
    form.innerHTML = `
      <input class="rmp-lead-input" id="rmp-lead-name"  placeholder="Your name"       type="text"  />
      <input class="rmp-lead-input" id="rmp-lead-email" placeholder="your@email.com"  type="email" />
      <button class="rmp-lead-submit" id="rmp-lead-submit">Send to Nick →</button>`;
    wrap.appendChild(form);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    document.getElementById('rmp-lead-submit').addEventListener('click', submitLead);
  }

  function submitLead() {
    const name  = document.getElementById('rmp-lead-name').value.trim();
    const email = document.getElementById('rmp-lead-email').value.trim();
    if (!name || !email) {
      document.getElementById('rmp-lead-name').style.borderColor = 'rgba(239,68,68,0.5)';
      return;
    }
    fetch('https://formspree.io/f/mrevbgdg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message: 'Chat widget lead', _subject: 'New Chat Lead: ' + name }),
    }).catch(() => {});
    leadCaptured = true;
    document.getElementById('rmp-lead-submit')?.closest('.rmp-lead-form')?.remove();
    addBotMessage(
      `Got it, ${name}! 🙌 Nick will reach out at ${email} within 24 hours.\n\nIn the meantime, feel free to book a call directly — slots fill up.`,
      'book',
      ['See Pricing', 'What can be automated?', 'View Work']
    );
  }

  /* ─────────────────────────────────────────
     SEND
  ───────────────────────────────────────── */
  function handleSend() {
    const input = document.getElementById('rmp-input');
    const text  = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('rmp-suggestions').innerHTML = '';
    addUserMessage(text);
    respond(text);
  }

  function respond(text) {
    const entry = getResponse(text);
    addBotMessage(entry.r, entry.cta || null, entry.sugg || null);
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }

})();
