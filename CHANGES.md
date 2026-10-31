# Changes — Prompt #4

## What changed

- Reordered the page to Hero → About → Experience → Projects → Skills & Tools → Certifications → Achievements & Participation → Education → Contact.
- Replaced the featured-project layout with 10 uniform project cards: 7 real projects and 3 clearly marked upcoming-project placeholders.
- Added fixed project card anatomy: visual, type pill, title, clamped summary, up to five tags and bottom-aligned actions.
- Added Mobile and Business Analysis filter tabs, hidden until a real project uses the matching category. Placeholders appear only under All.
- Rewrote About to 79 words without the IEEE or Harithawarjana mentions, and added the internship target to the quick facts.
- Added How I Work and What I Can Offer sections.
- Moved the Harithawarjana leadership role first and the IEEE Standards Committee role second, with leadership accents and badges.
- Added the Achievements & Participation section with three organizing-committee and three participation placeholders, a card template and the `achievement-<short-name>.jpg` image rule.
- Added a Résumé download block near Contact and a hidden testimonials slot.
- Updated the nav, section numbering, alternate backgrounds, styles and filter logic.

## Files changed

- `index.html`
- `css/style.css`
- `js/main.js`
- `README.md`
- `CHANGES.md`
- `TODO_OWNER.md`
- `REDESIGN_NOTES.md` (superseded note)

## Verification

Checked with headless Chrome at 360, 768, 1024 and 1440px:

- HTML structure balanced; one `h1`, one `main`, no duplicate IDs and no missing internal anchors.
- No horizontal overflow, clipped text, console errors or failed local requests.
- All local images and `assets/resume.pdf` returned HTTP 200.
- Project card widths, heights, image headers, titles, clamped descriptions and action positions are equal within each grid row.
- Project cards use at most five tags.
- Filters return 10 cards under All (7 real + 3 placeholders), 7 under Web, 2 under Group and 5 under Individual.
- Placeholders are hidden outside All. Mobile and Business Analysis tabs remain hidden because no real project uses those categories.
- Six achievement placeholders render with equal heights within each row.
- Mobile menu, Escape close, Achievements navigation, back-to-top, contact form success state and reduced-motion mode pass.
- Screenshots were captured at all four widths. Visual inspection was unavailable in this environment, so layout proof is based on DOM geometry and interaction checks.

## Known external exceptions

- `react-login-signup` still returns 404.
- LinkedIn returns HTTP 999 to automated requests.
- FormSubmit delivery still requires owner activation.
- No real achievement certificate titles, organizers, years or images were supplied; placeholders remain.
- No testimonial quotes or permission were supplied; the testimonials block stays hidden.
