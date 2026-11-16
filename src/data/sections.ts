/**
 * The home page sections, in scroll order. Each one is a "stage" of the
 * page's pipeline: the stage rail and the section headings read from here.
 */
export interface Stage {
  id: string;
  stage: string;
  title: string;
}

export const stages: Stage[] = [
  { id: 'top', stage: 'source', title: 'Intro' },
  { id: 'projects', stage: 'extract', title: 'Projects' },
  { id: 'experience', stage: 'transform', title: 'Experience' },
  { id: 'skills', stage: 'load', title: 'Skills' },
  { id: 'credentials', stage: 'validate', title: 'Certifications and awards' },
  { id: 'education', stage: 'train', title: 'Education' },
  { id: 'about', stage: 'infer', title: 'About me' },
  { id: 'contact', stage: 'deploy', title: 'Contact' },
];

export function getStage(id: string): { stage: Stage; index: number; total: number } {
  const index = stages.findIndex((s) => s.id === id);
  if (index === -1) throw new Error(`Unknown section id "${id}"`);
  return { stage: stages[index], index: index + 1, total: stages.length };
}
