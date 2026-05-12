# Changelog — Upcycling Patterns

All notable changes to the Upcycling Patterns website are documented here.
This project follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH).

> **Format:** `Added` (new), `Changed` (modified), `Fixed` (bug), `Removed` (deleted), `Security` (vulnerability).

---

## [1.2.0] — 2026-05-11

### Added
- Full Turkish (TR) localization on every legal page (`accessibility.html`, `funding-disclaimer.html`, `terms.html`, `success.html`, `privacy-policy.html`, `cookie-policy.html`, `404.html`) with a top-of-page EN/TR switcher.
- Cross-tab language sync via the `storage` event — switching language in one tab updates open tabs of the same site.
- Open Graph and Twitter Card metadata on every page (404, success, terms, accessibility, funding-disclaimer, privacy-policy, cookie-policy) so social shares look right.
- `hreflang` alternates (`en`, `tr`, `x-default`) on all legal pages.
- `@media print` styles on legal pages — clean printable output for school records.
- WCAG 2.1 AA reference text in the accessibility statement.
- Storage event listener in `404.html` for live language updates.
- `aria-label` on every language switcher button (`Switch to English` / `Türkçe'ye geç`).

### Changed
- `admin/config.yml` is now a 567-line, validation-heavy CMS schema:
    - Slug rules force ASCII + `clean_accents: true` so Turkish characters become clean URLs.
    - Every text/string field has a `pattern` regex with 2–80 / 5–200 / 10–400 / 10–1000 character limits and human-readable error messages.
    - Email and URL fields validated via reusable YAML anchors (`&email_field`, `&https_url`).
    - Country code list expanded from 31 to 36 entries (Albania, Kosovo, Serbia, Montenegro, Bosnia & Herzegovina added).
    - All `select` widgets use `{label, value}` object syntax with flag emojis.
    - Upload limits per field (`hero` 1 MB, `logo` 1 MB, `gallery photo` 3 MB, `output file` 25 MB).
    - Lists have `min` / `max` caps (partners min 1, gallery max 200, news max 100).
    - `commit_messages` now include `{{author-login}}` so every edit is attributed.
- `admin/index.html` rewritten with fallback CDN (jsDelivr if unpkg fails), explicit `netlifyIdentity.init()`, retry button, error states, `<noscript>` fallback, dark theme sync, polling for the Identity widget, and `logout` → `/` redirect.
- `404.html`:
    - `color-scheme` changed from `light` to `light dark`.
    - Two `theme-color` entries for light/dark.
    - Full `html[data-theme="dark"]` override set (ambient, grid, card, badge, buttons, quick-links, lang-box).
    - Storage helpers guard against `localStorage` being disabled.
    - `URLSearchParams` lowercase normalisation.
    - `forEach` replaced with traditional `for` loops for older browser safety.
    - `access_token=` recognised in the Identity-token bounce list.

### Fixed
- Apple-touch-icon and favicon paths are now consistent across every page (`/favicon.ico`, `/apple-touch-icon.png`) matching the manifest.
- Polish partner name in `data/partners.json` corrected with proper diacritics: `Zespół Szkół Samochodowych im. Tadeusza Tańskiego`; city filled in as `Włocławek`.
- Gallery caption `"Workshop Activities 1"` → `"Workshop Activities"` (trailing index dropped).
- `data/news.json`, `data/outputs.json` field order now matches the order in `admin/config.yml` (editor-friendly diffs).
- `Permissions-Policy` removed from `<meta http-equiv>` blocks on legal pages — it was silently ignored there. The real policy lives in `netlify.toml` and `_headers`.
- `_headers` enriched with `Cross-Origin-Resource-Policy`, `X-DNS-Prefetch-Control`, `Access-Control-Allow-Origin` for fonts/images, and immutable cache rules for app icons.
- `_redirects` extended with HTTPS + apex canonical, `/index.html → /`, friendly aliases (`/privacy`, `/terms`, …), and clean 404s for common probe paths (`/wp-admin`, `/.env`, `/.git/*`).
- `.gitignore` expanded to ~150 lines covering Netlify CLI, Decap local backend, Python venv, WebStorm/Sublime/Vim, image-tool caches, distribution ZIPs, and an explicit allowlist (`!data/*.json`, `!admin/config.yml`).

### Security
- `noindex, nofollow, noarchive, nosnippet, noimageindex` enforced on `/admin/*` via both `<meta name="robots">` and `_headers` `X-Robots-Tag`.
- Identity widget panel now redirects to `/admin/` on login (replace, not push, so the back button doesn't loop through the token URL).

---

## [1.1.1] — 2026-05-11

### Fixed (technical-only pass, no visual or animation changes)
- Removed duplicate Open Graph meta block in `index.html` (the entire `<meta property="og:*">` set was emitted twice).
- Unified `og:image` and `twitter:image` to a single canonical `/og-image.png` path.
- Added the three missing Turkish translations (`termsLink`, `accessibilityLink`, `fundingDisclaimerLink`) so the footer legal column is fully localised when switching to TR.
- Standardised the `apple-touch-icon` and favicon paths across all pages to match the manifest.
- Added an early `data-theme` detection script to `success.html`, `terms.html`, `accessibility.html`, `funding-disclaimer.html`, and `404.html` so a user's chosen dark/light mode from the main site is respected on these pages.
- Added matching `html[data-theme="dark"]` CSS overrides so the dark mode actually styles correctly.
- Added the missing `publish_mode: editorial_workflow` line to `admin/config.yml`.
- Added an explicit `netlifyIdentity.init()` call in `admin/index.html` to guard against environments where the widget's auto-init silently fails.
- Added `hreflang="x-default"` alternates for the privacy and cookie sitemap entries.
- Renamed `_headers.txt` → `_headers`, `_redirects.txt` → `_redirects`, `gitignore.txt` → `.gitignore` so Netlify and Git can actually read them.

### Unchanged
- All design tokens, layout, animations, transitions, glass effects, hover states, and timings are byte-identical to v1.1.0. This release is purely a technical-correctness pass.

---

## [1.1.0] — 2026-05-10

### Added
- Accessibility statement page.
- Funding disclaimer page.
- Terms of use page.
- Success page for contact form flow.
- Root icon files for browser, mobile, and social sharing support.
- `.gitignore`.
- `LICENSE`.
- `CHANGELOG.md`.
- Minimal `_headers` file for Netlify compatibility.

### Changed
- Improved legal page structure.
- Improved project documentation.
- Improved browser and social media metadata readiness.
- Improved static hosting compatibility.

---

## [1.0.0] — 2026-05-10

### Added
- Main Upcycling Patterns homepage.
- Responsive design.
- Dark mode support.
- English/Turkish language system.
- Admin panel with Decap CMS.
- CMS data files (`site.json`, `news.json`, `gallery.json`, `outputs.json`, `partners.json`, `faq.json`).
- Privacy policy page.
- Cookie policy page.
- Custom 404 page.
- Sitemap.
- Robots file.
- Netlify configuration.
- Contact form structure.
- Footer legal area.
- Project and partner logo sections.

---

[1.2.0]: https://github.com/your-org/upcycling-patterns/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/your-org/upcycling-patterns/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/your-org/upcycling-patterns/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/your-org/upcycling-patterns/releases/tag/v1.0.0


BU KISIN ONEMLI BUNU KENDIM YAPICAM
