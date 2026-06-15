# Full Site Redesign — Design Spec
**Date:** 2026-06-15
**Approach:** Option A — Token-first, then propagate
**Scope:** All pages on both projects

---

## Projects in Scope

| Project | URL | Stack | Pages |
|---------|-----|-------|-------|
| Ramapp Solutions | ramappsolutions.com | Static HTML + CSS | 20 HTML files |
| Trovilo | shop.ramappsolutions.com | Shopify Liquid | Homepage, collections, products, cart, theme |

---

## Project 1 — Ramapp Solutions

### Style Direction: Dark Prestige
Target audience: Business owners and SMBs hiring for AI/automation work.
Visual language: Elite consulting, not startup. Authority through restraint.

### Color Tokens

```css
:root {
  --bg:         #080b12;
  --surface:    #0d1120;
  --surface2:   #151b2e;
  --border:     rgba(255, 255, 255, 0.07);
  --border-gold: rgba(245, 200, 50, 0.25);

  --gold:       #f5c832;
  --gold-dk:    #e6b420;
  --gold-bg:    rgba(245, 200, 50, 0.08);
  --gold-bg2:   rgba(245, 200, 50, 0.15);

  --text:       #f1f5f9;
  --muted:      #94a3b8;
  --subtle:     #475569;

  --radius:     10px;
  --radius-lg:  16px;
  --shadow:     0 4px 20px rgba(0, 0, 0, 0.4);
  --shadow-lg:  0 12px 48px rgba(0, 0, 0, 0.6);
}
```

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / h1 | Poppins | 800 | 48–64px (hero), 36px (section) |
| Heading / h2 | Poppins | 700 | 28–32px |
| Subheading / h3 | Poppins | 600 | 18–20px |
| Body | Inter | 400 | 15–16px, line-height 1.7 |
| Label / eyebrow | Inter | 700 | 10–11px, letter-spacing 2.5px, uppercase |
| Mono / code | JetBrains Mono | 400 | 13–14px |

### Component Standards

**Buttons**
- Primary: `background: var(--gold)`, `color: #080b12`, `font-weight: 700`, `border-radius: 8px`, `padding: 12px 24px`
- Secondary: `background: transparent`, `border: 1px solid var(--border-gold)`, `color: var(--gold)`, same radius/padding
- Hover: primary darkens to `--gold-dk`; secondary fills with `--gold-bg2`

**Cards**
- Background: `var(--surface)`, border: `1px solid var(--border)`, radius: `var(--radius)`
- Hover: border shifts to `var(--border-gold)`, subtle `--gold-bg` background wash
- Icon containers: `background: var(--gold-bg)`, `border-radius: 8px`, `padding: 10px`

**Nav**
- Background: `rgba(8, 11, 18, 0.92)` + `backdrop-filter: blur(16px)`
- Logo: Poppins 800, `var(--gold)`
- Links: Inter 500, `var(--muted)` → `var(--text)` on hover
- CTA link: `var(--gold)`, bold

**Section eyebrows**
- Inter 700, `var(--gold)`, 10px, letter-spacing 3px, uppercase
- Used above every major section heading

**Badges / tags**
- `background: var(--gold-bg)`, `color: var(--gold)`, `border: 1px solid var(--border-gold)`
- `border-radius: 4px`, `font-size: 9px`, `letter-spacing: 1.5px`, uppercase

### Page-Specific Notes

- **index.html**: Refine hero copy, add eyebrow label, ensure 3-col service cards use updated card styles
- **pricing.html**: Add "MOST POPULAR" badge on middle tier, gold border on featured card
- **services.html**: Icon grid updates, consistent card hover states
- **work.html**: Portfolio cards need gold accent on hover
- **contact.html**: Form inputs get `--surface` bg, `--border` outline, focus ring in `--gold`
- **All pages**: Nav gets blur/opacity treatment; footer gets `--surface` bg instead of raw `--bg`

---

## Project 2 — Trovilo (Shopify)

### Style Direction: Organic/Botanical
Target audience: Lifestyle shoppers, eco-conscious buyers, modern home goods.
Visual language: Warm, trustworthy, nature-forward. Boutique without being precious.

### Color Tokens

```css
:root {
  --bg:          #fafdf7;
  --surface:     #ffffff;
  --surface2:    #f0fdf4;
  --border:      #d1fae5;
  --border-dark: #86efac;

  --primary:     #14532d;
  --primary2:    #166534;
  --accent:      #16a34a;
  --accent-lt:   #bbf7d0;
  --accent-bg:   #f0fdf4;

  --warm:        #fef9c3;
  --warm-border: #fde68a;

  --text:        #14532d;
  --body:        #1e293b;
  --muted:       #4b7a59;
  --subtle:      #86a892;

  --radius:      12px;
  --radius-lg:   20px;
  --radius-pill: 100px;
  --shadow-sm:   0 1px 4px rgba(20, 83, 45, 0.06);
  --shadow:      0 4px 16px rgba(20, 83, 45, 0.10);
  --shadow-lg:   0 12px 40px rgba(20, 83, 45, 0.14);
}
```

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / h1 | Playfair Display | 700 | 48–56px (hero), 32–36px (section) |
| Heading / h2 | Rubik | 700 | 24–28px |
| UI / h3, nav, labels | Rubik | 500–600 | 14–18px |
| Body | Nunito Sans | 400 | 15–16px, line-height 1.75 |
| Label / eyebrow | Nunito Sans | 700 | 10–11px, letter-spacing 2px, uppercase |

