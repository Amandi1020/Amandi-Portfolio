# Portfolio Audit — PM / BA Internship Positioning

**Audited:** 31 October 2026  
**Audience:** Recruiter / hiring manager for a Project Management or Business Analysis internship  
**Scope:** `index.html`, `css/style.css`, `js/main.js`, `README.md`, and assets in `assets/`  
**Status:** Report only. No audit recommendations below have been applied.

---

## Verdict

**Professional-looking, but not yet a PM/BA portfolio.**

The visual design is polished, cohesive and noticeably above the average student portfolio. The rose-gold dark theme, typography and project cards create a strong first impression. However, the content still reads primarily as a **front-end / full-stack developer** portfolio with PM/BA labels added on top.

For a PM/BA internship, a recruiter needs evidence of requirements work, process modelling, stakeholder communication, planning and measurable outcomes. Most of that evidence is currently missing or implicit. The portfolio is a good foundation, but it is **not yet industry-standard for PM/BA hiring**.

**Overall score: 5.4 / 10**

| Area | Score | Assessment |
|---|---:|---|
| First impression | 7/10 | Visually strong, distinctive and memorable. Hero states PM/BA intent clearly. |
| Content relevance to PM/BA | 5/10 | Positioning is right, but projects and skills are mostly development-led. |
| Evidence and impact | 4/10 | Very few metrics, outcomes, artefacts or before/after results. |
| Structure | 6/10 | Logical, but section order still favours a developer portfolio. |
| Visual design | 8/10 | Cohesive theme, good typography, strong cards and spacing. |
| Accessibility | 5/10 | Basic structure is sound, but icon links, keyboard focus and motion need work. |
| SEO | 3/10 | Title is generic, meta description/Open Graph/favicon are missing. |
| Performance | 4/10 | Large CV and unused image; limited lazy-loading and no image dimensions. |
| Mobile | 7/10 | Responsive rules exist and layout should stack well; not visually tested on devices. |

---

## What already works

- Clear PM/BA statement in the hero and About section.
- Relevant finance and leadership experience (IEEE, Harithawarjana, Bank of Ceylon).
- PM-related certifications (IBM, Simplilearn PM 101, HP LIFE Agile).
- A real downloadable CV and a working contact form flow.
- Consistent rose-gold branding and responsive CSS breakpoints.
- Project cards include GitHub links and group/individual labels.
- `lang="en"`, viewport meta and semantic section headings are present.

---

## High priority

### 1. Turn projects into PM/BA case studies
The current project cards describe what was built, not how it was analysed or managed. For each project, add a compact case-study structure:

- **Problem / context**
- **My role** (BA, project lead, developer, etc.)
- **Approach** (elicitation, process mapping, sprint planning, testing)
- **Tools / artefacts** (BPMN, UML, user stories, RTM, Trello/Jira, Figma)
- **Outcome / metric** (time saved, users, defects reduced, deadline met)

At least one project should visibly include BA artefacts: an AS-IS/TO-BE diagram, user stories with acceptance criteria, a requirements traceability matrix or a short BRD excerpt. Screenshots are more convincing than descriptions.

### 2. Add an explicit availability badge and a stronger CV call to action
The hero already has a CV button, but there is no clear "Open to Internships — Project Management / Business Analysis" badge. Add one near the hero tag or buttons. Keep the CV button prominent and state the role target in or next to it.

The existing `assets/resume.pdf` is about **4.2 MB**, which is heavy for email/ATS uploads. Compress it and confirm it is the PM/BA version, not a developer CV.

### 3. Quantify experience
The Experience section describes responsibilities but not scale or results. Add numbers the owner can defend:

- Harithawarjana: budget size raised/managed, team size, vendors, attendance, number of reports produced.
- IEEE: number of events supported, budget range, committee size.
- Bank of Ceylon: transaction/customer volume if shareable, duration, process improvements.
- LinkUp: attendance, team size, deliverables.

Do not invent numbers. Use `TODO(owner)` until confirmed.

### 4. Reorder sections for PM/BA
Recommended order:

**Hero → About → Experience & Leadership → Projects → Skills / Tools → Certifications → Education → Contact**

Experience currently sits near the bottom, after Education and Certifications. For an internship, relevant leadership and finance experience should appear earlier.

### 5. Fix broken and inconsistent links / facts
- `https://github.com/Amandi1020/react-login-signup` returns **404**. The project card points to a repository that does not exist. Update the link or remove the card.
- The contact section displays `linkedin.com/in/amandi-rajapaksha` while the actual URL is `linkedin.com/in/amandi-rajapaksha-397a21284/`. Make the visible text match the destination.
- README says **2nd year**; the site says **3rd year**. Use one version.
- README says the contact form uses **Formspree**; the code uses **FormSubmit**.
- DITEC appears as **2024** in Education but **2026** in Certifications. Confirm the correct date.
- The README previously said 5 certificates; the site has 6. This audit file records the mismatch; both should stay in sync.
- README links to a `LICENSE` file that is not present in the repository.

