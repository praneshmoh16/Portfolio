/**
 * Scroll and entrance motion for every page.
 *
 * - Cinematic (desktop with a mouse): every section is a full-screen scene
 *   driven by the scroll position. See scenes.ts.
 * - Phones and tablets: simple fades and a static pipeline diagram.
 * - "Reduce motion": no movement at all; the page shows its finished state.
 *
 * initMotion runs on every page load (including after a page transition)
 * and destroyMotion cleans up before the next page is swapped in.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  isCinematic,
  isDesktopPointer,
  onCinematicChange,
  prefersReducedMotion,
} from '@/scripts/env';
import { createPipelineLoop } from '@/scripts/pipeline';
import { experienceScene, heroScene, markYear, projectsScene, riseScenes } from '@/scripts/scenes';

gsap.registerPlugin(ScrollTrigger);

/**
 * Triggers that measure a pinned section's full scroll length must be
 * measured after the pins have added their spacing.
 */
const AFTER_PINS = -1;

let lenis: Lenis | null = null;
let context: gsap.Context | null = null;
let onTick: ((time: number) => void) | null = null;
let removeSceneListeners: (() => void) | null = null;

function startSmoothScroll(): void {
  lenis = new Lenis({ anchors: { offset: -56 } });
  lenis.on('scroll', ScrollTrigger.update);
  onTick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);
}

/** Hero text and diagram rise in, one after another, on page load. */
function animateHero(full: boolean): void {
  const items = gsap.utils.toArray<HTMLElement>('[data-hero-item]');
  if (items.length === 0) return;
  gsap.from(items, {
    y: full ? 28 : 10,
    autoAlpha: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.08,
  });
}

/** Anything marked data-reveal fades up the first time it scrolls into view. */
function animateReveals(full: boolean): void {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      y: full ? 36 : 12,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 90%', once: true },
    });
  });
}

/** Numbers marked data-count count up from zero. */
function animateCounts(): void {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((element) => {
    const end = Number(element.dataset.count);
    const counter = { value: 0 };
    gsap.to(counter, {
      value: end,
      duration: 1.2,
      delay: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = String(Math.round(counter.value));
      },
    });
  });
}

/** Each section is a pipeline stage: queued, then running, then done. */
function trackStages(): void {
  const railLinks = gsap.utils.toArray<HTMLElement>('[data-rail-link]');
  const setActive = (id: string) => {
    railLinks.forEach((link) => link.toggleAttribute('data-active', link.dataset.railLink === id));
  };

  gsap.utils.toArray<HTMLElement>('[data-stage]').forEach((section) => {
    section.dataset.status = 'queued';
    // A pinned section sits inside a taller spacer; track that so the stage
    // stays "running" for the whole time the scene is held.
    const spacer = section.parentElement?.classList.contains('pin-spacer')
      ? section.parentElement
      : section;
    ScrollTrigger.create({
      trigger: spacer,
      refreshPriority: AFTER_PINS,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => {
        section.dataset.status = 'running';
        setActive(section.id);
      },
      onEnterBack: () => {
        section.dataset.status = 'running';
        setActive(section.id);
      },
      onLeave: () => {
        section.dataset.status = 'done';
      },
      onLeaveBack: () => {
        section.dataset.status = 'queued';
      },
    });
  });
}

/** The rail line fills from top to bottom as the page scrolls. */
function animateRail(): void {
  const fill = document.querySelector('[data-rail-fill]');
  if (!fill) return;
  gsap.to(fill, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#main',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      refreshPriority: AFTER_PINS,
    },
  });
}

/** The year strip above the timeline highlights the year being read. */
function trackYears(): void {
  const links = gsap.utils.toArray<HTMLElement>('[data-year-link]');
  gsap.utils.toArray<HTMLElement>('[data-year]').forEach((block, i) => {
    const activate = () => markYear(links, i);
    ScrollTrigger.create({
      trigger: block,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: activate,
      onEnterBack: activate,
    });
  });
}

/** The hero pipeline loops on its own, and only while it is on screen. */
function animatePipeline(): void {
  const root = document.querySelector<HTMLElement>('[data-pipeline]');
  if (!root) return;
  const loop = createPipelineLoop(root);
  if (!loop) return;
  ScrollTrigger.create({
    trigger: root,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
  });
}

function scrollToY(y: number): void {
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: 'smooth' });
}

export function initMotion(): void {
  destroyMotion();

  const cinematic = isCinematic();
  document.documentElement.classList.toggle('cinematic', cinematic);
  if (prefersReducedMotion()) return;

  const full = isDesktopPointer();
  if (full) startSmoothScroll();

  context = gsap.context(() => {
    if (cinematic) {
      // Scenes are created in page order so each pin knows about the ones above it.
      heroScene();
      projectsScene();
      removeSceneListeners = experienceScene(scrollToY);
      riseScenes();
    } else {
      animateHero(full);
      animateReveals(full);
      trackYears();
      if (full) animatePipeline();
    }
    animateCounts();
    trackStages();
    if (full) animateRail();
  });

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}

export function destroyMotion(): void {
  removeSceneListeners?.();
  removeSceneListeners = null;
  context?.revert();
  context = null;
  if (onTick) gsap.ticker.remove(onTick);
  onTick = null;
  lenis?.destroy();
  lenis = null;
}

// Layout fonts and crossing the cinematic breakpoint both change scene sizes.
document.fonts.ready.then(() => ScrollTrigger.refresh());
onCinematicChange(initMotion);
