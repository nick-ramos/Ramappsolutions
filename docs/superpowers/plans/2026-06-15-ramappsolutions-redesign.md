# Ramapp Solutions — Full Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Dark Prestige design system across all 20 HTML pages of ramappsolutions.com — updated CSS tokens, correct logo/wordmark, zero emojis, and consistent nav/card/button styles site-wide.

**Architecture:** Token-first. Update `css/style.min.css` with the full design token set, then patch all 20 HTML files to remove emojis and ensure logo/nav consistency. No page rebuilds from scratch — targeted, minimal diffs only.

**Tech Stack:** Vanilla HTML/CSS, Poppins + Inter + JetBrains Mono (Google Fonts), GitHub Pages deployment

**Design Reference:** `docs/superpowers/specs/2026-06-15-full-site-redesign-design.md`

---

## Files Modified

| File | Change |
|------|--------|
| `css/style.min.css` | Add missing design tokens, refine card/button/nav rules |
| `assets/favicon.svg` | Already correct — hexagon R in gold |
| `index.html` | Logo markup, emoji removal, hero eyebrow, card styles |
| `services.html` | Emoji removal, card hover consistency |
| `pricing.html` | Featured card gold border, MOST POPULAR badge (text only) |
| `work.html` | Emoji removal, card hover gold accent |
| `contact.html` | Form input styles, emoji removal |
| `process.html` | Emoji removal |
| `blog.html` | Emoji removal |
| `about.html` (if exists) | Emoji removal |
| All remaining `.html` | Emoji removal via batch sed |

---

## Task 1: Extend CSS Design Tokens

**Files:**
- Modify: `css/style.min.css` (first ~200 chars — the `:root` block)

The current `:root` uses `--cyan` for gold. We extend it with canonical aliases and add missing tokens. We do NOT rename `--cyan` (would break 17 pages) — we add `--gold` as an alias.

- [ ] **Step 1: Read the current :root block**

```bash
head -c 600 /Users/nickramos/ramappsolutions/css/style.min.css
```

Expected: See `:root{--bg:#080b12;--bg-1:#0d1120;...--cyan:#f5c832;...}`

- [ ] **Step 2: Prepend updated :root with new tokens to style.min.css**

Open `css/style.min.css`. The file starts with `*,*::before...`. Find the `:root{` block and replace it with the extended version below.

Find this exact string at the start of the file:
```
:root{--bg:#080b12;--bg-1:#0d1120;--bg-2:#111827;--border:rgba(255,255,255,0.08);--border-hi:rgba(245,200,60,0.35);--cyan:#f5c832;--cyan-dim:rgba(245,200,50,0.10);--cyan-glow:rgba(245,200,50,0.22);--green:#34d399;--green-dim:rgba(52,211,153,0.12);--purple:#818cf8;--text:#f1f5f9;--text-dim:#64748b;--text-muted:#94a3b8;--font:'Poppins','Inter',sans-serif;--mono:'JetBrains Mono',monospace;--radius:16px;--radius-sm:10px;--max-w:1160px;--nav-h:72px}
```

Replace with:
```
:root{--bg:#080b12;--bg-1:#0d1120;--bg-2:#111827;--surface:#0d1120;--surface2:#151b2e;--border:rgba(255,255,255,0.07);--border-hi:rgba(245,200,50,0.25);--cyan:#f5c832;--gold:#f5c832;--gold-dk:#e6b420;--gold-bg:rgba(245,200,50,0.08);--gold-bg2:rgba(245,200,50,0.15);--cyan-dim:rgba(245,200,50,0.08);--cyan-glow:rgba(245,200,50,0.22);--green:#34d399;--green-dim:rgba(52,211,153,0.12);--purple:#818cf8;--text:#f1f5f9;--muted:#94a3b8;--subtle:#475569;--text-dim:#64748b;--text-muted:#94a3b8;--font:'Poppins','Inter',sans-serif;--mono:'JetBrains Mono',monospace;--radius:16px;--radius-sm:10px;--max-w:1160px;--nav-h:72px;--shadow:0 4px 20px rgba(0,0,0,0.4);--shadow-lg:0 12px 48px rgba(0,0,0,0.6)}
```

- [ ] **Step 3: Add card hover gold accent rule**

Find the `.card` or first card-related rule in the CSS. At the end of the CSS file, append:

