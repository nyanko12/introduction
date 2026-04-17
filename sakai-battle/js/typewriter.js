(() => {
  const TEXT = '現在、アルゴリズムの城を攻略中…';
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  let i = 0;
  let started = false;

  function type() {
    if (i <= TEXT.length) {
      el.textContent = TEXT.slice(0, i);
      i++;
      setTimeout(type, 80);
    }
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        setTimeout(type, 400);
        io.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const parent = el.closest('.flavor-text');
  if (parent) io.observe(parent);
})();
