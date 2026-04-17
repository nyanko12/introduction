(() => {
  const label     = document.getElementById('xp-label');
  const fill      = document.getElementById('xp-fill');
  const valueEl   = document.getElementById('xp-value');
  const milestone = document.getElementById('xp-milestone');
  const flash     = document.getElementById('cannon-flash');

  const MILESTONES = {
    25:  'にゃんこ砲、準備中…',
    50:  'チャージ50%！',
    75:  'もうすぐにゃんこ砲が撃てるにゃ！',
    100: '🐱 にゃんこ砲、発射可能！',
  };

  let lastMilestone = 0;
  let ticking = false;

  function pad(n) { return String(n).padStart(3, '0'); }

  function update() {
    const scrollY   = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;
    const clamped   = Math.min(100, Math.max(0, pct));

    label.textContent  = `BATTLE XP`;
    valueEl.textContent = `${pad(clamped)} / 100`;
    fill.style.width   = `${clamped}%`;

    if (clamped >= 90) {
      fill.classList.add('charging');
    } else {
      fill.classList.remove('charging');
    }

    for (const [mark, text] of Object.entries(MILESTONES)) {
      const m = Number(mark);
      if (clamped >= m && lastMilestone < m) {
        lastMilestone = m;
        showMilestone(text, m === 100);
        if (typeof playSE === 'function') {
          m === 100 ? playSE('cannon') : playSE('milestone');
        }
      }
    }
    if (clamped < 25) lastMilestone = 0;

    ticking = false;
  }

  function showMilestone(text, isCannon) {
    milestone.textContent = text;
    milestone.classList.remove('show');
    void milestone.offsetWidth;
    milestone.classList.add('show');

    fill.classList.add('xp-flash');
    setTimeout(() => fill.classList.remove('xp-flash'), 500);

    if (isCannon && flash) {
      flash.classList.remove('fire');
      void flash.offsetWidth;
      flash.classList.add('fire');
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();
