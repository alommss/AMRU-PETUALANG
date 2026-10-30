// Logika game: reset, update per frame, mulai
import { state, K } from './state.js';
import { W, G } from './config.js';
import { DL } from './dialog.js';
import { NPC } from './npc.js';
import { createPlayer } from './player.js';
import { blip, boing } from './audio.js';

export function reset() {
  state.p = createPlayer();
  state.it = 0; state.en = 0; state.jb = 0; state.cam = 0; state.d = 0; state.tc = 0;
}

export function go() {
  if (state.S == 'title' || (state.S == 'end' && state.en > 50)) { reset(); state.S = 'play'; }
}

export function update() {
  const s = state, p = s.p;
  s.t++;
  if (s.S == 'play') {
    s.it++;
    const lock = s.d < DL.length;
    // efek mengetik dialog
    if (lock && s.it > 25) {
      const n = Array.from(DL[s.d]).length;
      if (s.tc < n) {
        const o = Math.floor(s.tc);
        s.tc = Math.min(n, s.tc + .18);
        if (Math.floor(s.tc) > o) blip();
      }
    }
    // gerak
    p.vx = lock ? 0 : (K.r - K.l) * 2.8;
    if (p.vx) p.f = Math.sign(p.vx);
    // lompat
    if (s.jb > 0) {
      s.jb--;
      if (p.g && !lock) { p.vy = -8.6; p.g = 0; s.jb = 0; boing(); }
    }
    if (!K.j && p.vy < -3) p.vy *= .6;
    p.vy += .34; p.x += p.vx; p.y += p.vy;
    p.x = Math.max(0, Math.min(W - p.w, p.x));
    if (p.y + p.h >= G) { p.y = G - p.h; p.vy = 0; p.g = 1; } else p.g = 0;
    // sampai Gopi -> ending
    if (p.x > NPC[1].x - 113) { s.S = 'end'; s.en = 0; }
  } else if (s.S == 'end') s.en++;
  s.cam = Math.max(0, Math.min(W - s.VW, p.x - s.VW * .3));
}
