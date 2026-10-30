let AC;

export function snd() {
  try {
    if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state == 'suspended') AC.resume();
  } catch (_) {}
}

export function blip() {
  if (!AC) return;
  const o = AC.createOscillator(), g = AC.createGain(), n = AC.currentTime;
  o.type = 'sine';
  const f = 620 + Math.random() * 180;
  o.frequency.setValueAtTime(f, n);
  o.frequency.exponentialRampToValueAtTime(f * .45, n + .07);
  g.gain.setValueAtTime(.0001, n);
  g.gain.exponentialRampToValueAtTime(.16, n + .008);
  g.gain.exponentialRampToValueAtTime(.0001, n + .09);
  o.connect(g); g.connect(AC.destination);
  o.start(n); o.stop(n + .1);
}

export function boing() {
  if (!AC) return;
  const n = AC.currentTime,
    o = AC.createOscillator(), l = AC.createOscillator(),
    lg = AC.createGain(), g = AC.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(240, n);
  o.frequency.exponentialRampToValueAtTime(900, n + .1);
  o.frequency.exponentialRampToValueAtTime(480, n + .4);
  l.frequency.value = 26; lg.gain.value = 45;
  l.connect(lg); lg.connect(o.frequency);
  g.gain.setValueAtTime(.0001, n);
  g.gain.exponentialRampToValueAtTime(.3, n + .02);
  g.gain.exponentialRampToValueAtTime(.0001, n + .45);
  o.connect(g); g.connect(AC.destination);
  o.start(n); l.start(n);
  o.stop(n + .46); l.stop(n + .46);
}
