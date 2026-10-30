// Isi dunia: rumah & pohon
import { ctx as x } from './state.js';
import { G, O } from './config.js';
import { rr, ci } from './gfx.js';

// [posisi x, warna dinding, warna atap]
export const houses = [
  [330, '#ffd9b3', '#d9634a'],
  [720, '#cfe8ff', '#4a78d9'],
  [1280, '#e3f5c8', '#4aa36a'],
  [1650, '#ffe0ef', '#a04ad9'],
  [2130, '#fff1b8', '#d9a04a']
];
export const trees = [180, 560, 1100, 1480, 2050, 2260];

export function drawHouse(a, wall, roof) {
  rr(a, G - 110, 130, 110, 4, wall, O);
  x.beginPath(); x.moveTo(a - 12, G - 110); x.lineTo(a + 65, G - 175); x.lineTo(a + 142, G - 110); x.closePath();
  x.fillStyle = roof; x.fill(); x.strokeStyle = O; x.lineWidth = 1.4; x.stroke();
  rr(a + 50, G - 62, 28, 62, 4, '#7a4b25', O);
  rr(a + 14, G - 88, 24, 24, 3, '#bfe3ff', O);
  rr(a + 92, G - 88, 24, 24, 3, '#bfe3ff', O);
}

export function drawTree(a) {
  rr(a - 7, G - 80, 14, 80, 4, '#7a4b25', O);
  ci(a, G - 100, 38, '#3f9a54');
  ci(a - 24, G - 78, 26, '#4aad60');
  ci(a + 24, G - 78, 26, '#4aad60');
}
