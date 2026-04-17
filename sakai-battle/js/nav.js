(() => {
  const buttons  = document.querySelectorAll('.nav-btn[data-target]');
  const sections = {};

  buttons.forEach(btn => {
    const id = btn.dataset.target;
    if (id) sections[id] = document.getElementById(id);

    btn.addEventListener('click', () => {
      if (typeof playSE === 'function') playSE('click');
      const el = sections[id];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        buttons.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.3 });

  Object.values(sections).forEach(el => { if (el) observer.observe(el); });
})();
