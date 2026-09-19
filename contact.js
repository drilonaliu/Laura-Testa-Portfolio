/* ---------------------------------------------------------------------------
   Builds the enquiry email and hands it to the visitor's mail app.

   The <form> already works without this file: its action="mailto:..." does the
   same job, just with the fields written out as `Name=value` lines. This takes
   over to produce a properly laid out message, and to put the sender's name in
   the subject line. If JavaScript is off, the plain form behaviour still runs.

   Nothing is sent from here — no browser can send email. The visitor's own mail
   app opens with the message ready, and they press send.
--------------------------------------------------------------------------- */

'use strict';

const ADDRESS = 'laura@lauraktherapy.com';
const SUBJECT = 'Therapy enquiry via lauraktherapy.com';


/* Reads one field from the form, trimmed. Empty string if it isn't there. */
function readField(form, fieldName) {
  const field = form.elements[fieldName];
  return field ? field.value.trim() : '';
}


/* "Therapy enquiry via lauraktherapy.com — Drilon", so she can see who it's
   from in her inbox list without opening it. */
function buildSubject(name) {
  return name ? SUBJECT + ' — ' + name : SUBJECT;
}


/* The message body, laid out to read as an email rather than form data. */
function buildBody(name, email, message) {
  return [
    'Name: ' + (name || '(not given)'),
    'Email: ' + (email || '(not given)'),
    '',
    message || '(no message)',
    ''
  ].join('\n');
}


/* The finished mailto: link, with subject and body URL-encoded. */
function buildMailtoLink(name, email, message) {
  return 'mailto:' + ADDRESS +
    '?subject=' + encodeURIComponent(buildSubject(name)) +
    '&body=' + encodeURIComponent(buildBody(name, email, message));
}


/* Opens the visitor's mail app instead of letting the form submit itself. */
function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = readField(form, 'Name');
  const email = readField(form, 'Email');
  const message = readField(form, 'Message');

  window.location.href = buildMailtoLink(name, email, message);
}


const contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener('submit', handleSubmit);
}
