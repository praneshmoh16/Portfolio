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
  location: string;
  description: string;
  locale: string;
  email: string;
  nav: NavLink[];
  socials: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: 'Pranesh Mohanraj',
  role: 'Data Engineer',
  location: 'Dublin, Ireland',
  description:
    'Pranesh Mohanraj is a data engineer in Dublin with 4+ years of experience building data pipelines and cloud migrations, now working toward machine learning and AI roles.',
  locale: 'en',
  email: 'pranesh1604@gmail.com',
  nav: [
    { label: 'Projects', href: '/#projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranesh-m-/' },
    { label: 'GitHub', href: 'https://github.com/praneshmoh16' },
  ],
};
