# Redesign Notes

## Concept

The portfolio uses a corporate-editorial direction: large serif headlines, a clean sans-serif body, generous whitespace and a restrained champagne-and-rose accent on a warm near-black base. The goal is to read as a serious PM/BA candidate rather than a generic developer portfolio, while keeping the site lightweight and dependency-free.

## Palette and type

| Role | Value |
|------|-------|
| Base | `#0B090A` |
| Elevated surface | `#121012` / `#181416` |
| Body text | `#F4EEEA` |
| Muted text | `#B9AAA4` |
| Rose accent | `#C07A86` / `#E3AAB3` |
| Champagne accent | `#D4B483` |
| Display face | Playfair Display |
| Body face | Inter |
| Container width | 1120px |
| Paragraph measure | approximately 65ch |

Contrast checks for the main text, muted text, gold labels, rose labels and primary buttons meet WCAG AA. The site respects `prefers-reduced-motion`, uses semantic landmarks, includes a skip link, visible focus states, descriptive alt text and ARIA labels on icon-only links.

## What moved

- Section order is now Hero → About → Experience & Leadership → Projects → Skills & Tools → Certifications → Education → Contact.
- Navigation matches the new order and keeps a persistent Contact button.
- About now uses the shorter supplied positioning statement, with verified stats: 3 leadership roles, 7 projects and 6 certificates.
- EcoTrack is the first, featured project, with filters for All, Web, Group and Individual work.
- Skills are regrouped into Project Management, Business Analysis, Data & Reporting, Collaboration and Development. Percentage bars were removed because the numbers were unverified and the bars added noise.
- Experience and Education keep their timeline structure; leadership roles are visually highlighted.
- Certifications use fixed-aspect image frames and a graceful fallback message.
- Contact keeps the FormSubmit AJAX form and direct links. The footer includes a back-to-top control.
- A local `assets/img/profile.jpg` copy of the GitHub avatar is used, with the remote avatar retained as a fallback.

## Kept verbatim

- Experience roles, dates, organisations, descriptions and skill chips.
- Education entries, dates, institutions and descriptions.
- Certification names, issuers and years.
- Contact details and social links.
- Existing project cards and descriptions, with two exceptions:
  - EcoTrack was added from the owner-provided brief.
  - The Personal Portfolio card no longer mentions particle effects, because that effect was removed in this redesign.

## TODO(owner)

- Confirm which project-management tools have actually been used: ClickUp, Asana, Microsoft Project and Monday.com.
- Confirm Draw.io / Lucidchart, Balsamiq and requirements traceability matrix experience.
- Confirm Confluence, Slack and Microsoft Teams experience.
- Add O/L results or grades if they should be shown.
- Replace the GitHub avatar copy with a preferred professional photo when available.
- Replace or confirm the `react-login-signup` project link. The current GitHub URL returns 404.
- Compress `assets/resume.pdf`; it is approximately 4.2 MB.
- Confirm whether the LinkedIn profile URL resolves in a normal browser. Automated requests returned HTTP 999.
- Activate and test the FormSubmit endpoint with a real submission.

## What the owner should supply

- Quantified results for Experience, such as funds raised, budget size, event attendance or reporting improvements.
- Project screenshots, especially for EcoTrack, and any public demo credentials.
- Verified outcome metrics for EcoTrack, such as active users, districts reached or CO2 tracked.
- One or two real testimonials from supervisors, lecturers or committee leads.
- A shorter, web-optimised CV file.

## Verification

Checked at 360px, 768px, 1024px and 1440px with headless Chrome:

- No horizontal overflow.
- No clipped text after the mobile stat-label adjustment.
- All local images, styles, scripts and the CV return HTTP 200.
- Project filters return 7 / 7 / 2 / 5 visible cards for All / Web / Group / Individual.
- Featured EcoTrack card spans the project grid at tablet and desktop widths.
- Mobile menu, Escape close, active navigation, back-to-top, counters and reduced motion pass.
- Contact form success and error states both restore the button after three seconds.
- No console errors and no failed local requests.
- Known external exceptions: the `react-login-signup` repository returns 404; LinkedIn returns HTTP 999 to automated requests.
