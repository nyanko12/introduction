/* Web Audio API SE — にゃんこ大戦争風 */
(() => {
  let ctx = null;
  let muted = false;
  let initialized = false;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function resume() {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
  }

  // ポコッ: 矩形波 + 急速減衰 80ms
  function playClick() {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, c.currentTime + 0.08);
    gain.gain.setValueAtTime(0.25, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
    osc.start(); osc.stop(c.currentTime + 0.08);
  }

  // ジャン: サイン波 440Hz→880Hz グライド
  function playSection() {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, c.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
    osc.start(); osc.stop(c.currentTime + 0.25);
  }

  // チャリン: 高周波サイン波 複数重ね
  function playMilestone() {
    const c = getCtx();
    [1047, 1319, 1568].forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = c.currentTime + i * 0.06;
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.3);
    });
  }

  // にゃんこ砲: ホワイトノイズ + 低音バースト
  function playCannon() {
    const c = getCtx();
    // low boom
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, c.currentTime + 0.4);
    gain.gain.setValueAtTime(0.5, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
    osc.start(); osc.stop(c.currentTime + 0.4);
    // noise burst
    const bufLen = c.sampleRate * 0.25;
    const buf = c.createBuffer(1, bufLen, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    const ngain = c.createGain();
    src.buffer = buf;
    src.connect(ngain); ngain.connect(c.destination);
    ngain.gain.setValueAtTime(0.3, c.currentTime);
    ngain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
    src.start(); src.stop(c.currentTime + 0.25);
  }

  // ドン！: 低周波サイン波 + ディケイ
  function playUnlock() {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, c.currentTime + 0.35);
    gain.gain.setValueAtTime(0.4, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35);
    osc.start(); osc.stop(c.currentTime + 0.35);
  }

  // ニャッ: ノコギリ波 200Hz 50ms
  function playNya() {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, c.currentTime);
    gain.gain.setValueAtTime(0.2, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
    osc.start(); osc.stop(c.currentTime + 0.05);
  }

  const SE_MAP = {
    click:     playClick,
    section:   playSection,
    milestone: playMilestone,
    cannon:    playCannon,
    unlock:    playUnlock,
    nya:       playNya,
  };

  // global
  window.playSE = function(name) {
    if (muted || !initialized) return;
    resume();
    const fn = SE_MAP[name];
    if (fn) { try { fn(); } catch(e) {} }
  };

  // init on first interaction
  function initAudio() {
    if (initialized) return;
    initialized = true;
    getCtx();
    document.removeEventListener('click', initAudio);
    document.removeEventListener('keydown', initAudio);
  }
  document.addEventListener('click', initAudio, { once: true });
  document.addEventListener('keydown', initAudio, { once: true });

  // mute button
  const muteBtn = document.getElementById('mute-btn');
  if (muteBtn) {
    muteBtn.addEventListener('click', e => {
      e.stopPropagation();
      muted = !muted;
      muteBtn.textContent = muted ? '🔇 MUTE' : '🔊 SOUND';
    });
  }

  // GitHub ボタンホバー → ニャッ
  const ghBtn = document.getElementById('nav-github');
  if (ghBtn) {
    ghBtn.addEventListener('mouseenter', () => {
      if (!muted && initialized) { resume(); try { playNya(); } catch(e) {} }
    });
  }
})();
