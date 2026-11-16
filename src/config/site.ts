/**
 * Site-wide settings. Edit this file to change the name, tagline,
 * navigation links or social links shown across the site.
 */
export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  description: string;
  locale: string;
  nav: NavLink[];
  socials: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: 'Pranesh Mohanraj',
  role: 'Data Engineer',
  description: 'Portfolio of Pranesh Mohanraj, data engineer.',
  locale: 'en',
  nav: [],
  socials: [{ label: 'GitHub', href: 'https://github.com/praneshmoh16' }],
};