**Key change from current:** Add Playfair Display for all h1/display headings. This is the primary upgrade that makes the brand feel editorial and premium rather than generic e-commerce.

### Component Standards

**Buttons**
- Primary: `background: var(--primary2)`, `color: #fff`, `border-radius: var(--radius-pill)`, `padding: 12px 28px`, `font-weight: 700`
- Secondary: `background: var(--accent-bg)`, `color: var(--primary2)`, `border: 1px solid var(--accent-lt)`, same radius/padding
- Hover: primary lightens to `--accent`; secondary border darkens to `--border-dark`

**Product Cards**
- Background: `var(--surface)`, border: `1px solid var(--border)`, radius: `var(--radius)`
- Hover: subtle lift with `var(--shadow)`, border brightens to `--border-dark`
- Price: Rubik 700, `var(--primary2)`
- Category tag: Nunito Sans 700, uppercase, `var(--accent)`, `var(--accent-bg)` pill

**Nav**
- Background: `rgba(250, 253, 247, 0.94)` + `backdrop-filter: blur(16px)`
- Border-bottom: `1px solid var(--border)`
- Logo: Rubik 800, `var(--primary)`, accent letter in `var(--accent)`
- Announcement bar: `var(--primary2)` background, white text

**Trust signals** (add to homepage)
- Free shipping threshold, eco-sourcing badge, star rating — displayed as a small flex row below CTA
- Style: Nunito Sans 13px, `var(--muted)`, emoji + text

**Shopify-specific**
- All Shopify color scheme variables updated to match (RGB format for Shopify)
- `trovilo-base.css` extended with botanical token overrides
- `layout/theme.liquid` popup updated with organic palette
- Collection page grid: 3-col desktop, 2-col tablet, 1-col mobile

---

## Corrections & Hard Requirements

1. **Ramapp Solutions nav/logo**: Display the hexagon "R" SVG logo (`/assets/favicon.svg`) as an `<img>` tag alongside the full wordmark "Ramapp Solutions" — never just "ramapp." or abbreviated text.
2. **No emojis anywhere**: Both sites must be 100% emoji-free. Replace all emoji with SVG icons (Heroicons/Lucide inline SVG) or plain text. This includes nav, hero, trust signals, cards, badges, section labels, and the Trovilo popup.
3. **Trovilo product images**: Product cards on the homepage must use actual Shopify CDN image URLs fetched via the Admin API — never placeholder emoji, icons, or stock imagery. Fetch top 6 products and embed real `<img src="...">` tags in the section liquid.

---

## Implementation Order

### Phase 1 — Design Tokens (both projects, ~1 hour)
1. Update `ramappsolutions/css/style.min.css` with complete Ramapp token set
2. Update Shopify `assets/trovilo-base.css` with complete Trovilo token set
3. Add Playfair Display font import to Trovilo theme

### Phase 2 — Ramapp Solutions Pages (all 20 HTML files)
1. Nav: blur/opacity, gold logo, CTA link styling
2. Footer: surface bg, consistent link colors
3. Homepage hero: eyebrow, headline refinement, btn styles
4. Pricing page: featured card gold border, MOST POPULAR badge
5. Services, Work, Contact: card hover, form inputs, button consistency
6. All remaining pages: inherit from tokens, spot-fix any inline overrides

### Phase 3 — Trovilo Shopify Theme
1. Push updated color tokens via API (`assets/trovilo-base.css`)
2. Push Playfair Display font addition to `layout/theme.liquid`
3. Update `sections/trovilo-home.liquid` with revised hero (Playfair h1, trust row, pill buttons)
4. Update collection/product liquid sections for botanical card styles
5. Verify popup (`#nn-welcome-modal`) matches new palette
6. Push updated `config/settings_data.json`

### Phase 4 — QA
1. Screenshot key pages on ramappsolutions.com after GitHub push
2. Screenshot Trovilo homepage, collection page, product page
3. Check mobile responsiveness on both

---

## Success Criteria
- Zero warm-brown or purple remnants on either site
- All pages on ramappsolutions.com share the same nav, footer, card, and button styles
- Trovilo hero headline renders in Playfair Display
- Both sites pass a visual consistency check across all pages
