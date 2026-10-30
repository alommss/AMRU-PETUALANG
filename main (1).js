import { resize } from './state.js';
import { reset, update } from './game.js';
import { render } from './scene.js';
import { initInput } from './input.js';

const portrait = () => matchMedia('(orientation: portrait)').matches;

resize();
addEventListener('resize', resize);
addEventListener('orientationchange', () => setTimeout(resize, 200));

reset();
initInput();

function loop() {
  if (!portrait()) update();
  render();
  requestAnimationFrame(loop);
}
loop();

// PWA: biar bisa di-install & offline (hanya jalan di https / localhost)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
