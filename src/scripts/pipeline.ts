/**
 * Hero pipeline animation: each legacy row travels along the track, lights
 * the extract / transform / validate steps and fills the matching cloud row.
 * When all rows have landed the reconciliation check passes, then it loops.
 */
import gsap from 'gsap';

export function createPipelineTimeline(root: HTMLElement): gsap.core.Timeline | null {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const packet = root.querySelector<HTMLElement>('[data-packet]');
  const sourceRows = gsap.utils.toArray<HTMLElement>('[data-source-row]', root);
  const targetRows = gsap.utils.toArray<HTMLElement>('[data-target-row]', root);
  const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root);
  const rowsIn = root.querySelector<HTMLElement>('[data-rows-in]');
  const rowsOut = root.querySelector<HTMLElement>('[data-rows-out]');
  const pass = root.querySelector<HTMLElement>('[data-pass]');
  if (!track || !packet || !rowsIn || !rowsOut || !pass) return null;

  const styles = getComputedStyle(document.documentElement);
  const color = (name: string) => styles.getPropertyValue(name).trim();
  const travel = () => track.offsetWidth - packet.offsetWidth;

  const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2.6, delay: 0.6 });

  timeline
    .set(packet, { display: 'block', autoAlpha: 0, x: 0 })
    .set(targetRows, { scaleX: 0 })
    .set(sourceRows, { opacity: 1 })
    .set(pass, { autoAlpha: 0, scale: 0.9 })
    .call(() => {
      rowsIn.textContent = '0';
      rowsOut.textContent = '0';
    });

  sourceRows.forEach((sourceRow, i) => {
    const targetRow = targetRows[i];
    timeline
      .to(sourceRow, { opacity: 0.3, duration: 0.2 })
      .call(() => {
        rowsIn.textContent = String(i + 1);
      })
      .set(packet, { x: 0, autoAlpha: 1, backgroundColor: color('--source') })
      .to(packet, { x: travel, duration: 0.9, ease: 'power1.inOut' })
      .to(packet, { backgroundColor: color('--target'), duration: 0.3 }, '<0.45');

    steps.forEach((step, s) => {
      timeline.to(
        step,
        {
          borderColor: color('--target'),
          scale: 1.35,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
        },
        `>-${0.75 - s * 0.25}`,
      );
    });

    timeline
      .set(packet, { autoAlpha: 0 })
      .to(targetRow, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
      .call(() => {
        rowsOut.textContent = String(i + 1);
      });
  });

  timeline.to(pass, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });

  return timeline;
}
