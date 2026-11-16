# Portfolio

Personal portfolio website of Pranesh Mohanraj.

## Tech stack

- [Astro](https://astro.build) for static pages
- TypeScript in strict mode
- Tailwind CSS v4 for styling
- ESLint and Prettier for code quality
- Hosted on Vercel

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

The site runs at http://localhost:4321.

## Scripts

| Command            | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the local dev server                      |
| `npm run build`    | Build the site into `dist/`                     |
| `npm run preview`  | Serve the built site locally                    |
| `npm run check`    | Type-check Astro and TypeScript files           |
| `npm run lint`     | Run ESLint                                      |
| `npm run format`   | Format every file with Prettier                 |
| `npm run validate` | Format check, lint, type-check and build in one |

## Folder structure

```
public/                  files served as-is (favicon, robots.txt)
src/
  assets/images/         images optimised at build time
  components/
    layout/              header and footer
    sections/            page sections (hero, projects, experience ...)
    seo/                 <head> tags
    ui/                  small reusable pieces (buttons, cards, tags)
  config/site.ts         name, tagline, navigation and social links
  content/projects/      one Markdown file per project
  content.config.ts      the fields every project file must have
  layouts/               page shells
  lib/                   helper functions
  pages/                 one file per route
  styles/global.css      Tailwind import and design tokens
docs/reference/          the first single-file version, kept for reference
```

## Updating content

- **Name, tagline, nav or social links:** edit `src/config/site.ts`.
- **Add a project:** add a Markdown file to `src/content/projects/` with the
  fields listed in `src/content.config.ts`.
- **Colours and fonts:** edit the tokens in `src/styles/global.css`.

## Conventions

- Components use PascalCase file names (`ProjectCard.astro`).
- Import from `src/` with the `@/` alias (`@/components/ui/Button.astro`).
- Content lives in `src/content/` and `src/config/`, never hard-coded in components.
- Run `npm run validate` before pushing.
