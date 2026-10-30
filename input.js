// Input: sentuh, tombol layar, keyboard
import { canvas, state, K } from './state.js';
import { snd } from './audio.js';
import { DL, next } from './dialog.js';
import { go } from './game.js';

function enterFS() {
  try {
    if (document.fullscreenElement) return;
    const e = document.documentElement,
      r = e.requestFullscreen ? e.requestFullscreen() : (e.webkitRequestFullscreen && e.webkitRequestFullscreen());
    if (r && r.then) r.then(() => screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => {})).catch(() => {});
  } catch (_) {}
}

function tap() {
  enterFS(); snd();
  if (state.S == 'play') { if (state.d < DL.length && state.it > 40) next(); }
  else go();
}

function press(k, v) {
  K[k] = v;
  if (v) {
    enterFS(); snd();
    if (k == 'j') { state.jb = 8; go(); }
  }
}

function bind(id, k) {
  const e = document.getElementById(id);
  e.addEventListener('pointerdown', ev => { ev.preventDefault(); press(k, 1); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(n => e.addEventListener(n, () => press(k, 0)));
}

const keymap = { ArrowLeft: 'l', a: 'l', ArrowRight: 'r', d: 'r', ArrowUp: 'j', w: 'j', ' ': 'j' };

export function initInput() {
  bind('bl', 'l'); bind('br', 'r'); bind('bj', 'j');
  canvas.addEventListener('pointerdown', tap);
  addEventListener('contextmenu', e => e.preventDefault());
  addEventListener('keydown', e => {
    if ((e.key == 'Enter' || e.key == ' ') && state.S == 'play' && state.d < DL.length && state.it > 40) next();
    const k = keymap[e.key];
    if (k) { if (!e.repeat) press(k, 1); e.preventDefault(); }
  });
  addEventListener('keyup', e => { const k = keymap[e.key]; if (k) press(k, 0); });
}
