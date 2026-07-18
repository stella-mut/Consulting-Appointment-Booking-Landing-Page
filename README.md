# Pata Ajira Consulting — Appointment Booking Landing Page

A white-and-carmine landing page for booking HR consulting sessions directly online. Built with plain HTML, CSS, and JavaScript — no framework, no build step, no backend required to preview.

---

## Description

This project is a single-page site for an HR consulting practice. Visitors can learn about the services offered, see consultant availability, and book a session through an interactive calendar — all without leaving the page or waiting on email back-and-forth.

**Sections included:**
- **Hero** — headline, CTA, and a live-style "today's availability" timeline
- **Services** — six HR consulting offerings (hiring, employee relations, compliance, etc.)
- **Benefits** — why visitors should book through the page
- **Availability** — weekly snapshot of each consultant's open days
- **Booking Calendar** — interactive date + time slot picker with a booking form
- **Testimonials** — client quotes
- **FAQs** — expandable accordion

**Stack:** HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (no dependencies). Font: [Lato](https://fonts.google.com/specimen/Lato) via Google Fonts.

---

## Diagram

```
hr-booking/
├── index.html      → Page structure & content (all sections)
├── styles.css       → All styling: layout, color system, responsive rules
├── script.js         → Interactivity: hero timeline, booking calendar, FAQ accordion
└── README.md        → You are here
```

**Page flow:**

```
Nav
 └─ Hero (background image + live timeline)
     └─ Services (6 cards)
         └─ Benefits (4 items)
             └─ Availability (3 consultant cards)
                 └─ Booking Calendar (date picker + slots + form)
                     └─ Testimonials (3 quotes)
                         └─ FAQs (accordion)
                             └─ Footer
```

> Tip: Open `index.html` in a browser to see the live page — a static screenshot would go stale the moment the copy or colors change, so the file itself is the best reference.

---

## Installation Instructions (for users)

No build tools or dependencies are required.

1. **Download the project folder** (`index.html`, `styles.css`, `script.js`).
2. Keep all three files in the **same folder** — the HTML references the CSS and JS by relative path.
3. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).

That's it — the page runs entirely client-side.

**Optional: run a local server** (recommended if you plan to extend the project, since some browsers restrict local file access for certain features):

```bash
# Python 3
python3 -m http.server 8000

# Node (with npx)
npx serve .
```

Then visit `http://localhost:8000`.

---

## Instructions for Contributors

1. **Fork or clone** the project folder.
2. Make your changes in `index.html`, `styles.css`, or `script.js`.
3. Test locally by opening `index.html` directly, or via a local server (see above).
4. Check your changes across at least one desktop and one mobile viewport width — the layout has breakpoints at `880px` and `520px`.
5. Keep the three files separated by concern:
   - Structure/content → `index.html`
   - Visual styling → `styles.css`
   - Behavior/interactivity → `script.js`
6. Submit your changes with a short description of what was changed and why.

---

## How to Tweak This Project for Your Own Use

This page is intentionally written as a template. To adapt it:

| What you want to change | Where to look |
|---|---|
| Business name, logo text | `index.html` — `.logo` elements in header and footer |
| Colors (currently white/carmine) | `styles.css` — `:root` custom properties at the top (`--carmine`, `--ink`, `--blush`, etc.) |
| Font | `index.html` `<link>` tag (Google Fonts) + `font-family` in `styles.css` |
| Hero background image | `styles.css` — `.hero-bg { background-image: url(...) }` |
| Services offered | `index.html` — `.services-grid` cards |
| Team / consultants | `index.html` — `.consultant-grid` cards and the booking form's consultant `<select>` |
| Number of available time slots | `script.js` — `allSlots` array and `unavailableSet()` function |
| Testimonials | `index.html` — `.testi-grid` cards |
| FAQ content | `index.html` — `.faq-list` items |
| Real booking submission | `script.js` — `bookingForm` submit handler currently just shows a confirmation message; replace with a `fetch()` call to your booking API or email service |

Because the design tokens (colors, spacing, radius) are centralized as CSS custom properties, changing the palette from carmine to another brand color mostly means editing the `:root` block once.

---

## Expectations from Contributors

- **Keep it dependency-free.** This project intentionally has no build step or package manager — please don't introduce frameworks or bundlers without discussion.
- **Match the existing design system.** Use the existing CSS custom properties instead of hardcoding new colors, and keep spacing/typography consistent with what's already there.
- **Preserve accessibility basics.** Keep semantic HTML, visible focus states, and readable contrast (especially given the hero background image sits behind text).
- **Don't break responsiveness.** Check both the two existing breakpoints when adding new sections or components.
- **No real user data.** Don't wire the booking form to a live backend inside this repo — use placeholder/mock submission logic, or clearly document any real integration separately.
- **Small, focused changes.** Prefer several small edits over one large rewrite, so changes are easy to review.

---

## Known Issues

- **Booking form does not persist data.** Submitting the form only shows a confirmation message in the UI — no data is saved or sent anywhere. Connecting it to a real backend or booking API is left to the implementer.
- **Calendar availability is simulated.** The "available" and "booked" time slots are generated with a simple deterministic pattern (`unavailableSet()` in `script.js`), not real consultant schedules.
- **Hero background image is a placeholder.** It's currently pulled from a placeholder image service and should be replaced with a licensed or original photo before production use.
- **No timezone handling.** All times shown are illustrative and don't account for the visitor's local timezone.
- **No form validation beyond browser defaults.** Fields like email use native HTML validation only; there's no custom error messaging.
- **Not tested on Internet Explorer.** The CSS relies on Grid, Flexbox, and custom properties, which IE11 does not fully support. Modern evergreen browsers only.
