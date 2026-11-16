# Design decisions

Agreed on 2026-11-16. Change this file when a decision changes.

## Platform

| Decision | Choice                                          |
| -------- | ----------------------------------------------- |
| Stack    | Astro, TypeScript (strict), Tailwind CSS        |
| Hosting  | Vercel, free address for now (no custom domain) |

## Look and feel

| Decision     | Choice                                                                    |
| ------------ | ------------------------------------------------------------------------- |
| Visual style | Data-themed: pipeline diagrams, source-to-target arrows, monospace labels |
| Theme        | Light and dark, follows the device setting, toggle in the header          |
| Palette      | Amber means legacy / source. Teal means cloud / target / verified.        |
| Structure    | One scrolling home page, plus a case-study page per featured project      |

## Motion

| Decision  | Choice                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| Level     | Rich and immersive                                                                                                       |
| Hero      | Live pipeline animation: rows flow from legacy through transform stages to cloud, then a reconciliation check shows PASS |
| Scroll    | Scroll-driven storytelling: a pipeline line draws down the page and each section runs like a stage                       |
| Scrolling | Smooth scrolling with momentum                                                                                           |
| Cursor    | Custom cursor, cards tilt toward the pointer, soft spotlight (desktop only)                                              |
| Pages     | Animated transitions: a project card morphs into its case-study page                                                     |
| Fallback  | Phones get simple fades and a static pipeline diagram. "Reduce motion" turns movement off.                               |

## Cinematic mode

Agreed later on 2026-11-16: on desktop the whole site plays like a film.
It applies on screens at least 1024px wide and 640px tall with a mouse and
motion allowed. Everything else gets the lighter layout above.

| Scene      | How it plays                                                                               |
| ---------- | ------------------------------------------------------------------------------------------ |
| Hero       | The screen holds and scrolling runs the pipeline while the headline lights up line by line |
| Projects   | Every project takes the full screen in turn; the featured one runs its agent pipeline      |
| Experience | Horizontal film strip: scrolling moves sideways through the years                          |
| The rest   | Each section fills the screen; content rises in and fades out                              |

Long scenes have a "skip" link so a visitor in a hurry can jump ahead.

## Animation libraries

| Decision         | Choice                            |
| ---------------- | --------------------------------- |
| Timelines/scroll | GSAP with ScrollTrigger           |
| Smooth scrolling | Lenis                             |
| Page transitions | Astro view transitions (built in) |

## Typography

| Role                    | Font           |
| ----------------------- | -------------- |
| Headings                | Space Grotesk  |
| Body text               | Inter          |
| Labels, stats, diagrams | JetBrains Mono |

## Home page sections, in order

1. Hero (live pipeline animation)
2. Projects
3. Experience
4. Skills
5. Certifications and awards
6. Education
7. About me (with photo)
8. Contact

## Still to decide

- Content for each section (supplied one piece at a time)
- Photo file for the About section
