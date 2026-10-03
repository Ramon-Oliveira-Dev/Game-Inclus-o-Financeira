const AC = window.AudioContext || (window as any).webkitAudioContext;
let actx: AudioContext | undefined;
export let sndOn = true;

export function getAC() {
  if (!actx && AC) actx = new AC();
  return actx;
}

export function toggleSnd() {
  sndOn = !sndOn;
  if (sndOn) getAC();
  return sndOn;
}

function beep(f: number, d: number, t: OscillatorType = "sine", v = 0.15) {
  if (!sndOn) return;
  const c = getAC();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.connect(g);
  g.connect(c.destination);
  o.type = t;
  o.frequency.setValueAtTime(f, c.currentTime);
  g.gain.setValueAtTime(v, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
  o.start(c.currentTime);
  o.stop(c.currentTime + d);
}

export const sndGood = () => {
  beep(523, 0.08);
  setTimeout(() => beep(659, 0.08), 90);
  setTimeout(() => beep(784, 0.2), 180);
};
export const sndBad = () => {
  beep(300, 0.15, "sawtooth", 0.12);
  setTimeout(() => beep(200, 0.25, "sawtooth", 0.1), 160);
};
export const sndMid = () => {
  beep(440, 0.12, "triangle", 0.1);
  setTimeout(() => beep(370, 0.18, "triangle", 0.09), 170);
};
export const sndNext = () => {
  beep(880, 0.06, "sine", 0.08);
  setTimeout(() => beep(1046, 0.1, "sine", 0.07), 90);
};
export const sndCombo = () => {
  [659, 784, 1046].forEach((f, i) =>
    setTimeout(() => beep(f, 0.12, "sine", 0.14), i * 90),
  );
};
export const sndStart = () => {
  [261, 330, 392, 523, 659].forEach((f, i) =>
    setTimeout(() => beep(f, 0.18, "sine", 0.15), i * 110),
  );
};
export const sndFinish = () => {
  [523, 659, 784, 1046, 1318, 1568].forEach((f, i) =>
    setTimeout(() => beep(f, 0.22, "sine", 0.17), i * 95),
  );
};
export const sndTick = () => {
  beep(1200, 0.04, "square", 0.05);
};
export const sndTimerTick = (secLeft: number) => {
  if (!sndOn) return;
  const progress = Math.max(0, Math.min(25, 25 - secLeft));
  const freq = 550 + progress * 30;
  const vol = 0.06 + progress * 0.008;
  beep(freq, 0.04, "sine", vol);
  setTimeout(() => beep(freq * 0.75, 0.03, "sine", vol * 0.6), 55);
};
export const sndTimeOutAlarm = () => {
  if (!sndOn) return;
  const tones = [440, 350, 440, 350, 520, 350];
  tones.forEach((f, i) => {
    setTimeout(() => beep(f, 0.12, "sawtooth", 0.25), i * 110);
  });
};
export const sndSwoosh = () => {
  beep(200, 0.3, "sine", 0.2);
  setTimeout(() => beep(100, 0.4, "sine", 0.1), 100);
};
export const sndClick = () => {
  beep(100, 0.1, "square", 0.1);
  setTimeout(() => beep(50, 0.1, "square", 0.1), 50);
};
