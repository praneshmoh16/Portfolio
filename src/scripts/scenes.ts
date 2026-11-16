/**
 * Cinematic mode: each section is a full-screen scene driven by the scroll
 * position. Called from motion.ts inside a gsap.context, so everything here
 * is undone automatically when the page changes.
 *
 * Scenes must be created in page order, top to bottom.
 */
import gsap from 'gsap';
import { buildPipelineRun } from '@/scripts/pipeline';

/** Height of the sticky header; pinned scenes sit just below it. */
const HEADER_HEIGHT = 57;
const PIN_START = `top top+=${HEADER_HEIGHT}`;
const SCRUB = 0.6;

const pad = (n: number) => String(n).padStart(2, '0');

/** Marks the year being read and fills the growth bars up to it. */
export function markYear(links: HTMLElement[], activeIndex: number): void {
  links.forEach((link, i) => {
    link.toggleAttribute('data-active', i === activeIndex);
    link.toggleAttribute('data-passed', i <= activeIndex);
  });
}

/**
 * Opening scene: the screen holds, scrolling moves the five rows through
 * the pipeline, and the second and third headline lines light up on the way.
 */
export function heroScene(): void {
  const section = document.querySelector<HTMLElement>('[data-scene="hero"]');
  if (!section) return;

  const inner = section.querySelector<HTMLElement>('[data-hero-inner]');
  const [, secondLine, accentLine] = gsap.utils.toArray<HTMLElement>('[data-hero-line]', section);
  const hint = section.querySelector<HTMLElement>('[data-scroll-hint]');
  const pipeline = section.querySelector<HTMLElement>('[data-pipeline]');
  const run = pipeline ? buildPipelineRun(pipeline) : null;
  const length = run?.duration() ?? 4;

  // Short fade on arrival, separate from the scroll-driven timeline below.
  if (inner) gsap.from(inner, { autoAlpha: 0, y: 20, duration: 0.8, ease: 'power3.out' });

  gsap.set([secondLine, accentLine], { opacity: 0.15 });

  const scene = gsap.timeline({
    scrollTrigger: { trigger: section, start: PIN_START, end: '+=180%', pin: true, scrub: SCRUB },
  });

  if (run) scene.add(run, 0);
  if (hint) scene.to(hint, { autoAlpha: 0, duration: length * 0.08 }, 0);
  scene
    .to(secondLine, { opacity: 1, duration: length * 0.2 }, length * 0.4)
    .to(accentLine, { opacity: 1, duration: length * 0.15 }, length * 0.88)
    .to({}, { duration: length * 0.12 });
}

/**
 * Projects scene: the section holds and each project takes the full screen
 * in turn. The featured project runs its agent pipeline step by step.
 */
export function projectsScene(): void {
  const section = document.querySelector<HTMLElement>('#projects[data-scene="pin"]');
  if (!section) return;

  const slides = gsap.utils.toArray<HTMLElement>('[data-project-slide]', section);
  const counter = section.querySelector<HTMLElement>('[data-project-count]');
  if (slides.length === 0) return;

  const scene = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: PIN_START,
      end: `+=${slides.length * 90}%`,
      pin: true,
      scrub: SCRUB,
      onUpdate: () => {
        if (!counter) return;
        const current = slides.findLastIndex((_, i) => scene.time() >= scene.labels[`slide${i}`]);
        counter.textContent = pad(Math.max(current, 0) + 1);
      },
    },
  });

  slides.forEach((slide, i) => {
    const label = `slide${i}`;
    const copy = slide.querySelector<HTMLElement>('[data-slide-copy]');
    const visual = slide.querySelector<HTMLElement>('[data-slide-visual]');
    const agentSteps = gsap.utils.toArray<HTMLElement>('[data-agent-step]', slide);
    const agentResult = slide.querySelector<HTMLElement>('[data-agent-result]');
    const flowLine = slide.querySelector<HTMLElement>('[data-flow-line]');
    const flowTarget = slide.querySelector<HTMLElement>('[data-flow-target]');

    scene.addLabel(label);

    if (i > 0) {
      scene
        .fromTo(slide, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, label)
        .from(
          copy ? Array.from(copy.children) : [],
          { y: 48, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' },
          label,
        )
        .from(visual, { x: 60, autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, label);
    }

    if (agentSteps.length > 0) {
      scene.from(agentSteps, { autoAlpha: 0.2, x: -14, stagger: 0.3, duration: 0.3 });
      if (agentResult) {
        scene.from(agentResult, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: 'back.out(2)' });
      }
    }

    if (flowLine && flowTarget) {
      scene
        .from(flowLine, { scaleY: 0, duration: 0.5, ease: 'none' }, `${label}+=0.35`)
        .from(flowTarget, { autoAlpha: 0.2, y: 10, duration: 0.3 }, '>-0.05');
    }

    scene.to({}, { duration: 0.7 });

    if (i < slides.length - 1) {
      scene.to(slide, { autoAlpha: 0, y: -48, duration: 0.35, ease: 'power2.in' });
    }
  });
}

/**
 * Experience scene: a horizontal film strip. The section holds and
 * scrolling moves the track sideways through the years.
 * Returns the click handlers it added so motion.ts can remove them.
 */
export function experienceScene(scrollTo: (y: number) => void): () => void {
  const section = document.querySelector<HTMLElement>('#experience[data-scene="pin"]');
  const track = section?.querySelector<HTMLElement>('[data-year-track]');
  const viewport = track?.parentElement;
  if (!section || !track || !viewport) return () => {};

  const links = gsap.utils.toArray<HTMLElement>('[data-year-link]', section);
  const lastIndex = Math.max(links.length - 1, 1);
  const distance = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);

  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: PIN_START,
      end: () => `+=${distance()}`,
      pin: true,
      scrub: SCRUB,
      invalidateOnRefresh: true,
      onUpdate: (self) => markYear(links, Math.round(self.progress * lastIndex)),
    },
  });
  markYear(links, 0);

  // Clicking a year jumps to that point of the strip.
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest<HTMLElement>('[data-year-link]');
    const trigger = tween.scrollTrigger;
    if (!link || !trigger) return;
    event.preventDefault();
    const index = Number(link.dataset.yearIndex);
    scrollTo(trigger.start + ((trigger.end - trigger.start) * index) / lastIndex);
  };
  section.addEventListener('click', onClick);
  return () => section.removeEventListener('click', onClick);
}

/**
 * Remaining sections: each fills the screen, its content rises in as the
 * section arrives and fades up and out as it leaves.
 */
export function riseScenes(): void {
  const sections = gsap.utils.toArray<HTMLElement>('[data-scene="rise"]');

  sections.forEach((section, i) => {
    const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', section);
    gsap.from(items, {
      y: 64,
      autoAlpha: 0,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 15%', scrub: SCRUB },
    });

    const isLast = i === sections.length - 1;
    const inner = section.querySelector<HTMLElement>('[data-scene-inner]');
    if (isLast || !inner) return;
    gsap.to(inner, {
      autoAlpha: 0,
      y: -48,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'bottom 45%', end: 'bottom 10%', scrub: SCRUB },
    });
  });
}
