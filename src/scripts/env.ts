/** What kind of motion this visitor should get. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Full effects run on screens with a mouse; phones and tablets get the lighter version. */
export const isDesktopPointer = (): boolean =>
  window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
