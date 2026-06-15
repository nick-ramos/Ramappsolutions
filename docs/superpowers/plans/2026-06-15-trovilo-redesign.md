# Trovilo Shopify — Full Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Organic/Botanical design system to the Trovilo Shopify store — updated CSS tokens, Playfair Display serif headlines, actual product images on homepage, zero emojis, and consistent botanical styling across homepage, collections, and product pages.

**Architecture:** All changes pushed to Shopify via Admin REST API (2026-04). No local Shopify CLI. Token at `/Users/nickramos/ramapp-shop/shopify_token.txt`. Shop: `jda9yp-1w.myshopify.com`. Active theme ID fetched dynamically.

**Tech Stack:** Shopify Liquid, Shopify Admin API 2026-04, Python requests, CSS custom properties

**Design Reference:** `docs/superpowers/specs/2026-06-15-full-site-redesign-design.md`

---

## Files Modified (via Shopify API)

| Shopify Asset Key | Change |
|-------------------|--------|
| `assets/trovilo-base.css` | Full botanical token set, Playfair import, component styles |
| `layout/theme.liquid` | Add Playfair Display Google Font link, fix popup styles, remove emoji |
| `sections/trovilo-home.liquid` | Rebuild hero with serif h1, real product images, pill buttons, no emoji |
| `config/settings_data.json` | Botanical color scheme values |

---

## Helper: Shopify API Uploader

All tasks use this shared upload function. Create it once at `/tmp/shopify_upload.py`:

```python
import requests, json

TOKEN = open('/Users/nickramos/ramapp-shop/shopify_token.txt').read().strip()
BASE  = 'https://jda9yp-1w.myshopify.com/admin/api/2026-04'
HDRS  = {'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json'}

def get_theme_id():
    r = requests.get(f'{BASE}/themes.json', headers=HDRS)
    return next(t['id'] for t in r.json()['themes'] if t['role'] == 'main')

def upload(theme_id, key, value):
    r = requests.put(
        f'{BASE}/themes/{theme_id}/assets.json',
        headers=HDRS,
        json={'asset': {'key': key, 'value': value}}
    )
    ok = r.status_code in (200, 201)
    print(f'  {"OK" if ok else "FAIL"} {key}' + ('' if ok else f': {r.text[:200]}'))
    return ok

def fetch(theme_id, key):
    r = requests.get(f'{BASE}/themes/{theme_id}/assets.json?asset[key]={key}', headers=HDRS)
    return r.json()['asset']['value']

def get_products(limit=6):
    r = requests.get(f'{BASE}/products.json?limit={limit}&fields=title,handle,images,variants', headers=HDRS)
    return r.json()['products']
```

---

## Task 1: Update Botanical CSS Tokens in trovilo-base.css

**Files:**
- Modify: `assets/trovilo-base.css` (via Shopify API)

- [ ] **Step 1: Fetch current trovilo-base.css**

```python
# Run: python3 /tmp/shopify_fetch.py
import sys
sys.path.insert(0, '/tmp')
import shopify_upload as s

theme_id = s.get_theme_id()
print(s.fetch(theme_id, 'assets/trovilo-base.css')[:500])
```

Run:
```bash
python3 /tmp/shopify_fetch.py
```

Expected: Current CSS with old variables. Note what already exists so we know what we're replacing.

- [ ] **Step 2: Push updated botanical token CSS**

Create `/tmp/push_tokens.py`:

