# 🚀 Deployment Checklist — Upcycling Patterns

A no-fluff checklist for getting the site live on Netlify with the CMS working.
Print this, tick the boxes, finish in under 30 minutes.

---

## 📋 At a glance

| Step | What | Time |
|---|---|---|
| 1 | Replace files & push to GitHub | 5 min |
| 2 | Connect repo to Netlify | 3 min |
| 3 | Enable Identity + Git Gateway | 2 min |
| 4 | Invite editors | 2 min |
| 5 | Wire up Web3Forms key | 3 min |
| 6 | Add custom domain (optional) | 5 min |
| 7 | Verify everything works | 5 min |

---

## ☑️ Step 1 — File layout & GitHub push

Your repo's root must look like this. The `images/` folder from your existing repo is preserved as-is.

```
upcycling-patterns/
├── index.html                  ← Main website
├── style.css                   ← All site styling
├── script.js                   ← All site interactions, i18n, form handling
├── 404.html                    ← Custom not-found page
├── success.html                ← Form-submitted thank-you page
├── privacy-policy.html
├── cookie-policy.html
├── terms.html
├── accessibility.html
├── funding-disclaimer.html
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── netlify.toml                ← Headers, redirects, caching
├── _headers                    ← Fallback for netlify.toml headers
├── _redirects                  ← Fallback for netlify.toml redirects
├── .gitignore
├── LICENSE.txt
├── CHANGELOG.md
├── README.md
├── DEPLOYMENT.md               ← This file
│
├── admin/                      ← Decap CMS admin panel
│   ├── index.html
│   └── config.yml
│
├── data/                       ← CMS-managed JSON
│   ├── site.json
│   ├── news.json
│   ├── gallery.json
│   ├── outputs.json
│   ├── partners.json
│   └── faq.json
│
└── images/                     ← All site images
    └── uploads/                ← CMS uploads go here automatically
```

**Common mistakes to avoid:**

- ❌ `_headers.txt` / `_redirects.txt` — these MUST be named `_headers` and `_redirects` (no `.txt`). Netlify will silently ignore them otherwise.
- ❌ `gitignore.txt` — must be `.gitignore` (with the leading dot).
- ❌ `admin/index.html` at the site root — must be inside `admin/`.

**Push it:**

```bash
git init
git add .
git commit -m "Initial upload — Upcycling Patterns site v1.2.0"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/upcycling-patterns.git
git push -u origin main
```

---

## ☑️ Step 2 — Connect repo to Netlify

