/**
 * Scroll and entrance motion for every page.
 *
 * - Desktop: smooth scrolling (Lenis), the stage rail, the hero pipeline.
 * - Phones: simple fades and a static pipeline diagram.
 * - "Reduce motion": no movement at all; the page shows its finished state.
 *
 * initMotion runs on every page load (including after a page transition)
 * and destroyMotion cleans up before the next page is swapped in.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { isDesktopPointer, prefersReducedMotion } from '@/scripts/env';
import { createPipelineTimeline } from '@/scripts/pipeline';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let context: gsap.Context | null = null;
let onTick: ((time: number) => void) | null = null;

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
    ScrollTrigger.create({
      trigger: section,
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
    scrollTrigger: { trigger: '#main', start: 'top top', end: 'bottom bottom', scrub: 0.4 },
  });
}

/** The year strip above the timeline highlights the year being read. */
function trackYears(): void {
  const links = gsap.utils.toArray<HTMLElement>('[data-year-link]');
  gsap.utils.toArray<HTMLElement>('[data-year]').forEach((block) => {
    const activate = () =>
      links.forEach((link) =>
        link.toggleAttribute('data-active', link.dataset.yearLink === block.dataset.year),
      );
    ScrollTrigger.create({
      trigger: block,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: activate,
      onEnterBack: activate,
    });
  });
}

/** The hero pipeline plays only while it is on screen. */
function animatePipeline(): void {
  const root = document.querySelector<HTMLElement>('[data-pipeline]');
  if (!root) return;
  const timeline = createPipelineTimeline(root);
  if (!timeline) return;
  ScrollTrigger.create({
    trigger: root,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? timeline.play() : timeline.pause()),
  });
}

export function initMotion(): void {
  destroyMotion();
  if (prefersReducedMotion()) return;

  const full = isDesktopPointer();
  if (full) startSmoothScroll();

  context = gsap.context(() => {
    animateHero(full);
    animateReveals(full);
    animateCounts();
    trackStages();
    trackYears();
    if (full) {
      animateRail();
      animatePipeline();
    }
  });
}

export function destroyMotion(): void {
  context?.revert();
  context = null;
  if (onTick) gsap.ticker.remove(onTick);
  onTick = null;
  lenis?.destroy();
  lenis = null;
}