```python
import sys
sys.path.insert(0, '/tmp')
import shopify_upload as s

BOTANICAL_CSS = """
/* ── Trovilo Botanical Design Tokens ─────────────────────────────── */
:root,
[class*="color-scheme-"],
[class*="color-"] {
  --color-background: 250 253 247;
  --color-foreground: 20 83 45;
  --color-foreground-secondary: 75 122 89;
  --color-button: 22 101 52;
  --color-button-text: 255 255 255;
  --color-button-border: 22 101 52;
  --color-secondary-button: 240 253 244;
  --color-secondary-button-text: 22 101 52;
  --color-border: 209 250 229;
  --color-shadow: 20 83 45;

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
  --shadow-sm:   0 1px 4px rgba(20,83,45,0.06);
  --shadow:      0 4px 16px rgba(20,83,45,0.10);
  --shadow-lg:   0 12px 40px rgba(20,83,45,0.14);
}

/* ── Global overrides ─────────────────────────────────────────────── */
body {
  background: var(--bg) !important;
  color: var(--body) !important;
  font-family: 'Nunito Sans', sans-serif !important;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Rubik', sans-serif !important;
  color: var(--primary) !important;
}

/* Playfair Display for display/hero h1 */
.hero-h1, .section-hero h1, .page-hero h1, h1.trovilo-headline {
  font-family: 'Playfair Display', serif !important;
  color: var(--primary) !important;
}

/* ── Navigation ───────────────────────────────────────────────────── */
.header,
.header__wrapper,
header[class*="header"] {
  background: rgba(250,253,247,0.96) !important;
  border-bottom: 1px solid var(--border) !important;
  backdrop-filter: blur(16px) !important;
}

/* ── Announcement bar ─────────────────────────────────────────────── */
.announcement-bar,
[class*="announcement"] {
  background: var(--primary2) !important;
  color: #ffffff !important;
}
.announcement-bar a,
.announcement-bar span {
  color: #ffffff !important;
}

/* ── Buttons ──────────────────────────────────────────────────────── */
.button,
.btn,
[class*="button--primary"],
input[type="submit"],
button[type="submit"] {
  background: var(--primary2) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: var(--radius-pill) !important;
  font-family: 'Nunito Sans', sans-serif !important;
  font-weight: 700 !important;
}

.button:hover,
[class*="button--primary"]:hover {
  background: var(--accent) !important;
}

[class*="button--secondary"],
.button--secondary {
  background: var(--accent-bg) !important;
  color: var(--primary2) !important;
  border: 1px solid var(--accent-lt) !important;
  border-radius: var(--radius-pill) !important;
}

/* ── Cards / Product tiles ────────────────────────────────────────── */
.card,
.product-card,
[class*="card__"] {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--radius) !important;
}

.card:hover,
.product-card:hover {
  border-color: var(--border-dark) !important;
  box-shadow: var(--shadow) !important;
}

/* ── Product price ────────────────────────────────────────────────── */
.price,
[class*="price"] {
  color: var(--primary2) !important;
  font-family: 'Rubik', sans-serif !important;
  font-weight: 700 !important;
}

/* ── Footer ───────────────────────────────────────────────────────── */
.footer,
footer {
  background: var(--surface2) !important;
  border-top: 1px solid var(--border) !important;
  color: var(--muted) !important;
}

/* ── Popup / Modal (nn-welcome-modal) ─────────────────────────────── */
#nn-welcome-modal {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  border-radius: 20px !important;
  box-shadow: 0 24px 64px rgba(20,83,45,0.15) !important;
}

.nn-modal-badge {
  background: var(--accent-bg) !important;
  border: 1px solid var(--accent-lt) !important;
  color: var(--primary2) !important;
  border-radius: var(--radius-pill) !important;
}

.nn-hl {
  color: var(--primary2) !important;
}

#nn-email-submit {
  background: var(--primary2) !important;
  color: #ffffff !important;
  border-radius: var(--radius-pill) !important;
  border: none !important;
  font-family: 'Nunito Sans', sans-serif !important;
  font-weight: 700 !important;
}

#nn-countdown-bar {
  background: var(--primary2) !important;
  color: #ffffff !important;
}

.nn-modal-close {
  color: var(--muted) !important;
}
"""

theme_id = s.get_theme_id()
print(f'Theme ID: {theme_id}')
s.upload(theme_id, 'assets/trovilo-base.css', BOTANICAL_CSS)
```

Run:
```bash
python3 /tmp/push_tokens.py
```

Expected: `OK assets/trovilo-base.css`

- [ ] **Step 3: Commit the local copy of this script**

```bash
cp /tmp/push_tokens.py /Users/nickramos/ramapp-shop/push_botanical_tokens.py
cd /Users/nickramos/ramapp-shop
git add push_botanical_tokens.py 2>/dev/null || true
```

(ramapp-shop may not be a git repo — skip git commit if so, just keep the file)

---

## Task 2: Add Playfair Display Font to Shopify Theme

**Files:**
- Modify: `layout/theme.liquid` (via Shopify API)

