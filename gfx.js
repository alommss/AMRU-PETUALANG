// Fungsi gambar dasar
import { ctx as x, state } from './state.js';
import { O } from './config.js';

export function rr(a, b, w, h, r, f, s) {
  x.beginPath(); x.roundRect(a, b, w, h, r);
  if (f) { x.fillStyle = f; x.fill(); }
  if (s) { x.strokeStyle = s; x.lineWidth = 1.4; x.stroke(); }
}

export function ci(a, b, r, f) {
  x.beginPath(); x.arc(a, b, r, 0, 7);
  x.fillStyle = f; x.fill();
}

export function txt(s, px, py, sz, col) {
  x.font = '800 ' + sz + 'px system-ui';
  x.textAlign = 'center'; x.lineJoin = 'round';
  x.lineWidth = sz / 5; x.strokeStyle = '#0b1020';
  x.strokeText(s, px, py);
  x.fillStyle = col || '#fff'; x.fillText(s, px, py);
}

// Balon dialog dengan efek mengetik
export function tbubble(s, cx, by) {
  x.font = '800 22px system-ui';
  const w = x.measureText(s).width + 36,
    bx = Math.max(w / 2 + 12, Math.min(state.VW - w / 2 - 12, cx)),
    tx = Math.max(bx - w / 2 + 22, Math.min(bx + w / 2 - 22, cx));
  rr(bx - w / 2, by - 46, w, 46, 14, '#fff', O);
  x.beginPath(); x.moveTo(tx - 8, by - 1); x.lineTo(tx + 8, by - 1); x.lineTo(tx, by + 14);
  x.closePath(); x.fillStyle = '#fff'; x.fill();
  x.textAlign = 'left'; x.fillStyle = '#111827';
  x.fillText(Array.from(s).slice(0, Math.floor(state.tc)).join(''), bx - w / 2 + 18, by - 14);
}
