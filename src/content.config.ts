/**
 * Content collections. Each project is one Markdown file in
 * src/content/projects/. The schema below checks every file at build time,
 * so a missing or misspelled field fails the build instead of the page.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Where the data came from and where it went, shown as "from → to". */
    from: z.string(),
    to: z.string(),
    tags: z.array(z.string()).default([]),
    /** Shown as the large card at the top of the Projects section. */
    featured: z.boolean().default(false),
    /** True gives the project its own page at /projects/<file-name>/. */
    caseStudy: z.boolean().default(false),
    /** One-line result shown on the card. */
    result: z.string().optional(),
    context: z.string().optional(),
    order: z.number().default(0),
    repoUrl: z.url().optional(),
    liveUrl: z.url().optional(),
  }),
});

export const collections = { projects };
