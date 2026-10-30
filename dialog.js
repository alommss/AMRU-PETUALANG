import { state } from './state.js';

// Tiap scene = urutan balon dialog. who = pembicara ('Amru' atau nama NPC).
// Setiap scene otomatis dapat efek letterbox sinematik.
export const SCENES = {
  intro: [
    { who: 'Amru', t: 'Haduhhh bingung' },
    { who: 'Amru', t: 'Berangkat sama siapa ya ☹️' }
  ],
  ikram: [
    { who: 'Ikram', t: 'bonsss' },
    { who: 'Ikram', t: 'mocaannn' },
    { who: 'Amru', t: 'pass bgtt kramss' },
    { who: 'Amru', t: 'temenin gw yoo' },
    { who: 'Ikram', t: 'kemana bonss?' },
    { who: 'Amru', t: 'gw mau ketemuan ama cewe di sukabumi' },
    { who: 'Ikram', t: 'ogah kntl,sndiri aj sno' },
    { who: 'Amru', t: 'huft..' },
    { who: 'Amru', t: 'oke deh krams' }
  ]
};

export function startScene(name) {
  state.scene = name; state.d = 0; state.tc = 0; state.st = 0;
}

export function currentLine() {
  const sc = state.scene && SCENES[state.scene];
  return sc ? sc[state.d] : null;
}

// Tap: selesaikan ketikan dulu, tap lagi untuk baris berikutnya.
// Setelah baris terakhir, scene selesai dan Amru bisa jalan lagi.
export function next() {
  const line = currentLine();
  if (!line) return;
  const n = Array.from(line.t).length;
  if (state.tc < n) state.tc = n;
  else {
    state.d++; state.tc = 0;
    if (state.d >= SCENES[state.scene].length) {
      state.done[state.scene] = 1;
      state.scene = null; state.d = 0;
    }
  }
}
