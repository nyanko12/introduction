(() => {
  const cards = document.querySelectorAll('.stage-card[data-stage]');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        setTimeout(() => {
          card.classList.add('unlocked');
          const lockLabel = card.querySelector('.stage-lock-label');
          if (lockLabel) lockLabel.textContent = '✓ UNLOCKED';
        }, 400);
        io.unobserve(card);
      }
    });
  }, { threshold: 0.4 });

  cards.forEach(card => io.observe(card));
})();
