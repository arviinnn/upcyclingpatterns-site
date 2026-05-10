# Upcycling Patterns — Project Website

**Erasmus+ KA210-SCH** · International school partnership website
**Coordinator:** MEV Koleji Özel Basınköy Anadolu Lisesi · Istanbul, Türkiye
**Live:** [https://upcyclingpatterns.com/](https://upcyclingpatterns.com/)

---

## 📁 Project Structure

```
/
├── index.html              ← Main website (homepage, all sections)
├── style.css               ← All site styling
├── script.js               ← All site interactions, i18n, form handling
├── 404.html                ← Custom not-found page
├── privacy-policy.html     ← Privacy policy
├── cookie-policy.html      ← Cookie policy
├── manifest.webmanifest    ← PWA manifest
├── robots.txt              ← Crawler rules
├── sitemap.xml             ← SEO sitemap
├── netlify.toml            ← Netlify config (CSP, redirects, caching)
├── _redirects              ← Fallback redirects
├── README.md               ← This file
│
├── admin/                  ← CMS (Decap CMS) admin panel
│   ├── index.html          ←   Login + editor entry
│   └── config.yml          ←   CMS schema (collections, fields)
│
├── data/                   ← CMS-managed JSON content
│   ├── site.json           ←   Global site settings
│   ├── news.json           ←   News items
│   ├── gallery.json        ←   Gallery images
│   ├── outputs.json        ←   Downloadable outputs
│   ├── partners.json       ←   Partner schools
│   └── faq.json            ←   FAQ entries
│
└── images/                 ← All site images, logos, gallery photos
    └── uploads/            ←   CMS-uploaded media (created automatically)
```

---

## 🚀 Quick Deploy to Netlify

### One-time setup (≈ 10 minutes)

1. **Push the entire site folder to a GitHub repository.**
   (Netlify needs a Git repo for the CMS to work.)

2. **Create a new Netlify site** from that repo.
    - Build command: *(leave empty)*
    - Publish directory: `.`

3. **Enable Netlify Identity** (for the admin panel):
    - Site settings → **Identity** → click *Enable Identity*
    - Identity → **Registration** → set to **Invite only** (recommended for school)
    - Identity → **Services** → **Git Gateway** → click *Enable Git Gateway*

4. **Invite editors** (you, project teachers, etc.):
    - Identity tab → *Invite users* → enter email addresses
    - Each person clicks the invite link in their email → sets a password → can now log in at `/admin/`

5. **Set up the contact form** (Web3Forms — free, no account needed):
    - Visit [https://web3forms.com](https://web3forms.com)
    - Enter `upcyclingpatterns@gmail.com` → click *Create Access Key*
    - Copy the key (looks like `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`)
    - Open `index.html` and **find/replace ALL occurrences** of
      `YOUR_WEB3FORMS_ACCESS_KEY` with your real key
      *(there are exactly 2: one in `data-access-key`, one in the hidden input)*
    - Commit & push — done.

6. **Custom domain:**
    - Netlify dashboard → Domain settings → add `upcyclingpatterns.com`
    - Set DNS as Netlify instructs
    - HTTPS is automatic.

That's it. Site is live, admin works, contact form works.

---

## ✏️ Using the Admin Panel

Visit `https://upcyclingpatterns.com/admin/` and log in with your invite email.

The admin panel has the following collections:

| Section          | What you can edit                                |
| ---------------- | ------------------------------------------------ |
| ⚙️  Site Settings | Project name, email, social links, dates         |
| 📰 News          | News articles (title + summary in EN + TR)       |
| 🖼️ Gallery       | Photos, captions, categories                     |
| 📥 Downloads     | PDFs, brochures, guides                          |
| 🤝 Partners      | Partner schools & their details                  |
| ❓ FAQ           | FAQ entries (question + answer in EN + TR)       |

**Editorial workflow:** changes go through *Draft → In Review → Ready → Publish*. You can save drafts safely without affecting the live site until you publish.

> **Note:** The current website still has its content hard-coded in `index.html` for translation reasons. The CMS-edited JSON files are in place and ready — to make the live site read them automatically, see [Future enhancements](#-future-enhancements).

---

## 🔧 What Was Fixed (vs the previous version)

This is a major upgrade pass. Issues fixed:

### 🔴 Critical issues that broke the site
| Issue | Fix |
|---|---|
| Admin panel `index.html` was at site root, conflicting with main site | Moved to `/admin/index.html` (where Decap expects it) |
| Content Security Policy blocked Decap CMS scripts (`unpkg.com`, Netlify Identity, GitHub) | New per-route CSP in `netlify.toml`: strict for public pages, permissive for `/admin/*` |
| Netlify Identity widget had no `init()` call → users couldn't log in | New admin/index.html with proper init + redirect-after-login |
| CMS expected `data/*.json` files that didn't exist → admin would crash on first open | Created all six JSON files with sensible defaults |
| Web3Forms had no real access key → contact form never sent | Code now gracefully falls back to mailto; key insertion documented above |
| `_redirects` and CSP listed `frame-ancestors 'none'` while admin needs `'self'` | Loosened to `'self'` so the CMS preview iframe works |

### 🟡 Improvements
- **Dark mode** added (auto-detect + toggle button in header, persists in localStorage)
- **Cookie consent banner** (GDPR-friendly, dismissible, links to cookie policy)
- **Lightbox** for gallery images (click any photo to see full size)
- **FAQ chevron icon** with smooth rotate animation
- **Hero pattern background** (decorative animated SVG leaf pattern)
- **Form consent checkbox** (clear that data is used only to reply)
- **Footer "Legal" column** properly groups Privacy / Cookie / Admin links
- **Schema.org** structured data for SEO (Project, FAQPage, Organization)
- **Better fonts** (added Fraunces serif as display option in CSS variables)
- **Theme color** now responds to dark mode at the OS level

### 🟢 SEO & accessibility
- `robots.txt` — removed Turkish-only comments, allowed AI training crawlers explicitly (configurable)
- `sitemap.xml` — added privacy and cookie pages
- All images have `width`/`height` to prevent CLS
- All interactive elements have `aria-*` and keyboard support
- `prefers-reduced-motion` respected throughout

---

## 🛠️ Local Development

```bash
# Serve locally — any static server works:
npx serve .
# OR
python3 -m http.server 8000
```

To test the CMS locally without deploying:

```bash
# Run the local Decap CMS proxy
npx decap-server

# In another terminal, serve the site
npx serve .

# Open http://localhost:3000/admin/ — local_backend in config.yml routes to your file system
```

---

## 🌍 Languages

- **English** (default) — served at `/`
- **Türkçe** — served at `/tr/` (or `?lang=tr`, or via the EN/TR toggle)

Translations live in `script.js` under the `translations` object. To add a new language:
1. Add a new key (e.g. `de` for German) to the `SUPPORTED_LANGS` array and `translations` object
2. Translate every string in the new dictionary
3. Add a new `<button class="lang-btn" data-lang="de">DE</button>` in the language switcher

---

## 🎨 Design System

CSS variables in `style.css` control the entire theme:

```css
--primary: #2f7a43;        /* Main brand green */
--primary-light: #57b26c;  /* Lighter green */
--accent: #b8ff7a;         /* Highlight lime */
--bg-1, --bg-2, --bg-3;    /* Light backgrounds */
--bg-dark;                 /* Dark mode bg */
--radius-sm, --radius-md;  /* Border radii */
--shadow-soft, --shadow-strong; /* Shadows */
```

To rebrand: change these variables — everything else updates automatically.

---

## 🔐 Security

- All security headers managed in `netlify.toml` (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- Two distinct CSPs: strict for public pages, looser for `/admin/*` (CMS needs to load from CDNs)
- Honeypot field + 8-second cooldown prevent contact-form spam
- Form data sent over HTTPS only, never logged client-side
- Email addresses obfuscated in HTML, decoded by JS to defeat scrapers

---

## 📋 Future Enhancements (optional)

These were **not** done in this pass but are easy adds when you're ready:

1. **Wire CMS data into the live site:** add a small `cms-loader.js` that fetches `/data/news.json` etc. on page load and replaces the hard-coded HTML. (The structure already supports this — every CMS-editable section has `data-cms-collection` markers.)
2. **Service worker** for offline support (`sw.js` + register call in `script.js`).
3. **Image optimization** pipeline: convert PNGs to WebP/AVIF on upload.
4. **Newsletter signup** integration (Buttondown, Mailchimp, etc.).
5. **Search bar** that filters news + FAQ + gallery in one input.

---

## 📞 Contact

- **Email:** [upcyclingpatterns@gmail.com](mailto:upcyclingpatterns@gmail.com)
- **Instagram:** [@upcycling_patterns](https://www.instagram.com/upcycling_patterns/)
- **X:** [@UPatternsKA210](https://x.com/UPatternsKA210)
- **YouTube:** [@upcyclingpatterns](https://www.youtube.com/@upcyclingpatterns)
- **LinkedIn:** [upcycling-patterns-ka210](https://www.linkedin.com/company/upcycling-patterns-ka210/)

---

## ⚖️ Disclaimer

> Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the Turkish National Agency. Neither the European Union nor the granting authority can be held responsible for them.

---

*Designed and developed by Arvin Hakimi · Code overhaul May 2026.*