- [ ] **Step 1: Fetch theme.liquid and find the <head> font section**

```python
# /tmp/check_fonts.py
import sys
sys.path.insert(0, '/tmp')
import shopify_upload as s

theme_id = s.get_theme_id()
liquid = s.fetch(theme_id, 'layout/theme.liquid')

# Find Google Fonts link
idx = liquid.find('fonts.googleapis')
if idx >= 0:
    print('Found at:', idx)
    print(liquid[idx-50:idx+300])
else:
    print('No Google Fonts link found — will add to <head>')
    # Find </head>
    idx2 = liquid.find('</head>')
    print('</head> at:', idx2)
```

Run:
```bash
python3 /tmp/check_fonts.py
```

- [ ] **Step 2: Add Playfair Display to the font import**

Read the full `layout/theme.liquid`. Find the existing Google Fonts `<link>` tag. It likely looks like:

```html
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&family=Nunito+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

Replace it with a version that includes Playfair Display:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Rubik:wght@400;500;600;700;800&family=Nunito+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

Create `/tmp/add_playfair.py`:

```python
import sys
sys.path.insert(0, '/tmp')
import shopify_upload as s

theme_id = s.get_theme_id()
liquid = s.fetch(theme_id, 'layout/theme.liquid')

# Replace the fonts link — handle both possible existing states
OLD_FONTS = [
    'family=Rubik:wght@400;500;600;700;800&family=Nunito+Sans:wght@300;400;500;600;700&display=swap',
    'family=Rubik:wght@400;500;600;700;800&display=swap',
]

NEW_FONTS = 'family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Rubik:wght@400;500;600;700;800&family=Nunito+Sans:wght@300;400;500;600;700&display=swap'

updated = liquid
for old in OLD_FONTS:
    if old in updated:
        updated = updated.replace(old, NEW_FONTS)
        print(f'Replaced font string: {old[:50]}...')
        break
else:
    # Font link not found — inject before </head>
    FONT_LINK = f'\n<link href="https://fonts.googleapis.com/css2?{NEW_FONTS}" rel="stylesheet" />\n'
    updated = updated.replace('</head>', FONT_LINK + '</head>', 1)
    print('Injected new font link before </head>')

if updated == liquid:
    print('WARNING: No changes made — check the font link format in theme.liquid')
else:
    s.upload(theme_id, 'layout/theme.liquid', updated)
    print('Uploaded theme.liquid with Playfair Display')
```

Run:
```bash
python3 /tmp/add_playfair.py
```

Expected: `Replaced font string: ...` or `Injected new font link` then `Uploaded theme.liquid with Playfair Display`

---

## Task 3: Remove Emoji from theme.liquid Popup

**Files:**
- Modify: `layout/theme.liquid` (via Shopify API)

- [ ] **Step 1: Find emoji in theme.liquid**

```python
# /tmp/check_popup_emoji.py
import sys, re
sys.path.insert(0, '/tmp')
import shopify_upload as s

theme_id = s.get_theme_id()
liquid = s.fetch(theme_id, 'layout/theme.liquid')

emoji_pattern = re.compile("[\U0001F300-\U0001F9FF\U00002600-\U000027BF★→←✅🌿]", flags=re.UNICODE)
matches = emoji_pattern.findall(liquid)
print('Emoji found:', set(matches) if matches else 'NONE')
```

Run:
```bash
python3 /tmp/check_popup_emoji.py
```

- [ ] **Step 2: Remove emoji from theme.liquid**

Create `/tmp/clean_popup_emoji.py`:

```python
import sys, re
sys.path.insert(0, '/tmp')
import shopify_upload as s

theme_id = s.get_theme_id()
liquid = s.fetch(theme_id, 'layout/theme.liquid')

EMOJI_REPLACEMENTS = {
    '🎁': '', '✅': '', '🌿': '', '⭐': '', '✨': '',
    '🔥': '', '🎉': '', '→': '', '←': '', '★': '',
    '💚': '', '🛍️': '', '🛒': '',
}

updated = liquid
for emoji, replacement in EMOJI_REPLACEMENTS.items():
    updated = updated.replace(emoji, replacement)

if updated == liquid:
    print('No emoji found in theme.liquid — already clean')
