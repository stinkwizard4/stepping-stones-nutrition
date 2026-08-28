# Handoff Guide

**For the incoming owner of the Stepping Stones Nutrition website.**

Welcome. This document is the orientation — what you've just been handed, how to
change it, and the handful of things that will bite you if nobody warns you first.

It assumes **no coding experience whatsoever** and doesn't assume you know any of
the vocabulary. Read this one first. Once you're oriented, [`README.md`](README.md)
in this same folder is the detailed manual: which file holds which text, how to add
a service page, and so on.

---

## 1. What you've been handed

The website for Stepping Stones Nutrition, a Registered Dietitian Nutritionist
practice in Cary, North Carolina.

**It is live on the public internet right now, at:**
https://stinkwizard4.github.io/stepping-stones-nutrition/

It's about 20 pages: a home page, About Us with staff bios, Contact, Location,
Insurance, New Patient Information, a Good Faith Estimate notice, and 13 individual
service pages (eating disorders, PCOS, sports nutrition, and so on).

What you have been given is not the website itself, exactly — it's the **set of
source files the website is made from**. This place where they live is called a
**repository** (or "repo"), and it's hosted on a site called GitHub. When you change
a source file, the finished website gets rebuilt and republished automatically. More
on that in section 3.

A few reassuring facts about how this thing is built:

- **There is no hosting bill.** It's on a free service called GitHub Pages.
- **There's no login system, no database, and no software to keep updated.** The
  site is a set of fixed pages. There's very little to go wrong and essentially
  nothing to hack into.
- **Nothing you do can be permanently lost.** Every version of every file is kept
  forever. Any change can be undone with a couple of clicks.
- **You cannot break the live site by editing a file.** Genuinely. The worst
  realistic outcome is that a change fails to publish and the site keeps showing
  its last working version until you fix it.

---

## 2. What you need before you can change anything

### A GitHub account

GitHub is the website that stores these files. It's free — sign up at
https://github.com. Once you have an account, **the current owner needs to give
your account access to this repository** (or transfer it to you outright). Until
that happens, you can look but not touch.

If you're taking over the practice entirely, ask for a full **transfer of
ownership** rather than just collaborator access, so nothing is tied to someone
else's personal account after they've moved on. Worth also confirming who controls
the domain name and the GitHub account itself — those are separate things from this
repository, and they're the pieces that are painful to recover later.

### The Claude GitHub App (recommended)

You *can* edit these files by hand — the README explains exactly how, and it's not
as scary as it sounds. But the realistic way to maintain this site without learning
to code is to have Claude do the editing for you.

Claude connects to this repository through something called the **Claude GitHub
App**. Once it's connected, you describe what you want in ordinary English — "change
the phone number to 919-555-1234," or "add a new service page for menopause
nutrition" — and Claude makes the change and hands it back to you as a proposal to
review and approve. You stay the one who decides what goes live.

Two ways to work this way:

