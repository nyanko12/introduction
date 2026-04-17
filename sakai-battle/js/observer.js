(() => {
  const targets = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));

  // Stat bars — trigger fill on entry
  const statFills = document.querySelectorAll('.stat-fill[data-value]');
  const statIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = el.dataset.value;
        setTimeout(() => { el.style.width = val + '%'; }, 100);
        statIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statFills.forEach(el => statIO.observe(el));
})();
