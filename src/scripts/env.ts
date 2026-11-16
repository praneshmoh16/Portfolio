/** What kind of motion this visitor should get. */
const CINEMATIC_QUERY = '(min-width: 1024px) and (min-height: 640px) and (pointer: fine)';

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth scrolling and cursor effects run on screens with a mouse. */
export const isDesktopPointer = (): boolean =>
  window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;

/**
 * Cinematic mode: every section plays as a full-screen, scroll-driven scene.
 * Phones, tablets and "reduce motion" get the lighter layout instead.
 * Keep in sync with the inline script in components/seo/BaseHead.astro.
 */
export const isCinematic = (): boolean =>
  window.matchMedia(CINEMATIC_QUERY).matches && !prefersReducedMotion();

/** Calls `callback` whenever the visitor crosses into or out of cinematic mode. */
export function onCinematicChange(callback: () => void): void {
  window.matchMedia(CINEMATIC_QUERY).addEventListener('change', callback);
}
