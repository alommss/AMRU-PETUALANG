// Menggambar karakter (Amru & NPC)
import { ctx as x, state } from './state.js';
import { O, SC } from './config.js';
import { rr, ci } from './gfx.js';

export function drawCharacter(sx, sy, f, run, air, P) {
  const t = state.t;
  x.save(); x.translate(sx, sy); x.scale(f * SC, SC);
  const s = run ? Math.sin(t / 4) * 5 : 0, a = air ? -4 : s, l1 = air ? -4 : s, l2 = air ? 5 : -s;
  rr(-10 - a * .3, 15, 5, 10, 2.5, '#dfe7ff', O); rr(-14, 14, 7, 12, 3, '#1b2130', O);
  rr(-7 + l1, 24, 7, 11, 2, P.pants, O); rr(1 + l2, 24, 7, 11, 2, P.pants, O);
  rr(-9 + l1, 33, 11, 7, 3, P.shoe, O); rr(-8 + l1, 38, 10, 2, 1, '#fff');
  rr(l2, 33, 11, 7, 3, P.shoe, O); rr(1 + l2, 38, 10, 2, 1, '#fff');
  rr(-9, 13, 18, 13, 4, P.top, O); rr(-6, 11, 12, 6, 3, P.col, O); rr(-9, 24, 18, 4, 2, P.pants, O);
  rr(3 + a * .3, 14, 6, 10, 3, P.top, O); rr(3 + a * .3, 22, 6, 5, 2, P.pants, O);
  rr(-8, 1, 16, 13, 5, P.skin || '#f6cfa8', O);
  x.fillStyle = P.hair; x.beginPath();
  x.moveTo(-9, 7); x.lineTo(-8, 0); x.lineTo(-3, -1); x.lineTo(0, 3); x.lineTo(8, 3); x.lineTo(9, 8); x.lineTo(5, 5); x.lineTo(-9, 9);
  x.fill();
  ci(4, 8, 2.2, '#fff'); ci(4.8, 8.2, 1.2, '#111'); rr(2, 4.5, 5, 1.3, .6, '#111'); rr(4, 11.5, 3, 1, .5, '#b5533c');
  if (P.cap) {
    x.fillStyle = P.cap; x.beginPath(); x.ellipse(-1, 0, 10, 7, 0, Math.PI, 0); x.fill();
    x.strokeStyle = O; x.lineWidth = 1.4; x.stroke();
    rr(2, -1, 12, 3.5, 1.7, P.capD, O);
    if (P.logo) {
      x.fillStyle = '#fff'; x.beginPath();
      x.moveTo(-5, -1.5); x.lineTo(-4.5, -5); x.lineTo(-2.5, -3); x.lineTo(-.5, -5.5); x.lineTo(1.5, -3); x.lineTo(3, -5); x.lineTo(3.5, -1.5);
      x.fill();
    }
  } else {
    x.fillStyle = P.hair; x.beginPath(); x.ellipse(-1, 1, 10, 7, 0, Math.PI, 0); x.fill();
    x.strokeStyle = O; x.lineWidth = 1.4; x.stroke();
    x.beginPath(); x.moveTo(-6, -5); x.lineTo(-3, -9); x.lineTo(0, -5); x.lineTo(4, -8); x.lineTo(5, -3); x.fill();
  }
  x.restore();
}
