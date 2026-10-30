// State bersama + canvas. Semua modul baca/tulis lewat objek `state`.
export const canvas = document.getElementById('c');
export const ctx = canvas.getContext('2d');

export const state = {
  S: 'title',   // 'title' (home) | 'intro' (letterbox reveal) | 'play' | 'end'
  p: null,      // pemain (dibuat di game.js -> reset)
  cam: 0,       // posisi kamera
  t: 0,         // frame counter
  it: 0,        // frame sejak mulai main
  iv: 0,        // frame sejak intro dimulai
  en: 0,        // frame sejak layar ending
  jb: 0,        // jump buffer
  d: 0,         // index dialog
  tc: 0,        // progres teks dialog (typewriter)
  VW: 800       // lebar layar virtual
};

// Input tombol: kiri, kanan, lompat
export const K = { l: 0, r: 0, j: 0 };

export function resize() {
  const dp = Math.min(window.devicePixelRatio || 1, 2.5);
  canvas.width = Math.round(innerWidth * dp);
  canvas.height = Math.round(innerHeight * dp);
  const k = canvas.height / 400;
  ctx.setTransform(k, 0, 0, k, 0, 0);
  state.VW = canvas.width / k;
}