else:
    # Clean up double spaces from removed emoji
    updated = re.sub(r'  +', ' ', updated)
    updated = re.sub(r'\n\s*\n\s*\n', '\n\n', updated)
    s.upload(theme_id, 'layout/theme.liquid', updated)
    print('Uploaded clean theme.liquid (emoji removed)')
```

Run:
```bash
python3 /tmp/clean_popup_emoji.py
```

Expected: Either `No emoji found` or `Uploaded clean theme.liquid`

---

## Task 4: Rebuild trovilo-home.liquid with Real Product Images

**Files:**
- Modify: `sections/trovilo-home.liquid` (via Shopify API)

This is the main homepage section. We rebuild it with:
- Playfair Display serif h1
- Pill buttons (no emoji)
- Trust signals as text only (no emoji)
- Real Shopify product images in the featured products grid

- [ ] **Step 1: Fetch real product data**

```python
# /tmp/fetch_products.py
import sys
sys.path.insert(0, '/tmp')
import shopify_upload as s

products = s.get_products(limit=6)
for p in products:
    img = p['images'][0]['src'] if p['images'] else None
    price = p['variants'][0]['price'] if p['variants'] else '0.00'
    print(f"{p['title']} | ${price} | {img}")
```

Run:
```bash
python3 /tmp/fetch_products.py
```

Copy the output — you need the actual title, price, and image URL for each of the 6 products to embed in the section below.

- [ ] **Step 2: Build and push the new trovilo-home.liquid**

Create `/tmp/push_home.py`. Replace `PRODUCT_DATA` with the actual 6 products from Step 1:

```python
import sys
sys.path.insert(0, '/tmp')
import shopify_upload as s

# Replace these with actual product data from Step 1
PRODUCT_DATA = [
    # (title, price, image_url, handle)
    # Fill in from Step 1 output
]

products = s.get_products(limit=6)
PRODUCT_DATA = [
    (
        p['title'],
        p['variants'][0]['price'] if p['variants'] else '0.00',
        p['images'][0]['src'] if p['images'] else '',
        p['handle']
    )
    for p in products
]

# Build product cards HTML
cards_html = ''
for title, price, img_url, handle in PRODUCT_DATA:
    cards_html += f'''
        <a href="/products/{handle}" class="tr-product-card">
          <div class="tr-product-img">
            <img src="{img_url}" alt="{title}" loading="lazy" />
          </div>
          <div class="tr-product-body">
            <div class="tr-product-title">{title}</div>
            <div class="tr-product-price">${price}</div>
          </div>
        </a>'''

