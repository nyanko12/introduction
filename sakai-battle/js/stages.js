(() => {
  const cards = document.querySelectorAll('.stage-card[data-stage]');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;

      // 0.0s: shake
      card.classList.add('shaking');

      // 0.3s: colorize
      setTimeout(() => {
        card.classList.remove('shaking');
        card.classList.add('unlocked');

        // animate progress bar
        const bar = card.querySelector('.stage-pbar-fill');
        if (bar) {
          const val = bar.dataset.value;
          bar.style.width = val + '%';
        }
      }, 300);

      // 0.5s: LOCKED → CLEAR
      setTimeout(() => {
        const lockLabel = card.querySelector('.stage-lock-label');
        if (lockLabel) lockLabel.textContent = '✅ CLEAR!';
        if (typeof playSE === 'function') playSE('unlock');
      }, 500);

      io.unobserve(card);
    });
  }, { threshold: 0.4 });

  cards.forEach(card => io.observe(card));
})();
