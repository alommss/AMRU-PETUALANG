import { state } from './state.js';

export const DL = ['Haduhhh bingung', 'Berangkat sama siapa ya ☹️'];

export function next() {
  const n = Array.from(DL[state.d]).length;
  if (state.tc < n) state.tc = n;
  else { state.d++; state.tc = 0; }
}
