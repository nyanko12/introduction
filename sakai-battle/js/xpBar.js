(() => {
  const label = document.getElementById('xp-label');
  const fill  = document.getElementById('xp-fill');
  const milestone = document.getElementById('xp-milestone');

  const MILESTONES = {
    25: 'STAGE 1 CLEAR!',
    50: 'HALFWAY MARK!',
    75: 'CHAPTER CLEAR!',
    100: 'BATTLE COMPLETE!',
  };

  let lastMilestone = 0;
  let ticking = false;

  function pad(n) { return String(n).padStart(3, '0'); }

  function update() {
    const scrollY   = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;
    const clamped   = Math.min(100, Math.max(0, pct));

    label.textContent = `BATTLE XP: ${pad(clamped)} / 100`;
    fill.style.width  = `${clamped}%`;

    for (const [mark, text] of Object.entries(MILESTONES)) {
      const m = Number(mark);
      if (clamped >= m && lastMilestone < m) {
        lastMilestone = m;
        showMilestone(text);
      }
    }
    if (clamped < 25) lastMilestone = 0;

    ticking = false;
  }

  function showMilestone(text) {
    milestone.textContent = text;
    milestone.classList.remove('show');
    void milestone.offsetWidth; // reflow to restart animation
    milestone.classList.add('show');

    fill.classList.add('xp-flash');
    setTimeout(() => fill.classList.remove('xp-flash'), 500);
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();