SECTION = f"""{{% comment %}}Trovilo Homepage — Organic/Botanical Design{{% endcomment %}}

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

{{{{ 'trovilo-base.css' | asset_url | stylesheet_tag }}}}

<style>
  .tr-nav {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 68px;
    background: rgba(250,253,247,0.96);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid #d1fae5;
    position: sticky;
    top: 0;
    z-index: 100;
  }}

  .tr-logo {{
    font-family: 'Rubik', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: #14532d;
    text-decoration: none;
  }}

  .tr-logo span {{ color: #16a34a; }}

  .tr-hero {{
    max-width: 1160px;
    margin: 0 auto;
    padding: 80px 24px 60px;
    text-align: center;
  }}

  .tr-hero-eyebrow {{
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #16a34a;
    margin-bottom: 16px;
  }}

  .tr-hero-h1 {{
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 5vw, 58px);
    font-weight: 700;
    color: #14532d;
    line-height: 1.15;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }}

  .tr-hero-h1 em {{
    font-style: italic;
    color: #16a34a;
  }}

  .tr-hero-sub {{
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.05rem;
    color: #4b7a59;
    line-height: 1.75;
    max-width: 540px;
    margin: 0 auto 32px;
  }}

  .tr-btns {{
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }}

  .tr-btn-primary {{
    background: #166534;
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 13px 32px;
    border-radius: 100px;
    text-decoration: none;
    display: inline-block;
    transition: background 0.2s;
  }}

  .tr-btn-primary:hover {{ background: #16a34a; }}

  .tr-btn-secondary {{
    background: #f0fdf4;
    color: #166534;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 13px 32px;
    border-radius: 100px;
    border: 1px solid #bbf7d0;
    text-decoration: none;
    display: inline-block;
    transition: border-color 0.2s;
  }}

  .tr-btn-secondary:hover {{ border-color: #86efac; }}

  .tr-trust {{
    display: flex;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    color: #4b7a59;
  }}

  .tr-trust-item {{
    display: flex;
    align-items: center;
    gap: 6px;
  }}

  .tr-trust-dot {{
    width: 6px;
    height: 6px;
    background: #16a34a;
    border-radius: 50%;
    flex-shrink: 0;
  }}

  .tr-products {{
    background: #f0fdf4;
    padding: 64px 24px;
  }}

  .tr-products-inner {{
    max-width: 1160px;
    margin: 0 auto;
  }}

  .tr-section-eyebrow {{
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #16a34a;
    text-align: center;
    margin-bottom: 10px;
  }}

  .tr-section-title {{
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 700;
    color: #14532d;
    text-align: center;
    margin-bottom: 40px;
  }}

  .tr-products-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }}

  @media (max-width: 768px) {{
    .tr-products-grid {{ grid-template-columns: repeat(2, 1fr); }}
    .tr-nav {{ padding: 0 20px; }}
    .tr-hero {{ padding: 48px 20px 40px; }}
    .tr-trust {{ gap: 12px; }}
  }}

  @media (max-width: 480px) {{
    .tr-products-grid {{ grid-template-columns: 1fr; }}
  }}

  .tr-product-card {{
    background: #ffffff;
    border: 1px solid #d1fae5;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    display: block;
    transition: border-color 0.2s, box-shadow 0.2s;
  }}

  .tr-product-card:hover {{
    border-color: #86efac;
    box-shadow: 0 4px 16px rgba(20,83,45,0.10);
  }}

  .tr-product-img {{
    aspect-ratio: 4/3;
    overflow: hidden;
    background: #f0fdf4;
  }}

  .tr-product-img img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }}

  .tr-product-card:hover .tr-product-img img {{
    transform: scale(1.04);
  }}

  .tr-product-body {{
    padding: 14px 16px;
  }}

  .tr-product-title {{
    font-family: 'Rubik', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #14532d;
    margin-bottom: 4px;
    line-height: 1.4;
  }}

  .tr-product-price {{
    font-family: 'Rubik', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #166534;
  }}
</style>

<!-- HERO -->
<section class="tr-hero">
  <div class="tr-hero-eyebrow">Curated Finds for Modern Living</div>
  <h1 class="tr-hero-h1">Life is better with<br /><em>beautiful things.</em></h1>
  <p class="tr-hero-sub">Hand-picked home goods, wellness essentials, and everyday luxuries — sourced with intention, delivered with care.</p>
  <div class="tr-btns">
    <a href="/collections/all" class="tr-btn-primary">Shop All Products</a>
    <a href="/collections" class="tr-btn-secondary">Browse Collections</a>
  </div>
  <div class="tr-trust">
    <div class="tr-trust-item"><div class="tr-trust-dot"></div>Free shipping over $50</div>
    <div class="tr-trust-item"><div class="tr-trust-dot"></div>Eco-conscious sourcing</div>
    <div class="tr-trust-item"><div class="tr-trust-dot"></div>4.9 / 5 average rating</div>
  </div>
</section>

<!-- FEATURED PRODUCTS -->
<section class="tr-products">
  <div class="tr-products-inner">
    <div class="tr-section-eyebrow">Our Products</div>
    <h2 class="tr-section-title">Featured Finds</h2>
    <div class="tr-products-grid">
{cards_html}
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="/collections/all" class="tr-btn-primary">View All Products</a>
    </div>
  </div>
</section>

{{% schema %}}
{{
  "name": "Trovilo Home",
  "settings": []
}}
{{% endschema %}}"""

theme_id = s.get_theme_id()
print(f'Theme ID: {theme_id}')
s.upload(theme_id, 'sections/trovilo-home.liquid', SECTION)
```

Run:
```bash
python3 /tmp/push_home.py
```

Expected: `OK sections/trovilo-home.liquid`

---

## Task 5: Update Shopify Color Schemes

**Files:**
- Modify: `config/settings_data.json` (via Shopify API)

- [ ] **Step 1: Fetch current settings_data.json**

```python
# /tmp/fetch_settings.py
import sys, json
sys.path.insert(0, '/tmp')
import shopify_upload as s

