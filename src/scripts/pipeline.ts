/**
 * Hero pipeline animation: each legacy row travels along the track, lights
 * the extract / transform / validate steps and fills the matching cloud row.
 * When all rows have landed the reconciliation check passes and the data is
 * marked ready for AI.
 *
 * buildPipelineRun returns one run that a scroll position can drive;
 * createPipelineLoop repeats it on its own.
 */
import gsap from 'gsap';

export function buildPipelineRun(root: HTMLElement): gsap.core.Timeline | null {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const packet = root.querySelector<HTMLElement>('[data-packet]');
  const packetFill = root.querySelector<HTMLElement>('[data-packet-fill]');
  const sourceRows = gsap.utils.toArray<HTMLElement>('[data-source-row]', root);
  const targetRows = gsap.utils.toArray<HTMLElement>('[data-target-row]', root);
  const stepFills = gsap.utils.toArray<HTMLElement>('[data-step-fill]', root);
  const rowsIn = root.querySelector<HTMLElement>('[data-rows-in]');
  const rowsOut = root.querySelector<HTMLElement>('[data-rows-out]');
  const pass = root.querySelector<HTMLElement>('[data-pass]');
  const aiReady = root.querySelector<HTMLElement>('[data-ai-ready]');
  if (!track || !packet || !packetFill || !rowsIn || !rowsOut || !pass || !aiReady) return null;

  const travel = () => track.offsetWidth - packet.offsetWidth;
  const run = gsap.timeline();

  run
    .set(packet, { display: 'block', autoAlpha: 0, x: 0 })
    .set(targetRows, { scaleX: 0 })
    .set(sourceRows, { opacity: 1 })
    .set([pass, aiReady], { autoAlpha: 0, scale: 0.9 })
    .set([rowsIn, rowsOut], { textContent: '0' });

  sourceRows.forEach((sourceRow, i) => {
    run
      .to(sourceRow, { opacity: 0.3, duration: 0.2 })
      .set(rowsIn, { textContent: String(i + 1) })
      .set(packet, { x: 0, autoAlpha: 1 })
      .set(packetFill, { opacity: 0 })
      .addLabel(`row${i}`)
      .to(packet, { x: travel, duration: 0.9, ease: 'power1.inOut' }, `row${i}`)
      .to(packetFill, { opacity: 1, duration: 0.3 }, `row${i}+=0.45`);

    stepFills.forEach((fill, s) => {
      run.to(
        fill,
        { opacity: 1, duration: 0.15, yoyo: true, repeat: 1 },
        `row${i}+=${0.15 + s * 0.25}`,
      );
    });

    run
      .set(packet, { autoAlpha: 0 }, `row${i}+=0.9`)
      .to(targetRows[i], { scaleX: 1, duration: 0.3, ease: 'power2.out' })
      .set(rowsOut, { textContent: String(i + 1) });
  });

  run
    .to(pass, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' })
    .to(aiReady, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });

  return run;
}

/** Plays the pipeline over and over, with a pause on the finished state. */
export function createPipelineLoop(root: HTMLElement): gsap.core.Timeline | null {
  const run = buildPipelineRun(root);
  if (!run) return null;
  return gsap.timeline({ repeat: -1, repeatDelay: 2.6, delay: 0.6 }).add(run);
}
