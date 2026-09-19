# Laura Kajtazi-Testa — site

Three things are kept apart, so each has exactly one home:

| what | where |
|---|---|
| **text + markup** | `index.html` |
| **styling** | `css/*.css` |
| **contact form** | `contact.js` |

Nothing to build, nothing to run. The only script is the one that formats the
enquiry email.

## Running it

Double-click `index.html` to look at it. To publish, upload the whole folder to
your server — plain static files, no build step, nothing to install.

## Structure

```
index.html              the whole page: markup and text together
css/
  base.css              colour/type tokens, reset, shared patterns
  <section>.css         one per section: header, hero, how, about, approach,
                        research, practicalities, faq, next, contact, footer
  fonts.css             @font-face rules
fonts/                  Newsreader + Instrument Sans, self-hosted (works offline)
images/                 portrait.jpg — the hero photo
contact.js              formats the enquiry email for the visitor's mail app
```

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

Save the photo over `images/portrait.jpg` and it appears — no code change.

It's referenced through `content.js` like everything else:

```js
portrait: {
  src: "images/portrait.jpg",
  alt: "Laura Kajtazi-Testa"
}
```

So if the photo is a `.png` or you'd rather name it something else, change `src`
to match and leave the markup alone. The `alt` text is what screen readers
announce and what shows if the image ever fails to load.

What's in `images/portrait.jpg` right now is a striped placeholder at the right
4:5 shape. Any photo size works: the CSS crops it to fill that box
(`object-fit: cover`) rather than squashing it, so a portrait-orientation shot
around 800×1000 or larger will look best. The stripes stay visible behind the
image while it loads.

## Styling

Colours and fonts are tokens on `:root` in `css/base.css` — change a brand
colour in one place:

```css
--accent: #8A6647;   /* links, hovers, section labels */
```

`base.css` also holds the handful of patterns used by more than one section
(`.section`, `.split`, `.eyebrow`, `.section-title`, `.btn`, `.field`).
Anything used by a single section lives in that section's own file.

## Placeholders still to fill

- `about.accreditation` and `footer.copyright` — registering body + membership number
- `research.paper.linkText` / `linkHref` — link to the published paper (currently `example.com`)
- `images/portrait.jpg` is a placeholder — replace it with the real photo
