/**
 * Pointer effects for desktop: a custom cursor, cards that tilt toward the
 * pointer, and a spotlight that follows it across a card.
 * Listeners are attached once and survive page transitions.
 */
import gsap from 'gsap';
import { isDesktopPointer, prefersReducedMotion } from '@/scripts/env';

const INTERACTIVE = 'a, button, [data-tilt]';
const MAX_TILT_DEG = 4;

let listening = false;
let tilted: HTMLElement | null = null;

function resetTilt(): void {
  if (!tilted) return;
  gsap.to(tilted, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
  tilted = null;
}

export function initCursor(): void {
  if (prefersReducedMotion() || !isDesktopPointer()) return;

  const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
  const ring = document.querySelector<HTMLElement>('[data-cursor-ring]');
  if (!dot || !ring) return;

  dot.classList.remove('hidden');
  ring.classList.remove('hidden');
  document.documentElement.classList.add('cursor-on');
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

  const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.08 });
  const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.08 });
  const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
  const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

  // The cursor elements are re-created on each page, so always rebind these.
  cursorMove = (x, y, target) => {
    gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
    moveDotX(x);
    moveDotY(y);
    moveRingX(x);
    moveRingY(y);
    gsap.to(ring, {
      scale: target?.closest(INTERACTIVE) ? 1.7 : 1,
      duration: 0.25,
      overwrite: 'auto',
    });
  };

  if (listening) return;
  listening = true;

  document.addEventListener('pointermove', (event) => {
    const target = event.target as Element | null;
    cursorMove(event.clientX, event.clientY, target);

    const card = target?.closest<HTMLElement>('[data-tilt]') ?? null;
    if (card !== tilted) resetTilt();
    if (!card) return;

    tilted = card;
    const box = card.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
    gsap.to(card, {
      rotateY: (px - 0.5) * 2 * MAX_TILT_DEG,
      rotateX: (0.5 - py) * 2 * MAX_TILT_DEG,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  document.addEventListener('pointerleave', resetTilt);
}

let cursorMove: (x: number, y: number, target: Element | null) => void = () => {};
