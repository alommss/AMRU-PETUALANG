// Render satu frame penuh
import { ctx as x, state } from './state.js';
import { G } from './config.js';
import { rr, ci, txt, tbubble } from './gfx.js';
import { drawCharacter } from './character.js';
import { drawHouse, drawTree, houses, trees } from './world.js';
import { NPC } from './npc.js';
import { AM } from './player.js';
import { DL } from './dialog.js';

export function render() {
  const { p, cam, t, VW, S, d, it, tc, en } = state;

  // Langit
  const g = x.createLinearGradient(0, 0, 0, 400);
  g.addColorStop(0, '#4f9dff'); g.addColorStop(1, '#d6efff');
  x.fillStyle = g; x.fillRect(0, 0, VW, 400);
  ci(VW - 110, 70, 34, '#fff4b0'); ci(VW - 110, 70, 24, '#ffe066');

  // Awan
  for (let i = 0; i < 9; i++) {
    const a = ((i * 260 - cam * .25) % 2400 + 2400) % 2400 - 200, b = 50 + i % 3 * 34;
    x.fillStyle = 'rgba(255,255,255,.9)'; x.beginPath();
    x.arc(a, b, 16, 0, 7); x.arc(a + 22, b - 6, 20, 0, 7); x.arc(a + 46, b, 15, 0, 7);
    x.fill();
  }

  // Bukit
  [['#5fae78', .35, 0], ['#3f8f56', .6, 90]].forEach(h => {
    x.fillStyle = h[0];
    for (let i = 0; i < 9; i++) {
      const a = ((i * 230 + h[2] - cam * h[1]) % 2200 + 2200) % 2200 - 200;
      x.beginPath(); x.arc(a, G + 10, 70 + i % 3 * 25, Math.PI, 0); x.fill();
    }
  });

  // Pohon & rumah
  trees.forEach(a => drawTree(a - cam));
  houses.forEach(h => drawHouse(h[0] - cam, h[1], h[2]));

  // Tanah
  rr(0, G, VW, 70, 0, '#8a5a2b');
  x.fillStyle = '#74481f';
  for (let i = -(cam % 46); i < VW; i += 46) x.fillRect(i, G + 26 + (Math.floor((i + cam) / 46) % 3) * 10, 18, 5);
  rr(-4, G - 2, VW + 8, 11, 4, '#58b83a', '#111827');
  x.fillStyle = '#6fd04a';
  for (let i = -(cam % 14); i < VW; i += 14) x.fillRect(i, G - 5, 3, 4);

  // NPC
  NPC.forEach(n => {
    const sx = n.x - cam, sy = G - 80 + Math.sin(t / 18 + n.x) * 1.5;
    drawCharacter(sx, sy, -1, 0, 0, n.pal);
    txt(n.n, sx, sy - 26, 24, '#ffd23f');
  });

  // Pemain
  const ax = p.x - cam + p.w / 2;
  drawCharacter(ax, p.y, p.f, p.vx && p.g, !p.g, AM);
  txt('Amru', ax, p.y - 26, 24, '#fff');

  // Dialog & hint
  if (S == 'play') {
    if (d < DL.length && it > 25) {
      tbubble(DL[d], ax, p.y - 62);
      if (tc >= Array.from(DL[d]).length && t % 70 < 48) txt('Tap layar untuk lanjut ▸', VW / 2, 388, 22, '#ffd23f');
    } else if (d >= DL.length && p.x < 500) {
      txt('◀ ▶ buat jalan    ▲ buat lompat', VW / 2, 388, 20);
    }
  }

  // Layar title / ending
  const ov = () => { x.fillStyle = 'rgba(10,15,35,.78)'; x.fillRect(0, 0, VW, 400); }, m = VW / 2;
  if (S == 'title') {
    ov();
    txt('AMRU', m, 120, 84, '#fff');
    txt('Petualang', m, 185, 50, '#ffd23f');
    txt('📱 Miringkan HP untuk bermain', m, 255, 24);
    txt('Tap layar buat mulai', m, 325, 28, '#ffd23f');
  }
  if (S == 'end' && en > 50) {
    ov();
    txt('Bersambung...', m, 190, 66, '#ffd23f');
    txt('Tap layar buat main lagi', m, 260, 28);
  }
}
