/* =========================================================
   RAMAPP SOLUTIONS — Main JS
   ========================================================= */

// ---------- NAV: scroll shadow ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---------- ACTIVE NAV LINK (per page) ----------
const page = document.body.getAttribute('data-page');
document.querySelectorAll('.nav__links a[data-nav], .nav__mobile a').forEach(a => {
  const navKey = a.getAttribute('data-nav') || a.getAttribute('href')?.replace('.html','');
  if (navKey === page) a.classList.add('nav--active');
});

// ---------- MOBILE MENU ----------
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
    spans[1].style.cssText = 'opacity: 0';
    spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

// ---------- SCROLL REVEAL ----------
// Step 1: add 'reveal' to JS-driven elements
const jsRevealTargets = document.querySelectorAll(
  '.service-card, .step, .section-header, .cta-band__terminal, ' +
  '.cta-band__copy, .contact-form, .process-card, .faq__item, ' +
  '.contact-info__item, .contact-info__note'
);
jsRevealTargets.forEach(el => {
  if (!el.classList.contains('reveal')) el.classList.add('reveal');
});

// Step 2: stagger siblings then observe ALL .reveal elements on the page
document.querySelectorAll('.reveal').forEach(el => {
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0 && idx <= 3) el.classList.add(`reveal-delay-${idx}`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- TERMINAL TYPEWRITER ----------
const terminalLines = document.querySelectorAll('.terminal__body p');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transition = `opacity 0.4s ease ${0.4 + i * 0.35}s`;
});

const terminal = document.querySelector('.cta-band__terminal');
if (terminal) {
  const termObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        terminalLines.forEach(line => { line.style.opacity = '1'; });
        termObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  termObs.observe(terminal);
}

// ---------- CONTACT FORM (Formspree) ----------
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    // Only intercept if Formspree is wired up (action contains formspree.io)
    if (!form.action.includes('formspree.io') || form.action.includes('YOUR_FORM_ID')) {
      // Not yet configured — show friendly message
      e.preventDefault();
      alert('Form not yet connected. Sign up at formspree.io and replace YOUR_FORM_ID in contact.html.');
      return;
    }
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res  = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'var(--green)';
        btn.style.color = '#080c14';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Send failed');
      }
    } catch {
      btn.textContent = 'Something went wrong — try emailing us directly.';
      btn.disabled = false;
    }
  });
}

// ---------- EDITABLE BIO ----------
// Load saved bio from localStorage on page load
(function loadBio() {
  const b1 = localStorage.getItem('bio1');
  const b2 = localStorage.getItem('bio2');
  if (b1) { const el = document.getElementById('bio1'); if (el) el.textContent = b1; }
  if (b2) { const el = document.getElementById('bio2'); if (el) el.textContent = b2; }
})();

function toggleBioEdit() {
  const fields  = ['bio1','bio2'].map(id => document.getElementById(id)).filter(Boolean);
  const editBtn = document.getElementById('bioEditBtn');
  const saveBtn = document.getElementById('bioSaveBtn');
  const isEditing = fields[0]?.getAttribute('contenteditable') === 'true';

  if (!isEditing) {
    fields.forEach(f => { f.setAttribute('contenteditable', 'true'); f.focus(); });
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-flex';
  } else {
    saveBio();
  }
}

function saveBio() {
  const fields  = ['bio1','bio2'].map(id => document.getElementById(id)).filter(Boolean);
  const editBtn = document.getElementById('bioEditBtn');
  const saveBtn = document.getElementById('bioSaveBtn');

  fields.forEach(f => {
    localStorage.setItem(f.id, f.textContent);
    f.setAttribute('contenteditable', 'false');
  });
  editBtn.style.display = 'inline-flex';
  saveBtn.style.display = 'none';

  // Flash confirmation
  editBtn.textContent = '✓ Saved';
  setTimeout(() => { editBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit Bio'; }, 2000);
}

// ---------- CALENDLY ----------
// Replace the URL below with your Calendly link after signing up at calendly.com
function openCalendly(e) {
  e && e.preventDefault();
  const url = 'https://calendly.com/ramappsolutions'; // ← update this
  if (window.Calendly) {
    Calendly.initPopupWidget({ url });
  } else {
    window.open(url, '_blank');
  }
}
// Attach to all calendly buttons
document.querySelectorAll('.btn--calendly').forEach(btn => {
  btn.addEventListener('click', openCalendly);
});

// ---------- FLOATING BOOK-A-CALL BUTTON ----------
(function initFloatingCTA() {
  const btn = document.createElement('div');
  btn.className = 'floating-cta';
  btn.innerHTML = `
    <button class="floating-cta__btn btn--calendly" aria-label="Book a free call">
      <span class="floating-cta__pulse"></span>
      Book a Free 30-Min Call
    </button>`;
  document.body.appendChild(btn);

  // Show after scrolling past 400px, hide near footer
  const footer = document.querySelector('.footer');
  window.addEventListener('scroll', () => {
    const scrolled   = window.scrollY > 400;
    const nearFooter = footer && window.scrollY + window.innerHeight >= footer.offsetTop - 60;
    btn.classList.toggle('visible', scrolled && !nearFooter);
  }, { passive: true });

  btn.querySelector('button').addEventListener('click', openCalendly);
})();

// ---------- ANIMATED STAT COUNTERS ----------
(function initCountUp() {
  const els = document.querySelectorAll('.count-up');
  if (!els.length) return;

  const countEl = (el) => {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const decimals = (el.dataset.count.includes('.')) ? 1 : 0;
    const duration = 1400;
    const start    = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const val      = (target * ease).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countEl(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => obs.observe(el));
})();
