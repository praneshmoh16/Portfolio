export interface HeroStat {
  /** Number that counts up when it scrolls into view. */
  value: number;
  suffix?: string;
  label: string;
}

export const hero = {
  eyebrow: 'Data engineer · Dublin',
  headline: ['Data in.', 'Intelligence out.'],
  headlineAccent: 'I build both.',
  intro:
    'I build the pipelines that move and verify enterprise data, and the AI that runs on top of it. Four years of cloud data engineering, now focused on machine learning and AI.',
  stats: [
    { value: 4, suffix: '+', label: 'years in data engineering' },
    { value: 5, label: 'data certifications' },
    { value: 2, label: 'delivery awards at CDW' },
  ] satisfies HeroStat[],
};
