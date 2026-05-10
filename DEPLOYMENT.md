# 🚀 Deploy Checklist — Upcycling Patterns

A no-fluff checklist. Print this, tick the boxes.

---

## ☑️ Step 1 — Replace your existing files

The files in this package replace your current project files **except** the `images/` folder. Do NOT delete `images/`.

```
Replace these top-level files:
✅ index.html              (new — main site, was the conflicting admin file before)
✅ style.css               (new — original + dark mode + new components)
✅ script.js               (new — original + theme toggle + lightbox + cookie banner)
✅ 404.html                (preserved — only CSP slightly relaxed)
✅ privacy-policy.html     (rewritten — modern + dark mode)
✅ cookie-policy.html      (rewritten — modern + dark mode)
✅ manifest.webmanifest    (enhanced — shortcuts, maskable icons)
✅ netlify.toml            (rewritten — fixes CMS CSP issue)
✅ _redirects              (cleaned)
✅ robots.txt              (cleaned, English-only comments)
✅ sitemap.xml             (added privacy + cookie pages)
✅ README.md               (full documentation)

Add these new files:
🆕 admin/index.html        (Decap CMS entry, was at site root before)
🆕 admin/config.yml        (was at site root before — moved into admin/)
🆕 data/site.json          (CMS data — required for CMS to open)
🆕 data/news.json
🆕 data/gallery.json
🆕 data/outputs.json
🆕 data/partners.json
🆕 data/faq.json

Delete these old files:
❌ /index.html (the OLD short admin one — replaced by /admin/index.html)
❌ /config.yml (the OLD CMS config at root — replaced by /admin/config.yml)
```

---

## ☑️ Step 2 — Push to GitHub

```bash
git add .
git commit -m "Major site overhaul: dark mode, working admin, CSP fix, new components"
git push origin main
```

Netlify will auto-deploy if the site is connected.

---

## ☑️ Step 3 — One-time Netlify Identity setup

This is the **single biggest reason your admin wasn't working before**. Do this in the Netlify dashboard:

1. **Site overview → Identity** → click **Enable Identity**
2. **Identity → Registration preferences** → choose **Invite only** (recommended)
3. **Identity → Services → Git Gateway** → click **Enable Git Gateway**
4. **Identity → Invite users** → enter your email + any teacher emails
5. Each invited person gets an email with a link → they set a password
6. Now they can log in at `https://upcyclingpatterns.com/admin/`

---

## ☑️ Step 4 — Wire up the contact form

The form **gracefully falls back** to opening the user's email client if you skip this step, but for proper inline submission:

1. Visit [https://web3forms.com](https://web3forms.com)
2. Enter `upcyclingpatterns@gmail.com`
3. Click **Create Access Key**
4. Copy the key (looks like `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`)
5. Open `index.html` in your editor
6. **Find** (Ctrl+F): `YOUR_WEB3FORMS_ACCESS_KEY`
7. **Replace ALL** (Ctrl+H, replace all) with your real key
   *(There are exactly 2 occurrences.)*
8. Commit and push.

Test by sending yourself a test message from the live site.

---

## ☑️ Step 5 — Verify everything works

Open `https://upcyclingpatterns.com/` and check:

| What to test | Expected result |
|---|---|
| Page loads fast | Hero appears in under 2 seconds |
| Theme toggle (top-right sun/moon icon) | Switches between light/dark, persists on refresh |
| Language toggle (EN/TR) | Switches all text, persists on refresh |
| Click a gallery image | Lightbox opens with prev/next arrows |
| FAQ chevron icons | Rotate 45° when expanding answers |
| Cookie banner | Appears once, dismisses on click, stays dismissed |
| Mobile menu (hamburger) | Slides open smoothly on mobile |
| Contact form | Sends or falls back to mailto |
| Admin panel | `https://upcyclingpatterns.com/admin/` shows login |
| 404 page | Random URL like `/xyz` shows custom 404 |
| Privacy/Cookie links | Both pages load with same dark-mode support |

---

## 🆘 If something doesn't work

| Symptom | Likely cause | Fix |
|---|---|---|
| Admin shows blank page | Identity not enabled in Netlify | Step 3 above |
| Admin says "config error" | `data/*.json` files missing | They're in this package — make sure you uploaded them |
| Admin can't save changes | Git Gateway disabled | Step 3 above |
| Form submission silently fails | Web3Forms key not set | Step 4 above |
| CMS images broken | `images/uploads/` folder doesn't exist | Create it in your repo (can be empty) |
| Dark mode flash on load | Browser cache | Hard reload (Ctrl+Shift+R) |
| "Site not secure" in browser | First deploy without HTTPS | Wait 5 min for Netlify auto-cert |

---

## 📞 Quick contacts

- **Web3Forms:** [https://web3forms.com](https://web3forms.com) (free, no signup)
- **Netlify Identity docs:** [https://docs.netlify.com/security/secure-access-to-sites/identity/](https://docs.netlify.com/security/secure-access-to-sites/identity/)
- **Decap CMS docs:** [https://decapcms.org/docs/](https://decapcms.org/docs/)

---

**That's it.** Once steps 1–4 are done, the site is fully operational with admin, dark mode, lightbox, cookie compliance, and a working contact form.
