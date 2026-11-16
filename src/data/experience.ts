/**
 * Year-by-year timeline. Add an event by adding an object to a year's
 * `events` list. `level` is the role you held by the end of that year and
 * `growth` (1 to 5) drives the height of the growth bar.
 */
export type EventKind = 'role' | 'project' | 'award' | 'certification' | 'education' | 'event';

export interface TimelineEvent {
  kind: EventKind;
  title: string;
  detail?: string;
  /** Month or quarter, shown before the title when known. */
  when?: string;
}

export interface TimelineYear {
  year: number;
  level: string;
  growth: 1 | 2 | 3 | 4 | 5;
  summary: string;
  events: TimelineEvent[];
}

export const timeline: TimelineYear[] = [
  {
    year: 2022,
    level: 'Intern to Consultant Trainee',
    growth: 1,
    summary: 'Graduated, learned full-stack basics, then moved into data.',
    events: [
      {
        kind: 'role',
        when: 'Feb',
        title: 'Intern, Sirius Computer Solutions',
        detail:
          'Full-stack training in HTML, CSS, JavaScript, Java and MySQL, ending in a final project.',
      },
      {
        kind: 'education',
        title: 'B.E. Computer Science and Engineering',
        detail: 'Sri Krishna College of Engineering and Technology. CGPA 9.06 / 10.',
      },
      {
        kind: 'role',
        when: 'Jun',
        title: 'Consultant Trainee, Sirius Computer Solutions',
        detail:
          'SQL, Python, Snowflake and Matillion. ELT from AWS into Snowflake for client reporting.',
      },
    ],
  },
  {
    year: 2023,
    level: 'Associate Consultant',
    growth: 2,
    summary: 'First client migrations and a step up to Associate Consultant.',
    events: [
      {
        kind: 'role',
        when: 'Apr',
        title: 'Associate Consultant, CDW',
        detail: 'Data migration and automation with Azure Data Factory, SQL Server and Snowflake.',
      },
      {
        kind: 'project',
        title: 'Warehouse migration to Snowflake, fitness brand',
        detail: 'Full, incremental and CDC loads with Airflow, S3 and Snowflake.',
      },
      {
        kind: 'event',
        title: 'Led knowledge-transfer sessions',
        detail: 'Shared what I had learned with the team and organised team events.',
      },
    ],
  },
  {
    year: 2024,
    level: 'Associate Consultant',
    growth: 3,
    summary: 'Led a migration end to end and was recognised for delivery.',
    events: [
      {
        kind: 'award',
        when: 'Q1',
        title: 'Spot Award',
        detail: 'For project execution and organising team events.',
      },
      {
        kind: 'project',
        title: 'SQL Server to Snowflake migration, mattress brand',
        detail: 'Led the migration with Azure Data Factory and Snowflake stored procedures.',
      },
      {
        kind: 'project',
        title: 'HR approvals app on Power Platform',
        detail: 'Multi-level approvals, notifications and PDF generation.',
      },
      {
        kind: 'event',
        title: 'Hackathons, tech training and recruitment',
        detail: 'Built internal assets, trained colleagues and helped with hiring.',
      },
    ],
  },
  {
    year: 2025,
    level: 'Consultant',
    growth: 4,
    summary: 'Shipped to production, built reusable tooling and was promoted.',
    events: [
      {
        kind: 'award',
        when: 'Q1',
        title: 'Pat on the Back Award',
        detail: 'For delivering solutions to the CWS team through to production.',
      },
      {
        kind: 'project',
        title: 'One-time migration tool',
        detail: 'Moves data, views and stored procedures between systems in hours.',
      },
      {
        kind: 'certification',
        title: 'Microsoft Fabric Data Engineer Associate (DP-700)',
      },
      {
        kind: 'project',
        title: 'CDWIT pipelines on Microsoft Fabric',
        detail: 'Dataflows Gen2, Lakehouse and Delta tables with structured validation.',
      },
      {
        kind: 'role',
        when: 'Oct',
        title: 'Promoted to Consultant, CDW',
        detail: 'End-to-end pipelines, data models and incremental loads for enterprise analytics.',
      },
    ],
  },
  {
    year: 2026,
    level: 'MSc student, moving into ML and AI',
    growth: 5,
    summary: 'Moved to Dublin for an MSc and started building with AI agents.',
    events: [
      {
        kind: 'education',
        when: 'Sep',
        title: 'MSc Computer Science, University College Dublin',
        detail:
          'Negotiated Learning programme, with modules in machine learning and text analytics.',
      },
      {
        kind: 'event',
        when: 'Nov',
        title: 'EXL × UCD Data & AI Hackathon',
        detail:
          'Built an agentic migration factory: AI agents that migrate legacy T-SQL and SAS jobs and prove the output matches.',
      },
      {
        kind: 'project',
        when: 'Nov',
        title: 'Legacy vs Cloud Validator',
        detail: 'A reconciliation tool that returns PASS or FAIL for a migrated dataset.',
      },
    ],
  },
];