```css
.card:hover,.feature-card:hover,.service-card:hover{border-color:var(--border-hi)!important;background:linear-gradient(135deg,var(--gold-bg),transparent)!important}.badge--popular{background:var(--gold-bg);color:var(--gold);border:1px solid var(--border-hi);border-radius:4px;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:3px 8px;display:inline-block}.card--featured{border-color:var(--border-hi)!important;box-shadow:0 0 0 1px var(--border-hi),var(--shadow-lg)!important}
```

- [ ] **Step 4: Verify no syntax errors by checking token usage**

```bash
grep -c "var(--gold)" /Users/nickramos/ramappsolutions/css/style.min.css
```

Expected: 1 or more (the new rules we added)

- [ ] **Step 5: Commit**

```bash
cd /Users/nickramos/ramappsolutions
git add css/style.min.css
git commit -m "feat: extend CSS design tokens with gold aliases, card hover, featured badge"
```

---

## Task 2: Fix Logo — Add Hexagon R + "Ramapp Solutions" Wordmark

**Files:**
- Modify: All 17 HTML files that contain `nav__logo` / `logo-svg`

The current nav SVG shows "Ramapp" large + "Solutions" small in gray. The user wants the hexagon R logo (`assets/favicon.svg`) shown alongside the full "Ramapp Solutions" wordmark — both clearly visible.

New logo markup (replace the existing `<a href="index.html" class="nav__logo">...</a>` in nav):

```html
<a href="index.html" class="nav__logo" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
  <img src="/assets/favicon.svg" alt="Ramapp Solutions logo" width="36" height="36" style="display:block;flex-shrink:0;" />
  <span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.15rem;color:#f1f5f9;letter-spacing:-0.3px;white-space:nowrap;">Ramapp <span style="color:#f5c832;">Solutions</span></span>
</a>
```

Note: Pages in subdirectories need `../assets/favicon.svg`. All pages are at root level so `/assets/favicon.svg` works everywhere.

- [ ] **Step 1: Check the exact nav logo block in index.html**

```bash
sed -n '252,260p' /Users/nickramos/ramappsolutions/index.html
```

Expected: The `<a href="index.html" class="nav__logo">` block with an inner `<svg class="logo-svg">`

- [ ] **Step 2: Replace logo in index.html**

In `index.html`, find:
```html
      <a href="index.html" class="nav__logo">
        <svg class="logo-svg" viewBox="0 0 220 62" xmlns="http://www.w3.org/2000/svg" aria-label="Ramapp Solutions">
          <text x="0" y="40" font-family="Poppins,Inter,sans-serif" font-weight="800" font-size="36" fill="#f1f5f9" letter-spacing="-1">Ramapp</text>
          <line x1="0" y1="46" x2="198" y2="46" stroke="#f5c832" stroke-width="1.5"/>
          <text x="198" y="60" font-family="Inter,sans-serif" font-weight="400" font-size="10" fill="#64748b" letter-spacing="4" text-anchor="end">Solutions</text>
        </svg>
      </a>
```

Replace with:
```html
      <a href="index.html" class="nav__logo" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
        <img src="/assets/favicon.svg" alt="Ramapp Solutions logo" width="36" height="36" style="display:block;flex-shrink:0;" />
        <span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.15rem;color:#f1f5f9;letter-spacing:-0.3px;white-space:nowrap;">Ramapp <span style="color:#f5c832;">Solutions</span></span>
      </a>
```

- [ ] **Step 3: Apply same replacement to all other pages with logo**

Run this script to update all 17 pages at once. Create a file `/tmp/fix_logo.py`:

```python
import os, re

OLD = '''      <a href="index.html" class="nav__logo">
        <svg class="logo-svg" viewBox="0 0 220 62" xmlns="http://www.w3.org/2000/svg" aria-label="Ramapp Solutions">
          <text x="0" y="40" font-family="Poppins,Inter,sans-serif" font-weight="800" font-size="36" fill="#f1f5f9" letter-spacing="-1">Ramapp</text>
          <line x1="0" y1="46" x2="198" y2="46" stroke="#f5c832" stroke-width="1.5"/>
          <text x="198" y="60" font-family="Inter,sans-serif" font-weight="400" font-size="10" fill="#64748b" letter-spacing="4" text-anchor="end">Solutions</text>
        </svg>
      </a>'''

NEW = '''      <a href="index.html" class="nav__logo" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
        <img src="/assets/favicon.svg" alt="Ramapp Solutions logo" width="36" height="36" style="display:block;flex-shrink:0;" />
        <span style="font-family:\'Poppins\',sans-serif;font-weight:800;font-size:1.15rem;color:#f1f5f9;letter-spacing:-0.3px;white-space:nowrap;">Ramapp <span style="color:#f5c832;">Solutions</span></span>
      </a>'''

path = '/Users/nickramos/ramappsolutions'
count = 0
for fname in os.listdir(path):
    if not fname.endswith('.html'):
        continue
    fpath = os.path.join(path, fname)
    content = open(fpath).read()
    if OLD in content:
        open(fpath, 'w').write(content.replace(OLD, NEW))
        print(f'  Fixed: {fname}')
        count += 1

print(f'\nTotal: {count} files updated')
```

