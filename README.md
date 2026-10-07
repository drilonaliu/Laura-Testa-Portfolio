# Laura Kajtazi-Testa — site

Three things are kept apart, so each has exactly one home:

| what | where |
|---|---|
| **text + markup** | `index.html` |
| **styling** | `css/*.css` |
| **page switching** | `nav.js` |
| **contact form** | `contact.js` |

Nothing to build, nothing to run.

## Running it

Double-click `index.html` to look at it. To publish, upload the whole folder to
your server — plain static files, no build step, nothing to install.

## Structure

```
index.html              the whole page: markup and text together
css/
  base.css              colour/type tokens, reset, shared patterns
  <section>.css         one per section: header, hero, how, about, approach,
                        research, practicalities, location, faq, next,
                        contact, footer
  fonts.css             @font-face rules
fonts/                  Newsreader + Instrument Sans, self-hosted (works offline)
images/                 portrait.png — the hero photo; studio-*.jpg — Location
                        photos; bacp-registered-member.png — About page badge
nav.js                  shows one page at a time (About, FAQs, …)
contact.js              formats the enquiry email for the visitor's mail app
```

## Pages

Everything is still in `index.html`, but only one page shows at a time. Each
`<section>` has a `data-view="..."` naming its page, and clicking a nav link
fades to that page in the same tab. Sections that share a `data-view` appear
together: How I work + Approach & Specialisms are the How I work page,
About + Research & Film are the About page, What Happens Next +
the form are the Contact page.

To move a section to a different page, change its `data-view`. The address bar
follows along (`/#about`), so pages can be linked to directly and Back works.
With JavaScript off, the site falls back to one long scrolling page.

## Editing text

Open `index.html` and change the words. They sit in the markup where you'd
expect them.

The FAQ uses native `<details>` elements, so adding a question means copying one
`<details class="faq__item" name="faq">` block and editing it. The shared
`name="faq"` is what makes opening one close the others.

## How the contact form works

Submitting opens the visitor's own email app (Mail, Outlook, or Gmail if that's
their default) with the message written out and ready, and they press send
themselves. No server, no account, no third party.

`contact.js` assembles it, so the email arrives readable:

```
Subject: Therapy enquiry via lauraktherapy.com — Drilon

Name: Drilon
Email: drilon@example.com

hi im interested
```

The address and subject are the two constants at the top of `contact.js`.

The `<form>` still carries `action="mailto:..."` as a fallback, so it keeps
working with JavaScript off — just with the fields written as `Name=value`
lines instead of the layout above.

Worth knowing about `mailto:` generally:

- **Nothing arrives until the visitor presses send** in their own mail app.
  Some will abandon it at that point.
- **If they have no mail app set up**, clicking does nothing at all. That's
  common on phones where people use webmail, and on work or shared computers.
- **Very long messages can be truncated**, since some mail apps cap how much
  they accept through a link.
- **The address is visible in the page source**, so spam bots will find it.

If enquiries start going missing, the fix is a form handler (Formspree,
Web3Forms) or a small script on the server — both deliver straight to her inbox
without depending on the visitor's setup.

## The portrait photo

`images/portrait.png` is the hero photo. It's a cut-out with a transparent
background, standing on a warm wash drawn in `css/hero.css`, with a light
filter there that warms it towards the site's colours.

To replace it, save the new photo over `images/portrait.png`. A normal photo
with its own background works too: it just covers the wash. If it's a `.jpg`,
change `src` on the `<img class="hero__portrait-img">` in `index.html` to match.
The CSS crops it to fill a 4:5 box, so a portrait-orientation shot around
800×1000 or larger looks best.

## Styling

Colours and fonts are tokens on `:root` in `css/base.css` — change a brand
colour in one place:

```css
--accent: #8A6647;   /* links, hovers, section labels */
```

`base.css` also holds the handful of patterns used by more than one section
(`.section`, `.split`, `.eyebrow`, `.section-title`, `.btn`, `.field`).
Anything used by a single section lives in that section's own file.
