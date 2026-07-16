"""Tests for the pure card-building logic (no Chrome needed)."""
import make_card as mc

TEMPLATE = ("H:{{HEADLINE}} L:{{LABEL}} N:{{CLIENT_NAME}} "
            "IMG:{{LOGO_SRC}} S:[{{SOCIALS}}]")


def test_only_provided_socials_render():
    html = mc.build_socials({"website": "vbucoaching.com", "instagram": "@vbu"})
    assert "vbucoaching.com" in html and "@vbu" in html
    assert "tiktok" not in html.lower()  # not provided -> not rendered
    # website is the gold "site" link; instagram is a plain div
    assert 'class="site"' in html


def test_socials_keep_order_website_first():
    html = mc.build_socials({"facebook": "fb", "website": "site.com", "tiktok": "@t"})
    assert html.index("site.com") < html.index("@t") < html.index("fb")


def test_render_html_fills_all_placeholders_and_defaults():
    out = mc.render_html({"client_name": "Acme Co", "instagram": "@acme"},
                         TEMPLATE, "file:///logo.png")
    assert "N:Acme Co" in out
    assert "H:Thank you for trusting us." in out   # default headline
    assert "L:Now working with" in out             # default label
    assert "IMG:file:///logo.png" in out
    assert "{{" not in out                         # no placeholder left behind


def test_render_html_escapes_client_text():
    out = mc.render_html({"client_name": "A & B <script>"}, TEMPLATE, "x")
    assert "<script>" not in out
    assert "&amp;" in out and "&lt;script&gt;" in out


def test_missing_client_name_raises():
    try:
        mc.render_html({"instagram": "@x"}, TEMPLATE, "x")
    except ValueError:
        return
    raise AssertionError("expected ValueError for missing client_name")


def test_slug():
    assert mc._slug("Volleyball University") == "volleyball-university"
    assert mc._slug("24-Hour Movers!!") == "24-hour-movers"