1. Sign in at [https://app.netlify.com](https://app.netlify.com)
2. **Add new site → Import an existing project → GitHub**
3. Authorise Netlify on your GitHub account.
4. Pick the `upcycling-patterns` repo.
5. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.`
6. **Deploy site.**

Netlify deploys in ~30 seconds and gives you a `*.netlify.app` URL. Open it — the site should already be live.

---

## ☑️ Step 3 — Enable Netlify Identity + Git Gateway

This is the **single biggest reason admin panels don't work**. Don't skip it.

1. **Site overview → Identity** → click **Enable Identity**.
2. **Identity → Registration preferences** → choose **Invite only** (recommended for a school project).
3. **Identity → Services → Git Gateway** → click **Enable Git Gateway**.

Without Git Gateway, editors can log in but cannot save content.

---

## ☑️ Step 4 — Invite editors

1. **Identity → Invite users** → enter your email + any teacher / coordinator emails.
2. Each person gets an email with an invite link → they set a password.
3. They log in at `https://YOUR-SITE.netlify.app/admin/`.

Editors can now create / update news, gallery, downloads, partners, and FAQ items. Every change goes through **Draft → In Review → Ready → Publish** (editorial workflow is on).

---

## ☑️ Step 5 — Wire up the contact form (Web3Forms)

The form **gracefully falls back to `mailto:`** if you skip this step, but for proper inline submission:

1. Visit [https://web3forms.com](https://web3forms.com).
2. Enter `upcyclingpatterns@gmail.com`.
3. Click **Create Access Key**.
4. Copy the key (looks like `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`).
5. Two ways to install it:

   **Option A — via the admin panel (easier):**
   - Log in at `/admin/`.
   - **Site Settings → General Information → Web3Forms Access Key**.
   - Paste the key, save, publish.

   **Option B — directly in code:**
   - Open `index.html`.
   - **Find & replace all** `YOUR_WEB3FORMS_ACCESS_KEY` with your real key (there are 2 occurrences).
   - Commit and push.

6. Test by sending yourself a message from the live site.

---

## ☑️ Step 6 — Custom domain (optional)

1. **Netlify dashboard → Domain settings → Add custom domain**.
2. Enter `upcyclingpatterns.com`.
3. Netlify shows you DNS records — set them at your registrar:
   - `A` record → `75.2.60.5`
   - `CNAME` `www` → `your-site.netlify.app`
4. Wait 5–10 minutes for DNS to propagate.
5. **Domain settings → HTTPS → Provision certificate** (or wait — Netlify does it automatically).

The site is now reachable at `https://upcyclingpatterns.com` with the apex (no `www`) as canonical.

---

## ☑️ Step 7 — Smoke test

Open `https://upcyclingpatterns.com/` and tick:

| Check | Expected |
|---|---|
| Page loads | Hero visible in < 2 s |
| Theme toggle (top-right) | Light ↔ Dark, persists on refresh |
| Language toggle (EN/TR) | Switches all visible text, persists on refresh |
| Click a gallery image | Lightbox opens with prev/next |
| FAQ accordion | Chevron rotates 45° when expanding |
| Cookie banner | Appears once, dismisses on click |
| Mobile menu | Hamburger slides open on small screens |
| Contact form | Sends successfully or falls back to `mailto:` |
| Admin panel | `/admin/` shows login → after login, all 6 collections visible |
| 404 page | Visit `/this-does-not-exist` → custom 404 shows |
| Legal pages | Visit `/privacy`, `/terms`, `/accessibility`, `/funding`, `/cookies` — all load and redirect to `.html` versions |
| Privacy / Cookie / Terms | Same dark mode as main site, EN/TR switcher works |

---

## 🆘 Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Admin shows blank page | Identity not enabled | Step 3 |
| Admin says "config error" | Missing `data/*.json` | Make sure all 6 files are in `data/` |
| Admin can't save | Git Gateway disabled | Step 3 |
| Admin login redirects in a loop | Identity invite email link expired | Re-invite the user |
| Form silently fails | Web3Forms key not set | Step 5 |
| CMS images broken | `images/uploads/` doesn't exist | Create it as an empty folder + commit `.gitkeep` |
| "Not secure" warning | First deploy without HTTPS | Wait 5 min for Netlify auto-cert |
| Dark mode flash on load | Browser cache | Hard reload (Ctrl/Cmd+Shift+R) |
| Language doesn't switch on legal pages | Cached JS | Hard reload |
| `_headers` rules don't apply | Filename has `.txt` extension | Rename to `_headers` (no extension) |

---

## 🔄 Updating the site after deploy

Two ways:

**For editors (recommended):**
- Log in at `/admin/` → edit content → publish. Done.

**For developers:**
```bash
git add .
git commit -m "Describe what you changed"
git push
```
Netlify auto-deploys in ~30 seconds.

---

## 📞 Quick contacts

- **Web3Forms:** [https://web3forms.com](https://web3forms.com) — free, no signup
- **Netlify Identity docs:** [https://docs.netlify.com/security/secure-access-to-sites/identity/](https://docs.netlify.com/security/secure-access-to-sites/identity/)
- **Decap CMS docs:** [https://decapcms.org/docs/](https://decapcms.org/docs/)
- **Project email:** upcyclingpatterns@gmail.com

---

## ✅ You're done

Once Steps 1–5 are complete, the site is fully operational: live homepage, working admin, dark mode, EN/TR switching, lightbox, cookie compliance, contact form, and a friendly 404. Step 6 (custom domain) and Step 7 (smoke test) can be done at your own pace.

**Last updated:** 11 May 2026 · v1.2.0
