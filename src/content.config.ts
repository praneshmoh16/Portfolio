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
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    repoUrl: z.url().optional(),
    liveUrl: z.url().optional(),
  }),
});

export const collections = { projects };