Run it:
```bash
python3 /tmp/fix_logo.py
```

Expected output: ~17 files updated

- [ ] **Step 4: Verify index.html has the new markup**

```bash
grep -A3 'nav__logo' /Users/nickramos/ramappsolutions/index.html | head -8
```

Expected: Should show `<img src="/assets/favicon.svg"` and `Ramapp Solutions` span

- [ ] **Step 5: Also fix footer logo (same SVG appears in footer on most pages)**

```bash
grep -n "logo-svg--sm\|footer.*nav__logo\|footer.*logo-svg" /Users/nickramos/ramappsolutions/index.html | head -5
```

Check the footer logo markup. If it's the same SVG pattern, create `/tmp/fix_footer_logo.py`:

```python
import os, re

OLD = '''        <a href="index.html" class="nav__logo">
          <svg class="logo-svg logo-svg--sm" viewBox="0 0 220 62" xmlns="http://www.w3.org/2000/svg">'''

NEW = '''        <a href="index.html" class="nav__logo" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
          <img src="/assets/favicon.svg" alt="Ramapp Solutions logo" width="28" height="28" style="display:block;flex-shrink:0;" />
          <span style="font-family:\'Poppins\',sans-serif;font-weight:800;font-size:1rem;color:#f1f5f9;letter-spacing:-0.3px;">Ramapp <span style="color:#f5c832;">Solutions</span></span>'''

# Also need to remove the closing </svg></a> and replace with just </a>
path = '/Users/nickramos/ramappsolutions'
for fname in os.listdir(path):
    if not fname.endswith('.html'):
        continue
    fpath = os.path.join(path, fname)
    content = open(fpath).read()
    if OLD in content:
        # Replace opening
        content = content.replace(OLD, NEW)
        # Remove the old SVG content + closing tag that follows (find and remove the svg inner content + </svg>)
        content = re.sub(r'(<img src="/assets/favicon\.svg".*?</span>\s*)(.*?</svg>\s*)(</a>)', r'\1\3', content, flags=re.DOTALL)
        open(fpath, 'w').write(content)
        print(f'  Fixed footer: {fname}')
```

Run it:
```bash
python3 /tmp/fix_footer_logo.py
```

- [ ] **Step 6: Commit**

```bash
cd /Users/nickramos/ramappsolutions
git add *.html
git commit -m "feat: update nav and footer logo to hexagon R + Ramapp Solutions wordmark"
```

---

## Task 3: Remove All Emojis Site-Wide

**Files:**
- Modify: All 20 HTML files

Emojis found: ★ (35 uses), → (17 uses), 🤖 🚀 🔧 📊 💡 ⚡ 💼 🏡 ⭐ ✨ ← (1–2 each)

Replacement strategy:
- ★ in star ratings → replace with the text pattern `★★★★★` → `5/5` or remove and use plain `5.0`
- ★ as decorative bullet → replace with `–` (en dash)
- → as CTA arrow → remove (the text alone is sufficient)
- ← as back arrow → remove
- Emoji icons (🤖 🚀 etc.) → replace with a simple inline SVG or remove entirely

- [ ] **Step 1: Audit all emoji occurrences**

```bash
grep -rn '[🌿⚡🤖📊✅⭐🏡🕯🌱🎯💡🔧📈🚀💼🎨🛡️✨🔥💪★→←]' /Users/nickramos/ramappsolutions/*.html | grep -v "logo-concepts\|themes-preview"
```

Read the output carefully — note what each emoji represents in context before the automated replacement.

- [ ] **Step 2: Remove inline emoji icons (🤖 🚀 🔧 📊 💡 ⚡ 💼 🏡 ⭐ ✨)**

