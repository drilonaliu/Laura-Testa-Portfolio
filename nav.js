/* ---------------------------------------------------------------------------
   Turns the one long page into separate pages, without leaving index.html.

   Each <section> carries data-view="..." naming the page it belongs to. Only
   the current page's sections are shown; clicking a nav link fades the old
   page out and the new one in, in the same tab. The address bar still updates
   (/#about), so links can be shared and Back/Forward work as expected.

   Any #link works, not just the nav: #research opens About, because that's the
   page its section belongs to. With JavaScript off, every section shows and the
   links scroll down the page like before.
--------------------------------------------------------------------------- */

'use strict';

const FADE_MS = 220;   /* keep in step with the transition in base.css */

const views = document.querySelector('.views');
const sections = views.querySelectorAll('[data-view]');
const pageLinks = document.querySelectorAll('.site-nav a, .site-header__brand');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.site-header');
const menuToggle = header.querySelector('.site-header__toggle');
const wideScreen = window.matchMedia('(min-width: 721px)');

let currentView = null;
let pendingSwap = null;


/* The page a #hash belongs to. Unknown or empty hashes go to the home page. */
function viewFor(hash) {
  const target = hash ? document.getElementById(hash.slice(1)) : null;
  const section = target ? target.closest('[data-view]') : null;
  return section ? section.dataset.view : 'top';
}


/* Shows one page's sections, marks its nav link, and starts it from the top. */
function render(view) {
  currentView = view;

  sections.forEach(function (section) {
    section.classList.toggle('is-current', section.dataset.view === view);
  });

  pageLinks.forEach(function (link) {
    if (viewFor(link.hash) === view) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  window.scrollTo({ top: 0, behavior: 'instant' });
}


/* A link to a whole page starts at its top, but a link to something inside a
   page (#message, the contact form) should land on that thing. */
function innerTarget(hash) {
  const target = hash ? document.getElementById(hash.slice(1)) : null;
  return target && !target.matches('[data-view]') ? target : null;
}


/* Moves to a page, with a short fade between the old one and the new. */
function go(hash) {
  const view = viewFor(hash);
  const target = innerTarget(hash);

  clearTimeout(pendingSwap);

  if (view === currentView) {
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  if (reduceMotion.matches) {
    render(view);
    if (target) target.scrollIntoView({ behavior: 'instant' });
    views.focus({ preventScroll: true });
    return;
  }

  views.classList.add('is-leaving');

  pendingSwap = setTimeout(function () {
    render(view);
    if (target) target.scrollIntoView({ behavior: 'instant' });

    /* Snap the new page to its start position, then let it ease in. */
    views.classList.remove('is-leaving');
    views.classList.add('is-entering');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        views.classList.remove('is-entering');
      });
    });

    /* Screen readers and keyboard users start at the new content. */
    views.focus({ preventScroll: true });
  }, FADE_MS);
}


/* The phone menu: the button opens and closes it, and it closes again once a
   page is picked, on Escape, or when the screen widens past the phone layout. */
function setMenuOpen(open) {
  header.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', function () {
  setMenuOpen(!header.classList.contains('is-open'));
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && header.classList.contains('is-open')) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

wideScreen.addEventListener('change', function () { setMenuOpen(false); });


/* Same-page #links switch pages instead of jumping down the document.
   Cmd/Ctrl-click still opens a new tab as usual. */
function handleClick(event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  setMenuOpen(false);

  if (link.hash !== location.hash) {
    history.pushState(null, '', link.hash);
  }
  go(link.hash);
}


history.scrollRestoration = 'manual';
render(viewFor(location.hash));
if (innerTarget(location.hash)) innerTarget(location.hash).scrollIntoView({ behavior: 'instant' });

document.addEventListener('click', handleClick);
window.addEventListener('popstate', function () { go(location.hash); });
