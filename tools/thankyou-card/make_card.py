#!/usr/bin/env python3
"""Ramapp client "thank-you" card generator.

Fill in a client's name, logo, and links in a small JSON file, run this once,
and get a post-ready 2160x2160 PNG (Instagram / Facebook square, 2x retina).

USAGE
    python3 make_card.py clients/vbu.json
    python3 make_card.py clients/vbu.json --out ~/Desktop/thanks.png

CONFIG (see clients/vbu.json)
    client_name  (required)  e.g. "Volleyball University"
    logo         (required)  path to the client's logo image, RELATIVE to the
                             JSON file (or an absolute path)
    headline     (optional)  default "Thank you for trusting us."
    label        (optional)  default "Now working with"
    website, instagram, tiktok, facebook  (all optional) — only the ones you
                             provide are shown. Put the text exactly as you want
                             it to read, e.g. "vbucoaching.com", "@handle".

Requires Google Chrome (used headlessly to render the card). Nothing else.
"""
from __future__ import annotations
import argparse
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, "template.html")

# Vector icons (no emoji) — one per social field, drawn in the brand gold.
ICONS = {
    "website": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>',
    "instagram": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    "tiktok": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8.2a5 5 0 0 0 3 1v-2.6a2.6 2.6 0 0 1-2.4-2.6H14v10.3a1.9 1.9 0 1 1-1.6-1.9v-2.7a4.6 4.6 0 1 0 3.6 4.5V8.2z"/></svg>',
    "facebook": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h2.5l.5-3H14V4.2c0-.9.3-1.5 1.6-1.5H17V.1C16.7 0 15.7 0 14.6 0 12.2 0 10.7 1.4 10.7 4v2H8v3h2.7v8H14V9z"/></svg>',
}
# Render order; "website" gets the gold "site" style, the rest are muted.
SOCIAL_ORDER = ["website", "instagram", "tiktok", "facebook"]


def build_socials(data: dict) -> str:
    """Return the HTML for the links block — only the fields that are present."""
    rows = []
    for key in SOCIAL_ORDER:
        value = (data.get(key) or "").strip()
        if not value:
            continue
        icon = ICONS[key]
        cls = "site" if key == "website" else ""
        tag = "a" if key == "website" else "div"
        rows.append(f'<{tag} class="{cls}">{icon}{html.escape(value)}</{tag}>')
    return "\n".join(rows)


def render_html(data: dict, template: str, logo_src: str) -> str:
    """Fill the template with escaped client data. Pure — easy to test."""
    headline = html.escape((data.get("headline") or "Thank you for trusting us.").strip())
    label = html.escape((data.get("label") or "Now working with").strip())
    name = html.escape((data.get("client_name") or "").strip())
    if not name:
        raise ValueError('config is missing "client_name"')
    return (template
            .replace("{{HEADLINE}}", headline)
            .replace("{{LABEL}}", label)
            .replace("{{CLIENT_NAME}}", name)
            .replace("{{LOGO_SRC}}", html.escape(logo_src, quote=True))
            .replace("{{SOCIALS}}", build_socials(data)))


def _slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "client"


def _find_chrome() -> str:
    candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        shutil.which("google-chrome"),
        shutil.which("chromium"),
        shutil.which("chrome"),
    ]
    for c in candidates:
        if c and os.path.exists(c):
            return c
    raise FileNotFoundError(
        "Google Chrome not found. Install Chrome, or edit _find_chrome() with your path."
    )


def render_png(html_text: str, out_path: str) -> None:
    """Write the HTML to a temp file and screenshot it with headless Chrome."""
    chrome = _find_chrome()
    with tempfile.TemporaryDirectory() as tmp:
        page = os.path.join(tmp, "card.html")
        with open(page, "w") as fh:
            fh.write(html_text)
        os.makedirs(os.path.dirname(os.path.abspath(out_path)) or ".", exist_ok=True)
        subprocess.run([
            chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars",
            "--force-device-scale-factor=2", "--allow-file-access-from-files",
            "--default-background-color=00000000", "--virtual-time-budget=6000",
            "--window-size=1080,1080", f"--screenshot={out_path}", f"file://{page}",
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if not os.path.exists(out_path):
        raise RuntimeError("Chrome did not produce a PNG — check the config and logo path.")


def main(argv=None) -> None:
    ap = argparse.ArgumentParser(description="Generate a Ramapp client thank-you card PNG.")
    ap.add_argument("config", help="path to a client JSON file (see clients/vbu.json)")
    ap.add_argument("--out", help="output PNG path (default: ./Ramapp-<client>-ThankYou.png)")
    args = ap.parse_args(argv)

    with open(args.config) as fh:
        data = json.load(fh)

    # Resolve the logo relative to the config file so configs are portable.
    cfg_dir = os.path.dirname(os.path.abspath(args.config))
    logo = (data.get("logo") or "").strip()
    if not logo:
        raise SystemExit('config is missing "logo" (path to the client logo image)')
    logo_abs = logo if os.path.isabs(logo) else os.path.join(cfg_dir, logo)
    if not os.path.exists(logo_abs):
        raise SystemExit(f"logo not found: {logo_abs}")

    with open(TEMPLATE) as fh:
        template = fh.read()

    html_text = render_html(data, template, f"file://{logo_abs}")
    out = args.out or f"Ramapp-{_slug(data['client_name'])}-ThankYou.png"
    render_png(html_text, out)
    print(f"Wrote {out}  (2160x2160 — drop it straight into an IG/FB post)")


if __name__ == "__main__":
    main()