theme_id = s.get_theme_id()
data_str = s.fetch(theme_id, 'config/settings_data.json')
data = json.loads(data_str)

# Show color scheme keys
if 'current' in data:
    schemes = data['current'].get('color_schemes', {})
    print('Color scheme keys:', list(schemes.keys()))
elif 'sections' in data:
    print('No top-level color_schemes found — checking structure...')
    print(list(data.keys()))
```

Run:
```bash
python3 /tmp/fetch_settings.py
```

- [ ] **Step 2: Update all color schemes to botanical palette**

Create `/tmp/push_color_schemes.py`:

```python
import sys, json
sys.path.insert(0, '/tmp')
import shopify_upload as s

BOTANICAL_SCHEME = {
    "background": "#fafdf7",
    "background_2": "#f0fdf4",
    "foreground_heading": "#14532d",
    "foreground": "#1e293b",
    "foreground_2": "#4b7a59",
    "primary_button_background": "#166534",
    "primary_button_text": "#ffffff",
    "primary_button_border": "#166534",
    "primary_button_hover_background": "#16a34a",
    "secondary_button_background": "#f0fdf4",
    "secondary_button_text": "#166534",
    "secondary_button_border": "#bbf7d0",
    "secondary_button_hover_background": "#dcfce7",
    "link": "#166534",
    "shadow": "#14532d"
}

theme_id = s.get_theme_id()
data_str = s.fetch(theme_id, 'config/settings_data.json')
data = json.loads(data_str)

# Update all color schemes
updated = False
if 'current' in data and 'color_schemes' in data['current']:
    for scheme_key in data['current']['color_schemes']:
        data['current']['color_schemes'][scheme_key] = {
            **data['current']['color_schemes'][scheme_key],
            **BOTANICAL_SCHEME
        }
        updated = True
    print(f'Updated {len(data["current"]["color_schemes"])} color schemes')
elif 'current' in data:
    # Some themes store colors directly
    data['current'].update(BOTANICAL_SCHEME)
    updated = True
    print('Updated top-level color settings')

if updated:
    s.upload(theme_id, 'config/settings_data.json', json.dumps(data, indent=2))
else:
    print('WARNING: Could not find color_schemes in settings_data.json — check structure from Step 1')
```

Run:
```bash
python3 /tmp/push_color_schemes.py
```

Expected: `Updated N color schemes` then `OK config/settings_data.json`

---

## Task 6: Verify Live Store

- [ ] **Step 1: Check the Trovilo store homepage**

Open `https://jda9yp-1w.myshopify.com` in a browser (or use the custom domain if set up).

Verify:
- Hero h1 renders in Playfair Display serif font (italic "beautiful things.")
- Buttons are pill-shaped (border-radius: 100px)
- Product grid shows 6 real product photos (not placeholders, not emoji)
- No emoji visible anywhere on the page
- Background is soft green-white (#fafdf7), not dark purple

- [ ] **Step 2: Check announcement bar and nav**

Verify:
- Announcement bar (if visible) is green (#166534), not dark purple
- Nav background is translucent light green, not dark
- Logo reads "Trovilo" in Rubik 800, dark forest green

- [ ] **Step 3: Hard refresh to clear Shopify CDN cache**

If colors still look wrong, do a hard refresh (Cmd+Shift+R on Mac) and also try opening in an incognito window.

- [ ] **Step 4: Save the push scripts**

```bash
cp /tmp/push_tokens.py /Users/nickramos/ramapp-shop/push_botanical_tokens.py
cp /tmp/add_playfair.py /Users/nickramos/ramapp-shop/push_playfair_font.py
cp /tmp/clean_popup_emoji.py /Users/nickramos/ramapp-shop/push_clean_emoji.py
cp /tmp/push_home.py /Users/nickramos/ramapp-shop/push_trovilo_home_v2.py
cp /tmp/push_color_schemes.py /Users/nickramos/ramapp-shop/push_color_schemes.py
```

Done. All Trovilo changes are live on Shopify.
