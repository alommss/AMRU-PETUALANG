import { G } from './config.js';

// Palet warna Amru
export const AM = {
  skin: '#a8704a', cap: '#2f5bff', capD: '#1f3fcc', logo: 1,
  hair: '#10131c', top: '#fff', col: '#2f5bff', pants: '#161b27', shoe: '#2f5bff'
};

export function createPlayer() {
  return { x: 180, y: G - 80, vx: 0, vy: 0, w: 46, h: 80, f: 1, g: 1 };
}
