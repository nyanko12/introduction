(() => {
  const targets = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
        if (typeof playSE === 'function') playSE('section');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));

  // stat bars
  const statFills = document.querySelectorAll('.stat-fill[data-value]');
  const statIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => { el.style.width = el.dataset.value + '%'; }, 120);
        statIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statFills.forEach(el => statIO.observe(el));
})();
