# Stepping Stones Nutrition — Website

This is the source code for the Stepping Stones Nutrition website.

**Live site:** https://stinkwizard4.github.io/stepping-stones-nutrition/

This guide is written for a non-technical owner. You do **not** need to install
anything or use a code editor to make ordinary content changes — everything in
the "Common changes" section below can be done from github.com in a web browser.

---

## Table of contents

- [How the site works, in plain English](#how-the-site-works-in-plain-english)
- [What it's built with](#what-its-built-with)
- [What every folder and file is for](#what-every-folder-and-file-is-for)
- [Common changes: which file to edit](#common-changes-which-file-to-edit)
- [How to add a new service page](#how-to-add-a-new-service-page)
- [How publishing works](#how-publishing-works)
- [Editing safely: rules of thumb](#editing-safely-rules-of-thumb)
- [If something goes wrong](#if-something-goes-wrong)
- [Known gaps / not finished yet](#known-gaps--not-finished-yet)
- [For a developer (optional)](#for-a-developer-optional)

---

## How the site works, in plain English

Most websites you may have used (Squarespace, Wix, WordPress) have a login where
you click on text and type over it. This site is different, and the difference is
worth understanding before you change anything:

1. The **words and settings** live in a small number of plain text files in this
   repository. Your phone number, for example, is written down in exactly one place.
2. When those files change, a program called **Eleventy** reads them and
   **builds** the finished website — it stamps out the actual web pages, pasting
   your phone number into the header, footer, and every page that mentions it.
3. The finished pages are **published automatically** to the live web address.

So you never edit the live web pages directly. You edit the source, and the
finished pages get regenerated for you. The upside is that changing your phone
number in one file changes it everywhere on the site at once.

The finished pages are built fresh every time and are not stored in this
repository. There is nothing here you can break by editing that can't be undone.

---

## What it's built with

| Piece | What it is | Why you'd care |
|---|---|---|
| [Eleventy](https://www.11ty.dev/) (also written "11ty") | The site builder. Turns the source files into finished web pages. | It's what makes "edit one file, update the whole site" possible. |
| Nunjucks (`.njk` files) | The page templates — HTML with a few fill-in-the-blank spots. | These are the page layouts. Text in curly braces like `{{ site.phone }}` is a fill-in-the-blank that pulls from a settings file. |
| JSON (`.json` files) | Plain-text settings and content files. | This is where your phone number, address, navigation menu, and all service page content live. |
| Plain CSS | The styling — colors, fonts, spacing. | One file, `src/css/style.css`. |
| A tiny bit of JavaScript | Makes the mobile menu and the Services dropdown open and close. | One file, `src/js/nav.js`. You will likely never touch it. |
| GitHub Pages | The web host — the computer that serves the site to visitors. | Free, and included with this GitHub repository. |
| GitHub Actions | The automation that rebuilds and republishes the site whenever you change it. | This is why merging to `main` puts changes live without you doing anything else. |

There is **no database, no login, no server to maintain, and no monthly hosting
bill**. The site is just a set of files. That also means there's nothing to hack
into and nothing to keep patched.

---

## What every folder and file is for

### The files you will actually edit

```
src/
├── _data/
│   ├── site.json         ← Phone, fax, email, address, nav menu, top banner
│   └── services.json     ← ALL service page content (one entry per service)
│
├── index.njk             ← Home page
├── about-us.njk          ← About Us page (staff bios)
├── contact-us.njk        ← Contact Us page
├── location.njk          ← Location page
├── insurance.njk         ← Insurance page
├── new-patient-information.njk   ← New Patient Information page
├── good-faith-estimate.njk       ← Good Faith Estimate page
│
└── images/
    ├── brand/            ← Logo, favicon, credential badges, infographics
    ├── team/             ← Staff headshots
    └── downloads/        ← PDFs offered for download (e.g. benefits guide)
```

### The files that run the machinery

You can read these, but you shouldn't need to change them for content updates.

| File / folder | What it does |
|---|---|
| `src/_includes/base.njk` | The **outer shell** wrapped around every page: the `<head>` section, the top banner, the logo, the navigation menu, and the footer. Edit here to change something that appears on *every* page (like footer wording). |
| `src/services.njk` | The **template for service pages**. It's one file that produces all 13 service pages, using the content in `services.json`. Edit here to change the *layout* of every service page at once. |
| `src/_data/year.js` | Supplies the current year for the copyright line in the footer, so it never goes stale. |
| `src/404.njk` | The "Page Not Found" page shown if someone follows a broken link. |
| `src/sitemap.njk` / `src/robots.njk` | Generate `sitemap.xml` and `robots.txt`, which help Google find and index every page. Automatic — new pages are added for you. |
| `src/css/style.css` | All the visual styling. Colors are defined at the very top as "variables" (`--navy`, `--sage`, `--cream`), so changing one value there restyles the whole site. |
| `src/js/nav.js` | Makes the mobile "Menu" button and Services dropdown open and close. |
| `.eleventy.js` | Eleventy's configuration — where the source lives, where the finished site goes, and the web address prefix. See the note about custom domains under [How publishing works](#how-publishing-works). |
| `.github/workflows/deploy.yml` | The automatic publishing instructions. This is the file that makes merging to `main` go live. |
| `package.json` / `package-lock.json` | Record which version of Eleventy the site uses, so builds are consistent. |
| `.gitignore` | Tells Git which files not to store — the `node_modules/` folder and the built `_site/` folder. |

### Two names you'll see that are *not* in the repository

- **`_site/`** — the finished website, created fresh by each build. It's deliberately
  not saved here. Never edit anything in it; your changes would be wiped out on the
  next build.
- **`node_modules/`** — Eleventy itself and its supporting code, downloaded
  automatically when the site is built. Also deliberately not saved here.

---

## Common changes: which file to edit

### Phone number, fax, email, address, service areas, or the top banner

**File: `src/_data/site.json`.**

This one file feeds the header, footer, and every page that mentions your contact
details. Change it once and it updates everywhere.

```json
{
  "name": "Stepping Stones Nutrition",
  "tagline": "Registered Dietitian Nutritionists in Cary, NC",
  "url": "https://stinkwizard4.github.io/stepping-stones-nutrition",
  "phone": "919-937-2031",
  "phoneHref": "9199372031",
  "fax": "919-234-5270",
  "faxHref": "9192345270",
  "email": "info@stepping-stonesnutrition.com",
  "address": {
    "line1": "511 Keisler Drive, Suite 203",
    "line2": "Cary, North Carolina 27518, United States"
  },
  "servingAreas": "Cary, Apex, Morrisville, ...",
  "banner": "IN-PERSON & VIRTUAL APPTS. NOW AVAILABLE",
  ...
}
```

**Important:** the phone number appears twice, in two different formats, and you
must change **both**:

- `"phone"` is what visitors *read* — keep the dashes: `"919-937-2031"`
- `"phoneHref"` is what their phone *dials* when they tap it — **digits only, no
  dashes or spaces**: `"9199372031"`

Same pattern for `"fax"` and `"faxHref"`.

Other things in this file:

- **`"banner"`** — the navy strip across the very top of every page.
- **`"servingAreas"`** — the list of cities and states, used in the footer and on
  every service page.
- **`"apptCta"`** — the "New & Existing Patient Appointments" heading and paragraph
  that appears at the bottom of About Us, Contact Us, Insurance, and New Patient
  Information. Change it here and it changes on all four.
- **`"nav"`** — the navigation menu. See below.

### Adding or reordering items in the navigation menu

**File: `src/_data/site.json`**, the `"nav"` section. The menu appears in the order
listed here.

```json
"nav": [
  { "text": "Home", "url": "/" },
  { "text": "Services", "servicesDropdown": true },
  { "text": "About Us", "url": "/about-us/" },
  ...
]
```

- `"text"` is the menu label; `"url"` is the page it links to (keep the slashes at
  both ends, e.g. `/insurance/`).
- The `"Services"` entry is special: `"servicesDropdown": true` means "build a
  dropdown here listing every service automatically." **Don't give it a `"url"`** —
  it fills itself in from `services.json`, so new services appear in the menu with
  no extra work.

### Service page content (what a service says)

**File: `src/_data/services.json`.** All 13 service pages come from this one file.
See the next section for the structure.

### Text on the Home, About, Contact, Location, Insurance, New Patient, or Good Faith Estimate pages

**File: the matching `.njk` file in `src/`** — for example `src/about-us.njk` for
staff bios, or `src/insurance.njk` for the in-network insurance list.

These files are HTML. You can edit the words between the tags without knowing HTML,
as long as you leave the tags themselves alone:

```html
<p>We are in network with:</p>          ← <p> means "paragraph"
<li>NC State Health Plan</li>           ← <li> means "list item"
<h4>Send Us a Message</h4>              ← <h4> means "small heading"
```

To add another insurance plan, copy an existing `<li>...</li>` line and change the
words inside it. To change a paragraph, edit only the text between `<p>` and `</p>`.

Two things you'll see in these files that aren't ordinary text:

- `{{ site.phone }}` and similar — fill-in-the-blanks pulling from `site.json`.
  Leave them as they are; they keep the page in sync automatically.
- `&mdash;` `&amp;` `&hellip;` — codes for the characters — & …
  respectively. Leave them alone.

The block at the very top of each page between the `---` lines controls the browser
tab title, the Google search description, and the page's web address:

```
---
layout: base.njk
title: "Insurance"
description: "Find out if Stepping Stones Nutrition is in network with your plan."
permalink: /insurance/
---
```

`title` and `description` are safe and worthwhile to edit — the `description` is
often what shows up under your link in Google results. **Don't change `permalink`**
on an existing page: that's the page's web address, and changing it breaks every
existing link to it, including ones Google has indexed.

### Staff photos, the logo, badges, or the downloadable PDF

Upload the new file into the matching folder under `src/images/`, then update the
filename where it's referenced (e.g. `src/about-us.njk` for headshots). Keep the
`width` and `height` numbers roughly matched to the real image dimensions — they
stop the page from jumping around while images load.

### Colors and fonts

**File: `src/css/style.css`.** The palette is at the top, in the `:root` block —
change `--navy`, `--sage`, or `--cream` and the whole site follows. There's a
warning comment at the top of that file about image paths; please heed it if you
ever add a background image.

---

## How to add a new service page

This is the nicest part of how the site is set up. To add a service you edit
**one file**, and you get all of this automatically:

- a new page at `stinkwizard4.github.io/stepping-stones-nutrition/services/your-slug/`
- a new entry in the **Services dropdown** in the navigation menu
- the page added to your **sitemap** so Google can find it
- the standard "Serving Cary and Surrounding Areas" section and phone-number
  call-to-action at the bottom

**File to edit: `src/_data/services.json`.**

The file is a list of services in square brackets `[ ... ]`, each service wrapped in
curly braces `{ ... }`, separated by commas. The easiest and safest approach:
**copy an existing service block, paste it, and change the values.**

Here's a complete, minimal example you can adapt:

```json
{
  "slug": "menopause-nutrition",
  "navTitle": "Menopause Nutrition",
  "metaTitle": "Menopause Nutrition Support in Cary, NC",
  "h1": "Perimenopausal & Menopausal Nutrition in Cary, NC",
  "subtitle": "Nutrition support through hormonal transition",
  "intro": "We help clients navigate changes in energy, appetite, and body composition during perimenopause and menopause.",
  "heroAlt": "Description of the photo, for screen readers",
  "sections": [
    {
      "heading": "What We Help With",
      "type": "list",
      "items": ["Hot flashes", "Sleep disruption", "Bone health", "Energy changes"]
    },
    {
      "heading": "How We Help",
      "type": "list",
      "intro": "Our approach includes:",
      "items": ["Blood sugar support", "Bone-supportive nutrition", "Managing appetite changes"],
      "note": "An optional closing note under the list."
    },
    {
      "heading": "Our Philosophy",
      "type": "paragraph",
      "text": "We use a non-diet, weight-inclusive, and evidence-based approach."
    }
  ],
  "closing": "We're here to support you. Schedule an appointment to get started."
}
```

What each field does:

| Field | What it controls |
|---|---|
| `slug` | The web address: `slug` of `"pcos"` becomes `/services/pcos/`. Lowercase letters and hyphens only — no spaces, no capitals, no punctuation. |
| `navTitle` | The short label in the Services dropdown menu. |
| `metaTitle` | The browser tab title and the headline Google shows. Include the location for local search. |
| `h1` | The big heading at the top of the page. |
| `subtitle` | The smaller line under the heading. |
| `intro` | The opening paragraph — **also used as the page's Google description.** |
| `heroAlt` | A description of the hero image, read aloud by screen readers. Required for accessibility. |
| `heroImage` | *Optional.* Path to an image, e.g. `"/images/brand/your-image.jpg"`. **If you leave it out, a plain placeholder box appears instead** — only the PCOS page currently has a real image. |
| `sections` | The body of the page, in order. Each section has a `heading` and a `type`. |
| `closing` | The sentence in the "Ready to Begin?" box at the bottom. |

Each entry in `sections` is one of two types:

- **`"type": "list"`** — a bulleted list. Needs `items` (the bullets). Optionally
  `intro` (a lead-in line above the bullets) and `note` (a line below them).
- **`"type": "paragraph"`** — a block of prose. Needs `text` instead of `items`.

### Step by step, using only the GitHub website

1. Go to `src/_data/services.json` in the repository on github.com.
2. Click the **pencil icon** (Edit this file).
3. Find a service similar to the one you're adding. Select from its opening `{`
   through its closing `}`, copy, and paste it as a new block — **with a comma
   between the two blocks**.
4. Change the values. Make sure `slug` is unique.
5. Scroll down, write a short note in the commit box (e.g. "Add menopause nutrition
   service page"), and choose **"Create a new branch for this commit and start a
   pull request."**
6. Click **Propose changes**, then **Create pull request**.
7. Review the change, then click **Merge pull request** — and the page is live in a
   couple of minutes.

### Removing or renaming a service

Deleting a service block removes the page and its menu entry. Be aware that if
anyone has bookmarked or linked to that address, it will now show the "Page Not
Found" page. Changing a `slug` has the same effect — the old address stops working.
Renaming the *display* text (`navTitle`, `h1`, `metaTitle`) is completely safe;
those don't affect the address.

---

## How publishing works

**Merging a change into the `main` branch publishes it to the live site
automatically. There is no separate "publish" button, and no way to stage a change
on `main` without it going live.**

Here's the full chain:

```
You edit a file
        ↓
You commit the change on a branch and open a pull request
        ↓
You review the change and click "Merge pull request"
        ↓
GitHub Actions rebuilds the site and publishes it   ← automatic, ~1–3 minutes
        ↓
Live at stinkwizard4.github.io/stepping-stones-nutrition/
```

Some vocabulary, since it's unavoidable here:

- A **commit** is one saved change, with a note describing it. Every commit is kept
  forever, so anything can be undone.
- A **branch** is a private draft copy of the site's files. Work on a branch doesn't
  affect the live site at all.
- **`main`** is the special branch that represents the live site. Whatever is on
  `main` is what the public sees.
- A **pull request** ("PR") is a proposal to merge a branch into `main` — a preview
  of the change with a Merge button. This is where you review before going live.

**The recommendation: always work on a branch and merge via a pull request**, even
though GitHub will let you commit directly to `main`. It costs one extra click, it
gives you a chance to re-read the change before the public sees it, and it gives you
a clean record of what changed and when — with a one-click **Revert** if you change
your mind.

One caveat to be aware of: **right now, nothing checks your change before you merge
it.** The build only runs *after* the merge. So if a JSON file has a typo, you'll
find out from a red X in the Actions tab rather than from a warning on the pull
request. The live site stays safely on its last working version either way, but the
fix has to be a follow-up change. (A developer could add a build check that runs on
pull requests — a small edit to `.github/workflows/deploy.yml` — if you'd like the
earlier warning.)

### Watching a deploy and confirming it worked

Click the **Actions** tab at the top of the repository. You'll see a run named
"Deploy to GitHub Pages" for your merge. A yellow dot means it's building, a green
check means it published, a red X means it failed. When it's green, refresh the
live site — you may need a hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on a Mac) to
get past your browser's cache.

The workflow can also be triggered by hand from the Actions tab ("Run workflow") if
you ever need to republish without making a change.

### If you move to a custom domain

Should you buy a domain like `www.stepping-stonesnutrition.com` and point it here,
two files need updating or **every link and image on the site will break**:

1. `.eleventy.js` — change `pathPrefix` from `"/stepping-stones-nutrition/"` to `"/"`
2. `src/_data/site.json` — change `"url"` to the new domain

(The reason: the site currently lives in a *subfolder* of `stinkwizard4.github.io`,
so every internal link needs that folder name in front of it. On your own domain,
the site lives at the root and the prefix must go.) Worth having whoever sets up the
domain make these two edits at the same time.

---

## Editing safely: rules of thumb

**The JSON files (`site.json`, `services.json`) are picky about punctuation.** A
missing comma or quote mark will fail the build — the site stays up on its last good
version, but your change won't publish until it's fixed. The three rules:

1. Every piece of text is wrapped in **double quotes**: `"like this"`.
2. Items in a list are separated by **commas** — but the **last one has no comma**
   after it.
3. If your text contains a double quote, it needs a backslash in front:
   `"Selective (\"picky\") eating"`. A safer habit is to use curly quotes (" ")
   instead, which need no escaping.

Before committing a JSON change, paste the whole file into
[jsonlint.com](https://jsonlint.com/) and click Validate. It will point at the exact
line if something's off. This takes ten seconds and prevents the most common problem.

**A few other things worth knowing:**

- **Nothing is ever lost.** Every version of every file is kept. If a change looks
  wrong, GitHub can revert it — open the merged pull request and click **Revert**,
  which creates a new pull request undoing it.
- **Never edit anything in `_site/`.** It's generated output and gets overwritten.
- **Don't change a `permalink` or a `slug` on an existing page** unless you mean to
  break its existing links.
- **Leave `{{ ... }}` and `{% ... %}` alone.** Those are the fill-in-the-blanks and
  the logic that make the templates work.
- **Keep image files reasonably small** (under ~500 KB where you can). Large images
  make pages slow to load, especially on phones.

---

## If something goes wrong

| What you see | What it means | What to do |
|---|---|---|
| Red X in the Actions tab | The build failed — usually a JSON punctuation error. | The live site is **unaffected** and still shows the last good version. Click the failed run and read the error, or validate your JSON at jsonlint.com. |
| Change merged but site looks the same | Either the build is still running, or your browser is showing a cached copy. | Check Actions for a green check, then hard refresh (Ctrl+Shift+R / Cmd+Shift+R). |
| A page is broken or wrong after a merge | A content mistake got through. | Open the merged pull request and click **Revert**. |
| Images or links broken everywhere | Usually the `pathPrefix` / `url` settings. | See [If you move to a custom domain](#if-you-move-to-a-custom-domain). |

---

## Known gaps / not finished yet

Worth knowing about, in case you were expecting them to work:

- **The contact form on `src/contact-us.njk` is a placeholder.** It shows the
  Name / Email / Message labels but does not actually send anything — a static site
  can't process form submissions on its own. Wiring it to a form service (Formspree,
  Netlify Forms, a Google Form, or your patient portal) is a small job for a
  developer. Until then, the page's phone number and email address are the working
  contact routes.
- **Most service pages show a placeholder box where the hero image goes.** Only the
  PCOS page has a real image. Add a `heroImage` field to any service in
  `services.json` (and upload the image to `src/images/brand/`) to fill these in.
- **There is no `/services/` overview page.** The Services dropdown links straight to
  individual service pages. An index page listing them all could be added if you'd
  like one.

---

## For a developer (optional)

You don't need any of this to edit content, but if you'd like to preview changes on
your own computer before pushing:

```bash
npm install          # one time — downloads Eleventy
npm run serve        # live preview at http://localhost:8080
npm run build        # build once into _site/
```

Requires Node.js 20 or newer (that's the version the deploy workflow uses). `npm run
serve` rebuilds and refreshes the browser as you save files.

Note that in local preview the `pathPrefix` still applies, so the site is served at
`http://localhost:8080/stepping-stones-nutrition/`.
