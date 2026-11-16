export interface Certification {
  name: string;
  issuer: string;
  code?: string;
  /** Link to the issuer's verification page, when available. */
  verifyUrl?: string;
}

export interface Award {
  name: string;
  issuer: string;
  when: string;
  reason: string;
}

export const certifications: Certification[] = [
  { name: 'SnowPro Advanced: Data Engineer', issuer: 'Snowflake' },
  { name: 'SnowPro Core', issuer: 'Snowflake' },
  { name: 'Fabric Data Engineer Associate', issuer: 'Microsoft', code: 'DP-700' },
];

export const awards: Award[] = [
  {
    name: 'Pat on the Back Award',
    issuer: 'CDW',
    when: 'Q1 2025',
    reason: 'For delivering solutions to the CWS team through to production.',
  },
  {
    name: 'Spot Award',
    issuer: 'CDW',
    when: 'Q1 2024',
    reason: 'For outstanding project execution and organising team events.',
  },
];