- **Claude Code on the web** (https://claude.ai/code) — connect it to this
  repository and give it instructions in a chat window. This is how the README and
  the safety check described below were written.
- **The Claude GitHub App installed on the repository** — this lets you write
  `@claude` in a comment on GitHub itself and have it respond there.

**Be aware that the initial connection is a genuinely technical setup step.** It
involves installing an app onto the repository and storing an access key. It's a
one-time thing, but it is not the part of this document you should expect to breeze
through alone. Have whoever is handing the site over do it before they leave, or set
aside time with someone technical, or ask Claude to walk you through it step by step.

---

## 3. How changing the site actually works

This is the core thing to understand. It's four steps, and the vocabulary is the
only hard part — so here are the four words first.

### The four words

**Repository** — this collection of files. The whole site's source, in one place.

**Branch** — a private draft copy of all the files. This is the important one. When
you want to change something, you don't edit the live site. You make a branch, which
is a complete copy of everything, and you make your changes *there*. **The public
cannot see a branch.** You can make a mess in it, sleep on it, or abandon it
entirely, and the live site is completely unaffected the whole time.

There's one special branch called **`main`**. That one is not a draft — `main`
represents the live site. Whatever is on `main` is what the world sees.

**Pull request** (everyone says "PR") — a proposal to copy your draft branch's
changes into `main`. Despite the confusing name, think of it as **"here's my
proposed change, please review it."** It shows you exactly what's different, line by
line, with a green **Merge** button at the bottom. Nothing is public yet.

**Merge** — clicking that button. This accepts the proposal and copies your changes
into `main`. **This is the moment the change goes live to the public.**

### The loop

```
1. BRANCH   →   Make a draft copy. Nobody can see it. Nothing is at risk.
                    ↓
2. EDIT     →   Change the words you want to change, in the draft.
                    ↓
3. PULL     →   Propose the change. GitHub shows you exactly what's different
   REQUEST      and automatically test-builds it (see section 4).
                    ↓
4. REVIEW   →   Read it over. Check the test came back green.
                    ↓
5. MERGE    →   Click the button. It's live within a few minutes.
```

Steps 1 and 3 sound like work, but if you're editing a file directly on the GitHub
website, they're a single radio button and one click — GitHub offers to create the
branch and the pull request for you at the moment you save. And if you're working
with Claude, it does all of this for you and simply hands you a pull request to
review.

### Merging publishes to the public. Automatically. Immediately.

**This is the single most important sentence in this document.** There is no
separate "publish" button and no staging step after the merge. The instant you click
Merge, an automated process rebuilds the site and pushes it live. It takes roughly
one to three minutes.

So: **the review you do before clicking Merge is the only review there is.** Once
you merge, it's public. Read the change first.

If something wrong does slip through, it's recoverable and not a crisis. Open the
pull request you just merged and click **Revert**. That creates a new proposal that
undoes the change; merge that, and a few minutes later the site is back to how it
was. Nothing is ever lost.

### Confirming it actually published

Click the **Actions** tab at the top of the repository. You'll see a run named
"Deploy to GitHub Pages." A yellow dot means it's still working; a green check means
it published. Then go look at the live site — and if it still looks old, do a hard
refresh (**Ctrl+Shift+R**, or **Cmd+Shift+R** on a Mac) to get past your browser's
saved copy. An unchanged-looking page is nearly always just your own browser cache.

---

## 4. The safety check: red versus green

Every pull request is automatically test-built before you merge it. This is a safety
net for the most common kind of mistake — a missing comma or quote mark in one of
the settings files, which is enough to stop the whole site from rebuilding.

About a minute after a pull request is opened, a status line appears near the bottom
of the page, just above the Merge button:

**🟡 Yellow dot — still checking.** Give it a minute. Don't merge yet.

**✅ Green check — "All checks have passed."** The site builds correctly with your
change in it. Safe to merge.

**❌ Red X — "Some checks were not successful."** Something in the change stops the
site from building. **Do not merge.** Click **Details** next to the failed check to
see the error — it will usually name the exact file and line number. Fix it and save
again to the same branch, and the check automatically re-runs. You'll see it turn
green when it's sorted.

Two limits on what green actually means, so you don't over-trust it:

1. **Green means "this will build," not "this is correct."** The check has no
   opinion about your writing. A typo in a sentence, a wrong phone number, or a
   paragraph you'd like to rephrase will all sail through with a green check. Your
   own read-through is still what catches those.
2. **A red X warns you; it doesn't physically stop you.** GitHub will still let you
   click Merge on a failed pull request. Treat red as a hard stop by your own
   discipline. (This *can* be enforced properly in the repository settings, under
   Settings → Branches. Worth switching on if more than one person will ever be
   merging — ask Claude to walk you through it.)

---

## 5. The one trap that bites silently

**When you change the phone number, you have to change it in two places.**

The phone number lives in a file called `src/_data/site.json`, and it appears twice,
in two different formats:

```json
"phone": "919-937-2031",
"phoneHref": "9199372031",
```

- **`phone`** is what visitors *read* on the page. It keeps the dashes.
- **`phoneHref`** is what their phone *dials* when they tap the number on a
  mobile. It must be **digits only** — no dashes, no spaces, no parentheses.

Here's why this one deserves its own section. If you update `phone` and forget
`phoneHref`, **there is no error and nothing looks wrong.** The check comes back
green. The site publishes fine. Every page displays the shiny new number, correctly.
But every visitor who taps it on their phone gets silently dialed through to the
**old** number. It looks perfect and it quietly sends your prospective clients
somewhere else — potentially for months, because nothing about the page reveals it.

**So: after you change a phone number, pull the live site up on an actual phone and
tap it.** That ten-second test is the only thing that catches this.

The fax number has the identical pair — `fax` and `faxHref` — and the same trap.

While you're in `site.json`, note that this one file feeds the header, the footer,
and every page that mentions your contact details. Change the address there once and
it updates across the entire site. That's the payoff for the format being a little
fussy.

---

## 6. Two things that were never finished

These are known gaps, not things you broke. Both are listed here so they don't come
as a nasty surprise months from now.

### The contact form doesn't work

The Contact Us page shows a form with **Name**, **Email**, and **Message** labels on
it. **It does not send anything.** There's no error message and nothing tells the
visitor their message went nowhere — it simply does nothing.

This is a consequence of how the site is built: these are fixed pages with no
program running behind them, so there's nothing on the receiving end to catch a
submission. Fixing it means connecting the form to an outside service that handles
this (Formspree and Netlify Forms are the usual choices, and a Google Form or your
patient portal's intake form would also do the job). It's a small job for someone
technical, or something Claude can set up for you.

**Until it's fixed, the phone number and email address on that page are the only
working ways for someone to reach you from the site.** Given that, it's worth
deciding early whether to fix the form or simply remove it — a form that visibly
does nothing is arguably worse than no form, because a prospective client may write
in and assume you ignored them.

### Most service pages have a grey placeholder instead of a photo

Of the 13 service pages, only the **PCOS** page has a real image at the top. The
other 12 show a plain grey box where a photo should be. The pages read fine and
work correctly — they just look unfinished.

Each one needs a suitable image uploaded and a single line added to that service's
entry in `src/_data/services.json`. The README explains exactly how, under "How to
add a new service page." This is a genuinely easy fix and mostly a matter of
choosing 12 photos.

---

## 7. Your first week: a suggested order

1. **Get a GitHub account and get access to this repository.** Nothing else is
   possible until this is done. Confirm you can see the files.
2. **Get the Claude connection set up** while the previous owner is still around to
   help. This is the step that's hardest to do cold.
3. **Read [`README.md`](README.md).** It's the detailed manual for which file holds
   what.
4. **Make one tiny, safe practice change** — fix a typo, or change a word in a
   sentence. Take it all the way through the loop: branch, pull request, wait for
   green, merge, then watch it appear on the live site. Doing this once, on
   something that doesn't matter, is worth more than reading any amount of
   documentation.
5. **Test tapping the phone number on a real phone**, so you've seen that check work
   before you ever need it.
6. **Decide about the contact form** — fix it or remove it, but don't leave it
   silently swallowing messages.

---

## Quick reference

| I want to... | Go to |
|---|---|
| Change the phone, fax, email, address, or the top banner | `src/_data/site.json` — **and remember `phoneHref`** |
| Change what a service page says | `src/_data/services.json` |
| Change the Home, About, Contact, Location, Insurance, New Patient, or Good Faith Estimate page | The matching `.njk` file in `src/` |
| Add a whole new service page | `src/_data/services.json` — see the README |
| Change colors or fonts | `src/css/style.css` |
| Check whether a change published | The **Actions** tab |
| Undo something that went live | Open the merged pull request → **Revert** |
| Understand any of the above in detail | [`README.md`](README.md) |

---

**The short version:** it's a set of text files that turns itself into a website.
Work in a draft branch, propose it, wait for green, merge it, and it's live in a
couple of minutes. Change the phone number in both places. Nothing you do is
permanent, and nothing you do can't be undone.