### 6. Strengthen metadata and search/social preview
- `<title>` is `Amandi Rajapaksha | MIS Portfolio`. Make it role-targeted, e.g. `Amandi Rajapaksha | Project Management & Business Analysis Intern`.
- Add a meta description with the role, university, location and availability.
- Add Open Graph and Twitter card tags so LinkedIn/WhatsApp shares render a proper preview.
- Add a favicon and an Open Graph image.
- Add `canonical` once the final URL is confirmed.

---

## Medium priority

### 7. Certification section: add issuer, date and credential link
The cards show issuer and year only. Add month/year, credential ID or verification link where available. Consider ordering PM/BA certifications first (IBM, PM 101, Agile) and the IT/design certificates later.

### 8. Reduce developer-skill dilution
The Technical Skills bars are the most prominent skill block, which pulls the portfolio back toward front-end. Keep development as "supporting", but lead with PM/BA competencies and tools. Replace percentage bars with honest ranges or grouped capability levels where possible. A recruiter cannot verify "78%" but can verify "comfortable / working knowledge / project experience".

### 9. Accessibility pass
- Social and footer icon links have no visible text. `title` is not a reliable accessible name; add `aria-label` or visually hidden text.
- The hamburger is a `<div>`; use a `<button>` with `aria-expanded` and keyboard support.
- Add visible `:focus-visible` styles for links, buttons, cards and nav items.
- Add a "Skip to content" link.
- Associate form labels with inputs; placeholders alone are not labels.
- Respect `prefers-reduced-motion` for particles, blobs, cursor glow and reveal animations.
- Some small text (certificate dates, tags) is below comfortable reading size.

### 10. Performance and image handling
- Compress certificate images and the CV.
- Remove or use `assets/img/pawfind.png` (about **4.8 MB**, currently unused).
- Add `width`/`height` or aspect-ratio to images to reduce layout shift.
- Use `loading="lazy"` and `decoding="async"` consistently for below-the-fold images.
- The hero profile image is missing (`assets/img/profile.jpg`) and falls back to a remote GitHub avatar. Upload a local, compressed profile photo.

### 11. SEO structure
- Add structured data (`Person` / `ProfilePage`) with name, role, university, location and profile links.
- Keep one `h1` and a clean heading hierarchy.
- Add descriptive alt text for project screenshots and diagrams.
- Confirm that the live GitHub Pages URL is indexed and that the README and site use the same canonical URL.

### 12. Professional presentation
- A personal Gmail address is acceptable for an intern, but a simpler alias or a domain email would look more professional.
- Instagram is not relevant to PM/BA hiring; keep it out of the primary contact block or de-emphasise it.
- Audit the CV, LinkedIn headline and portfolio for the same role wording.
- Remove emoji from project-type labels if a more formal tone is desired; emoji are not inherently wrong but can read as informal in a PM/BA context.

---

## Low priority

- Add a short "Currently learning" or "Next steps" line to show direction (e.g. IIBA ECBA, CAPM, Scrum fundamentals).
- Add a "Download portfolio / case studies" PDF for recruiters who prefer one file.
- Add a last-updated date to the README or footer.
- Add a simple `LICENSE` file if the README continues to reference MIT.
- Consider replacing decorative percentage bars with concise competency statements.
- Add micro-interaction checks for keyboard users and screen readers after the accessibility fixes.

---

## Not changed on purpose

The following were intentionally left alone during this pass:

- Hero copy, About copy, project descriptions and all existing dates/wording not required by the brief.
- The existing six project cards other than the removal required by the brief.
- Existing experience entries and their descriptions.
- Existing certificate titles, issuers and card text.
- Existing technical and business skill percentages.
- Contact details, social URLs and the FormSubmit configuration.
- Rose-gold colours, typography, spacing, particle background and animation style.
- The site's existing section order (recommended above, but not applied).
- The `README.md` About/Features wording beyond the required project-count, certificate-count and file-tree updates.
- Any new content that would require facts the owner has not supplied.

---

## Verification notes

- All six certificate images resolve after moving them from `assetsimg/` into `assets/img/` and were confirmed with HTTP 200 from a local server.
- The Projects counter now matches the six remaining project cards.
- The external link check found one confirmed broken project link: `react-login-signup` (404).
- LinkedIn returned HTTP 999 to automated requests (bot protection), so it was not confirmed as broken.
- FormSubmit activation and the live contact form were not tested end-to-end.
- Mobile behaviour was reviewed from CSS breakpoints, not on physical devices.
- The brief named "MediFlow" as the last project card, but no MediFlow card exists in this repository. The actual last card (EcoTrack) was removed as instructed.

---

## Owner TODOs

- Confirm PM tool experience: ClickUp, Asana, Microsoft Project, Monday.com, Confluence, Slack, Microsoft Teams.
- Confirm BA tool/artefact experience: Draw.io/Lucidchart, Balsamiq, requirements traceability matrix.
- Review every business-skill percentage and adjust to interview-defensible levels.
- Add O/L results/subjects if desired.
- Supply quantified experience metrics.
- Confirm the DITEC completion date and correct either the Education or Certification entry.
- Fix or replace the broken `react-login-signup` link.
- Upload a local `assets/img/profile.jpg`.
- Compress `assets/resume.pdf` and the certificate images.
