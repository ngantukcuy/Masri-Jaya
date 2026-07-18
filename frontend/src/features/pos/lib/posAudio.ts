// Web Audio POS sound synthesizer.
// Plays a short high-pitched beep, mimicking a standard cashier scanner.
export const playBeep = (soundEnabled: boolean) => {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1450, ctx.currentTime); // Standard high frequency cashier beep
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.log('Audio contexts blocked or not supported on this framework window.', e);
  }
};

// Simulates the low-frequency vibration clicking of a thermal receipt printer.
export const playPrintSound = (soundEnabled: boolean) => {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    for (let i = 0; i < 8; i++) {
      const timeOffset = i * 0.15;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 - i * 10, ctx.currentTime + timeOffset);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + timeOffset);
      osc.stop(ctx.currentTime + timeOffset + 0.1);
    }
  } catch (e) {
    console.log(e);
  }
};