```bash
cd /Users/nickramos/ramappsolutions
python3 - <<'EOF'
import os, re

# Map of emoji to replacement (empty string = remove entirely)
REPLACEMENTS = {
    '🤖': '', '🚀': '', '🔧': '', '📊': '', '💡': '',
    '⚡': '', '💼': '', '🏡': '', '⭐': '', '✨': '',
    '🎯': '', '📈': '', '🎨': '', '🛡️': '', '🔥': '', '💪': '',
    '✅': '', '🌿': '', '🕯️': '', '🌱': '', '🏠': '',
}

path = '/Users/nickramos/ramappsolutions'
for fname in os.listdir(path):
    if not fname.endswith('.html') or fname in ('logo-concepts.html','logo-concepts-2.html','themes-preview.html'):
        continue
    fpath = os.path.join(path, fname)
    content = open(fpath).read()
    original = content
    for emoji, replacement in REPLACEMENTS.items():
        content = content.replace(emoji, replacement)
    if content != original:
        open(fpath, 'w').write(content)
        print(f'  Cleaned: {fname}')
EOF
```

- [ ] **Step 3: Replace → arrows (used as decorative CTA arrows)**

```bash
cd /Users/nickramos/ramappsolutions
python3 - <<'EOF'
import os

path = '/Users/nickramos/ramappsolutions'
for fname in os.listdir(path):
    if not fname.endswith('.html') or fname in ('logo-concepts.html','logo-concepts-2.html','themes-preview.html'):
        continue
    fpath = os.path.join(path, fname)
    content = open(fpath).read()
    original = content
    # Remove → and ← when used as standalone arrow characters
    content = content.replace(' →', '').replace('→', '').replace(' ←', '').replace('←', '')
    if content != original:
        open(fpath, 'w').write(content)
        print(f'  Arrows removed: {fname}')
EOF
```

- [ ] **Step 4: Replace ★ stars**

```bash
cd /Users/nickramos/ramappsolutions
python3 - <<'EOF'
import os, re

path = '/Users/nickramos/ramappsolutions'
for fname in os.listdir(path):
    if not fname.endswith('.html') or fname in ('logo-concepts.html','logo-concepts-2.html','themes-preview.html'):
        continue
    fpath = os.path.join(path, fname)
    content = open(fpath).read()
    original = content
    # ★★★★★ (5 stars) → "5.0 / 5"
    content = content.replace('★★★★★', '5.0 / 5')
    # ★★★★☆ → "4.0 / 5"
    content = content.replace('★★★★☆', '4.0 / 5')
    # Standalone ★ used as bullet → en dash
    content = re.sub(r'(?<![★])★(?![★])', '–', content)
    if content != original:
        open(fpath, 'w').write(content)
        print(f'  Stars replaced: {fname}')
EOF
```

- [ ] **Step 5: Verify no emoji remain**

```bash
python3 - <<'EOF'
import os, re

emoji_pattern = re.compile(
    "[\U0001F300-\U0001F9FF\U00002600-\U000027BF★→←]",
    flags=re.UNICODE
)

path = '/Users/nickramos/ramappsolutions'
found = False
for fname in sorted(os.listdir(path)):
    if not fname.endswith('.html'):
        continue
    content = open(os.path.join(path, fname)).read()
    matches = emoji_pattern.findall(content)
    if matches:
        print(f'{fname}: {set(matches)}')
        found = True
if not found:
    print('CLEAN — no emoji found in any HTML file')
EOF
```

Expected: `CLEAN — no emoji found in any HTML file`

- [ ] **Step 6: Commit**

```bash
cd /Users/nickramos/ramappsolutions
git add *.html
git commit -m "fix: remove all emoji from all HTML pages site-wide"
```

---

## Task 4: Homepage Hero Polish

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Find the hero section**

```bash
grep -n "hero\|h1\|eyebrow\|section-tag" /Users/nickramos/ramappsolutions/index.html | head -20
```

- [ ] **Step 2: Add eyebrow label above h1 if not present**

Find the hero `<h1>` tag. If there is no eyebrow/tag element directly above it, add one:

```html
<p class="section-tag" style="margin-bottom:12px;">AI & Automation for Business</p>
```

Place it immediately before the `<h1>` in the hero section.

- [ ] **Step 3: Ensure hero h1 uses gold highlight span**

The h1 should contain a `<span style="color:var(--gold)">` around a key phrase. For example:

```html
<h1>You focus on the work.<br /><span style="color:var(--gold);">We automate the rest.</span></h1>
```

