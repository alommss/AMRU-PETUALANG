// Logika game: reset, update per frame, mulai
import { state, K } from './state.js';
import { W, G, INTRO_HOLD, INTRO_OPEN, BAR_H } from './config.js';
import { startScene, currentLine } from './dialog.js';
import { NPC } from './npc.js';
import { createPlayer } from './player.js';
import { blip, boing } from './audio.js';
import { setMode } from './ui.js';

export function reset() {
  state.p = createPlayer();
  state.st = 0; state.iv = 0; state.en = 0; state.jb = 0; state.cam = 0;
  state.d = 0; state.tc = 0; state.scene = null; state.bar = 0; state.done = {};
}

// Dipanggil tombol Play (atau tap setelah ending): mulai intro letterbox
export function start() {
  if (state.S == 'title' || (state.S == 'end' && state.en > 50)) {
    reset();
    state.S = 'intro';
    setMode('intro');
  }
}

export function update() {
  const s = state, p = s.p;
  s.t++;
  if (s.S == 'play') {
    // NPC punya scene? mulai dialog saat Amru mendekat
    if (!s.scene) {
      for (const n of NPC) {
        if (n.scene && !s.done[n.scene] && p.x > n.x - 113) { p.f = 1; startScene(n.scene); break; }
      }
    }
    const lock = !!s.scene;   // saat dialog, Amru berhenti
    const line = currentLine();
    if (lock) s.st++;
    // efek mengetik dialog
    if (line && s.st > 25) {
      const n = Array.from(line.t).length;
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
    const gopi = NPC.find(n => n.n == 'Gopi');
    if (p.x > gopi.x - 113) { s.S = 'end'; s.en = 0; setMode('end'); }
  } else if (s.S == 'intro') {
    // letterbox reveal; selesai -> mulai play dengan bar sinematik tetap terpasang untuk dialog pembuka
    s.iv++;
    if (s.iv >= INTRO_HOLD + INTRO_OPEN) {
      s.S = 'play'; setMode('play');
      s.bar = BAR_H; startScene('intro');
    }
  } else if (s.S == 'end') s.en++;

  // animasi bar letterbox: masuk saat ada dialog, keluar saat dialog selesai
  if (s.S == 'play' || s.S == 'end') {
    const target = (s.S == 'play' && s.scene) ? BAR_H : 0;
    s.bar += (target - s.bar) * .12;
    if (Math.abs(target - s.bar) < .3) s.bar = target;
  }
  s.cam = Math.max(0, Math.min(W - s.VW, p.x - s.VW * .3));
}
