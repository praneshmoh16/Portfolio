/**
 * Skills by group. Set `core: true` on the ones to highlight as strongest.
 */
export interface Skill {
  name: string;
  core?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Data platforms',
    skills: [
      { name: 'Snowflake', core: true },
      { name: 'Microsoft Fabric', core: true },
      { name: 'Delta Lake' },
    ],
  },
  {
    title: 'Languages',
    skills: [{ name: 'Python', core: true }, { name: 'SQL', core: true }, { name: 'JavaScript' }],
  },
  {
    title: 'Pipelines',
    skills: [
      { name: 'Airflow', core: true },
      { name: 'Azure Data Factory', core: true },
      { name: 'Matillion' },
      { name: 'Fivetran' },
      { name: 'DataStage' },
    ],
  },
  {
    title: 'AI and machine learning',
    skills: [
      { name: 'LLM agents', core: true },
      { name: 'Prompt engineering' },
      { name: 'scikit-learn' },
      { name: 'pandas' },
      { name: 'NumPy' },
    ],
  },
  {
    title: 'Databases',
    skills: [{ name: 'SQL Server' }, { name: 'MySQL' }, { name: 'Netezza' }, { name: 'MongoDB' }],
  },
  {
    title: 'Cloud and DevOps',
    skills: [
      { name: 'Azure' },
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'Azure DevOps' },
      { name: 'CI/CD' },
      { name: 'Git' },
    ],
  },
  {
    title: 'Other',
    skills: [{ name: 'Power Apps' }, { name: 'Power Automate' }],
  },
];