Read the current h1 and wrap the second line or key phrase in a gold span if not already done.

- [ ] **Step 4: Verify hero buttons use correct classes**

```bash
grep -A2 "btn--primary\|btn--ghost\|Book\|Get Started" /Users/nickramos/ramappsolutions/index.html | head -20
```

Ensure the primary CTA uses `class="btn btn--primary"` and secondary uses `class="btn btn--ghost"`.

- [ ] **Step 5: Commit**

```bash
cd /Users/nickramos/ramappsolutions
git add index.html
git commit -m "feat: polish homepage hero — eyebrow label, gold span highlight"
```

---

## Task 5: Pricing Page — Featured Card & Badge

**Files:**
- Modify: `pricing.html`

- [ ] **Step 1: Find the pricing cards**

```bash
grep -n "card\|plan\|popular\|featured\|Standard\|Premium\|Starter" /Users/nickramos/ramappsolutions/pricing.html | head -30
```

- [ ] **Step 2: Add gold border to featured/middle tier card**

Find the middle pricing card (Standard or most popular tier). Add `card--featured` class to its container:

```html
<div class="card card--featured" ...>
```

The `card--featured` class was defined in Task 1 and adds a gold border + glow shadow.

- [ ] **Step 3: Add MOST POPULAR badge (text only, no emoji)**

Inside the featured card, add this badge immediately after the opening div:

```html
<div class="badge--popular">Most Popular</div>
```

The `badge--popular` class was defined in Task 1 (gold bg, gold text, uppercase, small).

- [ ] **Step 4: Verify pricing page renders correct styles**

```bash
grep -A5 "badge--popular\|card--featured" /Users/nickramos/ramappsolutions/pricing.html | head -20
```

Expected: The featured card has both classes and the badge text "Most Popular" appears.

- [ ] **Step 5: Commit**

```bash
cd /Users/nickramos/ramappsolutions
git add pricing.html
git commit -m "feat: pricing page — gold border on featured card, Most Popular badge"
```

---

## Task 6: Contact Page — Form Input Styles

**Files:**
- Modify: `contact.html`

- [ ] **Step 1: Find form inputs**

```bash
grep -n "input\|textarea\|form\|label" /Users/nickramos/ramappsolutions/contact.html | head -20
```

- [ ] **Step 2: Add inline style override for inputs if not already styled**

Find each `<input>` and `<textarea>` element. Ensure they have:

```html
style="background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:var(--radius-sm);padding:12px 16px;width:100%;font-family:var(--font);font-size:0.9375rem;outline:none;transition:border-color 0.2s;"
```

And add a focus style via a `<style>` block in the `<head>` if not present:

```html
<style>
  input:focus, textarea:focus {
    border-color: var(--gold) !important;
    box-shadow: 0 0 0 3px var(--gold-bg) !important;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/nickramos/ramappsolutions
git add contact.html
git commit -m "feat: contact page form inputs — dark surface bg, gold focus ring"
```

---

## Task 7: Deploy to GitHub Pages

- [ ] **Step 1: Final emoji check across all files**

```bash
python3 - <<'EOF'
import os, re
emoji_pattern = re.compile("[\U0001F300-\U0001F9FF\U00002600-\U000027BF★→←]", flags=re.UNICODE)
path = '/Users/nickramos/ramappsolutions'
found = False
for fname in sorted(os.listdir(path)):
    if not fname.endswith('.html'):
        continue
    content = open(os.path.join(path, fname)).read()
    matches = emoji_pattern.findall(content)
    if matches:
        print(f'{fname}: {set(matches)}')
        found = True
if not found:
    print('CLEAN')
EOF
```

Expected: `CLEAN`

- [ ] **Step 2: Stage and push all changes**

```bash
cd /Users/nickramos/ramappsolutions
git add -A
git status
```

Review the status — confirm only expected files are staged.

- [ ] **Step 3: Push to GitHub**

```bash
cd /Users/nickramos/ramappsolutions
git push origin main
```

Expected: `Branch 'main' set up to track remote branch 'main' of 'origin'.`

- [ ] **Step 4: Verify live site**

Wait ~60s for GitHub Pages to deploy, then check:

```bash
curl -s https://ramappsolutions.com | grep -o "Ramapp Solutions\|favicon\.svg" | head -5
```

Expected: `Ramapp Solutions` and `favicon.svg` appear in the response.
